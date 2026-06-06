import type { ReactNode } from "react";

import styles from "./TeamGrid.module.css";

export type TeamGridProps = {
  /** "default" = 3-column grid (directors); "2" = 2-column grid (advisors) */
  variant?: "default" | "2";
  children: ReactNode;
};

export function TeamGrid({ variant = "default", children }: TeamGridProps) {
  const classes = [styles.grid];
  if (variant === "2") classes.push(styles.grid2);
  return <div className={classes.join(" ")}>{children}</div>;
}
