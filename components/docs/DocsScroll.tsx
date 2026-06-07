"use client";

import { useEffect } from "react";

/**
 * Docs client behaviors — a faithful port of the two prototype IIFEs in
 * design-prototype/js/lineage.js:
 *   1. "Docs: collapsible TOC default state by breakpoint"
 *   2. "Docs: scroll-spy active section + breadcrumb"
 *
 * This component renders nothing; it queries the DOM (the server-rendered docs
 * shell) and wires up the behaviors. The shell exposes stable hooks:
 *   [data-docs-toc]  — the <details> TOC wrapper
 *   [data-docs-nav]  — the <nav> with the anchor links
 *   [data-docs-main] — the content column (holds article[id] / h2[id])
 *   #docs-crumb      — the breadcrumb <span>
 */
export function DocsScroll() {
  useEffect(() => {
    const toc = document.querySelector<HTMLDetailsElement>("[data-docs-toc]");
    const nav = document.querySelector<HTMLElement>("[data-docs-nav]");
    if (!nav) return;

    const cleanups: Array<() => void> = [];

    /* ---- collapsible TOC default state by breakpoint ---- */
    if (toc) {
      const mq = window.matchMedia("(max-width:980px)");
      const sync = (e: MediaQueryList | MediaQueryListEvent) => {
        toc.open = !e.matches; // open on desktop, collapsed on mobile
      };
      sync(mq);
      if (mq.addEventListener) {
        mq.addEventListener("change", sync);
        cleanups.push(() => mq.removeEventListener("change", sync));
      } else if (mq.addListener) {
        mq.addListener(sync);
        cleanups.push(() => mq.removeListener(sync));
      }
      const navLinks = nav.querySelectorAll<HTMLAnchorElement>("a");
      navLinks.forEach((a) => {
        const onClick = () => {
          if (mq.matches) toc.open = false;
        };
        a.addEventListener("click", onClick);
        cleanups.push(() => a.removeEventListener("click", onClick));
      });
    }

    /* ---- scroll-spy active section + breadcrumb ---- */
    const links = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const crumb = document.getElementById("docs-crumb");
    const map: Record<string, HTMLAnchorElement> = {};
    const targets: HTMLElement[] = [];
    links.forEach((a) => {
      const id = a.getAttribute("href")?.slice(1) ?? "";
      const el = id ? document.getElementById(id) : null;
      if (el) {
        map[id] = a;
        targets.push(el);
      }
    });

    if (targets.length) {
      let current: string | null = null;
      let ticking = false;

      const setActive = (id: string) => {
        if (id === current) return;
        current = id;
        links.forEach((a) => a.removeAttribute("aria-current"));
        const a = map[id];
        if (a) {
          a.setAttribute("aria-current", "page");
          if (crumb) crumb.textContent = a.textContent;
        }
      };

      const compute = () => {
        ticking = false;
        const y = 110;
        let best = targets[0].id;
        for (let i = 0; i < targets.length; i++) {
          const r = targets[i].getBoundingClientRect();
          if (r.top <= y) best = targets[i].id;
          else break;
        }
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        ) {
          best = targets[targets.length - 1].id;
        }
        setActive(best);
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(compute);
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
      cleanups.push(() => window.removeEventListener("resize", onScroll));
      compute();
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
