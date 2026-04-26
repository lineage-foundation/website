import type { Metadata } from "next";

import { Button, Card, Prose, Section } from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_DISCOURSE_RESEARCH,
  URL_GITHUB_ORG,
  URL_NETWORK,
  URL_PEERSTONE,
  URL_SE3KER,
} from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Wallets, network, and community around the Lineage Foundation — what exists today, with honest attribution.",
  alternates: { canonical: "/ecosystem" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ecosystem | Lineage",
    description:
      "Wallets, network, and community around the Lineage Foundation.",
    url: `${SITE_ORIGIN}/ecosystem`,
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
    title: "Ecosystem | Lineage",
    description: "Wallets, network, and community around Lineage.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

const NETWORK_READY = URL_NETWORK !== "#";

export default function EcosystemPage() {
  return (
    <>
      <Section
        visual="feature"
        heading="Ecosystem"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            The ecosystem around Lineage is intentionally small and open — a
            public GitHub organisation, a research forum, and the first
            community-built wallets. No fabricated partnerships, no inflated
            metrics: only what exists today.
          </p>
        </Prose>
      </Section>

      <Section
        tone="band"
        visual="feature"
        heading="Wallets, network, community"
      >
        <div className={styles.grid}>
          <Card
            title="Se3ker"
            eyebrow="Wallets"
            href={URL_SE3KER}
            external
          >
            Community-built wallet with early Lineage support.
          </Card>
          <Card
            title="Peerstone"
            eyebrow="Wallets"
            href={URL_PEERSTONE}
            external
          >
            Second community-built wallet for Lineage.
          </Card>
          {NETWORK_READY ? (
            <Card
              title="Network"
              href={URL_NETWORK}
              external
            >
              Live network information and block explorer.
            </Card>
          ) : (
            <Card title="Network">
              Live network destination is not yet public. Follow GitHub for
              the announcement.
            </Card>
          )}
          <Card
            title="Discourse research forum"
            eyebrow="Community"
            href={URL_DISCOURSE_RESEARCH}
            external
          >
            Open discussion of the protocol, consensus, and UTMM research.
          </Card>
        </div>
      </Section>

      <Section visual="feature" heading="Build or contribute">
        <Prose>
          <p>
            Integrators, wallet authors, and researchers are welcome. Start
            from the repos or the forum — contributions are reviewed in the
            open.
          </p>
        </Prose>
        <div className={styles.actions}>
          <Button variant="primary" size="md" href="/developers">
            Developer path
          </Button>
          <Button variant="secondary" size="md" href={URL_GITHUB_ORG} external>
            Open GitHub repos
          </Button>
        </div>
      </Section>
    </>
  );
}
