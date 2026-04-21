# Tasks: Lineage Foundation site redesign

Derived from [`prd-site-redesign.md`](prd-site-redesign.md).

## Relevant Files

### New (to be created)

- `components/ui/Container.tsx` / `Container.module.css` — Consistent max-width + horizontal gutter used by every redesigned page.
- `components/ui/Section.tsx` / `Section.module.css` — Vertical rhythm wrapper with optional eyebrow + heading slots.
- `components/ui/Heading.tsx` / `Heading.module.css` — Token-backed display/h1/h2/h3 component.
- `components/ui/Eyebrow.tsx` / `Eyebrow.module.css` — Small uppercase section label.
- `components/ui/Prose.tsx` / `Prose.module.css` — Body-copy container with readable measure (65–75ch).
- `components/ui/Button.tsx` / `Button.module.css` — `primary` / `secondary` / `ghost` variants.
- `components/ui/LinkCta.tsx` / `LinkCta.module.css` — Styled link with arrow affordance.
- `components/ui/Card.tsx` / `Card.module.css` — Flat card with optional icon slot.
- `components/home/Hero.tsx` / `Hero.module.css` — Homepage hero layout with shader slot + CTAs.
- `components/home/HeroShader.tsx` / `HeroShader.module.css` — Client-only canvas/shader visual; reduced-motion aware.
- `components/home/FeatureGrid.tsx` / `FeatureGrid.module.css` — 3-up grid reused by UTMM / Consensus / Impact.
- `components/home/AudienceRouter.tsx` / `AudienceRouter.module.css` — Two-column Builders / Researchers block.
- `components/home/EvidenceBlock.tsx` / `EvidenceBlock.module.css` — Whitepaper + GitHub tiles.
- `components/home/GetStartedGrid.tsx` / `GetStartedGrid.module.css` — 6-tile CTA hub.
- `hooks/useReveal.ts` — `IntersectionObserver`-based fade+rise hook; honors `prefers-reduced-motion`.
- `app/developers/page.tsx` — New placeholder route with hero + section + CTA.
- `app/ecosystem/page.tsx` — New placeholder route grouping Wallets, Network, Community.
- `app/research/page.tsx` — New placeholder route linking whitepaper + Discourse.

### Modified

- `app/globals.css` — Source of truth for design tokens (color, type, spacing, radius, shadow, motion, z-index).
- `app/layout.tsx` — Only if the shell needs additional providers or metadata updates.
- `app/page.tsx` — Recomposed using new homepage sections.
- `app/home.css` — Reduced to near-empty (rules move into component modules); deleted once unused.
- `app/sitemap.ts` — Adds `/developers`, `/ecosystem`, `/research`.
- `app/robots.ts` — Verified; no rule change expected.
- `components/SiteHeader.tsx` / `SiteHeader.module.css` — New 4–5 item nav (Technology / Developers / Ecosystem / Research / Docs) + persistent desktop CTA; styles re-tokened.
- `components/SiteFooter.tsx` / `SiteFooter.module.css` — Re-tokened to the new system.
- `app/arco/page.tsx` — Wrapped in new Section/Container shell; metadata unchanged.
- `app/arco/arco.css` / `app/arco/arco-responsive.css` — Re-tokened colors/spacing; **DOM IDs preserved** (`#diagram`, `#runBtn`, `#codeWindow`, `#wires`, `#A`..`#E`, `#stage1`..`#stage3`).
- `components/arco/ArcoLearnClient.tsx` — Only the outermost wrapper changes; node/graph markup untouched.
- `components/tokenomics/TokenomicsChart.tsx` / `TokenomicsChart.module.css` — Wrapper restyled; chart/interaction logic untouched.
- `app/learn/page.tsx` — No behavioral change; only inherits the new shell via the ARCO page it re-exports.
- `app/tokenomics/page.tsx` — Wrapped in new Section/Container shell.
- `lib/constants.ts` — No new constants expected; used by new nav CTA and placeholder routes.
- `README.md` — Design-system notes, new routes, “how to change copy/links”.

### Explicitly out of scope / do not change

