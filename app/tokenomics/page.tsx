import type { Metadata } from "next";

import { TokenomicsChart } from "@/components/tokenomics/TokenomicsChart";
import { Prose, Section } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Tokenomics | Lineage",
  },
  description:
    "Interactive token allocation model — Lineage Foundation tokenomics.",
  alternates: {
    canonical: "/tokenomics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tokenomics | Lineage",
    description: "Interactive token allocation model.",
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
    description: "Interactive token allocation model.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function TokenomicsPage() {
  return (
    <>
      <Section
        visual="feature"
        eyebrow="Economics"
        heading="Tokenomics"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            Token allocation, release schedule, and market demand modelled
            interactively. Click a phase or category in the timeline to see
            how each slice evolves across the distribution.
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
