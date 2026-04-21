"use client";

import dynamic from "next/dynamic";

// Plotly only runs client-side; ssr:false prevents Next from even attempting
// to render it on the server.
export const ArcoSimulatorDynamic = dynamic(
  () =>
    import("@/components/arco-sim/ArcoSimulator").then((m) => m.ArcoSimulator),
  { ssr: false },
);
