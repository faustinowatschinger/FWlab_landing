/**
 * Alta del lead del chat en FW Central.
 *
 * APAGADO POR DEFECTO. Solo escribe con `CHAT_CRM_ACTIVO=1` y `FW_CENTRAL_API_TOKEN`.
 * Sin eso registra en el log que no lo cargó y no toca nada.
 *
 * Mismo patrón que /mapa-operativo (ver su README y projects/CLAUDE.md):
 *   POST {FW_CENTRAL_URL}/api/v1/empresas   { "empresas": [ { ... } ] }
 * con `segmento: "inbound-meta-chat"`. Es el mismo handler que la operación
 * `crearEmpresas` de `POST /api/v1/empresas`. El token necesita alcance `crm` con
 * escritura. Si FW Central falla, el chat sigue y el fallo queda en el log.
 *
 * Límites de la API de hoy:
 * - Deduplica por nombre+país, web y teléfono. Si el número ya estaba en el CRM
 *   (por ejemplo, un lead que ya se llamó), devuelve `duplicadas: 1` y lo del
 *   chat NO se guarda. Por eso el número va también en `telefono`.
 * - El PATCH que usa /mapa-operativo para sumar contexto busca por email, y el
 *   chat no pide email: lo que pase en el chat después del alta no llega al CRM.
 */
import type { Sesion } from "./sesion";
import type { Salida } from "./reglas";

const URL_CRM = () => process.env.FW_CENTRAL_URL ?? "https://panel.fwlabsllc.com";
export const CRM_ACTIVO = () => process.env.CHAT_CRM_ACTIVO === "1";

export function armarAlta(sesion: Sesion, s: Salida) {
  const fecha = new Date().toISOString().slice(0, 10);
  const nombre = s.negocio?.trim() || `${s.nombre?.trim() || "Sin nombre"} (chat Fawel ${fecha})`;
  const transcripcion = sesion.turnos
    .map((t) => `${t.rol === "usuario" ? "Lead" : "Fawel"}: ${t.texto}`)
    .join("\n");
  const origen = Object.entries(sesion.origen)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
  const notas = [
    `Chat de /chat (Fawel), ${fecha}. Sesión ${sesion.id}.`,
    `Estado: ${s.estado}. Persona: ${s.nombre ?? "sin dato"}. Rubro: ${s.rubro ?? "sin dato"}.`,
    `Consultas por día: ${s.consultas_por_dia ?? "sin dato"}. Ticket: ${s.ticket ?? "sin dato"} (alto: ${s.ticket_alto ?? "sin dato"}).`,
    `Qué pasa hoy: ${s.dolor ?? "sin dato"}.`,
    origen ? `Origen: ${origen}.` : null,
    "",
    "Conversación:",
    transcripcion,
  ]
    .filter((l) => l !== null)
    .join("\n")
    .slice(0, 9500);

  return {
    empresas: [
      {
        nombre: nombre.slice(0, 300),
        whatsapp: s.whatsapp,
        telefono: s.whatsapp,
        rubros: s.rubro ? [s.rubro.slice(0, 120)] : null,
        segmento: "inbound-meta-chat",
        notas,
      },
    ],
  };
}

export async function cargarLead(sesion: Sesion, s: Salida): Promise<"cargado" | "apagado" | "error"> {
  const cuerpo = armarAlta(sesion, s);
  const token = process.env.FW_CENTRAL_API_TOKEN;

  if (!CRM_ACTIVO() || !token) {
    console.log("[chat] CRM apagado (CHAT_CRM_ACTIVO o token): este lead NO se cargó", {
      sesion: sesion.id,
      estado: s.estado,
    });
    return "apagado";
  }

  try {
    const res = await fetch(`${URL_CRM()}/api/v1/empresas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[chat] el CRM rechazó el lead", { status: res.status, cuerpo: (await res.text()).slice(0, 300), sesion: sesion.id });
      return "error";
    }
    console.log("[chat] lead en el CRM:", { sesion: sesion.id, respuesta: (await res.text()).slice(0, 200) });
    return "cargado";
  } catch (e) {
    console.error("[chat] no se pudo cargar el lead", { sesion: sesion.id, error: e });
    return "error";
  }
}
