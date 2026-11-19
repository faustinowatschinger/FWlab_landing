import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, SiteHeader, SiteFooter } from "./components/corporate-chrome";
import { ContactForm } from "./components/contact-form";
import { MediaViewer } from "./components/media-viewer";
import { clients, clientPath } from "./clientes/clients";
import styles from "./corporate.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const EMAIL = "faustino@fwlabsllc.com";
const CHAT_HREF = "/chat";
const CTA_LABEL = "Hablá con Fawel";

// Recorrido de venta (2026-11-15): dolor → costo de no hacer nada → mecanismo → prueba →
// autoeficacia → encaje → autoridad → oferta → objeciones → una sola acción.
// Toda afirmación de la página tiene fuente documentada; no agregar cifras sin medición.

// Dolores: dichos en general, sin atribuirlos a un cliente.
const pains = [
  ["Te escriben de noche", "La gente consulta cuando tiene tiempo de mirar: a la noche y el fin de semana. La respuesta sale el lunes, cuando ya le escribió a otro."],
  ["Pagás para que te escriban", "Los anuncios traen consultas. Después esas consultas esperan a que alguien del equipo se libere."],
  ["Se contesta entre otras cosas", "El que atiende está haciendo otra cosa. Contesta cuando puede, y para entonces la consulta se enfrió."],
  ["Curiosos que se llevan la tarde", "El tiempo del equipo se va en gente que nunca iba a avanzar, mientras el que venía en serio espera."],
  ["Cada uno en su teléfono", "Las consultas llegan por WhatsApp, Instagram y la web, se reparten a mano, cada uno contesta desde su teléfono y el seguimiento depende de quién se acuerde."],
  ["El mes no cierra", "Preguntás cuántas consultas entraron y qué pasó con cada una, y la respuesta es una sensación, no un dato."],
];

// Qué hace.
const features = [
  ["Contesta a cualquier hora", "Atiende las consultas que entran por WhatsApp, Instagram o tu web, de día, de noche y el fin de semana, sin esperar a que alguien se libere."],
  ["Sabe de tu negocio, y no inventa", "Aprende tus precios, horarios y respuestas. Si no tiene un dato, no lo inventa: se lo pasa a una persona."],
  ["Le pasa a tu equipo los que vienen en serio", "Cuando alguien muestra un interés concreto, avisa con un resumen de lo que ya se habló. Tu equipo arranca sabiendo qué quiere."],
  ["Vos ves qué pasó con cada una", "Un panel con cada conversación de punta a punta. Cualquiera del equipo puede tomarla cuando quiera."],
];

// Métricas medidas en el sistema de Altaterra, ventana 18-09 al 02-11-2026.
// Toda cifra nueva necesita fuente medida.
const proof = [
  ["224", "interesados atendidos en 45 días"],
  ["~1,5 min", "para la primera respuesta, a cualquier hora"],
  ["3 de cada 4", "de los que conversaron en serio llegaron al equipo calificados y con aviso"],
];

// Lo que el dueño teme tener que hacer.
const relief = [
  ["Saber de tecnología", "Lo armo yo con lo que vos ya sabés de tu negocio: tus precios, tus horarios y lo que te preguntan siempre."],
  ["Cambiar cómo trabaja tu equipo", "Fawel se conecta al CRM que ya usás, sin migrar nada. A tu equipo le llega un aviso con el resumen de cada conversación, y lo toma desde ahí."],
  ["Arriesgar tu número", "Tu número, tus conversaciones y tus datos son tuyos. Nada se cambia sin que lo apruebes, y si un día te querés ir, te vas con todo."],
];

