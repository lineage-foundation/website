import { DocsArticle } from "@/components/docs/DocsArticle";
import {
  HeadersTable,
  MethodPath,
  ResponseEnvelopeList,
  StandardErrorEnvelopeExample,
} from "@/components/docs/ApiReferenceElements";
import {
  CREATE_TRANSACTIONS_REQUEST,
  CREATE_TRANSACTIONS_REQUEST_NO_DRUID,
  CREATE_TRANSACTIONS_SUCCESS,
} from "@/lib/api-ref-schemas";
import { docsApiUrl } from "@/lib/docs-api-origins";
import { docsPageMetadata } from "@/lib/docs-page-metadata";

export const metadata = docsPageMetadata({
  title: "create_transactions (mempool API)",
  description:
    "Submit a new transaction to the Lineage mempool for inclusion in a block.",
  path: "/docs/api/mempool/create-tx",
});

export default function CreateTxPage() {
  return (
    <DocsArticle title="create_transactions">
      <p>
        Submits one or more fully built transactions. The request body is a
        UTXO-style object: <code>inputs</code> (with <code>previous_out</code> and
        a <code>script_signature</code> such as <code>Pay2PkH</code>),{" "}
        <code>outputs</code> (value, locktime, <code>script_public_key</code>),{" "}
        <code>version</code>, and optionally <code>druid_info</code>. This call
        assumes a full transaction in the request body, which can make raw HTTP
        calls difficult; for convenience, it may be easier to use a library or SDK
        that abstracts this route.
      </p>
      <h2>Endpoint</h2>
      <MethodPath method="POST" operation="create_transactions" />
      <h2>Headers</h2>
      <HeadersTable />
      <h2>Request body (full JSON shape)</h2>
      <p>
        <code>application/json</code> body. Each input uses{" "}
        <code>previous_out</code> (transaction hash <code>t_hash</code> and output
        index <code>n</code>). For <code>script_signature</code> /{" "}
        <code>Pay2PkH</code>, <code>signable_data</code> is the data to sign for
        verification: a SHA3 hash of all the transaction outputs and this
        input&apos;s previous output (for example{" "}
        <code>{'"{output1}{output2}{previousOut}"'}</code> as concatenation, per the
        public reference spec).
      </p>
      <h3>Complete example (with optional druid_info)</h3>
      <pre>{CREATE_TRANSACTIONS_REQUEST}</pre>
      <h3>Typical example (omit druid_info)</h3>
      <p>
        Many single-party sends omit <code>druid_info</code>. Your deployment may
        accept a body like:
      </p>
      <pre>{CREATE_TRANSACTIONS_REQUEST_NO_DRUID}</pre>
      <h2>Example</h2>
      <pre>{`curl -sS -X POST "${docsApiUrl("mempool", "create_transactions")}" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d @transaction.json`}</pre>
      <h2>Responses</h2>
      <p>
        <code>200</code> and <code>400</code> for success and client errors, using
        the same envelope as other routes.
      </p>
      <h3>Envelope fields (typical)</h3>
      <ResponseEnvelopeList />
      <h3>Example success payload</h3>
      <pre>{CREATE_TRANSACTIONS_SUCCESS}</pre>
      <StandardErrorEnvelopeExample />
    </DocsArticle>
  );
}
