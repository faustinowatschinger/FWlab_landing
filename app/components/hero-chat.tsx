"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { side: "in" | "out"; time: string; text: string };

const messages: Msg[] = [
  { side: "in", time: "23:41", text: "Hola, vi el depto de 2 ambientes en Palermo. ¿Sigue disponible?" },
  { side: "out", time: "23:41", text: "Hola, sí, sigue disponible. ¿Lo buscás para vivir o como inversión?" },
  { side: "in", time: "23:42", text: "Para vivir. Tengo hasta 140 mil." },
  { side: "out", time: "23:42", text: "Bárbaro. Tengo 2 que encajan en Palermo con ese presupuesto. ¿Coordinamos una visita esta semana?" },
  { side: "in", time: "23:43", text: "Dale, el jueves a la tarde puede ser." },
  { side: "out", time: "23:43", text: "Listo. Te agendé la visita el jueves 18:30 y te llegó la invitación al mail." },
];

function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function DoubleCheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m1.5 12.5 4 4 7-9" />
      <path d="m11 16.5 1.5 1.5 7-9" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h1.612a.75.75 0 0 0 0-1.5H3.752a.75.75 0 0 0-.75.75v3.66a.75.75 0 0 0 1.5 0v-1.79l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.27-5.115a.75.75 0 0 0-.75.75v1.79l-.31-.31A7 7 0 0 0 3.81 11.69a.75.75 0 1 0 1.449.39 5.5 5.5 0 0 1 9.201-2.466l.312.311h-1.613a.75.75 0 0 0 0 1.5h3.66a.75.75 0 0 0 .75-.75V7.06a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
    </svg>
  );
}

function Bubble({ m, fresh }: { m: Msg; fresh: boolean }) {
  const out = m.side === "out";
  return (
    <div className={`${fresh ? "fw-rise" : ""} flex ${out ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
          out ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm bg-white text-secondary"
        }`}
      >
        <p>{m.text}</p>
        <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${out ? "text-blue-100" : "text-slate-400"}`}>
          {m.time}
          {out && <DoubleCheckIcon className="h-3.5 w-3.5 text-blue-200" />}
        </span>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="fw-rise flex justify-end">
      <div className="rounded-2xl rounded-br-sm bg-primary/90 px-4 py-3 shadow-sm">
        <span className="flex items-center gap-1">
          <span className="fw-typing-dot h-1.5 w-1.5 rounded-full bg-white/90" />
          <span className="fw-typing-dot h-1.5 w-1.5 rounded-full bg-white/90" style={{ animationDelay: "0.2s" }} />
          <span className="fw-typing-dot h-1.5 w-1.5 rounded-full bg-white/90" style={{ animationDelay: "0.4s" }} />
        </span>
      </div>
    </div>
  );
}

export default function HeroChat() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const wait = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setStep(0);
    setTyping(false);
    setDone(false);

    let i = 0;
    const tick = () => {
      if (i >= messages.length) {
        wait(() => setDone(true), 450);
        return;
      }
      const m = messages[i];
      if (m.side === "out") {
        setTyping(true);
        wait(() => {
          setTyping(false);
          setStep(i + 1);
          i += 1;
          wait(tick, 550);
        }, 1150);
      } else {
        setStep(i + 1);
        i += 1;
        wait(tick, 1050);
      }
    };
    wait(tick, 500);
  }, [clearTimers, wait]);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // Diferido para no llamar setState de forma síncrona dentro del effect.
    const id = setTimeout(() => {
      if (reduce) {
        setStep(messages.length);
        setDone(true);
      } else {
        play();
      }
    }, 350);
    timers.current.push(id);
    return clearTimers;
  }, [play, clearTimers]);

  const visible = messages.slice(0, step);

  return (
    <div className="fw-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "200ms" }}>
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-b from-blue-200/40 to-slate-200/30 blur-2xl" />
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-border bg-surface-dark px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">FW</div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">FW Assistant</p>
            <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="fw-pulse inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
              {typing ? "escribiendo…" : "en línea"}
            </p>
          </div>
        </div>

        {/* Chat body */}
        <div className="relative min-h-[360px] space-y-2.5 bg-[radial-gradient(#dbe4f0_1px,transparent_1px)] [background-size:22px_22px] bg-slate-50 px-4 py-5">
          <div className="flex justify-center">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400 shadow-sm">
              Hoy · 23:41
            </span>
          </div>

          {visible.map((m, i) => (
            <Bubble key={i} m={m} fresh={i === step - 1} />
          ))}

          {typing && <TypingBubble />}

          {done && (
            <div className="fw-rise flex justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                <CheckIcon className="h-3.5 w-3.5" />
                Visita agendada
              </span>
            </div>
          )}
        </div>

        {/* Caption bar */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-white px-4 py-3">
          <p className="text-xs font-medium text-muted">El equipo dormía. FW Assistant cerró la visita.</p>
          <button
            type="button"
            onClick={play}
            aria-label="Ver la conversación de nuevo"
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[11px] font-semibold text-muted transition hover:bg-slate-50 hover:text-secondary"
          >
            <ReplayIcon />
            De nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
