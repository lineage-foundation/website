"use client";

import { useLayoutEffect } from "react";

import { initArcoPage } from "@/lib/arco/arcoInit";

type ArcoWindow = typeof globalThis & {
  nodeAonclick?: () => void;
  nodeBonclick?: () => void;
  nodeConclick?: () => void;
  nodeDonclick?: () => void;
  nodeEonclick?: () => void;
};

type ArcoNodeKey =
  | "nodeAonclick"
  | "nodeBonclick"
  | "nodeConclick"
  | "nodeDonclick"
  | "nodeEonclick";

function arcNodeClick(which: ArcoNodeKey) {
  const fn = (globalThis as ArcoWindow)[which];
  fn?.();
}

export function ArcoLearnClient() {
  // useLayoutEffect so cleanup runs in the commit phase before the subtree is torn down.
  // useEffect cleanup can run after DOM removal during client navigation, which breaks Plotly.purge.
  useLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("plotly.js-dist-min").then((mod) => {
      if (cancelled) return;
      cleanup = initArcoPage(mod.default);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="arcoLearnRoot">
      <div className="market-state-graphs-holder" />

      <div className="info" id="info">
        &nbsp;
      </div>

      <button type="button" className="secondary" id="runBtn">
        Run
      </button>

      <hr className="divide" />

      <div
        className="graph-market-state"
        id="divGraphMarketState"
        style={{ display: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static asset from public */}
        <img
          width={50}
          className="market-state"
          id="imgGraphMarketState"
          src="/images/market-optimized-state-1-new.png"
          alt=""
        />
      </div>

      <div id="codeWindow" className="hidden">
        <div id="codeTitle" />
        <pre id="codeContent" />
      </div>

      <div id="dot" />

      <div id="diagram">
        <div
          className="node"
          id="A"
          role="button"
          tabIndex={0}
          onClick={() => arcNodeClick("nodeAonclick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              arcNodeClick("nodeAonclick");
            }
          }}
        >
          <div className="node-label">A</div>
          <div className="node-desc">Sensor</div>
        </div>

        <div
          className="node"
          id="B"
          role="button"
          tabIndex={0}
          onClick={() => arcNodeClick("nodeBonclick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              arcNodeClick("nodeBonclick");
            }
          }}
        >
          <div className="node-label">B</div>
          <div className="node-desc">Relay</div>
        </div>

        <div
          className="node"
          id="C"
          role="button"
          tabIndex={0}
          onClick={() => arcNodeClick("nodeConclick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              arcNodeClick("nodeConclick");
            }
          }}
        >
          <div className="node-label">C</div>
          <div className="node-desc">Compute</div>
        </div>

        <div
          className="node"
          id="D"
          role="button"
          tabIndex={0}
          onClick={() => arcNodeClick("nodeDonclick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              arcNodeClick("nodeDonclick");
            }
          }}
        >
          <div className="node-label">D</div>
          <div className="node-desc">Actuator</div>
        </div>

        <div
          className="node"
          id="E"
          role="button"
          tabIndex={0}
          onClick={() => arcNodeClick("nodeEonclick")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              arcNodeClick("nodeEonclick");
            }
          }}
        >
          <div className="node-label">Event</div>
          <div className="node-desc">
            ARCO
            <br />
            Event
          </div>
        </div>

        <svg id="wires">
          <line id="wireAB" className="wire" />
          <line id="wireBC" className="wire" />
          <line id="wireCD" className="wire" />
        </svg>
      </div>

      <div>&nbsp;</div>

      <div id="divGraphHolder1" className="graph-holder main">
        <div className="graph" id="stage1" />
      </div>

      <div>&nbsp;</div>

      <div id="divGraphHolder2" className="graph-holder stage-2-off">
        <div className="graph" id="stage2" />
      </div>

      <div>&nbsp;</div>

      <div id="divGraphHolder3" className="graph-holder stage-3-off">
        <div className="graph" id="stage3" />
      </div>

      <div>&nbsp;</div>
    </div>
  );
}
