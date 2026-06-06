import type { ReactNode } from "react";

import styles from "./Timeline.module.css";

type TimelineProps = {
  children: ReactNode;
};

/**
 * Wraps a sequence of <Release> articles.
 * No JavaScript motion is used — the component is server-safe and
 * `prefers-reduced-motion` is therefore respected by default.
 */
export function Timeline({ children }: TimelineProps) {
  return <div className={styles.timeline}>{children}</div>;
}
