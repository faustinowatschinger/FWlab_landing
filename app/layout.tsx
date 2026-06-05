import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://fwlabsllc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FW Assistant | Agente de IA para inmobiliarias",
    template: "%s | FW Assistant",
  },
  description:
    "Agente de IA para inmobiliarias: responde, califica y agenda tus leads de WhatsApp al instante, 24/7. Conectado a tu cartera real. Vos cerrás. Por FW Labs.",
  applicationName: "FW Assistant",
  authors: [{ name: "FW Labs", url: SITE_URL }],
  creator: "FW Labs",
  publisher: "FW Labs",
  category: "technology",
  keywords: [
    "agente de IA para inmobiliarias",
    "chatbot inmobiliario",
    "IA para inmobiliarias",
    "automatización de leads inmobiliarios",
    "bot de WhatsApp para inmobiliarias",
    "calificación de leads inmobiliarios",
    "agendar visitas automático",
    "FW Assistant",
    "FW Labs",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "FW Assistant",
    title: "Agente de IA para inmobiliarias que responde y agenda tus leads",
    description:
      "Responde, califica y agenda cada lead de WhatsApp al instante, 24/7, conectado a tu cartera real. Tu equipo deja de filtrar mensajes y se dedica a cerrar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agente de IA para inmobiliarias | FW Assistant",
    description:
      "Responde, califica y agenda cada lead de WhatsApp al instante, 24/7. Conectado a tu cartera real. Vos cerrás.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

