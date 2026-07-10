"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, SearchX } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { QuickFilters } from "./QuickFilters";
import { filterProjects } from "@/data/projects";
import { ProjectCategory, CoreType, VerificationType, UserRole } from "@/types";
import { trackEvent } from "@/lib/observability";

const PROJECTS_PAGE_SIZE = 12;

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
const coreTypes: CoreType[] = ["embedded-mcu", "linux-application", "low-power", "safety-critical"];
const verificationTypes: VerificationType[] = [
  "uvm-testbench",
  "formal-verification",
  "arch-compliance",
  "test-generation",
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

export function ProjectsSection() {
  const t = useTranslations("projects");
  const tf = useTranslations("filters");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.location.hash !== "#projects") return;

    window.requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ block: "start" });
    });
  }, []);

  const initialCategory = toCategory(searchParams.get("cat"));
  const initialRole = toRole(searchParams.get("role"));
  const initialCoreType = toCoreType(searchParams.get("core"));
  const initialVerificationType = toVerificationType(searchParams.get("verify"));
  const initialSearch = searchParams.get("q") || "";

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
  const [visibleLimit, setVisibleLimit] = useState(PROJECTS_PAGE_SIZE);

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
    setVisibleLimit(PROJECTS_PAGE_SIZE);
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

    setVisibleLimit(PROJECTS_PAGE_SIZE);
    setSearchQuery(nextQuery);
  };

  const handleClearAllFilters = () => {
    setActiveCategory("all");
    setActiveRole(null);
    setActiveCoreType(null);
    setActiveVerificationType(null);
    setSearchQuery("");
    setVisibleLimit(PROJECTS_PAGE_SIZE);

    trackEvent("project_filters_cleared");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (activeCategory !== "all") params.set("cat", activeCategory);
    if (activeRole) params.set("role", activeRole);
    if (activeCoreType) params.set("core", activeCoreType);
    if (activeVerificationType) params.set("verify", activeVerificationType);

    const trimmedSearch = searchQuery.trim();
    if (trimmedSearch) params.set("q", trimmedSearch);

    const nextSearch = params.toString();
    const currentSearch = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;

    if (currentSearch === nextSearch) return;

    const nextUrl = nextSearch
      ? `${window.location.pathname}?${nextSearch}#projects`
      : window.location.pathname;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [activeCategory, activeCoreType, activeRole, activeVerificationType, searchQuery]);

  const shownProjects = filteredProjects.slice(0, visibleLimit);
  const remainingProjectCount = Math.max(0, filteredProjects.length - shownProjects.length);
  const nextBatchSize = Math.min(PROJECTS_PAGE_SIZE, remainingProjectCount);

  // Get translated category name for header
  const getCategoryTitle = () => {
    if (activeCategory === "all") return t("title");
    const categoryName = tf(`categories.${activeCategory}`);
    return t("titleByCategory", { category: categoryName });
  };

  const resultSummaryLabel = t("found", { count: filteredProjects.length });

  const screenReaderAnnouncement =
    filteredProjects.length === 0
      ? t("noResultsAnnouncement")
      : t("resultsAnnouncement", { count: filteredProjects.length });

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

  const handleLoadMore = () => {
    const nextLimit = Math.min(visibleLimit + PROJECTS_PAGE_SIZE, filteredProjects.length);
    setVisibleLimit(nextLimit);
    trackEvent("project_results_expanded", {
      shown: nextLimit,
      total: filteredProjects.length,
    });
  };

  return (
    <section id="projects" className="section-projects py-12 scroll-mt-24 sm:py-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
              {getCategoryTitle()}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
              {t("directoryIntro")}
            </p>
          </div>
          <span className="text-sm font-medium tabular-nums text-[var(--text-secondary)]">
            {resultSummaryLabel}
          </span>
        </div>

        <QuickFilters
          activeCategory={activeCategory}
          activeRole={activeRole}
          activeCoreType={activeCoreType}
          activeVerificationType={activeVerificationType}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {screenReaderAnnouncement}
        </p>

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
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {shownProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {remainingProjectCount > 0 && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-xs tabular-nums text-[var(--text-tertiary)]">
                  {t("showing", {
                    shown: shownProjects.length,
                    total: filteredProjects.length,
                  })}
                </p>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
                >
                  {t("loadMore", { count: nextBatchSize })}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center mb-5">
              <SearchX className="h-7 w-7 text-[var(--text-tertiary)]" />
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
