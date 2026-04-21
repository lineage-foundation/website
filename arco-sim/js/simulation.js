function nextStep() {
  state.step = (state.step + 1) % 15;

  // Compute iteration (1–3)
  state.iteration = Math.floor(state.step / 5) + 1;

  // If we JUST completed an iteration (landed on E)
  if (state.step % 5 === 4) {
    const nextIteration = (state.iteration % 3) + 1;
    updateChart(nextIteration);
  }

  updateUI();
}