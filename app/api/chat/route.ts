/**
 * POST /api/chat — un turno del chat de /chat.
 *
 * Entra:  { sesion?: string, mensaje: string, origen?: Record<string,string> }
 * Sale:   { sesion, mensaje, estado, mostrarAgenda, nombre, evento: { lead } }
 *
 * El primer mensaje del agente (el saludo) lo pinta la página sin llamar acá:
 * el que entra desde el anuncio y se va sin escribir no gasta modelo.
 *
 * Protección, porque el tráfico es pago y público:
 * - Origen: solo se acepta desde el mismo host (como /api/contact).
 * - Largo: cada mensaje hasta CHAT_MAX_LARGO caracteres.
 * - Por sesión: hasta CHAT_MAX_MENSAJES mensajes del usuario. La sesión va
 *   firmada (sesion.ts), así que el contador no se puede resetear desde el
 *   navegador salvo abriendo otra, que cuenta contra el límite por IP.
 * - Por IP: CHAT_MAX_POR_IP mensajes y CHAT_MAX_SESIONES_POR_IP sesiones nuevas por hora.
 * - Global: CHAT_MAX_GLOBAL mensajes por hora. Es el techo del gasto.
 * Los contadores por IP y global viven en memoria: con una sola instancia
 * alcanzan; con varias, cada una lleva el suyo.
 */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { cargarLead } from "./crm";
import { avisarFaustino } from "./aviso";
import { responder } from "./motor";
import { firmar, hayClave, leer, nueva } from "./sesion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);
const MAX_LARGO = num(process.env.CHAT_MAX_LARGO, 600);
const MAX_MENSAJES = num(process.env.CHAT_MAX_MENSAJES, 16);
const MAX_POR_IP = num(process.env.CHAT_MAX_POR_IP, 60);
const MAX_SESIONES_POR_IP = num(process.env.CHAT_MAX_SESIONES_POR_IP, 8);
const MAX_GLOBAL = num(process.env.CHAT_MAX_GLOBAL, 1200);
const HORA = 60 * 60 * 1000;

const porIp = new Map<string, number[]>();
const sesionesPorIp = new Map<string, number[]>();
let globales: number[] = [];

function contar(mapa: Map<string, number[]>, ip: string, max: number): boolean {
  const ahora = Date.now();
  const previas = (mapa.get(ip) ?? []).filter((t) => ahora - t < HORA);
  if (previas.length >= max) {
    mapa.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  mapa.set(ip, previas);
  if (mapa.size > 5000) mapa.clear();
  return true;
}

function pasaGlobal(): boolean {
  const ahora = Date.now();
  globales = globales.filter((t) => ahora - t < HORA);
  if (globales.length >= MAX_GLOBAL) {
    console.error(`[chat] TECHO GLOBAL alcanzado (${MAX_GLOBAL}/h). Puede ser tracción o abuso: revisar antes de subirlo.`);
    return false;
  }
  globales.push(ahora);
  return true;
}

function ipDe(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "desconocida";
}

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

  const ip = ipDe(req);
  let sesion = typeof cuerpo.sesion === "string" && cuerpo.sesion ? leer(cuerpo.sesion) : null;
  if (cuerpo.sesion && !sesion) return json({ error: "La conversación venció. Recargá la página para empezar de nuevo.", vencida: true }, 400);

  if (!sesion) {
    if (!contar(sesionesPorIp, ip, MAX_SESIONES_POR_IP)) {
      return json({ error: "Ya se abrieron varias conversaciones desde tu conexión. Probá de nuevo más tarde." }, 429);
    }
    sesion = nueva(limpiarOrigen(cuerpo.origen));
  }

  const delUsuario = sesion.turnos.filter((t) => t.rol === "usuario").length;
  if (delUsuario >= MAX_MENSAJES) {
    return json({ error: "Llegamos al límite de mensajes de esta conversación.", limite: true }, 429);
  }
  if (!contar(porIp, ip, MAX_POR_IP)) return json({ error: "Muchos mensajes desde tu conexión. Probá en un rato." }, 429);
  if (!pasaGlobal()) return json({ error: "Estamos con mucha demanda. Probá en un rato." }, 429);

  const historial = [...sesion.turnos, { rol: "usuario" as const, texto: mensaje }];

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

  // Lead del píxel: al calificar o al dejar el WhatsApp, una sola vez.
  let eventoLead = false;
  if (!sesion.lead && (s.estado === "califica" || s.whatsapp)) {
    sesion.lead = true;
    eventoLead = true;
  }

  // FW Central: la primera vez que hay WhatsApp. No bloquea la respuesta más de 8 s.
  if (s.whatsapp && !sesion.enCrm) {
    const r = await cargarLead(sesion, s);
    // Si está apagado se marca igual: no tiene sentido reintentar en cada turno.
    sesion.enCrm = r !== "error";
  }

  // Mail a Faustino la primera vez que deja WhatsApp: el agente promete que él le escribe.
  if (s.whatsapp && !sesion.avisado) {
    sesion.avisado = (await avisarFaustino(sesion, s)) !== "error";
  }

  return json({
    sesion: firmar(sesion),
    mensaje: s.mensaje,
    estado: s.estado,
    mostrarAgenda: s.mostrar_agenda,
    nombre: s.nombre,
    restantes: MAX_MENSAJES - delUsuario - 1,
    evento: { lead: eventoLead },
  });
}
