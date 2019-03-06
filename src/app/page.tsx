import { getAllMatches } from "@/lib/store";
import { DashboardClient } from "@/components/dashboard-client";

/**
 * Server component: reads the first match from the JSON store.
 * The store auto-seeds with mock data when empty, so the dashboard
 * always has something to display.
 */
export default function Home() {
  const matches = getAllMatches();
  const match = matches[0];

  const allPlayers = match.teams.flatMap((t) => t.players);
  const metrics = {
    matchScore: match.integrityScore,
    fairnessIndex: Math.round(
      allPlayers.reduce((sum, p) => sum + p.integrityScore, 0) / allPlayers.length
    ),
    anomalyCount: allPlayers.reduce((sum, p) => sum + p.anomalies.length, 0),
    alertsTriggered: match.alerts.length,
    playersAnalyzed: allPlayers.length,
    analysisDepth: "Full behavioral analysis",
  };

  return <DashboardClient match={match} metrics={metrics} allMatches={matches} />;
}
