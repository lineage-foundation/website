import { CONCEPTS_PORTED } from "./concepts";
import { MORE_PORTED } from "./more";
import type { PortedDocPage } from "./types";

const ALL_PORTED: Record<string, PortedDocPage> = {
  ...CONCEPTS_PORTED,
  ...MORE_PORTED,
};

export type { PortedDocPage } from "./types";

/** Full article for catch-all routes (everything in `DOCS_NAV` that is not `DEDICATED_DOC_PATHS`). */
export function getPortedDocPage(path: string): PortedDocPage | null {
  return ALL_PORTED[path] ?? null;
}
