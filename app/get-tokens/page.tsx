import type { Metadata } from "next";

import { GetTokensClient } from "@/components/get-tokens/GetTokensClient";
import {
  Button,
  Card,
  LinkCta,
  Section,
} from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Get tokens | Lineage",
  },
  description:
    "Top up small amounts of LNGX for on-network utility, or request developer test tokens from the faucet.",
  alternates: {
    canonical: "/get-tokens",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Get tokens | Lineage",
    description:
      "Top up small amounts of LNGX for on-network utility, or request developer test tokens from the faucet.",
    url: `${SITE_ORIGIN}/get-tokens`,
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
    title: "Get tokens | Lineage",
    description:
      "Top up small amounts of LNGX for on-network utility, or request developer test tokens from the faucet.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function GetTokensPage() {
  return (
    <>
      {/* ── PAGE HEAD ── */}
      <Section
        visual="feature"
        eyebrow="Get LNGX"
        heading={
          <>
            Top up for utility, or{" "}
            <span style={{ color: "var(--color-accent)" }}>build</span> with
            test tokens
          </>
        }
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--fs-lead)",
            lineHeight: "var(--lh-lead)",
            maxWidth: "62ch",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
            }}
          >
            LNGX
          </span>{" "}
          is the unit you spend to transact on the network. Buy a small amount
          for everyday on-network utility, or &mdash; if you&rsquo;re building
          &mdash; pull a little test LNGX from the developer faucet. These are
          utility top-ups, not an investment product.
        </p>
      </Section>

      {/* ── BUY / FAUCET INTERACTIVE SECTION ── */}
      <Section spacing="tight">
        <GetTokensClient />
      </Section>

      {/* ── WHAT LNGX IS FOR ── */}
      <Section
        eyebrow="Utility token"
        heading="What LNGX is for"
        headingLevel={2}
        spacing="loose"
      >
        <p
          style={{
            color: "var(--color-text-muted)",
            maxWidth: "68ch",
            marginBottom: "var(--space-6)",
          }}
        >
          LNGX is the native asset of the Lineage Layer-1 &mdash; the token
          miners earn, holders carry, and applications transact in. It is a
          network utility token, not a speculative or investment product.
          Purchases here are small utility top-ups; the{" "}
          <a href="/technology#arco">ARCO</a> layer manages supply rather than a
          fixed cap.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Card rail title="Network fees">
            <p>
              Every transaction on Lineage spends a small amount of LNGX.
              Having a supply in your wallet lets you transact without friction.
            </p>
          </Card>
          <Card rail title="App transactions">
            <p>
              Lineage apps &mdash; markets, games, smart contracts &mdash;
              accept and move LNGX. Top up enough to use what you&rsquo;re
              building or testing.
            </p>
          </Card>
          <Card rail title="Developer tooling">
            <p>
              The faucet gives you test LNGX for integration work without
              spending real money. One claim per 24 hours keeps it available for
              everyone.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── CTA BAND ── */}
      <Section tone="band" spacing="loose">
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Card rail title="Read the tokenomics">
            <p>
              LNGX allocation, the phased release schedule, and how the ARCO
              layer manages effective supply &mdash; all in the tokenomics
              overview.
            </p>
            <p style={{ marginTop: "var(--space-4)" }}>
              <Button href="/tokenomics" variant="secondary">
                Tokenomics overview
              </Button>
            </p>
          </Card>
          <Card rail title="Start building">
            <p>
              Concepts, the HTTP API reference, and guides for building against
              a Layer-1 where market policy itself is programmable.
            </p>
            <p style={{ marginTop: "var(--space-4)" }}>
              <LinkCta href="/docs">Open documentation</LinkCta>
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
