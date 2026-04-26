import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Info (storage API)",
  description:
    "Storage node: chain read routes in the public API reference.",
  path: "/docs/api/storage/info",
});

export default function StorageInfoPage() {
  return (
    <DocsArticle title="Info (storage)">
      <p>
        In the public API tree, storage &quot;info&quot; is covered by the
        read-oriented routes below.
      </p>
      <h2>Documented calls</h2>
      <ul>
        <li>
          <Link href="/docs/api/storage/latest-block">latest_block</Link>,{" "}
          <Link href="/docs/api/storage/block-by-num">block_by_num</Link>, and{" "}
          <Link href="/docs/api/storage/blockchain-entry">blockchain_entry</Link> for
          chain reads.
        </li>
        <li>
          <Link href="/docs/api/storage/storage-api">Storage API</Link> and{" "}
          <Link href="/docs/api/overview">API overview</Link> to orient across the
          surface area.
        </li>
        <li>
          Operator notes and <code>README</code> content in the open-source
          repository for the version you run if you need node-specific introspection.
        </li>
      </ul>
    </DocsArticle>
  );
}
