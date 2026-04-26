import Link from "next/link";

import type { PortedDocPage } from "./types";

export const CONCEPTS_PORTED: Record<string, PortedDocPage> = {
  "/docs/concepts": {
    description:
      "Lineage network concepts: node types, blocks, transactions, and how they fit together.",
    title: "Concepts",
    children: (
      <>
        <p>
          This section explains how the Lineage public network is organized at a
          high level — before you dive into the{" "}
          <Link href="/docs/api/overview">HTTP API</Link> or client libraries. The
          model differs from a single “full node does everything” design: different
          roles split validation, block production, and long-term storage.
        </p>
        <h2>What to read first</h2>
        <ul>
          <li>
            <Link href="/docs/concepts/node-types">Node types</Link> — how mempool,
            miner, and storage nodes differ.
          </li>
          <li>
            <Link href="/docs/concepts/block-mining">Block mining</Link> — the round
            flow from the mempool to miners to storage.
          </li>
          <li>
            <Link href="/docs/concepts/transactions">Transactions</Link> and{" "}
            <Link href="/docs/concepts/two-way-transaction">two-way transactions</Link>{" "}
            — UTXO-style movement of value and multi-party patterns.
          </li>
        </ul>
        <p>
          Implementation names in open-source code (modules, traits, and structs) can
          differ from these headings; when you build against a release, use the
          repository and release notes for exact symbols.
        </p>
      </>
    ),
  },
  "/docs/concepts/node-types": {
    description:
      "Mempool, miner, and storage nodes: roles and why Lineage uses more than one node type.",
    title: "Network node types",
    children: (
      <>
        <p>
          Unlike a network where every participant runs the same “full + miner”
          stack, Lineage uses distinct node types so payments can be confirmed
          quickly, mining can stay widely accessible, and full history can be served
          without forcing every user to store the whole chain.
        </p>
        <h2>Types at a glance</h2>
        <ul>
          <li>
            <Link href="/docs/concepts/mempool-node">Mempool node</Link> — collects
            transactions, participates in block construction, and coordinates
            validation with a bounded set of long-lived nodes.
          </li>
          <li>
            <Link href="/docs/concepts/miner-node">Miner node</Link> — performs the
            proof-of-work (or protocol-equivalent) work to produce block candidates
            and earn rewards. Many miners can participate; assignments rotate by
            round.
          </li>
          <li>
            <Link href="/docs/concepts/storage-node">Storage node</Link> — retains
            the full blockchain and serves history to clients. Participation as a
            storage operator is a deployment choice, not a requirement to use the
            network as a light client.
          </li>
        </ul>
        <h2>Why the split</h2>
        <h3>Fast settlement for users</h3>
        <p>
          Mempool nodes can reason about which spends are valid in the “present”
          view of the ledger, so applications do not have to wait through many
          confirmation depths just to know a spend is well-formed for inclusion.
        </p>
        <h3>Geographic and operational spread</h3>
        <p>
          A deliberate distribution of long-lived nodes reduces single-point risk and
          keeps routing around partitions aligned with the protocol’s design.
        </p>
        <h3>Storage vs. mining burden</h3>
        <p>
          Not everyone who wants to mine or transact should need-archival storage.
          Archival nodes can specialize, while other participants keep lighter state.
        </p>
        <h3>Two-party and token-for-asset flows</h3>
        <p>
          The two-way and asset flows described in the rest of the docs rely on
          mempool and miner coordination; see{" "}
          <Link href="/docs/concepts/two-way-transaction">Two-way transaction</Link>{" "}
          for the user-facing model.
        </p>
      </>
    ),
  },
  "/docs/concepts/mempool-node": {
    description:
      "Mempool node role: transaction collection, block construction, and coordination with miners and storage.",
    title: "Mempool node",
    children: (
      <>
        <p>
          The mempool node is part of a bounded set of long-lived components that
          accept user transactions, batch them into blocks, and work with the mining
          network. Public miners still produce work; the design separates “who
          assembles the next block” from “who stores history forever” and “who
          expends hashrate this round.”
        </p>
        <h2>Balance of roles</h2>
        <p>
          Mempool and miner responsibilities are interdependent. If either side
          failed entirely, the system could not make progress. Storage nodes are the
          durable home for decided blocks. Engineering trade-offs in how many
          mempool vs. storage nodes run in production are policy and operations
          questions for each deployment.
        </p>
        <h2>Typical code layout (reference style)</h2>
        <p>
          In reference implementations you may see a node core, an interface to the
          outside world, and a request/response type set that describes the mempool’s
          RPC or HTTP contract. Use the name you find in the repository you are
          building against, not a historical label.
        </p>
        <h2>Block construction in outline</h2>
        <p>
          Each round, the mempool set advances a pool of valid transactions, agrees
          on ordering within protocol rules, and hands a candidate to miners. If the
          pool is large, a subset is chosen and the rest remains for a later block.
        </p>
        <h2>Interaction with miners and storage</h2>
        <p>
          Miners in the active set submit work back to the mempool; the winner’s
          block is checked and then forwarded to storage nodes for persistent
          replication. See <Link href="/docs/concepts/miner-node">Miner node</Link>,{" "}
          <Link href="/docs/concepts/storage-node">Storage node</Link>, and{" "}
          <Link href="/docs/concepts/block-mining">Block mining</Link>.
        </p>
      </>
    ),
  },
  "/docs/concepts/storage-node": {
    description:
      "Storage node role: long-term chain history, replication, and serving reads to clients.",
    title: "Storage node",
    children: (
      <>
        <p>
          Storage nodes keep the full chain history. They receive valid blocks from
          the network (typically from the path that starts at the mempool) and
          replicate them for durability and for API consumers who need deep history.
        </p>
        <h2>Responsibility</h2>
        <p>
          The core job is to persist blocks and the indices that let clients look up
          headers, transaction ids, and related proofs. A reference design may use
          distributed consensus between storage operators so all replicas agree on
          the same head.
        </p>
        <h2>Receiving and validating blocks</h2>
        <p>
          In practical implementations, new blocks are checked against the expected
          identifiers and invariants, then written only if they match peer state. If
          two candidates conflict, consensus rules in the code decide the outcome.
        </p>
        <h2>UNiCORN and other witness data</h2>
        <p>
          Validation can depend on special random or witness material described in
          <Link href="/docs/concepts/unicorns">Unicorns</Link>. Storage preserves that
          data so that light clients and auditors can re-check proofs later.
        </p>
        <h2>DRUIDs and audit trails</h2>
        <p>
          If your product records swap or asset flows with a DRUID-style identifier,
          storage makes that history available for indexers. Exact storage layout is
          version-specific; consult the open-source project for the release you
          target.
        </p>
        <h2>HTTP API</h2>
        <p>
          Read-oriented routes like block by height, latest block, and entry by
          hash are documented under <Link href="/docs/api/storage/storage-api">Storage API</Link>.
        </p>
      </>
    ),
  },
  "/docs/concepts/miner-node": {
    description:
      "Miner node role: proof-of-work, round participation, and sending blocks back for validation.",
    title: "Miner node",
    children: (
      <>
        <p>
          Miner nodes compete to extend the chain when it is their turn. They
          receive work units from the mempool path, find a valid proof, and return
          it so the mempool can declare a winner and forward the block to storage.
        </p>
        <h2>Many participants, limited sets per round</h2>
        <p>
          The protocol does not require every miner on the planet to grind on the
          same block at once. A subset is selected for each round; that keeps energy
          use proportionate to the work actually needed. Selection uses randomness
          derived from the shared UNiCORN (see <Link href="/docs/concepts/unicorns">Unicorns</Link> and{" "}
          <Link href="/docs/concepts/block-mining">Block mining</Link>).
        </p>
        <h2>After a block is found</h2>
        <p>
          The winning miner&apos;s block is sent to the mempool for validation, then
          to storage. Rewards follow the network’s token rules in the build you use.
        </p>
        <h2>Operator surface</h2>
        <p>
          The public HTTP area for mining is small compared to mempool and storage;
          see <Link href="/docs/api/miner/miner-api">Miner API</Link> and the mining
          operator guides for installation and runtime flags.
        </p>
      </>
    ),
  },
  "/docs/concepts/block-mining": {
    description:
      "End-to-end block flow: mempool, miners, storage, and UNiCORN-based selection in Lineage.",
    title: "Block mining",
    children: (
      <>
        <p>
          Mining a block is a multi-step collaboration: users send transactions to
          the mempool, the mempool assembles a candidate, a subset of miners work on
          it, a winner is chosen, and the result is written to storage.
        </p>
        <h2>Summary flow</h2>
        <ol>
          <li>Client transactions are accepted and queued by the mempool path.</li>
          <li>
            When a round starts, a block body is built from the queue and offered to
            the miners selected for that round.
          </li>
          <li>Miners produce proofs and return candidates.</li>
          <li>
            The mempool picks the winner, validates the block, and sends it to
            storage.
          </li>
        </ol>
        <h2>UNiCORN</h2>
        <p>
          One randomness object per round, derived from agreed inputs (transactions,
          miner set, and prior round metadata), drives who may mine and who wins.{" "}
          <Link href="/docs/concepts/unicorns">Unicorns</Link> has more detail.
        </p>
        <h2>Parallelism in some implementations</h2>
        <p>
          Real implementations can pipeline more than one block height at a time;
          field names like <code>previous_hash</code> may not mean “the immediately
          prior block in the same way a naive client expects” when overlap is
          allowed. Rely on the spec and code in the build you use.
        </p>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/docs/concepts/mempool-node">Mempool node</Link>
          </li>
          <li>
            <Link href="/docs/concepts/miner-node">Miner node</Link>
          </li>
          <li>
            <Link href="/docs/concepts/storage-node">Storage node</Link>
          </li>
        </ul>
      </>
    ),
  },
  "/docs/concepts/transactions": {
    description:
      "UTXO-style transactions on Lineage: inputs, outputs, and how they move value.",
    title: "Transactions",
    children: (
      <>
        <p>
          Lineage uses a UTXO model: a transaction spends one or more previous
          outputs and creates new outputs that the next spend can refer to. There is
          no global “account balance” in the contract layer — balances are a view
          over unspent outputs.
        </p>
        <h2>Inputs and outputs</h2>
        <p>
          Each input points at a previous transaction hash and output index and
          carries a script that proves you may spend that coin. Each output states how
          much value is locked and under which script (e.g. pay-to-pubkey-hash style).
        </p>
        <h2>Versioning and metadata</h2>
        <p>
          Transactions carry a version and optional application-specific data (e.g.
          DRUID or item metadata) that higher layers can interpret. Your wallet or
          index should only rely on what your release’s schema guarantees.
        </p>
        <h2>HTTP API</h2>
        <p>
          Creating and querying transactions is covered under the{" "}
          <Link href="/docs/api/mempool/mempool-api">Mempool API</Link>, especially{" "}
          <Link href="/docs/api/mempool/create-tx">create_transactions</Link> and
          address balance routes.
        </p>
      </>
    ),
  },
  "/docs/concepts/two-way-transaction": {
    description:
      "Two-way transactions: coordinated halves that let two parties settle in one block in Lineage.",
    title: "Two-way transaction",
    children: (
      <>
        <p>
          A “two-way” flow lets two parties each contribute a compatible half to a
          single block so an exchange or payment can clear atomically in the
          present-facing design — without a smart-contract runtime as you would on
          some other chains. The details are protocol- and product-specific; treat
          this page as a map, not a legal guarantee of a particular use case.
        </p>
        <h2>When it applies</h2>
        <p>
          Scenarios that need both sides to sign before either side’s funds move are
          the main motivation. Wallets and SDKs hide most of the wiring.
        </p>
        <h2>Related</h2>
        <ul>
          <li>
            <Link href="/docs/concepts/transactions">Transactions</Link>
          </li>
          <li>
            <Link href="/docs/2wayjs-tutorials">2Way.js tutorials</Link> (reference
            client naming; a Lineage-branded client may use different names)
          </li>
          <li>
            <Link href="/docs/api/mempool/transaction">Transaction API (mempool)</Link>
          </li>
        </ul>
      </>
    ),
  },
  "/docs/concepts/unicorns": {
    description:
      "Unicorns (UNiCORN): randomness and witness material used in Lineage mining and storage.",
    title: "Unicorns",
    children: (
      <>
        <p>
          <strong>UNiCORN</strong> (often shortened to “Unicorn” in docs) is the
          randomness and witness object that ties together a round of mining: it
          depends on the transactions in the block, which miners are eligible, and
          recent chain state, so the selection of winners is hard to bias without
          breaking consensus.
        </p>
        <h2>What it is for</h2>
        <ul>
          <li>Restricting which miners can attempt work in a given round</li>
          <li>Choosing the winning valid proof</li>
          <li>Supplying data storage nodes re-check for validation</li>
        </ul>
        <h2>Implementation note</h2>
        <p>
          Field names and the exact mix of hash inputs are defined in the core
          software. If you are auditing randomness, read the spec and the code for
          the commit you run — do not assume this short summary is exhaustive.
        </p>
        <h2>Related</h2>
        <ul>
          <li>
            <Link href="/docs/concepts/block-mining">Block mining</Link>
          </li>
          <li>
            <Link href="/docs/api/storage/latest-block">latest_block (storage API)</Link>
          </li>
        </ul>
      </>
    ),
  },
};