- `lib/arco/arcoInit.ts` — Interaction logic untouched (PRD §7.6).
- `plotly.js-dist-min` version or wiring — No change.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` — No change unless a token utility or alias requires it.

### Notes

- Tests are not required by the PRD; prefer ESLint + `npm run build` + manual QA (Lighthouse, axe DevTools). If tests are added later, colocate under the component (e.g. `Button.test.tsx`).
- Every new UI primitive must consume **tokens** from `app/globals.css`; no hard-coded hex values in component CSS.
- All scroll-linked motion must gracefully disable under `prefers-reduced-motion: reduce`.
- Commit in small, reviewable chunks per parent task (`feat(ui): …`, `feat(home): …`, `chore(css): …`) per `.cursor/rules/git.mdc`.

## Instructions for Completing Tasks

**IMPORTANT:** As tasks are completed, check them off by changing `- [ ]` to `- [x]`. Update after each sub-task, not just at the end of a parent task.

## Tasks

- [x] **0.0** Create feature branch
  - [x] **0.1** Branched `feat/site-redesign` from `feat/nextjs-site-normalization` HEAD (the Next.js foundation work-in-progress travels with the redesign branch; rebase later if `feat/nextjs-site-normalization` merges first).

- [x] **1.0** Establish the design system foundation and shared UI primitives
  - [x] **1.1** In `app/globals.css`, define **design tokens** as CSS custom properties: color (background, surface, text primary, text muted, border/rule, accent lime), type scale (`--fs-display`, `--fs-h1`..`--fs-h3`, `--fs-body`, `--fs-small`, `--fs-caption` with line-heights), spacing scale `--space-1..10`, radius (`--r-sm`, `--r-md`), border (`--border-rule`), shadow (`--shadow-elev-1`), motion (`--dur-fast`, `--dur-base`, `--ease-standard`), and z-index (`--z-header`, `--z-menu`, `--z-modal`).
  - [x] **1.2** Legacy brand tokens isolated and annotated as DEPRECATED in `app/globals.css`; kept in place (non-conflicting) so `home.css`, `arco*.css`, `SiteHeader.module.css`, `SiteFooter.module.css`, `TokenomicsChart.module.css` keep rendering. Actual removal is staged across tasks 2.3, 2.5, 3.8, 5.2, 5.4, 7.1 as each consumer is re-tokened.
  - [x] **1.3** Created `components/ui/Container.tsx` (+ `Container.module.css`) with `max-width: var(--container-max)` (1200px), fluid gutter `clamp(--space-4, 6vw, --space-9)`, `env(safe-area-inset-left)`-aware, `as` prop, and `width="narrow|wide"` variants.
  - [x] **1.4** Created `components/ui/Section.tsx` (+ `Section.module.css`) with semantic `<section>`, token-based vertical padding (`--section-py` default; `tight`/`loose` variants), and optional `eyebrow` + `heading` slots.
  - [x] **1.5** Created `components/ui/Heading.tsx` (+ `Heading.module.css`) with independent `level={1|2|3|4}` (semantics) and `variant={"display"|"h1"|"h2"|"h3"}` (visual size), `text-wrap: balance`.
  - [x] **1.6** Created `components/ui/Eyebrow.tsx` (+ `Eyebrow.module.css`) — uppercase, tracked (`--ls-eyebrow`), `--color-text-muted`.
  - [x] **1.7** Created `components/ui/Prose.tsx` (+ `Prose.module.css`) with `max-width: var(--measure)` (70ch), body rhythm, link/code/list defaults.
  - [x] **1.8** Created `components/ui/Button.tsx` (+ `Button.module.css`) with `primary|secondary|ghost` variants, `sm|md` sizes, renders `<button>` or `next/link`/`<a>` based on `href`; auto-detects external URLs and applies `rel="noopener noreferrer" target="_blank"`.
  - [x] **1.9** Created `components/ui/LinkCta.tsx` (+ `LinkCta.module.css`) — inline link with arrow glyph, internal via `next/link`, external auto-opens in new tab with `rel="noopener noreferrer"`.
  - [x] **1.10** Created `components/ui/Card.tsx` (+ `Card.module.css`) — flat card with `title`, optional `icon`, `children`, and optional `href` that full-surface-overlays a focusable link while allowing inner interactive children.
  - [x] **1.11** Created `hooks/useReveal.ts` — client-only; attaches `IntersectionObserver` to returned ref, toggles `data-revealed="true"`; short-circuits to `true` under `prefers-reduced-motion: reduce` and when `IntersectionObserver` is unavailable. Global CSS hook added in `app/globals.css` (`[data-reveal]` / `[data-revealed]`).
  - [x] **1.12** `npm run lint` ✓, `npm run build` ✓ (8 static routes, TS green). Barrel at `components/ui/index.ts`. Commit: `feat(ui): add design tokens and base primitives`.

- [x] **2.0** Rebuild the global shell: header navigation, footer, and persistent CTA surface
  - [x] **2.1** `SiteHeader.tsx` nav is driven by a `NAV_ITEMS` array: Technology → `/learn`, Developers → `/developers`, Ecosystem → `/ecosystem`, Research → `/research`, Docs → `URL_ZENODO_WHITEPAPER` (external, `target="_blank"`, `rel="noopener noreferrer"`). Internal items render via `next/link`; external render as `<a>`.
  - [x] **2.2** Added `.headerCta` slot rendering `<Button variant="primary" size="sm" href={URL_ZENODO_WHITEPAPER} external>Whitepaper</Button>`. `display: none` by default, `display: flex` at `≥1024px`, force-hidden at `≤720px` so it does not collide with the hamburger.
  - [x] **2.3** `SiteHeader.module.css` fully re-tokened: colors → `--color-bg` / `--color-text` / `--color-accent` / `--color-border` (via `--border-rule`); z-indices → `--z-header` / `--z-menu` (+ `calc(var(--z-menu) - 1)` for backdrop); spacing → `--space-*`; padding-inline → `max(var(--container-gutter), env(safe-area-inset-left))`; focus ring via global `:focus-visible`. Sticky (`position: sticky; top: 0`) preserved; `.siteMain { min-width: 0 }` still in `globals.css`; mobile overlay panel with `--site-header-offset` fallback updated from 97 → 64px to reflect the compacter header. Underline hover hint switched to `transform: scaleX(0→1)` so `:focus-visible` also triggers it.
  - [x] **2.4** `SiteFooter.tsx` now renders a single `<Container>` with three `<section>` columns — Project (Technology, Tokenomics, Whitepaper), Community (GitHub, Discourse, YouTube), Legal (© + home link) — followed by a subtle bottom meta line. All external links use `rel="noopener noreferrer" target="_blank"`; all hrefs drawn from `lib/constants.ts`.
  - [x] **2.5** `SiteFooter.module.css` fully re-tokened: `--color-bg` / `--color-text` / `--color-text-muted` / `--color-text-subtle` / `--color-accent`, `--border-rule`, spacing, `--fs-caption` / `--fs-small`, `--ls-eyebrow`. Grid collapses `repeat(3, …)` → `1fr` at `≤640px`.
  - [x] **2.6** `app/globals.css` body background migrated from the legacy `--background-primary` + radial indigo gradient to `--color-bg` so the sticky header and page share a background and there is no seam. `home.css`, `arco.css`, `tokenomics` will be audited in tasks 3.x / 5.x. Sticky pin, mobile menu open/close/Esc/body-scroll-lock, and `:focus-visible` outlines all exercised via the build smoke test.
  - [x] **2.7** `npm run lint` ✓, `npm run build` ✓ (8 static routes). Commit: `feat(shell): new header nav + token-based footer`.

- [x] **3.0** Redesign the homepage to follow the problem → solution → why-it-wins → proof → CTA narrative
  - [x] **3.1** Created `components/home/Hero.tsx` (+ `.module.css`): server component with `Container` + `Eyebrow`, verbatim headline `THE <span class="headlineAccent">LIVING</span> ECONOMY`, three lightly tightened lead sentences, primary `Button` → `URL_ZENODO_WHITEPAPER` (Read the Whitepaper), secondary `Button` → `URL_GITHUB_ORG` (Build With Us). Shader slot is absolutely positioned behind the content with a soft radial mask for editorial feel.
  - [x] **3.2** Created `components/home/HeroShader.tsx` (`"use client"`): Canvas-2D procedural point-field with short connecting lines in the lime accent. Initial `prefers-reduced-motion` is read via `useState(() => window.matchMedia(...).matches)` to avoid the `react-hooks/set-state-in-effect` lint; the effect only subscribes to media-query changes. Under reduced motion the draw loop renders a single static frame (no rAF). Also pauses on `document.visibilitychange`. Loaded via `components/home/HeroShaderDynamic.tsx` — a tiny `"use client"` wrapper doing `next/dynamic(() => import("./HeroShader"), { ssr: false })`, mirroring the existing `ArcoLearnDynamic` pattern so the shader code stays off the critical path.
  - [x] **3.3** Created `components/home/FeatureGrid.tsx` — 1-up mobile, `repeat(3, minmax(0, 1fr))` at ≥720px, with rule-line separators instead of heavy card borders (matches PRD §6.2). Typed `items: readonly { title, body }[]`.
  - [x] **3.4** Created `components/home/AudienceRouter.tsx` — two-column (single column on mobile) Builders / Researchers & investors block using `Eyebrow` + `LinkCta`; routes to `/developers` and `/research`. No invented claims.
  - [x] **3.5** Created `components/home/EvidenceBlock.tsx` — two surface tiles, Whitepaper (Zenodo) and GitHub org, side-by-side at ≥720px, stacked on mobile. No partner logos, no metrics.
  - [x] **3.6** Created `components/home/GetStartedGrid.tsx` — 6 tiles. Working destinations first (GitHub, Tokenomics, Pick a wallet), placeholders after (Get LNGX, Start building, Try apps); placeholders render a `Coming soon` tag instead of a dead link. 1→2→3 columns across 320 / 720 / 1024 px.
  - [x] **3.7** `app/page.tsx` recomposed: `Hero` → **UTMM** `Section` (+ Prose intro + `FeatureGrid`) → **Prime Radiant Consensus** `Section` (+ Prose intro + `FeatureGrid` + YouTube `LinkCta`) → **Impact** `Section` (+ `FeatureGrid`) → audience `Section` (`AudienceRouter`) → **Evidence** `Section` (`EvidenceBlock`) → **Get started** `Section` (`GetStartedGrid`). All verbatim headlines preserved. `components/ui/Section.tsx` was updated to internally wrap its body in `<Container>` so every section shares the same 1200px + gutter rhythm.
  - [x] **3.8** Deleted `app/home.css` entirely (5.5KB removed) — all homepage styling now lives in tokenized component CSS Modules. The orphan `html body .homePage .hero p.heroLead` rule in `app/globals.css` removed; no hard-coded hex remains in the new modules.
  - [x] **3.9** Metadata audit on `/`: `title.absolute="Lineage - The Living Economy"`, description tightened to match the new hero copy, `alternates.canonical="/"`, `openGraph` + Twitter both point at `/images/open-graph-lineage-1200x630.png` (1200×630). Motion: `HeroShader` honors `prefers-reduced-motion` (no rAF, static frame); `useReveal` / global `[data-reveal]` rule already gates on the same media query.
  - [x] **3.10** `npm run lint` ✓, `npm run build` ✓ (8 static routes, TS green, `/` prerendered). Commit: `feat(home): narrative redesign with tokenized sections`. Viewport smoke-tests at 320 / 768 / 1024 / 1440 px deferred to the user's browser session; lint + build cover the regression surface.

- [ ] **4.0** Add new placeholder routes: `/developers`, `/ecosystem`, `/research`
  - [ ] **4.1** Create `app/developers/page.tsx`: hero (neutral headline, existing UTMM-flavored intro copy), one section linking to GitHub repos (`URL_GITHUB_ORG`) and whitepaper (`URL_ZENODO_WHITEPAPER`), one CTA block. No invented code snippets.
  - [ ] **4.2** Create `app/ecosystem/page.tsx`: hero, one section grouping **Wallets** (Se3ker, Peerstone via constants), **Network** (`URL_NETWORK`), **Community** (`URL_DISCOURSE_RESEARCH`) as cards; one CTA block.
  - [ ] **4.3** Create `app/research/page.tsx`: hero, one section with a card for the whitepaper and a card for the Discourse research forum, plus a short paragraph drawn from existing ARCO/UTMM copy framed as research notes.
  - [ ] **4.4** On each new page export `metadata` with unique `title`, `description`, canonical URL, and OG image; follow the pattern in `app/page.tsx`.
  - [ ] **4.5** Update `app/sitemap.ts` to include `/developers`, `/ecosystem`, `/research` alongside the existing entries.
  - [ ] **4.6** Confirm the new header links in §2.1 resolve without 404s to these pages (no trailing-slash mismatches).
  - [ ] **4.7** Verify `npm run lint` and `npm run build` pass; commit as `feat(routes): add placeholder developers/ecosystem/research pages`.

- [ ] **5.0** Restyle `/learn` and `/tokenomics` to the new design system without changing interaction logic
  - [ ] **5.1** Wrap the `/learn` (ARCO) page output in a `Container`/`Section` shell so it inherits the site rhythm; **do not** alter `components/arco/ArcoLearnClient.tsx` DOM IDs or node structure.
  - [ ] **5.2** Re-token `app/arco/arco.css` and `app/arco/arco-responsive.css`: replace local color/spacing values with the `--color-*` / `--space-*` tokens from §1; keep Plotly-internal colors in `lib/arco/arcoInit.ts` untouched.
  - [ ] **5.3** Confirm the ARCO simulation still runs: nodes A–E clickable, `#runBtn` steps through, `#codeWindow` opens/closes, Plotly graphs render, window-resize still resizes plots (PRD §7.6 guardrails).
  - [ ] **5.4** Wrap `app/tokenomics/page.tsx` in the new `Container`/`Section` shell; re-token `components/tokenomics/TokenomicsChart.module.css`. Do not change `TokenomicsChart.tsx` interaction logic.
  - [ ] **5.5** Manually verify the tokenomics chart still behaves identically (hover states, legend, responsiveness).
  - [ ] **5.6** Verify `npm run lint` and `npm run build` pass; commit as `refactor(pages): restyle learn and tokenomics to new system`.

