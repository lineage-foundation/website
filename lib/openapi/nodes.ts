/**
 * Which node type exposes which `/v1` route, mirrored from fleet's `build_router`
 * (crates/fleet-api/src/v1/mod.rs). Each running node only mounts a subset of the full
 * spec, so the reference is grouped by node and every endpoint shows which nodes serve it.
 *
 * `miner` here is the deployed miner, which runs a coupled user node — so it also carries
 * the user-capability routes (items, payments). Keep this in sync with `build_router` if
 * routes move between node types.
 */

import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
} from "@/lib/constants";

export type NodeType = "common" | "mempool" | "storage" | "miner" | "user";

export interface NodeMeta {
  label: string;
  /** Public base URL, or null for node types without a public host. */
  host: string | null;
  blurb: string;
}

export const NODE_META: Record<NodeType, NodeMeta> = {
  common: {
    label: "Common",
    host: null,
    blurb: "Mounted on every node, whatever its role.",
  },
  mempool: {
    label: "Mempool",
    host: DOCS_MEMPOOL_API_ORIGIN,
    blurb: "Transactions, balances, supply, and mempool metadata.",
  },
  storage: {
    label: "Storage",
    host: DOCS_STORAGE_API_ORIGIN,
    blurb: "Blocks and blockchain entries — long-term read history.",
  },
  miner: {
    label: "Miner",
    host: DOCS_MINER_API_ORIGIN,
    blurb: "Wallet, payments, and the current mining block (coupled user node).",
  },
  user: {
    label: "User",
    host: null,
    blurb:
      "Wallet plus stateless transaction tooling — run your own user node to expose these.",
  },
};

/** Display order of the node groups. */
export const NODE_ORDER: NodeType[] = [
  "common",
  "mempool",
  "storage",
  "miner",
  "user",
];

/**
 * Exact routes each node type mounts, from `build_router`. Used to badge every endpoint
 * with the nodes that actually serve it (an endpoint can live on more than one).
 */
const NODE_ROUTES: Record<Exclude<NodeType, "common">, string[]> = {
  storage: [
    "/v1/blocks/latest",
    "/v1/blocks/{num}",
    "/v1/blocks",
    "/v1/blockchain-entries/{key}",
    "/v1/blockchain-entries/query",
  ],
  mempool: [
    "/v1/supply",
    "/v1/balances",
    "/v1/balances/query",
    "/v1/transactions/status",
    "/v1/transactions/status:query",
    "/v1/transactions",
    "/v1/items",
  ],
  miner: [
    "/v1/wallet",
    "/v1/wallet/keypairs",
    "/v1/wallet/addresses",
    "/v1/wallet/passphrase",
    "/v1/wallet/running-total:refresh",
    "/v1/transactions/outgoing",
    "/v1/mining/current-block",
    "/v1/items",
    "/v1/payments",
  ],
  user: [
    "/v1/wallet",
    "/v1/wallet/keypairs",
    "/v1/wallet/addresses",
    "/v1/wallet/passphrase",
    "/v1/wallet/running-total:refresh",
    "/v1/transactions/outgoing",
    "/v1/transactions:serialize",
    "/v1/transactions:deserialize",
    "/v1/donation-requests",
    "/v1/items",
    "/v1/payments",
  ],
};

/** `/v1/debug` is mounted on every node. */
const COMMON_ROUTES = ["/v1/debug"];

/** All node types (excluding `common`) that serve a path, in display order. */
export function nodesForPath(path: string): NodeType[] {
  if (COMMON_ROUTES.includes(path)) return ["common"];
  return (["mempool", "storage", "miner", "user"] as const).filter((node) =>
    NODE_ROUTES[node].includes(path),
  );
}

/**
 * The node group a path is filed under in the reference. Multi-node routes (items,
 * payments, wallet) are filed under their most representative node; their badges still
 * show every node that serves them.
 */
export function primaryNode(path: string): NodeType {
  if (COMMON_ROUTES.includes(path)) return "common";
  if (NODE_ROUTES.storage.includes(path)) return "storage";
  if (NODE_ROUTES.mempool.includes(path)) return "mempool";
  if (path.startsWith("/v1/wallet") || path === "/v1/transactions/outgoing"
    || path === "/v1/mining/current-block" || path === "/v1/payments") {
    return "miner";
  }
  return "user";
}
