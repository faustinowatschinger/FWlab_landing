/**
 * Límites de uso compartidos entre instancias, para todo lo que gasta modelo
 * (/api/chat y /mapa-operativo).
 *
 * Por qué existe: la landing corre en Vercel, donde hay varias instancias de la
 * función y se reciclan. Un contador en memoria vale solo para la instancia que
 * lo lleva, así que un script con requests concurrentes se reparte entre varias
 * y el "techo global" deja de ser un techo. Acá el contador vive en Redis.
 *
 * - Con `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (o los
 *   `KV_REST_API_*` que inyecta la integración de Vercel) cuenta en Redis, por
 *   la API REST de Upstash: sin dependencia nueva y sin conexiones abiertas.
 * - Sin esas variables, o si Redis no contesta en 1,5 s, cuenta en memoria como
 *   antes. Es a propósito: un Redis caído no puede tirar el chat. El tope de
 *   gasto de la cuenta de OpenAI es la red que queda debajo.
 *
 * Ventana fija: la clave lleva el número de ventana, así que en el borde entre
 * dos ventanas puede pasar hasta el doble. Para un techo de gasto alcanza.
 *
 * Todas las reglas de una llamada se revisan y se cuentan juntas (un script,
 * un viaje): si una corta, no se cuenta ninguna. Así un abusador que ya está
 * frenado por su IP no le consume el cupo global a los demás.
 */
import { createHash } from "node:crypto";

export type Regla = {
  /** Nombre corto de la regla; es lo que vuelve en `corte`. */
  nombre: string;
  /** Qué se cuenta: "chat:ip:<hash>", "chat:global", etc. Sin la ventana. */
  clave: string;
  max: number;
  ventanaS: number;
  /**
   * Sin ventana de reloj: cuenta desde el primer uso y vence `ventanaS` después.
   * Para lo que tiene vida propia (una conversación), donde un cambio de
   * ventana a mitad de camino le regalaría otro cupo entero.
   */
  desdePrimerUso?: boolean;
};

export type Consumo =
  | { ok: true; cuentas: Record<string, number>; respaldo: boolean }
  | { ok: false; corte: string; respaldo: boolean };

export const HORA_S = 60 * 60;
export const DIA_S = 24 * HORA_S;

/** La IP no se guarda en claro en un servicio de terceros. */
export function huellaIp(ip: string): string {
  const sal = process.env.CHAT_SESSION_SECRET ?? "";
  return createHash("sha256").update(`${sal}:${ip}`).digest("base64url").slice(0, 16);
}

export function ipDe(cabeceras: { get(nombre: string): string | null }): string {
  return cabeceras.get("x-forwarded-for")?.split(",")[0]?.trim() || cabeceras.get("x-real-ip") || "desconocida";
}

function conVentana(r: Regla, ahoraMs: number): string {
  if (r.desdePrimerUso) return `lim:${r.clave}`;
  return `lim:${r.clave}:${Math.floor(ahoraMs / 1000 / r.ventanaS)}`;
}

/* ── Memoria ─────────────────────────────────────────────────────────────── */

const memoria = new Map<string, { n: number; vence: number }>();

export function consumirEnMemoria(reglas: Regla[], ahoraMs = Date.now()): Consumo {
  const claves = reglas.map((r) => conVentana(r, ahoraMs));
  for (let i = 0; i < reglas.length; i++) {
    const e = memoria.get(claves[i]);
    if (e && e.vence > ahoraMs && e.n >= reglas[i].max) return { ok: false, corte: reglas[i].nombre, respaldo: true };
  }
  const cuentas: Record<string, number> = {};
  for (let i = 0; i < reglas.length; i++) {
    const e = memoria.get(claves[i]);
    const n = e && e.vence > ahoraMs ? e.n + 1 : 1;
    memoria.set(claves[i], { n, vence: e && e.vence > ahoraMs ? e.vence : ahoraMs + reglas[i].ventanaS * 1000 });
    cuentas[reglas[i].nombre] = n;
  }
  if (memoria.size > 20_000) {
    for (const [k, v] of memoria) if (v.vence <= ahoraMs) memoria.delete(k);
    if (memoria.size > 20_000) memoria.clear();
  }
  return { ok: true, cuentas, respaldo: true };
}

