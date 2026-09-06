import type { Metadata } from "next";

import { Accent, Button, Container, PageHead } from "@/components/ui";
import { SITE_ORIGIN, URL_GITHUB_ORG } from "@/lib/constants";
import { spec } from "@/lib/openapi/spec";

import { ApiReference } from "./ApiReference";
import styles from "./reference.module.css";

export const metadata: Metadata = {
  title: "API reference",
  description:
    "Reference for the Lineage /v1 REST API — read chain state, submit transactions, and query balances, supply, and blocks. Generated from the OpenAPI specification.",
  alternates: { canonical: "/developers/api" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "API reference | Lineage",
    description:
      "Reference for the Lineage /v1 REST API, generated from the OpenAPI specification.",
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
      "Reference for the Lineage /v1 REST API, generated from the OpenAPI specification.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function ApiReferencePage() {
  return (
    <>
      <PageHead
        eyebrow="API reference"
        title={
          <>
            The <Accent>/v1</Accent> REST API
          </>
        }
        lead="Read chain state, submit transactions, and query balances, supply, and blocks over plain HTTP. This page is generated from the OpenAPI specification, so it always matches the running nodes."
        actions={
          <div className={styles.headActions}>
            <Button href="/openapi.json" variant="primary">
              Download OpenAPI
            </Button>
            <Button href={URL_GITHUB_ORG} variant="secondary" external>
              View source on GitHub
            </Button>
          </div>
        }
      />

      <section className={styles.section}>
        <Container width="docs">
          <p className={styles.specMeta}>
            {spec.info.title} · v{spec.info.version} · OpenAPI {spec.openapi}
          </p>
          <p className={styles.testnetNote}>
            <span className={styles.testnetTag}>Testnet</span>
            The <code>*.lineage.to</code> base URLs below point to the public
            testnet. A mainnet will be announced separately.
          </p>
          <ApiReference />
        </Container>
      </section>
    </>
  );
}
