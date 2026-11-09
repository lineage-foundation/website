import type { Metadata } from "next";

import { Phases } from "@/components/tokenomics/Phases";
import {
  Accent,
  Button,
  Card,
  LinkCta,
  Note,
  PageHead,
  Section,
  Stat,
  Table,
} from "@/components/ui";
import { SITE_ORIGIN, TWITTER_META, URL_DISCORD } from "@/lib/constants";
import styles from "./page.module.css";

const DESCRIPTION =
  "LNGX is the fixed-supply utility currency of Lineage smart markets: a 1,000,000,000 LNGX hard cap, the allocation and release schedules, mining rewards, and the 1 May 2027 TGE.";

export const metadata: Metadata = {
  title: {
    absolute: "Tokenomics | Lineage",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/tokenomics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tokenomics | Lineage",
    description: "LNGX: 1 billion fixed supply, allocation, release schedules and mining.",
    url: `${SITE_ORIGIN}/tokenomics`,
    type: "website",
    images: [
      {
        url: "/images/open-graph-lineage-v2-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lineage logo",
      },
    ],
  },
  twitter: {
    ...TWITTER_META,
    title: "Tokenomics | Lineage",
    description: "LNGX: 1 billion fixed supply, allocation, release schedules and mining.",
    images: ["/images/open-graph-lineage-v2-1200x630.png"],
  },
};

const MAX_SUPPLY = 1_000_000_000;

const ALLOCATION = [
  {
    category: "Mining rewards",
    lngx: 280_000_000,
    purpose: "Programmed miner rewards",
    release: "Block rewards from TGE, about 6.6 years",
  },
  {
    category: "Foundation / Treasury",
    lngx: 195_000_000,
    purpose: "Network development, infrastructure and operations",
    release: "39M LNGX a year over 5 years",
  },
  {
    category: "Stakeholders",
    lngx: 110_000_000,
    purpose: "Stakeholder allocation",
    release: "Not yet published",
  },
  {
    category: "Liquidity provision",
    lngx: 110_000_000,
    purpose: "Exchange liquidity and future liquidity deployment",
    release: "10M at TGE, 100M reserve as needed",
  },
  {
    category: "Founders",
    lngx: 90_000_000,
    purpose: "Long-term founder alignment",
    release: "1.5M LNGX a month over 5 years",
  },
  {
    category: "Grants",
    lngx: 50_000_000,
    purpose: "Ecosystem development and approved grants",
    release: "Up to 12.5M LNGX a year",
  },
  {
    category: "Marketing",
    lngx: 50_000_000,
    purpose: "Adoption, communications and ecosystem growth",
    release: "20M, 20M, 10M over 3 years",
  },
  {
    category: "Public sale",
    lngx: 50_000_000,
    purpose: "Public distribution",
    release: "Set out in the sale documentation",
  },
  {
    category: "Agentic airdrops",
    lngx: 45_000_000,
    purpose: "Agentic ecosystem participation",
    release: "10M in year 1, 35M in year 2",
  },
  {
    category: "Private sale",
    lngx: 20_000_000,
    purpose: "Presale distribution",
    release: "10% at TGE, then 22.5% a quarter",
  },
];

const MINING_YEARS = [
  { year: "1", days: 366, issued: "114.759", cumulative: "114.759" },
  { year: "2", days: 365, issued: "69.276", cumulative: "184.035" },
  { year: "3", days: 365, issued: "41.966", cumulative: "226.001" },
  { year: "4", days: 365, issued: "25.422", cumulative: "251.423" },
  { year: "5", days: 366, issued: "15.432", cumulative: "266.855" },
  { year: "6", days: 365, issued: "9.316", cumulative: "276.171" },
  { year: "7 (partial)", days: 227, issued: "3.829", cumulative: "280.000" },
];

const PRESALE_RELEASES = [
  {
    kicker: "1 MAY 2027 · TGE",
    heading: "10% transferable",
    body: <>2,000,000 LNGX across the full presale allocation. Mining also begins at TGE.</>,
  },
  {
    kicker: "1 AUG 2027 · QUARTER 1",
    heading: "22.5% released, 32.5% cumulative",
    body: <>4,500,000 LNGX across the full presale allocation.</>,
  },
  {
    kicker: "1 NOV 2027 · QUARTER 2",
    heading: "22.5% released, 55% cumulative",
    body: <>4,500,000 LNGX across the full presale allocation.</>,
  },
  {
    kicker: "1 FEB 2028 · QUARTER 3",
    heading: "22.5% released, 77.5% cumulative",
    body: <>4,500,000 LNGX across the full presale allocation.</>,
  },
  {
    kicker: "1 MAY 2028 · QUARTER 4",
    heading: "100% released",
    body: (
      <>
        The final 4,500,000 LNGX, plus any rounding remainder from the
        quarterly calculation in fractions.
      </>
    ),
  },
];

