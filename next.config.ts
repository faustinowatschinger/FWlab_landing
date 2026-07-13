import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve las capturas en formatos modernos (mejor LCP / peso).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // La página /diagnostico se eliminó (el agendado vive en la home, #agendar).
        // Redirect permanente para no dejar en 404 links viejos ya publicados.
        source: "/diagnostico",
        destination: "/#agendar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
