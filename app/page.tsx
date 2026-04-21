import Image from "next/image";
import ProjectShowcase from "./components/project-showcase";

const heroBullets = [
  "Un dashboard para todas las plantas de tu cartera",
  "Funciona con Danfoss, Full Gauge, Carel, Delta y más",
  "Desplegamos en 2 semanas, sin reemplazar tu hardware",
  "Soporte en español, directo con quien desarrolla",
];

const problemItems = [
  {
    title: "Tenés 4 dashboards para 5 plantas",
    desc: "Una en Sitrad porque metiste Full Gauge. Otra en la nube de Danfoss. Otra en tERA de Carel. Cada mañana revisás cuatro sistemas y rezás que no falle el quinto.",
  },
  {
    title: "Te enterás tarde y mandás gente de más",
    desc: "La cámara se descongeló a las 3 AM, el cliente te llama a las 7, despachás un técnico 400 km a reiniciar algo que se arreglaba en 30 segundos desde el celular.",
  },
  {
    title: "Facturás fierro, no servicio recurrente",
    desc: "Tu competencia ya le vende al dueño de la planta 'monitoreo remoto premium' como línea mensual. Vos seguís cobrando la instalación y la visita.",
  },
  {
    title: "Cada planta nueva suma un dashboard más",
    desc: "Cada vez que entrás a una planta nueva tu operación se complica en vez de escalar. Más usuarios, más contraseñas, más apps, más fricción.",
  },
];

const pillars = [
  {
    title: "Visibilidad total",
    desc: "Todas las plantas de tu cartera en un solo dashboard web + app. Temperaturas, presiones, consumos, estados de compresor. Histórico en la nube. Filtros por planta, por cliente, por equipo.",
  },
  {
    title: "Control remoto",
    desc: "Setpoints, arranques, defrost, bypass. Desde el celular, con control de cambios por usuario y rol. Auditoría completa de quién tocó qué y cuándo.",
  },
  {
    title: "Prevención con alertas",
    desc: "Umbrales configurables, escalado automático (email → SMS → llamada), contexto adjunto con las últimas 2 horas de datos. La falla se detecta antes de que te llame el cliente.",
  },
];

const phases = [
  {
    n: "01",
    title: "Análisis",
    desc: "Relevamos tu cartera: plantas, controladores, protocolos, dolores concretos.",
    out: "Diagnóstico + plan de despliegue con orden",
  },
  {
    n: "02",
    title: "Planta piloto",
    desc: "Instalamos el gateway en una planta, integramos los controladores que ya tiene, configuramos dashboard y alertas.",
    out: "Una planta viva en FW Control en 2 semanas",
  },
  {
    n: "03",
    title: "Despliegue en cartera",
    desc: "Replicamos sobre las demás plantas. Estandarizamos variables, nombres, alarmas. Capacitamos a tu equipo.",
    out: "Cartera unificada y tu gente operando sola",
  },
  {
    n: "04",
    title: "Evolución",
    desc: "Mantenimiento, nuevas plantas que sumes, mejoras de plataforma, reportes de compliance.",
    out: "Una plataforma que crece con tu negocio",
  },
];

const compatibilityGroups = [
  {
    title: "Controladores de refrigeración",
    items: ["Danfoss (AK-SC, AK-CC, EKC)", "Full Gauge (MT-512EL, TC-900E, VX-1225)", "Carel (pCO, pRack, µC2)", "Eliwell (IC, EWCM, ID Plus)", "Dixell (XR, XW, XC + XWEB EVO)", "Copeland CoreSense"],
  },
  {
    title: "PLCs industriales",
    items: ["Siemens S7-1200 / 1500", "Allen-Bradley CompactLogix / ControlLogix", "Delta (DVP, AS, AH series)", "Cualquier dispositivo con Modbus TCP o RTU"],
  },
];

const roadmapItems = [
  {
    stage: "Hoy",
    label: "Producto vivo",
    desc: "Gateway multi-fabricante, dashboard web, app React Native, alertas por umbral y tendencia, control remoto con auditoría.",
  },
  {
    stage: "Próximos 6 meses",
    label: "En desarrollo",
    desc: "Reportes HACCP / SENASA exportables, módulo de consumo eléctrico agregado, nuevas marcas de controlador bajo demanda.",
  },
  {
    stage: "Mediano plazo",
    label: "Roadmap",
    desc: "Detección asistida de leaks, mantenimiento predictivo por patrón de compresor, IA supervisada (human-in-the-loop) para recomendaciones operativas.",
  },
];

