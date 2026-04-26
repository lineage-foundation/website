/**
 * /docs/[[...slug]] serves the docs index (`/docs` = empty slug) and stub pages. Paths
 * listed in {@link DEDICATED_DOC_PATHS} have their own `page.tsx` and must not be
 * generated in the catch-all.
 */
export const DEDICATED_DOC_PATHS = new Set<string>([
  "/docs/tutorials-overview",
  "/docs/api-tutorials",
  "/docs/api-tutorials/get-started",
  "/docs/api/overview",
  "/docs/api/mempool/mempool-api",
  "/docs/api/mempool/address",
  "/docs/api/mempool/create-item-asset",
  "/docs/api/mempool/create-tx",
  "/docs/api/mempool/fetch-balance",
  "/docs/api/mempool/info",
  "/docs/api/mempool/issued-supply",
  "/docs/api/mempool/total-supply",
  "/docs/api/mempool/transaction",
  "/docs/api/storage/storage-api",
  "/docs/api/storage/block",
  "/docs/api/storage/block-by-num",
  "/docs/api/storage/latest-block",
  "/docs/api/storage/blockchain-entry",
  "/docs/api/storage/info",
  "/docs/api/miner/miner-api",
  "/docs/api/miner/info",
]);

export function pathToSegments(path: string) {
  const clean = path.replace(/\/$/, "");
  if (clean === "/docs") {
    return [];
  }
  if (!clean.startsWith("/docs/")) {
    return null;
  }
  return clean.slice("/docs/".length).split("/");
}

export function segmentsToPath(segments: string[]) {
  if (segments.length === 0) {
    return "/docs";
  }
  return `/docs/${segments.join("/")}`;
}

export function titleFromSegments(segments: string[]) {
  const last = segments[segments.length - 1] ?? "docs";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
