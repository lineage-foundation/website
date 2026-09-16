# Website & docs update (social, team, MCP, brand kit) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Discord + X, re-activate adviser Claudio, add member Jesse Benton, mark the MCP server live, and ship a downloadable brand kit (page + zip + AI-readable files).

**Architecture:** A Next.js (App Router) marketing site. Outbound links are `URL_*` constants in `lib/constants.ts`; social links render as `<a target="_blank" rel="noopener noreferrer">`; team is hardcoded `<Person>` JSX in `app/about/page.tsx`; downloads are root-relative files under `public/` linked via `<Button href="/…">`. Each of the 5 items is an independent task with its own commit.

**Tech Stack:** Next.js 16, React, TypeScript, CSS Modules, plain-Node build script for hex derivation, `zip` CLI for the archive.

## Global Constraints

- Verify per task (no unit-test harness for these UI files): `npm run build -- --webpack` succeeds (plain `npm run build` fails on this darwin/arm64 sandbox — Turbopack native bindings missing) AND `npm run lint` is clean (one pre-existing unrelated warning in `design-prototype/js/lineage.js` is acceptable). This replaces TDD.
- No new raw hex in **stylesheets**; use `app/globals.css` CSS variables. (The static `public/brand/brand.json`, `public/brand/guidelines.md`, and `scripts/derive-brand-hex.mjs` are not stylesheets and legitimately contain hex.)
- New outbound URLs go in `lib/constants.ts` as `URL_*` and are consumed by reference, never hardcoded at the render site.
- Fremen Forum copy rule: user-facing label is "Fremen Forum" (not "Discourse").
- Exact external values, verbatim:
  - Discord: `https://discord.gg/5cwn7jZ7G`
  - X: `https://x.com/lineagefndn` (handle `@lineagefndn`)
  - MCP: `https://mcp.lineage.to`
- Do not touch unrelated roadmap/tokenomics/technology copy.
- Commit after each task. Commit trailer for every commit:
  ```
  Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV
  ```

---

### Task 1: Discord + X social links (+ Twitter meta)

**Files:**
- Modify: `lib/constants.ts`
- Modify: `components/SiteFooter.tsx`
- Modify: `app/ecosystem/page.tsx` (Community section, ~L165-213)
- Modify: `app/developers/page.tsx` (Have questions? section, ~L242-273)
- Modify: `app/layout.tsx` (twitter metadata, ~L57-59)

**Interfaces:**
- Produces: `URL_DISCORD`, `URL_X` exports in `lib/constants.ts` (consumed by MCP task? no — only here).

- [ ] **Step 1: Add constants**

In `lib/constants.ts`, after the `URL_YOUTUBE_VIDEO` block (line 13), add:

```ts
/** Community chat. User-facing label: "Discord". */
export const URL_DISCORD = "https://discord.gg/5cwn7jZ7G";

/** Social. User-facing label: "X"; handle @lineagefndn. */
export const URL_X = "https://x.com/lineagefndn";
```

- [ ] **Step 2: Footer — add Discord + X to the Community column**

In `components/SiteFooter.tsx`, add `URL_DISCORD, URL_X` to the import from `@/lib/constants` (keep alphabetical-ish with the others). Then in the "Community" `<ul>` (after the YouTube `<li>` that ends at line 101), add:

```tsx
              <li>
                <a
                  href={URL_DISCORD}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Discord
                </a>
              </li>
              <li>
                <a href={URL_X} rel="noopener noreferrer" target="_blank">
                  X
                </a>
              </li>
```

- [ ] **Step 3: Ecosystem Community section — add Discord + X cards**

In `app/ecosystem/page.tsx`, add `URL_DISCORD, URL_X` to the `@/lib/constants` import. In the "Community" section's `<div className={styles.grid2}>` (the block that currently holds the "Fremen Forum" and "GitHub organisation" cards, closing at ~L212), append two more `<Card>`s after the GitHub organisation card:

