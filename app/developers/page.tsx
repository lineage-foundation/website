import type { Metadata } from "next";

import { Button, Card, Prose, Section } from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_DISCOURSE_RESEARCH,
  URL_GITHUB_ORG,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
  alternates: { canonical: "/developers" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Developers | Lineage",
    description:
      "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
    url: `${SITE_ORIGIN}/developers`,
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
    title: "Developers | Lineage",
    description:
      "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function DevelopersPage() {
  return (
    <>
      <Section
        visual="feature"
        heading="Build on Lineage"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            Lineage is a Layer-1 where market policy itself is programmable.
            The network performs bounded search over policy space and verifies
            results cryptographically — so the mechanisms governing markets
            can evolve without changing the chain.
          </p>
          <p>
            Everything is open. Evaluate the protocol against the whitepaper,
            clone the repos, and prototype.
          </p>
        </Prose>
      </Section>

      <Section
        tone="band"
        visual="feature"
        heading="Source material"
      >
        <div className={styles.grid}>
          <Card title="Developer documentation" href="/docs">
            Concepts, HTTP API reference, tutorials, and mining guides on this
            site — the technical entry point for integrators.
          </Card>
          <Card
            title="Lineage Foundation on GitHub"
            href={URL_GITHUB_ORG}
            external
          >
            Every repository is open for review, issues, and contributions.
          </Card>
          <Card
            title="Lineage: The Living Economy"
            href={URL_ZENODO_WHITEPAPER}
            external
          >
            The full technical and economic specification, archived on Zenodo.
          </Card>
        </div>
      </Section>

      <Section
        visual="feature"
        heading="Have questions?"
      >
        <Prose>
          <p>
            Specification and research questions live in the{" "}
            <strong>Fremen Forum</strong> (hosted on Discourse). Implementation
            questions belong in the repo issue trackers on GitHub.
          </p>
        </Prose>
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="md"
            href={URL_DISCOURSE_RESEARCH}
            external
            title="Fremen Forum on Discourse"
          >
            Open Fremen Forum
          </Button>
          <Button
            variant="secondary"
            size="md"
            href={URL_GITHUB_ORG}
            external
          >
            Open GitHub repos
          </Button>
        </div>
      </Section>
    </>
  );
}
