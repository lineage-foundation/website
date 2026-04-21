import type { Metadata } from "next";

import { Button, Card, Prose, Section } from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_DISCOURSE_RESEARCH,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research notes behind Lineage — UTMMs, Prime Radiant Consensus, and adaptive market evolution. The whitepaper and the research forum.",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Research | Lineage",
    description:
      "Research notes behind Lineage — UTMMs, consensus, adaptive market evolution.",
    url: `${SITE_ORIGIN}/research`,
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
    title: "Research | Lineage",
    description: "Research notes behind Lineage.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function ResearchPage() {
  return (
    <>
      <Section
        eyebrow="Research"
        heading="Research"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            Lineage is a research project as much as a Layer-1. The
            foundational ideas — Universal Turing Market Machines, Prime
            Radiant Consensus, and the ARCO simulation — are documented in
            the whitepaper and discussed openly on the research Discourse.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Reading list" heading="Where the research lives">
        <div className={styles.notes}>
          <Prose>
            <p>
              Markets aggregate dispersed information; UTMMs formalise that
              discovery process inside consensus. Traditional blockchains
              execute fixed rules — Lineage performs bounded search over
              policy space and verifies results cryptographically, so the
              mechanisms themselves evolve under deterministic selection
              pressure. The ARCO simulation on{" "}
              <a href="/technology">/technology</a> walks through a single step
              of this loop.
            </p>
          </Prose>
        </div>
        <div className={styles.grid}>
          <Card
            title="Lineage: The Living Economy"
            href={URL_ZENODO_WHITEPAPER}
            external
          >
            The whitepaper on Zenodo — full technical and economic
            specification.
          </Card>
          <Card
            title="Lineage research Discourse"
            href={URL_DISCOURSE_RESEARCH}
            external
          >
            Open discussion of UTMMs, consensus, and ongoing research
            questions.
          </Card>
        </div>
      </Section>

      <Section eyebrow="Build on it" heading="Move the research into code">
        <Prose>
          <p>
            If the research is useful to you, the implementation is open for
            review and contribution.
          </p>
        </Prose>
        <div className={styles.actions}>
          <Button variant="primary" size="md" href="/developers">
            Developer path
          </Button>
          <Button
            variant="secondary"
            size="md"
            href={URL_DISCOURSE_RESEARCH}
            external
          >
            Open the forum
          </Button>
        </div>
      </Section>
    </>
  );
}
