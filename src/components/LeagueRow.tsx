import { getElementId, getRankPosition } from "@/helper/getTeamRelation";
import { ArcherRelation } from "@/types";
import Image from "next/image";
import { ArcherContainer, ArcherElement } from "react-archer";
import RankCircle from "./RankCircle";

const LeagueRow = ({
  league,
  seasons,
  teamId,
  performance,
}: {
  league: {
    league: string;
    league_logo: string;
    data: Record<string, { season: string; rank: number }>;
  };
  seasons: string[];
  teamId: string;
  performance: { season: string; rank: number; league: string }[];
}) => {
  return (
    <div className="flex gap-10 items-start mb-5">
      {/* League Logo + Name */}
      <div className="flex flex-col justify-center items-center min-w-[80px]">
        <Image
          src={league.league_logo}
          alt={league.league}
          width={50}
          height={50}
          className="rounded-full mb-1"
        />
        <h1 className="text-xs text-center">{league.league}</h1>
      </div>

      {/* Season Columns */}
      <div className="bg-gray-100 flex gap-2 w-full h-[200px] rounded-md">
        {seasons.map((season, i) => {
          const current = league.data[season];
          const currentId = getElementId(teamId, league.league, season);

          const nextSeason = seasons[i + 1];
          const nextPerformance = nextSeason
            ? performance.find((p) => p.season === nextSeason)
            : null;

          const nextId = nextPerformance
            ? getElementId(
                teamId,
                nextPerformance.league,
                nextPerformance.season
              )
            : null;

          const relations: ArcherRelation[] = nextId
            ? [
                {
                  targetId: nextId,
                  sourceAnchor: "bottom",
                  targetAnchor: "top",
                  style: { endMarker: false, strokeColor: "blue" },
                },
              ]
            : [];

          return (
            <div key={season} className="relative min-w-[120px]">
              {current?.rank && (
                <ArcherElement id={currentId} relations={relations}>
                  <RankCircle
                    rank={current.rank}
                    top={getRankPosition(current.rank)}
                  />
                </ArcherElement>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeagueRow;
