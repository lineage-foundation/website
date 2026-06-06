import styles from "./EfficiencyChart.module.css";

/**
 * ARCO market efficiency curve — ported from design-prototype/technology.html.
 * SVG markup and CSS animations are faithful to the prototype; all styling uses
 * design tokens. Respects `prefers-reduced-motion`: the chart renders in its
 * final settled state with no animation when the user has requested reduced motion.
 */
export function EfficiencyChart() {
  return (
    <figure
      className={styles.effchart}
      role="img"
      aria-label="An efficiency curve that climbs steeply over the first cycles and flattens as the market settles toward an efficient equilibrium."
    >
      <svg
        viewBox="0 0 320 192"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="effFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.20" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <line className={styles.grid} x1="44" y1="58" x2="300" y2="58" />
        <line className={styles.grid} x1="44" y1="110" x2="300" y2="110" />

        {/* Equilibrium reference */}
        <line className={styles.eq} x1="44" y1="38" x2="300" y2="38" />
        <text className={styles.eqLabel} x="300" y="32" textAnchor="end">
          Efficient equilibrium
        </text>

        {/* Vertical guide lines */}
        <line className={styles.guide} x1="88" y1="38" x2="88" y2="162" />
        <line className={styles.guide} x1="170" y1="38" x2="170" y2="162" />
        <line className={styles.guide} x1="252" y1="38" x2="252" y2="162" />

        {/* Axes */}
        <line className={styles.axis} x1="44" y1="20" x2="44" y2="162" />
        <line className={styles.axis} x1="44" y1="162" x2="300" y2="162" />

        {/* Area fill */}
        <path
          className={styles.area}
          d="M44,150 C74,150 82,110 106,98 C140,82 150,76 170,68 C200,57 216,54 236,52 C266,48 282,46 300,45 L300,162 L44,162 Z"
        />

        {/* Efficiency curve line */}
        <path
          className={styles.line}
          d="M44,150 C74,150 82,110 106,98 C140,82 150,76 170,68 C200,57 216,54 236,52 C266,48 282,46 300,45"
        />

        {/* Data points */}
        <circle className={styles.dot} cx="88" cy="107" r="3.6" />
        <circle className={styles.dot} cx="170" cy="68" r="3.6" />
        <circle className={styles.dot} cx="252" cy="50" r="3.6" />

        {/* Labels */}
        <text
          className={styles.yLabel}
          x="15"
          y="91"
          transform="rotate(-90 15 91)"
          textAnchor="middle"
        >
          Market efficiency
        </text>
        <text className={styles.xLabel} x="88" y="178">
          Cycle 1
        </text>
        <text className={styles.xLabel} x="170" y="178">
          Cycle 2
        </text>
        <text className={styles.xLabel} x="252" y="178">
          Cycle 3
        </text>
      </svg>
    </figure>
  );
}
