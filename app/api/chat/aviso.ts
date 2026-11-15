/**
 * Mail a Faustino cuando un lead del chat deja su WhatsApp (una vez por conversación).
 *
 * El agente promete "Faustino te escribe" al que pide una persona o no sabe su volumen,
 * y al que califica le pide el WhatsApp antes de la agenda: sin este aviso nadie se entera.
 * Usa el mismo SMTP que /api/contact (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 * CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL). Sin SMTP lo deja en el log y el chat sigue.
 */
import nodemailer from "nodemailer";

import { armarAlta } from "./crm";
import { ticketEnUsd, type Salida } from "./reglas";
import type { Sesion } from "./sesion";

const TITULO: Record<string, string> = {
  califica: "Calificó y vio la agenda",
  derivar: "Pidió hablar con una persona",
  pendiente: "No sabe su volumen: escribile",
  no_califica: "No califica, pero dejó WhatsApp",
  conversando: "Dejó WhatsApp a mitad de la charla",
};

export async function avisarFaustino(sesion: Sesion, s: Salida): Promise<"enviado" | "sin_smtp" | "error"> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const to = CONTACT_TO_EMAIL || SMTP_USER;
  const from = CONTACT_FROM_EMAIL || SMTP_USER;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to || !from) {
    console.error("[chat] sin SMTP: no se avisó a Faustino de este lead", { sesion: sesion.id, estado: s.estado });
    return "sin_smtp";
  }

  const usd = ticketEnUsd(s);
  const quien = s.negocio || s.nombre || "Sin nombre";
  const asunto = `[Fawel chat] ${TITULO[s.estado] ?? s.estado} — ${quien}`.replace(/[\r\n]+/g, " ").slice(0, 150);
  const resumen = [
    `${TITULO[s.estado] ?? s.estado}.`,
    `WhatsApp: ${s.whatsapp}`,
    `Persona: ${s.nombre ?? "sin dato"} · Negocio: ${s.negocio ?? "sin dato"} · Rubro: ${s.rubro ?? "sin dato"}`,
    `Consultas por día: ${s.consultas_por_dia ?? "sin dato"} · Ticket: ${s.ticket ?? "sin dato"}${usd !== null ? ` (~USD ${Math.round(usd)})` : ""}`,
    "",
  ].join("\n");

  try {
    await nodemailer
      .createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 587),
        secure: Number(SMTP_PORT ?? 587) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
      .sendMail({ from, to, subject: asunto, text: resumen + armarAlta(sesion, s).empresas[0].notas });
    return "enviado";
  } catch (e) {
    console.error("[chat] no se pudo mandar el aviso a Faustino", { sesion: sesion.id, error: e });
    return "error";
  }
}
