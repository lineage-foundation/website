# BRAND v2 Prototype Port — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the static `design-prototype/` (bioluminescent BRAND v2 — emerald action / cyan interaction / teal-space canvas) into the production Next.js app, faithful to the prototype on every axis (tokens, components, copy, behavior), and document the design system for future use.

**Architecture:** `app/globals.css` `:root` becomes the prototype's OKLch token system (`design-prototype/design-system/tokens.css`). The existing CSS-Module UI kit and pages are re-skinned to those tokens; gaps are filled with new primitives. The signature Clearing Lattice hero is reimplemented as a `"use client"` canvas component replacing the WebGL `HeroShader`. Three new routes (`roadmap`, `about`, `get-tokens`) are added; `get-tokens` is front-end + states only.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, Tailwind v4, CSS Modules, `next/font/google`. No test runner is configured — verification is `npm run build` + `npm run lint` + targeted `grep` + manual visual/a11y checks against the prototype HTML opened in a browser. Real assertions are reserved for the two logic-bearing pieces (lattice density math, faucet cooldown), implemented as tiny pure functions with inline `node --test` checks.

**Authoritative source:** `design-prototype/` wins on every conflict. CSS to port lives verbatim in `design-prototype/css/lineage.css`; tasks cite exact line ranges rather than re-typing it, because the engineer reads the canonical text from the repo (re-typing risks drift). React scaffolding and logic are shown in full.

**Prototype CSS line map (reference for all re-skin tasks):**
`.container` 100-101 · `.skip-link` 102-103 · `.eyebrow(/--feature)` 106-121 · `.btn*` 124-144 · `.link-cta*` 147-158 · `.site-header/.nav/.brand/.tabs` 163-180 · `.nav-group*/.nav-menu*` 183-213 · `.hero*` 255-273 · `.page-head*` 278-293 · `.section*` 298-311 · `.grid*` 314-316 · `.card*` 320-351 · `.arco-loop*` 354-393 · `.center-cta` 395 · `.prose` 398-405 · `.split` 408 · `.aside-card` 410 · `.stat` 414-417 · `.table*` 420-427 · `.pill*` 430-434 · `.code` 437-441 · `.phases*` 444-449 · `.effchart/.ec-*` 452-467 · `.docs*` 479-504 · `.site-footer/.footer-*` 509-517 · `.signal` 522-523 · `.docs-toc` 540-542 · `.endpoint/.api-host` 554-558 · `.note` 561-564 · `.code-block*` 567-570. Form/segmented/statusbar/cooldown/tx-*/team/release/timeline classes continue past line 570 — read the file for the full set when porting Phases 2 & 5.

---

## Phase 1 — Token foundation, fonts, assets

### Task 1.1: Add JetBrains Mono + rename the Space Grotesk font variable

**Why first:** The design token `--font-display` (a font *stack*) collides with the existing next/font injected variable also named `--font-display`. Free the name by renaming the injected variable to `--font-space-grotesk`, and add the mono face.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the font imports and variables**

Replace the two `next/font` import blocks and add JetBrains Mono:

```tsx
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});
```

- [ ] **Step 2: Add all three variables to `<html>`**

```tsx
<html
  lang="en"
  className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
>
```

- [ ] **Step 3: Update `themeColor`** (it must be a concrete color, not a CSS var). Use the hex equivalent of the new `--color-bg` OKLch base:

```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1416",
};
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: builds clean; no reference errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(brand): add JetBrains Mono, free --font-display token name"
```

### Task 1.2: Replace the `:root` token block in `app/globals.css`

**Files:**
- Modify: `app/globals.css` (the `:root { ... }` block only — leave the base/reset/layout CSS below it intact for now; the `body` background is re-tuned in Task 1.4)

- [ ] **Step 1: Replace the entire `:root` block** with the reconciled token set below. This adopts the prototype's OKLch values + prototype names for overlapping tokens (`--font-display/body/mono`, `--ease`, `--gutter`), adds prototype-only tokens (status, `--grad-aurora`, `--font-mono`), and retains app-only tokens the prototype doesn't define (z-index, `--measure`, `--lh-*`, `--ls-*`, `--border-rule*`, `--ease-accel`, `--color-overlay-scrim`).

```css
:root {
  /* Surfaces — deep teal-space ramp (OKLch) */
  --color-bg-canvas: oklch(13% 0.018 200);
  --color-bg:        oklch(15% 0.018 200);
  --color-bg-raised: oklch(18% 0.020 200);
  --color-surface:   oklch(20% 0.022 200);
  --color-surface-2: oklch(25% 0.024 198);

  /* Text */
  --color-text:        oklch(95% 0.010 195);
  --color-text-muted:  oklch(73% 0.016 195);
  --color-text-subtle: oklch(60% 0.016 195);
  --color-text-inverse: oklch(16% 0.030 190);

  /* Borders — hairlines carry structure */
  --color-border:        oklch(29% 0.022 200);
  --color-border-strong: oklch(38% 0.026 200);

  /* Emerald — ACTION (rationed) */
  --color-accent:        oklch(82% 0.16 165);
  --color-accent-strong: oklch(86% 0.15 167);
  --color-accent-ink:    oklch(18% 0.05 175);

  /* Cyan — INTERACTION */
  --color-link:       oklch(78% 0.12 218);
  --color-link-hover: oklch(85% 0.11 218);
  --color-focus-ring: oklch(78% 0.12 218 / 0.55);

  /* Status — product UI, sparing */
  --color-success: oklch(83% 0.17 150);
  --color-warning: oklch(82% 0.14 80);
  --color-danger:  oklch(68% 0.18 18);

  /* Flourish + effects */
  --grad-aurora: linear-gradient(105deg, oklch(80% 0.13 215), oklch(83% 0.17 162));
  --glow-accent: 0 0 12px oklch(82% 0.16 165 / .45), 0 0 28px oklch(82% 0.16 165 / .22);
  --color-overlay-scrim: oklch(13% 0.018 200 / 0.72);
  --shadow-elev-1: 0 1px 2px rgba(0, 0, 0, .35), 0 8px 24px rgba(0, 0, 0, .25);

  /* Type families — tokens reference the next/font injected variables */
  --font-display: var(--font-space-grotesk), "Space Grotesk", system-ui, sans-serif;
  --font-body:    var(--font-inter), "Inter", system-ui, -apple-system, sans-serif;
  --font-mono:    var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, monospace;

  /* Fluid type scale */
  --fs-display: clamp(2.4rem, 4.2vw + 0.95rem, 4.25rem);
  --fs-h1: clamp(1.9rem, 2.2vw + 0.95rem, 2.85rem);
  --fs-h2: clamp(1.45rem, 1.35vw + 0.9rem, 2.1rem);
  --fs-h3: clamp(1.0625rem, 0.45vw + 0.95rem, 1.35rem);
  --fs-lead: clamp(1.05rem, 0.5vw + 0.95rem, 1.25rem);
  --fs-body: 1rem;
  --fs-small: 0.875rem;
  --fs-caption: 0.75rem;

  /* Rhythm (line-height) */
  --lh-display: 1.04;
  --lh-tight: 1.12;
  --lh-heading: 1.3;
  --lh-body: 1.65;
  --lh-lead: 1.55;

  /* Tracking */
  --ls-display: -0.02em;
  --ls-heading: -0.01em;
  --ls-body: 0;
  --ls-eyebrow: 0.08em;

  /* Spacing — 4px base */
  --space-1: 0.25rem; --space-2: 0.5rem;  --space-3: 0.75rem; --space-4: 1rem;
  --space-5: 1.5rem;  --space-6: 2rem;    --space-7: 3rem;    --space-8: 4rem;
  --space-9: 6rem;    --space-10: 8rem;

  /* Radius */
  --r-sm: 4px; --r-md: 8px; --r-lg: 12px;

  /* Border helpers */
  --border-rule: 1px solid var(--color-border);
  --border-rule-strong: 1px solid var(--color-border-strong);

  /* Motion */
  --dur-fast: 150ms; --dur-base: 220ms; --dur-slow: 380ms;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-accel: cubic-bezier(0.4, 0, 1, 1);

  /* Z-index */
  --z-header: 100; --z-menu: 110; --z-modal: 200;

  /* Layout */
  --container-max: 1200px;
  --gutter: clamp(16px, 6vw, 96px);
  --measure: 70ch;
  --section-py: var(--space-9);
}
```

