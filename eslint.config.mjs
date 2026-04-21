import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference implementation of the new ARCO sim; standalone IIFE scripts
    // that share state via globals. Kept in-tree as reference material until
    // the Next.js port is verified, then deleted.
    "arco-sim/**",
  ]),
]);

export default eslintConfig;
