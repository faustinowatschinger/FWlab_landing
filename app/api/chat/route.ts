/**
 * POST /api/chat — un turno del chat de /chat.
 *
 * Entra:  { sesion?: string, mensaje: string, origen?: Record<string,string> }
 * Sale:   { sesion, mensaje, estado, mostrarAgenda, nombre, evento: { lead, contacto } }
 *
 * El primer mensaje del agente (el saludo) lo pinta la página sin llamar acá:
 * el que entra desde el anuncio y se va sin escribir no gasta modelo.
 *
 * Protección, porque el tráfico es pago y público:
 * - Origen: solo se acepta desde el mismo host (como /api/contact).
 * - Largo: cada mensaje hasta CHAT_MAX_LARGO caracteres.
 * - Por sesión: hasta CHAT_MAX_MENSAJES mensajes del usuario. La sesión va
 *   firmada (sesion.ts), así que el historial no se puede inventar. Pero un
 *   token firmado se puede mandar muchas veces: por eso además se cuentan las
 *   llamadas por id de sesión del lado del server (regla "sesion").
 * - Por IP: CHAT_MAX_POR_IP mensajes y CHAT_MAX_SESIONES_POR_IP sesiones nuevas por hora.
 * - Global: CHAT_MAX_GLOBAL mensajes por hora y CHAT_MAX_DIA por día. Son el
 *   techo del gasto, y avisan por mail a la mitad y al llegar.
 * Los contadores viven en Redis (../../lib/limites.ts), compartidos entre las
 * instancias de Vercel. Sin Redis configurado cuentan en memoria, por
 * instancia, y eso NO es un techo real.
 */
