import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
} from "@/lib/constants";

import styles from "./NetworkStatus.module.css";

// Base units per displayed LNGX (matches the network's supply scaling: the reported
// max supply of 360360000000000000 base units renders as 5,000,000,000 LNGX).
const BASE_UNITS_PER_LNGX = 72_072_000;

type Stats = {
  height: number | null;
  total: number | null;
  issued: number | null;
};

async function getNetworkStats(): Promise<Stats | null> {
  try {
    const [blockRes, supplyRes] = await Promise.all([
      fetch(`${DOCS_STORAGE_API_ORIGIN}/v1/blocks/latest`, {
        next: { revalidate: 30 },
      }),
      fetch(`${DOCS_MEMPOOL_API_ORIGIN}/v1/supply`, { next: { revalidate: 30 } }),
    ]);
    if (!blockRes.ok || !supplyRes.ok) return null;

    const block = await blockRes.json();
    const supply = await supplyRes.json();

    return {
      height: block?.block?.block?.header?.b_num ?? null,
      total: typeof supply?.total === "number" ? supply.total : null,
      issued: typeof supply?.issued === "number" ? supply.issued : null,
    };
  } catch {
    return null;
  }
}

const lngx = (raw: number) =>
  Math.round(raw / BASE_UNITS_PER_LNGX).toLocaleString("en-US");

/**
 * Live network status strip. Reads the chain head and supply from the public read-only APIs
 * server-side (revalidated periodically, so no browser CORS dependency). Renders placeholders
 * if the network is unreachable, so the page never fails to build.
 */
export async function NetworkStatus() {
  const stats = await getNetworkStats();

  const height = stats?.height != null ? stats.height.toLocaleString("en-US") : "—";
  const circulating = stats?.issued != null ? `${lngx(stats.issued)} LNGX` : "—";
  const total = stats?.total != null ? `${lngx(stats.total)} LNGX` : "—";
  const issuedPct =
    stats?.issued != null && stats?.total
      ? `${((stats.issued / stats.total) * 100).toFixed(1)}%`
      : "—";

  return (
    <dl className={styles.strip} aria-label="Live network status">
      <div className={styles.stat}>
        <dt className={styles.label}>Latest block</dt>
        <dd className={styles.value}>{height}</dd>
      </div>
      <div className={styles.stat}>
        <dt className={styles.label}>Circulating</dt>
        <dd className={styles.value}>{circulating}</dd>
      </div>
      <div className={styles.stat}>
        <dt className={styles.label}>Total supply</dt>
        <dd className={styles.value}>{total}</dd>
      </div>
      <div className={styles.stat}>
        <dt className={styles.label}>Issued</dt>
        <dd className={styles.value}>{issuedPct}</dd>
      </div>
    </dl>
  );
}
