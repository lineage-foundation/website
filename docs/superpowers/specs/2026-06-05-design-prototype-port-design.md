# Port BRAND v2 prototype into the Next.js app

**Date:** 2026-06-05
**Branch:** `feat/design-refresh`
**Status:** Design — pending user review

## Summary

Merge the static design prototype in `/design-prototype` (bioluminescent BRAND v2:
emerald action / cyan interaction / teal-space canvas) into the production Next.js
app, and establish the portable design system for future use. The prototype is the
**single source of truth for everything** — copy, structure, tokens, components, and
interaction behavior. Where the current app and the prototype disagree, the prototype
wins.

This is one comprehensive plan covering the full port (per user decision), sequenced
into phases so each phase lands a coherent, shippable increment.

## Goals

- The running app matches the prototype visually and in copy on every page.
- The design tokens in `app/globals.css` become the emerald/cyan/teal OKLch system
  from `design-prototype/design-system/tokens.css`.
- Three pages absent from the app (`roadmap`, `about`, `get-tokens`) are added.
- The signature procedural hero (Clearing Lattice) runs as a React component.
- The portable design system is documented in `docs/` for future on-brand work.

## Non-goals

- No Stripe / faucet **backend**. `get-tokens` ships front-end + all UI states only,
  driven by a placeholder `CONFIG` block. Real payments / token dispensing are a
  separate future effort (see `design-prototype/get-tokens-backend.md`).
- No new build tooling (no Storybook). `globals.css` remains the token source of truth.
- No light theme — dark-first only (prototype anti-pattern §9).

## Current state (baseline)

- **Stack:** Next.js 16.2.1, React 19.2.4, Tailwind v4, CSS Modules, `next/font`
  (Inter + Space Grotesk already wired; **no JetBrains Mono**).
- **Tokens:** `app/globals.css` `:root` holds a *different* BRAND v2 palette —
  lime `#d4f952` + blue `#5eb0ff` on a near-black canvas (hex). The prototype is
  emerald + cyan on a teal-tinted canvas (OKLch).
- **UI kit** (`components/ui/`): `Button`, `Card`, `Container`, `Eyebrow`, `Heading`,
  `LinkCta`, `Prose`, `Section` — class system already mirrors the prototype.
- **Pages present:** home, `developers`, `docs` (+ large `/docs` + API system),
  `ecosystem`, `research`, `technology`, `tokenomics`.
- **Pages absent:** `roadmap`, `about`, `get-tokens`.
- **Existing hero:** `components/home/HeroShader{,Dynamic}.tsx` — a WebGL shader hero
  that the Clearing Lattice **replaces**.
- **Existing domain modules:** `components/arco-sim/ArcoSimulator`,
  `components/tokenomics/TokenomicsChart` — reused, re-skinned.
- **Chrome:** `components/SiteHeader.tsx`, `components/SiteFooter.tsx`.
- **Docs:** `docs/brand-system.md` (describes the lime/blue palette — to be rewritten).

## Design

### Phase 1 — Token foundation, fonts, assets

**Tokens (`app/globals.css` `:root`).** Adopt the prototype's OKLch values verbatim.
Naming is reconciled, not blindly overwritten:

- **Adopt prototype names** for overlapping concepts; update every consumer:
  - `--ease-standard` → `--ease` (~15 files)
  - `--font-family-display` → `--font-display`, `--font-family-body` → `--font-body` (~12 files)
  - `--container-gutter` → `--gutter` (~4 files)
- **Add** prototype-only tokens: `--color-success`, `--color-warning`, `--color-danger`,
  `--grad-aurora`, `--font-mono`.
- **Keep** app-only tokens the prototype does not define (additive, not in conflict):
  `--z-header/-menu/-modal`, `--measure`, `--lh-*`, `--ls-*`, `--border-rule(-strong)`,
  `--ease-accel`, `--color-overlay-scrim`.
- Re-tune the `body` background mesh (radial blooms + linear ramp) to the teal/emerald
  bloom implied by the new palette; keep the static grain + reduced-motion handling.
- `--font-mono` resolves to `var(--font-jetbrains-mono), ui-monospace, monospace`.

