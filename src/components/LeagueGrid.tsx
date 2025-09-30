"use client";

import seasonalData from "@/data/dummyHistoryData.json";
import { useHover } from "@/context/HoverContext";
import { SeasonalHistory } from "@/types";
import { ArcherContainer, ArcherElement } from "react-archer";
import { getTeamRelation } from "@/helper/getTeamRelation";
import { useRouter } from "next/router";

const LeagueGrid = () => {
  const { setHoveredTeamName, hoveredTeamName } = useHover();
  const data = seasonalData as SeasonalHistory;
  const allSeasons = Object.keys(data).sort();
  const router = useRouter();

  const handleNavigate = (teamId: string) => {
    router.push(`/team/${teamId}`);
  };

  return (
    <div className="relative overflow-x-auto space-y-6 p-4 bg-white">
      <ArcherContainer
        strokeColor="red"
        strokeWidth={2}
        className="w-full h-full relative"
      >
        <div className="flex gap-10">
          {allSeasons.map((season, seasonIndex) => {
            const teams = [...data[season].matches].sort(
              (a, b) => a.rank - b.rank
            );

            return (
              <div key={season} className="flex flex-col items-center gap-2">
                <h2 className="font-bold text-lg">{season}</h2>

                {teams.map((team) => {
                  const id = `${team.name}-${season}`;
                  const relations = getTeamRelation({
                    teamName: team.name,
                    season,
                    seasonIndex,
                    allSeasons,
                    data,
                    hoveredTeamName,
                  });
                  return (
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onMouseEnter={() => setHoveredTeamName(team.name)}
                      onMouseLeave={() => setHoveredTeamName(null)}
                    >
                      <ArcherElement id={id} relations={relations}>
                        <img
                          src={team.image}
                          alt={team.name}
                          className="w-12 h-12 rounded-full border"
                          onClick={() => handleNavigate(team.matchId)}
                        />
                      </ArcherElement>
                      <span className="font-semibold mt-1">[{team.rank}]</span>
                      <span className="text-xs">{team.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default LeagueGrid;
