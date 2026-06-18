import styles from "./Stat.module.css";

export type StatProps = {
  value: React.ReactNode;
  label: string;
  className?: string;
};

export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={`${styles.stat} ${className ?? ""}`}>
      <div className={styles.value}>{value}</div>
      <span className={styles.key}>{label}</span>
    </div>
  );
}
