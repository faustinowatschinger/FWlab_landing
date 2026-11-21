/**
 * Mail a Faustino cuando el uso del modelo se acerca al techo o lo toca.
 *
 * Sin esto, llegar al techo solo deja una línea en el log de Vercel y nadie se
 * entera: puede ser tracción (hay que subirlo) o abuso (hay que mirarlo).
 * Usa el mismo SMTP que /api/contact. Sin SMTP queda en el log.
 */
import { after } from "next/server";
import nodemailer from "nodemailer";

import { umbralesCruzados, type Consumo } from "./limites";

/**
 * Mira si este consumo cruzó la mitad o el total del techo del día, o el total
 * del techo de la hora, y si cruzó manda el aviso después de responder.
 */
export function avisarSiCruza(que: string, consumo: Consumo, maxHora: number, maxDia: number) {
  if (!consumo.ok) return;
  const envios: (() => Promise<void>)[] = [];
  if (umbralesCruzados(consumo, "dia", maxDia).length) {
    const n = consumo.cuentas.dia;
    envios.push(() => avisarLimite(que, n, maxDia, "día"));
  }
  if (umbralesCruzados(consumo, "global", maxHora, [1]).length) {
    envios.push(() => avisarLimite(que, maxHora, maxHora, "hora"));
  }
  for (const enviar of envios) {
    try {
      after(enviar);
    } catch {
      // Fuera de un pedido de Next (una prueba, un script) no hay `after`.
      void enviar();
    }
  }
}

export async function avisarLimite(que: string, cuenta: number, max: number, ventana: "hora" | "día"): Promise<void> {
  const lleno = cuenta >= max;
  const asunto = `[Fawel límites] ${que}: ${cuenta} de ${max} por ${ventana}${lleno ? " — TECHO ALCANZADO" : ""}`;
  const texto = [
    `${que}: ${cuenta} de ${max} en esta ventana (por ${ventana}).`,
    lleno
      ? "Se llegó al techo: hasta que cambie la ventana, los que escriban reciben \"probá en un rato\"."
      : "Va por la mitad del techo. Todavía no se corta nada.",
    "",
    "Si es tráfico real de la campaña, se sube con la variable de entorno. Si no lo es, mirá los logs de Vercel y el uso en OpenAI antes de tocar nada.",
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const to = CONTACT_TO_EMAIL || SMTP_USER;
  const from = CONTACT_FROM_EMAIL || SMTP_USER;
  console.error(`[limites] ${asunto}`);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to || !from) return;

  try {
    await nodemailer
      .createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 587),
        secure: Number(SMTP_PORT ?? 587) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        socketTimeout: 5000,
      })
      .sendMail({ from, to, subject: asunto, text: texto });
  } catch (e) {
    console.error("[limites] no se pudo mandar el aviso", e instanceof Error ? e.message : e);
  }
}
