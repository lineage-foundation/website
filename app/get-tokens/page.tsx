import type { Metadata } from "next";

import { GetTokensClient } from "@/components/get-tokens/GetTokensClient";
import { Accent, PageHead } from "@/components/ui/PageHead";
import { SITE_ORIGIN, TWITTER_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Developer faucet | Lineage",
  },
  description:
    "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
  alternates: {
    canonical: "/get-tokens",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Developer faucet | Lineage",
    description:
      "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
    url: `${SITE_ORIGIN}/get-tokens`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-v2-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage logo",
      },
    ],
  },
  twitter: {
    ...TWITTER_META,
    title: "Developer faucet | Lineage",
    description:
      "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
    images: ["/images/open-graph-lineage-v2-1200x630.png"],
  },
};

export default function GetTokensPage() {
  return (
    <>
      {/* ── PAGE HEAD ── */}
      <PageHead
        eyebrow="Developer faucet · Coming soon"
        title={
          <>
            <Accent>Build</Accent> with test LNGX
          </>
        }
        lead={
          <p>
            Pull a small amount of test{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
            >
              LNGX
            </span>{" "}
            from the developer faucet to exercise transactions, items, and
            contract calls while you build and integrate against the network.
          </p>
        }
      />

      {/* ── FAUCET INTERACTIVE SECTION ── */}
      <GetTokensClient />
    </>
  );
}
