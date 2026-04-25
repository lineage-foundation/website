# Tasks: Web3-forward visual rebrand

Derived from [`prd-web3-brand-rebrand.md`](prd-web3-brand-rebrand.md). **Scope:** brand and UI only; `prd-site-redesign.md` remains authoritative for IA, copy policy, and trust signals.

## Relevant Files

### Foundation & layout

- `app/globals.css` — Design tokens (v2), base reset, optional texture/mesh utilities, `prefers-reduced-motion` rules.
- `app/layout.tsx` — `next/font` for display and body; CSS variables for font families; metadata `icons` / `openGraph` if asset paths change.

### Global shell

- `components/SiteHeader.tsx` / `SiteHeader.module.css` — Nav, mobile menu, logo, CTAs to new token system.
- `components/SiteFooter.tsx` / `SiteFooter.module.css` — Footer links and rhythm rebrand.

### UI primitives (token-backed)

- `components/ui/Button.tsx` / `Button.module.css` — Primary / secondary / ghost on new palette.
- `components/ui/LinkCta.tsx` / `LinkCta.module.css` — Arrow CTAs, link colors (optional secondary accent).
- `components/ui/Container.tsx` / `Container.module.css` — Max width and gutters.
- `components/ui/Section.tsx` / `Section.module.css` — Section vertical rhythm, optional backgrounds.
- `components/ui/Heading.tsx` / `Heading.module.css` — Display / h1–h3 roles.
- `components/ui/Eyebrow.tsx` / `Eyebrow.module.css` — Eyebrow labels.
- `components/ui/Prose.tsx` / `Prose.module.css` — Body copy measure and list styles.
- `components/ui/Card.tsx` / `Card.module.css` — Card chrome for bento/grids.

### Home

- `app/page.tsx` — Compose sections; no copy rewrites per PRD.
- `components/home/Hero.tsx` / `Hero.module.css` — Hero layout, optional mesh/grid background.
- `components/home/HeroShader.tsx` / `HeroShader.module.css` / `HeroShaderDynamic.tsx` — Hero visual; respect reduced motion.
- `components/home/FeatureGrid.tsx` / `FeatureGrid.module.css`
- `components/home/AudienceRouter.tsx` / `AudienceRouter.module.css`
- `components/home/EvidenceBlock.tsx` / `EvidenceBlock.module.css`
- `components/home/GetStartedGrid.tsx` / `GetStartedGrid.module.css`

### Technology & simulator

- `app/technology/page.tsx` — Page shell and sections.
- `components/arco-sim/ArcoSimulator.tsx` / `ArcoSimulator.module.css` / `ArcoSimulatorDynamic.tsx` — Plotly colors, panel chrome, token use.
- `components/arco-sim/data.ts` — Only if chart copy colors are centralized; avoid logic changes.

### Tokenomics

- `app/tokenomics/page.tsx`
- `components/tokenomics/TokenomicsChart.tsx` / `TokenomicsChart.module.css` — Plotly layout and wrapper theming.

### Placeholder routes

- `app/developers/page.tsx` / `app/developers/page.module.css`
- `app/ecosystem/page.tsx` / `app/ecosystem/page.module.css`
- `app/research/page.tsx` / `app/research/page.module.css`

### Static assets

- `public/images/lineage-favicon-*.png` (or equivalent under `public/images/`) — Favicon set referenced from `layout.tsx`.
- `public/images/open-graph-lineage-1200x630.png` (or per-route OG) — Default share image if refreshed.
- Optional: new texture/mesh assets under `public/images/` (optimized, small).

### Documentation

- `AGENTS.md` and/or `docs/brand-system.md` (create if team chooses) — Tokens, type roles, accent do/don’t.
- `README.md` — Link to brand doc and “how to change tokens” one-liner.

### Constants

- `lib/constants.ts` — External URLs unchanged; only touch if nav labels need no code change (nav is visual only per PRD).

### Notes

- This repo has **no Jest** in `package.json`; quality gates are **`npm run lint`** and **`npm run build`**, plus manual keyboard/contrast checks. Add unit tests only if the project introduces a test runner later.
- After each sub-task, check the box (`- [ ]` → `- [x]`) in this file.
- Keep **URLs and routes** unchanged; do not rename paths as part of this work.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off in this markdown file by changing `- [ ]` to `- [x]`. Update after completing each sub-task, not only after parent tasks.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a branch (e.g. `git checkout -b feat/web3-brand-rebrand`).

- [x] 1.0 Design tokens v2 and global base styles
  - [x] 1.1 Stakeholder decision: document in a short note in this file or in PR description—**minimum body bridge** for Phase 1 (apply new bg/text tokens to `body` / main so unmigrated pages don’t clash with the new shell) vs. accept temporary two-temperature bodies until Phase 2 (per PRD §9 open question).
  - [x] 1.2 Add **v2 token set** in `app/globals.css` (or `app/brand-tokens.css` imported from `globals.css`): layered surfaces (`--color-bg`, `--color-bg-raised`, `--color-surface`, etc.), text roles, borders, primary accent, optional secondary accent/link color, focus ring, shadows, radii, motion—per PRD §4.1–4.3.
  - [x] 1.3 Map legacy `--color-*` usages to v2 names **or** alias old names to new values for incremental migration; document the mapping in the brand doc (task 10.0).
  - [x] 1.4 Add **optional** global utilities: subtle page background gradient/mesh and/or noise (CSS or small optimized asset), respecting performance and reduced motion.
  - [x] 1.5 Verify **WCAG AA** contrast for body and large text on default surfaces (document spot-check hex pairs in PR or brand doc).

