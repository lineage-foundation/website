import Link from "next/link";

import { Container } from "@/components/ui";
import {
  URL_DISCOURSE_RESEARCH,
  URL_GITHUB_ORG,
  URL_YOUTUBE_VIDEO,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.columns}>
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>Project</h2>
            <ul className={styles.list}>
              <li>
                <Link href="/learn">Technology</Link>
              </li>
              <li>
                <Link href="/tokenomics">Tokenomics</Link>
              </li>
              <li>
                <a
                  href={URL_ZENODO_WHITEPAPER}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Whitepaper
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>Community</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href={URL_GITHUB_ORG}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={URL_DISCOURSE_RESEARCH}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Discourse
                </a>
              </li>
              <li>
                <a
                  href={URL_YOUTUBE_VIDEO}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </section>

          <section className={styles.column}>
            <h2 className={styles.columnTitle}>Legal</h2>
            <p className={styles.legalLine}>
              &copy; {year}&nbsp;
              <Link href="/">Lineage Foundation</Link>
            </p>
          </section>
        </div>

        <div className={styles.meta}>Signal active · Genesis phase</div>
      </Container>
    </footer>
  );
}
