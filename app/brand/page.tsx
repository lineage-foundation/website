import type { Metadata } from "next";

import { Accent, Button, Card, LinkCta, PageHead, Section } from "@/components/ui";
import { SITE_ORIGIN, TWITTER_META } from "@/lib/constants";
import brandKit from "@/public/brand/brand.json";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "Download the Lineage brand kit: logo marks, colour and type tokens, and usage guidelines for people and AI.",
  alternates: { canonical: "/brand" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Brand | Lineage",
    description:
      "Download the Lineage brand kit: logo marks, colour and type tokens, and usage guidelines for people and AI.",
    url: `${SITE_ORIGIN}/brand`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-v2-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage Foundation",
      },
    ],
  },
  twitter: {
    ...TWITTER_META,
    title: "Brand | Lineage",
    description:
      "Download the Lineage brand kit: logo marks, colour and type tokens, and usage guidelines for people and AI.",
    images: ["/images/open-graph-lineage-v2-1200x630.png"],
  },
};

export default function BrandPage() {
  return (
    <>
      <PageHead
        eyebrow="Brand kit"
        title={
          <>
            The Lineage <Accent>brand</Accent>
          </>
        }
        lead="Logo marks, colour and type tokens, and usage guidelines — for people and for AI. Download the full kit, grab individual assets, or read the machine-readable tokens."
        actions={
          <div className={styles.headActions}>
            <Button href="/brand/lineage-brand-kit.zip" variant="primary">
              Download brand kit
            </Button>
            <LinkCta href="/brand/brand.json">brand.json</LinkCta>
            <LinkCta href="/brand/guidelines.md">guidelines.md</LinkCta>
          </div>
        }
      />

      {/* LOGO MARKS */}
      <Section tone="band" eyebrow="Logo" heading="The Clearing Cross">
        <p className={styles.sectionProse}>
          Two tapered blades — cyan over emerald — meeting at an open centre.
          Pair the glyph with the &ldquo;Lineage&rdquo; wordmark in Space
          Grotesk. Use the primary mark at 24px and above.
        </p>
        <div className={styles.logoGrid}>
          {brandKit.logos.map((logo) => (
            <Card key={logo.file} rail title={logo.file}>
              <span className={styles.logoTile}>
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG brand marks are downloadable static assets, not photos to optimize */}
                <img src={`/brand/${logo.file}`} alt={`Lineage mark — ${logo.use}`} className={styles.logoImg} />
              </span>
              <p className={styles.logoUse}>{logo.use}</p>
              <div className={styles.cardCta}>
                <a href={`/brand/${logo.file}`} download className={styles.download}>
                  Download SVG
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* COLOUR */}
      <Section eyebrow="Colour" heading="Palette">
        <p className={styles.sectionProse}>
          A dark-only system: emerald is action (rationed), cyan is interaction.
          OKLCH is the source of truth; sRGB hex is derived for convenience.
        </p>
        <div className={styles.swatchGrid}>
          {brandKit.colors.map((c) => (
            <div key={c.token} className={styles.swatch}>
              <span
                className={styles.swatchChip}
                style={{ background: c.hex }}
                aria-hidden="true"
              />
              <div className={styles.swatchMeta}>
                <span className={styles.swatchRole}>{c.role}</span>
                <code className={styles.swatchVal}>{c.hex}</code>
                <code className={styles.swatchVal}>{c.oklch}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section tone="band" eyebrow="Typography" heading="Type">
        <div className={styles.typeGrid}>
          {[brandKit.typography.display, brandKit.typography.body, brandKit.typography.mono].map(
            (t) => (
              <Card key={t.family} rail kicker={t.role} title={t.family}>
                <p>Weights: {t.weights.join(", ")}</p>
                <div className={styles.cardCta}>
                  <LinkCta href={t.url}>Google Fonts</LinkCta>
                </div>
              </Card>
            ),
          )}
        </div>
      </Section>

      {/* USAGE / AI */}
      <Section eyebrow="Usage" heading="Using the brand">
        <p className={styles.sectionProse}>
          Keep the emerald/cyan duotone and the blade taper; give the mark clear
          space of at least one blade height; never set the wordmark in the body
          typeface. Full rules are in the guidelines, and the complete brand
          system lives in the design docs.
        </p>
        <div className={styles.cardCta}>
          <LinkCta href="/brand/guidelines.md">Read the guidelines</LinkCta>
          <LinkCta href="/brand/brand.json">Machine-readable tokens</LinkCta>
        </div>
      </Section>
    </>
  );
}
