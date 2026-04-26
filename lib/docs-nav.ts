/**
 * Single source of truth for docs IA (maps to `tasks/docs-route-manifest.v1.md`, v1 only).
 * Routes omitted from the manifest (debug-data, postman, tags) are not listed.
 */

export type DocsNavItem = {
  title: string;
  /** If set, this row is a link (including section index pages). */
  href?: string;
  children?: readonly DocsNavItem[];
};

export const DOCS_NAV: readonly DocsNavItem[] = [
  { title: "Welcome", href: "/docs" },
  {
    title: "Concepts",
    href: "/docs/concepts",
    children: [
      { title: "Node types", href: "/docs/concepts/node-types" },
      { title: "Mempool node", href: "/docs/concepts/mempool-node" },
      { title: "Storage node", href: "/docs/concepts/storage-node" },
      { title: "Miner node", href: "/docs/concepts/miner-node" },
      { title: "Block mining", href: "/docs/concepts/block-mining" },
      { title: "Transactions", href: "/docs/concepts/transactions" },
      { title: "Two-way transaction", href: "/docs/concepts/two-way-transaction" },
      { title: "Unicorns", href: "/docs/concepts/unicorns" },
    ],
  },
  { title: "Tutorials overview", href: "/docs/tutorials-overview" },
  {
    title: "2Way.js",
    href: "/docs/2wayjs-tutorials",
    children: [
      { title: "Get started", href: "/docs/2wayjs-tutorials/get-started" },
      { title: "Create an item", href: "/docs/2wayjs-tutorials/create-an-item" },
      { title: "Two-way payments", href: "/docs/2wayjs-tutorials/two-way-payments" },
      { title: "Send and receive", href: "/docs/2wayjs-tutorials/send-and-receive" },
    ],
  },
  {
    title: "Valence node",
    href: "/docs/valence-node",
    children: [
      { title: "Get started", href: "/docs/valence-node/get-started" },
      { title: "Available routes", href: "/docs/valence-node/available-routes" },
    ],
  },
  {
    title: "Valence core",
    href: "/docs/valence-core",
    children: [
      { title: "How to use", href: "/docs/valence-core/how-to-use" },
      { title: "Use plugins", href: "/docs/valence-core/use-plugins" },
    ],
  },
  {
    title: "API usage",
    href: "/docs/api-tutorials",
    children: [
      { title: "Get started", href: "/docs/api-tutorials/get-started" },
    ],
  },
  { title: "API overview", href: "/docs/api/overview" },
  {
    title: "Mempool API",
    href: "/docs/api/mempool/mempool-api",
    children: [
      { title: "address", href: "/docs/api/mempool/address" },
      { title: "create_item_asset", href: "/docs/api/mempool/create-item-asset" },
      { title: "create_tx", href: "/docs/api/mempool/create-tx" },
      { title: "fetch_balance", href: "/docs/api/mempool/fetch-balance" },
      { title: "info", href: "/docs/api/mempool/info" },
      { title: "issued_supply", href: "/docs/api/mempool/issued-supply" },
      { title: "total_supply", href: "/docs/api/mempool/total-supply" },
      { title: "transaction", href: "/docs/api/mempool/transaction" },
    ],
  },
  {
    title: "Miner API",
    href: "/docs/api/miner/miner-api",
    children: [{ title: "info", href: "/docs/api/miner/info" }],
  },
  {
    title: "Storage API",
    href: "/docs/api/storage/storage-api",
    children: [
      { title: "block", href: "/docs/api/storage/block" },
      { title: "block_by_num", href: "/docs/api/storage/block-by-num" },
      { title: "blockchain_entry", href: "/docs/api/storage/blockchain-entry" },
      { title: "info", href: "/docs/api/storage/info" },
      { title: "latest_block", href: "/docs/api/storage/latest-block" },
    ],
  },
  { title: "Build apps", href: "/docs/build-apps/design-considerations" },
  {
    title: "Mining",
    children: [
      { title: "Overview", href: "/docs/mining-overview" },
      { title: "Hardware requirements", href: "/docs/mining/hardware-requirements" },
      { title: "Installing a lite node", href: "/docs/mining/installing-a-lite-node" },
      { title: "Installing a mining node", href: "/docs/mining/installing-a-mining-node" },
      { title: "Managing a node", href: "/docs/mining/managing-a-node" },
    ],
  },
] as const;

/** Whether `pathname` should highlight the link for `href` (sub-routes count). */
export function isDocsPathActive(pathname: string, href: string) {
  if (href === "/docs") {
    return pathname === "/docs";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