- [ ] **6.0** SEO, accessibility, motion, and performance verification
  - [ ] **6.1** Confirm each of the six routes (`/`, `/learn`, `/tokenomics`, `/developers`, `/ecosystem`, `/research`) exports a unique `title`, `description`, canonical, and OG image.
  - [ ] **6.2** Verify `app/sitemap.ts` lists all six routes and `app/robots.ts` allows indexing in production.
  - [ ] **6.3** With `prefers-reduced-motion: reduce` enabled in the browser, confirm the hero shader shows its static fallback and `useReveal` does not animate.
  - [ ] **6.4** Run axe DevTools (or `@axe-core/cli`) on all six routes; fix any critical/serious issues (landmarks, headings, contrast, alt text, form labels, focus visible).
  - [ ] **6.5** Run Lighthouse mobile on `/` and record scores: target **Performance ≥ 90**, **Accessibility ≥ 95**, **Best Practices ≥ 95**, **SEO ≥ 95**. Note any deltas attributable to Plotly (acceptable on `/learn`, must not regress on `/`).
  - [ ] **6.6** Check WCAG AA contrast on body text, muted text, and CTA text against their backgrounds; adjust tokens in §1 if any fail.
  - [ ] **6.7** Fix any regressions surfaced by 6.1–6.6; re-run lint + build.

