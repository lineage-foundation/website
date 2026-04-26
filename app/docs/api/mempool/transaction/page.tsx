import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Transaction (mempool API)",
  description:
    "Create and submit Lineage transactions through the mempool HTTP API.",
  path: "/docs/api/mempool/transaction",
});

export default function MempoolTransactionPage() {
  return (
    <DocsArticle title="Transaction">
      <p>
        These routes deal with building and sending transactions. Full
        construction can be non-trivial (inputs, outputs, and signatures), so
        when an SDK is available for your environment it is the safer first
        choice. Raw API calls are documented for protocol integration and
        debugging.
      </p>
      <h2>Documented calls</h2>
      <ul>
        <li>
          <Link href="/docs/api/mempool/create-tx">create_transactions</Link> —
          submit a fully formed transaction to the mempool.
        </li>
        <li>
          <Link href="/docs/api/mempool/create-item-asset">create_item_asset</Link>{" "}
          — create a new item / asset.
        </li>
      </ul>
    </DocsArticle>
  );
}
