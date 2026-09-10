# Remove Buy LNGX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the "Buy LNGX" purchase flow and its general-audience CTAs from the site, keeping the developer faucet as a builder-only tool.

**Architecture:** The purchase UI is a disabled front-end preview centred on the `/get-tokens` route (a server page rendering a client component with a Buy panel + Faucet panel behind a tab toggle). We collapse that route to the faucet alone, delete the four CTAs that advertise buying, and add one developer-context link so the faucet stays reachable.

**Tech Stack:** Next.js (this repo's vendored build — see AGENTS.md), React, TypeScript, CSS Modules.

## Global Constraints

- No new hex colours in stylesheets; UI uses public CSS variables from `app/globals.css`. (No CSS token changes are expected in this plan.)
- No SAFE / investment content is added anywhere.
- Do NOT touch roadmap copy ("LNGX liquidity", "exchange readiness / listing", bridge "lock / mint / burn / release") or tokenomics *explanatory* copy — only the tokenomics "Get LNGX" button is removed.
- Verification per task (no unit-test harness exists for these UI files): `npm run build` succeeds, `npm run lint` is clean, and the task's grep assertion holds. This replaces the usual TDD red/green cycle.
- Keep task ordering as written: the client component is emptied of buy code *before* the buy config is deleted, so the build stays green after every task.
- Commit after each task.

---

### Task 1: Collapse `/get-tokens` client to faucet-only

Remove `BuyPanel`, the tab toggle, the orphaned agent note, and buy-only helpers from the client component. The root renders `<FaucetPanel />` directly. `FaucetPanel` itself is unchanged.

**Files:**
- Modify: `components/get-tokens/GetTokensClient.tsx`

**Interfaces:**
- Consumes: `GET_TOKENS_CONFIG` (still exports `.faucet`) and `FAUCET_STORAGE_KEY` from `./config` — unchanged in this task.
- Produces: `GetTokensClient` (default-styled `<section>` rendering only the faucet) — consumed by `app/get-tokens/page.tsx`.

- [ ] **Step 1: Update the file header comment**

Replace the top doc comment (currently "GetTokensClient — Buy LNGX + Developer Faucet UI.") with:

```tsx
/**
 * GetTokensClient — Developer Faucet UI.
 *
 * FRONT-END ONLY — no real token dispensing happens here.
 * The submit handler is a stub that drives visual state only.
 * See design-prototype/get-tokens-backend.md for the server contract.
 */
```

- [ ] **Step 2: Remove the `Segmented` import**

Delete this line from the imports block:

```tsx
import { Segmented } from "@/components/ui/Segmented";
```

Leave all other UI imports (`Button`, `Container`, `Cooldown`, `Field`, `Input`, `LinkCta`, `StatusBar`) — `FaucetPanel`/root still use them.

- [ ] **Step 3: Delete buy-only helpers**

Delete the `fmtMoney` and `fmtLngx` functions and the `shortenAddress` function from the `/* ---- helpers ---- */` block. Keep `looksLikeAddress` and `simpleHash` (both used by `FaucetPanel`).

- [ ] **Step 4: Delete the `Tab` type**

In the `/* ---- types ---- */` block, delete:

```tsx
type Tab = "buy" | "faucet";
```

Keep `type StatusState` and the `COMING_SOON` constant.

- [ ] **Step 5: Delete the entire `BuyPanel` block**

Delete everything from the `/* === BUY PANEL === */` banner comment through the end of the `BuyPanel` function (its closing `}` and the trailing `);`), including the "Transacting programmatically, or building an agent?" agent note that lives inside it. Stop deleting at the `/* === FAUCET PANEL === */` banner — `FaucetPanel` stays exactly as-is.

- [ ] **Step 6: Replace the root component and delete `TAB_OPTIONS`**

Delete the `TAB_OPTIONS` constant and replace the entire `export function GetTokensClient()` with:

```tsx
/* ===================================================================
   ROOT CLIENT COMPONENT
   =================================================================== */

export function GetTokensClient() {
  return (
    <section className={styles.clientSection}>
      <Container>
        <FaucetPanel />
      </Container>
    </section>
  );
}
```

This removes the `tab` state, the `#faucet` hash-restore effect, `handleTabChange`, the `Segmented` toggle, and the two `role="tabpanel"` wrappers.

- [ ] **Step 7: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds; lint clean. In particular, no "unused variable" / "unused import" errors for `Segmented`, `Tab`, `fmtMoney`, `fmtLngx`, `shortenAddress`, `useCallback`/`useEffect`/`useId`/`useState` (the last four are still used by `FaucetPanel`, so they must remain imported).

- [ ] **Step 8: Verify no buy UI remains in the client**

Run: `grep -nE "BuyPanel|Buy LNGX|Pay with card|TAB_OPTIONS|Segmented|fmtMoney" components/get-tokens/GetTokensClient.tsx`
Expected: no output.

- [ ] **Step 9: Commit**

```bash
git add components/get-tokens/GetTokensClient.tsx
git commit -m "$(printf '%s\n' 'fix(get-tokens): drop Buy LNGX panel, keep faucet' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 2: Strip buy fields from the config

Now that nothing references the buy config, remove it and leave the faucet config.

**Files:**
- Modify: `components/get-tokens/config.ts`

**Interfaces:**
- Produces: `GET_TOKENS_CONFIG` with shape `{ faucet: { amountTokens: number; cooldownMs: number } }` and `FAUCET_STORAGE_KEY: string`. (Name kept; only `GetTokensClient` imports it.)

- [ ] **Step 1: Replace the file contents**

Replace the whole of `components/get-tokens/config.ts` with:

```ts
/**
 * PLACEHOLDER faucet values — pending backend sign-off.
 * No real token dispensing happens client-side; see
 * design-prototype/get-tokens-backend.md for the eventual server contract.
 *
 * Prototype source (get-tokens.html CONFIG block) sets:
 *   FAUCET_AMOUNT: 10   COOLDOWN_HOURS: 24
 */
export const GET_TOKENS_CONFIG = {
  faucet: {
    /** Test LNGX dispensed per faucet claim (prototype: 10). */
    amountTokens: 10,
    /** Cooldown duration in milliseconds (prototype: 24 h). */
    cooldownMs: 24 * 60 * 60 * 1000,
  },
} as const;

/** localStorage key for the faucet last-claim timestamp (milliseconds). */
export const FAUCET_STORAGE_KEY = "lngx-faucet-last-claim";
```

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds; lint clean. No TypeScript errors about missing `currencySymbol`, `lngxPerUnit`, `minPurchase`, `maxPurchase`, `tiers`, `currency`, or `ratePerToken` (all were only read by the now-deleted `BuyPanel`).

- [ ] **Step 3: Verify buy config is gone**

Run: `grep -nE "maxPurchase|minPurchase|lngxPerUnit|ratePerToken|tiers|currencySymbol" components/get-tokens/config.ts`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/get-tokens/config.ts
git commit -m "$(printf '%s\n' 'fix(get-tokens): remove buy/pricing config, keep faucet' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 3: Reframe the `/get-tokens` page head and metadata

Move copy from "top up / buy for utility" to a developer-faucet framing; remove the investment disclaimer.

**Files:**
- Modify: `app/get-tokens/page.tsx`

**Interfaces:**
- Consumes: `GetTokensClient` (faucet-only), `Accent`, `PageHead`, `SITE_ORIGIN`. No signature changes.

- [ ] **Step 1: Replace the `metadata` object**

Replace the exported `metadata` with:

```tsx
export const metadata: Metadata = {
  title: {
    absolute: "Developer faucet | Lineage",
  },
  description:
    "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
  alternates: {
    canonical: "/get-tokens",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Developer faucet | Lineage",
    description:
      "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
    url: `${SITE_ORIGIN}/get-tokens`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer faucet | Lineage",
    description:
      "Request a small amount of test LNGX from the developer faucet to build and integrate against the Lineage network.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};
```

- [ ] **Step 2: Replace the `PageHead`**

Replace the `<PageHead ... />` element with:

```tsx
      <PageHead
        eyebrow="Developer faucet · Coming soon"
        title={
          <>
            <Accent>Build</Accent> with test LNGX
          </>
        }
        lead={
          <p>
            Pull a small amount of test{" "}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
            >
              LNGX
            </span>{" "}
            from the developer faucet to exercise transactions, items, and
            contract calls while you build and integrate against the network.
          </p>
        }
      />
```

- [ ] **Step 3: Update the section comment**

Change the JSX comment `{/* ── BUY / FAUCET INTERACTIVE SECTION ── */}` to `{/* ── FAUCET INTERACTIVE SECTION ── */}`.

- [ ] **Step 4: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds; lint clean.

- [ ] **Step 5: Verify buy/investment copy is gone from the page**

Run: `grep -niE "buy|top up|not an investment|utility top-up" app/get-tokens/page.tsx`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add app/get-tokens/page.tsx
git commit -m "$(printf '%s\n' 'fix(get-tokens): reframe page around developer faucet' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

### Task 4: Remove the four buy CTAs

Delete every general-audience affordance that advertised buying LNGX. Each is an independent edit; grouped because they share one deliverable and verification.

**Files:**
- Modify: `components/SiteHeader.tsx:213-217`
- Modify: `components/SiteFooter.tsx:30-32`
- Modify: `components/home/GetStartedGrid.tsx:48-52`
- Modify: `app/tokenomics/page.tsx:140-142`

- [ ] **Step 1: Header — delete the primary "Get tokens" button**

In `components/SiteHeader.tsx`, delete the block:

```tsx
          <div className={styles.headerCta}>
            <Button variant="primary" size="sm" href="/get-tokens">
              Get tokens
            </Button>
          </div>
```

Then check whether `Button` is still used elsewhere in the file: run `grep -n "Button" components/SiteHeader.tsx`. If there are no other references, also remove `import { Button } from "@/components/ui";` (line 7). (The mobile menu uses plain `Link`, so `Button` is likely now unused.)

- [ ] **Step 2: Footer — delete the "Get tokens" link**

In `components/SiteFooter.tsx`, delete the list item:

```tsx
              <li>
                <Link href="/get-tokens">Get tokens</Link>
              </li>
```

- [ ] **Step 3: Home grid — delete the "Get LNGX" tile**

In `components/home/GetStartedGrid.tsx`, delete this object from the `TILES` array (including its trailing comma):

```tsx
  {
    title: "Get LNGX",
    body: "Top up a small amount for on-network utility, or pull test LNGX from the developer faucet.",
    links: [{ label: "Get tokens", href: "/get-tokens" }],
  },
```

- [ ] **Step 4: Tokenomics — delete the secondary "Get LNGX" button**

In `app/tokenomics/page.tsx`, delete:

```tsx
            <Button href="/get-tokens" variant="secondary">
              Get LNGX
            </Button>
```

The `actions` block keeps the "Read the whitepaper" `Button` and "Browse the docs" `LinkCta`. Then confirm `Button` is still used in that file (the whitepaper button uses it) — run `grep -n "<Button" app/tokenomics/page.tsx`; expect the whitepaper button to remain, so keep the `Button` import.

- [ ] **Step 5: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds; lint clean (no unused `Button` import in `SiteHeader.tsx`).

- [ ] **Step 6: Verify no inbound buy CTAs remain**

Run: `grep -rn "get-tokens" app components --include="*.tsx" --include="*.ts" | grep -v "components/get-tokens/" | grep -vE "app/(get-tokens/page|sitemap)\.tsx?"`
Expected: no output *yet* (the Developers link is added in Task 5). This confirms the header, footer, home grid, and tokenomics links are gone.

- [ ] **Step 7: Manual layout check**

Run: `npm run dev`, open `http://localhost:3000`, and confirm: the header renders with no primary button and correct spacing (nav ↔ mobile menu button); the home "Get started" grid reflows cleanly from 6 to 5 tiles with no broken last row; the footer "Project" column and the tokenomics header actions render without gaps. If the header shows a visible spacing/justification problem from the removed flex child, adjust `components/SiteHeader.module.css` minimally (e.g. the header row's `justify-content`/`gap`) — do not add colours. Stop the dev server when done.

- [ ] **Step 8: Commit**

```bash
git add components/SiteHeader.tsx components/SiteFooter.tsx components/home/GetStartedGrid.tsx app/tokenomics/page.tsx components/SiteHeader.module.css
git commit -m "$(printf '%s\n' 'fix(site): remove Buy/Get LNGX CTAs (header, footer, home, tokenomics)' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

(`SiteHeader.module.css` is only staged if Step 7 required a tweak; otherwise it is a no-op in the add.)

---

### Task 5: Add the developer-context faucet link

Keep the faucet discoverable from one builder-facing place.

**Files:**
- Modify: `app/developers/page.tsx:293-345` (Client SDKs `Section`)

**Interfaces:**
- Consumes: `LinkCta` (already imported in this file), `styles.sectionProse`, `styles.cardCta` (both already used in this file).

- [ ] **Step 1: Add the faucet link inside the Client SDKs section**

In `app/developers/page.tsx`, immediately before the `</Section>` that closes the "Client SDKs" section (right after the `</div>` closing `styles.grid3`), insert:

```tsx
        <p className={styles.sectionProse}>
          Building against the network? Pull test LNGX from the developer
          faucet — one claim per address, no card required.
        </p>
        <div className={styles.cardCta}>
          <LinkCta href="/get-tokens">Developer faucet</LinkCta>
        </div>
```

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds; lint clean.

- [ ] **Step 3: Verify the link exists**

Run: `grep -n "get-tokens" app/developers/page.tsx`
Expected: one match — the `<LinkCta href="/get-tokens">Developer faucet</LinkCta>` line.

- [ ] **Step 4: Commit**

```bash
git add app/developers/page.tsx
git commit -m "$(printf '%s\n' 'feat(developers): link the developer faucet from Client SDKs' '' 'Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>' 'Claude-Session: https://claude.ai/code/session_01GiTkeAEoDShsufZCLx4EwV')"
```

---

## Final Verification

- [ ] `npm run build` and `npm run lint` both clean on the final tree.
- [ ] `grep -rniE "buy lngx|pay with card|per-purchase cap" app components` returns nothing.
- [ ] `/get-tokens` renders a single faucet panel (no tab toggle) and is reachable via the Developers page "Developer faucet" link.
- [ ] No SAFE/investment content was introduced; roadmap and tokenomics explanatory copy are untouched (`git diff main --stat` shows only the files named in this plan, plus the spec/plan docs).
