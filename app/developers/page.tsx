import type { Metadata } from "next";

import {
  Accent,
  AsideCard,
  Button,
  Card,
  Eyebrow,
  LinkCta,
  Note,
  PageHead,
  Section,
} from "@/components/ui";
import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
  SITE_ORIGIN,
  URL_GITHUB_ORG,
  URL_SDK_JS_NPM,
  URL_SDK_PY_PYPI,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

import { NetworkStatus } from "@/components/NetworkStatus";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build on Lineage: evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
  alternates: { canonical: "/developers" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Developers | Lineage",
    description:
      "Build on Lineage: evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
    url: `${SITE_ORIGIN}/developers`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developers | Lineage",
    description:
      "Build on Lineage: evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function DevelopersPage() {
  return (
    <>
      {/* PAGE HEAD */}
      <PageHead
        eyebrow="For developers"
        title={
          <>
            Build on <Accent>Lineage</Accent>
          </>
        }
        lead="Lineage is a Layer-1 where market policy itself is programmable. The network performs bounded search over policy space and verifies results cryptographically, so the mechanisms governing markets can evolve without changing the chain. Everything is open: evaluate the protocol against the whitepaper, clone the repos, and prototype."
        actions={
          <div className={styles.pageHeadActions}>
            <Button href="/docs" variant="primary">
              Read the docs
            </Button>
            <Button href={URL_GITHUB_ORG} variant="secondary" external>
              View GitHub
            </Button>
          </div>
        }
      />

      {/* CONNECT TO THE NETWORK */}
      <Section
        tone="band"
        eyebrow="Connect to the network"
        heading="Endpoints &amp; network status"
      >
        <p className={styles.sectionProse}>
          Everything you need to point a client at Lineage, in one place: the
          base URLs by node class, the current network status, and how to stand
          up your own stack.
        </p>
        <NetworkStatus />
        <div className={styles.split}>
          <div>
            <Note kicker="Network status">
              A managed public <strong>testnet</strong> is live at the base URLs
              below — the figures above read straight from it. A public{" "}
              <strong>mainnet</strong> will be announced here. You can also run
              your own mempool / storage / miner stack locally; the route names
              and JSON contracts are identical either way.
            </Note>
            <ul className={styles.endpointList}>
              <li className={styles.endpointItem}>
                <strong>Mempool</strong>
                <code>{DOCS_MEMPOOL_API_ORIGIN}</code>
                <span className={styles.endpointMuted}>
                  Transactions, balances, supply, and mempool metadata.
                </span>
              </li>
              <li className={styles.endpointItem}>
                <strong>Storage</strong>
                <code>{DOCS_STORAGE_API_ORIGIN}</code>
                <span className={styles.endpointMuted}>
                  Full blockchain history and block reads.
                </span>
              </li>
              <li className={styles.endpointItem}>
                <strong>Miner</strong>
                <code>{DOCS_MINER_API_ORIGIN}</code>
                <span className={styles.endpointMuted}>
                  Wallet, payments, and the current mining block.
                </span>
              </li>
            </ul>
          </div>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Run your own node</Eyebrow>
            <p className={styles.endpointMuted} style={{ marginBottom: "var(--space-4)" }}>
              Stand up a full mempool / storage / miner stack with Docker
              Compose using the <code>fleet</code> setup, then swap in your own
              base URL. The API surface is the same.
            </p>
            <ul className={styles.asideLinks}>
              <li>
                <LinkCta href="/docs#run-node">
                  Run a node · setup guide
                </LinkCta>
              </li>
              <li>
                <LinkCta href="https://github.com/lineage-foundation/fleet">
                  lineage-foundation/fleet
                </LinkCta>
              </li>
            </ul>
          </AsideCard>
        </div>
      </Section>

      {/* START HERE */}
      <Section eyebrow="Start here" heading="Three ways in">
        <p className={styles.sectionProse}>
          Pick the path that fits: learn the concepts, look up an endpoint, or
          pull in a client library and start sending transactions.
        </p>
        <div className={styles.grid3}>
          <Card rail kicker="Guides" title="Documentation">
            <p>
              Concepts, running a node, the quickstart, and SDK tutorials: the
              path from zero to your first transaction.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="/docs">Read the docs</LinkCta>
            </div>
          </Card>
          <Card rail kicker="Reference" title="API reference">
            <p>
              Every <code>/v1</code> endpoint, grouped by the node that serves
              it, with parameters, request and response shapes, and examples.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="/developers/api">Browse the API</LinkCta>
            </div>
          </Card>
          <Card rail kicker="Libraries" title="SDKs">
            <p>
              Official JavaScript and Python clients hold your keys locally,
              sign transactions, and talk to the API for you. PHP is coming.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="/docs#tut-overview">SDK tutorials</LinkCta>
              <LinkCta href={URL_SDK_JS_NPM}>sdk-js on npm</LinkCta>
              <LinkCta href={URL_SDK_PY_PYPI}>sdk-python on PyPI</LinkCta>
            </div>
          </Card>
        </div>
        <p
          className={styles.sectionProse}
          style={{ marginTop: "var(--space-6)" }}
        >
          New to the project? Read{" "}
          <a
            href={URL_ZENODO_WHITEPAPER}
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>Lineage: The Living Economy</em>
          </a>{" "}
          for the full specification, or browse every repository on{" "}
          <a href={URL_GITHUB_ORG} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </Section>


      {/* HAVE QUESTIONS */}
      <Section
        tone="band"
        eyebrow="Have questions?"
        heading="Where conversations live"
      >
        <p className={styles.sectionProse}>
          Specification and research questions live in the Fremen Forum (hosted
          on Discourse). Implementation questions belong in the repo issue
          trackers on GitHub.
        </p>
        <div className={styles.grid2}>
          <Card rail title="Fremen Forum">
            <p>
              Specification and research discussion for the protocol and its
              mechanisms.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="/research">Research &amp; forum</LinkCta>
            </div>
          </Card>
          <Card rail title="Issue trackers">
            <p>
              Implementation questions, bugs, and contributions on the open
              repositories.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={URL_GITHUB_ORG}>Open GitHub repos</LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA BAND */}
      <Section
        eyebrow="Start building"
        heading="Clone a repo. Read a route. Ship."
      >
        <p className={styles.sectionProse}>
          The protocol, the reference deployment, and the documentation are all
          open. Pick up the docs or jump straight into the source.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href="/docs" variant="primary">
            Read the docs
          </Button>
          <Button href={URL_GITHUB_ORG} variant="secondary" external>
            Browse GitHub
          </Button>
        </div>
      </Section>
    </>
  );
}
