"use client";

import { useTranslations } from "next-intl";
import { quickFilterTags } from "@/data/filters";
import { ProjectCategory } from "@/types";
import { filterIconMap } from "./filter-icons";

interface QuickTagsProps {
  activeCategory: ProjectCategory | "all";
  onCategoryChange: (category: ProjectCategory | "all") => void;
}

export function QuickTags({ activeCategory, onCategoryChange }: QuickTagsProps) {
  const tf = useTranslations("filters");

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
      {quickFilterTags.map((tag) => {
        const Icon = filterIconMap[tag.icon];
        const isActive = activeCategory === tag.id;
        return (
          <button
            type="button"
            key={tag.id}
            onClick={() => onCategoryChange(tag.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
              isActive
                ? "bg-[var(--primary)] text-white"
                : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {tf(tag.id)}
          </button>
        );
      })}
    </div>
  );
}