const steps = [
  ["Diagnóstico gratis", "Dos reuniones. En la primera, de 20 minutos, entiendo por dónde entran tus consultas, quién las contesta, a qué hora y qué te preguntan siempre. En la segunda te muestro lo que encontré. Te quedás con el informe aunque no sigamos."],
  ["Construcción", "Fawel aprende tu negocio (precios, horarios, respuestas) y se conecta a tus canales (WhatsApp, Instagram, tu web), al CRM que ya usás y a tus datos."],
  ["Prueba y puesta en marcha", "Antes de que le hable a un cliente, lo probás con conversaciones reales de tu negocio y lo aprobás. Capacito a tu equipo y le dejo la documentación y un video de cómo funciona."],
  ["6 meses de acompañamiento", "Cualquier cambio en el sistema para usarlo mejor, se hace. Cada mes te llega un informe de cómo atendió. Después sigue el mantenimiento, con el primer mes gratis."],
];

// La garantía y la salida: aprobación previa y sin permanencia.
const guarantee = {
  title: "Hasta que no responda como ustedes, no pagás.",
  text: "Antes de salir en vivo, Fawel se prueba con conversaciones reales de tu negocio y vos lo aprobás. Hasta que no responda como ustedes, no pagás el segundo pago ni el mantenimiento.",
  exit: "Y sin permanencia: tu número, tus conversaciones y tus datos son tuyos. Si te querés ir, avisás con 30 días y te vas con todo.",
};

const fitYes = [
  "Vivís de contestar consultas: inmobiliaria, clínica, academia, infoproducto o el rubro que sea.",
  "Cada consulta puede terminar en una operación de valor alto.",
  "Te entran al menos 10 a 15 consultas por día.",
  "Contestar a tiempo hoy depende de que alguien esté libre.",
  "Querés saber qué pasó con cada consulta sin tener que preguntarle a nadie.",
];

const fitNo = [
  "Te llegan pocas consultas y las contestás bien.",
  "Buscás un bot que conteste cualquier cosa sin pasarle nunca a una persona.",
];

// Objeciones frecuentes, en el orden en que pesan para este servicio.
const faqs = [
  ["Ya probé un bot y contestaba cualquier cosa.", "Fawel no inventa datos de tu negocio: si no sabe si una propiedad sigue disponible, se lo pasa a una persona. Y no sale en vivo hasta que lo apruebes con conversaciones reales tuyas. Hasta que no responda como ustedes, no pagás el segundo pago ni el mantenimiento."],
  ["Se va a notar que es un robot.", "Aprende cómo hablan ustedes y lo probás antes de que hable con nadie: si no suena a tu negocio, no sale. Y si alguien prefiere hablar con una persona, le avisa a tu equipo al momento, con el resumen de lo que ya se habló."],
  ["¿Voy a perder mi número de WhatsApp?", "No. El número es tuyo, y las conversaciones y los datos también. Nada se cambia sin que lo apruebes."],
  ["Ya tengo un CRM.", "Mejor. Fawel se conecta al que ya usás, así las consultas quedan donde tu equipo ya trabaja, sin migrar nada. En el diagnóstico vemos cómo se conecta el tuyo."],
  ["Lo manejamos bien así.", "Puede ser. La prueba es simple: si hoy podés decir cuántas consultas entraron el mes pasado y qué pasó con cada una, quizás no lo necesitás. Si no podés, ahí está lo que se te escapa."],
  ["Mi negocio es muy particular.", "Por eso no te traigo nada armado. Primero miro cómo trabajás vos, y Fawel aprende tus respuestas, no unas genéricas. Y no sale en vivo hasta que responda como ustedes."],
  ["¿Tenés algún caso en mi rubro?", "El caso que puedo mostrar es Altaterra, que vende lotes. Si tu negocio es otro, en el diagnóstico te digo si aplica y por qué. No te voy a inventar un caso."],
  ["¿Mi equipo deja de atender?", "No. Fawel atiende primero y filtra. Tu equipo se queda con los que vienen en serio, con el resumen de lo que ya se habló, y puede entrar en cualquier conversación."],
  ["Mi equipo no va a usar otro sistema.", "No tiene que aprender uno: le llega un aviso con el resumen y toma la conversación desde ahí. Igual los capacito, les dejo documentación y un video, y durante seis meses me piden a mí lo que necesiten."],
  ["¿Cómo sé si me está rindiendo?", "Cada mes, durante los seis meses de acompañamiento, te llega un informe: cuántas consultas atendió, a qué hora, cuántas le pasó a tu equipo y en cuánto tiempo respondió. Más ventas no te prometo, porque sería inventar un número."],
  ["¿Y si me quiero ir?", "Te vas. No hay permanencia: avisás con 30 días y te llevás tu número, tus conversaciones y tus datos."],
  ["¿Cuánto cuesta?", "Depende de tu negocio: del volumen de consultas y de lo que tenga que hacer Fawel. Te paso el precio después del diagnóstico, que es gratis. Se paga la mitad al empezar y la otra mitad cuando aprobás cómo responde. El uso de la IA y de plataformas como WhatsApp tiene un costo aparte, que se paga directo a cada proveedor; te lo estimo antes de empezar."],
];

