import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { URL_GITHUB_ORG } from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Info (miner API)",
  description:
    "Miner node HTTP API: see Miner API and project sources for the documented surface area.",
  path: "/docs/api/miner/info",
});

export default function MinerInfoPage() {
  return (
    <DocsArticle title="Info (miner)">
      <h2>Practical next steps</h2>
      <ul>
        <li>
          <Link href="/docs/api/miner/miner-api">Miner API</Link> for the mining HTTP
          section of this reference.
        </li>
        <li>
          <Link href="/docs/mining-overview">Mining overview</Link> and related
          installation pages for how you run a node in practice.
        </li>
        <li>
          <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
            Lineage Foundation on GitHub
          </a>{" "}
          for release-specific flags and node behaviour.
        </li>
      </ul>
    </DocsArticle>
  );
}
