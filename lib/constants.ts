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

/**
 * Public research and protocol discussion (Discourse). User-facing copy should
 * say **Fremen Forum**; use “Discourse” only for disambiguation (e.g. in a
 * `title` or once in a sentence).
 */
export const URL_DISCOURSE_RESEARCH = "https://lineage.discourse.group/";

/** Public block explorer for the network. */
export const URL_EXPLORER = "https://explorer.lineage.to";

/** "Network" destination (block explorer). */
export const URL_NETWORK = URL_EXPLORER;

/** Published client SDK packages. */
export const URL_SDK_JS_NPM = "https://www.npmjs.com/package/@lineage-foundation/sdk-js";
export const URL_SDK_PY_PYPI = "https://pypi.org/project/lineage-sdk/";

/**
 * Public Lineage node HTTP API origins (documentation examples, curl, MethodPath).
 * Subsystems are exposed on separate hosts.
 */
export const DOCS_MEMPOOL_API_ORIGIN = "https://mempool.lineage.to" as const;
export const DOCS_STORAGE_API_ORIGIN = "https://storage.lineage.to" as const;
export const DOCS_MINER_API_ORIGIN = "https://miner.lineage.to" as const;

/** Mempool (default example base); prefer subsystem-specific constants in new code. */
export const DOCS_API_BASE_URL = DOCS_MEMPOOL_API_ORIGIN;

export const URL_SE3KER = "https://se3ker.com/";

export const URL_PEERSTONE = "https://www.peerstone.io/";
