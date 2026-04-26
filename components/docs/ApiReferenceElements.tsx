import { ENVELOPE_ERROR_EXAMPLE } from "@/lib/api-ref-schemas";
import { docsApiUrl, type DocsApiSubsystem } from "@/lib/docs-api-origins";

import styles from "./ApiReferenceElements.module.css";

/**
 * Shorthand for a documented HTTP call: {method} {public-origin}/{operation}.
 * Confirm path layout with the node release you target; some deployments group
 * routes under a sub-path.
 */
export function MethodPath({
  method,
  operation,
  subsystem = "mempool",
}: {
  method: "POST" | "GET";
  /** Logical route / operation name (snake_case), echoed in the response `route` field. */
  operation: string;
  subsystem?: DocsApiSubsystem;
}) {
  const url = docsApiUrl(subsystem, operation);
  return (
    <p className={styles.methodLine}>
      <span className={styles.methodBadge}>{method}</span> <code>{url}</code>
    </p>
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
      <pre>{ENVELOPE_ERROR_EXAMPLE}</pre>
    </>
  );
}
