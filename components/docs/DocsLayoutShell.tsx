"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { DocsNavTree } from "./DocsNavTree";

import styles from "./DocsLayoutShell.module.css";

type Props = {
  children: ReactNode;
};

export function DocsLayoutShell({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setNarrow(mq.matches);
      if (!mq.matches) {
        setOpen(false);
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const className = "docs-layout--active";
    root.classList.add(className);
    body.classList.add(className);
    return () => {
      root.classList.remove(className);
      body.classList.remove(className);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!narrow) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, narrow, close]);

  useEffect(() => {
    if (open && narrow) {
      const id = requestAnimationFrame(() => {
        const first = asideRef.current?.querySelector<HTMLElement>(
          "a[href], button:not([tabindex='-1'])",
        );
        first?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open, narrow]);

  useEffect(() => {
    if (wasOpenRef.current && !open && narrow) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
    wasOpenRef.current = open;
  }, [open, narrow]);

  const asideClass = [
    styles.aside,
    open ? styles.asideOpen : "",
    narrow && !open ? styles.asideHiddenMobile : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.root} data-docs-root>
      <div className={styles.mobileBar}>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.srOnly}>
            {open ? "Close documentation menu" : "Open documentation menu"}
          </span>
          {open ? (
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              aria-hidden
              className={styles.menuIcon}
            >
              <path
                fill="currentColor"
                d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"
              />
            </svg>
          ) : (
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              aria-hidden
              className={styles.menuIcon}
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          )}
        </button>
        <span className={styles.mobileTitle}>Documentation</span>
      </div>

      {open && narrow ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close documentation menu"
          tabIndex={-1}
          onClick={close}
        />
      ) : null}

      <div className={styles.inner}>
        <aside
          ref={asideRef}
          id={menuId}
          className={asideClass}
          aria-hidden={narrow && !open ? true : undefined}
        >
          <div className={`${styles.asideInner} ${styles.thinScroll}`}>
            <DocsNavTree onNavigate={close} className={styles.navTree} />
          </div>
        </aside>

        <div className={styles.main}>
          <div className={`${styles.mainBody} ${styles.thinScroll}`}>
            <div className={styles.mainInner}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
