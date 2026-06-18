import styles from "./AsideCard.module.css";

export function AsideCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <aside className={`${styles.aside} ${className ?? ""}`}>{children}</aside>;
}
