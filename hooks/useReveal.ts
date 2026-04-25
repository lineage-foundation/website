"use client";

import { useEffect, useRef } from "react";

export type UseRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Attaches an IntersectionObserver to a returned ref and toggles
 * `data-revealed="true"` on the element when it enters the viewport.
 *
 * Pair with the global CSS rule that selects `[data-reveal][data-revealed]`
 * in `app/globals.css`. Under `prefers-reduced-motion: reduce` the hook sets
 * `data-revealed` synchronously so no transition runs.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute("data-reveal", "");

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealNow = () => {
      el.setAttribute("data-revealed", "true");
    };

    if (mq.matches) {
      revealNow();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      revealNow();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.setAttribute("data-revealed", "true");
            if (once) observer.unobserve(target);
          } else if (!once) {
            target.removeAttribute("data-revealed");
          }
        }
      },
      { threshold, rootMargin },
    );

    const onMotionPref = () => {
      if (mq.matches) {
        observer.disconnect();
        revealNow();
      }
    };

    mq.addEventListener("change", onMotionPref);
    observer.observe(el);
    return () => {
      mq.removeEventListener("change", onMotionPref);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return ref;
}
