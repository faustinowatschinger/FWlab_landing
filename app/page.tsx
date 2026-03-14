import Image from "next/image";

const heroBullets = [
  "Respuesta automatica en segundos",
  "Leads organizados y clasificados",
  "Seguimiento automatico a interesados",
  "Mas ventas con los mismos anuncios",
];

const problemItems = [
  "Los leads llegan y nadie responde rapido",
  "Los vendedores responden horas despues",
  "No hay seguimiento",
  "Los chats se pierden entre conversaciones",
];

const solutionItems = [
  "respuesta automatica inmediata",
  "clasificacion de leads",
  "guion de ventas por chat",
  "seguimiento automatico",
  "metricas de conversion",
];

const resultItems = [
  "Mas leads atendidos",
  "Mas conversaciones que avanzan",
  "Mas seguimiento",
  "Mas ventas desde los mismos anuncios",
];

export default function Home() {
  return (
    <div className="min-h-screen text-text">
      <header className="sticky top-0 z-30 border-b border-border/90 bg-white backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="inline-flex items-center">
            <Image
              src="/logo1.png"
              alt="FW Labs logo"
              width={132}
              height={40}
              className="h-25 w-auto"
              priority
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="#problema" className="hover:text-secondary">
              Problema
            </a>
            <a href="#solucion" className="hover:text-secondary">
              Solucion
            </a>
            <a href="#resultados" className="hover:text-secondary">
              Resultados
            </a>
          </nav>

          <a
            href="/diagnostico"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Solicitar diagnostico gratuito
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-6 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-28 h-60 w-60 rounded-full bg-slate-300/35 blur-3xl" />

          <div className="mx-auto w-full max-w-6xl px-6 pb-18 pt-16 lg:px-10 lg:pt-24">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              WhatsApp Revenue Engine
            </span>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-surface-dark md:text-5xl lg:text-6xl">
              Convierte mas leads de WhatsApp en ventas sin aumentar tu
              presupuesto en publicidad
            </h1>

            <div className="mt-5 max-w-4xl space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Si inviertes en Meta Ads o Google Ads y los leads llegan por
                WhatsApp, probablemente estes perdiendo ventas porque tu equipo
                responde tarde o no hace seguimiento.
              </p>
              <p>
                Implementamos un sistema que responde en segundos, organiza las
                conversaciones y guia a los clientes hacia la compra.
              </p>
            </div>

            <div className="mt-8 space-y-1 text-lg font-medium text-secondary">
              {heroBullets.map((bullet) => (
                <p key={bullet}>• {bullet}</p>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/diagnostico"
                className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
              >
                Solicitar diagnostico gratuito
              </a>
            </div>

            <p className="mt-6 text-sm font-medium text-muted">
              Descubre donde estas perdiendo ventas en tu WhatsApp.
            </p>
          </div>
        </section>

        <section
          id="problema"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Problema
            </span>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
              Estas pagando publicidad, pero muchas ventas se pierden despues
              del clic
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
              El problema no siempre esta en los anuncios. Muchas veces esta en
              lo que pasa cuando el lead llega por WhatsApp.
            </p>

            <ul className="mt-6 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
              {problemItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
              Cuando eso pasa, el lead se enfria y termina comprando en otro
              lado.
            </p>
          </div>
        </section>

        <section
          id="solucion"
          className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Solucion
          </span>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
            WhatsApp Revenue Engine
          </h2>

          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
            <p>
              No es solo automatizacion. Es un sistema completo para responder,
              ordenar y convertir mas leads en ventas.
            </p>
            <p>
              El objetivo es simple: que ningun lead se pierda.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutionItems.map((item, index) => (
              <article
                key={item}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
              >
                <span className="text-xs font-semibold text-muted">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-secondary">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="resultados"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Resultado
            </span>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
              Que cambia cuando implementas el sistema
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {resultItems.map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                >
                  <p className="text-base font-semibold text-secondary">{item}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
              <p>Sin tener que contratar mas vendedores.</p>
              <p>
                Y sin depender de que alguien este pegado al telefono todo el
                dia.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/diagnostico"
                className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
              >
                Solicitar diagnostico gratuito
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-secondary">FW Labs</p>
          <p>hello@fwlabsllc.com</p>
        </div>
      </footer>
    </div>
  );
}
