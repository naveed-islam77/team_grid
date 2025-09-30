export const getSeasonsFromPerformance = (performance: any[]) => {
  return performance?.map((p) => p.season).reverse();
};

export const getPositionsFromPerformance = (performance: any[]) => {
  return performance?.map((p) => p.rank).reverse();
};

export const getChartDataConfig = (performance: any) => {
  const sortedPerformance =
    performance &&
    [...performance].sort((a, b) => {
      return parseInt(a.season) - parseInt(b.season);
    });

  const seasons = sortedPerformance?.map((p: any) => p.season);

  const uniqueLeagues = Array.from(
    new Set(sortedPerformance.map((p: any) => p.league))
  );

  const leagueZoneHeight = 100;
  const leagueZonePadding = 50;
  const maxRanks = 20;

  const leagueYMapping: any = uniqueLeagues.reduce(
    (acc: any, league: any, index) => {
      acc[league] = {
        yStart: index * (leagueZoneHeight + leagueZonePadding),
        maxRank: maxRanks,
      };
      return acc;
    },
    {} as Record<string, { yStart: number; maxRank: number }>
  );

  const scaledPositions = sortedPerformance.map((p: any) => {
    const leagueInfo = leagueYMapping[p.league];
    const rank = p.rank;
    const yPos =
      leagueInfo.yStart +
      ((rank - 1) / (leagueInfo.maxRank - 1)) * leagueZoneHeight;

    return yPos;
  });


  return {
    labels: seasons,
    clip: false,
    datasets: [
      {
        label: "League Position",
        data: scaledPositions,
        borderColor: "#1f77b4",
        backgroundColor: "#1f77b4",
        borderWidth: 3,
        pointRadius: 15,
        pointHoverRadius: 15,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1f77b4",
        pointBorderWidth: 1,
        tension: 0.4,
        spanGaps: false,
        rawRanks: sortedPerformance.map((p: any) => p.rank),
        league: sortedPerformance.map((p: any) => p.league),
      },
    ],
  };
};

export const getUniqueLeagues = (team: any) => {
  const uniqueLeagues = Array.from(
    new Map(
      team?.performance.map((p: any) => [
        p.league,
        { league: p.league, league_logo: p.league_logo },
      ])
    ).values()
  );

  return uniqueLeagues;
};

export const getChartOptions = (leagueCount: number) => {
  const leagueZoneHeight = 150;
  const leagueZonePadding = -40;
  const chartHeight = leagueCount * (leagueZoneHeight + leagueZonePadding + 20);

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 70,
        left: 10,
        right: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const rank = context.dataset?.rawRanks?.[context.dataIndex];
            const league = context.dataset?.league?.[context.dataIndex];
            return `Position: ${rank} (${league})`;
          },
        },
      },
      leagueZones: {
        count: leagueCount,
        height: leagueZoneHeight,
        padding: leagueZonePadding,
      },
    },
    scales: {
      x: {
        position: "top",
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            weight: "500",
          },
          padding: 10,
        },
      },
      y: {
        reverse: true,
        min: -1,
        max: chartHeight,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        afterFit: function (scale: any) {
          scale.height = scale?.chart?.height - scale?.chart?.chartArea?.top;
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 12,
        radius: 20,
      },
    },
    clip: false,
  };
};
