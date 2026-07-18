import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InstallTabs from "./install-tabs";
import CopyPrompt from "./copy-prompt";

const SITE_URL = "https://fwlabsllc.com";
const PATH = "/guia-claude-code";

const DOWNLOAD_URL = "https://claude.com/download";
const ACCOUNT_URL = "https://claude.ai/";

export const metadata: Metadata = {
  title: "Instalá Claude Code y hacé tu primer proyecto",
  description:
    "De cero, sin saber programar y sin usar la terminal. Instalá la app de Claude en Mac o Windows, entendé los planes y hacé tu primer mini proyecto en ~15 minutos. Guía de FW Labs.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "De cero a tu primer proyecto con Claude Code | FW Labs",
    description:
      "La guía más fácil para empezar con Claude Code: instalación paso a paso, qué plan elegir y tu primer proyecto. Sin saber nada de computadoras.",
    url: `${SITE_URL}${PATH}`,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "De cero a tu primer proyecto con Claude Code",
      description:
        "Cómo instalar Claude Code y hacer tu primer proyecto, explicado para alguien que nunca instaló un programa.",
      inLanguage: "es-AR",
      totalTime: "PT15M",
      step: [
        { "@type": "HowToStep", position: 1, name: "Elegir un plan de Claude" },
        { "@type": "HowToStep", position: 2, name: "Descargar e instalar la app" },
        { "@type": "HowToStep", position: 3, name: "Entrar con tu cuenta" },
        { "@type": "HowToStep", position: 4, name: "Conocer los modos de la app" },
        { "@type": "HowToStep", position: 5, name: "Hacer tu primer mini proyecto" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guía Claude Code" },
      ],
    },
  ],
};

const heroBg: React.CSSProperties = {
  background:
    "radial-gradient(1100px 700px at 78% -12%, rgba(37,99,235,.42), transparent 60%)," +
    "radial-gradient(900px 600px at 8% 120%, rgba(30,58,138,.40), transparent 62%)," +
    "linear-gradient(160deg,#0b1220 0%,#0f172a 55%,#111c33 100%)",
};

const gridOverlay: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)",
  backgroundSize: "34px 34px",
  maskImage: "radial-gradient(720px 520px at 72% 18%,#000,transparent 78%)",
  WebkitMaskImage: "radial-gradient(720px 520px at 72% 18%,#000,transparent 78%)",
};

/* ── Iconos ── */
function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ── Bloques reutilizables ── */
function StepHead({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-900 text-lg font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.28)]">
        {n}
      </span>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-surface-dark md:text-[1.7rem]">{title}</h2>
        <p className="mt-1 text-sm font-medium text-muted">{sub}</p>
      </div>
    </div>
  );
}

