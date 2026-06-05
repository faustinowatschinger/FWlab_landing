import Image from "next/image";
import ProjectShowcase from "./components/project-showcase";

const heroBullets = [
  "Responde en menos de 2 minutos, las 24 horas",
  "Entiende texto, audios y fotos de un aviso",
  "Conectado a tu cartera real de propiedades",
  "Agenda la visita en tu Google Calendar, solo",
];

const trustStats = [
  { value: "176 hs", label: "ahorradas a un cliente en 3 meses con un sistema nuestro" },
  { value: "5 plantas", label: "industriales corriendo sobre nuestra infra hoy" },
  { value: "< 2 min", label: "de respuesta garantizada, las 24 horas" },
  { value: "21 días", label: "de la firma al sistema en producción" },
];

const problemItems = [
  {
    title: "Escriben a las 23:40 y nadie contesta",
    desc: "Los leads entran de noche, el domingo, o mientras estás mostrando otra propiedad. Cuando respondés a la mañana, ya preguntaron en otras tres inmobiliarias. El primero que contesta se queda con el cliente.",
  },
  {
    title: "Tu mejor gente filtrando curiosos",
    desc: "Responder lo mismo 50 veces, pedir zona y presupuesto, descartar a los que miran por mirar. Horas del equipo que no se cobran y que deberían ir a cerrar, no a tipear.",
  },
  {
    title: "El lead frío se enfría del todo",
    desc: "La mitad no compra a 30 días, pero sí a 60 o 90. Si nadie lo sigue, ese lead se pierde sin que nadie lo note. Es plata que entró por la puerta y se fue por la ventana.",
  },
  {
    title: "No sabés cuántos se te escapan",
    desc: "Todo va por WhatsApp suelto y un Excel. No hay número, no hay pipeline, no hay forma de mejorar lo que no medís. Operás a ciegas sobre tu activo más caro: los contactos.",
  },
];

const steps = [
  {
    title: "Atiende",
    desc: "Entra una consulta por WhatsApp —texto, un audio o la foto de un aviso— y responde al instante, como una persona. Agrupa los mensajes seguidos para no contestar atomizado.",
  },
  {
    title: "Califica",
    desc: "Conduce la charla: operación, zona, presupuesto, dormitorios, urgencia. Saca los datos clave del interesado sin que tu equipo mueva un dedo.",
  },
  {
    title: "Matchea",
    desc: "Consulta tu cartera real y le muestra 2 o 3 propiedades que encajan de verdad con lo que busca. No responde genérico: responde con tu stock.",
  },
  {
    title: "Agenda",
    desc: "Mira tu Google Calendar, le ofrece los horarios realmente libres y, cuando confirma, crea la visita con el cliente invitado. Cita cerrada, sin intervención humana.",
  },
];

const differentiators = [
  {
    title: "Conectado a tu cartera",
    desc: "No es un bot que contesta cualquier cosa. Matchea con propiedades concretas de tu stock: precio, zona, dormitorios, tipo de operación.",
  },
  {
    title: "Entiende audios y fotos",
    desc: "El interesado manda una nota de voz o la captura de un aviso y el agente la entiende y responde. Como lo haría tu mejor vendedor.",
  },
  {
    title: "No suena a robot",
    desc: "Responde como una persona escribiendo, con el tono de tu inmobiliaria. Nada de menús con números ni respuestas enlatadas que espantan al lead.",
  },
  {
    title: "Se integra a lo que ya usás",
    desc: "Tokko, Wasi, Kommo o WhatsApp suelto: lo conectamos a tu operación actual. Sin migrar nada, sin cambiar lo que tu equipo ya sabe usar.",
  },
  {
    title: "Hecho a tu medida",
    desc: "Discovery real de cómo trabaja tu inmobiliaria antes de configurar. No es un template que prende y reza: es tu sistema.",
  },
  {
    title: "Crece con vos",
    desc: "Arranca en WhatsApp y escala a Zonaprop, Instagram, seguimiento del lead frío y dashboard de pipeline cuando lo necesites.",
  },
];

