"use client";

import dynamic from "next/dynamic";

export const HeroShaderDynamic = dynamic(() => import("./HeroShader"), {
  ssr: false,
});
