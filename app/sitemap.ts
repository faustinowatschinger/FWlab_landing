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
  ];
}
