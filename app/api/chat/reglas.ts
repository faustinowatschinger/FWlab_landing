/**
 * Reglas duras del agente de /chat, verificadas por código.
 *
 * Las usa la ruta (si una respuesta rompe una, se le pide otra al modelo una vez)
 * y el simulador de `_pruebas/` (que sale con exit 1 si alguna se rompe). Es la
 * misma función en los dos lados a propósito: lo que se prueba es lo que corre.
 *
 * Lo que el modelo no cumple se saca del modelo: el umbral de consultas por día
 * y el pase a la agenda los decide `normalizar()`, no el texto del prompt.
 */

export const MIN_CONSULTAS_POR_DIA = 10;
/** Piso de "ticket alto": una venta típica de USD 500 o más (Faustino, 15-11). */
export const MIN_TICKET_USD = 500;
/** Pesos por dólar para pasar un ticket en ARS. Sin esta variable, un ticket en pesos queda a juicio del modelo. */
const ARS_POR_USD = () => {
  const v = Number(process.env.CHAT_ARS_POR_USD);
  return Number.isFinite(v) && v > 0 ? v : null;
};

/** Ticket en dólares, o null si no se puede calcular (sin monto, otra moneda o sin tipo de cambio). */
export function ticketEnUsd(s: Pick<Salida, "ticket_monto" | "ticket_moneda">): number | null {
  if (s.ticket_monto == null || !(s.ticket_monto > 0)) return null;
  if (s.ticket_moneda === "USD") return s.ticket_monto;
  if (s.ticket_moneda === "ARS") {
    const tc = ARS_POR_USD();
    return tc ? s.ticket_monto / tc : null;
  }
  return null;
}

/** Ticket alto según el código: con monto calculable manda el piso; si no, el juicio del modelo. */
export function ticketAlto(s: Salida): boolean {
  const usd = ticketEnUsd(s);
  if (usd !== null) return usd >= MIN_TICKET_USD;
  return s.ticket_alto === "si";
}

export type Estado = "conversando" | "califica" | "no_califica" | "pendiente" | "derivar";

export type Salida = {
  mensaje: string;
  estado: Estado;
  mostrar_agenda: boolean;
  rubro: string | null;
  negocio: string | null;
  nombre: string | null;
  whatsapp: string | null;
  consultas_por_dia: number | null;
  ticket: string | null;
  ticket_monto: number | null;
  ticket_moneda: "USD" | "ARS" | "otra" | null;
  ticket_alto: "si" | "no" | "no_se" | null;
  dolor: string | null;
};

/**
 * Montos que sí puede decir: solo los que aparecen en CHAT_PROMPT_PRECIO (el
 * rango autorizado, que no vive en este repo público). Sin esa variable, ninguno.
 */
function montosPermitidos(dichosPorLaPersona: string): Set<string> {
  // También los que trajo la persona: repetir "prendas de 40 dólares" no es inventar un precio.
  const texto = `${process.env.CHAT_PROMPT_PRECIO ?? ""} ${dichosPorLaPersona}`;
  const montos = new Set<string>();
  for (const m of texto.matchAll(/\d[\d.,]*/g)) {
    const n = m[0].replace(/[.,]$/, "");
    montos.add(n);
    montos.add(n.replace(/[.,]/g, ""));
  }
  return montos;
}

type Regla = { id: string; test: (texto: string, persona: string) => boolean };

