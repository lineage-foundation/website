import type { Metadata } from "next";

import { Phases } from "@/components/tokenomics/Phases";
import {
  Accent,
  Button,
  Card,
  LinkCta,
  PageHead,
  Section,
  Table,
} from "@/components/ui";
import { SITE_ORIGIN, URL_ZENODO_WHITEPAPER } from "@/lib/constants";
import { ZENODO_P2P_ELECTRONIC_CASH } from "@/lib/research-zenodo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Tokenomics | Lineage",
  },
  description:
    "LNGX and FIAT Replacement Technology (FReT): the phased allocation schedule, dynamic supply via the ARCO layer, and Lineage’s distribution model.",
  alternates: {
    canonical: "/tokenomics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tokenomics | Lineage",
    description: "Token allocation, ARCO, and the distribution model.",
    url: `${SITE_ORIGIN}/tokenomics`,
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
    title: "Tokenomics | Lineage",
    description: "Token allocation, ARCO, and the distribution model.",
    images: ["/images/open-graph-lineage-1200x630.png"],
  },
};

const PHASES = [
  {
    kicker: "PHASE 01 · 2026",
    heading: "Genesis",
    body: (
      <>
        Widest category mix: Treasury (140), Founders (50), Grants (50),
        Stakeholders (20), Marketing (20), AI airdrop incentives (15), and a
        starting Miners allocation (35). Phase total: 330 model units.
      </>
    ),
  },
  {
    kicker: "PHASE 02 · 2027",
    heading: "Early network",
    body: (
      <>
        Miners rise to 45 and Grants to 60 while Founders and Treasury taper
        (35&nbsp;/&nbsp;120). The AI airdrop incentives are complete. Phase
        total: 300 model units.
      </>
    ),
  },
  {
    kicker: "PHASE 03 · 2028",
    heading: "Maturing issuance",
    body: (
      <>
        Treasury contracts to 80 and Marketing winds down; Miners continue
        climbing to 54 alongside steady Grants and Founders. Phase total: 239
        model units.
      </>
    ),
  },
  {
    kicker: "PHASE 04 · 2029",
    heading: "Miner-led supply",
    body: (
      <>
        Miners reach 101, the largest single category, as Stakeholder
        allocation phases out and issuance concentrates on proof-of-work. Phase
        total: 266 model units.
      </>
    ),
  },
  {
    kicker: "BEYOND · ARCO-governed",
    heading: "Adaptive steady state",
    body: (
      <>
        Past the scheduled phases, effective supply and circulation are
        coordinated by the ARCO layer in response to demand and on-chain state,
        within protocol policy. There is no fixed forward calendar.
      </>
    ),
  },
];

