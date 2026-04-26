import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import { LATEST_BLOCK_SUCCESS } from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "latest_block (storage API)",
  description:
    "Return the latest block stored on a Lineage storage node.",
  path: "/docs/api/storage/latest-block",
});

export default function LatestBlockPage() {
  return (
    <DocsArticle title="latest_block">
      <p>
        Returns the best block this storage node has successfully received and
        stored. There is no JSON body; supply <code>x-cache-id</code> only.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="latest_block" subsystem="storage" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>None (empty body).</p>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("storage", "latest_block")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d ''`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success. <code>content</code> holds the block object
        (header fields, transaction hashes, and related material as defined by the
        release). Field names and nesting are version-specific.
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload</h3>
      <pre>{LATEST_BLOCK_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
