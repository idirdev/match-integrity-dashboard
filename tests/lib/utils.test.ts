import { describe, it, expect } from "vitest";

// replicate the utility functions from src/lib/utils.ts for isolated testing
function getIntegrityColor(score: number): string {
  if (score >= 90) return "#10b981";
  if (score >= 70) return "#f59e0b";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}

function getIntegrityLabel(score: number): string {
  if (score >= 90) return "Clean";
  if (score >= 70) return "Review";
  if (score >= 50) return "Suspect";
  return "Flagged";
}

function calculateAnomalyScore(
  headshotRate: number,
  reactionTimeMs: number,
  snapCount: number,
  accuracy: number
): number {
  let score = 0;

  // headshot rate contribution (expected ~25-30%)
  if (headshotRate > 45) score += (headshotRate - 45) * 1.5;
  if (headshotRate > 60) score += (headshotRate - 60) * 2;

  // reaction time contribution (below 150ms is suspect)
  if (reactionTimeMs < 150) score += (150 - reactionTimeMs) * 0.4;
  if (reactionTimeMs < 100) score += (100 - reactionTimeMs) * 0.8;

  // aim snap penalties
  score += snapCount * 8;

  // unusually high accuracy
  if (accuracy > 40) score += (accuracy - 40) * 0.6;

  return Math.min(100, Math.max(0, Math.round(score)));
}

describe("getIntegrityColor", () => {
  it("returns green for high scores", () => {
    expect(getIntegrityColor(95)).toBe("#10b981");
    expect(getIntegrityColor(90)).toBe("#10b981");
  });

  it("returns amber for medium scores", () => {
    expect(getIntegrityColor(75)).toBe("#f59e0b");
    expect(getIntegrityColor(70)).toBe("#f59e0b");
  });

  it("returns orange for low-medium scores", () => {
    expect(getIntegrityColor(55)).toBe("#f97316");
    expect(getIntegrityColor(50)).toBe("#f97316");
  });

  it("returns red for low scores", () => {
    expect(getIntegrityColor(30)).toBe("#ef4444");
    expect(getIntegrityColor(0)).toBe("#ef4444");
  });
});

describe("getIntegrityLabel", () => {
  it("labels high scores as Clean", () => {
    expect(getIntegrityLabel(92)).toBe("Clean");
  });

  it("labels medium scores as Review", () => {
    expect(getIntegrityLabel(78)).toBe("Review");
  });

  it("labels low-medium as Suspect", () => {
    expect(getIntegrityLabel(55)).toBe("Suspect");
  });

  it("labels low scores as Flagged", () => {
    expect(getIntegrityLabel(30)).toBe("Flagged");
  });
});

describe("calculateAnomalyScore", () => {
  it("returns 0 for normal player stats", () => {
    const score = calculateAnomalyScore(25, 220, 0, 24);
    expect(score).toBe(0);
  });

  it("penalizes high headshot rate", () => {
    const score = calculateAnomalyScore(55, 230, 0, 25);
    expect(score).toBeGreaterThan(0);
  });

  it("penalizes inhuman reaction times", () => {
    const score = calculateAnomalyScore(25, 80, 0, 22);
    expect(score).toBeGreaterThan(20);
  });

  it("penalizes aim snapping", () => {
    const noSnaps = calculateAnomalyScore(25, 200, 0, 24);
    const withSnaps = calculateAnomalyScore(25, 200, 5, 24);
    expect(withSnaps).toBeGreaterThan(noSnaps);
  });

  it("caps at 100", () => {
    const score = calculateAnomalyScore(90, 30, 15, 60);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("handles edge case with all zeros", () => {
    const score = calculateAnomalyScore(0, 300, 0, 0);
    expect(score).toBe(0);
  });
});
