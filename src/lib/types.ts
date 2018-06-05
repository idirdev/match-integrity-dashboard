export type IntegrityLevel = "high" | "medium" | "low" | "critical";
export type AlertSeverity = "info" | "warning" | "critical";

export interface MatchData {
  id: string;
  gameMode: string;
  map: string;
  region: string;
  startTime: string;
  duration: number;
  integrityScore: number;
  teams: TeamData[];
  alerts: IntegrityAlert[];
  timeline: TimelineEvent[];
}

export interface TeamData {
  id: string;
  name: string;
  score: number;
  players: PlayerData[];
}

export interface PlayerData {
  id: string;
  name: string;
  team: string;
  integrityScore: number;
  stats: PlayerStats;
  anomalies: AnomalyFlag[];
  behaviorProfile: BehaviorProfile;
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  accuracy: number;
  headshotRate: number;
  avgReactionTimeMs: number;
  damageDealt: number;
  roundsPlayed: number;
}

export interface AnomalyFlag {
  type: string;
  description: string;
  severity: AlertSeverity;
  confidence: number;
  timestamp: string;
  details: Record<string, number | string>;
}

export interface BehaviorProfile {
  aimConsistency: number;
  movementPattern: number;
  reactionProfile: number;
  gameKnowledge: number;
  economyManagement: number;
}

export interface IntegrityAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  message: string;
  playerName?: string;
  timestamp: string;
  confidence: number;
  resolved: boolean;
}

export interface TimelineEvent {
  timestamp: string;
  round: number;
  type: "kill" | "objective" | "alert" | "economy" | "round_end";
  description: string;
  playerName?: string;
  severity?: AlertSeverity;
}

export interface IntegrityMetrics {
  matchScore: number;
  fairnessIndex: number;
  anomalyCount: number;
  alertsTriggered: number;
  playersAnalyzed: number;
  analysisDepth: string;
}
