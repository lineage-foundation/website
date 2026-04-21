"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui";
import { URL_ZENODO_WHITEPAPER } from "@/lib/constants";

import styles from "./SiteHeader.module.css";

const NAV_ITEMS = [
  { label: "Technology", href: "/learn", external: false },
  { label: "Developers", href: "/developers", external: false },
  { label: "Ecosystem", href: "/ecosystem", external: false },
  { label: "Research", href: "/research", external: false },
  { label: "Docs", href: URL_ZENODO_WHITEPAPER, external: true },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const syncHeaderOffset = () => {
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${el.offsetHeight}px`,
      );
    };
    syncHeaderOffset();
    const ro = new ResizeObserver(syncHeaderOffset);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--site-header-offset");
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const onChange = () => {
      if (!mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header ref={rootRef} className={styles.root}>
      {menuOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeMenu}
        />
      ) : null}
      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.navLeft}>
          <Link href="/" onClick={closeMenu} aria-label="Lineage home">
            {/* eslint-disable-next-line @next/next/no-img-element -- explicit dimensions match header sizing */}
            <img
              src="/images/lineage-logo.png"
              alt="Lineage"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.navRight}>
          <div
            id={menuId}
            className={`${styles.tabs} ${menuOpen ? styles.tabsOpen : ""}`}
          >
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className={styles.headerCta}>
            <Button
              variant="primary"
              size="sm"
              href={URL_ZENODO_WHITEPAPER}
              external
            >
              Whitepaper
            </Button>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.srOnly}>
              {menuOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            {menuOpen ? (
              <svg
                className={styles.menuIcon}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"
                />
              </svg>
            ) : (
              <svg
                className={styles.menuIcon}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
