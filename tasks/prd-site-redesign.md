# PRD: Lineage Foundation site redesign

> Created from: `prompts/create-prd.md`  
> Filename: `tasks/prd-site-redesign.md`  
> Implementation: This PRD is not implementation work itself; tasks will be generated separately (see `prompts/gererate-tasks.md`).

---

## 1. Introduction / overview

The current Lineage Foundation website correctly carries the existing content from the legacy static site into a Next.js app (`/`, `/learn`, `/tokenomics`), but its visual system, information architecture, and conversion paths still reflect a hand-coded brochure site. The copy is dense with protocol terminology (UTMM, Prime Radiant Consensus, ARCO, FReT, SandWorm Hash, LNGX) and can read as crypto marketing rather than **serious infrastructure**.

This redesign **reshapes the site’s architecture, visual system, and narrative flow** so that a first-time visitor — in particular **an institutional/investor reader** and secondarily **a technical builder** — can understand **what Lineage is, why it matters, and how to engage with it** in under two minutes, using **the existing content**. Headlines stay; body copy gets **lightly tightened only** (no new claims). No features, protocols, or product scope change.

**Problem solved:** The site does not yet communicate a clear, credible story; it presents sections in parallel rather than a **problem → solution → why it wins → proof → CTA** sequence, and offers no audience-specific path to the right next action.

**Non-problem:** This is not a rebrand, content rewrite, or content expansion. It is an **IA + design-system + narrative** redesign on the existing content.

---

## 2. Goals

1. **Clarity.** A first-time visitor can state, in one sentence, what Lineage is after reading only the homepage hero and the first feature section.
2. **Trust.** The site reads as a **serious infrastructure project**, not a meme/hype crypto site — achieved through restraint in motion, a disciplined type/spacing/color system, and honest use of the trust signals that actually exist today (whitepaper, GitHub).
3. **Narrative flow.** Homepage follows an explicit **problem → solution → why it wins → proof → CTA** sequence; each downstream page continues that arc for its audience.
4. **Audience routing.** Homepage (and nav) guides **investors/institutions** and **builders/developers** to the right page without forcing either to read the other’s content.
5. **Performance.** The redesign is **faster or no slower** than the current site on mobile and desktop (see §8).
6. **Preserve scope.** Keep existing routes (`/`, `/learn`, `/tokenomics`) working; add placeholder routes for **Developers**, **Ecosystem**, and **Research** without breaking outbound links or SEO.

---

## 3. User stories

1. **As an investor/analyst**, I want a one-paragraph description of Lineage and a clear link to the whitepaper, so I can decide in under a minute whether to read more.
2. **As a builder/developer**, I want a direct link to GitHub and to a page describing the technology, so I can evaluate whether to build on Lineage.
3. **As a researcher**, I want a dedicated page that links to the whitepaper and explains the core concepts (UTMM, consensus, ARCO) without marketing veneer.
4. **As an ecosystem contact** (partner, wallet, integrator), I want an ecosystem page that shows what exists today (wallets, GitHub, docs) honestly, so I can judge project maturity.
5. **As a maintainer**, I want a small, consistent component system so content updates don’t require ad hoc styling per page.

---

## 4. Functional requirements

The redesign must:

