/**
 * Loads the vendored OpenAPI document and derives the shape the reference page renders:
 * operations grouped by resource (the spec has no tags), with stable anchor slugs and a
 * few small helpers for resolving `$ref`s and turning schemas into readable type labels.
 *
 * Server-only: this imports the full spec JSON, which should never reach the client bundle.
 */

import openapiDoc from "@/public/openapi.json";

import type {
  HttpMethod,
  OpenApiDocument,
  Operation,
  Schema,
} from "./types";

export const spec = openapiDoc as unknown as OpenApiDocument;

const METHOD_ORDER: HttpMethod[] = ["get", "post", "put", "delete", "patch"];

/** Preferred group ordering; groups not listed here are appended alphabetically. */
const GROUP_ORDER = [
  "blocks",
  "transactions",
  "payments",
  "balances",
  "supply",
  "items",
  "wallet",
  "mining",
  "blockchain-entries",
  "donation-requests",
  "debug",
];

export interface OperationView {
  method: HttpMethod;
  path: string;
  slug: string;
  summary: string;
  description?: string;
  operation: Operation;
  secured: boolean;
}

export interface ApiGroup {
  title: string;
  slug: string;
  operations: OperationView[];
}

/** Resource key for a path, e.g. `/v1/transactions/status:query` → `transactions`. */
function groupKey(path: string): string {
  const seg = path.split("/").filter(Boolean)[1] ?? "root";
  return seg.split(":")[0].split("{")[0];
}

function humanize(key: string): string {
  const spaced = key.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** A stable, unique anchor id for an operation. */
export function operationSlug(method: string, path: string): string {
  return `${method}-${path}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** All operations, grouped by resource and ordered for display. */
export function apiGroups(): ApiGroup[] {
  const groups = new Map<string, OperationView[]>();

  for (const [path, item] of Object.entries(spec.paths)) {
    for (const method of METHOD_ORDER) {
      const operation = item[method];
      if (!operation) continue;

      const view: OperationView = {
        method,
        path,
        slug: operationSlug(method, path),
        summary: operation.summary ?? path,
        description: operation.description,
        operation,
        secured: Boolean(operation.security && operation.security.length > 0),
      };

      const key = groupKey(path);
      const bucket = groups.get(key);
      if (bucket) bucket.push(view);
      else groups.set(key, [view]);
    }
  }

  const ordered = [...groups.entries()].sort(([a], [b]) => {
    const ia = GROUP_ORDER.indexOf(a);
    const ib = GROUP_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  return ordered.map(([key, operations]) => ({
    title: humanize(key),
    slug: key,
    operations: operations.sort((a, b) => {
      if (a.path !== b.path) return a.path.localeCompare(b.path);
      return METHOD_ORDER.indexOf(a.method) - METHOD_ORDER.indexOf(b.method);
    }),
  }));
}

/** The bare schema name for a `$ref`, or undefined for inline schemas. */
export function refName(schema?: Schema): string | undefined {
  if (!schema?.$ref) return undefined;
  return schema.$ref.replace("#/components/schemas/", "");
}

/** Resolve a possibly-`$ref` schema to its concrete definition. */
export function resolveSchema(schema?: Schema): Schema | undefined {
  if (!schema) return undefined;
  const name = refName(schema);
  if (name) return spec.components?.schemas?.[name];
  return schema;
}

function nonNullTypes(schema: Schema): string[] {
  const types = Array.isArray(schema.type)
    ? schema.type
    : schema.type
      ? [schema.type]
      : [];
  return types.filter((t) => t !== "null");
}

export function isNullable(schema: Schema): boolean {
  if (schema.nullable) return true;
  return Array.isArray(schema.type) && schema.type.includes("null");
}

/**
 * A compact, human-readable type label for a schema: `$ref`s keep their name, arrays
 * render as `Item[]`, unions as `a | b`, and nullable types gain `| null`.
 */
export function typeLabel(schema?: Schema): string {
  if (!schema) return "any";

  const name = refName(schema);
  if (name) return name;

  if (schema.oneOf && schema.oneOf.length > 0) {
    return schema.oneOf.map((variant) => typeLabel(variant)).join(" | ");
  }

  const types = nonNullTypes(schema);
  let base: string;

  if (types.includes("array") || schema.items) {
    base = `${typeLabel(schema.items)}[]`;
  } else if (schema.enum) {
    base = types[0] ?? "string";
  } else if (types.length > 0) {
    base = types.join(" | ");
  } else if (schema.properties || schema.additionalProperties) {
    base = "object";
  } else {
    base = "any";
  }

  return isNullable(schema) ? `${base} | null` : base;
}

/** The first JSON media type of a request/response content map, if any. */
export function jsonSchema(
  content?: Record<string, { schema?: Schema }>,
): { contentType: string; schema?: Schema } | undefined {
  if (!content) return undefined;
  const entries = Object.entries(content);
  if (entries.length === 0) return undefined;
  const preferred =
    entries.find(([type]) => type === "application/json") ?? entries[0];
  return { contentType: preferred[0], schema: preferred[1]?.schema };
}
