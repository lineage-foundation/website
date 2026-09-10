import {
  isNullable,
  resolveSchema,
  typeLabel,
} from "@/lib/openapi/spec";
import type { Schema } from "@/lib/openapi/types";

import styles from "./reference.module.css";

/** How deep nested object properties expand inline before collapsing to a type label. */
const MAX_DEPTH = 3;

function EnumValues({ values }: { values: Schema["enum"] }) {
  if (!values || values.length === 0) return null;
  return (
    <span className={styles.enumList}>
      {values.map((value, i) => (
        <code key={i} className={styles.enumValue}>
          {value === null ? "null" : String(value)}
        </code>
      ))}
    </span>
  );
}

/** The description cell for one property: prose, then format and enum hints. */
function PropertyMeta({ schema }: { schema: Schema }) {
  const resolved = resolveSchema(schema) ?? schema;
  const format = resolved.format ?? schema.format;
  return (
    <>
      {resolved.description ? <span>{resolved.description}</span> : null}
      {format ? (
        <span className={styles.metaHint}>
          Format: <code>{format}</code>
        </span>
      ) : null}
      {resolved.enum ? (
        <span className={styles.metaHint}>
          One of: <EnumValues values={resolved.enum} />
        </span>
      ) : null}
    </>
  );
}

function PropertyTable({
  schema,
  depth,
}: {
  schema: Schema;
  depth: number;
}) {
  const properties = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const names = Object.keys(properties);

  if (names.length === 0) {
    // Object with a free-form / opaque shape (e.g. additionalProperties only).
    return (
      <p className={styles.scalarNote}>
        {schema.description ?? "An object whose keys are defined by the caller."}
      </p>
    );
  }

  return (
    <div className={styles.propTable}>
      {names.map((name) => {
        const prop = properties[name];
        const resolved = resolveSchema(prop) ?? prop;
        const nestedObject =
          depth < MAX_DEPTH &&
          !prop.$ref &&
          resolved.properties &&
          Object.keys(resolved.properties).length > 0;
        const arrayItem = resolveSchema(resolved.items);
        const nestedArrayObject =
          depth < MAX_DEPTH &&
          arrayItem?.properties &&
          Object.keys(arrayItem.properties).length > 0;

        return (
          <div key={name} className={styles.propRow}>
            <div className={styles.propHead}>
              <code className={styles.propName}>{name}</code>
              <code className={styles.propType}>{typeLabel(prop)}</code>
              {required.has(name) ? (
                <span className={styles.required}>required</span>
              ) : (
                <span className={styles.optional}>optional</span>
              )}
              {isNullable(resolved) ? (
                <span className={styles.optional}>nullable</span>
              ) : null}
            </div>
            <div className={styles.propDesc}>
              <PropertyMeta schema={prop} />
            </div>
            {nestedObject ? (
              <div className={styles.nested}>
                <PropertyTable schema={resolved} depth={depth + 1} />
              </div>
            ) : null}
            {nestedArrayObject && arrayItem ? (
              <div className={styles.nested}>
                <PropertyTable schema={arrayItem} depth={depth + 1} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Renders a request/response schema: object property tables, array item shapes, `oneOf`
 * variants, maps, and scalars — resolving `$ref`s and bounding recursion at MAX_DEPTH.
 */
export function SchemaView({
  schema,
  depth = 0,
}: {
  schema?: Schema;
  depth?: number;
}) {
  const resolved = resolveSchema(schema);
  if (!resolved) return null;

  if (resolved.oneOf && resolved.oneOf.length > 0) {
    return (
      <div className={styles.oneOf}>
        <p className={styles.scalarNote}>One of the following:</p>
        {resolved.oneOf.map((variant, i) => (
          <div key={i} className={styles.oneOfVariant}>
            <span className={styles.oneOfLabel}>{typeLabel(variant)}</span>
            <SchemaView schema={variant} depth={depth} />
          </div>
        ))}
      </div>
    );
  }

  const types = Array.isArray(resolved.type)
    ? resolved.type
    : resolved.type
      ? [resolved.type]
      : [];

  if (types.includes("array") || resolved.items) {
    const item = resolveSchema(resolved.items);
    const itemIsObject =
      item?.properties && Object.keys(item.properties).length > 0;
    return (
      <div>
        <p className={styles.scalarNote}>
          Array of <code>{typeLabel(resolved.items)}</code>
        </p>
        {itemIsObject && depth < MAX_DEPTH && item ? (
          <PropertyTable schema={item} depth={depth + 1} />
        ) : null}
      </div>
    );
  }

  if (resolved.properties && Object.keys(resolved.properties).length > 0) {
    return <PropertyTable schema={resolved} depth={depth} />;
  }

  if (resolved.additionalProperties && typeof resolved.additionalProperties === "object") {
    return (
      <p className={styles.scalarNote}>
        Map of string to <code>{typeLabel(resolved.additionalProperties)}</code>
        {resolved.description ? ` — ${resolved.description}` : null}
      </p>
    );
  }

  // Scalar or opaque object.
  return (
    <p className={styles.scalarNote}>
      <code>{typeLabel(resolved)}</code>
      {resolved.description ? ` — ${resolved.description}` : null}
    </p>
  );
}
