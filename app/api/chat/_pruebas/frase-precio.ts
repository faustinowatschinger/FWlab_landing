/**
 * ¿El agente dijo la frase del rango de CHAT_PROMPT_PRECIO? El rango no se
 * escribe en el repo (es público), así que se compara contra la variable.
 *
 * Cuenta como dicha si el texto comparte 5 palabras seguidas con la frase entre
 * comillas de la variable, pero solo tramos que NO estén también en el prompt
 * base: si no, "te lo da Faustino después del diagnóstico", que el prompt dice
 * igual sin rango, daría un falso positivo.
 */
import { construirPrompt } from "../prompt";

const N = 5;

function palabras(t: string) {
  return t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").match(/[a-z0-9]+/g) ?? [];
}

function tramos(t: string): Set<string> {
  const p = palabras(t);
  const salida = new Set<string>();
  for (let i = 0; i + N <= p.length; i++) salida.add(p.slice(i, i + N).join(" "));
  return salida;
}

export function tramosDelRango(variable: string): Set<string> {
  const frase = variable.match(/"([^"]+)"/)?.[1] ?? "";
  const guardada = process.env.CHAT_PROMPT_PRECIO;
  delete process.env.CHAT_PROMPT_PRECIO;
  const base = tramos(construirPrompt());
  if (guardada !== undefined) process.env.CHAT_PROMPT_PRECIO = guardada;
  return new Set([...tramos(frase)].filter((t) => !base.has(t)));
}

export function diceFrasePrecio(texto: string, rango: Set<string>): boolean {
  for (const t of tramos(texto)) if (rango.has(t)) return true;
  return false;
}
