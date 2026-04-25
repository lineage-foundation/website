"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./ArcoSimulator.module.css";
import {
  NODE_LABELS,
  NODES,
  PSEUDOCODE_MAP,
  STAGE_POINTS,
  chartStageForStep,
  marketPhaseLabel,
  type NodeId,
} from "./data";

// Total steps across all three iterations (3 × 5 nodes).
const TOTAL_STEPS = 15;
const NODES_PER_ITERATION = 5;

type Plotly = typeof import("plotly.js-dist-min").default;

/* Must be plain hex/rgb — Plotly config. Values match v2 tokens in `app/globals.css`. */
const PLOT_BG = "#080a0f";
const PLOT_TEXT = "#e9ebf0";
const PLOT_MUTED = "#a2aab6";
const PLOT_GRID = "#222833";

const plotLayout = {
  paper_bgcolor: PLOT_BG,
  plot_bgcolor: PLOT_BG,
  font: { color: PLOT_TEXT, family: "Inter, system-ui, sans-serif", size: 11 },
  margin: { l: 0, r: 0, t: 0, b: 0 },
  scene: {
    xaxis: {
      title: "Crop Type",
      color: PLOT_MUTED,
      gridcolor: PLOT_GRID,
    },
    yaxis: {
      title: "Input Choice",
      color: PLOT_MUTED,
      gridcolor: PLOT_GRID,
    },
    zaxis: {
      title: "Profit",
      color: PLOT_MUTED,
      gridcolor: PLOT_GRID,
    },
  },
  autosize: true,
};

function plotData(stage: 1 | 2 | 3) {
  const points = STAGE_POINTS[stage - 1];
  return [
    {
      x: points.map((p) => p[0]),
      y: points.map((p) => p[1]),
      z: points.map((p) => p[2]),
      mode: "markers",
      type: "scatter3d",
      marker: {
        size: 6,
        color: points.map((p) => p[2]),
        colorscale: "Viridis",
        opacity: 0.9,
      },
      hovertemplate:
        "<b>Crop:</b> %{x}<br>" +
        "<b>Input:</b> %{y}<br>" +
        "<b>Profit:</b> %{z}<extra></extra>",
    },
  ];
}

export function ArcoSimulator() {
  const [step, setStep] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const plotlyRef = useRef<Plotly | null>(null);
  const currentStageRef = useRef<1 | 2 | 3>(1);

  const iteration = Math.floor(step / NODES_PER_ITERATION) + 1;
  const activeNode = NODES[step % NODES_PER_ITERATION] as NodeId;
  const stage = chartStageForStep(step);

  // Load Plotly and render the initial chart. Plotly is heavy (~3MB) so it
  // only loads when this component mounts on the client.
  useEffect(() => {
    let cancelled = false;
    const chartEl = chartRef.current;

    void import("plotly.js-dist-min").then((mod) => {
      if (cancelled || !chartEl) return;
      plotlyRef.current = mod.default;
      void mod.default.newPlot(chartEl, plotData(1), plotLayout, {
        responsive: true,
        displaylogo: false,
      });
    });

    return () => {
      cancelled = true;
      if (chartEl && plotlyRef.current) {
        plotlyRef.current.purge(chartEl);
      }
    };
  }, []);

  // Redraw whenever the stage the chart should show changes. The reference
  // implementation only ever re-drew on the "Event" step, but deriving stage
  // from step and reacting to it yields identical visuals with simpler code.
  useEffect(() => {
    const Plotly = plotlyRef.current;
    const chartEl = chartRef.current;
    if (!Plotly || !chartEl) return;
    if (stage === currentStageRef.current) return;
    currentStageRef.current = stage;
    void Plotly.react?.(chartEl, plotData(stage), plotLayout);
  }, [stage]);

  // Keep the Plotly chart in step with container width. ResizeObserver gives
  // us reliable "container-size changed" notifications even if the viewport
  // didn't change (e.g. sidebar toggled, font scaling).
  useEffect(() => {
    const chartEl = chartRef.current;
    if (!chartEl) return;
    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      plotlyRef.current?.Plots?.resize?.(chartEl);
    });
    ro.observe(chartEl);
    return () => ro.disconnect();
  }, []);

  const handleRun = () => {
    setStep((s) => (s + 1) % TOTAL_STEPS);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button type="button" className={styles.runBtn} onClick={handleRun}>
          ▶ Run Simulation
        </button>

        <div className={styles.status} aria-live="polite">
          <div>ARCO Iteration: {iteration}</div>
          <div>{marketPhaseLabel(iteration)}</div>
          <div>Active Node: {activeNode}</div>
        </div>

        <h3 className={styles.sectionTitle}>Nodes in Network</h3>
        <div className={styles.nodes}>
          {NODES.map((n) => (
            <div
              key={n}
              id={`node-${n}`}
              className={`${styles.node} ${
                activeNode === n ? styles.nodeActive : ""
              }`}
            >
              {n}
              <br />
              {NODE_LABELS[n]}
            </div>
          ))}
        </div>

        <h3 className={styles.sectionTitle}>Current Market State</h3>
        <div ref={chartRef} className={styles.chart} />
      </div>

      <div className={styles.right}>
        <h3 className={styles.sectionTitle}>Code Running at Node</h3>
        <pre
          className={styles.pseudocode}
          // Pseudocode strings are static, hand-authored constants with inline
          // syntax-highlighting spans — not user input. Rendering as HTML keeps
          // the highlighting without a tokenizer pass.
          dangerouslySetInnerHTML={{ __html: PSEUDOCODE_MAP[activeNode] }}
        />
      </div>
    </div>
  );
}
