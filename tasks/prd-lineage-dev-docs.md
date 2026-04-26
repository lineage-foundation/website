# PRD: Lineage Developer Documentation (`/docs`)

**Status:** Draft for implementation  
**Stakeholder choices:** 1B · 2A · 3C · 4A (see §9)

## 1. Introduction / Overview

Lineage needs a first-class **developer documentation** area on [lineage.foundation](https://lineage.foundation), replacing the former AIBlock docs at [aiblock.dev/docs](https://aiblock.dev/docs) with **Lineage** naming, tone, and visual system. Content is **ported and adapted** from the AIBlock documentation tree, not copied blindly: API names, chain references, and examples should read as **Lineage** where the product is equivalent; AIBlock-specific artifacts (Postman, debug routes, external wikis tied to AIBlock) are **omitted** until Lineage publishes equivalents.

The experience is **multi-page** (App Router routes under `app/docs/`), with a **responsive docs shell**: sidebar navigation and “on this page” behavior on larger viewports, and a **simplified, collapsible** navigation pattern on small screens. The site should feel continuous with the existing rebrand (tokens, typography, `Section` / `Prose` patterns) while optimizing for **reading and scanning** long technical content.

**Goal:** Give developers a trustworthy, navigable docs site that is indexed, discoverable, and maintainable as Lineage’s public API and protocol surface evolves.

## 2. Goals

1. **Parity of structure (v1):** Mirror the **URL and information architecture** of `aiblock.dev/docs` as separate routes (e.g. welcome, tutorials, API overview, endpoint reference pages) under `/docs` and nested paths.
2. **Brand correctness:** All user-facing references to **AIBlock** are replaced with **Lineage** (and related product names adjusted for accuracy). No stranded AIBlock branding in metadata, titles, or body copy.
3. **Omit incomplete channels:** Do not link to or embed Postman collections, private debug routes, or third-party wikis that only applied to AIBlock, unless and until Lineage provides replacements (stakeholder choice **2A**).
4. **Discoverability:** The docs area is **public**, included in `sitemap`, and has appropriate **metadata** (Open Graph, canonical URLs) per page (**4A**).
5. **Usable on mobile:** Navigation remains reachable without horizontal clutter; collapsible/simplified nav on narrow viewports (**3C**).

## 3. User Stories

1. **As a developer** evaluating Lineage, I want to open `/docs` and see a clear welcome and entry points to concepts, tutorials, and API material so I know where to start.
2. **As an integrator**, I want to move between related pages (e.g. overview → storage API → a specific method) using persistent navigation and sensible URLs so I can bookmark and share deep links.
3. **As a mobile user**, I want to open the docs, expand a menu if needed, and read content without broken layout or tiny tap targets.
4. **As a maintainer** on the Lineage team, I want the docs to live in-repo with a predictable route structure so we can update copy and add endpoints alongside code reviews.

## 4. Functional Requirements

1. The system must expose a **hierarchical route tree** under `/docs` that corresponds to the ported AIBlock docs tree (e.g. at minimum: index/welcome, tutorial section, API overview, and API reference sub-routes as present on the source site). Exact leaf URLs should be enumerated during content audit (see Open Questions).
2. The system must provide a **docs layout** shared by all `/docs` routes, including:
   - **Desktop:** primary **sidebar** listing the docs IA (sections + links).
   - **Mobile / narrow:** **collapsible** (or off-canvas) nav that does not require horizontal scrolling to operate.
3. The system must render each page with **Lineage** site chrome (header/footer) and documentation content in the main column; long pages should support optional **in-page** anchors / “on this page” where it improves scannability (implementation detail, but UX target).
4. The system must **replace** all user-visible **AIBlock** strings with **Lineage** (case-sensitive variants: `AIBlock`, `AIBLOCK`, `aiblock` as appropriate to context) except where retained in **historical** or **third-party** citations explicitly marked as external (if any such blocks exist after audit; default is none in v1 per **2A**).
5. The system must **not** include links or instructions that depend on **omitted** artifacts (Postman, AIBlock-only debug-data flows, AIBlock-only wiki) — those sections are either removed, rewritten, or reduced to “Coming later” without fake URLs.
6. The system must add **sitemap** entries for all shipped `/docs` routes and set **per-route metadata** (title, description, canonical, Open Graph) consistent with the rest of the site.
7. The system must use existing **design tokens** and typographic system (`app/globals.css`, `layout` fonts, `Prose` / `Section` or documented extensions) so the docs visually match the current Lineage marketing site.
8. The system must keep **build and lint** clean (`npm run lint`, `npm run build`) and avoid client-only bloat for static copy pages unless interactivity is required (e.g. mobile nav).
9. The content must be **reviewed** for technical accuracy: where AIBlock and Lineage behavior diverge, copy must be updated or flagged (see Open Questions); “verbatim port” is not sufficient if the protocol differs.

## 5. Non-Goals (Out of Scope)

- Hosting **interactive** API explorers (e.g. Swagger UI) or live “try it” consoles in v1.
- Committing to **versioned** docs (`/docs/v1/...`) or automated sync from an OpenAPI file unless agreed later.
- **i18n** / translated docs in v1.
- **User accounts**, comments, or edit-on-GitHub links unless already standard elsewhere on the site (optional follow-up).
- Re-publishing **AIBlock** Postman collections, private node debug routes, or links to **AIBlock**-specific infrastructure without Lineage replacements (**2A**).

## 6. Design Considerations

- Reuse the **rebrand** palette, spacing, and components; docs may introduce a **DocShell** (sidebar + main) that is not used on marketing-only pages.
- **Readable measure** for body text: align with `Prose` and `--measure`; code blocks and tables may break out to a wider max-width where needed.
- **Focus states** and **keyboard** access for sidebar and mobile nav toggles (WCAG-aligned, consistent with `docs/brand-system.md`).
- **Emojis** in source headings: optional; either normalize to line-icon-free headings for a more “enterprise” look or keep sparingly for parity—product decision during implementation (default: simplify if it clashes with Lineage voice).

## 7. Technical Considerations

- **Next.js App Router:** Implement under `app/docs/...` with a shared `layout.tsx` for the docs tree (sidebar + content slot).
- **URL mapping:** The AIBlock “network wiki” section used `/docs/network-wiki/...`. Lineage uses **`/docs/concepts/...`** instead (no `network-wiki` segment); see `tasks/docs-route-manifest.v1.md`.
- **Content strategy:** Options include (a) **MDX** for maintainability, (b) **TSX** with composition components for maximum control, or (c) **remote content** (not in scope for v1). Recommendation: start with **MDX or static TSX** per page after audit; keep shared shortcodes (Callout, EndpointReference) for repeated patterns.
- **Source audit:** Crawl or manually list `aiblock.dev/docs/**` pages to build the route manifest; the earlier discovery included paths such as:
  - `/docs` (welcome)
  - `/docs/api-tutorials`, `/docs/api-tutorials/get-started`
  - `/docs/api/overview`
  - `/docs/api/storage/...` (e.g. `block-by-num`)
  Final tree must be confirmed at implementation time.
- **No broken links:** After **2A**, any internal “next steps” should point to other Lineage doc pages or **neutral** next actions (e.g. GitHub org if already public in `lib/constants.ts`).
- **Static generation:** Prefer static rendering for doc pages; use `"use client"` only for nav disclosure/collapsibles.

## 8. Success Metrics

- **Content:** 100% of shipped pages free of “AIBlock” in visible copy, titles, and metadata (automatable check: repo grep / CI).
- **SEO / discovery:** `sitemap.xml` lists all `/docs` URLs; Google Search Console can index them (no accidental `noindex` on the docs layout).
- **UX:** Core flows validated manually: home → `/docs` → two nested pages → back via sidebar; same on a phone-width viewport.
- **Quality:** `npm run lint` and `npm run build` pass on the release branch.

## 9. Stakeholder selections (clarifications)

| # | Choice | Selection |
| --- | --- | --- |
| 1 | Doc scope (v1) | **B** — Multi-page App Router tree mirroring `aiblock.dev/docs`. |
| 2 | AIBlock-only assets | **A** — Omit until Lineage equivalents exist. |
| 3 | Layout | **C** — Docs shell with sidebar on desktop; simplified stack + **collapsible** nav on mobile. |
| 4 | SEO | **A** — Public index, include in sitemap, normal metadata. |

## 10. Open Questions

1. **Protocol parity:** Who signs off on technical accuracy when Lineage’s API or semantics differ from AIBlock? (Engineering or docs owner.)
2. **Route manifest:** Final ordered list of source URLs to port for v1 (blocking for file creation under `app/docs/`).
3. **Code samples:** Do endpoint examples use a **public Lineage base URL** and real paths, or placeholder `https://api.lineage...` with TBD? (Affects all reference pages.)
4. **“Coming soon”** blocks: Standard component vs plain Prose for deferred Postman / tooling sections?
5. **Navigation labels:** Keep parity with aiblock section names vs rename to Lineage product vocabulary (e.g. “Mempool / Storage / Miner” if still accurate)?

---

*End of PRD. Implementation should follow this document and the Lineage [brand system](../docs/brand-system.md).*