const offerIncludes = [
  "Agente que atiende, califica, matchea y agenda por WhatsApp",
  "Calificación automática: operación, zona, presupuesto, financiación, urgencia",
  "Match con propiedades de tu cartera real",
  "Agenda de visitas en el Google Calendar del agente correcto",
  "Integración a tu CRM o WhatsApp actual, sin migrar nada",
  "Hosting e infraestructura sobre nuestros servidores",
];

const bonusItems = [
  {
    title: "Integración sin cambios",
    desc: "Lo conectamos a tu CRM actual. Sin migrar nada, sin cambiar lo que tu equipo ya usa.",
  },
  {
    title: "Ajustes finos a los 30 días",
    desc: "A los 30 días en producción, una ronda de ajustes sobre conversaciones reales. No sobre supuestos.",
  },
  {
    title: "Documentación y video",
    desc: "Video explicativo de todo el sistema interno más documentación detallada para tu equipo.",
  },
  {
    title: "Mentoría al equipo",
    desc: "Acompañamos a tu gente para que lo usen bien y confíen en él desde el primer día.",
  },
];

const audienceYes = [
  "Tenés entre 5 y 30 agentes",
  "Entran 50 o más consultas por semana entre WhatsApp e Instagram",
  "El dueño o socio gerente está metido en la operación día a día",
  "Manejás una cartera de 20 o más propiedades activas",
  "Estás cansado de perder los leads que escriben de noche y el fin de semana",
];

const audienceNo = [
  "Vendés una sola propiedad tuya y no manejás cartera de terceros",
  "Querés algo 100% indistinguible de un humano (no existe, y vas a objetar cada conversación)",
  "Buscás un chatbot enlatado de diez dólares que prenda y listo",
  "Todo va al WhatsApp personal del dueño y no usás WhatsApp Business",
];

const compareHeaders = ["Community manager", "Chatbot enlatado", "CRM (Tokko, Wasi)", "FW Assistant"];

const compareRows: Array<[string, string, string, string, string]> = [
  ["Responde al instante, 24/7", "Solo en horario", "Sí, pero pobre", "No atiende", "Sí, en < 2 min"],
  ["Entiende audios y fotos", "Sí", "No", "—", "Sí"],
  ["Califica y matchea con tu cartera", "A mano", "Genérico", "No atiende", "Automático"],
  ["Agenda la visita sola", "A mano", "No", "No", "Sí"],
  ["Escala sin sumar gente", "No", "Sí", "Sí", "Sí"],
  ["Costo mensual", "600–1.200 USD", "Bajo, pero no sirve", "Similar", "250–500 USD"],
];

