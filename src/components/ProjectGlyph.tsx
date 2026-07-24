import {
  Cpu,
  ScanSearch,
  CircuitBoard,
  Blocks,
  Wrench,
  Braces,
  FileText,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";
import { ProjectCategory } from "@/types";
import { getCategoryStyle } from "@/lib/category-styles";

const categoryIcon: Record<ProjectCategory, LucideIcon> = {
  core: Cpu,
  verification: ScanSearch,
  soc: CircuitBoard,
  ip: Blocks,
  tools: Wrench,
  sdk: Braces,
  docs: FileText,
  learning: BookOpenCheck,
};

interface ProjectGlyphProps {
  categories: ProjectCategory[];
  variant: "card" | "detail";
}

export function ProjectGlyph({ categories, variant }: ProjectGlyphProps) {
  const primaryCategory = categories[0] || "core";
  const secondaryCategory = categories[1];
  const Icon = categoryIcon[primaryCategory] || Cpu;
  const { color } = getCategoryStyle(primaryCategory);
  const boxSize = variant === "card" ? "h-10 w-10" : "h-14 w-14";
  const iconSize = variant === "card" ? "h-6 w-6" : "h-8 w-8";
  const secondaryBoxSize = variant === "card" ? "h-5 w-5" : "h-7 w-7";
  const secondaryIconSize = variant === "card" ? "h-3 w-3" : "h-4 w-4";
  const SecondaryIcon = secondaryCategory ? categoryIcon[secondaryCategory] : null;
  const secondaryColor = secondaryCategory
    ? getCategoryStyle(secondaryCategory).color
    : null;

  return (
    <div
      aria-hidden="true"
      className={`relative grid ${boxSize} flex-shrink-0 place-items-center rounded-md`}
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 13%, var(--bg-card))`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 30%, var(--border))`,
      }}
    >
      <Icon className={iconSize} strokeWidth={2.1} />
      {SecondaryIcon && secondaryColor && (
        <span
          className={`absolute -bottom-1 -right-1 grid ${secondaryBoxSize} place-items-center rounded-full`}
          style={{
            color: secondaryColor,
            backgroundColor: `color-mix(in srgb, ${secondaryColor} 16%, var(--bg-card))`,
            boxShadow: `0 0 0 2px var(--bg-card), inset 0 0 0 1px color-mix(in srgb, ${secondaryColor} 32%, var(--border))`,
          }}
        >
          <SecondaryIcon className={secondaryIconSize} strokeWidth={2.2} />
        </span>
      )}
    </div>
  );
}
