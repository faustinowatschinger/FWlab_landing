import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve las capturas en formatos modernos (mejor LCP / peso).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
