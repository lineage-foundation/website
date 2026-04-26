import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { Card } from "@/components/ui";
import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
} from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

import styles from "./page.module.css";

export const metadata = docsPageMetadata({
  title: "API overview",
  description:
    "Lineage HTTP API — interact with mempool, storage, and miner endpoints without smart contracts.",
  path: "/docs/api/overview",
});

export default function ApiOverviewPage() {
  return (
    <DocsArticle title="Lineage HTTP API">
      <p>
        The Lineage HTTP API lets you integrate with the network directly: read
        chain state, submit transactions, and query node metadata. You do not
        need on-chain smart contracts for the flows described in this
        documentation; use plain HTTP clients (curl, fetch, your language of
        choice) against the endpoints listed under each subsystem.
      </p>
      <p>
        Before you call the network, confirm which environment you are targeting
        (for example, the public reference deployment vs a private node). The
        table below is the public multi-host map used in examples throughout
        this site; it replaces older single-host documentation patterns.
      </p>
      <h2>Public service URLs</h2>
      <p>
        Lineage groups HTTP routes by node class. Each class has its own
        origin; do not send storage reads to the mempool host or vice versa.
        Operations are usually <code>POST</code> to a path named after the route
        (for example <code>/fetch_balance</code> on the mempool host), using the
        JSON envelope described on each reference page unless stated otherwise.
      </p>
      <div className={styles.urlTableWrap}>
        <table className={styles.urlTable}>
          <thead>
            <tr>
              <th scope="col">Node class</th>
              <th scope="col">Base URL</th>
              <th scope="col">Documentation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mempool</td>
              <td>
                <code>{DOCS_MEMPOOL_API_ORIGIN}</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/mempool-api">Mempool API</Link>
              </td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>
                <code>{DOCS_STORAGE_API_ORIGIN}</code>
              </td>
              <td>
                <Link href="/docs/api/storage/storage-api">Storage API</Link>
              </td>
            </tr>
            <tr>
              <td>Miner</td>
              <td>
                <code>{DOCS_MINER_API_ORIGIN}</code>
              </td>
              <td>
                <Link href="/docs/api/miner/miner-api">Miner API</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Start with the{" "}
        <Link href="/docs/api-tutorials/get-started">API quick start</Link>, then
        browse the reference sections:
      </p>
      <ul>
        <li>
          <Link href="/docs/concepts">Concepts</Link> — how mempool, storage,
          and miner nodes fit together.
        </li>
        <li>
          <Link href="/docs/api-tutorials">API tutorials</Link> — guided
          material around common tasks.
        </li>
      </ul>
      <h2>API surface</h2>
      <div className={styles.grid} role="list">
        <div role="listitem">
          <Card
            title="Mempool"
            eyebrow="Transactions"
            href="/docs/api/mempool/mempool-api"
          >
            Create and track transactions, balances, and supply-related calls.
          </Card>
        </div>
        <div role="listitem">
          <Card
            title="Storage"
            eyebrow="Chain data"
            href="/docs/api/storage/storage-api"
          >
            Blocks, chain entries, and history served by storage nodes.
          </Card>
        </div>
        <div role="listitem">
          <Card title="Miner" eyebrow="Mining" href="/docs/api/miner/miner-api">
            Miner node information and related endpoints.
          </Card>
        </div>
      </div>
    </DocsArticle>
  );
}
