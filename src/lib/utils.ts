import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIntegrityColor(score: number): string {
  if (score >= 90) return "#10b981";
  if (score >= 70) return "#f59e0b";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}

export function getIntegrityLabel(score: number): string {
  if (score >= 90) return "Clean";
  if (score >= 70) return "Review";
  if (score >= 50) return "Suspect";
  return "Flagged";
}
