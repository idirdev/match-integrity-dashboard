import type { MatchData, IntegrityMetrics } from "./types";

export const mockMatch: MatchData = {
  id: "MID-2024-4821",
  gameMode: "Competitive 5v5",
  map: "Ascent",
  region: "EU-West",
  startTime: "2024-08-15T20:14:00Z",
  duration: 2538,
  integrityScore: 82,
  teams: [
    {
      id: "team-a",
      name: "Team Alpha",
      score: 13,
      players: [
        {
          id: "p1", name: "PhantomAce", team: "team-a", integrityScore: 96,
          stats: { kills: 28, deaths: 12, assists: 8, accuracy: 26.4, headshotRate: 32, avgReactionTimeMs: 218, damageDealt: 4820, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 88, movementPattern: 92, reactionProfile: 85, gameKnowledge: 90, economyManagement: 78 },
        },
        {
          id: "p2", name: "IronSights", team: "team-a", integrityScore: 94,
          stats: { kills: 22, deaths: 14, assists: 11, accuracy: 24.1, headshotRate: 28, avgReactionTimeMs: 235, damageDealt: 3950, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 82, movementPattern: 88, reactionProfile: 80, gameKnowledge: 85, economyManagement: 90 },
        },
        {
          id: "p3", name: "NexusKill", team: "team-a", integrityScore: 91,
          stats: { kills: 18, deaths: 15, assists: 14, accuracy: 22.8, headshotRate: 24, avgReactionTimeMs: 242, damageDealt: 3410, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 78, movementPattern: 85, reactionProfile: 76, gameKnowledge: 88, economyManagement: 82 },
        },
        {
          id: "p4", name: "GlitchViper", team: "team-a", integrityScore: 72,
          stats: { kills: 14, deaths: 16, assists: 6, accuracy: 31.2, headshotRate: 48, avgReactionTimeMs: 165, damageDealt: 2890, roundsPlayed: 25 },
          anomalies: [
            { type: "aim_snap", description: "Abnormal aim acceleration detected", severity: "warning", confidence: 68, timestamp: "2024-08-15T20:32:14Z", details: { snapAngle: 142, timeMs: 48 } },
            { type: "headshot_rate", description: "Headshot rate exceeds expected range", severity: "warning", confidence: 72, timestamp: "2024-08-15T20:45:00Z", details: { rate: 48, expected: 28, stdDev: 2.1 } },
          ],
          behaviorProfile: { aimConsistency: 45, movementPattern: 82, reactionProfile: 38, gameKnowledge: 70, economyManagement: 65 },
        },
        {
          id: "p5", name: "Sentinel_99", team: "team-a", integrityScore: 88,
          stats: { kills: 10, deaths: 13, assists: 18, accuracy: 20.5, headshotRate: 18, avgReactionTimeMs: 260, damageDealt: 2200, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 72, movementPattern: 90, reactionProfile: 70, gameKnowledge: 92, economyManagement: 88 },
        },
      ],
    },
    {
      id: "team-b",
      name: "Team Bravo",
      score: 12,
      players: [
        {
          id: "p6", name: "DeadEye_X", team: "team-b", integrityScore: 95,
          stats: { kills: 24, deaths: 18, assists: 10, accuracy: 25.8, headshotRate: 30, avgReactionTimeMs: 225, damageDealt: 4280, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 86, movementPattern: 90, reactionProfile: 82, gameKnowledge: 88, economyManagement: 84 },
        },
        {
          id: "p7", name: "CryptoFlash", team: "team-b", integrityScore: 93,
          stats: { kills: 20, deaths: 19, assists: 12, accuracy: 23.4, headshotRate: 26, avgReactionTimeMs: 240, damageDealt: 3680, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 80, movementPattern: 86, reactionProfile: 78, gameKnowledge: 84, economyManagement: 86 },
        },
        {
          id: "p8", name: "WraithOps", team: "team-b", integrityScore: 42,
          stats: { kills: 8, deaths: 22, assists: 4, accuracy: 15.2, headshotRate: 8, avgReactionTimeMs: 380, damageDealt: 1640, roundsPlayed: 25 },
          anomalies: [
            { type: "throw_pattern", description: "Consistent underperformance in critical rounds", severity: "critical", confidence: 84, timestamp: "2024-08-15T20:28:00Z", details: { criticalRoundWinRate: 8, avgRoundWinRate: 52, roundsSuspect: 6 } },
            { type: "economy_exploit", description: "Deliberate economy disadvantage in key rounds", severity: "warning", confidence: 71, timestamp: "2024-08-15T20:38:00Z", details: { savingOnBuyRound: 1, weaponValue: 800 } },
          ],
          behaviorProfile: { aimConsistency: 60, movementPattern: 40, reactionProfile: 55, gameKnowledge: 82, economyManagement: 25 },
        },
        {
          id: "p9", name: "RiftRunner", team: "team-b", integrityScore: 90,
          stats: { kills: 12, deaths: 17, assists: 15, accuracy: 21.0, headshotRate: 22, avgReactionTimeMs: 248, damageDealt: 2650, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 75, movementPattern: 88, reactionProfile: 72, gameKnowledge: 86, economyManagement: 80 },
        },
        {
          id: "p10", name: "HexBlade", team: "team-b", integrityScore: 92,
          stats: { kills: 16, deaths: 16, assists: 9, accuracy: 22.6, headshotRate: 25, avgReactionTimeMs: 238, damageDealt: 3100, roundsPlayed: 25 },
          anomalies: [],
          behaviorProfile: { aimConsistency: 78, movementPattern: 84, reactionProfile: 76, gameKnowledge: 80, economyManagement: 82 },
        },
      ],
    },
  ],
  alerts: [
    { id: "a1", type: "aim_anomaly", severity: "warning", message: "GlitchViper: Aim snap detected (142° in 48ms)", playerName: "GlitchViper", timestamp: "2024-08-15T20:32:14Z", confidence: 68, resolved: false },
    { id: "a2", type: "statistical", severity: "warning", message: "GlitchViper: HS rate 48% exceeds 2σ threshold", playerName: "GlitchViper", timestamp: "2024-08-15T20:45:00Z", confidence: 72, resolved: false },
    { id: "a3", type: "match_fixing", severity: "critical", message: "WraithOps: Suspected throw — 8% win rate in critical rounds", playerName: "WraithOps", timestamp: "2024-08-15T20:28:00Z", confidence: 84, resolved: false },
    { id: "a4", type: "economy", severity: "warning", message: "WraithOps: Saving on buy rounds with $4,800 balance", playerName: "WraithOps", timestamp: "2024-08-15T20:38:00Z", confidence: 71, resolved: false },
    { id: "a5", type: "system", severity: "info", message: "Match analysis complete — 10 players processed", timestamp: "2024-08-15T20:56:38Z", confidence: 100, resolved: true },
  ],
  timeline: [
    { timestamp: "2024-08-15T20:14:00Z", round: 1, type: "round_end", description: "Round 1 — Alpha wins (bomb plant)" },
    { timestamp: "2024-08-15T20:18:00Z", round: 3, type: "alert", description: "WraithOps: Unusual positioning in critical round", severity: "warning" },
    { timestamp: "2024-08-15T20:25:00Z", round: 8, type: "kill", description: "GlitchViper: 3K with Vandal (2 headshots in 1.2s)", playerName: "GlitchViper" },
    { timestamp: "2024-08-15T20:28:00Z", round: 10, type: "alert", description: "WraithOps: Critical round throw detected", playerName: "WraithOps", severity: "critical" },
    { timestamp: "2024-08-15T20:32:14Z", round: 12, type: "alert", description: "GlitchViper: Aim snap 142° in 48ms", playerName: "GlitchViper", severity: "warning" },
    { timestamp: "2024-08-15T20:38:00Z", round: 15, type: "economy", description: "WraithOps: Buying Sheriff on buy round ($4,800 balance)", playerName: "WraithOps" },
    { timestamp: "2024-08-15T20:42:00Z", round: 18, type: "round_end", description: "Round 18 — Score tied 12-12" },
    { timestamp: "2024-08-15T20:45:00Z", round: 22, type: "alert", description: "GlitchViper: HS rate 48% flagged", playerName: "GlitchViper", severity: "warning" },
    { timestamp: "2024-08-15T20:52:00Z", round: 25, type: "round_end", description: "Match ends — Alpha 13, Bravo 12" },
  ],
};

export const mockMetrics: IntegrityMetrics = {
  matchScore: 82,
  fairnessIndex: 74,
  anomalyCount: 4,
  alertsTriggered: 5,
  playersAnalyzed: 10,
  analysisDepth: "Full behavioral analysis",
};