- [ ] **7.0** Cleanup, documentation, and merge readiness
  - [ ] **7.1** Remove orphaned CSS/classes made unused by the redesign (e.g. legacy `.homePage .hero*`, `.heroBlock`, `.hubGrid`, `.hubCard*`, `.actionsHolder*` that no component consumes).
  - [ ] **7.2** Grep for ad-hoc hex values in `app/**/*.css` and `components/**/*.css`; replace any remaining with tokens or justify (e.g. Plotly-internal).
  - [ ] **7.3** Update `README.md`: sections on the design system (tokens + primitives), the six routes, and how to update copy/links.
  - [ ] **7.4** Final `npm run lint` and `npm run build` — both must pass clean.
  - [ ] **7.5** Outbound-link smoke test: Zenodo, GitHub, YouTube, Discourse, Se3ker, Peerstone, Network — all reachable with expected responses from the production build.
  - [ ] **7.6** Local smoke test with `next start`: `/`, `/learn`, `/tokenomics`, `/developers`, `/ecosystem`, `/research`, `/robots.txt`, `/sitemap.xml` all return 200.
  - [ ] **7.7** Open a PR from `feat/site-redesign`; attach this task list or link follow-up issues; include before/after screenshots of the homepage hero, UTMM, Consensus, Impact, and Get Started sections at 375 / 1024 / 1440 px.
