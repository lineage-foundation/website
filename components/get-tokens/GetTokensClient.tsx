"use client";

/**
 * GetTokensClient — Buy LNGX + Developer Faucet UI.
 *
 * FRONT-END ONLY — no real payments or token dispensing happen here.
 * All submit handlers are stubs that drive visual state only.
 * See design-prototype/get-tokens-backend.md for the server contract.
 */

import { useCallback, useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Cooldown } from "@/components/ui/Cooldown";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { LinkCta } from "@/components/ui/LinkCta";
import { Segmented } from "@/components/ui/Segmented";
import { StatusBar, type StatusTone } from "@/components/ui/StatusBar";

import { FAUCET_STORAGE_KEY, GET_TOKENS_CONFIG } from "./config";
import styles from "./GetTokensClient.module.css";

/* ---- helpers ---- */

function fmtMoney(n: number): string {
  return (
    GET_TOKENS_CONFIG.currencySymbol +
    (Math.round(n * 100) / 100).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

function fmtLngx(n: number): string {
  return Math.round(n).toLocaleString("en-US") + " LNGX";
}

/** Lightweight Lineage address sanity check — server re-validates authoritatively. */
function looksLikeAddress(v: string): boolean {
  return /^[0-9a-zA-Z]{24,}$/.test(v.trim());
}

function shortenAddress(a: string): string {
  const t = a.trim();
  return t.length > 14 ? t.slice(0, 8) + "…" + t.slice(-4) : t;
}

/** Simple non-cryptographic hash for reference IDs in the stub response. */
function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

/* ---- types ---- */

type StatusState = { tone: StatusTone; message: string } | null;
type Tab = "buy" | "faucet";

/* ===================================================================
   BUY PANEL
   =================================================================== */

function BuyPanel() {
  const { currencySymbol, lngxPerUnit, minPurchase, maxPurchase, tiers } =
    GET_TOKENS_CONFIG;

  const buyAmountId = useId();
  const buyAddressId = useId();

  const [rawAmount, setRawAmount] = useState("");
  const [address, setAddress] = useState("");
  const [addressInvalid, setAddressInvalid] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);
  const [loading, setLoading] = useState(false);

  const amount = parseFloat(rawAmount) || 0;
  const lngxAmount = amount * lngxPerUnit;

  // Determine validation state for the amount
  const amountTooLow = rawAmount !== "" && amount > 0 && amount < minPurchase;
  const amountZero = rawAmount !== "" && amount <= 0;

  const formIsValid =
    amount >= minPurchase &&
    amount <= maxPurchase &&
    looksLikeAddress(address);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setRawAmount(v);
    const n = parseFloat(v) || 0;
    // Clear status when user starts editing (unless it was a success)
    if (status && status.tone !== "ok") setStatus(null);
    if (n > maxPurchase) {
      setStatus({
        tone: "warn",
        message: `Utility purchases are capped at ${fmtMoney(maxPurchase)} per purchase. For a larger amount, <a href="mailto:contact@lineage.foundation">get in touch</a>.`,
      });
    } else {
      setStatus(null);
    }
  }

  function handleTierClick(t: number) {
    setRawAmount(String(t));
    if (status && status.tone !== "ok") setStatus(null);
    if (t > maxPurchase) {
      setStatus({
        tone: "warn",
        message: `Utility purchases are capped at ${fmtMoney(maxPurchase)} per purchase.`,
      });
    } else {
      setStatus(null);
    }
  }

  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
    setAddressInvalid(false);
  }

  function handleAddressBlur() {
    if (address.trim() && !looksLikeAddress(address)) {
      setAddressInvalid(true);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formIsValid || loading) return;

    setLoading(true);
    setStatus({
      tone: "info",
      message: "Redirecting to secure checkout…",
    });

    /**
     * STUB — no network call.
     * Real flow: POST /api/checkout/session {amount, currency, address}
     *   → server creates Stripe Checkout Session → redirect to session.url
     *   → Stripe webhook confirms payment → backend dispenses LNGX.
     * Payments and token dispensing are server-side only; see
     * design-prototype/get-tokens-backend.md.
     */
    setTimeout(() => {
      const ref =
        "LNG-" +
        Math.abs(simpleHash(address + ":" + amount))
          .toString(36)
          .toUpperCase()
          .slice(0, 8);
      setStatus({
        tone: "ok",
        message: `<strong>Preview only — no payment was taken.</strong><br>When live, this is where checkout returns and <strong>${fmtLngx(lngxAmount)}</strong> is sent to <code>${shortenAddress(address)}</code>. Reference <code>${ref}</code>.`,
      });
      setLoading(false);
    }, 1300);
  }

  const amountErrorMsg =
    amountZero || amountTooLow
      ? `Enter a valid amount (min ${fmtMoney(minPurchase)}).`
      : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.txGrid}>
        {/* ---- form card ---- */}
        <div className={styles.txCard}>
          <h2>Buy LNGX with a card</h2>
          <p className={styles.txSub}>
            For small, utility-purpose amounts. Capped per purchase to keep
            checkout simple and identity-light.
          </p>

          {/* Tier preset buttons */}
          <Field
            label="Choose an amount"
            htmlFor={buyAmountId + "-tiers"}
          >
            <div
              className={styles.tiers}
              role="group"
              aria-label="Preset amounts"
              id={buyAmountId + "-tiers"}
            >
              {tiers.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={
                    amount === t
                      ? `${styles.tier} ${styles.tierActive}`
                      : styles.tier
                  }
                  aria-pressed={amount === t}
                  onClick={() => handleTierClick(t)}
                >
                  {currencySymbol}
                  {t}
                </button>
              ))}
            </div>
          </Field>

          {/* Manual amount input */}
          <Field
            label="Or enter an amount"
            htmlFor={buyAmountId}
            hint={`Min ${fmtMoney(minPurchase)} · max ${fmtMoney(maxPurchase)} per purchase.`}
            error={amountErrorMsg}
          >
            <Input
              id={buyAmountId}
              type="number"
              inputMode="decimal"
              min={0}
              step={1}
              placeholder="0"
              autoComplete="off"
              prefix={currencySymbol}
              mono
              value={rawAmount}
              onChange={handleAmountChange}
              invalid={amountZero || amountTooLow}
              aria-describedby={buyAmountId + "-hint"}
            />
          </Field>

          {/* Destination address */}
          <Field
            label="Destination Lineage address"
            htmlFor={buyAddressId}
            error={
              addressInvalid
                ? "That doesn’t look like a valid Lineage address. Check and paste it again."
                : undefined
            }
          >
            <Input
              id={buyAddressId}
              type="text"
              placeholder="Paste the address that will receive LNGX"
              autoComplete="off"
              spellCheck={false}
              mono
              value={address}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
              invalid={addressInvalid}
            />
          </Field>

          {/* Quote summary */}
          <div className={styles.quote} aria-live="polite">
            <div className={styles.quoteRow}>
              <span className={styles.quoteKey}>You pay</span>
              <span className={styles.quoteVal}>{fmtMoney(amount)}</span>
            </div>
            <div className={styles.quoteRow}>
              <span className={styles.quoteKey}>Indicative rate</span>
              <span className={styles.quoteVal}>
                {currencySymbol}1 ≈ {lngxPerUnit} LNGX
              </span>
            </div>
            <div className={styles.quoteRow}>
              <span className={styles.quoteKey}>You receive (est.)</span>
              <span className={styles.quoteTotalVal}>{fmtLngx(lngxAmount)}</span>
            </div>
          </div>

          {/* Status bar */}
          {status && (
            <div className={styles.statusWrap}>
              <StatusBar tone={status.tone}>
                {/* dangerouslySetInnerHTML is safe here — status messages are
                    constructed entirely from in-code template strings, never
                    from user input. */}
                <span dangerouslySetInnerHTML={{ __html: status.message }} />
              </StatusBar>
            </div>
          )}

          {/* Submit */}
          <div className={styles.txActions}>
            <Button
              type="submit"
              variant="primary"
              disabled={!formIsValid || loading}
            >
              {loading ? "Processing…" : "Pay with card"}
            </Button>
          </div>

          <p className={styles.txLegal}>
            Card payments are handled by our payment processor; Lineage never
            sees your card details. LNGX is a network utility token for
            transacting on Lineage, not a financial investment. The receive
            amount is an estimate and settles at the network rate at the time of
            purchase.
          </p>
        </div>

        {/* ---- aside ---- */}
        <aside className={styles.txAside}>
          <div className={styles.txFact}>
            <h3>Per-purchase cap</h3>
            <p className={styles.txFactBig}>{fmtMoney(maxPurchase)}</p>
            <p>
              Utility top-ups are limited per purchase to keep buying fast and
              identity-light. Need more?{" "}
              <a href="mailto:contact@lineage.foundation">Talk to us</a>.
            </p>
          </div>
          <div className={styles.txFact}>
            <h3>What LNGX is for</h3>
            <p>
              Paying network fees and transacting in apps built on Lineage.
              Supply is managed by the{" "}
              <a href="/technology#arco">ARCO</a> layer rather than a fixed cap.
            </p>
          </div>
          <div className={styles.txFact}>
            <h3>Delivery</h3>
            <p>
              Once payment clears, LNGX is sent to the address you provide. Make
              sure it&rsquo;s a Lineage address you control &mdash; transfers
              can&rsquo;t be reversed.
            </p>
          </div>
        </aside>
      </div>

      {/* ---- agent note ---- */}
      <div className={styles.agentNote}>
        <h3>Transacting programmatically, or building an agent?</h3>
        <p>
          Automated clients don&rsquo;t pay by card. Agents and services
          transact directly against the network APIs, and an MCP server is on
          the way so AI agents can read balances and move value as tools.
        </p>
        <div className={styles.agentLinks}>
          <LinkCta href="/developers">Developer overview</LinkCta>
          <LinkCta href="/docs">API reference</LinkCta>
          <LinkCta href="/ecosystem#tooling">MCP server</LinkCta>
        </div>
      </div>
    </form>
  );
}

