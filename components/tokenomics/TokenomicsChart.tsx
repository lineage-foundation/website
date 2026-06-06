"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./TokenomicsChart.module.css";

const tokenomicsData = {
  1: [
    { name: "Miners", value: 35 },
    { name: "Treasury", value: 140 },
    { name: "Founders", value: 50 },
    { name: "Grants", value: 50 },
    { name: "Stakeholders", value: 20 },
    { name: "Marketing", value: 20 },
    { name: "Moltbook Airdrop", value: 15 },
  ],
  2: [
    { name: "Miners", value: 45 },
    { name: "Treasury", value: 120 },
    { name: "Founders", value: 35 },
    { name: "Grants", value: 60 },
    { name: "Stakeholders", value: 20 },
    { name: "Marketing", value: 20 },
  ],
  3: [
    { name: "Miners", value: 54 },
    { name: "Treasury", value: 80 },
    { name: "Founders", value: 35 },
    { name: "Grants", value: 50 },
    { name: "Stakeholders", value: 20 },
  ],
  4: [
    { name: "Miners", value: 101 },
    { name: "Treasury", value: 80 },
    { name: "Founders", value: 35 },
    { name: "Grants", value: 50 },
  ],
    5: [
    { name: "Miners", value: 122 },
    { name: "Treasury", value: 50 },
    { name: "Founders", value: 35 },
    { name: "Grants", value: 40 },
  ],
} as const;

/**
 * Canvas fill colors — BRAND v2 teal-space palette.
 * Hex literals are required here because canvas/Plotly cannot read CSS custom
 * properties at paint time. Values are hex approximations of the OKLch tokens
 * defined in app/globals.css:
 *   emerald accent  oklch(82% 0.16 165)  → #7af0b0
 *   emerald strong  oklch(86% 0.15 167)  → #8bf3bd
 *   cyan link       oklch(78% 0.12 218)  → #5fd0e6
 *   cyan mid        oklch(72% 0.11 218)  → #48b8d0
 *   teal mid        oklch(68% 0.09 200)  → #4da8bc
 *   teal light      oklch(75% 0.10 195)  → #63c2d4
 *   green-teal      oklch(80% 0.13 180)  → #6ddec8
 */
const CHART_SLICE_COLORS = [
  "#5fd0e6",
  "#7af0b0",
  "#48b8d0",
  "#8bf3bd",
  "#4da8bc",
  "#6ddec8",
  "#63c2d4",
] as const;

/**
 * Surface / text / delta hex — BRAND v2 teal-space.
 * Canvas cannot use CSS custom properties.
 *   text           oklch(95% 0.010 195)  → #e8f0ef
 *   text-muted     oklch(73% 0.016 195)  → #9fb3b0
 *   text-subtle    oklch(60% 0.016 195)  → #7d9896
 *   delta-pos      oklch(82% 0.16 165)   → #7af0b0  (emerald accent)
 *   delta-neg      oklch(68% 0.18 18)    → #e85d6a  (unchanged danger)
 */
const TEXT = "#e8f0ef";
const TEXT_MUTED = "#9fb3b0";
const TEXT_SUBTLE = "#7d9896";
const DELTA_POS = "#7af0b0";
const DELTA_NEG = "#e85d6a";

const yearLabels = ["2026", "2027", "2028", "2029"];

const OUTER = 130;
const INNER = 70;

type Slice = { name: string; value: number };

