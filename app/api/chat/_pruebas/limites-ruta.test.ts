/**
 * Prueba los límites de POST /api/chat llamando a la ruta de verdad, sin red:
 * todo `fetch` queda interceptado y el modelo "contesta" 400, así que cada
 * pedido que pasa los límites vuelve 502 y cada uno que se corta vuelve 429.
 * No gasta API.
 *
 *   npx tsx app/api/chat/_pruebas/limites-ruta.test.ts
 *
 * Corre con el contador en memoria (sin variables de Redis). El de Redis se
 * prueba en app/lib/_pruebas/limites.test.ts.
 */
import { NextRequest } from "next/server";

process.env.OPENAI_API_KEY = "prueba-no-es-una-clave";
process.env.CHAT_MAX_POR_IP = "40";
process.env.CHAT_MAX_GLOBAL = "70";
process.env.CHAT_MAX_DIA = "75";
delete process.env.UPSTASH_REDIS_REST_URL;
delete process.env.UPSTASH_REDIS_REST_TOKEN;
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;

let alModelo = 0;
globalThis.fetch = (async (entrada: RequestInfo | URL) => {
  const url = String(entrada instanceof Request ? entrada.url : entrada);
  if (url.includes("/responses")) {
    alModelo++;
    return new Response(JSON.stringify({ error: { message: "prueba", type: "invalid_request_error" } }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("{}", { status: 503 });
}) as typeof fetch;

let fallas = 0;
function espero(nombre: string, ok: boolean) {
  if (!ok) fallas++;
  console.log(`${ok ? "ok   " : "FALLA"} ${nombre}`);
}

async function main() {
  const { POST } = await import("../route");
  const { firmar, nueva } = await import("../sesion");
  const silencio = console.error;
  console.error = () => {};

  const pedir = async (ip: string, cuerpo: Record<string, unknown>) => {
    const res = await POST(
      new NextRequest("http://localhost/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip, host: "localhost", origin: "http://localhost" },
        body: JSON.stringify(cuerpo),
      }),
    );
    return { status: res.status, datos: (await res.json()) as { error?: string; limite?: boolean } };
  };

  // 1. Replay: el mismo token firmado, mandado una y otra vez.
  const sesion = nueva({});
  sesion.turnos = [
    { rol: "usuario", texto: "hola" },
    { rol: "agente", texto: "¿a qué se dedica tu negocio?" },
  ];
  const token = firmar(sesion);
  const replay = [];
  for (let i = 0; i < 25; i++) replay.push(await pedir("10.0.0.1", { sesion: token, mensaje: "vendo lotes" }));
  const pasaron = replay.filter((r) => r.status === 502).length;
  espero(`replay: el mismo token llega al modelo 20 veces (16 + margen) y no más (llegó ${pasaron})`, pasaron === 20 && alModelo === 20);
  espero("replay: después corta con el aviso de límite de la conversación", replay.slice(20).every((r) => r.status === 429 && r.datos.limite === true));

  // 2. Conversaciones nuevas desde una IP: 8 por hora.
  const nuevas = [];
  for (let i = 0; i < 10; i++) nuevas.push(await pedir("10.0.0.2", { mensaje: "hola" }));
  espero("sesiones por IP: pasan 8 y la novena se corta", nuevas.slice(0, 8).every((r) => r.status === 502) && nuevas.slice(8).every((r) => r.status === 429));

  // 3. Mensajes por IP: 40 por hora en esta prueba (20 ya gastó el replay en 10.0.0.1).
  const otra = nueva({});
  const porIp = [];
  for (let i = 0; i < 3; i++) {
    const s = { ...otra, id: `ip-${i}` };
    for (let j = 0; j < 8; j++) porIp.push(await pedir("10.0.0.1", { sesion: firmar(s), mensaje: "hola" }));
  }
  espero("mensajes por IP: corta al llegar a 40 en la hora", porIp.filter((r) => r.status === 502).length === 20 && porIp.slice(20).every((r) => r.status === 429 && !r.datos.limite));

  // 4. Techo global: 70 por hora. Van 48 (20 + 8 + 20). IPs distintas hasta pasarlo.
  const antes = alModelo;
  const global = [];
  for (let i = 0; i < 30; i++) global.push(await pedir(`10.1.0.${i}`, { mensaje: "hola" }));
  espero(
    `techo global: con IPs distintas corta en 70 (antes ${antes}, pasaron ${global.filter((r) => r.status === 502).length})`,
    antes === 48 && global.filter((r) => r.status === 502).length === 22 && global.slice(22).every((r) => r.status === 429),
  );
  espero("techo global: el modelo recibió exactamente 70 llamadas", alModelo === 70);

  console.error = silencio;
  console.log(fallas ? `\n${fallas} FALLA(S)` : "\nTodo ok");
  process.exit(fallas ? 1 : 0);
}

main();
