"use server";

import { headers } from "next/headers";
import OpenAI from "openai";
import nodemailer from "nodemailer";

import {
  CIERRE,
  MAX_GENERADAS,
  MAX_TEXTO_CORTO,
  MAX_TITULO_GENERADO,
  RONDA_1,
  type Contacto,
  type MapaOperativo,
  type Pregunta,
  type PreguntaGenerada,
  type Respuestas,
} from "./preguntas";
import { SCHEMA, SCHEMA_RONDA_2, SISTEMA, SISTEMA_RONDA_2 } from "./prompts";

/**
 * GPT-5.6 salió el 2026-07-09 en tres variantes: luna, terra y sol (de menos a
 * más capaz). Cada llamada usa la suya, y la diferencia no es de gusto:
 *
 * - **Preguntas (`luna`)**: es la llamada que paga TODO el que arranca la
 *   entrevista, incluidos los que abandonan antes de dejar el contacto. Escribir
 *   preguntas sobre una operación que ya te contaron es una tarea acotada, y en
 *   pruebas con tres rubros distintos luna la resuelve bien. Es el lugar donde
 *   el ahorro no cuesta calidad.
 * - **Informe (`terra`)**: solo lo paga el que llegó hasta el final, o sea un
 *   lead real. Desde que el informe pasó de resumir el problema a dar criterio
 *   (qué hacer, en qué orden, qué NO hacer), la tarea es mucho más difícil, y un
 *   plan genérico es peor que ningún plan: prueba lo contrario de lo que el
 *   informe intenta demostrar. Si hace falta más profundidad, `sol`.
 *
 * Ojo con bajar el de preguntas sin mirar el resultado: las preguntas son el
 * input del informe. Preguntas flojas ensucian el informe aunque lo escriba un
 * modelo más capaz.
 */
const MODELO_PREGUNTAS = process.env.OPENAI_MODEL_PREGUNTAS ?? "gpt-5.6-luna";
const MODELO = process.env.OPENAI_MODEL ?? "gpt-5.6-terra";

/* ══════════════════════════════════════════════════════════════════════════
 * Armado del contexto
 * ══════════════════════════════════════════════════════════════════════════ */

function bloque(preguntas: readonly { id: string; titulo: string }[], respuestas: Respuestas) {
  return preguntas
    .map((p) => {
      const r = respuestas[p.id];
      const valor = Array.isArray(r) ? r.join("; ") : r;
      return `${p.titulo}\n→ ${valor || "(sin responder)"}`;
    })
    .join("\n\n");
}

/** Solo la ronda 1: es lo único que existe cuando se generan las preguntas. */
function contextoRonda1(respuestas: Respuestas): string {
  return bloque(RONDA_1, respuestas);
}

/** Todo, para el informe. */
function contextoCompleto(
  ronda1: Respuestas,
  generadas: PreguntaGenerada[],
  ronda2: Respuestas,
  contacto: Contacto,
): string {
  return [
    `Empresa: ${contacto.empresa}`,
    "",
    "═══ LO QUE CONTÓ DE SU EMPRESA ═══",
    contextoRonda1(ronda1),
    "",
    "═══ LO QUE RESPONDIÓ SOBRE SU OPERACIÓN ═══",
    "(preguntas escritas específicamente para esta empresa a partir de lo de arriba)",
    "",
    bloque(generadas, ronda2),
    "",
    "═══ CIERRE ═══",
    bloque(CIERRE, ronda2),
  ].join("\n");
}

