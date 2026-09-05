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
  URL_EXPLORER,
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

      {/* QUICKSTART */}
      <Section
        eyebrow="Quickstart"
        heading="Talk to a node in minutes"
      >
        <p className={styles.sectionProse}>
          Pick an HTTP client, point it at the public base URL for your node
          class, and call the documented <code>/v1</code> routes. Subsystems are
          exposed on separate hosts: mempool calls use the mempool host, storage
          reads use the storage host, and so on. Reads are plain{" "}
          <code>GET</code> requests and need no key — a minimal connectivity
          check is <code>GET /v1/blocks/latest</code>.
        </p>
        <div className={styles.split}>
          <CodeBlock lang="bash">{`# Read-only connectivity check — the latest stored block, no key required
curl -sS "${DOCS_STORAGE_API_ORIGIN}/v1/blocks/latest"

# UTXO balances for one or more addresses (repeat ?address= per address)
curl -sS "${DOCS_MEMPOOL_API_ORIGIN}/v1/balances?address=<address-1>&address=<address-2>"

# Example balances response
{
  "balance": {
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
              Route names and JSON contracts stay the same across deployments.
              Swap in your own base for a private, staging, or alternate network.
            </p>
            <LinkCta href="/developers/api">Full API reference</LinkCta>
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
          The public <code>/v1</code> API is organised by node class. Each
          subsystem is documented route by route, with full request and response
          JSON and RFC&nbsp;7807 <code>problem+json</code> errors.
        </p>
        <div className={styles.grid3}>
          <Card rail kicker={DOCS_MEMPOOL_API_ORIGIN} title="Mempool API">
            <p>
              Transactions, balances, supply, and mempool metadata: the write
              and query path for clients.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/balances</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>/v1/payments</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/supply</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>/v1/items</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/developers/api">Mempool reference</LinkCta>
            </div>
          </Card>

          <Card rail kicker={DOCS_STORAGE_API_ORIGIN} title="Storage API">
            <p>
              Full blockchain history. After blocks are mined and validated,
              they are persisted for long-term read access.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/blocks/latest</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/blocks/{"{num}"}</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/blockchain-entries/{"{key}"}</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/developers/api">Storage reference</LinkCta>
            </div>
          </Card>

          <Card rail kicker={DOCS_MINER_API_ORIGIN} title="Miner API">
            <p>
              The miner runs a coupled user node, so its host also serves a
              wallet and payments alongside the current mining block.
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/mining/current-block</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="get">GET</Pill>
                <code>/v1/wallet</code>
              </li>
              <li className={styles.pillRow}>
                <Pill tone="post">POST</Pill>
                <code>/v1/payments</code>
              </li>
            </ul>
            <div className={styles.cardCta}>
              <LinkCta href="/developers/api">Miner reference</LinkCta>
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
          Official clients wrap the same API: wallet creation, key management,
          asset issuance, two-way payments, and chain reads — and they handle
          transaction signing for you. Point each at a mempool base URL and a
          storage base URL, with a passphrase for local key encryption.
        </p>
        <div className={styles.grid3}>
          <Card rail kicker="JavaScript / TypeScript" title="sdk-js">
            <p>
              The client for browser and Node apps and wallets: create a wallet,
              issue items and assets, run two-way payments, send and receive.
              Drop-in for web front-ends and Valence servers.
            </p>
            <CodeBlock lang="shell">npm i @lineage-foundation/sdk-js</CodeBlock>
            <div className={styles.cardCta}>
              <LinkCta href={URL_SDK_JS_NPM}>@lineage-foundation/sdk-js on npm</LinkCta>
              <LinkCta href="https://github.com/lineage-foundation/sdk-js">
                lineage-foundation/sdk-js
              </LinkCta>
            </div>
          </Card>

          <Card rail kicker="Python" title="sdk-python">
            <p>
              The client for backends, data tooling, and automation: key
              management, balance and supply reads, transaction construction, and
              two-way flows, the same surface as <code>sdk-js</code>, idiomatic
              for Python services and notebooks.
            </p>
            <CodeBlock lang="shell">pip install lineage-sdk</CodeBlock>
            <div className={styles.cardCta}>
              <LinkCta href={URL_SDK_PY_PYPI}>lineage-sdk on PyPI</LinkCta>
              <LinkCta href="https://github.com/lineage-foundation/sdk-python">
                lineage-foundation/sdk-python
              </LinkCta>
            </div>
          </Card>

          <Card rail kicker="PHP" title="sdk-php">
            <Pill tone="soon">Coming soon</Pill>
            <p>
              A server-side client for PHP web stacks — wallet creation, asset
              issuance, payments, and chain reads — is planned. It is not yet
              published against the current API.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="https://github.com/lineage-foundation/sdk-php">
                lineage-foundation/sdk-php
              </LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* FIRST PAYMENT */}
      <Section
        tone="band"
        eyebrow="Quickstart"
        heading="Send your first payment"
      >
        <p className={styles.sectionProse}>
          The SDK keeps your keys local, signs transactions for you, and submits
          them to the mempool — so the whole flow is a handful of calls. Point
          the client at the mempool base URL with a passphrase for local key
          encryption; balances and submitted transactions go through that host.
        </p>
        <div className={styles.split}>
          <CodeBlock lang="javascript">{`import { Wallet } from '@lineage-foundation/sdk-js';

const wallet = new Wallet();

// 1. Create a wallet — store the returned seed phrase safely.
const res = await wallet.initNew({
  mempoolHost: '${DOCS_MEMPOOL_API_ORIGIN}',
  passphrase: 'a secure passphrase',
});
console.log(res.content.initNewResponse.seedphrase);

// 2. Generate an address to receive funds.
const keypair = wallet.getNewKeypair([]).content.newKeypairResponse;
console.log(keypair.address);

// 3. Once funded, check the balance.
const bal = await wallet.fetchBalance([keypair.address]);
console.log(bal.content.fetchBalanceResponse.total);

// 4. Send a payment — change returns to your own keypair.
const receipt = await wallet.makeTokenPayment(
  'recipient-address',
  1000,
  [keypair],
  keypair,
);
// receipt carries the transaction hash, amount, and addresses used
console.log(receipt);`}</CodeBlock>
          <AsideCard>
            <Eyebrow className={styles.asideEyebrow}>Get testnet funds</Eyebrow>
            <p className={styles.endpointMuted} style={{ marginTop: 0 }}>
              There is no public faucet yet. Generate an address (step 2), then
              send it to the team to be seeded — or, if you run your own node,
              request a donation from a funded peer over{" "}
              <code>POST /v1/donation-requests</code>.
            </p>
            <p className={styles.endpointMuted}>
              Every address payment returns a transaction hash. Look it up on
              the block explorer to watch it confirm.
            </p>
            <LinkCta href={URL_EXPLORER}>Open the explorer</LinkCta>
            <LinkCta href="/developers/api">Full API reference</LinkCta>
          </AsideCard>
        </div>
        <p
          className={styles.sectionProse}
          style={{ marginTop: "var(--space-6)" }}
        >
          The Python client mirrors the same flow:
        </p>
        <CodeBlock lang="python">{`from lineage.wallet import Wallet

wallet = Wallet()

# 1. Load your wallet from its seed phrase.
wallet.from_seed(seed_phrase, {
    'mempoolHost': '${DOCS_MEMPOOL_API_ORIGIN}',
    'passphrase': 'your-secure-passphrase',
})

# 2. The address to receive funds.
address = wallet.get_address()
print(address)

# 3. Once funded, check the balance.
balance = wallet.fetch_balance([address])
if balance.is_ok:
    print(balance.get_ok())

# 4. Send a payment.
receipt = wallet.create_transactions(
    destination_address='recipient-address',
    amount=1000,
)
if receipt.is_ok:
    print(receipt.get_ok())`}</CodeBlock>
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
              Read <em>Lineage: The Living Economy</em>, the full technical and
              economic specification archived on Zenodo, alongside the concepts
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
