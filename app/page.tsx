import Image from "next/image";
import ContactForm from "./components/contact-form";

const services = [
  {
    title: "SaaS Product Development",
    description:
      "End-to-end SaaS creation: architecture, development, and launch.",
  },
  {
    title: "Product Strategy & Validation",
    description: "Defining core value, testing assumptions, and iterating fast.",
  },
  {
    title: "Scaling & Monetization",
    description: "From first users to growth, payments, and infrastructure.",
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    description: "Define the problem, market, and core product opportunity.",
  },
  {
    step: "02",
    title: "Build",
    description: "Ship an MVP focused on speed, clarity, and real usability.",
  },
  {
    step: "03",
    title: "Validate",
    description: "Test with real users and improve using concrete product data.",
  },
  {
    step: "04",
    title: "Scale",
    description: "Optimize growth, monetization, and infrastructure stability.",
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
            <a href="#services" className="hover:text-secondary">
              Services
            </a>
            <a href="#about" className="hover:text-secondary">
              About
            </a>
            <a href="#contact" className="hover:text-secondary">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold !text-white transition hover:bg-blue-700"
          >
            Contact
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-6 h-44 w-44 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-28 h-60 w-60 rounded-full bg-slate-300/35 blur-3xl" />

          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-18 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pt-24">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Product Team
              </span>
              <h1 className="mt-5 text-5xl font-semibold leading-tight text-surface-dark md:text-6xl">
                FW Labs
              </h1>
              <p className="mt-5 text-xl font-medium text-secondary md:text-2xl">
                Building, launching, and scaling SaaS products.
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                From idea to revenue.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
                >
                  Contact
                </a>
                <a
                  href="#services"
                  className="inline-flex rounded-xl border border-border bg-surface px-7 py-3 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary"
                >
                  View services
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-secondary">How we build products</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-muted">
                  Clear process
                </span>
              </div>

              <div className="space-y-3">
                {[
                  [
                    "Discover and define",
                    "We identify the right problem and define the strongest product scope.",
                  ],
                  [
                    "Launch an MVP",
                    "We deliver a functional product fast with the required core features.",
                  ],
                  [
                    "Validate and grow",
                    "We iterate with user feedback, product data, and monetization signals.",
                  ],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold text-secondary">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Cross-functional", "Product, design, and engineering"],
                  ["Revenue-oriented", "Built to reach real market traction"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border bg-white p-3"
                  >
                    <p className="text-xs font-semibold text-secondary">{title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-surface py-8">
          <div className="mx-auto grid w-full max-w-6xl gap-3 px-6 text-center sm:grid-cols-3 lg:px-10">
            {[
              ["Idea to MVP", "Practical product execution"],
              ["Validation First", "Evidence before scale"],
              ["SaaS Operations", "Growth-ready architecture"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-slate-50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-secondary">{title}</p>
                <p className="text-xs text-muted">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10">
          <h2 className="text-3xl font-semibold text-surface-dark">What we do</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            We combine product thinking, technical execution, and growth-focused
            iteration to build SaaS products with real market potential.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path
                        d="M4 19h16M7 14l3-3 3 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-muted">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-secondary">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/80 bg-slate-50 py-16">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <h2 className="text-3xl font-semibold text-surface-dark">How we work</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {process.map((item) => (
                <article
                  key={item.step}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
                >
                  <p className="text-sm font-semibold text-primary">{item.step}</p>
                  <h3 className="mt-2 text-lg font-semibold text-secondary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto w-full max-w-6xl px-6 py-18 lg:px-10">
          <h2 className="text-3xl font-semibold text-surface-dark">About</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                FW Labs is a product lab focused on building independent SaaS
                businesses.
              </p>
              <p>
                We are a product-driven team working across design, engineering,
                launch, scaling, and monetization.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-slate-50 p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-semibold text-secondary">Team capabilities</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Cross-functional execution focused on practical software and
                measurable business outcomes.
              </p>
              <div className="mt-4 space-y-2 text-xs text-muted">
                <p>- Product discovery and UX design</p>
                <p>- Frontend and backend implementation</p>
                <p>- Cloud architecture and integrations</p>
                <p>- Growth, pricing, and monetization</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="contact" className="border-t border-border/80 bg-slate-50 py-18">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
            <div>
              <h2 className="text-3xl font-semibold text-surface-dark">Have an idea?</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                If you have a SaaS idea or want to build a product together,
                feel free to reach out.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <p className="text-sm font-semibold text-secondary">Direct contact</p>
                <p className="mt-3 text-sm text-muted">Email: fatiwatschinger@gmail.com</p>
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
          <p>fatiwatschinger@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
