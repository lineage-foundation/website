# Tasks: Site IA, navigation, and copy consistency

Derived from the **site audit** (header/footer vs. primary routes, forum naming, PoW terminology, FReT/LNGX vs. `/tokenomics`, OG metadata). No separate PRD; treat this file as the spec.

## Relevant Files

- [`components/SiteHeader.tsx`](../components/SiteHeader.tsx) — Primary nav: add **Tokenomics** and/or **Docs** as needed; keep `NAV_ITEMS` maintainable.
- [`components/SiteFooter.tsx`](../components/SiteFooter.tsx) — Footer columns: add links to **Developers**, **Ecosystem**, **Research**, and/or **Docs** so main routes are reachable from the footer; align **Discourse** / **Fremen Forum** labeling with `app/research` and `app/ecosystem`.
- [`app/page.tsx`](../app/page.tsx) — Home: **Prime Radiant** copy—unify *miners* vs. *validators*; optional *Layer-1* / *L1* consistency in nearby prose only if touched in the same pass.
- [`app/research/page.tsx`](../app/research/page.tsx) — Open Graph `siteName` vs. rest of site (**Lineage Foundation**); only if not already aligned.
- [`app/developers/page.tsx`](../app/developers/page.tsx) — CTA/Prose: **Discourse** → primary label **Fremen Forum** (with optional “(Discourse)” for clarity) to match research/ecosystem.
- [`app/ecosystem/page.tsx`](../app/ecosystem/page.tsx) — **Discourse research forum** card: align naming with the chosen site-wide pattern.
- [`app/tokenomics/page.tsx`](../app/tokenomics/page.tsx) — Short bridge for **LNGX** and **FReT** so the home “Get started” tile matches the page, or add one glossary sentence + link to existing docs if FReT is defined there.
- [`components/home/GetStartedGrid.tsx`](../components/home/GetStartedGrid.tsx) — If tokenomics copy is expanded, optionally soften or align the Tokenomics tile so it does not over-promise what is above the fold.
- [`lib/constants.ts`](../lib/constants.ts) — Optional: one-line comment for **Fremen Forum** if footer/header links are standardized on that name.
- [`app/layout.tsx`](../app/layout.tsx) — Optional: improve root `metadata.description` if still generic.

### Notes

- Quality gate: **`npm run lint`** and **`npm run build`**. This repo has no Jest for these pages; do not add tests unless a test task is introduced project-wide.
- **Do not** change `URL_DISCOURSE_RESEARCH` or the Discourse URL—only user-facing **labels** and **consistency** with research/ecosystem.
- After each sub-task, check boxes: `- [ ]` → `- [x]`.
- Stakeholder sign-off for **nav/footer structure** and **Fremen vs Discourse in parentheses** is recommended before merge.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off in this file by changing `- [ ]` to `- [x]`.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch (e.g. `git checkout -b feat/site-ia-copy-polish` or `fix/site-ia-footer-nav`) — branch **`feat/site-ia-copy-polish`**

- [x] 1.0 Align primary navigation and footer with main routes
  - [x] 1.1 Add **Tokenomics** to `SiteHeader` `NAV_ITEMS` (e.g. after Technology or in a logical order) so economics is findable from the top bar
  - [x] 1.2 Add **Docs** to the footer (and/or ensure header **Docs** is mirrored in the footer) — pick one clear pattern: either duplicate key routes in both places or document in a one-line `Notes` comment why nav omits e.g. Tokenomics (if product refuses header change) — **Resources** column includes **Docs** (mirrors header)
  - [x] 1.3 Add footer links for **Developers**, **Ecosystem**, and **Research** under a sensible heading (split **Project** vs **Resources** or expand **Project**) without cluttering: goal is that every top-level marketing route is reachable from the footer — **Resources** lists Docs, Developers, Ecosystem, Research; footer grid: 2×2 (641–959px), 4 columns (≥960px), 1 col (mobile)

- [x] 2.0 Unify public forum naming (Fremen Forum + Discourse)
  - [x] 2.1 **Developers** page: change “Lineage Discourse forum” / “Join the Discourse forum” to lead with **Fremen Forum**, with optional disambiguation (e.g. “on Discourse”) if SEO/accessibility needs the product name once
  - [x] 2.2 **Site footer** Community column: use the same label pattern as 2.1 (e.g. “Fremen Forum” with optional “Discourse” in secondary text or `title` attr—not duplicate redundant phrasing)
  - [x] 2.3 **Ecosystem** page: align the “Discourse research forum” **Card** title/body with the same pattern; ensure `URL_DISCOURSE_RESEARCH` unchanged
  - [x] 2.4 Optional: add or extend a short comment on `URL_DISCOURSE_RESEARCH` in `lib/constants.ts` stating the public name is **Fremen Forum** (already partially present—extend only if the implementer adds new links)

- [x] 3.0 Fix PoW terminology and light copy consistency on the home page
  - [x] 3.1 In `app/page.tsx` **Prime Radiant** `CONSENSUS_FEATURES`, replace *Proof-of-work validators* with **miners** (or a single accurate sentence that defines the role) so it matches the hero and tokenomics chart
  - [x] 3.2 Optional: in `components/home/AudienceRouter.tsx`, use **Layer-1** instead of *L1* in body copy, or add *Layer-1 (L1)* once—match the style guide implied by the rest of the home page

- [x] 4.0 Bridge FReT, LNGX, and `/tokenomics` content
  - [x] 4.1 On `/tokenomics`, add a concise paragraph (in existing `Prose`) that names **LNGX** as the network’s value unit and **FReT** (spell out on first use) in relation to the economic model, without duplicating the whole whitepaper; link to Zenodo/whitepaper only if a single sentence needs external authority
  - [x] 4.2 If FReT is defined in `lib/docs-ported` or `/docs`, add a **Link** from tokenomics to that doc path; if not, keep 4.1 self-contained — **not** in docs; self-contained with whitepaper link
  - [x] 4.3 Re-read `GetStartedGrid` Tokenomics tile: adjust wording if it now over- or under-claims relative to 4.1

- [x] 5.0 Metadata and small polish
  - [x] 5.1 `app/research/page.tsx` Open Graph: set `siteName` to **Lineage Foundation** (or site-wide default) to match `app/layout` / docs metadata
  - [x] 5.2 Optional: align **Twitter** `description` on `app/developers/page.tsx` (and any other page touched in this work) to be one complete sentence, matching Open Graph depth where it feels thin — also **Ecosystem** Twitter
  - [x] 5.3 Optional: replace root layout generic `metadata.description` with a one-line default that reflects the home value prop (if product approves)
  - [x] 5.4 Revisit footer “Signal active · Genesis phase”—**skipped** (product copy; no code change)

- [x] 6.0 QA and sign-off
  - [x] 6.1 Run `npm run lint` and `npm run build`; fix any issues
  - [x] 6.2 Manual pass: every header and footer link resolves; key flows (home → tokenomics, home → docs, research → forum) read consistently
  - [x] 6.3 Check off completed items in this file

---

**Source:** Recommendations from the **site audit** (April 2026): IA parity (nav/footer), **Fremen Forum** vs **Discourse** labels, **miners** vs **validators**, **FReT/LNGX** vs tokenomics, OG `siteName`, optional L1/OG/twitter polish.

The generating prompt: [`../prompts/gererate-tasks.md`](../prompts/gererate-tasks.md).