import { after, NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { avisarSiCruza } from "../../lib/aviso-limite";
import { consumir, DIA_S, HORA_S, huellaIp, ipDe, type Regla } from "../../lib/limites";
import { cargarLead } from "./crm";
import { avisarFaustino } from "./aviso";
import { refrescarCotizacion } from "./cotizacion";
import { guardarConversacion } from "./conversaciones";
import { responder } from "./motor";
import { firmar, hayClave, leer, nueva } from "./sesion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);
const MAX_LARGO = num(process.env.CHAT_MAX_LARGO, 600);
const MAX_MENSAJES = num(process.env.CHAT_MAX_MENSAJES, 16);
const MAX_POR_IP = num(process.env.CHAT_MAX_POR_IP, 60);
const MAX_SESIONES_POR_IP = num(process.env.CHAT_MAX_SESIONES_POR_IP, 8);
// 300 por hora y 1.000 por día son unas 125 conversaciones de 8 mensajes por día:
// varias veces lo que trae la campaña. Antes el único techo era 1.200 por hora.
const MAX_GLOBAL = num(process.env.CHAT_MAX_GLOBAL, 300);
const MAX_DIA = num(process.env.CHAT_MAX_DIA, 1000);
// Llamadas por id de sesión. El margen cubre los turnos que fallaron (502) y no
// quedaron en el token: sin él, dos errores le acortarían la charla a un lead real.
const MARGEN_SESION = 4;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

const CLAVES_ORIGEN = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "v", "desde"];
function limpiarOrigen(valor: unknown): Record<string, string> {
  if (!valor || typeof valor !== "object") return {};
  const salida: Record<string, string> = {};
  for (const k of CLAVES_ORIGEN) {
    const v = (valor as Record<string, unknown>)[k];
    if (typeof v === "string" && v) salida[k] = v.slice(0, 80);
  }
  return salida;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: "origen" }, 403);
    } catch {
      return json({ error: "origen" }, 403);
    }
  }

  if (!hayClave()) {
    console.error("[chat] falta CHAT_SESSION_SECRET (32+ caracteres) en producción");
    return json({ error: "El chat no está disponible ahora." }, 503);
  }
  if (!process.env.OPENAI_API_KEY) {
    console.error("[chat] falta OPENAI_API_KEY");
    return json({ error: "El chat no está disponible ahora." }, 503);
  }

  let cuerpo: { sesion?: unknown; mensaje?: unknown; origen?: unknown };
  try {
    cuerpo = await req.json();
  } catch {
    return json({ error: "Mensaje inválido." }, 400);
  }

  const mensaje = typeof cuerpo.mensaje === "string" ? cuerpo.mensaje.trim() : "";
  if (!mensaje) return json({ error: "Escribí un mensaje." }, 400);
  if (mensaje.length > MAX_LARGO) return json({ error: `Probá con un mensaje más corto (hasta ${MAX_LARGO} caracteres).` }, 400);

  const ip = huellaIp(ipDe(req.headers));
  let sesion = typeof cuerpo.sesion === "string" && cuerpo.sesion ? leer(cuerpo.sesion) : null;
  if (cuerpo.sesion && !sesion) return json({ error: "La conversación venció. Recargá la página para empezar de nuevo.", vencida: true }, 400);

  const esNueva = !sesion;
  if (!sesion) sesion = nueva(limpiarOrigen(cuerpo.origen));

  const delUsuario = sesion.turnos.filter((t) => t.rol === "usuario").length;
  if (delUsuario >= MAX_MENSAJES) {
    return json({ error: "Llegamos al límite de mensajes de esta conversación.", limite: true }, 429);
  }

  // Todas juntas: si una corta, no se cuenta ninguna (ver ../../lib/limites.ts).
  const reglas: Regla[] = [
    ...(esNueva ? [{ nombre: "sesiones-ip", clave: `chat:ses-ip:${ip}`, max: MAX_SESIONES_POR_IP, ventanaS: HORA_S }] : []),
    { nombre: "sesion", clave: `chat:ses:${sesion.id}`, max: MAX_MENSAJES + MARGEN_SESION, ventanaS: DIA_S + HORA_S, desdePrimerUso: true },
    { nombre: "ip", clave: `chat:ip:${ip}`, max: MAX_POR_IP, ventanaS: HORA_S },
    { nombre: "global", clave: "chat:global", max: MAX_GLOBAL, ventanaS: HORA_S },
    { nombre: "dia", clave: "chat:dia", max: MAX_DIA, ventanaS: DIA_S },
  ];
  const consumo = await consumir(reglas);
  if (!consumo.ok) {
    if (consumo.corte === "sesiones-ip") {
      return json({ error: "Ya se abrieron varias conversaciones desde tu conexión. Probá de nuevo más tarde." }, 429);
    }
    if (consumo.corte === "sesion") {
      return json({ error: "Llegamos al límite de mensajes de esta conversación.", limite: true }, 429);
    }
    if (consumo.corte === "ip") return json({ error: "Muchos mensajes desde tu conexión. Probá en un rato." }, 429);
    console.error(
      `[chat] TECHO ${consumo.corte === "dia" ? `DIARIO (${MAX_DIA}/día)` : `GLOBAL (${MAX_GLOBAL}/h)`} alcanzado. Puede ser tracción o abuso: revisar antes de subirlo.`,
    );
    return json({ error: "Estamos con mucha demanda. Probá en un rato." }, 429);
  }
  // Aviso por mail a la mitad y al llegar al techo del día, y al llegar al de la hora.
  avisarSiCruza("Chat de la landing", consumo, MAX_GLOBAL, MAX_DIA);

  const historial = [...sesion.turnos, { rol: "usuario" as const, texto: mensaje }];

  // Dólar en vivo para el piso de ticket en pesos (cacheado una hora; no traba si la API falla).
  await refrescarCotizacion();

  let resultado;
  try {
    resultado = await responder(new OpenAI(), historial, sesion.estado);
  } catch (e) {
    console.error("[chat] error del modelo", e);
    return json({ error: "No pude responder ahora. Probá de nuevo en un momento." }, 502);
  }
  if (!resultado.ok) return json({ error: "No pude responder ahora. Probá de nuevo en un momento." }, 502);

  const s = resultado.salida;
  if (resultado.violacionesFinales.length) {
    console.error("[chat] el modelo rompió reglas dos veces, se mostró el texto de reemplazo", {
      sesion: sesion.id,
      reglas: resultado.violacionesFinales,
    });
  }

  sesion.turnos = [...historial, { rol: "agente", texto: s.mensaje }];
  sesion.estado = s.estado;

  // Lead del píxel: SOLO al calificar, una vez. Es el evento con el que puede optimizar Meta,
  // así que no lo disparan los que no califican.
  let eventoLead = false;
  if (!sesion.lead && s.estado === "califica") {
    sesion.lead = true;
    eventoLead = true;
  }
  // Contacto sin calificar (dejó WhatsApp sin pasar el filtro): evento propio, una vez.
  let eventoContacto = false;
  if (!sesion.contacto && !eventoLead && !sesion.lead && s.whatsapp) {
    sesion.contacto = true;
    eventoContacto = true;
  }

  // FW Central: la primera vez que hay WhatsApp. No bloquea la respuesta más de 8 s.
  if (s.whatsapp && !sesion.enCrm) {
    const r = await cargarLead(sesion, s);
    // Si está apagado se marca igual: no tiene sentido reintentar en cada turno.
    sesion.enCrm = r !== "error";
  }

  // Mail a Faustino la primera vez que deja WhatsApp: el agente promete que él le escribe.
  // Va después de la respuesta (after) y se intenta una sola vez: si falla, queda en el log.
  if (s.whatsapp && !sesion.avisado) {
    sesion.avisado = true;
    const copia = { ...sesion, turnos: [...sesion.turnos] };
    after(() => avisarFaustino(copia, s).then(() => undefined));
  }

  // Toda conversación queda en FW Central (con o sin WhatsApp), después de responder.
  if (s.mostrar_agenda) sesion.vioAgenda = true;
  {
    const copia = { ...sesion, turnos: [...sesion.turnos] };
    const vio = Boolean(sesion.vioAgenda);
    after(() => guardarConversacion(copia, s, vio).then(() => undefined));
  }

  return json({
    sesion: firmar(sesion),
    mensaje: s.mensaje,
    estado: s.estado,
    mostrarAgenda: s.mostrar_agenda,
    nombre: s.nombre,
    restantes: MAX_MENSAJES - delUsuario - 1,
    evento: { lead: eventoLead, contacto: eventoContacto },
  });
}
