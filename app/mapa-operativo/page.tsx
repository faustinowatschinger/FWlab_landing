import type { Metadata } from "next";
import Link from "next/link";
import { Formulario } from "./formulario";

export const metadata: Metadata = {
  title: "Mapa operativo gratis | FW Labs",
  description:
    "Contanos cómo trabaja tu empresa y te devolvemos el análisis completo: cómo funcionan hoy tus procesos, dónde se cortan, qué se puede resolver, dónde la IA sirve y dónde no, y el plan paso por paso. Gratis, sin llamada.",
  alternates: { canonical: "/mapa-operativo" },
  openGraph: {
    title: "Mapa operativo gratis | FW Labs",
    description:
      "Antes de meter IA en tu empresa hay que entender cómo trabaja. Contanos cómo circula un trabajo y te devolvemos el análisis entero.",
    url: "/mapa-operativo",
  },
};

export default function DiagnosticoPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        FW Labs
      </Link>

      <header className="mx-auto mt-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Gratis · 7 minutos · sin llamada
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-text sm:text-4xl">
          El análisis que haríamos de tu empresa, gratis y completo
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          No es un test. Nos contás a qué se dedica tu empresa y cómo circula un
          trabajo, y a partir de eso te preguntamos lo que le preguntaríamos en una
          reunión: las preguntas se arman con lo que contaste, no están escritas de
          antes.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Al final te devolvemos cómo funcionan hoy tus procesos y dónde se cortan,
          qué se puede resolver y con qué, dónde la IA sirve de verdad y dónde no, qué
          no gastarías si fuéramos nosotros, y el camino paso por paso.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sin adelantos ni versiones recortadas: es el análisis entero, y es tuyo.
          Podés ejecutarlo solo si querés.
        </p>
      </header>

      <div className="mt-12 rounded-2xl border border-border bg-surface/70 p-6 shadow-sm backdrop-blur-sm sm:p-10">
        <Formulario />
      </div>
    </main>
  );
}
