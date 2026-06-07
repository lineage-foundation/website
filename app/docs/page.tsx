import type { Metadata } from "next";

import { Button, CodeBlock, Container, Eyebrow, LinkCta, Pill, Table } from "@/components/ui";
import { DocsScroll } from "@/components/docs/DocsScroll";
import { SITE_ORIGIN, URL_GITHUB_ORG } from "@/lib/constants";

import styles from "./docs.module.css";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Lineage documentation — node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
  alternates: { canonical: "/docs" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Documentation | Lineage",
    description:
      "Lineage documentation — node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
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
      "Lineage documentation — node concepts, tutorials, and the public HTTP API reference for the mempool, storage, and miner subsystems.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

// Brace helpers keep JSON code-block text verbatim without JSX parsing it.
const O = "{";
const C = "}";

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
              Read chain state, submit transactions, and query node metadata directly over HTTP — no smart contracts required. Move through node concepts, the mempool, storage, and miner reference, and the SDK tutorials using the contents tree.
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

                <h2>Mempool API</h2>
                <ul>
                  <li><a href="#mp-info">info</a></li>
                  <li><a href="#mp-debug-data">debug_data</a></li>
                  <li><a href="#mp-fetch-balance">fetch_balance</a></li>
                  <li><a href="#mp-create-transactions">create_transactions</a></li>
                  <li><a href="#mp-create-item-asset">create_item_asset</a></li>
                  <li><a href="#mp-total-supply">total_supply</a></li>
                  <li><a href="#mp-issued-supply">issued_supply</a></li>
                </ul>

                <h2>Storage API</h2>
                <ul>
                  <li><a href="#st-info">info</a></li>
                  <li><a href="#st-debug-data">debug_data</a></li>
                  <li><a href="#st-latest-block">latest_block</a></li>
                  <li><a href="#st-block-by-num">block_by_num</a></li>
                  <li><a href="#st-blockchain-entry">blockchain_entry</a></li>
                </ul>

                <h2>Miner API</h2>
                <ul>
                  <li><a href="#mn-info">info</a></li>
                  <li><a href="#mn-debug-data">debug_data</a></li>
                </ul>

                <h2>SDKs &amp; tutorials</h2>
                <ul>
                  <li><a href="#tut-overview">Overview</a></li>
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
                  documentation require on-chain smart contracts — use a plain HTTP client
                  (<code>curl</code>, <code>fetch</code>, or your language of choice) against the
                  endpoints listed under each subsystem.
                </p>
                <p>
                  Routes are grouped by <strong>node class</strong>. Each class is served from its
                  own origin, so confirm which host a route belongs to before you call it — sending
                  a storage read to the mempool host (or vice versa) will not resolve.
                </p>

                <h2 id="service-urls">Public service URLs</h2>
                <p>
                  These are the public reference hosts used in every example below.
                </p>
                <Table>
                  <thead>
                    <tr><th scope="col">Node class</th><th scope="col">Base URL</th><th scope="col">Use for</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Mempool</td><td className="num">https://mempool.lineage.to</td><td>Transactions, balances, supply, mempool metadata</td></tr>
                    <tr><td>Storage</td><td className="num">https://storage.lineage.to</td><td>Blocks, chain entries, read-oriented history</td></tr>
                    <tr><td>Miner</td><td className="num">https://miner.lineage.to</td><td>Operator-facing HTTP where exposed (small surface)</td></tr>
                  </tbody>
                </Table>

                <h2 id="envelope">Request &amp; response envelope</h2>
                <p>
                  Operations are <code>POST</code> to a path named after the route (for example
                  <code>/fetch_balance</code> on the mempool host). Read-only routes take an empty
                  body; routes that need input take a JSON body documented per endpoint. Every
                  request carries two headers:
                </p>
                <ul>
                  <li><code>Content-Type: application/json</code></li>
                  <li><code>x-cache-id</code> — a 32-character idempotency key matching <code>^[a-z0-9]{O}32{C}$</code>.</li>
                </ul>
                <p>Every response uses the same envelope. Field semantics:</p>
                <Table>
                  <thead>
                    <tr><th scope="col">Field</th><th scope="col">Meaning</th></tr>
                  </thead>
                  <tbody>
                    <tr><td className="num">id</td><td>Echoes the request&apos;s <code>x-cache-id</code> (<code>null</code> on a rejected request).</td></tr>
                    <tr><td className="num">status</td><td>One of <code>Success</code>, <code>Error</code>, or <code>Pending</code>.</td></tr>
                    <tr><td className="num">reason</td><td>Human-readable context — most useful on errors.</td></tr>
                    <tr><td className="num">route</td><td>The route name that was handled.</td></tr>
                    <tr><td className="num">content</td><td>The route-specific payload. Shape varies by route (documented below).</td></tr>
                  </tbody>
                </Table>
                <p><strong>Error envelope</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="k">null</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Error&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Bad Request&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="k">null</span>,
  <span className="k">&quot;content&quot;</span>: <span className="k">null</span>
{C}</CodeBlock>

                <h2 id="quick-start">API quick start</h2>
                <p>
                  Pick a node class, point your HTTP client at its base URL, and verify connectivity
                  with a read-only route before sending anything that writes. A good first call is
                  <a href="#st-latest-block">storage <code>latest_block</code></a> or
                  <a href="#mp-fetch-balance">mempool <code>fetch_balance</code></a>.
                </p>
                <CodeBlock lang="shell"><span className="c"># 1 — check the chain head on the storage host</span>
curl -sS -X POST <span className="s">&quot;https://storage.lineage.to/latest_block&quot;</span> \
  -H <span className="s">&quot;Content-Type: application/json&quot;</span> \
  -H <span className="s">&quot;x-cache-id: 0123456789abcdef0123456789abcdef&quot;</span> \
  -d &apos;&apos;</CodeBlock>
                <div className="note">
                  <span className="note-k">Note</span>
                  Exact <code>content</code> field names and nesting are defined by the node release. See the
                  {" "}<a href="https://github.com/lineage-foundation" target="_blank" rel="noopener noreferrer">Lineage Foundation repositories</a>
                  {" "}for the schema shipped by your target deployment.
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
                  responsibilities are interdependent — both must make progress for the chain to
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
                  on the same block simultaneously — a subset is selected each round, keeping energy use
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
                  randomness object (a UNiCORN) — derived from agreed inputs such as the transactions,
                  the eligible miner set, and prior-round metadata — drives who may mine and who wins.
                </p>
              </article>

              <article id="c-transactions" className={styles.prose}>
                <h2>Transactions</h2>
                <p>
                  Lineage uses a <strong>UTXO model</strong>: a transaction spends one or more previous
                  outputs and creates new outputs that a later spend can refer to. There is no global
                  account balance in the contract layer — a balance is a view over unspent outputs.
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
                  A UNiCORN — an <strong>UN-COntestable Random Number</strong> — is a
                  randomness-and-witness object generated so that no single participant can steer it toward
                  anything but a random result. It depends on the transactions in the block, which miners
                  are eligible, and recent chain state, so winner selection is hard to bias without breaking
                  consensus. The protocol uses it to restrict which miners may attempt work in a round, to
                  choose the winning valid proof, and to supply the data storage nodes re-check during
                  validation.
                </p>
              </article>

              {/* ============ MEMPOOL API ============ */}
              <article id="mp-info" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> info</h2>
                <p className="api-host"><code>https://mempool.lineage.to/info</code></p>
                <p>Returns metadata about the mempool node — its node type and the routes it exposes. Empty body; <code>x-cache-id</code> header only.</p>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Node info&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;info&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;node_type&quot;</span>: <span className="s">&quot;Mempool&quot;</span>,
    <span className="k">&quot;node_api&quot;</span>: [ <span className="s">&quot;debug_data&quot;</span>, <span className="s">&quot;fetch_balance&quot;</span>, <span className="s">&quot;create_transactions&quot;</span>, <span className="s">&quot;create_item_asset&quot;</span>, <span className="s">&quot;total_supply&quot;</span>, <span className="s">&quot;issued_supply&quot;</span> ]
  {C}
{C}</CodeBlock>
              </article>

              <article id="mp-debug-data" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> debug_data</h2>
                <p className="api-host"><code>https://mempool.lineage.to/debug_data</code></p>
                <p>Node diagnostics for the mempool: its node type, the routes it exposes, and the peers it is connected to. Empty body; <code>x-cache-id</code> header only.</p>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Debug data successfully retrieved&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;debug_data&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;node_type&quot;</span>: <span className="s">&quot;Mempool&quot;</span>,
    <span className="k">&quot;node_api&quot;</span>: [ <span className="s">&quot;debug_data&quot;</span>, <span className="s">&quot;fetch_balance&quot;</span>, <span className="s">&quot;create_transactions&quot;</span>, <span className="s">&quot;create_item_asset&quot;</span>, <span className="s">&quot;total_supply&quot;</span>, <span className="s">&quot;issued_supply&quot;</span> ],
    <span className="k">&quot;node_peers&quot;</span>: [ <span className="s">&quot;&lt;peer-address&gt;&quot;</span> ]
  {C}
{C}</CodeBlock>
              </article>

              <article id="mp-fetch-balance" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> fetch_balance</h2>
                <p className="api-host"><code>https://mempool.lineage.to/fetch_balance</code></p>
                <p>Fetch token and item balances for one or more addresses. The request body is a JSON array of address strings.</p>
                <p><strong>Request body</strong></p>
                <CodeBlock lang="json">[ <span className="s">&quot;&lt;address-1&gt;&quot;</span>, <span className="s">&quot;&lt;address-2&gt;&quot;</span> ]</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;45v340cd2f8c4782a5b058832565afb1&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Balance successfully fetched&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;fetch_balance&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;total&quot;</span>: {O} <span className="k">&quot;tokens&quot;</span>: 5463669, <span className="k">&quot;items&quot;</span>: {O}{C} {C},
    <span className="k">&quot;address_list&quot;</span>: {O}
      <span className="k">&quot;d6fa779a3de8b216c56375018375e490c7e2ce92918abce4caecf73b1f77c38f&quot;</span>: [
        {O}
          <span className="k">&quot;out_point&quot;</span>: {O} <span className="k">&quot;t_hash&quot;</span>: <span className="s">&quot;g9182e1e2a55b0ef36f1183602d74e63&quot;</span>, <span className="k">&quot;n&quot;</span>: 0 {C},
          <span className="k">&quot;value&quot;</span>: {O} <span className="k">&quot;Token&quot;</span>: 5463669 {C}
        {C}
      ]
    {C}
  {C}
{C}</CodeBlock>
              </article>

              <article id="mp-create-transactions" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> create_transactions</h2>
                <p className="api-host"><code>https://mempool.lineage.to/create_transactions</code></p>
                <p>
                  Submit one or more fully formed UTXO-style transactions to the mempool. Each input
                  references a <code>previous_out</code> and carries a script signature
                  (Pay2PkH); each output states a value, locktime, and script public key. A
                  <code>druid_info</code> block is included only for two-way transactions.
                </p>
                <p><strong>Request body (shape)</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;inputs&quot;</span>: [
    {O} <span className="k">&quot;previous_out&quot;</span>: {O} <span className="k">&quot;t_hash&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>, <span className="k">&quot;n&quot;</span>: 0 {C}, <span className="k">&quot;script_signature&quot;</span>: {O} <span className="c">{"/* Pay2PkH */"}</span> {C} {C}
  ],
  <span className="k">&quot;outputs&quot;</span>: [
    {O} <span className="k">&quot;value&quot;</span>: {O} <span className="k">&quot;Token&quot;</span>: 1000 {C}, <span className="k">&quot;locktime&quot;</span>: 0, <span className="k">&quot;script_public_key&quot;</span>: <span className="s">&quot;&lt;script&gt;&quot;</span> {C}
  ],
  <span className="k">&quot;version&quot;</span>: 1,
  <span className="k">&quot;druid_info&quot;</span>: <span className="k">null</span>
{C}</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Transaction/s successfully created&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;create_transactions&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O} <span className="k">&quot;transaction&quot;</span>: {O} <span className="k">&quot;tx_hash&quot;</span>: <span className="s">&quot;&lt;32-byte-hex&gt;&quot;</span> {C} {C}
{C}</CodeBlock>
              </article>

              <article id="mp-create-item-asset" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> create_item_asset</h2>
                <p className="api-host"><code>https://mempool.lineage.to/create_item_asset</code></p>
                <p>Create a new item-type asset with an amount, a script public key, a public key, a signature, and a DRS spec.</p>
                <p><strong>Request body</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;item_amount&quot;</span>: 1,
  <span className="k">&quot;script_public_key&quot;</span>: <span className="s">&quot;&lt;script&gt;&quot;</span>,
  <span className="k">&quot;public_key&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>,
  <span className="k">&quot;signature&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>,
  <span className="k">&quot;drs_tx_hash_spec&quot;</span>: <span className="s">&quot;default&quot;</span>
{C}</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Item asset created&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;create_item_asset&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O} <span className="k">&quot;item_amount&quot;</span>: 1, <span className="k">&quot;tx_hash&quot;</span>: <span className="s">&quot;&lt;32-byte-hex&gt;&quot;</span>, <span className="k">&quot;metadata&quot;</span>: {O}{C} {C}
{C}</CodeBlock>
              </article>

              <article id="mp-total-supply" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> total_supply</h2>
                <p className="api-host"><code>https://mempool.lineage.to/total_supply</code></p>
                <p>Returns the total token supply figure. Empty body; <code>x-cache-id</code> header only. <code>content</code> is a numeric value in the standard envelope.</p>
                <p><strong>Request</strong></p>
                <CodeBlock lang="shell">curl -sS -X POST <span className="s">&quot;https://mempool.lineage.to/total_supply&quot;</span> \
  -H <span className="s">&quot;Content-Type: application/json&quot;</span> \
  -H <span className="s">&quot;x-cache-id: &lt;32-lowercase-hex&gt;&quot;</span> \
  -d &apos;&apos;</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Supply returned&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;total_supply&quot;</span>,
  <span className="k">&quot;content&quot;</span>: 0
{C}</CodeBlock>
              </article>

              <article id="mp-issued-supply" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> issued_supply</h2>
                <p className="api-host"><code>https://mempool.lineage.to/issued_supply</code></p>
                <p>Returns the issued token supply figure. Same call shape as <a href="#mp-total-supply"><code>total_supply</code></a> — empty body, numeric <code>content</code>.</p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Supply returned&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;issued_supply&quot;</span>,
  <span className="k">&quot;content&quot;</span>: 0
{C}</CodeBlock>
              </article>

              {/* ============ STORAGE API ============ */}
              <article id="st-info" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> info</h2>
                <p className="api-host"><code>https://storage.lineage.to/info</code></p>
                <p>Returns metadata about the storage node — its node type and the read routes it serves. Empty body; <code>x-cache-id</code> header only.</p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Node info&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;info&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;node_type&quot;</span>: <span className="s">&quot;Storage&quot;</span>,
    <span className="k">&quot;node_api&quot;</span>: [ <span className="s">&quot;debug_data&quot;</span>, <span className="s">&quot;latest_block&quot;</span>, <span className="s">&quot;block_by_num&quot;</span>, <span className="s">&quot;blockchain_entry&quot;</span> ]
  {C}
{C}</CodeBlock>
              </article>

              <article id="st-debug-data" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> debug_data</h2>
                <p className="api-host"><code>https://storage.lineage.to/debug_data</code></p>
                <p>Node diagnostics for the storage node: node type, the read routes it serves, and connected peers. Empty body; <code>x-cache-id</code> header only.</p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Debug data successfully retrieved&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;debug_data&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;node_type&quot;</span>: <span className="s">&quot;Storage&quot;</span>,
    <span className="k">&quot;node_api&quot;</span>: [ <span className="s">&quot;debug_data&quot;</span>, <span className="s">&quot;latest_block&quot;</span>, <span className="s">&quot;block_by_num&quot;</span>, <span className="s">&quot;blockchain_entry&quot;</span> ],
    <span className="k">&quot;node_peers&quot;</span>: [ <span className="s">&quot;&lt;peer-address&gt;&quot;</span> ]
  {C}
{C}</CodeBlock>
              </article>

              <article id="st-latest-block" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> latest_block</h2>
                <p className="api-host"><code>https://storage.lineage.to/latest_block</code></p>
                <p>Returns the best block this storage node has received and stored. Empty body; <code>x-cache-id</code> header only.</p>
                <p><strong>Request</strong></p>
                <CodeBlock lang="shell">curl -sS -X POST <span className="s">&quot;https://storage.lineage.to/latest_block&quot;</span> \
  -H <span className="s">&quot;Content-Type: application/json&quot;</span> \
  -H <span className="s">&quot;x-cache-id: &lt;32-lowercase-hex&gt;&quot;</span> \
  -d &apos;&apos;</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Latest block&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;latest_block&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;height&quot;</span>: 12345,
    <span className="k">&quot;block_hash&quot;</span>: <span className="s">&quot;&lt;32-byte-hex header hash&gt;&quot;</span>,
    <span className="k">&quot;prev_block&quot;</span>: <span className="s">&quot;&lt;hex or null for genesis parent&gt;&quot;</span>,
    <span className="k">&quot;merkle&quot;</span>: <span className="s">&quot;&lt;root hex&gt;&quot;</span>,
    <span className="k">&quot;tx_ids&quot;</span>: [ <span className="s">&quot;&lt;tx-id-1&gt;&quot;</span>, <span className="s">&quot;&lt;tx-id-2&gt;&quot;</span> ],
    <span className="k">&quot;header&quot;</span>: {O}{C}
  {C}
{C}</CodeBlock>
              </article>

              <article id="st-block-by-num" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> block_by_num</h2>
                <p className="api-host"><code>https://storage.lineage.to/block_by_num</code></p>
                <p>Fetch one or more blocks by height. The request body is a JSON array of non-negative integers. <code>content</code> returns one nested result per requested height, in order.</p>
                <p><strong>Request body</strong></p>
                <CodeBlock lang="json">[ 0, 1, 42 ]</CodeBlock>
                <p><strong>Example response</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;45v340cd2f8c4782a5b058832565afb1&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Database item(s) successfully retrieved&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;block_by_num&quot;</span>,
  <span className="k">&quot;content&quot;</span>: [
    [
      <span className="s">&quot;&lt;block-hash hex&gt;&quot;</span>,
      {O} <span className="k">&quot;block&quot;</span>: {O} <span className="k">&quot;header&quot;</span>: {O} <span className="k">&quot;b_num&quot;</span>: 0, <span className="k">&quot;previous_hash&quot;</span>: <span className="k">null</span>, <span className="k">&quot;merkle_root_hash&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span> {C}, <span className="k">&quot;transactions&quot;</span>: [ <span className="s">&quot;&lt;tx-id&gt;&quot;</span> ] {C} {C}
    ]
  ]
{C}</CodeBlock>
                <p className="note-inline"><em>The inner block object is defined by the node release; <code>content</code> nesting mirrors the order of the requested heights.</em></p>
              </article>

              <article id="st-blockchain-entry" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> blockchain_entry</h2>
                <p className="api-host"><code>https://storage.lineage.to/blockchain_entry</code></p>
                <p>Fetch a block or a transaction by hash. The request body is a single JSON string (the hash), not an object. The returned <code>content</code> is tagged with a <code>type</code> of either <code>block</code> or <code>transaction</code>.</p>
                <p><strong>Request body</strong></p>
                <CodeBlock lang="json"><span className="s">&quot;&lt;hex-or-encoded-hash&gt;&quot;</span></CodeBlock>
                <p><strong>Response — block</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;blockchain_entry&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O} <span className="k">&quot;type&quot;</span>: <span className="s">&quot;block&quot;</span>, <span className="k">&quot;height&quot;</span>: 100, <span className="k">&quot;block_hash&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>, <span className="k">&quot;tx_ids&quot;</span>: [ <span className="s">&quot;&lt;tx-id&gt;&quot;</span> ], <span className="k">&quot;header&quot;</span>: {O}{C} {C}
{C}</CodeBlock>
                <p><strong>Response — transaction</strong></p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;blockchain_entry&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;type&quot;</span>: <span className="s">&quot;transaction&quot;</span>,
    <span className="k">&quot;tx_hash&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>,
    <span className="k">&quot;inputs&quot;</span>: [ {O} <span className="k">&quot;previous_out&quot;</span>: {O} <span className="k">&quot;t_hash&quot;</span>: <span className="s">&quot;&lt;hex&gt;&quot;</span>, <span className="k">&quot;n&quot;</span>: 0 {C}, <span className="k">&quot;script_signature&quot;</span>: {O}{C} {C} ],
    <span className="k">&quot;outputs&quot;</span>: [ {O} <span className="k">&quot;value&quot;</span>: {O} <span className="k">&quot;Token&quot;</span>: 0 {C}, <span className="k">&quot;locktime&quot;</span>: 0, <span className="k">&quot;script_public_key&quot;</span>: <span className="s">&quot;&lt;script&gt;&quot;</span> {C} ],
    <span className="k">&quot;version&quot;</span>: 1
  {C}
{C}</CodeBlock>
              </article>

              {/* ============ MINER API ============ */}
              <article id="mn-info" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> info</h2>
                <p className="api-host"><code>https://miner.lineage.to/info</code></p>
                <p>
                  Miner nodes build new blocks from work assigned through the mempool, compete for
                  partition slots, and claim rewards when a block is accepted. The HTTP surface exposed
                  to operators is deliberately small compared with mempool and storage — most mining
                  logic runs inside the process rather than as ad hoc REST calls. <code>info</code>
                  returns the standard envelope describing the running node.
                </p>
                <div className="note">
                  <span className="note-k">Running a miner</span>
                  For practical operation — installing a node, hardware, key management, and
                  release-specific flags — see <a href="#run-node">Running a node</a> and the
                  {" "}<a href="https://github.com/lineage-foundation/fleet" target="_blank" rel="noopener noreferrer">lineage-foundation/fleet</a> repository.
                </div>
              </article>

              <article id="mn-debug-data" className={`${styles.prose} endpoint`}>
                <h2><Pill tone="post">POST</Pill> debug_data</h2>
                <p className="api-host"><code>https://miner.lineage.to/debug_data</code></p>
                <p>Node diagnostics for a miner: node type, the routes it exposes, and the mempool/storage peers it is connected to. Empty body; <code>x-cache-id</code> header only.</p>
                <CodeBlock lang="json">{O}
  <span className="k">&quot;id&quot;</span>: <span className="s">&quot;&lt;matches x-cache-id&gt;&quot;</span>,
  <span className="k">&quot;status&quot;</span>: <span className="s">&quot;Success&quot;</span>,
  <span className="k">&quot;reason&quot;</span>: <span className="s">&quot;Debug data successfully retrieved&quot;</span>,
  <span className="k">&quot;route&quot;</span>: <span className="s">&quot;debug_data&quot;</span>,
  <span className="k">&quot;content&quot;</span>: {O}
    <span className="k">&quot;node_type&quot;</span>: <span className="s">&quot;Miner&quot;</span>,
    <span className="k">&quot;node_api&quot;</span>: [ <span className="s">&quot;debug_data&quot;</span> ],
    <span className="k">&quot;node_peers&quot;</span>: [ <span className="s">&quot;&lt;peer-address&gt;&quot;</span> ]
  {C}
{C}</CodeBlock>
              </article>

              {/* ============ TUTORIALS & SDKs ============ */}
              <article id="tut-overview" className={styles.prose}>
                <h2>SDKs &amp; tutorials</h2>
                <p>
                  Beyond the raw endpoint reference, Lineage ships official client libraries in three
                  languages plus node tooling. The full walkthroughs and runnable code live in the
                  {" "}<a href="https://github.com/lineage-foundation" target="_blank" rel="noopener noreferrer">published repositories</a>;
                  the cards below summarise each SDK and where it fits. All three wrap the same HTTP API
                  documented above — configure each with a mempool base URL, a storage base URL, and a
                  passphrase for local key encryption.
                </p>

                <h3>Install</h3>
                <p>Add the client for your stack. Confirm the published package name in each repository&apos;s README.</p>
                <CodeBlock lang="shell"><span className="c"># JavaScript / TypeScript</span>
