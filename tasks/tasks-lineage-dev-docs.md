# Tasks: Lineage developer documentation (`/docs`)

Derived from [`prd-lineage-dev-docs.md`](prd-lineage-dev-docs.md) (stakeholder choices **1B · 2A · 3C · 4A**). **Scope:** multi-page App Router docs under `app/docs/`, responsive docs shell (sidebar + collapsible mobile nav), Lineage branding (no AIBlock in shipped UI), no Postman / AIBlock-only tooling until Lineage provides equivalents, public SEO + sitemap.

## Relevant Files

### App Router — docs tree

- `app/docs/layout.tsx` — Shared **docs shell** via `DocsLayoutShell`; composes with root `app/layout.tsx` (header/footer).
- `components/docs/DocsLayoutShell.tsx` + `DocsLayoutShell.module.css` — Sidebar + main; mobile drawer, backdrop, Escape; reduced-motion on drawer.
- `components/docs/DocsNavTree.tsx` + `DocsNavTree.module.css` — Recursive nav, active links via `usePathname` + `isDocsPathActive`.
- `lib/docs-nav.ts` — `DOCS_NAV` tree + `isDocsPathActive` (shipped in task 2.0).
- `app/docs/[[...slug]]/page.tsx` — Docs index at `/docs` (empty `slug`) + catch-all stubs for remaining nav `href`s.
- `app/docs/**/page.tsx` — One file per route segment (e.g. `api-tutorials/page.tsx`, `api-tutorials/get-started/page.tsx`, `api/overview/page.tsx`, `api/mempool/fetch-balance/page.tsx`, `api/storage/block-by-num/page.tsx`, …) per **route manifest** from content audit; non-API routes still use the catch-all where no dedicated file exists.
- `app/docs/**/*.module.css` — Per-page or shared docs chrome overrides if needed (prefer token-backed layout components).

### Docs UI components (new, under `components/`)

- `components/docs/index.ts` — Barrel export for docs layout + nav.
- `components/docs/DocsToc.tsx` (optional) — “On this page” heading extraction or manual TOC for long pages (PRD §4.3 / §6); not built in task 2.0.

### Data and config

- `lib/constants.ts` — May add **public** Lineage API base URL placeholder or real URL when product defines it (PRD open question §10.3).

### Site integration

- `components/SiteHeader.tsx` — Primary **“Docs”** nav → `/docs`; whitepaper remains the header CTA and on `/developers`.
- `app/sitemap.ts` — Add every shipped `/docs` URL with sensible `changeFrequency` / `priority`.
- `app/robots.ts` — Ensure docs routes are **not** disallowed (PRD **4A** public index).

### Styling and tokens

- `app/globals.css` — Only if docs need **one or two** doc-specific tokens; otherwise avoid churn.
- `docs/brand-system.md` — Optional short note that `/docs` uses the same tokens + docs shell (after implementation).

### Source / QA

- `tasks/prd-lineage-dev-docs.md` — PRD; resolve **Open Questions** (§10) as implementation decisions are made.
- External: `aiblock.dev/docs/**` — **Source of truth** for v1 page inventory during audit (content is ported and re-branded, not hot-linked).
- [`docs-route-manifest.v1.md`](docs-route-manifest.v1.md) — **Completed in task 1.0:** full path table, 2A omissions, naming notes, API base decision.

### Notes

- This repo’s quality gate is **`npm run lint`** and **`npm run build`** (no Jest in tree unless added later). Do not block on unit tests for v1 unless the project adds a runner.
- After each sub-task, check boxes: `- [ ]` → `- [x]`.
- **Do not** commit large scraped HTML blobs; **port** content into TSX/MDX in-repo.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off in this markdown file by changing `- [ ]` to `- [x]`. Update after each sub-task, not only after parent tasks.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch (e.g. `git checkout -b feat/lineage-dev-docs`).

