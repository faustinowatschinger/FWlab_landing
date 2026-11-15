import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://fwlabsllc.com";

const description = "Fawel, de FW Labs: un agente de IA que atiende a tus clientes por WhatsApp a cualquier hora y le pasa a tu equipo solo los que vienen en serio. Diagnóstico gratis.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Fawel | Ninguna consulta sin respuesta · FW Labs", template: "%s | FW Labs" },
  description,
  applicationName: "FW Labs",
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
