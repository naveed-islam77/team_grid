import LeagueRow from "@/components/LeagueRow";
import { useParams } from "next/navigation";
import { ArcherContainer } from "react-archer";
import teamDetails from "../../../data/teamDetails.json";

const Index = () => {
  const params = useParams();
  const team = teamDetails.find((t) => t.teamId === params?.teamId);

  if (!team) return <div>Team not found</div>;

  const seasons = team.performance.map((p) => p.season);

  console.log(seasons);

  const leagues = Array.from(
    new Set(team.performance.map((p) => p.league))
  ).map((leagueName) => {
    const data = team.performance.filter((p) => p.league === leagueName);
    return {
      league: leagueName,
      league_logo: data[0]?.league_logo || "",
      data: data.reduce(
        (acc, curr) => ({ ...acc, [curr.season]: curr }),
        {} as Record<string, (typeof data)[number]>
      ),
    };
  });

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-2xl font-bold mb-6">{team.teamName} Details</h1>

      {/* Scrollable Chart */}
      <div className="overflow-x-auto w-full px-10">
        <div className="min-w-max">
          {/* Season Header */}
          <div className="flex gap-2 mb-4 pl-[130px]">
            {seasons.map((season) => (
              <div
                key={season}
                className="min-w-[120px] text-center font-semibold text-sm"
              >
                {season}
              </div>
            ))}
          </div>

          <ArcherContainer>
            {leagues.map((league) => (
              <LeagueRow
                key={league.league}
                league={league}
                seasons={seasons}
                teamId={team.teamId}
                performance={team.performance}
              />
            ))}
          </ArcherContainer>
        </div>
      </div>
    </div>
  );
};

export default Index;
