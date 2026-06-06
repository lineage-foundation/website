import styles from "./StatusBar.module.css";

export type StatusTone = "ok" | "warn" | "err" | "info";

export function StatusBar({
  tone,
  busy,
  children,
}: {
  tone: StatusTone;
  /** Adds a pulsing animation to the dot (prototype `.statusbar.is-busy`). */
  busy?: boolean;
  children: React.ReactNode;
}) {
  const classes = [styles.bar, styles[tone]];
  if (busy) classes.push(styles.busy);
  return (
    <div className={classes.join(" ")} role="status">
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </div>
  );
}
