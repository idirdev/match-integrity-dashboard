import { describe, it, expect } from 'vitest';
import { applyFilters, buildFilterFromQuery } from '../../src/lib/filters';

describe('match filters', () => {
  const matches = [
    { id: '1', date: new Date('2024-11-01'), players: ['p1', 'p2'], map: 'dust2', anomalyScore: 75, status: 'flagged' },
    { id: '2', date: new Date('2024-11-05'), players: ['p3', 'p4'], map: 'mirage', anomalyScore: 20, status: 'clean' },
    { id: '3', date: new Date('2024-11-10'), players: ['p1', 'p5'], map: 'dust2', anomalyScore: 90, status: 'flagged' },
  ];

  it('filters by map', () => {
    const result = applyFilters(matches, { mapName: 'dust2' });
    expect(result).toHaveLength(2);
  });

  it('filters by player', () => {
    const result = applyFilters(matches, { playerIds: ['p1'] });
    expect(result).toHaveLength(2);
  });

  it('filters by min anomaly score', () => {
    const result = applyFilters(matches, { minAnomalyScore: 50 });
    expect(result).toHaveLength(2);
  });

  it('filters by status', () => {
    const result = applyFilters(matches, { status: 'clean' });
    expect(result).toHaveLength(1);
  });

  it('combines multiple filters', () => {
    const result = applyFilters(matches, { mapName: 'dust2', minAnomalyScore: 80 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('builds filter from query params', () => {
    const filter = buildFilterFromQuery({ map: 'dust2', minScore: '50', status: 'flagged' });
    expect(filter.mapName).toBe('dust2');
    expect(filter.minAnomalyScore).toBe(50);
  });
});
