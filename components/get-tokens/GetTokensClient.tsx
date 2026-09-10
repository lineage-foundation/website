"use client";

/**
 * GetTokensClient — Developer Faucet UI.
 *
 * FRONT-END ONLY — no real token dispensing happens here.
 * The submit handler is a stub that drives visual state only.
 * See design-prototype/get-tokens-backend.md for the server contract.
 */

import { useCallback, useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Cooldown } from "@/components/ui/Cooldown";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { LinkCta } from "@/components/ui/LinkCta";
import { StatusBar, type StatusTone } from "@/components/ui/StatusBar";

import { FAUCET_STORAGE_KEY, GET_TOKENS_CONFIG } from "./config";
import styles from "./GetTokensClient.module.css";

/* ---- helpers ---- */

/** Lightweight Lineage address sanity check — server re-validates authoritatively. */
function looksLikeAddress(v: string): boolean {
  return /^[0-9a-zA-Z]{24,}$/.test(v.trim());
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

/**
 * Both purchase and faucet flows are front-end previews; the backend is not
 * live yet. Flip to false to enable the (stubbed) interactive forms.
 */
const COMING_SOON = true;

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
      if (COMING_SOON) return;
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
                message: "This address claimed recently.",
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

          {COMING_SOON && (
            <div className={styles.statusWrap}>
              <StatusBar tone="info">
                The developer faucet is coming soon. This is a preview of the
                flow.
              </StatusBar>
            </div>
          )}

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
              disabled={COMING_SOON}
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
              <StatusBar tone={status.tone} busy={loading && status.tone === "info"}>
                <span dangerouslySetInnerHTML={{ __html: status.message }} />
                {isCoolingDown && cooldownUntil > 0 && (
                  <>
                    {" "}Try again in{" "}
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
              disabled={COMING_SOON || claimDisabled}
            >
              {COMING_SOON
                ? "Coming soon"
                : loading
                  ? "Requesting…"
                  : "Request test LNGX"}
            </Button>
          </div>

          <p className={styles.txLegal}>
            Faucet tokens have no monetary value and exist only for development
            on the test network. Please don&rsquo;t drain it; others are
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

export function GetTokensClient() {
  return (
    <section className={styles.clientSection}>
      <Container>
        <FaucetPanel />
      </Container>
    </section>
  );
}
