import { getTeamRelation } from "@/helper/getTeamRelation";
import React from "react";
import { ArcherElement } from "react-archer";
import TeamPopover from "./TeamModal";
import { SeasonalHistory, TeamMatch } from "@/types";

type TeamLogoProps = {
  teams: TeamMatch[];
  season: string;
  seasonIndex: number;
  allSeasons: string[];
  data: SeasonalHistory;
  setHoveredTeamName: (teamName: string | null) => void;
  hoveredTeamName: string | null;
};

const TeamLogo = ({
  teams,
  season,
  seasonIndex,
  allSeasons,
  data,
  setHoveredTeamName,
  hoveredTeamName,
}: TeamLogoProps) => {
  return (
    <div className="space-y-10">
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
          <ArcherElement id={id} relations={relations} key={id}>
            <div
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setHoveredTeamName(team.name)}
              onMouseLeave={() => setHoveredTeamName(null)}
            >
              <TeamPopover
                team={team}
                trigger={
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-12 h-12 rounded-full border"
                  />
                }
              />
            </div>
          </ArcherElement>
        );
      })}
    </div>
  );
};

export default TeamLogo;
