import { NextRequest, NextResponse } from "next/server";
import { getAllMatches, saveMatch } from "@/lib/store";
import type { MatchData } from "@/lib/types";

/** GET /api/matches — list all stored matches */
export async function GET() {
  const matches = getAllMatches();
  return NextResponse.json({ matches, total: matches.length });
}

/** POST /api/matches — ingest one or more match records */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Accept a single match object or an array
  const items: unknown[] = Array.isArray(body) ? body : [body];

  if (items.length === 0) {
    return NextResponse.json({ error: "No match data provided" }, { status: 400 });
  }

  const saved: MatchData[] = [];
  const errors: { index: number; error: string }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i] as Record<string, unknown>;
    if (!item || typeof item !== "object") {
      errors.push({ index: i, error: "Item must be an object" });
      continue;
    }
    if (typeof item.id !== "string" || !item.id) {
      errors.push({ index: i, error: "Missing or invalid field: id (string)" });
      continue;
    }
    if (typeof item.gameMode !== "string") {
      errors.push({ index: i, error: "Missing or invalid field: gameMode (string)" });
      continue;
    }
    if (!Array.isArray(item.teams)) {
      errors.push({ index: i, error: "Missing or invalid field: teams (array)" });
      continue;
    }
    const match = saveMatch(item as unknown as MatchData);
    saved.push(match);
  }

  const status = errors.length === 0 ? 201 : saved.length === 0 ? 400 : 207;
  return NextResponse.json({ saved: saved.length, errors }, { status });
}
