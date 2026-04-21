# Tasks: Next.js site normalization

Derived from [`prd-nextjs-site-normalization.md`](prd-nextjs-site-normalization.md).

## Relevant Files

- `package.json` / `package-lock.json` (or `pnpm-lock.yaml`) — Next.js app dependencies and scripts (`dev`, `build`, `start`, `lint`).
- `next.config.ts` (or `.mjs`) — Next configuration; no `basePath` unless required.
- `tsconfig.json` — TypeScript settings for the app.
- `eslint.config.mjs` or `.eslintrc.*` — ESLint (framework defaults).
- `app/layout.tsx` — Root layout: fonts, shared shell, global metadata patterns.
- `app/page.tsx` — Homepage (`/`).
- `app/arco/page.tsx` — Arco route; likely composes client components for charts.
- `app/tokenomics/page.tsx` — Tokenomics route.
- `app/globals.css` — Global styles (single primary styling approach per PRD).
- `components/` — Shared UI (e.g. `SiteHeader.tsx`, `SiteFooter.tsx`, `ArcoChart*.tsx`) as needed.
- `lib/` — Shared constants (e.g. external URLs: Zenodo, GitHub, YouTube, Discourse).
- `app/robots.ts` — Generated **`/robots.txt`** (allow all + sitemap); replaces static `public/robots.txt`.
- `public/images/` — Favicons, logos, Open Graph image (moved from current `images/`).
- `README.md` — Local dev, build, deploy, “how to change the site.”
- `.env.example` — Document any public env vars (optional).
- **Removed in §7:** legacy static site files (root `index.html`, `stylesheet-new*.css`, `style.css`, `script.js`, `arco/*.html` + `arco/*.css`, `tokenomics/index.html`, duplicate root `images/`).

### Notes

- **Tests:** The PRD does not require a test framework. Prefer **ESLint** + manual QA for launch. If you add Jest or Vitest later, colocate tests with components (e.g. `components/Foo.test.tsx`) and run via the tool you choose.
- **Plotly:** Use an **npm** package with a pinned version and `dynamic(..., { ssr: false })` or client-only boundaries for `/arco` as needed.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`.

## Tasks

- [x] **0.0** Create feature branch
  - [x] **0.1** Create and checkout a branch (e.g. `git checkout -b feat/nextjs-site-normalization`).

- [x] **1.0** Scaffold Next.js App Router project
  - [x] **1.1** Initialize Next.js with **App Router**, **TypeScript**, and **ESLint** (`create-next-app` or equivalent); ensure `next build` and `npm run dev` work.
  - [x] **1.2** Confirm **no** `basePath` unless deployment requires it (PRD: root domain `lineage.foundation`).
  - [x] **1.3** Add a minimal `README.md` section: install, `npm run dev`, `npm run build`.

- [x] **2.0** App shell: layout, global styles, public assets
  - [x] **2.1** Implement **root layout** (`app/layout.tsx`) with shared structure (e.g. html `lang`, optional font links consistent with design goals).
  - [x] **2.2** Choose **one** styling approach (e.g. CSS Modules + `globals.css`); avoid many unrelated global CSS files.
  - [x] **2.3** Add shared **header / nav / footer** components matching current **IA** (links to `/`, `/arco`, `/tokenomics`, external CTAs as today).
  - [x] **2.4** Copy **images and favicons** into `public/` (from current `images/`); fix paths to `/images/...`.
  - [x] **2.5** Add shared helpers or `lib/constants.ts` for **outbound URLs** (Zenodo, GitHub, YouTube, Discourse) in one place.

- [x] **3.0** Migrate homepage (`/`)
  - [x] **3.1** Port **content and sections** from `index.html` into `app/page.tsx` (and small components as needed); styling may **simplify/refresh** per PRD.
  - [x] **3.2** Wire buttons/links to shared constants (whitepaper, video, GitHub, etc.).
  - [x] **3.3** Set **route metadata** (`metadata` export or `generateMetadata`): title, description, canonical `https://lineage.foundation`, Open Graph/Twitter, **no `noindex`** for production.

