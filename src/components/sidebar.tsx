"use client";

import type { MatchData } from "@/lib/types";
import { getIntegrityColor, getIntegrityLabel } from "@/lib/utils";
import { Shield, Activity, Users, AlertTriangle } from "lucide-react";

export function Sidebar({ match }: { match: MatchData }) {
  const allPlayers = match.teams.flatMap((t) => t.players);
  const flaggedPlayers = allPlayers.filter((p) => p.integrityScore < 80);

  return (
    <aside className="w-64 border-r border-border bg-surface-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-5 h-5 text-emerald-500" />
          <h1 className="text-sm font-semibold text-white">Match Integrity</h1>
        </div>
        <p className="text-xs text-zinc-500">Anomaly detection dashboard</p>
      </div>

      <div className="p-4 border-b border-border">
        <p className="text-[10px] text-zinc-600 font-semibold mb-2">MATCH INFO</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between"><span className="text-zinc-500">ID</span><span className="text-zinc-300 font-mono">{match.id}</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Mode</span><span className="text-zinc-300">{match.gameMode}</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Map</span><span className="text-zinc-300">{match.map}</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">Region</span><span className="text-zinc-300">{match.region}</span></div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Score</span>
            <span>
              <span className="text-emerald-400">{match.teams[0].score}</span>
              <span className="text-zinc-600"> - </span>
              <span className="text-red-400">{match.teams[1].score}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <p className="text-[10px] text-zinc-600 font-semibold mb-2">
          FLAGGED PLAYERS ({flaggedPlayers.length})
        </p>
        <div className="space-y-2">
          {flaggedPlayers.map((player) => (
            <div
              key={player.id}
              className="p-2.5 rounded-lg bg-surface-hover/50 border border-border"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-200 font-medium">{player.name}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                  style={{
                    color: getIntegrityColor(player.integrityScore),
                    backgroundColor: getIntegrityColor(player.integrityScore) + "15",
                  }}
                >
                  {player.integrityScore}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] text-zinc-500">
                  {player.anomalies.length} anomal{player.anomalies.length === 1 ? "y" : "ies"} —{" "}
                  {getIntegrityLabel(player.integrityScore)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Activity className="w-3 h-3" />
          <span>Full behavioral analysis</span>
        </div>
      </div>
    </aside>
  );
}
