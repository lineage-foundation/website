import styles from "./Signal.module.css";

export function Signal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`${styles.signal} ${className ?? ""}`}>{children}</span>;
}
