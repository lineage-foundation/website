import { type DocsNavItem, isDocsPathActive } from "./docs-nav";

/** Stable id for a group node from its position in `DOCS_NAV` (0-based at each level). */
export function groupKeyForIndices(indices: number[]): string {
  return indices.join("-");
}

function itemOrSubtreeActive(item: DocsNavItem, pathname: string): boolean {
  if (item.href && isDocsPathActive(pathname, item.href)) {
    return true;
  }
  if (!item.children?.length) {
    return false;
  }
  return item.children.some((c) => itemOrSubtreeActive(c, pathname));
}

/**
 * Returns keys for every group that must be open to reveal the current path’s
 * active item (inclusive: parent of active leaf).
 */
export function getAutoExpandedGroupKeys(
  items: readonly DocsNavItem[],
  pathname: string,
  parentIndices: number[] = [],
): Set<string> {
  const out = new Set<string>();
  items.forEach((item, i) => {
    const indices = [...parentIndices, i];
    if (!item.children?.length) {
      return;
    }
    if (itemOrSubtreeActive(item, pathname)) {
      out.add(groupKeyForIndices(indices));
      const sub = getAutoExpandedGroupKeys(item.children, pathname, indices);
      sub.forEach((k) => out.add(k));
    }
  });
  return out;
}