/* ===================================================================
   FAUCET PANEL
   =================================================================== */

function FaucetPanel() {
  const { faucet } = GET_TOKENS_CONFIG;
  const fauAddressId = useId();

  const [address, setAddress] = useState("");
  const [addressInvalid, setAddressInvalid] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);
  const [loading, setLoading] = useState(false);
  /**
   * Timestamp (ms) when the cooldown ends; 0 = no cooldown.
   * Initialised to the SSR-safe default (0) so server and first client render
   * match. The mount effect below restores the persisted value post-hydration
   * to avoid an SSR/client mismatch.
   */
  const [cooldownUntil, setCooldownUntil] = useState(0);

  /**
   * Tracked `now` so `isCoolingDown` is a pure derived value during render
   * (no impure Date.now() call in the render path). Lazy initializer reads
   * Date.now() once on mount; the interval effect below ticks it each second
   * while a cooldown is active.
   */
  const [now, setNow] = useState(() => Date.now());

  // Restore browser-only state after hydration (Fixes 1 & 2).
  // Initialised to SSR-safe defaults above; this effect corrects them on the
  // client without causing a hydration mismatch.
  // faucet.cooldownMs is a compile-time module constant — safe to omit.
  useEffect(
    () => {
      try {
        const stored = localStorage.getItem(FAUCET_STORAGE_KEY);
        if (stored) {
          const last = parseInt(stored, 10);
          if (!isNaN(last)) {
            const ends = last + faucet.cooldownMs;
            if (ends > Date.now()) {
              setCooldownUntil(ends);
              // Fix 2: show cooldown status immediately on reload so the user
              // sees the countdown rather than a silently disabled button.
              // The Cooldown widget is appended by the existing isCoolingDown
              // branch in the StatusBar JSX below.
              setStatus({
                tone: "warn",
                message: "You&rsquo;ve already claimed recently.",
              });
            }
          }
        }
      } catch {
        // localStorage unavailable (e.g. private browsing restriction)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [], // mount only — syncing client-only persisted/URL state post-hydration
  );

  // Keep `now` ticking while a cooldown is active
  useEffect(() => {
    if (cooldownUntil <= 0) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [cooldownUntil]);

  // Fix 5: remove redundant `now > 0` — Date.now() is always positive
  const isCoolingDown = cooldownUntil > now;
  const claimDisabled = !looksLikeAddress(address) || isCoolingDown || loading;

  const handleCooldownElapsed = useCallback(() => {
    setCooldownUntil(0);
    setStatus(null);
  }, []);

  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setAddress(v);
    setAddressInvalid(false);
    // Re-check cooldown for new address when the user changes it
    try {
      const stored = localStorage.getItem(FAUCET_STORAGE_KEY);
      if (stored && v.trim()) {
        const last = parseInt(stored, 10);
        if (!isNaN(last)) {
          const ends = last + faucet.cooldownMs;
          if (ends > Date.now()) {
            setCooldownUntil(ends);
          } else {
            setCooldownUntil(0);
            if (status?.tone === "warn") setStatus(null);
          }
        }
      } else if (!v.trim()) {
        setCooldownUntil(0);
      }
    } catch {
      // ignore
    }
  }

  function handleAddressBlur() {
    if (address.trim() && !looksLikeAddress(address)) {
      setAddressInvalid(true);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!looksLikeAddress(address)) {
      setAddressInvalid(true);
      setStatus({ tone: "err", message: "Please provide a valid Lineage address." });
      return;
    }

    if (isCoolingDown || loading) return;

    setLoading(true);
    setStatus({
      tone: "info",
      message: `Sending ${faucet.amountTokens} test LNGX…`,
    });

    /**
     * STUB — no network call.
     * Real flow: POST /api/faucet/claim {address}
     *   → server checks cooldown → signs + broadcasts from the faucet wallet
     *   → returns { txHash }.
     * Token dispensing is server-side only; see
     * design-prototype/get-tokens-backend.md.
     * localStorage cooldown here is UX only — server enforces authoritatively.
     */
    setTimeout(() => {
      const now = Date.now();
      try {
        localStorage.setItem(FAUCET_STORAGE_KEY, String(now));
      } catch {
        // ignore
      }
      const txHash =
        "0x" +
        Math.abs(simpleHash(address + ":" + now))
          .toString(16)
          .padStart(8, "0") +
        "b3a1c9";
      const ends = now + faucet.cooldownMs;
      setCooldownUntil(ends);
      setStatus({
        tone: "ok",
        message: `<strong>Sent ${faucet.amountTokens} test LNGX.</strong><br>Transaction <code>${txHash}</code>. Explorer link coming soon.`,
      });
      setLoading(false);
    }, 1300);
  }

  const cooldownHours = faucet.cooldownMs / (60 * 60 * 1000);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.txGrid}>
        {/* ---- form card ---- */}
        <div className={styles.txCard}>
          <h2>Developer faucet</h2>
          <p className={styles.txSub}>
            A small amount of test LNGX for building and integration work. One
            claim per address every {cooldownHours} hours.
          </p>

          <Field
            label="Your Lineage address"
            htmlFor={fauAddressId}
            error={
              addressInvalid
                ? "That doesn’t look like a valid Lineage address. Check and paste it again."
                : undefined
            }
          >
            <Input
              id={fauAddressId}
              type="text"
              placeholder="Paste the address to fund"
              autoComplete="off"
              spellCheck={false}
              mono
              value={address}
              onChange={handleAddressChange}
              onBlur={handleAddressBlur}
              invalid={addressInvalid}
            />
          </Field>

          {/* Status bar */}
          {status && (
            <div className={styles.statusWrap}>
              <StatusBar tone={status.tone}>
                <span dangerouslySetInnerHTML={{ __html: status.message }} />
                {isCoolingDown && cooldownUntil > 0 && (
                  <>
                    {" "}
                    Try again in{" "}
                    <Cooldown
                      until={cooldownUntil}
                      onElapsed={handleCooldownElapsed}
                    />
                    .
                  </>
                )}
              </StatusBar>
            </div>
          )}

          {/* Submit */}
          <div className={styles.txActions}>
            <Button
              type="submit"
              variant="primary"
              disabled={claimDisabled}
            >
              {loading ? "Requesting…" : "Request test LNGX"}
            </Button>
          </div>

          <p className={styles.txLegal}>
            Faucet tokens have no monetary value and exist only for development
            on the test network. Please don&rsquo;t drain it &mdash; others are
            building too.
          </p>
        </div>

        {/* ---- aside ---- */}
        <aside className={styles.txAside}>
          <div className={styles.txFact}>
            <h3>Per claim</h3>
            <p className={styles.txFactBig}>{faucet.amountTokens} LNGX</p>
            <p>
              Enough to exercise transactions, items, and contract calls while
              you build.
            </p>
          </div>
          <div className={styles.txFact}>
            <h3>Need a node or the SDKs?</h3>
            <p>
              The quickstart shows install + your first call, and the fleet repo
              covers running a node.
            </p>
            <p style={{ marginTop: 10 }}>
              <LinkCta href="/docs#sdks">SDK quickstart</LinkCta>
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

/* ===================================================================
   ROOT CLIENT COMPONENT
   =================================================================== */

const TAB_OPTIONS = [
  { value: "buy", label: "Buy LNGX" },
  { value: "faucet", label: "Developer faucet" },
] as const;

export function GetTokensClient() {
  /**
   * Fix 1: initialise to the SSR-safe default ("buy") so server and first
   * client render match. The mount effect below switches to "faucet" if the
   * URL hash says so, post-hydration with no mismatch.
   */
  const [tab, setTab] = useState<Tab>("buy");

  // Fix 1: restore hash-driven tab selection after hydration.
  // The setState calls here are intentional and safe: they only fire once on
  // mount to sync client-only URL state (window.location.hash) that cannot be
  // read during SSR prerender, so no cascading-render issue arises.
  useEffect(() => {
    if (window.location.hash === "#faucet") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTab("faucet"); // syncing URL-only state post-hydration — not a loop
    }
  }, []); // mount only — syncing URL state post-hydration

  function handleTabChange(v: string) {
    const next = v as Tab;
    setTab(next);
    if (typeof window !== "undefined") {
      history.replaceState(
        null,
        "",
        next === "faucet"
          ? window.location.pathname + "#faucet"
          : window.location.pathname,
      );
    }
  }

  return (
    <div>
      {/* Segmented tab toggle */}
      <div className={styles.segmentedWrap}>
        <Segmented
          options={TAB_OPTIONS}
          value={tab}
          onChange={handleTabChange}
          idPrefix="tab"
          ariaLabel="Choose what you need"
        />
      </div>

      {/* Panels */}
      <div
        role="tabpanel"
        id="panel-buy"
        aria-labelledby="tab-buy"
        hidden={tab !== "buy"}
      >
        <BuyPanel />
      </div>
      <div
        role="tabpanel"
        id="panel-faucet"
        aria-labelledby="tab-faucet"
        hidden={tab !== "faucet"}
      >
        <FaucetPanel />
      </div>
    </div>
  );
}
