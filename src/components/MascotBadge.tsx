"use client";

import { ProjectCategory } from "@/types";
import { getCategoryStyle } from "@/lib/category-styles";
import { RepoMascot, getRepoMascot } from "./RepoMascotMetroZoo";

// Loaded via next/dynamic from ProjectGlyph so the mascot SVG system stays
// out of the bundle unless fun mode is switched on.
interface MascotBadgeProps {
  projectId: string;
  primaryCategory: ProjectCategory;
  variant: "card" | "detail";
  showHoverName?: boolean;
}

export default function MascotBadge({
  projectId,
  primaryCategory,
  variant,
  showHoverName = false,
}: MascotBadgeProps) {
  const mascot = getRepoMascot(projectId, primaryCategory);
  const { color, emoji } = getCategoryStyle(primaryCategory);
  const boxSize = variant === "card" ? "w-11 h-11" : "w-16 h-16";
  const mascotSize = variant === "card" ? 34 : 48;

  return (
    <div
      className={`group/mascot relative flex items-center justify-center ${boxSize} rounded-xl flex-shrink-0 border`}
      style={{
        backgroundColor: mascot ? `${mascot.palette.accent}63` : `${color}15`,
        borderColor: mascot ? `${mascot.palette.shell}aa` : `${color}40`,
      }}
    >
      {mascot ? (
        <RepoMascot
          projectId={projectId}
          primaryCategory={primaryCategory}
          size={mascotSize}
          className="drop-shadow-sm saturate-125 transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <span className={variant === "card" ? "text-lg" : "text-2xl"} style={{ color }}>
          {emoji}
        </span>
      )}

      {mascot && showHoverName && (
        <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-[var(--text-secondary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {mascot.name}
        </span>
      )}
    </div>
  );
}
