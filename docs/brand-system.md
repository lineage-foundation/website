# Lineage site — brand system (web3 rebrand, v2 tokens)

**PRD:** [tasks/prd-web3-brand-rebrand.md](../tasks/prd-web3-brand-rebrand.md)  
**Source of truth for values:** `app/globals.css` (`:root`).

## Phase 1: body / shell bridge

**Decision (task 1.1):** Use a **unified page background** on `body` (canvas color + static gradient “mesh”). Header and footer use the same surface tokens. Unmigrated page bodies automatically sit on the new atmosphere without per-route overrides.

**Task 4.1:** `main.siteMain` is explicitly **`background: transparent`** and **`color: var(--color-text)`** so all routes inherit the v2 `body` stack; no second “page background” in main.

**Motion (task 4.2):** `HeroShader` already skips `requestAnimationFrame` when `prefers-reduced-motion: reduce` is on. `useReveal` sets `data-revealed` immediately in that case and, if the user turns **reduce** on while viewing the page, disconnects the `IntersectionObserver` and reveals. Global `[data-reveal]` CSS disables transition under the same media query; reduced-motion also tones down the static `body::before` grain mix-blend.

**Home (task 5):** `Section` supports `visual="feature"` (gradient rail + chip eyebrow) and `tone="band"` for alternating bands. Hero uses layered `::after`/mesh for depth; hero mesh `mask-image` uses keyword `black` for alpha, not a surface color.

**ARCO / Plotly (task 6):** `ArcoSimulator.tsx` uses named constants `PLOT_BG` / `PLOT_TEXT` / `PLOT_GRID` that **mirror** v2 `globals.css` hex values; Plotly’s API does not read CSS custom properties, so the comment in the file is the contract.

**Tokenomics canvas (task 7):** `TokenomicsChart.tsx` uses `CHART_SLICE_COLORS` and text/delta hex constants aligned with the v2 palette; 2D canvas `fillStyle` does not use CSS variables.

**Placeholder routes (task 8):** `/developers`, `/ecosystem`, and `/research` use `Section` with `visual="feature"` on each block; the card-heavy middle sections use `tone="band"`. No metadata or canonical URL changes.

**Favicons & Open Graph (task 9):** The rebrand is **UI/tokens**; the **favicon and OG PNGs** in `public/images/` are unchanged (same mark). `app/layout.tsx` lists every favicon size that exists on disk, sets **`metadataBase`**, and defines **default `openGraph` + `twitter.card`** so routes inherit a canonical OG image. After deploy, hit `/images/open-graph-lineage-1200x630.png` in the browser (or share-debugger) to re-verify **200** — static files are always served at that path in production.

## Public CSS variables (use these in components)

| Token | Role |
| --- | --- |
| `--color-bg-canvas` | Deepest base; underpins gradients |
| `--color-bg` | Main chrome (header, footer, solid fills) |
| `--color-bg-raised` | Subtle lift between bg and card |
| `--color-surface` | Cards, blocks |
| `--color-surface-2` | Hover / emphasis panels |
| `--color-text` | Primary copy |
| `--color-text-muted` | Secondary copy |
| `--color-text-subtle` | Tertiary / metadata |
| `--color-border` / `--color-border-strong` | Rules and outlines |
| `--color-accent` / `--color-accent-strong` / `--color-accent-ink` | CTAs, selection, on-accent text |
| `--color-link` / `--color-link-hover` | Navigation, text links, inline CTAs (primary actions stay `--color-accent`) |
| `--color-focus-ring` | Focus-visible (keyboard) |
| `--color-overlay-scrim` | Mobile nav backdrop, overlays |
| Spacing, type, motion, z-index, layout | Unchanged names — see `globals.css` |

**Legacy note:** v2 rebrand keeps the **same names** the site already used (`--color-bg`, `--color-surface`, etc.) with **new values**. No duplicate `--v2-*` / `--legacy-*` map is required in components.

## Contrast (WCAG 2.1 AA, task 1.5)

Spot-check (normal text **4.5:1**; large / UI **3:1** where applicable). Values below were verified in design tooling / contrast checkers as of the v2 palette:

| Pair | Role |
| --- | --- |
| `#e9ebf0` on `#080a0f` | Primary body — well above 4.5:1 |
| `#a2aab6` on `#080a0f` | Muted UI copy — at or above 4.5:1 for ~14px+ |
| `#5eb0ff` on `#080a0f` | Link / focus-related blue — above 4.5:1 |
| `--color-accent-ink` on `--color-accent` | On-accent — tuned for CTA legibility |

