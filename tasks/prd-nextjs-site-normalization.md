# PRD: Next.js site normalization

## 1. Introduction / overview

The Lineage Foundation website today is **hand-coded static HTML** with **multiple CSS files** split across the repo root (`stylesheet-new*.css`) and `arco/` (`stylesheet.css`, `style.css`, `style-arco-add-1.css`), plus standalone pages for `/`, `/arco`, and `/tokenomics`. This makes changes risky, styling inconsistent, and local testing awkward compared to a single application shell.

This initiative **replaces the static hand-coded setup with a minimal Next.js application**: one coherent project structure, shared layout and styling patterns, and **local development** via the standard Next.js dev server so contributors can test changes before deploy.

**Problem solved:** Reduce fragmentation, improve maintainability, and enable reliable local previews while keeping **the same information architecture and content intent**; visual design may be **simplified or lightly refreshed** rather than requiring pixel-perfect parity with the current site.

**Production hosting:** **Vercel**, consistent with common Next.js practice and the project’s existing deployment story.

---

## 2. Goals

1. Ship a **Next.js (App Router) + TypeScript** codebase with **ESLint** and **minimal dependencies**—no unnecessary UI libraries unless justified later.
2. Migrate **all current public routes in one release:** `/`, `/arco`, `/tokenomics` (and equivalent behavior for existing assets/links).
3. Preserve **content and information architecture**; **layout and styling may be simplified or updated** where it improves clarity or maintainability.
4. Enable **local development**: clone → install → run dev server → see the full site with hot reload (or equivalent).
5. Deploy to **Vercel** with a predictable build (`next build`) and no regressions on **critical outbound links** (see functional requirements).
6. **Remove** the old static hand-coded layout once the Next app ships; **no obligation** to keep a `legacy/` copy or parallel static site in the repo.

---

## 3. User stories

1. **As a developer**, I want to run `npm install` and `npm run dev` (or the documented package-manager equivalent) so I can work on the site locally without manual static servers or path hacks.
2. **As a developer**, I want shared layout, metadata, and styling patterns so I do not duplicate head tags, nav, or footer across three unrelated HTML files.
3. **As a visitor**, I want to open the same main paths (`/`, `/arco`, `/tokenomics`) so bookmarks and shared links keep working after migration.
4. **As a visitor**, I want outbound actions (whitepaper, GitHub, video, community links) to work as expected so I can learn about Lineage and follow calls to action.
5. **As a maintainer**, I want a single build pipeline (`next build`) so production matches what I tested locally.

---

## 4. Functional requirements

1. The repository must contain a **Next.js project** using the **App Router** and **TypeScript**, with **ESLint** enabled per framework defaults.
2. The app must implement routes for **`/`**, **`/arco`**, and **`/tokenomics`**, carrying over the **substantive content and navigation intent** from the current static pages (copy, sections, key interactions such as buttons linking out).
3. **Static assets** (e.g. images under `public/` or Next conventions) must be organized so favicons, logos, and Open Graph images resolve correctly in both dev and production.
4. **Metadata**: Each route must expose appropriate **title**, **description**, and **Open Graph** (and/or Twitter) fields at least at the level of the current site; canonical URLs should target **`https://lineage.foundation`** (or the agreed production domain) unless explicitly scoped per path.
5. **Outbound links** must remain correct and functional for launch, including at minimum:
   - Zenodo whitepaper URL (current record: UTMM / project whitepaper as configured in code).
   - GitHub organization or repo links used in the UI.
   - YouTube “watch the video” (or equivalent) link.
   - Discourse / community link where present.
   - Any other primary CTA URLs present on the migrated pages (verify during implementation).
6. **Local run**: Documented steps must allow a developer to run the site locally (e.g. `npm run dev`) and navigate all three routes without 404s for app pages or required assets.
7. **Production build**: `next build` (and the Vercel default build) must succeed without errors; output must be deployable on **Vercel**.
8. **Robots / indexing**: **Production must be indexable** by search engines—do not use `noindex` on the live site unless a separate non-production environment requires it; align `robots.txt` and meta tags with **indexable** production.

---

## 5. Non-goals (out of scope)