const audienceYes = [
  "Sos empresa integradora o frigorista industrial y mantenés refrigeración en plantas de terceros",
  "Tenés entre 3 y 15 plantas bajo cartera, o vas hacia ahí",
  "Trabajás con más de un fabricante de controlador y cada uno tiene su propia nube",
  "Querés sumar una línea de servicio recurrente sobre la cartera que ya tenés",
  "Estás en Argentina, Uruguay, Chile o Paraguay",
];

const audienceNo = [
  "Sos el operador final de una sola planta buscando monitorear tu propia cámara",
  "Sos cadena retail corporate con IT propio buscando plataforma enterprise",
  "Buscás armar algo DIY con Node-RED y Grafana vos mismo",
];

const compareHeaders = ["Cloud de fabricante (Sitrad, Alsense, tERA)", "SCADA enterprise (Ignition, AVEVA)", "DIY (Node-RED + Grafana)", "FW Control"];

const compareRows: Array<[string, string, string, string, string]> = [
  ["Multi-fabricante real", "Atado a su marca", "Sí, pero requiere developer", "Si lo programás vos", "Listo de fábrica"],
  ["Tiempo de despliegue", "Semanas", "Meses", "Meses + tu tiempo", "2 semanas por planta"],
  ["App móvil moderna", "Mayormente legacy", "Módulo extra", "No incluida", "Nativa React"],
  ["Soporte en español", "Vía distribuidor", "Partner certificado", "Foros", "Directo con quien desarrolla"],
  ["Especialización refrigeración", "Solo su hardware", "Genérico, lo armás vos", "Genérico, lo armás vos", "Dominio resuelto"],
];

const bonusItems = [
  "Protocolo de monitoreo remoto para ofrecerle el servicio a tus clientes finales",
  "Guion comercial para venderle 'servicio premium' al dueño de planta",
  "Roadmap visible de fabricantes y módulos que vienen",
  "Revisión trimestral de plataforma y nuevas alertas",
  "Capacitación completa de tu equipo operativo",
  "Documentación técnica para tu equipo",
];

