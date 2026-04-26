import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
} from "./constants";

export type DocsApiSubsystem = "mempool" | "storage" | "miner";

const ORIGINS: Record<DocsApiSubsystem, string> = {
  mempool: DOCS_MEMPOOL_API_ORIGIN,
  storage: DOCS_STORAGE_API_ORIGIN,
  miner: DOCS_MINER_API_ORIGIN,
};

/** Public origin for a Lineage node class (e.g. `mempool` → `https://mempool.lineage.to`). */
export function docsApiOrigin(subsystem: DocsApiSubsystem): string {
  return ORIGINS[subsystem];
}

/**
 * Full URL for a POST route on a public Lineage API host, e.g.
 * `docsApiUrl("mempool", "fetch_balance")` → `https://mempool.lineage.to/fetch_balance`.
 */
export function docsApiUrl(
  subsystem: DocsApiSubsystem,
  operation: string,
): string {
  const path = operation.replace(/^\//, "");
  return `${ORIGINS[subsystem]}/${path}`;
}
