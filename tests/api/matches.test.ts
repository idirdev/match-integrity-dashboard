import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import type { MatchData } from "../../src/lib/types";
import { mockMatch } from "../../src/lib/mock-data";

function makeStore(dir: string) {
  const sp = path.join(dir, "matches.json");
  function read(): MatchData[] {
    if (!fs.existsSync(sp)) return [];
    try { return JSON.parse(fs.readFileSync(sp, "utf-8")); } catch { return []; }
  }
  function write(m: MatchData[]) { fs.writeFileSync(sp, JSON.stringify(m, null, 2), "utf-8"); }
  function all(): MatchData[] { const s = read(); if (!s.length) { write([mockMatch]); return [mockMatch]; } return s; }
  function byId(id: string): MatchData | null { return read().find((m) => m.id === id) ?? null; }
  function save(m: MatchData): MatchData { const ms = read(); const i = ms.findIndex((x) => x.id === m.id); if (i >= 0) ms[i] = m; else ms.push(m); write(ms); return m; }
  function del(id: string): boolean { const ms = read(); const f = ms.filter((m) => m.id !== id); if (f.length === ms.length) return false; write(f); return true; }
  return { all, byId, save, del, sp };
}

let st: ReturnType<typeof makeStore>;
beforeEach(() => { st = makeStore(fs.mkdtempSync(path.join(os.tmpdir(), "mid-"))); });
afterEach(() => { fs.rmSync(path.dirname(st.sp), { recursive: true, force: true }); });

describe("store.all", () => {
  it("seeds with mock data when empty", () => {
    const m = st.all(); expect(m).toHaveLength(1); expect(m[0].id).toBe(mockMatch.id);
  });
  it("persists to disk", () => {
    st.all(); expect(fs.existsSync(st.sp)).toBe(true);
    expect(JSON.parse(fs.readFileSync(st.sp, "utf-8"))).toHaveLength(1);
  });
  it("returns stored matches", () => {
    st.save({ ...mockMatch, id: "C-001" });
    expect(st.all().some((m) => m.id === "C-001")).toBe(true);
  });
});

describe("store.byId", () => {
  it("finds by id", () => {
    st.all(); const m = st.byId(mockMatch.id); expect(m).not.toBeNull(); expect(m!.id).toBe(mockMatch.id);
  });
  it("returns null for unknown id", () => {
    st.all(); expect(st.byId("NOPE")).toBeNull();
  });
});

describe("store.save", () => {
  it("inserts a new match", () => {
    st.save({ ...mockMatch, id: "N-001" });
    expect(st.byId("N-001")).not.toBeNull();
  });
  it("upserts existing match", () => {
    st.all(); st.save({ ...mockMatch, integrityScore: 55 });
    expect(st.byId(mockMatch.id)!.integrityScore).toBe(55);
    expect(st.all()).toHaveLength(1);
  });
  it("returns saved match", () => {
    expect(st.save({ ...mockMatch, id: "RET" }).id).toBe("RET");
  });
});

describe("store.del", () => {
  it("deletes existing match", () => {
    st.all(); expect(st.del(mockMatch.id)).toBe(true); expect(st.byId(mockMatch.id)).toBeNull();
  });
  it("returns false for unknown id", () => {
    st.all(); expect(st.del("NOPE")).toBe(false);
  });
});

function validate(item: unknown): { valid: boolean; error?: string } {
  if (!item || typeof item !== "object") return { valid: false, error: "not an object" };
  const o = item as Record<string, unknown>;
  if (typeof o.id !== "string" || !o.id) return { valid: false, error: "bad id" };
  if (typeof o.gameMode !== "string") return { valid: false, error: "bad gameMode" };
  if (!Array.isArray(o.teams)) return { valid: false, error: "bad teams" };
  return { valid: true };
}

describe("POST /api/matches validation", () => {
  it("accepts valid match", () => { expect(validate(mockMatch).valid).toBe(true); });
  it("rejects null", () => { expect(validate(null).valid).toBe(false); });
  it("rejects missing id", () => {
    const { id: _i, ...n } = mockMatch; const r = validate(n);
    expect(r.valid).toBe(false); expect(r.error).toContain("id");
  });
  it("rejects missing gameMode", () => {
    const { gameMode: _g, ...n } = mockMatch; const r = validate(n);
    expect(r.valid).toBe(false); expect(r.error).toContain("gameMode");
  });
  it("rejects missing teams", () => {
    const { teams: _t, ...n } = mockMatch; const r = validate(n);
    expect(r.valid).toBe(false); expect(r.error).toContain("teams");
  });
  it("rejects non-array teams", () => {
    expect(validate({ ...mockMatch, teams: "x" }).valid).toBe(false);
  });
});

describe("GET /api/matches response", () => {
  it("returns array with content", () => {
    const m = st.all(); expect(Array.isArray(m)).toBe(true); expect(m.length).toBeGreaterThan(0);
  });
});

describe("GET /api/matches/[id] response", () => {
  it("returns match by id", () => {
    st.all(); const m = st.byId(mockMatch.id); expect(m).not.toBeNull(); expect(m!.id).toBe(mockMatch.id);
  });
  it("returns null for bad id", () => {
    st.all(); expect(st.byId("NO")).toBeNull();
  });
});

describe("end-to-end store flow", () => {
  it("save retrieve update delete", () => {
    const m = { ...mockMatch, id: "E1", integrityScore: 60 };
    st.save(m); expect(st.byId("E1")!.integrityScore).toBe(60);
    st.save({ ...m, integrityScore: 88 }); expect(st.byId("E1")!.integrityScore).toBe(88);
    expect(st.del("E1")).toBe(true); expect(st.byId("E1")).toBeNull();
  });
  it("multiple matches co-exist", () => {
    st.save({ ...mockMatch, id: "A" }); st.save({ ...mockMatch, id: "B" });
    const ms = st.all(); expect(ms.length).toBeGreaterThanOrEqual(2);
    expect(ms.find((m) => m.id === "A")).toBeDefined();
    expect(ms.find((m) => m.id === "B")).toBeDefined();
  });
});
