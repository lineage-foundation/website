import type { ReactNode } from "react";

import styles from "./FeatureGrid.module.css";

export type FeatureItem = {
  title: ReactNode;
  body: ReactNode;
};

export type FeatureGridProps = {
  items: readonly FeatureItem[];
  className?: string;
};

export function FeatureGrid({ items, className }: FeatureGridProps) {
  const classes = [styles.grid];
  if (className) classes.push(className);
  return (
    <ul className={classes.join(" ")} role="list">
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.index} aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.body}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
