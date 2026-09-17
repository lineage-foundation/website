# Docs: deepen & regroup the Concepts section (source-grounded)

**Date:** 2026-09-17
**Status:** Approved design, pending review → implementation plan

## Goal

Replace the eight one-paragraph Concept "stubs" in `app/docs/page.tsx` with a
**regrouped, deepened, developer-oriented** Concepts section, written to
verified source truth (with code examples and JSON), and fix the factual errors
currently live. Also make a **narrow** set of precision fixes to the marketing
`/technology` page.

## Audience & style

Developer docs. Each concept: clear prose + concrete example (JSON tx/balance,
SDK snippet, or opcode/struct sketch) + cross-links to `/developers/api`,
`/tokenomics`, `/technology`. Reuse existing docs building blocks: `<article
id className={styles.prose}>`, `<h2>/<h3>`, `<CodeBlock lang="json|javascript|
rust|shell">`, `<Table>`, plain `<ul>`, and the raw `note`/`doc-card` patterns.
**Every new article id needs a matching `<li>` in the Concepts TOC `<nav>`** (the
`DocsScroll` scroll-spy keys off id + nav link).

## Source-of-truth note

All facts below are grounded in the `prime`, `fleet`, `valence` repos, the
`/v1` OpenAPI (`public/openapi.json`), the reference SDK (`sdk-js`), and the UTMM
whitepaper (Zenodo 19203176). Citations are given so implementers can verify.
**Do not state anything not backed here.** Where a fact is version-specific or
unimplemented, say so honestly in the copy.

## Ownership / no-duplication

`/technology` owns ARCO / UTMM / Prime Radiant Consensus / SandWorm / market
economics; `/tokenomics` owns LNGX / FReT / supply / allocation; `/research`
owns formal theory. Docs Concepts own **protocol & node mechanics** and link out
rather than re-explain the economics/vision.

---

## New Concepts structure (TOC groups → articles)

Regroup the flat list into labeled `<h2>` groups in the TOC `<nav>` (the nav
supports multiple `<h2>` group headings). Article ids in parentheses.

**Concepts — Data & transactions**
1. Data model (`#c-data-model`) — NEW
2. Keys, addresses & wallets (`#c-keys`) — NEW
3. Transactions (`#c-transactions`) — deepen (keep id)
4. Scripts (`#c-scripts`) — NEW
5. Two-way (DRUID) payments (`#c-two-way`) — deepen (keep id)
6. The valence relay (`#c-valence`) — NEW

**Concepts — Network & consensus**
7. Node types (`#c-node-types`) — correct + deepen (keep id)
8. Mempool node (`#c-mempool`) — deepen (keep id)
9. Storage node (`#c-storage`) — deepen (keep id)
10. Miner node (`#c-miner`) — deepen (keep id)
11. Consensus & the block round (`#c-consensus`) — NEW (absorbs/expands `#c-block-mining`; keep a `#c-block-mining` sub-anchor or redirect the old label)
12. Blocks & headers (`#c-blocks`) — NEW
13. UNiCORN randomness (`#c-unicorn`) — rewrite (keep id)

