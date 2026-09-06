import styles from "./Pill.module.css";

export type PillTone = "get" | "post" | "put" | "delete" | "soon";

export function Pill({ tone, children, className }: { tone: PillTone; children: React.ReactNode; className?: string }) {
  return <span className={`${styles.pill} ${styles[tone]} ${className ?? ""}`}>{children}</span>;
}
