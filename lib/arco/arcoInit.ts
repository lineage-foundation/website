// @ts-nocheck
/** Plotly bundle (scatter3d). Passed in so this file stays server-import-safe. */
export function initArcoPage(
  Plotly: {
    newPlot: (
      root: HTMLElement | string,
      data: unknown[],
      layout: unknown,
      config?: { responsive?: boolean },
    ) => void | Promise<unknown>;
    purge: (id: string | HTMLElement) => void;
    Plots?: { resize: (el: HTMLElement) => void };
  },
): () => void {
// ---------------------------
//  👉 NEW DATA STRUCTURE
//  Direct 3D points: [x, y, z]
// ---------------------------

// Stage 1: 80%+ clustered around corn (x ≈ 1.0)
const stage1_points = [
    // y = fertility/pesticide levels
    [1.0, 0, 2.5], [1.1, 0, 3.1], [0.9, 0, 2.9], [2.0, 0, 3.3], [1.2, 0, 2.7],
    [1.0, 1, 2.8], [1.1, 1, 3.0], [1.0, 1, 3.2], [2.2, 1, 5.1], [0.9, 1, 2.6],
    [1.0, 2, 3.0], [1.1, 2, 2.9], [1.2, 2, 3.0], [2.1, 2, 5.3], [1.0, 2, 2.8],
    [1.0, 3, 3.2], [1.2, 3, 3.0], [0.9, 3, 3.1], [3.1, 3, 4.6], [1.0, 3, 2.9],
    [1.0, 4, 3.0], [1.1, 4, 3.2], [0.9, 4, 2.8], [4.1, 4, 4.3], [1.0, 4, 3.1]
];

// Stage 2: medium diversity
const stage2_points = [
    // y = fertility/pesticide levels
    [1.0, 4, 3.1], [1.1, 0, 3.1], [1.9, 1, 3.9], [2.0, 0, 3.3], [1.2, 2, 2.7],
    [1.0, 1, 3.2], [1.1, 1, 3.5], [2.0, 3, 4.2], [2.2, 2, 6.4], [0.9, 1, 3.1],
    [1.0, 2, 3.3], [1.1, 2, 2.9], [2.2, 4, 4.5], [2.3, 2, 6.2], [1.0, 4, 3.4],
    [1.0, 3, 3.2], [1.2, 3, 3.0], [1.9, 3, 4.1], [3.1, 4, 5.4], [1.0, 3, 2.9],
    [1.0, 4, 3.0], [1.1, 3, 3.5], [1.9, 4, 4.3], [3.9, 4, 5.7], [1.0, 4, 3.1]
];

// Stage 3: optimal, higher Z profits, larger crop spread
const stage3_points = [
    // y = fertility/pesticide levels
    [1.1, 4, 4.1], [2.1, 0, 3.7], [3.9, 1, 4.5], [1.0, 0, 5.3], [5.2, 2, 5.7],
    [1.0, 1, 3.8], [2.1, 1, 4.6], [2.0, 3, 5.2], [2.2, 2, 7.1], [5.1, 1, 6.1],
    [1.0, 2, 4.3], [2.2, 2, 4.9], [2.2, 4, 5.5], [4.3, 2, 7.0], [5.0, 4, 6.4],
    [1.2, 3, 4.8], [2.2, 3, 4.3], [2.9, 3, 5.1], [4.1, 4, 6.4], [5.0, 3, 7.9],
    [1.0, 4, 4.2], [2.1, 3, 4.5], [3.1, 4, 5.7], [3.9, 4, 6.2], [5.0, 4, 7.1]
];


// ---------------------------
//  👉 Helper to extract arrays
// ---------------------------

function unpack(points, index) {
    return points.map(p => p[index]);
}


// ---------------------------
//  👉 Draw a graph
// ---------------------------

function drawGraph(divId, points) {
    const trace = {
        x: unpack(points, 0),
        y: unpack(points, 1),
        z: unpack(points, 2),
        mode: "markers",
        type: "scatter3d",
        marker: {
            size: 6,
            color: unpack(points, 2),     // Profit
            colorscale: "Viridis",
            opacity: 0.9,
            cmin: 2,                      // GLOBAL MIN
            cmax: 10                      // GLOBAL MAX
        },
        hovertemplate: 
            "<b>Crop (X):</b> %{x:.2f}<br>" +
            "<b>Input (Y):</b> %{y}<br>" +
            "<b>Profit (Z):</b> %{z:.2f}<extra></extra>"
    };

    const layout = {
    scene: {
        xaxis: {
            title: {
                text: "Crop Type",
                font: { color: "white", size: 16 }
            },
            tickfont: { color: "white", size: 12 },
            linecolor: "white",
            gridcolor: "#1f3a5f"
        },
        yaxis: {
            title: {
                text: "Input Choice",
                font: { color: "white", size: 16 }
            },
            tickfont: { color: "white", size: 12 },
            linecolor: "white",
            gridcolor: "#1f3a5f"
        },
        zaxis: {
            title: {
                text: "Profit",
                font: { color: "white", size: 16 }
            },
            tickfont: { color: "white", size: 12 },
            linecolor: "white",
            gridcolor: "#1f3a5f"
        },
        camera: { eye: { x: 0, y: 2.5, z: 0.8 } }
    },
    paper_bgcolor: "#0a1a2f",
    plot_bgcolor: "#0a1a2f"
};


    Plotly.newPlot(divId, [trace], layout, { responsive: true });
}


// ---------------------------
//  👉 Render all 3 graphs
// ---------------------------

//drawGraph("stage1", stage1_points);
//drawGraph("stage2", stage2_points);
//drawGraph("stage3", stage3_points);

// --------------- main code for code file ------------------- 


// --- set of variables to show various things - update to true or false as needed

const showPageLoaded = false; // show when page is loaded or not 
const showEventDescriptions = false; // show events when occur or not
const showMarketNumber = true; // show the current market number
const showStepNumber = false; // show the step number or not
const showStepDescription = true; // show the description (node / event) of the current step or not

// --- /set of variables to show various things

const lastNodeHighlighted = null; //pointer to last node highlighted

let lastNodeHighlightedIndex = -1; // no last node highlighted - use to clear highlight


let currentNodeIndex = 0;

let marketNumber = 1; // 1 based counting

let step = 0; // index (0) based counting

let stepNumber = step + 1; // 1 based counting

// array for Market names - simply updated to 
const arrMarketName = [
    "Initial Market",
    "Partially Optimized Market",
    "Optimized Market"
];

let marketDescription = arrMarketName[0];

// ----------------------- Steps Array -------------------------------------


const pseudoSteps = [
    {
        node: "A",
        title: "Sensor Node",
        code: `
   soil_data = SENSOR.read_NPK()
    // soil_data = {N:xx, P:yy, K:zz}

    fert_type, qty = ML_MODEL.infer_optimal_fertilizer(soil_data)
    // returns e.g. ("NPK-20-10-10", 25kg)

    order_payload = {
        "fertilizer": fert_type,
        "quantityKg": qty,
        "timestamp": now()
    }

    mcp_context = MCP.build_context(
        role="autonomous_agent",
        intent="purchase_fertilizer",
        data=order_payload
    )

    tx = AIBLOCK.create_P2PKH_transaction(
        to=fertilizer_supplier_addr,
        amount=PRICE_LOOKUP(fert_type, qty),
        metadata=mcp_context
    )

    signed_tx = DEVICE.sign(tx, PRIVATE_KEY_OTP)

    RELAY_NODE.send(signed_tx)
        `
    },
    {
        node: "B",
        title: "Relay Node",
        code: `
// Relay Node: match buyer and seller, then use 2Way.js to create the 2-way trade

// Assume:
//   - buyer_order = { buyerAddr, fertilizerType, quantityKg, priceTokens }
//   - seller_offer = { sellerAddr, fertilizerType, quantityKg, priceTokens }
//   - trade_match = checkMatch(buyer_order, seller_offer)

if trade_match:
    // 1. initialize 2Way wallet / context for the relay node (or coordinator)
    wallet = TwoWay.Wallet()
    wallet.initFromMasterKey(relay_master_key, config)  // config inc mempoolHost, etc.

    // 2. prepare the “assets”: what buyer pays vs what seller delivers
    sendingAsset = initIAssetToken({ "Token": buyer_order.priceTokens })
    receivingAsset = initIAssetItem({
        "Item": {
            "amount": buyer_order.quantityKg,
            "genesis_hash": fertilizerType_to_genesisHash(buyer_order.fertilizerType)
        }
    })

    // 3. call the 2-way payment API
    result = await wallet.make2WayPayment(
        to = seller_offer.sellerAddr,
        sendingAsset = sendingAsset,
        receivingAsset = receivingAsset,
        allKeypairs = wallet.getAllKeypairs(),
        receiveAddress = wallet.getSomeKeypair(),  // change/receive address
        valueId = generateNewValueId()
    )

    // 4. store the encrypted transaction + DRUID to await counter-party confirmation
    druid = result.druid
    encryptedTx = result.encryptedTx
    storePendingTx(druid, encryptedTx)
        `
    },
    {
        node: "C",
        title: "Compute Node",
        code: `
-------------------------------------------------------------
// 1. Mempool Nodes (RAFT group of 3)
onReceive(tx):
    verify(tx is well-formed and not double-spent)
    add tx to mempool

every blockInterval:
    block.txList = collectPendingTxs()
    block.merkleRoot = buildNestedMerkle(block.txList)
    broadcast blockHeaderCandidate(block.merkleRoot) → miners

-------------------------------------------------------------
// 2. Validator / Mining Nodes
onNewMempoolHeader(root):
    coinbase = buildCoinbaseTx(minerAddress)
    minerRoot = merkle(root, hash(coinbase))
    pow = searchProofOfWork(minerRoot, difficulty)

if pow is valid:
    submitCandidatePOW(pow) → network

at blockIntervalEnd:
    candidates = allValidPOWs()
    winner = UNiCORN_CSPRNG_select(candidates)
    finalBlock = assembleBlock(winner, txListFromMempool)
    gossip(finalBlock) → network
    send finalBlock → storageNode

-------------------------------------------------------------
// 3. Storage Node (Ledger Store)
onReceive(finalBlock):
    verifyUNiCORNlinkage(finalBlock)
    verifyAllProofsOfWork(finalBlock)
    applyUTXOchanges(finalBlock.txList)
    append finalBlock to ledger

-------------------------------------------------------------
        `
    },
    {
        node: "D",
        title: "Actuator Node",
        code: `
// Utilities
H(x) = secure_hash(x)
Sign(msg, priv) = signature
VerifySig(msg, sig, pub) = boolean
VerifyTxIncluded(txid, blockProof) = boolean  // e.g., merkle proof

// --- BUYER DEVICE (runs locally with BuyerPriv) ---
procedure placeOrderAndPay(orderDetails, sellerRelay):
    S = random_secret()  // buyer-generated secret (only buyer knows)
    commitment = H(S)
    sendOffChain(sellerRelay, {orderId, commitment})  // tell seller/locker the commitment
    tx = buildPaymentTx(to = orderAddressForOrder(orderId), amount)
    signedTx = Sign(tx, BuyerPriv)
    relay.broadcast(signedTx) // send to mempool / relay
    waitForOnchainConfirmation(tx.id)  // monitor chain until storage confirms
    // After confirmation: buyer can now redeem secret at locker (locally)
    return {txid: tx.id, secret: S, pubKey: BuyerPub}

procedure waitForOnchainConfirmation(txid):
    loop:
        blockProof = chainMonitor.queryProof(txid)
        if blockProof and VerifyTxIncluded(txid, blockProof):
            return blockProof
        sleep(poll_interval)

procedure sendUnlockRequest(lockEndpoint, txid, S):
    msg = {orderId, txid, preimage: S, timestamp: now()}
    sig = Sign(msg, BuyerPriv)
    sendToLock(lockEndpoint, {msg, sig, BuyerPub})


// --- LOCK / ACTUATOR (deployed at vending/fertilizer cabinet) ---
state: stored_commitment  // set once during provisioning
// (H(S) sent by buyer during order)
state: allowed_payment_address or expected_order_id

onReceive(unlockPacket):
    msg = unlockPacket.msg
    sig = unlockPacket.sig
    buyerPub = unlockPacket.BuyerPub

    // 1) verify signature authentic (buyer is holder of BuyerPriv)
    if not VerifySig(msg, sig, buyerPub):
        reject("bad signature")

    // 2) verify the provided preimage matches stored commitment (buyer must know S)
    if H(msg.preimage) != stored_commitment:
        reject("invalid preimage")

    // 3) verify payment is confirmed onchain for this order
    blockProof = queryStorageNodeForProof(msg.txid)
    if not blockProof or not VerifyTxIncluded(msg.txid, blockProof):
        reject("payment not confirmed")

    // 4) optionally check tx paid the right address & amount & that
    // buyerPub matches the on-chain payer pubkey
    tx = fetchTransaction(msg.txid)
    if not tx.paysTo(expected_address_for_order(msg.orderId), expected_amount):
        reject("wrong payment details")
    if not tx.payer_pubkey == buyerPub:
        reject("payment not from this buyer pubkey")

    // 5) all checks pass → actuate physical release
    actuateLockOpen()
    log("opened for order " + msg.orderId)

// --- STORAGE / CHAIN MONITOR (trusted to provide inclusion proofs) ---
procedure queryProof(txid):
    // ask storage node for merkle inclusion / block header proof
    proof = storageNode.getInclusionProof(txid)
    return proof
        `
    },
    {
        node: "C",
        title: "ARCO Event",
        code: `
// ----------------------------------------------
// 1. INGEST & PREPARE AGRI TRANSACTION DATA
// ----------------------------------------------
soil_tx = loadLedgerSoilTransactions()       // (NPK levels, soil type, moisture, region, season)
market_tx = loadLedgerMarketTransactions()   // (crop sales, input purchases, yields, revenue)
labels = extractSoilLabels(soil_tx)          // label each tx with soil cluster, fertility-class, trend

// Build a transaction graph: edges = farmer → mill, farmer → input supplier, etc.
T = discoverTransactionSet(soil_tx, market_tx)

// Convert T into a candidate agricultural FSM (FSM0)
FSM0 = buildFSMfromTransactions(T, startStates, terminalStates)


// ----------------------------------------------
// 2. DEFINE FITNESS FUNCTION (ECONOMIC UTILITY)
// ----------------------------------------------
function fitness(FSM, labels):
    // simulate farmers using transitions of FSM for:
    //   (crop choice, fertilizer allocation, pesticide schedule)
    results = simulateSeason(FSM, labels)

    // Key performance metrics
    avg_yield     = results.meanYield()
    net_return    = results.meanProfit()
    volatility    = results.priceShockVariance()

    // Higher profit, lower volatility → better
    return weightedSUM(avg_yield, net_return, -volatility)


// ----------------------------------------------
// 3. INITIALIZE DIFFERENTIAL EVOLUTION POPULATION
//    Each candidate xi is a "market policy vector":
//    {crop_rule_weights, fert_allocation_rules, pesticide_logic, transition_costs}
//    These vectors parameterize the Agri-FSM transitions.
// ----------------------------------------------
POP = initPopulation(size = P, seedWith = FSM0.parameters)


// ----------------------------------------------
// 4. DIFFERENTIAL EVOLUTION SEARCH
// ----------------------------------------------
while not converged:
    for each candidate xi in POP:

        // Select three random distinct candidates
        xa, xb, xc = sampleThreeDistinct(POP)

        // Mutation: explore new Agri-FSM transition rule combinations
        v = xa + Fscale * (xb - xc)

        // Crossover: blend mutation with original to keep search stable
        u = crossover(xi, v, CR)

        // Build trial FSM using the mutated parameter vector
        FSM_trial = applyParametersToFSM(FSM0, u)

        // Evaluate utility
        if fitness(FSM_trial, labels) > fitness(xi.FSM, labels):
            xi.replaceWith(FSM_trial)

    checkConvergenceCriteria()    // DE standard: lack of improvement, or RMS < threshold


// ----------------------------------------------
// 5. RESULT: OPTIMAL AGRI FSM
// ----------------------------------------------
FSM_opt = bestCandidate(POP).FSM


// ----------------------------------------------
// 6. EXTRACT MARKET ACTIONS FOR FARMERS
// ----------------------------------------------
policy = {
    optimal_crops      = FSM_opt.getCropTransitions(),
    fertilizer_plan    = FSM_opt.getFertilizerTransitions(),
    pesticide_schedule = FSM_opt.getPesticideTransitions(),
    liquidity_paths    = FSM_opt.getFinanceTransitions()
}

broadcastToFarmers(policy)     // P2P, blockchain metadata, or oracle broadcasts
    `,
        isArco: true  // <--- IMPORTANT FLAG
    }

];

// ----------------------- /Steps Array -------------------------------------

let runBtn = null;
let codeWindow = null;
let codeTitle = null;
let codeContent = null;
let dot = null;
const divGraphMarketState = null;
let infoPanel = null;



const NLE = "<br />";

function setInfo(infoNew) {
    document.getElementById("info").innerHTML = infoNew;
}

function addInfo(infoNew) {
    document.getElementById("info").innerHTML += infoNew + NLE;
}

function clearInfo() {
    document.getElementById("info").innerHTML = "";
}

function showPanelForStep(stepNumber) {
    const current = pseudoSteps[stepNumber];

    // Show code window
    if (!codeWindow || !codeTitle || !codeContent) return;
    codeWindow.classList.remove("hidden"); // R: remove hidden field
    codeTitle.textContent = current.title; // set the text content
    codeContent.textContent = current.code.trim(); // R: set the text to the code

    //alert("show info for step");

}

/*
function showMarketStateLevel(levelNumber)
{
    if (levelNumber >= 1 && levelNumber <= 3)
    {
        // show market state graph level

        document.getElementById("divMarketState").innerHTML = "Market State Level Graph " + levelNumber;
    }
}
*/


function getNodeDivByIndex(nodeIndex) {


}

function getNodeIdFromNodeIndex(nodeIndex) {

    if (!(nodeIndex >= 0 && nodeIndex <= 4)) {

        alert("invalid node index request");

        return ""; // invalid index request

    }

    let nodeId = "";
    switch (nodeIndex) {
        case 0: nodeId = "A"; break;
        case 1: nodeId = "B"; break;
        case 2: nodeId = "C"; break;
        case 3: nodeId = "D"; break;
        case 4: nodeId = "E"; break;
    }

    return nodeId;

}

/*  
    Function description:
    Take a node index between 0 and 4, clears any highlighted nodes, then highlights node with that index
*/
function setSingleHighlightedNode(nodeIndex) {

    if (!(nodeIndex >= 0 && nodeIndex <= 4)) {
        alert("invalid node index request");
        return; // invalid index request
    }

    if (nodeIndex == lastNodeHighlightedIndex) {
        //already highlighted do nothing
        return;
    }

    //un-highlight the last node if it was highlighed

    if (lastNodeHighlightedIndex != -1) // different last node was highlighted
    {
        const lastNodeHightlightedId = getNodeIdFromNodeIndex(lastNodeHighlightedIndex);
        document.getElementById(lastNodeHightlightedId).className = "node";
    }

    // now no nodes are highlighted

    // get the currentNodeName to highlight
    const nodeId = getNodeIdFromNodeIndex(nodeIndex);

    //highlight the node
    document.getElementById(nodeId).className = "node highlighted";

    //hightlight false is normal state, true is highlighted

    // save the index of the last node highlighted so we can unhighlight later if necessary
    lastNodeHighlightedIndex = nodeIndex;

}

function nodeAonclick() {

    setSingleHighlightedNode(0);

    if (showEventDescriptions)
        setInfo("node A Sensor node clicked");

    showPanelForStep(0);


}



function nodeBonclick() {

    setSingleHighlightedNode(1);

    if (showEventDescriptions)
        setInfo("node B Relay node clicked");

    showPanelForStep(1);


}

function nodeConclick() {

    setSingleHighlightedNode(2);

    if (showEventDescriptions)
        setInfo("node C Compute node clicked");

    showPanelForStep(2);
}

function nodeDonclick() {

    setSingleHighlightedNode(3);

    if (showEventDescriptions)
        setInfo("node D Actuator clicked");

    showPanelForStep(3);
}

/*
function divGraphMarketStateOnClick() {
    alert("divGraphMarketState click event");
    console.log("clicked")
    setInfo("clicked");
}
*/

function nodeEonclick() {

    setSingleHighlightedNode(4);

    if (showEventDescriptions)
        setInfo("Arco Event clicked");

    showPanelForStep(4);
}

let running = false;

let marketStateHighlighted = false;

let divActiveGraphHolder = null;
let divGraphLastHighlighted = null;

function runButtonClick() {

    clearInfo();
    

    if (!running) // first run
    {
        //stay on step 0
        running = true;

        // we don't need to advance the step in this case
        divActiveGraphHolder = document.getElementById("divGraphHolder1"); // first time save the current graph div holder that is active

        //stepNumber will be 1
        //step will be 0
        //marketNumber will be 1

    }
    else { // change of step occured

        // move to next step

        if (step < 4) {

            step++; // move to next step

        }
        else {  // change market iteration

            // time to reset step and possibly market if on final step

            step = 0;

            // code to move to next market
            if (marketNumber < 3) {
                marketNumber++; // increment market
            }
            else {
                // start over
                marketNumber = 1;
            }

        }

        // determine which is the the correct divGraphHolder

        



        // now evaluate respond to state change

        // if first node and first market - show initial state

        if (step == 0 && marketNumber== 1) { 

            //document.getElementById("imgGraphMarketState").src = "/images/market-optimized-state-1-new.png?u=1";

            // NEW

            //document.getElementById("stage3").className = "graph stage3-off js-plotly-plot";
            //document.getElementById("stage1").className = "graph on js-plotly-plot";

            document.getElementById("divGraphHolder3").className = "graph-holder stage-3-off";
            //document.getElementById("divGraphHolder1").className = "graph-holder main";

            marketStateHighlighted = true;
            document.getElementById("divGraphHolder1").className = "graph-holder main-highlight";
            divGraphLastHighlighted = document.getElementById("divGraphHolder1"); //store the graph div that was last highlighted

            // /NEW


            marketDescription = arrMarketName[0]; //show initial market iteration
        }


        if (step == 4) { //if reached arco event



            if (marketNumber == 1) {  // if initial market and first arco event



                //document.getElementById("imgGraphMarketState").src = "/images/market-optimized-state-2-new.png?u=1"; //optimize event for 1
                //document.getElementById("divGraphMarketState").className = "graph-market-state highlighted";

                // NEW

                //document.getElementById("stage1").className = "graph stage1-off js-plotly-plot";
                //document.getElementById("stage2").className = "graph on js-plotly-plot";

                document.getElementById("divGraphHolder1").className = "graph-holder stage-1-off";
                //document.getElementById("divGraphHolder2").className = "graph-holder main";

                marketStateHighlighted = true;
                document.getElementById("divGraphHolder2").className = "graph-holder main-highlight";                
                divGraphLastHighlighted = document.getElementById("divGraphHolder2"); //store the graph div that was last highlighted
                

                // /NEW


                marketDescription = arrMarketName[1];
            }
            else if (marketNumber == 2) { // if second iteration and second arco event

                //document.getElementById("imgGraphMarketState").src = "/images/market-optimized-state-3-new.png?u=1"; //optimize event for 2

                // NEW

                //document.getElementById("stage2").className = "graph stage2-off js-plotly-plot";
                //document.getElementById("stage3").className = "graph on js-plotly-plot";

                document.getElementById("divGraphHolder2").className = "graph-holder stage-2-off";
                //document.getElementById("divGraphHolder3").className = "graph-holder main";

                marketStateHighlighted = true;
                document.getElementById("divGraphHolder3").className = "graph-holder main-highlight";
                divGraphLastHighlighted = document.getElementById("divGraphHolder3"); //store the graph div that was last highlighted
                

                // /NEW


                marketDescription = arrMarketName[2];
            }
            else if (marketNumber == 3) { // if third iteration
                //marketDescription = arrMarketName[2]; // dont update market description
                //document.getElementById("imgGraphMarketState").src = "/images/market-optimized-state-1.png"; // dont update market image


                marketStateHighlighted = true;
                document.getElementById("divGraphHolder3").className = "graph-holder main-highlight";
                divGraphLastHighlighted = document.getElementById("divGraphHolder3"); //store the graph div that was last highlighted

            }

            
            //document.getElementById("divGraphMarketState").className = "graph-market-state highlighted";

        }
        else // the graph is on a state other than an arco event
        {

            if (marketStateHighlighted) // if the graph is on a state other than an arco event and is also highlighted then unhighlight
            {
                //document.getElementById("divGraphMarketState").className = "graph-market-state";
                // we always store the graph div on highlights so we know this is available to change back to normal
                
                divGraphLastHighlighted.className = "graph-holder main"; // we change it back to the main class but without the highlight
                marketStateHighlighted = false;
            }
            
        }

    } // /change of step occured


    //stepNumber is a logical number between 1 and number of nodes

    stepNumber = step + 1; // 1 based counting for clearer presentation

    // nodeIndex is one less than stepNumber

    currentNodeIndex = stepNumber - 1;


    const marketIndex = marketNumber - 1; // index to use for market name array


    if (showMarketNumber)
        addInfo("ARCO Iteration: " + marketNumber);


    addInfo(marketDescription);
    

    if (showStepNumber)
        addInfo("Step Number: " + stepNumber);

    if (showStepDescription) {
        let stepDescription = "";
        const stepSeperator = "&nbsp;&nbsp;";

        setSingleHighlightedNode(currentNodeIndex);

        if (stepNumber == 1) {
            stepDescription = "A" + stepSeperator + "Sensor";
        }
        else if (stepNumber == 2) {
            stepDescription = "B" + stepSeperator + "Relay";
        }
        else if (stepNumber == 3) {
            stepDescription = "C" + stepSeperator + "Compute";
        }
        else if (stepNumber == 4) {
            stepDescription = "D" + stepSeperator + "Relay";
        }
        else if (stepNumber == 5) {
            stepDescription = "E" + stepSeperator + "ARCO Event";
        }



        addInfo(stepDescription);

    }

    // show Panel for particular step

    showPanelForStep(step);

}

// /--------------- main code for code file -------------------

// DOM references

        runBtn = document.getElementById("runBtn");
        codeWindow = document.getElementById("codeWindow");
        codeTitle = document.getElementById("codeTitle");
        codeContent = document.getElementById("codeContent");
        dot = document.getElementById("dot");

        infoPanel = document.getElementById("info");

        if (showPageLoaded && infoPanel) infoPanel.innerHTML = "Page Loaded";

        runBtn?.addEventListener("click", runButtonClick);

        /*
        divGraphMarketState = document.getElementById("divGraphMarketState");
        divGraphMarketState.addEventListener("click", divGraphMarketStateOnClick);
        */

        const w = globalThis as typeof globalThis & {
            nodeAonclick?: () => void;
            nodeBonclick?: () => void;
            nodeConclick?: () => void;
            nodeDonclick?: () => void;
            nodeEonclick?: () => void;
        };
        w.nodeAonclick = nodeAonclick;
        w.nodeBonclick = nodeBonclick;
        w.nodeConclick = nodeConclick;
        w.nodeDonclick = nodeDonclick;
        w.nodeEonclick = nodeEonclick;

        drawGraph("stage1", stage1_points);

        drawGraph("stage2", stage2_points);

        drawGraph("stage3", stage3_points);

        const plotStageIds = ["stage1", "stage2", "stage3"] as const;
        const resizePlots = () => {
          const resize = Plotly.Plots?.resize;
          if (!resize) return;
          for (const id of plotStageIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            try {
              resize(el);
            } catch {
              /* plot may be purged or not yet rendered */
            }
          }
        };
        window.addEventListener("resize", resizePlots);
        resizePlots();

        function purgeStage(id: string) {
            const el = document.getElementById(id);
            if (!el) return;
            try {
                Plotly.purge(el);
            } catch {
                /* plot may already be torn down during client navigation */
            }
        }

        return () => {
            window.removeEventListener("resize", resizePlots);
            runBtn?.removeEventListener("click", runButtonClick);
            purgeStage("stage1");
            purgeStage("stage2");
            purgeStage("stage3");
            delete w.nodeAonclick;
            delete w.nodeBonclick;
            delete w.nodeConclick;
            delete w.nodeDonclick;
            delete w.nodeEonclick;
        };
}
