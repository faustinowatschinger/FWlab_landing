import Image from "next/image";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-white text-text">
      <header className="border-b border-border/90 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center px-6 lg:px-10">
          <a href="/" className="inline-flex items-center">
            <Image src="/logo1.png" alt="FW Labs logo" width={132} height={40} className="h-16 w-auto" priority />
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 py-12 lg:px-10 lg:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          WhatsApp Revenue Engine
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight text-surface-dark md:text-4xl">
          Vende más por WhatsApp con los mismos leads que ya estás pagando
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Mirá cómo transformamos WhatsApp en un sistema de conversión real.
        </p>

        {/* Video */}
        <div className="mt-8 mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border shadow-[0_8px_32px_rgba(15,23,42,0.10)]">
          <video
            src="/video landing.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full"
          />
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3">
          <a
            href="/diagnostico"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Solicitar diagnóstico gratuito
            <ArrowIcon />
          </a>
          <p className="text-sm text-muted">
            Gratis · Sin compromiso · 100% personalizado
          </p>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-muted">
          Descubrí dónde estás perdiendo ventas en tu WhatsApp y qué se puede mejorar hoy.
        </p>
      </main>
    </div>
  );
}
