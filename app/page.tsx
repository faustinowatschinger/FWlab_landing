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
  "Landing page para conversión",
  "Seguimiento de clientes",
  "Recuperación de clientes perdidos",
  "Capacitación al equipo",
  "Mantenimiento de seguridad y sistema",
  "Arreglos de errores y cambios de comportamiento",
];

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-text">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/90 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="inline-flex items-center">
            <Image src="/logo1.png" alt="FW Labs logo" width={132} height={40} className="h-16 w-auto" priority />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="#problema" className="transition hover:text-secondary">Problema</a>
            <a href="#solucion" className="transition hover:text-secondary">Solución</a>
            <a href="#resultados" className="transition hover:text-secondary">Resultados</a>
          </nav>

          <a
            href="/diagnostico"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Diagnóstico gratuito
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#dbe4f0_1px,transparent_1px)] [background-size:28px_28px] opacity-50" />
          <div className="pointer-events-none absolute -left-24 -top-10 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />

          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-16 lg:px-10 lg:pt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              WhatsApp Revenue Engine
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-surface-dark md:text-5xl lg:text-[3.5rem]">
              Vende más por WhatsApp con los mismos leads que ya estás pagando
            </h1>

            <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-muted">
              <p>Si tus anuncios generan consultas pero no se convierten en ventas, el problema no siempre está en la publicidad.</p>
              <p>Muchas veces está en la respuesta tardía, el desorden y la falta de seguimiento.</p>
              <p>En FW Labs transformamos WhatsApp en un sistema de conversión.</p>
            </div>

            <ul className="mt-8 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
              {heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm font-medium text-secondary">
                  <span className="mt-0.5 flex-shrink-0 text-primary">
                    <CheckIcon />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="/diagnostico"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
              >
                Solicitar diagnostico gratuito
                <ArrowIcon />
              </a>
              <p className="text-sm text-muted">Descubre donde estas perdiendo ventas en tu WhatsApp.</p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problema" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Problema</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Muchos leads se pierden después del clic
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Invertís en publicidad, entran mensajes por WhatsApp, pero muchas oportunidades se enfrían porque nadie responde a tiempo, no hay seguimiento y las conversaciones se mezclan.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problemItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-red-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-red-50 p-2 text-red-500">
                    <XIcon />
                  </div>
                  <p className="text-sm font-semibold capitalize text-surface-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solucion" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Solución</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              La solución: WhatsApp Revenue Engine
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Implementamos un sistema para que tu negocio responda más rápido, organice mejor sus leads y haga seguimiento de forma consistente.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solutionItems.map((item, index) => (
                <article
                  key={item}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.09)]"
                >
                  <span className="pointer-events-none absolute -right-2 -top-5 select-none text-8xl font-black text-slate-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="relative mt-4 text-sm font-semibold capitalize leading-relaxed text-secondary">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="resultados" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Beneficios</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Qué cambia cuando implementás el sistema
            </h2>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefitItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-green-100 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]"
                >
                  <span className="mt-0.5 inline-flex flex-shrink-0 rounded-lg bg-green-50 p-1.5 text-green-600">
                    <CheckIcon />
                  </span>
                  <span className="text-sm font-semibold capitalize text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bonus */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Bonus Incluidos</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Bonus incluidos
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {bonusItems.map((item) => (
                <article
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-blue-100/60 bg-blue-50/40 p-5"
                >
                  <span className="mt-0.5 inline-flex flex-shrink-0 rounded-lg bg-blue-100 p-1.5 text-primary">
                    <StarIcon />
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-secondary">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-surface-dark py-24">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Siguiente paso
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-snug text-white lg:text-4xl">
              No necesitás más leads. Necesitás convertir mejor los que ya te escriben.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Solicitá un diagnóstico gratuito y descubrí dónde se están perdiendo ventas en tu WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="/diagnostico"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-blue-600"
              >
                Solicitar diagnóstico gratuito
                <ArrowIcon />
              </a>
              <p className="text-sm text-slate-400">Sin costo · Sin compromiso</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-surface-dark">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-white">FW Labs</p>
          <p>hello@fwlabsllc.com</p>
        </div>
      </footer>
    </div>
  );
}
