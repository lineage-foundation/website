import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import styles from "./Card.module.css";

export type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title: ReactNode;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  children?: ReactNode;
};

export function Card({
  title,
  icon,
  href,
  external,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [styles.card];
  if (href) classes.push(styles.clickable);
  if (className) classes.push(className);

  const isExternal = href ? external || /^https?:\/\//.test(href) : false;
  const accessibleTitle =
    typeof title === "string" ? title : "Open card";

  return (
    <article className={classes.join(" ")} {...rest}>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <h3 className={styles.title}>{title}</h3>
      {children ? <div className={styles.body}>{children}</div> : null}
      {href ? (
        isExternal ? (
          <a
            href={href}
            className={styles.overlayLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            {accessibleTitle}
          </a>
        ) : (
          <Link href={href} className={styles.overlayLink}>
            {accessibleTitle}
          </Link>
        )
      ) : null}
    </article>
  );
}
