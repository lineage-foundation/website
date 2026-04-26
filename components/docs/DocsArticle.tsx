import type { ReactNode } from "react";

import { Heading, Prose } from "@/components/ui";

import styles from "./DocsArticle.module.css";

type Props = {
  title: string;
  children: ReactNode;
};

/** Single h1 + body copy for /docs pages (Prose is one landmark for the article). */
export function DocsArticle({ title, children }: Props) {
  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <Heading level={1} variant="h1">
          {title}
        </Heading>
      </header>
      <Prose className={styles.articleBody}>{children}</Prose>
    </article>
  );
}