/* ══════════════════════════════════════════════════════════════════════════
 * Rate limit
 * ══════════════════════════════════════════════════════════════════════════
 *
 * Best-effort, en memoria. Se reinicia con cada deploy y no se comparte entre
 * instancias: alcanza para frenar un F5 insistente, no un ataque distribuido.
 * Si el volumen crece, mover a Redis o al middleware del hosting.
 *
 * Dos límites, porque protegen cosas distintas:
 *  - por IP: evita que una persona repita el formulario en loop.
 *  - global: es lo ÚNICO que protege la cuenta de OpenAI si el tráfico viene de
 *    muchas IPs. Sin esto el gasto no tiene techo.
 *
 * ⚠️ Desde la entrevista de dos rondas, UNA sesión completa consume DOS cupos
 * (generar las preguntas + generar el informe). Los números se releyeron con eso
 * en cuenta:
 *  - global 60 = 30 sesiones completas por hora. Se mantuvo el 60 y no se duplicó
 *    a propósito: el techo existe para acotar el GASTO, y el gasto por llamada no
 *    cambió. 30 leads inbound en una hora sigue siendo un pico enorme.
 *  - por IP 20 = 10 sesiones, que era el número anterior. Arrancó en 3 y era
 *    demasiado bajo: una oficina entera sale por una sola IP, así que dos
 *    personas de la misma empresa se bloqueaban entre ellas — y quien contesta
 *    esta entrevista es exactamente el lead que no querés rechazar.
 *
 * En desarrollo no aplica ninguno de los dos.
 */
const VENTANA_MS = 60 * 60 * 1000;
const MAX_POR_IP = Number(process.env.MAPA_MAX_POR_IP ?? 20);
const MAX_GLOBAL = Number(process.env.MAPA_MAX_GLOBAL ?? 60);
const EN_DESARROLLO = process.env.NODE_ENV !== "production";

const visitas = new Map<string, number[]>();
let globales: number[] = [];

type Corte = "ip" | "global" | null;

function pasaRateLimit(ip: string): Corte {
  if (EN_DESARROLLO) return null;
  const ahora = Date.now();

  globales = globales.filter((t) => ahora - t < VENTANA_MS);
  if (globales.length >= MAX_GLOBAL) {
    console.error(
      `[mapa-operativo] TECHO GLOBAL alcanzado (${MAX_GLOBAL}/h). Puede ser tracción o abuso: revisar antes de subirlo.`,
    );
    return "global";
  }

  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= MAX_POR_IP) {
    visitas.set(ip, previas);
    return "ip";
  }

  previas.push(ahora);
  visitas.set(ip, previas);
  globales.push(ahora);
  if (visitas.size > 5000) visitas.clear();
  return null;
}

async function ipDelVisitante(): Promise<string> {
  const cabeceras = await headers();
  return (
    cabeceras.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    cabeceras.get("x-real-ip") ||
    "desconocida"
  );
}

const ERROR_POR_IP =
  "Desde tu conexión ya se generaron varios análisis en la última hora. Probá de nuevo más tarde.";
const ERROR_GLOBAL = "Estamos con mucha demanda en este momento. Probá en un rato.";

// Contador aparte para las altas en el CRM (`registrarContacto`). No gasta
// modelo, así que no compite por el cupo de OpenAI — pero es un endpoint público
// que escribe en el CRM y sin techo alguien podría llenarlo de basura.
const MAX_ALTAS_POR_IP = Number(process.env.MAPA_MAX_ALTAS_POR_IP ?? 20);
const altas = new Map<string, number[]>();

