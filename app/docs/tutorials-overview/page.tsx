import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "Tutorials",
  description:
    "Tutorials and guides for building on Lineage — wallets, API usage, and more.",
  path: "/docs/tutorials-overview",
});

export default function TutorialsOverviewPage() {
  return (
    <DocsArticle title="Tutorials">
      <p>
        These sections are the starting point for hands-on work: client SDKs and
        patterns where we publish them, HTTP API walkthroughs, and mining setup.
        The exact toolchain evolves with the public network; where a feature is
        not yet available, the page will say so instead of pointing at legacy
        third-party downloads.
      </p>
      <p>
        If you are new to the HTTP API, use{" "}
        <Link href="/docs/api-tutorials">API usage</Link> and{" "}
        <Link href="/docs/api-tutorials/get-started">Get started</Link>, then
        the <Link href="/docs/api/overview">API overview</Link> and reference
        pages for each endpoint family.
      </p>
      <h2>Topics in this area</h2>
      <ul>
        <li>
          <Link href="/docs/2wayjs-tutorials">2Way.js</Link> — wallet-oriented
          flows (naming and availability subject to the current public stack).
        </li>
        <li>
          <Link href="/docs/valence-node">Valence node</Link> and{" "}
          <Link href="/docs/valence-core">Valence core</Link> — application and
          plugin-style integration where documented.
        </li>
        <li>
          <Link href="/docs/api-tutorials">API usage</Link> — calling the
          Lineage API from your environment.
        </li>
        <li>
          <Link href="/docs/mining-overview">Mining</Link> — node setup and
          operations for participants.
        </li>
      </ul>
    </DocsArticle>
  );
}
