import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/meta-pixel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://fwlabsllc.com";

const description = "Fawel, de FW Labs: un agente de IA que atiende a tus clientes por WhatsApp, Instagram o tu web, a cualquier hora, le pasa a tu equipo solo los que vienen en serio y te deja ver qué pasó con cada consulta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Fawel | Ninguna consulta sin respuesta · FW Labs", template: "%s | FW Labs" },
  description,
  applicationName: "FW Labs",
  // Verificación del dominio en Meta Business (15-11): tiene que estar en el <head> servido, no inyectada por JS.
  verification: { other: { "facebook-domain-verification": "j4hfxjkuf2iem94qghpj3k39qx2cmw" } },
  authors: [{ name: "Faustino Watschinger", url: SITE_URL }],
  creator: "FW Labs",
  publisher: "FW Labs",
  category: "technology",
  openGraph: { type: "website", locale: "es_AR", url: SITE_URL, siteName: "FW Labs", title: "Fawel | Ninguna consulta sin respuesta · FW Labs", description },
  twitter: { card: "summary_large_image", title: "Fawel | Ninguna consulta sin respuesta · FW Labs", description },
  robots: { index: true, follow: true },
  icons: { icon: "/logo2.png", shortcut: "/logo2.png", apple: "/logo2.png" },
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
      <body className={`${inter.variable} antialiased`}>{children}<MetaPixel /></body>
    </html>
  );
}
