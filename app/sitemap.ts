import type { MetadataRoute } from "next";

const SITE_URL = "https://fwlabsllc.com";
const LAST_MODIFIED = new Date("2026-06-30");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/mapa-operativo`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