```tsx
          <Card
            rail
            title="Discord"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M8 8.5a13 13 0 0 1 8 0M7.5 16a13 13 0 0 0 9 0M9 12h.01M15 12h.01M8 7l-.5-1M16 7l.5-1M6 8c-1.5 3-1.5 6-1 9 1.2 1 2.6 1.6 4 2l.8-1.6M18 8c1.5 3 1.5 6 1 9-1.2 1-2.6 1.6-4 2l-.8-1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            <p>
              Real-time community chat: questions, building, and coordination
              with the Lineage community.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_DISCORD}>Join the Discord</LinkCta>
            </div>
          </Card>

          <Card
            rail
            title="X"
            icon={
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="22" height="22">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
          >
            <p>
              Announcements and updates from the Lineage Foundation.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_X}>Follow @lineagefndn</LinkCta>
            </div>
          </Card>
```

(The grid holds 4 cards in its 2-column layout — no CSS change needed; `grid2` wraps.)

- [ ] **Step 4: Developers "Have questions?" — add a Discord card**

In `app/developers/page.tsx`, add `URL_DISCORD` to the `@/lib/constants` import. In the "Have questions?" section's `<div className={styles.grid2}>` (holds "Fremen Forum" + "Issue trackers", closing ~L271), append after the Issue-trackers card:

```tsx
          <Card rail title="Discord">
            <p>
              Real-time chat with the community and the team for build questions
              and quick help.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_DISCORD}>Join the Discord</LinkCta>
            </div>
          </Card>
```

- [ ] **Step 5: Twitter metadata handle**

In `app/layout.tsx`, replace the `twitter` block (lines ~57-59):

```tsx
  twitter: {
    card: "summary_large_image",
  },
```

with:

```tsx
  twitter: {
    card: "summary_large_image",
    site: "@lineagefndn",
    creator: "@lineagefndn",
  },
```

- [ ] **Step 6: Build, lint, verify**

Run: `npm run build -- --webpack && npm run lint`
Expected: build succeeds; lint clean.
Then: `grep -rn "URL_DISCORD\|URL_X" components app lib` — expect the constants defined once and referenced in footer, ecosystem, developers (URL_DISCORD) and footer, ecosystem (URL_X). Confirm no hardcoded `discord.gg` or `x.com/lineagefndn` at render sites: `grep -rn "discord.gg\|x.com/lineagefndn" app components | grep -v lib/constants.ts` → expect no output.

- [ ] **Step 7: Commit**

```bash
git add lib/constants.ts components/SiteFooter.tsx app/ecosystem/page.tsx app/developers/page.tsx app/layout.tsx
git commit -m "$(printf '%s\n' 'feat(site): add Discord and X links + Twitter handle' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 2: About page — reactivate Claudio, add Members section (Jesse), optional Person fields

**Files:**
- Modify: `components/about/Person.tsx`
- Modify: `app/about/page.tsx`

**Interfaces:**
- Produces: `Person` accepts optional `linkedIn?` and `photo?`; renders no LinkedIn link when `linkedIn` is absent.

- [ ] **Step 1: Make `linkedIn` and `photo` optional on Person**

In `components/about/Person.tsx`, change the type (line 12) from `linkedIn: string;` to `linkedIn?: string;` (`photo?` is already optional). Then change the LinkedIn render guard (lines 68-81) so the link only renders when a `linkedIn` value is present AND not coming-soon. Replace:

```tsx
      {comingSoon ? null : (
        <a
          className={styles.link}
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
          LinkedIn{" "}
          <span aria-hidden="true" className={styles.arrow}>
            &rarr;
          </span>
        </a>
      )}
```

with:

```tsx
      {comingSoon || !linkedIn ? null : (
        <a
          className={styles.link}
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
          LinkedIn{" "}
          <span aria-hidden="true" className={styles.arrow}>
            &rarr;
          </span>
        </a>
      )}
