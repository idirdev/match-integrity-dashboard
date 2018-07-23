"use client";

import type { PlayerData } from "@/lib/types";
import { getIntegrityColor, getIntegrityLabel } from "@/lib/utils";

export function PlayerRadar({ players }: { players: PlayerData[] }) {
  const flagged = players.filter((p) => p.anomalies.length > 0);

  return (
    <div className="bg-surface-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-zinc-200 mb-1">Behavior Profiles</h3>
      <p className="text-xs text-zinc-600 mb-4">Flagged players — behavioral dimension analysis</p>
      <div className="space-y-4">
        {flagged.map((player) => {
          const bp = player.behaviorProfile;
          const dimensions = [
            { label: "Aim Consistency", value: bp.aimConsistency },
            { label: "Movement Pattern", value: bp.movementPattern },
            { label: "Reaction Profile", value: bp.reactionProfile },
            { label: "Game Knowledge", value: bp.gameKnowledge },
            { label: "Economy Mgmt", value: bp.economyManagement },
          ];

          return (
            <div key={player.id} className="p-3 rounded-lg bg-surface-hover/30 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-200">{player.name}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      color: getIntegrityColor(player.integrityScore),
                      backgroundColor: getIntegrityColor(player.integrityScore) + "15",
                    }}
                  >
                    {getIntegrityLabel(player.integrityScore)}
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {player.anomalies.length} flag{player.anomalies.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-1.5">
                {dimensions.map((dim) => (
                  <div key={dim.label} className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 w-28 flex-shrink-0">{dim.label}</span>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${dim.value}%`,
                          backgroundColor: getIntegrityColor(dim.value),
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">{dim.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