1. **Keep all existing public routes working:** `/`, `/learn`, `/tokenomics`. No 404s, no changed URLs for these.
2. **Add new routes** as placeholders with real, finalized IA but minimal initial copy: `/developers`, `/ecosystem`, `/research`. Each page must render, be linked from the header and homepage, have correct metadata (title, description, canonical, OG), and not 404.
3. **Rework the global navigation** to **4–5 items** with clearer labels: **Technology**, **Developers**, **Ecosystem**, **Research**, **Docs**. *Docs* may be an external link (GitHub README / Zenodo whitepaper) until a docs site exists.
4. **Preserve existing content and headlines verbatim.** Body copy may only be **lightly tightened** — removing repetition, fixing tense, breaking long sentences. No new claims, no added marketing language.
5. **Implement a single design system** exposed via CSS custom properties in `app/globals.css`, covering color, type, spacing, radius, border, shadow, and motion tokens. All redesigned pages must consume those tokens; no ad-hoc hex values in page-level CSS.
6. **Replace page-specific CSS** (`app/home.css`, `app/arco/arco.css`, `app/arco/arco-responsive.css`, `components/tokenomics/TokenomicsChart.module.css`) with a shared component system (see §6). Existing class names may be removed; existing DOM hooks used by `lib/arco/arcoInit.ts` must be preserved (IDs such as `#diagram`, `#runBtn`, `#codeWindow`, `#wires`, `#A`..`#E`, `#stage1`..`#stage3`).
7. **Moderate motion** only: scroll-linked reveals, subtle parallax in the hero, and a canvas/shader hero visual. Must respect `prefers-reduced-motion: reduce` by disabling non-essential motion.
8. **Be mobile-first responsive** down to **320px** with no horizontal scroll on any redesigned page; header remains sticky with a working mobile menu (already implemented, must be kept).
9. **Accessibility baseline:** semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, keyboard-reachable interactive elements, visible focus states, WCAG AA contrast on text against backgrounds.
10. **SEO baseline:** each route declares a unique `title`, `description`, canonical URL (`SITE_ORIGIN`), and OG image; `app/sitemap.ts` and `app/robots.ts` must include new routes; indexable in production.
11. **Outbound links must continue to work** for: Zenodo whitepaper (`URL_ZENODO_WHITEPAPER`), GitHub org (`URL_GITHUB_ORG`), YouTube (`URL_YOUTUBE_VIDEO`), Discourse (`URL_DISCOURSE_RESEARCH`), wallets (`URL_SE3KER`, `URL_PEERSTONE`), network (`URL_NETWORK`).
12. **Honest trust signals only.** The site must **not** show partner logos, team photos, metrics (TPS, uptime), or case studies **that do not exist today**. The only trust signals currently permitted are: **whitepaper** (Zenodo) and **public GitHub**. Additional signals may be added later without a PRD change as they become real.
13. **Build & deploy cleanly.** `npm run lint` and `npm run build` must pass with no new errors introduced by the redesign. Vercel default preset only; no new build steps.

---

## 5. Non-goals (out of scope)

1. **Rewriting the technical content.** Headlines remain verbatim; body copy gets only light tightening with no new claims.
2. **Rebranding.** The Lineage name, logo, and core identity stay. This is a site-system redesign, not a brand redesign.
3. **A docs site or product UI.** *Docs* in nav links to external sources (GitHub/Zenodo) until a real docs site is commissioned.
4. **Internationalization.** English only.
5. **A CMS.** Content remains authored in-repo.
6. **Inventing trust signals** (fake partners, fake metrics, team page without a team sign-off, etc.).
7. **Ambitious 3D/simulation visuals.** We chose **moderate** motion — no custom WebGL simulations beyond a restrained shader/canvas hero.
8. **Redesigning the existing ARCO simulation logic** in `lib/arco/arcoInit.ts` — we restyle its container and graph holders but leave the interaction/behavior intact.

---

## 6. Design considerations

### 6.1 Information architecture

```
/                         Home — problem → solution → why it wins → proof → CTA
/technology?              Redirect / alias to one of {/, /learn} — decide during implementation
/learn                    Technology & architecture (keeps existing ARCO interactive)
/tokenomics               Economic model (keeps existing chart)
/developers  (new)        Build-on-Lineage path: GitHub, whitepaper, protocol overview
/ecosystem   (new)        Wallets, network, community (Se3ker, Peerstone, Discourse, Network)
/research    (new)        Whitepaper, consensus/UTMM writeups, Discourse research forum
```

Header nav (4–5 items):
**Technology** (→ `/learn`)  ·  **Developers** (→ `/developers`)  ·  **Ecosystem** (→ `/ecosystem`)  ·  **Research** (→ `/research`)  ·  **Docs** (→ external: whitepaper + GitHub)

### 6.2 Homepage section-by-section redesign

Each section keeps **existing headlines and content**; only body copy is lightly tightened. Order and visual layout change.

**Section 1 — Hero (Problem + Solution)**
- Purpose: Orient the visitor instantly.
- Headline (verbatim): **THE LIVING ECONOMY**
- Supporting copy (existing, lightly tightened): the three current lead sentences.
- Layout: full-viewport hero; left-aligned copy on desktop (not centered) for a more editorial feel; **subtle canvas/shader** on the right (or full-bleed behind copy). A single **primary CTA** (*Read the Whitepaper*) and a single **secondary CTA** (*Build With Us → GitHub*). `prefers-reduced-motion` disables the shader.

