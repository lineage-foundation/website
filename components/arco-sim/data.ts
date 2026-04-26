// Static data for the ARCO simulator. Numbers and pseudocode are preserved
// verbatim so the narrative (market state evolution, per-node code) stays
// stable across UI changes.

export type NodeId = "A" | "B" | "C" | "D" | "E";

export const NODES: readonly NodeId[] = ["A", "B", "C", "D", "E"];

export const NODE_LABELS: Record<NodeId, string> = {
  A: "Sensor",
  B: "Relay",
  C: "Compute",
  D: "Actuator",
  E: "Event",
};

// Each point is [crop_type, input_choice, profit] — plotted as a 3D scatter.
// Stage 1: clustered (initial market, low diversity).
export const STAGE1_POINTS: ReadonlyArray<[number, number, number]> = [
  [1.0, 0, 2.5], [1.1, 0, 3.1], [0.9, 0, 2.9], [2.0, 0, 3.3], [1.2, 0, 2.7],
  [1.0, 1, 2.8], [1.1, 1, 3.0], [1.0, 1, 3.2], [2.2, 1, 5.1], [0.9, 1, 2.6],
  [1.0, 2, 3.0], [1.1, 2, 2.9], [1.2, 2, 3.0], [2.1, 2, 5.3], [1.0, 2, 2.8],
  [1.0, 3, 3.2], [1.2, 3, 3.0], [0.9, 3, 3.1], [3.1, 3, 4.6], [1.0, 3, 2.9],
  [1.0, 4, 3.0], [1.1, 4, 3.2], [0.9, 4, 2.8], [4.1, 4, 4.3], [1.0, 4, 3.1],
];

// Stage 2: medium diversity (partially optimized).
export const STAGE2_POINTS: ReadonlyArray<[number, number, number]> = [
  [1.0, 4, 3.1], [1.1, 0, 3.1], [1.9, 1, 3.9], [2.0, 0, 3.3], [1.2, 2, 2.7],
  [1.0, 1, 3.2], [1.1, 1, 3.5], [2.0, 3, 4.2], [2.2, 2, 6.4], [0.9, 1, 3.1],
  [1.0, 2, 3.3], [1.1, 2, 2.9], [2.2, 4, 4.5], [2.3, 2, 6.2], [1.0, 4, 3.4],
  [1.0, 3, 3.2], [1.2, 3, 3.0], [1.9, 3, 4.1], [3.1, 4, 5.4], [1.0, 3, 2.9],
  [1.0, 4, 3.0], [1.1, 3, 3.5], [1.9, 4, 4.3], [3.9, 4, 5.7], [1.0, 4, 3.1],
];

// Stage 3: optimal (fully optimized).
export const STAGE3_POINTS: ReadonlyArray<[number, number, number]> = [
  [1.1, 4, 4.1], [2.1, 0, 3.7], [3.9, 1, 4.5], [1.0, 0, 5.3], [5.2, 2, 5.7],
  [1.0, 1, 3.8], [2.1, 1, 4.6], [2.0, 3, 5.2], [2.2, 2, 7.1], [5.1, 1, 6.1],
  [1.0, 2, 4.3], [2.2, 2, 4.9], [2.2, 4, 5.5], [4.3, 2, 7.0], [5.0, 4, 6.4],
  [1.2, 3, 4.8], [2.2, 3, 4.3], [2.9, 3, 5.1], [4.1, 4, 6.4], [5.0, 3, 7.9],
  [1.0, 4, 4.2], [2.1, 3, 4.5], [3.1, 4, 5.7], [3.9, 4, 6.2], [5.0, 4, 7.1],
];

export const STAGE_POINTS = [STAGE1_POINTS, STAGE2_POINTS, STAGE3_POINTS] as const;

