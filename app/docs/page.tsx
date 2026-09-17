import type { Metadata } from "next";

import { Button, CodeBlock, Container, Eyebrow, LinkCta, Table } from "@/components/ui";
import { DocsScroll } from "@/components/docs/DocsScroll";
import {
  SITE_ORIGIN,
  TWITTER_META,
  URL_EXPLORER,
  URL_GITHUB_ORG,
  URL_MCP_SERVER,
  URL_SKILLS,
} from "@/lib/constants";

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
        url: "/images/open-graph-lineage-v2-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage Foundation",
      },
    ],
  },
  twitter: {
    ...TWITTER_META,
    title: "Documentation | Lineage",
    description:
      "Lineage documentation: node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
    images: ["/images/open-graph-lineage-v2-1200x630.png"],
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

                <h2>Concepts &mdash; Data &amp; transactions</h2>
                <ul>
                  <li><a href="#c-data-model">Data model</a></li>
                  <li><a href="#c-keys">Keys, addresses &amp; wallets</a></li>
                  <li><a href="#c-transactions">Transactions</a></li>
                  <li><a href="#c-scripts">Scripts</a></li>
                  <li><a href="#c-two-way">Two-way transactions</a></li>
                </ul>

                <h2>Concepts &mdash; Network &amp; consensus</h2>
                <ul>
                  <li><a href="#c-node-types">Node types</a></li>
                  <li><a href="#c-mempool">Mempool node</a></li>
                  <li><a href="#c-storage">Storage node</a></li>
                  <li><a href="#c-miner">Miner node</a></li>
                  <li><a href="#c-block-mining">Consensus &amp; the block round</a></li>
                  <li><a href="#c-unicorn">UNiCORN randomness</a></li>
                </ul>

                <h2>API</h2>
                <ul>
                  <li><a href="#api-reference">API reference</a></li>
                  <li><a href="#mcp-server">MCP server</a></li>
                  <li><a href="#ai-skills">AI Skills</a></li>
                </ul>

                <h2>SDKs &amp; tutorials</h2>
                <ul>
                  <li><a href="#tut-overview">Overview</a></li>
                  <li><a href="#tut-first-payment">Send your first payment</a></li>
                  <li><a href="#sdk-js">sdk-js</a></li>
                  <li><a href="#sdk-python">sdk-python</a></li>
                  <li><a href="#sdk-go">sdk-go</a></li>
                  <li><a href="#sdk-rust">sdk-rust</a></li>
                  <li><a href="#sdk-php">sdk-php</a></li>
                  <li><a href="#sdk-laravel">sdk-laravel</a></li>
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

              {/* ============ CONCEPTS: DATA & TRANSACTIONS ============ */}
              <article id="c-data-model" className={styles.prose}>
                <h2>Data model</h2>
                <p>
                  Lineage is a <strong>UTXO ledger</strong>, in the Bitcoin lineage rather than an
                  account/EVM model. There is no stored account balance anywhere in the protocol;
                  a balance is a view computed over the set of transaction outputs an address has
                  not yet spent. Every payment consumes one or more existing outputs and creates
                  new ones for the next spend to reference (see <a href="#c-transactions">Transactions</a>).
                </p>
                <p>
                  Every value a transaction moves is an <code>Asset</code>, and an asset is one of
                  exactly two kinds:
                </p>
                <ul>
                  <li><code>Token(amount)</code> &mdash; a plain integer quantity of the native token.</li>
                  <li>
                    <code>Item {`{ amount, genesis_hash, metadata }`}</code> &mdash; a fungible-by-type
                    asset class. <code>genesis_hash</code> is the id stamped when the item is first
                    created (its minting transaction); <code>metadata</code> is an optional string,
                    capped at 800 bytes.
                  </li>
                </ul>
                <p>
                  The native token&apos;s brand name is <strong>LNGX</strong> &mdash; that&apos;s a
                  network/brand identifier, not something the node code itself knows about; on the
                  wire and in node source, it is only ever the integer <code>Token</code> amount.
                  Display values divide that raw integer by a fixed base-unit divisor of{" "}
                  <strong>72,072,000</strong>, and the protocol enforces a hard supply cap of{" "}
                  72,072,000 &times; 5,000,000,000 raw units &mdash; 5,000,000,000 LNGX at that
                  divisor. See <a href="/tokenomics">tokenomics</a> for the economics and issuance
                  schedule; this page only covers how the value is represented on-chain.
                </p>
                <p>
                  A read of an address&apos;s holdings reflects this directly: a token total, a map
                  of item totals by <code>genesis_hash</code>, and the underlying outpoints backing
                  them.
                </p>
                <CodeBlock lang="json">{`{
  "balance": {
    "total": {
      "tokens": 100,
      "items": { "g3b8f2a1…": 50 }
    },
    "address_list": {
      "d0e7c9b4…": [
        {
          "out_point": { "t_hash": "g3b8f2a1…", "n": 0 },
          "value": { "Token": 100 }
        }
      ]
    }
  }
}`}</CodeBlock>
                <p>
                  Note the asset value here uses the wire form (capitalised keys like{" "}
                  <code>{`{ "Token": 100 }`}</code>), which differs from the REST{" "}
                  <code>ApiAsset</code> response shape (<code>{`{ "kind": "token", "amount": 100 }`}</code>)
                  used elsewhere in the API &mdash; see the{" "}
                  <a href="/developers/api">API reference</a> for exact response schemas.
                </p>
              </article>

              <article id="c-keys" className={styles.prose}>
                <h2>Keys, addresses &amp; wallets</h2>
                <p>
                  Lineage keypairs are <strong>ed25519</strong>. An address is derived from a public
                  key as <code>hex(sha3_256(public_key))</code> &mdash; a 64-character hex string.
                  Two legacy address schemes also exist in the node code for backward compatibility
                  (a 32-character variant and an older temporary scheme); new wallets use the
                  64-character form.
                </p>
                <p>
                  Wallets generate a mnemonic seed phrase and derive keypairs from it through
                  hierarchical (HD) derivation &mdash; the reference SDKs hold keys locally,
                  encrypted at rest with a passphrase you supply, and never send private keys to a
                  node.
                </p>
                <p>
                  What you actually sign is narrower than the whole transaction. For each input, the
                  signable message is the SHA3-256 hash of the JSON encoding of every output in the
                  transaction, concatenated with the JSON encoding of that input&apos;s previous
                  outpoint &mdash; hex-encoded. That is <em>outputs plus the input&apos;s previous
                  outpoint, and nothing else</em>: the signature excludes <code>fees</code>,{" "}
                  <code>druid_info</code>, and the input&apos;s own unlocking script (which is reset
                  before the hash is computed). Two consequences follow directly: you sign exactly
                  what you submit, and field order is load-bearing, since the JSON encoding is taken
                  verbatim, in each struct&apos;s declared field order.
                </p>
                <CodeBlock lang="javascript">{`import { Wallet } from '@lineage-foundation/sdk-js';

const wallet = new Wallet();
await wallet.initNew({
  mempoolHost: 'https://mempool.lineage.to',
  passphrase: 'a secure passphrase',
});

// Derive a keypair; the address is hex(sha3_256(public_key)).
const keypair = wallet.getNewKeypair([]).content.newKeypairResponse;
console.log(keypair.address);`}</CodeBlock>
                <p>
                  See <a href="#c-transactions">Transactions</a> for where these keys sign, and{" "}
                  <a href="#c-scripts">Scripts</a> for how a spend is checked against an address at
                  the protocol level.
                </p>
              </article>

              <article id="c-transactions" className={styles.prose}>
                <h2>Transactions</h2>
                <p>
                  A transaction is <code>{`{ inputs, outputs, version, fees, druid_info }`}</code>,
                  in that declared field order &mdash; the order matters, because a transaction&apos;s
                  id is the SHA3-256 hash of its <code>bincode</code> serialization (hex-encoded,
                  prefixed with <code>g</code>, truncated to 32 characters), and serialization is
                  order-sensitive.
                </p>
                <p>
                  Each <strong>input</strong> (<code>TxIn</code>) carries an optional{" "}
                  <code>previous_out</code> (an <code>OutPoint</code>: the previous transaction hash
                  and output index) plus a <code>script_signature</code> that proves the right to
                  spend it. An input with <code>previous_out: null</code> is a create/coinbase input
                  &mdash; it mints rather than spends. Each <strong>output</strong> (<code>TxOut</code>)
                  states the <code>value</code> (an <code>Asset</code>), a <code>locktime</code>, and
                  an optional <code>script_public_key</code> that locks it.
                </p>
                <p>
                  <code>version</code> is a plain integer the client stamps with the network version
                  it is built against; the node does not branch protocol behaviour on it. In
                  particular, a two-way (atomic swap) payment is <em>not</em> signalled by a
                  particular version number &mdash; it is signalled by the presence of{" "}
                  <code>druid_info</code> on the transaction. <code>fees</code> is a real list of
                  outputs that inputs must fund alongside the visible outputs (inputs must balance
                  against outputs plus fees); there is currently no fixed fee-rate or minimum-fee
                  policy enforced by the node, so treat <code>fees</code> as a mechanism that exists
                  in the format without an economic policy wired to it yet.
                </p>
                <p>
                  A submission to <code>POST /v1/transactions</code> looks like this (the asset
                  value uses the wire form, <code>{`{ "Token": n }`}</code>, not the REST{" "}
                  <code>ApiAsset</code> shape used in read responses):
                </p>
                <CodeBlock lang="json">{`{
  "transactions": [
    {
      "inputs": [
        {
          "previous_out": { "t_hash": "g3b8f2a1…", "n": 0 },
          "script_signature": {
            "Pay2PkH": {
              "signable_data": "a1c4…",
              "signature": "6f2e…",
              "public_key": "5b8a…",
              "address_version": null
            }
          }
        }
      ],
      "outputs": [
        { "value": { "Token": 10 }, "locktime": 0, "script_public_key": "d0e7…" },
        { "value": { "Token": 90 }, "locktime": 0, "script_public_key": "a1b2…change" }
      ],
      "version": 6,
      "druid_info": null,
      "fees": null
    }
  ]
}`}</CodeBlock>
                <p>The SDKs build and sign this for you; a one-way token payment is a single call:</p>
                <CodeBlock lang="javascript">{`// keypair: your own keypair, already funded
const receipt = await wallet.makeTokenPayment(
  'recipient-address',
  10,
  [keypair],   // keypairs available to cover the inputs
  keypair,     // where change is returned
);
console.log(receipt.content.makePaymentResponse.transactionHash);`}</CodeBlock>
                <p>
                  See <a href="#c-keys">Keys, addresses &amp; wallets</a> for exactly what gets
                  signed, and <a href="/developers/api">the API reference</a> for the full request
                  and response schemas.
                </p>
              </article>

              <article id="c-scripts" className={styles.prose}>
                <h2>Scripts</h2>
                <p>
                  Spend authorisation is checked by a small <strong>stack-based script
                  language</strong>, in the Bitcoin Script tradition: bounded and loop-free (no
                  back-jumps), so every script terminates and its worst-case cost is easy to bound.
                  A dedicated condition stack handles <code>IF</code>/<code>ELSE</code> branching
                  without introducing loops. Hard limits keep scripts cheap to validate: a stack
                  item is capped at 520 bytes, a script at 201 opcodes and 10,000 bytes total, the
                  execution stack at 1,000 items, and a multisig script at 20 public keys.
                </p>
                <p>Opcodes fall into a few families:</p>
                <ul>
                  <li><strong>Constants</strong> &mdash; push small literal values (<code>OP_0</code>&ndash;<code>OP_16</code>).</li>
                  <li><strong>Flow control</strong> &mdash; <code>OP_IF</code>, <code>OP_NOTIF</code>, <code>OP_ELSE</code>, <code>OP_ENDIF</code>, <code>OP_VERIFY</code>, <code>OP_BURN</code>.</li>
                  <li><strong>Stack, splice, bitwise &amp; arithmetic</strong> &mdash; duplicate, drop, compare, and combine stack items.</li>
                  <li><strong>Crypto</strong> &mdash; <code>OP_SHA3</code>, the <code>OP_HASH256</code> family, <code>OP_CHECKSIG</code> / <code>OP_CHECKSIGVERIFY</code>, <code>OP_CHECKMULTISIG</code> / <code>OP_CHECKMULTISIGVERIFY</code>.</li>
                  <li><strong>Smart data</strong> &mdash; <code>OP_CREATE</code>, which mints a new item asset.</li>
                </ul>
                <p>
                  The standard lock is <strong>P2PKH</strong> (pay-to-pubkey-hash). The unlocking
                  side pushes check data, a signature, and a public key; the locking side then runs{" "}
                  <code>OP_DUP</code>, hashes the pushed public key, compares it against the address
                  baked into the output (<code>OP_EQUALVERIFY</code>), and finally checks the
                  signature against the public key (<code>OP_CHECKSIG</code>):
                </p>
                <CodeBlock lang="text">{`<check_data> <signature> <public_key>
OP_DUP OP_HASH256 <address> OP_EQUALVERIFY OP_CHECKSIG`}</CodeBlock>
                <p>
                  A spend is valid only if that combined script runs to a truthy result &mdash; so
                  the signature has to verify against the pushed public key, <em>and</em> that public
                  key has to hash to the address the output was locked to. See{" "}
                  <a href="#c-keys">Keys, addresses &amp; wallets</a> for what the signature actually
                  covers. Multisig locks and pay-to-script-hash (P2SH) addresses are also supported
                  for flows where more than one signer must authorise a spend, such as{" "}
                  <a href="#c-two-way">two-way payments</a>.
                </p>
              </article>

              {/* ============ CONCEPTS: NETWORK & CONSENSUS ============ */}
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

              {/* ============ MCP SERVER ============ */}
              <article id="mcp-server" className={styles.prose}>
                <h2>MCP server</h2>
                <p>
                  A hosted <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> endpoint
                  lets AI agents and assistants use Lineage as tools: balances and
                  transactions, keypair and seed generation, block / entry /
                  transaction lookups, supply, and node health. It wraps the same
                  HTTP API documented here.
                </p>
                <p>
                  Endpoint:{" "}
                  <a href={URL_MCP_SERVER} target="_blank" rel="noopener noreferrer">
                    <code>{URL_MCP_SERVER.replace("https://", "")}</code>
                  </a>
                </p>
              </article>

              {/* ============ AI SKILLS ============ */}
              <article id="ai-skills" className={styles.prose}>
                <h2>AI Skills</h2>
                <p>
                  The <code>lineage</code> plugin is a set of packaged skills that make an AI
                  coding agent an expert in Lineage. It works across{" "}
                  <a href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a>,
                  Codex, Cursor, the Gemini CLI, opencode, and any tool that reads an{" "}
                  <code>AGENTS.md</code> index. There is nothing to invoke by hand: as you work on
                  a Lineage task, the agent automatically pulls in the skill that matches it.
                </p>
                <p>
                  The skills span three tracks &mdash; <strong>fundamentals</strong> (the base
                  every other skill assumes), <strong>building on Lineage</strong> (SDK usage,
                  the <code>/v1</code> API, two-way DRUID payments, and standing up a dev node),
                  and <strong>core contributing</strong> (working inside the node codebase). The
                  full catalogue lives in the{" "}
                  <a href={URL_SKILLS} target="_blank" rel="noopener noreferrer">skills repository</a>.
                  No credentials are needed, and the skills don&rsquo;t require the MCP server.
                </p>

                <h3>Install in Claude Code</h3>
                <p>
                  Add the marketplace, then install the <code>lineage</code> plugin from the{" "}
                  <code>/plugin</code> menu.
                </p>
                <CodeBlock lang="shell">{`# In Claude Code
/plugin marketplace add lineage-foundation/skills

# then open the plugin menu and install "lineage"
/plugin`}</CodeBlock>

                <h3>Other agents</h3>
                <p>
                  The same skills ship as adapters for other tools, generated into the{" "}
                  <a href={URL_SKILLS} target="_blank" rel="noopener noreferrer">repository</a>{" "}
                  and discovered automatically:
                </p>
                <ul>
                  <li>
                    <strong>Codex</strong> &mdash; register the generated{" "}
                    <code>.codex-plugin/</code> directory per your Codex environment&rsquo;s
                    plugin-setup steps (no one-line command is published yet).
                  </li>
                  <li>
                    <strong>Cursor</strong> &mdash; the <code>.cursor/skills/</code> directory
                    is auto-discovered when you open the repository in Cursor.
                  </li>
                  <li>
                    <strong>Gemini CLI</strong> &mdash; the <code>.gemini/skills/</code>{" "}
                    directory is picked up as workspace skills.
                  </li>
                  <li>
                    <strong>opencode</strong> &mdash; the <code>.opencode/skills/</code>{" "}
                    directory is discovered automatically.
                  </li>
                  <li>
                    <strong>Copilot, Aider, Zed, and similar</strong> &mdash; read the root{" "}
                    <code>AGENTS.md</code> index, which lists every skill.
                  </li>
                </ul>
              </article>

              {/* ============ TUTORIALS & SDKs ============ */}
              <article id="tut-overview" className={styles.prose}>
                <h2>SDKs &amp; tutorials</h2>
                <p>
                  Beyond the raw endpoint reference, Lineage ships official client libraries across a
                  range of languages plus node tooling. The full walkthroughs and runnable code live in the
                  {" "}<a href="https://github.com/lineage-foundation" target="_blank" rel="noopener noreferrer">published repositories</a>;
                  the cards below summarise each SDK and where it fits. They all wrap the same HTTP API
                  documented above; configure each with a mempool base URL, a storage base URL, and a
                  passphrase for local key encryption.
                </p>

                <h3>Install</h3>
                <p>Add the client for your stack.</p>
                <CodeBlock lang="shell">{`# JavaScript / TypeScript
npm install @lineage-foundation/sdk-js

# Python (imports as \`lineage\`)
pip install lineage-sdk

# Go
go get github.com/lineage-foundation/sdk-go

# Rust
cargo add lineage-sdk

# PHP
composer require lineage/php

# Laravel
composer require lineage/laravel`}</CodeBlock>

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
                  <div className="doc-card" id="sdk-go">
                    <h3>sdk-go</h3>
                    <p>The Go client for services, CLIs, and backends: a keyless read client and a key-holding wallet covering key management, balance and supply reads, transaction construction, payments, and two-way flows. Same surface as <code>sdk-js</code>, idiomatic for Go.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-go" external>lineage-foundation/sdk-go</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-rust">
                    <h3>sdk-rust</h3>
                    <p>The Rust client for performance-sensitive services and tooling: key management, chain reads, transaction construction, payments, and two-way flows. Covers the same surface as <code>sdk-js</code>.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-rust" external>lineage-foundation/sdk-rust</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-php">
                    <h3>sdk-php</h3>
                    <p>The PHP client for server-side web stacks: wallet creation, asset issuance, payments, chain reads, and two-way flows. Covers the same surface as <code>sdk-js</code>, idiomatic for PHP services.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-php" external>lineage-foundation/sdk-php</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-laravel">
                    <h3>sdk-laravel</h3>
                    <p>The Laravel wrapper around <code>sdk-php</code>: wallets and keypairs backed by Eloquent models, plus Artisan commands for creating wallets, deriving keypairs, minting items, and making token and item payments.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-laravel" external>lineage-foundation/sdk-laravel</LinkCta>
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
                  mirror its{" "}
                  <a href="https://github.com/lineage-foundation/fleet#readme" target="_blank" rel="noopener noreferrer">README</a>.
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
