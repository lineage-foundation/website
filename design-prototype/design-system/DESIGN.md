# Lineage — Design System

> A Layer-1 for adaptive, trust-minimized **Smart Markets** — *"markets become verifiable programs."*
> The system is **technical yet visionary**: research-grade rigor, an organic "living" quality, no hype.

**Brand DNA:** science fiction meets business, but alive. Cinematic deep-space cool, the restraint of a research protocol, and a bioluminescent, living-light quality tied to the *"THE LIVING ECONOMY"* framing.

This file is the authoritative reference for visual principles. Tokens live in [`tokens.css`](./tokens.css); component classes in [`components.md`](./components.md); the logo in [`brand-mark.md`](./brand-mark.md).

---

## 1. Atmosphere — the non-negotiables

- **Dark by default.** Backgrounds use the `--color-bg-canvas / bg / surface` ramp. **There is no light theme — do not fabricate one.**
- **Emerald is the action color.** Reserve `--color-accent` for the primary CTA, selection, and a single highlighted word per view. Pair it with `--glow-accent` on **at most one** focal element. *Green = life / action.*
- **Cyan is the interaction color.** Links, keyboard focus, feature eyebrow chips, and hover borders use `--color-link`. *Cyan = circuitry / interaction.* **Never swap the two.**
- **Aurora is the flourish.** `--grad-aurora` (cyan→emerald) appears on exactly **one** focal element per view — a section top-rule, a card hover-rail, the logo. Never a full-page wash.
- **Hairlines over fills.** 1px `--color-border` / `--color-border-strong` plus generous whitespace define structure. No heavy fills, no left-border-accent cards.
- **Restraint.** Emerald + cyan, used deliberately; one decisive flourish per view, never three.

---

## 2. Color

Surfaces, text, borders, two accents, status, and one gradient — all in [`tokens.css`](./tokens.css). The shape of the palette:

| Group | Tokens | Rule |
|---|---|---|
| Surfaces | `--color-bg-canvas` → `--color-surface-2` | A four-step teal-tinted ramp; elevation comes from the ramp + hover, not shadows |
| Text | `--color-text` / `-muted` / `-subtle` / `-inverse` | `-inverse` only on emerald fills |
| Borders | `--color-border` / `-strong` | Hairline structure; `-strong` for emphasised rules + secondary button |
| **Emerald (action)** | `--color-accent` / `-strong` / `-ink` | Primary action, selection, one highlight word. Rationed. |
| **Cyan (interaction)** | `--color-link` / `-hover` / `--color-focus-ring` | Links, focus, interactive rails. Never as action. |
| Status | `--color-success` / `-warning` / `-danger` | Product UI only, sparing, tinted backgrounds |
| Flourish | `--grad-aurora`, `--glow-accent` | One focal element each, per view |

**Don't** introduce tokens outside this palette. Derive harmonious extensions with `oklch()` / `color-mix()` rather than inventing hex.

---

## 3. Typography

Two families + a mono. **Display and body are never the same family.**

| Role | Stack | Usage |
|---|---|---|
| Display | `"Space Grotesk", "Inter", system-ui, sans-serif` | Headlines, headings, buttons |
| Body | `"Inter", system-ui, -apple-system, sans-serif` | Paragraphs, UI text |
| Mono | `"JetBrains Mono", ui-monospace, monospace` | Code, IDs, hashes, addresses, metrics, eyebrows |

- **Fluid scale:** `--fs-display` → `--fs-caption` (see tokens). 1920-scale text never < 24px; product body ≥ 16px.
- **Rhythm:** line-heights — display `1.04`, heading `1.3`, body `1.65`. Tracking — display `-0.02em`, heading `-0.01em`, eyebrow `+0.08em`.
- **Display headings** are weight 600 with `text-wrap: balance`; h3 drops to 500.
- **The eyebrow is signature:** uppercase mono caption, `+0.08em`, muted by default. The `--feature` variant is a rounded **cyan** chip (link-cyan border/text on a 9% cyan tint, soft cyan glow).
- Mono numerics use `font-variant-numeric: tabular-nums`.

---

## 4. Spacing, radius, elevation

- **4px base scale** (`--space-1` … `--space-10`). Marketing surfaces breathe (`--section-py` = 96px); product/docs surfaces are dense.
- **Radius:** `--r-sm` 4px · `--r-md` 8px (buttons, cards, inputs) · `--r-lg` 12px (large panels). **Only eyebrow chips and status pills are fully round (999px).** No pill-shaped buttons.
- **Elevation** is sparing and appears mostly on hover (`--shadow-elev-1`). The primary button carries an emerald ring + soft drop (`--glow-accent`); reserve glow for one focal element.

