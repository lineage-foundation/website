# Tasks: Research page (`/research`) — Zenodo list & Fremen Forum

Derived from [`prd-research-page.md`](prd-research-page.md). **Note:** A first implementation may already exist (`lib/research-zenodo.ts`, `app/research/`). Use this list for **QA**, **copy updates**, or **re-implementation** on a fresh branch.

## Relevant Files

- [`lib/research-zenodo.ts`](../lib/research-zenodo.ts) — Single source of truth: `ZENODO_RESEARCH_PUBLICATIONS` (id, title, href, `datePublished`, description); order must match PRD.
- [`lib/constants.ts`](../lib/constants.ts) — `URL_DISCOURSE_RESEARCH` and comment re **Fremen Forum**; `URL_ZENODO_WHITEPAPER` must remain `https://zenodo.org/records/19203176` for header/elsewhere.
- [`app/research/page.tsx`](../app/research/page.tsx) — `/research` route: Section layout, list from data module, Fremen block, developer CTAs.
- [`app/research/page.module.css`](../app/research/page.module.css) — Publication list, typography, grid/actions.
- [`tasks/prd-research-page.md`](prd-research-page.md) — Product requirements; resolve open items here if the PRD is updated.
- `components/ui/Section.tsx`, `Prose`, `Card`, `Button` — Composed on the research page (no new UI package required for v1).

### Notes

- Quality gate: **`npm run lint`** and **`npm run build`** (no Jest in this repo unless added later). Do not block on unit tests for this page unless a test runner is introduced.
- After each sub-task, check boxes: `- [ ]` → `- [x]`.
- **Out of scope (PRD):** Zenodo API automation, PDF embeds, site-wide footer relabeling (unless product asks).

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off in this file by changing `- [ ]` to `- [x]`.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch (e.g. `git checkout -b feature/research-page-zenodo` or `chore/verify-research-tasks` if only verifying) — using **`feat/research-page-zenodo`**
- [x] 1.0 Add Zenodo publications data module
  - [x] 1.1 Add `lib/research-zenodo.ts` exporting `ZENODO_RESEARCH_PUBLICATIONS` and a `ZenodoResearchItem` type with `id`, `title`, `href`, `datePublished` (ISO `YYYY-MM-DD`), `description`
  - [x] 1.2 Populate all **seven** records in **this order (newest first):** `19203176` → `17777930` → `15737849` → `15730748` → `15730321` → `15360914` → `15324203` — each `href` is `https://zenodo.org/records/{id}`
  - [x] 1.3 Write one **factual** paragraph per item, traceable to the Zenodo abstract/title (no invented claims)
- [x] 2.0 Rebuild `/research` — publication list UI
  - [x] 2.1 Replace or extend `app/research/page.tsx` to `map` over `ZENODO_RESEARCH_PUBLICATIONS` (no duplicated inline lists)
  - [x] 2.2 Per item: show date (human-readable is fine), link to record, title as primary link, description paragraph; use semantic list (`<ul>` / `<li>`) or equivalent with sensible heading level under the page `h1` (`h2` section title + `h3` per paper)
  - [x] 2.3 Add styles in `app/research/page.module.css` (spacing, optional borders, readable `max-width` for body text)
- [x] 3.0 Fremen Forum, constants, and CTAs
  - [x] 3.1 Document in `lib/constants.ts` (comment on `URL_DISCOURSE_RESEARCH`) that the public research forum is the **Fremen Forum**
  - [x] 3.2 Add a **Fremen Forum** `Section` with Prose: name the forum, link `URL_DISCOURSE_RESEARCH`, short neutral description
  - [x] 3.3 Card + buttons: link to Discourse (label e.g. “Fremen Forum” / “Open Fremen Forum”); keep a **Build / developers** CTA; avoid duplicate boilerplate
- [x] 4.0 SEO, metadata, and integration
  - [x] 4.1 Update `metadata` / Open Graph in `app/research/page.tsx` to describe **Zenodo publications + Fremen Forum** (not only “whitepaper + Discourse” generically)
  - [x] 4.2 Confirm `app/sitemap.ts` still includes `/research`; no new routes required; `URL_ZENODO_WHITEPAPER` still points to `19203176` for `SiteHeader` / other pages
- [ ] 5.0 QA and sign-off
  - [ ] 5.1 Run `npm run lint` and `npm run build`; fix any issues
  - [ ] 5.2 Manual check: all seven links open the correct Zenodo record; order matches PRD; copy review with stakeholder
  - [ ] 5.3 Update this `tasks-*.md` file: check off completed items
