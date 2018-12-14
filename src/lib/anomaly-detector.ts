interface PlayerStats {
  kills: number;
  deaths: number;
  accuracy: number;
  headshots: number;
  movementSpeed: number;
  reactionTimeMs: number;
}

interface AnomalyResult {
  isAnomaly: boolean;
  score: number;
  flags: string[];
}

const THRESHOLDS = {
  kdRatio: 5.0,
  accuracy: 0.85,
  headshotRate: 0.65,
  reactionTime: 80,
  speedMultiplier: 1.5,
};

export function detectAnomalies(stats: PlayerStats, baseline: PlayerStats): AnomalyResult {
  const flags: string[] = [];
  let score = 0;

  const kd = stats.deaths > 0 ? stats.kills / stats.deaths : stats.kills;
  const baseKd = baseline.deaths > 0 ? baseline.kills / baseline.deaths : baseline.kills;
  if (kd > THRESHOLDS.kdRatio && kd > baseKd * 3) {
    flags.push('abnormal_kd_ratio');
    score += 30;
  }

  if (stats.accuracy > THRESHOLDS.accuracy) {
    flags.push('suspicious_accuracy');
    score += 25;
  }

  const hsRate = stats.kills > 0 ? stats.headshots / stats.kills : 0;
  if (hsRate > THRESHOLDS.headshotRate) {
    flags.push('high_headshot_rate');
    score += 25;
  }

  if (stats.reactionTimeMs < THRESHOLDS.reactionTime) {
    flags.push('inhuman_reaction_time');
    score += 20;
  }

  if (stats.movementSpeed > baseline.movementSpeed * THRESHOLDS.speedMultiplier) {
    flags.push('speed_anomaly');
    score += 15;
  }

  return { isAnomaly: score >= 50, score: Math.min(100, score), flags };
}

export function calculateZScore(value: number, mean: number, stddev: number): number {
  if (stddev === 0) return 0;
  return (value - mean) / stddev;
}

export function isStatisticalOutlier(value: number, mean: number, stddev: number, threshold = 2.5): boolean {
  return Math.abs(calculateZScore(value, mean, stddev)) > threshold;
}
