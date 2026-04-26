"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

import { getAutoExpandedGroupKeys, groupKeyForIndices } from "@/lib/docs-nav-expand";
import { type DocsNavItem, DOCS_NAV, isDocsPathActive } from "@/lib/docs-nav";

import styles from "./DocsNavTree.module.css";

type TreeProps = {
  onNavigate?: () => void;
  className?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? styles.chevronOpen : styles.chevron}
      width={16}
      height={16}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 5l5.5 5-5.5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavList({
  items,
  parentIndices,
  depth,
  pathname,
  expanded,
  onToggle,
  onNavigate,
  treeId,
  panelUl,
}: {
  items: readonly DocsNavItem[];
  parentIndices: number[];
  depth: number;
  pathname: string;
  expanded: Set<string>;
  onToggle: (key: string) => void;
  onNavigate?: () => void;
  treeId: string;
  /** When this list is the collapsible child of a section, the root <ul> is the ARIA region. */
  panelUl?: { id: string; hidden: boolean };
}) {
  return (
    <ul
      className={depth === 0 ? styles.listRoot : styles.listNested}
      id={panelUl?.id}
      hidden={panelUl?.hidden}
    >
      {items.map((item, i) => {
        const key = `${depth}-${i}-${item.title}`;
        const gk = groupKeyForIndices([...parentIndices, i]);

        if (item.children?.length) {
          const isOpen = expanded.has(gk);
          const panelId = `${treeId}-panel-${gk}`;

          return (
            <li key={key} className={styles.group}>
              <div
                className={
                  depth === 0 ? styles.groupRow : styles.groupRowNested
                }
              >
                <button
                  type="button"
                  className={styles.disclosure}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggle(gk)}
                >
                  <Chevron open={isOpen} />
                  <span className={styles.srOnly}>
                    {isOpen ? "Collapse" : "Expand"} {item.title} section
                  </span>
                </button>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={
                      isDocsPathActive(pathname, item.href)
                        ? styles.groupTitleLinkActive
                        : styles.groupTitleLink
                    }
                    onClick={onNavigate}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className={styles.groupLabelInRow}>{item.title}</span>
                )}
              </div>
              <NavList
                items={item.children}
                parentIndices={[...parentIndices, i]}
                depth={depth + 1}
                pathname={pathname}
                expanded={expanded}
                onToggle={onToggle}
                onNavigate={onNavigate}
                treeId={treeId}
                panelUl={{ id: panelId, hidden: !isOpen }}
              />
            </li>
          );
        }
        if (!item.href) {
          return null;
        }
        return (
          <li key={key} className={styles.item}>
            <Link
              href={item.href}
              className={
                isDocsPathActive(pathname, item.href)
                  ? styles.linkActive
                  : styles.link
              }
              onClick={onNavigate}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsNavTree({ onNavigate, className }: TreeProps) {
  const pathname = usePathname() ?? "";
  const treeId = useId();
  const [expanded, setExpanded] = useState<Set<string>>(() =>
    getAutoExpandedGroupKeys(DOCS_NAV, pathname),
  );

  useEffect(() => {
    setExpanded(getAutoExpandedGroupKeys(DOCS_NAV, pathname));
  }, [pathname]);

  const onToggle = (gk: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(gk)) {
        next.delete(gk);
      } else {
        next.add(gk);
      }
      return next;
    });
  };

  return (
    <nav
      className={className}
      aria-label="Documentation"
      data-sidebar="docs"
    >
      <NavList
        items={DOCS_NAV}
        parentIndices={[]}
        depth={0}
        pathname={pathname}
        expanded={expanded}
        onToggle={onToggle}
        onNavigate={onNavigate}
        treeId={treeId}
      />
    </nav>
  );
}
