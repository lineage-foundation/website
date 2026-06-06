"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui";

import styles from "./SiteHeader.module.css";

const TOP_NAV_ITEMS = [
  { label: "Technology", href: "/technology" },
  { label: "Tokenomics", href: "/tokenomics" },
] as const;

const DEVELOPERS_ITEMS = [
  { label: "Overview", href: "/developers" },
  { label: "Docs", href: "/docs" },
  { label: "Roadmap", href: "/roadmap" },
] as const;

const AFTER_DEV_NAV_ITEMS = [
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuId = useId();
  const dropdownId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  // Sync --site-header-offset via ResizeObserver
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

  // Close mobile menu when viewport widens beyond breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Mobile menu: body scroll lock + Escape to close
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

  // Dropdown: Escape to close + outside-click to close
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [dropdownOpen, closeDropdown]);

  // Check if any developer sub-path is active
  const devPathnames: string[] = DEVELOPERS_ITEMS.map((i) => i.href);
  const isDevActive = devPathnames.includes(pathname);

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
      <div className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" onClick={closeMenu} aria-label="Lineage home">
            {/* eslint-disable-next-line @next/next/no-img-element -- explicit dimensions match header sizing */}
            <img
              src="/brand/lineage-mark.svg"
              alt="Lineage"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.navRight}>
          <nav
            id={menuId}
            className={`${styles.tabs} ${menuOpen ? styles.tabsOpen : ""}`}
            aria-label="Primary"
          >
            {TOP_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}

            {/* Developers dropdown */}
            <div
              ref={dropdownRef}
              className={`${styles.navGroup} ${isDevActive ? styles.navGroupCurrent : ""} ${dropdownOpen ? styles.navGroupOpen : ""}`}
            >
              <button
                type="button"
                className={styles.navGroupTrigger}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls={dropdownId}
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Developers
                <svg
                  className={styles.caret}
                  width={11}
                  height={11}
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id={dropdownId}
                className={styles.navMenu}
                role="menu"
              >
                {DEVELOPERS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      closeDropdown();
                    }}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {AFTER_DEV_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.headerCta}>
            <Button variant="primary" size="sm" href="/get-tokens">
              Get tokens
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
      </div>
    </header>
  );
}
