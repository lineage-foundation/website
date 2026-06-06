import styles from "./ArcoLoop.module.css";

const STEPS = [
  {
    badge: "A",
    heading: "Read & intent",
    stage: "Sensor",
    body: "Devices read soil and market conditions, infer an optimal action with an on-device model, and build a signed P2PKH transaction with MCP agent context.",
  },
  {
    badge: "B",
    heading: "Match & settle",
    stage: "Relay",
    body: "The relay stage matches buyer orders against seller offers and constructs a two-way payment binding the priced token to the asset item.",
  },
  {
    badge: "C",
    heading: "Verify & build",
    stage: "Compute",
    body: "Mempool, mining, and storage nodes verify transactions, build the nested Merkle root, search proof of work, and append the block.",
  },
  {
    badge: "D",
    heading: "Commit & unlock",
    stage: "Actuator",
    body: "A hash commitment placed off-chain unlocks physical actuation only when the signature, preimage, and on-chain inclusion all verify.",
  },
  {
    badge: "E",
    heading: "Evolve & broadcast",
    stage: "Event",
    body: "Ledger transactions feed a genetic search over market policy. The best candidate policy is broadcast back to participants, closing the loop.",
  },
] as const;

export function ArcoLoop() {
  return (
    <ol
      className={styles.arcoLoop}
      aria-label="ARCO compute loop stages, in order"
    >
      {STEPS.map((step) => (
        <li key={step.badge} className={styles.arcoStep}>
          <span className={styles.badge} aria-hidden="true">
            {step.badge}
          </span>
          <div className={styles.body}>
            <div className={styles.head}>
              <h3>{step.heading}</h3>
              <span className={styles.stage}>{step.stage}</span>
            </div>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
      <li className={styles.closeRow}>
        <span className={styles.closeBadge} aria-hidden="true">
          ↻
        </span>
        <span>
          <strong>The loop repeats each cycle</strong> — the broadcast policy
          reshapes the next round of sensor readings, and the market moves toward
          equilibrium.
        </span>
      </li>
    </ol>
  );
}
