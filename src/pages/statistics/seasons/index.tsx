import { HoverProvider } from "@/context/HoverContext";
import LeagueGrid from "@/components/LeagueGrid";

export default function SeasonPage() {
  return (
    <HoverProvider>
      <div className="p-4 h-screen flex justify-center items-center flex-col">
        <h1 className="text-xl font-bold mb-4">League History</h1>
        <LeagueGrid />
      </div>
    </HoverProvider>
  );
}
