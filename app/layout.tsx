import type { Metadata, Viewport } from "next";
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
    default: "FW Labs | IA y automatización para operaciones industriales",
    template: "%s | FW Labs",
  },
  description:
    "Diagnosticamos qué te está comiendo horas y plata en tu operación industrial y construimos la automatización a medida que lo resuelve. IA real en producción. Agendá una llamada de 20 minutos.",
  applicationName: "FW Labs",
  authors: [{ name: "FW Labs", url: SITE_URL }],
  creator: "FW Labs",
  publisher: "FW Labs",
  category: "technology",
  keywords: [
    "IA y automatización industrial",
    "automatización de procesos industriales",
    "monitoreo remoto de plantas",
    "IA para la industria",
    "automatización de operaciones",
    "monitoreo de operaciones en tiempo real",
    "partner tecnológico industrial",
    "FW Control",
    "FW Labs",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "FW Labs",
    title: "IA y automatización para operaciones industriales",
    description:
      "Encontramos qué te está comiendo horas y plata en tu operación industrial y construimos la automatización a medida que lo resuelve. Empezando por un diagnóstico, no un sistema enlatado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FW Labs | IA y automatización para operaciones industriales",
    description:
      "Diagnosticamos tu operación y automatizamos a medida lo que más te libera. IA real en producción, no promesas.",
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

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

