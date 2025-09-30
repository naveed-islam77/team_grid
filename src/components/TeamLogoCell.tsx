import { TeamMatch } from "@/types";

interface Props {
  team: TeamMatch;
  season: string;
  rank: number;
  seasonIndex: number;
  onHover: () => void;
  onLeave: () => void;
}

const TeamLogoCell = ({
  team,
  season,
  rank,
  seasonIndex,
  onHover,
  onLeave,
}: Props) => {
  return (
    <div
      className={`col-start-[${seasonIndex + 2}] row-start-[${
        rank + 1
      }] relative group cursor-pointer`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <img src={team.image} alt={team.name} className="h-8 w-8 mx-auto" />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 z-10">
        {team.name}
        <br />
        Rank: {rank}
        <br />
        Pts: {team.points}
      </div>
    </div>
  );
};

export default TeamLogoCell;
