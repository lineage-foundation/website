import styles from "./PhaseStrip.module.css";

export type PhaseItem = {
  num: string;
  name: string;
  when: string;
  desc: string;
};

type PhaseStripProps = {
  phases: PhaseItem[];
};

export function PhaseStrip({ phases }: PhaseStripProps) {
  return (
    <div className={styles.strip}>
      {phases.map((p) => (
        <div key={p.num} className={styles.phase}>
          <span className={styles.phaseTop} aria-hidden="true" />
          <span className={styles.phaseNum}>{p.num}</span>
          <h3 className={styles.phaseName}>{p.name}</h3>
          <span className={styles.phaseWhen}>{p.when}</span>
          <p className={styles.phaseDesc}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