export default function TokenomicsPage() {
  return (
    <>
      {/* ── PAGE HEAD ── */}
      <PageHead
        eyebrow="Economic design"
        title={
          <>
            Token allocation, release, and <Accent>supply</Accent>
          </>
        }
        lead={
          <>
            <span
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
            >
              LNGX
            </span>{" "}
            is the network&rsquo;s unit of value. The economic stack is described
            as <strong>FIAT Replacement Technology (FReT)</strong>: a phased
            allocation schedule paired with the ARCO layer&rsquo;s ability to
            adjust effective supply over time. The full specification lives in{" "}
            <em>Lineage: The Living Economy</em> on Zenodo.
          </>
        }
        actions={
          <>
            <Button href={URL_ZENODO_WHITEPAPER} variant="primary" external>
              Read the whitepaper
            </Button>
            <Button href="/get-tokens" variant="secondary">
              Get LNGX
            </Button>
            <LinkCta href="/docs">Browse the docs</LinkCta>
          </>
        }
      />

      {/* ── TWO LAYERS, ONE ECONOMY ── */}
      <Section
        eyebrow="Two layers, one economy"
        heading="FReT and LNGX"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          The token model separates the <strong>unit of value</strong> from the{" "}
          <strong>policy that governs it</strong>. LNGX is what moves on the
          ledger; FReT is the framework that decides how much of it circulates
          and on what terms.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Card rail title="LNGX">
            <p>
              LNGX is the native asset of the Lineage Layer-1, the token
              miners earn, holders carry, and applications transact in. Its
              release into circulation follows the phased allocation schedule
              below, spanning the project&rsquo;s genesis and early network
              years.
            </p>
          </Card>
          <Card rail title="FReT">
            <p>
              FReT is the economic stack around LNGX. It pairs the phased
              allocation you see below with the ARCO layer&rsquo;s ability to
              adjust <strong>effective supply and circulation</strong> over
              time, aiming for low volatility without external collateral
              or game-theoretic levers.
            </p>
          </Card>
        </div>
        <p style={{ marginTop: "var(--space-7)" }}>
          <LinkCta href="/technology">
            See the ARCO loop on Technology
          </LinkCta>
        </p>
      </Section>

      {/* ── ALLOCATION SCHEDULE (band) ── */}
      <Section
        tone="band"
        eyebrow="Allocation schedule"
        heading="How LNGX is distributed"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Allocation is modelled per phase across the early network years
          (2026-2029). The values below are the Foundation&rsquo;s working
          distribution model: the{" "}
          <span
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
          >
            Miners
          </span>{" "}
          share grows as treasury-funded categories taper, shifting issuance
          toward the network&rsquo;s proof-of-work base over time. Figures are
          in model units, not a final on-chain supply commitment.
        </p>

        {/* Bar chart card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--r-lg)",
            padding: "var(--space-6)",
            marginBottom: "var(--space-5)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--fs-h3)",
              color: "var(--color-text)",
              margin: "0 0 var(--space-2)",
            }}
          >
            Total modelled allocation by phase
          </h3>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--fs-small)",
              margin: "0 0 var(--space-5)",
            }}
          >
            Sum of all categories per phase, in model units. Source: Lineage
            Foundation working distribution model.
          </p>
          <svg
            viewBox="0 0 520 220"
            role="img"
            width="100%"
            height="auto"
            aria-label="Bar chart of total modelled LNGX allocation per phase: 2026 is 330 units, 2027 is 300 units, 2028 is 239 units, 2029 is 266 units (model units)."
          >
            {/* baseline */}
            <line
              x1="48"
              y1="180"
              x2="500"
              y2="180"
              stroke="var(--color-border-strong)"
              strokeWidth="1"
            />
            {/* y gridlines / labels (max 330) */}
            <g
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="var(--color-text-subtle)"
            >
              <line
                x1="48"
                y1="40"
                x2="500"
                y2="40"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text x="42" y="44" textAnchor="end">
                330
              </text>
              <line
                x1="48"
                y1="110"
                x2="500"
                y2="110"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text x="42" y="114" textAnchor="end">
                165
              </text>
              <text x="42" y="184" textAnchor="end">
                0
              </text>
            </g>
            {/* bars: scale 330 units → 140px tall (y from 180 up to 40) */}
            <g>
              {/* 2026: 330 → 140 */}
              <rect
                x="78"
                y="40"
                width="56"
                height="140"
                rx="3"
                fill="var(--color-accent)"
              />
              {/* 2027: 300 → 127 */}
              <rect
                x="190"
                y="53"
                width="56"
                height="127"
                rx="3"
                fill="var(--color-link)"
              />
              {/* 2028: 239 → 101 */}
              <rect
                x="302"
                y="79"
                width="56"
                height="101"
                rx="3"
                fill="var(--color-link)"
              />
              {/* 2029: 266 → 113 */}
              <rect
                x="414"
                y="67"
                width="56"
                height="113"
                rx="3"
                fill="var(--color-link)"
              />
            </g>
            {/* value + x labels */}
            <g
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--color-text)"
              textAnchor="middle"
            >
              <text x="106" y="32">
                330
              </text>
              <text x="218" y="45">
                300
              </text>
              <text x="330" y="71">
                239
              </text>
              <text x="442" y="59">
                266
              </text>
            </g>
            <g
              fontFamily="var(--font-mono)"
              fontSize="11"
              fill="var(--color-text-muted)"
              textAnchor="middle"
            >
              <text x="106" y="200">
                2026
              </text>
              <text x="218" y="200">
                2027
              </text>
              <text x="330" y="200">
                2028
              </text>
              <text x="442" y="200">
                2029
              </text>
            </g>
          </svg>
        </div>

        {/* Full per-category breakdown table */}
        <Table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">2026</th>
              <th scope="col">2027</th>
              <th scope="col">2028</th>
              <th scope="col">2029</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="tok">Miners</span>
              </td>
              <td className="num">35</td>
              <td className="num">45</td>
              <td className="num">54</td>
              <td className="num">101</td>
            </tr>
            <tr>
              <td>
                <span className="tok">Treasury</span>
              </td>
              <td className="num">140</td>
              <td className="num">120</td>
              <td className="num">80</td>
              <td className="num">80</td>
            </tr>
            <tr>
              <td>
                <span className="tok">Founders</span>
              </td>
              <td className="num">50</td>
              <td className="num">35</td>
              <td className="num">35</td>
              <td className="num">35</td>
            </tr>
            <tr>
              <td>
                <span className="tok">Grants</span>
              </td>
              <td className="num">50</td>
              <td className="num">60</td>
              <td className="num">50</td>
              <td className="num">50</td>
            </tr>
            <tr>
              <td>
                <span className="tok">Stakeholders</span>
              </td>
              <td className="num">20</td>
              <td className="num">20</td>
              <td className="num">20</td>
              <td className="num">—</td>
            </tr>
            <tr>
              <td>
                <span className="tok">Marketing</span>
              </td>
              <td className="num">20</td>
              <td className="num">20</td>
              <td className="num">—</td>
              <td className="num">—</td>
            </tr>
            <tr>
              <td>
                <span className="tok">AI Airdrop Incentives</span>
              </td>
              <td className="num">15</td>
              <td className="num">—</td>
              <td className="num">—</td>
              <td className="num">—</td>
            </tr>
            <tr>
              <td>
                <strong>Phase total</strong>
              </td>
              <td className="num">330</td>
              <td className="num">300</td>
              <td className="num">239</td>
              <td className="num">266</td>
            </tr>
          </tbody>
        </Table>
        <p
          style={{
            color: "var(--color-text-subtle)",
            fontSize: "var(--fs-caption)",
            fontFamily: "var(--font-mono)",
            marginTop: "var(--space-4)",
          }}
        >
          Model units from the Lineage Foundation working distribution model.
          The Miners share can be scaled by a market-demand factor in the
          interactive chart; categories phase out as the schedule progresses
          (shown here as &ldquo;—&rdquo;). Final on-chain allocations are
          governed by protocol policy.
        </p>
      </Section>

      {/* ── DYNAMIC SUPPLY / ARCO ── */}
      <Section
        eyebrow="Economic model"
        heading="Dynamic supply and ARCO"
        headingLevel={2}
        spacing="loose"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Card title="Supply is managed by ARCO">
            <p>
              The working model starts from a supply on the order of{" "}
              <strong>300&nbsp;million tokens</strong>, after which{" "}
              <strong>effective supply and circulation adapt over time</strong>{" "}
              in response to demand and on-chain state, through the same
              ARCO (adaptive resource-coordinated) loop used elsewhere in the
              network: sensor, relay, compute, actuator. The allocation table
              above is expressed in proportional model units; ARCO governs how
              the live supply moves from that starting point as markets grow.
            </p>
          </Card>
          <Card title="Designed for low volatility">
            <p>
              The design goals are set out in the working paper{" "}
              <em>Peer-to-peer electronic cash revisited</em> (Andrew Kessler,
              2025-05-02, Zenodo), which revisits peer-to-peer electronic cash
              to aim for <strong>low volatility</strong>{" "}
              <strong>without</strong> relying on external collateral or
              game-theoretic levers. Lineage encodes that stance in on-chain
              policy and ARCO-driven adjustment rather than off-chain promise
              alone.
            </p>
            <div className={styles.cardCta}>
              <LinkCta href={ZENODO_P2P_ELECTRONIC_CASH.href}>
                Read the paper on Zenodo
              </LinkCta>
            </div>
          </Card>
        </div>
      </Section>

      {/* ── PHASED RELEASE MODEL (band) ── */}
      <Section
        tone="band"
        eyebrow="Release model"
        heading="The phased release model"
        headingLevel={2}
        spacing="loose"
      >
        <p className={styles.sectionProse}>
          Allocation is released across distinct phases. Early phases lean on
          treasury, grants, founder and community categories to bootstrap the
          network; later phases shift weight toward miners as proof-of-work
          issuance becomes the dominant source.
        </p>
        <Phases items={PHASES} />
      </Section>

      {/* ── CTA BAND ── */}
      <Section spacing="loose">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Card rail title="Read the full specification">
            <p>
              <em>Lineage: The Living Economy</em> sets out FReT, LNGX, the
              allocation schedule and the ARCO layer in detail, archived
              on Zenodo.
            </p>
            <div className={styles.cardCta}>
              <Button href={URL_ZENODO_WHITEPAPER} variant="primary" external>
                Read the whitepaper
              </Button>
            </div>
          </Card>
          <Card rail title="Go deeper in the docs">
            <p>
              Concepts, the HTTP API reference, and guides for building against
              a Layer-1 where market policy itself is programmable.
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
