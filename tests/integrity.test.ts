import { describe, it, expect } from "vitest";

// Test the integrity scoring logic based on the dashboard's analysis dimensions
describe("Integrity Scoring", () => {
  function calculateIntegrityScore(metrics: {
    aimConsistency: number;
    movementScore: number;
    reactionTime: number;
    gameKnowledge: number;
    economyScore: number;
  }): number {
    const weights = { aim: 0.3, movement: 0.2, reaction: 0.2, knowledge: 0.15, economy: 0.15 };
    const score =
      metrics.aimConsistency * weights.aim +
      metrics.movementScore * weights.movement +
      metrics.reactionTime * weights.reaction +
      metrics.gameKnowledge * weights.knowledge +
      metrics.economyScore * weights.economy;
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  it("calculates score from all dimensions", () => {
    const score = calculateIntegrityScore({
      aimConsistency: 85,
      movementScore: 90,
      reactionTime: 75,
      gameKnowledge: 80,
      economyScore: 70,
    });
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns 100 for perfect scores", () => {
    const score = calculateIntegrityScore({
      aimConsistency: 100,
      movementScore: 100,
      reactionTime: 100,
      gameKnowledge: 100,
      economyScore: 100,
    });
    expect(score).toBe(100);
  });

  it("returns 0 for zero scores", () => {
    const score = calculateIntegrityScore({
      aimConsistency: 0,
      movementScore: 0,
      reactionTime: 0,
      gameKnowledge: 0,
      economyScore: 0,
    });
    expect(score).toBe(0);
  });

  it("clamps to valid range", () => {
    const score = calculateIntegrityScore({
      aimConsistency: 150,
      movementScore: 150,
      reactionTime: 150,
      gameKnowledge: 150,
      economyScore: 150,
    });
    expect(score).toBe(100);
  });
});

describe("Anomaly Detection", () => {
  function detectAnomalies(headshotRate: number, avgReactionMs: number, snapAngleCount: number) {
    const flags: string[] = [];
    if (headshotRate > 0.7) flags.push("suspicious_headshot_rate");
    if (avgReactionMs < 100) flags.push("inhuman_reaction_time");
    if (snapAngleCount > 5) flags.push("aim_snap_detected");
    return flags;
  }

  it("flags high headshot rate", () => {
    const flags = detectAnomalies(0.85, 200, 1);
    expect(flags).toContain("suspicious_headshot_rate");
    expect(flags).not.toContain("inhuman_reaction_time");
  });

  it("flags inhuman reaction time", () => {
    const flags = detectAnomalies(0.3, 50, 0);
    expect(flags).toContain("inhuman_reaction_time");
  });

  it("flags aim snapping", () => {
    const flags = detectAnomalies(0.4, 180, 8);
    expect(flags).toContain("aim_snap_detected");
  });

  it("returns empty for clean player", () => {
    const flags = detectAnomalies(0.25, 220, 1);
    expect(flags).toHaveLength(0);
  });

  it("detects multiple anomalies", () => {
    const flags = detectAnomalies(0.9, 50, 10);
    expect(flags).toHaveLength(3);
  });
});

describe("Match Fixing Detection", () => {
  function detectThrowPattern(roundWins: boolean[], criticalRounds: number[]): boolean {
    const criticalLosses = criticalRounds.filter((r) => !roundWins[r]).length;
    const criticalWinRate = 1 - criticalLosses / criticalRounds.length;
    const overallWinRate = roundWins.filter(Boolean).length / roundWins.length;
    return criticalWinRate < overallWinRate * 0.5;
  }

  it("detects throw pattern when losing critical rounds", () => {
    const rounds = [true, true, true, false, true, true, false, false, true, false];
    const criticalRounds = [3, 6, 7, 9];
    expect(detectThrowPattern(rounds, criticalRounds)).toBe(true);
  });

  it("no throw when winning critical rounds", () => {
    const rounds = [true, true, true, true, false, true, true, false, true, true];
    const criticalRounds = [0, 2, 5, 8];
    expect(detectThrowPattern(rounds, criticalRounds)).toBe(false);
  });
});
