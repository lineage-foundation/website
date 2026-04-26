import type { Metadata } from "next";

import { Button, Card, Prose, Section } from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_DISCOURSE_RESEARCH,
} from "@/lib/constants";
import { ZENODO_RESEARCH_PUBLICATIONS } from "@/lib/research-zenodo";

import styles from "./page.module.css";

function formatListDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export const metadata: Metadata = {
  title: "Research",
  description:
    "Lineage working papers on Zenodo—UTMM, DPoWW, UTXO world state, Merkle validation, and more—and the Fremen Forum for public research discussion.",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Research | Lineage",
    description:
      "Published Lineage work on Zenodo, plus the Fremen Forum for open research discussion.",
    siteName: "Lineage",
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
    description:
      "Zenodo publications and the Fremen Forum for Lineage research.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function ResearchPage() {
  return (
    <>
      <Section
        visual="feature"
        heading="Research"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            Lineage is a research project as much as a layer-one protocol. The
            work below is published on{" "}
            <a
              href="https://zenodo.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Zenodo
            </a>{" "}
            (open working papers, CC BY 4.0). The list is in reverse
            chronological order, newest first.
          </p>
        </Prose>
      </Section>

      <Section
        tone="band"
        visual="feature"
        eyebrow="Publications"
        heading="Papers and whitepapers on Zenodo"
      >
        <ul className={styles.pubList}>
          {ZENODO_RESEARCH_PUBLICATIONS.map((pub) => (
            <li key={pub.id} className={styles.pubItem}>
              <p className={styles.pubMeta}>
                {formatListDate(pub.datePublished)} · record{" "}
                <a href={pub.href} rel="noopener noreferrer" target="_blank">
                  {pub.id}
                </a>
              </p>
              <h3 className={styles.pubHeading}>
                <a href={pub.href} rel="noopener noreferrer" target="_blank">
                  {pub.title}
                </a>
              </h3>
              <p className={styles.pubBody}>{pub.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        visual="feature"
        eyebrow="Community"
        heading="Fremen Forum"
        spacing="loose"
      >
        <div className={styles.notes}>
          <Prose>
            <p>
              <a
                href={URL_DISCOURSE_RESEARCH}
                rel="noopener noreferrer"
                target="_blank"
              >
                <strong>Fremen Forum</strong>
              </a>{" "}
              is the public place for protocol, consensus, and economic-design
              discussion—open threads, not a help desk for a single app, with room
              for working-group style debate and ideas from the wider community.
            </p>
          </Prose>
        </div>
        <div className={styles.grid}>
          <Card
            title="Fremen Forum"
            href={URL_DISCOURSE_RESEARCH}
            external
          >
            Open discussion of UTMMs, DPoWW, and ongoing Lineage research
            questions.
          </Card>
        </div>
      </Section>

      <Section
        visual="feature"
        eyebrow="Build on it"
        heading="Move the research into code"
      >
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
            Open Fremen Forum
          </Button>
        </div>
      </Section>
    </>
  );
}
