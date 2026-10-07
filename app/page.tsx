import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, SiteHeader, SiteFooter } from "./components/corporate-chrome";
import { ContactForm } from "./components/contact-form";
import { clients, clientPath } from "./clientes/clients";
import styles from "./corporate.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const EMAIL = "faustino@fwlabsllc.com";
const steps = [
  ["Conocer la empresa", "Conversamos para entender a qué se dedica, cómo trabaja, qué sistemas usa, qué procesos tiene y qué personas participan."],
  ["Priorizar", "Ordenamos las oportunidades por impacto, dificultad y el cambio que implican para quienes trabajan ahí. La idea es empezar por algo que aporte valor sin forzar cambios que no tienen sentido."],
  ["Entender el proceso", "Para cada prioridad, reviso el proceso de punta a punta: cómo empieza, cómo termina, qué conocimiento requiere, qué herramientas se usan y dónde se pierde tiempo o información."],
  ["Construir", "Veo qué se puede integrar, automatizar o construir. Desarrollo la solución, comparto avances y resolvemos las dudas que aparezcan."],
  ["Probar e implementar", "La probamos primero en un alcance aislado. Si responde bien, la llevamos a producción y hacemos los ajustes necesarios."],
  ["Acompañar", "Después sigo cerca del uso real: resuelvo problemas y adaptamos el sistema a las personas que lo usan."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://fwlabsllc.com/#organization",
  name: "FW Labs",
  legalName: "FW Labs LLC",
  url: "https://fwlabsllc.com",
  email: EMAIL,
  logo: "https://fwlabsllc.com/logo-fw-original.png",
  founder: { "@type": "Person", name: "Faustino Watschinger" },
  description: "Software, integraciones, automatizaciones e inteligencia artificial para resolver problemas reales de las empresas.",
};

export default function Home() {
  return (
    <div className={styles.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader home />

      <main id="contenido">
        <section id="inicio" className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
          <p className={styles.eyebrow}>FW Labs / Soluciones tecnológicas</p>
          <h1 id="hero-title">Tecnología que<br /><span>resuelve problemas reales</span></h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroIntro}>
              <p>Software y automatizaciones a medida para que el trabajo sea más fácil.</p>
              <div className={styles.heroLinks}>
                <a href="#proyectos" className={styles.button}>Conocé nuestro trabajo <Arrow /></a>
                <a href="#contacto" className={styles.textLink}>Hablemos <Arrow /></a>
              </div>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.noteLine} aria-hidden="true" />
              <p>Cada desarrollo tiene que<br />responder a una necesidad real.</p>
              <span>Tu socio tecnológico, a largo plazo.<br />También para proyectos puntuales.</span>
            </div>
          </div>
          <div className={styles.capabilities} aria-label="Qué hacemos">
            <span>Software a medida</span><span>Integraciones</span><span>Automatización e IA</span><span>Desarrollo de productos</span>
          </div>
        </section>

        <section id="proyectos" className={`${styles.container} ${styles.projects}`} aria-labelledby="projects-title">
          <span id="caso" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / Relaciones de trabajo</p><h2 id="projects-title">Empresas con las<br />que trabajamos.</h2></div>
            <p>Algunas mejoras las proponen ellos y otras aparecen al trabajar juntos.</p>
          </div>
          <div className={styles.clientCards}>
            {clients.map((client) => <article className={styles.clientCard} key={client.slug}>
              <div className={styles.clientLogoStage}><Image className={styles.clientLogo} src={client.logo.src} alt={`Logo de ${client.name}`} width={client.logo.width} height={client.logo.height} sizes="(max-width: 740px) 75vw, 340px" /></div>
              <div className={styles.clientCardCopy}>
                <h3>{client.name}</h3><p className={styles.clientSector}>{client.sector}</p>
                <p className={styles.clientSummary}>{client.summary}</p>
                <Link className={styles.clientCardLink} href={clientPath(client)} aria-label={`Conocé el trabajo con ${client.name}`}>Conocé el trabajo <Arrow /></Link>
              </div>
            </article>)}
          </div>
        </section>

        <section id="forma-de-trabajar" className={styles.method} aria-labelledby="method-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>02 / Cómo trabajamos</p><h2 id="method-title">Primero, entender.<br />Después, construir.</h2></div>
              <p>Empezamos por entender la operación. Después, cada mejora se trabaja en conjunto hasta que sirve en el día a día.</p>
            </div>
            <ol className={styles.steps}>{steps.map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
            <p className={styles.methodClosing}>Las mejoras pueden surgir de la empresa o de mí. Las elegimos juntos, cuando tienen sentido.</p>
          </div>
        </section>

        <section id="faustino" className={`${styles.container} ${styles.founder}`} aria-labelledby="founder-title">
          <figure className={styles.founderPhoto}><Image src="/media/faustino-completa.webp" alt="Faustino en su escritorio, con el mate y las pantallas de trabajo detrás." width={1200} height={1600} sizes="(max-width: 740px) 100vw, 480px" /><figcaption>Faustino / detrás de FW Labs</figcaption></figure>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>03 / Quién está detrás</p>
            <h2 id="founder-title">Soy Faustino.<br />Fundador de FW Labs.</h2>
            <p>Desarrollo software y automatizaciones para empresas. Primero entiendo cómo trabajan, elegimos qué conviene resolver y sigo cerca después de implementar.</p>
            <p>Tengo 18 años y empecé a aprender programación a los 14, con la idea de algún día dedicarme a desarrollar software. Después de cuatro años de probar y aprender, hoy estoy trabajando en eso que quería.</p>
            <p>Lo que más me gusta de trabajar directamente con empresas es ver cómo una solución cambia su día a día: resolver algo que les complicaba el trabajo y ver a las personas usar lo que construí.</p>
            <p>De mi familia aprendí que la mejor forma de vender es entregar un buen producto, dar un buen servicio y cumplir lo prometido. Y del pueblo donde viví toda mi vida me quedó esa forma de relacionarme: conocer a quien está del otro lado y estar presente.</p>
            <div className={styles.founderSignature}><span>Faustino Watschinger</span><span>Founder / FW Labs</span></div>
          </div>
        </section>

        <section id="contacto" className={styles.contact} aria-labelledby="contact-title">
          <span id="agendar" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={`${styles.container} ${styles.contactInner}`}>
            <div><p className={styles.eyebrow}>04 / Contacto</p><h2 id="contact-title">Contame qué te<br />gustaría resolver.</h2><p>Si hay un proceso que te complica el trabajo o un problema que querés resolver con tecnología, podemos conversar. Contame qué pasa y cómo lo están resolviendo hoy.</p><p>La idea es trabajar juntos: entender la operación, elegir qué conviene mejorar y acompañar después de implementar.</p></div>
            <div className={styles.contactOptions}>
              <a className={styles.emailLink} href={`mailto:${EMAIL}`}>{EMAIL}<Arrow /></a>
              <p>O dejame tus datos y te respondo directamente.</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home />
    </div>
  );
}
