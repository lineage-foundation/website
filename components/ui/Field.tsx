import styles from "./Field.module.css";

export function Field({ label, hint, error, htmlFor, children }: {
  label: string; hint?: string; error?: string; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>{label}</label>
      {children}
      {error ? <p className={styles.error}>{error}</p> : hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  );
}
