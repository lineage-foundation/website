"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DOCS_NAV, isDocsPathActive } from "@/lib/docs-nav";

import styles from "./DocsNavTree.module.css";

type TreeProps = {
  onNavigate?: () => void;
  className?: string;
};

/**
 * Docs sidebar nav — prototype `.docs-nav`: mono-uppercase section headings,
 * flat link lists, left-accent active state. Always open (no disclosure).
 *
 * Each top-level group renders ONE heading (the section title, made clickable
 * when it has an index page) followed by its child links. Top-level leaves
 * render as standalone links. The title is never duplicated.
 */
export function DocsNavTree({ onNavigate, className }: TreeProps) {
  const pathname = usePathname() ?? "";

  const linkClass = (href: string) =>
    isDocsPathActive(pathname, href) ? styles.linkActive : styles.link;
  const current = (href: string) =>
    isDocsPathActive(pathname, href) ? ("page" as const) : undefined;

  return (
    <nav className={className} aria-label="Documentation" data-sidebar="docs">
      {DOCS_NAV.map((item, i) => {
        // Group: section heading + flat list of child links.
        if (item.children?.length) {
          const headingActive = item.href
            ? isDocsPathActive(pathname, item.href)
            : false;
          return (
            <section key={i} className={styles.section}>
              <h2 className={styles.heading}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={
                      headingActive
                        ? styles.headingLinkActive
                        : styles.headingLink
                    }
                    aria-current={headingActive ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h2>
              <ul className={styles.list}>
                {item.children.map((child, j) =>
                  child.href ? (
                    <li key={j}>
                      <Link
                        href={child.href}
                        className={linkClass(child.href)}
                        aria-current={current(child.href)}
                        onClick={onNavigate}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          );
        }

        // Standalone top-level page (Welcome, Tutorials overview, API overview…).
        if (!item.href) return null;
        return (
          <Link
            key={i}
            href={item.href}
            className={`${styles.standalone} ${linkClass(item.href)}`}
            aria-current={current(item.href)}
            onClick={onNavigate}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
