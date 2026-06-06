import type { Metadata } from "next";

import { TeamGrid } from "@/components/about/TeamGrid";
import { Person } from "@/components/about/Person";
import { Button, LinkCta, Section } from "@/components/ui";
import { SITE_ORIGIN, URL_ZENODO_WHITEPAPER } from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "About | Lineage",
  },
  description:
    "The people behind the Lineage Foundation — the founders building the protocol and the advisors guiding its economic design.",
  alternates: {
    canonical: "/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About | Lineage",
    description:
      "The people behind the Lineage Foundation — the founders building the protocol and the advisors guiding its economic design.",
    url: `${SITE_ORIGIN}/about`,
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
    title: "About | Lineage",
    description:
      "The people behind the Lineage Foundation — the founders building the protocol and the advisors guiding its economic design.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

/* ─── PAGE ─────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* PAGE HEAD */}
      <Section
        visual="feature"
        eyebrow="About"
        heading={
          <>
            The people building{" "}
            <span style={{ color: "var(--color-accent)" }}>Lineage</span>
          </>
        }
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Lineage is developed by the Lineage Foundation — a small founding team
          building the protocol in the open, guided by advisors in economics and
          the science of markets. Our work is published as research and shipped
          as open source.
        </p>
      </Section>

      {/* DIRECTORS */}
      <Section
        id="directors"
        tone="band"
        eyebrow="Directors"
        heading="The directors"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Lineage&rsquo;s directors lead the protocol, its economic model, and
          its path to a fully distributed network.
        </p>
        <TeamGrid>
          <Person
            name="Andrew Kessler"
            role="Co-founder · Director"
            photo="/team/andrew-kessler.jpg"
            monogram="AK"
            linkedIn="https://www.linkedin.com/in/novosapien/"
            bio="A cryptographic generalist and serial deep-tech entrepreneur, Andrew has founded ventures across semiconductors, biometrics, and digital identity. He leads the cryptography and protocol design behind Lineage’s verifiable, two-way transaction model."
          />
          <Person
            name="Barry Botha"
            role="Co-founder · Director"
            photo="/team/barry-botha.jpg"
            monogram="BB"
            linkedIn="https://www.linkedin.com/in/barry-botha/"
            bio={
              <>
                Founder and CEO of{" "}
                <a
                  href="https://hydracorp.ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HydraCorp
                </a>{" "}
                and{" "}
                <a
                  href="https://io.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IO
                </a>
                , Barry leads operations and go-to-market for Lineage. He
                focuses on turning Smart Markets into real-world infrastructure
                for sectors such as agriculture, green energy, and commodities.
              </>
            }
          />
          <Person
            name="Sabrina Wollenschläger"
            role="Director"
            photo="/team/sabrina-wollenschlager.jpg"
            monogram="SW"
            linkedIn="https://www.linkedin.com/in/sabrinawllsg/"
            bio={
              <>
                Deeply engaged in the DLT space for over nine years, Sabrina is
                Co-Managing Director of Blockchain Zug &mdash; the joint
                research hub at Lucerne University of Applied Sciences and Arts
                (HSLU) &mdash; and a Senior Research Associate in its Computer
                Science &amp; Information Technology department. She also serves
                as a Council Member of the Ethereum Switzerland Association.
              </>
            }
          />
          <Person
            name="Mervyn Eagles"
            role="Co-founder · Non-Executive Director"
            photo="/team/mervyn-eagles.jpg"
            monogram="ME"
            linkedIn="https://www.linkedin.com/in/mervyn-eagles-b341a12b0/"
            bio="A co-founder of Lineage, Mervyn serves in a non-executive capacity — supporting the Foundation’s strategy and its path from genesis toward a fully decentralized network of Smart Markets."
          />
        </TeamGrid>
      </Section>

      {/* ADVISORS */}
      <Section
        id="advisors"
        eyebrow="Advisors"
        heading="Advisory"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Lineage&rsquo;s economic and market design is guided by advisors with
          deep roots in economics and the science of complex financial systems.
        </p>
        <TeamGrid variant="2">
          <Person
            name="Allan Mendelowitz"
            role="Advisor · Economics"
            photo="/team/allan-mendelowitz.jpg"
            monogram="AM"
            linkedIn="https://www.linkedin.com/in/allan-mendelowitz-a2276b7/"
            bio="President of the ACTUS Financial Research Foundation, Allan champions open algorithmic standards for financial contracts. A former Chairman of the U.S. Federal Housing Finance Board and co-founder of the initiative to establish a National Institute of Finance, he advises Lineage on financial-system design and market transparency."
          />
          <Person
            name="Claudio Tessone"
            role="Advisor · Cryptoeconomics"
            photo="/team/claudio-tessone.jpg"
            monogram="CT"
            linkedIn="https://www.linkedin.com/in/claudiotessone/"
            bio="Professor of Blockchain and Distributed Ledger Technologies at the University of Zurich and co-founder and Chairman of the UZH Blockchain Center, Claudio studies blockchains as complex socio-economic systems — consensus, cryptoeconomics, and token-economy design. He advises Lineage on the incentive design behind Smart Markets."
          />
        </TeamGrid>
      </Section>

      {/* CTA BAND */}
      <Section
        id="cta"
        tone="band"
        eyebrow="Go deeper"
        heading="Read the work, not the pitch"
        headingLevel={2}
        containerWidth="narrow"
      >
        <p className={styles.sectionProse}>
          The clearest picture of Lineage is in the research and the roadmap.
          Both are public. For partnerships, press, or general enquiries, reach
          us at{" "}
          <a href="mailto:contact@lineage.foundation" className={styles.inlineLink}>
            contact@lineage.foundation
          </a>
          .
        </p>
        <div className={styles.ctaActions}>
          <Button href={URL_ZENODO_WHITEPAPER} variant="primary" external>
            Read the whitepaper
          </Button>
          <Button href="/roadmap" variant="secondary">
            View the roadmap
          </Button>
          <LinkCta href="/research" muted>
            Research library
          </LinkCta>
        </div>
      </Section>
    </>
  );
}
