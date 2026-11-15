/**
 * La sesión del chat viaja firmada en el navegador, no en la memoria del server.
 *
 * Por qué firmada: si el navegador mandara el historial suelto, cualquiera podría
 * escribirle al modelo mensajes "del agente" inventados (la forma más barata de
 * sacarlo de su papel) o resetear el contador de mensajes. Con la firma HMAC, el
 * server solo acepta un historial que él mismo devolvió.
 *
 * Por qué no en memoria: no se sabe todavía dónde se despliega la landing, y una
 * sesión en memoria se pierde con cada reinicio o se rompe con dos instancias.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import type { Turno } from "./motor";
import type { Estado } from "./reglas";

export type Sesion = {
  id: string;
  creada: number;
  turnos: Turno[];
  estado: Estado;
  /** Si ya se cargó en FW Central, para no cargarla dos veces. */
  enCrm: boolean;
  /** Si ya se disparó el evento Lead del píxel. */
  lead: boolean;
  /** Si ya se le mandó el mail de aviso a Faustino. */
  avisado?: boolean;
  origen: Record<string, string>;
};

export const DURACION_MS = 24 * 60 * 60 * 1000;

const secretoDev = randomBytes(32).toString("hex");

function secreto(): string | null {
  const s = process.env.CHAT_SESSION_SECRET;
  if (s && s.length >= 32) return s;
  // En producción sin secreto no se firma nada: falla cerrado.
  if (process.env.NODE_ENV === "production") return null;
  return secretoDev;
}

export function hayClave() {
  return secreto() !== null;
}

function firma(datos: string, clave: string) {
  return createHmac("sha256", clave).update(datos).digest("base64url");
}

export function firmar(sesion: Sesion): string {
  const clave = secreto();
  if (!clave) throw new Error("falta CHAT_SESSION_SECRET");
  const datos = Buffer.from(JSON.stringify(sesion)).toString("base64url");
  return `${datos}.${firma(datos, clave)}`;
}

export function leer(token: string): Sesion | null {
  const clave = secreto();
  if (!clave || typeof token !== "string" || token.length > 60_000) return null;
  const [datos, recibida] = token.split(".");
  if (!datos || !recibida) return null;
  const esperada = Buffer.from(firma(datos, clave));
  const dada = Buffer.from(recibida);
  if (esperada.length !== dada.length || !timingSafeEqual(esperada, dada)) return null;
  try {
    const sesion = JSON.parse(Buffer.from(datos, "base64url").toString("utf8")) as Sesion;
    if (Date.now() - sesion.creada > DURACION_MS) return null;
    return sesion;
  } catch {
    return null;
  }
}

export function nueva(origen: Record<string, string>): Sesion {
  return {
    id: randomBytes(9).toString("base64url"),
    creada: Date.now(),
    turnos: [],
    estado: "conversando",
    enCrm: false,
    lead: false,
    avisado: false,
    origen,
  };
}
