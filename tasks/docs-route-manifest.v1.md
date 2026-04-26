# Lineage dev docs — route manifest (v1 audit)

**Source of crawl:** [www.aiblock.dev](https://www.aiblock.dev) (`/docs/*`), BFS link extraction on 2026-04-25.

**Lineage URLs** usually match the source path, **except** the old “network wiki” tree: we do **not** use `/docs/network-wiki/...`. That content lives under **`/docs/concepts/...`** (shorter, no “wiki” in the URL). When porting copy, map `aiblock …/network-wiki/...` → `lineage.foundation/docs/concepts/...`.

**Legend — omissions (PRD 2A):**

- **Omit** — page not shipped, or section removed in port (e.g. Postman-only, AIBlock download links).
- **Stub** — route reserved with “Coming later” (no fake URLs) where IA expects a page.
- **Reframe** — copy ported but product names (2Way.js, Valence, “AIBlock” → Lineage) and accuracy require engineering sign-off.
- **debug` —** endpoint docs for `debug-data` are **not** reproduced per 2A; link removed or one-line “Not applicable for public Lineage documentation yet.”

| # | Source `https://www.aiblock.dev` | Lineage `app/docs/.../page.tsx` & public path | v1 | Notes / omissions (2A) |
| --- | --- | --- | --- | --- |
| 1 | `/docs` | `app/docs/[[...slug]]/page.tsx` (empty `slug`) | Y | Reframe; remove emoji-heavy tone if per PRD §6. |
| 2 | `/docs/tutorials-overview` | `app/docs/tutorials-overview/page.tsx` | Y | Reframe AIBlock → Lineage. |
| 3 | `/docs/network-wiki` | `app/docs/concepts/page.tsx` (`/docs/concepts`) | Y | Source “Fundamentals”; category index; sub-pages below. |
| 4 | `/docs/network-wiki/node-types` | `app/docs/concepts/node-types/page.tsx` | Y | Mempool / Storage / Miner — keep **section names** if still accurate (PRD 1.3). |
| 5 | `/docs/network-wiki/mempool-node` | `app/docs/concepts/mempool-node/page.tsx` | Y | — |
| 6 | `/docs/network-wiki/storage-node` | `app/docs/concepts/storage-node/page.tsx` | Y | — |
| 7 | `/docs/network-wiki/miner-node` | `app/docs/concepts/miner-node/page.tsx` | Y | — |
| 8 | `/docs/network-wiki/block-mining` | `app/docs/concepts/block-mining/page.tsx` | Y | — |
| 9 | `/docs/network-wiki/transactions` | `app/docs/concepts/transactions/page.tsx` | Y | — |
| 10 | `/docs/network-wiki/two-way-transaction` | `app/docs/concepts/two-way-transaction/page.tsx` | Y | — |
| 11 | `/docs/network-wiki/unicorns` | `app/docs/concepts/unicorns/page.tsx` | Y | — |
| 12 | `/docs/2wayjs-tutorials` | `app/docs/2wayjs-tutorials/page.tsx` | Y | **Reframe:** 2Way.js may be historical; see § Naming below. |
| 13 | `/docs/2wayjs-tutorials/get-started` | `app/docs/2wayjs-tutorials/get-started/page.tsx` | Y | — |
| 14 | `/docs/2wayjs-tutorials/create-an-item` | `app/docs/2wayjs-tutorials/create-an-item/page.tsx` | Y | — |
| 15 | `/docs/2wayjs-tutorials/two-way-payments` | `app/docs/2wayjs-tutorials/two-way-payments/page.tsx` | Y | — |
| 16 | `/docs/2wayjs-tutorials/send-and-receive` | `app/docs/2wayjs-tutorials/send-and-receive/page.tsx` | Y | — |
| 17 | `/docs/valence-node` | `app/docs/valence-node/page.tsx` | Y | **Reframe:** Valence product naming. |
| 18 | `/docs/valence-node/get-started` | `app/docs/valence-node/get-started/page.tsx` | Y | — |
| 19 | `/docs/valence-node/available-routes` | `app/docs/valence-node/available-routes/page.tsx` | Y | — |
| 20 | `/docs/valence-core` | `app/docs/valence-core/page.tsx` | Y | **Reframe.** |
| 21 | `/docs/valence-core/how-to-use` | `app/docs/valence-core/how-to-use/page.tsx` | Y | Same URL slug as source. |
| 22 | `/docs/valence-core/use-plugins` | `app/docs/valence-core/use-plugins/page.tsx` | Y | — |
| 23 | `/docs/api-tutorials` | `app/docs/api-tutorials/page.tsx` | Y | — |
| 24 | `/docs/api-tutorials/get-started` | `app/docs/api-tutorials/get-started/page.tsx` | Y | **Omit** Postman download steps; replace with “Tooling: coming later” (2A). |
| 25 | `/docs/api/overview` | `app/docs/api/overview/page.tsx` | Y | Remove links to Postman, AIBlock wikis if only AIBlock. |
| 26 | `/docs/api/mempool/mempool-api` | `app/docs/api/mempool/mempool-api/page.tsx` | Y | **Omit** Postman / email / GPL boilerplate that isn’t Lineage. |
| 27 | `/docs/api/mempool/address` | `app/docs/api/mempool/address/page.tsx` | Y | — |
| 28 | `/docs/api/mempool/create-item-asset` | `app/docs/api/mempool/create-item-asset/page.tsx` | Y | — |
| 29 | `/docs/api/mempool/create-tx` | `app/docs/api/mempool/create-tx/page.tsx` | Y | — |
| 30 | `/docs/api/mempool/fetch-balance` | `app/docs/api/mempool/fetch-balance/page.tsx` | Y | — |
| 31 | `/docs/api/mempool/info` | `app/docs/api/mempool/info/page.tsx` | Y | — |
| 32 | `/docs/api/mempool/issued-supply` | `app/docs/api/mempool/issued-supply/page.tsx` | Y | — |
| 33 | `/docs/api/mempool/total-supply` | `app/docs/api/mempool/total-supply/page.tsx` | Y | — |
| 34 | `/docs/api/mempool/transaction` | `app/docs/api/mempool/transaction/page.tsx` | Y | — |
| 35 | `/docs/api/mempool/debug-data` | `app/docs/api/mempool/debug-data/page.tsx` | **N** | **2A** — do not document `debug-data`; optional **stub** “Internal diagnostics are not public.” or skip route. |
| 36 | `/docs/api/miner/miner-api` | `app/docs/api/miner/miner-api/page.tsx` | Y | **Omit** Postman. |
| 37 | `/docs/api/miner/info` | `app/docs/api/miner/info/page.tsx` | Y | — |
| 38 | `/docs/api/miner/debug-data` | `app/docs/api/miner/debug-data/page.tsx` | **N** | **2A** same as mempool debug. |
| 39 | `/docs/api/storage/storage-api` | `app/docs/api/storage/storage-api/page.tsx` | Y | — |
| 40 | `/docs/api/storage/block` | `app/docs/api/storage/block/page.tsx` | Y | — |
| 41 | `/docs/api/storage/block-by-num` | `app/docs/api/storage/block-by-num/page.tsx` | Y | `x-cache-id` in examples: keep if Lineage API matches; else note “header TBD.” |
| 42 | `/docs/api/storage/latest-block` | `app/docs/api/storage/latest-block/page.tsx` | Y | — |
| 43 | `/docs/api/storage/blockchain-entry` | `app/docs/api/storage/blockchain-entry/page.tsx` | Y | — |
| 44 | `/docs/api/storage/info` | `app/docs/api/storage/info/page.tsx` | Y | — |
| 45 | `/docs/api/storage/debug-data` | `app/docs/api/storage/debug-data/page.tsx` | **N** | **2A** — skip or stub. |
| 46 | `/docs/build-apps/design-considerations` | `app/docs/build-apps/design-considerations/page.tsx` | Y | — |
| 47 | `/docs/postman-collections` | `app/docs/postman-collections/page.tsx` | **N** | **2A** — **Omit** route or 301 to `/docs/api/overview` with no Postman. Prefer **no** page; remove nav links. |
| 48 | `/docs/mining-overview` | `app/docs/mining-overview/page.tsx` | Y | — |
| 49 | `/docs/mining/hardware-requirements` | `app/docs/mining/hardware-requirements/page.tsx` | Y | — |
| 50 | `/docs/mining/installing-a-lite-node` | `app/docs/mining/installing-a-lite-node/page.tsx` | Y | — |
| 51 | `/docs/mining/installing-a-mining-node` | `app/docs/mining/installing-a-mining-node/page.tsx` | Y | — |
| 52 | `/docs/mining/managing-a-node` | `app/docs/mining/managing-a-node/page.tsx` | Y | — |
| 53 | `/docs/tags` | `app/docs/tags/page.tsx` | **N** | Docusaurus tag index; **out of v1** unless product wants tag UX. |
| 54+ | `/docs/tags/*` | (none) | **N** | 18 tag filter pages; **out of v1**. |

**Crawl note:** Docusaurus linked capitalized slugs `.../Mempool-Node` etc. that returned **404** on aiblock; v1 should use the **lowercase** working paths only (rows 4–11 above).

**Total v1 content routes (approx.):** 52 pages if `debug-data` and `postman-collections` excluded; 49 if we also merge optional stubs.

---

## Naming & protocol (1.3 / PRD §10)

- **Lineage** replaces “AIBlock” in all user-facing text.
- **Nav / IA labels:** “Welcome”, “Tutorials”, “API”, “Network wiki”-style groupings — align with our `docs-nav` (exact strings TBD in task 2).
- **2Way.js / Valence:** these are **AIBlock-era product names**. Default for v1: **port copy** with a short editorial note that the Lineage public stack may use different SDK/plugin names, and require **stakeholder sign-off** to rename or drop sections.
- **Heading emojis** (e.g. 🗃️ 🚀 in source): **drop or reduce** in Lineage (PRD default: professional voice); optional in tutorials only.
- **Protocol parity** (1.2 / FR 4.9): any RPC path, header, or field that differs in Lineage must be updated in port, not left as AIBlock.

---

*Generated for `tasks/tasks-lineage-dev-docs.md` (task 1.0).*
