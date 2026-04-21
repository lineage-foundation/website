// ---------------------------
// 🎨 Plotly Layout (Lineage-style)
// ---------------------------

const layout = {
  paper_bgcolor: "#0a1a2f",
  plot_bgcolor: "#0a1a2f",
  font: { color: "#ffffff" },

  scene: {
    xaxis: {
      title: "Crop Type",
      color: "#8aa0b8",
      gridcolor: "#1f3a5f"
    },
    yaxis: {
      title: "Input Choice",
      color: "#8aa0b8",
      gridcolor: "#1f3a5f"
    },
    zaxis: {
      title: "Profit",
      color: "#8aa0b8",
      gridcolor: "#1f3a5f"
    }
  }
};

// ---------------------------
// 📊 DATA (from your graphs.html)
// ---------------------------

// Stage 1: clustered
const stage1_points = [
  [1.0,0,2.5],[1.1,0,3.1],[0.9,0,2.9],[2.0,0,3.3],[1.2,0,2.7],
  [1.0,1,2.8],[1.1,1,3.0],[1.0,1,3.2],[2.2,1,5.1],[0.9,1,2.6],
  [1.0,2,3.0],[1.1,2,2.9],[1.2,2,3.0],[2.1,2,5.3],[1.0,2,2.8],
  [1.0,3,3.2],[1.2,3,3.0],[0.9,3,3.1],[3.1,3,4.6],[1.0,3,2.9],
  [1.0,4,3.0],[1.1,4,3.2],[0.9,4,2.8],[4.1,4,4.3],[1.0,4,3.1]
];

// Stage 2: medium diversity
const stage2_points = [
  [1.0,4,3.1],[1.1,0,3.1],[1.9,1,3.9],[2.0,0,3.3],[1.2,2,2.7],
  [1.0,1,3.2],[1.1,1,3.5],[2.0,3,4.2],[2.2,2,6.4],[0.9,1,3.1],
  [1.0,2,3.3],[1.1,2,2.9],[2.2,4,4.5],[2.3,2,6.2],[1.0,4,3.4],
  [1.0,3,3.2],[1.2,3,3.0],[1.9,3,4.1],[3.1,4,5.4],[1.0,3,2.9],
  [1.0,4,3.0],[1.1,3,3.5],[1.9,4,4.3],[3.9,4,5.7],[1.0,4,3.1]
];

// Stage 3: optimal
const stage3_points = [
  [1.1,4,4.1],[2.1,0,3.7],[3.9,1,4.5],[1.0,0,5.3],[5.2,2,5.7],
  [1.0,1,3.8],[2.1,1,4.6],[2.0,3,5.2],[2.2,2,7.1],[5.1,1,6.1],
  [1.0,2,4.3],[2.2,2,4.9],[2.2,4,5.5],[4.3,2,7.0],[5.0,4,6.4],
  [1.2,3,4.8],[2.2,3,4.3],[2.9,3,5.1],[4.1,4,6.4],[5.0,3,7.9],
  [1.0,4,4.2],[2.1,3,4.5],[3.1,4,5.7],[3.9,4,6.2],[5.0,4,7.1]
];

// ---------------------------
// 🔧 Helpers
// ---------------------------

function unpack(points, i) {
  return points.map(p => p[i]);
}

// ---------------------------
// 📈 Draw Function
// ---------------------------

function draw(points) {
  const trace = {
    x: unpack(points, 0),
    y: unpack(points, 1),
    z: unpack(points, 2),
    mode: "markers",
    type: "scatter3d",
    marker: {
      size: 6,
      color: unpack(points, 2),
      colorscale: "Viridis",
      opacity: 0.9
    },
    hovertemplate:
      "<b>Crop:</b> %{x}<br>" +
      "<b>Input:</b> %{y}<br>" +
      "<b>Profit:</b> %{z}<extra></extra>"
  };

  Plotly.react("chart", [trace], {
  ...layout,
  autosize: true
});


  
}

// ---------------------------
// 🔄 Update Chart per iteration
// ---------------------------

function updateChart(iteration) {
  if (iteration === 1) draw(stage1_points);
  if (iteration === 2) draw(stage2_points);
  if (iteration === 3) draw(stage3_points);
}

// ---------------------------
// 🚀 Initial Render
// ---------------------------

window.addEventListener("resize", () => {
  Plotly.Plots.resize("chart");
});

document.addEventListener("DOMContentLoaded", () => {
  draw(stage1_points);
});