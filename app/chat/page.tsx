import type { Metadata, Viewport } from "next";

import { SALUDO } from "../api/chat/prompt";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Hablá con Fawel",
  description: "Contale a Fawel cómo te entran las consultas y fijate si te sirve. Diagnóstico gratis.",
  // Es la página de destino de los anuncios: no tiene que competir con la home en buscadores.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#20409a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

/** El Calendly de FW Labs. Se pisa con NEXT_PUBLIC_CALENDLY_URL. */
const CALENDLY = "https://calendly.com/fwlabs/llamada-gratuita";

export default function PaginaChat() {
  return (
    <>
      <Chat saludo={SALUDO} calendly={process.env.NEXT_PUBLIC_CALENDLY_URL || CALENDLY} />
    </>
  );
}
