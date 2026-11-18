"use client";

/**
 * Calendly dentro de la landing, para que el píxel vea la reserva.
 *
 * Con un link a calendly.com la persona se va del sitio y el píxel no sabe si
 * reservó. Embebido (inline en /agendar, popup en /chat), Calendly le avisa a
 * la página con postMessage y acá se escucha `calendly.event_scheduled`.
 *
 * Eventos del píxel (los dos destinos de la prueba de Meta los comparten):
 * - `AbreAgenda` (propio): se ve la agenda. En /agendar, al cargar; en /chat, al tocar el botón.
 * - `Schedule` (estándar): reserva confirmada. Una vez por pestaña.
 */
import { useEffect, type RefObject } from "react";

import { trackMeta } from "./meta-pixel";

const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const ESTILOS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyGlobal = {
  initPopupWidget: (o: { url: string }) => void;
  initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void;
};

function calendly(): CalendlyGlobal | undefined {
  return (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
}

/** Monta la agenda adentro de `elemento` (vacía lo que hubiera). False si el script no está. */
export function montarInline(elemento: HTMLElement, url: string): boolean {
  const c = calendly();
  if (!c) return false;
  elemento.replaceChildren();
  c.initInlineWidget({ url, parentElement: elemento });
  return true;
}

let carga: Promise<void> | null = null;

/** Carga el script (y la hoja de estilos del popup) una sola vez. */
export function cargarCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (carga) return carga;
  carga = new Promise<void>((ok, mal) => {
    if (!document.querySelector(`link[href="${ESTILOS}"]`)) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = ESTILOS;
      document.head.appendChild(css);
    }
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => ok();
    s.onerror = () => {
      carga = null;
      mal(new Error("calendly"));
    };
    document.body.appendChild(s);
  });
  return carga;
}

/** Abre el popup de Calendly. Si el script no cargó, abre el link en otra pestaña (ahí la reserva no se mide). */
export async function abrirPopup(url: string) {
  try {
    await cargarCalendly();
    const c = calendly();
    if (c) return c.initPopupWidget({ url });
  } catch {
    /* sin script: cae al link */
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Arma el link con lo que Calendly acepta: `name` para precargar el nombre y los
 * utm_* del anuncio, que quedan guardados en la reserva. `fuente` va de
 * utm_source si el anuncio no trajo uno; la variante (`v`) va en utm_content si no hay.
 */
export function urlAgenda(base: string, o: { nombre?: string | null; origen?: Record<string, string>; fuente: string }) {
  try {
    const url = new URL(base);
    if (o.nombre) url.searchParams.set("name", o.nombre);
    const origen = o.origen ?? {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      if (origen[k]) url.searchParams.set(k, origen[k]);
    }
    if (!origen.utm_source) url.searchParams.set("utm_source", o.fuente);
    if (!origen.utm_content && origen.v) url.searchParams.set("utm_content", `v-${origen.v}`);
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  } catch {
    return base;
  }
}

/** Escucha la reserva confirmada y manda `Schedule` una vez, con el destino y el origen del anuncio. */
export function useReservaCalendly(destino: "agendar" | "chat", origen: RefObject<Record<string, string>>) {
  useEffect(() => {
    let hecho = false;
    function escuchar(e: MessageEvent) {
      if (hecho || !/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      const evento = (e.data as { event?: unknown } | null)?.event;
      if (evento !== "calendly.event_scheduled") return;
      hecho = true;
      trackMeta("Schedule", { destino, ...origen.current });
    }
    window.addEventListener("message", escuchar);
    return () => window.removeEventListener("message", escuchar);
  }, [destino, origen]);
}