const faqs = [
  {
    q: "¿Reemplaza a mi equipo de ventas?",
    a: "No. Le saca de encima la parte repetitiva —responder lo mismo, filtrar curiosos, coordinar horarios— para que tu gente se dedique a lo único que cierra: la visita y la negociación. El agente atiende; vos cerrás.",
  },
  {
    q: "¿No va a sonar a robot y espantar al lead?",
    a: "Responde como una persona escribiendo, con el tono de tu inmobiliaria, y entiende audios y fotos. Nada de menús con números. Si un caso se pone complejo, te lo pasa a un humano. La idea no es engañar a nadie: es contestar rápido y bien.",
  },
  {
    q: "¿Tengo que cambiar mi CRM?",
    a: "No. Lo integramos a lo que ya usás —Tokko, Wasi, Kommo o WhatsApp suelto— sin migrar nada. Tu equipo sigue trabajando igual; el agente se suma adelante.",
  },
  {
    q: "¿Qué pasa si no funciona?",
    a: "El riesgo lo asumimos nosotros. Garantía: respuesta en menos de 2 minutos, las 24 horas. El mes que no se cumpla por causa nuestra, no lo pagás. Y sin contrato de permanencia: cancelás avisando con 30 días.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "21 días corridos desde el cobro inicial. Una semana de discovery y carga de propiedades, una de configuración e integración, y unos días de testing con tu equipo antes del go-live.",
  },
  {
    q: "¿De dónde saca las propiedades que muestra?",
    a: "De tu cartera real. Conectamos tu base o CRM y el agente matchea con propiedades concretas —precio, zona, dormitorios— no con respuestas genéricas.",
  },
  {
    q: "¿Hay costos extra además del mensual?",
    a: "Sí, y los dejamos claros desde el primer presupuesto: el consumo de la API del modelo (unos 30 a 80 USD por mes según volumen) y las conversaciones de WhatsApp Business de Meta. Van a tu cuenta, sin marcado nuestro. El hosting y la infraestructura los ponemos nosotros.",
  },
  {
    q: "¿Y si dejo de pagar el mensual?",
    a: "Sin permanencia: cancelás cuando quieras avisando con 30 días. El mantenimiento incluye el hosting en nuestra infra, los ajustes de prompt sobre conversaciones reales y el soporte. Si no seguís, el sistema deja de correr en nuestros servidores.",
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

function DoubleCheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m1.5 12.5 4 4 7-9" />
      <path d="m11 16.5 1.5 1.5 7-9" />
    </svg>
  );
}

const CTA_HREF = "/diagnostico";
const CTA_LABEL = "Agendar diagnóstico de 20 minutos";

