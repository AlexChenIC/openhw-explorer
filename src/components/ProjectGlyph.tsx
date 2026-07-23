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
  primaryCategory: ProjectCategory;
  variant: "card" | "detail";
}

export function ProjectGlyph({ primaryCategory, variant }: ProjectGlyphProps) {
  const Icon = categoryIcon[primaryCategory] || Cpu;
  const { color } = getCategoryStyle(primaryCategory);
  const boxSize = variant === "card" ? "w-11 h-11" : "w-16 h-16";
  const iconSize = variant === "card" ? "w-5 h-5" : "w-7 h-7";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${boxSize} flex-shrink-0 rounded-lg border`}
      style={{ backgroundColor: `${color}18`, borderColor: `${color}4D` }}
    >
      <Icon className={iconSize} style={{ color }} />
    </div>
  );
}
