"use client";
import { ArcherElement } from "react-archer";

interface ChampionBoxProps {
  id: string;
  team: string;
}

export const ChampionBox = ({ id, team }: ChampionBoxProps) => {
  return (
    <ArcherElement id={id}>
      <div className="p-4 border rounded bg-yellow-100 text-center w-36">
        🏆 <div className="font-bold">{team}</div>
        <div className="text-xs text-gray-600">Champion</div>
      </div>
    </ArcherElement>
  );
};