function formatLngx(n: number) {
  return n.toLocaleString("en-US");
}

function formatShare(n: number) {
  return `${((n / MAX_SUPPLY) * 100).toFixed(1)}%`;
}

export default function TokenomicsPage() {
  return (
    <>
      {/* ── PAGE HEAD ── */}
      <PageHead
        eyebrow="Economic design"
        title={
          <>
            The currency that powers <Accent>smart markets</Accent>
          </>
        }
        lead={
          <>
            <span className={styles.mono}>LNGX</span> is the fixed-supply
            utility currency of the Lineage network. It is required to take
            part in smart markets, settles network fees and rewards the miners
            who secure the network. The maximum supply is{" "}
            <strong>1,000,000,000 LNGX</strong>, and no allocation or mining
            reward can take it past that cap.
          </>
        }
        actions={
          <>
            <Button href="/docs" variant="primary">
              Browse the docs
            </Button>
            <LinkCta href="/roadmap">See the roadmap</LinkCta>
          </>
        }
      />

      {/* ── KEY PARAMETERS ── */}
      <Section
        eyebrow="Key parameters"
        heading="LNGX at a glance"
        headingLevel={2}
        spacing="loose"
      >
        <div className={styles.statsGrid}>
          <Stat value="1B" label="Maximum supply (1,000,000,000 LNGX)" />
          <Stat value="280M" label="Mining allocation (28% of supply)" />
          <Stat value="1 May 2027" label="Token Generation Event" />
          <Stat value="$0.075" label="Presale price per LNGX" />
          <Stat value="$0.30" label="Planned listing price per LNGX" />
          <Stat value="30s" label="Assumed block interval" />
        </div>
        <Note kicker="Status">
          These are the proposed LNGX token economics. Implementation remains
          subject to technical validation, governance approval and applicable
          legal and regulatory review.
        </Note>
      </Section>

      {/* ── WHY LNGX (band) ── */}
      <Section
        tone="band"
        eyebrow="The smart-market economy"
        heading="Why LNGX is required"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Smart markets are programmable economic environments that bring
          producers, consumers and financiers together, so production, demand,
          capital and risk can be coordinated through market mechanisms. LNGX
          is the common currency that activity runs on.
        </p>
        <div className={styles.gridNarrow}>
          <Card rail kicker="01" title="Market participation">
            <p>
              Participants need LNGX to access and engage with smart markets,
              under each market&rsquo;s rules.
            </p>
          </Card>
          <Card rail kicker="02" title="Network fees">
            <p>
              LNGX settles the fees for smart-market operations and network
              services.
            </p>
          </Card>
          <Card rail kicker="03" title="Mining rewards">
            <p>
              Miners earn LNGX through the programmed block reward for
              operating and securing the network.
            </p>
          </Card>
          <Card rail kicker="04" title="Market financing">
            <p>
              Financing activity, its fees and market-denominated obligations
              are coordinated and settled in LNGX.
            </p>
          </Card>
          <Card rail kicker="05" title="Economic coordination">
            <p>
              One utility asset connects producers, consumers, financiers and
              other participants across the network.
            </p>
          </Card>
        </div>
        <h3 className={styles.subheading}>First applications: commodities</h3>
        <p className={styles.sectionProse}>
          Lineage is developing pilots in <strong>energy</strong> and{" "}
          <strong>agriculture</strong>, and exploring supply chains, commodity
          risk management and commodity financing. Any financing yield in these
          markets depends on real market activity, underlying assets and
          participant performance. It is not a guaranteed return.
        </p>
      </Section>

      {/* ── ALLOCATION ── */}
      <Section
        eyebrow="Allocation"
        heading="How the one billion LNGX is allocated"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Every category, mining included, sits inside the fixed maximum
          supply. Being allocated does not mean tokens are circulating: most
          categories are released over time under the schedules below.
        </p>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Share of maximum supply</h3>
          <p className={styles.chartLead}>
            1,000,000,000 LNGX across ten categories.
          </p>
          <ul className={styles.bars}>
            {ALLOCATION.map((row) => (
              <li key={row.category} className={styles.bar}>
                <span className={styles.barLabel}>{row.category}</span>
                <span className={styles.barTrack} aria-hidden="true">
                  <span
                    className={`${styles.barFill} ${
                      row.category === "Mining rewards" ? styles.barFillMining : ""
                    }`}
                    style={{ width: `${(row.lngx / ALLOCATION[0].lngx) * 100}%` }}
                  />
                </span>
                <span className={styles.barValue}>{formatShare(row.lngx)}</span>
              </li>
            ))}
          </ul>
        </div>

        <Table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">LNGX</th>
              <th scope="col">Share</th>
              <th scope="col">Purpose</th>
              <th scope="col">Release</th>
            </tr>
          </thead>
          <tbody>
            {ALLOCATION.map((row) => (
              <tr key={row.category}>
                <td>
                  <span className="tok">{row.category}</span>
                </td>
                <td className="num">{formatLngx(row.lngx)}</td>
                <td className="num">{formatShare(row.lngx)}</td>
                <td>{row.purpose}</td>
                <td>{row.release}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td className="num">{formatLngx(MAX_SUPPLY)}</td>
              <td className="num">100.0%</td>
              <td>Fixed maximum supply</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <p className={styles.caption}>
          Release periods are measured from TGE on 1 May 2027 unless stated
          otherwise.
        </p>
      </Section>

      {/* ── RELEASE SCHEDULES (band) ── */}
      <Section
        tone="band"
        eyebrow="Release schedules"
        heading="When each allocation is released"
        headingLevel={2}
        spacing="loose"
      >
        <div className={styles.grid}>
          <Card title="Foundation / Treasury · 195M">
            <p>
              Released over five years from TGE, a budget of{" "}
              <strong>39,000,000 LNGX a year</strong>. Transfers and spending
              follow approved Treasury procedures, with documentation and
              reporting.
            </p>
          </Card>
          <Card title="Founders · 90M">
            <p>
              Vests linearly in monthly releases over five years from TGE:{" "}
              <strong>1,500,000 LNGX a month</strong>. There is no separate
              founder cliff.
            </p>
          </Card>
          <Card title="Grants · 50M">
            <p>
              No more than <strong>12.5M LNGX</strong> in any TGE year. The
              model assumes the full ceiling is used in each of the first four
              years. Grants are subject to approval and award conditions.
            </p>
          </Card>
          <Card title="Marketing · 50M">
            <p>
              <strong>20M</strong> in TGE year 1, <strong>20M</strong> in year
              2 and <strong>10M</strong> in year 3, released against approved
              campaign budgets and reporting.
            </p>
          </Card>
          <Card title="Agentic airdrops · 45M">
            <p>
              <strong>10M</strong> in TGE year 1 and <strong>35M</strong> in
              year 2, under published eligibility and claim rules covering
              Sybil resistance, duplicate claims, claim windows and unclaimed
              tokens.
            </p>
          </Card>
          <Card title="Liquidity provision · 110M">
            <p>
              <strong>10M LNGX</strong> for liquidity at TGE, with{" "}
              <strong>100M</strong> held in reserve and deployed as liquidity
              needs require. The reserve has no fixed annual schedule.
            </p>
          </Card>
        </div>

        <h3 className={styles.subheading}>Private sale: 20M LNGX at $0.075</h3>
        <p className={styles.sectionProse}>
          Indicative gross proceeds are US$1,500,000 if fully subscribed.
          Holders receive 10% at TGE and the remaining 90% in four equal
          quarterly releases, so the presale is fully released 12 months after
          TGE.
        </p>
        <Phases items={PRESALE_RELEASES} />
      </Section>

      {/* ── MINING ── */}
      <Section
        eyebrow="Mining rewards"
        heading="280 million LNGX for miners"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Mining begins at TGE. Each block reward is a share of the mining
          allocation still remaining plus a flat five LNGX, so rewards decline
          as the allocation is used up. All reward arithmetic is integer, in
          fractions of 1/72,072,000 LNGX.
        </p>
        <pre className={styles.formula}>
          R<sub>n</sub>{" "}= min(D<sub>n</sub>, (D<sub>n</sub>{" "}&gt;&gt; 21) + 5F)
        </pre>
        <div className={styles.grid}>
          <Card title="Constants">
            <ul className={styles.list}>
              <li>
                <strong>F</strong>{" "}= 72,072,000 fractions per LNGX
              </li>
              <li>
                <strong>M</strong>{" "}= 280,000,000 &times; F, the mining
                allocation in fractions
              </li>
              <li>
                <strong>D<sub>n</sub></strong>{" "}= M &minus; I<sub>n</sub>, the
                allocation remaining before block n
              </li>
              <li>
                <strong>&gt;&gt; 21</strong> is an unsigned right shift by 21
                bits
              </li>
            </ul>
          </Card>
          <Card title="The cap is enforced">
            <p>
              The outer minimum caps every reward at the remaining allocation,
              so cumulative issuance can never exceed M. Once the allocation is
              exhausted, block rewards are zero.
            </p>
          </Card>
        </div>

        <h3 className={styles.subheading}>Reference simulation</h3>
        <p className={styles.sectionProse}>
          At one block every 30 seconds (2,880 a day), the allocation is
          exhausted after about 6,965,766 reward-bearing blocks: roughly 2,419
          days, or 6.6 years.
        </p>
        <Table>
          <thead>
            <tr>
              <th scope="col">TGE year</th>
              <th scope="col">Days</th>
              <th scope="col">Mined (M LNGX)</th>
              <th scope="col">Cumulative (M LNGX)</th>
            </tr>
          </thead>
          <tbody>
            {MINING_YEARS.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td className="num">{row.days}</td>
                <td className="num">{row.issued}</td>
                <td className="num">{row.cumulative}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className={styles.caption}>
          Simulation results under the stated assumptions. Actual issuance
          depends on block production and the final consensus implementation.
        </p>
      </Section>

      {/* ── TGE AND LISTING (band) ── */}
      <Section
        tone="band"
        eyebrow="Launch"
        heading="Token Generation Event and listing"
        headingLevel={2}
        spacing="loose"
      >
        <div className={styles.grid}>
          <Card rail kicker="1 MAY 2027" title="Token Generation Event">
            <p>
              Mining starts at TGE, and vesting and release periods are
              measured from it. The public sale allocation is 50M LNGX, with
              terms set out in the sale documentation.
            </p>
          </Card>
          <Card rail kicker="1 MAY 2027" title="Decentralised exchange listing">
            <p>
              LNGX is planned to list on <strong>Raydium</strong> (Solana) and{" "}
              <strong>Uniswap</strong> (Ethereum) at a target reference price of{" "}
              <strong>US$0.30</strong>. This is not a guarantee of the price at
              which LNGX can be bought or sold.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── TRANSPARENCY ── */}
      <Section
        eyebrow="Transparency"
        heading="Supply reporting"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          The Foundation will keep a public supply and allocation ledger.
          Treasury movements require multi-signature authorisation, and any
          change to the published schedules is disclosed and approved through
          governance.
        </p>
        <div className={styles.grid}>
          <Card title="What is reported">
            <ul className={styles.list}>
              <li>Maximum supply and total protocol-issued supply</li>
              <li>Category allocations and remaining balances</li>
              <li>Mining issued and mining allocation remaining</li>
              <li>Locked, vested and released balances</li>
              <li>Actual releases against the published schedule</li>
            </ul>
          </Card>
          <Card title="Category detail">
            <ul className={styles.list}>
              <li>Treasury releases and actual expenditure</li>
              <li>Grants awarded and amounts transferred</li>
              <li>Airdrop allocations, claims and unclaimed balances</li>
              <li>Liquidity reserved, deployed or withdrawn</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── RISKS (band) ── */}
      <Section
        tone="band"
        eyebrow="Risks"
        heading="Risks and limitations"
        headingLevel={2}
        spacing="loose"
      >
        <div className={styles.gridNarrow}>
          <Card title="Market and liquidity">
            <p>
              LNGX has no guaranteed price or redemption value. A listing or
              liquidity allocation does not guarantee market depth or execution
              at any price.
            </p>
          </Card>
          <Card title="Adoption">
            <p>
              LNGX utility depends on smart markets attracting producers,
              consumers and financiers. Pilots do not guarantee commercial
              activity.
            </p>
          </Card>
          <Card title="Financing and commodities">
            <p>
              Smart-market financing carries asset, counterparty, price and
              delivery risk. No yield or return is guaranteed.
            </p>
          </Card>
          <Card title="Distribution and regulation">
            <p>
              Circulating supply may differ from the schedules, and the legal
              treatment of LNGX and its sale can vary by jurisdiction.
            </p>
          </Card>
        </div>
        <p className={styles.caption}>
          This page is for information only and is not an offer to sell, or a
          solicitation to buy, any financial instrument or investment product.
          LNGX is designed as a utility currency for the Lineage network.
        </p>
      </Section>

      {/* ── CTA BAND ── */}
      <Section spacing="loose">
        <div className={styles.grid}>
          <Card rail title="Questions about LNGX?">
            <p>
              Talk to the Foundation and the community about the token, the
              launch and smart markets.
            </p>
            <div className={styles.cardCta}>
              <Button href={URL_DISCORD} variant="primary" external>
                Join the Discord
              </Button>
            </div>
          </Card>
          <Card rail title="Go deeper in the docs">
            <p>
              Concepts, the <a href="/developers/api">HTTP API reference</a>, and guides
              for building against a Layer-1 where market policy itself is programmable.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href="/docs">Open documentation</LinkCta>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
