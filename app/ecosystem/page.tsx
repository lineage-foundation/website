import type { Metadata } from "next";

import { Accent, PageHead } from "@/components/ui/PageHead";
import { Button, Card, LinkCta, Section, Tag } from "@/components/ui";
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
    "Wallets, network, and community around the Lineage Foundation. What exists today, with honest attribution.",
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
    description:
      "Wallets, network, and community around the Lineage Foundation. What exists today, with honest attribution.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

const NETWORK_READY = true;

export default function EcosystemPage() {
  return (
    <>
      {/* PAGE HEAD */}
      <PageHead
        eyebrow="Ecosystem"
        title={
          <>
            The Lineage <Accent>ecosystem</Accent>
          </>
        }
        lead="A public GitHub organisation, a research forum, and the first community-built wallets."
      />

      {/* WALLETS */}
      <Section
        tone="band"
        eyebrow="Wallets"
        heading="Community-built wallets"
      >
        <p className={styles.sectionProse}>
          The first wallets with early Lineage support are built and maintained
          by the community.
        </p>
        <div className={styles.grid2}>
          <Card
            rail
            title="Se3ker"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="13.5" r="1.4" fill="currentColor" />
              </svg>
            }
          >
            <p>Community-built wallet with early Lineage support.</p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_SE3KER}>Visit Se3ker</LinkCta>
            </div>
          </Card>

          <Card
            rail
            title="Peerstone"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17" cy="13.5" r="1.4" fill="currentColor" />
              </svg>
            }
          >
            <p>Second community-built wallet for Lineage.</p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_PEERSTONE}>Visit Peerstone</LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* NETWORK & EXPLORERS */}
      <Section
        eyebrow="Network &amp; explorers"
        heading="Network information"
      >
        <p className={styles.sectionProse}>
          Live network details and a public block explorer are on the way.
        </p>
        <div className={styles.grid2}>
          {NETWORK_READY ? (
            <Card
              rail
              title="Network &amp; block explorer"
              icon={
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9.5 10.5 6.5 7.5M14.5 10.5l3-3M12 15v3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              href={URL_NETWORK}
              external
            >
              <p>Live network information and block explorer.</p>
            </Card>
          ) : (
            <Card
              rail
              placeholder
              title="Network &amp; block explorer"
              icon={
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9.5 10.5 6.5 7.5M14.5 10.5l3-3M12 15v3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
            >
              <p>
                Live network destination is not yet public. Follow GitHub for
                the announcement.
              </p>
              <Tag status="soon">Coming soon</Tag>
            </Card>
          )}
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section
        tone="band"
        eyebrow="Community"
        heading="Open discussion &amp; research"
      >
        <p className={styles.sectionProse}>
          Protocol, consensus, and UTMM research are discussed in the open.
          Anyone can read along and contribute.
        </p>
        <div className={styles.grid2}>
          <Card
            rail
            title="Fremen Forum"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M4 5h16v11H9l-4 3v-3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
          >
            <p>
              Open discussion of the protocol, consensus, and UTMM research,
              hosted on Discourse.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_DISCOURSE_RESEARCH}>Open the forum</LinkCta>
            </div>
          </Card>

          <Card
            rail
            title="GitHub organisation"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M9 19c-4 1.3-4-2.2-6-2.7M15 21v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.5 1.8 5.5 2.1 5.5 2.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 8.5c0 4.7 2.8 5.7 5.5 6a2.9 2.9 0 0 0-.8 2.1V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            <p>
              A public GitHub organisation where the protocol and tooling are
              developed in the open. Contributions are reviewed publicly.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_GITHUB_ORG}>Browse the repos</LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* TOOLING & APPS — moat 3+2 grid */}
      <Section
        eyebrow="Tooling &amp; apps"
        heading="Build with published tooling"
      >
        <p className={styles.sectionProse}>
          Client SDKs are published and ready to use today. An MCP server and
          LLM agent skills are on the way, listed here with what they&apos;ll
          expose, marked clearly until they ship.
        </p>
        <div className={styles.gridMoat}>
          {/* 1 — Client SDKs (live) */}
          <Card
            rail
            title="Client SDKs"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M8 9 4 12l4 3M16 9l4 3-4 3M13.5 6l-3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            <p>
              Official SDKs for talking to Lineage nodes: wallets, transactions,
              balances, and node APIs in your language of choice.
            </p>
            <ul className={styles.sdkLinks}>
              <li>
                <a
                  href="https://github.com/lineage-foundation/sdk-js"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  sdk-js
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lineage-foundation/sdk-python"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  sdk-python
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lineage-foundation/sdk-php"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  sdk-php
                </a>
              </li>
            </ul>
            <Tag status="live">Published</Tag>
          </Card>

          {/* 2 — MCP server (coming soon) */}
          <Card
            rail
            title="MCP server"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            }
          >
            <p>
              A hosted Model Context Protocol endpoint so AI agents and
              assistants can query Lineage directly: balances &amp;
              transactions, keypair &amp; seed generation, block / entry /
              transaction lookups, supply, and node health.
            </p>
            <span className={styles.endpointUrl}>https://mcp.lineage.to</span>
            <Tag status="soon">Coming soon</Tag>
          </Card>

          {/* 3 — LLM agent skills (coming soon) */}
          <Card
            rail
            title="LLM agent skills"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M12 3l2.2 4.6 5 .7-3.6 3.6.9 5-4.5-2.4-4.5 2.4.9-5L5.8 8.3l5-.7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            }
          >
            <p>
              Packaged skills that teach AI coding agents how to build on
              Lineage: SDK usage, node APIs, and common transaction flows,
              ready to drop into agent workflows.
            </p>
            <Tag status="soon">Coming soon</Tag>
          </Card>

          {/* 4 — Applications (coming soon) */}
          <Card
            rail
            placeholder
            title="Applications"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            }
          >
            <p>Apps built on Lineage by the community. None have shipped yet.</p>
            <Tag status="soon">Coming soon</Tag>
          </Card>
        </div>
      </Section>

      {/* JOIN CTA BAND */}
      <Section
        tone="band"
        eyebrow="Build or contribute"
        heading="Join the ecosystem"
        spacing="loose"
      >
        <p className={styles.sectionProse} style={{ marginBottom: 0 }}>
          Integrators, wallet authors, and researchers are welcome. Start from
          the repos or the forum. Contributions are reviewed in the open.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href={URL_GITHUB_ORG} variant="primary" external>
            Open GitHub repos
          </Button>
          <Button href={URL_DISCOURSE_RESEARCH} variant="secondary" external>
            Fremen Forum
          </Button>
          <LinkCta href="/developers">Developer path</LinkCta>
        </div>
      </Section>
    </>
  );
}
