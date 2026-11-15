/**
 * El cerebro del chat: arma la llamada al modelo, aplica las reglas duras y
 * devuelve la respuesta. No sabe nada de HTTP, sesiones ni CRM: así lo usan
 * igual la ruta y el simulador de `_pruebas/`.
 */
import OpenAI from "openai";

import { SALUDO, SCHEMA, construirPrompt } from "./prompt";
import { normalizar, violaciones, type Estado, type Salida } from "./reglas";

export type Turno = { rol: "usuario" | "agente"; texto: string };

/**
 * gpt-5.6-luna: es la más barata de la familia (USD 0,10 / 0,60 por millón) y la
 * que ya usa la landing para las preguntas del mapa operativo. Para un chat que
 * paga cada visitante del anuncio, la latencia y el costo mandan.
 */
export const MODELO = process.env.OPENAI_CHAT_MODEL ?? "gpt-5.6-luna";
const ESFUERZO = (process.env.OPENAI_CHAT_ESFUERZO ?? "low") as "minimal" | "low" | "medium";

export type Resultado =
  | { ok: true; salida: Salida; reintentos: number; violacionesFinales: string[]; uso: Uso }
  | { ok: false; error: string };

export type Uso = { entrada: number; salida: number; cache: number };

function fecha() {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date());
}

function entrada(historial: Turno[], nota: string | null) {
  const mensajes: { role: "user" | "assistant" | "developer"; content: string }[] = [
    { role: "assistant", content: SALUDO },
    ...historial.map((t) => ({
      role: t.rol === "usuario" ? ("user" as const) : ("assistant" as const),
      content: t.texto,
    })),
  ];
  if (nota) mensajes.push({ role: "developer", content: nota });
  return mensajes;
}

export async function responder(
  client: OpenAI,
  historial: Turno[],
  previo: Estado,
): Promise<Resultado> {
  let nota: string | null = null;
  let ultima: Salida | null = null;
  let ultimasViolaciones: string[] = [];
  const uso: Uso = { entrada: 0, salida: 0, cache: 0 };

  // Un intento y, si rompe una regla dura, uno más con la corrección. El tercero
  // no existe a propósito: duplica el costo y la latencia del peor caso.
  for (let intento = 0; intento < 2; intento++) {
    const respuesta = await client.responses.create({
      model: MODELO,
      instructions: `${construirPrompt()}\n\n# Ahora\nHoy es ${fecha()} (hora de Argentina).`,
      input: entrada(historial, nota),
      reasoning: { effort: ESFUERZO },
      max_output_tokens: 2500,
      text: { format: { type: "json_schema", name: "turno", schema: SCHEMA as unknown as Record<string, unknown>, strict: true } },
    });

    uso.entrada += respuesta.usage?.input_tokens ?? 0;
    uso.salida += respuesta.usage?.output_tokens ?? 0;
    uso.cache += respuesta.usage?.input_tokens_details?.cached_tokens ?? 0;

    if (respuesta.status === "incomplete") {
      console.error("[chat] respuesta incompleta:", respuesta.incomplete_details);
      continue;
    }

    let crudo: Salida;
    try {
      crudo = JSON.parse(respuesta.output_text) as Salida;
    } catch {
      console.error("[chat] JSON inválido del modelo");
      continue;
    }

    const { salida, rechazo } = normalizar(crudo, previo);
    const rotas = violaciones(
      salida.mensaje,
      historial.filter((t) => t.rol === "usuario").map((t) => t.texto).join("\n"),
    );
    ultima = salida;
    ultimasViolaciones = rotas;

    if (!rechazo && rotas.length === 0) {
      return { ok: true, salida, reintentos: intento, violacionesFinales: [], uso };
    }

    nota = [
      "Corrección del sistema, la persona no la ve. Reescribí tu último mensaje.",
      rechazo ? `${rechazo} No lo pases a la agenda: seguí calificando o cerralo según el filtro.` : null,
      rotas.length ? `Tu mensaje rompió estas reglas: ${rotas.join(", ")}. Revisá "Reglas que no se rompen" y "Precio".` : null,
    ]
      .filter(Boolean)
      .join(" ");
    console.warn("[chat] reintento:", { rechazo, rotas });
  }

  if (ultima && ultimasViolaciones.length === 0) {
    // Llegó acá solo por el rechazo del filtro en el segundo intento: el estado ya
    // está corregido por normalizar() y el texto no rompe reglas.
    return { ok: true, salida: ultima, reintentos: 1, violacionesFinales: [], uso };
  }
  if (ultima) {
    // Rompió reglas dos veces: no se le muestra ese texto a la persona.
    return {
      ok: true,
      salida: { ...ultima, mensaje: "Perdón, se me mezcló algo. ¿Me repetís lo último que me dijiste?" },
      reintentos: 1,
      violacionesFinales: ultimasViolaciones,
      uso,
    };
  }
  return { ok: false, error: "sin respuesta válida del modelo" };
}
