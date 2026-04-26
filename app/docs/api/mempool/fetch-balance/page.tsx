import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import { FETCH_BALANCE_SUCCESS } from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "fetch_balance (mempool API)",
  description:
    "Fetch token balances for one or more addresses on the Lineage mempool node.",
  path: "/docs/api/mempool/fetch-balance",
});

export default function FetchBalancePage() {
  return (
    <DocsArticle title="fetch_balance">
      <p>
        Returns balance information for one or more addresses. Request with{" "}
        <code>application/json</code> and a body that lists the addresses to query.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="fetch_balance" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body</h2>
      <p>
        JSON array of address strings. At least one address is required in typical
        usage.
      </p>
      <pre>{`["<address-1>", "<address-2>"]`}</pre>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("mempool", "fetch_balance")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d '["<address-1>"]'`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> on success, <code>400</code> if the call could not be
        processed. The payload uses the standard envelope, with a structured{" "}
        <code>content</code> that includes per-token and per-address data; the
        exact nesting and asset names may differ by release.
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload</h3>
      <pre>{FETCH_BALANCE_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
