import type { Metadata } from "next";

import {
  Accent,
  AsideCard,
  Button,
  Card,
  CodeBlock,
  Eyebrow,
  LinkCta,
  Note,
  PageHead,
  Pill,
  Section,
} from "@/components/ui";
import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
  SITE_ORIGIN,
  URL_GITHUB_ORG,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
  alternates: { canonical: "/developers" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Developers | Lineage",
    description:
      "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
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
      "Build on Lineage — evaluate the protocol, clone the repos, and prototype against a Layer-1 where market policy is programmable.",
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
        lead="Lineage is a Layer-1 where market policy itself is programmable. The network performs bounded search over policy space and verifies results cryptographically — so the mechanisms governing markets can evolve without changing the chain. Everything is open: evaluate the protocol against the whitepaper, clone the repos, and prototype."
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
        <div className={styles.split}>
          <div>
            <Note kicker="Network status">
              A managed public <strong>mainnet</strong> and{" "}
              <strong>testnet</strong> are being ported and will be announced
              here soon. Until then, point a client at the base URLs below, or
              run your own mempool / storage / miner stack locally — the route
              names and JSON contracts are identical either way.
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
                  Operator-facing status where a release exposes it.
                </span>
              </li>
            </ul>
          </div>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Run your own node</Eyebrow>
            <p className={styles.endpointMuted} style={{ marginBottom: "var(--space-4)" }}>
              Stand up a full mempool / storage / miner stack with Docker
              Compose using the <code>fleet</code> setup, then swap in your own
              base URL — the API surface is the same.
            </p>
            <ul className={styles.asideLinks}>
              <li>
                <LinkCta href="/docs#run-node">
                  Run a node — setup guide
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

      {/* QUICKSTART */}
      <Section
        eyebrow="Quickstart"
        heading="Talk to a node in minutes"
      >
        <p className={styles.sectionProse}>
          Pick an HTTP client, point it at the public base URL for your node
          class, and call the documented routes. Subsystems are exposed on
          separate hosts — mempool calls use the mempool host, storage reads use
          the storage host, and so on. A minimal connectivity check is a
          read-only call such as <code>fetch_balance</code>.
        </p>
        <div className={styles.split}>
          <CodeBlock lang="bash">{`# Read-only connectivity check against the mempool host
curl -sS -X POST "${DOCS_MEMPOOL_API_ORIGIN}/fetch_balance" \\
  -H "Content-Type: application/json" \\
  -H "x-cache-id: 0123456789abcdef0123456789abcdef" \\
  -d '["<address-1>"]'

# Example success envelope
{
  "id": "45v340cd2f8c4782a5b058832565afb1",
  "status": "Success",
  "reason": "Balance successfully fetched",
  "route":  "fetch_balance",
  "content": {
    "total": { "tokens": 5463669, "items": {} },
    "address_list": {
      "<address>": [
        { "out_point": { "t_hash": "g9182e1e2a55b0ef36f1183602d74e63", "n": 0 },
          "value": { "Token": 5463669 } }
      ]
    }
  }
}`}</CodeBlock>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Public base URLs</Eyebrow>
            <ul className={styles.endpointList} style={{ marginTop: 0 }}>
              <li className={styles.endpointItem}>
                <strong>Mempool</strong>
                <code>{DOCS_MEMPOOL_API_ORIGIN}</code>
              </li>
              <li className={styles.endpointItem}>
                <strong>Storage</strong>
                <code>{DOCS_STORAGE_API_ORIGIN}</code>
              </li>
              <li className={styles.endpointItem}>
                <strong>Miner</strong>
                <code>{DOCS_MINER_API_ORIGIN}</code>
              </li>
            </ul>
            <p
              className={styles.endpointMuted}
              style={{ margin: "var(--space-5) 0 var(--space-4)" }}
            >
              Route names and JSON contracts stay the same across deployments —
              swap in your own base for a private, staging, or alternate network.
            </p>
            <LinkCta href="/docs">API quick start</LinkCta>
          </AsideCard>
        </div>
      </Section>

      {/* THREE NODE SUBSYSTEMS */}
      <Section
        tone="band"
        eyebrow="HTTP API"
        heading="Three node subsystems"
      >
        <p className={styles.sectionProse}>
          The public HTTP API is organised by node class. Each subsystem is
          documented route by route — full request and response JSON, including
          the standard error envelope.
        </p>
        <div className={styles.grid3}>
          <Card rail kicker={DOCS_MEMPOOL_API_ORIGIN} title="Mempool API">
            <p>
              Transactions, balances, supply, and mempool metadata — the write
              and query path for clients.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>fetch_balance</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>create_transactions</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>total_supply</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>create_item_asset</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/docs">Mempool reference</LinkCta>
            </div>
          </Card>

          <Card rail kicker={DOCS_STORAGE_API_ORIGIN} title="Storage API">
            <p>
              Full blockchain history. After blocks are mined and validated,
              they are persisted for long-term read access.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>latest_block</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>block_by_num</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>blockchain_entry</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/docs">Storage reference</LinkCta>
            </div>
          </Card>

          <Card rail kicker={DOCS_MINER_API_ORIGIN} title="Miner API">
            <p>
              Operator-facing HTTP where a release exposes it — a small surface
              compared to mempool and storage.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>info</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/docs">Miner reference</LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* CLIENT SDKs */}
      <Section
        eyebrow="Client SDKs"
        heading="Skip the raw HTTP"
      >
        <p className={styles.sectionProse}>
          Three official clients wrap the same API — wallet creation, key
          management, asset issuance, two-way payments, and chain reads.
          Configure each with a mempool base URL, a storage base URL, and a
          passphrase for local key encryption.
        </p>
        <div className={styles.grid3}>
          <Card rail kicker="JavaScript / TypeScript" title="sdk-js">
            <p>
              The client for browser and Node apps and wallets: create a wallet,
              issue items and assets, run two-way payments, send and receive.
              Drop-in for web front-ends and Valence servers.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="https://github.com/lineage-foundation/sdk-js">
                lineage-foundation/sdk-js
              </LinkCta>
            </div>
          </Card>

          <Card rail kicker="Python" title="sdk-python">
            <p>
              The client for backends, data tooling, and automation: key
              management, balance and supply reads, transaction construction, and
              two-way flows — the same surface as <code>sdk-js</code>, idiomatic
              for Python services and notebooks.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="https://github.com/lineage-foundation/sdk-python">
                lineage-foundation/sdk-python
              </LinkCta>
            </div>
          </Card>

          <Card rail kicker="PHP" title="sdk-php">
            <p>
              The client for server-side web stacks: wallet creation, asset
              issuance, payments, and chain reads from within PHP applications
              and CMS integrations.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="https://github.com/lineage-foundation/sdk-php">
                lineage-foundation/sdk-php
              </LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* DEVELOPER PATHS */}
      <Section
        eyebrow="Developer paths"
        heading="Where to start"
      >
        <div className={styles.split}>
          <div className={styles.proseSection}>
            <h3>Evaluate the protocol</h3>
            <p>
              Read <em>Lineage: The Living Economy</em> — the full technical and
              economic specification, archived on Zenodo — alongside the concepts
              in the docs to understand how bounded policy search and
              cryptographic verification fit together.
            </p>
            <h3>Clone the repos</h3>
            <p>
              Every repository is open for review, issues, and contributions.
              The code that ships with the project lives on the Lineage
              Foundation GitHub organisation.
            </p>
            <h3>Prototype against the API</h3>
            <p>
              Start with small, read-only calls from the storage or mempool
              sections of the reference to confirm connectivity, then move on to
              transactions. Each endpoint page documents the exact request and
              response contract.
            </p>
          </div>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Source material</Eyebrow>
            <ul className={styles.asideLinks}>
              <li>
                <LinkCta href="/docs">Developer documentation</LinkCta>
                <span className={styles.asideSubtext}>
                  Concepts, HTTP API reference, tutorials, and mining guides.
                </span>
              </li>
              <li>
                <LinkCta href={URL_GITHUB_ORG}>GitHub organisation</LinkCta>
                <span className={styles.asideSubtext}>
                  Every repository, open for review and contributions.
                </span>
              </li>
              <li>
                <LinkCta href={URL_ZENODO_WHITEPAPER}>
                  Whitepaper on Zenodo
                </LinkCta>
                <span className={styles.asideSubtext}>
                  The full technical and economic specification.
                </span>
              </li>
            </ul>
          </AsideCard>
        </div>
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
