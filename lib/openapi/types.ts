/**
 * Minimal OpenAPI 3.1 type subset — only the constructs the fleet spec actually uses.
 * The spec is generated (via utoipa) and vendored at `public/openapi.json`, so this
 * covers: $ref, oneOf, enum, nullable-as-type-array, items, additionalProperties, and
 * scalar formats. No allOf / anyOf appear in the document.
 */

export type SchemaType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "object"
  | "array"
  | "null";

export interface Schema {
  $ref?: string;
  type?: SchemaType | SchemaType[];
  format?: string;
  title?: string;
  description?: string;
  enum?: Array<string | number | boolean | null>;
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  additionalProperties?: boolean | Schema;
  oneOf?: Schema[];
  /** OpenAPI 3.0-style nullable flag (rare here; 3.1 uses a "null" entry in `type`). */
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  default?: unknown;
  example?: unknown;
}

export interface MediaType {
  schema?: Schema;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: Record<string, MediaType>;
}

export interface Parameter {
  name: string;
  in: "query" | "path" | "header" | "cookie";
  description?: string;
  required?: boolean;
  schema?: Schema;
}

export interface ResponseObject {
  description?: string;
  content?: Record<string, MediaType>;
}

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface Operation {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, ResponseObject>;
  security?: Array<Record<string, string[]>>;
}

export type PathItem = Partial<Record<HttpMethod, Operation>>;

export interface OpenApiDocument {
  openapi: string;
  info: { title: string; version: string; description?: string };
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, Schema>;
    securitySchemes?: Record<string, unknown>;
  };
  security?: Array<Record<string, string[]>>;
}