```

- [ ] **Step 2: Reactivate Claudio**

In `app/about/page.tsx`, in the Claudio Tessone `<Person>` (advisors section), delete the single line:

```tsx
            comingSoon
```

(Leaves his photo, role, LinkedIn, and bio intact — card renders in full color with the LinkedIn link and no badge.)

- [ ] **Step 3: Add the Members section with Jesse Benton**

In `app/about/page.tsx`, insert a new `<Section>` **between** the closing `</Section>` of DIRECTORS (line ~123) and the `{/* ADVISORS */}` comment (line ~125):

```tsx
      {/* MEMBERS */}
      <Section
        id="members"
        eyebrow="Members"
        heading="Members"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Members bring deep networks and hard-won experience across
          decentralization, markets, and public life.
        </p>
        <TeamGrid variant="2">
          <Person
            name="Jesse Benton"
            role="Member"
            monogram="JB"
            bio="Jesse is passionate about decentralization and was member of the original Bitcoin Center NYC, the first live crypto trading floor, and an advisor to the ZAP Protocol. He was also campaign manager for Ron Paul, Senator Rand Paul and Senate Leader Mitch McConnell."
          />
        </TeamGrid>
      </Section>
```

(No `photo` → "JB" monogram fallback; no `linkedIn` → no LinkedIn link. `Section`, `TeamGrid`, `Person`, and `styles` are already imported in this file.)

- [ ] **Step 4: Build, lint, verify**

Run: `npm run build -- --webpack && npm run lint`
Expected: build succeeds; lint clean.
Then: `grep -n "comingSoon" app/about/page.tsx` → expect **no output** (Claudio's was the only one). `grep -n "Jesse Benton\|id=\"members\"" app/about/page.tsx` → expect the new section + person.

- [ ] **Step 5: Commit**

```bash
git add components/about/Person.tsx app/about/page.tsx
git commit -m "$(printf '%s\n' 'feat(about): reactivate Claudio; add Members section with Jesse Benton' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 3: MCP server live

**Files:**
- Modify: `lib/constants.ts`
- Modify: `app/ecosystem/page.tsx` (intro prose ~L220-224; MCP card ~L272-291)
- Modify: `app/developers/page.tsx` (add an MCP card near SDKs / ways-in)
- Modify: `app/docs/page.tsx` (TOC ~L96-99 + a new MCP article after `#api-reference` ~L304)

**Interfaces:**
- Produces: `URL_MCP_SERVER` export in `lib/constants.ts`.

- [ ] **Step 1: Add constant**

In `lib/constants.ts`, after the `DOCS_MINER_API_ORIGIN` line (88) add:

```ts
/** Hosted Model Context Protocol endpoint for AI agents. */
export const URL_MCP_SERVER = "https://mcp.lineage.to";
```

- [ ] **Step 2: Ecosystem — flip the MCP card to live + fix intro prose**

In `app/ecosystem/page.tsx`, add `URL_MCP_SERVER` to the `@/lib/constants` import.

Replace the intro prose (lines ~220-224):

```tsx
        <p className={styles.sectionProse}>
          Client SDKs are published and ready to use today. An MCP server and
          LLM agent skills are on the way, listed here with what they&apos;ll
          expose, marked clearly until they ship.
        </p>
```

with:

```tsx
        <p className={styles.sectionProse}>
          Client SDKs and a hosted MCP server are live today. LLM agent skills
          are on the way, listed here with what they expose, marked clearly
          until they ship.
        </p>
```

Then in the MCP card, replace:

```tsx
            <span className={styles.endpointUrl}>https://mcp.lineage.to</span>
            <Tag status="soon">Coming soon</Tag>
```

with:

```tsx
            <a
              className={styles.endpointUrl}
              href={URL_MCP_SERVER}
              rel="noopener noreferrer"
              target="_blank"
            >
              {URL_MCP_SERVER.replace("https://", "")}
            </a>
            <Tag status="live">Live</Tag>
```

Also update the card's comment `{/* 2 — MCP server (coming soon) */}` → `{/* 2 — MCP server (live) */}`.