/* Mockup de conversación del hero — muestra el producto en acción */
function ChatBubble({
  side,
  time,
  read,
  children,
  delay,
}: {
  side: "in" | "out";
  time: string;
  read?: boolean;
  children: React.ReactNode;
  delay: number;
}) {
  const out = side === "out";
  return (
    <div className={`fw-rise flex ${out ? "justify-end" : "justify-start"}`} style={{ animationDelay: `${delay}ms` }}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
          out ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm bg-white text-secondary"
        }`}
      >
        <p>{children}</p>
        <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${out ? "text-blue-100" : "text-slate-400"}`}>
          {time}
          {out && <DoubleCheckIcon className={read ? "h-3.5 w-3.5 text-blue-200" : "h-3.5 w-3.5 text-blue-300/70"} />}
        </span>
      </div>
    </div>
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
            <a href="#como-funciona" className="transition hover:text-secondary">Cómo funciona</a>
            <a href="#oferta" className="transition hover:text-secondary">Oferta</a>
            <a href="#faq" className="transition hover:text-secondary">FAQ</a>
          </nav>

          <a
            href={CTA_HREF}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Agendar diagnóstico
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
                Agente de IA para inmobiliarias
              </span>

              <h1
                className="fw-rise mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-surface-dark md:text-5xl lg:text-[3.4rem]"
                style={{ animationDelay: "80ms" }}
              >
                La IA que responde, califica y agenda tus leads.{" "}
                <span className="text-primary">Vos cerrás.</span>
              </h1>

              <p className="fw-rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "160ms" }}>
                FW Assistant contesta cada consulta de WhatsApp al instante, las 24 horas. Califica al interesado,
                le muestra propiedades de tu cartera que encajan y agenda la visita solo. Tu equipo deja de filtrar
                mensajes y se dedica a cerrar.
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
                <p className="text-sm text-muted">20 minutos · Miramos tu volumen real · Sin venta dura.</p>
              </div>
            </div>

            {/* Right: WhatsApp mockup */}
            <div className="fw-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "200ms" }}>
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-b from-blue-200/40 to-slate-200/30 blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-border bg-surface-dark px-4 py-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">FW</div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">FW Assistant</p>
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span className="fw-pulse inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                      en línea
                    </p>
                  </div>
                </div>

                {/* Chat body */}
                <div className="relative space-y-2.5 bg-[radial-gradient(#dbe4f0_1px,transparent_1px)] [background-size:22px_22px] bg-slate-50 px-4 py-5">
                  <div className="fw-rise flex justify-center" style={{ animationDelay: "260ms" }}>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400 shadow-sm">
                      Hoy · 23:41
                    </span>
                  </div>

                  <ChatBubble side="in" time="23:41" delay={320}>
                    Hola, vi el depto de 2 ambientes en Palermo. ¿Sigue disponible?
                  </ChatBubble>
                  <ChatBubble side="out" time="23:41" read delay={420}>
                    Hola, sí, sigue disponible. ¿Lo buscás para vivir o como inversión?
                  </ChatBubble>
                  <ChatBubble side="in" time="23:42" delay={520}>
                    Para vivir. Tengo hasta 140 mil.
                  </ChatBubble>
                  <ChatBubble side="out" time="23:42" read delay={620}>
                    Bárbaro. Tengo 2 que encajan en Palermo con ese presupuesto. ¿Coordinamos una visita esta semana?
                  </ChatBubble>
                  <ChatBubble side="in" time="23:43" delay={720}>
                    Dale, el jueves a la tarde puede ser.
                  </ChatBubble>
                  <ChatBubble side="out" time="23:43" read delay={820}>
                    Listo. Te agendé la visita el jueves 18:30 y te llegó la invitación al mail.
                  </ChatBubble>

                  <div className="fw-rise flex justify-end" style={{ animationDelay: "920ms" }}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Visita agendada
                    </span>
                  </div>
                </div>

                {/* Caption bar */}
                <div className="border-t border-border bg-white px-4 py-3 text-center text-xs font-medium text-muted">
                  El equipo dormía. FW Assistant cerró la visita.
                </div>
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
              El lead que no contestás en 5 minutos lo cierra la inmobiliaria de al lado.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              No es un problema de que falte gente. Es que la gente que tenés está apagando incendios en vez de cerrar.
              Cuatro fugas que hoy te cuestan operaciones, todas las semanas.
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

            {/* Quantified loss */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface-dark">
              <div className="grid gap-6 p-7 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:p-9">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">Lo que cuesta no automatizar</p>
                  <p className="mt-2 text-5xl font-black tracking-tight text-white">~12.000 USD</p>
                  <p className="text-sm font-medium text-slate-400">por mes, estimado</p>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Una inmobiliaria de unos 10 agentes recibe ~150 consultas por semana y pierde cerca del 35% por no
                  contestar a tiempo y no seguir al lead frío. Son unas <strong className="text-white">4 operaciones por mes</strong> que
                  se escapan. A una comisión promedio de 3.000 USD, es plata que hoy se evapora todas las semanas.
                  Recuperar <strong className="text-white">una sola</strong> paga el sistema entero, dos veces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Cómo funciona</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Atiende, califica, matchea y agenda. Solo.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              El interesado escribe y el agente se ocupa de todo el principio del embudo. Tu equipo entra recién cuando
              hay una visita agendada y un interesado de verdad.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
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
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Por qué no es un chatbot más</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Cualquiera te vende un bot. Esto trabaja con tu cartera.
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

        {/* Authority — FW Control */}
        <section id="autoridad" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Quiénes lo construyen</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              No somos una agencia que descubrió la IA el mes pasado.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Antes de las inmobiliarias, FW Labs construyó <strong className="text-secondary">FW Control</strong>: un sistema
              industrial que monitorea y controla 5 plantas frigoríficas en tiempo real, sobre más de 40 PLCs de distintos
              fabricantes. Le ahorró a su operador <strong className="text-secondary">176 horas de viajes a planta en 3 meses</strong>.
              Si confiamos un proceso crítico de producción a un sistema nuestro, podés confiarle la atención de tus leads.
            </p>

            <ProjectShowcase />
          </div>
        </section>

        {/* Comparison */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Tus alternativas</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Contra qué nos comparás realmente.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              La pregunta no es cuál es más barato. Es cuál te contesta el lead de las 23:40 antes de que lo haga otro.
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

        {/* Offer */}
        <section id="oferta" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">La oferta</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-snug text-surface-dark lg:text-4xl">
              Todo lo que entra en el sistema.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              Lo armamos a la medida de tu inmobiliaria, así que el precio depende del alcance: los rangos de abajo son una
              estimación. Sin letra chica, y el riesgo lo asumimos nosotros: si el sistema no responde como prometemos, ese mes no se paga.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left: includes + bonus */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-white p-7">
                  <h3 className="text-lg font-semibold text-surface-dark">Qué incluye el sistema</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {offerIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                        <span className="mt-0.5 flex-shrink-0 text-primary">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-white p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <StarIcon />
                    Bonus incluidos
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {bonusItems.map((b) => (
                      <div key={b.title} className="rounded-xl border border-blue-100/70 bg-blue-50/40 p-4">
                        <h4 className="text-sm font-semibold text-secondary">{b.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: price card */}
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-2xl border border-primary/30 bg-white shadow-[0_8px_28px_rgba(37,99,235,0.12)]">
                  <div className="bg-surface-dark px-7 py-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-300">
                      Precio de lanzamiento · estimado
                    </span>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">Setup inicial</p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-slate-400">USD</span>
                      <span className="text-4xl font-black tracking-tight text-white">1.500–3.000</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-400">según canales e integraciones · 50% al firmar, 50% al go-live</p>
                  </div>
                  <div className="px-7 py-6">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Mantenimiento mensual</p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-muted">USD</span>
                      <span className="text-3xl font-black tracking-tight text-surface-dark">250–500</span>
                      <span className="text-sm font-semibold text-muted">/ mes</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">Hosting, mantenimiento, ajustes sobre conversaciones reales y soporte.</p>

                    <a
                      href={CTA_HREF}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
                    >
                      {CTA_LABEL}
                      <ArrowIcon />
                    </a>

                    <div className="mt-6 space-y-3 border-t border-border pt-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 text-primary"><ShieldIcon /></span>
                        <p className="text-xs leading-relaxed text-secondary">
                          <strong className="text-surface-dark">Garantía:</strong> respuesta en menos de 2 minutos, 24 horas.
                          El mes que no se cumpla por causa nuestra, no lo pagás.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 text-primary"><CheckIcon /></span>
                        <p className="text-xs leading-relaxed text-secondary">
                          <strong className="text-surface-dark">Sin permanencia:</strong> cancelás avisando con 30 días.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 text-primary"><ClockIcon /></span>
                        <p className="text-xs leading-relaxed text-secondary">
                          <strong className="text-surface-dark">En producción en 21 días</strong> desde el cobro inicial.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="px-1 text-xs leading-relaxed text-muted">
                  El precio depende del proyecto: cuántos canales, qué integraciones y el volumen de tu inmobiliaria. Los
                  rangos de arriba son orientativos; el número exacto lo cerramos con tus datos en el diagnóstico. Aparte y a
                  tu cuenta van el consumo de la API del modelo y las conversaciones de WhatsApp Business de Meta, sin marcado nuestro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="border-y border-border/80 bg-slate-50 py-20">
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
                <p className="mt-4 text-xs italic text-muted">Si caés acá, probablemente no seamos tu solución. Y está bien decírnoslo.</p>
              </div>
            </div>
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

        {/* Final CTA */}
        <section className="bg-surface-dark py-24">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Siguiente paso
            </span>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-snug text-white lg:text-4xl">
              20 minutos para ver cuántos leads estás dejando en la mesa.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Agendá una llamada. Miramos tu volumen real de consultas, cómo las atendés hoy y te decimos en números qué
              estás perdiendo. Si el sistema no te conviene, te lo decimos en el minuto 10. En inmobiliaria el primero que
              contesta se queda con el cliente: cada día sin esto es una comisión que se va a la competencia.
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
