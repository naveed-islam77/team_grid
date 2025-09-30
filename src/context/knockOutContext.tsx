"use client";
import { createContext, useContext, useState } from "react";

interface KnockoutContextType {
  hoveredTeam: string | null;
  setHoveredTeam: (team: string | null) => void;
}

const KnockoutContext = createContext<KnockoutContextType | undefined>(
  undefined
);

export const KnockoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  return (
    <KnockoutContext.Provider value={{ hoveredTeam, setHoveredTeam }}>
      {children}
    </KnockoutContext.Provider>
  );
};

export const useKnockout = () => {
  const ctx = useContext(KnockoutContext);
  if (!ctx) throw new Error("useKnockout must be used inside KnockoutProvider");
  return ctx;
};
