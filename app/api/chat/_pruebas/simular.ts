/**
 * Simulador de leads contra el agente de /chat (método de la skill
 * probar-agente-conversacional).
 *
 *   OPENAI_API_KEY=... CHAT_PROMPT_PRECIO="..." CHAT_ARS_POR_USD=... \
 *     npx tsx app/api/chat/_pruebas/simular.ts [id ...] [--salida=dir] [--repeticiones=3] [--paralelo=4] [--sin-juez]
 *
 * - El agente corre con el MISMO motor, prompt y reglas que la ruta (`../motor`).
 * - Cada lead lo actúa un LLM con personalidad y objetivo, no un guion fijo.
 *   El estímulo que importa (pedir precio, pedir una persona, no saber el
 *   volumen) va sembrado en la consigna, para que el escenario no dependa del azar.
 *   Los escenarios viven en `escenarios.ts`.
 * - Las reglas duras se verifican por código con `violaciones()` y además cada
 *   escenario declara lo que tiene que pasar (estado final, agenda, WhatsApp).
 * - Un juez (`juez.ts`, modelo barato) puntúa cada conversación con una rúbrica.
 *   Su puntaje no cambia el ok/falla: se reporta aparte.
 * - `--repeticiones=N` corre la batería N veces para medir estabilidad.
 *   `--paralelo=N` corre N conversaciones a la vez; los escenarios `sinPrecio`
 *   tocan process.env y se corren solos, al final.
 * - Mide la latencia de `responder()` por turno (incluye el reintento).
 * - Corta si el costo estimado pasa PRESUPUESTO_USD (default 5).
 * - Un escenario que revienta cuenta como fallado, no como limpio. Sale con
 *   exit 1 si alguno falla o no se pudo evaluar.
 *
 * La carpeta `_pruebas` empieza con guion bajo: Next no la publica como ruta.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import OpenAI from "openai";

import { MODELO, responder, type Turno } from "../motor";
import { violaciones, type Estado, type Salida } from "../reglas";
import { SALUDO } from "../prompt";
import { diceFrasePrecio, tramosDelRango } from "./frase-precio";
import { ESCENARIOS, FUGA_PROMPT, type Escenario } from "./escenarios";
import { juzgar, MODELO_JUEZ, type Veredicto } from "./juez";

const MODELO_LEAD = process.env.MODELO_LEAD ?? "gpt-5.4-mini";
const MAX_TURNOS = 12;
// El rango de precio NO se escribe acá (repo público): sale de CHAT_PROMPT_PRECIO.
const RANGO = tramosDelRango(process.env.CHAT_PROMPT_PRECIO ?? "");

type Uso = { entrada: number; salida: number; cache: number };
const cero = (): Uso => ({ entrada: 0, salida: 0, cache: 0 });
const sumar = (a: Uso, b: Uso) => {
  a.entrada += b.entrada;
  a.salida += b.salida;
  a.cache += b.cache;
};

/**
 * USD por millón de tokens (entrada, entrada en caché, salida). Es una ESTIMACIÓN
 * para cortar el gasto: el de luna sale del comentario de motor.ts; el de los demás
 * es un supuesto conservador. Se pisa con PRECIO_<MODELO>="in,cache,out".
 */
const PRECIOS: Record<string, [number, number, number]> = {
  "gpt-5.6-luna": [0.1, 0.01, 0.6],
  "gpt-5.4-mini": [0.75, 0.075, 4.5],
};
function precio(modelo: string): [number, number, number] {
  const env = process.env[`PRECIO_${modelo.replace(/\W/g, "_").toUpperCase()}`];
  if (env) {
    const p = env.split(",").map(Number);
    if (p.length === 3 && p.every(Number.isFinite)) return p as [number, number, number];
  }
  return PRECIOS[modelo] ?? [2, 0.2, 10];
}
function costo(modelo: string, u: Uso) {
  const [i, c, o] = precio(modelo);
  return ((u.entrada - u.cache) * i + u.cache * c + u.salida * o) / 1e6;
}

type Registro = {
  id: string;
  corrida: number;
  turnos: { rol: string; texto: string; estado?: Estado; agenda?: boolean; reintentos?: number; ms?: number }[];
  final: Salida | null;
  estadoFinal: Estado;
  agendaVista: boolean;
  fallas: string[];
  uso: Uso;
  usoLead: Uso;
  usoJuez: Uso;
  latencias: number[];
  juez: Veredicto | null;
};

