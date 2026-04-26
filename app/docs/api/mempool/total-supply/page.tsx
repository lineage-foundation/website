import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import { TOTAL_SUPPLY_SUCCESS } from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "total_supply (mempool API)",
  description: "Query total token supply on the Lineage mempool node.",
  path: "/docs/api/mempool/total-supply",
});

export default function TotalSupplyPage() {
  return (
    <DocsArticle title="total_supply">
      <p>
        Returns a total supply figure. As with <code>issued_supply</code>, the
        public reference only requires the <code>x-cache-id</code> header.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="total_supply" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>None (empty body).</p>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("mempool", "total_supply")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d ''`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success, with a numeric (or string-encoded numeric){" "}
        <code>content</code> in the common envelope. Exact semantics of “total” are
        defined by the node version.
      </p>
      <h3>Example success payload</h3>
      <pre>{TOTAL_SUPPLY_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
