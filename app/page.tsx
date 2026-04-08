import Image from "next/image";
import ProjectShowcase from "./components/project-showcase";

const heroBullets = [
  "Gateway, nube, app móvil e IA en una sola pila",
  "Sin hardware propietario ni licencias enterprise",
  "Control bidireccional fino sobre el PLC real",
  "Implementación en semanas, no en meses",
];

const problemItems = [
  {
    title: "Estás a ciegas",
    desc: "Te enterás de las fallas cuando llama el cliente. Mandás un técnico a 400 km a reiniciar algo que se arreglaba en 30 segundos desde el celular.",
  },
  {
    title: "Estás atado",
    desc: "Pagaste un IXrouter, un Tosibox o un ecosistema cerrado. Cada cambio depende de un proveedor que cobra por tag, por usuario y por respirar.",
  },
  {
    title: "Dejás plata sobre la mesa",
    desc: "Tus competidores ya venden servicio remoto premium como línea recurrente. Vos seguís facturando solo el fierro.",
  },
  {
    title: "Perdés conocimiento",
    desc: "El know-how de tus mejores operarios se va con ellos cuando se jubilan. Nadie lo está capturando.",
  },
];

const pillars = [
  {
    title: "Hardware abierto",
    desc: "Gateway sobre Raspberry Pi con driver específico para tu marca de PLC. Lectura y escritura reales sobre el mapa de registros.",
  },
  {
    title: "App propia, datos en vivo",
    desc: "Dashboards configurables, histórico en la nube, alarmas con escalado, control de cambios por usuario y gestión de roles.",
  },
  {
    title: "IA human-in-the-loop",
    desc: "La IA propone, tu operario decide, el sistema aprende. Sin imposiciones, sin caja negra, con auditoría completa.",
  },
  {
    title: "Sin lock-in",
    desc: "Ni hardware propietario. Ni licencias por tag. Ni licencias enterprise. Implementación + mensual fijo, punto.",
  },
];

const phases = [
  {
    n: "01",
    title: "Análisis",
    desc: "Mapeamos el PLC, registros y objetivos reales.",
    out: "Diagnóstico técnico y plan",
  },
  {
    n: "02",
    title: "Piloto",
    desc: "Implementamos sobre un equipo o instalación real.",
    out: "Prueba funcional en tu planta",
  },
  {
    n: "03",
    title: "Despliegue",
    desc: "Estandarizamos, replicamos y formamos a tu equipo.",
    out: "Plataforma viva + tu gente capacitada",
  },
  {
    n: "04",
    title: "Evolución",
    desc: "Mantenimiento, mejoras trimestrales y entrenamiento continuo de la IA.",
    out: "Una plataforma que crece, no que envejece",
  },
];

const aiPhases = [
  {
    title: "Observación",
    desc: "La IA detecta patrones y propone diagnósticos. El operario decide siempre.",
  },
  {
    title: "Aprendizaje",
    desc: "La IA aprende de las aprobaciones y rechazos. Captura el conocimiento de tus mejores técnicos antes de que se jubilen.",
  },
  {
    title: "Autonomía supervisada",
    desc: "La IA toma decisiones rutinarias bajo umbrales que vos definís, con auditoría completa.",
  },
];

const audience = [
  {
    icon: "🏭",
    title: "OEMs de maquinaria",
    desc: "Querés ofrecer servicio remoto y postventa facturable. Querés diferenciarte de la competencia que vende solo el fierro.",
  },
  {
    icon: "⚙️",
    title: "Operadores industriales",
    desc: "Ya pagaste el costo de no tener visibilidad sobre instalaciones distribuidas. No querés volver a vivirlo.",
  },
  {
    icon: "🔧",
    title: "Instaladores e integradores",
    desc: "Querés sumar una plataforma white-label bajo tu propia marca, sin desarrollarla desde cero.",
  },
];