async function actuarLead(client: OpenAI, e: Escenario, conversacion: Turno[], uso: Uso): Promise<string> {
  const r = await client.responses.create({
    model: MODELO_LEAD,
    instructions: `Estás actuando de una persona que entró al chat de la web de FW Labs desde un anuncio. ${e.personaje}\nEscribí SOLO tu próximo mensaje, como en un chat de celular: corto, natural, sin comillas. Contestá lo que te pregunten con los datos de tu personaje; si te preguntan algo que tu personaje no dice (por ejemplo, por qué querés resolverlo ahora), contestá corto y coherente con él. Escribí exactamente FIN solo si ya te despediste o si te mostraron el botón para coordinar el diagnóstico y no tenés nada más que decir; nunca antes.`,
    // Desde el lado del lead, lo que dice el agente es "user" y lo que dice él es "assistant".
    input: [
      { role: "user" as const, content: SALUDO },
      ...conversacion.map((t) => ({ role: t.rol === "usuario" ? ("assistant" as const) : ("user" as const), content: t.texto })),
    ],
    max_output_tokens: 300,
  });
  sumar(uso, { entrada: r.usage?.input_tokens ?? 0, salida: r.usage?.output_tokens ?? 0, cache: r.usage?.input_tokens_details?.cached_tokens ?? 0 });
  return r.output_text.trim();
}

async function correr(client: OpenAI, e: Escenario, corrida: number, conJuez: boolean): Promise<Registro> {
  const reg: Registro = {
    id: e.id,
    corrida,
    turnos: [{ rol: "agente", texto: SALUDO }],
    final: null,
    estadoFinal: "conversando",
    agendaVista: false,
    fallas: [],
    uso: cero(),
    usoLead: cero(),
    usoJuez: cero(),
    latencias: [],
    juez: null,
  };
  const historial: Turno[] = [];
  let estado: Estado = "conversando";
  let agendaVista = false;
  let whatsapp = false;
  let vueltasDespues = 0;
  const precioOriginal = process.env.CHAT_PROMPT_PRECIO;
  if (e.sinPrecio) delete process.env.CHAT_PROMPT_PRECIO;

  try {
    for (let i = 0; i < MAX_TURNOS; i++) {
      const sembrado = e.guion?.[i];
      const lead = sembrado ?? (await actuarLead(client, e, historial, reg.usoLead));
      if (!lead || lead === "FIN" || lead.endsWith("FIN")) break;
      historial.push({ rol: "usuario", texto: lead });
      reg.turnos.push({ rol: "usuario", texto: lead });

      const t0 = performance.now();
      const r = await responder(client, historial, estado);
      const ms = Math.round(performance.now() - t0);
      if (!r.ok) {
        reg.fallas.push(`el motor no respondió: ${r.error}`);
        break;
      }
      reg.latencias.push(ms);
      const s = r.salida;
      sumar(reg.uso, r.uso);
      historial.push({ rol: "agente", texto: s.mensaje });
      reg.turnos.push({ rol: "agente", texto: s.mensaje, estado: s.estado, agenda: s.mostrar_agenda, reintentos: r.reintentos, ms });
      if (r.violacionesFinales.length) reg.fallas.push(`rompió reglas dos veces seguidas: ${r.violacionesFinales.join(", ")}`);
      estado = s.estado;
      agendaVista ||= s.mostrar_agenda;
      whatsapp ||= Boolean(s.whatsapp);
      reg.final = s;

      // Reglas por mensaje.
      const rotas = violaciones(s.mensaje, historial.filter((t) => t.rol === "usuario").map((t) => t.texto).join("\n"));
      if (rotas.length) reg.fallas.push(`turno ${i + 1}: ${rotas.join(", ")}`);
      const preguntas = (s.mensaje.match(/\?/g) ?? []).length;
      if (preguntas > 1) reg.fallas.push(`turno ${i + 1}: ${preguntas} preguntas en un mensaje`);
      if (s.mensaje.length > 500) reg.fallas.push(`turno ${i + 1}: mensaje de ${s.mensaje.length} caracteres`);
      if (FUGA_PROMPT.test(s.mensaje)) reg.fallas.push(`turno ${i + 1}: posible fuga del prompt`);
      if (s.mostrar_agenda && (s.consultas_por_dia ?? 0) < 10) reg.fallas.push(`turno ${i + 1}: agenda con menos de 10 consultas por día`);

      // Cuando ya se mostró la agenda o se cerró, el lead contesta una vez más y se corta.
      const cerrado = agendaVista || estado === "no_califica" || estado === "pendiente";
      if (cerrado) {
        if (vueltasDespues >= 1) break;
        vueltasDespues++;
      }
    }
  } catch (err) {
    reg.fallas.push(`reventó: ${(err as Error).message}`);
  }

  // Sin el saludo: es fijo y no prueba nada del modelo.
  const textos = reg.turnos.slice(1).filter((t) => t.rol === "agente").map((t) => t.texto).join("\n");
  const x = e.esperado;
  if (x.estadoFinal && !x.estadoFinal.includes(estado)) reg.fallas.push(`estado final ${estado}, esperado ${x.estadoFinal.join(" o ")}`);
  if (x.agenda !== undefined && agendaVista !== x.agenda) reg.fallas.push(`agenda ${agendaVista ? "mostrada" : "no mostrada"}, esperado ${x.agenda ? "mostrada" : "no mostrada"}`);
  if (x.whatsapp && !whatsapp) reg.fallas.push("no capturó el WhatsApp");
  for (const re of x.dice ?? []) if (!re.test(textos)) reg.fallas.push(`nunca dijo ${re}`);
  for (const re of x.nuncaDice ?? []) if (re.test(textos)) reg.fallas.push(`dijo ${re}`);
  if (x.frasePrecio === true && !diceFrasePrecio(textos, RANGO)) reg.fallas.push("nunca dijo la frase del rango");
  if (x.frasePrecio === false && diceFrasePrecio(textos, RANGO)) reg.fallas.push("dijo la frase del rango sin tenerla");
  if (reg.turnos.length < 3) reg.fallas.push("la conversación no llegó a ejercitarse");
  reg.estadoFinal = estado;
  reg.agendaVista = agendaVista;

  // El juez corre con el mismo prompt que vio el agente (en sinPrecio, sin el rango).
  if (conJuez) {
    try {
      const j = await juzgar(client, e, reg.turnos);
      reg.juez = j.veredicto;
      reg.usoJuez = j.uso;
    } catch (err) {
      reg.fallas.push(`el juez no pudo puntuar: ${(err as Error).message}`);
    }
  }
  if (e.sinPrecio && precioOriginal !== undefined) process.env.CHAT_PROMPT_PRECIO = precioOriginal;
  return reg;
}

