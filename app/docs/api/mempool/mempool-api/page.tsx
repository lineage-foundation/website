import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { DOCS_MEMPOOL_API_ORIGIN } from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

import hubTableStyles from "../../overview/page.module.css";

export const metadata = docsPageMetadata({
  title: "Mempool API",
  description:
    "Mempool node HTTP API: collect transactions, validate blocks, and participate in the mining partition.",
  path: "/docs/api/mempool/mempool-api",
});

export default function MempoolApiPage() {
  return (
    <DocsArticle title="Mempool API">
      <p>
        The mempool node collects transactions, bundles them for new blocks, and
        validates blocks produced by the mining network. A limited set of
        long-lived mempool nodes may exist on the network, depending on
        configuration and policy.
      </p>
      <h2>Public base URL</h2>
      <p>
        Documentation examples call the mempool at{" "}
        <code>{DOCS_MEMPOOL_API_ORIGIN}</code> —         append the operation path from
        the table (for example{" "}
        <code>{`POST ${DOCS_MEMPOOL_API_ORIGIN}/fetch_balance`}</code>). For
        another network, use that environment’s mempool base; keep the
        same route names and body shapes as in each reference page.
      </p>
      <h2>Documented routes</h2>
      <p>
        Each row links to request headers, body shape, and response envelope
        details.
      </p>
      <div className={hubTableStyles.urlTableWrap}>
        <table className={hubTableStyles.urlTable}>
          <thead>
            <tr>
              <th scope="col">Operation</th>
              <th scope="col">Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>address</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/address">Address (mempool API)</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>create_item_asset</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/create-item-asset">create_item_asset</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>create_transactions</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/create-tx">create_tx</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>fetch_balance</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>info</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/info">info (mempool API)</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>issued_supply</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/issued-supply">issued_supply</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>total_supply</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/total-supply">total_supply</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>transaction</code>
              </td>
              <td>
                <Link href="/docs/api/mempool/transaction">Transaction (mempool API)</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Related topics</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/mempool-node">Mempool node (concepts)</Link>
        </li>
        <li>
          <Link href="/docs/api/overview">API overview</Link>
        </li>
        <li>
          <Link href="/docs/api-tutorials/get-started">API quick start</Link>
        </li>
      </ul>
    </DocsArticle>
  );
}
