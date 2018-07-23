"use client";

import type { PlayerData } from "@/lib/types";
import { getIntegrityColor } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function AnomalyChart({ players }: { players: PlayerData[] }) {
  const data = players
    .map((p) => ({
      name: p.name,
      score: p.integrityScore,
      anomalies: p.anomalies.length,
    }))
    .sort((a, b) => a.score - b.score);

  return (
    <div className="bg-surface-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-zinc-200 mb-1">Player Integrity Scores</h3>
      <p className="text-xs text-zinc-600 mb-4">Lower scores indicate more suspicious behavior</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#71717a", fontSize: 10 }}
            axisLine={{ stroke: "#1e1e2e" }}
            tickLine={false}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#52525b", fontSize: 10 }}
            axisLine={{ stroke: "#1e1e2e" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a24",
              border: "1px solid #2a2d3a",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getIntegrityColor(entry.score)} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
