"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const screenshots = [
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.29_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.33_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.37_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.40_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.26.44_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.34.42_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.34.54_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.36_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.49_resized.png",
  "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.41.01_resized.png",
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
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">Raspberry Pi Gateway</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">App móvil + escritorio</span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">IA en entrenamiento</span>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-secondary">
          <div className="rounded-xl border-l-4 border-red-300 bg-red-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600">El problema</p>
            <p className="mt-2">
              3W SRL llegó con un problema concreto: cualquier ajuste mínimo en una planta frigorífica —incluso apretar un botón— obligaba a un técnico a viajar físicamente hasta el lugar. No había forma de intervenir a distancia, y eso convertía tareas de dos minutos en jornadas enteras de desplazamiento.
            </p>
            <p className="mt-2">
              A eso se sumaba un problema de trazabilidad: como no quedaba registro de quién había tocado qué ni de cómo había quedado la instalación, cada incidente terminaba en discusiones internas y con clientes sobre quién se había equivocado. La falta de histórico y de auditoría generaba desconfianza dentro del equipo y fricciones recurrentes con los propios clientes.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">La solución</p>
          <p>
            Un gateway sobre Raspberry Pi conectado directamente al PLC de cada planta captura los datos en tiempo real y los envía a la nube, donde una app móvil y de escritorio permite visualizarlos en gráficas y tablas, consultar el histórico completo y modificar configuraciones y estados del frigorífico desde cualquier parte del mundo.
          </p>
          <p>
            El sistema incluye <strong className="text-surface-dark">alertas en vivo y predictivas</strong> para anticipar problemas antes de que ocurran, con niveles de severidad y notificación automática por mail a los responsables cuando son críticas. Cada cambio de configuración queda registrado con autor y momento, eliminando dudas sobre el origen de cualquier incidencia.
          </p>
          <p>
            Además, la plataforma está integrando una <strong className="text-surface-dark">capa de IA en entrenamiento continuo</strong>, pensada para que en el futuro pueda operar de forma autónoma sin necesidad de aprobación humana en cada decisión.
          </p>
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

      {/* Carousel */}
      <div
        className="lg:col-span-2 relative flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-surface-dark shadow-md transition hover:bg-slate-50"
        >
          ←
        </button>

        <div className="relative mx-12 aspect-[9/19] w-full max-w-[260px] overflow-hidden rounded-3xl border border-border bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
          {screenshots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`3W Control screenshot ${i + 1}`}
              fill
              sizes="260px"
              className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-surface-dark shadow-md transition hover:bg-slate-50"
        >
          →
        </button>

        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
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
