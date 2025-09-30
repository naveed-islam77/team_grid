import { forwardRef } from "react";

const RankCircle = forwardRef<HTMLDivElement, { rank: number; top: string }>(
  ({ rank, top }, ref) => (
    <div
      ref={ref}
      className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shadow-md"
      style={{ top }}
    >
      {rank}
    </div>
  )
);

export default RankCircle;