const REGLAS: Regla[] = [
  // Nunca un link, mail ni teléfono: el botón lo pone el sistema.
  { id: "link", test: (t) => /https?:\/\/|www\.|calendly\.com|\.com\b/i.test(t) },
  { id: "mail", test: (t) => /[^\s@]+@[^\s@]+\.[a-z]{2,}/i.test(t) },
  // Monto con moneda que no sea el rango autorizado.
  {
    id: "precio-no-autorizado",
    test: (t, persona) => {
      const montos = [...t.matchAll(/(?:usd|u\$s|us\$|\$|dólares?|dolares?)\s*([\d.,]+)|([\d.,]+)\s*(?:usd|u\$s|dólares?|dolares?|pesos|ars)/gi)];
      const permitidos = montosPermitidos(persona);
      return montos.some((m) => {
        const n = (m[1] ?? m[2] ?? "").replace(/[.,]$/, "");
        return n !== "" && !permitidos.has(n) && !permitidos.has(n.replace(/[.,]/g, ""));
      });
    },
  },
  // Monto en letras junto a un verbo de precio ("sale quinientos dólares"). Para no marcar
  // cuando repite lo que dijo la persona ("una venta ronda los tres mil dólares"), se
  // salta si la persona escribió algún número o esa misma palabra. El rango autorizado
  // en letras está en CHAT_PROMPT_PRECIO y también se salta.
  {
    id: "precio-en-letras-no-autorizado",
    test: (t, persona) => {
      const m = t.match(/\b(cuesta|cuestan|sale|salen|precio|abono|cobr\w*)\b[^.?!]{0,40}?\b((?:\w+\s+)?(?:cien|doscientos|trescientos|cuatrocientos|quinientos|mil))\s+d[oó]lares\b/i);
      if (!m) return false;
      if (/\d/.test(persona) || persona.toLowerCase().includes(m[2].toLowerCase())) return false;
      return !(process.env.CHAT_PROMPT_PRECIO ?? "").toLowerCase().includes(m[2].toLowerCase());
    },
  },
  // Lenguaje de venta hacia afuera (memoria feedback_lenguaje_sin_venta).
  { id: "lenguaje-venta", test: (t) => /\b(vender(te|les)?|te vendo|contrat\w*|nuestros clientes|mis clientes|clientes nuestros|cliente nuestro)\b/i.test(t) },
  // Frases fijas de la §86.
  { id: "te-entiendo", test: (t) => /\bte entiendo\b/i.test(t) },
  { id: "gestionar", test: (t) => /\bgestion(ar|an|ás|amos|o)\b/i.test(t) },
  // Markdown que se ve como sistema.
  { id: "markdown", test: (t) => /\*\*|^#{1,3}\s|^\s*[-*•]\s/m.test(t) },
  // Afirmar una reserva que no hizo.
  { id: "agenda-fantasma", test: (t) => /\b(te (agend[eé]|reserv[eé]|confirm[eé])|qued[oó] (agendad|reservad|confirmad)[oa]|ya (est[aá]s|tenés) (agendad|reservad)[oa])/i.test(t) },
  // Prometer resultados.
  { id: "promete-resultados", test: (t) => /\b(vas a vender m[aá]s|más ventas|duplic(ar|ás)|garantizad[oa]s?|te garantizo)\b/i.test(t) },
  // Decir que es humano.
  { id: "dice-ser-humano", test: (t) => /\b(soy (una persona|humano|humana)|no soy (un bot|una ia|una inteligencia))\b/i.test(t) },
];

/**
 * Devuelve los id de las reglas que rompe el mensaje. Vacío = limpio.
 * `persona` es todo lo que escribió la persona: los montos que ella trajo se pueden repetir.
 */
export function violaciones(mensaje: string, persona = ""): string[] {
  return REGLAS.filter((r) => r.test(mensaje, persona)).map((r) => r.id);
}

/** Deja solo los dígitos y el + inicial. Null si no parece un teléfono. */
export function normalizarWhatsapp(valor: string | null): string | null {
  if (!valor) return null;
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length < 8 || digitos.length > 15) return null;
  return (valor.trim().startsWith("+") ? "+" : "") + digitos;
}

/**
 * Lo que el código no le deja decidir al modelo:
 * - "califica" exige 10 o más consultas por día y ticket alto (USD 500 o más cuando hay monto).
 * - La agenda se muestra solo con estado "califica".
 * - Un estado final no vuelve atrás a "conversando".
 * - El WhatsApp se valida acá.
 *
 * Devuelve la salida corregida y, si el modelo quiso calificar sin cumplir, el
 * motivo, para pedirle otra respuesta.
 */
export function normalizar(s: Salida, previo: Estado): { salida: Salida; rechazo: string | null } {
  const salida: Salida = { ...s, whatsapp: normalizarWhatsapp(s.whatsapp) };
  let rechazo: string | null = null;

  if (salida.estado === "califica" && previo !== "califica") {
    const volumen = salida.consultas_por_dia ?? 0;
    if (volumen < MIN_CONSULTAS_POR_DIA || !ticketAlto(salida)) {
      const usd = ticketEnUsd(salida);
      const ticket = usd !== null ? `USD ${Math.round(usd)} (mínimo USD ${MIN_TICKET_USD})` : `ticket alto = ${salida.ticket_alto ?? "sin dato"}`;
      rechazo = `No pasa el filtro: consultas por día = ${salida.consultas_por_dia ?? "sin dato"} (mínimo ${MIN_CONSULTAS_POR_DIA}), ${ticket}.`;
      salida.estado = "conversando";
    }
  }

  // Desde que califica, se queda en califica (salvo que pida una persona: se sigue mostrando la agenda).
  if (previo === "califica" && salida.estado !== "califica") salida.estado = "califica";
  // Los cierres no se reabren solos.
  if ((previo === "no_califica" || previo === "pendiente") && salida.estado === "conversando") salida.estado = previo;

  salida.mostrar_agenda = salida.estado === "califica" && salida.mostrar_agenda;
  return { salida, rechazo };
}
