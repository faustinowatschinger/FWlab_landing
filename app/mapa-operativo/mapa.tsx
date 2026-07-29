import type { MapaOperativo } from "./preguntas";

const CALENDLY = "https://calendly.com/fwlabs/llamada-gratuita";

function Seccion({
  numero,
  titulo,
  bajada,
  children,
}: {
  numero: number;
  titulo: string;
  bajada: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-11">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold text-primary">{numero}</span>
        <h2 className="text-xl font-semibold text-text sm:text-2xl">{titulo}</h2>
      </div>
      <p className="mt-1 pl-7 text-sm text-muted">{bajada}</p>
      <div className="mt-4 space-y-3 pl-7">{children}</div>
    </section>
  );
}

function Fila({
  titulo,
  detalle,
  alerta = false,
}: {
  titulo: string;
  detalle: string;
  alerta?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        alerta ? "border-amber-300 bg-amber-50/60" : "border-border bg-surface"
      }`}
    >
      <p className="font-medium text-text">{titulo}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{detalle}</p>
    </div>
  );
}

/** "Sí" / "No" / "Todavía no" — el veredicto es el dato, va destacado. */
function Veredicto({ valor }: { valor: string }) {
  const v = valor.trim().toLowerCase();
  const estilo =
    v.startsWith("sí") || v.startsWith("si")
      ? "bg-emerald-100 text-emerald-900"
      : v.startsWith("no")
        ? "bg-slate-200 text-slate-800"
        : "bg-amber-100 text-amber-900";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilo}`}
    >
      {valor}
    </span>
  );
}

export function Mapa({ mapa, empresa }: { mapa: MapaOperativo; empresa: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        Análisis operativo · {empresa}
      </p>
      <h1 className="mt-3 text-2xl font-semibold leading-snug text-text sm:text-3xl">
        {mapa.titular}
      </h1>

      {mapa.procesos.length > 0 && (
        <Seccion
          numero={1}
          titulo="Cómo funcionan hoy tus procesos"
          bajada="De punta a punta, y dónde se corta cada uno. Todo lo que viene después sale de acá."
        >
          {mapa.procesos.map((i, k) => (
            <div key={k} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-medium text-text">{i.proceso}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {i.como_funciona_hoy}
              </p>
              <p className="mt-2 border-l-2 border-amber-400 pl-3 text-sm leading-relaxed text-text">
                Se corta en: {i.donde_se_corta}
              </p>
            </div>
          ))}
        </Seccion>
      )}

      {mapa.riesgos.length > 0 && (
        <Seccion
          numero={2}
          titulo="De qué depende que esto siga funcionando"
          bajada="Lo que se rompe si falta una persona o si alguien reclama."
        >
          {mapa.riesgos.map((i, k) => (
            <Fila key={k} titulo={i.que} detalle={i.impacto} alerta />
          ))}
        </Seccion>
      )}

      {mapa.oportunidades.length > 0 && (
        <Seccion
          numero={3}
          titulo="Qué se puede resolver"
          bajada="Con qué se hace y cuánto laburo es de verdad."
        >
          {mapa.oportunidades.map((i, k) => (
            <div
              key={k}
              className="rounded-xl border border-primary/30 bg-primary/[0.03] p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-text">{i.que}</p>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-white">
                  {i.esfuerzo}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text">{i.como}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{i.impacto}</p>
            </div>
          ))}
        </Seccion>
      )}

      {mapa.criterio_ia.length > 0 && (
        <Seccion
          numero={4}
          titulo="Dónde entra la IA, y cuándo"
          bajada="Buena parte de esto no es inteligencia artificial: es ordenar datos primero. 'Todavía no' quiere decir más adelante, no que no va."
        >
          {mapa.criterio_ia.map((i, k) => (
            <div key={k} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-text">{i.caso}</p>
                <Veredicto valor={i.veredicto} />
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{i.por_que}</p>
              {i.cuando && (
                <p className="mt-2 border-l-2 border-primary/40 pl-3 text-sm leading-relaxed text-text">
                  {i.cuando}
                </p>
              )}
            </div>
          ))}
        </Seccion>
      )}

      {mapa.lo_que_no_haria.length > 0 && (
        <Seccion
          numero={5}
          titulo="Lo que no haría"
          bajada="La plata que no gastás también cuenta."
        >
          {mapa.lo_que_no_haria.map((i, k) => (
            <Fila key={k} titulo={i.que} detalle={i.por_que} alerta />
          ))}
        </Seccion>
      )}

      {mapa.orden.length > 0 && (
        <Seccion
          numero={6}
          titulo="El camino, paso por paso"
          bajada="Del desorden de hoy hasta la operación automatizada. Por el techo no se empieza."
        >
          <ol className="space-y-3">
            {mapa.orden.map((i, k) => (
              <li
                key={k}
                className="flex gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {k + 1}
                </span>
                <div>
                  <p className="font-medium text-text">{i.que}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{i.por_que}</p>
                </div>
              </li>
            ))}
          </ol>
        </Seccion>
      )}

      {mapa.destino && (
        <section className="mt-11 rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-text sm:text-2xl">
            Dónde terminás
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text">{mapa.destino}</p>
        </section>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-surface-dark p-6 text-white sm:p-8">
        <p className="text-base leading-relaxed text-slate-200">{mapa.cierre}</p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Quiero que lo hagan ustedes
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Te mandamos este análisis por mail también, así lo tenés a mano.
        </p>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        Esto sale de tus respuestas, no de una plantilla. Es tuyo: podés
        ejecutarlo solo, con tu gente o con quien quieras. Lo que cobramos no es
        esta información — es construirlo y que siga funcionando mientras la
        empresa no se detiene.
      </p>
    </div>
  );
}
