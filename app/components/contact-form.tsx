"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "idle" | "success" | "error";
    text: string;
  }>({ type: "idle", text: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback({ type: "idle", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        type: "error",
        text: "Por favor completá nombre, email y mensaje.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "No se pudo enviar el mensaje.");
      }

      setForm(INITIAL_STATE);
      setFeedback({
        type: "success",
        text: data.message ?? "Mensaje enviado correctamente.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Error inesperado. Intentá de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
    >
      <label className="block text-sm font-medium text-secondary">
        Nombre
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-surface-dark outline-none transition focus:border-primary"
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </label>

      <label className="block text-sm font-medium text-secondary">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-surface-dark outline-none transition focus:border-primary"
          placeholder="tu@email.com"
          autoComplete="email"
        />
      </label>

      <label className="block text-sm font-medium text-secondary">
        Mensaje
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          className="mt-2 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm text-surface-dark outline-none transition focus:border-primary"
          placeholder="Contanos sobre tu empresa y qué necesitás"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Quiero ordenar mi WhatsApp"}
      </button>

      <p
        role="status"
        className={
          feedback.type === "error"
            ? "text-sm text-red-600"
            : "text-sm text-emerald-600"
        }
      >
        {feedback.text}
      </p>
    </form>
  );
}