npm install @lineage/sdk-js

<span className="c"># Python</span>
pip install git+https://github.com/lineage-foundation/sdk-python

<span className="c"># PHP</span>
composer require lineage-foundation/sdk-php</CodeBlock>

                <h3>First call</h3>
                <p>Create a <code>Wallet</code>, point it at a mempool host with a passphrase for local key encryption, and initialise a new keypair. <code>initNew</code> returns the generated seed phrase — store it securely; it is the only way to recover the wallet.</p>
                <CodeBlock lang="javascript"><span className="k">import</span> {O} Wallet {C} <span className="k">from</span> <span className="s">&apos;@lineage/sdk-js&apos;</span>;

<span className="k">const</span> wallet = <span className="k">new</span> Wallet();

<span className="k">const</span> CONFIG = {O}
  mempoolHost: <span className="s">&apos;https://mempool.lineage.to&apos;</span>,
  passphrase: <span className="s">&apos;a secure passphrase&apos;</span>,
{C};

wallet.initNew(CONFIG).then((res) =&gt; {O}
  console.log(res.content.initNewResponse.seedphrase);
{C});</CodeBlock>

                <div className="doc-cards">
                  <div className="doc-card" id="sdk-js">
                    <h3>sdk-js</h3>
                    <p>The JavaScript / TypeScript client for browser and Node apps and wallets: create a wallet, create items and assets, run two-way payments, send and receive. Drop-in for web front-ends and Valence servers.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-js" external>lineage-foundation/sdk-js</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-python">
                    <h3>sdk-python</h3>
                    <p>The Python client for backends, data tooling, and automation: key management, balance and supply reads, transaction construction, and two-way flows — the same surface as <code>sdk-js</code>, idiomatic for Python services and notebooks.</p>
                    <LinkCta href="https://github.com/lineage-foundation/sdk-python" external>lineage-foundation/sdk-python</LinkCta>
                  </div>
                  <div className="doc-card" id="sdk-php">
                    <h3>sdk-php</h3>
                    <p>The PHP client for server-side web stacks: wallet creation, asset issuance, payments, and chain reads from within PHP applications and CMS integrations.</p>
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
                  The fastest way to stand up a full Lineage stack — mempool, storage, and miner — is the
                  {" "}<a href="https://github.com/lineage-foundation/fleet" target="_blank" rel="noopener noreferrer">lineage-foundation/fleet</a>
                  {" "}repository, which ships a Docker Compose stack and a from-source build. The steps below
                  mirror its README.
                </p>

                <h3>Prerequisites</h3>
                <p>A recent Rust toolchain and the Linux build dependencies. On Ubuntu:</p>
                <CodeBlock lang="shell">sudo apt-get update &amp;&amp; sudo apt-get install -y \
  build-essential m4 llvm libclang-dev clang cmake pkg-config \
  git curl python3 libglfw3-dev libxrandr-dev libxinerama-dev \
  libxcursor-dev libxi-dev</CodeBlock>
                <CodeBlock lang="shell"><span className="c"># install Rust</span>
curl https://sh.rustup.rs -sSf | sh
source <span className="s">&quot;$HOME/.cargo/env&quot;</span>
rustc --version</CodeBlock>

                <h3>Docker Compose (recommended)</h3>
                <p>Build and start the full multi-node stack from the repo root:</p>
                <CodeBlock lang="shell">docker compose build
docker compose up</CodeBlock>
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
                <CodeBlock lang="shell">docker compose build mempool-node
docker compose down -v</CodeBlock>

                <h3>Build from source</h3>
                <CodeBlock lang="shell">cargo build --release
cargo test</CodeBlock>
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