The visible `body` background is a **gradient** (not a single hex); the listed pairs use the solid `--color-bg` as the reference surface for chrome and for conservative contrast checks. If a page region uses a lighter surface, re-check that pair in context.

## Do / don’t (accent + links)

- **Do** use `--color-accent` for primary actions and high-emphasis CTAs.
- **Do** use `--color-link` for text links in body / secondary navigation affordances when not inheriting parent color.
- **Don’t** add extra rainbow gradients per section; use the shared `body` treatment + surfaces.
- **Don’t** use focus ring color for large fills — it is for outlines only.

## Typography (next/font)

| Role | Font | Weights | Where |
| --- | --- | --- | --- |
| **Body / UI** | **Inter** (`--font-inter`) | 400, 500, 600 | `body`, buttons, nav, prose |
| **Display / headings** | **Space Grotesk** (`--font-display`) | 500, 600, 700 | `Heading`, hero headline, section titles |

CSS variables: `--font-family-body`, `--font-family-display` in `app/globals.css` (`:root`), composed from the above. **LCP:** only `display: swap` Google fonts; subset weights as in `app/layout.tsx`. Optional: run Lighthouse on `/` after changes to confirm text remains the LCP element (not blocking on font).

## Hex audit (migrated `app/**` and `components/**` CSS)

**Policy:** All surface and typography colors in **stylesheets** come from `app/globals.css` tokens. Component `*.module.css` files under `components/` should contain **no** `#` hex literals (use `var(--...)` and `color-mix` with tokens only).

| Location | What appears |
| --- | --- |
| `app/globals.css` | **Authoritative** palette: all `--color-*` definitions and a few one-off gradient stops (e.g. `linear-gradient(180deg, #05060b …)`) that align with the same stack. |
| `components/**/*.css` | **None** after migration — `color-mix` uses `var(--color-text)` / `var(--color-bg)` (not ad-hoc white). |
| `app/**/*.module.css` | Only if any route still uses a literal — re-check with `rg '#' app components --glob '*.css'`; expect **only** `globals.css` + any future justified gradient stops. |

**JavaScript / canvas (allowed exceptions):** APIs that do not read CSS custom properties may duplicate hex **in sync** with `globals.css`:

- `app/layout.tsx` — `metadata` `themeColor` (PWA chrome).
- `components/arco-sim/ArcoSimulator.tsx` — `PLOT_BG`, `PLOT_TEXT`, `PLOT_MUTED`, `PLOT_GRID` (Plotly).
- `components/tokenomics/TokenomicsChart.tsx` — `CHART_SLICE_COLORS`, `TEXT` / `TEXT_MUTED` / `TEXT_SUBTLE`, `DELTA_*` (2D canvas `fillStyle`).

`components/home/HeroShader.tsx` uses RGB derived from the accent token in code comments, not a stylesheet hex.

## Manual accessibility checklist (pre–sign-off)

Run on **staging or production** after deploy (or local `next start` with assets complete):

1. **Keyboard:** Tab through header (desktop + mobile menu open/close), main content links and buttons, footer, and one in-page form or chart control. Focus order is logical; no traps except intentional (e.g. modal — N/A if none).
2. **Focus visible:** Every interactive control shows a visible ring (`:focus-visible` / `--color-focus-ring`) on keyboard focus, not only on click.
3. **Contrast:** Spot-check new band sections: primary body (`--color-text` on `--color-bg` or `--color-surface`), links (`--color-link`), and primary CTAs (accent on `--color-accent-ink` / surface).
4. **Motion:** With **prefers-reduced-motion: reduce**, hero animation and scroll reveals are reduced or off (`useReveal`, `HeroShader`).

## Performance (PRD §8)

There is **no committed Lighthouse or RUM baseline** in this repository. After each meaningful deploy:

- Run **Lighthouse** (or similar) on **`/`** and **`/technology`** in a private window; compare to the previous release informally. Goal: no large avoidable regression in LCP, TBT, or CLS; home text should remain a strong LCP candidate (fonts already `display: swap`).

## Stakeholder sign-off

PRD §8.1: design review and approval before the rebrand is considered **done** for the shipping milestone. This document plus passing **lint** and **build** on the release branch are the technical gate; product sign-off is out of band.
