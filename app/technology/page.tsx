import type { Metadata } from "next";

import { ArcoLearnDynamic } from "@/components/arco/ArcoLearnDynamic";
import { Prose, Section } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/constants";

import "./arco.css";
import "./arco-responsive.css";

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
        eyebrow="Technology — interactive"
        heading="ARCO: the compute loop"
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <Prose>
          <p>
            A single step of the Lineage loop: sensor, relay, compute, actuator,
            event. Click any node to walk through the logic; press Run to step
            through the sequence and see market state evolve in the graphs
            below.
          </p>
        </Prose>
      </Section>

      <ArcoLearnDynamic />
    </>
  );
}
