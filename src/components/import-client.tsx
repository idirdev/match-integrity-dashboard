"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Status = { ok: boolean; message: string } | null;

export function ImportClient() {
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setStatus({ ok: false, message: "Invalid JSON — please check the format and try again." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (res.ok || res.status === 207) {
        const errs = data.errors?.length ? ` (${data.errors.length} error(s))` : "";
        setStatus({
          ok: data.saved > 0,
          message: `Saved ${data.saved} match(es)${errs}. ${
            data.errors?.length
              ? "Errors: " + data.errors.map((e: { index: number; error: string }) => `[${e.index}] ${e.error}`).join("; ")
              : ""
          }`,
        });
        if (data.saved > 0) setJsonText("");
      } else {
        setStatus({ ok: false, message: data.error ?? "Upload failed." });
      }
    } catch {
      setStatus({ ok: false, message: "Network error — could not reach the API." });
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setJsonText((ev.target?.result as string) ?? "");
      setStatus(null);
    };
    reader.readAsText(file);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Import Match Data</h1>
            <p className="text-gray-400 text-sm mt-1">
              Paste JSON or upload a file. Accepts a single MatchData object or an array.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← Back to dashboard
          </Link>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload a .json file
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:rounded file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500 cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Or paste JSON directly
            </label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={18}
              placeholder={"{\n  \"id\": \"MID-2024-0001\",\n  \"gameMode\": \"Competitive 5v5\",\n  \"map\": \"Dust2\",\n  ...\n}"}
              className="w-full rounded-md bg-gray-950 border border-gray-700 px-3 py-2 text-sm font-mono text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
            />
          </div>

          {status && (
            <div
              className={`rounded-md px-4 py-3 text-sm ${
                status.ok
                  ? "bg-emerald-900/40 border border-emerald-700 text-emerald-300"
                  : "bg-red-900/40 border border-red-700 text-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading || !jsonText.trim()}
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Saving..." : "Import"}
            </button>
            {status?.ok && (
              <Link
                href="/"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View dashboard
              </Link>
            )}
          </div>
        </form>

        <details className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-300 select-none">
            Expected JSON schema
          </summary>
          <pre className="mt-3 text-xs text-gray-400 overflow-auto">{SCHEMA_HINT}</pre>
        </details>
      </div>
    </div>
  );
}

const SCHEMA_HINT = `// Single match object (or wrap multiple in an array [ ... ])
{
  "id": string,                 // unique match ID e.g. "MID-2024-9999"
  "gameMode": string,
  "map": string,
  "region": string,
  "startTime": string,          // ISO 8601 datetime
  "duration": number,           // seconds
  "integrityScore": number,     // 0-100
  "teams": [
    {
      "id": string,
      "name": string,
      "score": number,
      "players": [
        {
          "id": string,
          "name": string,
          "team": string,
          "integrityScore": number,
          "stats": {
            "kills": number, "deaths": number, "assists": number,
            "accuracy": number, "headshotRate": number,
            "avgReactionTimeMs": number, "damageDealt": number,
            "roundsPlayed": number
          },
          "anomalies": [],
          "behaviorProfile": {
            "aimConsistency": number, "movementPattern": number,
            "reactionProfile": number, "gameKnowledge": number,
            "economyManagement": number
          }
        }
      ]
    }
  ],
  "alerts": [],
  "timeline": []
}`;