- [x] **4.0** Migrate tokenomics page (`/tokenomics`)
  - [x] **4.1** Port `tokenomics/index.html` content into `app/tokenomics/page.tsx`; preserve narrative and interactive elements that belong in React (extract inline styles/scripts into components/CSS modules).
  - [x] **4.2** Add **metadata** for `/tokenomics` (canonical e.g. `https://lineage.foundation/tokenomics`).
  - [x] **4.3** Verify charts/scripts behave correctly; use **client components** (`"use client"`) where DOM/canvas is required.

- [x] **5.0** Migrate Arco page (`/arco`) with versioned Plotly
  - [x] **5.1** Add **plotly.js** (or agreed chart lib) via **npm** with a **pinned** version; remove reliance on unversioned CDN script tags.
  - [x] **5.2** Split **client-only** chart UI into dedicated client components; lazy-load or dynamically import heavy chart code if needed.
  - [x] **5.3** Port substantive content and **behavior** from `arco/index.html`; cosmetic parity not required.
  - [x] **5.4** Set **metadata** for `/arco` (canonical per product—e.g. `https://lineage.foundation/learn` if that remains the canonical path; align with existing `arco/index.html` canonical intent).

- [x] **6.0** SEO, `robots.txt`, indexability, outbound link audit
  - [x] **6.1** Add or update **`public/robots.txt`** to allow indexing of production content (no accidental `Disallow: /` for the whole site unless intended). **Done:** `app/robots.ts` generates **`/robots.txt`** with `Allow: /`, `Host`, and `Sitemap: https://lineage.foundation/sitemap.xml`; static `public/robots.txt` removed to avoid overriding the generated file.
  - [x] **6.2** Remove **`noindex`** from production-facing meta tags across routes (PRD: production **indexable**). **Done:** all `app/**` routes use `robots: { index: true, follow: true }` where set; root **`app/layout.tsx`** sets default index/follow. Legacy hand-built HTML files under repo root still contain `noindex` until **§7** deletion.
  - [x] **6.3** Run an **outbound link checklist**: Zenodo whitepaper, GitHub, YouTube, Discourse, and any other primary CTAs from the old pages—all resolve correctly in production build. **Verified (HTTP 200):** Zenodo record, GitHub org, YouTube video, Discourse, Se3ker, Peerstone (`lib/constants.ts` URLs).
  - [x] **6.4** Smoke-test **`/`, `/arco`, `/tokenomics`** locally and after deploy—no 404s for pages or critical assets. **Done:** `npm run build` OK; `next start` smoke: **`/`**, **`/learn`**, **`/arco`**, **`/tokenomics`**, **`/images/lineage-logo.png`** return **200**; **`/robots.txt`** and **`/sitemap.xml`** generated.

- [x] **7.0** Remove legacy static site and finalize documentation
  - [x] **7.1** Delete obsolete files: root `index.html`, `style.css`, `script.js`, `stylesheet-new*.css`, `arco/*` (HTML/CSS), `tokenomics/index.html`, duplicate `images/` at old path if fully under `public/images/`. **Done:** removed listed root assets; removed top-level **`arco/`** (legacy HTML/CSS only — Next routes remain under **`app/arco/`**); removed **`tokenomics/index.html`**; removed duplicate root **`images/`** (canonical copy under **`public/images/`**).
  - [x] **7.2** Ensure **no** long-term `legacy/` copy is required (PRD)—repo should contain the Next app as source of truth. **Done:** no `legacy/` directory; source of truth is the Next app under `app/`, `components/`, `public/`.
  - [x] **7.3** Expand **README.md**: prerequisites, `npm install`, `npm run dev`, `npm run build`, how to change copy/links, Vercel deploy notes.
  - [x] **7.4** Add **Vercel** project settings notes (framework: Next.js, build command, output) or `vercel.json` only if needed—**no** special preview URL handling required per PRD. **Done:** README **Deployment (Vercel)** table; no `vercel.json` (defaults suffice).

- [ ] **8.0** Final verification and merge readiness
  - [ ] **8.1** `npm run lint` and `npm run build` pass with no errors.
  - [ ] **8.2** Confirm success metrics from PRD §8 (build/deploy, local dev path, link audit, route parity, maintainability).
  - [ ] **8.3** Open PR for review; attach this task list or link issues for any follow-ups.
