import type { Metadata, Viewport } from "next";

import Agendar from "./Agendar";

export const metadata: Metadata = {
  title: "Diagnóstico gratis con Faustino",
  description: "Elegí un horario para el diagnóstico gratis de cómo te entran las consultas.",
  // Destino de los anuncios (variante A de la prueba de Meta): no compite con la home en buscadores.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#20409a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** El mismo Calendly que /chat. Se pisa con NEXT_PUBLIC_CALENDLY_URL. */
const CALENDLY = "https://calendly.com/fwlabs/llamada-gratuita";

export default function PaginaAgendar() {
  return <Agendar calendly={process.env.NEXT_PUBLIC_CALENDLY_URL || CALENDLY} />;
}
