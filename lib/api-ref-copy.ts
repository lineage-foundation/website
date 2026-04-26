/**
 * Shared copy for API reference pages. Examples use public origins in lib/constants
 * (mempool, storage, miner on lineage.to). Full request/response JSON lives in
 * `lib/api-ref-schemas.ts` and on each route page.
 */
export const API_BASE_FOOTNOTE =
  "This site shows `https://mempool.lineage.to`, `https://storage.lineage.to`, and `https://miner.lineage.to` in examples. For a different network or self-hosted node, use that environment’s base URLs instead.";

export const X_CACHE_ID_HEADER = {
  name: "x-cache-id",
  type: "string (32 hex characters)",
  desc: "Idempotency key for cached responses. Must match `^[a-z0-9]{32}$`.",
} as const;

export const ENVELOPE_RESPONSE = [
  { field: "id", desc: "Matches the x-cache-id from the request header." },
  { field: "status", desc: 'One of "Success", "Error", or "Pending".' },
  { field: "reason", desc: "Human-readable status context (especially for errors)." },
  { field: "route", desc: "The route name that was handled." },
  { field: "content", desc: "Payload for this operation; shape varies by route (see each page)." },
] as const;
