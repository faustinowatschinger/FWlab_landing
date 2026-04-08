"use client";

import Image from "next/image";
import { useState } from "react";

type Question = {
  text: string;
  options: { label: string; value: number }[];
};

const defaultOptions = [
  { label: "No / Nunca", value: 0 },
  { label: "A veces", value: 1 },
  { label: "Sí / Siempre", value: 2 },
];

const invertedOptions = [
  { label: "Sí, bastante", value: 0 },
  { label: "A veces", value: 1 },
  { label: "No / Casi nunca", value: 2 },
];

const questions: Question[] = [
  { text: "¿Respondés nuevos leads en menos de 5 minutos?", options: defaultOptions },
  { text: "¿Tenés mensajes o scripts armados para responder consultas frecuentes?", options: defaultOptions },
  { text: "¿Clasificás tus leads según interés, estado o etapa de venta?", options: defaultOptions },
  { text: "¿Hacés seguimiento a quienes preguntan pero no compran en el momento?", options: defaultOptions },
  { text: "¿Tenés un proceso claro para recuperar leads fríos?", options: defaultOptions },
  { text: "¿Sabés cuántos leads entran y cuántos terminan comprando?", options: defaultOptions },
  { text: "¿Tus conversaciones de venta siguen una estructura o cada vendedor responde como puede?", options: defaultOptions },
  { text: "¿Se te mezclan chats nuevos, clientes activos y seguimientos pendientes?", options: invertedOptions },
  { text: "¿Perdés oportunidades por responder tarde o colgar seguimientos?", options: invertedOptions },
  {
    text: "¿Tu WhatsApp hoy funciona como un sistema comercial o solo como bandeja de entrada?",
    options: [
      { label: "Solo bandeja de entrada", value: 0 },
      { label: "Un poco de ambos", value: 1 },
      { label: "Sistema comercial", value: 2 },
    ],
  },
];

function getResult(score: number) {
  if (score <= 7) {
    return {
      range: "0 a 7 puntos",
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      message:
        "Tenés fugas importantes de conversión por WhatsApp. Probablemente estés perdiendo leads por respuesta tardía, falta de seguimiento y desorden comercial.",
    };
  }
  if (score <= 14) {
    return {
      range: "8 a 14 puntos",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      message:
        "Tu sistema tiene base, pero todavía hay oportunidades claras para mejorar conversión y seguimiento.",
    };
  }
  return {
    range: "15 a 20 puntos",
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    message:
      "Tenés un buen nivel de control comercial por WhatsApp, aunque todavía puede haber optimizaciones para vender más.",
  };
}

export default function TestWhatsAppPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === questions.length;
  const answered = Object.keys(answers).length;

  function handleSelect(questionIndex: number, value: number) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const score = Object.values(answers).reduce((acc, val) => acc + val, 0);

  const result = getResult(score);

  return (
    <div className="min-h-screen bg-slate-50 text-text">
      <header className="border-b border-border/90 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="/" className="inline-flex items-center">
            <Image
              src="/logo1.png"
              alt="FW Labs logo"
              width={132}
              height={40}
              className="h-25 w-auto"
              priority
            />
          </a>

          <a
            href="/"
            className="text-sm font-medium text-muted transition hover:text-secondary"
          >
            Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10 lg:py-20">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Autodiagnóstico
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight text-surface-dark md:text-4xl">
          ¿Estás perdiendo ventas por WhatsApp?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Respondé estas 10 preguntas y descubrí si tu WhatsApp está funcionando
          como sistema de ventas o solo como bandeja de entrada.
        </p>

        <div className="mt-10 space-y-6">
          {questions.map((question, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-white p-6 shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
            >
              <p className="text-sm font-semibold text-secondary">
                <span className="mr-2 text-primary">{idx + 1}.</span>
                {question.text}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {question.options.map((option) => {
                  const isSelected = answers[idx] === option.value;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleSelect(idx, option.value)}
                      disabled={submitted}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                        isSelected
                          ? "border-primary bg-primary !text-white"
                          : "border-border bg-slate-50 text-muted hover:border-primary hover:text-primary"
                      } ${submitted ? "cursor-default opacity-80" : "cursor-pointer"}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`inline-flex rounded-xl px-8 py-3 text-sm font-semibold !text-white transition ${
                allAnswered
                  ? "cursor-pointer bg-primary hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              Ver mi resultado
            </button>
            {!allAnswered && (
              <p className="mt-3 text-xs text-muted">
                Respondé todas las preguntas para ver tu resultado.
              </p>
            )}
          </div>
        )}

        {submitted && (
          <div className="mt-10 space-y-6">
            <div
              className={`rounded-2xl border p-8 ${result.bg}`}
            >
              <p className={`text-lg font-bold ${result.color}`}>
                Tu puntaje: {score} / 20
              </p>
              <p className={`mt-1 text-sm font-semibold ${result.color}`}>
                {result.range}
              </p>
              <p className="mt-4 text-base leading-relaxed text-secondary">
                {result.message}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
              <h2 className="text-xl font-semibold text-surface-dark">
                Resultado final del test
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Si querés, te hacemos una auditoría gratuita y te mostramos
                exactamente dónde se están perdiendo ventas en tu WhatsApp.
              </p>
              <div className="mt-6">
                <a
                  href="/diagnostico"
                  className="inline-flex rounded-xl bg-primary px-7 py-3 text-sm font-semibold !text-white transition hover:bg-blue-700"
                >
                  Solicitar auditoría gratuita
                </a>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer text-sm font-medium text-muted underline transition hover:text-secondary"
              >
                Volver a hacer el test
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-secondary">FW Labs</p>
          <p>faustino@fwlabsllc.com</p>
        </div>
      </footer>
    </div>
  );
}
