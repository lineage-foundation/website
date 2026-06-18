import type { ReactNode } from "react";

import styles from "./Release.module.css";

type ReleaseProps = {
  name: string;
  when: string;
  initiative: string;
  lede: ReactNode;
  children: ReactNode;
  /** Marks this as the final release — bolder bar + stronger border */
  final?: boolean;
};

export function Release({ name, when, initiative, lede, children, final }: ReleaseProps) {
  const classes = [styles.release, final ? styles.final : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className={styles.releaseHead}>
        <h3 className={styles.releaseName}>{name}</h3>
        <span className={styles.releaseWhen}>{when}</span>
      </div>
      <span className={styles.releaseInit}>{initiative}</span>
      <p className={styles.releaseLede}>{lede}</p>
      {children}
    </article>
  );
}
