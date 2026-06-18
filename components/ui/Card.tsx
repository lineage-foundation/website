import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { Eyebrow } from "./Eyebrow";
import styles from "./Card.module.css";

export type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title: ReactNode;
  eyebrow?: ReactNode;
  /** Cyan-mono caption rendered ABOVE the title (prototype `.card .num`). */
  kicker?: ReactNode;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  /** Adds the aurora top-rule that reveals on hover (prototype .card--rail). */
  rail?: boolean;
  /** Dashed border + dimmed background for not-yet-available items (prototype `.card.is-placeholder`). */
  placeholder?: boolean;
  children?: ReactNode;
};

export function Card({
  title,
  eyebrow,
  kicker,
  icon,
  href,
  external,
  rail,
  placeholder,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [styles.card];
  if (href) classes.push(styles.clickable);
  if (rail) classes.push(styles.rail);
  if (placeholder) classes.push(styles.placeholder);
  if (className) classes.push(className);

  const isExternal = href ? external || /^https?:\/\//.test(href) : false;
  const accessibleTitle =
    typeof title === "string" ? title : "Open card";

  return (
    <article data-card="" className={classes.join(" ")} {...rest}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
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
