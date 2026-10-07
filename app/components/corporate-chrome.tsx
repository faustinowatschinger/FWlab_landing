import Image from "next/image";
import Link from "next/link";
import styles from "../corporate.module.css";
import { ArrowIcon } from "./icons";

export function Arrow() {
  return <ArrowIcon className={styles.arrowIcon} />;
}

export function BackArrow() {
  return <ArrowIcon direction="left" className={styles.arrowIcon} />;
}

function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <span className={styles.brandLogo}><Image src="/logo-fw-original.png" alt="FW Labs" width={500} height={500} sizes="156px" priority={priority} /></span>;
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <>
      <a className={styles.skipLink} href="#contenido">Ir al contenido</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href={home ? "#inicio" : "/"} aria-label="FW Labs — inicio"><BrandLogo priority /></Link>
          <nav aria-label="Navegación principal" className={styles.nav}>
            <Link href={`${prefix}#proyectos`}>Empresas</Link>
            <Link href={`${prefix}#forma-de-trabajar`}>Cómo trabajamos</Link>
            <Link href={`${prefix}#faustino`}>Quién está detrás</Link>
          </nav>
          <Link href={`${prefix}#contacto`} className={styles.headerContact}>Conversemos <Arrow /></Link>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ home = false }: { home?: boolean }) {
  return (
    <>
      <footer className={styles.footer}><div className={styles.container}><Link href={home ? "#inicio" : "/"} aria-label="FW Labs — volver al inicio"><BrandLogo /></Link><p>Software, criterio y personas.</p><span>FW Labs LLC · {new Date().getFullYear()}</span></div></footer>
      <div className={styles.reviewNote}>Propuesta de revisión · Pendiente de tu revisión y aprobación antes de publicar.</div>
    </>
  );
}

export function ImagePending({ title, detail, portrait = false }: { title: string; detail: string; portrait?: boolean }) {
  return (
    <div className={`${styles.imagePending} ${portrait ? styles.portrait : ""}`}>
      <span className={styles.photoCorner} aria-hidden="true" />
      <span className={styles.pendingOverline}>Material pendiente · versión de revisión</span>
      <div><p className={styles.pendingTitle}>{title}</p><p className={styles.pendingDetail}>{detail}</p></div>
      <span className={styles.imageIndex} aria-hidden="true">FW / {portrait ? "PERSONAS" : "TRABAJO"}</span>
    </div>
  );
}
