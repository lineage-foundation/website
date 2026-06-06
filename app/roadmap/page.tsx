import type { Metadata } from "next";

import { PhaseStrip } from "@/components/roadmap/PhaseStrip";
import { Release } from "@/components/roadmap/Release";
import { Timeline } from "@/components/roadmap/Timeline";
import { WsGrid } from "@/components/roadmap/WsGrid";
import styles from "@/components/roadmap/RoadmapLayout.module.css";
import {
  Button,
  Card,
  LinkCta,
  Note,
  Section,
} from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_GITHUB_ORG,
  URL_DISCOURSE_RESEARCH,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Roadmap | Lineage",
  },
  description:
    "The Lineage release roadmap — two initiatives delivered through three releases: Phoenix, Austria, and Nakamoto.",
  alternates: {
    canonical: "/roadmap",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Roadmap | Lineage",
    description:
      "The Lineage release roadmap — two initiatives delivered through three releases: Phoenix, Austria, and Nakamoto.",
    url: `${SITE_ORIGIN}/roadmap`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap | Lineage",
    description:
      "The Lineage release roadmap — two initiatives delivered through three releases: Phoenix, Austria, and Nakamoto.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

/* ─── DATA ─────────────────────────────────────────────────────────────────── */

const PHASES = [
  {
    num: "Release 01",
    name: "Phoenix",
    when: "Liquidity readiness · 2026",
    desc: "Core network upgrades, hardening, and the release-critical changes needed for listing — including the Ethereum and Solana bridges.",
  },
  {
    num: "Release 02",
    name: "Austria",
    when: "Economic layer · 2026",
    desc: "The economic and market layer — currency, ARCO compute, and smart-market functionality, with the financial policy that governs fees and rewards.",
  },
  {
    num: "Release 03",
    name: "Nakamoto",
    when: "Full decentralization · final",
    desc: "The fully distributed, feature-complete release — and the last of the three. After Nakamoto, fast centralized updates are no longer possible.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */

export default function RoadmapPage() {
  return (
    <>
      {/* PAGE HEAD */}
      <Section
        visual="feature"
        eyebrow="Roadmap"
        heading={
          <>
            Two initiatives.{" "}
            <span style={{ color: "var(--color-accent)" }}>Three releases.</span>
          </>
        }
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <p className={styles.pageLead}>
          Lineage&rsquo;s path to a fully distributed network runs through three
          sequenced releases &mdash; <strong>Phoenix</strong>,{" "}
          <strong>Austria</strong>, and <strong>Nakamoto</strong> &mdash; each
          carrying one of the protocol&rsquo;s two defining initiatives. The
          sequence is deliberate: liquidity readiness first, then the economic
          layer, then the irreversible step into full decentralization.
        </p>
      </Section>

      {/* INITIATIVES */}
      <Section
        id="initiatives"
        tone="band"
        eyebrow="Initiatives"
        heading="What we are driving toward"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Every release maps to one of two initiatives. Together they take
          Lineage from listing-ready to fully distributed.
        </p>
        <div className={styles.initiativeGrid}>
          <Card rail title="Liquidity readiness">
            <p>
              Ensure LNGX liquidity and exchange readiness &mdash; delivering
              the protocol and infrastructure upgrades required ahead of listing.
            </p>
          </Card>
          <Card rail title="Full decentralization">
            <p>
              Ship the capabilities required for a fully distributed network.
              This is the final step-change &mdash; after which fast, centralized
              updates are no longer possible.
            </p>
          </Card>
        </div>
      </Section>

      {/* PHASE STRIP */}
      <Section
        id="phases"
        eyebrow="The three releases"
        heading="Sequenced, not parallel"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Each release has a clear focus and a rising bar for correctness.
          Timing is indicative and tracks the 2026 development cycles.
        </p>
        <PhaseStrip phases={PHASES} />
      </Section>

      {/* RELEASE DETAIL */}
      <Section
        id="releases"
        tone="band"
        eyebrow="Release detail"
        heading="Inside each release"
        headingLevel={2}
      >
        <Timeline>
          {/* PHOENIX */}
          <Release
            name="Phoenix"
            when="Must be ready for the listing event"
            initiative="Initiative · Liquidity readiness"
            lede={
              <>
                Core network upgrades, hardening, and release-critical changes
                ahead of LNGX liquidity. Its timeline is constrained by bridge
                availability: an earlier start enables both the Ethereum and
                Solana bridges; a later start sequences the Ethereum bridge
                first.
              </>
            }
          >
            <WsGrid
              items={[
                {
                  heading: "Transaction serialization",
                  body: "Improved serialization for cheaper transaction storage, P2SH payment support, and the groundwork for future enhancements.",
                },
                {
                  heading: "Miner validation & Merkle tree",
                  body: "Collaborative, chunked validation with a nested transaction/miner root — the minimum security work that unlocks dynamic block sizes.",
                },
                {
                  heading: "Phoenix block",
                  body: "A clean upgrade block that carries breaking changes forward, starting a new chain from the current UTXO set.",
                },
                {
                  heading: "RAFT clustering",
                  body: "Run multiple mempool/storage pairs under consensus — from local containers to testnet to mainnet.",
                },
                {
                  heading: "Ethereum bridge",
                  body: "Lock / mint / burn / release across an Ethereum bridge, from internal testnet through public launch.",
                },
                {
                  heading: "Solana bridge",
                  body: "Extend bridging to Solana with native contracts, SDK integration, and relayer support.",
                },
                {
                  heading: "Coinbase rebase",
                  body: "Align LNGX to 72,000,000 fractions for cleaner exchange compatibility.",
                },
              ]}
            />
          </Release>

          {/* AUSTRIA */}
          <Release
            name="Austria"
            when="The economic & market layer"
            initiative="Initiative · Full decentralization"
            lede={
              <>
                The school-of-economics release: the currency, ARCO compute, and
                smart-market functionality that turn markets into programs
                &mdash; plus the financial policy that sets fees and rewards.
              </>
            }
          >
            <WsGrid
              items={[
                {
                  heading: "ARCO",
                  body: "How miners price and time on-chain compute workloads, and how users specify that work — designed, then implemented as the core of the release.",
                },
                {
                  heading: "Scripting",
                  body: (
                    <>
                      The scripting model that defines programmable market
                      transactions, including standardized financial-contract (
                      <a
                        href="https://www.actusfrf.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-link)" }}
                      >
                        ACTUS
                      </a>
                      ) types.
                    </>
                  ),
                },
                {
                  heading: "Transaction fees",
                  body: "Fees calculated by the mempool and awarded to miners.",
                },
                {
                  heading: "Financial policies",
                  body: "Set the initial transaction fee and block reward.",
                },
                {
                  heading: "Difficulty function",
                  body: "Proven stable on testnet; validated under GPU load and deployed to mainnet.",
                },
                {
                  heading: "Block explorer stability",
                  body: "Performance and indexing hardening for a responsive public explorer.",
                },
              ]}
            />
          </Release>

          {/* NAKAMOTO */}
          <Release
            name="Nakamoto"
            when="The final release"
            initiative="Initiative · Full decentralization"
            lede={
              <>
                Our fully distributed, feature-complete release &mdash; and the
                last of the three. Once Nakamoto ships, the control we currently
                have to make easy updates is gone, so it carries the highest bar
                for correctness and operational readiness.
              </>
            }
            final
          >
            <WsGrid
              items={[
                {
                  heading: "Gossip protocol",
                  body: (
                    <>
                      Peer-to-peer messaging (
                      <a
                        href="https://dl.acm.org/doi/10.1145/2701418"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-link)" }}
                      >
                        Fireflies
                      </a>
                      -based) so nodes coordinate by broadcast rather than
                      central HTTP calls.
                    </>
                  ),
                },
                {
                  heading: "Mempool selection under consensus",
                  body: "Bring mempool nodes under consensus so node selection is trust-minimized.",
                },
                {
                  heading: "FReT monetary policy",
                  body: "Reserve-token monetary policy design and economic validation, developed with advisor input to keep the system sound money.",
                },
                {
                  heading: "Burn & issuance policy",
                  body: "Issuance tied to assets under management, with a thermostat-style burn policy that steers supply toward target.",
                },
                {
                  heading: "Block rewards for mempool & storage",
                  body: "Reward mempool and storage hosts — not just miners — to incentivize resources and reliability.",
                },
                {
                  heading: "Storage rental",
                  body: "Item lifetimes governed by rental fees, with reconnection and pruning for unpaid items.",
                },
              ]}
            />
          </Release>
        </Timeline>

        <div className={styles.timingNote}>
          <Note kicker="On timing">
            Release order is fixed; dates track the active 2026 development
            cycles and firm up as each release lands. For the most current
            status, follow development in the open on{" "}
            <a
              href={URL_GITHUB_ORG}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-link)" }}
            >
              GitHub
            </a>{" "}
            and the{" "}
            <a
              href={URL_DISCOURSE_RESEARCH}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-link)" }}
            >
              Fremen Forum
            </a>
            .
          </Note>
        </div>
      </Section>

      {/* CTA BAND */}
      <Section
        id="cta"
        eyebrow="Follow along"
        heading="Build alongside the roadmap"
        headingLevel={2}
        containerWidth="narrow"
      >
        <p className={styles.sectionProse}>
          The protocol is developed in the open. Read the research, then start
          with the developer tools.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href="/developers" variant="primary">
            Start building
          </Button>
          <Button href={URL_ZENODO_WHITEPAPER} variant="secondary" external>
            Read the whitepaper
          </Button>
          <LinkCta href="/tokenomics" muted>
            Tokenomics
          </LinkCta>
        </div>
      </Section>
    </>
  );
}
