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

// Copy de la oferta de Fawel aprobada el 2026-11-13. Los dolores van en general, sin atribuirlos a un cliente.
const pains = [
  ["Se enfría", "La consulta que no se contesta rápido se enfría, y el interesado le escribe a otro."],
  ["De noche y el fin de semana", "La gente escribe cuando tiene tiempo de mirar, que casi nunca es en horario de oficina."],
  ["Publicidad sin respuesta", "Pagás anuncios para que te escriban, y esas consultas esperan a que alguien se libere."],
  ["Entre otras tareas", "El que atiende está haciendo otra cosa, y contesta cuando puede."],
  ["Curiosos", "Se va el tiempo del equipo en gente que nunca iba a avanzar."],
  ["Nadie sabe qué pasó", "El seguimiento depende de quién se acuerde, y cada uno contesta desde su WhatsApp."],
];

const features = [
  ["Contesta a cualquier hora", "Atiende las consultas que entran por tu WhatsApp oficial, de día, de noche y el fin de semana."],
  ["Sabe de tu negocio", "Aprende tus precios, horarios y respuestas. Si no tiene un dato, no lo inventa: se lo pasa a una persona."],
  ["Le pasa a tu equipo los que vienen en serio", "Cuando alguien muestra un interés concreto, avisa a tu equipo con un resumen de la conversación."],
  ["Vos seguís teniendo el control", "Un panel para ver qué pasó con cada consulta. Cualquier persona del equipo puede tomar la conversación cuando quiera."],
];

// Métricas medidas en el sistema de Altaterra, ventana 18-09 al 02-11-2026. Toda cifra nueva necesita fuente medida.
const proof = [
  ["224", "interesados atendidos en 45 días"],
  ["~1,5 min", "para la primera respuesta, a cualquier hora"],
  ["3 de cada 4", "de los que conversaron en serio llegaron al equipo calificados y con aviso"],
];

const steps = [
  ["Diagnóstico gratis", "Dos reuniones. En la primera, de 20 minutos, entiendo por dónde entran tus consultas, quién las contesta, a qué hora y qué te preguntan siempre. En la segunda te muestro lo que encontré. Te quedás con el informe aunque no sigamos."],
  ["Construcción", "Fawel aprende tu negocio (precios, horarios, respuestas) y se conecta a tu WhatsApp oficial y a tus datos."],
  ["Puesta en marcha", "Definimos a quién avisa y con qué resumen. Tu equipo sigue cada consulta en el panel y puede tomar cualquier conversación."],
  ["6 meses de acompañamiento", "Si necesitás un cambio en el sistema para usarlo mejor, se hace. Después sigue el mantenimiento."],
];

const fitYes = [
  "Cada consulta puede terminar en una operación de valor alto.",
  "Te entran al menos 10 a 15 consultas por día.",
  "Contestar a tiempo hoy depende de que alguien esté libre.",
];

const fitNo = [
  "Te llegan pocas consultas y las contestás bien.",
  "Buscás un bot que conteste cualquier cosa sin pasarle nunca a una persona.",
];

const faqs = [
  ["¿Cuánto cuesta?", "Depende de tu negocio: del volumen de consultas y de lo que tenga que hacer Fawel. Te paso el precio después del diagnóstico, que es gratis. El uso de la IA y de WhatsApp tiene un costo aparte, que se paga directo a cada proveedor; te lo estimo antes de empezar."],
  ["Ya probé una IA y contestaba mal. ¿Qué cambia?", "Fawel no inventa datos de tu negocio: lo que no sabe, se lo pasa a una persona. Y ves cada conversación en el panel, así que nada pasa sin que te enteres."],
  ["¿Mi equipo deja de atender?", "No. Fawel atiende primero y filtra. Tu equipo se queda con los que vienen en serio, con el resumen de lo que ya se habló, y puede entrar en cualquier conversación."],
  ["¿Qué pasa después de los 6 meses?", "Sigue el mantenimiento, con un abono mensual que incluye el servidor. Si en el camino aparece algo nuevo para resolver, lo vemos aparte."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fwlabsllc.com/#organization",
      name: "FW Labs",
      legalName: "FW Labs LLC",
      url: "https://fwlabsllc.com",
      email: EMAIL,
      logo: "https://fwlabsllc.com/logo-fw-original.png",
      founder: { "@type": "Person", name: "Faustino Watschinger" },
      description: "FW Labs hace Fawel: agentes de IA que atienden las consultas de un negocio por WhatsApp y le pasan al equipo los que vienen en serio.",
    },
    {
      "@type": "Service",
      "@id": "https://fwlabsllc.com/#fawel",
      name: "Fawel",
      serviceType: "Agente de IA de atención al cliente",
      provider: { "@id": "https://fwlabsllc.com/#organization" },
      description: "Ninguna consulta sin respuesta: Fawel atiende a tus clientes a cualquier hora y le pasa a tu equipo solo los que vienen en serio.",
      areaServed: "AR",
    },
  ],
};

