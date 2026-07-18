"use client";

import { useState } from "react";

const DOWNLOAD_URL = "https://claude.com/download";

type Step = { t: string; d: React.ReactNode };

const MAC_STEPS: Step[] = [
  {
    t: "Entrá a la página de descarga",
    d: (
      <>
        Abrí el navegador y entrá a{" "}
        <span className="font-semibold text-secondary">claude.com/download</span>. Hacé clic en el botón{" "}
        <span className="font-semibold text-secondary">“Download for macOS”</span> (descargar para Mac).
      </>
    ),
  },
  {
    t: "Se baja el archivo",
    d: (
      <>
        Se descarga un archivo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.85em] font-semibold text-secondary">.dmg</code>. Suele
        aparecer arriba a la derecha del navegador o en la carpeta <span className="font-semibold text-secondary">Descargas</span>.
      </>
    ),
  },
  {
    t: "Abrilo",
    d: (
      <>
        Hacé <span className="font-semibold text-secondary">doble clic</span> en ese archivo. Se abre una ventana con el ícono de Claude.
      </>
    ),
  },
  {
    t: "Arrastralo a Aplicaciones",
    d: (
      <>
        <span className="font-semibold text-secondary">Arrastrá</span> el ícono de Claude sobre la carpeta{" "}
        <span className="font-semibold text-secondary">“Aplicaciones”</span> que aparece al lado.
      </>
    ),
  },
  {
    t: "Abrí Claude",
    d: (
      <>
        Andá a <span className="font-semibold text-secondary">Aplicaciones</span> y doble clic en{" "}
        <span className="font-semibold text-secondary">Claude</span>. Si pregunta “¿Seguro que querés abrirlo?”, clic en{" "}
        <span className="font-semibold text-secondary">Abrir</span>.
      </>
    ),
  },
];

const WIN_STEPS: Step[] = [
  {
    t: "Entrá a la página de descarga",
    d: (
      <>
        Abrí el navegador y entrá a{" "}
        <span className="font-semibold text-secondary">claude.com/download</span>. Hacé clic en el botón{" "}
        <span className="font-semibold text-secondary">“Download for Windows”</span> (descargar para Windows).
      </>
    ),
  },
  {
    t: "Se baja el archivo",
    d: (
      <>
        Se descarga un archivo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.85em] font-semibold text-secondary">.exe</code>. Suele
        quedar en la carpeta <span className="font-semibold text-secondary">Descargas</span>.
      </>
    ),
  },
  {
    t: "Ejecutá el instalador",
    d: (
      <>
        Hacé <span className="font-semibold text-secondary">doble clic</span> en ese archivo para instalarlo.
      </>
    ),
  },
  {
    t: "Permití la instalación",
    d: (
      <>
        Si Windows pregunta “¿Permitir que esta app haga cambios?”, clic en{" "}
        <span className="font-semibold text-secondary">Sí</span>.
      </>
    ),
  },
  {
    t: "Terminá",
    d: (
      <>
        Seguí <span className="font-semibold text-secondary">Siguiente → Siguiente → Instalar → Finalizar</span>. Se crea el ícono de Claude en
        tu menú de inicio.
      </>
    ),
  },
];

function MacGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 2.98-.75.85-1.98 1.5-3.02 1.42-.12-1.1.44-2.28 1.09-3.02.74-.84 2.03-1.47 3.04-1.38zM20.5 17.02c-.55 1.27-.81 1.83-1.52 2.95-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.78-4.04-3.34C-.02 15.65-.32 10.36 1.98 7.68c1.03-1.2 2.66-1.96 4.2-1.96 1.57 0 2.56 1 3.86 1 1.26 0 2.03-1 3.85-1 1.37 0 2.82.75 3.86 2.03-3.39 1.86-2.84 6.7.75 8.27z" />
    </svg>
  );
}

function WinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M3 5.1 10.3 4v7.2H3V5.1zM10.3 12.8V20L3 18.9v-6.1h7.3zM11.4 3.85 21 2.5v8.7h-9.6V3.85zM21 12.3V21.5l-9.6-1.35v-7.85H21z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path fillRule="evenodd" d="M10 2.75a.75.75 0 0 1 .75.75v7.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V3.5A.75.75 0 0 1 10 2.75zM4 15.25a.75.75 0 0 1 .75.75v.75c0 .14.11.25.25.25h10a.25.25 0 0 0 .25-.25V16a.75.75 0 0 1 1.5 0v.75A1.75 1.75 0 0 1 15 18.5H5a1.75 1.75 0 0 1-1.75-1.75V16a.75.75 0 0 1 .75-.75z" clipRule="evenodd" />
    </svg>
  );
}

export default function InstallTabs() {
  const [os, setOs] = useState<"mac" | "win">("mac");
  const steps = os === "mac" ? MAC_STEPS : WIN_STEPS;
  const accent = os === "mac" ? "text-secondary" : "text-sky-600";

  const tabBase =
    "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all";
  const tabActive = "bg-white text-secondary shadow-[0_2px_10px_rgba(15,23,42,0.10)]";
  const tabIdle = "text-muted hover:text-secondary";

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-1.5 rounded-2xl border border-border bg-slate-100/80 p-1.5">
        <button
          type="button"
          onClick={() => setOs("mac")}
          aria-pressed={os === "mac"}
          className={`${tabBase} ${os === "mac" ? tabActive : tabIdle}`}
        >
          <MacGlyph />
          Tengo Mac (Apple)
        </button>
        <button
          type="button"
          onClick={() => setOs("win")}
          aria-pressed={os === "win"}
          className={`${tabBase} ${os === "win" ? tabActive : tabIdle}`}
        >
          <WinGlyph />
          Tengo Windows
        </button>
      </div>

      {/* Steps */}
      <ol className="mt-6 space-y-3.5">
        {steps.map((s, i) => (
          <li key={`${os}-${i}`} className="flex gap-4">
            <span
              className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg text-sm font-bold ${
                os === "mac" ? "bg-slate-100 text-secondary" : "bg-sky-50 text-sky-600"
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className={`text-[0.95rem] font-semibold ${accent}`}>{s.t}</p>
              <p className="mt-0.5 text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Direct download */}
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold !text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
      >
        <DownloadIcon />
        Ir a descargar para {os === "mac" ? "Mac" : "Windows"}
      </a>
      <p className="mt-3 text-xs text-muted">
        Te lleva a la página oficial de Claude. Ahí tocás el botón grande de tu sistema y empieza la descarga.
      </p>
    </div>
  );
}
