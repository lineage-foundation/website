import type { ReactNode } from "react";

import styles from "./Phases.module.css";

export type PhaseItem = {
  kicker: string;
  heading: string;
  body: ReactNode;
};

export type PhasesProps = {
  items: PhaseItem[];
};

/**
 * Phased-release timeline list.
 * Ported from design-prototype .phases/.phase (lineage.css lines 444-449).
 * Includes the emerald→cyan gradient spine (::before) and .ph-k mono kicker.
 */
export function Phases({ items }: PhasesProps) {
  return (
    <ol className={styles.phases}>
      {items.map((item) => (
        <li key={item.kicker} className={styles.phase}>
          <div className={styles.phaseKicker}>{item.kicker}</div>
          <h3>{item.heading}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
