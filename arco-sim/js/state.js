const state = {
  step: 0,
  iteration: 1,
  nodes: ["A", "B", "C", "D", "E"],

  get activeNode() {
    return this.nodes[this.step % 5];
  },

  get marketPhase() {
    if (this.iteration === 1) return "Initial Market";
    if (this.iteration === 2) return "Partially Optimized Market";
    return "Fully Optimized Market";
  }
};