import Image from "next/image";

const heroBullets = [
  "Respuesta inmediata a nuevos leads",
  "Organización y clasificación de conversaciones",
  "Seguimiento automático a interesados",
  "Más ventas sin aumentar tu presupuesto en anuncios",
];

const problemItems = [
  "respuesta lenta",
  "chats desordenados",
  "falta de seguimiento",
  "oportunidades perdidas",
];

const solutionItems = [
  "automatización inicial",
  "organización de leads",
  "sistema comercial por WhatsApp",
  "seguimiento automático",
  "recuperación de interesados",
];

const benefitItems = [
  "más leads atendidos a tiempo",
  "más conversaciones que avanzan",
  "más seguimiento",
  "menos oportunidades perdidas",
  "más ventas con la misma inversión publicitaria",
];

const bonusItems = [
  "guion de ventas por WhatsApp",
  "manejo de objeciones",
  "plantillas de audios de venta",
  "recuperación de leads fríos",
  "capacitación al equipo comercial",
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
              Vende más por WhatsApp con los mismos leads que ya estás pagando
            </h1>

            <div className="mt-5 max-w-4xl space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Si tus anuncios generan consultas pero no se convierten en ventas, el problema no siempre está en la publicidad.
              </p>
              <p>
                Muchas veces está en la respuesta tardía, el desorden y la falta de seguimiento.
              </p>
              <p>
                En FW Labs transformamos WhatsApp en un sistema de conversión.
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
              Muchos leads se pierden después del clic
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
              Invertís en publicidad, entran mensajes por WhatsApp, pero muchas oportunidades se enfrían porque nadie responde a tiempo, no hay seguimiento y las conversaciones se mezclan.
            </p>

            <ul className="mt-6 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
              {problemItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>


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
            La solución: WhatsApp Revenue Engine
          </h2>

          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
            <p>
              Implementamos un sistema para que tu negocio responda más rápido, organice mejor sus leads y haga seguimiento de forma consistente.
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
            Beneficios
          </span>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
            Qué cambia cuando implementás el sistema
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefitItems.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
              >
                <p className="text-base font-semibold text-secondary">{item}</p>
              </article>
            ))}
          </div>
        </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Bonus Incluidos
          </span>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
            Bonus incluidos
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bonusItems.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
              >
                <p className="text-sm font-medium leading-relaxed text-secondary">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/80 bg-slate-50 py-18">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <h2 className="max-w-4xl text-3xl font-semibold text-surface-dark">
              No necesitás más leads. Necesitás convertir mejor los que ya te escriben.
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
              Solicitá un diagnóstico gratuito y descubrí dónde se están perdiendo ventas en tu WhatsApp.
            </p>

            <div className="mt-8">
              <a
                href="/diagnostico"
                className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
              >
                Solicitar diagnóstico gratuito
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
