import type { Metadata } from "next";
import Link from "next/link";

import { ArcoLoop } from "@/components/technology/ArcoLoop";
import { EfficiencyChart } from "@/components/technology/EfficiencyChart";
import styles from "@/components/technology/TechLayout.module.css";
import {
  AsideCard,
  Button,
  Card,
  Eyebrow,
  Heading,
  LinkCta,
  Section,
  Stat,
  Table,
} from "@/components/ui";
import {
  DOCS_MEMPOOL_API_ORIGIN,
  DOCS_MINER_API_ORIGIN,
  DOCS_STORAGE_API_ORIGIN,
  SITE_ORIGIN,
  URL_YOUTUBE_VIDEO,
  URL_ZENODO_WHITEPAPER,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Technology | Lineage",
  },
  description:
    "The ARCO compute loop, Universal Turing Market Machines, Prime Radiant Consensus and the node subsystems behind the Lineage Layer-1.",
  alternates: {
    canonical: "/technology",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Technology | Lineage",
    description: "Interactive ARCO flow and market state visualization.",
    url: `${SITE_ORIGIN}/technology`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology | Lineage",
    description: "Interactive ARCO flow and market state visualization.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

/* ─── PAGE HEAD ────────────────────────────────────────────────────────────── */

export default function TechnologyPage() {
  return (
    <>
      {/* PAGE HEAD */}
      <Section
        visual="feature"
        eyebrow="Technology"
        heading={
          <>
            ARCO: the compute <span style={{ color: "var(--color-accent)" }}>loop</span>
          </>
        }
        headingLevel={1}
        headingVariant="display"
        spacing="loose"
      >
        <p className={styles.sectionProse} style={{ marginBottom: 0 }}>
          ARCO is the market-optimization loop at the heart of Lineage — five
          stages (sensor, relay, compute, actuator, event) that repeat each
          cycle. Over successive cycles a market moves from an inefficient
          initial state toward a more efficient one, while consensus secures the
          integrity of that adaptive evolution.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href="/docs" variant="primary">
            Read the docs
          </Button>
          <Button href={URL_ZENODO_WHITEPAPER} variant="secondary" external>
            Whitepaper
          </Button>
        </div>
      </Section>

      {/* ARCO LOOP */}
      <Section
        id="arco"
        eyebrow="The compute loop"
        heading="Five stages, one deterministic cycle"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          ARCO advances through a fixed sequence of stages. Each stage consumes
          the output of the previous one and writes to the shared ledger, so
          market state evolves predictably across cycles rather than executing
          fixed rules.
        </p>
        <ArcoLoop />
      </Section>

      {/* THE MOAT */}
      <Section
        id="moat"
        eyebrow="Why Lineage"
        heading="Built for markets, not just transactions"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Payments and contracts run on many platforms. A smart market asks for
          more: it evolves continuously with external conditions and reaches
          consensus among every participant, so it can never be captured by
          fixed code. Five architectural choices — present from layer-1 up —
          are what make adaptive markets possible here.
        </p>
        <div className={styles.moatGrid}>
          <Card rail title="Complete transaction records">
            <div className={styles.num}>01</div>
            <p>
              A transaction-based (UTXO) ledger preserves the full transaction
              — every order and settlement — not just net debits and credits.
              That complete economic record is the raw material on-chain market
              analysis runs on.
            </p>
          </Card>
          <Card rail title="Intelligence at layer-1">
            <div className={styles.num}>02</div>
            <p>
              GPU proof-of-work does double duty: it secures the chain and
              supplies the compute for analytics. A dedicated{" "}
              <code>op-ai-evaluate</code> opcode runs AI evaluation directly
              over transaction data, inside consensus.
            </p>
          </Card>
          <Card rail title="Real-world data, no oracles">
            <div className={styles.num}>03</div>
            <p>
              IoT readings, climate data and other external signals enter the
              ledger as first-class blockchain items, validated at layer-1 by
              the mining network itself — so market functions never inherit an
              external oracle&rsquo;s trust assumptions.
            </p>
          </Card>
          <Card rail title="Security at the consensus layer">
            <div className={styles.num}>04</div>
            <p>
              Market logic and data live at layer-1, secured by the entire
              mining network. There is no separate application layer to
              compromise; subverting a market would mean overpowering the whole
              network, not a handful of nodes.
            </p>
          </Card>
          <Card rail title="Markets that adapt">
            <div className={styles.num}>05</div>
            <p>
              Prices are discovered by consensus among all participants and move
              with conditions, so a market responds to unforeseen events —
              tariffs, shocks, supply disruptions — instead of freezing.
              Compute scales with value: more valuable markets attract more
              miners.
            </p>
          </Card>
        </div>
      </Section>

      {/* UTMM */}
      <Section
        id="utmm"
        tone="band"
        eyebrow="Solution detail"
        heading="Universal Turing Market Machines"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Traditional blockchains execute fixed rules. UTMMs allow market policy
          itself to evolve. Instead of hard-coding mechanisms, the network
          performs bounded search over policy space and verifies results
          cryptographically.
        </p>
        <div className={styles.grid3}>
          <Card rail title="Feature Extraction">
            <div className={styles.num}>01</div>
            <p>
              Transaction history becomes an epistemic substrate. Deterministic
              operators extract signals from market activity.
            </p>
          </Card>
          <Card rail title="Adaptive Policy Search">
            <div className={styles.num}>02</div>
            <p>
              Genetic algorithms and bounded optimisation explore policy space.
              Better market policies survive through deterministic evaluation.
            </p>
          </Card>
          <Card rail title="Verifiable Intelligence">
            <div className={styles.num}>03</div>
            <p>
              Zero-knowledge verification proves policy evaluation correctness
              without rerunning computation.
            </p>
          </Card>
        </div>
      </Section>

      {/* EVENT OPTIMIZATION — split layout */}
      <Section id="evolution" aria-labelledby="evolution-title" headingLevel={2}>
        <div className={styles.split}>
          <div>
            <Eyebrow>Event stage — pseudocode</Eyebrow>
            <Heading
              level={2}
              id="evolution-title"
              style={{ marginTop: "var(--space-3)", marginBottom: "var(--space-5)" }}
            >
              Policy as an evolving program
            </Heading>
            <p className={styles.sectionProse}>
              At the Event stage, ledger transactions are discovered into a
              transaction set, compiled into a finite-state machine, and improved
              through fitness-guided evolution. The optimized policy is then
              broadcast to participants.
            </p>
            {/* Pseudocode — static, hand-authored spans; literal class names match
                .codeBlock :global(.c/.k) in TechLayout.module.css */}
            <pre
              className={styles.codeBlock}
              aria-label="ARCO event optimization pseudocode"
              dangerouslySetInnerHTML={{
                __html: `<span class="c">// ARCO Event Optimization</span>

<span class="k">const</span> soil_tx   = loadLedgerSoilTransactions();
<span class="k">const</span> market_tx = loadLedgerMarketTransactions();

<span class="k">const</span> T    = discoverTransactionSet(soil_tx, market_tx);
<span class="k">const</span> FSM0 = buildFSMfromTransactions(T);

<span class="k">function</span> fitness(FSM) {
  <span class="k">const</span> r = simulateSeason(FSM);
  <span class="k">return</span> weightedSUM(
    r.meanYield(),
    r.meanProfit(),
    -r.priceShockVariance()
  );
}

<span class="k">let</span> POP = initPopulation();
<span class="k">while</span> (!converged) {
  POP = evolvePopulation(POP, fitness);
}

<span class="k">const</span> FSM_opt = bestCandidate(POP);
broadcastToFarmers(FSM_opt.policy());`,
              }}
            />
          </div>
          <AsideCard>
            <Eyebrow>Simulation — market efficiency</Eyebrow>
            <Heading
              level={3}
              style={{ margin: "var(--space-3) 0 var(--space-4)" }}
            >
              A market clearing more efficiently each cycle
            </Heading>
            <EfficiencyChart />
            <p className={styles.simNote}>
              Efficiency climbs fastest in the early cycles, then flattens as
              the market settles near its equilibrium — driven by the yield,
              profit and price-stability signals the optimizer maximises.
            </p>
            <p className={styles.simNote}>
              Want to run the simulation yourself? The UTMM repository ships
              the model and setup instructions in its README.
            </p>
            <LinkCta href="https://github.com/lineage-foundation/utmm">
              Run the UTMM simulation
            </LinkCta>
          </AsideCard>
        </div>
      </Section>

      {/* PRIME RADIANT CONSENSUS */}
      <Section
        id="consensus"
        tone="band"
        eyebrow="Why it wins — technical"
        heading="Prime Radiant Consensus"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Prime Radiant Consensus is Lineage&rsquo;s consensus mechanism &mdash;
          technically{" "}
          <strong>Dynamic Proof of Weighted Work (DPoWW)</strong>, an evolution
          of ecoPoW. It secures not only transaction ordering but the integrity
          of adaptive market evolution, shifting between fully distributed and
          semi-decentralized modes for throughput and reverting to full
          distribution when fault conditions require it. Miners produce blocks
          while also participating in economic evolution.{" "}
          <LinkCta
            href="https://zenodo.org/records/15730321"
            muted
            style={{ display: "inline-flex", marginLeft: "0.4em" }}
          >
            Read the DPoWW paper
          </LinkCta>
        </p>
        <div className={styles.grid3}>
          <Card rail title="GPU-Native Mining">
            <div className={styles.num}>01</div>
            <p>
              <a
                href="https://github.com/lineage-foundation/sandworm"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-link)" }}
              >
                SandWorm Hash
              </a>{" "}
              incentivizes GPU hardware. GPUs compute ML, VAR, and
              genetic-algorithm workloads.
            </p>
          </Card>
          <Card rail title="Deterministic Time">
            <div className={styles.num}>02</div>
            <p>
              Blocks map directly to UTC time, enabling predictable evaluation
              windows and synchronised policy updates.
            </p>
          </Card>
          <Card rail title="Blockchain Service Providers">
            <div className={styles.num}>03</div>
            <p>
              Architected for commercial performance and integration. API routes
              into the Layer-1 bring agents directly on-chain.
            </p>
          </Card>
        </div>
        <div className={styles.centerCta}>
          <LinkCta href={URL_YOUTUBE_VIDEO}>
            Watch the overview on YouTube
          </LinkCta>
        </div>
      </Section>

      {/* SUBSYSTEMS */}
      <Section
        id="subsystems"
        eyebrow="The network nodes"
        heading="Mempool, Storage & Miner"
        headingLevel={2}
      >
        <p className={styles.sectionProse}>
          Mempool, storage, and miner nodes run the Layer-1 itself. The
          loop&rsquo;s Compute stage executes across these subsystems, each
          running on its own host with its own HTTP API for transactions, ledger
          reads, and mining coordination.
        </p>
        <Table>
          <thead>
            <tr>
              <th scope="col">Subsystem</th>
              <th scope="col">Responsibility</th>
              <th scope="col">API origin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mempool</td>
              <td>
                Verifies inbound transactions and builds the nested Merkle root
                for the next block.
              </td>
              <td style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>
                {DOCS_MEMPOOL_API_ORIGIN}
              </td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>
                Verifies <Link href="/docs#c-unicorn">UNiCORN</Link> linkage,
                applies UTXO changes, and appends the block to the ledger.
              </td>
              <td style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>
                {DOCS_STORAGE_API_ORIGIN}
              </td>
            </tr>
            <tr>
              <td>Miner</td>
              <td>
                Builds the coinbase transaction and searches proof of work over
                the miner root.
              </td>
              <td style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>
                {DOCS_MINER_API_ORIGIN}
              </td>
            </tr>
          </tbody>
        </Table>
        <div className={styles.centerCta}>
          <LinkCta href="/developers" muted>
            Explore the node APIs
          </LinkCta>
        </div>
      </Section>

      {/* IMPACT */}
      <Section
        id="impact"
        tone="band"
        eyebrow="Why it wins — economic"
        heading="Impact"
        headingLevel={2}
      >
        <div className={styles.grid3}>
          <Card rail title="Markets Discover Knowledge">
            <div className={styles.num}>01</div>
            <p>
              Markets aggregate dispersed information. UTMMs formalise that
              discovery process inside consensus.
            </p>
          </Card>
          <Card rail title="Policy Becomes Programmable">
            <div className={styles.num}>02</div>
            <p>
              Instead of static rules, institutions evolve through verifiable
              selection pressure.
            </p>
          </Card>
          <Card rail title="Economic Intelligence Compounds">
            <div className={styles.num}>03</div>
            <p>
              Better policies persist; bad policies disappear. The system
              improves continuously.
            </p>
          </Card>
        </div>
        <div className={styles.statsGrid}>
          <Stat value="—" label="Block-to-UTC mapping" />
          <Stat value="—" label="Policy evaluation window" />
          <Stat value="—" label="ARCO cycles to converge" />
          <Stat value="—" label="SandWorm Hash difficulty" />
        </div>
      </Section>

      {/* CTA BAND */}
      <Section
        id="cta"
        tone="band"
        eyebrow="Go deeper"
        heading="Read the protocol in full"
        headingLevel={2}
        containerWidth="narrow"
      >
        <p className={styles.sectionProse}>
          The documentation covers the node APIs, transaction formats, and
          consensus rules. The whitepaper sets out the formal model behind
          Universal Turing Market Machines.
        </p>
        <div className={styles.pageHeadActions}>
          <Button href="/docs" variant="primary">
            Read the docs
          </Button>
          <Button href={URL_ZENODO_WHITEPAPER} variant="secondary" external>
            Whitepaper
          </Button>
        </div>
      </Section>
    </>
  );
}
