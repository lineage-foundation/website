import type { Metadata } from "next";

import { ArcoSimulatorDynamic } from "@/components/arco-sim/ArcoSimulatorDynamic";
import { Prose, Section } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Technology | Lineage",
  },
  description:
    "Interactive ARCO flow — sensor, relay, compute, actuator, and market optimization.",
  alternates: {
    canonical: "/technology",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Technology | Lineage",
    description: "Interactive ARCO flow and market state visualization.",
    url: `${SITE_ORIGIN}/technology`,
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
    title: "Technology | Lineage",
    description: "Interactive ARCO flow and market state visualization.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function TechnologyPage() {
  return (
    <>
      <Section
        visual="feature"
        heading="ARCO: the compute loop"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            A single step of the Lineage loop: sensor, relay, compute, actuator,
            event. Press Run to advance through the sequence and watch market
            state evolve across three iterations — from initial to fully
            optimized.
          </p>
        </Prose>
      </Section>

      <ArcoSimulatorDynamic />
    </>
  );
}
