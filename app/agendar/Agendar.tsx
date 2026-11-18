"use client";

/**
 * /agendar: la agenda de Faustino sin pasar por el chat (variante A de la prueba
 * de Meta, `/agendar?v=A`). El Calendly va embebido para que el píxel vea la
 * reserva; el filtro de esta variante son las preguntas del formulario de Calendly.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./agendar.module.css";
import { cargarCalendly, montarInline, urlAgenda, useReservaCalendly } from "../components/calendly";
import { trackMeta } from "../components/meta-pixel";

const CLAVES_ORIGEN = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "v"];

function origenDeLaUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const salida: Record<string, string> = {};
  for (const k of CLAVES_ORIGEN) {
    const v = params.get(k);
    if (v) salida[k] = v.slice(0, 80);
  }
  return salida;
}

export default function Agendar({ calendly }: { calendly: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const origen = useRef<Record<string, string>>({});
  // Link de respaldo si el script de Calendly no carga (ahí la reserva no se mide).
  const [respaldo, setRespaldo] = useState<string | null>(null);

  useReservaCalendly("agendar", origen);

  useEffect(() => {
    origen.current = origenDeLaUrl();
    trackMeta("AbreAgenda", { destino: "agendar", ...origen.current }, true);
    const url = urlAgenda(calendly, { origen: origen.current, fuente: "fawel-agendar" });
    const destino = caja.current;
    cargarCalendly()
      .then(() => {
        if (destino && !montarInline(destino, url)) setRespaldo(url);
      })
      .catch(() => setRespaldo(url));
  }, [calendly]);

  return (
    <main className={styles.pantalla}>
      <header className={styles.cabecera}>
        <Image src="/logo-fw-white.png" alt="FW Labs" width={70} height={25} priority className={styles.logo} />
        <p className={styles.marca}>Fawel</p>
      </header>

      <section className={styles.intro}>
        <h1 className={styles.titulo}>Elegí un horario para el diagnóstico gratis</h1>
        <p className={styles.bajada}>
          Es una llamada con Faustino para entender cómo te entran las consultas. Antes te hace unas preguntas cortas de tu
          negocio, para ver si encaja con lo que toma.
        </p>
      </section>

      {/* Se monta con initInlineWidget, no con la clase calendly-inline-widget: así anda también si se vuelve a la página. */}
      <div ref={caja} className={styles.agenda} />

      {respaldo && (
        <p className={styles.fallo}>
          No se pudo cargar la agenda.{" "}
          <a href={respaldo} target="_blank" rel="noopener noreferrer">
            Abrila acá
          </a>
          .
        </p>
      )}
    </main>
  );
}
