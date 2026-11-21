/**
 * Prueba los límites haciéndolos cortar a propósito. Sin red hacia afuera.
 *
 *   npx tsx app/lib/_pruebas/limites.test.ts
 *
 * Tres partes:
 * 1. El contador en memoria (el respaldo).
 * 2. El script contra un Redis REAL: levanta un `redis-server` de descarte en un
 *    puerto libre y lo apaga al final. Si no hay `redis-server` instalado, esa
 *    parte se saltea y lo dice.
 * 3. `consumir()` de punta a punta contra un servidor local que imita la API
 *    REST de Upstash (POST con el comando en JSON, `{ result }` de vuelta) y le
 *    pasa el comando a ese Redis. Imita el contrato documentado de Upstash: no
 *    reemplaza probarlo una vez contra la base real.
 */
import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

import { comando, consumir, consumirEnMemoria, interpretar, umbralesCruzados, vaciarMemoria, type Regla } from "../limites";

let fallas = 0;
function espero(nombre: string, ok: boolean) {
  if (!ok) fallas++;
  console.log(`${ok ? "ok   " : "FALLA"} ${nombre}`);
}

const T0 = 1_800_000_000_000; // múltiplo de 3.600.000: arranca justo en una ventana
const ip = (n: number): Regla => ({ nombre: "ip", clave: `p:ip:${n}`, max: 3, ventanaS: 3600 });
const global: Regla = { nombre: "global", clave: "p:global", max: 5, ventanaS: 3600 };

/* ── 1. Memoria ──────────────────────────────────────────────────────────── */

vaciarMemoria();
espero("memoria: deja pasar hasta el máximo", [1, 2, 3].every(() => consumirEnMemoria([ip(1), global], T0).ok));
{
  const r = consumirEnMemoria([ip(1), global], T0);
  espero("memoria: corta al pasarse y dice qué regla", !r.ok && r.corte === "ip");
}
{
  // La IP 1 quedó frenada; sus intentos rechazados no tienen que gastar el global.
  for (let i = 0; i < 20; i++) consumirEnMemoria([ip(1), global], T0);
  const r = consumirEnMemoria([ip(2), global], T0);
  espero("memoria: un rechazo no consume el cupo global", r.ok && r.cuentas.global === 4);
}
{
  consumirEnMemoria([ip(3), global], T0);
  const r = consumirEnMemoria([ip(4), global], T0);
  espero("memoria: corta por el global aunque la IP sea nueva", !r.ok && r.corte === "global");
  const otra = consumirEnMemoria([ip(4)], T0);
  espero("memoria: el corte global no le contó nada a esa IP", otra.ok && otra.cuentas.ip === 1);
}
{
  const r = consumirEnMemoria([ip(1), global], T0 + 3600_000);
  espero("memoria: en la ventana siguiente vuelve a pasar", r.ok && r.cuentas.ip === 1 && r.cuentas.global === 1);
}
{
  vaciarMemoria();
  const ses: Regla = { nombre: "sesion", clave: "p:ses:abc", max: 2, ventanaS: 3600, desdePrimerUso: true };
  consumirEnMemoria([ses], T0 + 3500_000);
  consumirEnMemoria([ses], T0 + 3599_000);
  const cruza = consumirEnMemoria([ses], T0 + 3601_000);
  espero("memoria: desdePrimerUso no regala cupo al cambiar la ventana de reloj", !cruza.ok);
  const vencida = consumirEnMemoria([ses], T0 + 3500_000 + 3600_000 + 1);
  espero("memoria: desdePrimerUso vence a su tiempo desde el primer uso", vencida.ok);
}
{
  vaciarMemoria();
  const dia: Regla = { nombre: "dia", clave: "p:dia", max: 10, ventanaS: 86400 };
  const cruces: number[][] = [];
  for (let i = 0; i < 10; i++) cruces.push(umbralesCruzados(consumirEnMemoria([dia], T0), "dia", 10));
  espero(
    "umbrales: avisa una vez a la mitad y una vez al llegar",
    cruces.filter((c) => c.length).length === 2 && cruces[4][0] === 0.5 && cruces[9][0] === 1,
  );
  espero("umbrales: un rechazo no avisa", umbralesCruzados(consumirEnMemoria([dia], T0), "dia", 10).length === 0);
}

/* ── 2 y 3. Redis real ───────────────────────────────────────────────────── */

function puertoLibre(): Promise<number> {
  return new Promise((resolver) => {
    const s = createServer().listen(0, "127.0.0.1", () => {
      const { port } = s.address() as AddressInfo;
      s.close(() => resolver(port));
    });
  });
}

