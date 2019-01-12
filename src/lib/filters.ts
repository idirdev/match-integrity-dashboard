interface MatchFilter {
  dateRange?: { start: Date; end: Date };
  playerIds?: string[];
  mapName?: string;
  minAnomalyScore?: number;
  status?: 'clean' | 'flagged' | 'reviewed' | 'banned';
}

interface MatchRecord {
  id: string;
  date: Date;
  players: string[];
  map: string;
  anomalyScore: number;
  status: string;
}

export function applyFilters(matches: MatchRecord[], filter: MatchFilter): MatchRecord[] {
  return matches.filter((m) => {
    if (filter.dateRange) {
      if (m.date < filter.dateRange.start || m.date > filter.dateRange.end) return false;
    }
    if (filter.playerIds?.length) {
      if (!filter.playerIds.some((id) => m.players.includes(id))) return false;
    }
    if (filter.mapName && m.map !== filter.mapName) return false;
    if (filter.minAnomalyScore !== undefined && m.anomalyScore < filter.minAnomalyScore) return false;
    if (filter.status && m.status !== filter.status) return false;
    return true;
  });
}

export function buildFilterFromQuery(query: Record<string, string>): MatchFilter {
  const filter: MatchFilter = {};
  if (query.from && query.to) {
    filter.dateRange = { start: new Date(query.from), end: new Date(query.to) };
  }
  if (query.players) {
    filter.playerIds = query.players.split(',');
  }
  if (query.map) filter.mapName = query.map;
  if (query.minScore) filter.minAnomalyScore = Number(query.minScore);
  if (query.status) filter.status = query.status as MatchFilter['status'];
  return filter;
}
