# Lineage Foundation Website

Source for [lineage.foundation](https://lineage.foundation).

Next.js (App Router) site: routes under `app/`, reusable UI under `components/`, static assets under `public/`.

## Prerequisites

- **Node.js** 18 or newer (20+ LTS recommended for tooling compatibility).

## Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads when you edit files under `app/`, `components/`, etc.

## Scripts

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Development server               |
| `npm run build`   | Production build (`.next`)       |
| `npm run start`   | Run production build locally     |
| `npm run lint`    | ESLint                           |

## Project layout

| Path | Role |
| ---- | ---- |
| `app/` | Routes (`page.tsx`, `layout.tsx`), global and per-route CSS |
| `app/globals.css` | Design tokens (colors, type scale, spacing, motion, z-index) and base styles |
| `app/robots.ts`, `app/sitemap.ts` | Generated `/robots.txt` and `/sitemap.xml` |
| `components/ui/` | Design-system primitives (Container, Section, Heading, Eyebrow, Prose, Button, LinkCta, Card) |
| `components/home/` | Homepage-only sections (Hero, FeatureGrid, AudienceRouter, EvidenceBlock, GetStartedGrid) |
| `components/SiteHeader.tsx`, `components/SiteFooter.tsx` | Global shell |
| `components/arco/`, `components/tokenomics/` | Route-specific interactive clients |
| `hooks/` | Client-only React hooks (e.g. `useReveal` for scroll-in animations) |
| `lib/constants.ts` | Outbound URLs (Zenodo whitepaper, GitHub, YouTube, Discourse, partners) |
| `lib/arco/` | ARCO simulation init and types |
| `public/images/` | Images and favicons (URLs like `/images/lineage-logo.png`) |

## Routes

| Path | Page |
| ---- | ---- |
| `/` | Home — hero, UTMM detail, consensus, impact, audience router, evidence, get-started |
| `/developers` | Developers landing — whitepaper, GitHub org, contact |
| `/ecosystem` | Ecosystem landing — wallets, Discourse, research partners, video |
| `/research` | Research landing — whitepaper, research repo, contact |
| `/learn` (and `/arco`) | ARCO interactive simulation |
| `/tokenomics` | Interactive tokenomics chart |
| `/robots.txt` | Generated from `app/robots.ts` |
| `/sitemap.xml` | Generated from `app/sitemap.ts` |

When adding or renaming a route, update `app/sitemap.ts` so indexing stays in sync.

## Design system

All visual decisions flow from CSS custom properties declared at the top of
`app/globals.css`. Components must consume these tokens — do not introduce
ad-hoc hex or px values except where explicitly justified (the ARCO diagram
blue palette in `app/arco/arco.css` is the only exception and is commented
as such).

Token groups:

- **Color** — `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-text-inverse`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-strong`, `--color-accent-ink`, `--color-focus-ring`
- **Effect** — `--glow-accent`, `--shadow-elev-1`
- **Type scale** — `--fs-display`, `--fs-h1`..`--fs-h3`, `--fs-body`, `--fs-small`, `--fs-caption`
- **Type rhythm** — `--lh-display`, `--lh-tight`, `--lh-heading`, `--lh-body`
- **Tracking** — `--ls-display`, `--ls-heading`, `--ls-body`, `--ls-eyebrow`
- **Spacing (4px base)** — `--space-1` (4px) through `--space-10` (128px)
- **Radius** — `--r-sm`, `--r-md`, `--r-lg`
- **Border** — `--border-rule`, `--border-rule-strong`
- **Motion** — `--dur-fast`, `--dur-base`, `--dur-slow`, `--ease-standard`, `--ease-accel`
- **Z-index** — `--z-header`, `--z-menu`, `--z-modal`
- **Layout** — `--container-max`, `--container-gutter`, `--measure`, `--section-py`

### UI primitives

Build page sections from these — they encode the spacing, measure, and
typography decisions consistently:

| Primitive | Role |
| --------- | ---- |
| `Container` | Max-width wrapper (`wide` / default / `narrow`) with safe-area-aware gutters |
| `Section` | Standard vertical rhythm + optional `eyebrow`, `heading`, `headingLevel`, `headingVariant`, `intro`; wraps its body in a `Container` |
| `Heading` | Semantic `h1`–`h4`, styled independently via `variant` (`display`, `h1`–`h3`) |
| `Eyebrow` | Small uppercase section label |
| `Prose` | Token-based rich-text formatting clamped to `--measure` |
| `Button` | `primary` / `secondary` / `ghost` in `sm` / `md`; renders `<button>`, `<Link>`, or external `<a>` |
| `LinkCta` | Inline styled link with arrow affordance |
| `Card` | Tile with optional `icon`, `eyebrow`, `title`, and `href` (click affordance) |

Import from the barrel file:

```ts
import { Container, Section, Heading, Eyebrow, Prose, Button, LinkCta, Card } from "@/components/ui";
```

### Motion and accessibility

- Scroll-in animations use the `useReveal` hook (`hooks/useReveal.ts`), which
  gates on `IntersectionObserver` and `prefers-reduced-motion`.
- The homepage canvas shader (`components/home/HeroShader.tsx`) draws a
  single static frame under `prefers-reduced-motion: reduce` and pauses while
  the tab is hidden.
- Global `:focus-visible` ring and `::selection` colors are defined in
  `app/globals.css` and should not be overridden per-component.
- Text color pairs satisfy WCAG 2.1 AA at normal body size. Run the audit:

  ```bash
  node scripts/contrast.mjs
  ```

## Changing copy and links

- **Home:** compose sections in `app/page.tsx`; each narrative block lives in
  its own component under `components/home/`.
- **Developers / Ecosystem / Research:** `app/developers/page.tsx`,
  `app/ecosystem/page.tsx`, `app/research/page.tsx` and their neighbouring
  `page.module.css`.
- **Tokenomics:** `app/tokenomics/page.tsx` and `components/tokenomics/`.
- **Learn (ARCO):** `app/arco/page.tsx`, `components/arco/`,
  `lib/arco/arcoInit.ts`, `app/arco/arco.css`.
- **Shared outbound links** (whitepaper, GitHub, video, Discourse, wallets,
  partners): edit **`lib/constants.ts`** so every CTA stays in sync.
- **Header / footer:** `components/SiteHeader.tsx`, `components/SiteFooter.tsx`.
- **Metadata (per route):** export `metadata` from the route's `page.tsx`;
  `app/layout.tsx` provides the site-wide `title` template and defaults.

## Deployment (Vercel)

The site is deployed on [Vercel](https://vercel.com). Typical project settings:

- **Framework preset:** Next.js (auto-detected).
- **Root directory:** repository root (`.`).
- **Build command:** `npm run build` (default).
- **Output:** Next.js default (`.next`; no static export required).
- **Install command:** `npm install` (default).
- **Environment variables:** none required for the public marketing site; add in Vercel if you introduce server-only secrets later.

Further org-level notes: [lineage-foundation/platform — website-setup.md](https://github.com/lineage-foundation/platform/blob/main/docs/website-setup.md).
