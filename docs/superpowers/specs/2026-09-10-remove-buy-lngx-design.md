# Remove "Buy LNGX" from the site

**Date:** 2026-09-10
**Status:** Approved design, pending implementation plan

## Why

We are not selling LNGX tokens yet — tokens can only be sold once the network is
live. In the interim the raise happens through SAFEs (handled off-site for now).
The site must therefore stop offering token purchases. The **developer faucet**
(free test LNGX for builders) is unrelated to a sale and stays.

## Scope

**In scope:** remove every "buy / acquire LNGX" affordance and the general-audience
CTAs that lead to it; reframe the surviving page around the developer faucet; keep
the faucet reachable from a developer context.

**Out of scope:**
- No SAFE / investment content is added anywhere (separate future effort).
- Roadmap copy about "LNGX liquidity", "exchange readiness / listing", and the
  Ethereum bridge "lock / mint / burn / release" stays — that describes protocol
  roadmap, not an on-site purchase.
- Tokenomics *explanatory* copy about LNGX (unit of value, FReT, allocation chart)
  stays; only its "Get LNGX" button is removed.

## Current state (reference)

The purchase experience is a **disabled front-end preview** — no real payments or
token dispensing exist; every submit handler is a visual stub
(`COMING_SOON = true`). It centres on the `/get-tokens` route:

- `app/get-tokens/page.tsx` — server page: head + metadata, renders the client.
- `components/get-tokens/GetTokensClient.tsx` — `BuyPanel` + `FaucetPanel` behind a
  `Segmented` tab toggle (defaults to Buy, `#faucet` hash selects the faucet).
- `components/get-tokens/config.ts` — buy config (rate, min/max, KYC cap, tiers) +
  faucet config.

Four general-audience CTAs point at `/get-tokens`:
- `components/SiteHeader.tsx` L214 — global primary button "Get tokens".
- `components/SiteFooter.tsx` L31 — footer link "Get tokens".
- `components/home/GetStartedGrid.tsx` L48–52 — home "Get LNGX" tile.
- `app/tokenomics/page.tsx` L140 — secondary button "Get LNGX".

`app/sitemap.ts` L60 lists `/get-tokens` (route survives, so this stays).

## Changes

### 1. `/get-tokens` → developer-faucet-only page

**`components/get-tokens/GetTokensClient.tsx`**
- Delete the `BuyPanel` function in full.
- Delete the tab machinery in the root component: the `Segmented` toggle,
  `TAB_OPTIONS`, the `Tab` type, the `tab` state, the `#faucet` hash-restore
  effect, and `handleTabChange`. The root renders `<FaucetPanel />` directly inside
  the existing `section` / `Container` (drop the `role="tabpanel"` wrappers; the
  faucet becomes the page's sole content).
- Delete the orphaned "Transacting programmatically, or building an agent?" note
  (it lived inside `BuyPanel`; its "automated clients don't pay by card" framing
  only made sense beside a card checkout).
- Delete now-unused helpers: `fmtMoney`, `fmtLngx`, `shortenAddress`.
- Keep `looksLikeAddress` and `simpleHash` (both used by `FaucetPanel`).
- Remove the `Segmented` import. Keep `Container`, `Button`, `Field`, `Input`,
  `LinkCta`, `StatusBar`, `Cooldown` (all still used by `FaucetPanel`/root).
- Update the file header comment: it describes "Buy LNGX + Developer Faucet" →
  "Developer faucet".

**`components/get-tokens/config.ts`**
- Remove all buy fields: `currency`, `currencySymbol`, `lngxPerUnit`,
  `ratePerToken`, `minPurchase`, `maxPurchase`, `tiers`.
- Keep the `faucet` block and `FAUCET_STORAGE_KEY`.
- Rewrite the header comment: drop the purchase/KYC/compliance/Stripe references;
  it now documents only the faucet placeholder values.
- Keep the exported name `GET_TOKENS_CONFIG` (only `GetTokensClient` imports it;
  renaming adds churn for no benefit — the faucet still lives under this config).

**`app/get-tokens/page.tsx`**
- Rewrite `PageHead`: eyebrow, title, and lead move from "top up / buy for utility"
  language to a developer-faucet framing (test LNGX for building on the network).
- Remove the "These are utility top-ups, not an investment product." line — the
  disclaimer only existed because we were selling.
- Update `metadata` (`title`, `description`, and the OG/Twitter mirrors) to the
  faucet framing. Keep `canonical: "/get-tokens"` and `robots index/follow` (route
  is unchanged and still worth indexing).

### 2. Remove the four general-audience CTAs

- **`components/SiteHeader.tsx`** — delete the primary "Get tokens" `Button` and its
  `<div className={styles.headerCta}>` wrapper (L213–217). The header keeps no
  primary button. Verify the header layout still spaces the nav and mobile
  menu-button correctly with that flex child gone; adjust the header CSS only if a
  visible gap/justification issue appears.
- **`components/SiteFooter.tsx`** — delete the `<li>` with the "Get tokens" link
  (L30–32).
- **`components/home/GetStartedGrid.tsx`** — delete the "Get LNGX" tile object
  (L48–52). The grid renders from a `TILES` array and reflows 6→5 tiles; confirm the
  grid CSS handles the odd count without a broken last row.
- **`app/tokenomics/page.tsx`** — delete the `<Button href="/get-tokens">Get LNGX
  </Button>` (L140–142). Leaves "Read the whitepaper" (primary) + "Browse the docs".

### 3. Keep the faucet reachable from a developer context

Today the only inbound links to the faucet are the CTAs being removed, so without a
replacement the faucet would be reachable only by direct URL. Add **one** dev-context
entry point:

- **`app/developers/page.tsx`** — add a "Developer faucet" `LinkCta` (→ `/get-tokens`)
  near the SDK / quickstart content, framed as a builder tool.

`app/sitemap.ts` keeps `/get-tokens` (route still exists).

## Verification

- `npm run build` (or the project's typecheck/lint) passes — no dangling imports,
  unused symbols, or references to removed config fields.
- Grep confirms no remaining "Buy LNGX" / "Pay with card" / buy-tier / purchase-cap
  copy in shipped `app/` + `components/` code.
- `/get-tokens` renders as a single faucet panel (no tab toggle), reachable from the
  Developers page.
- Header, footer, home grid, and tokenomics page render correctly with their CTAs
  removed (no layout breakage, no dead links).
