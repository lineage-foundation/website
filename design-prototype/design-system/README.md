# Lineage Design System

The portable definition of the Lineage brand — everything needed to build new pages, or port the prototype into the Next.js product, **on-brand without guessing**.

> **Lineage** — a Layer-1 for adaptive, trust-minimized Smart Markets. Bioluminescent, dark-first, research-grade. *"THE LIVING ECONOMY."*

## What's here

| File | What it is |
|---|---|
| **[`DESIGN.md`](./DESIGN.md)** | The visual principles — atmosphere rules, color/type/spacing/layout/motion, voice, and the anti-pattern list. **Read this first.** |
| **[`tokens.css`](./tokens.css)** | The single source of truth for design tokens (the `:root` block). Paste verbatim into the first `<style>` of a new page, or `@import` it. OKLch values. |
| **[`components.md`](./components.md)** | Reference for every component class in `css/lineage.css`, grouped by purpose, plus the JS behaviors. |
| **[`brand-mark.md`](./brand-mark.md)** | The **Clearing Cross** logo — construction rule, color grammar, open-centre meaning, size variants, usage cautions. |

The **implemented** system lives one level up in the prototype:
- `css/lineage.css` — all tokens + components (the runnable version of this spec)
- `js/lineage.js` — nav, scroll-reveal, hero animation, copy buttons, docs scroll-spy, faucet cooldown
- `partials/_chrome.html` — shared header + footer (paste into new pages)
- `assets/` — logo set (`lineage-mark.svg`, `lineage-icon.svg`, `lineage-icon-min.svg`, `favicon.svg`, `lineage-mark-mono.svg`) + team photos

## Start a new page in 4 steps

1. **Fonts + tokens.** Add the Google Fonts link (in `tokens.css` header), then paste the `tokens.css` `:root` block into your first `<style>` (or `<link>` it). Uncomment the base layer in `tokens.css` if starting from a blank document.
2. **Chrome.** Paste the header + footer from `partials/_chrome.html`; set `aria-current="page"` on the active nav tab. Link `css/lineage.css` and `js/lineage.js`.
3. **Compose.** Build sections from the classes in `components.md` — alternate `.section` / `.section--band` for rhythm; cards via `.card` / `.card--rail`; CTAs via `.btn--primary` (emerald, rationed) + `.link-cta` (cyan).
4. **Audit.** Run the §9 anti-pattern list in `DESIGN.md` before shipping. The two rules people break most: *emerald = action / cyan = interaction, never swapped*, and *one flourish per view*.

## The five rules that carry the brand

1. **Dark-first, always.** No light theme.
2. **Emerald = action, cyan = interaction.** Never swap them. Emerald is rationed; glow on one focal element.
3. **Hairlines over fills.** Borders + whitespace, not shadows. Elevation only on hover.
4. **Space Grotesk display, Inter body, JetBrains Mono for data.** Display ≠ body family.
5. **One decisive flourish per view.** Usually the aurora gradient or the hero Clearing Lattice — never three competing effects.

## Provenance

This is **BRAND v2 (bioluminescent)** — deep teal-space canvas, emerald action, cyan interaction, the **Clearing Cross** mark rooted in *markets / adaptive flow*. It supersedes the origin direction (navy + lime + the hex-lattice mark), which is retained for provenance in the source repo. Token *names* are inherited from that source; the *values* and the mark are v2.
