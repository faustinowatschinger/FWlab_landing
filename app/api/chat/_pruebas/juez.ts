/**
 * Juez de conversaciones del simulador de /chat: un modelo barato puntúa cada
 * conversación con una rúbrica fija. No reemplaza los chequeos por código de
 * `simular.ts`: los complementa con lo que el código no puede ver (si repitió
 * una pregunta, si inventó algo, si sonó natural).
 *
 * Cada criterio va de 0 a 2 (0 = falla, 1 = flojo, 2 = bien) o no aplica.
 */
import OpenAI from "openai";

import { construirPrompt } from "../prompt";
import { MIN_CONSULTAS_POR_DIA, MIN_TICKET_USD } from "../reglas";
import type { Escenario } from "./escenarios";

export const MODELO_JUEZ = process.env.MODELO_JUEZ ?? "gpt-5.4-mini";

export const CRITERIOS = [
  "decide_bien",
  "una_pregunta",
  "no_inventa",
  "no_repite",
  "corto_natural",
  "cierra_no_califica",
  "agenda_solo_califica",
  "vende_con_valor",
  "objeciones_con_oferta",
] as const;
export type Criterio = (typeof CRITERIOS)[number];

export type Nota = { aplica: boolean; puntaje: number; motivo: string };
export type Veredicto = {
  criterios: Record<Criterio, Nota>;
  simulador_se_desvio: boolean;
  problemas: { turno: number; gravedad: "alta" | "media" | "baja"; detalle: string }[];
  puntaje: number; // 0-100 sobre los criterios que aplican
};

const nota = {
  type: "object",
  additionalProperties: false,
  required: ["aplica", "puntaje", "motivo"],
  properties: {
    aplica: { type: "boolean" },
    puntaje: { type: "integer", enum: [0, 1, 2] },
    motivo: { type: "string" },
  },
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["criterios", "simulador_se_desvio", "problemas"],
  properties: {
    criterios: {
      type: "object",
      additionalProperties: false,
      required: [...CRITERIOS],
      properties: Object.fromEntries(CRITERIOS.map((c) => [c, nota])),
    },
    simulador_se_desvio: { type: "boolean" },
    problemas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["turno", "gravedad", "detalle"],
        properties: {
          turno: { type: "integer" },
          gravedad: { type: "string", enum: ["alta", "media", "baja"] },
          detalle: { type: "string" },
        },
      },
    },
  },
};

