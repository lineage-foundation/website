import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Address (mempool API)",
  description:
    "Address-related calls on the mempool: balances and on-chain value queries.",
  path: "/docs/api/mempool/address",
});

export default function MempoolAddressPage() {
  return (
    <DocsArticle title="Address">
      <p>
        This group covers how clients query balances and work with public
        address strings from the perspective of a mempool node. In practice, key
        management and address creation are handled in your wallet or client
        library; the HTTP surface is primarily for reading and submitting against
        those addresses.
      </p>
      <h2>Documented call</h2>
      <ul>
        <li>
          <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link> — fetch
          balances for one or more addresses.
        </li>
      </ul>
    </DocsArticle>
  );
}
