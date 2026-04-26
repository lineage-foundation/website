import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/constants";
import { allDocsNavHrefs } from "@/lib/flatten-doc-nav-hrefs";

/** Primary URLs for indexing. `/learn` and `/arco` 301 → `/technology` (see next.config.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_ORIGIN;
  const now = new Date();

  const marketing: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/technology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/tokenomics`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/developers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/ecosystem`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/research`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  /** In sync with `lib/docs-nav.ts` (every shipped nav target). */
  const docs: MetadataRoute.Sitemap = [...allDocsNavHrefs()]
    .sort()
    .map((path) => ({
      url: `${base}${path.startsWith("/") ? path : `/${path}`}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...marketing, ...docs];
}
