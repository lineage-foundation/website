import styles from "./StatusBar.module.css";

export type StatusTone = "ok" | "warn" | "err" | "info";

export function StatusBar({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return <div className={`${styles.bar} ${styles[tone]}`} role="status">{children}</div>;
}
