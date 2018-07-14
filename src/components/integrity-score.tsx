"use client";

import { getIntegrityColor } from "@/lib/utils";

interface Props {
  label: string;
  score: number;
  isCount?: boolean;
}

export function IntegrityScore({ label, score, isCount }: Props) {
  const color = isCount
    ? score > 3 ? "#ef4444" : score > 0 ? "#f59e0b" : "#10b981"
    : getIntegrityColor(score);

  return (
    <div className="bg-surface-card border border-border rounded-xl p-4">
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold font-mono" style={{ color }}>
          {isCount ? score : `${score}%`}
        </span>
        {!isCount && (
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full mb-1.5">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${score}%`, backgroundColor: color }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