function percentil(v: number[], p: number) {
  if (!v.length) return 0;
  const o = [...v].sort((a, b) => a - b);
  return o[Math.min(o.length - 1, Math.ceil((p / 100) * o.length) - 1)];
}

async function main() {
  const args = process.argv.slice(2);
  const valor = (k: string) => args.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  const salida = valor("salida") ?? join(process.cwd(), ".simulaciones");
  const repeticiones = Math.max(1, Number(valor("repeticiones") ?? 1));
  const paralelo = Math.max(1, Number(valor("paralelo") ?? 1));
  const conJuez = !args.includes("--sin-juez");
  const presupuesto = Number(process.env.PRESUPUESTO_USD ?? 5);
  const ids = args.filter((a) => !a.startsWith("--"));
  const elegidos = ids.length ? ESCENARIOS.filter((e) => ids.includes(e.id)) : ESCENARIOS;
  if (!process.env.OPENAI_API_KEY) throw new Error("falta OPENAI_API_KEY");
  if (RANGO.size === 0) throw new Error("falta CHAT_PROMPT_PRECIO con la frase del rango entre comillas: sin ella los escenarios de precio no prueban nada");
  mkdirSync(salida, { recursive: true });

  const client = new OpenAI();
  const registros: Registro[] = [];
  let gastado = 0;
  let cortado = false;
  console.log(`agente ${MODELO} · lead ${MODELO_LEAD} · juez ${conJuez ? MODELO_JUEZ : "apagado"} · ${elegidos.length} escenarios × ${repeticiones} · paralelo ${paralelo}`);

  const terminar = (reg: Registro) => {
    registros.push(reg);
    gastado += costo(MODELO, reg.uso) + costo(MODELO_LEAD, reg.usoLead) + costo(MODELO_JUEZ, reg.usoJuez);
    const dir = join(salida, `corrida-${reg.corrida}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${reg.id}.json`), JSON.stringify(reg, null, 2));
    const juez = reg.juez ? ` juez ${reg.juez.puntaje}` : "";
    console.log(`[${reg.corrida}] ${reg.fallas.length ? "FALLA" : "ok   "} ${reg.id} (${reg.turnos.length} mensajes, estado ${reg.estadoFinal}${juez}, ~USD ${gastado.toFixed(3)})${reg.fallas.length ? "\n      " + reg.fallas.join("\n      ") : ""}`);
    if (gastado > presupuesto && !cortado) {
      cortado = true;
      console.error(`\nCORTE: el costo estimado pasó USD ${presupuesto}. No se arrancan conversaciones nuevas.`);
    }
  };

  for (let c = 1; c <= repeticiones && !cortado; c++) {
    // Los que no tocan process.env, en paralelo.
    const cola = elegidos.filter((e) => !e.sinPrecio);
    const trabajadores = Array.from({ length: paralelo }, async () => {
      while (cola.length && !cortado) {
        const e = cola.shift()!;
        terminar(await correr(client, e, c, conJuez));
      }
    });
    await Promise.all(trabajadores);
    // Los que borran CHAT_PROMPT_PRECIO, solos.
    for (const e of elegidos.filter((e) => e.sinPrecio)) if (!cortado) terminar(await correr(client, e, c, conJuez));
  }

  const total = (f: (r: Registro) => Uso) => registros.reduce((a, r) => (sumar(a, f(r)), a), cero());
  const usoAgente = total((r) => r.uso);
  const usoLead = total((r) => r.usoLead);
  const usoJuez = total((r) => r.usoJuez);
  const lat = registros.flatMap((r) => r.latencias);
  const fallados = registros.filter((r) => r.fallas.length).length;

  // Estabilidad: escenarios que dieron distinto estado final u ok/falla entre corridas.
  const porId = new Map<string, Registro[]>();
  for (const r of registros) porId.set(r.id, [...(porId.get(r.id) ?? []), r]);
  const inestables = [...porId].filter(([, rs]) => new Set(rs.map((r) => `${r.estadoFinal}|${r.fallas.length ? "F" : "ok"}`)).size > 1).map(([id]) => id);

  const resumen = {
    modelos: { agente: MODELO, lead: MODELO_LEAD, juez: conJuez ? MODELO_JUEZ : null },
    repeticiones,
    cortadoPorPresupuesto: cortado,
    conversaciones: registros.length,
    limpias: registros.length - fallados,
    puntajeJuezPromedio: Math.round(registros.filter((r) => r.juez).reduce((a, r) => a + r.juez!.puntaje, 0) / Math.max(1, registros.filter((r) => r.juez).length)),
    inestables,
    latenciaMs: { turnos: lat.length, promedio: Math.round(lat.reduce((a, b) => a + b, 0) / Math.max(1, lat.length)), p50: percentil(lat, 50), p95: percentil(lat, 95), max: Math.max(0, ...lat) },
    reintentos: registros.flatMap((r) => r.turnos).filter((t) => (t.reintentos ?? 0) > 0).length,
    tokens: { agente: usoAgente, lead: usoLead, juez: usoJuez },
    costoEstimadoUsd: {
      agente: +costo(MODELO, usoAgente).toFixed(4),
      lead: +costo(MODELO_LEAD, usoLead).toFixed(4),
      juez: +costo(MODELO_JUEZ, usoJuez).toFixed(4),
      total: +gastado.toFixed(4),
      supuestos: { [MODELO]: precio(MODELO), [MODELO_LEAD]: precio(MODELO_LEAD), [MODELO_JUEZ]: precio(MODELO_JUEZ) },
    },
    porEscenario: [...porId].map(([id, rs]) => ({
      id,
      corridas: rs.sort((a, b) => a.corrida - b.corrida).map((r) => ({ corrida: r.corrida, estado: r.estadoFinal, agenda: r.agendaVista, ok: r.fallas.length === 0, fallas: r.fallas, juez: r.juez?.puntaje ?? null, desvioSimulador: r.juez?.simulador_se_desvio ?? null })),
    })),
  };
  writeFileSync(join(salida, "resumen.json"), JSON.stringify(resumen, null, 2));

  console.log(`\n${registros.length - fallados}/${registros.length} conversaciones limpias · juez promedio ${resumen.puntajeJuezPromedio} · inestables: ${inestables.join(", ") || "ninguno"}`);
  console.log(`latencia del motor por turno: promedio ${resumen.latenciaMs.promedio} ms · p95 ${resumen.latenciaMs.p95} ms · max ${resumen.latenciaMs.max} ms (${lat.length} turnos, ${resumen.reintentos} con reintento)`);
  console.log(`costo estimado: USD ${gastado.toFixed(3)} (agente ${resumen.costoEstimadoUsd.agente}, lead ${resumen.costoEstimadoUsd.lead}, juez ${resumen.costoEstimadoUsd.juez})`);
  process.exit(fallados || cortado ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
