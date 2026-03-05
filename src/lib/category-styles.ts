import { ProjectStatus } from "@/types";

// Category visual style mapping
export function getCategoryStyle(category: string): { color: string; emoji: string } {
  if (category.includes("core")) return { color: "var(--green)", emoji: "⚡" };
  if (category.includes("verification")) return { color: "var(--purple)", emoji: "✓" };
  if (category.includes("soc")) return { color: "var(--orange)", emoji: "🔲" };
  if (category.includes("ip")) return { color: "var(--primary)", emoji: "🧩" };
  if (category.includes("tools")) return { color: "var(--primary)", emoji: "🔧" };
  if (category.includes("learning")) return { color: "var(--green)", emoji: "📚" };
  return { color: "var(--primary)", emoji: "📄" };
}

// Status visual config
export const statusConfig: Record<ProjectStatus, { color: string; bg: string }> = {
  active: { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  stable: { color: "text-blue-400", bg: "bg-blue-400/10" },
  experimental: { color: "text-amber-400", bg: "bg-amber-400/10" },
  archived: { color: "text-gray-400", bg: "bg-gray-400/10" },
};