(Retain the old `#c-block-mining` label as the TOC entry pointing at the new
`#c-consensus` article, or rename the nav entry — implementer's choice, but keep
one anchor working so external `/docs#c-block-mining` links from `/technology`
don't break.)

---

## Per-article content (verified facts + examples)

### 1. Data model (`#c-data-model`)
- **UTXO ledger**, Bitcoin-lineage (not account/EVM). Balance = a view over
  unspent outputs, not a stored number. [prime `transaction.rs`; skills fundamentals]
- **Assets are one of two kinds** — `prime/src/primitives/asset.rs:127`:
  `enum Asset { Token(TokenAmount(u64)), Item(ItemAsset) }`. `ItemAsset {
  amount: u64, genesis_hash: Option<String>, metadata: Option<String> }`
  (`asset.rs:105`). A `Data` variant is documented but **not implemented** — do
  not mention it.
- **Native token**: the integer `Token` amount. Brand name **LNGX**; note the
  ticker is a brand/network name, not a `prime` identifier (prime code has no
  "LNGX" string). Base units: display divisor **72,072,000**; supply cap
  `TOTAL_TOKENS = 72,072,000 × 5,000,000,000` (`prime/constants.rs:25-28`). Link
  `/tokenomics` for economics.
- **Items**: `genesis_hash` = the id minted when an item is created; `metadata`
  ≤ 800 bytes (`MAX_METADATA_BYTES`).
- **Balance shape** (real, from OpenAPI `BalancesResponse` / sdk-js
  `IFetchBalanceResponse`): show JSON
  ```json
  { "balance": { "total": { "tokens": 100, "items": { "g3b8…": 50 } },
                 "address_list": { "d0e7…": [ { "out_point": { "t_hash": "g3b8…", "n": 0 },
                                               "value": { "Token": 100 } } ] } } }
  ```
  Cross-link `/developers/api` and `#c-transactions`.

### 2. Keys, addresses & wallets (`#c-keys`)
- **Keys are ed25519** (`prime/src/crypto.rs`, `ring`). Signatures 64 bytes.
- **Address = `hex(sha3_256(public_key))`** → 64 hex chars
  (`transaction_utils.rs:53`). Mention two legacy schemes exist (v0 = 32 chars;
  temp) but current is the 64-char standard.
- **Wallets**: BIP39 mnemonic; addresses derive via BIP32 [skills fundamentals;
  sdk-js]. SDK holds keys locally, encrypted with a passphrase.
- **Signing (the important part)**: you sign the SHA3-256 of
  `json(each TxOut) concatenated ++ json(previous_out)`, hex-encoded — i.e.
  **the outputs plus the input's previous outpoint, and nothing else**
  (`transaction_utils.rs:175-195`). It excludes `fees`, `druid_info`, and the
  input's own scriptSig (the scriptSig is reset before signing). This is why
  "you sign exactly what you submit, and field order is load-bearing" (serde_json
  emits struct fields in declaration order). SDK example: `initNew`, `getNewKeypair`,
  `keypair.address` (sdk-js README).

### 3. Transactions (`#c-transactions`) — deepen
- **Transaction struct** (`prime/transaction.rs:181`), field order load-bearing:
  `Transaction { inputs: Vec<TxIn>, outputs: Vec<TxOut>, version: usize,
  fees: Vec<TxOut>, druid_info: Option<DdeValues> }`. txid = SHA3-256 of
  `bincode(tx)`, hex, prefixed `'g'`, truncated to 32 chars.
- `TxIn { previous_out: Option<OutPoint>, script_signature: Script }`;
  `OutPoint { t_hash: String, n: i32 }`; `TxOut { value: Asset, locktime: u64,
  script_public_key: Option<String> }`. `previous_out: None` = a create/coinbase
  input.
- **version**: a stamped field. `prime` sets it to `NETWORK_VERSION` and does
  **not** branch on it; the reference SDK stamps its own network version. Do NOT
  claim "version 2 == two-way" — two-way is signalled by `druid_info` (see #5).
- **fees**: a real `Vec<TxOut>` that must be funded by inputs (inputs = outputs +
  fees must balance); there is currently **no fee-rate/min-fee policy**
  (`is_valid_amount` is a placeholder). State fees exist as balanced outputs but
  the economic fee policy isn't fixed yet.
- **Example**: real `POST /v1/transactions` body (from OpenAPI + sdk-js shapes;
  the OpenAPI marks several fields opaque `object`, so use sdk-js `ITxOut`/`Pay2PkH`
  shapes — flag as SDK-derived):
  ```json
  { "transactions": [ { "inputs": [ { "previous_out": { "t_hash": "g3b8…", "n": 0 },
      "script_signature": { "Pay2PkH": { "signable_data": "a1c4…", "signature": "6f2e…",
        "public_key": "5b8a…", "address_version": null } } } ],
    "outputs": [ { "value": { "Token": 10 }, "locktime": 0, "script_public_key": "d0e7…" },
                 { "value": { "Token": 90 }, "locktime": 0, "script_public_key": "a1b2…change" } ],
    "version": 2, "druid_info": null, "fees": null } ] }
  ```
  Note the asset wire form `{ "Token": n }` / `{ "Item": {…} }` (capitalized)
  differs from the REST `ApiAsset` `{ "kind": "token", … }` response form — don't
  mix them. Add a short sdk-js one-way payment snippet (`makeTokenPayment(addr,
  10, [keypair], keypair)`, change-to-self, `transactionHash` receipt).

### 4. Scripts (`#c-scripts`) — NEW
- Lineage uses a **bounded, loop-free (Turing-incomplete) stack machine**,
  Bitcoin-Script-style (`prime/src/script/`, interpreter `lang.rs:203-348`, no
  loops/back-jumps; `ConditionStack` for `IF/ELSE`). Limits (`constants.rs`):
  item ≤ 520, ≤ 201 ops, ≤ 20 multisig keys, script ≤ 10000, stack ≤ 1000.
- Opcodes: constants `OP_0..OP_16`, flow (`OP_IF/NOTIF/ELSE/ENDIF/VERIFY/BURN`),
  stack/splice/bitwise/arithmetic, crypto (`OP_SHA3`, `OP_HASH256*`,
  `OP_CHECKSIG*`, `OP_CHECKMULTISIG*`), and smart-data `OP_CREATE` (0xa0, mints
  items). Show a compact list, not all 90.
- **P2PKH** is the standard lock (`Script::pay2pkh`, `lang.rs:393`): the combined
  script pushes `<check_data> <sig> <pubkey> OP_DUP OP_HASH256 <addr> OP_EQUALVERIFY
  OP_CHECKSIG`. Explain lock vs unlock and how a spend is validated
  (`tx_has_valid_p2pkh_sig`). Multisig + P2SH exist (`multisig_*`,
  `construct_p2sh_address`). Cross-link `#c-keys` (signing) and `#c-two-way`.

### 5. Two-way (DRUID) payments (`#c-two-way`) — deepen
- A **two-way payment = an atomic swap**: two transaction halves settle in the
  same block or neither does. Signalled by a transaction carrying
  `druid_info: Some(DdeValues)` — not by a version number.
- `DdeValues { druid: String, participants: usize,
  expectations: Vec<DruidExpectation{ from, to, asset }>, genesis_hash: Option<String> }`
  (`prime/src/primitives/druid.rs:5`). **`druid_info` is UNSIGNED** (excluded
  from the signable preimage). Matching is structural: `druid_expectations_are_met`
  cross-checks each party's declared `from`/`to`/`asset` against the actual
  outputs of the DRUID-linked set (`druid_utils.rs:16`). Settlement happens in the
  mempool's DRUID pool.
- **Flow (sdk-js)**: initiator `make2WayPayment(bAddr, sendingAsset, receivingAsset,
  keypairs, receiveKeypair)` → `{ druid, encryptedTx }`; counterparty
  `fetchPending2WayPayment` → `accept2WayPayment(druid, details, keypairs)`; both
  halves then settle. Offers are relayed via **valence** (see #6). Note the
  reference SDK currently posts the offer as unencrypted JSON.

### 6. The valence relay (`#c-valence`) — NEW
- **valence is a generic, opaque, end-to-end-encrypted per-mailbox relay** (axum
  + Redis) — it carries two-way payment offers but does not model them.
  Mailbox = an address; entries keyed by a caller-supplied `id` (a DRUID is just
  one example id). It never sees plaintext; clients encrypt for the recipient.
  Mailboxes expire after a TTL (default 600s). [valence `README`, `store.rs`,
  `messages.rs`]
- **Auth headers** on `/messages` (`valence/src/auth.rs:79`): `address`,
  `public_key`, `signature = ed25519_sign(sk, utf8_bytes(address))` (the raw,
  unhashed address string). **Verify-only** — there is deliberately no
  address↔pubkey binding, because a sender addresses mail to a *recipient's*
  address while signing with their own key. Confidentiality comes from E2E
  encryption, not access control.
- **Routes**: `POST /messages` `{id,data}` → 201; `GET /messages` → `{id:data}`
  map; `GET/DELETE /messages/{id}`; `DELETE /messages`; unauth `GET /healthz`.
- **Honesty note**: the pending→accepted *offer lifecycle* lives in the SDK/wallet,
  not in valence. Say so.

### 7. Node types (`#c-node-types`) — CORRECT (3 → 5) + deepen
- **Five roles**, `fleet` `interfaces.rs:259` `enum NodeType { Miner, Storage,
  Mempool, User, PreLaunch }` (binaries `bins/{mempool,miner,storage,user,pre_launch}`):
  - **mempool** — validates/collects txs, drives block creation, coordinates
    miners+storage; serves `/v1`.
  - **storage** — persists the chain, serves blocks/entries; serves `/v1`.
  - **miner** — runs PoW for its mempool; serves `/v1`.
  - **user** — wallet client (holds keys, builds/sends payments, reads UTXOs);
    serves `/v1`.
  - **pre_launch** — a **one-shot bootstrap/upgrade helper with NO HTTP API**;
    sends startup requests then exits.
  Present as a short table (role · job · `/v1`?). Cross-link `/technology#subsystems`.

### 8/9/10. Mempool / Storage / Miner (`#c-mempool` / `#c-storage` / `#c-miner`) — deepen
- **Mempool**: accepts txs, replicates them through its **RAFT** group, runs the
  mining round, assembles the winning block, sends it to storage. Each mempool
  runs one RAFT group; state that must match across nodes goes through the log
  (tx pool, timestamp, pipeline transitions, UNiCORN inputs). Per-round detail →
  link `#c-consensus`.
- **Storage**: validates the PoW of received blocks, replicates via its own RAFT
  group (`StorageRaftItem::PartBlock`), reassembles parts into a `CompleteBlock`,
  persists it, builds indices, and notifies the mempool (`BlockStoredInfo`) to
  seed the next round. **Correction**: it does **not** currently re-verify the
  UNiCORN VDF (it receives the data but only re-checks PoW + tx/merkle
  consistency) — do not claim otherwise.
- **Miner**: builds a coinbase tx + searches SHA3-256 PoW over the block's merkle
  root within the round; a **subset** of miners is selected per round and a single
  winner chosen — both via UNiCORN (see #13). Reward per block via
  `calculate_reward` (decaying, no halving), split across the mempool quorum;
  coinbase matures after 100 blocks.

### 11. Consensus & the block round (`#c-consensus`) — NEW (expands `#c-block-mining`)
- **Prime Radiant Consensus (PRC)** — the whitepaper name (Zenodo 19203176 §7).
  Cite `/technology#consensus` for the DPoWW/economic framing; keep docs to
  mechanics. Do **not** invent DPoWW wording here — say "Prime Radiant Consensus".
- **Two RAFT groups** (mempool + storage); replicated state must be deterministic
  (same inputs, order, result) or nodes would fork; local state (caches/metrics)
  may differ. The timestamp is itself a replicated log item to avoid clock
  nondeterminism.
- **Round lifecycle** (`fleet-core/src/block_pipeline.rs`,
  `fleet-mempool/src/mempool_raft.rs`): (1) tx intake → replicated to the mempool
  group; (2) block body built, UNiCORN constructed; (3) **participant intake** —
  miners register; UNiCORN shuffles/selects the participating subset; (4) **PoW
  intake** — selected miners submit proofs; (5) UNiCORN picks the winner →
  `Halted`; (6) mempool assembles the block (nonce + coinbase hash stamped into
  the header) → sends to storage → storage commits → seeds the next round.
- **Difficulty**: **ASERT** (an in-repo ASERT3-2D port). Lineage fixes the block
  *interval* and varies *hashes per block*, mapping hash surplus/shortfall onto a
  synthetic time for ASERT (`asert.rs`). Fixed interval **30 s**; block height ≡
  UTC time; epoch 2026-08-28T00:00:00Z; 2880 blocks/UTC day (whitepaper §7.3/§7.7).
- **PoW hash**: **SHA3-256** (`Sha3_256PoWMiner`, CPU/OpenGL/Vulkan backends).
  Mention GPU mining generically; SandWorm (the Keccak-Prime GPU hash) is a
  separate Lineage crate not yet wired into `fleet` — do not state fleet mines
  with SandWorm today. (Cross-link `/technology` for the SandWorm direction.)

### 12. Blocks & headers (`#c-blocks`) — NEW
- `BlockHeader` (`prime/src/primitives/block.rs:21`): `version: u32`,
  `bits: usize` (ASERT compact target; 0 = legacy leading-zeroes PoW),
  `nonce_and_mining_tx_hash: (Vec<u8>, String)` (PoW nonce + coinbase hash),
  `b_num: u64` (height), `timestamp: i64`, `seed_value: Vec<u8>` (UNiCORN
  `"{seed}-{witness}"`), `previous_hash: Option<String>`,
  `txs_merkle_root_and_hash: (String, String)` (a **MerkleLog root** + a flat
  SHA3 digest of the tx-hash list — a pair, not a "nested" tree). `Block {
  header, transactions: Vec<String> }` (tx hashes). Reference reading via
  `GET /v1/blocks/latest` and `GET /v1/blocks/{num}` (link `/developers/api`;
  note `/latest` returns an opaque `block` object — don't invent extra fields
  beyond the struct above).

### 13. UNiCORN randomness (`#c-unicorn`) — REWRITE
- **UNiCORN is a Sloth VDF** (slow to evaluate, fast to verify; Lenstra &
  Wesolowski) that produces publicly verifiable, hard-to-bias randomness
  (`fleet-core/src/unicorn.rs`; whitepaper §7.5). The whitepaper calls it
  "uncontestable" — use that word; the "UN-COntestable Random Number" acronym
  gloss is a product expansion, keep it optional/light.
- **Seed inputs** (`unicorn.rs:37`): `sha3` over (a) the round's **transaction
  inputs**, (b) the **participating-miner list**, (c) the **winning hashes from
  two blocks ago** → combined into the VDF seed. Because all three are
  RAFT-replicated, every mempool node computes the identical UNiCORN.
- **Uses**: seed a Fortuna CSPRNG to (1) shuffle/select the mining **subset**
  (`MINER_PARTICIPATION_UN`), (2) pick the **winning** proof
  (`WINNING_MINER_UN`). The seed+witness are stamped into `header.seed_value`.
  Whitepaper adds: daily mempool-triple rotation.
- **Correction**: do NOT say storage "re-checks" UNiCORN — the VDF verify path
  isn't currently wired on the storage node (only PoW + tx/merkle are re-checked).

---

## Corrections to existing docs (must-fix)
1. `#c-node-types`: 3 → 5 roles (add user, pre_launch).
2. `#c-unicorn`: rewrite to the Sloth-VDF facts; drop the "storage re-checks it"
   claim; keep "uncontestable".
3. `#c-two-way`: frame via `druid_info` (not "version 2").
4. `#c-storage`: drop any "verifies UNiCORN linkage" implication.

## Narrow `/technology` reconciliation (this effort)
Keep SandWorm and DPoWW (real, separately sourced). Only:
1. `#consensus`: lead with **"Prime Radiant Consensus"** as the name; keep the
   DPoWW paper link but present DPoWW as the underlying scheme, not the headline
   name — align with the whitepaper. (Light copy tweak.)
2. `#subsystems` table: "builds nested Merkle root" → accurate wording (a
   MerkleLog root + flat hash pair) OR "Merkle root over the block's
   transactions". Remove "nested".
3. `#moat` card 02: the `op-ai-evaluate` opcode is not in the current opcode set —
   reword as forward-looking ("a planned … opcode") or generalize, so it doesn't
   read as shipped.
Everything else on `/technology` stays.

## Global constraints
- No claim without a source in this spec; where a fact is unimplemented/version-
  specific, say so in the copy. No new raw hex in stylesheets.
- Preserve at least one working anchor for the old `#c-block-mining` link
  (referenced from `/technology`).
- Keep asset wire-form vs REST `ApiAsset` distinct in examples.
- Verify: `npm run build -- --webpack` + `npm run lint` clean; live-render the
  docs Concepts (TOC entries resolve, scroll-spy works, code blocks render); no
  broken `/docs#...` anchors from `/technology`.

## Verification
- Every new/edited article has a matching TOC `<li>` and vice-versa.
- Spot-check each stated fact against its cited file.
- `/technology` still renders; its `/docs#c-*` links resolve.
