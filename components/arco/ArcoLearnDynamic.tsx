"use client";

import dynamic from "next/dynamic";

export const ArcoLearnDynamic = dynamic(
  () =>
    import("@/components/arco/ArcoLearnClient").then((m) => m.ArcoLearnClient),
  { ssr: false },
);
