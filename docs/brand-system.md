# Lineage site — brand system (v2, shipped)

**Design principles:** [docs/design-system/DESIGN.md](design-system/DESIGN.md)  
**Component class / React mapping:** [docs/design-system/components.md](design-system/components.md)  
**Logo construction + usage:** [docs/design-system/brand-mark.md](design-system/brand-mark.md)  
**Token source of truth:** `app/globals.css` (`:root`) — all CSS custom properties live here; do not add stray hex in stylesheets.  
**Product scope:** [tasks/prd-web3-brand-rebrand.md](../tasks/prd-web3-brand-rebrand.md)

---

## Palette overview

The shipped palette is a **teal-space OKLch dark system** with two accents: **emerald (action)** and **cyan (interaction)**. There is no light theme.

- **Emerald = action.** `--color-accent` (`oklch(82% 0.16 165)`) is for primary CTAs, selection, and one highlighted word per view. Never use it as a background fill or swap it with cyan.
- **Cyan = interaction.** `--color-link` (`oklch(78% 0.12 218)`) is for links, keyboard focus, feature eyebrow chips, and hover borders. Never use it as a primary action color.
- **Aurora = the single flourish.** `--grad-aurora` (a `linear-gradient` from cyan to emerald) appears on exactly one focal element per view — a section top-rule, a card hover-rail, or the logo. Never a full-page wash.

---

## Public CSS variables — complete token list

All tokens are defined in `app/globals.css` `:root`. Components must use `var(--…)` exclusively; never add hex literals to stylesheets.

### Surfaces

| Token | Value | Role |
|---|---|---|
| `--color-bg-canvas` | `oklch(13% 0.018 200)` | Deepest base; body background root |
| `--color-bg` | `oklch(15% 0.018 200)` | Main chrome (header, footer, solid fills) |
| `--color-bg-raised` | `oklch(18% 0.020 200)` | Subtle lift between bg and card |
| `--color-surface` | `oklch(20% 0.022 200)` | Cards, blocks |
| `--color-surface-2` | `oklch(25% 0.024 198)` | Hover / emphasis panels |

### Text

| Token | Value | Role |
|---|---|---|
| `--color-text` | `oklch(95% 0.010 195)` | Primary copy |
| `--color-text-muted` | `oklch(73% 0.016 195)` | Secondary copy |
| `--color-text-subtle` | `oklch(60% 0.016 195)` | Tertiary / metadata |
| `--color-text-inverse` | `oklch(16% 0.030 190)` | On-emerald fills only |

### Borders

| Token | Value | Role |
|---|---|---|
| `--color-border` | `oklch(29% 0.022 200)` | Hairline structure |
| `--color-border-strong` | `oklch(38% 0.026 200)` | Emphasised rules + secondary button |

### Emerald — action (rationed)

| Token | Value | Role |
|---|---|---|
| `--color-accent` | `oklch(82% 0.16 165)` | Primary CTA, selection, one highlight word |
| `--color-accent-strong` | `oklch(86% 0.15 167)` | Hover state for emerald fills |
| `--color-accent-ink` | `oklch(18% 0.05 175)` | Text on emerald fills |

### Cyan — interaction

| Token | Value | Role |
|---|---|---|
| `--color-link` | `oklch(78% 0.12 218)` | Links, interactive rails |
| `--color-link-hover` | `oklch(85% 0.11 218)` | Link hover |
| `--color-focus-ring` | `oklch(78% 0.12 218 / 0.55)` | Focus-visible ring (never for large fills) |

### Status — product UI, sparing

| Token | Value | Role |
|---|---|---|
| `--color-success` | `oklch(83% 0.17 150)` | Success state |
| `--color-warning` | `oklch(82% 0.14 80)` | Warning state |
| `--color-danger` | `oklch(68% 0.18 18)` | Error / danger state |

### Flourish + effects

| Token | Value | Role |
|---|---|---|
| `--grad-aurora` | `linear-gradient(105deg, oklch(80% 0.13 215), oklch(83% 0.17 162))` | Cyan→emerald gradient; one focal element per view |
| `--glow-accent` | (see globals.css) | Emerald drop-glow; one focal element per view |
| `--color-overlay-scrim` | `oklch(13% 0.018 200 / 0.72)` | Mobile nav backdrop, overlays |
| `--shadow-elev-1` | (see globals.css) | Elevation shadow; mostly on hover |

### Typography tokens

| Token | Resolves to | Role |
|---|---|---|
| `--font-display` | `var(--font-space-grotesk)`, "Space Grotesk", system-ui, sans-serif | Headlines, headings, buttons |
| `--font-body` | `var(--font-inter)`, "Inter", system-ui, -apple-system, sans-serif | Paragraphs, UI text, nav |
| `--font-mono` | `var(--font-jetbrains-mono)`, "JetBrains Mono", ui-monospace, monospace | Code, IDs, hashes, addresses, metrics, eyebrows |

`--font-space-grotesk`, `--font-inter`, and `--font-jetbrains-mono` are CSS variables injected by `next/font` via the className on `<html>` / `<body>` in `app/layout.tsx`. The `--font-display` / `--font-body` / `--font-mono` tokens bridge to these with fallbacks.

| Fluid scale token | Role |
|---|---|
| `--fs-display` | Hero headlines |
| `--fs-h1` … `--fs-h3` | Heading levels |
| `--fs-lead` | Lede / intro paragraphs |
| `--fs-body` | Body copy (1rem) |
| `--fs-small` | Small / caption text |
| `--fs-caption` | Eyebrow / label text |

