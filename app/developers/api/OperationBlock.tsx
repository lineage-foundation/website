import { Pill } from "@/components/ui";
import type { PillTone } from "@/components/ui/Pill";
import { jsonSchema, typeLabel } from "@/lib/openapi/spec";
import type { OperationView } from "@/lib/openapi/spec";

import { SchemaView } from "./SchemaView";
import styles from "./reference.module.css";

function ParametersTable({ op }: { op: OperationView }) {
  const params = op.operation.parameters ?? [];
  if (params.length === 0) return null;

  return (
    <div className={styles.subsection}>
      <h4 className={styles.subhead}>Parameters</h4>
      <div className={styles.propTable}>
        {params.map((param) => (
          <div key={`${param.in}-${param.name}`} className={styles.propRow}>
            <div className={styles.propHead}>
              <code className={styles.propName}>{param.name}</code>
              <code className={styles.propType}>{typeLabel(param.schema)}</code>
              <span className={styles.inBadge}>{param.in}</span>
              {param.required ? (
                <span className={styles.required}>required</span>
              ) : (
                <span className={styles.optional}>optional</span>
              )}
            </div>
            {param.description ? (
              <div className={styles.propDesc}>{param.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestBody({ op }: { op: OperationView }) {
  const body = op.operation.requestBody;
  if (!body) return null;
  const json = jsonSchema(body.content);
  if (!json) return null;

  return (
    <div className={styles.subsection}>
      <h4 className={styles.subhead}>
        Request body
        <code className={styles.contentType}>{json.contentType}</code>
        {body.required ? <span className={styles.required}>required</span> : null}
      </h4>
      {body.description ? <p className={styles.blurb}>{body.description}</p> : null}
      <SchemaView schema={json.schema} />
    </div>
  );
}

function Responses({ op }: { op: OperationView }) {
  const responses = Object.entries(op.operation.responses).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  if (responses.length === 0) return null;

  return (
    <div className={styles.subsection}>
      <h4 className={styles.subhead}>Responses</h4>
      {responses.map(([code, response]) => {
        const json = jsonSchema(response.content);
        const ok = code.startsWith("2");
        return (
          <div key={code} className={styles.response}>
            <div className={styles.responseHead}>
              <span
                className={`${styles.status} ${ok ? styles.statusOk : styles.statusErr}`}
              >
                {code}
              </span>
              {response.description ? (
                <span className={styles.responseDesc}>{response.description}</span>
              ) : null}
              {json ? (
                <code className={styles.contentType}>{json.contentType}</code>
              ) : null}
            </div>
            {json?.schema ? (
              <div className={styles.responseBody}>
                <SchemaView schema={json.schema} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** One endpoint: method + path header, description, parameters, request body, responses. */
export function OperationBlock({ op }: { op: OperationView }) {
  return (
    <article id={op.slug} className={styles.operation}>
      <div className={styles.opHead}>
        <Pill tone={op.method as PillTone}>{op.method.toUpperCase()}</Pill>
        <code className={styles.opPath}>{op.path}</code>
        {op.secured ? (
          <span className={styles.secured} title="Requires an x-api-key header">
            x-api-key
          </span>
        ) : null}
      </div>
      {op.summary ? <p className={styles.opSummary}>{op.summary}</p> : null}
      {op.description && op.description !== op.summary ? (
        <p className={styles.blurb}>{op.description}</p>
      ) : null}
      <ParametersTable op={op} />
      <RequestBody op={op} />
      <Responses op={op} />
    </article>
  );
}
