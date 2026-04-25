# PRD: Web3-forward visual rebrand (brand & UI only)

> Created from: `prompts/create-prd.md`  
> Stakeholder answers: **1A** (visual system only), **2C** (parallel to `prd-site-redesign.md`), **3D** (no hard brand locks except domains/URLs to keep), **4B** (phased: shell → pages), **5D** (principles + pattern modules, no copycat requirement).  
> **This document does not authorize implementation** — it defines requirements; implementation is tracked separately.

---

## 1. Introduction / overview

**What:** A **dramatic visual rebrand** of the Lineage Foundation website: color, typography, layout rhythm, component styling, motion, and imagery. The look and feel should feel at home next to **modern web3 foundation and ecosystem sites** (e.g. Solana Foundation–class polish: bold dark canvases, confident display type, product-forward sections, developer-respectful density and clarity) without mandating a clone of any one property.

**Why:** The current system (see `app/globals.css` and shared components) is a disciplined **editorial dark + single lime accent** palette. The organization wants a **step-change in visual energy and category signals**—still trustworthy and infrastructure-serious, but unmistakably **web3-native** in art direction, hierarchy, and interaction craft.

**Relationship to `tasks/prd-site-redesign.md`:** That PRD remains the **source of truth for information architecture, copy policy, route behavior, and non-brand functional requirements** (e.g. honest trust signals, external links, accessibility baselines, build constraints) unless explicitly amended. **This PRD is authoritative for brand expression and visual design** where the two touch the same files (e.g. design tokens, header/footer presentation, section styling). If something in the site-redesign PRD assumed “no rebrand,” **this document supersedes that assumption for visual/brand scope only**—it does not reopen content strategy or new product scope.

**Problem solved:** The site can **look and feel** contemporary for crypto-native and institutional audiences, with a phased rollout that limits risk (global shell first, then pages).

---

## 2. Goals

1. **Category fit.** A first-time visitor’s **visual** first impression matches expectations for a **credible L1 / infrastructure foundation** in the 2024–2026 web3 design landscape (not a generic SaaS blog, not a memecoin landing page).
2. **Coherent system.** A single, documented **design system** (tokens + component patterns) that replaces ad hoc one-off styling as pages are brought into the rebrand.
3. **Phased delivery.** **Phase 1** ships a refreshed **global shell** (typography, color, header, footer, key UI primitives, motion defaults). **Phase 2+** migrates each **public route** page-by-page with acceptance criteria per page.
4. **No URL churn.** **Domains and in-app URL paths** that exist today for user-visible routes are **unchanged** (same bookmarkable URLs, same canonical policy pattern).
5. **Respect for motion/accessibility.** High-impact motion is allowed; ** `prefers-reduced-motion: reduce` ** must still disable non-essential motion per existing project norms.
6. **Performance budget.** The rebrand must not **regress** Core Web Vitals vs. the pre-rebrand production baseline in a way attributable to the change (e.g. avoid unbounded full-screen video, huge unoptimized assets, or render-blocking font waterfalls without mitigation).

---

## 3. User stories

1. **As a new visitor from the crypto ecosystem**, I want a **visually bold, legible, modern** first screen so I immediately recognize this as a serious web3 org, not a legacy brochure site.
2. **As an institutional reader**, I want **restraint in novelty** (readable type, clear hierarchy, no gimmicky clutter) so credibility is not undermined by “hype” aesthetics.
3. **As a developer**, I want **scannable structure** (clear headings, code-adjacent clarity, enough contrast for long reading) so technical pages feel built for me.
4. **As a maintainer**, I want **design tokens and repeated patterns** so new sections don’t invent new colors or spacings from scratch.
5. **As a design lead**, I want the rebrand to be **inspired by** category leaders (principles + optional pattern modules) **without** legally or ethically aping a single competitor’s brand assets.

---

## 4. Functional requirements

**Scope note:** **Copy, headlines, and IA remain largely unchanged (per stakeholder 1A).** Unless a line item explicitly allows copy changes, the implementation must not rewrite messaging as part of this work.

