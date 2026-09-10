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
