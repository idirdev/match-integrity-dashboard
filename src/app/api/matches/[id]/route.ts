import { NextRequest, NextResponse } from "next/server";
import { getMatchById, saveMatch, deleteMatch } from "@/lib/store";
import type { MatchData } from "@/lib/types";

/** GET /api/matches/[id] — fetch a single match */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const match = getMatchById(params.id);
  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
  return NextResponse.json({ match });
}

/** PUT /api/matches/[id] — replace a match record */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const item = body as Record<string, unknown>;
  if (!item || typeof item !== "object" || typeof item.id !== "string") {
    return NextResponse.json({ error: "Invalid match object" }, { status: 400 });
  }

  if (item.id !== params.id) {
    return NextResponse.json(
      { error: "URL id and body id do not match" },
      { status: 400 }
    );
  }

  const saved = saveMatch(item as unknown as MatchData);
  return NextResponse.json({ match: saved });
}

/** DELETE /api/matches/[id] — remove a match */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const removed = deleteMatch(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: params.id });
}