1. **Design tokens (source of truth).** The system must define and use **CSS custom properties** in `app/globals.css` (or a clearly named token file imported there) for: background/surface/elevated surfaces, text (primary, muted, on-accent), borders, **primary and optional secondary accent** (if introduced), focus ring, **fluid type scale**, spacing scale, radii, shadows, z-index, and motion (duration, easing). No new **ad hoc hex** in page-level CSS for colors that are part of the system once the page is migrated.
2. **Typography.** Adopt a **web3-appropriate** stack: e.g. a **distinctive display family** for heroes and major headings, and a **highly legible** family for body/UI (exact families are a design decision, not specified here). All text must meet **WCAG AA** contrast for normal and large text against chosen backgrounds.
3. **Color and atmosphere.** Move beyond “flat charcoal + one accent” to a **richer but controlled** system: e.g. **depth via layered surfaces**, **subtle gradients or mesh** (static or very light motion), and **one optional secondary glow/accent** for CTAs, highlights, and diagrams—without rainbow clutter. Exact palette TBD in design, but the PRD requires **intentional** background hierarchy (not one flat page color).
4. **Layout patterns (optional modules).** The implementation may use these **pattern modules** where they improve hierarchy (not all on every page):
   - **Hero:** large display headline, short supporting line, primary/secondary CTA, optional background treatment (gradient, grid, or faint network motif).
   - **Bento or card grid** for “pillars / programs / themes” with consistent card chrome.
   - **Stat or proof strip** (only with **real** numbers the org is willing to show—if no stats exist, the strip uses **qualitative** items like “Open source on GitHub” with links, aligned with `prd-site-redesign.md` trust rules).
   - **Developer / docs-forward row**: prominent GitHub and external doc links with iconography, without inventing a docs product.
5. **Global shell (Phase 1).** **Header, footer, mobile menu, buttons, links, and focus states** are updated to the new system. The shell must be **cohesive on every route**, including routes not yet visually migrated (Phase 1 may leave **legacy page bodies** in old styling until that page is migrated in Phase 2+—or Phase 1 must enforce a **minimum** body refresh to avoid jarring contrast; the team should pick one approach in planning—see Open Questions).
6. **Page migration (Phase 2+).** Each public `app` route (e.g. home, technology, tokenomics, developers, ecosystem, research) receives a **page-level pass**: section spacing, headings, cards, and embedded components (e.g. charts, simulator) **re-skinned** to the new system. **Order** is by priority (recommend: **Home → Technology → Tokenomics → placeholders**), documented in a task file when work starts.
7. **Imagery and texture.** The system may introduce **subtle texture** (noise, grain) or **abstract gradient meshes** as CSS or optimized images—kept small and performant. No stock “crypto cliché” people shaking hands; prefer **abstract, geometric, or product-native** visuals.
8. **Components.** Shared building blocks in `components/` (e.g. layout, header, footer, section, prose) must be **updated or extended** so pages consume them rather than duplicating the same flex/grid patterns.
9. **Embeds and third-party look.** **Plotly, simulators, and charts** must be **tuned to the new palette** (background, trace colors, fonts where supported) so they don’t look like a different product dropped on the page.
10. **Favicon, OG, and social share.** Favicon and default OG image (if the rebrand changes mark or background) are **regenerated** and paths in metadata remain valid; no broken previews.
11. **Build and quality gates.** `npm run lint` and `npm run build` pass. No new accessibility **regressions** in automated checks where the project has them; manual check of keyboard nav and focus on header/footer.
12. **Documentation.** A short **“Brand system”** section (could live in `AGENTS.md` or a `docs/` note—exact location TBD) lists tokens, type roles, and “do / don’t” for accent usage so future work stays consistent.

---

## 5. Non-goals (out of scope)

1. **New product features, new pages, or IA overhaul** (navigation labels, new routes) **unless** already planned elsewhere—**this PRD is not an IA project.**
2. **Full content rewrite, new claims, or new trust signals** beyond what `prd-site-redesign.md` already allows.
3. **Rebuilding core simulation logic** (e.g. ARCO internals) except **styling and chart theming** around it.
4. **Replacing** `tasks/prd-site-redesign.md` as the project’s main functional spec for **non-brand** requirements.
5. **A/B testing infrastructure** or analytics-heavy experimentation (unless the org adds it separately).
6. **1:1 visual parity** with Solana Foundation or any other named site; inspiration only.
7. **Custom WebGL product demos** or heavy 3D engines unless explicitly scoped later; **restrained** canvas/shader in hero is allowed if it meets performance and `prefers-reduced-motion` rules (align with site-redesign spirit on motion).

---

## 6. Design considerations (web3 art direction)

