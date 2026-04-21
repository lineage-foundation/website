const runBtn = document.getElementById("runBtn");

runBtn.addEventListener("click", nextStep);

function updateUI() {
  // Nodes
  document.querySelectorAll(".node").forEach(n => n.classList.remove("active"));

  const activeNode = state.activeNode;
  const active = document.getElementById(`node-${activeNode}`);
  if (active) active.classList.add("active");

  // Status
  document.getElementById("iteration").innerText =
    "ARCO Iteration: " + state.iteration;

  document.getElementById("marketPhase").innerText =
    state.marketPhase;

  document.getElementById("activeNode").innerText =
    "Active Node: " + activeNode;

  // ✅ ALWAYS update pseudocode (this fixes your issue)
  updatePseudocode(activeNode);
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});