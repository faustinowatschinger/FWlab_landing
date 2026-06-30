import type { Metadata } from "next";
import Image from "next/image";
import ProjectShowcase from "./components/project-showcase";
import CalendlyEmbed from "./components/calendly-embed";
import { PhoneFrame } from "./components/app-mockups";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroBullets = [
  "Control de tu operación a distancia, las 24 horas",
  "Te enterás antes de que el problema cueste plata",
  "Cada evento queda registrado y auditable",
  "Tu mejor gente decide, en vez de vigilar",
];

const trustStats = [
  { value: "327 hs", label: "ahorradas a 3W en 3 meses con FW Control" },
  { value: "5 plantas", label: "frigoríficas reales monitoreadas en tiempo real, hoy" },
  { value: "7,6M", label: "de lecturas procesadas, ~1 año en producción sin parar" },
  { value: "96,6%", label: "de las alertas, resueltas" },
];

const problemItems = [
  {
    title: "La empresa depende de vos",
    desc: "Si no estás, no funciona. No te podés ir de vacaciones, ni enfermarte, ni desconectar un fin de semana sin que algo se caiga o sin estar mirando el teléfono. El negocio no crece más allá de lo que controlás a mano.",
  },
  {
    title: "Sin estar ahí, perdés el control",
    desc: "Lo que pasa cuando no mirás, no lo ves. Cada vez que algo sale mal, alguien tiene que ir a resolverlo en persona. Una cámara que se descongela, una máquina que se para, un camión que se desvía: te enterás cuando ya es tarde.",
  },
  {
    title: "Te enterás tarde, y tarde cuesta plata",
    desc: "Reaccionás cuando el daño ya está hecho. Un parámetro crítico —temperatura, tiempo, presión, stock— se va de rango y para cuando te llega el aviso ya hay merma, parada o reclamo. Y muchas veces es tu palabra contra la del cliente: no quedó registro.",
  },
  {
    title: "Tu información vive dispersa",
    desc: "Datos en planillas, en papeles y en la cabeza de dos o tres personas clave. No los podés usar para decidir, y si esa persona falta, el conocimiento se va con ella. Operás a ciegas sobre lo que más te cuesta cuando falla.",
  },
];

const methodSteps = [
  {
    title: "Reunión inicial",
    tag: "Gratis · sin compromiso",
    desc: "Nos contás cómo operás y vemos si te podemos ayudar. Si hay un caso para implementar el sistema, te mostramos cómo sería. Si no, te lo decimos de una.",
  },
  {
    title: "Implementamos el sistema",
    tag: "Tu base de control",
    desc: "Montamos sobre tu operación el sistema que te da visibilidad y control a distancia: ves lo que pasa, te avisa cuando algo se sale de rango y actuás sin estar ahí. La misma base que corre para 3W.",
  },
  {
    title: "Diagnosticamos los procesos",
    tag: "Con datos reales",
    desc: "Con el sistema andando y datos sobre la mesa, mapeamos qué procesos conviene automatizar y en qué orden, por lo que más te libera en horas y en plata.",
  },
  {
    title: "Automatizamos",
    tag: "Donde más te libera",
    desc: "Recién acá se automatiza de verdad, por donde da más retorno. El sistema crece con tu operación: sumás procesos cuando los necesitás.",
  },
];

const differentiators = [
  {
    title: "IA real, no demos",
    desc: "Lo que te proponemos ya lo tenemos funcionando en una operación crítica hace casi un año. Demostramos, no declaramos.",
  },
  {
    title: "Lo resolvemos de punta a punta",
    desc: "De la máquina en planta a la notificación en tu celular, toda la cadena bajo un mismo techo. Si algo se rompe, hay una sola puerta a la que tocar.",
  },
  {
    title: "A tu medida, no un template",
    desc: "Diagnóstico real de cómo trabaja tu operación antes de tocar una línea de código. No es un sistema que prende y reza: es el tuyo.",
  },
  {
    title: "No vendemos IA mágica",
    desc: "Si algo no se puede automatizar todavía, te lo decimos. La IA no reemplaza tu criterio: te saca el trabajo de vigilar para que decidas mejor.",
  },
  {
    title: "Te hablamos claro",
    desc: "Nada de tecnicismos para impresionarte. Te explicamos qué hace el sistema, qué te ahorra y qué no, en castellano.",
  },
  {
    title: "Crece con tu operación",
    desc: "Arrancamos por el proceso que más te libera y sumamos desde ahí. No tenés que comprar todo de entrada.",
  },
];

