import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { stages, seasonPerformance } from "../../data/season-performance";

const StageTimeline = () => {
  return (
    <div className="p-4 overflow-x-auto">
      <ArcherContainer strokeColor="blue" strokeWidth={2}>
        <div
          className="grid"
          style={{
            gridTemplateRows: `auto 20px repeat(${stages.length}, 60px)`,
            gridTemplateColumns: `auto repeat(${seasonPerformance.length}, 100px)`,
          }}
        >
          {/* Empty top-left corner */}
          <div />
          {/* Season labels */}
          {seasonPerformance.map((perf) => (
            <div
              key={perf.season}
              className="flex items-center justify-center font-bold text-sm"
            >
              {perf.season}
            </div>
          ))}
          {/* Spacer row */}
          <div /> {/* empty spacer for stage labels column */}
          {seasonPerformance.map((_, idx) => (
            <div key={`spacer-${idx}`} />
          ))}
          {/* Stage rows */}
          {stages.map((stage) => (
            <React.Fragment key={stage}>
              {/* Stage label */}
              <div className="flex items-center border-b border-r border-gray-200 justify-end pr-2 text-xs font-medium text-gray-600">
                {stage}
              </div>

              {/* Season cells */}
              {seasonPerformance.map((perf, idx) => {
                const isHere = perf.stage === stage;

                return (
                  <div
                    key={`${stage}-${perf.season}`}
                    className="flex items-center justify-center border-b-2 border-gray-200"
                  >
                    {isHere && (
                      <ArcherElement
                        id={`season-${idx}`}
                        relations={
                          idx < seasonPerformance.length - 1
                            ? [
                                {
                                  targetId: `season-${idx + 1}`,
                                  targetAnchor: "left",
                                  sourceAnchor: "right",
                                  style: { endMarker: false },
                                },
                              ]
                            : []
                        }
                      >
                        <div className="relative flex items-center justify-center">
                          {/* Crown on top */}
                          {idx === 5 && (
                            <div className="absolute -top-6 flex items-center justify-center">
                              👑
                            </div>
                          )}

                          {/* Team logo */}
                          <div className="rounded-full shadow-md w-10 h-10 bg-white flex items-center justify-center">
                            <img
                              src="https://cdn.sportmonks.com/images/soccer/teams/18/18.png"
                              alt="team"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                        </div>
                      </ArcherElement>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default StageTimeline;
