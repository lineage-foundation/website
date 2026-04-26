import type { Metadata } from "next";
import Link from "next/link";

import { TokenomicsChart } from "@/components/tokenomics/TokenomicsChart";
import { Prose, Section } from "@/components/ui";
import { SITE_ORIGIN, URL_ZENODO_WHITEPAPER } from "@/lib/constants";
import { ZENODO_P2P_ELECTRONIC_CASH } from "@/lib/research-zenodo";

export const metadata: Metadata = {
  title: {
    absolute: "Tokenomics | Lineage",
  },
  description:
    "Token allocation, dynamic supply via ARCO, and interactive distribution model — Lineage Foundation tokenomics.",
  alternates: {
    canonical: "/tokenomics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tokenomics | Lineage",
    description: "Token allocation, ARCO, and the distribution model.",
    url: `${SITE_ORIGIN}/tokenomics`,
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
    title: "Tokenomics | Lineage",
    description: "Token allocation, ARCO, and the distribution model.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function TokenomicsPage() {
  return (
    <>
      <Section
        visual="feature"
        heading="Tokenomics"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            Token allocation, release schedule, and market demand modelled
            interactively. Click a phase or category in the timeline to see
            how each slice evolves across the distribution. Below we summarize
            how supply fits into the wider economic design and ARCO layer.
          </p>
          <p>
            <strong>LNGX</strong> is the network&rsquo;s unit of value. The
            economic stack is described as{" "}
            <strong>FIAT Replacement Technology (FReT)</strong>—pairing the
            phased allocation you explore in the chart with the ARCO
            layer&rsquo;s ability to adjust effective supply over time. The
            full specification is in{" "}
            <a
              href={URL_ZENODO_WHITEPAPER}
              rel="noopener noreferrer"
              target="_blank"
            >
              Lineage: The Living Economy
            </a>{" "}
            on Zenodo.
          </p>
        </Prose>
      </Section>

      <Section
        eyebrow="Economic model"
        heading="Dynamic supply and ARCO"
        headingLevel={2}
        spacing="loose"
      >
        <Prose>
          <p>
            Lineage tokenomics are not only a fixed release calendar: the
            protocol is designed so that <strong>effective supply and
            circulation</strong> can be <strong>adjusted over time</strong> in
            response to demand and on-chain state. That coordination runs
            through the same{" "}
            <Link href="/technology">ARCO (adaptive resource-coordinated)
            loop</Link> you see on the Technology page—sensor, relay, compute,
            actuator—so economic parameters, where the rules allow, are part
            of the closed loop instead of a separate, manual governance
            afterthought.
          </p>
          <p>
            The design goals for that approach are set out in the working
            paper{" "}
            <a
              href={ZENODO_P2P_ELECTRONIC_CASH.href}
              rel="noopener noreferrer"
            >
              {ZENODO_P2P_ELECTRONIC_CASH.title}
            </a>{" "}
            (Andrew Kessler,{" "}
            {ZENODO_P2P_ELECTRONIC_CASH.datePublished}, Zenodo), which revisits
            peer-to-peer electronic cash to aim for <strong>low
            volatility</strong> <strong>without</strong> relying on external
            collateral or game-theoretic levers. Lineage encodes that stance
            in on-chain policy and <strong>ARCO-driven</strong> adjustment
            rather than off-chain promise alone.
          </p>
          <p>
            The chart below is still the place to explore{" "}
            <strong>allocation phases</strong> and how each category&apos;s
            share moves through the schedule; the paper and ARCO layer
            describe the <strong>macro model</strong> in which that schedule
            operates.
          </p>
        </Prose>
      </Section>

      <Section
        tone="band"
        spacing="tight"
        containerWidth="narrow"
      >
        <TokenomicsChart />
      </Section>
    </>
  );
}