**Section 2 — Universal Turing Market Machines (Solution detail)**
- Purpose: Explain what UTMMs are and what changes.
- Headline (verbatim): **Universal Turing Market Machines**
- Supporting copy (existing): intro paragraph + three cards (Feature Extraction, Adaptive Policy Search, Verifiable Intelligence).
- Layout: intro paragraph + 3-up card grid on desktop, 1-up on mobile. Cards are flat, with rule-line separators rather than heavy borders.

**Section 3 — Prime Radiant Consensus (Why it wins: technical)**
- Purpose: Show the consensus distinction.
- Headline (verbatim): **Prime Radiant Consensus**
- Supporting copy (existing): intro + three cards (GPU-Native Mining, Deterministic Time, Blockchain Service Providers).
- Layout: alternating text/visual; the video CTA (“Watch the Video on YouTube”) lives with this section, not floating orphaned.

**Section 4 — Impact (Why it wins: economic/philosophical)**
- Purpose: Reframe the consequences.
- Headline (verbatim): **Impact**
- Supporting copy (existing): three cards (Markets Discover Knowledge, Policy Becomes Programmable, Economic Intelligence Compounds).
- Layout: same 3-up grid pattern; no CTAs in this section — it’s the climax of the narrative.

**Section 5 — Proof (Trust signals)**
- Purpose: Establish credibility honestly.
- Headline (new, neutral): **Evidence** *(no claim added — this is a framing label for existing content)*
- Supporting copy: link to whitepaper (Zenodo) and GitHub org. Explicitly restrained: no fake partner row, no fake metrics.
- Layout: two tiles (Whitepaper, GitHub) side-by-side on desktop, stacked on mobile.

**Section 6 — Get started (CTA hub)**
- Purpose: Convert visitors by audience.
- Headline (verbatim): **Get started**
- Supporting copy (existing): six tiles (Get LNGX, Pick a wallet, Github, Start building, Try apps, Tokenomics).
- Layout: same 6-tile grid, restyled to match the new system; reorder to lead with the tiles that work today (GitHub, Tokenomics, Pick a wallet) and place placeholders (Get LNGX, Start building, Try apps) after them.

### 6.3 Secondary pages (placeholder content, real IA)

- **`/developers`** — Hero headline: *Build on Lineage* (new, neutral navigational label). Content: one-paragraph intro (drawn from existing UTMM/consensus copy), links to GitHub repos and the whitepaper, and the “Start building” tile copy. No fake code snippets.
- **`/ecosystem`** — Hero headline: *Ecosystem* (neutral label). Content: the existing hub tiles about wallets (Se3ker, Peerstone), network, and research forum, grouped into clear categories (Wallets, Network, Community).
- **`/research`** — Hero headline: *Research* (neutral label). Content: whitepaper link, Discourse research forum link, and the existing ARCO/UTMM descriptive copy framed as research notes. No fake publications list.

### 6.4 Visual direction

**Palette (neutral editorial dark, single accent).** Implemented as CSS custom properties; exact values chosen in implementation.
- Background: very dark near-black with a slight cool tint (not pure `#000`).
- Elevated surface: one level lighter than background.
- Text primary: off-white, high contrast.
- Text muted: mid-gray for supporting copy.
- Border/rule: one low-contrast gray, used for dividers instead of heavy card borders.
- **Single accent**: retain the existing lime/green currently used for “LIVING” and section headings (`#effd5c`-family). Use sparingly — accent on **one** element per view (primary CTA, or key headline word, not both).
- Remove all secondary accents (cyan, magenta, yellow) currently present in `arco.css` legacy tokens — they may remain as internal plot colors in Plotly but are not exposed in the page UI.

**Typography.**
- Continue using **Inter** (already loaded via `next/font/google` in `app/layout.tsx`).
- Introduce a clear type scale exposed as tokens: display (hero), h1, h2, h3, body, small, caption.
- Line-height: tighter for display (1.05–1.15), generous for body (1.6–1.7).
- Measure: cap body-copy line length at ~65–75 characters via `max-width` on content containers.

**Spacing & rhythm.**
- 4px or 8px base grid; tokens named `--space-1..10`.
- Consistent **section padding** (vertical) and **content gutter** (horizontal `6vw` with a `1200px` max) across all pages — no more `.heroBlock` vs `.hub` vs `.arcoLearnRoot` drift.

**Radius, border, shadow.**
- Radius: small (4–6px) for buttons, medium (8–12px) for cards. No large pill shapes.
- Border: 1px low-contrast rule; avoid glowing borders.
- Shadow: used sparingly for elevation on hover only; no neon glows on body copy.

