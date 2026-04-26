import type { Metadata } from "next";

import { SITE_ORIGIN } from "@/lib/constants";

/**
 * Per-route metadata for /docs. Root layout `title.template` appends " | Lineage" when
 * `title` is a string.
 */
export function docsPageMetadata(args: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const pathNorm = args.path.startsWith("/") ? args.path : `/${args.path}`;
  const url = `${SITE_ORIGIN}${pathNorm}`;

  return {
    title: args.title,
    description: args.description,
    alternates: {
      canonical: pathNorm,
    },
    openGraph: {
      title: `${args.title} | Lineage`,
      description: args.description,
      url,
      type: "article",
      siteName: "Lineage Foundation",
      images: [
        {
          url: "/images/open-graph-lineage-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Lineage Foundation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${args.title} | Lineage`,
      description: args.description,
      images: ["/images/open-graph-lineage-1200x630.png"],
    },
  };
}
