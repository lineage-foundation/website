/**
 * PLACEHOLDER business values — pending compliance sign-off.
 * No real payments or token dispensing happen client-side; see
 * design-prototype/get-tokens-backend.md for the eventual server contract.
 *
 * Prototype source (get-tokens.html CONFIG block) sets:
 *   MIN_PURCHASE: 5   MAX_PURCHASE: 250   LNGX_PER_UNIT: 20
 *   FAUCET_AMOUNT: 10  COOLDOWN_HOURS: 24  TIERS: [5, 10, 25, 50]
 * ratePerToken = 1 / LNGX_PER_UNIT = $0.05 per LNGX token.
 *
 * *** KYC-threshold cap (MAX_PURCHASE) is set by compliance — do not change
 *     without sign-off. See design-prototype/get-tokens-backend.md §Security.
 */
export const GET_TOKENS_CONFIG = {
  currency: "USD",
  currencySymbol: "$",
  /** Indicative rate: LNGX per 1 currency unit (placeholder, server is authoritative). */
  lngxPerUnit: 20,
  /** Derived: cost per single LNGX token = 1 / lngxPerUnit */
  ratePerToken: 0.05,
  /** Minimum card purchase in currency units (prototype: 5). */
  minPurchase: 5,
  /** *** Per-purchase cap in currency units — set by compliance (prototype: 250). */
  maxPurchase: 250,
  /** Preset buy-tier buttons in currency units (prototype: [5, 10, 25, 50]). */
  tiers: [5, 10, 25, 50] as const,
  faucet: {
    /** Test LNGX dispensed per faucet claim (prototype: 10). */
    amountTokens: 10,
    /** Cooldown duration in milliseconds (prototype: 24 h). */
    cooldownMs: 24 * 60 * 60 * 1000,
  },
} as const;

/** localStorage key for the faucet last-claim timestamp (milliseconds). */
export const FAUCET_STORAGE_KEY = "lngx-faucet-last-claim";