const altaterra = clients.find((client) => client.slug === "altaterra");
const altaterraImages = altaterra?.works[0]?.images ?? [];
const threeW = clients.find((client) => client.slug === "3w");

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
      description: "FW Labs hace Fawel: agentes de IA que atienden las consultas de un negocio por WhatsApp, Instagram o la web, y le pasan al equipo los que vienen en serio.",
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

function ChatButton({ light = false }: { light?: boolean }) {
  return <Link href={CHAT_HREF} className={`${styles.button} ${light ? styles.buttonLight : ""}`}>{CTA_LABEL} <Arrow /></Link>;
}

export default function Home() {
  return (
    <div className={styles.site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader home />

      <main id="contenido">
        {/* Promesa y la acción. El dolor de control va en la nota. */}
        <section id="inicio" className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
          <span id="fawel" className={styles.legacyAnchor} aria-hidden="true" />
          <p className={styles.eyebrow}>Fawel / Para negocios de ticket alto con al menos 10 a 15 consultas por día</p>
          <h1 id="hero-title">Ninguna consulta<br /><span>sin respuesta.</span></h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroIntro}>
              <p>Fawel atiende a tus clientes por donde te escriban, WhatsApp, Instagram o tu web, a cualquier hora, y le pasa a tu equipo solo los que vienen en serio. Y vos ves qué pasó con cada consulta.</p>
              <div className={styles.heroLinks}>
                <ChatButton />
                <a href="#prueba" className={styles.textLink}>Mirá lo que pasó en Altaterra <Arrow /></a>
              </div>
              <p className={styles.heroMicro}>Probalo vos: contale cómo atienden hoy y en unos minutos sabés si te sirve.</p>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.noteLine} aria-hidden="true" />
              <p>Con 15 consultas por día te entran unas 450 por mes.</p>
              <span>¿Podés decir qué pasó con cada una?</span>
            </div>
          </div>
          <div className={styles.capabilities} aria-label="Qué hace Fawel">
            <span>Contesta a cualquier hora</span><span>Aprende tu negocio</span><span>Deriva con aviso y resumen</span><span>Vos ves cada conversación</span>
          </div>
        </section>

        {/* 1. Dolor: que se reconozca en una escena. */}
        <section id="problema" className={`${styles.container} ${styles.pains}`} aria-labelledby="pains-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / El problema</p><h2 id="pains-title">Las consultas entran.<br />Lo que pasa después, nadie lo sabe.</h2></div>
            <p>Si te reconocés en alguna, hay consultas que ya pagaste y se te están yendo.</p>
          </div>
          <ul className={styles.painList}>
            {pains.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </section>

        {/* 2. Costo de no hacer nada y la oportunidad: no es culpa suya. */}
        <section id="costo" className={styles.cost} aria-labelledby="cost-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>02 / Si no cambia nada</p><h2 id="cost-title">Seguir así<br />también tiene un costo.</h2></div>
            </div>
            <div className={styles.costGrid}>
              <p><strong>Son muchas consultas.</strong> Con 10 a 15 por día te entran entre 300 y 450 por mes. En un negocio donde cada una puede ser una operación grande, no hace falta perder muchas para que se note.</p>
              <p><strong>Sumar gente no lo cubre.</strong> Otra persona contestando ayuda en horario de oficina. Las consultas de la noche y del fin de semana siguen esperando, y el seguimiento sigue dependiendo de que alguien se acuerde.</p>
              <p><strong>Lo que no se registra se repite.</strong> Si no sabés qué consulta se perdió ni por qué, no lo podés corregir. El mes que viene se pierde de la misma forma.</p>
            </div>
            <p className={styles.costBridge}>No es falta de ganas ni de gente. Es que la atención depende de que alguien esté libre. <span>Eso tiene arreglo.</span></p>
          </div>
        </section>

        {/* 3. Mecanismo. */}
        <section id="que-hace" className={styles.method} aria-labelledby="features-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>03 / Cómo lo resuelve Fawel</p><h2 id="features-title">Contesta, filtra<br />y te deja todo a la vista.</h2></div>
              <p>Un agente de IA armado para tu negocio. No reemplaza a tu equipo: le saca lo repetitivo y le pasa los que valen la pena.</p>
            </div>
            <ol className={`${styles.steps} ${styles.stepsFour}`}>{features.map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
          </div>
        </section>

        {/* 4. Prueba: se muestra, no se afirma. */}
        <section id="prueba" className={`${styles.container} ${styles.projects}`} aria-labelledby="proof-title">
          <span id="proyectos" className={styles.legacyAnchor} aria-hidden="true" />
          <span id="caso" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>04 / Funcionando</p><h2 id="proof-title">Lo que pasó<br />en Altaterra.</h2></div>
            <p>Altaterra vende lotes en el Alto Valle. Fawel atiende las consultas que le llegan por WhatsApp, y en esos 45 días casi todas venían de sus anuncios de Meta.</p>
          </div>
          <dl className={styles.proofStats}>
            {proof.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className={styles.proofNote}>Medido en el sistema de Altaterra entre el 18 de septiembre y el 2 de noviembre de 2026.</p>
          {altaterraImages.length > 0 && <div className={styles.proofMedia}>
            {altaterraImages.map((image) => <figure key={image.src}><MediaViewer media={image} /><figcaption>{image.caption}</figcaption></figure>)}
          </div>}
          {altaterra && <Link className={styles.proofLink} href={clientPath(altaterra)}>Ver el caso completo de Altaterra <Arrow /></Link>}
        </section>

        {/* 5. Autoeficacia: lo que no tiene que hacer. */}
        <section id="sin-cambiar" className={`${styles.container} ${styles.relief}`} aria-labelledby="relief-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>05 / Lo que no tenés que hacer</p><h2 id="relief-title">No tenés que cambiar<br />cómo trabajás.</h2></div>
          </div>
          <ul className={`${styles.painList} ${styles.reliefList}`}>
            {relief.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </section>

        {/* 6. Encaje. */}
        <section id="para-quien" className={`${styles.container} ${styles.fit}`} aria-labelledby="fit-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>06 / Para quién es</p><h2 id="fit-title">No es para<br />cualquier negocio.</h2></div>
            <p>Si no te sirve, te lo digo en el diagnóstico.</p>
          </div>
          <div className={styles.fitGrid}>
            <div><h3>Es para vos si</h3><ul>{fitYes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className={styles.fitNo}><h3>No es para vos si</h3><ul>{fitNo.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </section>

        {/* 7. Autoridad: recién ahora, quién está detrás. */}
        <section id="faustino" className={`${styles.container} ${styles.founder}`} aria-labelledby="founder-title">
          <figure className={styles.founderPhoto}><Image src="/media/faustino-completa.webp" alt="Faustino en su escritorio, con el mate y las pantallas de trabajo detrás." width={1200} height={1600} sizes="(max-width: 740px) 100vw, 480px" /><figcaption>Faustino / detrás de FW Labs</figcaption></figure>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>07 / Quién está detrás</p>
            <h2 id="founder-title">Soy Faustino.<br />Lo armo yo y sigo cerca.</h2>
            <p>Hago Fawel desde FW Labs. Entiendo cómo atiende tu negocio, lo construyo y lo acompaño seis meses después de ponerlo en marcha. Si algo hay que ajustar, me lo pedís a mí.</p>
            <p>Tengo 18 años y empecé a programar a los 14. Antes de Fawel desarrollé 3W Control, la app con la que 3W sigue sus plantas frigoríficas desde el teléfono. No es Fawel, pero muestra que lo que construyo funciona en una operación real.</p>
            <p>De mi familia aprendí que la mejor forma de crecer es entregar un buen producto, dar un buen servicio y cumplir lo prometido. Y del pueblo donde viví toda mi vida me quedó esa forma de relacionarme: conocer a quien está del otro lado y estar presente.</p>
            {threeW && <Link className={styles.proofLink} href={clientPath(threeW)}>Ver el trabajo con 3W <Arrow /></Link>}
            <div className={styles.founderSignature}><span>Faustino Watschinger</span><span>Founder / FW Labs</span></div>
          </div>
        </section>

        {/* 8. Oferta: cómo se empieza, con el riesgo invertido. */}
        <section id="como-funciona" className={styles.method} aria-labelledby="method-title">
          <span id="forma-de-trabajar" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>08 / Cómo se empieza</p><h2 id="method-title">Primero entiendo<br />cómo atienden hoy.</h2></div>
              <p>Un solo servicio, armado para tu negocio. El primer paso es gratis y te quedás con el informe aunque no sigamos.</p>
            </div>
            <ol className={`${styles.steps} ${styles.stepsFour}`}>{steps.map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
            <aside id="garantia" className={styles.guarantee} aria-labelledby="guarantee-title">
              <p className={styles.eyebrow}>La garantía</p>
              <h3 id="guarantee-title">{guarantee.title}</h3>
              <p>{guarantee.text}</p>
              <p className={styles.guaranteeExit}>{guarantee.exit}</p>
            </aside>
            <div className={styles.sectionCta}><ChatButton /></div>
          </div>
        </section>

        {/* 9. Objeciones. */}
        <section id="preguntas" className={`${styles.container} ${styles.faq}`} aria-labelledby="faq-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>09 / Preguntas</p><h2 id="faq-title">Lo que suelen<br />decirme.</h2></div>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>

        {/* 10. Una sola acción. El formulario queda como salida para el que no quiere hablar con un agente. */}
        <section id="contacto" className={styles.contact} aria-labelledby="contact-title">
          <span id="agendar" className={styles.legacyAnchor} aria-hidden="true" />
          <div className={`${styles.container} ${styles.contactInner}`}>
            <div>
              <p className={styles.eyebrow}>10 / Empezá acá</p>
              <h2 id="contact-title">Contale tu negocio<br />a Fawel.</h2>
              <p>Te pregunta cuántas consultas te entran, por dónde llegan y quién las contesta hoy. Si Fawel tiene sentido para tu negocio, coordinás el diagnóstico gratis con Faustino.</p>
              <p>Atiende a cualquier hora, como atendería a tus clientes.</p>
            </div>
            <div className={styles.contactOptions}>
              <ChatButton light />
              <details className={styles.contactAlt}>
                <summary>¿Preferís escribirme a mí?</summary>
                <a className={styles.emailLink} href={`mailto:${EMAIL}`}>{EMAIL}<Arrow /></a>
                <p className={styles.contactAltNote}>O dejame tus datos y te contesto yo.</p>
                <ContactForm />
              </details>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home />
    </div>
  );
}
