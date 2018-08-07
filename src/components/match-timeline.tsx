"use client";

import type { TimelineEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, { dot: string; label: string }> = {
  kill: { dot: "bg-zinc-500", label: "text-zinc-400" },
  round_end: { dot: "bg-blue-500", label: "text-blue-400" },
  alert: { dot: "bg-amber-500", label: "text-amber-400" },
  economy: { dot: "bg-purple-500", label: "text-purple-400" },
  objective: { dot: "bg-emerald-500", label: "text-emerald-400" },
};

export function MatchTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="bg-surface-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-zinc-200 mb-1">Match Timeline</h3>
      <p className="text-xs text-zinc-600 mb-4">Key events and anomaly triggers</p>

      <div className="space-y-0">
        {events.map((event, i) => {
          const style = typeStyles[event.type] || typeStyles.kill;
          const isCritical = event.severity === "critical";

          return (
            <div key={i} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={cn("w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0", isCritical ? "bg-red-500" : style.dot)} />
                {i < events.length - 1 && <div className="w-px flex-1 bg-border min-h-[24px]" />}
              </div>

              {/* Content */}
              <div className={cn("pb-4 flex-1", isCritical && "pb-5")}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-zinc-600">
                    R{event.round}
                  </span>
                  <span className={cn("text-[10px] font-medium", isCritical ? "text-red-400" : style.label)}>
                    {event.type.replace("_", " ").toUpperCase()}
                  </span>
                  {event.severity === "critical" && (
                    <span className="text-[9px] px-1 py-0.5 bg-red-500/10 text-red-400 rounded">
                      CRITICAL
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-300">{event.description}</p>
                <span className="text-[10px] text-zinc-600">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