---

## 5. Layout & composition

- **Container** `--container-max` 1200px, narrow 840px, fluid gutter `clamp(16px, 6vw, 96px)`, prose measure ~70ch. Docs use a full-bleed `.container--docs`.
- **Section rhythm:** `--section-py` vertical padding; alternate plain / `.section--band` (darker gradient strip with strong top/bottom rules) so the page has cadence — never 3 same-treatment sections in a row.
- **Hero:** full-bleed, generous min-height, content max-width ~60rem / lede ~70ch, with the procedural background canvas behind a radial mask.
- **Density:** marketing is spacious; docs / API / dashboards lean dense with mono for endpoints, hashes, and code.
- **Responsive:** fluid `clamp()` type, flex/grid that wraps, container queries where useful. Verify no horizontal scroll at 360 / 390 / 430 / 768 / 1024 / 1440px. The nav collapses to a mobile menu at ≤1024px.

---

## 6. The signature flourish — procedural hero

The hero runs **one** restrained procedural canvas (`js/lineage.js`, `#lattice`): the **Clearing Lattice** — a tessellated field of faint Clearing-Cross cells (cyan × emerald blades, open centre) across which bioluminescent **activation waves** ripple outward, lighting each crossing emerald as they pass, then settling. It reads as consensus propagating / markets re-pricing. No imagery, no marketing — circuitry that's alive.

It must honor `prefers-reduced-motion` (render a single static settled frame), cap density to the viewport, and clamp DPR ≤ 2. This is the system's *one decisive flourish* — do not add competing animations elsewhere on the same view.

---

## 7. Motion & interaction

- **Durations / easing:** `--dur-fast` 150ms, `--dur-base` 220ms, `--dur-slow` 380ms; standard `--ease` `cubic-bezier(.2,.8,.2,1)`.
- **Hover:** brighten emerald (500→strong), shift borders toward cyan, lift surfaces/cards, slide CTA arrows 2px. Never change layout dimensions on hover.
- **Focus:** global cyan ring — `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`. Inputs add a 3px cyan glow. **Never remove focus outlines.**
- **Reveal:** `[data-reveal]` elements fade + rise on scroll-in.
- **Reduced motion:** collapse animations/transitions; render the hero as one static frame. Honor it everywhere.

---

## 8. Voice & content

- **Framing:** *Lineage / Lineage Foundation.* Hero "THE LIVING ECONOMY." Positioning: *"the foundation for adaptive, trust-minimized smart markets — a Layer-1 where markets become verifiable programs."*
- **Terminology:** Smart Markets, verifiable programs, trust-minimized, adaptive market evolution, UTMM, Prime Radiant Consensus (= DPoWW), Mempool / Storage / Miner subsystems, ARCO, Fremen Forum (community).
- **Tone:** precise, research-grade, idealistic about programmable economies — explained accessibly. No hype, no emoji.
- **Numbers:** **do not invent metrics** (no "<1s", "100k TPS"). Use real, sourced figures or honest placeholders (`—`, a labelled stub).
- **Show, don't pronounce.** Don't write "no fabricated partnerships, no inflated metrics" — *live* it. Don't narrate your own design reasoning as page copy.

---

## 9. Anti-patterns (audit before shipping)

- ❌ Light / cream / beige / peach canvases, or inventing a light theme.
- ❌ Emerald used everywhere, or as a background. It is rationed action; glow on one focal element only.
- ❌ Swapping the two accents (emerald = action, cyan = interaction).
- ❌ Aggressive purple/neon gradient page washes. The cool bloom is subtle and token-driven.
- ❌ Pill-shaped buttons (buttons use `--r-md`; only chips/status pills are round).
- ❌ Inter / Roboto / Arial as a **display** face (Space Grotesk is display; Inter is body).
- ❌ Heavy drop shadows or left-border-accent cards. Hairlines + space; elevation on hover.
- ❌ Invented metrics / stat-slop.
- ❌ Mono as body text, or display for long-form reading.
- ❌ The "plopped dot": compositing a mark/graphic as `stroked line + filled circle on top`. Use filled geometry (see [`brand-mark.md`](./brand-mark.md)).
- ❌ Exposing design-process chrome (viewport pickers, platform toggles, "demo" badges, internal build notes) inside product UI.