**Fonts (`app/layout.tsx`).** Add `JetBrains_Mono` from `next/font/google` (weights
400, 500; `variable: "--font-jetbrains-mono"`); add its `.variable` to the `<html>`
className. Update `viewport.themeColor` to the new `--color-bg` value (computed hex
equivalent of the OKLch base, since `themeColor` must be a concrete color).

**Assets.** Copy from `design-prototype/assets/` into `public/`:
- Logo set → `public/brand/`: `lineage-mark.svg`, `lineage-icon.svg`,
  `lineage-icon-min.svg`, `lineage-mark-mono.svg`, `favicon.svg`.
- Team photos → `public/team/` (6 headshots).
- Update `app/layout.tsx` `icons` + OG references to the new favicon/mark where the
  prototype supersedes the current PNGs. Regenerating raster favicons/OG is out of
  scope; reference the SVG favicon and keep existing PNGs as fallback.

**Acceptance:** app builds; every page renders in the new palette with no broken token
references; `grep` finds no remaining `--ease-standard` / `--font-family-*` /
`--container-gutter`; mono font loads.

### Phase 2 — Re-skin the UI kit + add shared primitives

Re-skin the existing primitives' CSS Modules to the new tokens and prototype visuals,
faithfully reproducing `design-prototype/css/lineage.css`:

- `Button` — emerald `--primary` (fill + ring + `--glow-accent`), `--secondary`
  (hover → cyan border), `--ghost`, `--sm`; `--r-md` corners (never pills); 1px depress
  on `:active`.
- `Card` / `Card --rail` — surface + hairline + `--r-md`; `--rail` adds the
  aurora (accent→link) 3px top-rule + hover lift.
- `Eyebrow` / `--feature` — mono uppercase kicker; `--feature` = cyan pill chip + glow.
- `Section` / `--band` / `--tight`, `LinkCta` / `--muted`, `Heading`, `Prose`,
  `Container` / `--narrow` / `--docs`.

Add new shared primitives (new files under `components/ui/`, exported from `index.ts`),
each porting its prototype class:

- `Stat`, `Signal` — metric / status display blocks.
- `Note`, `AsideCard` — sidebar notes / captions.
- `Pill` (`--get`/`--post`/`--soon`), `Tag` (`tag-live` / `tag-soon`).
- `Table` (+ `table-wrap` for mobile overflow).
- `CodeBlock` — code chrome + a **copy button** (client component; replaces the
  prototype's site-wide `lineage.js` copy wiring).
- Form set (used by `get-tokens`): `Field`/`FieldRow`/`FieldLabel`/`FieldHint`/
  `FieldError`, `Input` (+ `--mono`, `input-prefix`), `Segmented`, `StatusBar`
  (`--ok`/`--warn`/`--err`/`--info`), `Cooldown`.

**Acceptance:** each primitive matches its prototype counterpart at the named
breakpoints; focus rings are cyan and never removed; a small internal smoke render
(e.g. a temporary scratch page or the existing pages) shows each variant correct.

### Phase 3 — Clearing Lattice hero

Reimplement `design-prototype/js/lineage.js`'s `#lattice` as
`components/home/LatticeCanvas.tsx` (client component) and **replace** `HeroShader` /
`HeroShaderDynamic` in `components/home/Hero.tsx`:

- Tessellated field of faint Clearing-Cross cells (cyan × emerald blades, open centre);
  bioluminescent activation waves ripple outward lighting crossings emerald, then settle.
- `prefers-reduced-motion: reduce` → render a single static settled frame, no loop.
- Clamp `devicePixelRatio` ≤ 2; cap cell density to the viewport; cancel RAF on unmount;
  pause when offscreen / tab hidden.
- Behind a radial mask, per the `.hero` treatment.
- It is the **only** animated flourish — remove/avoid competing animations on the home view.

**Acceptance:** animation matches the prototype feel; reduced-motion shows a static
frame; no jank on resize; teardown leaves no leaked RAF/listeners.

### Phase 4 — Re-skin existing pages + chrome

Port copy and structure from the prototype HTML for the 7 existing pages
(`index`→home, `technology`, `tokenomics`, `developers`, `ecosystem`, `research`,
`docs`), prototype authoritative. Build page-specific domain modules as page-local
components, porting their prototype classes: `tiers`/`tier`, `phases`/`phase`,
`effchart`/`ec-*`, `ws`/`ws-grid`, `split`, `grid` variants (`--2`/`--4`/`--moat`),
`quote`. Reuse and re-skin `ArcoSimulator` and `TokenomicsChart`.

**Chrome:**
- `SiteHeader` — add the **Developers dropdown** (Overview · Docs · Roadmap) with
  desktop hover/click + click-outside + Escape + mobile disclosure, auto-marking the
  active parent; add About and a Get-tokens CTA; mobile menu collapses ≤ 1024px.
- `SiteFooter` — update the sitemap columns + meta row to the prototype footer.

**Acceptance:** each existing page visually diffs clean against its prototype page;
nav dropdown keyboard-accessible; no horizontal scroll at 360/390/430/768/1024/1440.

### Phase 5 — New pages

Add three routes, content/structure from the prototype:

- `app/roadmap/page.tsx` — `phase-strip`, `release`/`--final`/`release__*`, `timeline`,
  `ws` modules.
- `app/about/page.tsx` — `team-grid`/`--2`, `person__*` cards (photo-or-monogram
  avatar, bio, LinkedIn), using the copied team photos.
- `app/get-tokens/page.tsx` — Buy LNGX + faucet surfaces, **front-end + all states
  only**: a single `CONFIG` block (purchase cap, currency, rate, faucet amount,
  cooldown) as placeholders; `segmented` Buy/Faucet toggle; `field`/`input` set;
  `statusbar` states (idle/loading/success/error); `cooldown` countdown persisted in
  `localStorage`; legal line + agent aside. No network calls; submit handlers are
  stubbed to drive the visual states. Mark business values as compliance-pending.

Update `SiteHeader`/`SiteFooter` nav + `app/sitemap.ts` + `app/robots.ts` to include the
three new routes.

**Acceptance:** three pages render and visually diff clean against the prototype;
get-tokens exercises every state via stubbed handlers; cooldown survives reload.

### Phase 6 — Design-system docs + final QA

**Docs (future use).** `globals.css` stays the token source of truth.
- Copy `design-prototype/design-system/{DESIGN,components,brand-mark}.md` into `docs/`
  (e.g. `docs/design-system/`).
- Rewrite `docs/brand-system.md` for the emerald/cyan palette and the reconciled token
  names (replace all lime/blue references and the `--ease-standard`/`--font-family-*`
  /`--container-gutter` names with the adopted ones).
- Update the `AGENTS.md` brand pointer so future work references the new docs +
  `globals.css` as SSOT.

**Final QA.**
- `next build` + `eslint` clean.
- No horizontal scroll at 360/390/430/768/1024/1440px.
- Contrast (WCAG AA for text), focus-ring visibility, `prefers-reduced-motion` honored
  site-wide.
- Run the prototype `DESIGN.md` §9 anti-pattern checklist before done (no light theme,
  emerald rationed, accents not swapped, no pill buttons, hairlines over fills, no
  invented metrics, mono not used as body, etc.).

## Architecture / structure decisions

- **Token SSOT:** `app/globals.css` `:root` (public CSS variables), per `AGENTS.md`.
  No stray hex in stylesheets; derive extensions with `oklch()` / `color-mix()`.
- **Styling:** CSS Modules per component (existing pattern), consuming the public
  tokens. Tailwind v4 stays for utility usage already in the app.
- **Client vs server:** keep pages as server components; isolate interactivity
  (LatticeCanvas, CodeBlock copy, get-tokens form, nav dropdown) in small `"use client"`
  leaf components.
- **One flourish rule:** the Clearing Lattice is the sole animated flourish on its view.

## Risks / open considerations

- **OKLch browser support** is broad in 2026 target browsers; values are authored in
  OKLch in the prototype and adopted verbatim. `themeColor` needs a concrete hex
  fallback (computed once).
- **Rename churn** (`--ease-standard` etc.) touches ~12–15 files each; mechanical but
  must be complete — verified by grep in Phase 1 acceptance.
- **Docs/API system** is large and already styled; Phase 2 re-skin must not regress the
  `/docs` scroll-spy shell. Treat docs chrome carefully.
- **get-tokens business values** are placeholders pending compliance — labelled as such.

## Verification strategy

Per phase: build + lint clean, then a visual diff of the affected surface against the
corresponding prototype HTML opened in a browser, plus the breakpoint / a11y /
reduced-motion checks listed in each phase's acceptance. Final pass runs the §9
anti-pattern audit across the whole site.