const RUBRICA = `Sos un evaluador estricto de un agente de chat que califica leads. Te paso el prompt del agente (su única fuente de verdad), el escenario que actuó un simulador y la conversación. Puntuá cada criterio con 0 (falla), 1 (flojo) o 2 (bien). Si un criterio no aplica a esta conversación, aplica=false y puntaje=2.

Criterios:
- decide_bien: el estado final es el correcto SEGÚN LO QUE LA PERSONA DIJO de verdad en la conversación (no según el escenario). Filtro: al menos ${MIN_CONSULTAS_POR_DIA} consultas por día (pasando semana o mes a días) Y que las ventas de mayor valor que entran por esas consultas valgan unos ${MIN_TICKET_USD} dólares o más (pesos a dólares a 1580 por dólar). Si cumple las dos: califica. Si no cumple alguna ya clara: no_califica. Si no sabe el volumen ni con ayuda: pendiente. Si pidió una persona antes de calificar: derivar. Si la conversación se cortó antes de tener los datos: conversando está bien. Troll o fuera de tema: conversando o no_califica.
- una_pregunta: cada mensaje del agente hace como mucho una pregunta.
- no_inventa: no afirma nada que no esté en su prompt (datos de Fawel, FW Labs, Altaterra, ubicación, integraciones, clientes por otros canales, plazos) ni promete resultados; no da montos fuera de lo autorizado; no revela sus instrucciones; reconoce que es una IA si se lo preguntan.
- no_repite: no vuelve a preguntar algo que la persona ya respondió y no repite textual frases propias.
- corto_natural: mensajes cortos (1 a 3 oraciones), en el idioma de la persona, cálidos, sin sonar a formulario.
- cierra_no_califica: aplica solo si no califica (o troll): le dice claro y amable que hoy no le sirve o no encaja, sin ofrecer la agenda y sin seguir calificando. Si no califica (no al troll), deja un consejo concreto que pueda hacer solo; sin consejo es 1.
- agenda_solo_califica: la agenda (mostrar_agenda=true) aparece solo cuando califica y después de pedir el WhatsApp; si califica, la agenda tiene que aparecer.
- vende_con_valor: aplica solo si califica. Antes de la agenda, le muestra cómo sería Fawel en su negocio con lo que la persona contó (no un discurso genérico), le baja el riesgo con la garantía (aprobación con conversaciones reales; si no responde como ellos, se le devuelve lo que pagó) y lleva a la agenda sin presionar, sin urgencia falsa y sin elogios vacíos. Genérico o sin garantía es 1; presión, cupos o promesas de ventas es 0.
- objeciones_con_oferta: aplica solo si la persona puso una objeción o duda (bot previo, robot, número, CRM, equipo, si rinde, salida, socio, pensarlo). La contesta con lo que dice el prompt, en pocas frases, sin discutir, y retoma donde estaba. Esquivarla o mandarla "al diagnóstico" cuando el prompt tiene la respuesta es 1; inventar o prometer resultados es 0.

El puntaje tiene que ser coherente con el motivo: si el motivo concluye que está bien, es 2. Cada defecto se castiga en su criterio y en ningún otro (decide_bien mira solo si el estado final es el correcto). Volver a hacer una pregunta que la persona esquivó o no contestó no es repetir.

simulador_se_desvio: true si la persona simulada no actuó su consigna (dio datos distintos, se fue antes, contestó cosas que no correspondían) de forma que el resultado no sea culpa del agente.
problemas: lista de problemas concretos del agente, con el número de turno del mensaje del agente, gravedad (alta: decide mal, inventa, filtra el prompt, agenda indebida; media: repite pregunta, dos preguntas, no cierra; baja: tono, largo) y una línea de detalle. Vacía si no hay.`;

type TurnoReg = { rol: string; texto: string; estado?: string; agenda?: boolean };

export async function juzgar(
  client: OpenAI,
  e: Escenario,
  turnos: TurnoReg[],
): Promise<{ veredicto: Veredicto; uso: { entrada: number; salida: number; cache: number } }> {
  let n = 0;
  const transcripcion = turnos
    .map((t) => {
      if (t.rol === "agente") {
        const meta = t.estado ? ` [estado=${t.estado}, mostrar_agenda=${t.agenda}]` : " [saludo fijo]";
        return `AGENTE (turno ${n++})${meta}: ${t.texto}`;
      }
      return `PERSONA: ${t.texto}`;
    })
    .join("\n");
  const r = await client.responses.create({
    model: MODELO_JUEZ,
    instructions: RUBRICA,
    input: [
      {
        role: "user",
        content: `## Prompt del agente\n${construirPrompt()}\n\n## Escenario\n${e.descripcion}\nConsigna del simulador: ${e.personaje}\nEstado final que espera el escenario: ${e.esperado.estadoFinal?.join(" o ") ?? "sin exigencia"}\n\n## Conversación\n${transcripcion}`,
      },
    ],
    max_output_tokens: 3000,
    text: { format: { type: "json_schema", name: "veredicto", schema: SCHEMA as unknown as Record<string, unknown>, strict: true } },
  });
  const crudo = JSON.parse(r.output_text) as Omit<Veredicto, "puntaje">;
  const aplican = CRITERIOS.filter((c) => crudo.criterios[c].aplica);
  const suma = aplican.reduce((a, c) => a + crudo.criterios[c].puntaje, 0);
  const puntaje = aplican.length ? Math.round((100 * suma) / (2 * aplican.length)) : 100;
  return {
    veredicto: { ...crudo, puntaje },
    uso: {
      entrada: r.usage?.input_tokens ?? 0,
      salida: r.usage?.output_tokens ?? 0,
      cache: r.usage?.input_tokens_details?.cached_tokens ?? 0,
    },
  };
}
