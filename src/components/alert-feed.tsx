"use client";

import type { IntegrityAlert } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

const severityConfig = {
  critical: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

export function AlertFeed({ alerts }: { alerts: IntegrityAlert[] }) {
  return (
    <div className="bg-surface-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">Integrity Alerts</h3>
          <p className="text-xs text-zinc-600">
            {alerts.filter((a) => !a.resolved).length} unresolved
          </p>
        </div>
        <div className="flex gap-1">
          {["critical", "warning", "info"].map((sev) => {
            const count = alerts.filter((a) => a.severity === sev).length;
            if (count === 0) return null;
            const conf = severityConfig[sev as keyof typeof severityConfig];
            return (
              <span key={sev} className={cn("text-[10px] px-2 py-0.5 rounded-full", conf.bg, conf.color)}>
                {count} {sev}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => {
          const conf = severityConfig[alert.severity];
          const Icon = conf.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border",
                conf.bg,
                conf.border,
                alert.resolved && "opacity-50"
              )}
            >
              <div className="flex items-start gap-2.5">
                <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", conf.color)} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-200">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-[10px] text-zinc-600">
                      Confidence: {alert.confidence}%
                    </span>
                    {alert.resolved && (
                      <span className="text-[10px] text-emerald-500 flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
