"use client";
import { ArcherElement } from "react-archer";
import { useKnockout } from "@/context/knockOutContext";

interface MatchBoxProps {
  id: string;
  teams: string[];
  score: string;
  winner: string;
  relations?: any;
}

export const MatchBox = ({
  id,
  teams,
  score,
  winner,
  relations,
}: MatchBoxProps) => {
  const { hoveredTeam, setHoveredTeam } = useKnockout();

  return (
    <ArcherElement
      id={id}
      relations={
        relations?.map((rel: any) => ({
          targetId: rel.targetId,
          targetAnchor: rel.targetAnchor || "left",
          sourceAnchor: rel.sourceAnchor || "right",
          style: {
            strokeColor:
              hoveredTeam && teams.includes(hoveredTeam)
                ? "#22c55e"
                : "#F0F0F0",
            lineStyle: "angle",
            offset: 6,
          },
        })) || []
      }
    >
      <div
        className={`border rounded p-2 text-sm w-32 text-center cursor-pointer transition 
        ${
          hoveredTeam && teams.includes(hoveredTeam)
            ? "bg-green-100"
            : "bg-white"
        }
        `}
        onMouseEnter={() => setHoveredTeam(winner)}
        onMouseLeave={() => setHoveredTeam(null)}
      >
        <div className={winner === teams[0] ? "font-bold text-green-700" : ""}>
          {teams[0]}
        </div>
        <div className={winner === teams[1] ? "font-bold text-green-700" : ""}>
          {teams[1]}
        </div>
        <div className="font-bold">{score}</div>
      </div>
    </ArcherElement>
  );
};
