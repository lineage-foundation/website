import type { Metadata } from "next";

import { SITE_ORIGIN } from "@/lib/constants";

import { ApiReference } from "./ApiReference";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "API reference",
  description:
    "Interactive reference for the Lineage /v1 REST API — read chain state, submit transactions, and query balances, supply, and blocks. Generated from the OpenAPI specification.",
  alternates: { canonical: "/developers/api" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "API reference | Lineage",
    description:
      "Interactive reference for the Lineage /v1 REST API, generated from the OpenAPI specification.",
    url: `${SITE_ORIGIN}/developers/api`,
    type: "website",
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
    title: "API reference | Lineage",
    description:
      "Interactive reference for the Lineage /v1 REST API, generated from the OpenAPI specification.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function ApiReferencePage() {
  return (
    <div className={styles.page}>
      <ApiReference />
    </div>
  );
}