const compareRows = [
  ["Proveedores a coordinar", "3-4", "1"],
  ["Hardware", "Propietario, lock-in", "Abierto, Raspberry Pi"],
  ["Licencias", "Por tag, por usuario, enterprise", "Implementación + mensual fijo"],
  ["Control bidireccional", "Limitado", "Fino, sobre el mapa real"],
  ["IA", "Caja negra o inexistente", "Human-in-the-loop, auditable"],
  ["Tiempo de implementación", "Meses", "Semanas"],
  ["Trato", "Comercial → soporte → ¿?", "Directo con quien desarrolla"],
];

const bonusItems = [
  "Plantilla de protocolo interno de diagnóstico remoto",
  "Guion técnico-comercial para vender el nuevo valor",
  "Roadmap visible de drivers de PLC y fases de IA",
  "Revisión trimestral de mejoras y entrenamiento de la IA",
  "Documentación técnica completa",
  "Formación de tu equipo",
];

const faqs = [
  {
    q: "¿Y si mi PLC es de una marca rara?",
    a: "Probablemente ya tengamos el driver. Si no, lo desarrollamos. Trabajamos con Siemens, CAREL, Schneider, Allen-Bradley, Mitsubishi, Omron y otros bajo demanda.",
  },
  {
    q: "¿Qué pasa con mis datos?",
    a: "Son tuyos. Hosting transparente, exportables cuando quieras, sin secuestro.",
  },
  {
    q: "¿La IA va a tomar decisiones sin que yo lo sepa?",
    a: "No. Empezás en modo observación. La IA propone, tu operario decide. Avanzás de fase solo si vos querés.",
  },
  {
    q: "¿Cuánto tarda un piloto?",
    a: "Semanas, no meses. Depende del PLC y del acceso a la instalación. Te damos fecha cerrada después de la llamada de análisis.",
  },
  {
    q: "¿Y si dejo de pagar el mensual?",
    a: "Te quedás con el hardware y con tus datos. No hay rehenes.",
  },
  {
    q: "¿Atienden fuera de mi país?",
    a: "Sí. Trabajamos remoto y viajamos al sitio para el piloto si hace falta.",
  },
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

const CTA_HREF = "/diagnostico";
const CTA_LABEL = "Agendar llamada de 40 minutos";

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
            <a href="#proyectos" className="transition hover:text-secondary">Proyectos</a>
            <a href="#faq" className="transition hover:text-secondary">FAQ</a>
          </nav>

          <a
            href={CTA_HREF}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Agendar llamada
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
              Plataforma industrial end-to-end · IA human-in-the-loop
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-surface-dark md:text-5xl lg:text-[3.5rem]">
              Convertí tu maquinaria con PLC en una plataforma conectada, controlable y con IA — en semanas, no en meses.
            </h1>

            <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-muted">
              <p>Gateway, nube, app móvil y capa de IA supervisada en una sola solución a medida.</p>
              <p>Sin hardware propietario. Sin licencias enterprise. Sin atarte a nadie.</p>
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
                href={CTA_HREF}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
              >
                {CTA_LABEL}
                <ArrowIcon />
              </a>
              <p className="text-sm text-muted">40 minutos · Sin venta dura · Salís con un diagnóstico de tu caso.</p>
            </div>

            <div className="mt-12 border-t border-border/60 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Compatible con</p>
              <p className="mt-3 text-sm font-medium text-secondary">
                Siemens · CAREL · Schneider · Allen-Bradley · Mitsubishi · Omron · y otros bajo demanda
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problema" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">El problema</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Cada hora que tu equipo está ciego frente a una instalación, perdés plata.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              La mayoría de los OEMs y operadores industriales viven con los mismos cuatro dolores. Si reconocés alguno, no estás solo —y tiene solución.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {problemItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-red-100 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-red-50 p-2 text-red-500">
                    <XIcon />
                  </div>
                  <h3 className="text-base font-semibold text-surface-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solucion" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">La solución</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Una sola pila. End-to-end. Tuya.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Lo que normalmente comprás a 3 o 4 proveedores distintos —gateway industrial, plataforma IIoT, app móvil y analítica de IA— integrado en una solución a medida, desplegada en semanas.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.09)]"
                >
                  <span className="pointer-events-none absolute -right-2 -top-5 select-none text-8xl font-black text-slate-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 text-lg font-semibold text-surface-dark">{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Cómo lo hacemos</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              De PLC ciego a plataforma replicable, en 4 fases claras.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {phases.map((ph) => (
                <div key={ph.n} className="rounded-2xl border border-border bg-white p-6">
                  <span className="text-xs font-bold tracking-widest text-primary">{ph.n}</span>
                  <h3 className="mt-2 text-lg font-semibold text-surface-dark">{ph.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{ph.desc}</p>
                  <div className="mt-4 border-t border-border/60 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">Te llevás</p>
                    <p className="mt-1 text-sm font-medium text-secondary">{ph.out}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI layer */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Capa de IA</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              IA que tus operarios aceptan, porque no los reemplaza: los amplifica.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Tres fases progresivas. Avanzás cuando vos querés, nunca antes.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {aiPhases.map((p, i) => (
                <article key={p.title} className="rounded-2xl border border-border bg-white p-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-surface-dark">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="proyectos" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Caso real</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              3W Control · Plataforma para frigoríficos industriales
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Plataforma end-to-end de supervisión, control e IA para todas las plantas frigoríficas que opera 3W SRL.
            </p>

            <ProjectShowcase />

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={CTA_HREF}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
              >
                ¿Tu caso se parece? Hablemos
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Para quién es</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Esto es para vos si…
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {audience.map((a) => (
                <article key={a.title} className="rounded-2xl border border-border bg-white p-6">
                  <span className="text-3xl">{a.icon}</span>
                  <h3 className="mt-3 text-lg font-semibold text-surface-dark">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.desc}</p>
                </article>
              ))}
            </div>

            <p className="mt-6 text-sm italic text-muted">
              Si no entrás en ninguno de estos tres, probablemente no seamos para vos. Y está bien.
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Por qué nosotros</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Lo que te ahorrás eligiéndonos.
            </h2>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-4"></th>
                    <th className="px-5 py-4">Stack tradicional</th>
                    <th className="px-5 py-4 text-primary">FW Labs</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([label, a, b], i) => (
                    <tr key={label} className={i % 2 ? "bg-slate-50/50" : ""}>
                      <td className="px-5 py-4 font-semibold text-surface-dark">{label}</td>
                      <td className="px-5 py-4 text-muted">{a}</td>
                      <td className="px-5 py-4 font-semibold text-secondary">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bonus */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Bonus incluidos</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Lo que te llevás además de la plataforma.
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

        {/* Pricing model */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Modelo comercial</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Sin sorpresas. Sin letra chica.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">01</p>
                <h3 className="mt-2 text-lg font-semibold text-surface-dark">Implementación inicial</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Análisis del PLC, piloto funcional, despliegue y formación del equipo.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">02</p>
                <h3 className="mt-2 text-lg font-semibold text-surface-dark">Mensual recurrente</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Hosting, mantenimiento, mejoras, revisiones trimestrales y entrenamiento continuo de la IA.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-sm text-muted">
              Sin licencias por tag. Sin licencias por usuario. Sin atadura de hardware. El número exacto depende de tu PLC, cantidad de instalaciones y fase de IA. Te lo decimos en la llamada, sin vueltas.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">FAQ</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Lo que nos preguntan siempre.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border bg-white p-5 open:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-surface-dark">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
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
              40 minutos pueden cambiar cómo opera tu planta los próximos 10 años.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Agendá una llamada. Te escuchamos, miramos tu caso y te decimos —sin vueltas— si podemos ayudarte o no. Si no es para vos, te lo decimos en el minuto 5.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={CTA_HREF}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-blue-600"
              >
                {CTA_LABEL}
                <ArrowIcon />
              </a>
              <p className="text-sm text-slate-400">Sin formularios eternos · Sin venta agresiva</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-surface-dark">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-white">FW Labs</p>
          <p>faustino@fwlabsllc.com</p>
        </div>
      </footer>
    </div>
  );
}
