"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProjectCard } from "./ProjectCard";
import { QuickFilters } from "./QuickFilters";
import { filterProjects, launchCuratedProjectIds } from "@/data/projects";
import { ProjectCategory, CoreType, VerificationType, UserRole } from "@/types";
import { trackEvent } from "@/lib/observability";

type ProjectDisplayMode = "curated" | "all";

const launchCuratedProjectSet = new Set<string>(launchCuratedProjectIds);

const projectCategories: ProjectCategory[] = [
  "core",
  "verification",
  "tools",
  "docs",
  "learning",
  "sdk",
  "soc",
  "ip",
];

const userRoles: UserRole[] = ["browsing", "student", "engineer", "researcher", "contributor"];
const coreTypes: CoreType[] = [
  "embedded-mcu",
  "linux-application",
  "high-performance",
  "low-power",
  "safety-critical",
];
const verificationTypes: VerificationType[] = [
  "uvm-testbench",
  "formal-verification",
  "force-riscv",
  "industrial-grade",
];

function toCategory(value: string | null): ProjectCategory | "all" {
  if (!value) return "all";
  return projectCategories.includes(value as ProjectCategory) ? (value as ProjectCategory) : "all";
}

function toRole(value: string | null): UserRole | null {
  if (!value) return null;
  return userRoles.includes(value as UserRole) ? (value as UserRole) : null;
}

function toCoreType(value: string | null): CoreType | null {
  if (!value) return null;
  return coreTypes.includes(value as CoreType) ? (value as CoreType) : null;
}

function toVerificationType(value: string | null): VerificationType | null {
  if (!value) return null;
  return verificationTypes.includes(value as VerificationType) ? (value as VerificationType) : null;
}

