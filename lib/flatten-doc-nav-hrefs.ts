import { type DocsNavItem, DOCS_NAV } from "./docs-nav";
import { DEDICATED_DOC_PATHS } from "./docs-catchall-config";

function walk(
  items: readonly DocsNavItem[],
  out: string[],
) {
  for (const it of items) {
    if (it.href) {
      out.push(it.href);
    }
    if (it.children) {
      walk(it.children, out);
    }
  }
}

/** Every linked path in the docs nav, for sitemap and static generation. */
export function allDocsNavHrefs() {
  const out: string[] = [];
  walk(DOCS_NAV, out);
  return [...new Set(out)];
}

export function allCatchallStaticSlugs() {
  const out: { slug: string[] }[] = [];
  for (const href of allDocsNavHrefs()) {
    if (DEDICATED_DOC_PATHS.has(href)) {
      continue;
    }
    const segs = href.replace(/\/$/, "").split("/").slice(2);
    out.push({ slug: segs });
  }
  return out;
}
