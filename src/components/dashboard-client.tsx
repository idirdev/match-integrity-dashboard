"use client";

import Link from "next/link";
import type { MatchData, IntegrityMetrics } from "@/lib/types";
import { Sidebar } from "@/components/sidebar";
import { IntegrityScore } from "@/components/integrity-score";
import { PlayerRadar } from "@/components/player-radar";
import { AlertFeed } from "@/components/alert-feed";
import { AnomalyChart } from "@/components/anomaly-chart";
import { MatchTimeline } from "@/components/match-timeline";

interface Props {
  match: MatchData;
  metrics: IntegrityMetrics;
  allMatches: MatchData[];
}

export function DashboardClient({ match, metrics, allMatches }: Props) {
  const allPlayers = match.teams.flatMap((t) => t.players);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar match={match} />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-6 pt-4 pb-0">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
              Match{" "}
              <span className="font-mono text-white">{match.id}</span>
            </span>
            {allMatches.length > 1 && (
              <span className="text-xs text-gray-500">
                ({allMatches.length} matches in store)
              </span>
            )}
          </div>
          <Link
            href="/import"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Import Match Data
          </Link>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <IntegrityScore label="Match Integrity" score={metrics.matchScore} />
            <IntegrityScore label="Fairness Index" score={metrics.fairnessIndex} />
            <IntegrityScore label="Anomalies" score={metrics.anomalyCount} isCount />
            <IntegrityScore label="Alerts" score={metrics.alertsTriggered} isCount />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <AnomalyChart players={allPlayers} />
            <PlayerRadar players={allPlayers} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <AlertFeed alerts={match.alerts} />
            <MatchTimeline events={match.timeline} />
          </div>
        </div>
      </main>
    </div>
  );
}