1. **Pixel-perfect** reproduction of every margin, font stack, and breakpoint from the legacy CSS—**styling may be simplified or refreshed** per goal 2B.
2. Introducing **heavy design systems**, CMS, or headless CMS unless added in a later PRD.
3. **Backend APIs**, authentication, or server-side user data in this phase—**static / mostly static** pages with client-side behavior only where already present (e.g. simple scripts) unless trivially migrated.
4. **Internationalization (i18n)** unless already required elsewhere—English-only unless specified later.
5. Changing **URL paths** beyond what is needed for Next.js routing conventions (paths should remain **`/`, `/arco`, `/tokenomics`** for user-visible routes).
6. **Vercel preview deployments**: Special handling of canonical URLs, OG tags, or `noindex` for **preview** URLs is **not required**—out of scope for this PRD.

---

## 6. Design considerations

- **Information architecture** and **copy** should match the current site’s intent; **visual design** can be cleaner and more consistent (shared typography, spacing, components).
- Prefer **one primary styling approach** (e.g. CSS Modules, or a single global layer plus modules) documented in the repo—avoid proliferating ad-hoc CSS files without structure.
- Respect **accessibility** basics: semantic headings, button vs link usage, alt text on images carried forward from current pages.
- **Arco** page is large and interactive (e.g. charts); preserve **behavioral** parity where it matters for the narrative; refactor into components as needed without blocking launch on cosmetic match.

---

## 7. Technical considerations

- **Next.js App Router** + **TypeScript** + minimal dependencies; add tooling only when necessary. For **Arco** (e.g. Plotly or charts), prefer **npm dependencies with pinned versions** (and dynamic import where needed) instead of unversioned CDN script tags—**clearer versioning** and reproducible builds.
- **Vercel**: Use default Next.js preset; ensure **root** and **basePath** (if any) do not break asset URLs—prefer **no `basePath`** unless the site is served from a subpath (unlikely for `lineage.foundation`). **Preview deployments** do not need bespoke canonical/OG/`noindex` behavior per §5.6.
- **Environment**: Use `.env.local` for any non-secret or public URL overrides in dev; document required env vars in README.
- **Migration strategy**: Import content from existing HTML/CSS incrementally; **remove** obsolete static files after cutover—**no requirement** to retain legacy copies in-repo (see §2 goal 6).
- **Performance**: Leverage Next.js image optimization where images are used; lazy-load heavy `/arco` client bundles if needed.

---

## 8. Success metrics

1. **Build & deploy**: `next build` passes locally and on Vercel; production deploy completes without errors.
2. **Local dev**: A new contributor can follow README and view **`/`, `/arco`, `/tokenomics`** locally within ~15 minutes (excluding clone/network).
3. **Link audit**: All required **outbound links** (per §4.5) work in production (manual checklist or quick automated smoke test acceptable).
4. **Route parity**: No 404s on the three primary routes in production for default deployment configuration.
5. **Maintainability**: Single app entry, shared layout, and a short **“how to change the site”** section in README.

---

## 9. Open questions

**None** for the decisions below; remaining items are ordinary implementation details (tracked in issues, not product ambiguity).

### Resolved decisions (formerly open)

| Topic | Decision |
|--------|-----------|
| **Indexing** | **Production is indexable**—allow search indexing; avoid blanket `noindex` on the live site. |
| **Arco / charts** | Prefer **versioned npm packages** (e.g. Plotly via `package.json`) over ad hoc CDN scripts for **clearer versioning**. |
| **Legacy static site** | **Do not keep** legacy static HTML/CSS as a long-term parallel artifact—**removal after migration** is acceptable; no `legacy/` folder requirement. |
| **Vercel previews** | **No requirement** to design for preview URLs (canonical, OG, `noindex` on previews). |

---

## Clarifying answers (captured)

| # | Selection | Meaning |
|---|-----------|--------|
| 1 | A | Migrate `/`, `/arco`, `/tokenomics` in one release |
| 2 | B | Same content and IA; layout/styling may simplify or refresh |
| 3 | A | Production on **Vercel** |
| 4 | A | **App Router**, TypeScript, ESLint, minimal dependencies |
| 5 | A | **Outbound links** must keep working (Zenodo, GitHub, YouTube, Discourse, etc.) |

---

## Document control

- **Created from:** `prompts/create-prd.md`
- **Filename:** `tasks/prd-nextjs-site-normalization.md`
- **Implementation:** Do not treat this PRD as implementation work by itself; track implementation via separate tasks/issues.
