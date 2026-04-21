import type { HTMLAttributes, ReactNode } from "react";
import { createElement } from "react";

import styles from "./Heading.module.css";

export type HeadingVariant = "display" | "h1" | "h2" | "h3";
export type HeadingLevel = 1 | 2 | 3 | 4;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
};

export function Heading({
  level,
  variant,
  className,
  children,
  ...rest
}: HeadingProps) {
  const resolvedVariant: HeadingVariant =
    variant ?? (level === 1 ? "h1" : level === 2 ? "h2" : "h3");

  const classes = [styles.heading, styles[resolvedVariant]];
  if (className) classes.push(className);

  return createElement(
    `h${level}`,
    { className: classes.join(" "), ...rest },
    children,
  );
}
