import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Info (mempool API)",
  description:
    "Mempool node supply and information: total supply and issued supply in the public API reference.",
  path: "/docs/api/mempool/info",
});

export default function MempoolInfoPage() {
  return (
    <DocsArticle title="Info (mempool)">
      <p>
        This section groups <code>total_supply</code> and <code>issued_supply</code>.
        Use it when you need aggregate values rather than per-address state.
      </p>
      <h2>Documented calls</h2>
      <ul>
        <li>
          <Link href="/docs/api/mempool/total-supply">total_supply</Link> — total
          supply.
        </li>
        <li>
          <Link href="/docs/api/mempool/issued-supply">issued_supply</Link> — issued
          supply.
        </li>
      </ul>
    </DocsArticle>
  );
}
