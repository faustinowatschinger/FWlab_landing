/**
 * Guarda cada conversación de /chat en FW Central, haya o no dejado WhatsApp,
 * para poder leer dónde abandona la gente y por qué no califica.
 *
 * Operación `guardarConversacionChat` de POST {FW_CENTRAL_URL}/api/v1/exec
 * (upsert por id de sesión; si llega una versión con menos turnos, no pisa).
 * Se manda en cada turno, después de responder (after), con el mismo interruptor
 * que el alta de leads: CHAT_CRM_ACTIVO=1 y FW_CENTRAL_API_TOKEN (alcance crm con
 * escritura). Si falla, queda en el log sin datos personales y el chat sigue.
 */
import { CRM_ACTIVO, URL_CRM } from "./crm";
import type { Salida } from "./reglas";
import type { Sesion } from "./sesion";

const MAX_TURNOS = 80;
const MAX_TEXTO = 4000;

export async function guardarConversacion(
  sesion: Sesion,
  s: Salida,
  mostroAgenda: boolean,
): Promise<"guardada" | "apagado" | "error"> {
  const token = process.env.FW_CENTRAL_API_TOKEN;
  if (!CRM_ACTIVO() || !token) return "apagado";

  const turnos = sesion.turnos.slice(-MAX_TURNOS).map((t) => ({ rol: t.rol, texto: t.texto.slice(0, MAX_TEXTO) }));
  const args = {
    sesionId: sesion.id,
    estado: s.estado,
    turnos,
    datos: {
      rubro: s.rubro,
      negocio: s.negocio,
      nombre: s.nombre,
      whatsapp: s.whatsapp,
      consultas_por_dia: s.consultas_por_dia,
      ticket: s.ticket,
      ticket_monto: s.ticket_monto,
      ticket_moneda: s.ticket_moneda,
      ticket_alto: s.ticket_alto,
      dolor: s.dolor,
    },
    origen: sesion.origen,
    mostroAgenda,
    creada: new Date(sesion.creada).toISOString(),
  };

  try {
    const res = await fetch(`${URL_CRM()}/api/v1/exec`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ operacion: "guardarConversacionChat", args }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("[chat] FW Central no guardó la conversación", { status: res.status, sesion: sesion.id });
      return "error";
    }
    return "guardada";
  } catch (e) {
    console.error("[chat] no se pudo guardar la conversación", { sesion: sesion.id, error: String(e).slice(0, 120) });
    return "error";
  }
}
