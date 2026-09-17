# Site & docs: AI Skills (the `lineage` plugin)

**Date:** 2026-09-17
**Status:** Approved design, pending implementation plan

## Why

We shipped `lineage-foundation/skills` — a cross-tool skills library (the
**`lineage` plugin**, v0.1.0, MIT) that makes an AI coding agent expert in
Lineage, installable in **Claude Code and Codex**. The site should announce it,
and the docs should tell people how to install and use it.

## Source of truth (from the skills repo)

- Repo / GitHub slug: **`lineage-foundation/skills`**
  (`https://github.com/lineage-foundation/skills`), MIT, plugin name `lineage`,
  version `0.1.0`.
- **9 skills in 3 tracks:**
  - *Fundamentals* — `lineage-fundamentals` (base layer; every other skill
    assumes it).
  - *Building on Lineage* — `lineage-sdk-usage`, `lineage-two-way-payments`,
    `lineage-v1-api`, `lineage-dev-node`.
  - *Core contributing* — `contributing-to-lineage`, `core-dev-workflow`,
    `consensus-safety`, `db-migrations`.
- **Install — Claude Code (exact):** `/plugin marketplace add
  lineage-foundation/skills`, then install the `lineage` plugin from `/plugin`.
- **Install — Codex (generic):** register the repo's generated `.codex-plugin/`
  directory per the Codex plugin docs; no one-liner is published.
- **Usage:** automatic retrieval — the agent selects a skill by matching the
  task against each skill's description; nothing is invoked by hand.
- **No auth** to install or use on testnet. **No MCP dependency** — the skills
  do not require or reference `https://mcp.lineage.to`; keep skills copy
  independent of MCP.

## Current state (from the website)

- `lib/constants.ts`: `URL_*` convention. Has `URL_GITHUB_ORG`,
  `URL_MCP_SERVER = "https://mcp.lineage.to"` (line ~97), and the `SDKS` array.
  **No skills URL.**
- `app/ecosystem/page.tsx` "Tooling & apps" section: intro prose says "Client
  SDKs and a hosted MCP server are live today. LLM agent skills are on the way…"
  (~L260-264). The **"LLM agent skills" card** (~L320-336) has body copy, **no
  link**, and `<Tag status="soon">Coming soon</Tag>`. The adjacent MCP card
  (live) is the pattern to mirror (link + `<Tag status="live">`).
- `app/docs/page.tsx`: TOC `<nav>` with anchor groups; an **API** group
  containing `#api-reference` and `#mcp-server` (~L102-106). The `#mcp-server`
  `<article>` (~L313-329) is the template. `CodeBlock` (`lang="shell"`) is used
  for install snippets (SDK "Install", ~L343-361). Any new `<article id>` needs
  a matching nav `<li>` for the scroll-spy (`DocsScroll`).
- `app/developers/page.tsx`: the SDKs section (`id="sdks"`) ends with an MCP
  call-out — prose + `<LinkCta href={URL_MCP_SERVER}>` (~L243-255). Natural spot
  for an AI Skills call-out.
- Verify: `npm run build -- --webpack` (+ `npm run lint`); no unit-test harness.
  Turbopack fails on this sandbox — always `-- --webpack`.

## Global constraints

- New URL is a `URL_*` constant in `lib/constants.ts`, referenced (not
  hardcoded) at render sites.
- Skills copy must NOT claim an MCP dependency.
- Catalog on the site: **summarize the three tracks in prose + link to the repo
  README**; do not enumerate all nine skills.
- Codex: document it, but honestly — generic steps + a link to Codex plugin
  docs; only Claude Code has an exact command.
- Follow existing components (`Card`, `Tag`, `Section`, `CodeBlock`, `LinkCta`)
  and the `#mcp-server` article as the docs template. No new raw hex in
  stylesheets.
- Exact values: repo `https://github.com/lineage-foundation/skills`; Claude Code
  command `/plugin marketplace add lineage-foundation/skills`; plugin name
  `lineage`.

## Changes

### 1. Constant

`lib/constants.ts`: add near `URL_MCP_SERVER`:
```ts
/** AI coding-agent skills plugin (Claude Code + Codex). */
export const URL_SKILLS = "https://github.com/lineage-foundation/skills";
```

### 2. Ecosystem — flip the "LLM agent skills" card to live

`app/ecosystem/page.tsx`:
- Import `URL_SKILLS`.
- Update the section intro prose so SDKs, MCP, **and** skills read as live —
  e.g. "Client SDKs, a hosted MCP server, and AI agent skills are live today,
  each listed here with what it does."
- In the "LLM agent skills" card: keep the icon; refine the body to note it's a
  Claude Code / Codex plugin; add a repo link (mirror the MCP card's linked
  host, using the `endpointUrl` style to show `github.com/lineage-foundation/skills`);
  change `<Tag status="soon">Coming soon</Tag>` → `<Tag status="live">Live</Tag>`;
  update the `{/* 3 — LLM agent skills (coming soon) */}` comment to `(live)`.

### 3. Docs — a new "AI Skills" section

`app/docs/page.tsx`:
- Add a nav `<li>` in the **API** group, right after the `#mcp-server` entry:
  `<li><a href="#ai-skills">AI Skills</a></li>`.
- Add an `<article id="ai-skills" className={styles.prose}>` after the
  `#mcp-server` article, containing:
  - **What it is:** the `lineage` plugin — packaged skills that make an AI
    coding agent (Claude Code or Codex) expert in Lineage; retrieved
    automatically by task, no manual invocation; `lineage-fundamentals` is the
    base and the three tracks are summarized in one or two sentences, with a
    link to the repo (`URL_SKILLS`) for the full catalog.
  - **Install — Claude Code:** an `<h3>` + `<CodeBlock lang="shell">` with
    `/plugin marketplace add lineage-foundation/skills`, then a line: install
    the `lineage` plugin from the `/plugin` menu.
  - **Install — Codex:** an `<h3>` + short prose: register the repo's
    `.codex-plugin/` directory per the Codex plugin docs (link to
    `URL_SKILLS`); note there's no one-line command yet.
  - **Using them:** one short paragraph — work on a Lineage task and the agent
    pulls the matching skill automatically; no auth needed; the skills don't
    require the MCP server.

### 4. Developers — AI Skills call-out

`app/developers/page.tsx`:
- Import `URL_SKILLS`.
- In the SDKs section, beside the existing MCP call-out, add an AI Skills
  pointer: a short prose line + `<LinkCta href={URL_SKILLS}>AI Skills ·
  lineage-foundation/skills</LinkCta>` (or fold both MCP + Skills into one
  "Building an AI agent?" call-out). Keep it to a prose + LinkCta; do not add a
  4th card to the `grid3` "Three ways in" (avoids the odd-count layout issue).

## Verification

- `npm run build -- --webpack` green; `npm run lint` clean (pre-existing
  `design-prototype` warning excepted).
- Live render: `/ecosystem` skills card reads **Live** and links to the repo;
  intro prose no longer says skills are "on the way"; `/docs` has an **AI
  Skills** section (in TOC + article) with the Claude Code command and Codex
  note; `/developers` links to the skills repo.
- `grep`: `URL_SKILLS` defined once, referenced at ecosystem, docs, developers;
  no hardcoded `lineage-foundation/skills` at render sites (except the constant).
- No skills copy asserts an MCP dependency.