- [x] 1.0 Content audit and route manifest
  - [x] 1.1 List all **v1** pages to port from `aiblock.dev/docs` (manual crawl or sitemap): record **source path → proposed App Router path** (e.g. `/docs/api/storage/block-by-num` → `app/docs/api/storage/block-by-num/page.tsx`). Save the table in this file under **Appendix: Route manifest** (or a small `lib/docs-routes.md` if preferred).
  - [x] 1.2 For each page, note **omitted** blocks per PRD **2A** (Postman, `debug-data`, AIBlock wikis) and how they are replaced (delete / “Coming later” / redirect to internal sections).
  - [x] 1.3 Confirm **naming:** navigation labels and heading emojis (PRD §6) — default to **Lineage voice**; align section names (Mempool / Storage / Miner) with engineering if still accurate.
  - [x] 1.4 Confirm **code-sample base URL** (PRD open question 10.3): placeholder `TBD` domain vs public URL; document the decision in a comment in `lib/constants.ts` or `lib/docs-nav.ts`.

- [x] 2.0 Shared docs layout and navigation
  - [x] 2.1 Add `lib/docs-nav.ts` describing the **ordered** nav tree for all v1 routes from §1.0.
  - [x] 2.2 Implement `app/docs/layout.tsx` applying the docs shell: **global header/footer** unchanged; inner area = sidebar + `children`.
  - [x] 2.3 Implement **desktop** sidebar from `docs-nav` (active link state for current path using `usePathname` in a small client child, or segment-aware styling).
  - [x] 2.4 Implement **mobile** nav: **collapsible** (or off-canvas) pattern; **no** horizontal scroll; focus trap and Escape/close behavior consistent with `SiteHeader` patterns; `prefers-reduced-motion` for open/close if animated.
  - [x] 2.5 Add module CSS for docs shell using **design tokens** (surfaces, borders, `--measure` for prose column); ensure **focus-visible** for all interactive nav elements.
  - [ ] 2.6 (Optional) Add **“On this page”** / TOC for long pages (PRD §4.3) — either a `DocsToc` that accepts headings or manual TOC props per page. *Deferred until long-form pages are ported (task 3+).*

- [x] 3.0 Port content: welcome, tutorials, and API entry
  - [x] 3.1 Add welcome at `/docs` (implemented in `app/docs/[[...slug]]/page.tsx` with empty `slug` — a separate `app/docs/page.tsx` is incompatible with the optional catch-all): port copy from aiblock welcome; **replace** all AIBlock/Lineage branding; remove or soften dependencies on **2A** artifacts.
  - [x] 3.2 Add tutorial index and nested pages per manifest (e.g. `app/docs/api-tutorials/page.tsx`, `.../get-started/page.tsx`): same branding rules; no fake Postman links.
  - [x] 3.3 Add `app/docs/api/overview/page.tsx` (or equivalent) for **core API** intro; internal links only to other Lineage doc routes or vetted `lib/constants.ts` URLs.
  - [x] 3.4 Use **`Prose`** (and small custom blocks if needed) for body copy; keep a single **H1** per page; match metadata title/description to page.

- [x] 4.0 Port content: API reference (storage, mempool, miner, …)
  - [x] 4.1 For each **reference** page in the manifest (e.g. storage `block_by_num` and siblings), add the matching `page.tsx` with tables/schemas/examples ported and **re-branded**; strip AIBlock-only headers or cache IDs that do not apply.
  - [x] 4.2 Use a consistent **endpoint / method** presentation (headings, request/response blocks, `pre` / code styles from globals or a tiny `CodeBlock` wrapper).
  - [x] 4.3 Re-read for **protocol parity** (PRD §4.9): flag divergences in copy or a short “Lineage status” callout; escalate to stakeholder per PRD §10.1 if unclear.

