import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import { BLOCK_BY_NUM_SUCCESS } from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "block_by_num (storage API)",
  description:
    "Fetch one or more blocks from a Lineage storage node by block height.",
  path: "/docs/api/storage/block-by-num",
});

export default function BlockByNumPage() {
  return (
    <DocsArticle title="block_by_num">
      <p>
        Fetches blocks for one or more block numbers in a single request. Use the
        same <code>x-cache-id</code> pattern as other JSON routes.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="block_by_num" subsystem="storage" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>JSON array of block numbers (non-negative integers).</p>
      <pre>{`[0, 1, 42]`}</pre>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("storage", "block_by_num")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d '[0,1,2]'`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> and <code>400</code> for success and bad input. On success,{" "}
        <code>content</code> contains block material; full block objects can be large
        (header, merkle data, transaction id list, etc.). Some nodes return a
        top-level list of block objects; others wrap them in an object (see
        example).
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload</h3>
      <pre>{BLOCK_BY_NUM_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
