import styles from "./Note.module.css";

export function Note({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div className={styles.note}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      {children}
    </div>
  );
}
