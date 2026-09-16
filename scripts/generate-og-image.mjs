// Generate the Open Graph / social share image (1200x630) on the v2 brand.
// Deep teal-space background + the Clearing Cross mark (emerald/cyan) + wordmark.
// Run: node scripts/generate-og-image.mjs [outPath]
// Uses hex (not oklch) so librsvg-via-sharp renders colours correctly.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const W = 1200, H = 630;

// Clearing Cross mark paths (public/brand/lineage-mark.svg), 32x32 viewBox.
const cyanPath =
  "M6,7 L16,15 L26,7 L24.6,5.8 L16,13 L7.4,5.8 Z M6,25 L16,17 L26,25 L24.6,26.2 L16,19 L7.4,26.2 Z";
const emerPath =
  "M7,6 L15,16 L7,26 L5.4,24.6 L12,16 L5.4,7.4 Z M25,6 L17,16 L25,26 L26.6,24.6 L20,16 L26.6,7.4 Z";

const markSize = 210;
const markX = (W - markSize) / 2;
const markY = 96;
const scale = markSize / 32;

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#02100f"/>
      <stop offset="0.55" stop-color="#061415"/>
      <stop offset="1" stop-color="#09191a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="55%">
      <stop offset="0" stop-color="#37e4aa" stop-opacity="0.16"/>
      <stop offset="0.5" stop-color="#47caea" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#47caea" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blade-c" cx="50%" cy="50%" r="58%">
      <stop offset="0" stop-color="#8fe8f4"/><stop offset="1" stop-color="#47caea"/>
    </radialGradient>
    <radialGradient id="blade-a" cx="50%" cy="50%" r="58%">
      <stop offset="0" stop-color="#7bf0c6"/><stop offset="1" stop-color="#37e4aa"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(${markX},${markY}) scale(${scale})">
    <path d="${cyanPath}" fill="url(#blade-c)"/>
    <path d="${emerPath}" fill="url(#blade-a)"/>
  </g>
  <text x="${W / 2}" y="440" text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700"
    font-size="124" letter-spacing="-2.5" fill="#e7f1f0">Lineage</text>
  <text x="${W / 2}" y="512" text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="500"
    font-size="30" letter-spacing="0.3" fill="#9dabab">A Layer-1 where markets become verifiable programs.</text>
</svg>`;

const out =
  process.argv[2] ||
  fileURLToPath(new URL("../public/images/open-graph-lineage-v2-1200x630.png", import.meta.url));

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
