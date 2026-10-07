import type { MetadataRoute } from "next";
import { clients, clientPath } from "./clientes/clients";

const SITE_URL = "https://fwlabsllc.com";
const LAST_MODIFIED = new Date("2026-10-05");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...clients.map((client) => ({ url: `${SITE_URL}${clientPath(client)}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.8 })),
    {
      url: `${SITE_URL}/mapa-operativo`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