| Rhythm token | Value | Role |
|---|---|---|
| `--lh-display` | `1.04` | Display headings |
| `--lh-tight` | `1.12` | Tight headings |
| `--lh-heading` | `1.3` | Section headings |
| `--lh-body` | `1.65` | Body paragraphs |
| `--lh-lead` | `1.55` | Lede paragraphs |

| Tracking token | Value | Role |
|---|---|---|
| `--ls-display` | `-0.02em` | Display headlines |
| `--ls-heading` | `-0.01em` | Section headings |
| `--ls-body` | `0` | Body copy |
| `--ls-eyebrow` | `+0.08em` | Uppercase eyebrow labels |

### Spacing, layout, motion, z-index

| Token | Value / role |
|---|---|
| `--space-1` … `--space-10` | 4px base scale: 0.25rem … 8rem |
| `--r-sm` / `--r-md` / `--r-lg` | 4px / 8px / 12px radii. Buttons and cards use `--r-md`; only eyebrow chips and status pills are fully round |
| `--border-rule` | `1px solid var(--color-border)` |
| `--border-rule-strong` | `1px solid var(--color-border-strong)` |
| `--dur-fast` / `--dur-base` / `--dur-slow` | 150ms / 220ms / 380ms |
| `--ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` — standard easing |
| `--ease-accel` | `cubic-bezier(0.4, 0, 1, 1)` — accelerate-out |
| `--z-header` / `--z-menu` / `--z-modal` | 100 / 110 / 200 |
| `--container-max` | `1200px` |
| `--gutter` | `clamp(var(--space-4), 6vw, var(--space-9))` |
| `--measure` | `70ch` — prose column max |
| `--section-py` | `var(--space-9)` — section vertical padding |

---

## Canvas / Plotly hex exceptions

**Canvas APIs and Plotly do not read CSS custom properties.** Two components duplicate palette hex values inline, with comments tracking the corresponding token:

- `components/home/LatticeCanvas.tsx` — the procedural Clearing Lattice hero animation uses hex approximations of `--color-accent`, `--color-link`, and related tokens for `fillStyle`. The inline comments are the contract linking those values to `app/globals.css`.
- `components/tokenomics/TokenomicsChart.tsx` — `CHART_SLICE_COLORS`, `TEXT` / `TEXT_MUTED` / `TEXT_SUBTLE`, `DELTA_*` constants duplicate palette hex for 2D canvas `fillStyle`.
- `components/arco-sim/ArcoSimulator.tsx` — `PLOT_BG`, `PLOT_TEXT`, `PLOT_MUTED`, `PLOT_GRID` mirror v2 token hex for Plotly's API.

When palette token values change in `app/globals.css`, update these constants in the same commit. No other JS / CSS file should use raw hex.

---

## Contrast (WCAG 2.1 AA)

Spot-check (normal text **4.5:1**; large / UI **3:1** where applicable). The solid `--color-bg` value is used as the reference surface for chrome. Re-check any region using a lighter surface token.

| Pair | Role |
|---|---|
| `--color-text` on `--color-bg` | Primary body — well above 4.5:1 |
| `--color-text-muted` on `--color-bg` | Muted UI copy — at or above 4.5:1 for ~14px+ |
| `--color-link` on `--color-bg` | Cyan link / focus — above 4.5:1 |
| `--color-accent-ink` on `--color-accent` | On-emerald CTA — tuned for legibility |

---

## Do / don't

- **Do** use `--color-accent` for primary actions and high-emphasis CTAs.
- **Do** use `--color-link` for text links and secondary navigation affordances.
- **Do** pair `--grad-aurora` on exactly one focal element per view.
- **Don't** add extra gradients per section — use the shared `body` background + surface tokens.
- **Don't** use `--color-focus-ring` for large fills — keyboard focus outlines only.
- **Don't** introduce hex literals in any `.css` or `.module.css` file (canvas exceptions above notwithstanding).
- **Don't** swap emerald and cyan: emerald = action; cyan = interaction.

---

## Layout patterns

`Section` supports `visual="feature"` (gradient rail + chip eyebrow) and `tone="band"` (darker gradient strip with strong top/bottom rules) for alternating cadence — never three same-treatment sections in a row. See `components/ui/Section.tsx` and `docs/design-system/components.md` for the full class / React component mapping.

---

## Manual accessibility checklist (pre-sign-off)

Run on staging or production (or local `next start` with assets complete):

1. **Keyboard:** Tab through header (desktop + mobile menu open/close), main content links and buttons, footer, and one in-page form or chart control. Focus order is logical; no traps except intentional (e.g. modal).
2. **Focus visible:** Every interactive control shows a visible ring (`--color-focus-ring` / `:focus-visible`) on keyboard focus, not only on click.
3. **Contrast:** Spot-check new band sections: primary body (`--color-text` on `--color-bg` or `--color-surface`), links (`--color-link`), and primary CTAs (`--color-accent-ink` on `--color-accent`).
4. **Motion:** With **prefers-reduced-motion: reduce**, hero animation (`LatticeCanvas`) and scroll reveals (`useReveal`) are reduced or off; `body::before` grain reverts to `mix-blend-mode: normal`.

---

## Performance

There is no committed Lighthouse or RUM baseline in this repository. After each meaningful deploy:

- Run **Lighthouse** on `/` and `/technology` in a private window; compare to the previous release informally. Goal: no large avoidable regression in LCP, TBT, or CLS; home text should remain a strong LCP candidate (fonts are `display: swap`).

---

## Stakeholder sign-off

PRD §8.1: design review and approval before the rebrand is considered done for the shipping milestone. This document plus passing lint and build on the release branch are the technical gate; product sign-off is out of band.
