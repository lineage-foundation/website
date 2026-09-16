# Website & docs update: social, team, MCP, brand kit

**Date:** 2026-09-16
**Status:** Approved design, pending implementation plan

## Why

Five related updates to the marketing site and its docs:

1. Publish our **Discord** and **X** so people can reach the community.
2. **Re-activate Claudio Tessone** as an adviser (he was gated behind a
   "coming soon" flag).
3. Add **Jesse Benton** to the team as a new **Member**.
4. The **MCP server is live** at `https://mcp.lineage.to` — stop calling it
   "coming soon."
5. Offer a downloadable **brand kit** for both humans and AI.

## Current state (reference)

- **Outbound URLs** live in `lib/constants.ts` (`URL_*` convention). No
  Discord, X/Twitter, or MCP constant exists today. `SITE_ORIGIN =
  "https://lineage.foundation"`.
- **Social links** render only in `components/SiteFooter.tsx` "Community"
  column (GitHub, Fremen Forum, YouTube) as plain
  `<a rel="noopener noreferrer" target="_blank">`. Ecosystem and Developers
  pages surface the Fremen Forum as cards. No Discord/X anywhere.
- **Twitter metadata**: every page sets only `twitter.card`; no `site`/
  `creator` handle anywhere (`app/layout.tsx` is the site-wide default).
- **Team**: hardcoded `<Person>` JSX in `app/about/page.tsx`, split into two
  `<Section>`s — Directors (`<TeamGrid>`, 3-col) and Advisors
  (`<TeamGrid variant="2">`, 2-col). No data file. `Person` props
  (`components/about/Person.tsx`): `name`, `role`, `bio: ReactNode`,
  `photo?` (`/team/<first>-<last>.jpg`), `monogram` (required),
  `linkedIn` (**currently required**), `comingSoon?`. `comingSoon` dims +
  grayscales the card, shows a "Coming soon" badge, and hides LinkedIn.
  Claudio Tessone is an Advisor with `comingSoon` set; his photo exists at
  `public/team/claudio-tessone.jpg`.
- **MCP**: `app/ecosystem/page.tsx` "Tooling & apps" section has an MCP card
  with hardcoded `https://mcp.lineage.to` inside a plain `<span
  className={styles.endpointUrl}>` and a `<Tag status="soon">Coming soon
  </Tag>`. The `Tag` component (`components/ui/Tag.tsx`) supports
  `status: "live" | "soon"`. The section intro prose says an MCP server is
  "on the way." No MCP mention on developers/docs.
- **Brand assets**: `public/brand/` holds 5 hand-authored SVGs —
  `lineage-mark.svg` (primary), `lineage-mark-mono.svg` (mono knockout),
  `lineage-icon.svg` (plated app icon), `lineage-icon-min.svg` (16px glyph),
  `favicon.svg`. `public/images/` holds `open-graph-lineage-1200x630.png`
  and favicon PNGs (`lineage-favicon-16x16/32x32/48x48/180x180/192x192.png`).
  Brand tokens (oklch) are the single source of truth in `app/globals.css`
  `:root`; brand docs live in `docs/brand-system.md` and
  `docs/design-system/{DESIGN,brand-mark,components}.md`. Fonts load via
  `next/font/google` (Space Grotesk, Inter, JetBrains Mono) — no committed
  binaries. **No hex swatches are written down anywhere** (docs are oklch).
  There is no `/brand` route and no zip/pdf downloads. Static files under
  `public/` are served at the site root; the download pattern to copy is the
  OpenAPI JSON: `public/openapi.json` linked via `<Button href="/openapi.json">`.
- Verify commands: `npm run build -- --webpack` (plain `npm run build` fails
  on this darwin/arm64 sandbox — Turbopack native bindings missing) and
  `npm run lint`. No unit-test harness for these UI files.

## Global constraints

- Use CSS variables from `app/globals.css`; no new raw hex in stylesheets.
  (The brand kit's static `brand.json`/`guidelines.md` files and the build
  script that derives sRGB hex are outside stylesheets and may contain hex.)
- Follow existing patterns: social links as `<a target="_blank"
  rel="noopener noreferrer">`; URL constants as `URL_*` in `lib/constants.ts`;
  downloads as `<Button href="/…">` root-relative like the OpenAPI download.
- Fremen Forum copy rule stays: user-facing label is "Fremen Forum", not
  "Discourse".
- Do not touch unrelated roadmap/tokenomics/technology copy.
- Exact external values, verbatim:
  - Discord: `https://discord.gg/5cwn7jZ7G`
  - X: `https://x.com/lineagefndn` (handle `@lineagefndn`)
  - MCP: `https://mcp.lineage.to`

## Changes

### Item 1 — Discord + X social links

- `lib/constants.ts`: add `URL_DISCORD = "https://discord.gg/5cwn7jZ7G"` and
  `URL_X = "https://x.com/lineagefndn"` (with a short JSDoc noting the
  user-facing label is "X").
- `components/SiteFooter.tsx` "Community" column: add two `<li>` items —
  **Discord** → `URL_DISCORD`, **X** → `URL_X` — same `<a>` pattern as the
  existing GitHub/YouTube entries.
- `app/ecosystem/page.tsx` "Community" section: add Discord and X entries
  following the existing community link/card pattern in that section.
- `app/developers/page.tsx` "Have questions?" section: add a **Discord** card
  (community chat) alongside the Fremen Forum and Issue-trackers cards,
  matching the existing `Card` + `LinkCta` pattern (grid may need to hold a
  third card).
- `app/layout.tsx`: set `twitter.site` and `twitter.creator` to
  `"@lineagefndn"` in the site-wide metadata default.

