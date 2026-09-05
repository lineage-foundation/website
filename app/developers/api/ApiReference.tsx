import { Pill } from "@/components/ui";
import type { PillTone } from "@/components/ui/Pill";
import { apiGroups } from "@/lib/openapi/spec";

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
              {group.operations.map((op) => (
                <li key={op.slug}>
                  <a href={`#${op.slug}`} className={styles.navLink}>
                    <Pill tone={op.method as PillTone}>
                      {op.method.toUpperCase()}
                    </Pill>
                    <span className={styles.navPath}>
                      {op.path.replace(/^\/v1/, "") || "/"}
                    </span>
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
            <h2 id={`${group.slug}-title`} className={styles.groupTitle}>
              {group.title}
            </h2>
            {group.operations.map((op) => (
              <OperationBlock key={op.slug} op={op} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
