import type { Metadata } from "next";

import { Button, CodeBlock, Container, Eyebrow, LinkCta, Pill, Table } from "@/components/ui";
import { DocsScroll } from "@/components/docs/DocsScroll";
import { SITE_ORIGIN, URL_EXPLORER, URL_GITHUB_ORG } from "@/lib/constants";

import styles from "./docs.module.css";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Lineage documentation: node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
  alternates: { canonical: "/docs" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Documentation | Lineage",
    description:
      "Lineage documentation: node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
    url: `${SITE_ORIGIN}/docs`,
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
    title: "Documentation | Lineage",
    description:
      "Lineage documentation: node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

export default function DocsPage() {
  return (
    <>
      <DocsScroll />

      {/* ===================== PAGE HEAD ===================== */}
      <section className={styles.pageHead}>
        <Container width="docs">
          <div className={styles.pageHeadInner}>
            <Eyebrow className={styles.eyebrow}>Documentation</Eyebrow>
            <h1 className={styles.pageTitle}>
              Build on the <span className={styles.accent}>Lineage</span> HTTP API
            </h1>
            <p className={styles.pageLead}>
              Read chain state, submit transactions, and query node metadata directly over HTTP. No smart contracts required. Move through node concepts, the mempool, storage, and miner reference, and the SDK tutorials using the contents tree.
            </p>
            <div className={styles.pageHeadActions}>
              <Button href="#quick-start" variant="primary">
                API quick start
              </Button>
              <Button href={URL_GITHUB_ORG} variant="secondary" external>
                View source on GitHub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== DOCS SHELL ===================== */}
      <section>
        <Container width="docs">
          <div className={styles.docs}>

            {/* LEFT NAV TREE (collapsible under 980px) */}
            <details className={styles.docsToc} data-docs-toc open>
              <summary>Contents</summary>
              <nav className={styles.docsNav} data-docs-nav aria-label="Documentation">
                <h2>Getting Started</h2>
                <ul>
                  <li><a href="#overview">Overview</a></li>
                  <li><a href="#service-urls">Public service URLs</a></li>
                  <li><a href="#envelope">Request &amp; response envelope</a></li>
                  <li><a href="#quick-start">API quick start</a></li>
                </ul>

                <h2>Concepts</h2>
                <ul>
                  <li><a href="#c-node-types">Node types</a></li>
                  <li><a href="#c-mempool">Mempool node</a></li>
                  <li><a href="#c-storage">Storage node</a></li>
                  <li><a href="#c-miner">Miner node</a></li>
                  <li><a href="#c-block-mining">Block mining</a></li>
                  <li><a href="#c-transactions">Transactions</a></li>
                  <li><a href="#c-two-way">Two-way transactions</a></li>
                  <li><a href="#c-unicorn">UNiCORN randomness</a></li>
                </ul>

                <h2>API</h2>
                <ul>
                  <li><a href="#api-reference">API reference</a></li>
                </ul>

                <h2>SDKs &amp; tutorials</h2>
                <ul>
                  <li><a href="#tut-overview">Overview</a></li>
                  <li><a href="#tut-first-payment">Send your first payment</a></li>
                  <li><a href="#sdk-js">sdk-js</a></li>
                  <li><a href="#sdk-python">sdk-python</a></li>
                  <li><a href="#sdk-php">sdk-php</a></li>
                  <li><a href="#tut-valence">Valence node &amp; core</a></li>
                  <li><a href="#tut-api-usage">API usage</a></li>
                  <li><a href="#run-node">Running a node</a></li>
                </ul>
              </nav>
            </details>

            {/* MAIN CONTENT */}
            <div className={styles.docsMain} data-docs-main>
              <p className={styles.crumbs}>Documentation / <span id="docs-crumb">Overview</span></p>
              <h1>Lineage HTTP API</h1>

              {/* ============ GETTING STARTED ============ */}
              <article id="overview" className={styles.prose}>
                <p>
                  The Lineage HTTP API lets you integrate with the network directly: read chain
                  state, submit transactions, and query node metadata. None of the flows in this
                  documentation require on-chain smart contracts. Use a plain HTTP client
                  (<code>curl</code>, <code>fetch</code>, or your language of choice) against the
                  endpoints listed under each subsystem.
                </p>
                <p>
                  Routes are grouped by <strong>node class</strong>. Each class is served from its
                  own origin, so confirm which host a route belongs to before you call it, as
                  sending a storage read to the mempool host (or vice versa) will not resolve.
                </p>

                <h2 id="service-urls">Public service URLs</h2>
                <p>
                  These are the public <strong>testnet</strong> hosts used in every
                  example below. They point to the live testnet; a mainnet will be
                  announced separately.
                </p>
                <Table>
                  <thead>
                    <tr><th scope="col">Node class</th><th scope="col">Base URL (testnet)</th><th scope="col">Use for</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Mempool</td><td className="num">https://mempool.lineage.to</td><td>Transactions, balances, supply, mempool metadata</td></tr>
                    <tr><td>Storage</td><td className="num">https://storage.lineage.to</td><td>Blocks, chain entries, read-oriented history</td></tr>
                    <tr><td>Miner</td><td className="num">https://miner.lineage.to</td><td>Wallet, payments, and current mining block (coupled user node)</td></tr>
                  </tbody>
                </Table>

                <h2 id="envelope">Requests &amp; responses</h2>
                <p>
                  The API is REST over HTTPS under <code>/v1</code>. Resources use standard verbs —
                  <code>GET</code> to read, <code>POST</code> to create or submit — with JSON request
                  and response bodies. Routes that require authorization take an
                  <code>x-api-key</code> header; read-only routes are public.
                </p>
                <p>
                  Errors use <code>application/problem+json</code> (RFC 7807): an HTTP status with
                  <code>title</code> and <code>detail</code> fields and a <code>request_id</code> for
                  correlation.
                </p>
                <CodeBlock lang="json">{`{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "No block at that height",
  "request_id": "5eDtVyHFTE-6Fn2-21mRUA"
}`}</CodeBlock>

                <h2 id="quick-start">API quick start</h2>
                <p>
                  Point your HTTP client at a node&apos;s base URL and verify connectivity with a
                  read-only <code>/v1</code> route before sending anything that writes. A good first
                  call is the chain head on the storage host.
                </p>
                <CodeBlock lang="shell">{`# check the chain head
curl -sS "https://storage.lineage.to/v1/blocks/latest"`}</CodeBlock>
                <div className="note">
                  <span className="note-k">Note</span>
                  Browse every operation, with its request and response shapes, in the{" "}
                  <a href="/developers/api">API reference</a>. The SDKs below wrap the same
                  API and handle transaction signing for you.
                </div>
              </article>

              {/* ============ CONCEPTS ============ */}
              <article id="c-node-types" className={styles.prose}>
                <h2>Node types</h2>
                <p>
                  Lineage separates three roles so that <em>who assembles a block</em>, <em>who stores
                  history</em>, and <em>who expends hashrate this round</em> are independent jobs.
                  <strong>Mempool nodes</strong> collect transactions and coordinate validation;
                  <strong>miner nodes</strong> perform proof-of-work to produce block candidates and
                  earn rewards; <strong>storage nodes</strong> retain full chain history and serve
                  reads to clients. The split enables fast settlement, geographic resilience, and
                  specialised hardware without forcing archival storage on every participant.
                </p>
              </article>

              <article id="c-mempool" className={styles.prose}>
                <h2>Mempool node</h2>
                <p>
                  A bounded set of long-lived components that accept user transactions, batch them into
                  blocks, and work with the mining network. Each round, the mempool set advances valid
                  transactions, agrees on ordering within protocol rules, hands a candidate to miners,
                  then validates the winner&apos;s block and forwards it to storage. Mempool and miner
                  responsibilities are interdependent, and both must make progress for the chain to
                  advance.
                </p>
              </article>

              <article id="c-storage" className={styles.prose}>
                <h2>Storage node</h2>
                <p>
                  Keeps full chain history, receives valid blocks (typically along the mempool path),
                  and replicates them for durability and API consumers. Its core job is persisting
                  blocks and building indices for header, transaction-id, and proof lookups.
                  Distributed consensus between storage operators keeps replicas agreeing on the same
                  head, and witness data is preserved so light clients and auditors can re-check
                  proofs.
                </p>
              </article>

              <article id="c-miner" className={styles.prose}>
                <h2>Miner node</h2>
                <p>
                  Miners compete to extend the chain when it is their turn. They receive work units
                  from the mempool, find valid proofs, and return them so the mempool declares a winner
                  and forwards the block to storage. The protocol does not require every miner to grind
                  on the same block simultaneously; a subset is selected each round, keeping energy use
                  proportionate. Rewards follow the network&apos;s token rules once a block is accepted.
                </p>
              </article>

              <article id="c-block-mining" className={styles.prose}>
                <h2>Block mining</h2>
                <p>
                  Producing a block is a multi-step collaboration: (1) client transactions are queued by
                  the mempool; (2) when a round starts, a block body is built from the queue and offered
                  to selected miners; (3) miners produce proofs and return candidates; (4) the mempool
                  picks a winner, validates the block, and sends it to storage. A single per-round
                  randomness object (a UNiCORN), derived from agreed inputs such as the transactions,
                  the eligible miner set, and prior-round metadata, drives who may mine and who wins.
                </p>
              </article>

              <article id="c-transactions" className={styles.prose}>
                <h2>Transactions</h2>
                <p>
                  Lineage uses a <strong>UTXO model</strong>: a transaction spends one or more previous
                  outputs and creates new outputs that a later spend can refer to. There is no global
                  account balance in the contract layer; a balance is a view over unspent outputs.
                  Each input points at a previous transaction hash and output index with a script
                  proving spend authorisation; each output states a locked value and its script (for
                  example pay-to-pubkey-hash). Transactions carry a version and optional
                  application-specific data (such as DRUID or item metadata) that higher layers
                  interpret.
                </p>
              </article>

              <article id="c-two-way" className={styles.prose}>
                <h2>Two-way transactions</h2>
                <p>
                  A two-way transaction lets two parties each contribute compatible halves to a single
                  block, so an exchange or payment clears atomically without a smart-contract runtime.
                  It is the mechanism for flows where both sides must sign before either side&apos;s funds
                  move. Wallets and SDKs hide most of the wiring.
                </p>
              </article>

              <article id="c-unicorn" className={styles.prose}>
                <h2>UNiCORN randomness</h2>
                <p>
                  A UNiCORN, an <strong>UN-COntestable Random Number</strong>, is a
                  randomness-and-witness object generated so that no single participant can steer it toward
                  anything but a random result. It depends on the transactions in the block, which miners
                  are eligible, and recent chain state, so winner selection is hard to bias without breaking
                  consensus. The protocol uses it to restrict which miners may attempt work in a round, to
                  choose the winning valid proof, and to supply the data storage nodes re-check during
                  validation.
                </p>
              </article>

              {/* ============ API REFERENCE ============ */}
              <article id="api-reference" className={styles.prose}>
                <h2>API reference</h2>
                <p>
                  The full <code>/v1</code> REST API — reading chain state, submitting
                  transactions, and querying balances, supply, blocks, and wallet operations —
                  is documented endpoint by endpoint, grouped by the node that serves each one.
                </p>
                <p>
                  <a href="/developers/api">Open the API reference</a>, or download the full
                  OpenAPI document at <code>/openapi.json</code> to import into Postman or any
                  OpenAPI tool. Each node also serves its own subset at{" "}
                  <code>/v1/openapi.json</code> (for example{" "}
                  <code>https://storage.lineage.to/v1/openapi.json</code>).
                </p>
              </article>

              {/* ============ TUTORIALS & SDKs ============ */}
              <article id="tut-overview" className={styles.prose}>
                <h2>SDKs &amp; tutorials</h2>
                <p>
                  Beyond the raw endpoint reference, Lineage ships official client libraries in three
                  languages plus node tooling. The full walkthroughs and runnable code live in the
                  {" "}<a href="https://github.com/lineage-foundation" target="_blank" rel="noopener noreferrer">published repositories</a>;
                  the cards below summarise each SDK and where it fits. All three wrap the same HTTP API
                  documented above; configure each with a mempool base URL, a storage base URL, and a
                  passphrase for local key encryption.
                </p>

                <h3>Install</h3>
                <p>Add the client for your stack.</p>
                <CodeBlock lang="shell">{`# JavaScript / TypeScript
npm install @lineage-foundation/sdk-js

# Python (imports as \`lineage\`)
pip install lineage-sdk

# PHP — coming soon`}</CodeBlock>

                <h3>First call</h3>
                <p>Create a <code>Wallet</code>, point it at a mempool host with a passphrase for local key encryption, and initialise a new keypair. <code>initNew</code> returns the generated seed phrase. Store it securely; it is the only way to recover the wallet.</p>
                <CodeBlock lang="javascript">{`import { Wallet } from '@lineage-foundation/sdk-js';

const wallet = new Wallet();

const CONFIG = {
  mempoolHost: 'https://mempool.lineage.to',
  passphrase: 'a secure passphrase',
};

wallet.initNew(CONFIG).then((res) => {
  console.log(res.content.initNewResponse.seedphrase);
});`}</CodeBlock>

                <h3 id="tut-first-payment">Send your first payment</h3>
                <p>
                  The SDK keeps your keys local, signs transactions for you, and submits them to
                  the mempool, so the whole flow is a handful of calls. There is no public faucet
                  yet: generate an address, then send it to the team to be seeded, or, if you run
                  your own node, request a donation from a funded peer over{" "}
                  <code>POST /v1/donation-requests</code>. Every address payment returns a
                  transaction hash you can follow on the{" "}
                  <a href={URL_EXPLORER} target="_blank" rel="noopener noreferrer">block explorer</a>.
                </p>
                <CodeBlock lang="javascript">{`import { Wallet } from '@lineage-foundation/sdk-js';

const wallet = new Wallet();

// 1. Create a wallet — store the returned seed phrase safely.
const res = await wallet.initNew({
  mempoolHost: 'https://mempool.lineage.to',
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
                <p>The Python client mirrors the same flow:</p>
                <CodeBlock lang="python">{`from lineage.wallet import Wallet

wallet = Wallet()

# 1. Load your wallet from its seed phrase.
wallet.from_seed(seed_phrase, {
    'mempoolHost': 'https://mempool.lineage.to',
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

                <div className="doc-cards">
                  <div className="doc-card" id="sdk-js">
                    <h3>sdk-js</h3>
                    <p>The JavaScript / TypeScript client for browser and Node apps and wallets: create a wallet, create items and assets, run two-way payments, send and receive. Drop-in for web front-ends and Valence servers.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-js" external>lineage-foundation/sdk-js</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-python">
                    <h3>sdk-python</h3>
                    <p>The Python client for backends, data tooling, and automation: key management, balance and supply reads, transaction construction, and two-way flows. It covers the same surface as <code>sdk-js</code>, idiomatic for Python services and notebooks.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-python" external>lineage-foundation/sdk-python</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-php">
                    <h3>sdk-php <Pill tone="soon">Coming soon</Pill></h3>
                    <p>A PHP client for server-side web stacks — wallet creation, asset issuance, payments, and chain reads — is planned. It is not yet published against the current API.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-php" external>lineage-foundation/sdk-php</LinkCta>
                  </div>
                  <div className="doc-card" id="tut-valence">
                    <h3>Valence node &amp; core</h3>
                    <p>The application-server pattern. <strong>Valence node</strong> exposes HTTP routes (health checks, JSON forwarding, optional static/webhook endpoints); <strong>Valence core</strong> is the embeddable part with lifecycle hooks and plugin registration. Plugins add application behaviour but never change chain rules.</p>
                    <LinkCta href="https://github.com/lineage-foundation" external>Repositories</LinkCta>
                  </div>
                  <div className="doc-card" id="tut-api-usage">
                    <h3>API usage</h3>
                    <p>A guided order of operations for calling the public HTTP API directly: pick a node class, verify connectivity with a read-only route, then move on to writes. Start from the <a href="#quick-start">quick start</a> above.</p>
                    <LinkCta href="#service-urls">Service URLs</LinkCta>
                  </div>
                </div>
              </article>

              {/* ============ RUNNING A NODE ============ */}
              <article id="run-node" className={styles.prose}>
                <h2>Running a node</h2>
                <p>
                  The fastest way to stand up a full Lineage stack (mempool, storage, and miner) is the
                  {" "}<a href="https://github.com/lineage-foundation/fleet" target="_blank" rel="noopener noreferrer">lineage-foundation/fleet</a>
                  {" "}repository, which ships a Docker Compose stack and a from-source build. The steps below
                  mirror its README.
                </p>

                <h3>Prerequisites</h3>
                <p>A recent Rust toolchain and the Linux build dependencies. On Ubuntu:</p>
                <CodeBlock lang="shell">{`sudo apt-get update && sudo apt-get install -y \\
  build-essential m4 llvm libclang-dev clang cmake pkg-config \\
  git curl python3 libglfw3-dev libxrandr-dev libxinerama-dev \\
  libxcursor-dev libxi-dev`}</CodeBlock>
                <CodeBlock lang="shell">{`# install Rust
curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
rustc --version`}</CodeBlock>

                <h3>Docker Compose (recommended)</h3>
                <p>Build and start the full multi-node stack from the repo root:</p>
                <CodeBlock lang="shell">{`docker compose build
docker compose up`}</CodeBlock>
                <p>This brings up three services:</p>
                <Table>
                  <thead>
                    <tr><th scope="col">Service</th><th scope="col">Port</th><th scope="col">Notes</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Mempool</td><td className="num">3003</td><td>HTTP API</td></tr>
                    <tr><td>Storage</td><td className="num">3001</td><td>Read / history</td></tr>
                    <tr><td>Miner</td><td className="num">—</td><td>Starts after mempool &amp; storage</td></tr>
                  </tbody>
                </Table>
                <p>
                  Node configuration is read from <code>./.docker/conf/node_settings.toml</code>
                  {" "}(mounted to <code>/etc/node_settings.toml</code>). Point at a different file with the
                  {" "}<code>NODE_SETTINGS</code> override:
                </p>
                <CodeBlock lang="shell">NODE_SETTINGS=/absolute/path/to/node_settings.toml docker compose up</CodeBlock>
                <p>On Apple Silicon, select the ARM platform (default is <code>linux/amd64</code>):</p>
                <CodeBlock lang="shell">FLEET_COMPOSE_PLATFORM=linux/arm64 docker compose up</CodeBlock>
                <p>Rebuild a single service, or tear the stack down and remove volumes:</p>
                <CodeBlock lang="shell">{`docker compose build mempool-node
docker compose down -v`}</CodeBlock>

                <h3>Build from source</h3>
                <CodeBlock lang="shell">{`cargo build --release
cargo test`}</CodeBlock>
                <p>Or build just the container image (distroless <code>cc-debian13</code>, runs as <code>nonroot</code>; binary at <code>/lineage/lineage</code>):</p>
                <CodeBlock lang="shell">docker build -t fleet-node:local --platform linux/amd64 .</CodeBlock>
                <div className="note">
                  <span className="note-k">Contributing</span>
                  Base work on an updated <code>main</code> and open PRs against it, following Conventional
                  Commits (<code>feat</code>, <code>fix</code>, <code>docs</code>, <code>chore</code>,
                  {" "}<code>refactor</code>, <code>test</code>, <code>ci</code>, <code>perf</code>; mark breaking
                  changes with a <code>!</code> suffix). Full details in the
                  {" "}<a href="https://github.com/lineage-foundation/fleet" target="_blank" rel="noopener noreferrer">fleet README</a>.
                </div>
              </article>

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