### 6.1 Principles (inspirational, not a checklist to ship all at once)

- **Institutional + crypto-native:** Dark-first, high legibility, **confident** display type, generous section spacing, **intentional** accent (not random rainbow gradients).
- **Product-forward:** The UI should feel like a **credible org shipping infrastructure**, with clear CTAs to **real** resources (GitHub, whitepaper, community links per existing config).
- **Depth without noise:** Use **layered surfaces**, subtle borders, and **soft glows** to separate regions—avoid 2017 “neon on black everywhere.”
- **Developer respect:** **Information density** where it helps (e.g. technology page), with strong typographic hierarchy—not marketing fluff layout on technical screens.
- **Restraint in motion:** **Meaningful** micro-interactions (hover, focus, section entry), no infinite distracting loops.

### 6.2 Reference pattern library (optional modules, §4.4)

| Module            | Use when                                      | Caution |
|------------------|-----------------------------------------------|--------|
| Hero + mesh/grid | Home, key landing                             | Keep LCP light; no huge videos without poster + lazy strategy |
| Bento / cards    | Stacking “what we do” without walls of text   | Don’t ship empty or duplicate cards |
| Stat strip      | If/when org approves real metrics             | If no numbers, use **link-forward** “facts” only |
| Dev link row     | Repeating GitHub / docs / research entry points | Don’t promise products that don’t exist |

### 6.3 Anti-patterns

- Cloned **logotype, wordmark, illustration set, or color trademark** of another foundation.
- **Simulated** partner logos, **fake** TVL/TPS, or **stock “crypto lifestyle”** photography passed off as the project.
- **Inaccessible** color combos for body text; **illegible** thin display fonts at small sizes.

---

## 7. Technical considerations

1. **Next.js and CSS:** Prefer **token-driven** `globals.css` + **CSS modules** for components, consistent with the repo. Large global class strings should shrink as primitives absorb patterns.
2. **Fonts:** Use **next/font** (or the project’s established pattern) to avoid layout shift; subset weights actually used; avoid loading 6 families.
3. **Images:** `next/image` for raster assets; **SVG** for simple motifs where appropriate; compress textures.
4. **Plotly / heavy client bundles:** Keep **dynamic import** boundaries (already used for some content); retheme charts without loading extra libraries.
5. **Token migration:** A practical approach is to **add v2 token names** (e.g. `--color-bg-raised`) and migrate components incrementally, then remove deprecated names in a final cleanup—document the mapping in the brand appendix.

---

## 8. Success metrics

1. **Subjective (design review).** Stakeholder sign-off that the site **fits the web3 foundation category** and **does not** read as generic corporate blog or meme-coin hype.
2. **Consistency.** Grep/audit: **no stray legacy hex** on migrated pages except documented exceptions (e.g. chart internals with rationale).
3. **Accessibility.** Key flows: keyboard **header** navigation, focus visibility, and **contrast** spot-check on new accent choices.
4. **Performance:** No **sustained** regression in **LCP** on home and **TBT/INP** on technology vs. a documented pre-rebrand baseline (allow temporary variance during staging; pre-merge verification).
5. **Rollout:** Phase 1 (shell) **shipped to production** before or with the first full page migration, per phased plan.

---

## 9. Open questions

1. **Phase 1 scope vs. jarring body:** If only the **shell** is updated in Phase 1, will **unmigrated pages** need a **minimum token pass** (background + text colors) to avoid a two-temperature site? Stakeholder decision.
2. **Secondary accent:** Introduce a **second brand color** (e.g. cool cyan for links vs. warm lime for CTA) vs. keep a **monochrome + single accent** system with **gradient-only** variety—decision in design.
3. **Display font licensing:** Commercial vs. open-source; budget and OTF/variable format—confirm before final selection.
4. **OG / social card:** New **default share image** design—who approves, and one vs. per-route templates.
5. **Reference sites for mood board:** Stakeholder may name **2–3** additional URLs (in addition to Solana Foundation) to align the team; not required to close this PRD.

---

## 10. Approvals and revision

- **Author:** PRD generated per `prompts/create-prd.md` and stakeholder selections **1A, 2C, 3D, 4B, 5D** (this file).
- **Revision:** Amend this file when brand scope (e.g. new logo) or phase boundaries change; keep `prd-site-redesign.md` in sync for any **non-brand** cross-links.

---

*End of PRD.*
