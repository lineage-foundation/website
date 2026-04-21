// WCAG 2.1 contrast audit of design tokens.
// Run: node scripts/contrast.mjs

/** @param {string} hex */
function luminance(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const chan = (c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

/** @param {string} a @param {string} b */
function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const tokens = {
  bg: "#0b0c10",
  surface: "#141620",
  surface2: "#1c1f2a",
  text: "#f2f3f5",
  textMuted: "#a7acb3",
  textSubtle: "#8a8f98",
  textInverse: "#0b0c10",
  border: "#262a33",
  borderStrong: "#363b47",
  accent: "#effd5c",
  accentStrong: "#d0fc37",
  accentInk: "#0b0c10",
};

// "required" = PRD §6.4 / task 6.6 scope: body text, muted text, CTA text.
// "informational" = decorative dividers that do not identify an interactive
// component (WCAG 1.4.11 does not require 3:1 for these). Reported so we
// can see what we're trading off visually.
const REQUIRED = [
  ["text", "bg", "body text on page bg"],
  ["text", "surface", "body text on surface"],
  ["text", "surface2", "body text on surface-2"],
  ["textMuted", "bg", "muted text on page bg"],
  ["textMuted", "surface", "muted text on surface"],
  ["textMuted", "surface2", "muted text on surface-2"],
  ["textSubtle", "bg", "subtle text on page bg"],
  ["textSubtle", "surface", "subtle text on surface"],
  ["accentInk", "accent", "primary button label on accent"],
  ["accentInk", "accentStrong", "primary button label on accent-strong"],
  ["accent", "bg", "accent link/outline on page bg"],
  ["accentStrong", "bg", "accent-strong on page bg"],
];

const INFORMATIONAL = [
  ["border", "bg", "border on page bg (decorative)"],
  ["borderStrong", "bg", "border-strong on page bg (decorative)"],
];

const NORMAL = 4.5;

let failures = 0;
console.log("required (AA 4.5:1 normal text):\n");
for (const [fg, bg, label] of REQUIRED) {
  const r = ratio(tokens[fg], tokens[bg]);
  const pass = r >= NORMAL;
  if (!pass) failures++;
  console.log(
    `  [${pass ? "PASS" : "FAIL"}] ${r.toFixed(2).padStart(5)}:1  ${label}  (${tokens[fg]} on ${tokens[bg]})`,
  );
}

console.log("\ninformational (decorative — not WCAG-gated):\n");
for (const [fg, bg, label] of INFORMATIONAL) {
  const r = ratio(tokens[fg], tokens[bg]);
  console.log(
    `  [----] ${r.toFixed(2).padStart(5)}:1  ${label}  (${tokens[fg]} on ${tokens[bg]})`,
  );
}

console.log(
  `\n${failures === 0 ? "all required contrast pairs pass WCAG 2.1 AA" : `${failures} required pair(s) failed`}`,
);
process.exit(failures === 0 ? 0 : 1);
