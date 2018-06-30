"use client";

import { mockMatch, mockMetrics } from "@/lib/mock-data";
import { Sidebar } from "@/components/sidebar";
import { IntegrityScore } from "@/components/integrity-score";
import { PlayerRadar } from "@/components/player-radar";
import { AlertFeed } from "@/components/alert-feed";
import { AnomalyChart } from "@/components/anomaly-chart";
import { MatchTimeline } from "@/components/match-timeline";

export default function Home() {
  const allPlayers = mockMatch.teams.flatMap((t) => t.players);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar match={mockMatch} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Top metrics */}
          <div className="grid grid-cols-4 gap-4">
            <IntegrityScore label="Match Integrity" score={mockMetrics.matchScore} />
            <IntegrityScore label="Fairness Index" score={mockMetrics.fairnessIndex} />
            <IntegrityScore label="Anomalies" score={mockMetrics.anomalyCount} isCount />
            <IntegrityScore label="Alerts" score={mockMetrics.alertsTriggered} isCount />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-2 gap-6">
            <AnomalyChart players={allPlayers} />
            <PlayerRadar players={allPlayers} />
          </div>

          {/* Alerts + Timeline */}
          <div className="grid grid-cols-2 gap-6">
            <AlertFeed alerts={mockMatch.alerts} />
            <MatchTimeline events={mockMatch.timeline} />
          </div>
        </div>
      </main>
    </div>
  );
}
