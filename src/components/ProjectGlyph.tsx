"use client";

import dynamic from "next/dynamic";
import {
  Cpu,
  ShieldCheck,
  CircuitBoard,
  Puzzle,
  Wrench,
  Package,
  FileText,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { ProjectCategory } from "@/types";
import { getCategoryStyle } from "@/lib/category-styles";
import { useFunMode } from "@/lib/fun-mode";

const MascotBadge = dynamic(() => import("./MascotBadge"), { ssr: false });

const categoryIcon: Record<ProjectCategory, LucideIcon> = {
  core: Cpu,
  verification: ShieldCheck,
  soc: CircuitBoard,
  ip: Puzzle,
  tools: Wrench,
  sdk: Package,
  docs: FileText,
  learning: BookOpen,
};

interface ProjectGlyphProps {
  projectId: string;
  primaryCategory: ProjectCategory;
  variant: "card" | "detail";
  showHoverName?: boolean;
}

// Default project visual: a professional category icon. When fun mode is on,
// the playful mascot system is loaded on demand instead.
export function ProjectGlyph({
  projectId,
  primaryCategory,
  variant,
  showHoverName = false,
}: ProjectGlyphProps) {
  const { funMode } = useFunMode();

  if (funMode) {
    return (
      <MascotBadge
        projectId={projectId}
        primaryCategory={primaryCategory}
        variant={variant}
        showHoverName={showHoverName}
      />
    );
  }

  const Icon = categoryIcon[primaryCategory] || Cpu;
  const { color } = getCategoryStyle(primaryCategory);
  const boxSize = variant === "card" ? "w-11 h-11" : "w-16 h-16";
  const iconSize = variant === "card" ? "w-5 h-5" : "w-7 h-7";

  return (
    <div
      className={`flex items-center justify-center ${boxSize} rounded-xl flex-shrink-0 border`}
      style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}
    >
      <Icon className={iconSize} style={{ color }} />
    </div>
  );
}
