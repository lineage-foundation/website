import { LinkCta } from "@/components/ui";

import styles from "./AudienceRouter.module.css";

export function AudienceRouter() {
  return (
    <div className={styles.grid} role="list">
      <article className={styles.item} role="listitem">
        <h3 className={styles.title}>Build on Lineage</h3>
        <p className={styles.body}>
          Evaluate the protocol, clone the repos, and prototype against a
          Layer-1 where market policy itself is programmable.
        </p>
        <div className={styles.cta}>
          <LinkCta href="/developers">Developer path</LinkCta>
        </div>
      </article>
      <article className={styles.item} role="listitem">
        <h3 className={styles.title}>Read the research</h3>
        <p className={styles.body}>
          UTMMs, Prime Radiant Consensus, and adaptive market evolution — the
          whitepaper and research notes, without the marketing layer.
        </p>
        <div className={styles.cta}>
          <LinkCta href="/research">Research path</LinkCta>
        </div>
      </article>
    </div>
  );
}
