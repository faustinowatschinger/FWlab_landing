import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VideoEmbed from "../components/video-embed";

const SITE_URL = "https://fwlabsllc.com";

/**
 * ⬇️ PEGÁ ACÁ la URL del video una vez subido a YouTube (no listado) o Vimeo.
 * Ej: "https://youtu.be/AbCdEfGhIjK"  o  "https://vimeo.com/123456789"
 * Mientras esté vacío, la página muestra un placeholder.
 */
const VIDEO_URL = "https://youtu.be/kdlMYN1PAfo";

const CTA_HREF = "/#agendar";

export const metadata: Metadata = {
  title: "Cómo automatizamos una empresa, paso a paso",
  description:
    "En pocos minutos te muestro el paso a paso real de cómo automatizamos una operación de punta a punta. Miralo y, si te hace ruido para tu empresa, agendá una llamada de 20 minutos.",
  alternates: { canonical: "/caso" },
  openGraph: {
    title: "Cómo automatizamos una empresa, paso a paso | FW Labs",
    description:
      "El paso a paso real de cómo automatizamos una operación de punta a punta. Miralo y agendá una llamada de 20 minutos.",
    url: `${SITE_URL}/caso`,
    type: "video.other",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/caso#webpage`,
      url: `${SITE_URL}/caso`,
      name: "Cómo automatizamos una empresa, paso a paso | FW Labs",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-AR",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/caso#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cómo automatizamos una empresa" },
      ],
    },
  ],
};

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function CasoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-border/90 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo1.png" alt="FW Labs logo" width={132} height={40} className="h-16 w-auto" priority />
          </Link>
          <Link href="/" className="text-sm font-medium text-muted transition hover:text-secondary">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-14 lg:px-10 lg:py-20">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Paso a paso · caso real
          </span>

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-surface-dark md:text-5xl">
            Así automatizamos una empresa, de punta a punta
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted">
            En pocos minutos te muestro el proceso real: cómo miramos una operación, qué automatizamos primero y cómo
            queda funcionando. Miralo completo y, si te hace ruido para tu empresa, hablamos.
          </p>
        </div>

        {/* Video */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_8px_32px_rgba(15,23,42,0.10)]">
          <VideoEmbed url={VIDEO_URL} title="Cómo automatizamos una empresa, paso a paso — FW Labs" />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-white p-8 text-center shadow-[0_4px_24px_rgba(15,23,42,0.07)] lg:p-10">
          <h2 className="text-2xl font-semibold text-surface-dark lg:text-3xl">
            ¿Querés ver qué se puede automatizar en tu operación?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Agendá una llamada de 20 minutos. Sin venta dura: miramos cómo trabajás hoy y te decimos si hay un caso. Si
            no encajamos, te lo decimos en el minuto 10.
          </p>
          <Link
            href={CTA_HREF}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700"
          >
            Agendar llamada de 20 min
            <ArrowIcon />
          </Link>
          <p className="mt-4 text-xs text-muted">Gratis · 20 minutos · sin compromiso</p>
        </div>
      </main>
    </div>
  );
}
