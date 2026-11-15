"use client";

/**
 * Guarda de qué anuncio vino la visita (utm_* y v) cuando entra por cualquier página
 * que no sea /chat, para que /chat lo recupere aunque se llegue por un botón interno.
 * Sin esto, la variante A (anuncio → landing → chat) llega al chat sin etiqueta.
 * Vive en sessionStorage: dura lo que la pestaña. Si el navegador lo bloquea, no pasa nada.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const CLAVE_ORIGEN = "fw_origen_anuncio";
const CLAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "v"];

export default function OrigenAnuncio() {
  const ruta = usePathname();
  useEffect(() => {
    if (ruta?.startsWith("/chat")) return;
    const params = new URLSearchParams(window.location.search);
    const origen: Record<string, string> = {};
    for (const k of CLAVES) {
      const v = params.get(k);
      if (v) origen[k] = v.slice(0, 80);
    }
    if (!Object.keys(origen).length) return;
    origen.desde = ruta === "/" ? "home" : (ruta ?? "").slice(0, 80);
    try {
      sessionStorage.setItem(CLAVE_ORIGEN, JSON.stringify(origen));
    } catch {
      /* sin storage: el chat sigue sin etiqueta */
    }
  }, [ruta]);
  return null;
}
