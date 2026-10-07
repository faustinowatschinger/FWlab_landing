"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { StoryImage } from "../clientes/clients";
import styles from "../corporate.module.css";

export function MediaViewer({ media }: { media: StoryImage }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function close() {
    dialog.current?.close();
    setOpen(false);
  }

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href], [tabindex='0']"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return <>
    <button type="button" className={styles.mediaViewerTrigger} onClick={show} aria-haspopup="dialog" aria-label={`Ampliar captura: ${media.alt}`}>
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 740px) 100vw, 580px" />
      <span className={styles.mediaViewerPrompt} aria-hidden="true">Ampliar ↗</span>
    </button>
    <dialog ref={dialog} className={styles.mediaDialog} aria-labelledby={titleId} onClose={() => setOpen(false)} onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={trapFocus} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.mediaDialogInner}>
        <div className={styles.mediaDialogTop}><p id={titleId}>Captura ampliada</p><button type="button" onClick={close} autoFocus={open}>Cerrar <span aria-hidden="true">×</span></button></div>
        <div className={styles.mediaDialogCanvas} tabIndex={0} aria-label="Captura ampliada. En móvil, deslizá horizontalmente para recorrerla."><Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 740px) 1100px, 1200px" /></div>
        <a href={media.src} target="_blank" rel="noopener noreferrer">Abrir archivo completo <span aria-hidden="true">↗</span><span className={styles.srOnly}> (otra pestaña)</span></a>
      </div>
    </dialog>
  </>;
}
