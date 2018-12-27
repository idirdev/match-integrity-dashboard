import { describe, it, expect } from 'vitest';
import { detectAnomalies, calculateZScore, isStatisticalOutlier } from '../../src/lib/anomaly-detector';

describe('anomaly detector', () => {
  const baseline = {
    kills: 10, deaths: 8, accuracy: 0.25,
    headshots: 3, movementSpeed: 300, reactionTimeMs: 200,
  };

  it('flags high accuracy', () => {
    const stats = { ...baseline, accuracy: 0.92 };
    const result = detectAnomalies(stats, baseline);
    expect(result.flags).toContain('suspicious_accuracy');
  });

  it('flags high headshot rate', () => {
    const stats = { ...baseline, kills: 20, headshots: 16 };
    const result = detectAnomalies(stats, baseline);
    expect(result.flags).toContain('high_headshot_rate');
  });

  it('flags inhuman reaction time', () => {
    const stats = { ...baseline, reactionTimeMs: 50 };
    const result = detectAnomalies(stats, baseline);
    expect(result.flags).toContain('inhuman_reaction_time');
  });

  it('does not flag normal stats', () => {
    const result = detectAnomalies(baseline, baseline);
    expect(result.isAnomaly).toBe(false);
    expect(result.score).toBeLessThan(50);
  });

  it('calculates z-score', () => {
    expect(calculateZScore(100, 50, 10)).toBe(5);
    expect(calculateZScore(50, 50, 10)).toBe(0);
  });

  it('detects statistical outliers', () => {
    expect(isStatisticalOutlier(100, 50, 10)).toBe(true);
    expect(isStatisticalOutlier(55, 50, 10)).toBe(false);
  });
});
