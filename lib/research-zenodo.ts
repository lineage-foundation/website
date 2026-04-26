/**
 * Lineage working papers and whitepapers on Zenodo, for /research.
 *
 * Order is fixed to match `tasks/prd-research-page.md` (newest `datePublished`
 * first). Descriptions paraphrase each record’s published abstract.
 */
export type ZenodoResearchItem = {
  id: string;
  title: string;
  href: `https://zenodo.org/records/${string}`;
  /** For ordering and display. */
  datePublished: string;
  description: string;
};

export const ZENODO_RESEARCH_PUBLICATIONS: readonly ZenodoResearchItem[] = [
  {
    id: "19203176",
    title: "Universal Turing Market Machines (UTMMs)",
    href: "https://zenodo.org/records/19203176",
    datePublished: "2026-03-24",
    description:
      "Sets out UTMMs as a framework for blockchain-based markets in which market policy is a programmable, adaptive object: transaction history is used as an epistemic substrate, with deterministic feature extraction, evaluation of policies in a constrained space, and improvement via bounded search—while remaining within classical computability limits.",
  },
  {
    id: "17777930",
    title:
      "Toward a Universal Turing Market Machine: Autonomous, Neuromorphic Market Infrastructure",
    href: "https://zenodo.org/records/17777930",
    datePublished: "2025-12-01",
    description:
      "Introduces the Universal Turing Market Machine and ARCOs (adaptive resource-coordinated organisms): a neuromorphic-style market layer that combines sensory inputs, ledger signalling, and actuators, framed with Hayek’s spontaneous order and Ashby’s law of requisite variety for self-organizing market process.",
  },
  {
    id: "15737849",
    title: "Smart Market White Paper",
    href: "https://zenodo.org/records/15737849",
    datePublished: "2025-06-25",
    description:
      "Describes consensus-defended adaptive algorithms: systems in which “intelligence” is expressed through adaptation at runtime, rather than requiring it to be fully fixed at design time.",
  },
  {
    id: "15730748",
    title: "Parallelized Merkle-Tree Validation in Proof-of-Work Mining",
    href: "https://zenodo.org/records/15730748",
    datePublished: "2025-06-24",
    description:
      "On the DPoWW consensus model, how to parallelise validation payloads to scale miner throughput, including a deterministic treatment of fragmented Merkle coverage and a Steiner-triple style tradeoff between payload size and miner count for fault tolerance.",
  },
  {
    id: "15730321",
    title: "Dynamic Proof of Weighted Work",
    href: "https://zenodo.org/records/15730321",
    datePublished: "2025-06-24",
    description:
      "Introduces a Nakamoto-style design that can move between a fully distributed mode and a semi-decentralized one for higher throughput, reverting to full distribution when fault conditions require it—switching between pure proof-of-work and a hash rate–validated mode analogous to proof-of-stake, with suitable hash and parallelization choices for broader workloads.",
  },
  {
    id: "15360914",
    title:
      "A Computational Model for World-State based contracts in UTXO PoW-Style Blockchains",
    href: "https://zenodo.org/records/15360914",
    datePublished: "2025-05-07",
    description:
      "Proposes a way to carry world state in a UTXO setting using monad-style composition to limit side effects: more expressive, context-sensitive operation on data (item) transactions, with coin scripts kept safe and non–Turing complete for value movement.",
  },
  {
    id: "15324203",
    title: "Peer-to-peer electronic cash revisited",
    href: "https://zenodo.org/records/15324203",
    datePublished: "2025-05-02",
    description:
      "Revisits electronic cash design to aim for low volatility without relying on external collateral or game-theoretic levers, from the perspective of peer-to-peer currency design.",
  },
];