function interpolate(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function TokenomicsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentDataRef = useRef<Slice[]>([]);
  const rafRef = useRef(0);
  const visibleRef = useRef<Record<string, boolean>>({});
  const marketFactorRef = useRef(1);

  const [year, setYear] = useState(1);
  const [marketFactor, setMarketFactor] = useState(1);
  const [, bump] = useState(0);
  const force = () => bump((n) => n + 1);

  const [sliderLabel, setSliderLabel] = useState(
    "Miner Reward Adjustment: 100%",
  );

  const getData = useCallback(
    (factor = marketFactorRef.current) => {
      const rows = tokenomicsData[year as keyof typeof tokenomicsData];
      return rows.map((d) => ({
        ...d,
        value: d.name === "Miners" ? d.value * factor : d.value,
      }));
    },
    [year],
  );

  const draw = useCallback(
    (mouseX: number | null = null, mouseY: number | null = null) => {
      const canvas = canvasRef.current;
      const tooltip = tooltipRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const visible = visibleRef.current;

      ctx.clearRect(0, 0, 420, 420);

      const data = currentDataRef.current.filter(
        (d) => visible[d.name] !== false,
      );
      const total = data.reduce((s, d) => s + d.value, 0);
      if (total <= 0) {
        return;
      }

      let start = -Math.PI / 2;
      let hoveredIdx: number | null = null;

      data.forEach((d, i) => {
        const slice = (d.value / total) * Math.PI * 2;

        let isHovered = false;
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - 210;
          const dy = mouseY - 210;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let angle = Math.atan2(dy, dx);
          if (angle < -Math.PI / 2) angle += 2 * Math.PI;

          if (
            dist < OUTER &&
            dist > INNER &&
            angle >= start &&
            angle <= start + slice
          ) {
            isHovered = true;
            hoveredIdx = i;
          }
        }

        const radius = isHovered ? OUTER + 6 : OUTER;

        ctx.beginPath();
        ctx.arc(210, 210, radius, start, start + slice);
        ctx.arc(210, 210, INNER, start + slice, start, true);
        ctx.closePath();

        ctx.fillStyle =
          CHART_SLICE_COLORS[i % CHART_SLICE_COLORS.length] ?? "#5fd0e6";
        ctx.fill();

        if (isHovered) {
          const mid = start + slice / 2;
          const lx = 210 + Math.cos(mid) * (OUTER + 20);
          const ly = 210 + Math.sin(mid) * (OUTER + 20);

          ctx.fillStyle = TEXT;
          ctx.font = "12px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(d.name, lx, ly);
        }

        start += slice;
      });

      if (tooltip) {
        const tipSlice =
          hoveredIdx !== null ? data[hoveredIdx] : undefined;
        if (tipSlice) {
          tooltip.style.display = "block";
          tooltip.innerText = `${tipSlice.name}: ${tipSlice.value.toFixed(2)}`;
        } else {
          tooltip.style.display = "none";
        }
      }

      const baseline = getData(1).reduce((s, d) => s + d.value, 0);
      const delta = total - baseline;

      ctx.textAlign = "center";

      ctx.fillStyle = TEXT;
      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.fillText(total.toFixed(1), 210, 200);

      ctx.font = "12px system-ui, sans-serif";
      ctx.fillStyle = TEXT_MUTED;
      ctx.fillText("Total Supply", 210, 220);

      ctx.font = "bold 14px system-ui, sans-serif";
      ctx.fillStyle = delta >= 0 ? DELTA_POS : DELTA_NEG;
      ctx.fillText(
        `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`,
        210,
        245,
      );

      ctx.font = "11px system-ui, sans-serif";
      ctx.fillStyle = TEXT_SUBTLE;
      ctx.fillText("Δ vs baseline", 210, 260);
    },
    [getData],
  );

  const animateTo = useCallback(
    (newData: Slice[]) => {
      const duration = 500;
      const start = performance.now();

      const frame = (time: number) => {
        const t = Math.min((time - start) / duration, 1);

        currentDataRef.current = newData.map((d, i) => ({
          ...d,
          value: interpolate(
            currentDataRef.current[i]?.value ?? 0,
            d.value,
            t,
          ),
        }));

        draw();

        if (t < 1) {
          rafRef.current = requestAnimationFrame(frame);
        }
      };

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(frame);
    },
    [draw],
  );

  const rebuild = useCallback(() => {
    const targetData = getData();
    targetData.forEach((d) => {
      if (!(d.name in visibleRef.current)) visibleRef.current[d.name] = true;
    });
    animateTo(targetData);
    force();
  }, [animateTo, getData]);

  useEffect(() => {
    marketFactorRef.current = marketFactor;
  }, [marketFactor]);

  useEffect(() => {
    rebuild();
  }, [year, marketFactor, rebuild]);

  const toggleSlice = (name: string) => {
    const cur = visibleRef.current[name];
    visibleRef.current[name] = cur === false ? true : false;
    draw();
    force();
  };

  const targetRows = getData();
  const title = `Token Allocation — ${yearLabels[year - 1]}`;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>

      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={420}
        height={420}
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          draw(e.clientX - rect.left, e.clientY - rect.top);
          const tip = tooltipRef.current;
          if (tip) {
            tip.style.left = `${e.clientX + 10}px`;
            tip.style.top = `${e.clientY + 10}px`;
          }
        }}
        onMouseLeave={() => {
          if (tooltipRef.current) tooltipRef.current.style.display = "none";
          draw();
        }}
      />

      <div className={styles.legend}>
        {targetRows.map((d, i) => (
          <button
            key={d.name}
            type="button"
            className={`${styles.legendItem} ${visibleRef.current[d.name] === false ? styles.legendDisabled : ""}`}
            onClick={() => toggleSlice(d.name)}
          >
            <span
              className={styles.colorBox}
              style={{
                background: CHART_SLICE_COLORS[i % CHART_SLICE_COLORS.length],
              }}
            />
            {d.name}
          </button>
        ))}
      </div>

      <div className={styles.timeline}>
        {([1, 2, 3, 4] as const).map((y, i) => (
          <button
            key={y}
            type="button"
            className={styles.node}
            onClick={() => setYear(y)}
          >
            <div
              className={
                y === year
                  ? `${styles.dot} ${styles.dotActive}`
                  : styles.dot
              }
            />
            {yearLabels[i]}
          </button>
        ))}
      </div>

      <div className={styles.marketDemand}>
        <div>Market Demand</div>
        <input
          className={styles.slider}
          type="range"
          min={0.5}
          max={2.0}
          step={0.05}
          value={marketFactor}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setMarketFactor(v);
            setSliderLabel(
              `Miner Reward Adjustment: ${(v * 100).toFixed(0)}%`,
            );
          }}
        />
        <div className={styles.sliderLabel}>{sliderLabel}</div>
      </div>

      <div
        ref={tooltipRef}
        className={styles.tooltip}
        style={{ display: "none" }}
      />
    </div>
  );
}
