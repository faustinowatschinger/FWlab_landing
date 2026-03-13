import Image from "next/image";
import ContactForm from "./components/contact-form";

const solucionItems = [
  "organizacion de conversaciones",
  "clasificacion automatica de clientes",
  "respuestas rapidas para consultas frecuentes",
  "etiquetas inteligentes",
  "seguimiento de cotizaciones",
  "registro de pendientes y deudas",
  "resumenes claros por conversacion",
];

const resultados = [
  {
    title: "Menos caos",
    description: "sabes que esta pasando con cada cliente",
  },
  {
    title: "Menos estres",
    description: "dejas de vivir revisando chats desordenados",
  },
  {
    title: "Mas cierres",
    description: "haces mejor seguimiento y no perdes oportunidades por desorden",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-text">
      <header className="sticky top-0 z-30 border-b border-border/90 bg-white backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="inline-flex items-center">
            <Image
              src="/logo1.png"
              alt="FW Labs logo"
              width={132}
              height={40}
              className="h-25 w-auto"
              priority
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            <a href="#problema" className="hover:text-secondary">
              Problema
            </a>
            <a href="#solucion" className="hover:text-secondary">
              Solucion
            </a>
            <a href="#resultados" className="hover:text-secondary">
              Resultados
            </a>
            <a href="#contacto" className="hover:text-secondary">
              Contacto
            </a>
          </nav>

          <a
            href="#contacto"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Quiero ordenar mi WhatsApp
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-6 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-28 h-60 w-60 rounded-full bg-slate-300/35 blur-3xl" />

          <div className="mx-auto w-full max-w-6xl px-6 pb-18 pt-16 lg:px-10 lg:pt-24">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Diagnostico de WhatsApp
            </span>

            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-surface-dark md:text-5xl lg:text-6xl">
              Ordenamos el WhatsApp de productores de seguros para que no
              pierdan clientes, cotizaciones ni renovaciones
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
              Si tenes mensajes mezclados, consultas repetidas, seguimientos
              colgados y chats que no paran de acumularse, te ayudamos a
              convertir ese caos en un sistema claro de atencion y seguimiento.
            </p>

            <div className="mt-8 space-y-1 text-lg font-medium text-secondary">
              <p>conversaciones organizadas</p>
              <p>clientes clasificados</p>
              <p>prioridades claras</p>
              <p>seguimiento de cotizaciones</p>
              <p>menos caos, mas control</p>
            </div>

            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
              >
                Quiero ordenar mi WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section
          id="problema"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              El problema
            </span>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
              El problema no es tener muchos mensajes. El problema es que todo
              esta mezclado.
            </h2>

            <div className="mt-6 max-w-3xl space-y-2 text-base leading-relaxed text-muted">
              <p>Cotizaciones.</p>
              <p>Pagos.</p>
              <p>Renovaciones.</p>
              <p>Consultas simples.</p>
              <p>Reclamos.</p>
              <p>Deudas.</p>
              <p>Todo en el mismo WhatsApp.</p>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
              Y cuando todo se mezcla, empiezan los problemas:
            </p>

            <ul className="mt-5 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
              <li>clientes sin responder</li>
              <li>cotizaciones sin seguimiento</li>
              <li>urgencias perdidas entre mensajes simples</li>
              <li>estres constante</li>
              <li>oportunidades que se enfrian</li>
            </ul>
          </div>
        </section>

        <section
          id="solucion"
          className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            La solucion
          </span>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
            Convertimos ese caos en un sistema ordenado
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Te ayudamos a estructurar tu WhatsApp para que cada conversacion
            tenga orden, prioridad y seguimiento.
          </p>

          <p className="mt-8 text-sm font-semibold text-secondary">Incluye</p>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solucionItems.map((item, index) => (
              <article
                key={item}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 19h16M7 14l3-3 3 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-muted">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-secondary">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="resultados"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Resultado
            </span>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
              Que cambia cuando el WhatsApp deja de ser un caos?
            </h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {resultados.map((resultado) => (
                <article
                  key={resultado.title}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="text-lg font-semibold text-secondary">
                    {resultado.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {resultado.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="border-t border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Empieza aqui
              </span>
              <h2 className="mt-3 max-w-4xl text-3xl font-semibold text-surface-dark">
                Si tu WhatsApp hoy esta explotado, no necesitas trabajar mas.
                Necesitas orden.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Te mostramos como transformar tu atencion en un sistema mas
                claro, prolijo y rentable.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <p className="text-sm font-semibold text-secondary">
                  Contacto directo
                </p>
                <p className="mt-3 text-sm text-muted">
                  Email: hello@fwlabsllc.com
                </p>
                <p className="mt-1 text-sm text-muted">Company: FW Labs</p>
              </div>
            </div>

            <div id="contacto-form">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-secondary">FW Labs</p>
          <p>hello@fwlabsllc.com</p>
        </div>
      </footer>
    </div>
  );
}