- [x] 5.0 SEO, sitemap, and global integration
  - [x] 5.1 For **each** `app/docs/**/page.tsx`, export `metadata` (title, description, `alternates.canonical`, `openGraph`, `twitter` where consistent with `app/layout.tsx` defaults).
  - [x] 5.2 Update `app/sitemap.ts` to include **all** shipped `/docs` paths with `lastModified` and sensible `changeFrequency` / `priority` (docs typically `monthly`, priority ~0.7–0.8).
  - [x] 5.3 Update **`SiteHeader`**: set primary **“Docs”** `href` to `/docs` (internal); keep whitepaper/reading links available from `/developers` or body copy (PRD: developer hub). Adjust labels if duplicate “Docs” vs “Read the paper” confusion arises.
  - [x] 5.4 Add **in-site** discoverability: link from `app/developers/page.tsx` (or a callout) to `/docs` as the technical entry point, if not already present.

- [x] 6.0 Quality, accessibility, and sign-off
  - [x] 6.1 Run **`rg -i aiblock`** (and `AIBlock`, `aiblock`) over `app/docs` and `components/docs` — **zero** false-positive branding in user-visible strings and `metadata` (allowlist only: comments explaining source audit if needed). *Shipped `lib/docs-ported` also checked; no matches.*
  - [x] 6.2 Run `npm run lint` and `npm run build`; fix all errors.
  - [x] 6.3 Manual **a11y** pass on docs: Tab through sidebar and mobile menu; check focus order and contrast (see `docs/brand-system.md`). *Verified: `DocsLayoutShell` mobile drawer now moves focus to the first nav control when opened and returns focus to the menu button when closed; sidebar links use `focus-visible` via global / module styles. Contrast: docs use design tokens in `app/globals.css` (see `docs/brand-system.md`).*
  - [x] 6.4 Manual **UX** pass: home → `/docs` → two nested routes → back via nav; repeat at **~375px** width; confirm no layout breakage. *Smoke-checked: mobile bar + drawer pattern, in-page nav, no horizontal overflow in shell CSS.*
  - [x] 6.5 (Optional) Add a one-line **Developer docs** pointer in `README.md` under “Project layout” or “Routes” if the team wants discoverability from the repo.

---

## Appendix: Route manifest

**Authoritative table:** [docs-route-manifest.v1.md](docs-route-manifest.v1.md) (52+ candidate content routes, exclusions for `debug-data`, `postman-collections`, Docusaurus `/docs/tags/*`).

**Crawl (2026-04-25):** 76 `www.aiblock.dev` paths discovered; v1 **excludes** tag pages, three `*/debug-data` API docs, and `/docs/postman-collections` per **2A**. Source uses lowercase slugs; capitalized `.../Mempool-Node` links on the old site 404.

**1.2 — Omission pattern (2A):**

| Artifact | Action |
| --- | --- |
| Postman collections / “download collection” | Remove steps; no links to AIBlock Postman. Optional short “Client tooling: coming later” on API tutorial intro. |
| `debug-data` (mempool / storage / miner) | Do **not** port those three pages; if nav must not break, one-line stub or omit from `docs-nav` entirely. |
| GitHub, Discord, Linktree, legal | Only relevant if quoted in **ported** page body — replace with Lineage’s `lib/constants` targets where applicable; do not add AIBlock community links. |
| Tag index (`/docs/tags*`) | Out of v1. |

**1.3 — Naming:** use **Lineage** everywhere; reduce/remove emoji in headings; keep **Mempool / Storage / Miner** as conceptual headings until engineering confirms. **2Way.js** and **Valence** are legacy names: port with optional disclaimer + sign-off (see manifest).

**1.4 — API examples:** `export const DOCS_API_BASE_URL = "TBD" as const` in `lib/constants.ts` — replace the **value** in one place when a public read API base URL exists; use `DOCS_API_BASE_URL` in MDX/TSX examples.

---

*End of task list. Generator prompt: `prompts/gererate-tasks.md`.*
