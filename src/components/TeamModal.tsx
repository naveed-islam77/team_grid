"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TeamMatch } from "@/types";

interface TeamPopoverProps {
  team: TeamMatch;
  trigger: React.ReactNode;
}

const TeamPopover = ({ team, trigger }: TeamPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col items-center gap-2">
          <img
            src={team.image}
            alt={team.name}
            className="w-16 h-16 rounded-full border"
          />
          <h3 className="font-bold">{team.name}</h3>
          <p>Rank: {team.rank}</p>
          <p>Points: {team.points}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TeamPopover;
