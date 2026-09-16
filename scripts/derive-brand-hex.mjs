// Derive sRGB hex from the site's OKLCH brand tokens and write public/brand/brand.json.
// Plain Node, no deps. Run: node scripts/derive-brand-hex.mjs
// OKLCH -> OKLab -> linear sRGB -> gamma sRGB -> hex (Björn Ottosson's matrices).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

function oklchToHex(Lpct, C, Hdeg) {
  const L = Lpct / 100;
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const rl = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gl = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const g = (x) => {
    const c = Math.min(1, Math.max(0, x));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };
  const to255 = (x) => Math.round(g(x) * 255);
  const hex = (n) => n.toString(16).padStart(2, "0");
  return `#${hex(to255(rl))}${hex(to255(gl))}${hex(to255(bl))}`.toLowerCase();
}

// [token, role, L%, C, Hdeg] — mirror of the brand tokens in app/globals.css :root
const TOKENS = [
  ["--color-bg-canvas", "Canvas — deepest surface", 13, 0.018, 200],
  ["--color-bg", "Background", 15, 0.018, 200],
  ["--color-bg-raised", "Raised background", 18, 0.02, 200],
  ["--color-surface", "Surface", 20, 0.022, 200],
  ["--color-surface-2", "Surface (2)", 25, 0.024, 198],
  ["--color-text", "Text", 95, 0.01, 195],
  ["--color-text-muted", "Text — muted", 73, 0.016, 195],
  ["--color-text-subtle", "Text — subtle", 60, 0.016, 195],
  ["--color-border", "Border", 29, 0.022, 200],
  ["--color-border-strong", "Border — strong", 38, 0.026, 200],
  ["--color-accent", "Emerald — action", 82, 0.16, 165],
  ["--color-accent-strong", "Emerald — strong", 86, 0.15, 167],
  ["--color-link", "Cyan — interaction", 78, 0.12, 218],
  ["--color-link-hover", "Cyan — hover", 85, 0.11, 218],
  ["--color-success", "Success", 83, 0.17, 150],
  ["--color-warning", "Warning", 82, 0.14, 80],
  ["--color-danger", "Danger", 68, 0.18, 18],
];

const colors = TOKENS.map(([token, role, L, C, H]) => ({
  token,
  role,
  oklch: `oklch(${L}% ${C} ${H})`,
  hex: oklchToHex(L, C, H),
}));

const brand = {
  name: "Lineage",
  generatedFrom: "app/globals.css :root (OKLCH source of truth)",
  colors,
  typography: {
    display: {
      family: "Space Grotesk",
      role: "Display, headings, buttons, wordmark (600, -0.02em)",
      weights: [500, 600, 700],
      url: "https://fonts.google.com/specimen/Space+Grotesk",
    },
    body: {
      family: "Inter",
      role: "Body text",
      weights: [400, 500, 600],
      url: "https://fonts.google.com/specimen/Inter",
    },
    mono: {
      family: "JetBrains Mono",
      role: "Code, data, endpoint URLs",
      weights: [400, 500],
      url: "https://fonts.google.com/specimen/JetBrains+Mono",
    },
  },
  logos: [
    { file: "lineage-mark.svg", use: "Primary two-blade mark (use >=24px)" },
    { file: "lineage-mark-mono.svg", use: "One-colour knockout (print/etch/watermark)" },
    { file: "lineage-icon.svg", use: "Plated app icon (app store / touch icon)" },
    { file: "lineage-icon-min.svg", use: "16px minimum glyph (converged centre)" },
    { file: "favicon.svg", use: "Favicon tile" },
  ],
  links: {
    site: "https://lineage.foundation",
    guidelines: "https://lineage.foundation/brand/guidelines.md",
    brandDocs: "https://lineage.foundation/brand",
  },
};

const outPath = fileURLToPath(new URL("../public/brand/brand.json", import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(brand, null, 2) + "\n");
console.log(`wrote ${outPath} (${colors.length} colors)`);
