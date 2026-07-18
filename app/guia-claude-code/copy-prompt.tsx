"use client";

import { useState } from "react";

const PROMPT =
  "Creá una página web de una sola pantalla para presentarme como [tu nombre y a qué te dedicás]. Que se vea moderna y linda, con una frase de bienvenida y mis datos de contacto. Cuando termines, abrila en el navegador para que la vea.";

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h5A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 7 12.5v-9z" />
      <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h5A1.5 1.5 0 0 0 11 16.5V15H8.5A2.5 2.5 0 0 1 6 12.5V6H4.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function CopyPrompt() {
  const [copied, setCopied] = useState(false);

  const flash = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const copy = async () => {
    // 1) API moderna (funciona en https / localhost con gesto de usuario)
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROMPT);
        flash();
        return;
      }
    } catch {
      // sigue al fallback
    }
    // 2) Fallback para navegadores/contextos que bloquean la API de portapapeles
    try {
      const ta = document.createElement("textarea");
      ta.value = PROMPT;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      flash();
    } catch {
      // Último recurso: el texto queda visible para copiar a mano.
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#f87171]" />
        <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
        <span className="h-3 w-3 rounded-full bg-[#34d399]" />
        <span className="ml-2 text-xs font-medium tracking-wide text-slate-400">tu primera orden</span>
        <button
          type="button"
          onClick={copy}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            copied ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-slate-200 hover:bg-white/20"
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
      <p className="px-5 py-5 text-[0.95rem] leading-relaxed text-slate-100">
        <span className="mr-1.5 font-bold text-blue-400">›</span>
        {PROMPT}
      </p>
    </div>
  );
}
