import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Block (storage API)",
  description:
    "Read blocks and chain entries from a Lineage storage node: height, hash, and latest.",
  path: "/docs/api/storage/block",
});

export default function StorageBlockPage() {
  return (
    <DocsArticle title="Block (storage)">
      <p>
        This group covers reads of block data and chain entries from a storage
        node: the head of the chain, specific heights, and lookup by hash.
      </p>
      <h2>Documented calls</h2>
      <ul>
        <li>
          <Link href="/docs/api/storage/latest-block">latest_block</Link> — best
          known block stored on this node.
        </li>
        <li>
          <Link href="/docs/api/storage/block-by-num">block_by_num</Link> — one or
          more blocks by block number.
        </li>
        <li>
          <Link href="/docs/api/storage/blockchain-entry">blockchain_entry</Link> — a
          block or transaction by hash.
        </li>
      </ul>
    </DocsArticle>
  );
}