function pasaLimiteAltas(ip: string): boolean {
  if (EN_DESARROLLO) return true;
  const ahora = Date.now();
  const previas = (altas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= MAX_ALTAS_POR_IP) {
    altas.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  altas.set(ip, previas);
  if (altas.size > 5000) altas.clear();
  return true;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Validación
 * ══════════════════════════════════════════════════════════════════════════ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Un teléfono usable: al menos 7 dígitos, ignorando espacios y símbolos. */
const digitos = (s: string) => (s.match(/\d/g) ?? []).length;

/**
 * Valida respuestas contra preguntas que SÍ existen en el código. Las cerradas
 * se chequean contra su lista blanca: el cliente no decide qué texto llega al
 * prompt.
 */
function validarFijas(preguntas: readonly Pregunta[], respuestas: Respuestas): string | null {
  for (const p of preguntas) {
    const r = respuestas[p.id];
    if (p.tipo === "texto") {
      if (typeof r !== "string" || !r.trim()) return "Faltan preguntas por responder.";
      if (r.length > (p.max ?? MAX_TEXTO_CORTO))
        return "Una de las respuestas es demasiado larga.";
      continue;
    }
    const valores = Array.isArray(r) ? r : typeof r === "string" ? [r] : [];
    if (valores.length === 0) return "Faltan preguntas por responder.";
    if (valores.some((v) => !p.opciones.includes(v)))
      return "Hay una respuesta que no corresponde a las opciones.";
  }
  return null;
}

/**
 * Valida las preguntas generadas y sus respuestas.
 *
 * ⚠️ Acá no hay lista blanca posible: las opciones las escribió el modelo, no
 * están en el código, y el cliente las devuelve junto con las respuestas. Un
 * atacante puede fabricar preguntas propias y mandarlas.
 *
 * La defensa es la misma que la del campo abierto, que ya existía: topes duros
 * de cantidad y de largo (acota cuánto texto arbitrario puede empujar al prompt)
 * más la sección del prompt que declara todo el texto del usuario como dato y no
 * como instrucción. El schema strict del informe limita el resto: por más que
 * alguien logre torcer el contenido, la salida sigue teniendo la misma forma y
 * termina en la pantalla de esa misma persona.
 */
function validarGeneradas(
  generadas: unknown,
  respuestas: Respuestas,
): { ok: false; error: string } | { ok: true; preguntas: PreguntaGenerada[] } {
  const mal = (error: string) => ({ ok: false as const, error });

  if (!Array.isArray(generadas)) return mal("Faltan las preguntas de la segunda ronda.");
  if (generadas.length === 0 || generadas.length > MAX_GENERADAS)
    return mal("La segunda ronda de preguntas no es válida.");

  const limpias: PreguntaGenerada[] = [];
  for (const g of generadas) {
    if (!g || typeof g !== "object") return mal("La segunda ronda de preguntas no es válida.");
    const p = g as Record<string, unknown>;
    if (typeof p.id !== "string" || typeof p.titulo !== "string")
      return mal("La segunda ronda de preguntas no es válida.");
    if (p.titulo.length > MAX_TITULO_GENERADO)
      return mal("La segunda ronda de preguntas no es válida.");
    if (p.tipo !== "unica" && p.tipo !== "multiple" && p.tipo !== "texto")
      return mal("La segunda ronda de preguntas no es válida.");

    const opciones = Array.isArray(p.opciones) ? p.opciones : [];
    if (opciones.length > 12) return mal("La segunda ronda de preguntas no es válida.");
    if (opciones.some((o) => typeof o !== "string" || o.length > MAX_TITULO_GENERADO))
      return mal("La segunda ronda de preguntas no es válida.");

    const r = respuestas[p.id];
    if (p.tipo === "texto") {
      if (typeof r !== "string" || !r.trim()) return mal("Faltan preguntas por responder.");
      if (r.length > MAX_TEXTO_CORTO) return mal("Una de las respuestas es demasiado larga.");
    } else {
      const valores = Array.isArray(r) ? r : typeof r === "string" ? [r] : [];
      if (valores.length === 0) return mal("Faltan preguntas por responder.");
      if (valores.some((v) => !opciones.includes(v)))
        return mal("Hay una respuesta que no corresponde a las opciones.");
    }

    limpias.push({
      id: p.id,
      titulo: p.titulo,
      ayuda: typeof p.ayuda === "string" ? p.ayuda.slice(0, MAX_TITULO_GENERADO) : "",
      tipo: p.tipo,
      opciones: opciones as string[],
    });
  }
  return { ok: true, preguntas: limpias };
}

function validarContacto(contacto: Contacto): string | null {
  if (!contacto?.nombre?.trim()) return "Falta tu nombre.";
  if (!contacto.empresa?.trim()) return "Falta el nombre de la empresa.";
  if (!EMAIL_RE.test(contacto.email?.trim() ?? "")) return "El mail no parece válido.";
  // Obligatorio: buena parte del valor de este sistema es poder llamar al que no
  // escribe después de leer el informe.
  if (!contacto.telefono?.trim()) return "Falta tu teléfono.";
  if (digitos(contacto.telefono) < 7) return "El teléfono no parece válido.";
  if (contacto.nombre.length > 120 || contacto.empresa.length > 160 || contacto.telefono.length > 40)
    return "Hay campos demasiado largos.";
  return null;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Action 1 — generar la ronda 2
 * ══════════════════════════════════════════════════════════════════════════ */

export type ResultadoRonda2 =
  | { ok: true; preguntas: PreguntaGenerada[] }
  | { ok: false; error: string };

export async function generarRonda2(ronda1: Respuestas): Promise<ResultadoRonda2> {
  // Una Server Action es un endpoint público: se valida acá, no en el cliente.
  const invalido = validarFijas(RONDA_1, ronda1);
  if (invalido) return { ok: false, error: invalido };

  const corte = pasaRateLimit(await ipDelVisitante());
  if (corte === "ip") return { ok: false, error: ERROR_POR_IP };
  if (corte === "global") return { ok: false, error: ERROR_GLOBAL };

  if (!process.env.OPENAI_API_KEY) {
    console.error("[mapa-operativo] falta OPENAI_API_KEY");
    return { ok: false, error: "No pudimos seguir ahora mismo." };
  }

  try {
    const client = new OpenAI();
    const respuesta = await client.responses.create({
      model: MODELO_PREGUNTAS,
      instructions: SISTEMA_RONDA_2,
      input: contextoRonda1(ronda1),
      max_output_tokens: 4000,
      text: {
        format: {
          type: "json_schema",
          name: "ronda_2",
          schema: SCHEMA_RONDA_2 as unknown as Record<string, unknown>,
          strict: true,
        },
      },
    });

    if (respuesta.status === "incomplete") {
      console.error("[mapa-operativo] ronda 2 incompleta:", respuesta.incomplete_details);
      return { ok: false, error: "No pudimos seguir ahora mismo." };
    }

    const rechazo = respuesta.output
      .filter((item) => item.type === "message")
      .flatMap((item) => item.content)
      .find((parte) => parte.type === "refusal");
    if (rechazo) {
      console.error("[mapa-operativo] refusal en ronda 2:", rechazo);
      return { ok: false, error: "No pudimos generar las preguntas con esos datos." };
    }

    const texto = respuesta.output_text;
    if (!texto) throw new Error(`sin texto de salida (status: ${respuesta.status})`);

    const salida = JSON.parse(texto) as {
      procesos_detectados: string[];
      preguntas: {
        titulo: string;
        ayuda: string;
        tipo: "unica" | "multiple" | "texto";
        opciones: string[];
        por_que: string;
      }[];
    };

    console.log("[mapa-operativo] ronda 2 generada:", {
      procesos: salida.procesos_detectados,
      preguntas: salida.preguntas.map((p) => `${p.titulo} [${p.por_que}]`),
    });

    // Los ids los pone el servidor, no el modelo: así no hay colisiones ni
    // dependemos de que invente slugs únicos.
    const preguntas: PreguntaGenerada[] = salida.preguntas
      .slice(0, MAX_GENERADAS)
      .map((p, i) => ({
        id: `g${i + 1}`,
        titulo: p.titulo,
        ayuda: p.ayuda ?? "",
        tipo: p.tipo,
        opciones: p.tipo === "texto" ? [] : (p.opciones ?? []),
      }))
      // Una cerrada sin opciones es incontestable: se descarta antes de mostrarla.
      .filter((p) => p.tipo === "texto" || p.opciones.length >= 2);

    if (preguntas.length === 0) {
      console.error("[mapa-operativo] la ronda 2 vino vacía o inservible");
      return { ok: false, error: "No pudimos generar las preguntas ahora mismo." };
    }

    return { ok: true, preguntas };
  } catch (e) {
    console.error("[mapa-operativo] error generando la ronda 2:", e);
    return { ok: false, error: "Se cayó algo de nuestro lado. Probá de nuevo en un minuto." };
  }
}

/* ══════════════════════════════════════════════════════════════════════════
 * Persistencia del lead
 * ══════════════════════════════════════════════════════════════════════════ */

function mapaATexto(mapa: MapaOperativo): string {
  const bloques = [
    mapa.titular,
    "",
    "1. CÓMO FUNCIONAN HOY TUS PROCESOS",
    ...mapa.procesos.map(
      (i) => `- ${i.proceso}\n  Hoy: ${i.como_funciona_hoy}\n  Se corta en: ${i.donde_se_corta}`,
    ),
    "",
    "2. DE QUÉ DEPENDE QUE ESTO SIGA FUNCIONANDO",
    ...mapa.riesgos.map((i) => `- ${i.que}\n  ${i.impacto}`),
    "",
    "3. QUÉ SE PUEDE RESOLVER",
    ...mapa.oportunidades.map(
      (i) => `- ${i.que} [${i.esfuerzo}]\n  Cómo: ${i.como}\n  Impacto: ${i.impacto}`,
    ),
    "",
    "4. DÓNDE ENTRA LA IA Y CUÁNDO",
    ...mapa.criterio_ia.map(
      (i) => `- ${i.caso}: ${i.veredicto}\n  ${i.por_que}\n  Cuándo: ${i.cuando}`,
    ),
    "",
    "5. LO QUE NO HARÍA",
    ...mapa.lo_que_no_haria.map((i) => `- ${i.que}\n  ${i.por_que}`),
    "",
    "6. EL CAMINO, PASO POR PASO",
    ...mapa.orden.map((i, n) => `${n + 1}. ${i.que}\n   ${i.por_que}`),
    "",
    "DÓNDE TERMINÁS",
    mapa.destino,
    "",
    mapa.cierre,
  ];
  return bloques.join("\n");
}

/**
 * El CRM de FW Central, vía su API de integración (Bearer token).
 *
 * El lead se escribe DOS veces y a propósito:
 *
 *  1. `altaEnCrm` — apenas deja sus datos, a mitad de la entrevista. Es lo que
 *     garantiza que el que abandona la ronda 2 igual quede en el CRM con su
 *     teléfono. Va con las respuestas de la ronda 1: alcanza para llamarlo.
 *  2. `sumarInformeAlCrm` — cuando termina. Appendea la ronda 2 y el informe al
 *     mismo registro con `PATCH /api/v1/empresas`.
 *
 * El PATCH existe porque el POST no sirve para la segunda parte: `crearEmpresasBulk`
 * DESCARTA los duplicados en vez de actualizarlos, así que un segundo POST con el
 * informe se perdería entero. Si el PATCH devuelve 404 (el alta de la primera
 * etapa no llegó a entrar), se cae al alta normal para no perder nada.
 *
 * Ninguna de las dos bloquea al visitante: si el CRM está caído, la entrevista
 * sigue y el fallo queda en el log.
 */
const CRM_BASE = () => process.env.FW_CENTRAL_URL ?? "https://panel.fwlabsllc.com";

function tokenCrm(contacto: Contacto): string | null {
  const token = process.env.FW_CENTRAL_API_TOKEN;
  if (!token) {
    console.error("[mapa-operativo] sin FW_CENTRAL_API_TOKEN: lead NO cargado al CRM", {
      empresa: contacto.empresa,
      email: contacto.email,
    });
    return null;
  }
  return token;
}

async function altaEnCrm(contacto: Contacto, notas: string, rubro: unknown) {
  const token = tokenCrm(contacto);
  if (!token) return;

  try {
    const res = await fetch(`${CRM_BASE()}/api/v1/empresas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        empresas: [
          {
            nombre: contacto.empresa,
            email: contacto.email,
            telefono: contacto.telefono || null,
            rubros: typeof rubro === "string" ? [rubro] : (rubro ?? null),
            segmento: "inbound-web",
            notas: notas.slice(0, 9500), // el endpoint corta en 10.000
          },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("[mapa-operativo] el CRM rechazó el lead", {
        status: res.status,
        cuerpo: (await res.text()).slice(0, 300),
        empresa: contacto.empresa,
        email: contacto.email,
      });
      return;
    }

    const r = (await res.json()) as { creadas?: number; duplicadas?: number };
    console.log("[mapa-operativo] alta en el CRM:", {
      empresa: contacto.empresa,
      creadas: r.creadas,
      duplicadas: r.duplicadas,
    });
  } catch (e) {
    console.error("[mapa-operativo] no se pudo dar de alta el lead", {
      empresa: contacto.empresa,
      email: contacto.email,
      error: e,
    });
  }
}

async function sumarInformeAlCrm(contacto: Contacto, notas: string, rubro: unknown) {
  const token = tokenCrm(contacto);
  if (!token) return;

  try {
    const res = await fetch(`${CRM_BASE()}/api/v1/empresas`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email: contacto.email, notas: notas.slice(0, 19000) }),
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) {
      // El alta de la primera etapa nunca entró (CRM caído en ese momento, o el
      // visitante llegó por un camino raro). Se crea ahora con todo.
      console.warn("[mapa-operativo] el lead no estaba en el CRM: se da de alta con el informe", {
        empresa: contacto.empresa,
      });
      await altaEnCrm(contacto, notas, rubro);
      return;
    }

    if (!res.ok) {
      console.error("[mapa-operativo] el CRM rechazó el informe", {
        status: res.status,
        cuerpo: (await res.text()).slice(0, 300),
        empresa: contacto.empresa,
        email: contacto.email,
      });
      return;
    }

    const r = (await res.json()) as { id?: string; largo?: number };
    console.log("[mapa-operativo] informe sumado al lead:", {
      empresa: contacto.empresa,
      id: r.id,
      largo: r.largo,
    });
  } catch (e) {
    console.error("[mapa-operativo] no se pudo sumar el informe al lead", {
      empresa: contacto.empresa,
      email: contacto.email,
      error: e,
    });
  }
}


/**
 * Red de contención SOLO en desarrollo: guarda cada envío completo (entrevista
 * + informe) en un JSONL de /tmp.
 *
 * Existe porque probando se perdió un envío real: el CRM local estaba apagado y
 * el SMTP no anda, así que el único registro del informe era la pantalla del
 * browser. En producción no corre — ahí el que persiste es el CRM.
 */
async function guardarCopiaLocal(contacto: Contacto, contexto: string, mapa: MapaOperativo) {
  if (!EN_DESARROLLO) return;
  try {
    const [{ appendFile }, { join }, { tmpdir }] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
      import("node:os"),
    ]);
    const ruta = join(tmpdir(), "mapa-operativo-envios.jsonl");
    const linea = JSON.stringify({
      fecha: new Date().toISOString(),
      contacto,
      entrevista: contexto,
      mapa,
    });
    await appendFile(ruta, linea + "\n", "utf8");
    console.log(`[mapa-operativo] copia local guardada en ${ruta}`);
  } catch (e) {
    console.error("[mapa-operativo] no se pudo guardar la copia local:", e);
  }
}

async function enviarMails(contacto: Contacto, contexto: string, mapa: MapaOperativo) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("[mapa-operativo] SMTP sin configurar: lead NO notificado", {
      empresa: contacto.empresa,
      email: contacto.email,
    });
    return;
  }

  const transporte = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const desde = CONTACT_FROM_EMAIL ?? SMTP_USER;
  const texto = mapaATexto(mapa);

  // Lead nuevo para Faustino.
  const aviso = transporte.sendMail({
    from: desde,
    to: CONTACT_TO_EMAIL,
    replyTo: contacto.email,
    subject: `Diagnóstico web — ${contacto.empresa} (${contacto.nombre})`,
    text: [
      `Nombre: ${contacto.nombre}`,
      `Empresa: ${contacto.empresa}`,
      `Mail: ${contacto.email}`,
      `Teléfono: ${contacto.telefono}`,
      "",
      "--- LA ENTREVISTA ---",
      contexto,
      "",
      "--- INFORME GENERADO ---",
      texto,
    ].join("\n"),
  });

  // Copia para el lead: es lo que justifica haberle pedido los datos.
  const copia = transporte.sendMail({
    from: desde,
    to: contacto.email,
    subject: `Tu mapa operativo — ${contacto.empresa}`,
    text: [
      `${contacto.nombre}, acá va el análisis que salió de lo que contaste.`,
      "",
      texto,
      "",
      "---",
      "Si querés ver qué se ordena primero: https://calendly.com/fwlabs/llamada-gratuita",
      "Faustino Watschinger — FW Labs",
    ].join("\n"),
  });

  const [r1, r2] = await Promise.allSettled([aviso, copia]);
  if (r1.status === "rejected") {
    console.error("[mapa-operativo] LEAD PERDIDO, falló el aviso:", {
      empresa: contacto.empresa,
      email: contacto.email,
      error: r1.reason,
    });
  }
  if (r2.status === "rejected") {
    console.error("[mapa-operativo] falló la copia al lead:", r2.reason);
  }
  // También se loguea el éxito: si solo se registrara el fallo, "no hay error en
  // el log" sería una inferencia y no un hecho. Con esto se puede afirmar que el
  // informe salió, que es lo que se le prometió al visitante en pantalla.
  if (r1.status === "fulfilled" || r2.status === "fulfilled") {
    console.log("[mapa-operativo] mails enviados:", {
      empresa: contacto.empresa,
      aviso: r1.status === "fulfilled" ? "ok" : "falló",
      copiaAlLead: r2.status === "fulfilled" ? "ok" : "falló",
    });
  }
}

/* ══════════════════════════════════════════════════════════════════════════
 * Action 2 — generar el informe
 * ══════════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════════════
 * Action intermedia — registrar el contacto apenas lo deja
 * ══════════════════════════════════════════════════════════════════════════ */

/**
 * Da de alta el lead en el CRM en el momento en que completa sus datos, a mitad
 * de la entrevista.
 *
 * Es la razón por la que el contacto está en el medio y no al final: sin esto,
 * el que abandona la ronda 2 se pierde entero aunque haya escrito su teléfono.
 * Con esto, el peor caso es un lead con las respuestas de la ronda 1 — que
 * alcanza de sobra para llamarlo.
 *
 * No devuelve nada útil al cliente a propósito: el visitante no tiene que
 * esperar al CRM ni enterarse si falló. Se dispara y sigue.
 */
export async function registrarContacto(
  ronda1: Respuestas,
  contacto: Contacto,
): Promise<void> {
  const invalido = validarContacto(contacto) ?? validarFijas(RONDA_1, ronda1);
  if (invalido) return;

  // Límite propio: esto escribe en el CRM sin gastar modelo, así que no tiene
  // que competir por el cupo de OpenAI, pero tampoco puede quedar abierto.
  if (!pasaLimiteAltas(await ipDelVisitante())) {
    console.error("[mapa-operativo] techo de altas por IP alcanzado");
    return;
  }

  const notas = [
    `Lead inbound del mapa operativo (${contacto.empresa}).`,
    `Contacto: ${contacto.nombre} · ${contacto.telefono}`,
    "",
    "⏳ ENTREVISTA EN CURSO — si no aparece el informe abajo, abandonó antes de terminarla.",
    "",
    "LO QUE CONTÓ DE SU EMPRESA",
    contextoRonda1(ronda1),
  ].join("\n");

  await altaEnCrm(contacto, notas, ronda1["rubro"]);
}

export type ResultadoAccion = { ok: true; mapa: MapaOperativo } | { ok: false; error: string };

export type EnvioMapa = {
  ronda1: Respuestas;
  /** Las preguntas que devolvió `generarRonda2`, tal cual se le mostraron. */
  generadas: PreguntaGenerada[];
  /** Respuestas de las generadas y de las de CIERRE, en un solo objeto. */
  ronda2: Respuestas;
  contacto: Contacto;
};

export async function generarMapa(envio: EnvioMapa): Promise<ResultadoAccion> {
  // Una Server Action es un endpoint público: se valida acá, no en el cliente.
  const { ronda1, ronda2, contacto } = envio;

  const errorContacto = validarContacto(contacto);
  if (errorContacto) return { ok: false, error: errorContacto };

  const errorRonda1 = validarFijas(RONDA_1, ronda1);
  if (errorRonda1) return { ok: false, error: errorRonda1 };

  const errorCierre = validarFijas(CIERRE, ronda2);
  if (errorCierre) return { ok: false, error: errorCierre };

  const generadas = validarGeneradas(envio.generadas, ronda2);
  if (!generadas.ok) return { ok: false, error: generadas.error };

  const corte = pasaRateLimit(await ipDelVisitante());
  if (corte === "ip") return { ok: false, error: ERROR_POR_IP };
  if (corte === "global") return { ok: false, error: ERROR_GLOBAL };

  if (!process.env.OPENAI_API_KEY) {
    console.error("[mapa-operativo] falta OPENAI_API_KEY");
    return { ok: false, error: "No pudimos generar el mapa ahora mismo." };
  }

  const contexto = contextoCompleto(ronda1, generadas.preguntas, ronda2, contacto);

  try {
    const client = new OpenAI();
    const respuesta = await client.responses.create({
      model: MODELO,
      instructions: SISTEMA,
      input: contexto,
      max_output_tokens: 8000,
      text: {
        format: {
          type: "json_schema",
          name: "mapa_operativo",
          schema: SCHEMA as unknown as Record<string, unknown>,
          strict: true,
        },
      },
    });

    // Se cortó por límite de tokens o filtro: no hay JSON completo que parsear.
    if (respuesta.status === "incomplete") {
      console.error("[mapa-operativo] respuesta incompleta:", respuesta.incomplete_details);
      return { ok: false, error: "No pudimos generar el mapa ahora mismo." };
    }

    // Solo los items `message` traen texto o rechazo; el resto (razonamiento,
    // llamadas a tools) tiene otra forma de content.
    const rechazo = respuesta.output
      .filter((item) => item.type === "message")
      .flatMap((item) => item.content)
      .find((parte) => parte.type === "refusal");
    if (rechazo) {
      console.error("[mapa-operativo] refusal:", rechazo);
      return { ok: false, error: "No pudimos generar el mapa con esos datos." };
    }

    const texto = respuesta.output_text;
    if (!texto) {
      throw new Error(`sin texto de salida (status: ${respuesta.status})`);
    }

    const mapa = JSON.parse(texto) as MapaOperativo;

    // Lo que se le suma al lead que ya se dio de alta cuando dejó sus datos: la
    // ronda 2 (que en ese momento todavía no existía) y el informe.
    const cierre = [
      "✅ ENTREVISTA COMPLETA",
      "",
      "LO QUE RESPONDIÓ SOBRE SU OPERACIÓN",
      "(preguntas escritas específicamente para esta empresa)",
      "",
      bloque(generadas.preguntas, ronda2),
      "",
      "CIERRE",
      bloque(CIERRE, ronda2),
      "",
      "INFORME QUE SE LE DEVOLVIÓ",
      mapaATexto(mapa),
    ].join("\n");

    // Ni el mail ni el CRM deben tirarle un error al usuario si fallan: el mapa
    // ya está generado y se lo devolvemos igual. Cada uno loguea lo suyo.
    await Promise.allSettled([
      enviarMails(contacto, contexto, mapa),
      sumarInformeAlCrm(contacto, cierre, ronda1["rubro"]),
      guardarCopiaLocal(contacto, contexto, mapa),
    ]);

    return { ok: true, mapa };
  } catch (e) {
    console.error("[mapa-operativo] error generando el mapa:", e);
    return {
      ok: false,
      error: "Se cayó algo de nuestro lado. Probá de nuevo en un minuto.",
    };
  }
}
