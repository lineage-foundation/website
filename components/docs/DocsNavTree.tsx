"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type DocsNavItem, DOCS_NAV, isDocsPathActive } from "@/lib/docs-nav";

import styles from "./DocsNavTree.module.css";

type TreeProps = {
  onNavigate?: () => void;
  className?: string;
};

/**
 * Renders a single nav link with prototype active-state styling.
 * Sets aria-current="page" when active so the left-accent border shows.
 */
function NavLink({
  item,
  onNavigate,
  pathname,
}: {
  item: DocsNavItem;
  onNavigate?: () => void;
  pathname: string;
}) {
  if (!item.href) return null;
  const active = isDocsPathActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      className={active ? styles.linkActive : styles.link}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {item.title}
    </Link>
  );
}

/**
 * Prototype nav: top-level groups → <h2> section headings + flat link list.
 * Standalone top-level leaf links render without a heading.
 * All sections are always visible — no chevron / disclosure.
 */
export function DocsNavTree({ onNavigate, className }: TreeProps) {
  const pathname = usePathname() ?? "";

  return (
    <nav className={className} aria-label="Documentation" data-sidebar="docs">
      {DOCS_NAV.map((item, i) => {
        if (item.children?.length) {
          // Group: render a section heading + flat list of all children
          return (
            <div key={i} className={styles.section}>
              {/* Section heading: mono uppercase caption */}
              {item.href ? (
                <NavLink
                  item={item}
                  onNavigate={onNavigate}
                  pathname={pathname}
                />
              ) : null}
              <h2 className={styles.sectionHeading}>{item.title}</h2>
              <ul className={styles.list}>
                {item.children.map((child, j) => {
                  if (!child.href) return null;
                  const active = isDocsPathActive(pathname, child.href);
                  return (
                    <li key={j}>
                      <Link
                        href={child.href}
                        className={active ? styles.linkActive : styles.link}
                        aria-current={active ? "page" : undefined}
                        onClick={onNavigate}
                      >
                        {child.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        // Standalone leaf link (e.g. "Welcome", "Tutorials overview", "API overview")
        if (!item.href) return null;
        return (
          <div key={i} className={styles.standalone}>
            <NavLink item={item} onNavigate={onNavigate} pathname={pathname} />
          </div>
        );
      })}
    </nav>
  );
}