const audienceYes = [
  "Tu negocio pasa por algo físico —producto, planta, activos, vehículos—, no es 100% oficina",
  "Tenés operación en varios lugares, o cosas que se mueven y hay que controlar",
  "Hoy todo depende de que alguien esté, vaya, recorra o mire",
  "Hay un parámetro crítico que, si se va de rango, cuesta plata: temperatura, tiempo, presión, stock, estado de máquina",
  "Sos el dueño o el responsable, y estás preso de tener que estar encima",
];

const audienceNo = [
  "Buscás un chatbot enlatado de diez dólares que prenda y listo",
  "Querés «IA mágica» que reemplace el criterio humano por completo (no existe, y te lo vamos a decir)",
  "Tu operación es 100% digital, sin nada físico ni distribuido que monitorear",
  "Querés resultados sin participar del relevamiento de tu propia operación",
];

// "Futuro" — qué consigue la operación con el sistema (antes → después).
const futureOutcomes = [
  {
    tag: "Visibilidad",
    title: "Ves todo, desde donde estés",
    before: "Hoy: para saber qué pasa tenés que ir, llamar o esperar el reporte.",
    after: "Con el sistema: abrís el celular y ves tu operación entera en tiempo real, estés donde estés.",
  },
  {
    tag: "Anticipación",
    title: "Te enterás antes de que cueste plata",
    before: "Hoy: reaccionás cuando el daño ya está hecho y muchas veces sin registro.",
    after: "Con el sistema: te avisa apenas algo se sale de rango, priorizado por severidad y con todo registrado.",
  },
  {
    tag: "Libertad",
    title: "Dejás de vigilar y empezás a decidir",
    before: "Hoy: la operación depende de que vos y tu gente estén encima.",
    after: "Con el sistema: el sistema mira, tu gente resuelve, y vos te ocupás de hacer crecer el negocio.",
  },
];

const faqs = [
  {
    q: "¿La IA me va a reemplazar a mí o a mi gente?",
    a: "No. Le saca a tu equipo el trabajo de estar vigilando y apagando incendios, para que se dediquen a lo que solo un humano hace: decidir. El sistema mira y avisa; vos y tu gente deciden. El criterio sigue siendo humano.",
  },
  {
    q: "Ya probé con tecnología una vez y fue plata tirada.",
    a: "Lo entendemos, y por eso no te pedimos que nos creas. Lo que te proponemos lo tenemos corriendo en una operación industrial crítica hace casi un año, con resultados medidos. Demostramos, no prometemos. Y arrancamos por un solo proceso, no por reformar todo.",
  },
  {
    q: "Para lo mío / mi rubro la IA no sirve.",
    a: "Lo que automatizamos no es un rubro, es un patrón: una operación física, distribuida, que hoy depende de que alguien esté presente para que no se caiga. Si tu negocio funciona así, casi siempre hay algo para sacarte de encima. En la llamada lo vemos en concreto.",
  },
  {
    q: "¿Esto es para empresas más grandes que la mía?",
    a: "No. Trabajamos con empresas medianas con operación intensiva. Arrancamos por el proceso que más te libera —no por una plataforma gigante— así que la inversión entra por donde tiene retorno.",
  },
  {
    q: "¿Me va a frenar la operación meterme en esto?",
    a: "No. Construimos sobre lo que ya tenés y sin parar lo que funciona. En muchos casos leemos los equipos que ya están instalados (por ejemplo, hablamos directo con PLCs industriales que ya están en planta) sin cambiar tu hardware.",
  },
  {
    q: "¿Qué pasa en la llamada de 20 minutos?",
    a: "Miramos tu operación por arriba, dónde dependés de estar encima y qué te está comiendo tiempo y plata. Te decimos si hay un caso. Sin venta dura, sin formularios eternos. Si no encajamos, te lo decimos en el minuto 10.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance del sistema y de tu operación, y lo cerramos después de entender cómo trabajás. El primer paso es la reunión, y es gratis: ahí vemos si te podemos ayudar y cómo sería implementar el sistema en tu operación.",
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

function Frost({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
      <path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2" />
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

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749ZM14.03 8.28a.75.75 0 0 0-1.06-1.06l-3.22 3.22-1.22-1.22a.75.75 0 1 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
    </svg>
  );
}

function ChatIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10 3c-4.31 0-8 2.69-8 6 0 2.05 1.41 3.86 3.55 4.95-.18.66-.6 1.5-1.36 2.24a.5.5 0 0 0 .36.85c1.65-.05 3-.62 3.96-1.2.46.08.95.13 1.46.16h.47c4.31 0 8-2.69 8-6s-3.69-6-8-6Z" clipRule="evenodd" />
    </svg>
  );
}

