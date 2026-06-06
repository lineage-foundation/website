import { ENVELOPE_ERROR_EXAMPLE } from "@/lib/api-ref-schemas";
import { docsApiUrl, type DocsApiSubsystem } from "@/lib/docs-api-origins";
import { CodeBlock, Pill } from "@/components/ui";

import styles from "./ApiReferenceElements.module.css";

/**
 * Shorthand for a documented HTTP call: renders a mono h2 with the method pill
 * inline (prototype `.endpoint h2`), followed by the full URL as a subtle
 * `.api-host` line below (prototype `.api-host`).
 *
 * The `displayName` prop overrides the operation text shown in the heading;
 * defaults to `operation` when omitted (backward-compatible).
 *
 * NOTE: API pages that previously rendered a separate `<h2>Endpoint</h2>`
 * immediately above `<MethodPath>` should DROP that heading — `MethodPath`
 * now IS the endpoint heading.
 */
export function MethodPath({
  method,
  operation,
  subsystem = "mempool",
  displayName,
}: {
  method: "POST" | "GET";
  /** Logical route / operation name (snake_case), echoed in the response `route` field. */
  operation: string;
  subsystem?: DocsApiSubsystem;
  /** Optional display label for the h2 heading; defaults to `operation`. */
  displayName?: string;
}) {
  const url = docsApiUrl(subsystem, operation);
  return (
    <>
      <h2 className={styles.endpointHeading}>
        <Pill tone={method.toLowerCase() as "get" | "post"}>{method}</Pill>
        {displayName ?? operation}
      </h2>
      <p className={styles.apiHost}>
        <code>{url}</code>
      </p>
    </>
  );
}

export function HeadersTable() {
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>x-cache-id</code>
            </td>
            <td>string</td>
            <td>
              Idempotency / cache key. Must match the documented pattern (32
              lowercase hex characters, e.g. <code>{"^[a-z0-9]{32}$"}</code>). The
              response <code>id</code> matches this value.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function ResponseEnvelopeList() {
  return (
    <ul>
      <li>
        <code>id</code> — idempotency id (matches <code>x-cache-id</code>).
      </li>
      <li>
        <code>status</code> — one of <code>Success</code>, <code>Error</code>, or{" "}
        <code>Pending</code>.
      </li>
      <li>
        <code>reason</code> — human-readable detail; especially useful for errors.
      </li>
      <li>
        <code>route</code> — logical route name for the call.
      </li>
      <li>
        <code>content</code> — payload; shape depends on the operation.
      </li>
    </ul>
  );
}

/** Typical 400 / validation error body (mempool and storage). */
export function StandardErrorEnvelopeExample() {
  return (
    <>
      <h3>Example error envelope (typical 400)</h3>
      <CodeBlock lang="json">{ENVELOPE_ERROR_EXAMPLE}</CodeBlock>
    </>
  );
}
