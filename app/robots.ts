import type { MetadataRoute } from "next";

const SITE_URL = "https://fwlabsllc.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Páginas internas / demo que no deben indexarse
        disallow: ["/test-whatsapp", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
