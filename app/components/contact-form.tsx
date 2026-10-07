"use client";

import { FormEvent, useRef, useState } from "react";
import styles from "../corporate.module.css";

type Status = { kind: "idle" | "success" | "error"; message: string };

const initialStatus: Status = { kind: "idle", message: "" };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus(initialStatus);
    const data = new FormData(event.currentTarget);

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const body = await result.json().catch(() => ({}));

      if (!result.ok) {
        setStatus({ kind: "error", message: typeof body.error === "string" ? body.error : "No se pudo enviar el mensaje." });
        return;
      }

      formRef.current?.reset();
      setStatus({ kind: "success", message: "Gracias. Ya me llegó tu mensaje." });
    } catch {
      setStatus({ kind: "error", message: "No se pudo enviar el mensaje. Probá de nuevo o escribime directamente por mail." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={formRef} className={styles.contactForm} onSubmit={submit} aria-describedby="contact-form-note">
      <div className={styles.contactFormHeading}>
        <p className={styles.contactFormEyebrow}>Escribime directo</p>
        <p>Con estos datos puedo entender por dónde empezar y responderte mejor.</p>
      </div>
      <div className={styles.contactFormFields}>
        <label>Nombre<input name="name" autoComplete="name" required maxLength={120} placeholder="Tu nombre" /></label>
        <label>Empresa <span>(opcional)</span><input name="company" autoComplete="organization" maxLength={160} /></label>
        <label>Mail<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="nombre@empresa.com" /></label>
        <label>Teléfono<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} placeholder="Tu número con característica" /></label>
        <label className={styles.contactFormMessage}>¿Qué te gustaría resolver?<textarea name="message" required minLength={10} maxLength={3000} rows={5} /></label>
        <label className={styles.contactFormHoneypot} aria-hidden="true">No completar<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className={styles.contactFormSubmit} type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar mensaje"}<span aria-hidden="true">↗</span></button>
      <p id="contact-form-note" className={styles.contactFormNote}>El mensaje llega directamente a Faustino.</p>
      <p className={`${styles.contactFormStatus} ${status.kind === "success" ? styles.contactFormSuccess : styles.contactFormError}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
