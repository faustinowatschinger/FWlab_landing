"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./chat.module.css";
import { abrirPopup, cargarCalendly, urlAgenda, useReservaCalendly } from "../components/calendly";
import { trackMeta } from "../components/meta-pixel";
import { CLAVE_ORIGEN } from "../components/origen-anuncio";

type Mensaje = { de: "agente" | "usuario"; texto: string };

type Guardado = { sesion: string | null; mensajes: Mensaje[]; agenda: boolean; nombre: string | null; fin: boolean };

const CLAVE = "fawel-chat-v1";
const CLAVES_ORIGEN = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "v", "desde"];

function leerGuardado(): Guardado | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE);
    return crudo ? (JSON.parse(crudo) as Guardado) : null;
  } catch {
    return null;
  }
}

function origenDeLaUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const salida: Record<string, string> = {};
  for (const k of CLAVES_ORIGEN) {
    const v = params.get(k);
    if (v) salida[k] = v;
  }
  if (Object.keys(salida).length) return salida;
  // Llegó por un botón de la landing: el origen lo guardó OrigenAnuncio al entrar.
  try {
    const guardado = JSON.parse(sessionStorage.getItem(CLAVE_ORIGEN) ?? "null");
    if (guardado && typeof guardado === "object") {
      for (const k of CLAVES_ORIGEN) {
        const v = (guardado as Record<string, unknown>)[k];
        if (typeof v === "string" && v) salida[k] = v.slice(0, 80);
      }
    }
  } catch {
    /* sin storage o dato roto: sin etiqueta */
  }
  return salida;
}

export default function Chat({ saludo, calendly }: { saludo: string; calendly: string }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ de: "agente", texto: saludo }]);
  const [sesion, setSesion] = useState<string | null>(null);
  const [agenda, setAgenda] = useState(false);
  const [nombre, setNombre] = useState<string | null>(null);
  const [fin, setFin] = useState(false);
  const [texto, setTexto] = useState("");
  const [esperando, setEsperando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lista = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);
  const origen = useRef<Record<string, string>>({});

  useReservaCalendly("chat", origen);

  // Con la agenda a la vista, el script de Calendly se precarga para que el popup abra al toque.
  useEffect(() => {
    if (agenda) cargarCalendly().catch(() => {});
  }, [agenda]);

  // Recupera la conversación si recargó la página (pasa seguido en el navegador de Instagram).
  useEffect(() => {
    origen.current = origenDeLaUrl();
    const g = leerGuardado();
    if (!g) return;
    setMensajes(g.mensajes);
    setSesion(g.sesion);
    setAgenda(g.agenda);
    setNombre(g.nombre);
    setFin(g.fin);
  }, []);

  useEffect(() => {
    if (!sesion) return;
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ sesion, mensajes, agenda, nombre, fin } satisfies Guardado));
    } catch {
      /* modo privado sin storage: se pierde al recargar y listo */
    }
  }, [sesion, mensajes, agenda, nombre, fin]);

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, esperando, agenda]);

  async function enviar() {
    const limpio = texto.trim();
    if (!limpio || esperando || fin) return;

    const primero = !mensajes.some((m) => m.de === "usuario");
    if (primero) trackMeta("PrimerMensajeChat", origen.current, true);

    setMensajes((m) => [...m, { de: "usuario", texto: limpio }]);
    setTexto("");
    setError(null);
    setEsperando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sesion, mensaje: limpio, origen: origen.current }),
      });
      const datos = await res.json();

      if (!res.ok) {
        if (datos.limite) setFin(true);
        if (datos.vencida) sessionStorage.removeItem(CLAVE);
        setError(datos.error ?? "No pude responder. Probá de nuevo.");
        // Se devuelve el texto al campo para que no tenga que escribirlo de nuevo.
        if (!datos.limite) {
          setMensajes((m) => m.slice(0, -1));
          setTexto(limpio);
        }
        return;
      }

      setSesion(datos.sesion);
      setMensajes((m) => [...m, { de: "agente", texto: datos.mensaje }]);
      if (datos.nombre) setNombre(datos.nombre);
      if (datos.mostrarAgenda) setAgenda(true);
      if (datos.evento?.lead) trackMeta("Lead", { estado: datos.estado, ...origen.current });
      if (datos.evento?.contacto) trackMeta("ContactoSinCalificar", { estado: datos.estado, ...origen.current }, true);
      if (typeof datos.restantes === "number" && datos.restantes <= 0) setFin(true);
    } catch {
      setMensajes((m) => m.slice(0, -1));
      setTexto(limpio);
      setError("Se cortó la conexión. Probá de nuevo.");
    } finally {
      setEsperando(false);
      campo.current?.focus();
    }
  }

  return (
    <main className={styles.pantalla}>
      <header className={styles.cabecera}>
        <Image src="/logo-fw-white.png" alt="FW Labs" width={70} height={25} priority className={styles.logo} />
        <div className={styles.quien}>
          <p className={styles.nombre}>Fawel</p>
          <p className={styles.estado}>
            <span className={styles.punto} aria-hidden /> Agente de IA de FW Labs
          </p>
        </div>
      </header>

      <div ref={lista} className={styles.lista} aria-live="polite">
        <p className={styles.aviso}>Conversás con una IA. El diagnóstico es gratis.</p>
        {mensajes.map((m, i) => (
          <div key={i} className={m.de === "agente" ? styles.agente : styles.usuario}>
            {m.texto}
          </div>
        ))}
        {esperando && (
          <div className={`${styles.agente} ${styles.escribiendo}`} aria-label="Fawel está escribiendo">
            <span />
            <span />
            <span />
          </div>
        )}
        {agenda && (
          <a
            className={styles.agenda}
            href={urlAgenda(calendly, { nombre, origen: origen.current, fuente: "fawel-chat" })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              // Popup adentro de la página: así se ve la reserva (Schedule). El href queda de respaldo.
              e.preventDefault();
              trackMeta("AbreAgenda", { destino: "chat", ...origen.current }, true);
              abrirPopup(urlAgenda(calendly, { nombre, origen: origen.current, fuente: "fawel-chat" }));
            }}
          >
            <span className={styles.agendaTitulo}>Coordiná el diagnóstico gratis con Faustino</span>
            <span className={styles.agendaDetalle}>Elegí el día y la hora que te queden cómodos</span>
            <span className={styles.agendaFlecha} aria-hidden>
              →
            </span>
          </a>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <form
        className={styles.barra}
        onSubmit={(e) => {
          e.preventDefault();
          enviar();
        }}
      >
        <textarea
          ref={campo}
          className={styles.campo}
          value={texto}
          rows={1}
          maxLength={600}
          placeholder={fin ? "La conversación terminó" : "Escribí tu respuesta"}
          aria-label="Tu mensaje"
          disabled={fin}
          enterKeyHint="send"
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
        />
        <button className={styles.enviar} type="submit" disabled={!texto.trim() || esperando || fin} aria-label="Enviar">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M3 11.5 20.5 4l-7.5 17.5-2.2-7.8L3 11.5Z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </main>
  );
}