- [ ] **Step 3: Developers — add an MCP card**

In `app/developers/page.tsx`, add `URL_MCP_SERVER` to the `@/lib/constants` import. Immediately after the SDKS grid `</div>` and before the `</Section>` that closes the "Official SDKs" section (SDKS section ends ~L240), add a short MCP pointer:

```tsx
        <p
          className={styles.sectionProse}
          style={{ marginTop: "var(--space-6)" }}
        >
          Building an AI agent? A hosted Model Context Protocol server exposes
          balances, transactions, keypair and seed generation, block and
          transaction lookups, supply, and node health as tools.
        </p>
        <div className={styles.cardCta}>
          <LinkCta href={URL_MCP_SERVER}>MCP server · mcp.lineage.to</LinkCta>
        </div>
```

- [ ] **Step 4: Docs — add an MCP section + TOC entry**

In `app/docs/page.tsx`, add to the API TOC group (after the `#api-reference` `<li>`, line ~98):

```tsx
                  <li><a href="#mcp-server">MCP server</a></li>
```

Then add a new `<article>` immediately after the API-reference article (after its `</article>` at ~L304):

```tsx
              {/* ============ MCP SERVER ============ */}
              <article id="mcp-server" className={styles.prose}>
                <h2>MCP server</h2>
                <p>
                  A hosted <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> endpoint
                  lets AI agents and assistants use Lineage as tools: balances and
                  transactions, keypair and seed generation, block / entry /
                  transaction lookups, supply, and node health. It wraps the same
                  HTTP API documented here.
                </p>
                <p>
                  Endpoint:{" "}
                  <a href={URL_MCP_SERVER} target="_blank" rel="noopener noreferrer">
                    <code>mcp.lineage.to</code>
                  </a>
                </p>
              </article>
```

Add `URL_MCP_SERVER` to this file's `@/lib/constants` import (check whether `app/docs/page.tsx` already imports from `@/lib/constants`; if so, add to that import — if not, add a new import line alongside the existing imports).

- [ ] **Step 5: Build, lint, verify**

