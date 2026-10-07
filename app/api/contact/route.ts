import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 3;
const requestsByIp = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function safeSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function visitorIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function hasReachedLimit(ip: string) {
  if (process.env.NODE_ENV !== "production") return false;

  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_IP) {
    requestsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);
  if (requestsByIp.size > 5_000) requestsByIp.clear();
  return false;
}

function response(body: Record<string, string>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return response({ error: "No se pudo enviar el mensaje." }, 403);
    } catch {
      return response({ error: "No se pudo enviar el mensaje." }, 403);
    }
  }

  let rawPayload: unknown;
  try {
    rawPayload = await request.json();
  } catch {
    return response({ error: "Completá el formulario antes de enviarlo." }, 400);
  }

  if (!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
    return response({ error: "Completá el formulario antes de enviarlo." }, 400);
  }

  const payload = rawPayload as ContactPayload;

  const name = text(payload.name);
  const company = text(payload.company);
  const email = text(payload.email);
  const phone = text(payload.phone);
  const message = text(payload.message);
  const website = text(payload.website);

  // Campo invisible para bots. Se responde exitosamente para no ayudarles a iterar.
  if (website) return response({ ok: "true" });

  if (name.length < 2 || name.length > 120) return response({ error: "Escribí tu nombre." }, 400);
  if (company.length > 160) return response({ error: "El nombre de la empresa es demasiado largo." }, 400);
  if (!EMAIL_RE.test(email) || email.length > 254) return response({ error: "Escribí un mail válido." }, 400);
  if (phone.length > 40 || phone.replace(/\D/g, "").length < 7) return response({ error: "Escribí un teléfono válido." }, 400);
  if (message.length < 10 || message.length > 3_000) return response({ error: "Contame un poco más sobre lo que necesitás resolver." }, 400);

  if (hasReachedLimit(visitorIp(request))) {
    return response({ error: "Ya recibí varios mensajes desde esta conexión. Probá de nuevo más tarde." }, 429);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const to = CONTACT_TO_EMAIL || SMTP_USER;
  const from = CONTACT_FROM_EMAIL || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to || !from) {
    return response({ error: "El formulario no está disponible ahora. Escribime directamente por mail." }, 503);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT ?? 587) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Contacto desde FW Labs — ${safeSubject(name)}`,
      text: [
        "Nuevo mensaje desde fwlabsllc.com",
        "",
        `Nombre: ${name}`,
        `Empresa: ${company || "No indicada"}`,
        `Mail: ${email}`,
        `Teléfono: ${phone}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });
  } catch {
    return response({ error: "No se pudo enviar el mensaje. Probá de nuevo o escribime directamente por mail." }, 502);
  }

  return response({ ok: "true" });
}
