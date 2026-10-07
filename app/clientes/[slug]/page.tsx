import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, BackArrow, ImagePending, SiteFooter, SiteHeader } from "../../components/corporate-chrome";
import { MediaViewer } from "../../components/media-viewer";
import { PhotoCarousel } from "../../components/photo-carousel";
import styles from "../../corporate.module.css";
import { clients, clientPath, type StoryImage } from "../clients";

function StoryGallery({ images }: { images: StoryImage[] }) {
  return <div className={`${styles.storyGallery} ${images.length > 1 ? styles.galleryMany : ""}`} style={images.length > 1 ? { gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` } : undefined}>{images.map((media) => <figure key={media.src}>
    <MediaViewer media={media} />
    <figcaption>{media.caption}<a href={media.src} target="_blank" rel="noopener noreferrer">Abrir archivo completo <Arrow /><span className={styles.srOnly}> (otra pestaña)</span></a></figcaption>
  </figure>)}</div>;
}

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return clients.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = clients.find((entry) => entry.slug === slug);
  if (!client) notFound();
  return {
    title: `Nuestro trabajo con ${client.name}`,
    description: client.description,
    alternates: { canonical: clientPath(client) },
    openGraph: { title: `Nuestro trabajo con ${client.name} | FW Labs`, description: client.description, url: clientPath(client) },
    twitter: { title: `Nuestro trabajo con ${client.name} | FW Labs`, description: client.description },
  };
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const client = clients.find((entry) => entry.slug === slug);
  if (!client) notFound();
  return (
    <div className={styles.site}>
      <SiteHeader />
      <main id="contenido">
        <section className={`${styles.container} ${styles.clientIntro}`} aria-labelledby="client-title">
          <Link href="/#proyectos" className={styles.backLink}><BackArrow />Volver a las empresas</Link>
          <p className={styles.eyebrow}>{client.name} / {client.sector}</p>
          <h1 id="client-title">{client.headline.split("\n").map((line, i) => <span key={line}>{i > 0 ? <br /> : null}{line}</span>)}</h1>
          <p className={styles.clientLead}>{client.context}</p>
          <nav className={styles.clientWorkLinks} aria-label={`Ir a los trabajos de ${client.name}`}>
            <span>Ver trabajos</span>
            <div>{client.works.map((work, index) => <a href={`#work-${index}`} key={work.title}>{work.title} <Arrow /></a>)}</div>
          </nav>
        </section>

        <section className={`${styles.container} ${styles.clientWorks}`} aria-labelledby="works-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Nuestro trabajo con {client.name}</p><h2 id="works-title">{client.works.length > 1 ? "Distintas soluciones.\nUn mismo contexto.".split("\n").map((line, i) => <span key={line}>{i > 0 ? <br /> : null}{line}</span>) : "El trabajo realizado."}</h2></div><p>Cada trabajo tiene su propio alcance y estado.</p></div>
          {client.works.map((work, index) => (
            <article id={`work-${index}`} className={`${styles.clientWork} ${!work.carousel && (work.images?.length ?? 0) > 1 ? styles.workMany : ""}`} key={work.title} aria-labelledby={`work-title-${index}`}>
              <div className={styles.workText}>
                <div className={styles.projectTopline}><span>{work.category}</span><span className={styles.status}>{work.status}</span></div>
                <h3 id={`work-title-${index}`}>{work.title}</h3>
                <dl>
                  <div><dt>La necesidad</dt><dd>{work.need}</dd></div>
                  <div><dt>La solución</dt><dd>{work.solution}</dd></div>
                  <div><dt>Estado actual</dt><dd>{work.state}</dd></div>
                </dl>
              </div>
              <div className={styles.workVisual}>{work.images ? work.carousel ? <PhotoCarousel images={work.images} label={`Capturas de ${work.title}`} title={`${work.title}, en pantalla.`} itemLabel="Captura" /> : <StoryGallery images={work.images} /> : <ImagePending title={work.imageTitle} detail={work.imageDetail} />}{work.imagePending ? <p className={styles.editorialPending}>{work.imagePending}</p> : null}</div>
            </article>
          ))}
          {client.note ? <p className={styles.clientNote}>{client.note}</p> : null}
        </section>

        <section className={`${styles.container} ${styles.clientHistory}`} aria-labelledby={`relationship-${client.slug}`}>
          <div className={client.photos ? styles.clientStory : styles.clientHistoryCopy}>
            <div className={styles.clientHistoryCopy}>
              <p className={styles.eyebrow}>Cómo empezó</p>
              <h2 id={`relationship-${client.slug}`}>La relación de trabajo.</h2>
              {client.relationship.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {client.photos ? <PhotoCarousel images={client.photos} /> : null}
          </div>
        </section>
        <section className={styles.clientNext} aria-labelledby="next-title"><div className={styles.container}><div><p className={styles.eyebrow}>Sigamos conversando</p><h2 id="next-title">¿Qué necesita tu empresa?</h2></div><Link className={styles.button} href="/#contacto">Contame en qué estás trabajando <Arrow /></Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
