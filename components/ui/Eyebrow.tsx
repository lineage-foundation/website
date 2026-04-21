import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Eyebrow.module.css";

export type EyebrowProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  const classes = [styles.eyebrow];
  if (className) classes.push(className);
  return (
    <span className={classes.join(" ")} {...rest}>
      {children}
    </span>
  );
}
