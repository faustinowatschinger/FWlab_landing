import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://fwlabsllc.com";

const description = "Software y automatizaciones con IA a medida para resolver problemas reales. Soy Faustino, fundador de FW Labs. Conocé mi trabajo con 3W y Altaterra.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "FW Labs | Soluciones tecnológicas", template: "%s | FW Labs" },
  description,
  applicationName: "FW Labs",
  authors: [{ name: "Faustino Watschinger", url: SITE_URL }],
  creator: "FW Labs",
  publisher: "FW Labs",
  category: "technology",
  openGraph: { type: "website", locale: "es_AR", url: SITE_URL, siteName: "FW Labs", title: "FW Labs | Soluciones tecnológicas", description },
  twitter: { card: "summary_large_image", title: "FW Labs | Soluciones tecnológicas", description },
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