**Motion (moderate).**
- `IntersectionObserver`-based **fade+rise** on section entry, short duration (150–250ms), small translation (8–16px).
- **Subtle parallax** on the hero background shader only.
- **Canvas/shader hero**: one restrained procedural visual; no looping marketing animations on body sections.
- Must honor `prefers-reduced-motion: reduce`: in that mode, motion is disabled and the hero renders a static image fallback.

**Visualizing “Layer 1 blockchain” without clichés.**
- No chain-link icons, no glowing cubes, no cityscapes.
- Use the **ARCO graph** (already on `/learn`) as the site’s signature visual language — a network of labeled nodes with restrained rules and type, not stylized blockchain tropes.
- Hero shader can reference the “policy space” idea (soft, slow point-field) without literal chain imagery.

### 6.5 UX improvements

**Navigation.**
- Sticky header (already implemented) stays.
- Condense nav to **Technology · Developers · Ecosystem · Research · Docs**.
- Mobile menu (already implemented) adapts to the new labels.

**CTA strategy.**
- Exactly **one primary CTA** per page view at any time. Homepage hero: *Read the Whitepaper*.
- Exactly **one secondary CTA** nearby. Homepage hero: *Build With Us* (→ GitHub).
- The header surfaces a **persistent secondary CTA** (*Whitepaper*) on ≥1024px viewports — not primary-styled, to avoid pressure.
- End-of-page CTA block on every page, audience-specific (builders see Developers/GitHub; investors see Whitepaper/Tokenomics).

**Audience routing on the homepage.**
- Below Section 4 (Impact), insert a **two-column audience router** — “For Builders” and “For Researchers / Investors” — each with a single link to the right sub-page. This uses existing copy, not new claims. If Section 5 (Evidence) feels crowded, route block can sit above Section 6 instead.

### 6.6 Conversion layer

- **Get Started** (primary action): homepage hero → *Read the Whitepaper*; recurs in Section 6; appears in footer.
- **Read Docs** (developer action): *GitHub* link in header and `/developers`; whitepaper link treated as “docs” until a docs site exists.
- **Join Ecosystem** (community action): Discourse research forum from `/ecosystem` and `/research`.
- **Trust signals** permitted today: **Whitepaper (Zenodo)**, **GitHub org**. No other claims.

---

## 7. Technical considerations

### 7.1 Component breakdown (Next.js App Router)

Proposed `components/` additions, all typed, server-rendered by default, with `"use client"` only where interactivity requires it.

```
components/
  layout/
    SiteHeader.tsx            (exists; update labels + CTA)
    SiteFooter.tsx            (exists; align to new system)
    Container.tsx             (new: consistent max-width + gutter)
    Section.tsx               (new: consistent vertical rhythm + eyebrow/heading)
  ui/
    Button.tsx                (new: primary / secondary / ghost variants)
    Card.tsx                  (new: flat card with optional icon slot)
    Eyebrow.tsx               (new: small uppercase section label)
    Heading.tsx               (new: h1/h2/h3 with token-backed scale)
    Prose.tsx                 (new: body-copy container with measure limit)
    LinkCta.tsx               (new: styled link with arrow affordance)
  home/
    Hero.tsx                  (new: hero layout + shader slot + CTAs)
    HeroShader.tsx            ("use client"; canvas/WebGL visual, reduced-motion aware)
    FeatureGrid.tsx           (new: 3-up grid used by UTMM / Consensus / Impact)
    AudienceRouter.tsx        (new: two-column Builders/Researchers block)
    EvidenceBlock.tsx         (new: Whitepaper + GitHub tiles)
    GetStartedGrid.tsx        (new: 6-tile CTA hub)
  arco/                       (existing; restyled container, logic untouched)
  tokenomics/                 (existing; restyled wrapper)
```

### 7.2 Styling approach

- **One global tokens file** (`app/globals.css`) owns CSS custom properties for color, type, spacing, radius, shadow, motion.
- **CSS Modules** per component (already used for `SiteHeader`/`SiteFooter`) — continue this pattern for all new components.
- Delete or reduce `app/home.css` once its rules move into tokenized component modules.
- Keep **Tailwind v4** available (already installed) but **do not** rely on it for the redesign’s layout primitives — use CSS Modules + tokens. Tailwind utilities may remain for one-off tweaks.

