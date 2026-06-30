"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PhoneFrame, FrostIcon } from "./app-mockups";

// Curado: solo las pantallas que demuestran valor real (vivo, alertas, histórico, panorama).
const screenshots = [
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.34.42_resized.png", // Datos en vivo — cámara (estrella)
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.49_resized.png", // Alertas por severidad
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.36_resized.png", // Sala de máquinas en vivo
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.41.01_resized.png", // Gráfica histórica
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.29_resized.png", // Home / monitoreo industrial
];

export default function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setIndex((i) => (i + 1) % screenshots.length);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-5">
      {/* Text */}
      <article className="lg:col-span-3 flex flex-col rounded-2xl border border-border bg-white p-8 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">Control remoto en tiempo real</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">Desde el celular o la compu</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">IA con humano en el medio</span>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-secondary">
          <div className="rounded-xl border-l-4 border-red-300 bg-red-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">El problema</p>
            <p className="mt-2">
              Cualquier ajuste en una planta —hasta apretar un botón— obligaba a un técnico a viajar. Tareas de dos minutos se volvían jornadas enteras. Y sin registro de quién tocaba qué, cada incidente terminaba en discusiones con el cliente.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">La solución</p>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Conectamos tus equipos de planta y ves todo en tiempo real: controlás y reconfigurás <strong className="text-surface-dark">desde cualquier lado</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span><strong className="text-surface-dark">Alertas en vivo y predictivas</strong> con severidad y aviso automático por mail en las críticas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Cada cambio queda registrado con autor y momento: <strong className="text-surface-dark">se acabó la discusión</strong> de quién se equivocó.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>Capa de <strong className="text-surface-dark">IA con humano en el medio</strong>: propone la acción, el operador decide. Nada se ejecuta solo.</span>
              </li>
            </ul>
          </div>
        </div>

        <a
          href="https://www.3wsrl.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition hover:text-blue-700"
        >
          Visitar 3W SRL →
        </a>
      </article>

      {/* Carousel — capturas reales en frame premium + ambiente frigorífico */}
      <div
        className="lg:col-span-2 relative flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambiente frío */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_45%,rgba(125,211,252,0.5),rgba(186,230,253,0.2)_48%,transparent_72%)] blur-2xl" />
        <FrostIcon className="pointer-events-none absolute left-1 top-2 h-8 w-8 text-cyan-300/70" />
        <FrostIcon className="pointer-events-none absolute bottom-4 right-2 h-6 w-6 text-sky-300/60" />

        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-surface-dark shadow-md transition hover:bg-slate-50"
        >
          ←
        </button>

        <PhoneFrame className="mx-12 w-full max-w-[230px]">
          {screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Pantalla de FW Control ${i + 1}`}
              fill
              sizes="230px"
              className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
            />
          ))}
        </PhoneFrame>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-surface-dark shadow-md transition hover:bg-slate-50"
        >
          →
        </button>

        <div className="absolute -bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {screenshots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
