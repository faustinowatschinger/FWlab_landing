import Image from "next/image";
import ContactForm from "./components/contact-form";

const servicios = [
  {
    title: "Automatización de procesos",
    description:
      "Automatizamos tareas repetitivas que hoy requieren intervención humana.",
  },
  {
    title: "Agentes de IA",
    description:
      "Asistentes inteligentes para atención al cliente, soporte o tareas internas.",
  },
  {
    title: "Integraciones entre herramientas",
    description:
      "Conectamos sistemas para que la información fluya automáticamente.",
  },
  {
    title: "Sistemas operativos internos",
    description: "Diseñamos herramientas que optimizan cómo trabaja el equipo.",
  },
  {
    title: "Optimización de procesos",
    description: "Rediseñamos flujos de trabajo utilizando tecnología.",
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
            <a href="#proceso" className="hover:text-secondary">
              Proceso
            </a>
            <a href="#sistemas" className="hover:text-secondary">
              Sistemas
            </a>
            <a href="#nosotros" className="hover:text-secondary">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-secondary">
              Contacto
            </a>
          </nav>

          <a
            href="#contacto"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Solicitar diagnóstico
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-6 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-28 h-60 w-60 rounded-full bg-slate-300/35 blur-3xl" />

          <div className="mx-auto w-full max-w-6xl px-6 pb-18 pt-16 lg:px-10 lg:pt-24">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Partner Tecnológico
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-tight text-surface-dark md:text-5xl lg:text-6xl">
              Convertimos empresas en sistemas inteligentes
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
              En FW Labs ayudamos a empresas a operar mejor mediante
              inteligencia artificial y automatización.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
              No vendemos herramientas.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
              Nos convertimos en tu partner tecnológico para analizar, diseñar e
              implementar sistemas que optimicen cómo funciona tu negocio.
            </p>

            <div className="mt-8 space-y-1 text-lg font-medium text-secondary">
              <p>Menos trabajo manual.</p>
              <p>Mejores procesos.</p>
              <p>Empresas más eficientes.</p>
            </div>

            <p className="mt-8 text-sm font-medium text-muted">
              Empieza con un diagnóstico tecnológico.
            </p>

            <div className="mt-4">
              <a
                href="#contacto"
                className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
              >
                Solicitar diagnóstico
              </a>
            </div>
          </div>
        </section>

        {/* EL PROBLEMA */}
        <section
          id="problema"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              El problema
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
              La mayoría de las empresas opera con procesos ineficientes
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              Equipos enteros pasan horas haciendo tareas que podrían estar
              automatizadas:
            </p>

            <ul className="mt-5 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
              <li>• copiar datos entre sistemas</li>
              <li>• responder siempre las mismas consultas</li>
              <li>• coordinar procesos manualmente</li>
              <li>• revisar información repetitiva</li>
              <li>• depender de personas para tareas operativas</li>
            </ul>

            <div className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
              <p>
                El problema no es la falta de herramientas.
              </p>
              <p className="font-medium text-secondary">
                El problema es que nadie diseñó el sistema completo.
              </p>
              <p>Ahí es donde entra FW Labs.</p>
            </div>
          </div>
        </section>

        {/* POSICIONAMIENTO */}
        <section className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Posicionamiento
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
            No somos una agencia de automatización
          </h2>
          <p className="mt-4 text-lg font-medium text-secondary">
            Somos un partner tecnológico.
          </p>

          <div className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
            <p>
              Nuestro trabajo no es vender una automatización aislada.
            </p>
            <p>
              Nuestro trabajo es entender cómo funciona tu empresa y diseñar
              sistemas que la hagan operar mejor.
            </p>
          </div>

          <p className="mt-8 text-sm font-semibold text-secondary">
            Analizamos:
          </p>
          <ul className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
            <li>• procesos internos</li>
            <li>• flujos de información</li>
            <li>• tareas repetitivas</li>
            <li>• comunicación con clientes</li>
            <li>• herramientas que utiliza la empresa</li>
          </ul>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
            Y a partir de eso diseñamos un sistema optimizado con IA y
            automatización.
          </p>
        </section>

        {/* CÓMO TRABAJAMOS */}
        <section
          id="proceso"
          className="border-y border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Cómo trabajamos
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
              Nuestro proceso
            </h2>
            <p className="mt-4 text-base text-muted">
              Trabajamos en tres etapas.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* Etapa 1 */}
              <article className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-semibold text-primary">
                  1 — Diagnóstico Tecnológico
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Todo empieza con entender cómo funciona tu empresa.
                </p>

                <p className="mt-4 text-xs font-semibold text-secondary">
                  Analizamos:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted">
                  <li>• procesos operativos</li>
                  <li>• tareas manuales</li>
                  <li>• herramientas utilizadas</li>
                  <li>• flujos de trabajo</li>
                  <li>• oportunidades de automatización</li>
                </ul>

                <p className="mt-4 text-xs font-semibold text-secondary">
                  Entregamos:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted">
                  <li>• mapa de procesos</li>
                  <li>• oportunidades de automatización</li>
                  <li>• posibles sistemas de IA</li>
                  <li>• roadmap tecnológico</li>
                </ul>

                <p className="mt-4 text-xs italic text-muted">
                  Este diagnóstico tiene un costo porque implica un análisis
                  profundo del negocio.
                </p>
              </article>

              {/* Etapa 2 */}
              <article className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-semibold text-primary">
                  2 — Diseño de Sistemas
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Una vez identificado el potencial de mejora, diseñamos la
                  arquitectura del sistema.
                </p>

                <p className="mt-4 text-xs font-semibold text-secondary">
                  Definimos:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted">
                  <li>• qué procesos se automatizan</li>
                  <li>• qué sistemas se integran</li>
                  <li>• dónde se aplican agentes de IA</li>
                  <li>• cómo se optimizan los flujos operativos</li>
                </ul>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  El resultado es un plan claro de implementación tecnológica.
                </p>
              </article>

              {/* Etapa 3 */}
              <article className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                <p className="text-sm font-semibold text-primary">
                  3 — Implementación y Soporte
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Luego construimos los sistemas definidos.
                </p>

                <p className="mt-4 text-xs font-semibold text-secondary">
                  Esto puede incluir:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted">
                  <li>• automatización de procesos</li>
                  <li>• chatbots y agentes de IA</li>
                  <li>• integración entre herramientas</li>
                  <li>• sistemas internos de operación</li>
                  <li>• flujos automáticos de información</li>
                </ul>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Después de la implementación, seguimos acompañando con
                  mantenimiento y mejoras continuas.
                </p>
              </article>
            </div>

            <div className="mt-8 max-w-3xl space-y-2 text-base leading-relaxed text-muted">
              <p>Porque el objetivo no es hacer una automatización.</p>
              <p className="font-medium text-secondary">
                El objetivo es mejorar cómo funciona la empresa.
              </p>
            </div>
          </div>
        </section>

        {/* QUÉ PODEMOS IMPLEMENTAR */}
        <section
          id="sistemas"
          className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Qué podemos implementar
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
            Sistemas que desarrollamos
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Dependiendo de cada empresa, los sistemas pueden incluir:
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio, index) => (
              <article
                key={servicio.title}
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
                <h3 className="text-lg font-semibold text-secondary">
                  {servicio.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {servicio.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* RESULTADOS */}
        <section className="border-y border-border/80 bg-slate-50 py-18">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Resultados
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
              Qué cambia cuando una empresa optimiza sus sistemas
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
              Las empresas que implementan sistemas de automatización suelen
              lograr:
            </p>

            <ul className="mt-5 max-w-2xl space-y-2 text-sm leading-relaxed text-muted">
              <li>• reducción significativa del trabajo manual</li>
              <li>• procesos más rápidos</li>
              <li>• menos errores operativos</li>
              <li>• mejor experiencia para clientes</li>
              <li>• equipos enfocados en tareas de mayor valor</li>
            </ul>

            <div className="mt-8 max-w-3xl space-y-3 text-base leading-relaxed text-muted">
              <p>La tecnología no reemplaza a las personas.</p>
              <p className="font-medium text-secondary">
                Pero sí elimina el trabajo innecesario.
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE FW LABS */}
        <section
          id="nosotros"
          className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Sobre FW Labs
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
            Quiénes somos
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                FW Labs es un laboratorio tecnológico enfocado en ayudar a
                empresas a operar mejor mediante sistemas inteligentes.
              </p>
              <p>
                Nuestro objetivo no es implementar herramientas. Nuestro
                objetivo es mejorar cómo funciona tu empresa.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-slate-50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold text-secondary">
                Combinamos
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p>• automatización</p>
                <p>• inteligencia artificial</p>
                <p>• diseño de procesos</p>
                <p>• desarrollo tecnológico</p>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          id="contacto"
          className="border-t border-border/80 bg-slate-50 py-18"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Empieza aquí
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-surface-dark">
                Empieza con un diagnóstico
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Antes de implementar tecnología, es necesario entender cómo
                funciona tu negocio. Por eso nuestro proceso siempre comienza
                con un diagnóstico tecnológico.
              </p>

              <p className="mt-6 text-sm font-semibold text-secondary">
                A partir de ese análisis podrás ver:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>• qué procesos se pueden automatizar</li>
                <li>• qué impacto tendría la automatización</li>
                <li>• qué sistemas conviene implementar</li>
              </ul>

              <p className="mt-6 text-base text-muted">
                Y decidir cómo avanzar.
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

            <ContactForm />
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
