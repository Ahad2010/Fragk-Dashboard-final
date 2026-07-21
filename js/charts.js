function makeLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  const usesDualAxis = datasets.some((ds) => ds.yAxisID === "y1");

  const chartDatasets = datasets.map((ds) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, ds.color + "59");
    gradient.addColorStop(1, ds.color + "00");
    return {
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: gradient,
      fill: !!ds.fill,
      tension: 0.35,
      cubicInterpolationMode: "monotone",
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: ds.color,
      pointHoverBorderColor: "#0b1220",
      pointHoverBorderWidth: 2,
      yAxisID: ds.yAxisID || "y",
    };
  });

  const scales = {
    x: { grid: { color: "rgba(28,39,64,0.5)" }, ticks: { color: "#8a92a8", font: { size: 11 } } },
    y: { position: "left", grid: { color: "rgba(28,39,64,0.5)" }, ticks: { color: "#8a92a8", font: { size: 11 } } },
  };
  if (usesDualAxis) {
    scales.y1 = { position: "right", grid: { display: false }, ticks: { color: "#8a92a8", font: { size: 11 } } };
  }

  return new Chart(ctx, {
    type: "line",
    data: { labels, datasets: chartDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: "#8a92a8", font: { size: 11 }, usePointStyle: true, boxWidth: 8 } },
        tooltip: {
          backgroundColor: "#0F172A",
          borderColor: "#1E293B",
          borderWidth: 1,
          titleColor: "#F8FAFC",
          bodyColor: "#e8ecf5",
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales,
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
        tooltip: { backgroundColor: "#0F172A", borderColor: "#1E293B", borderWidth: 1, titleColor: "#F8FAFC", bodyColor: "#e8ecf5" },
      },
    },
  });
}