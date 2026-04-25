import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Eyebrow.module.css";

export type EyebrowProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  /** "feature" = chip for editorial section headers (home). */
  variant?: "default" | "feature";
};

export function Eyebrow({
  className,
  children,
  variant = "default",
  ...rest
}: EyebrowProps) {
  const classes = [styles.eyebrow];
  if (variant === "feature") classes.push(styles.eyebrowFeature);
  if (className) classes.push(className);
  return (
    <span className={classes.join(" ")} {...rest}>
      {children}
    </span>
  );
}