function hayBinario(nombre: string) {
  try {
    execFileSync(nombre, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function conRedis() {
  if (!hayBinario("redis-server") || !hayBinario("redis-cli")) {
    console.log("SALTEADO  Redis real: no hay redis-server/redis-cli en esta máquina. El script NO quedó probado.");
    return;
  }
  const puerto = await puertoLibre();
  const servidor: ChildProcess = spawn("redis-server", ["--port", String(puerto), "--bind", "127.0.0.1", "--save", "", "--appendonly", "no"], { stdio: "ignore" });
  const cli = (args: (string | number)[]) =>
    JSON.parse(execFileSync("redis-cli", ["-p", String(puerto), "--json", ...args.map(String)], { encoding: "utf8" })) as unknown;

  let imitacion: Server | null = null;
  try {
    for (let i = 0; i < 50; i++) {
      try {
        if (cli(["PING"]) === "PONG") break;
      } catch {
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    // 2. El script, tal cual sale de comando(), contra Redis.
    const reglas = [ip(1), global];
    const pasadas = [1, 2, 3].map(() => interpretar(reglas, cli(comando(reglas, T0))));
    espero("redis: deja pasar hasta el máximo y devuelve las cuentas", pasadas.every((p) => p?.ok) && pasadas[2]?.ok === true && pasadas[2].cuentas.ip === 3 && pasadas[2].cuentas.global === 3);
    const cortada = interpretar(reglas, cli(comando(reglas, T0)));
    espero("redis: corta al pasarse y dice qué regla", cortada?.ok === false && cortada.corte === "ip");
    for (let i = 0; i < 20; i++) cli(comando(reglas, T0));
    const otraIp = interpretar([ip(2), global], cli(comando([ip(2), global], T0)));
    espero("redis: un rechazo no consume el cupo global", otraIp?.ok === true && otraIp.cuentas.global === 4);
    const ttl = cli(["TTL", comando(reglas, T0)[3]]) as number;
    espero("redis: la clave vence sola (ttl de la ventana + 1 min)", ttl > 3600 && ttl <= 3660);
    const sig = interpretar(reglas, cli(comando(reglas, T0 + 3600_000)));
    espero("redis: en la ventana siguiente vuelve a pasar", sig?.ok === true && sig.cuentas.ip === 1);

    // 3. consumir() contra una imitación de la API REST de Upstash.
    let pedidos = 0;
    imitacion = createServer((req, res) => {
      let cuerpo = "";
      req.on("data", (c) => (cuerpo += c));
      req.on("end", () => {
        pedidos++;
        res.setHeader("Content-Type", "application/json");
        if (req.method !== "POST" || req.headers.authorization !== "Bearer token-de-prueba") {
          res.statusCode = 401;
          return res.end(JSON.stringify({ error: "Unauthorized" }));
        }
        try {
          res.end(JSON.stringify({ result: cli(JSON.parse(cuerpo) as (string | number)[]) }));
        } catch (e) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });
    });
    await new Promise<void>((r) => imitacion!.listen(0, "127.0.0.1", r));
    const url = `http://127.0.0.1:${(imitacion.address() as AddressInfo).port}`;

    process.env.UPSTASH_REDIS_REST_URL = url;
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-prueba";
    cli(["FLUSHALL"]);
    const techo: Regla = { nombre: "global", clave: "p:concurrencia", max: 10, ventanaS: 3600 };
    const paralelo = await Promise.all(Array.from({ length: 60 }, () => consumir([techo])));
    espero(
      "consumir: 60 pedidos a la vez contra un techo de 10 dejan pasar exactamente 10",
      paralelo.filter((r) => r.ok).length === 10 && paralelo.every((r) => !r.respaldo) && pedidos === 60,
    );

    // Token mal: tiene que caer a memoria sin tirar error, y decirlo.
    process.env.UPSTASH_REDIS_REST_TOKEN = "otro";
    vaciarMemoria();
    const malToken = await consumir([techo]);
    espero("consumir: si Redis rechaza, cuenta en memoria y sigue", malToken.ok && malToken.respaldo);

    // Redis caído: igual.
    await new Promise<void>((r) => imitacion!.close(() => r()));
    imitacion = null;
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-prueba";
    const caido = await consumir([techo]);
    espero("consumir: si Redis no contesta, cuenta en memoria y sigue", caido.ok && caido.respaldo);
  } finally {
    imitacion?.close();
    servidor.kill();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  }
}

async function main() {
  await conRedis();

  vaciarMemoria();
  const sinRedis = await consumir([{ nombre: "x", clave: "p:sin-redis", max: 1, ventanaS: 60 }]);
  espero("consumir: sin variables de Redis usa memoria", sinRedis.ok && sinRedis.respaldo);

  console.log(fallas ? `\n${fallas} FALLA(S)` : "\nTodo ok");
  process.exit(fallas ? 1 : 0);
}

main();
