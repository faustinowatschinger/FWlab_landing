"use client";

import { useEffect, useState } from "react";

/**
 * Barra CTA fija en la parte inferior, solo en móvil/tablet.
 * Se oculta cuando la sección de agendado (#agendar / Calendly) está en pantalla.
 */
export default function MobileCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("agendar");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_20px_rgba(15,23,42,0.10)] backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="#agendar"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-blue-700"
      >
        Agendar llamada de 20 min
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
}
