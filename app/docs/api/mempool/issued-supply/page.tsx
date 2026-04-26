import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import { ISSUED_SUPPLY_SUCCESS } from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "issued_supply (mempool API)",
  description: "Query issued token supply on the Lineage mempool node.",
  path: "/docs/api/mempool/issued-supply",
});

export default function IssuedSupplyPage() {
  return (
    <DocsArticle title="issued_supply">
      <p>
        Returns the issued supply figure for the token economics your node
        reports. The call uses the <code>x-cache-id</code> pattern only; there is
        no JSON body in the public reference.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="issued_supply" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>None (empty body).</p>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("mempool", "issued_supply")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d ''`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success. The <code>content</code> field is typically a
        numeric value representing issued supply, subject to the unit your node
        returns.
      </p>
      <h3>Example success payload</h3>
      <pre>{ISSUED_SUPPLY_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
