/**
 * Cotización del dólar en vivo para el piso de ticket (reglas.ts).
 *
 * Fuente: dolarapi.com, pública y sin clave. Casa por CHAT_DOLAR_CASA
 * (default "bolsa", el MEP); se usa el precio de venta. Se guarda una hora en
 * memoria. Si la API no contesta en 2,5 s o devuelve algo raro, queda la última
 * cotización buena o, si nunca hubo, CHAT_ARS_POR_USD como respaldo.
 */
import { fijarCotizacion } from "./reglas";

const UNA_HORA = 60 * 60 * 1000;
let ultima: { valor: number; cuando: number } | null = null;

export async function refrescarCotizacion(): Promise<number | null> {
  if (ultima && Date.now() - ultima.cuando < UNA_HORA) return ultima.valor;
  const casa = (process.env.CHAT_DOLAR_CASA || "bolsa").replace(/[^a-z]/g, "");
  try {
    const res = await fetch(`https://dolarapi.com/v1/dolares/${casa}`, {
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const datos = (await res.json()) as { venta?: unknown };
    const venta = Number(datos.venta);
    // Rango de cordura: evita usar un valor roto si la API cambia de formato.
    if (!Number.isFinite(venta) || venta < 100 || venta > 100000) throw new Error(`venta fuera de rango: ${datos.venta}`);
    ultima = { valor: venta, cuando: Date.now() };
  } catch (e) {
    console.error("[chat] no se pudo leer la cotización; queda la anterior o CHAT_ARS_POR_USD", String(e));
    if (ultima) ultima = { ...ultima, cuando: Date.now() - UNA_HORA + 5 * 60 * 1000 }; // reintenta en 5 min
  }
  fijarCotizacion(ultima?.valor ?? null);
  return ultima?.valor ?? null;
}