export default function Home() {
  return (
    <div className={styles.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader home />

      <main id="contenido">
        <section id="inicio" className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
          <span id="fawel" className={styles.legacyAnchor} aria-hidden="true" />
          <p className={styles.eyebrow}>Fawel / Agentes de IA de atención al cliente</p>
          <h1 id="hero-title">Ninguna consulta<br /><span>sin respuesta.</span></h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroIntro}>
              <p>Fawel atiende a tus clientes por WhatsApp a cualquier hora y le pasa a tu equipo solo los que vienen en serio.</p>
              <div className={styles.heroLinks}>
                <a href="#contacto" className={styles.button}>Pedí el diagnóstico gratis <Arrow /></a>
                <a href="#prueba" className={styles.textLink}>Mirá cómo funciona en Altaterra <Arrow /></a>
              </div>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.noteLine} aria-hidden="true" />
              <p>Para negocios de ticket alto, donde cada consulta cuenta.</p>
              <span>Con al menos 10 a 15 consultas por día.<br />Hecho a medida por FW Labs.</span>
            </div>
          </div>
          <div className={styles.capabilities} aria-label="Qué hace Fawel">
            <span>Contesta a cualquier hora</span><span>Aprende tu negocio</span><span>Deriva con aviso y resumen</span><span>Tu equipo toma la conversación</span>
          </div>
        </section>

        <section id="problema" className={`${styles.container} ${styles.pains}`} aria-labelledby="pains-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / El problema</p><h2 id="pains-title">Las consultas llegan.<br />Contestarlas a tiempo es otra cosa.</h2></div>
            <p>Si alguna de estas te suena, estás perdiendo consultas que ya pagaste.</p>
          </div>
          <ul className={styles.painList}>
            {pains.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </section>

        <section id="que-hace" className={styles.method} aria-labelledby="features-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>02 / Qué hace Fawel</p><h2 id="features-title">Contesta, entiende<br />y le pasa a tu equipo.</h2></div>
              <p>Un agente de IA hecho para tu negocio, no un bot genérico.</p>
            </div>
            <ol className={`${styles.steps} ${styles.stepsFour}`}>{features.map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
          </div>
        </section>

        <section id="prueba" className={`${styles.container} ${styles.projects}`} aria-labelledby="proof-title">
          <span id="proyectos" className={styles.legacyAnchor} aria-hidden="true" />
          <span id="caso" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>03 / Funcionando</p><h2 id="proof-title">Lo que pasó<br />en Altaterra.</h2></div>
            <p>Altaterra vende lotes en el Alto Valle. Fawel atiende las consultas que le llegan por WhatsApp desde sus anuncios.</p>
          </div>
          <dl className={styles.proofStats}>
            {proof.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className={styles.proofNote}>Medido en el sistema de Altaterra entre el 18 de septiembre y el 2 de noviembre de 2026.</p>
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

        <section id="como-funciona" className={styles.method} aria-labelledby="method-title">
          <span id="forma-de-trabajar" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>04 / Cómo funciona</p><h2 id="method-title">Primero, entender<br />tus consultas.</h2></div>
              <p>Un solo servicio, con el precio según tu negocio. Te lo paso después del diagnóstico.</p>
            </div>
            <ol className={`${styles.steps} ${styles.stepsFour}`}>{steps.map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
          </div>
        </section>

        <section id="para-quien" className={`${styles.container} ${styles.fit}`} aria-labelledby="fit-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>05 / Para quién es</p><h2 id="fit-title">No es para<br />cualquier negocio.</h2></div>
            <p>Si no te sirve, te lo digo en el diagnóstico.</p>
          </div>
          <div className={styles.fitGrid}>
            <div><h3>Es para vos si</h3><ul>{fitYes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className={styles.fitNo}><h3>No es para vos si</h3><ul>{fitNo.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>

        <section id="preguntas" className={`${styles.container} ${styles.faq}`} aria-labelledby="faq-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>06 / Preguntas</p><h2 id="faq-title">Lo que suelen<br />preguntarme.</h2></div>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section id="faustino" className={`${styles.container} ${styles.founder}`} aria-labelledby="founder-title">
          <figure className={styles.founderPhoto}><Image src="/media/faustino-completa.webp" alt="Faustino en su escritorio, con el mate y las pantallas de trabajo detrás." width={1200} height={1600} sizes="(max-width: 740px) 100vw, 480px" /><figcaption>Faustino / detrás de FW Labs</figcaption></figure>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>07 / Quién está detrás</p>
            <h2 id="founder-title">Soy Faustino.<br />Fundador de FW Labs.</h2>
            <p>Hago Fawel desde FW Labs. Entiendo cómo atiende tu negocio, lo construyo y sigo cerca después de ponerlo en marcha.</p>
            <p>Tengo 18 años y empecé a programar a los 14. Antes de Fawel desarrollé 3W Control, la app con la que 3W sigue sus plantas frigoríficas desde el teléfono. No es Fawel, pero muestra que lo que construyo funciona en el día a día de una operación real.</p>
            <p>De mi familia aprendí que la mejor forma de crecer es entregar un buen producto, dar un buen servicio y cumplir lo prometido. Y del pueblo donde viví toda mi vida me quedó esa forma de relacionarme: conocer a quien está del otro lado y estar presente.</p>
            <div className={styles.founderSignature}><span>Faustino Watschinger</span><span>Founder / FW Labs</span></div>
          </div>
        </section>

        <section id="contacto" className={styles.contact} aria-labelledby="contact-title">
          <span id="agendar" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={`${styles.container} ${styles.contactInner}`}>
            <div><p className={styles.eyebrow}>08 / Diagnóstico gratis</p><h2 id="contact-title">Contame cómo<br />atienden hoy.</h2><p>Decime qué negocio tenés, cuántas consultas te llegan por día y quién las contesta. Te respondo yo.</p><p>El diagnóstico son dos reuniones; la primera dura 20 minutos. Te quedás con el informe aunque no sigamos.</p></div>
            <div className={styles.contactOptions}>
              <a className={styles.emailLink} href={`mailto:${EMAIL}`}>{EMAIL}<Arrow /></a>
              <p>O dejame tus datos y te escribo.</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home />
    </div>
  );
}
