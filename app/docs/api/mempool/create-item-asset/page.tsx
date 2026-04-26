import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import {
  CREATE_ITEM_ASSET_REQUEST,
  CREATE_ITEM_ASSET_SUCCESS,
} from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "create_item_asset (mempool API)",
  description: "Create a new item (asset) on the Lineage network via the mempool API.",
  path: "/docs/api/mempool/create-item-asset",
});

export default function CreateItemAssetPage() {
  return (
    <DocsArticle title="create_item_asset">
      <p>
        Creates a new item-type asset, including amount, public key, signature, and
        related metadata fields where required by the release you target.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="create_item_asset" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body (fields)</h2>
      <ul>
        <li>
          <code>item_amount</code> — number of <code>Item</code> assets to create.
        </li>
        <li>
          <code>script_public_key</code> — receiving or controlling address
          (encoding depends on the network).
        </li>
        <li>
          <code>public_key</code> and <code>signature</code> — key material used
          for the creation.
        </li>
        <li>
          <code>drs_tx_hash_spec</code> — whether you follow the default DRS
          identifier scheme for item assets; naming may vary by product release
          (string or structured value per the node you use).
        </li>
      </ul>
      <h3>Complete JSON example</h3>
      <pre>{CREATE_ITEM_ASSET_REQUEST}</pre>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("mempool", "create_item_asset")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d @item-asset.json`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success, <code>400</code> on validation or signing
        issues. <code>content</code> includes created asset data (e.g. amount,{" "}
        <code>tx_hash</code>, metadata) in successful responses.
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload</h3>
      <pre>{CREATE_ITEM_ASSET_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
