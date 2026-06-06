import type { Metadata } from "next";

import {
  AsideCard,
  Button,
  Card,
  Eyebrow,
  LinkCta,
  Section,
} from "@/components/ui";
import {
  SITE_ORIGIN,
  URL_DISCOURSE_RESEARCH,
  URL_GITHUB_ORG,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";
import { ZENODO_RESEARCH_PUBLICATIONS } from "@/lib/research-zenodo";

import styles from "./page.module.css";

function formatListDate(iso: string) {
  try {
    return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
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
    siteName: "Lineage Foundation",
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
      {/* PAGE HEAD */}
      <Section
        visual="feature"
        eyebrow="Research"
        heading={
          <>
            A protocol that is also a{" "}
            <span style={{ color: "var(--color-accent)" }}>research</span>{" "}
            programme
          </>
        }
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <p className={styles.sectionProse} style={{ marginBottom: 0 }}>
          Lineage is a research project as much as a layer-one protocol. The
          work is published as open working papers on Zenodo under CC&nbsp;BY
          &nbsp;4.0 — newest first — covering market computation, consensus, and
          world state.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href={URL_ZENODO_WHITEPAPER} variant="primary" external>
            Read the Whitepaper
          </Button>
          <Button href={URL_DISCOURSE_RESEARCH} variant="secondary" external>
            Open the Fremen Forum
          </Button>
        </div>
      </Section>

      {/* ABSTRACT + CITATION ASIDE */}
      <Section>
        <div className={styles.split}>
          <div className={styles.proseBody}>
            <h2>Abstract</h2>
            <p>
              Lineage proposes{" "}
              <strong>Universal Turing Market Machines (UTMMs)</strong>: a
              framework for blockchain-based markets in which market policy is a
              programmable, adaptive object. Transaction history is treated as an
              epistemic substrate, with deterministic feature extraction,
              evaluation of policies in a constrained space, and improvement via
              bounded search — all while remaining within classical computability
              limits.
            </p>
            <p>
              The flagship whitepaper, <em>Universal Turing Market Machines (UTMMs)</em>,
              is archived on Zenodo and anchors the reading list below.
              Surrounding papers develop the consensus layer that defends these
              adaptive algorithms, the world-state model that carries context in
              a UTXO setting, and the currency design that aims for low
              volatility without external collateral.
            </p>

            <h2>Research themes</h2>
            <p>
              The published work clusters into a few recurring questions. First,
              how a market can <strong>compute</strong>: how to express market
              policy as an object that adapts at runtime rather than being fully
              fixed at design time, and how to keep that adaptation deterministic
              and verifiable inside consensus.
            </p>
            <p>
              Second, how that computation is <strong>defended</strong>: the
              Dynamic Proof of Weighted Work (DPoWW) family of papers studies a
              Nakamoto-style design that can move between fully distributed and
              semi-decentralized modes for throughput, reverting to full
              distribution when fault conditions require it — including
              parallelized Merkle-tree validation to scale miner workloads.
            </p>
            <p>
              Third, how markets <strong>evolve</strong>: framing
              self-organizing market process through Hayek&rsquo;s spontaneous
              order and Ashby&rsquo;s law of requisite variety, with adaptive
              resource-coordinated organisms (ARCOs) combining sensory inputs,
              ledger signalling, and actuators. World state is carried in a UTXO
              setting using monad-style composition to limit side effects, while
              coin scripts stay non&ndash;Turing complete for value movement.
            </p>
          </div>

          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>
              Cite the whitepaper
            </Eyebrow>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--fs-h3)",
                color: "var(--color-text)",
                margin: "var(--space-3) 0 0",
                lineHeight: "var(--lh-heading)",
              }}
            >
              Universal Turing Market Machines (UTMMs)
            </p>
            <p className={styles.asideMeta}>
              Archive ·{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                Zenodo
              </strong>{" "}
              · CC&nbsp;BY&nbsp;4.0
            </p>
            <p className={styles.asideSubMeta}>
              Record 19203176 · Published 24 March 2026
            </p>
            <LinkCta href={URL_ZENODO_WHITEPAPER}>Read on Zenodo</LinkCta>
          </AsideCard>
        </div>
      </Section>

      {/* RESEARCH PILLARS */}
      <Section
        tone="band"
        eyebrow="Research pillars"
        heading="Three lines of inquiry"
      >
        <div className={styles.grid3}>
          <Card rail title="Universal Turing Market Machines">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--color-link)", marginBottom: "var(--space-3)" }}>
              01
            </p>
            <p>
              UTMMs frame market policy as a programmable, adaptive object.
              Transaction history becomes an epistemic substrate: deterministic
              operators extract features, policies are evaluated in a constrained
              space, and bounded search improves them — without leaving classical
              computability.
            </p>
          </Card>
          <Card rail title="Prime Radiant Consensus">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--color-link)", marginBottom: "var(--space-3)" }}>
              02
            </p>
            <p>
              The Dynamic Proof of Weighted Work (DPoWW) papers describe a
              Nakamoto-style consensus that shifts between fully distributed and
              semi-decentralized modes for throughput, reverting under fault
              conditions, with parallelized Merkle-tree validation to scale
              miner workloads.
            </p>
          </Card>
          <Card rail title="Adaptive Market Evolution">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-caption)", color: "var(--color-link)", marginBottom: "var(--space-3)" }}>
              03
            </p>
            <p>
              Self-organizing market process modelled through Hayek&rsquo;s
              spontaneous order and Ashby&rsquo;s law of requisite variety.
              Adaptive resource-coordinated organisms (ARCOs) combine sensory
              inputs, ledger signalling, and actuators so markets adapt at
              runtime rather than only at design time.
            </p>
          </Card>
        </div>
      </Section>

      {/* PUBLICATIONS — Zenodo data integration preserved */}
      <Section
        eyebrow="Publications"
        heading="Papers and whitepapers on Zenodo"
      >
        <p className={styles.sectionProse}>
          Open working papers, reverse chronological order, newest first. Each
          links to its Zenodo record.
        </p>
        <div className={styles.pubGrid}>
          {ZENODO_RESEARCH_PUBLICATIONS.map((pub) => (
            <Card key={pub.id} rail title={pub.title}>
              <p className={styles.pubMeta}>
                {formatListDate(pub.datePublished)} · {pub.id}
              </p>
              <p>{pub.description}</p>
              <div className={styles.cardCta}>
                <LinkCta href={pub.href} muted>
                  Read on Zenodo
                </LinkCta>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FREMEN FORUM */}
      <Section tone="band">
        <div className={styles.split}>
          <div className={styles.proseBody}>
            <h2>Fremen Forum</h2>
            <p>
              The <strong>Fremen Forum</strong> is the public place for
              protocol, consensus, and economic-design discussion — open
              threads, not a help desk for a single app, with room for
              working-group style debate and ideas from the wider community.
            </p>
            <p>
              Bring questions about UTMMs, DPoWW, and ongoing Lineage research.
              The conversation is open to everyone, and contributions feed back
              into the published work.
            </p>
          </div>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Community</Eyebrow>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "var(--fs-h3)",
                color: "var(--color-text)",
                margin: "var(--space-3) 0 0",
                lineHeight: "var(--lh-heading)",
              }}
            >
              Open research discussion
            </p>
            <p className={styles.asideMeta}>
              Open discussion of UTMMs, DPoWW, and ongoing Lineage research
              questions.
            </p>
            <div style={{ marginTop: "var(--space-5)" }}>
              <LinkCta href={URL_DISCOURSE_RESEARCH}>
                Open the Fremen Forum
              </LinkCta>
            </div>
          </AsideCard>
        </div>
      </Section>

      {/* CTA BAND */}
      <Section
        eyebrow="Build on it"
        heading="Move the research into code"
        spacing="loose"
      >
        <p className={styles.sectionProse} style={{ marginBottom: 0 }}>
          If the research is useful to you, the implementation is open for
          review and contribution.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href={URL_ZENODO_WHITEPAPER} variant="primary" external>
            Read the Whitepaper
          </Button>
          <Button href={URL_GITHUB_ORG} variant="secondary" external>
            View on GitHub
          </Button>
        </div>
      </Section>
    </>
  );
}