### Item 2 — Re-activate Claudio

- `app/about/page.tsx`: remove the `comingSoon` prop from the Claudio Tessone
  `<Person>`. No other change; his photo and LinkedIn are already present.

### Item 3 — Jesse Benton (new Members section)

- `components/about/Person.tsx`: make `linkedIn?` and `photo?` optional. When
  `linkedIn` is absent, render no LinkedIn link (reuse the existing
  "suppressed link" path used for `comingSoon`, or guard the link block on
  `linkedIn` being truthy). No visual change for existing people (all have
  LinkedIn).
- `app/about/page.tsx`: add a new `<Section id="members">` **between** the
  Directors and Advisors sections, with `eyebrow="Members"`,
  `heading="Members"`, an intro `<p className={styles.sectionProse}>`, and a
  `<TeamGrid variant="2">` containing:
  ```
  <Person
    name="Jesse Benton"
    role="Member"
    monogram="JB"
    bio="Jesse is passionate about decentralization and was member of the original Bitcoin Center NYC, the first live crypto trading floor, and an advisor to the ZAP Protocol. He was also campaign manager for Ron Paul, Senator Rand Paul and Senate Leader Mitch McConnell."
  />
  ```
  No `photo` (→ "JB" monogram fallback), no `linkedIn`.

### Item 4 — MCP server live

- `lib/constants.ts`: add `URL_MCP_SERVER = "https://mcp.lineage.to"`.
- `app/ecosystem/page.tsx` MCP card: change `<Tag status="soon">Coming soon
  </Tag>` → `<Tag status="live">Live</Tag>`; turn the hardcoded URL span into
  an anchor to `URL_MCP_SERVER`; use `URL_MCP_SERVER` rather than an inline
  string. Update the section intro prose so the MCP server is described as
  available now (not "on the way"); LLM agent skills stay "on the way" if
  still unshipped.
- `app/developers/page.tsx`: surface MCP as a card/link (e.g. a fourth "way
  in" or alongside the SDKs) pointing to `URL_MCP_SERVER`, briefly describing
  it as a hosted Model Context Protocol endpoint for AI agents.
- `app/docs/page.tsx`: add a short "MCP server" subsection (or a clearly
  labelled entry under the SDKs/API area) with the endpoint URL and one-line
  description; add it to the page TOC if the TOC enumerates sections.

### Item 5 — Brand kit (`/brand` page + zip + AI file)

**New static files under `public/brand/`:**
- `brand.json` — machine-readable tokens: brand colors (each as `oklch` and
  derived `hex`), typography (families + Google Fonts URLs + roles), logo
  asset inventory (filenames + intended use), and links. Consumed by AI and
  by the page.
- `guidelines.md` — human/AI-readable usage guide distilled from
  `docs/brand-system.md` + `docs/design-system/brand-mark.md`: the Clearing
  Cross mark variants and when to use each, clear-space/minimum-size,
  color grammar (cyan = interaction, emerald = action), do/don't, wordmark
  pairing (Space Grotesk 600, −0.02em).
- `lineage-brand-kit.zip` — the downloadable archive containing: the 5 logo
  SVGs, the OG image + favicon PNGs, `guidelines.md`, and `brand.json`.

**Hex derivation:** a small committed build script (e.g.
`scripts/derive-brand-hex.mjs`, plain Node, no new deps) converts the oklch
tokens from `globals.css` to sRGB hex for `brand.json` and the swatches. It is
run once at authoring time to produce the values baked into `brand.json`;
values are committed, not computed at runtime.

**New route `app/brand/page.tsx`** (+ `page.module.css`), following existing
`PageHead`/`Section`/`Card`/`Button`/`LinkCta` patterns and tokens:
- PageHead ("Brand" / short lead) with a primary
  `<Button href="/brand/lineage-brand-kit.zip">Download brand kit</Button>`.
- Logo section: render each of the 5 marks with a per-file
  `<Button href="/brand/<file>.svg" download>` (or `<a download>`), on
  appropriate light/dark tiles per the mark's intended use.
- Colors section: swatches from `brand.json`, each showing token name, oklch,
  and hex.
- Typography section: the three families with roles and Google Fonts links.
- Usage section: the do/don't essentials, linking to `guidelines.md` and the
  full brand docs.
- "For AI/developers": links to `/brand/brand.json` and `/brand/guidelines.md`.
- Standard `metadata` block (canonical `/brand`, OG image, robots
  index/follow), matching sibling pages.

**Discoverability:** add a **"Brand kit"** link to `components/SiteFooter.tsx`
in the **Resources** column (internal `next/link` to `/brand`).

Route note: the App-Router page at `/brand` and the static files at
`/brand/<file>` do not collide (page path vs sub-paths).

## Verification

- `npm run build -- --webpack` succeeds; `npm run lint` clean (pre-existing
  unrelated `design-prototype` warning excepted).
- Live render check (dev server, `--webpack`): footer shows Discord + X;
  `/about` shows Claudio in full color (LinkedIn visible, no badge) and a new
  "Members" section with Jesse (initials, no LinkedIn); `/ecosystem` MCP card
  reads Live and links out; `/developers` and `/docs` reference MCP;
  `/brand` renders with working downloads; `/brand/lineage-brand-kit.zip`,
  `/brand/brand.json`, `/brand/guidelines.md` all fetch 200.
- The zip opens and contains the listed files.
- Grep: `URL_DISCORD`, `URL_X`, `URL_MCP_SERVER` used from `lib/constants.ts`
  (not hardcoded) at their render sites.
