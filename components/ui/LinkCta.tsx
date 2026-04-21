import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import styles from "./LinkCta.module.css";

export type LinkCtaProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  href: string;
  external?: boolean;
  muted?: boolean;
  children: ReactNode;
};

export function LinkCta({
  href,
  external,
  muted,
  className,
  children,
  ...rest
}: LinkCtaProps) {
  const classes = [styles.link];
  if (muted) classes.push(styles.muted);
  if (className) classes.push(className);

  const isExternal = external || /^https?:\/\//.test(href);

  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes.join(" ")}
        rel="noopener noreferrer"
        target="_blank"
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes.join(" ")} {...rest}>
      {content}
    </Link>
  );
}
