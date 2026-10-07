"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { StoryImage } from "../clientes/clients";
import styles from "../corporate.module.css";

export function PhotoCarousel({ images, label = "Fotos del trabajo con 3W", title = "El trabajo, en el lugar.", itemLabel = "Foto" }: { images: StoryImage[]; label?: string; title?: string; itemLabel?: "Foto" | "Captura" }) {
  const track = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [current, setCurrent] = useState(0);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const target = Math.max(0, Math.min(images.length - 1, index));
    element.scrollTo({ left: target * element.clientWidth, behavior: "instant" });
    setCurrent(target);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const target = event.key === "ArrowRight" ? current + 1 : event.key === "ArrowLeft" ? current - 1 : event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : null;
    if (target === null) return;
    event.preventDefault();
    goTo(target);
  }

  return (
    <section className={styles.photoCarousel} aria-label={label} aria-roledescription="carrusel">
      <div className={styles.carouselHeading}>
        <p>{title}</p>
        <div className={styles.carouselControls}>
          <button type="button" aria-label={`${itemLabel} anterior`} aria-controls={trackId} disabled={current === 0} onClick={() => goTo(current - 1)}><span aria-hidden="true">←</span></button>
          <span className={styles.carouselCounter} role="status" aria-live="polite">{itemLabel} {current + 1} de {images.length}</span>
          <button type="button" aria-label={`${itemLabel} siguiente`} aria-controls={trackId} disabled={current === images.length - 1} onClick={() => goTo(current + 1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div id={trackId} className={styles.carouselTrack} ref={track} tabIndex={0} role="group" aria-label="Galería de imágenes. Usá las flechas del teclado o deslizá para recorrerla." onKeyDown={handleKeys} onScroll={(event) => {
        const element = event.currentTarget;
        if (element.clientWidth > 0) setCurrent(Math.max(0, Math.min(images.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
      }}>
        {images.map((media, index) => <figure className={styles.carouselSlide} key={media.src} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${images.length}`}>
          <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar imagen: ${media.alt} (otra pestaña)`}><Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 740px) 100vw, 560px" /></a>
          <figcaption>{media.caption}<a href={media.src} target="_blank" rel="noopener noreferrer">Ver imagen completa <span aria-hidden="true">↗</span><span className={styles.srOnly}> (otra pestaña)</span></a></figcaption>
        </figure>)}
      </div>
    </section>
  );
}