- [x] 2.0 Typography via `next/font` and layout variables
  - [x] 2.1 Choose and load a **display** font (weight subset) and keep or replace **body** (today: Inter in `layout.tsx`); expose as CSS variables (e.g. `--font-display`, `--font-body`) applied to `body` and heading utilities.
  - [x] 2.2 Update **fluid type scale** tokens in `globals.css` to match new families; ensure `Heading` / `Prose` / home hero use tokens, not raw pixel overrides where avoidable.
  - [x] 2.3 Confirm **no layout thrash**: use `display: swap`, limit weights loaded, check LCP on home in dev tools.

- [x] 3.0 Global shell: header, footer, and UI primitives
  - [x] 3.1 Re-skin `SiteHeader` and mobile menu: backgrounds, borders, nav link hover/focus/active, logo lockup area, CTA button using new tokens.
  - [x] 3.2 Re-skin `SiteFooter`: link color, rules, spacing, optional subtle surface lift.
  - [x] 3.3 Update `Button`, `LinkCta`, and shared focus-visible styles to match v2 (primary/secondary/ghost and optional link accent).
  - [x] 3.4 Keyboard test: **Tab** through header and footer; focus rings visible and consistent with `--color-focus-ring` (verify in browser: logo, nav, menu button, CTA, footer links).

- [x] 4.0 Phase 1 “bridge” and motion accessibility
  - [x] 4.1 If using **minimum body bridge** (task 1.1): set `body` / root layout wrapper background and default text color from v2 so all routes read as one family with the new shell.
  - [x] 4.2 Audit **hero shader** and any scroll/reveal hooks: ensure `prefers-reduced-motion: reduce` disables non-essential animation (existing project behavior preserved or improved).
  - [x] 4.3 Run `npm run lint` and `npm run build` after shell + bridge; fix regressions.

- [x] 5.0 Migrate home page and home section components
  - [x] 5.1 Refactor `app/page.tsx` composition only as needed for styling; **do not rewrite marketing copy** (PRD §4 intro).
  - [x] 5.2 Apply v2 tokens to `Hero`, `FeatureGrid`, `AudienceRouter`, `EvidenceBlock`, `GetStartedGrid` modules; optional **pattern modules** from PRD §4.4 (bento-style cards, qualitative “proof” strip with real links only).
  - [x] 5.3 Hero: optional mesh/grid/gradient **without** heavy video; keep LCP acceptable.
  - [x] 5.4 Remove stray hex from migrated home CSS modules; exceptions documented if any.

- [x] 6.0 Migrate technology page and ARCO simulator appearance
  - [x] 6.1 Re-skin `app/technology/page.tsx` sections with v2 tokens and `Container`/`Section`/`Prose` as appropriate; improve scannability without changing IA.
  - [x] 6.2 Retheme `ArcoSimulator` **Plotly** `plotLayout` / traces and panel CSS in `ArcoSimulator.module.css` to match new dark surfaces and accents; **no changes to simulation stepping logic** (PRD §5.3).
  - [x] 6.3 Keep **dynamic import** boundary in `ArcoSimulatorDynamic.tsx` unless performance review suggests otherwise.

- [x] 7.0 Migrate tokenomics page and chart
  - [x] 7.1 Re-skin `app/tokenomics/page.tsx` wrappers with v2.
  - [x] 7.2 Update `TokenomicsChart` Plotly layout and module styles for chart + chrome to match new palette; preserve chart behavior and data.

- [x] 8.0 Migrate placeholder routes (developers, ecosystem, research)
  - [x] 8.1 Re-skin `app/developers/page.tsx` and `page.module.css` with v2 and shared UI components.
  - [x] 8.2 Re-skin `app/ecosystem/page.tsx` and `page.module.css` similarly.
  - [x] 8.3 Re-skin `app/research/page.tsx` and `page.module.css` similarly.
  - [x] 8.4 Confirm metadata in each file still valid; **no URL or canonical path changes**.

- [x] 9.0 Favicon, OG image, and social metadata
  - [x] 9.1 If visual identity changes require it, regenerate **favicon** sizes under `public/images/` and ensure `layout.tsx` `icons` entries match.
  - [x] 9.2 If required, update **default Open Graph** image (`open-graph-lineage-1200x630.png` or as configured) and verify `metadata.openGraph` / Twitter card paths.
  - [x] 9.3 Smoke-test a share preview (e.g. local or staging) to confirm no 404 on OG image.

- [x] 10.0 Brand documentation and final QA
  - [x] 10.1 Add **“Brand system”** section: token list, type roles, accent do/don’t, link to `prd-web3-brand-rebrand.md` (in `AGENTS.md`, `docs/brand-system.md`, or `README.md` per team preference).
  - [x] 10.2 Grep for stray `#` hex in **migrated** `app/**` and `components/**` CSS; list allowed exceptions (e.g. Plotly internal colors) with rationale.
  - [x] 10.3 **Manual a11y:** contrast spot-check, keyboard nav across all main routes, focus visible on interactive elements.
  - [x] 10.4 **Performance:** compare LCP (home) and heavy page (technology) to a noted pre-rebrand baseline; ensure no large avoidable regression (PRD §8).
  - [x] 10.5 Final `npm run lint` and `npm run build`; prepare for design stakeholder sign-off (PRD §8.1).

---

## Suggested implementation order (summary)

1. Branch → tokens + typography → layout.ts fonts.  
2. Shell (header/footer/primitives) + Phase 1 bridge.  
3. Home → technology + simulator → tokenomics → placeholders.  
4. Assets (favicon/OG) → brand doc → grep audit → QA.

---

*End of task list.*
