/**
 * Primary outbound URLs for CTAs and external properties.
 * Update here when changing Zenodo records, GitHub org, or media links.
 */
export const SITE_ORIGIN = "https://lineage.foundation";

export const URL_ZENODO_WHITEPAPER =
  "https://zenodo.org/records/19203176";

export const URL_GITHUB_ORG = "https://github.com/lineage-foundation";

export const URL_YOUTUBE_VIDEO =
  "https://www.youtube.com/watch?v=Wsbmx_SQjzc";

/** Community chat. User-facing label: "Discord". */
export const URL_DISCORD = "https://discord.gg/5cwn7jZ7G";

/** Social. User-facing label: "X"; handle @lineagefndn. */
export const URL_X = "https://x.com/lineagefndn";

/**
 * Public research and protocol discussion (Discourse). User-facing copy should
 * say **Fremen Forum**; use "Discourse" only for disambiguation (e.g. in a
 * `title` or once in a sentence).
 */
export const URL_DISCOURSE_RESEARCH = "https://lineage.discourse.group/";

/** Public block explorer for the network. */
export const URL_EXPLORER = "https://explorer.lineage.to";

/** "Network" destination (block explorer). */
export const URL_NETWORK = URL_EXPLORER;

/** Published client SDKs: registry package plus source repository. */
export type SdkEntry = {
  lang: string;
  registry: string;
  pkg: string;
  pkgUrl: string;
  repoUrl: string;
};

export const SDKS: SdkEntry[] = [
  {
    lang: "JavaScript / TypeScript",
    registry: "npm",
    pkg: "@lineage-foundation/sdk-js",
    pkgUrl: "https://www.npmjs.com/package/@lineage-foundation/sdk-js",
    repoUrl: "https://github.com/lineage-foundation/sdk-js",
  },
  {
    lang: "Python",
    registry: "PyPI",
    pkg: "lineage-sdk",
    pkgUrl: "https://pypi.org/project/lineage-sdk/",
    repoUrl: "https://github.com/lineage-foundation/sdk-python",
  },
  {
    lang: "Go",
    registry: "pkg.go.dev",
    pkg: "github.com/lineage-foundation/sdk-go",
    pkgUrl: "https://pkg.go.dev/github.com/lineage-foundation/sdk-go",
    repoUrl: "https://github.com/lineage-foundation/sdk-go",
  },
  {
    lang: "Rust",
    registry: "crates.io",
    pkg: "lineage-sdk",
    pkgUrl: "https://crates.io/crates/lineage-sdk",
    repoUrl: "https://github.com/lineage-foundation/sdk-rust",
  },
  {
    lang: "PHP",
    registry: "Packagist",
    pkg: "lineage/php",
    pkgUrl: "https://packagist.org/packages/lineage/php",
    repoUrl: "https://github.com/lineage-foundation/sdk-php",
  },
  {
    lang: "Laravel",
    registry: "Packagist",
    pkg: "lineage/laravel",
    pkgUrl: "https://packagist.org/packages/lineage/laravel",
    repoUrl: "https://github.com/lineage-foundation/sdk-laravel",
  },
];

/**
 * Public Lineage node HTTP API origins (documentation examples, curl, MethodPath).
 * Subsystems are exposed on separate hosts.
 */
export const DOCS_MEMPOOL_API_ORIGIN = "https://mempool.lineage.to" as const;
export const DOCS_STORAGE_API_ORIGIN = "https://storage.lineage.to" as const;
export const DOCS_MINER_API_ORIGIN = "https://miner.lineage.to" as const;

/** Hosted Model Context Protocol endpoint for AI agents. */
export const URL_MCP_SERVER = "https://mcp.lineage.to";

/** Mempool (default example base); prefer subsystem-specific constants in new code. */
export const DOCS_API_BASE_URL = DOCS_MEMPOOL_API_ORIGIN;

export const URL_SE3KER = "https://se3ker.com/";

export const URL_PEERSTONE = "https://www.peerstone.io/";

/** Shared Twitter card metadata. Spread into each page's `twitter` block so the
 *  @lineagefndn handle survives Next.js's per-segment metadata replacement. */
export const TWITTER_META = {
  card: "summary_large_image",
  site: "@lineagefndn",
  creator: "@lineagefndn",
} as const;
