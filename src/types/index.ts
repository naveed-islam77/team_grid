export interface TeamMatch {
  matchId: string;
  rank: number;
  points: number;
  image: string;
  name: string;
}

export interface Season {
  matches: TeamMatch[];
}

export type SeasonalHistory = {
  [season: string]: Season;
};

type AnchorPosition = "top" | "bottom" | "left" | "right";

export type ArcherRelation = {
  targetId: string;
  sourceAnchor: AnchorPosition;
  targetAnchor: AnchorPosition;
  label?: string | React.ReactNode;
  style?: {
    strokeColor?: string;
    strokeWidth?: number;
    endMarker?: boolean;
    startMarker?: boolean;
    dashness?:
      | boolean
      | {
          strokeLen?: number;
          nonStrokeLen?: number;
          animation?: boolean;
        };
  };
};