const CTA_HREF = "#agendar";
const CTA_LABEL = "Agendar llamada de 20 min";
const CALENDLY_URL = "https://calendly.com/fwlabs/llamada-de-diagnostico-gratuita";

const HERO_SHOTS = {
  left: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.34.42_resized.png",
  center: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.49_resized.png",
  right: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.41.01_resized.png",
};

const SITE_URL = "https://fwlabsllc.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FW Labs",
      url: SITE_URL,
      logo: `${SITE_URL}/logo1.png`,
      email: "faustino@fwlabsllc.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "FW Labs",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "FW Labs — IA y automatización para operaciones industriales",
      serviceType: "Automatización de procesos industriales y monitoreo con IA",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Argentina" },
      audience: { "@type": "Audience", audienceType: "Empresas industriales medianas" },
      description:
        "Sistemas de IA y automatización que monitorean operaciones industriales 24/7, detectan lo que importa y avisan a tiempo, para que el negocio no dependa de la presencia física del dueño.",
      url: SITE_URL,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/90 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="inline-flex items-center">
            <Image src="/logo1.png" alt="FW Labs logo" width={132} height={40} className="h-16 w-auto" priority />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="#problema" className="transition hover:text-secondary">Problema</a>
            <a href="#futuro" className="transition hover:text-secondary">Qué conseguís</a>
            <a href="#como-trabajamos" className="transition hover:text-secondary">Cómo trabajamos</a>
            <a href="#caso" className="transition hover:text-secondary">Caso real</a>
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

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pt-24">
            {/* Left: copy */}
            <div>
              <span className="fw-rise inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                IA y automatización para operaciones industriales
              </span>

              <h1
                className="fw-rise mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-surface-dark md:text-5xl lg:text-[3.4rem]"
                style={{ animationDelay: "80ms" }}
              >
                Tu operación no debería frenarse{" "}
                <span className="text-primary">cuando vos no estás.</span>
              </h1>

              <p className="fw-rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
                Construimos sistemas de IA y automatización que vigilan tu operación las 24 horas, detectan lo que importa
                y te avisan a tiempo. Para que dejes de apagar incendios y de tener que estar físicamente arriba de todo
                para que las cosas no se caigan.
              </p>

              <ul className="fw-rise mt-8 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2" style={{ animationDelay: "240ms" }}>
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm font-medium text-secondary">
                    <span className="mt-0.5 flex-shrink-0 text-primary">
                      <CheckIcon />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="fw-rise mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "320ms" }}>
                <a
                  href={CTA_HREF}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
                >
                  {CTA_LABEL}
                  <ArrowIcon />
                </a>
                <p className="text-sm text-muted">20 minutos · Sin venta dura · Salís con claridad aunque no trabajemos juntos.</p>
              </div>
            </div>

            {/* Right: producto real (app de FW Control) — capturas en frames premium + ambiente frigorífico */}
            <div className="fw-rise relative mx-auto flex w-full items-center justify-center" style={{ animationDelay: "200ms" }}>
              {/* Ambiente frío: niebla de cámara frigorífica */}
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,rgba(125,211,252,0.55),rgba(186,230,253,0.25)_45%,transparent_72%)] blur-2xl" />
              <Frost className="pointer-events-none absolute -left-2 -top-2 h-10 w-10 text-cyan-300/70" />
              <Frost className="pointer-events-none absolute right-2 top-10 h-6 w-6 text-sky-300/60" />
              <Frost className="pointer-events-none absolute -bottom-1 left-10 h-7 w-7 text-cyan-200/70" />

              {/* Left phone (back) */}
              <PhoneFrame className="z-0 -mr-10 hidden w-[130px] flex-shrink-0 translate-y-8 -rotate-[10deg] sm:block lg:w-[140px]">
                <Image src={HERO_SHOTS.left} alt="App de FW Control: panel de la operación" fill sizes="140px" className="object-cover" />
              </PhoneFrame>

              {/* Center phone (front) */}
              <PhoneFrame className="z-10 w-[210px] flex-shrink-0 lg:w-[225px]">
                <Image src={HERO_SHOTS.center} alt="App de FW Control: monitoreo de una planta frigorífica en tiempo real" fill sizes="225px" className="object-cover" priority />
              </PhoneFrame>

              {/* Right phone (back) */}
              <PhoneFrame className="z-0 -ml-10 hidden w-[130px] flex-shrink-0 translate-y-8 rotate-[10deg] sm:block lg:w-[140px]">
                <Image src={HERO_SHOTS.right} alt="App de FW Control: alertas y registro de cambios" fill sizes="140px" className="object-cover" />
              </PhoneFrame>

              {/* Chip de temperatura — refuerza el contexto frigorífico */}
              <div className="absolute -left-2 top-6 z-20 hidden items-center gap-2 rounded-xl border border-cyan-100 bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm lg:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600"><Frost className="h-4 w-4" /></span>
                <div>
                  <p className="text-sm font-black leading-none tracking-tight text-surface-dark">-22 °C</p>
                  <p className="mt-0.5 text-[10px] font-medium text-emerald-600">Cámara estable</p>
                </div>
              </div>

              {/* Floating proof card */}
              <div className="absolute -bottom-4 -right-2 z-20 hidden rounded-xl border border-border bg-white/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:block">
                <p className="text-2xl font-black leading-none tracking-tight text-surface-dark">327 hs</p>
                <p className="mt-1 text-[11px] text-muted">ahorradas en 3 meses</p>
              </div>
            </div>
          </div>

          {/* Trust stats band */}
          <div className="relative border-t border-border/60 bg-white/60">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-6 lg:grid-cols-4 lg:px-10">
              {trustStats.map((s) => (
                <div key={s.value} className="px-2 py-7 lg:px-6">
                  <p className="text-3xl font-black tracking-tight text-surface-dark">{s.value}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problema" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">El problema</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Si vos no estás, algo se cae.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              No es que te falte gente. Es que la gente que tenés está apagando incendios en lugar de hacer crecer el
              negocio — y vos sos el único sistema de control que tiene la operación. Cuatro fugas que pagás todos los
              meses sin verlas.
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

            {/* Cierre del problema */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface-dark">
              <div className="grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:p-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">Lo que cuesta seguir así</p>
                  <p className="mt-2 text-4xl font-black tracking-tight text-white lg:text-5xl">Invisible</p>
                  <p className="text-sm font-medium text-slate-400">hasta que es tarde</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Cada mes que la operación sigue como está, las horas y la plata que se pierden no aparecen en ningún
                  lado. La ineficiencia es <strong className="text-white">invisible</strong>: por eso convive con vos hace
                  años. El número exacto de lo que te cuesta sale del diagnóstico, sobre tu operación real — no de una
                  estimación inventada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Futuro — qué conseguís con el sistema */}
        <section id="futuro" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Qué conseguís</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              No te reemplazamos a vos ni a tu gente. Te sacamos de tener que vigilar.
            </h2>
            <div className="mt-6 grid max-w-4xl gap-5 text-base leading-relaxed text-muted">
              <p>
                Construimos un sistema que mira tu operación las 24 horas, entiende cuándo algo importa y cuándo es ruido,
                y actúa o te avisa en el momento justo. El humano sigue decidiendo: el sistema le saca de encima el
                trabajo de estar mirando. Tu criterio no se reemplaza — se libera para lo único que solo vos podés hacer.
              </p>
              <p>
                No es un dashboard más ni un bot que contesta cualquier cosa. Es IA real, corriendo en producción hace
                casi un año en una operación industrial crítica. Esto es lo que cambia en tu día a día:
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {futureOutcomes.map((o) => (
                <article key={o.title} className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {o.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-surface-dark">{o.title}</h3>
                  <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 flex-shrink-0 text-red-400"><XIcon className="h-3.5 w-3.5" /></span>
                    {o.before}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-secondary">
                    <span className="mt-0.5 flex-shrink-0 text-primary"><CheckIcon className="h-3.5 w-3.5" /></span>
                    {o.after}
                  </p>
                </article>
              ))}
            </div>

            <a
              href={CTA_HREF}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
            >
              {CTA_LABEL}
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* Cómo trabajamos (método) */}
        <section id="como-trabajamos" className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Cómo trabajamos</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Primero te damos control. Después automatizamos sobre eso.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              No te llegamos con una solución enlatada. Primero implementamos el sistema que te da el control de tu
              operación; después, con datos reales sobre la mesa, diagnosticamos y automatizamos los procesos que más te
              liberan. El primer paso es la reunión, y es gratis.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {methodSteps.map((s, i) => (
                <article
                  key={s.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.09)]"
                >
                  <span className="pointer-events-none absolute -right-2 -top-5 select-none text-8xl font-black text-slate-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 text-lg font-semibold text-surface-dark">{s.title}</h3>
                  <span className="relative mt-1 inline-block text-[11px] font-semibold uppercase tracking-wide text-primary">{s.tag}</span>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cualificación — para quién es */}
        <section id="para-quien" className="py-20">
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
                <p className="mt-4 text-xs italic text-muted">Si caés acá, probablemente no seamos tu solución. Y está bien decírnoslo en la llamada.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Autoridad — FW Control / 3W */}
        <section id="caso" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Quiénes lo construyen</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              No somos una agencia que descubrió la IA el mes pasado.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Antes de venir a hablar con vos, ya teníamos un sistema corriendo. Construimos{" "}
              <strong className="text-secondary">FW Control</strong> para <strong className="text-secondary">3W</strong>:
              monitorea 5 plantas frigoríficas en tiempo real y les ahorró{" "}
              <strong className="text-secondary">327 horas de viajes a planta en 3 meses</strong>. Todo de punta a punta:
              de la máquina en planta a la notificación en tu celular.
            </p>

            <ProjectShowcase />
          </div>
        </section>

        {/* Por qué nosotros */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Por qué FW Labs</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Cualquiera te vende «IA». Pocos la tienen corriendo en producción.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <article key={d.title} className="rounded-2xl border border-border bg-white p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-2 text-primary">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-surface-dark">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reaseguro de la llamada — risk reversal */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-700 py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-blue-900/20 blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">Sin compromiso</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-white lg:text-4xl">
              La llamada es gratis. Sin venta dura, sin compromiso.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-blue-50/90">
              No te pedimos que nos creas. Te pedimos 20 minutos. Miramos tu operación real, te decimos dónde estás
              dependiendo de estar encima y si te podemos ayudar. No te demostramos nada antes de entender cómo
              trabajás — y si no es para vos, te lo decimos en el minuto 10.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex rounded-lg bg-white/15 p-2 text-white"><ShieldIcon className="h-5 w-5" /></div>
                <h3 className="text-base font-semibold text-white">Gratis y sin venta dura</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-50/90">
                  20 minutos, una conversación, cero presión. No es una demo disfrazada de llamada.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex rounded-lg bg-white/15 p-2 text-white"><CheckIcon className="h-5 w-5" /></div>
                <h3 className="text-base font-semibold text-white">Salís con algo aunque no sigamos</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-50/90">
                  Te vas con una idea clara de si te podemos ayudar y por dónde empezar, trabajemos juntos o no.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-4 inline-flex rounded-lg bg-white/15 p-2 text-white"><ChatIcon className="h-5 w-5" /></div>
                <h3 className="text-base font-semibold text-white">Hablás con quien construye</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-50/90">
                  No con un vendedor ni un call center. Con el que arma los sistemas.
                </p>
              </div>
            </div>

            <a
              href={CTA_HREF}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-blue-50"
            >
              {CTA_LABEL}
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Preguntas frecuentes</span>
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

        {/* Final CTA — agendado embebido */}
        <section id="agendar" className="scroll-mt-24 bg-surface-dark py-24">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Siguiente paso
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-snug text-white lg:text-4xl">
              Agendá tu llamada de 20 minutos.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Elegí un horario abajo. Miramos tu operación real, dónde dependés de estar encima y si te podemos ayudar. Te
              vas con claridad, trabajemos juntos o no. Sin formularios eternos · Hablás directo con quien construye.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
              <CalendlyEmbed url={CALENDLY_URL} />
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