### 7.3 Motion implementation

- Prefer **CSS transitions + `IntersectionObserver`** over a motion library for reveal animations.
- If a small helper is needed, write a local `useReveal()` hook rather than adding `framer-motion` unless justified.
- The hero shader is a **small** client-only component; lazy-loaded and gated on `prefers-reduced-motion`.

### 7.4 Performance budget

- Homepage Largest Contentful Paint target: **≤ 2.5s** on simulated 3G (Lighthouse mobile).
- Homepage total JS transferred: **≤ 150KB gzipped** (excluding `/learn` Plotly bundle which stays lazy-loaded).
- No additional fonts beyond Inter. No icon fonts. Use inline SVG.

### 7.5 Routing and metadata

- New pages get their own `page.tsx` under `app/developers`, `app/ecosystem`, `app/research`.
- `app/sitemap.ts` adds the three new routes.
- Each new page exports `metadata` with unique `title`, `description`, canonical, and OG image.
- External header links (e.g. *Docs* → whitepaper) use `rel="noopener noreferrer"` and open in a new tab.

### 7.6 Compatibility constraints

- **Do not change** `lib/arco/arcoInit.ts` behavior or the DOM IDs it consumes (see §4.6).
- **Do not change** `components/tokenomics/TokenomicsChart.tsx` interaction logic — wrapper styling only.
- Keep `constants.ts` outbound URLs intact.

---

## 8. Success metrics

1. **Clarity test (manual).** Five new readers, given only the homepage, can each answer in one sentence: *“What is Lineage?”* and *“What should I do next if I’m a builder / investor?”*
2. **Narrative test (manual).** The homepage visibly follows **problem → solution → why it wins → proof → CTA** when read top-to-bottom.
3. **Audience routing.** Click-through from the homepage audience router to `/developers` or `/research` is measurable in analytics within the first month post-launch (if analytics is enabled).
4. **Performance.** Lighthouse mobile scores: Performance **≥ 90**, Accessibility **≥ 95**, Best Practices **≥ 95**, SEO **≥ 95** on `/`.
5. **Build hygiene.** `npm run lint` clean; `npm run build` passes; Vercel deploy green.
6. **Regression-free outbound links.** All links in §4.11 verified post-launch.
7. **Accessibility.** No `axe-core` critical/serious issues on `/`, `/learn`, `/tokenomics`, `/developers`, `/ecosystem`, `/research`.

---

## 9. Open questions

1. **`/technology` vs `/learn`.** Should the main technology page live at `/learn` (current, indexed) or `/technology` (new, matching the new nav label)? Recommended: keep `/learn` as canonical, add `/technology` as a redirect or alias only if analytics show confusion.
2. **Docs surface.** Until a real docs site exists, *Docs* in the header points to the whitepaper. Do we prefer it point to GitHub README instead? Default: whitepaper.
3. **Placeholder depth on new pages.** `/developers`, `/ecosystem`, `/research` will ship with real IA and minimal copy. How minimal — one section each, or three? Default: one hero + one section + CTA.
4. **Evidence headline.** “Evidence” is a neutral framing label, not an existing headline. If the user prefers to keep only original headlines verbatim, the section can be titled *Read the Whitepaper* or *Source material* instead.
5. **Analytics.** Is there a preferred privacy-respecting analytics tool (Plausible, Fathom) for measuring audience-routing CTR, or do we defer that decision?

---

## Clarifying answers (captured)

| # | Selection | Meaning |
|---|-----------|---------|
| 1 | **D** | Scope: all public routes + new `/developers`, `/ecosystem`, `/research` |
| 2 | **C, A** | Primary audience: Investors/institutions; secondary: Builders/developers |
| 3 | **C** | Reset to neutral editorial-dark system with a single accent |
| 4 | **G** | Trust signals today: Whitepaper + GitHub only |
| 5 | **B** | Nav simplified to 4–5 items with clearer labels |
| 6 | **B** | Moderate motion: scroll-linked reveals, subtle parallax, canvas/shader hero |
| 7 | *(custom)* | Keep existing headlines; **light body tightening only**, no new claims |

---

## Document control

- **Created from:** `prompts/create-prd.md`
- **Filename:** `tasks/prd-site-redesign.md`
- **Next step:** Feed this PRD into `prompts/gererate-tasks.md` to produce `tasks/tasks-site-redesign.md`.
