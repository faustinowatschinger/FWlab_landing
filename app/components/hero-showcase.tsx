"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PhoneFrame, FrostIcon } from "./app-mockups";

const SHOTS = [
  {
    src: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.34.42_resized.png",
    alt: "App de FW Control: datos en vivo de una cámara",
  },
  {
    src: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.39.49_resized.png",
    alt: "App de FW Control: alertas por severidad",
  },
  {
    src: "/Simulator Screenshot - iPhone 17 Pro - 2026-04-01 at 08.41.01_resized.png",
    alt: "App de FW Control: gráfica histórica",
  },
];

export default function HeroShowcase() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SHOTS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fw-rise relative mx-auto flex w-full items-center justify-center" style={{ animationDelay: "200ms" }}>
      {/* Ambiente frío: niebla de cámara frigorífica */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,rgba(125,211,252,0.55),rgba(186,230,253,0.25)_45%,transparent_72%)] blur-2xl" />
      <FrostIcon className="pointer-events-none absolute -left-2 -top-2 h-10 w-10 text-cyan-300/70" />
      <FrostIcon className="pointer-events-none absolute right-2 top-10 h-6 w-6 text-sky-300/60" />
      <FrostIcon className="pointer-events-none absolute -bottom-1 left-10 h-7 w-7 text-cyan-200/70" />

      {/* MÓVIL: un frame que rota entre las 3 pantallas */}
      <div className="relative w-[210px] flex-shrink-0 sm:hidden">
        <PhoneFrame className="w-full">
          {SHOTS.map((s, idx) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              fill
              sizes="210px"
              priority={idx === 0}
              className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </PhoneFrame>
        <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {SHOTS.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-primary" : "w-1.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: abanico de 3 pantallas */}
      <div className="hidden items-center justify-center sm:flex">
        <PhoneFrame className="z-0 -mr-10 w-[130px] flex-shrink-0 translate-y-8 -rotate-[10deg] lg:w-[140px]">
          <Image src={SHOTS[0].src} alt={SHOTS[0].alt} fill sizes="140px" className="object-cover" />
        </PhoneFrame>
        <PhoneFrame className="z-10 w-[210px] flex-shrink-0 lg:w-[225px]">
          <Image src={SHOTS[1].src} alt={SHOTS[1].alt} fill sizes="225px" className="object-cover" priority />
        </PhoneFrame>
        <PhoneFrame className="z-0 -ml-10 w-[130px] flex-shrink-0 translate-y-8 rotate-[10deg] lg:w-[140px]">
          <Image src={SHOTS[2].src} alt={SHOTS[2].alt} fill sizes="140px" className="object-cover" />
        </PhoneFrame>
      </div>

      {/* Chip de temperatura (desktop) */}
      <div className="absolute -left-2 top-6 z-20 hidden items-center gap-2 rounded-xl border border-cyan-100 bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm lg:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600"><FrostIcon className="h-4 w-4" /></span>
        <div>
          <p className="text-sm font-black leading-none tracking-tight text-surface-dark">-22 °C</p>
          <p className="mt-0.5 text-[10px] font-medium text-emerald-600">Cámara estable</p>
        </div>
      </div>

      {/* Floating proof card (≥ sm) */}
      <div className="absolute -bottom-4 -right-2 z-20 hidden rounded-xl border border-border bg-white/95 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:block">
        <p className="text-2xl font-black leading-none tracking-tight text-surface-dark">327 hs</p>
        <p className="mt-1 text-[11px] text-muted">ahorradas en 3 meses</p>
      </div>
    </div>
  );
}
