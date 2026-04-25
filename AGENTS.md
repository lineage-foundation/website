<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Brand and UI (Lineage)

- **Token source:** `app/globals.css` (`:root`). New UI must use public CSS variables; do not add stray hex in stylesheets.
- **Narrated rules + QA notes:** [docs/brand-system.md](docs/brand-system.md) (v2 rebrand, contrast, do/don’t, hex audit, a11y and performance checklists).
- **Product scope:** [tasks/prd-web3-brand-rebrand.md](tasks/prd-web3-brand-rebrand.md).
- **Layout patterns:** `Section` supports `visual` (e.g. `feature` header rail + chip) and `tone` (e.g. `band`) for long-form and home sections — see [README.md](README.md#design-system) and `components/ui/Section.tsx`.