type CalloutVariant = "info" | "warn" | "ok";
function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title: string;
  children: React.ReactNode;
}) {
  const map: Record<CalloutVariant, { box: string; chip: string; glyph: string }> = {
    info: { box: "border-blue-200 bg-blue-50", chip: "bg-blue-100 text-primary", glyph: "i" },
    warn: { box: "border-amber-200 bg-amber-50", chip: "bg-amber-100 text-amber-700", glyph: "!" },
    ok: { box: "border-emerald-200 bg-emerald-50", chip: "bg-emerald-100 text-emerald-700", glyph: "✓" },
  };
  const s = map[variant];
  return (
    <div className={`flex gap-3.5 rounded-2xl border p-4 ${s.box}`}>
      <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg text-sm font-bold ${s.chip}`}>
        {s.glyph}
      </span>
      <div className="text-sm leading-relaxed text-muted">
        <p className="mb-0.5 font-semibold text-surface-dark">{title}</p>
        {children}
      </div>
    </div>
  );
}

const PLANS = [
  {
    name: "Gratis",
    price: "US$0",
    per: "no sirve para esto",
    muted: true,
    reco: false,
    desc: "Solo chat básico. No incluye Claude Code. Te lo aclaramos para que no pierdas tiempo intentando con esta.",
  },
  {
    name: "Pro",
    price: "US$20",
    per: "por mes",
    muted: false,
    reco: true,
    desc: "El ideal para empezar. Incluye Claude Code y alcanza de sobra para tus primeros proyectos. Es lo mismo que sale ChatGPT Plus, pero con el robot.",
  },
  {
    name: "Max",
    price: "US$100+",
    per: "por mes",
    muted: false,
    reco: false,
    desc: "Para uso intenso, todo el día. No lo necesitás para arrancar: si algún día te queda chico Pro, lo subís en 2 clics.",
  },
];

const AREAS = [
  {
    emoji: "🏠",
    name: "Inicio",
    tagline: "Para chatear y pedirle cosas",
    highlight: false,
    badge: null as string | null,
    body: "Es donde conversás con Claude. Tocás “Nuevo” y elegís cómo querés que trabaje:",
    options: [
      { k: "Chat", d: "Conversar, preguntar, pedir ideas o textos. Igual que ChatGPT." },
      { k: "Cowork", d: "Darle una tarea grande y que la haga solo, mientras vos hacés otra cosa." },
    ],
  },
  {
    emoji: "🛠️",
    name: "Code",
    tagline: "El robot que construye",
    highlight: true,
    badge: "El de hoy" as string | null,
    body: "El que trabaja en tus carpetas y arma cosas de verdad: páginas, programas, planillas. Tocás “Nueva sesión”, elegís una carpeta y le das la orden.",
    options: [
      { k: "Nueva sesión", d: "Abrís una carpeta y empezás a construir. Es lo que vas a usar en tu primer proyecto." },
    ],
  },
];

const OTHERS = [
  { emoji: "📦", t: "Artefactos", d: "Lo que Claude te crea (páginas, documentos, código) aparece acá para verlo y editarlo. Se abren solos.", tag: "Aparece solo" },
  { emoji: "📁", t: "Proyectos", d: "Guardás contexto fijo (tu tono, tus documentos) para no repetirlo en cada chat.", tag: "Más adelante" },
  { emoji: "⏰", t: "Programado y Rutinas", d: "Tareas que se ejecutan solas en un horario, sin que estés vos delante.", tag: "Más adelante" },
  { emoji: "📱", t: "Despacho", d: "Mandarle tareas desde el celular y que las trabaje en tu computadora.", tag: "Avanzado" },
  { emoji: "🎨", t: "Diseño", d: "Crear diseños visuales (pantallas, slides, prototipos) sin saber diseñar.", tag: "Otra herramienta" },
  { emoji: "⚙️", t: "Personalizar", d: "Los ajustes de la app: cómo se ve y cómo se comporta.", tag: "Cuando quieras" },
  { emoji: "🕘", t: "Historial y sesiones", d: "Tus chats y sesiones anteriores, para retomar algo que dejaste a medias.", tag: "Aparece solo" },
];

const TIPS = [
  {
    n: "01",
    t: "Pedí de a poco",
    d: "No le tires todo junto. Empezá por lo principal y después sumás: “ahora agregale…”, “ahora cambiá…”. Se construye por capas.",
  },
  {
    n: "02",
    t: "Sé específico",
    d: "Decí qué querés, para qué y cómo te lo imaginás. “Una web azul, seria, para mi estudio contable” sale mejor que “hacé una web”.",
  },
  {
    n: "03",
    t: "Corregilo sin miedo",
    d: "Si algo no te gusta, decíselo y lo cambia al toque. Es ida y vuelta: no tenés que aceptar lo primero que salga.",
  },
  {
    n: "04",
    t: "No podés romper nada",
    d: "Trabajás dentro de tu carpeta de prueba. Si algo sale raro, pedile que empiece de nuevo o creá otra carpeta. Cero riesgo.",
  },
];

const NEXT = [
  {
    emoji: "⚡",
    t: "Skills",
    d: "“Manuales” que le enseñás una sola vez y aplica siempre: que escriba con tu estilo, que arme tus documentos con tu formato, que siga tu forma de trabajar.",
  },
  {
    emoji: "🤖",
    t: "Agentes",
    d: "Robots especializados que trabajan solos en una tarea mientras vos hacés otra cosa. Podés poner varios a trabajar en paralelo, cada uno en lo suyo.",
  },
  {
    emoji: "🔌",
    t: "Conexiones",
    d: "Enchufás Claude a tus otras apps: tu mail, tu calendario, tus planillas, tus sistemas. Ahí deja de construir cosas sueltas y empieza a operar tu negocio.",
  },
];

export default function GuiaClaudeCodePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ============ HERO ============ */}
      <section style={heroBg} className="relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0" style={gridOverlay} />
        <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
          {/* Topbar */}
          <div className="flex items-center justify-between">
            <Image src="/logo-fw-white.png" alt="FW Labs" width={124} height={44} className="h-8 w-auto" priority />
            <Link href="/" className="flex-none whitespace-nowrap text-sm font-medium text-slate-300 transition hover:text-white">
              <span className="hidden sm:inline">← Volver al inicio</span>
              <span className="sm:hidden">← Inicio</span>
            </Link>
          </div>

          {/* Hero content */}
          <div className="max-w-3xl pt-14 lg:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Guía FW Labs · Nivel cero
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              De cero a tu primer proyecto con <span className="text-blue-400">Claude Code</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              ChatGPT es como seguir leyendo el manual y construirlo a mano,{" "}
              <span className="font-semibold text-white">cuando tenés a Claude Code que te lo construye solo.</span> Esta
              guía te enseña a poner ese robot a trabajar — aunque nunca en tu vida hayas instalado un programa en la
              computadora.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Sin saber programar", "Sin usar la terminal", "Mac y Windows", "~15 minutos"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-slate-200"
                >
                  {c}
                </span>
              ))}
            </div>

            <a
              href="#empezar"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700"
            >
              Empezar la guía
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ============ CUERPO ============ */}
      <main id="empezar" className="mx-auto w-full max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        {/* Qué es */}
        <section className="scroll-mt-24">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Leé esto primero</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-surface-dark md:text-3xl">
            Qué es esto y qué vas a lograr
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            Claude Code es una herramienta que <strong className="font-semibold">construye cosas por vos</strong>: le
            hablás en español, como a una persona, y él crea páginas web, programas, planillas, documentos — lo que le
            pidas — trabajando en tu propia computadora. No tenés que saber nada de programación.
          </p>

          <div className="mt-6">
            <Callout variant="info" title="Esta guía es para vos si nunca instalaste un programa">
              Está escrita paso a paso, sin dar nada por sabido. Si usás la compu para mirar videos, redes o Excel, con
              esto alcanza. Vamos a hacer todo con <span className="font-semibold text-surface-dark">la app de Claude</span>{" "}
              — <span className="font-semibold text-surface-dark">cero comandos, cero terminal</span>.
            </Callout>
          </div>

          <ul className="mt-6 space-y-2.5">
            {[
              ["Entender los planes", "y elegir cuál te conviene para arrancar."],
              ["Descargar e instalar", "la app de Claude, clic por clic."],
              ["Moverte por la app", "— el chat, el modo Code y los demás modos, para animarte a todo."],
              ["Hacer tu primer mini proyecto", "real — lo que vos quieras — de principio a fin."],
            ].map(([b, rest]) => (
              <li key={b} className="flex gap-3 text-[0.98rem] text-muted">
                <span className="mt-2 h-2 w-2 flex-none rounded-[3px] bg-primary" />
                <span>
                  <span className="font-semibold text-surface-dark">{b}</span> {rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* PASO 1 — PLANES */}
        <section className="scroll-mt-24">
          <StepHead n={1} title="La cuenta: lo único que se paga" sub="Elegí un plan antes de instalar. Sin esto, la herramienta no funciona." />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
            Seamos honestos desde el arranque: Claude Code viene{" "}
            <span className="font-semibold text-surface-dark">dentro de Claude</span>, y para usarlo necesitás una{" "}
            <span className="font-semibold text-surface-dark">cuenta paga</span>. El plan gratis sirve para chatear, pero{" "}
            <span className="font-semibold text-surface-dark">no incluye</span> el robot que construye. Es la única
            inversión de toda esta guía.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border bg-white p-5 transition ${
                  p.reco
                    ? "border-primary shadow-[0_10px_28px_rgba(37,99,235,0.14)] ring-1 ring-primary"
                    : "border-border hover:border-slate-300"
                }`}
              >
                {p.reco && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-white">
                    Empezá acá
                  </span>
                )}
                <p className="text-[0.95rem] font-bold text-surface-dark">{p.name}</p>
                <p className={`mt-1 text-2xl font-extrabold tracking-tight ${p.muted ? "text-slate-400" : "text-primary"}`}>
                  {p.price}
                </p>
                <p className="text-xs font-semibold text-slate-500">{p.per}</p>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Callout variant="info" title="Recomendación: empezá con Pro (US$20/mes)">
              Cubre todo lo de esta guía y mucho más. Podés cancelarlo o subir de plan cuando quieras.
            </Callout>
          </div>

          <h3 className="mt-8 text-base font-bold text-surface-dark">Cómo suscribirte (2 minutos)</h3>
          <ol className="mt-3 space-y-2.5">
            {[
              <>Entrá a <span className="font-semibold text-surface-dark">claude.ai</span> y creá tu cuenta con tu mail (o con Google).</>,
              <>Una vez adentro, buscá <span className="font-semibold text-surface-dark">“Upgrade” / “Mejorar plan”</span> y elegí <span className="font-semibold text-surface-dark">Pro</span>.</>,
              <>Cargá los datos de tu tarjeta. Listo: ya tenés Claude Code habilitado.</>,
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] text-muted">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{li}</span>
              </li>
            ))}
          </ol>

          <a
            href={ACCOUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700"
          >
            Ir a crear mi cuenta en Claude
            <ArrowIcon />
          </a>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* PASO 2 — INSTALAR */}
        <section className="scroll-mt-24">
          <StepHead n={2} title="Descargar e instalar la app" sub="Como bajar cualquier aplicación. Elegí tu sistema y seguí los pasos." />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
            Vamos a instalar la <span className="font-semibold text-surface-dark">app de escritorio de Claude</span> (la
            que se abre como cualquier otro programa). Tocá la pestaña de tu computadora:
          </p>
          <div className="mt-6 rounded-3xl border border-border bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-6">
            <InstallTabs />
          </div>
          <div className="mt-6">
            <Callout variant="info" title="¿No sabés si tenés Mac o Windows?">
              Si tu computadora es de <span className="font-semibold text-surface-dark">Apple</span> (dice Mac, MacBook o
              iMac), usá la pestaña de Mac. Si es de cualquier otra marca (HP, Dell, Lenovo, Asus…), casi seguro es{" "}
              <span className="font-semibold text-surface-dark">Windows</span>.
            </Callout>
          </div>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* PASO 3 — ENTRAR */}
        <section className="scroll-mt-24">
          <StepHead n={3} title="Entrar con tu cuenta" sub="Conectá la app con el plan que compraste en el Paso 1." />
          <ol className="mt-6 space-y-2.5">
            {[
              <><span className="font-semibold text-surface-dark">Abrí la app de Claude</span> (el ícono que quedó en Aplicaciones o en el menú de inicio).</>,
              <>Vas a ver un botón <span className="font-semibold text-surface-dark">“Iniciar sesión” / “Sign in”</span>. Hacé clic.</>,
              <>Se abre <span className="font-semibold text-surface-dark">tu navegador</span>. Entrá con el mismo mail y contraseña del Paso 1.</>,
              <>El navegador te pregunta si querés <span className="font-semibold text-surface-dark">volver a la app / autorizar</span>. Aceptá.</>,
              <>Listo: volvés solo a la app y <span className="font-semibold text-surface-dark">ya estás adentro</span>.</>,
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] text-muted">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{li}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Callout variant="ok" title="Esto se hace una sola vez">
              La próxima vez que abras la app, ya vas a estar logueado. No tenés que repetir el proceso.
            </Callout>
          </div>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* PASO 4 — ORGANIZACIÓN DE LA APP */}
        <section className="scroll-mt-24">
          <StepHead n={4} title="Cómo está organizada la app" sub="Arriba hay dos áreas: Inicio y Code. Entendiendo esas dos, ya te movés por todo." />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
            Cuando abrís la app, arriba de todo vas a ver dos solapas:{" "}
            <span className="font-semibold text-surface-dark">Inicio</span> y{" "}
            <span className="font-semibold text-surface-dark">Code</span>. Son las dos caras de Claude — con entender
            estas dos ya te alcanza para arrancar.
          </p>

          <div className="mt-4 flex gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-base leading-none">🔄</span>
            <p className="text-[0.85rem] leading-relaxed text-slate-500">
              <span className="font-semibold text-secondary">Tené en cuenta:</span> Claude se actualiza muy seguido, así
              que el lugar exacto de cada botón puede moverse con el tiempo. Pero las funciones y sus nombres se
              mantienen — con esta guía te vas a orientar igual.
            </p>
          </div>

          {/* Las dos áreas */}
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {AREAS.map((a) => (
              <div
                key={a.name}
                className={`rounded-2xl border bg-white p-5 ${
                  a.highlight ? "border-primary ring-1 ring-primary shadow-[0_10px_28px_rgba(37,99,235,0.12)]" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-border bg-slate-50 text-xl">
                    {a.emoji}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-surface-dark">{a.name}</span>
                      {a.badge && (
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-primary">
                          {a.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500">{a.tagline}</p>
                  </div>
                </div>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{a.body}</p>
                <div className="mt-3 space-y-2">
                  {a.options.map((o) => (
                    <div key={o.k} className="rounded-xl border border-border bg-slate-50/70 px-3 py-2.5">
                      <p className="text-[0.85rem] font-bold text-surface-dark">{o.k}</p>
                      <p className="mt-0.5 text-[0.82rem] leading-relaxed text-muted">{o.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* El resto, resumido */}
          <h3 className="mt-8 text-base font-bold text-surface-dark">El resto de los botones, de un vistazo</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
            Vas a ver más opciones en los costados. No te abrumes: esto es solo para que te suene. Nada de esto hace falta
            para tu primer proyecto.
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {OTHERS.map((o) => (
              <div key={o.t} className="flex gap-3 rounded-2xl border border-border bg-white p-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border bg-slate-50 text-lg">
                  {o.emoji}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[0.9rem] font-bold text-surface-dark">{o.t}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-slate-500">
                      {o.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">{o.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Callout variant="info" title="Para tu primer proyecto, olvidate del resto">
              Solo necesitás dos cosas: la solapa <span className="font-semibold text-surface-dark">Code</span> →{" "}
              <span className="font-semibold text-surface-dark">Nueva sesión</span>. De varias de las otras (Proyectos,
              Rutinas, Despacho, Diseño) voy a hacer guías dedicadas más adelante.
            </Callout>
          </div>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* PASO 5 — PRIMER PROYECTO */}
        <section className="scroll-mt-24">
          <StepHead n={5} title="Tu primer mini proyecto" sub="Ahora sí: ponemos al robot a construir algo tuyo, de punta a punta." />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
            Vas a usar la solapa <span className="font-semibold text-surface-dark">Code</span>. La idea es simple: le das
            una <span className="font-semibold text-surface-dark">carpeta</span> (su “taller”) y una{" "}
            <span className="font-semibold text-surface-dark">orden en español</span>, y él construye. Vamos con un
            ejemplo, pero podés pedir <span className="font-semibold text-surface-dark">lo que quieras</span>.
          </p>

          <h3 className="mt-7 text-base font-bold text-surface-dark">Preparás el “taller” (30 segundos)</h3>
          <ol className="mt-3 space-y-2.5">
            {[
              <>En tu <span className="font-semibold text-surface-dark">Escritorio</span>, hacé <span className="font-semibold text-surface-dark">clic derecho → Nueva carpeta</span>. Llamala <span className="font-semibold text-surface-dark">mi-primer-proyecto</span>.</>,
              <>En la app, andá a la solapa <span className="font-semibold text-surface-dark">Code</span> (arriba) y tocá <span className="font-semibold text-surface-dark">“Nueva sesión”</span>.</>,
              <>Elegí <span className="font-semibold text-surface-dark">“Abrir carpeta” / “Select folder”</span> y seleccioná la carpeta que creaste. Ese es el lugar donde el robot va a construir.</>,
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] text-muted">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{li}</span>
              </li>
            ))}
          </ol>

          <h3 className="mt-7 text-base font-bold text-surface-dark">Le das la primera orden</h3>
          <p className="mt-2 text-[0.95rem] text-muted">Escribí tu pedido tal cual le hablarías a una persona. Copiá este para arrancar:</p>
          <div className="mt-4">
            <CopyPrompt />
          </div>

          <ol className="mt-5 space-y-2.5">
            {[
              <>Claude te va a <span className="font-semibold text-surface-dark">pedir permiso</span> para crear o editar archivos. Decile que <span className="font-semibold text-surface-dark">sí</span> (“Allow”).</>,
              <>Va a trabajar unos segundos y te va contando qué hace. <span className="font-semibold text-surface-dark">Dejalo terminar.</span></>,
              <>Cuando termine, si no se abrió solo, pedile: <span className="font-semibold text-surface-dark">“abrilo en el navegador”</span>. Ahí ves tu proyecto vivo.</>,
              <>¿Algo no te gusta? Decíselo: <span className="font-semibold text-surface-dark">“cambiá el color a verde”</span>, <span className="font-semibold text-surface-dark">“agregá una foto”</span>. Es una conversación.</>,
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] text-muted">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{li}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <Callout variant="info" title="Otras ideas para tu primer proyecto">
              Una calculadora de gastos · un organizador de tareas · un juego de preguntas · una tarjeta de invitación ·
              un conversor de monedas. Pedí lo que se te ocurra: el robot arranca igual.
            </Callout>
          </div>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* REGLAS DE ORO */}
        <section className="scroll-mt-24">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">4 reglas de oro</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-surface-dark md:text-3xl">Cómo hablarle al robot</h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
            No hace falta escribir “técnico”. Hablale claro, como a un ayudante muy capaz pero que recién llega: cuanto
            mejor le explicás, mejor construye.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {TIPS.map((t) => (
              <div key={t.n} className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-extrabold tracking-widest text-primary">{t.n}</p>
                <p className="mt-1.5 text-base font-bold text-surface-dark">{t.t}</p>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="my-14 h-px bg-border" />

        {/* LO QUE VIENE */}
        <section className="scroll-mt-24">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Esto es solo la punta</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-surface-dark md:text-3xl">Cuando le agarres la mano…</h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
            Lo que hiciste hoy es la base. Claude Code se vuelve muchísimo más potente cuando le sumás estas tres cosas.
            No te preocupes por ellas ahora — en los próximos videos hago una guía dedicada a cada una.
          </p>
          <div className="mt-6 space-y-3">
            {NEXT.map((n) => (
              <div key={n.t} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-900 text-xl shadow-[0_5px_14px_rgba(37,99,235,0.24)]">
                  {n.emoji}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-surface-dark">{n.t}</p>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-amber-700">
                      Próxima guía
                    </span>
                  </div>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{n.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CIERRE FW LABS */}
        <section
          style={heroBg}
          className="relative mt-16 overflow-hidden rounded-3xl px-7 py-10 text-white lg:px-10 lg:py-12"
        >
          <div className="pointer-events-none absolute inset-0" style={gridOverlay} />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-300">FW Labs</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
              Esto mismo, pero para toda una empresa
            </h2>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-slate-300">
              Lo que acabás de probar en chico es lo que hago en{" "}
              <span className="font-semibold text-white">FW Labs</span>: entro a una operación, encuentro qué le come
              horas y plata, y construyo la automatización a medida que lo resuelve. IA real en producción, no promesas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#agendar"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700"
              >
                Agendar una llamada de 20 min
                <ArrowIcon />
              </Link>
              <Link
                href="/caso"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Ver un caso real
              </Link>
            </div>
            <p className="mt-7 border-t border-white/10 pt-5 text-sm text-slate-400">
              ¿Te sirvió esta guía? Lo mejor que podés hacer es abrir la app y probar hoy mismo. Seguime para las próximas
              guías de Skills, Agentes y Conexiones. — <span className="text-slate-200">Faustino Watschinger</span>
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row lg:px-10">
          <div className="flex items-center gap-2">
            <Image src="/logo1.png" alt="FW Labs" width={96} height={30} className="h-8 w-auto" />
            <span>— Agencia de IA y automatizaciones</span>
          </div>
          <a href="https://fwlabsllc.com" className="font-medium text-secondary hover:text-primary">
            fwlabsllc.com
          </a>
        </div>
      </footer>
    </div>
  );
}
