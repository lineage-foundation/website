import Link from "next/link";

import { Accent, Button, Eyebrow } from "@/components/ui";
import { URL_GITHUB_ORG } from "@/lib/constants";

import styles from "./DocsHome.module.css";

/** Docs landing — mirrors the prototype docs page-head + section cards. */
const SECTIONS = [
  {
    title: "Concepts",
    href: "/docs/concepts",
    body: "Node roles, transactions, block mining, and how data moves through the Lineage network.",
  },
  {
    title: "API reference",
    href: "/docs/api/overview",
    body: "The public HTTP API — mempool, storage, and miner endpoints, with the shared request/response envelope.",
  },
  {
    title: "SDKs & tutorials",
    href: "/docs/tutorials-overview",
    body: "Build with 2Way.js, the Valence node and core, and end-to-end API walkthroughs.",
  },
  {
    title: "Run a node",
    href: "/docs/mining-overview",
    body: "Hardware requirements and step-by-step guides for installing and managing a mining node.",
  },
] as const;

export function DocsHome() {
  return (
    <div className={styles.home}>
      <Eyebrow>Documentation</Eyebrow>
      <h1 className={styles.title}>
        Build on the <Accent>Lineage</Accent> network
      </h1>
      <p className={styles.lead}>
        Read chain state, submit transactions, and query node metadata directly
        over HTTP — no smart contracts required. Move through node concepts, the
        mempool, storage, and miner reference, and the SDK tutorials using the
        contents on the left.
      </p>
      <div className={styles.actions}>
        <Button href="/docs/api-tutorials/get-started" variant="primary">
          API quick start
        </Button>
        <Button href={URL_GITHUB_ORG} variant="secondary" external>
          View source on GitHub
        </Button>
      </div>
      <div className={styles.cards}>
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className={styles.card}>
            <h2 className={styles.cardTitle}>{s.title}</h2>
            <p className={styles.cardBody}>{s.body}</p>
            <span className={styles.cardCta}>Open &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
