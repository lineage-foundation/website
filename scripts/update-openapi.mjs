#!/usr/bin/env node
// Refresh public/openapi.json from the canonical OpenAPI document in the fleet repo, which
// is generated from the API definitions (see fleet: cargo run -p fleet-api --bin dump_openapi).
// Run whenever the API changes:  npm run update:openapi
// Override the source with OPENAPI_URL (e.g. a release asset or a raw file on a branch).

import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SPEC_URL =
  process.env.OPENAPI_URL ??
  "https://raw.githubusercontent.com/lineage-foundation/fleet/main/openapi.json";

const dest = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "openapi.json");

const res = await fetch(SPEC_URL);
if (!res.ok) {
  console.error(`Failed to fetch OpenAPI spec from ${SPEC_URL}: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const spec = await res.json();
if (spec.openapi == null || spec.paths == null) {
  console.error("Fetched document does not look like an OpenAPI spec (missing openapi/paths)");
  process.exit(1);
}

await writeFile(dest, `${JSON.stringify(spec, null, 2)}\n`);
console.log(`Wrote ${dest} — ${Object.keys(spec.paths).length} paths from ${SPEC_URL}`);
