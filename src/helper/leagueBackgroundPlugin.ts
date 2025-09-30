export const positionNumberPlugin = {
  id: "positionNumberPlugin",
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];

    const meta = chart.getDatasetMeta(0);
    const rawRanks = dataset.rawRanks || [];

    meta.data.forEach((point: any, index: number) => {
      const rank = rawRanks[index];
      if (!rank) return;

      const { x, y } = point.tooltipPosition();

      ctx.save();
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#1f77b4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(rank.toString(), x, y);
      ctx.restore();
    });
  },
};



export const leagueSectionsPlugin = {
  id: "leagueSectionsPlugin",
  beforeDraw: (chart: any) => {
    const { ctx, chartArea } = chart;
    const options = chart.options || {};
    const leagueZones = options.plugins?.leagueZones;

    if (!leagueZones) return;

    const { count, height, padding } = leagueZones;
    const sectionHeight = height;
    const sectionPadding = padding;

    for (let i = 0; i < count; i++) {
      const yStart = i * (sectionHeight + sectionPadding);
      const yEnd = yStart + sectionHeight;

      ctx.save();
      ctx.fillStyle = i % 2 === 0 ? "#f9f9f9" : "#c7c6c3";
      ctx.fillRect(chartArea.left, yStart, chartArea.right - chartArea.left, sectionHeight);
      ctx.restore();
    }
  },
};
