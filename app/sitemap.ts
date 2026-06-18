import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/constants";

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
    {
      url: `${base}/roadmap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/get-tokens`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/docs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  return marketing;
}
