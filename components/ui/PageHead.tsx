import type { ReactNode } from "react";

import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import styles from "./PageHead.module.css";

export type PageHeadProps = {
  eyebrow: ReactNode;
  /** May contain an accented word via <Accent> helper. */
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
};

/**
 * Accent helper — wraps an accented word with the cyan glow colour.
 * Usage: <PageHead title={<>The <Accent>Living</Accent> Economy</>} … />
 */
export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>;
}

/**
 * Interior-page hero header. Ports prototype `.page-head` / `.page-head-inner`
 * (design-prototype/css/lineage.css lines 278-293).
 */
export function PageHead({ eyebrow, title, lead, actions }: PageHeadProps) {
  return (
    <section className={styles.pageHead}>
      <Container>
        <div className={styles.inner}>
          <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <div className={styles.lead}>{lead}</div> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
