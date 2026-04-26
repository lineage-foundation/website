import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { DOCS_MINER_API_ORIGIN } from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Miner API",
  description:
    "Miner node HTTP API: block production, consensus participation, and node metadata relevant to mining.",
  path: "/docs/api/miner/miner-api",
});

export default function MinerApiPage() {
  return (
    <DocsArticle title="Miner API">
      <p>
        Miner nodes build new blocks from work assigned through the mempool, compete
        for partition slots, and claim rewards when a block is accepted. The surface
        area exposed over HTTP to operators is small compared to mempool and
        storage; most mining logic runs inside the process rather than as ad hoc
        REST calls.
      </p>
      <h2>Public base URL</h2>
      <p>
        This site uses <code>{DOCS_MINER_API_ORIGIN}</code> as the reference origin
        in examples where operator HTTP is exposed. See{" "}
        <Link href="/docs/api/miner/info">Info (miner API)</Link> for the miner
        entry in this reference.
      </p>
      <h2>Related topics</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/miner-node">Miner node (concepts)</Link>
        </li>
        <li>
          <Link href="/docs/api/overview">API overview</Link>
        </li>
      </ul>
    </DocsArticle>
  );
}
