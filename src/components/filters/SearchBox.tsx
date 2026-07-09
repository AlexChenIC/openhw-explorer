"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBox({ searchQuery, onSearchChange }: SearchBoxProps) {
  const t = useTranslations("projects");

  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[var(--bg-dark)] border border-[var(--border)] focus-within:border-[var(--primary)]/50 transition-colors w-full sm:w-[280px]">
      <Search className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
      <input
        type="text"
        placeholder={t("search")}
        aria-label={t("search")}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label={t("clearSearch")}
          className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
