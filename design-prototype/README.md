# Lineage — static design prototype

A self-contained, high-fidelity **design reference** for the Lineage site rebrand
(bioluminescent BRAND v2). It is **not** the production app — the production site is
the Next.js / React / Tailwind source at the repo root. This folder exists so the
visual direction, copy, and interaction details can be diffed against while porting
them into the React components.

## Stack
Plain static HTML + one shared stylesheet (`css/lineage.css`) + vanilla JS
(`js/lineage.js`). No build step — open `index.html` in a browser.

## Pages
`index` · `technology` · `tokenomics` · `roadmap` · `developers` · `ecosystem`
· `research` · `docs` · `about` · `get-tokens`

Shared chrome (header/footer) lives in `partials/_chrome.html` and is pasted into
each page; `css/lineage.css` and `js/lineage.js` are the single source of truth for
tokens, components, and behaviour (nav dropdown, scroll reveal, hero animation).

## Companion specs
- `brand-mark.md` — logo (Clearing Cross) construction + symbology + usage rules
- `get-tokens-backend.md` — backend contract for the Buy LNGX / faucet flows
  (Stripe Checkout + faucet endpoints). The page ships the front-end + states only;
  payments and token dispensing are server-side work, not implemented here.

## Notes for porting
- All visual values are tokens in `css/lineage.css` `:root` (the BRAND v2 palette).
- Business values on `get-tokens.html` (purchase cap, currency, rate, faucet amount,
  cooldown) are placeholders in a single `CONFIG` block — confirm with compliance.
- Team headshots are sourced from LinkedIn; swap if higher-res masters become available.
