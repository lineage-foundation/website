import Link from "next/link";

import { DocsArticle } from "@/components/docs/DocsArticle";
import { DOCS_STORAGE_API_ORIGIN } from "@/lib/constants";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

import hubTableStyles from "../../overview/page.module.css";

export const metadata = docsPageMetadata({
  title: "Storage API",
  description:
    "Storage node HTTP API: full chain history, blocks, and chain entries.",
  path: "/docs/api/storage/storage-api",
});

export default function StorageApiPage() {
  return (
    <DocsArticle title="Storage API">
      <p>
        Storage nodes retain the full blockchain history. After blocks are mined and
        validated through the mempool path, they are persisted for long-term read
        access. Any client may request history that a given storage node chooses to
        serve, subject to deployment policy and capacity.
      </p>
      <h2>Public base URL</h2>
      <p>
        Read-oriented calls in this site use <code>{DOCS_STORAGE_API_ORIGIN}</code>.
        For example,{" "}
        <code>{`POST ${DOCS_STORAGE_API_ORIGIN}/latest_block`}</code> follows the
        contract on the{" "}
        <Link href="/docs/api/storage/latest-block">latest_block</Link> page.
        Self-hosted or alternate networks use a different host with the same route
        names when the software version matches.
      </p>
      <h2>Documented routes</h2>
      <p>
        These pages describe headers, request bodies, and the standard response
        envelope.
      </p>
      <div className={hubTableStyles.urlTableWrap}>
        <table className={hubTableStyles.urlTable}>
          <thead>
            <tr>
              <th scope="col">Topic / operation</th>
              <th scope="col">Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>block</code> (shape)
              </td>
              <td>
                <Link href="/docs/api/storage/block">Block (storage API)</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>block_by_num</code>
              </td>
              <td>
                <Link href="/docs/api/storage/block-by-num">block_by_num</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>blockchain_entry</code>
              </td>
              <td>
                <Link href="/docs/api/storage/blockchain-entry">blockchain_entry</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>info</code>
              </td>
              <td>
                <Link href="/docs/api/storage/info">info (storage API)</Link>
              </td>
            </tr>
            <tr>
              <td>
                <code>latest_block</code>
              </td>
              <td>
                <Link href="/docs/api/storage/latest-block">latest_block</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The left navigation matches this list. Operations use the same response
        envelope pattern as mempool routes where applicable.
      </p>
      <h2>Related topics</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/storage-node">Storage node (concepts)</Link>
        </li>
        <li>
          <Link href="/docs/api/overview">API overview</Link>
        </li>
      </ul>
    </DocsArticle>
  );
}
