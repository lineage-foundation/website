# PRD: Research page (`/research`) — publications & community

## Introduction / overview

The `/research` page should present Lineage’s published work on **Zenodo** in a single, scannable list: each item names the paper, links to the Zenodo record, and includes a **short descriptive paragraph** drawn from the work’s own abstract or scope (not marketing fluff). The page should also point researchers to the **Fremen Forum** (public research discussion hosted on Lineage’s forum URL in `lib/constants`), with a clear link and a short, factual blurb.

**Goal:** Replace the current minimal “two cards” layout with a publication-first layout that is accurate, ordered by recency, and that surfaces community discussion.

## Goals

1. List **all seven** specified Zenodo records in **reverse chronological** order (newest record first) using a single source of truth in code.
2. Each publication shows: **title**, **link to `zenodo.org/records/{id}`**, and **one descriptive paragraph** per spec below.
3. A dedicated subsection introduces the **Fremen Forum** and links to the existing research base URL in `lib/constants`.
4. Metadata and hero copy on `/research` should reflect the expanded scope (publications + forum) without overclaiming.
5. No broken imports; sitemap and nav unchanged; existing site uses of `URL_ZENODO_WHITEPAPER` remain valid (it remains the current UTMM whitepaper record).

## User stories

1. As a **researcher**, I can open `/research` and see which papers exist, what each is about, and open the PDF/metadata on Zenodo in one click.
2. As a **community member**, I can find where **public, forum-style** research discussion happens and what the forum is for.
3. As a **team member**, I can add or reorder a future Zenodo item by editing one data module without rewriting the page layout.

## Functional requirements

1. The page must render a **vertically ordered list** (or equivalent semantic structure) of the seven records, in this **publication order** (newest first):
   - `19203176` → `17777930` → `15737849` → `15730748` → `15730321` → `15360914` → `15324203`
2. Each item must include the **full Zenodo record URL** as the primary link for that title.
3. Descriptive paragraphs must be **factual and aligned with each Zenodo record’s stated topic** (consensus, UTXO world state, whitepapers, etc.).
4. A **Fremen Forum** block must: name the forum, use `URL_DISCOURSE_RESEARCH` (or an alias constant pointing to the same URL), and describe its role in a neutral way (no unnecessary product-name digressions).
5. The existing **“Build on it / developers”** CTA section may remain, updated only if it duplicates the new forum copy awkwardly.
6. **Out of scope:** Automating Zenodo fetches, PDF embeds, or user accounts.

## Non-goals

- Requiring DOI badge images or per-paper version matrices on this page.
- Changing global footer link labels site-wide in this pass (only `/research` and constants comments if needed).
- Storing long PDF text in the repo (links only).

## Design considerations

- Reuse `Section`, `Prose`, and existing `page.module.css` patterns; add list spacing classes if needed.
- Long-term readability: `max-width` for prose, clear hierarchy (`h2` for “Publications”, `h3` or strong titles per paper).

## Technical considerations

- **Single module** `lib/research-zenodo.ts` (or similar) exports a readonly `ZENODO_RESEARCH_PUBLICATIONS` array: `{ id, title, href, description, datePublished }` with `datePublished` as ISO `YYYY-MM-DD` for sort verification.
- `URL_ZENODO_WHITEPAPER` stays `https://zenodo.org/records/19203176` (newest / canonical whitepaper in header elsewhere).

## Success metrics

- Page builds with `next build` and matches order above.
- Copy review: each paragraph is traceable to the corresponding Zenodo abstract/title.

## Open questions

- None for v1: Zenodo order and list of seven were specified by product owner.
