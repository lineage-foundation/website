import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Prose.module.css";

export type ProseProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Prose({ className, children, ...rest }: ProseProps) {
  const classes = [styles.prose];
  if (className) classes.push(className);
  return (
    <div className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
}
