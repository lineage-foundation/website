import styles from "./Tag.module.css";

export function Tag({ status, children }: { status: "live" | "soon"; children: React.ReactNode }) {
  return <span className={status === "live" ? styles.live : styles.soon}>{children}</span>;
}
