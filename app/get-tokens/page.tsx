import type { Metadata } from "next";

import { GetTokensClient } from "@/components/get-tokens/GetTokensClient";
import { Accent, PageHead } from "@/components/ui/PageHead";
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
      <PageHead
        eyebrow="Get LNGX · Coming soon"
        title={
          <>
            Top up for utility, or <Accent>build</Accent> with test tokens
          </>
        }
        lead={
          <p>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
            >
              LNGX
            </span>{" "}
            is the unit you spend to transact on the network. Buy a small amount
            for everyday on-network utility, or pull a little test LNGX from
            the developer faucet if you&rsquo;re building.
            These are utility top-ups, not an investment product.
          </p>
        }
      />

      {/* ── BUY / FAUCET INTERACTIVE SECTION ── */}
      <GetTokensClient />
    </>
  );
}
