/**
 * File-based JSON store for match data.
 * Writes to data/matches.json at the project root.
 * Falls back to mock data when the store is empty.
 */
import fs from "fs";
import path from "path";
import type { MatchData } from "./types";
import { mockMatch } from "./mock-data";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "matches.json");

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): MatchData[] {
  ensureDataDir();
  if (!fs.existsSync(STORE_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as MatchData[];
  } catch {
    return [];
  }
}

function writeStore(matches: MatchData[]): void {
  ensureDataDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(matches, null, 2), "utf-8");
}

/** Return all stored matches. If the store is empty, seed it with mock data first. */
export function getAllMatches(): MatchData[] {
  const stored = readStore();
  if (stored.length === 0) {
    writeStore([mockMatch]);
    return [mockMatch];
  }
  return stored;
}

/** Return a single match by id, or null. */
export function getMatchById(id: string): MatchData | null {
  const matches = readStore();
  return matches.find((m) => m.id === id) ?? null;
}

/** Insert or replace a match (upsert by id). Returns the saved match. */
export function saveMatch(match: MatchData): MatchData {
  const matches = readStore();
  const idx = matches.findIndex((m) => m.id === match.id);
  if (idx >= 0) {
    matches[idx] = match;
  } else {
    matches.push(match);
  }
  writeStore(matches);
  return match;
}

/** Delete a match by id. Returns true if found and removed. */
export function deleteMatch(id: string): boolean {
  const matches = readStore();
  const filtered = matches.filter((m) => m.id !== id);
  if (filtered.length === matches.length) return false;
  writeStore(filtered);
  return true;
}