export function vaciarMemoria() {
  memoria.clear();
}

/* ── Redis (Upstash REST) ────────────────────────────────────────────────── */

/**
 * KEYS: una por regla. ARGV: max y ttl de cada una, en orden.
 * Devuelve {0, cuenta1, cuenta2, ...} si pasó, o {i} con la regla que cortó.
 */
export const SCRIPT = `
for i, k in ipairs(KEYS) do
  local c = tonumber(redis.call('GET', k) or '0')
  if c >= tonumber(ARGV[(i - 1) * 2 + 1]) then return {i} end
end
local salida = {0}
for i, k in ipairs(KEYS) do
  local c = redis.call('INCR', k)
  if c == 1 then redis.call('EXPIRE', k, tonumber(ARGV[(i - 1) * 2 + 2])) end
  salida[#salida + 1] = c
end
return salida
`.trim();

function redis(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ""), token };
}

export function hayRedis() {
  return redis() !== null;
}

/** El comando EVAL tal cual se le manda a Redis. Aparte para poder probarlo. */
export function comando(reglas: Regla[], ahoraMs: number): (string | number)[] {
  return [
    "EVAL",
    SCRIPT,
    reglas.length,
    ...reglas.map((r) => conVentana(r, ahoraMs)),
    // El ttl lleva un minuto de más: la clave ya no se usa cuando cambia la ventana.
    ...reglas.flatMap((r) => [r.max, r.ventanaS + 60]),
  ];
}

/** Lee lo que devuelve el script. Aparte para poder probarlo contra un Redis real. */
export function interpretar(reglas: Regla[], resultado: unknown): Consumo | null {
  if (!Array.isArray(resultado) || typeof resultado[0] !== "number") return null;
  if (resultado[0] !== 0) {
    const regla = reglas[resultado[0] - 1];
    return regla ? { ok: false, corte: regla.nombre, respaldo: false } : null;
  }
  if (resultado.length !== reglas.length + 1) return null;
  const cuentas: Record<string, number> = {};
  reglas.forEach((r, i) => (cuentas[r.nombre] = Number(resultado[i + 1])));
  return { ok: true, cuentas, respaldo: false };
}

let avisoSinRedis = false;

export async function consumir(reglas: Regla[]): Promise<Consumo> {
  const ahora = Date.now();
  const r = redis();
  if (!r) {
    if (process.env.NODE_ENV === "production" && !avisoSinRedis) {
      avisoSinRedis = true;
      console.error("[limites] sin Redis (UPSTASH_REDIS_REST_URL/TOKEN): los límites cuentan en memoria, por instancia. No es un techo real.");
    }
    return consumirEnMemoria(reglas, ahora);
  }
  try {
    const res = await fetch(r.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${r.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(comando(reglas, ahora)),
      signal: AbortSignal.timeout(1500),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Redis respondió ${res.status}`);
    const leido = interpretar(reglas, ((await res.json()) as { result?: unknown }).result);
    if (!leido) throw new Error("respuesta de Redis con otra forma");
    return leido;
  } catch (e) {
    console.error("[limites] Redis falló, se cuenta en memoria", e instanceof Error ? e.message : e);
    return consumirEnMemoria(reglas, ahora);
  }
}

/**
 * Umbrales que se cruzan justo con este consumo (la cuenta es exactamente el
 * umbral, así que avisa una sola vez por ventana y no en cada mensaje).
 */
export function umbralesCruzados(c: Consumo, nombre: string, max: number, partes = [0.5, 1]): number[] {
  if (!c.ok) return [];
  const n = c.cuentas[nombre];
  return partes.filter((p) => n === Math.max(1, Math.ceil(max * p)));
}
