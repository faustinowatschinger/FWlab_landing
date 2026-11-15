"use client";

/**
 * Píxel de Meta de la landing.
 *
 * - `<MetaPixel />` carga el script (init + PageView) y manda un PageView más en
 *   cada navegación del lado del cliente (por ejemplo, de la home a /chat con un
 *   <Link>), que el snippet de Meta solo no ve.
 * - `trackMeta()` manda un evento desde cualquier componente de cliente. Si el
 *   script no cargó, no hace nada (en desarrollo lo muestra en la consola).
 *
 * Va montado una sola vez, en app/layout.tsx, para que mida la home y /chat. Si
 * se monta dos veces, next/script lo deduplica por el `id`, pero el PageView de
 * navegación se mandaría doble: no montarlo también en una página.
 *
 * El ID es público (va en el HTML de cualquier página con píxel), por eso tiene
 * default. Se pisa con NEXT_PUBLIC_META_PIXEL_ID, que se lee al hacer el build.
 */
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "2300484020732999";

type Fbq = (accion: "track" | "trackCustom", evento: string, datos?: Record<string, unknown>) => void;

/** Eventos estándar de Meta (track) o propios (trackCustom). */
export function trackMeta(evento: string, datos?: Record<string, unknown>, propio = false) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq(propio ? "trackCustom" : "track", evento, datos);
  else if (process.env.NODE_ENV !== "production") console.debug("[pixel sin cargar]", propio ? "trackCustom" : "track", evento, datos ?? "");
}

export default function MetaPixel() {
  const ruta = usePathname();
  const primera = useRef(true);

  useEffect(() => {
    // La primera vista la manda el snippet al cargar; las siguientes, acá.
    if (primera.current) {
      primera.current = false;
      return;
    }
    trackMeta("PageView");
  }, [ruta]);

  if (!/^\d{5,20}$/.test(PIXEL_ID)) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
