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
    default: "FW Labs | IA y automatización a medida para tu operación",
    template: "%s | FW Labs",
  },
  description:
    "Automatizamos con IA el trabajo manual que te come horas y ordenamos tu información en sistemas a medida. Diagnóstico primero, no un producto enlatado. IA real en producción, no promesas. Agendá una llamada de 20 minutos.",
  applicationName: "FW Labs",
  authors: [{ name: "FW Labs", url: SITE_URL }],
  creator: "FW Labs",
  publisher: "FW Labs",
  category: "technology",
  keywords: [
    "automatización de procesos con IA",
    "diagnóstico de procesos",
    "automatización a medida",
    "IA para empresas",
    "integración de sistemas",
    "automatización de operaciones",
    "IA en producción",
    "FW Control",
    "FW Labs",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "FW Labs",
    title: "IA y automatización a medida para tu operación",
    description:
      "Automatizamos con IA el trabajo manual que te come horas y ordenamos tu información en sistemas a medida. Empezando por un diagnóstico, no por un producto enlatado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FW Labs | IA y automatización a medida para tu operación",
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