const faqs = [
  {
    q: "¿Tengo que cambiar los controladores que mis clientes ya tienen instalados?",
    a: "No. Leemos lo que está. Instalamos un gateway en la planta que habla con los controladores existentes por Modbus TCP o RTU.",
  },
  {
    q: "Mi cliente tiene Sitrad gratis con Full Gauge. ¿Por qué pagaría FW Control?",
    a: "Sitrad solo funciona con hardware Full Gauge. Si todas sus plantas fueran Full Gauge, tal vez Sitrad le alcanza. El problema que resolvemos es cuando tiene plantas con Full Gauge, Danfoss y Carel mezclados. Sitrad no le unifica eso. Nosotros sí.",
  },
  {
    q: "¿Qué pasa con mis datos y los de mi cliente?",
    a: "Son del integrador y del cliente final. Hosting transparente, exportables cuando quieran, sin secuestro.",
  },
  {
    q: "¿Puedo revenderlo bajo mi propia marca?",
    a: "Hablamos en la llamada. Tenemos esquemas de partnership para integradores con cartera mediana o grande.",
  },
  {
    q: "¿Cuánto tarda una planta?",
    a: "2 semanas desde que tenemos acceso al controlador y a internet en la planta. Fecha cerrada después de la llamada de análisis.",
  },
  {
    q: "¿Y si dejo de pagar el mensual?",
    a: "El gateway queda instalado y los datos históricos exportables. No hay rehenes.",
  },
  {
    q: "¿Atienden fuera de Argentina?",
    a: "Sí. Hoy trabajamos en LATAM hispanohablante (AR, UY, CL, PY). Viajamos al sitio para el piloto si hace falta. Brasil, caso por caso.",
  },
  {
    q: "¿Hacen mantenimiento predictivo con IA?",
    a: "Hoy, no. Hacemos alertas por umbral y tendencia, que resuelve el 90% de los dolores reales. La capa de IA está en roadmap y la comunicamos con honestidad cuando esté lista.",
  },
];

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
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
            <a href="#proyectos" className="transition hover:text-secondary">Casos</a>
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
              Monitoreo remoto multi-planta · Refrigeración industrial
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-surface-dark md:text-5xl lg:text-[3.5rem]">
              Unificá todas las plantas frigoríficas de tu cartera en un solo dashboard.
            </h1>

            <div className="mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-muted">
              <p>Funciona con Danfoss, Full Gauge, Carel, Eliwell, Dixell y cualquier PLC Modbus.</p>
              <p>Desplegamos en 2 semanas, no en 3 meses. Sin reemplazar tu hardware. Sin atarte a ningún fabricante.</p>
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
              <p className="text-sm text-muted">40 minutos · Sin venta dura · Salís con un diagnóstico de tu cartera.</p>
            </div>

            <div className="mt-12 border-t border-border/60 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Compatible con</p>
              <p className="mt-3 text-sm font-medium text-secondary">
                Danfoss · Full Gauge · Carel · Eliwell · Dixell · Siemens S7 · Allen-Bradley · Delta · cualquier PLC con Modbus TCP/RTU
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problema" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">El problema</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Si mantenés refrigeración en plantas de terceros, ya sabés cómo termina esto.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Cuatro dolores que no se resuelven con otro controlador. Si reconocés alguno, no estás solo —y tiene solución.
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
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">La solución — FW Control</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Una plataforma. Todas tus plantas. Todos los fabricantes.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              FW Control unifica la refrigeración industrial que ya está instalada. Leemos los controladores que tu cliente ya tiene, los llevamos a un dashboard único, y te damos control remoto desde una app nativa. Vos seguís siendo el integrador. Nosotros somos tu stack.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
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
              De cartera desordenada a plataforma replicable, en 4 fases.
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

        {/* Compatibility */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Compatibilidad</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Leemos lo que ya está instalado. No te hacemos cambiar nada.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {compatibilityGroups.map((g) => (
                <div key={g.title} className="rounded-2xl border border-border bg-white p-6">
                  <h3 className="text-lg font-semibold text-surface-dark">{g.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                        <span className="mt-0.5 flex-shrink-0 text-primary">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-sm italic text-muted">
              ¿Tu cliente tiene un controlador raro? Mostranos el mapa de registros. Si habla Modbus, lo leemos.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="proyectos" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Caso real</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              3W Control · 5 plantas frigoríficas unificadas
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Integrador frigorista con 5 plantas de clientes en Argentina. Mix multi-fabricante. FW Control centralizó visibilidad, control y alertas en una sola plataforma.
            </p>

            <ProjectShowcase />

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href={CTA_HREF}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
              >
                ¿Tu cartera se parece? Hablemos
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

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  <CheckIcon className="h-3.5 w-3.5" />
                  Es para vos
                </div>
                <ul className="space-y-3">
                  {audienceYes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                      <span className="mt-0.5 flex-shrink-0 text-primary">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-red-100 bg-red-50/30 p-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
                  <XIcon className="h-3.5 w-3.5" />
                  No es para vos
                </div>
                <ul className="space-y-3">
                  {audienceNo.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                      <span className="mt-0.5 flex-shrink-0 text-red-500">
                        <XIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs italic text-muted">Si caés acá, probablemente no seamos tu solución. Y está bien.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Por qué nosotros</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Contra qué nos comparás realmente.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              La pregunta real no es &quot;cuál es más barato&quot;. Es cuál te deja operar tu cartera sin pelearte con cuatro dashboards.
            </p>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-4"></th>
                    {compareHeaders.slice(0, 3).map((h) => (
                      <th key={h} className="px-5 py-4">{h}</th>
                    ))}
                    <th className="px-5 py-4 text-primary">{compareHeaders[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row[0]} className={i % 2 ? "bg-slate-50/50" : ""}>
                      <td className="px-5 py-4 font-semibold text-surface-dark">{row[0]}</td>
                      <td className="px-5 py-4 text-muted">{row[1]}</td>
                      <td className="px-5 py-4 text-muted">{row[2]}</td>
                      <td className="px-5 py-4 text-muted">{row[3]}</td>
                      <td className="px-5 py-4 font-semibold text-secondary">{row[4]}</td>
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
                  Relevamiento, piloto, despliegue en cartera, integración con los controladores que ya tenés instalados, capacitación.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">02</p>
                <h3 className="mt-2 text-lg font-semibold text-surface-dark">Mensual por planta</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Hosting, mantenimiento, alertas, soporte, mejoras trimestrales.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-sm text-muted">
              Sin licencias por tag. Sin licencias por usuario. Sin hardware propietario que te ate. El número exacto depende de tu cartera, cuántas plantas y qué controladores. Te lo cerramos en la llamada, sin vueltas.
            </p>
          </div>
        </section>

        {/* Roadmap (honest, replaces AI pitch) */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Roadmap</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Lo que hay hoy, lo que viene, y cuándo.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              No vendemos IA mágica que no existe. Te mostramos qué funciona hoy y qué estamos construyendo, con honestidad.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {roadmapItems.map((r, i) => (
                <article key={r.stage} className="rounded-2xl border border-border bg-white p-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">{r.stage}</p>
                  <h3 className="mt-1 text-lg font-semibold text-surface-dark">{r.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-border/80 bg-slate-50 py-20">
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
              40 minutos para ver si FW Control le sirve a tu cartera.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Agendá una llamada. Miramos tu cartera de plantas, tus dolores reales, qué controladores manejás. Te decimos si FW Control te suma o no. Si no es para vos, te lo decimos en el minuto 10.
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
