import { Eyebrow, LinkCta } from "@/components/ui";

import styles from "./AudienceRouter.module.css";

export function AudienceRouter() {
  return (
    <div className={styles.grid} role="list">
      <article className={styles.item} role="listitem">
        <Eyebrow className={styles.eyebrow}>For builders</Eyebrow>
        <h3 className={styles.title}>Build on Lineage</h3>
        <p className={styles.body}>
          Evaluate the protocol, clone the repos, and prototype against an L1
          where market policy itself is programmable.
        </p>
        <div className={styles.cta}>
          <LinkCta href="/developers">Developer path</LinkCta>
        </div>
      </article>
      <article className={styles.item} role="listitem">
        <Eyebrow className={styles.eyebrow}>For researchers &amp; investors</Eyebrow>
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
