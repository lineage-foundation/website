import type { Metadata } from "next";

import { AudienceRouter } from "@/components/home/AudienceRouter";
import { EvidenceBlock } from "@/components/home/EvidenceBlock";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { GetStartedGrid } from "@/components/home/GetStartedGrid";
import { Hero } from "@/components/home/Hero";
import { LinkCta, Prose, Section } from "@/components/ui";
import { SITE_ORIGIN, URL_YOUTUBE_VIDEO } from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Lineage - The Living Economy",
  },
  description:
    "Lineage is a Layer-1 for adaptive, trust-minimized smart markets. Miners adapt market policy. Consensus unlocks market value.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "Lineage Foundation",
    title: "Lineage - The Living Economy",
    description:
      "Lineage is a Layer-1 for adaptive, trust-minimized smart markets.",
    url: SITE_ORIGIN,
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
    title: "Lineage - The Living Economy",
    description:
      "Lineage is a Layer-1 for adaptive, trust-minimized smart markets.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

const UTMM_FEATURES = [
  {
    title: "Feature Extraction",
    body: "Transaction history becomes an epistemic substrate. Deterministic operators extract signals from market activity.",
  },
  {
    title: "Adaptive Policy Search",
    body: "Genetic algorithms and bounded optimisation explore policy space. Better market policies survive through deterministic evaluation.",
  },
  {
    title: "Verifiable Intelligence",
    body: "Zero-knowledge verification proves policy evaluation correctness without rerunning computation.",
  },
] as const;

const CONSENSUS_FEATURES = [
  {
    title: "GPU-Native Mining",
    body: "SandWorm Hash incentivizes GPU hardware. GPUs compute ML, VAR, and genetic-algorithm workloads.",
  },
  {
    title: "Deterministic Time",
    body: "Blocks map directly to UTC time, enabling predictable evaluation windows and synchronised policy updates.",
  },
  {
    title: "Blockchain Service Providers",
    body: "Architected for commercial performance and integration. API routes into the Layer-1 bring agents directly on-chain.",
  },
] as const;

const IMPACT_FEATURES = [
  {
    title: "Markets Discover Knowledge",
    body: "Markets aggregate dispersed information. UTMMs formalise that discovery process inside consensus.",
  },
  {
    title: "Policy Becomes Programmable",
    body: "Instead of static rules, institutions evolve through verifiable selection pressure.",
  },
  {
    title: "Economic Intelligence Compounds",
    body: "Better policies persist; bad policies disappear. The system improves continuously.",
  },
] as const;

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="utmm"
        visual="feature"
        eyebrow="Solution detail"
        heading="Universal Turing Market Machines"
        headingLevel={2}
      >
        <Prose>
          <p>
            Traditional blockchains execute fixed rules. UTMMs allow market
            policy itself to evolve. Instead of hard-coding mechanisms, the
            network performs bounded search over policy space and verifies
            results cryptographically.
          </p>
        </Prose>
        <FeatureGrid items={UTMM_FEATURES} />
      </Section>

      <Section
        id="consensus"
        tone="band"
        visual="feature"
        eyebrow="Why it wins — technical"
        heading="Prime Radiant Consensus"
        headingLevel={2}
      >
        <Prose>
          <p>
            Consensus secures not only transaction ordering but the integrity
            of adaptive market evolution. Miners produce blocks while also
            participating in economic evolution.
          </p>
        </Prose>
        <FeatureGrid items={CONSENSUS_FEATURES} />
        <p className={styles.youtubeCta}>
          <LinkCta href={URL_YOUTUBE_VIDEO} external>
            Watch the overview on YouTube
          </LinkCta>
        </p>
      </Section>

      <Section
        id="impact"
        visual="feature"
        eyebrow="Why it wins — economic"
        heading="Impact"
        headingLevel={2}
      >
        <FeatureGrid items={IMPACT_FEATURES} />
      </Section>

      <Section
        id="audience"
        tone="band"
        visual="feature"
        eyebrow="Choose your path"
        heading="Where do you want to go next?"
        headingLevel={2}
      >
        <AudienceRouter />
      </Section>

      <Section
        id="evidence"
        visual="feature"
        heading="Evidence"
        headingLevel={2}
      >
        <EvidenceBlock />
      </Section>

      <Section
        id="get-started"
        tone="band"
        visual="feature"
        heading="Get started"
        headingLevel={2}
      >
        <GetStartedGrid />
      </Section>
    </>
  );
}