Run: `npm run build -- --webpack && npm run lint`
Expected: build succeeds; lint clean.
Then: `grep -rn "status=\"soon\"" app/ecosystem/page.tsx` — MCP should no longer be soon (LLM agent skills card may still be soon — that's expected). `grep -rn "URL_MCP_SERVER" app lib` → defined once, used in ecosystem, developers, docs. `grep -rn "mcp.lineage.to" app | grep -v URL_MCP_SERVER` → only the constant definition in lib should hardcode the string; render sites use the constant (the `.replace` display is fine).

- [ ] **Step 6: Commit**

```bash
git add lib/constants.ts app/ecosystem/page.tsx app/developers/page.tsx app/docs/page.tsx
git commit -m "$(printf '%s\n' 'feat(site): mark MCP server live; surface it on developers and docs' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 4: Brand kit static assets (hex script, brand.json, guidelines.md, zip)

**Files:**
- Create: `scripts/derive-brand-hex.mjs`
- Create (generated by the script): `public/brand/brand.json`
- Create: `public/brand/guidelines.md`
- Create (built with `zip`): `public/brand/lineage-brand-kit.zip`

**Interfaces:**
- Produces: `public/brand/brand.json` with shape
  `{ name, generatedFrom, colors: [{token, role, oklch, hex}], typography: {display,body,mono} (each {family, role, weights, url}), logos: [{file, use}], links: {site, guidelines, brandDocs} }` — consumed by Task 5's page via `import brandKit from "@/public/brand/brand.json"`.

- [ ] **Step 1: Write the hex-derivation + brand.json generator script**

Create `scripts/derive-brand-hex.mjs` exactly:

```js
// Derive sRGB hex from the site's OKLCH brand tokens and write public/brand/brand.json.
// Plain Node, no deps. Run: node scripts/derive-brand-hex.mjs
// OKLCH -> OKLab -> linear sRGB -> gamma sRGB -> hex (Björn Ottosson's matrices).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

function oklchToHex(Lpct, C, Hdeg) {
  const L = Lpct / 100;
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const rl = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gl = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const g = (x) => {
    const c = Math.min(1, Math.max(0, x));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };
  const to255 = (x) => Math.round(g(x) * 255);
  const hex = (n) => n.toString(16).padStart(2, "0");
  return `#${hex(to255(rl))}${hex(to255(gl))}${hex(to255(bl))}`.toLowerCase();
}

// [token, role, L%, C, Hdeg] — mirror of the brand tokens in app/globals.css :root
const TOKENS = [
  ["--color-bg-canvas", "Canvas — deepest surface", 13, 0.018, 200],
  ["--color-bg", "Background", 15, 0.018, 200],
  ["--color-bg-raised", "Raised background", 18, 0.02, 200],
  ["--color-surface", "Surface", 20, 0.022, 200],
  ["--color-surface-2", "Surface (2)", 25, 0.024, 198],
  ["--color-text", "Text", 95, 0.01, 195],
  ["--color-text-muted", "Text — muted", 73, 0.016, 195],
  ["--color-text-subtle", "Text — subtle", 60, 0.016, 195],
  ["--color-border", "Border", 29, 0.022, 200],
  ["--color-border-strong", "Border — strong", 38, 0.026, 200],
  ["--color-accent", "Emerald — action", 82, 0.16, 165],
  ["--color-accent-strong", "Emerald — strong", 86, 0.15, 167],
  ["--color-link", "Cyan — interaction", 78, 0.12, 218],
  ["--color-link-hover", "Cyan — hover", 85, 0.11, 218],
  ["--color-success", "Success", 83, 0.17, 150],
  ["--color-warning", "Warning", 82, 0.14, 80],
  ["--color-danger", "Danger", 68, 0.18, 18],
];

const colors = TOKENS.map(([token, role, L, C, H]) => ({
  token,
  role,
  oklch: `oklch(${L}% ${C} ${H})`,
  hex: oklchToHex(L, C, H),
}));

const brand = {
  name: "Lineage",
  generatedFrom: "app/globals.css :root (OKLCH source of truth)",
  colors,
  typography: {
    display: {
      family: "Space Grotesk",
      role: "Display, headings, buttons, wordmark (600, -0.02em)",
      weights: [500, 600, 700],
      url: "https://fonts.google.com/specimen/Space+Grotesk",
    },
    body: {
      family: "Inter",
      role: "Body text",
      weights: [400, 500, 600],
      url: "https://fonts.google.com/specimen/Inter",
    },
    mono: {
      family: "JetBrains Mono",
      role: "Code, data, endpoint URLs",
      weights: [400, 500],
      url: "https://fonts.google.com/specimen/JetBrains+Mono",
    },
  },
  logos: [
    { file: "lineage-mark.svg", use: "Primary two-blade mark (use >=24px)" },
    { file: "lineage-mark-mono.svg", use: "One-colour knockout (print/etch/watermark)" },
    { file: "lineage-icon.svg", use: "Plated app icon (app store / touch icon)" },
    { file: "lineage-icon-min.svg", use: "16px minimum glyph (converged centre)" },
    { file: "favicon.svg", use: "Favicon tile" },
  ],
  links: {
    site: "https://lineage.foundation",
    guidelines: "https://lineage.foundation/brand/guidelines.md",
    brandDocs: "https://lineage.foundation/brand",
  },
};

const outPath = fileURLToPath(new URL("../public/brand/brand.json", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(brand, null, 2) + "\n");
console.log(`wrote ${outPath} (${colors.length} colors)`);
```

- [ ] **Step 2: Generate brand.json**

Run: `node scripts/derive-brand-hex.mjs`
Expected: prints `wrote …/public/brand/brand.json (17 colors)`. Confirm valid JSON and hex present: `node -e "const b=require('./public/brand/brand.json'); console.log(b.colors.length, b.colors[10].token, b.colors[10].hex)"` → expect `17 --color-accent #…` with a plausible emerald hex (green-ish, e.g. starts with a low red / high green). Sanity-check the emerald and cyan look right (emerald ~ green, cyan ~ blue-green).

- [ ] **Step 3: Write guidelines.md**

Create `public/brand/guidelines.md` exactly:

```markdown
# Lineage brand kit

Everything you need to represent Lineage correctly. Machine-readable tokens are
in `brand.json` (served at `/brand/brand.json`). The full downloadable archive
is `/brand/lineage-brand-kit.zip`.

## The mark — "The Clearing Cross"

Two tapered blades — cyan over emerald — meeting at an open centre. Cyan reads as
interaction (incoming); emerald reads as action (settling). Each blade brightens
toward the centre.

Variants (in this kit and under `/brand/`):

- `lineage-mark.svg` — primary full-colour mark. Use at 24px and above.
- `lineage-mark-mono.svg` — single-colour knockout for print, etch, or watermark.
- `lineage-icon.svg` — plated app icon on a dark rounded square (app store / touch icon).
- `lineage-icon-min.svg` — 16px-minimum glyph with a converged (solid) centre.
- `favicon.svg` — favicon tile.

## Usage

Do:

- Pair the glyph with the "Lineage" wordmark set in Space Grotesk 600, tracking -0.02em.
- Keep the emerald/cyan duotone and the blade taper.
- Give the mark clear space of at least the height of one blade on every side.
- Use the converged-centre glyph (`lineage-icon-min.svg`) below ~20px; the open centre elsewhere.

Don't:

- Recolour the mark outside the emerald/cyan system, add a "plopped dot" centre, or stretch it.
- Reserve the glow for more than one focal placement.
- Set the wordmark in the body typeface.

## Colour

Dark-only system. Emerald is action (rationed), cyan is interaction. Full token
list with OKLCH (source of truth) and derived sRGB hex is in `brand.json`.

## Typography

- Display / headings / wordmark: Space Grotesk (600, -0.02em)
- Body: Inter
- Code / data: JetBrains Mono

Fonts are open source (Google Fonts) — see the URLs in `brand.json`. Display and
body are never the same family.

## Questions

See the full brand system at https://lineage.foundation/brand or email
contact@lineage.foundation.
```

- [ ] **Step 4: Build the zip**

Run from the repo root (so paths inside the zip are clean):

```bash
cd public/brand && \
zip -j lineage-brand-kit.zip \
  lineage-mark.svg lineage-mark-mono.svg lineage-icon.svg lineage-icon-min.svg favicon.svg \
  brand.json guidelines.md \
  ../images/open-graph-lineage-1200x630.png \
  ../images/lineage-favicon-16x16.png ../images/lineage-favicon-32x32.png \
  ../images/lineage-favicon-48x48.png ../images/lineage-favicon-180x180.png \
  ../images/lineage-favicon-192x192.png && cd ../..
```

(`-j` junks paths so every file sits at the archive root.) Verify contents:

```bash
unzip -l public/brand/lineage-brand-kit.zip
```

Expected: 13 entries — 5 SVGs, `brand.json`, `guidelines.md`, the OG png, and 5 favicon pngs. No directory prefixes.

- [ ] **Step 5: Build, lint, verify**

Run: `npm run build -- --webpack && npm run lint`
Expected: build succeeds; lint clean (the new files are static assets/scripts — no TS/JSX yet; ensure the `.mjs` script doesn't trip eslint — if eslint targets `scripts/`, fix any reported issue; the script uses only Node built-ins).

- [ ] **Step 6: Commit**

```bash
git add scripts/derive-brand-hex.mjs public/brand/brand.json public/brand/guidelines.md public/brand/lineage-brand-kit.zip
git commit -m "$(printf '%s\n' 'feat(brand): add brand-kit assets (tokens json, guidelines, zip)' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 5: Brand page (`/brand`) + footer link

**Files:**
- Create: `app/brand/page.tsx`
- Create: `app/brand/page.module.css`
- Modify: `components/SiteFooter.tsx` (Resources column)

**Interfaces:**
- Consumes: `public/brand/brand.json` (Task 4) via `import brandKit from "@/public/brand/brand.json"`.

- [ ] **Step 1: Create the brand page**

Create `app/brand/page.tsx` exactly:

```tsx
import type { Metadata } from "next";

import { Accent, Button, Card, LinkCta, PageHead, Section } from "@/components/ui";
import { SITE_ORIGIN } from "@/lib/constants";
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
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand | Lineage",
    description:
      "Download the Lineage brand kit: logo marks, colour and type tokens, and usage guidelines for people and AI.",
    images: ["/images/open-graph-lineage-1200x630.png"],
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
                <img src={`/brand/${logo.file}`} alt={logo.file} className={styles.logoImg} />
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
```

- [ ] **Step 2: Create the page styles**

Create `app/brand/page.module.css` exactly:

```css
.sectionProse {
  color: var(--color-text-muted);
  max-width: var(--measure);
  margin-bottom: var(--space-6);
  line-height: var(--lh-body);
}

.headActions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.cardCta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.logoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-5);
}

.logoTile {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: var(--color-bg-canvas);
  border: var(--border-rule);
  border-radius: var(--r-md);
  margin-bottom: var(--space-4);
}

.logoImg {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.logoUse {
  color: var(--color-text-muted);
  font-size: var(--fs-small);
}

.download {
  color: var(--color-link);
  font-family: var(--font-mono);
  font-size: var(--fs-small);
}
.download:hover {
  color: var(--color-link-hover);
}

.swatchGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
}

.swatch {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3);
  border: var(--border-rule);
  border-radius: var(--r-md);
  background: var(--color-surface);
}

