import { ProjectCategory, ProjectStatus } from "@/types";

const categoryColor: Record<ProjectCategory, string> = {
  core: "var(--green)",
  verification: "var(--purple)",
  soc: "var(--orange)",
  ip: "var(--primary)",
  tools: "var(--cyan)",
  sdk: "var(--primary)",
  docs: "var(--text-secondary)",
  learning: "var(--green)",
};

export function getCategoryStyle(category: string): { color: string } {
  return {
    color: categoryColor[category as ProjectCategory] || "var(--primary)",
  };
}

// Status visual config
export const statusConfig: Record<ProjectStatus, { color: string; bg: string }> = {
  active: { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  stable: { color: "text-blue-400", bg: "bg-blue-400/10" },
  completed: { color: "text-sky-400", bg: "bg-sky-400/10" },
  inactive: { color: "text-slate-400", bg: "bg-slate-400/10" },
  experimental: { color: "text-amber-400", bg: "bg-amber-400/10" },
  archived: { color: "text-gray-400", bg: "bg-gray-400/10" },
  deprecated: { color: "text-rose-400", bg: "bg-rose-400/10" },
};
