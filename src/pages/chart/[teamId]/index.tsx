import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TeamsData from "../../../data/teamDetails.json";
import {
  leagueSectionsPlugin,
  positionNumberPlugin,
} from "../../../helper/leagueBackgroundPlugin";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  getChartDataConfig,
  getChartOptions,
  getUniqueLeagues,
} from "../../../helper/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LeaguePositionChart = () => {
  const params = useParams();
  const teamId = params?.teamId;
  const team = TeamsData.find((t) => t.teamId === teamId);

  const chartDataConfig = getChartDataConfig(team?.performance || []);
  const uniqueLeagues = getUniqueLeagues(team);

  const chartHeight = uniqueLeagues.length * 150 + 100;
  const chartOptions: any = getChartOptions(uniqueLeagues.length);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex">
        <div className="w-32 flex flex-col justify-center space-y-8 mr-4 mt-20">
          {uniqueLeagues?.map((league: any) => (
            <div key={league.league} className="flex items-center h-[100px]">
              <Image
                src={league?.league_logo}
                alt={league?.league}
                width={50}
                height={50}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3"
              />
              <div>
                <div className="text-sm font-semibold text-purple-900">
                  {league.league}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          <div className="relative" style={{ height: `${chartHeight}px` }}>
            <Line
              data={chartDataConfig}
              options={chartOptions}
              plugins={[positionNumberPlugin, leagueSectionsPlugin]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguePositionChart;
