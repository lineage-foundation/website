import Link from "next/link";

import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
  URL_GITHUB_ORG,
} from "@/lib/constants";

import type { PortedDocPage } from "./types";

export const MORE_PORTED: Record<string, PortedDocPage> = {
  "/docs/2wayjs-tutorials": {
    description:
      "2Way.js-style wallet tutorials: conceptual guide for JS/TS clients (package names may differ in Lineage releases).",
    title: "2Way.js",
    children: (
      <>
        <p>
          This section records wallet integration patterns that were originally
          documented with a JavaScript client. The public Lineage stack may ship a
          different package name or split responsibilities across modules — use these
          pages for <strong>concepts</strong>, and check{" "}
          <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">
            GitHub
          </a>{" "}
          for the exact SDK you install today.
        </p>
        <h2>Pages</h2>
        <ul>
          <li>
            <Link href="/docs/2wayjs-tutorials/get-started">Get started</Link> — install, configure, and create a wallet.
          </li>
          <li>
            <Link href="/docs/2wayjs-tutorials/create-an-item">Create an item</Link> — asset and item-style flows.
          </li>
          <li>
            <Link href="/docs/2wayjs-tutorials/two-way-payments">Two-way payments</Link> — multi-party payment patterns.
          </li>
          <li>
            <Link href="/docs/2wayjs-tutorials/send-and-receive">Send and receive</Link> — basic transfers.
          </li>
        </ul>
        <p>
          Prefer the <Link href="/docs/api/overview">API reference</Link> if you
          are integrating without a high-level client.
        </p>
      </>
    ),
  },
  "/docs/2wayjs-tutorials/get-started": {
    description:
      "Get started with a Lineage-style JS wallet: install, init, and first balance read.",
    title: "Get started (2Way.js style)",
    children: (
      <>
        <p>
          Reference stacks often provide an npm package for wallets. Replace the
          package and host names in the following with the Lineage or community
          client you are actually using; the flow (install → configure hosts →
          create or restore a wallet) stays the same.
        </p>
        <h2>Install</h2>
        <pre>{`# Example only — confirm package name in the repo you use
npm install <lineage-or-community-wallet>`}</pre>
        <h2>Configuration</h2>
        <p>
          You typically set at least: a <strong>mempool</strong> base URL, a{" "}
          <strong>storage</strong> base URL, and a <strong>passphrase</strong> to
          encrypt local keys. Optional: an intercom or coordination host for
          two-party transactions. All hosts must match a deployment you trust.
        </p>
        <p>
          The public example bases used in this site’s API documentation are{" "}
          <code>{DOCS_MEMPOOL_API_ORIGIN}</code>,{" "}
          <code>{DOCS_STORAGE_API_ORIGIN}</code>, and <code>{DOCS_MINER_API_ORIGIN}</code>{" "}
          (see the <Link href="/docs/api/overview">API overview</Link>).
        </p>
        <h2>Create or restore a wallet</h2>
        <p>
          Common patterns: <strong>init new</strong> (new seed),{" "}
          <strong>from seed</strong> (backup phrase), or{" "}
          <strong>from encrypted master key</strong> (device restore). The SDK
          returns a seed phrase and encrypted key material; store them with your
          app’s security model (secure enclave, OS keychain, or hardware, as
          appropriate).
        </p>
        <h2>Offline and limited modes</h2>
        <p>
          Some clients allow offline key generation. Network operations will fail
          until you call a network <code>init</code> with real hosts; that is
          intentional.
        </p>
        <h2>Next</h2>
        <p>
          See <Link href="/docs/2wayjs-tutorials/send-and-receive">Send and receive</Link> and{" "}
          <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link> in the
          API reference to verify connectivity without a full wallet UI.
        </p>
      </>
    ),
  },
  "/docs/2wayjs-tutorials/create-an-item": {
    description:
      "Create items or assets on Lineage using a high-level client (conceptual).",
    title: "Create an item",
    children: (
      <>
        <p>
          Item and asset creation flows attach value and metadata to new outputs. A
          client builds a request, signs with keys you control, and sends it
          through the mempool path. Field names in your SDK may differ; align with
          the version you have installed.
        </p>
        <h2>Relation to the API</h2>
        <p>
          The low-level HTTP shape is similar in spirit to{" "}
          <Link href="/docs/api/mempool/create-item-asset">create_item_asset</Link>.
          A typical wallet SDK abstracts this into fewer parameters and enforces your policy
          (fees, change addresses, and dry-run).
        </p>
        <h2>Validation</h2>
        <p>
          Always test on a test network or a local stack before you move real value.
        </p>
      </>
    ),
  },
  "/docs/2wayjs-tutorials/two-way-payments": {
    description: "Two-way payment flows: coordinated multi-party payments with a Lineage client.",
    title: "Two-way payments",
    children: (
      <>
        <p>
          Two-way payments let two parties each sign compatible halves so the
          exchange clears in a single consensus round when the protocol and client
          support it. The sequence (draft, exchange of partials, final combine, and
          broadcast) is client-specific.
        </p>
        <h2>Concept</h2>
        <p>
          See <Link href="/docs/concepts/two-way-transaction">Two-way transaction (concepts)</Link> for the network-level idea, then your SDK for the exact
          call order.
        </p>
        <h2>API-level background</h2>
        <p>
          <Link href="/docs/api/mempool/transaction">Transaction (mempool)</Link> and{" "}
          <Link href="/docs/api/mempool/create-tx">create_transactions</Link> show the
          raw request shape when you are not using a high-level client.
        </p>
      </>
    ),
  },
  "/docs/2wayjs-tutorials/send-and-receive": {
    description: "Send and receive tokens with a Lineage-style wallet: addresses, fees, and confirmation.",
    title: "Send and receive",
    children: (
      <>
        <p>
          Sending spends existing outputs; receiving means sharing an address the
          payer can target. A wallet hides UTXO selection, change outputs, and fee
          estimation; you still choose whether to require confirmations before
          crediting a user in your product.
        </p>
        <h2>Balance</h2>
        <p>
          Use the client’s <code>fetch balance</code> or call{" "}
          <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link> on the
          node API to reconcile with the chain.
        </p>
        <h2>Broadcast</h2>
        <p>
          After signing, the client submits to the mempool. If submission fails, you
          get an error in the same envelope the HTTP API returns.
        </p>
      </>
    ),
  },
  "/docs/valence-node": {
    description:
      "Valence application server: routes and hosting Lineage-integrated services (naming may differ by release).",
    title: "Valence node",
    children: (
      <>
        <p>
          <strong>Valence</strong> describes an application server pattern: HTTP
          routes, optional plugins, and integration with the chain through the same
          public APIs a browser would use. Lineage’s current product packaging may
          rename or split these pieces; this section keeps the architectural
          outline.
        </p>
        <h2>When to use it</h2>
        <p>
          You might run Valence-style software when you need a first-party API for
          your dapp, rate limits, auth, or colocated indexing — while still
          ultimately submitting transactions to the public mempool and reading from
          storage.
        </p>
        <h2>Sub-pages</h2>
        <ul>
          <li>
            <Link href="/docs/valence-node/get-started">Get started</Link>
          </li>
          <li>
            <Link href="/docs/valence-node/available-routes">Available routes</Link>
          </li>
        </ul>
        <p>
          Verify port numbers, process names, and feature flags in the repository
          for your release.
        </p>
      </>
    ),
  },
  "/docs/valence-node/get-started": {
    description: "Run a Valence-style Lineage app server: install, config, and first boot.",
    title: "Valence node — get started",
    children: (
      <>
        <p>
          Install the application server from the org repository that ships your
          integration target. You will configure listening addresses, TLS, upstream
          mempool and storage base URLs, and any plugin directories.
        </p>
        <h2>Typical flow</h2>
        <ol>
          <li>Build or pull the server binary / container for your version.</li>
          <li>
            Set environment or config for chain endpoints and secrets (use your
            secret store in production).
          </li>
          <li>Start the process and check health and logs for successful bind.</li>
        </ol>
        <h2>Next</h2>
        <p>
          <Link href="/docs/valence-node/available-routes">Available routes</Link> and{" "}
          <Link href="/docs/valence-core">Valence core</Link> for plugins.
        </p>
      </>
    ),
  },
  "/docs/valence-node/available-routes": {
    description: "Valence node HTTP routes: how your app server exposes JSON and static handlers.",
    title: "Available routes",
    children: (
      <>
        <p>
          The concrete route table is part of the server you run: paths for health,
          wallet proxying, and admin may differ between minor versions. In general,
          you should expect: a health or readiness check, one or more JSON routes
          that forward to upstream Lineage nodes, and optional static or webhook
          endpoints.
        </p>
        <h2>Lineage public API</h2>
        <p>
          For chain behaviour, still refer to the{" "}
          <Link href="/docs/api/overview">API overview</Link>; your Valence
          process is a <em>client</em> of that API toward the network.
        </p>
      </>
    ),
  },
  "/docs/valence-core": {
    description:
      "Valence core: plugins, embedding, and extending a Lineage app server (conceptual).",
    title: "Valence core",
    children: (
      <>
        <p>
          The “core” is the embeddable part of the server: lifecycle hooks, plugin
          registration, and shared context. Treat it as an extension point, not a
          second consensus layer — plugins do not change chain rules, they add
          application behaviour around them.
        </p>
        <h2>Sub-pages</h2>
        <ul>
          <li>
            <Link href="/docs/valence-core/how-to-use">How to use</Link>
          </li>
          <li>
            <Link href="/docs/valence-core/use-plugins">Use plugins</Link>
          </li>
        </ul>
      </>
    ),
  },
  "/docs/valence-core/how-to-use": {
    description: "Embed and configure Valence core in your Lineage-integrated service.",
    title: "Valence core — how to use",
    children: (
      <>
        <p>
          Link the core library into your binary or use the prebuilt server. You
          provide configuration for logging, data directories, and which plugins
          load at startup. Thread safety and async runtime choices follow the
          repository’s best practices.
        </p>
        <h2>Lifecycle</h2>
        <p>
          Initialise core, register plugins, start the HTTP listener, and shut down
          cleanly on SIGTERM. Watch for breaking changes in minor releases when
          plugin ABIs change.
        </p>
      </>
    ),
  },
  "/docs/valence-core/use-plugins": {
    description: "Write and load Valence plugins: hooks, manifests, and isolation (conceptual).",
    title: "Use plugins",
    children: (
      <>
        <p>
          Plugins are modules the core loads to add routes or background work. A
          manifest (format depends on the release) names the entry point and
          declared permissions. Keep plugins stateless or persist through explicit
          APIs so you can scale out behind a load balancer.
        </p>
        <h2>Security</h2>
        <p>
          Only load code you trust. Plugins run with the same secrets as the parent
          process unless you implement isolation yourself.
        </p>
      </>
    ),
  },
  "/docs/mining-overview": {
    description:
      "Lineage mining overview: fairness goals, energy profile, and where to go next.",
    title: "Mining overview",
    children: (
      <>
        <p>
          Mining on Lineage is designed so participation stays broadly accessible: a
          combination of round-based assignment, light-friendly proof work where the
          protocol allows, and randomness (see{" "}
          <Link href="/docs/concepts/unicorns">Unicorns</Link>) to spread opportunity
          across the miner set. Always read the current economics and difficulty
          rules in the release you target — numbers change with governance and code.
        </p>
        <h2>Fairness and accessibility</h2>
        <p>
          The network aims to limit advantages that only hyperscale ASIC farms would
          have, while still using proof of work in the places the chain requires it.
          Your real-world electricity and hardware costs still matter: “CPU
          friendliness” in documentation is a design goal, not a personal profit
          guarantee.
        </p>
        <h2>Energy</h2>
        <p>
          Round limits and selection reduce redundant grinding compared to
          every-miner-everywhere models; track actual power draw in your
          environment for sustainability reporting.
        </p>
        <h2>Next steps on this site</h2>
        <ul>
          <li>
            <Link href="/docs/mining/hardware-requirements">Hardware requirements</Link>
          </li>
          <li>
            <Link href="/docs/mining/installing-a-lite-node">Installing a lite node</Link>
          </li>
          <li>
            <Link href="/docs/mining/installing-a-mining-node">Installing a mining node</Link>
          </li>
          <li>
            <Link href="/docs/mining/managing-a-node">Managing a node</Link>
          </li>
        </ul>
        <h2>Primary sources</h2>
        <p>
          The whitepaper and <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">GitHub</a> are authoritative for
          protocol and economics. External blog or Medium posts linked in older
          material may be historical context only.
        </p>
      </>
    ),
  },
  "/docs/mining/hardware-requirements": {
    description: "Hardware expectations for running a Lineage miner or lite node (guidance, not a guarantee).",
    title: "Hardware requirements",
    children: (
      <>
        <p>
          Requirements depend on the role: a storage archive needs fast disks and
          memory for chain data; a miner needs reliable CPU and stable networking; a
          “lite” participant may need far less. Use the checklists in the
          installation sections for the package you run.
        </p>
        <h2>CPU and memory</h2>
        <p>
          Mining rounds need timely responses; under-provisioned hosts miss slots.
          Give the process enough RAM for your configured cache and the OS, plus
          headroom for spikes.
        </p>
        <h2>Storage</h2>
        <p>
          Miners and mempool nodes are not the same as archival storage; still, plan
          for logs, temporary state, and OS updates. Storage nodes will need
          large, redundant disks as defined in operator docs.
        </p>
        <h2>Network</h2>
        <p>
          Low latency to peers matters for submitting proofs before round closure.
        </p>
      </>
    ),
  },
  "/docs/mining/installing-a-lite-node": {
    description: "Install a lightweight Lineage node for limited participation (non-archival, role-specific).",
    title: "Installing a lite node",
    children: (
      <>
        <p>
          A lite node in this context means a smaller footprint: you follow the
          chain and perhaps participate in a limited role, without running full
          archival storage. Exact packages and feature flags are in the repository’s
          install guide; this page is the high-level order of operations.
        </p>
        <h2>Typical steps</h2>
        <ol>
          <li>Install the correct binary or container for your OS and version.</li>
          <li>
            Create a data directory and config for peers, log level, and network id.
          </li>
          <li>Start the service and confirm it syncs to the same network you intend.</li>
        </ol>
        <h2>Security</h2>
        <p>
          Protect signing keys, RPC credentials, and firewall rules even on
          “small” nodes.
        </p>
        <h2>Next</h2>
        <p>
          <Link href="/docs/mining/managing-a-node">Managing a node</Link>
        </p>
      </>
    ),
  },
  "/docs/mining/installing-a-mining-node": {
    description: "Install a Lineage miner: binaries, peering, and first successful round (orientation).",
    title: "Installing a mining node",
    children: (
      <>
        <p>
          Mining software connects to the mempool path, follows round announcements,
          and returns proofs. Installation steps vary by build; you will always: get
          a supported binary, set identity and pay-to keys, and open inbound/outbound
          rules as the README requires.
        </p>
        <h2>Key management</h2>
        <p>
          Configure reward addresses and any operator keys in line with the project’s
          wallet or config format. Test on a testnet first.
        </p>
        <h2>Monitoring</h2>
        <p>
          Add metrics, log shipping, and alerts for missed rounds, peer disconnects, and
          high CPU.
        </p>
        <h2>Reference</h2>
        <p>
          <Link href="/docs/concepts/miner-node">Miner node (concepts)</Link>,{" "}
          <Link href="/docs/api/miner/miner-api">Miner API</Link>
        </p>
      </>
    ),
  },
  "/docs/mining/managing-a-node": {
    description: "Operate a Lineage node: upgrades, keys, monitoring, and incident response.",
    title: "Managing a node",
    children: (
      <>
        <p>
          After installation, you own upgrades, key rotation, backups, and
          performance tuning. For production, pin versions, use staged rollouts, and
          read release notes for consensus-critical changes.
        </p>
        <h2>Upgrades</h2>
        <p>
          Plan maintenance windows, snapshot data when required, and verify each
          node rejoins the right network after restart.
        </p>
        <h2>Keys and access</h2>
        <p>
          Separate operator keys from reward keys. Restrict RPC to localhost or trusted
          networks. Audit who can sign or submit configuration changes.
        </p>
        <h2>Support</h2>
        <p>
          Use the issue tracker in{" "}
          <a href={URL_GITHUB_ORG} rel="noopener noreferrer" target="_blank">GitHub</a> and your team’s on-call process for
          outages.
        </p>
      </>
    ),
  },
  "/docs/build-apps/design-considerations": {
    description:
      "Design Lineage dapps: API usage, confirmation UX, idempotency, and operational safety.",
    title: "Design considerations for apps",
    children: (
      <>
        <p>
          Building a reliable client on a public L1 is mostly engineering discipline:
          use idempotent request ids (<code>x-cache-id</code> in the node API,
          <Link href="/docs/api/mempool/fetch-balance">fetch_balance</Link>), don’t
          trust a single untested node, and show users meaningful errors when
          broadcast fails.
        </p>
        <h2>On-chain vs. off-chain state</h2>
        <p>
          Your database should reconcile with chain history; the HTTP API is the
          source of truth for final settlement. Reorg depth and display rules for
          “confirmed” are product choices — document them.
        </p>
        <h2>Rate limits and abuse</h2>
        <p>
          Public nodes can throttle. Cache reads, use websockets or batch calls only
          if the deployment supports them, and host your own infrastructure at scale.
        </p>
        <h2>Keys</h2>
        <p>
          Prefer hardware or OS-backed signing for any hot wallet. Never ship
          passphrases in front-end bundles.
        </p>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/docs/api-tutorials/get-started">API quick start</Link>
          </li>
          <li>
            <Link href="/docs/api/overview">API overview</Link>
          </li>
        </ul>
      </>
    ),
  },
};
