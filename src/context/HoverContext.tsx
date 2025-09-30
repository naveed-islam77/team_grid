"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HoverContextType {
  hoveredTeamName: string | null;
  setHoveredTeamName: (teamName: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredTeamName, setHoveredTeamName] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredTeamName, setHoveredTeamName }}>
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = () => {
  const context = useContext(HoverContext);
  if (!context) throw new Error("useHover must be used within HoverProvider");
  return context;
};
