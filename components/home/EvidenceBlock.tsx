import { Eyebrow, LinkCta } from "@/components/ui";
import { URL_GITHUB_ORG, URL_ZENODO_WHITEPAPER } from "@/lib/constants";

import styles from "./EvidenceBlock.module.css";

export function EvidenceBlock() {
  return (
    <div className={styles.grid}>
      <article className={styles.tile}>
        <Eyebrow className={styles.eyebrow}>Whitepaper</Eyebrow>
        <h3 className={styles.title}>Lineage: The Living Economy</h3>
        <p className={styles.body}>
          The full technical and economic specification for UTMMs and Prime
          Radiant Consensus, archived on Zenodo.
        </p>
        <div className={styles.cta}>
          <LinkCta href={URL_ZENODO_WHITEPAPER} external>
            Read on Zenodo
          </LinkCta>
        </div>
      </article>
      <article className={styles.tile}>
        <Eyebrow className={styles.eyebrow}>Source</Eyebrow>
        <h3 className={styles.title}>Open, auditable implementation</h3>
        <p className={styles.body}>
          Lineage Foundation&rsquo;s public GitHub — every repository is open
          for review, issues, and contributions.
        </p>
        <div className={styles.cta}>
          <LinkCta href={URL_GITHUB_ORG} external>
            View on GitHub
          </LinkCta>
        </div>
      </article>
    </div>
  );
}