.swatchChip {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: var(--r-sm);
  border: var(--border-rule);
}

.swatchMeta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.swatchRole {
  font-size: var(--fs-small);
  color: var(--color-text);
}

.swatchVal {
  font-family: var(--font-mono);
  font-size: var(--fs-caption);
  color: var(--color-text-subtle);
}

.typeGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-5);
}
```

- [ ] **Step 3: Footer — add the Brand kit link (Resources column)**

In `components/SiteFooter.tsx`, in the "Resources" `<ul>` (after the "Research" `<li>`, line ~67), add:

```tsx
              <li>
                <Link href="/brand">Brand kit</Link>
              </li>
```

- [ ] **Step 4: Build, lint, verify**

Run: `npm run build -- --webpack && npm run lint`
Expected: build succeeds; lint clean; the route list includes `/brand`. If the JSON import from `@/public/brand/brand.json` errors on type resolution, confirm `resolveJsonModule` is enabled (it is) — the `@/*` alias maps to repo root so the path resolves.

- [ ] **Step 5: Commit**

```bash
git add app/brand/page.tsx app/brand/page.module.css components/SiteFooter.tsx
git commit -m "$(printf '%s\n' 'feat(brand): add /brand kit page and footer link' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

## Final Verification

- [ ] `npm run build -- --webpack` and `npm run lint` clean on the final tree; route list includes `/brand`.
- [ ] Live dev-server check (`npx next dev --webpack`): footer shows Discord, X, and Brand kit; `/about` shows Claudio in full colour with LinkedIn and no badge, plus a new "Members" section with Jesse (JB initials, no LinkedIn); `/ecosystem` MCP card reads "Live" and links out; `/developers` and `/docs` reference the MCP endpoint; `/brand` renders marks, swatches, and type; `/brand/lineage-brand-kit.zip`, `/brand/brand.json`, `/brand/guidelines.md` each fetch 200.
- [ ] `unzip -l public/brand/lineage-brand-kit.zip` lists the 13 expected files.
- [ ] `git diff main --stat` shows only the files named across Tasks 1-5 plus the spec/plan docs.
