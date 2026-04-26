import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { docsPageMetadata } from "@/lib/docs-page-metadata";
import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
  URL_GITHUB_ORG,
} from "@/lib/constants";

export const metadata = docsPageMetadata({
  title: "Get started with the API",
  description:
    "Suggested workflow to integrate with the Lineage HTTP API and verify connectivity.",
  path: "/docs/api-tutorials/get-started",
});

export default function ApiTutorialsGetStartedPage() {
  return (
    <DocsArticle title="Get started with the Lineage API">
      <p>
        Suggested order of work: pick an HTTP client, use the public base URLs in
        the API reference, then call the documented routes for your node class
        (mempool, storage, or miner).
      </p>
      <h2>Client tooling</h2>
      <p>
        Use any REST client, <code>curl</code>, or your application’s HTTP stack.
        Per-route request and response JSON is on each reference page. Code that
        ships with the project lives on{" "}
        <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
        .
      </p>
      <h2>Public base URLs (reference deployment)</h2>
      <p>
        Examples in the API reference use these HTTPS origins, one per node
        class. Paths in each section are always relative to the matching
        class—mempool calls use the mempool host, storage reads use the storage
        host, and so on. For a private, staging, or alternate network, swap in
        that deployment’s bases; the route names and JSON contracts stay the
        same as in the per-page documentation.
      </p>
      <ul>
        <li>
          <strong>Mempool</strong> — <code>{DOCS_MEMPOOL_API_ORIGIN}</code>{" "}
          (transactions, balances, supply, mempool metadata)
        </li>
        <li>
          <strong>Storage</strong> — <code>{DOCS_STORAGE_API_ORIGIN}</code>{" "}
          (blocks, chain entries, read-oriented history)
        </li>
        <li>
          <strong>Miner</strong> — <code>{DOCS_MINER_API_ORIGIN}</code>{" "}
          (operator-facing HTTP where a release exposes it; a small surface
          compared to mempool and storage)
        </li>
      </ul>
      <p>
        See the <Link href="/docs/api/overview">API overview</Link> for a
        short routing map and deep links into each section.
      </p>
      <h2>Verify you are talking to a node</h2>
      <p>
        Use small, read-only calls from the <strong>storage</strong> or{" "}
        <strong>mempool</strong> sections of the reference (for example, node
        metadata or health-style routes) to confirm connectivity before you
        send transactions. Follow the per-route contracts in the reference;
        the exact JSON shapes may evolve between releases, so always check the
        response body your deployment returns.
      </p>
      <p>
        A minimal connectivity check is the{" "}
        <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link> or a
        read-only storage route. Each API reference page documents full request and
        response JSON, including the standard error envelope. The snippet below is
        only a loose sketch of how a high-level <code>info</code> payload might
        list route names; your node may differ.
      </p>
      <pre>
        {`{
  "node_type": "Storage",
  "node_api": [
    "block_by_num",
    "latest_block",
    "blockchain_entry"
  ]
}`}
      </pre>
      <h2>Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/api/overview">API overview</Link> — choose mempool,
          storage, or miner.
        </li>
        <li>
          <Link href="/docs/concepts">Concepts</Link> — understand how the
          pieces fit together.
        </li>
        <li>
          Mempool, storage, and miner references — from{" "}
          <Link href="/docs/api/overview">API overview</Link> and each endpoint page
          in the left navigation.
        </li>
      </ul>
    </DocsArticle>
  );
}
