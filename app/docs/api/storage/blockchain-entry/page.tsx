import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import {
  BLOCKCHAIN_ENTRY_BLOCK,
  BLOCKCHAIN_ENTRY_TX,
} from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "blockchain_entry (storage API)",
  description:
    "Fetch a block or transaction from a Lineage storage node by hash.",
  path: "/docs/api/storage/blockchain-entry",
});

export default function BlockchainEntryPage() {
  return (
    <DocsArticle title="blockchain_entry">
      <p>
        Fetches a block or transaction given its hash string. The server determines
        whether the hash refers to a block header or a transaction as stored in its
        index.
      </p>
      <h2>Endpoint</h2>
      <MethodPath
        method="POST"
        operation="blockchain_entry"
        subsystem="storage"
      />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>A single hash string (JSON string value, not an object wrapper).</p>
      <pre>{`"<hex-or-encoded-hash>"`}</pre>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("storage", "blockchain_entry")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d '"<hash>"'`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success, <code>400</code> if the hash is unknown or
        malformed. <code>content</code> shape depends on whether a block or
        transaction was returned. Your build may not include a <code>type</code>{" "}
        discriminator; treat the examples as orientation and confirm against the
        node.
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload (block)</h3>
      <pre>{BLOCKCHAIN_ENTRY_BLOCK}</pre>
      <h3>Example success payload (transaction)</h3>
      <pre>{BLOCKCHAIN_ENTRY_TX}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
