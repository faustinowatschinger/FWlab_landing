import Image from "next/image";
import CalendlyEmbed from "../components/calendly-embed";

const callPoints = [
  {
    label: "Analizamos tu PLC y tu instalación",
    desc: "Marca, registros, objetivos y restricciones reales.",
  },
  {
    label: "Detectamos dónde estás perdiendo plata",
    desc: "Visitas evitables, fallas ciegas y oportunidades de postventa.",
  },
  {
    label: "Te damos un plan concreto",
    desc: "Si encajamos, te decimos cómo sería tu piloto. Si no, te lo decimos.",
  },
];

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-text">
      <header className="border-b border-border/90 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="inline-flex items-center">
            <Image src="/logo1.png" alt="FW Labs logo" width={132} height={40} className="h-16 w-auto" priority />
          </a>
          <a href="/" className="text-sm font-medium text-muted transition hover:text-secondary">
            ← Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Intro */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Llamada de diagnóstico · 20 min
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight text-surface-dark md:text-5xl">
            Agendá una llamada y mirá cómo conectar tu PLC en semanas
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted">
            20 minutos. Sin venta dura. Analizamos tu caso, te damos un diagnóstico técnico y te decimos —sin vueltas— si podemos ayudarte o no. Si no es para vos, te lo decimos en el minuto 5.
          </p>
        </div>

        {/* What happens in the call */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {callPoints.map((point) => (
            <div
              key={point.label}
              className="rounded-2xl border border-border bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.05)]"
            >
              <span className="inline-flex rounded-lg bg-blue-50 p-1.5 text-primary">
                <CheckIcon />
              </span>
              <p className="mt-3 text-sm font-semibold text-surface-dark">{point.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Calendly */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_4px_24px_rgba(15,23,42,0.07)]">
          <CalendlyEmbed url="https://calendly.com/fwlabs/llamada-de-diagnostico-gratuita" />
        </div>
      </main>
    </div>
  );
}
