import Image from "next/image";
import ContactForm from "../components/contact-form";

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

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
        <section>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Diagnostico gratuito
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-surface-dark md:text-5xl">
            Agenda una llamada y descubre donde estas perdiendo ventas en
            WhatsApp
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
            <p>
              Revisamos como llegan tus leads, como responde tu equipo y que
              parte del proceso esta frenando conversiones.
            </p>
            <p>
              Si vemos oportunidad, te mostramos como ordenar la atencion y
              aumentar ventas desde los mismos anuncios.
            </p>
          </div>

          <p className="mt-8 text-sm font-semibold text-secondary">
            En este diagnostico vas a ver:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>• donde se estan perdiendo leads</li>
            <li>• que parte del proceso falla</li>
            <li>• como podrias convertir mas ventas</li>
          </ul>

          <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-secondary">
              Contacto directo
            </p>
            <p className="mt-3 text-sm text-muted">Email: hello@fwlabsllc.com</p>
            <p className="mt-1 text-sm text-muted">Company: FW Labs</p>
          </div>
        </section>

        <section>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
