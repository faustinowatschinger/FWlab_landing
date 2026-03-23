import Image from "next/image";
import CalendlyEmbed from "../components/calendly-embed";

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-text">
      <header className="border-b border-border/90 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="/" className="inline-flex items-center">
            <Image
              src="/logo1.png"
              alt="FW Labs logo"
              width={132}
              height={40}
              className="h-25 w-auto"
              priority
            />
          </a>

          <a
            href="/"
            className="text-sm font-medium text-muted transition hover:text-secondary"
          >
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Diagnostico gratuito
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight text-surface-dark md:text-5xl">
            Agenda una llamada y descubre donde estas perdiendo ventas en
            WhatsApp
          </h1>

          <p className="mt-6 text-base leading-relaxed text-muted">
            Revisamos como llegan tus leads, como responde tu equipo y que
            parte del proceso esta frenando conversiones.
          </p>
        </div>

        <div className="mt-12">
          <CalendlyEmbed url="https://calendly.com/fwlabs/llamada-de-diagnostico-gratuita" />
        </div>
      </main>
    </div>
  );
}