// HTML strings with hand-authored syntax-highlighting spans. Rendered via
// dangerouslySetInnerHTML — content is trusted (static, no user input).
export const PSEUDOCODE_MAP: Record<NodeId, string> = {
  A: `
<span class="kw">const</span> soil_data = <span class="fn">SENSOR.read_NPK</span>();

<span class="comment">// soil_data = {N:xx, P:yy, K:zz}</span>

<span class="kw">const</span> [fert_type, qty] = <span class="fn">ML_MODEL.infer_optimal_fertilizer</span>(soil_data);

<span class="kw">const</span> order_payload = {
  fertilizer: fert_type,
  quantityKg: qty,
  timestamp: <span class="fn">now</span>()
};

<span class="kw">const</span> mcp_context = <span class="fn">MCP.build_context</span>({
  role: <span class="str">"autonomous_agent"</span>,
  intent: <span class="str">"purchase_fertilizer"</span>,
  data: order_payload
});

<span class="kw">const</span> tx = <span class="fn">Lineage.create_P2PKH_transaction</span>({
  to: fertilizer_supplier_addr,
  amount: <span class="fn">PRICE_LOOKUP</span>(fert_type, qty),
  metadata: mcp_context
});

<span class="kw">const</span> signed_tx = <span class="fn">DEVICE.sign</span>(tx, PRIVATE_KEY_OTP);

<span class="fn">RELAY_NODE.send</span>(signed_tx);
`,

  B: `
<span class="comment">// Relay Node: match buyer and seller</span>

<span class="kw">if</span> (<span class="fn">checkMatch</span>(buyer_order, seller_offer)) {

  <span class="kw">const</span> wallet = <span class="kw">new</span> <span class="fn">TwoWay.Wallet</span>();
  wallet.initFromMasterKey(relay_master_key, config);

  <span class="kw">const</span> sendingAsset = <span class="fn">initIAssetToken</span>({
    Token: buyer_order.priceTokens
  });

  <span class="kw">const</span> receivingAsset = <span class="fn">initIAssetItem</span>({
    Item: {
      amount: buyer_order.quantityKg,
      genesis_hash: <span class="fn">fertilizerType_to_genesisHash</span>(buyer_order.fertilizerType)
    }
  });

  <span class="kw">const</span> result = <span class="kw">await</span> wallet.make2WayPayment({
    to: seller_offer.sellerAddr,
    sendingAsset,
    receivingAsset,
    allKeypairs: wallet.getAllKeypairs(),
    receiveAddress: wallet.getSomeKeypair(),
    valueId: <span class="fn">generateNewValueId</span>()
  });

  <span class="kw">const</span> druid = result.druid;
  <span class="kw">const</span> encryptedTx = result.encryptedTx;

  <span class="fn">storePendingTx</span>(druid, encryptedTx);
}
`,

  C: `
<span class="comment">// Mempool Node</span>
<span class="kw">function</span> onReceive(tx) {
  <span class="kw">if</span> (<span class="fn">verify</span>(tx)) {
    mempool.add(tx);
  }
}

<span class="kw">function</span> buildBlock() {
  block.txList = collectPendingTxs();
  block.merkleRoot = <span class="fn">buildNestedMerkle</span>(block.txList);
  broadcast(block.merkleRoot);
}

<span class="comment">// Mining Node</span>
<span class="kw">function</span> mine(root) {
  <span class="kw">const</span> coinbase = buildCoinbaseTx(minerAddress);
  <span class="kw">const</span> minerRoot = <span class="fn">merkle</span>(root, <span class="fn">hash</span>(coinbase));

  <span class="kw">return</span> <span class="fn">searchProofOfWork</span>(minerRoot, difficulty);
}

<span class="comment">// Storage Node</span>
<span class="kw">function</span> store(block) {
  <span class="fn">verifyUNiCORNlinkage</span>(block);
  <span class="fn">applyUTXOchanges</span>(block.txList);
  ledger.append(block);
}
`,

  D: `
<span class="comment">// Buyer places order</span>
<span class="kw">function</span> placeOrder(orderDetails) {

  <span class="kw">const</span> S = <span class="fn">random_secret</span>();
  <span class="kw">const</span> commitment = <span class="fn">hash</span>(S);

  sendOffChain({orderId, commitment});

  <span class="kw">const</span> tx = buildPaymentTx(orderDetails);
  <span class="kw">const</span> signedTx = <span class="fn">sign</span>(tx);

  relay.broadcast(signedTx);

  <span class="fn">waitForConfirmation</span>(tx.id);

  <span class="kw">return</span> { txid: tx.id, secret: S };
}

<span class="comment">// Actuator unlock</span>
<span class="kw">function</span> unlock(msg) {

  <span class="kw">if</span> (!<span class="fn">verifySig</span>(msg)) <span class="kw">return</span>;

  <span class="kw">if</span> (<span class="fn">hash</span>(msg.preimage) !== stored_commitment) <span class="kw">return</span>;

  <span class="kw">if</span> (!<span class="fn">verifyTxIncluded</span>(msg.txid)) <span class="kw">return</span>;

  <span class="fn">actuateLockOpen</span>();
}
`,

  E: `
<span class="comment">// ARCO Event Optimization</span>

<span class="kw">const</span> soil_tx = <span class="fn">loadLedgerSoilTransactions</span>();
<span class="kw">const</span> market_tx = <span class="fn">loadLedgerMarketTransactions</span>();

<span class="kw">const</span> labels = <span class="fn">extractSoilLabels</span>(soil_tx);

<span class="kw">const</span> T = <span class="fn">discoverTransactionSet</span>(soil_tx, market_tx);

<span class="kw">const</span> FSM0 = <span class="fn">buildFSMfromTransactions</span>(T);

<span class="kw">function</span> fitness(FSM) {
  <span class="kw">const</span> results = <span class="fn">simulateSeason</span>(FSM);

  <span class="kw">return</span> weightedSUM(
    results.meanYield(),
    results.meanProfit(),
    -results.priceShockVariance()
  );
}

<span class="kw">let</span> POP = <span class="fn">initPopulation</span>();

<span class="kw">while</span> (!converged) {
  POP = <span class="fn">evolvePopulation</span>(POP, fitness);
}

<span class="kw">const</span> FSM_opt = <span class="fn">bestCandidate</span>(POP);

<span class="kw">const</span> policy = {
  crops: FSM_opt.getCropTransitions(),
  fertilizer: FSM_opt.getFertilizerTransitions(),
  pesticide: FSM_opt.getPesticideTransitions()
};

<span class="fn">broadcastToFarmers</span>(policy);
`,
};

export function marketPhaseLabel(iteration: number): string {
  if (iteration === 1) return "Initial Market";
  if (iteration === 2) return "Partially Optimized Market";
  return "Fully Optimized Market";
}

// Which stage of the market is drawn at a given step? Matches the reference:
// stage transitions on the "Event" step of each iteration, so you see the
// market evolve as the ARCO event fires.
export function chartStageForStep(step: number): 1 | 2 | 3 {
  if (step < 4) return 1;
  if (step < 9) return 2;
  if (step < 14) return 3;
  return 1;
}
