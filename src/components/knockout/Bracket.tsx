"use client";
import { dummyBracket } from "@/data/knockOut";
import { ArcherContainer } from "react-archer";
import { MatchBox } from "./MatchBox";

export const Bracket = () => {
  const relation = getRelations("roundOf16", 0);

  return (
    <ArcherContainer strokeColor="green" strokeWidth={2} endMarker={false}>
      <div className="flex items-center">
        <div className="w-full flex justify-center items-center gap-14">
          <div className="flex flex-col gap-8">
            {dummyBracket.roundOf16?.slice(0, 4)?.map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("roundOf16", i)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-32">
            {dummyBracket.quarterfinals.slice(0, 2)?.map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("quarterfinals", i)}
              />
            ))}
          </div>

          {/* Semifinals */}
          <div className="flex flex-col gap-8 justify-center">
            {dummyBracket.semifinals.slice(0, 1).map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("semifinals", i)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Final */}
          <div className="flex flex-col gap-8 justify-center">
            {dummyBracket.final.map((m) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("final", 0)}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center gap-14">
          <div className="flex flex-col gap-8 justify-center">
            {dummyBracket.semifinals.slice(1, 2)?.map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("semifinals", i + 1, "right", "left")}
              />
            ))}
          </div>

          <div className="flex flex-col gap-32">
            {dummyBracket.quarterfinals.slice(2, 4)?.map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations(
                  "quarterfinals",
                  i + 2,
                  "right",
                  "left"
                )}
              />
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {dummyBracket.roundOf16?.slice(4, 8)?.map((m, i) => (
              <MatchBox
                key={m.id}
                {...m}
                relations={getRelations("roundOf16", i + 4, "right", "left")}
              />
            ))}
          </div>
        </div>
      </div>
    </ArcherContainer>
  );
};

function getRelations(
  stage: string,
  index: number,
  targetAnchor?: string,
  sourceAnchor?: string
) {
  if (stage === "roundOf16") {
    const targetIndex = Math.floor(index / 2) + 1;
    return [{ targetId: `qf-${targetIndex}`, targetAnchor, sourceAnchor }];
  }

  if (stage === "quarterfinals") {
    const targetIndex = Math.floor(index / 2) + 1;
    return [{ targetId: `sf-${targetIndex}`, targetAnchor, sourceAnchor }];
  }

  if (stage === "semifinals") {
    return [{ targetId: "final", targetAnchor, sourceAnchor }];
  }

  if (stage === "final") {
    return [{ targetId: "champion" }];
  }

  return [];
}
