import { apiGroups, navEntries } from "@/lib/openapi/spec";

import { OperationBlock } from "./OperationBlock";
import styles from "./reference.module.css";

/**
 * Native API reference rendered from the vendored OpenAPI document (`public/openapi.json`,
 * refreshed via `scripts/update-openapi.mjs`). A sticky resource nav sits beside the
 * operation list; everything is server-rendered from the spec, so there is no client
 * bundle and no third-party widget — it inherits the site's design system directly.
 */
export function ApiReference() {
  const groups = apiGroups();

  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="API reference">
        {groups.map((group) => (
          <div key={group.slug} className={styles.navGroup}>
            <a href={`#${group.slug}`} className={styles.navGroupTitle}>
              {group.title}
            </a>
            <ul className={styles.navList}>
              {navEntries(group.operations).map((entry) => (
                <li key={entry.slug}>
                  <a href={`#${entry.slug}`} className={styles.navLink}>
                    <span className={styles.navPath}>{entry.label || "/"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.main}>
        {groups.map((group) => (
          <section
            key={group.slug}
            id={group.slug}
            className={styles.group}
            aria-labelledby={`${group.slug}-title`}
          >
            <div className={styles.groupHead}>
              <h2 id={`${group.slug}-title`} className={styles.groupTitle}>
                {group.title}
                {group.slug !== "common" ? (
                  <span className={styles.groupTitleSuffix}> API</span>
                ) : null}
              </h2>
              {group.host ? (
                <span className={styles.groupHostWrap}>
                  <code className={styles.groupHost}>{group.host}</code>
                  <span className={styles.testnetTag}>Testnet</span>
                </span>
              ) : null}
            </div>
            <p className={styles.groupBlurb}>{group.blurb}</p>
            {group.operations.map((op) => (
              <OperationBlock key={op.slug} op={op} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
