function makeLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  const colors = { kills: "#22d3ee", damage: "#2f6bff", kd: "#22d3ee", winrate: "#34d399" };

  const chartDatasets = datasets.map((ds) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, ds.color + "73");
    gradient.addColorStop(1, ds.color + "00");
    return {
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: gradient,
      fill: !!ds.fill,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: ds.color,
    };
  });

  return new Chart(ctx, {
    type: "line",
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: datasets.length > 1, labels: { color: "#8a92a8", font: { size: 11 } } } },
      scales: {
        x: { grid: { color: "#1c2740" }, ticks: { color: "#8a92a8", font: { size: 11 } } },
        y: { grid: { color: "#1c2740" }, ticks: { color: "#8a92a8", font: { size: 11 } } },
      },
    },
  });
}

function makeDonutChart(canvasId, labels, values, colors) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "doughnut",
    data: { labels, datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: "#0f1830", borderColor: "#1c2740", borderWidth: 1, titleColor: "#e8ecf5", bodyColor: "#e8ecf5" },
      },
    },
  });
}