function toDisplayMode(value: string | null): ProjectDisplayMode {
  return value === "all" ? "all" : "curated";
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const tf = useTranslations("filters");
  const searchParams = useSearchParams();

  const initialCategory = toCategory(searchParams.get("cat"));
  const initialRole = toRole(searchParams.get("role"));
  const initialCoreType = toCoreType(searchParams.get("core"));
  const initialVerificationType = toVerificationType(searchParams.get("verify"));
  const initialSearch = searchParams.get("q") || "";
  const initialDisplayMode = toDisplayMode(searchParams.get("view"));

  // Filter states
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(initialCategory);
  const [activeRole, setActiveRole] = useState<UserRole | null>(initialRole);
  const [activeCoreType, setActiveCoreType] = useState<CoreType | null>(
    initialCategory === "core" ? initialCoreType : null,
  );
  const [activeVerificationType, setActiveVerificationType] = useState<VerificationType | null>(
    initialCategory === "verification" ? initialVerificationType : null,
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [displayMode, setDisplayMode] = useState<ProjectDisplayMode>(initialDisplayMode);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeRole !== null ||
    activeCoreType !== null ||
    activeVerificationType !== null ||
    searchQuery.length > 0;

  // Filter projects based on current selections
  const filteredProjects = useMemo(() => {
    return filterProjects({
      category: activeCategory,
      coreType: activeCoreType || undefined,
      verificationType: activeVerificationType || undefined,
      role: activeRole || undefined,
      search: searchQuery || undefined,
    });
  }, [activeCategory, activeRole, activeCoreType, activeVerificationType, searchQuery]);

  // Handle filter changes from QuickFilters component
  const handleFilterChange = (filters: {
    category: ProjectCategory | "all";
    role: UserRole | null;
    coreType: CoreType | null;
    verificationType: VerificationType | null;
  }) => {
    setActiveCategory(filters.category);
    setActiveRole(filters.role);
    setActiveCoreType(filters.coreType);
    setActiveVerificationType(filters.verificationType);

    trackEvent("project_filters_changed", {
      category: filters.category,
      role: filters.role || "none",
      coreType: filters.coreType || "none",
      verificationType: filters.verificationType || "none",
      hasSearch: searchQuery.trim().length > 0,
    });
  };

  const handleSearchChange = (nextQuery: string) => {
    const previousHasSearch = searchQuery.trim().length > 0;
    const nextHasSearch = nextQuery.trim().length > 0;

    if (!previousHasSearch && nextHasSearch) {
      trackEvent("project_search_started", {
        queryLength: nextQuery.trim().length,
      });
    } else if (previousHasSearch && !nextHasSearch) {
      trackEvent("project_search_cleared");
    }

    setSearchQuery(nextQuery);
  };

  const handleDisplayModeChange = (nextMode: ProjectDisplayMode) => {
    if (nextMode === displayMode) return;
    setDisplayMode(nextMode);
    trackEvent("project_view_mode_changed", {
      mode: nextMode,
    });
  };

  const handleClearAllFilters = () => {
    setActiveCategory("all");
    setActiveRole(null);
    setActiveCoreType(null);
    setActiveVerificationType(null);
    setSearchQuery("");
    setDisplayMode("curated");

    trackEvent("project_filters_cleared");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (activeCategory !== "all") params.set("cat", activeCategory);
    if (activeRole) params.set("role", activeRole);
    if (activeCoreType) params.set("core", activeCoreType);
    if (activeVerificationType) params.set("verify", activeVerificationType);

    if (!hasActiveFilters && displayMode === "all") {
      params.set("view", "all");
    }

    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) params.set("q", trimmedSearch);

    const nextSearch = params.toString();
    const currentSearch = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;

    if (currentSearch === nextSearch) return;

    const nextUrl = nextSearch
      ? `${window.location.pathname}?${nextSearch}`
      : window.location.pathname;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [
    activeCategory,
    activeCoreType,
    activeRole,
    activeVerificationType,
    displayMode,
    hasActiveFilters,
    searchQuery,
  ]);

  const visibleProjects = useMemo(() => {
    if (hasActiveFilters || displayMode === "all") {
      return filteredProjects;
    }

    return filteredProjects.filter((project) => launchCuratedProjectSet.has(project.id));
  }, [displayMode, filteredProjects, hasActiveFilters]);

  // Get translated category name for header
  const getCategoryTitle = () => {
    if (!hasActiveFilters && displayMode === "curated") return t("curatedTitle");
    if (activeCategory === "all") return t("title");
    const categoryName = tf(`categories.${activeCategory}`);
    return t("titleByCategory", { category: categoryName });
  };

  const resultSummaryLabel =
    !hasActiveFilters && displayMode === "curated"
      ? t("curatedSummary", {
          shown: visibleProjects.length,
          total: filteredProjects.length,
        })
      : t("found", { count: visibleProjects.length });

  const screenReaderAnnouncement =
    visibleProjects.length === 0
      ? t("noResultsAnnouncement")
      : !hasActiveFilters && displayMode === "curated"
        ? t("curatedResultsAnnouncement", {
            shown: visibleProjects.length,
            total: filteredProjects.length,
          })
        : t("resultsAnnouncement", { count: visibleProjects.length });

  const activeFilterChips = useMemo(() => {
    const chips: string[] = [];

    if (activeCategory !== "all") {
      chips.push(tf(`categories.${activeCategory}`));
    }
    if (activeRole) {
      chips.push(tf(`roles.${activeRole}`));
    }
    if (activeCoreType) {
      chips.push(tf(`coreTypes.${activeCoreType}`));
    }
    if (activeVerificationType) {
      chips.push(tf(`verificationTypes.${activeVerificationType}`));
    }

    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) {
      chips.push(t("searchChip", { query: trimmedSearch }));
    }

    return chips;
  }, [activeCategory, activeCoreType, activeRole, activeVerificationType, searchQuery, t, tf]);

  return (
    <section id="projects" className="section-projects py-12 sm:py-16 scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Filters */}
        <QuickFilters
          activeCategory={activeCategory}
          activeRole={activeRole}
          activeCoreType={activeCoreType}
          activeVerificationType={activeVerificationType}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
              {getCategoryTitle()}
            </h2>
            {(hasActiveFilters || displayMode === "curated") && (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
                {resultSummaryLabel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!hasActiveFilters && (
              <label className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                <span className="hidden sm:inline">{t("viewModeLabel")}</span>
                <select
                  value={displayMode}
                  onChange={(event) =>
                    handleDisplayModeChange(event.target.value as ProjectDisplayMode)
                  }
                  className="px-2.5 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-xs sm:text-sm focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="curated">{t("viewModeCurated")}</option>
                  <option value="all">{t("viewModeAll")}</option>
                </select>
              </label>
            )}

            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {resultSummaryLabel}
            </span>
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {screenReaderAnnouncement}
        </p>

        {!hasActiveFilters && displayMode === "curated" && (
          <p className="mb-6 text-xs sm:text-sm text-[var(--text-tertiary)]">
            {t("curatedModeHint")}
          </p>
        )}

        {activeFilterChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--text-tertiary)]">{t("activeFiltersLabel")}</span>
            {activeFilterChips.map((chip, index) => (
              <span
                key={`${chip}-${index}`}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-subtle-hover)] text-[var(--text-secondary)] text-xs"
              >
                {chip}
              </span>
            ))}
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="ml-auto px-3 py-1.5 rounded-md border border-[var(--border)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-colors"
            >
              {t("clearAll")}
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center mb-5">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              {t("noResults")}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              {t("noResultsHint")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
