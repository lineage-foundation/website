import type { ElementType, HTMLAttributes, ReactNode } from "react";

import styles from "./Container.module.css";

type ContainerWidth = "default" | "wide" | "narrow";

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  width?: ContainerWidth;
  children: ReactNode;
};

export function Container({
  as,
  width = "default",
  className,
  children,
  ...rest
}: ContainerProps) {
  const Component = (as ?? "div") as ElementType;
  const classes = [styles.container];
  if (width === "wide") classes.push(styles.wide);
  if (width === "narrow") classes.push(styles.narrow);
  if (className) classes.push(className);
  return (
    <Component className={classes.join(" ")} {...rest}>
      {children}
    </Component>
  );
}