- [ ] **Step 2: Verify the build still compiles** (consumers still reference old names — that's fixed in Task 1.3, so expect the app to *build* but render with broken variables until then)

Run: `npm run build`
Expected: PASS (CSS variables resolve to `initial` when missing; no hard error).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(brand): adopt prototype OKLch token system in :root"
```

### Task 1.3: Rename diverged token consumers across the codebase

**Files:**
- Modify: every `.css`/`.module.css`/`.tsx`/`.ts` under `app/`, `components/`, `lib/` referencing the renamed tokens (do NOT touch `design-prototype/` or `node_modules/`)

- [ ] **Step 1: Run the rename substitutions**

```bash
cd /Users/barry/Repos/github.com/lineage-foundation/website
FILES=$(grep -rIl -e '--ease-standard' -e '--font-family-display' -e '--font-family-body' -e '--container-gutter' \
  app components lib --include='*.css' --include='*.tsx' --include='*.ts')
for f in $FILES; do
  sed -i '' \
    -e 's/--ease-standard/--ease/g' \
    -e 's/--font-family-display/--font-display/g' \
    -e 's/--font-family-body/--font-body/g' \
    -e 's/--container-gutter/--gutter/g' \
    "$f"
done
```

- [ ] **Step 2: Verify no diverged names remain** (outside the prototype)

Run:
```bash
grep -rIl -e '--ease-standard' -e '--font-family-display' -e '--font-family-body' -e '--container-gutter' \
  app components lib --include='*.css' --include='*.tsx' --include='*.ts'
```
Expected: no output (empty).

- [ ] **Step 3: Verify the build**

Run: `npm run build && npm run lint`
Expected: both PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor(brand): rename diverged token consumers to prototype names"
```

### Task 1.4: Re-tune the `body` background + base layer to the teal/emerald bloom

**Files:**
- Modify: `app/globals.css` (the `body` rule and `body::before` grain; the `body { background-image: ... }` radial/linear mesh)

- [ ] **Step 1: Replace the `body` `background-color` + `background-image`** so the canvas reads teal-space with a subtle cyan→emerald bloom (token-driven, not a page wash):

```css
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background-color: var(--color-bg-canvas);
  background-image:
    radial-gradient(
      ellipse 100% 85% at 50% -15%,
      oklch(78% 0.12 218 / 0.10),
      transparent 55%
    ),
    radial-gradient(
      ellipse 45% 55% at 100% 25%,
      oklch(82% 0.16 165 / 0.06),
      transparent 50%
    ),
    linear-gradient(180deg, var(--color-bg-canvas) 0%, var(--color-bg) 40%, var(--color-bg-canvas) 100%);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  letter-spacing: var(--ls-body);
}
```

- [ ] **Step 2: Confirm `::selection`, `:focus-visible`, `[data-reveal]`, and the docs layout rules below are unchanged** (they already use retained tokens). Leave them.

- [ ] **Step 3: Verify**

Run: `npm run dev` then open `http://localhost:3000` and confirm a dark teal canvas with a faint top bloom; compare to `design-prototype/index.html`. No light flashes; no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(brand): re-tune body canvas to teal-space bloom"
```

### Task 1.5: Copy brand assets into `public/`

**Files:**
- Create: `public/brand/*.svg`, `public/team/*.jpg`

- [ ] **Step 1: Copy the asset sets**

```bash
mkdir -p public/brand public/team
cp design-prototype/assets/lineage-mark.svg public/brand/
cp design-prototype/assets/lineage-mark-mono.svg public/brand/
cp design-prototype/assets/lineage-icon.svg public/brand/
cp design-prototype/assets/lineage-icon-min.svg public/brand/
cp design-prototype/assets/favicon.svg public/brand/
cp design-prototype/assets/team/*.jpg public/team/
```

- [ ] **Step 2: Add the SVG favicon to metadata** in `app/layout.tsx` `icons.icon` array (prepend, keeping PNG fallbacks):

```tsx
icon: [
  { url: "/brand/favicon.svg", type: "image/svg+xml" },
  { url: "/images/lineage-favicon-16x16.png", sizes: "16x16", type: "image/png" },
  // ...keep the remaining existing PNG entries unchanged
],
```

- [ ] **Step 3: Verify**

Run: `ls public/brand public/team` → 5 SVGs + 6 JPGs present. `npm run build` PASS.

- [ ] **Step 4: Commit**

```bash
git add public/brand public/team app/layout.tsx
git commit -m "feat(brand): add Clearing Cross mark + team assets, svg favicon"
```

---

## Phase 2 — Re-skin the UI kit + add shared primitives

> For each re-skin task: open `design-prototype/css/lineage.css` at the cited lines, port those rules into the component's `.module.css` (mapping prototype class names to the module's local class names — e.g. `.btn--primary` → `.primary`), keep the existing `.tsx` API unless noted, then verify with build + a browser diff against the prototype page that uses the component.

### Task 2.1: Re-skin `Button`

**Files:**
- Modify: `components/ui/Button.module.css`

- [ ] **Step 1: Align variants to prototype `.btn*` (lines 124-144).** Primary = emerald fill + 1px emerald ring + `--glow-accent`; hover → `--color-accent-strong`. Secondary = `--color-surface` 50% bg + `--color-border-strong`, hover border → `--color-link`. Ghost = muted text, hover surface. Keep `.button` base, `.sizeSm`/`.sizeMd`, `:active` translateY(1px), and the focus-visible block. Replace the `.primary` `box-shadow` with `box-shadow: 0 0 0 1px var(--color-accent), var(--glow-accent);` and on `:hover` keep the glow.
- [ ] **Step 2: Verify** `npm run build`; open prototype `index.html`, compare the two hero buttons.
- [ ] **Step 3: Commit** — `git commit -am "feat(brand): re-skin Button to emerald/cyan"`

### Task 2.2: Re-skin `Eyebrow` (+ `--feature` cyan chip)

**Files:** Modify: `components/ui/Eyebrow.module.css`

- [ ] **Step 1:** Port `.eyebrow` + `.eyebrow--feature` (lines 106-121): mono uppercase, `--ls-eyebrow`, muted; `--feature` = rounded (999px) cyan chip — `--color-link` text/border on `color-mix(in oklab, var(--color-link) 9%, transparent)`, soft cyan glow, and the `::before` 6px cyan dot.
- [ ] **Step 2:** Verify build + compare the hero eyebrow chip to prototype.
- [ ] **Step 3:** Commit — `git commit -am "feat(brand): re-skin Eyebrow + feature chip"`

### Task 2.3: Re-skin `Card` (+ `--rail` aurora top-rule)

**Files:** Modify: `components/ui/Card.module.css`

- [ ] **Step 1:** Port `.card` + `.card--rail` (lines 320-351): surface + hairline + `--r-md`; hover lifts (`translateY(-3px)`, `--color-surface-2`, `--shadow-elev-1`); `--rail::before` = 3px `--grad-aurora` top-rule revealed on hover. Map `Card`'s rail prop to the `--rail` class.
- [ ] **Step 2:** Verify build + compare to the home feature grid in prototype.
- [ ] **Step 3:** Commit — `git commit -am "feat(brand): re-skin Card + aurora rail"`

### Task 2.4: Re-skin `Section`, `LinkCta`, `Heading`, `Prose`, `Container`

**Files:** Modify: `components/ui/Section.module.css`, `LinkCta.module.css`, `Heading.module.css`, `Prose.module.css`, `Container.module.css`

- [ ] **Step 1:** Port, per file:
  - `Section` → `.section`/`--band`/`--tight` + `.section-head`/`-title`/`-prose` with the accent→link vertical rail (lines 298-311).
  - `LinkCta` → `.link-cta`/`--muted` cyan under-rule + `.arrow` slide 2px on hover (lines 147-158).
  - `Heading` → display family, weights (600/500), `text-wrap: balance`, `--ls-heading`.
  - `Prose` → measure cap + inline `code` styling (lines 398-405).
  - `Container` → `.container`/`--narrow`/`--docs` widths (lines 100-101, 479).
- [ ] **Step 2:** Verify build; diff a long-form page (e.g. `research`) against prototype.
- [ ] **Step 3:** Commit — `git commit -am "feat(brand): re-skin Section/LinkCta/Heading/Prose/Container"`

### Task 2.5: New primitive — `Stat` + `Signal`

**Files:**
- Create: `components/ui/Stat.tsx`, `components/ui/Stat.module.css`, `components/ui/Signal.tsx`, `components/ui/Signal.module.css`
- Modify: `components/ui/index.ts`

- [ ] **Step 1: `Stat.tsx`** (value + key; value supports an emerald accent span):

```tsx
import styles from "./Stat.module.css";

export type StatProps = {
  value: React.ReactNode;
  label: string;
  className?: string;
};

export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={`${styles.stat} ${className ?? ""}`}>
      <div className={styles.value}>{value}</div>
      <span className={styles.key}>{label}</span>
    </div>
  );
}
```

- [ ] **Step 2: `Stat.module.css`** — port `.stat`/`.stat .v`/`.stat .k` (lines 414-417): `.value` uses `--font-mono`, `font-variant-numeric: tabular-nums`, `clamp(1.6rem,2.6vw,2.4rem)`; an `.value :global(.accent)` rule sets emerald.
- [ ] **Step 3: `Signal.tsx`** — inline-flex label with a pulsing emerald dot:

```tsx
import styles from "./Signal.module.css";

export function Signal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`${styles.signal} ${className ?? ""}`}>{children}</span>;
}
```

- [ ] **Step 4: `Signal.module.css`** — port `.signal` + `.signal::before` (lines 522-523) incl. the `pulse` keyframes (copy the `@keyframes pulse` from `lineage.css`); under `prefers-reduced-motion: reduce`, disable the animation.
- [ ] **Step 5:** Export both from `index.ts`. Verify `npm run build`.
- [ ] **Step 6:** Commit — `git commit -am "feat(ui): add Stat and Signal primitives"`

### Task 2.6: New primitive — `Pill` + `Tag`

**Files:**
- Create: `components/ui/Pill.tsx`, `Pill.module.css`, `Tag.tsx`, `Tag.module.css`
- Modify: `components/ui/index.ts`

- [ ] **Step 1: `Pill.tsx`** with a `tone` prop:

```tsx
import styles from "./Pill.module.css";

export type PillTone = "get" | "post" | "soon";

export function Pill({ tone, children, className }: { tone: PillTone; children: React.ReactNode; className?: string }) {
  return <span className={`${styles.pill} ${styles[tone]} ${className ?? ""}`}>{children}</span>;
}
```

- [ ] **Step 2: `Pill.module.css`** — port `.pill`/`--get`/`--post`/`--soon` (lines 430-434): mono caption, round, tinted via `color-mix`. `.get`→success, `.post`→warning, `.soon`→subtle.
- [ ] **Step 3: `Tag.tsx`** with `live | soon`:

```tsx
import styles from "./Tag.module.css";

export function Tag({ status, children }: { status: "live" | "soon"; children: React.ReactNode }) {
  return <span className={status === "live" ? styles.live : styles.soon}>{children}</span>;
}
```

- [ ] **Step 4: `Tag.module.css`** — port `.tag-live` (343-) success-tinted + `.tag-soon` (337-) subtle.
- [ ] **Step 5:** Export, build, commit — `git commit -am "feat(ui): add Pill and Tag"`

### Task 2.7: New primitive — `Table`

**Files:** Create: `components/ui/Table.tsx`, `Table.module.css`; Modify: `index.ts`

- [ ] **Step 1: `Table.tsx`** wraps `<table>` in a `.table-wrap` scroller:

```tsx
import styles from "./Table.module.css";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={styles.wrap}>
      <table className={`${styles.table} ${className ?? ""}`}>{children}</table>
    </div>
  );
}
```

- [ ] **Step 2: `Table.module.css`** — port `.table-wrap` + `.table` (lines 420-427): hairline cells, mono uppercase `thead`, `min-width: 520px`, hover row tint, `.num`/`.tok` helpers as `:global`.
- [ ] **Step 3:** Export, build, commit — `git commit -am "feat(ui): add Table"`

### Task 2.8: New primitive — `Note` + `AsideCard`

**Files:** Create: `components/ui/Note.tsx`, `Note.module.css`, `AsideCard.tsx`, `AsideCard.module.css`; Modify: `index.ts`

- [ ] **Step 1: `Note.tsx`** (optional mono kicker + body):

```tsx
import styles from "./Note.module.css";

export function Note({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div className={styles.note}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      {children}
    </div>
  );
}
```

- [ ] **Step 2: `Note.module.css`** — port `.note` + `.note-k` (lines 561-564).
- [ ] **Step 3: `AsideCard.tsx`** — sticky sidebar card:

```tsx
import styles from "./AsideCard.module.css";

export function AsideCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <aside className={`${styles.aside} ${className ?? ""}`}>{children}</aside>;
}
```

- [ ] **Step 4: `AsideCard.module.css`** — port `.aside-card` (line 410): surface, `--r-lg`, `position: sticky; top: 88px`.
- [ ] **Step 5:** Export, build, commit — `git commit -am "feat(ui): add Note and AsideCard"`

### Task 2.9: New primitive — `CodeBlock` (with copy button)

**Files:** Create: `components/ui/CodeBlock.tsx`, `CodeBlock.module.css`; Modify: `index.ts`

This replaces the prototype's site-wide `lineage.js` copy-button wiring with a self-contained client component.

- [ ] **Step 1: `CodeBlock.tsx`** (`"use client"`, copy via `navigator.clipboard` with textarea fallback, "Copied" for 1.6s):

```tsx
"use client";

import { useCallback, useRef, useState } from "react";

import styles from "./CodeBlock.module.css";

export function CodeBlock({ lang = "code", children }: { lang?: string; children: React.ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const text = preRef.current?.innerText ?? "";
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
      done();
    }
  }, []);

  return (
    <div className={styles.block}>
      <div className={styles.bar}>
        <span className={styles.lang}>{lang}</span>
        <button type="button" className={styles.copy} aria-label="Copy code to clipboard" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className={styles.code}>{children}</pre>
    </div>
  );
}
```

- [ ] **Step 2: `CodeBlock.module.css`** — port `.code-block`, `.code-bar`, `.code-lang`, `.code` (lines 437-441, 567-570) and the `.code-copy` button styles + `.is-done` (read them in `lineage.css` just below 570).
- [ ] **Step 3:** Export, build, commit — `git commit -am "feat(ui): add CodeBlock with copy button"`

### Task 2.10: New primitives — get-tokens form set (`Field`, `Input`, `Segmented`, `StatusBar`, `Cooldown`)

**Files:** Create under `components/ui/`: `Field.tsx`/`.module.css`, `Input.tsx`/`.module.css`, `Segmented.tsx`/`.module.css`, `StatusBar.tsx`/`.module.css`, `Cooldown.tsx`/`.module.css`; Modify: `index.ts`

- [ ] **Step 1: `Field.tsx`** — label + hint/error scaffold:

```tsx
import styles from "./Field.module.css";

export function Field({ label, hint, error, htmlFor, children }: {
  label: string; hint?: string; error?: string; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>{label}</label>
      {children}
      {error ? <p className={styles.error}>{error}</p> : hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  );
}
```

- [ ] **Step 2: `Input.tsx`** — forwards props, `mono` + `prefix` options:

```tsx
import styles from "./Input.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { mono?: boolean; prefix?: string };

export function Input({ mono, prefix, className, ...rest }: InputProps) {
  const input = <input className={`${styles.input} ${mono ? styles.mono : ""} ${className ?? ""}`} {...rest} />;
  if (!prefix) return input;
  return (
    <div className={styles.prefixRow}>
      <span className={styles.prefix}>{prefix}</span>
      {input}
    </div>
  );
}
```

- [ ] **Step 3: `Segmented.tsx`** — controlled two-option toggle:

```tsx
import styles from "./Segmented.module.css";

export type SegmentedOption = { value: string; label: string };

export function Segmented({ options, value, onChange }: {
  options: SegmentedOption[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className={styles.segmented} role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          className={o.value === value ? styles.active : styles.seg}
          onClick={() => onChange(o.value)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: `StatusBar.tsx`** — tinted inline banner:

```tsx
import styles from "./StatusBar.module.css";

export type StatusTone = "ok" | "warn" | "err" | "info";

export function StatusBar({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return <div className={`${styles.bar} ${styles[tone]}`} role="status">{children}</div>;
}
```

- [ ] **Step 5: `Cooldown.tsx`** — `"use client"` countdown to a timestamp (`localStorage`-persisted by the caller; this component just renders remaining time):

```tsx
"use client";

import { useEffect, useState } from "react";

import styles from "./Cooldown.module.css";

export function formatRemaining(ms: number): string {
  if (ms <= 0) return "ready";
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function Cooldown({ until, onElapsed }: { until: number; onElapsed?: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (until <= now) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [until, now]);
  useEffect(() => {
    if (until <= now) onElapsed?.();
  }, [until, now, onElapsed]);
  return <span className={styles.cooldown}>{formatRemaining(until - now)}</span>;
}
```

- [ ] **Step 6:** Port the CSS for each from `lineage.css` (`.field*`, `.input*`/`.input--mono`/`.input-prefix`, `.segmented`, `.statusbar`/`--ok`/`--warn`/`--err`/`--info`, `.cooldown` — all defined past line 570; read the file). Focus state on `.input` = cyan border + 3px cyan glow ring.
- [ ] **Step 7: Unit-check `formatRemaining`**

Create `components/ui/Cooldown.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatRemaining } from "./Cooldown.tsx"; // run via the check below
```
Then verify the logic inline instead (TS import in node test needs a loader); simplest: assert in a scratch node REPL:
```bash
node --input-type=module -e "
const f=(ms)=>{if(ms<=0)return 'ready';const t=Math.ceil(ms/1000);const m=Math.floor(t/60),s=t%60;return m+':'+String(s).padStart(2,'0')};
import('node:assert').then(({strict:a})=>{a.equal(f(0),'ready');a.equal(f(1000),'0:01');a.equal(f(65000),'1:05');console.log('ok')});
"
```
Expected: `ok`.

- [ ] **Step 8:** Export all from `index.ts`. `npm run build`.
- [ ] **Step 9:** Commit — `git commit -am "feat(ui): add get-tokens form primitives"`

---

## Phase 3 — Clearing Lattice hero

### Task 3.1: Implement `LatticeCanvas`

**Files:**
- Create: `components/home/LatticeCanvas.tsx`, `components/home/LatticeCanvas.module.css`

Port the algorithm from `design-prototype/js/lineage.js` lines 74-171. Reduced-motion → one static settled frame; DPR ≤ 2; density capped via `gap`; teardown cancels RAF + listeners; pause when tab hidden.

- [ ] **Step 1: `LatticeCanvas.tsx`** (`"use client"`):

```tsx
"use client";

import { useEffect, useRef } from "react";

import styles from "./LatticeCanvas.module.css";

type Cell = { x: number; y: number; ph: number; s: number };
type Wave = { x: number; y: number; age: number; speed: number };

export function LatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cells: Cell[] = [], waves: Wave[] = [], t = 0;
    let raf = 0, last = 0, spawnAt = 0, diag = 1, resizeTimer = 0;

    function build() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      diag = Math.hypot(W, H) + 160;
      cells = [];
      const gap = Math.max(58, Math.min(88, Math.round(W / 15)));
      const cols = Math.ceil(W / gap) + 2, rows = Math.ceil(H / gap) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const off = r % 2 ? gap * 0.5 : 0;
          cells.push({ x: c * gap + off - gap, y: r * gap - gap, ph: Math.random() * 6.28, s: 0.82 + Math.random() * 0.3 });
        }
      }
      waves = [];
    }

    function spawnWave() {
      waves.push({ x: Math.random() * W, y: Math.random() * H, age: 0, speed: 88 + Math.random() * 46 });
    }

    function render(dt: number) {
      t += dt;
      ctx.clearRect(0, 0, W, H);
      for (let w = waves.length - 1; w >= 0; w--) {
        waves[w].age += dt;
        if (waves[w].age * waves[w].speed > diag) waves.splice(w, 1);
      }
      ctx.lineCap = "round"; ctx.lineWidth = 1.4;
      for (const C of cells) {
        let lit = 0;
        for (const Wv of waves) {
          const dist = Math.hypot(C.x - Wv.x, C.y - Wv.y) - Wv.age * Wv.speed;
          if (dist < 60 && dist > -60) {
            const g = Math.exp(-(dist * dist) / (2 * 23 * 23));
            lit += g * Math.max(0, 1 - (Wv.age * Wv.speed) / diag);
          }
        }
        if (lit > 1) lit = 1;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + C.ph);
        const a = 0.05 + 0.035 * tw + lit * 0.5;
        const hs = 7 * C.s * (1 + lit * 0.14), gp = hs * 0.26;
        if (lit > 0.14) {
          const bl = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, hs * 3);
          bl.addColorStop(0, `oklch(84% 0.15 165 / ${(0.18 * lit).toFixed(3)})`);
          bl.addColorStop(1, "oklch(84% 0.15 165 / 0)");
          ctx.fillStyle = bl; ctx.beginPath(); ctx.arc(C.x, C.y, hs * 3, 0, Math.PI * 2); ctx.fill();
        }
        ctx.strokeStyle = `oklch(78% 0.12 218 / ${(a * 0.9).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(C.x - hs, C.y - hs); ctx.lineTo(C.x - gp, C.y - gp);
        ctx.moveTo(C.x + gp, C.y + gp); ctx.lineTo(C.x + hs, C.y + hs);
        ctx.stroke();
        ctx.strokeStyle = `oklch(82% 0.16 165 / ${Math.min(1, a * 0.9 + lit * 0.45).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(C.x + hs, C.y - hs); ctx.lineTo(C.x + gp, C.y - gp);
        ctx.moveTo(C.x - gp, C.y + gp); ctx.lineTo(C.x - hs, C.y + hs);
        ctx.stroke();
      }
    }

    function frame(ts: number) {
      const dt = Math.min(((ts - last) || 16) / 1000, 0.05); last = ts;
      spawnAt -= dt;
      if (spawnAt <= 0 && waves.length < 4) { spawnWave(); spawnAt = 1.5 + Math.random() * 1.9; }
      render(dt);
      raf = requestAnimationFrame(frame);
    }

    function staticFrame() {
      waves = [
        { x: W * 0.30, y: H * 0.40, age: 1.1, speed: 120 },
        { x: W * 0.72, y: H * 0.62, age: 1.8, speed: 120 },
      ];
      render(0);
    }

    function start() {
      build();
      if (reduce) { staticFrame(); return; }
      cancelAnimationFrame(raf); last = 0; spawnAt = 0.5; raf = requestAnimationFrame(frame);
    }

    function onResize() { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(start, 180); }
    function onVisibility() {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = 0; raf = requestAnimationFrame(frame); }
    }

    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
```

- [ ] **Step 2: `LatticeCanvas.module.css`** — absolute-fill canvas behind a radial mask (port `.hero canvas`, lines 256-261):

```css
.canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 35%, #000 55%, transparent);
  mask-image: radial-gradient(ellipse 75% 70% at 50% 35%, #000 55%, transparent);
}
```

- [ ] **Step 3:** Verify `npm run build`.
- [ ] **Step 4:** Commit — `git commit -am "feat(home): add Clearing Lattice canvas"`

### Task 3.2: Swap `HeroShader` → `LatticeCanvas`, delete the shader

**Files:**
- Modify: `components/home/Hero.tsx`
- Delete: `components/home/HeroShader.tsx`, `HeroShader.module.css`, `HeroShaderDynamic.tsx`

- [ ] **Step 1:** In `Hero.tsx` replace the `HeroShaderDynamic` import + `<div className={styles.shader}><HeroShaderDynamic /></div>` with:

```tsx
import { LatticeCanvas } from "./LatticeCanvas";
// ...
<LatticeCanvas />
```
(Place it as the first child of the `<section>`, before `<Container>`. The canvas is absolutely positioned via its module CSS.)

- [ ] **Step 2:** Delete the three shader files:
```bash
git rm components/home/HeroShader.tsx components/home/HeroShader.module.css components/home/HeroShaderDynamic.tsx
```

- [ ] **Step 3:** Verify build + open `/`: animation runs; toggle OS reduce-motion → static frame; resize → no leak/jank. No horizontal scroll.

- [ ] **Step 4:** Commit — `git commit -am "feat(home): replace WebGL hero with Clearing Lattice"`

---

## Phase 4 — Re-skin existing pages + chrome

### Task 4.1: `SiteHeader` — Developers dropdown + nav per prototype

**Files:**
- Modify: `components/SiteHeader.tsx`, `components/SiteHeader.module.css`

Port the prototype nav grammar (lines 163-213): tabs with aurora active-underline; a **Developers** `nav-group` dropdown (Overview · Docs · Roadmap) with desktop hover/click-open, click-outside + Escape close, auto-`is-current` when a child is active; mobile (≤1024px) shows the group expanded; brand uses the new mark SVG; primary CTA → Get tokens.

- [ ] **Step 1:** Replace `NAV_ITEMS` with the prototype IA and a grouped entry:

```tsx
const NAV_ITEMS = [
  { label: "Technology", href: "/technology" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Research", href: "/research" },
] as const;

const DEV_GROUP = {
  label: "Developers",
  items: [
    { label: "Overview", href: "/developers" },
    { label: "Docs", href: "/docs" },
    { label: "Roadmap", href: "/roadmap" },
  ],
} as const;
```

- [ ] **Step 2:** Add a `usePathname()` (from `next/navigation`) to mark `aria-current="page"` on the active tab and `is-current` on the group when the path matches any group item. Add a `groupOpen` state with: trigger `onClick` toggles (desktop only), a document `click` listener closing on outside-click, and the existing Escape handler also closing the group. Render the dropdown markup mapping `.nav-group`/`.nav-group-trigger`/`.nav-menu` classes.

- [ ] **Step 3:** Swap the brand logo `<img src="/images/lineage-logo.png">` for the new mark:
```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/brand/lineage-mark.svg" alt="Lineage" className={styles.logo} />
```

- [ ] **Step 4:** Change the header CTA to Get tokens:
```tsx
<Button variant="primary" size="sm" href="/get-tokens">Get tokens</Button>
```

- [ ] **Step 5:** Port the prototype header/nav/dropdown CSS into `SiteHeader.module.css` (lines 163-213): sticky frosted header (`backdrop-filter`), aurora `aria-current` underline, dropdown panel surface + hairline + reveal on hover/`is-open`, mobile collapse at ≤1024px. Keep the existing `--site-header-offset` ResizeObserver logic.

- [ ] **Step 6:** Verify: build; keyboard-tab through nav (focus rings visible, Escape closes dropdown, click-outside closes); mobile menu at 390px; active tab underline matches current route.

- [ ] **Step 7:** Commit — `git commit -am "feat(nav): Developers dropdown + prototype header"`

### Task 4.2: `SiteFooter` — prototype sitemap + meta

**Files:** Modify: `components/SiteFooter.tsx`, `components/SiteFooter.module.css`

- [ ] **Step 1:** Rebuild the footer columns to match `design-prototype/partials/_chrome.html` (read its footer block) — sitemap columns + `footer-meta` row with the `Signal` status dot. Port `.site-footer`/`.footer-cols`/`.footer-col`/`.footer-meta` (lines 509-517).
- [ ] **Step 2:** Verify build + diff against prototype footer at 1440 and 390px.
- [ ] **Step 3:** Commit — `git commit -am "feat(nav): prototype footer sitemap"`

### Task 4.3: Re-skin home page sections

**Files:** Modify: `app/page.tsx`, `components/home/*` (FeatureGrid, AudienceRouter, EvidenceBlock, GetStartedGrid + their `.module.css`)

- [ ] **Step 1:** Port copy + structure from `design-prototype/index.html` section-by-section into the existing home components, using the re-skinned primitives (`Section`, `Card --rail`, `Eyebrow --feature`, `Stat`, `LinkCta`). Alternate `.section` / `--band` for rhythm (never 3 same in a row). Do not invent metrics — use prototype values/placeholders verbatim.
- [ ] **Step 2:** Verify build + full visual diff of `/` against `index.html` at 390/768/1440.
- [ ] **Step 3:** Commit — `git commit -am "feat(home): port prototype content + re-skin"`

### Task 4.4: Re-skin `technology` (ARCO loop + efficiency chart)

**Files:** Modify: `app/technology/page.tsx`, `components/arco-sim/*`

- [ ] **Step 1:** Port `technology.html`. Reuse `ArcoSimulator` (re-skinned to tokens). Build the `arco-loop` (lines 354-393) and `effchart` SVG (lines 452-467, copy the SVG markup + `@keyframes ecDraw`/`ecFade` from `lineage.css`) as page-local components/CSS modules under `components/technology/`. Honor reduced-motion (no draw animation).
- [ ] **Step 2:** Verify build + diff `/technology`.
- [ ] **Step 3:** Commit — `git commit -am "feat(technology): port ARCO loop + efficiency chart"`

### Task 4.5: Re-skin `tokenomics`

**Files:** Modify: `app/tokenomics/page.tsx`, `components/tokenomics/*`

- [ ] **Step 1:** Port `tokenomics.html`. Reuse `TokenomicsChart` (re-skinned). Build `tiers`/`tier` and `phases`/`phase` (lines 444-449) as page-local modules under `components/tokenomics/`.
- [ ] **Step 2:** Verify build + diff `/tokenomics`.
- [ ] **Step 3:** Commit — `git commit -am "feat(tokenomics): port content + tiers/phases"`

### Task 4.6: Re-skin `developers`, `ecosystem`, `research`

**Files:** Modify: `app/developers/page.tsx`, `app/ecosystem/page.tsx`, `app/research/page.tsx`

- [ ] **Step 1:** Port each from its prototype HTML (`developers.html`, `ecosystem.html`, `research.html`) using shared primitives (`Section`, `Card`, `grid--moat` for ecosystem's 3+2, `Prose`, `Table`, `LinkCta`). Preserve `research`'s existing Zenodo data wiring (`lib/research-zenodo.ts`) — re-skin only.
- [ ] **Step 2:** Verify build + diff all three pages.
- [ ] **Step 3:** Commit — `git commit -am "feat(site): port developers/ecosystem/research"`

### Task 4.7: Re-skin the `/docs` shell + API pages

**Files:** Modify: `components/docs/*.module.css`, `app/docs/layout.tsx` as needed

- [ ] **Step 1:** Port the docs visual system (lines 479-558): `.docs` grid, `.docs-nav` sticky scroll-spy nav with `aria-current` accent border, `.docs-main` measure caps + `.crumbs`, `.endpoint`/`.api-host`, `.pill` method tags (reuse `Pill`), `.code-block` (reuse `CodeBlock`). Re-skin only — do NOT change the existing `DocsLayoutShell` scroll/pinning logic or `DocsNavTree` behavior; just restyle to the new tokens.
- [ ] **Step 2:** Verify: build; open `/docs` and an API page (e.g. `/docs/api/mempool/info`); confirm scroll-spy still highlights, no layout regression, code copy works.
- [ ] **Step 3:** Commit — `git commit -am "feat(docs): re-skin docs shell + API pages"`

---

## Phase 5 — New pages

### Task 5.1: `roadmap` route

**Files:** Create: `app/roadmap/page.tsx`, `components/roadmap/*` (phase-strip, release, timeline modules + CSS)

- [ ] **Step 1:** Port `design-prototype/roadmap.html`. Build page-local modules for `phase-strip`, `release`/`--final`/`release__*`, `timeline`, and `ws`/`ws-grid` (read their CSS in `lineage.css` past line 570). Add `export const metadata` (title/description) following the pattern in a sibling page.
- [ ] **Step 2:** Verify build + diff `/roadmap`.
- [ ] **Step 3:** Commit — `git commit -am "feat(roadmap): add roadmap page"`

### Task 5.2: `about` route + team grid

**Files:** Create: `app/about/page.tsx`, `components/about/TeamGrid.tsx` + `.module.css`, `Person.tsx`

- [ ] **Step 1:** Port `about.html`. `Person` card = photo-or-monogram avatar (use `/team/*.jpg`, fall back to a monogram when no photo), name, role, bio, LinkedIn link. `TeamGrid`/`--2` layout (port `.team-grid`/`.person__*` from `lineage.css`). Use `next/image` for headshots.
- [ ] **Step 2:** Verify build + diff `/about` (avatars load; monogram fallback renders).
- [ ] **Step 3:** Commit — `git commit -am "feat(about): add about page + team grid"`

### Task 5.3: `get-tokens` route (front-end + states only)

**Files:** Create: `app/get-tokens/page.tsx`, `components/get-tokens/GetTokensClient.tsx` + `.module.css`, `components/get-tokens/config.ts`

- [ ] **Step 1: `config.ts`** — the single placeholder CONFIG block (compliance-pending; mark clearly):

```ts
/**
 * PLACEHOLDER business values — pending compliance sign-off.
 * No real payments or token dispensing happen client-side; see
 * design-prototype/get-tokens-backend.md for the eventual server contract.
 */
export const GET_TOKENS_CONFIG = {
  currency: "USD",
  ratePerToken: 0.10,
  purchaseCapTokens: 100_000,
  faucet: { amountTokens: 50, cooldownMs: 24 * 60 * 60 * 1000 },
} as const;

export const FAUCET_STORAGE_KEY = "lngx-faucet-last-claim";
```

- [ ] **Step 2: `GetTokensClient.tsx`** (`"use client"`) — `Segmented` Buy/Faucet toggle; Buy form (amount `Input --mono` with prefix, computed total, purchase-cap validation) and Faucet form (address `Input --mono`); stubbed submit handlers that drive `StatusBar` through idle → loading → success/error (no network). Faucet claim writes `Date.now()` to `localStorage[FAUCET_STORAGE_KEY]` and shows `<Cooldown until={last + cooldownMs} />`; while cooling down, the claim button is disabled. Include the legal line + agent aside (`Note`) from the prototype.

```tsx
"use client";

import { useState } from "react";

import { Field, Input, Segmented, StatusBar, Cooldown, Button, Note } from "@/components/ui";
import { FAUCET_STORAGE_KEY, GET_TOKENS_CONFIG } from "./config";
import styles from "./GetTokensClient.module.css";

type Mode = "buy" | "faucet";
type SubmitState = { tone: "ok" | "warn" | "err" | "info"; msg: string } | null;

export function GetTokensClient() {
  const [mode, setMode] = useState<Mode>("buy");
  const [status, setStatus] = useState<SubmitState>(null);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [faucetUntil, setFaucetUntil] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const last = Number(window.localStorage.getItem(FAUCET_STORAGE_KEY) ?? 0);
    return last ? last + GET_TOKENS_CONFIG.faucet.cooldownMs : 0;
  });

  const cap = GET_TOKENS_CONFIG.purchaseCapTokens;
  const cooling = faucetUntil > Date.now();

  function submitBuy(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!n || n <= 0) return setStatus({ tone: "err", msg: "Enter a valid amount." });
    if (n > cap) return setStatus({ tone: "warn", msg: `Amount exceeds the ${cap.toLocaleString()} LNGX cap.` });
    setStatus({ tone: "info", msg: "Redirecting to checkout…" });
    // Stub: real Stripe Checkout is server-side (not implemented here).
    window.setTimeout(() => setStatus({ tone: "ok", msg: "Checkout session would open here." }), 700);
  }

  function submitFaucet(e: React.FormEvent) {
    e.preventDefault();
    if (cooling) return;
    if (!address.trim()) return setStatus({ tone: "err", msg: "Enter a wallet address." });
    setStatus({ tone: "info", msg: "Submitting faucet request…" });
    window.setTimeout(() => {
      const now = Date.now();
      window.localStorage.setItem(FAUCET_STORAGE_KEY, String(now));
      setFaucetUntil(now + GET_TOKENS_CONFIG.faucet.cooldownMs);
      setStatus({ tone: "ok", msg: `${GET_TOKENS_CONFIG.faucet.amountTokens} LNGX would be sent.` });
    }, 700);
  }

  return (
    <div className={styles.surface}>
      <Segmented
        options={[{ value: "buy", label: "Buy LNGX" }, { value: "faucet", label: "Faucet" }]}
        value={mode}
        onChange={(v) => { setMode(v as Mode); setStatus(null); }}
      />
      {status ? <StatusBar tone={status.tone}>{status.msg}</StatusBar> : null}
      {mode === "buy" ? (
        <form onSubmit={submitBuy}>
          <Field label="Amount (LNGX)" htmlFor="amt" hint={`Rate ${GET_TOKENS_CONFIG.currency} ${GET_TOKENS_CONFIG.ratePerToken.toFixed(2)} / token · cap ${cap.toLocaleString()}`}>
            <Input id="amt" mono prefix="LNGX" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Button variant="primary" type="submit">Continue to checkout</Button>
        </form>
      ) : (
        <form onSubmit={submitFaucet}>
          <Field label="Wallet address" htmlFor="addr" hint={`Dispenses ${GET_TOKENS_CONFIG.faucet.amountTokens} LNGX, once per cooldown.`}>
            <Input id="addr" mono value={address} onChange={(e) => setAddress(e.target.value)} placeholder="0x…" />
          </Field>
          <Button variant="primary" type="submit" disabled={cooling}>
            {cooling ? <>Cooldown · <Cooldown until={faucetUntil} onElapsed={() => setFaucetUntil(0)} /></> : "Request tokens"}
          </Button>
        </form>
      )}
      <Note kicker="Programmatic access">Agents can call the faucet/checkout endpoints directly once published.</Note>
      <p className={styles.legal}>Values shown are placeholders pending compliance review. No purchase or transfer is processed by this page.</p>
    </div>
  );
}
```

- [ ] **Step 3: `app/get-tokens/page.tsx`** — server component shell with `metadata`, page head, and `<GetTokensClient />`; port surrounding copy + tiers from `get-tokens.html`.
- [ ] **Step 4:** Port `GetTokensClient.module.css` (`.surface`, `.legal`, tx-* surfaces) from `lineage.css`.
- [ ] **Step 5:** Verify: build; open `/get-tokens`; exercise both forms through all states; claim faucet → cooldown shows + persists across reload; cap validation fires.
- [ ] **Step 6:** Commit — `git commit -am "feat(get-tokens): add front-end + states (no backend)"`

### Task 5.4: Wire new routes into nav, sitemap, robots

**Files:** Modify: `app/sitemap.ts`, `components/SiteFooter.tsx` (if not already), confirm `SiteHeader` (Task 4.1)

- [ ] **Step 1:** Add `/roadmap`, `/about`, `/get-tokens` entries to the `marketing` array in `app/sitemap.ts` (mirror the existing entry shape; `priority` 0.7-0.8).
- [ ] **Step 2:** Confirm footer + header link to all three.
- [ ] **Step 3:** Verify build; `curl`-free check: open `/sitemap.xml` in dev and confirm the three URLs appear.
- [ ] **Step 4:** Commit — `git commit -am "feat(site): index new routes in sitemap + nav"`

---

## Phase 6 — Design-system docs + final QA

### Task 6.1: Port the design-system docs into `docs/`

**Files:**
- Create: `docs/design-system/DESIGN.md`, `docs/design-system/components.md`, `docs/design-system/brand-mark.md`
- Modify: `docs/brand-system.md`, `AGENTS.md`

- [ ] **Step 1:** Copy the three portable docs:
```bash
mkdir -p docs/design-system
cp design-prototype/design-system/DESIGN.md docs/design-system/DESIGN.md
cp design-prototype/design-system/components.md docs/design-system/components.md
cp design-prototype/design-system/brand-mark.md docs/design-system/brand-mark.md
```
- [ ] **Step 2:** In `components.md`, add a short header note mapping prototype classes → React components (`.btn*`→`components/ui/Button`, `.card*`→`Card`, etc.) so future work finds the implemented version.
- [ ] **Step 3:** Rewrite `docs/brand-system.md`: replace all lime/blue palette references with the emerald/cyan OKLch values; document that `app/globals.css` `:root` is the token SSOT; note the reconciled token names (`--font-display/body/mono`, `--ease`, `--gutter`) and the retained app-only tokens; point to `docs/design-system/` for principles.
- [ ] **Step 4:** Update the `AGENTS.md` "Brand and UI" pointer to reference `docs/design-system/DESIGN.md` (principles) alongside `globals.css` (tokens).
- [ ] **Step 5:** Commit — `git commit -am "docs(brand): port design system, rewrite brand-system for v2"`

### Task 6.2: Final QA pass

**Files:** none (verification only; fix-forward with focused commits as issues surface)

- [ ] **Step 1: Build + lint clean** — `npm run build && npm run lint` → both PASS.
- [ ] **Step 2: Responsive** — at 360/390/430/768/1024/1440px, walk every route (home, technology, tokenomics, developers, ecosystem, research, docs, roadmap, about, get-tokens) and confirm **no horizontal scroll** and the nav collapses ≤1024px.
- [ ] **Step 3: Reduced motion** — enable OS reduce-motion; confirm the hero renders a static frame, reveals are instant, the Signal dot doesn't pulse, the efficiency chart doesn't draw.
- [ ] **Step 4: Focus + a11y** — keyboard-tab the whole site; every interactive element shows the cyan focus ring; the Developers dropdown is operable by keyboard; images have alt text; the skip-link works.
- [ ] **Step 5: §9 anti-pattern audit** (from `docs/design-system/DESIGN.md`): no light surfaces; emerald rationed (one glow focal per view); accents not swapped; no pill buttons; hairlines over fills; no invented metrics; mono not used as body; no exposed design-process chrome.
- [ ] **Step 6: Grep guard** — confirm no stray legacy palette hex remains in app stylesheets:
```bash
grep -rIn -e '#d4f952' -e '#5eb0ff' -e '#bfe63a' app components | grep -v node_modules
```
Expected: empty.
- [ ] **Step 7: Commit any fixes**, then the port is complete.

---

## Self-review

**Spec coverage:** Phase 1 ↔ spec §1/§2/§6-assets (tokens, fonts, assets) ✓; Phase 2 ↔ spec §4 (re-skin + new primitives incl. form set) ✓; Phase 3 ↔ spec §3 (Clearing Lattice replacing HeroShader) ✓; Phase 4 ↔ spec §5-existing-pages + chrome ✓; Phase 5 ↔ spec §5-new-pages (roadmap/about/get-tokens front-end-only) ✓; Phase 6 ↔ spec §7 (docs only) + §8 (QA) ✓. No spec requirement left unmapped.

**Placeholder scan:** No "TBD/TODO/handle edge cases" left in steps. CSS-port steps cite exact prototype line ranges (canonical text in-repo) instead of re-typing — intentional, not a placeholder. The `get-tokens` CONFIG is a deliberate spec'd placeholder, labelled as such.

**Type consistency:** `formatRemaining`/`Cooldown.until` (Task 2.10) match their use in `GetTokensClient` (Task 5.3); `StatusTone`/`PillTone`/`SegmentedOption` names are consistent across definition and use; `--font-space-grotesk` rename (Task 1.1) matches the `--font-display` token reference (Task 1.2) and the consumer rename (Task 1.3) leaves no `--font-family-*` behind (verified by the Step-2 grep). `LatticeCanvas` export name matches the `Hero.tsx` import (Task 3.2).
