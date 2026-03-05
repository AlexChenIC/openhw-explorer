"use client";

import { useState } from "react";
import {
  Search,
  X,
  LayoutGrid,
  Cpu,
  Wrench,
  ShieldCheck,
  FileText,
  BookOpen,
  Compass,
  ChevronDown,
  ChevronUp,
  Eye,
  GraduationCap,
  Briefcase,
  FlaskConical,
  GitPullRequest,
  Target,
  Layers,
  CircuitBoard,
  Puzzle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { quickFilterTags, filterConfig } from "@/data/filters";
import { ProjectCategory, CoreType, VerificationType, UserRole } from "@/types";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  Cpu,
  Wrench,
  ShieldCheck,
  FileText,
  BookOpen,
  Eye,
  GraduationCap,
  Briefcase,
  FlaskConical,
  GitPullRequest,
  CircuitBoard,
  Puzzle,
};

interface QuickFiltersProps {
  activeCategory: ProjectCategory | "all";
  activeRole: UserRole | null;
  activeCoreType: CoreType | null;
  activeVerificationType: VerificationType | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: {
    category: ProjectCategory | "all";
    role: UserRole | null;
    coreType: CoreType | null;
    verificationType: VerificationType | null;
  }) => void;
}

export function QuickFilters({
  activeCategory,
  activeRole,
  activeCoreType,
  activeVerificationType,
  searchQuery,
  onSearchChange,
  onFilterChange,
}: QuickFiltersProps) {
  const t = useTranslations("projects");
  const tf = useTranslations("filters");
  const [isSmartNavExpanded, setIsSmartNavExpanded] = useState(false);
  const smartNavContentId = "smart-navigator-content";

  const handleCategoryChange = (categoryId: ProjectCategory | "all") => {
    onFilterChange({
      category: categoryId,
      role: activeRole,
      coreType: categoryId === "core" ? activeCoreType : null,
      verificationType: categoryId === "verification" ? activeVerificationType : null,
    });
  };

  const handleRoleChange = (roleId: UserRole) => {
    onFilterChange({
      category: activeCategory,
      role: activeRole === roleId ? null : roleId,
      coreType: activeCategory === "core" ? activeCoreType : null,
      verificationType: activeCategory === "verification" ? activeVerificationType : null,
    });
  };

  const handleCoreTypeChange = (coreTypeId: CoreType) => {
    if (activeCategory !== "core") return;

    onFilterChange({
      category: activeCategory,
      role: activeRole,
      coreType: activeCoreType === coreTypeId ? null : coreTypeId,
      verificationType: null,
    });
  };

  const handleVerificationTypeChange = (verificationTypeId: VerificationType) => {
    if (activeCategory !== "verification") return;

    onFilterChange({
      category: activeCategory,
      role: activeRole,
      coreType: null,
      verificationType: activeVerificationType === verificationTypeId ? null : verificationTypeId,
    });
  };

  const getQuickTagLabel = (id: ProjectCategory | "all") => {
    switch (id) {
      case "all":
        return tf("all");
      case "core":
        return tf("core");
      case "verification":
        return tf("verification");
      case "soc":
        return tf("soc");
      case "ip":
        return tf("ip");
      case "tools":
        return tf("tools");
      case "learning":
        return tf("learning");
      case "sdk":
        return tf("sdk");
    }
  };

  const getRoleLabel = (id: UserRole) => {
    switch (id) {
      case "browsing":
        return tf("roles.browsing");
      case "student":
        return tf("roles.student");
      case "engineer":
        return tf("roles.engineer");
      case "researcher":
        return tf("roles.researcher");
      case "contributor":
        return tf("roles.contributor");
    }
  };

  const getCategoryLabel = (id: ProjectCategory) => {
    switch (id) {
      case "core":
        return tf("categories.core");
      case "verification":
        return tf("categories.verification");
      case "soc":
        return tf("categories.soc");
      case "ip":
        return tf("categories.ip");
      case "tools":
        return tf("categories.tools");
      case "learning":
        return tf("categories.learning");
      case "sdk":
        return tf("categories.sdk");
      case "docs":
        return "docs";
    }
  };

  const getCoreTypeLabel = (id: CoreType) => {
    switch (id) {
      case "embedded-mcu":
        return tf("coreTypes.embedded-mcu");
      case "linux-application":
        return tf("coreTypes.linux-application");
      case "high-performance":
        return tf("coreTypes.high-performance");
      case "low-power":
        return tf("coreTypes.low-power");
      case "safety-critical":
        return tf("coreTypes.safety-critical");
    }
  };

  const getVerificationTypeLabel = (id: VerificationType) => {
    switch (id) {
      case "uvm-testbench":
        return tf("verificationTypes.uvm-testbench");
      case "formal-verification":
        return tf("verificationTypes.formal-verification");
      case "force-riscv":
        return tf("verificationTypes.force-riscv");
      case "industrial-grade":
        return tf("verificationTypes.industrial-grade");
    }
  };

  const handleClearAll = () => {
    onFilterChange({
      category: "all",
      role: null,
      coreType: null,
      verificationType: null,
    });
  };

  return (
    <section className="bg-[var(--bg-card)] rounded-xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6 mb-8 border border-[var(--border)]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
          {t("quickFilters")}
        </h2>

        {/* Search Box */}
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
      </div>

      {/* Quick Tags */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
        {quickFilterTags.map((tag) => {
          const Icon = iconMap[tag.icon];
          const isActive = activeCategory === tag.id;
          return (
            <button
              type="button"
              key={tag.id}
              onClick={() => handleCategoryChange(tag.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {getQuickTagLabel(tag.id)}
            </button>
          );
        })}
      </div>

      {/* Smart Navigator Section */}
      <div className="pt-5 border-t border-[var(--border)]">
        {/* Smart Nav Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Compass className="w-[18px] h-[18px] text-[var(--primary)]" />
            <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
              {t("smartNavigator")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsSmartNavExpanded(!isSmartNavExpanded)}
            aria-expanded={isSmartNavExpanded}
            aria-controls={smartNavContentId}
            aria-label={isSmartNavExpanded ? t("collapseNavigator") : t("expandNavigator")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/25 text-[var(--primary)] text-[13px] font-medium hover:bg-[var(--primary)]/20 transition-colors"
          >
            {isSmartNavExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Expanded Content */}
        {isSmartNavExpanded && (
          <div id={smartNavContentId} className="space-y-4">
            {/* Role Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[var(--text-primary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {t("iAmA")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.roles.map((role) => {
                  const Icon = iconMap[role.icon];
                  const isActive = activeRole === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => handleRoleChange(role.id)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                          : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-subtle)]"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {getRoleLabel(role.id)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purpose Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[var(--text-primary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {t("lookingFor")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.categories.map((cat) => {
                  const Icon = iconMap[cat.icon];
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleCategoryChange(isActive ? "all" : cat.id)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                          : "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-subtle)]"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {getCategoryLabel(cat.id)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Type Row (conditional) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                    {t("coreType")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.coreTypes.map((coreType) => {
                  const isActive = activeCoreType === coreType.id;
                  const isEnabled = activeCategory === "core";
                  return (
                    <button
                      type="button"
                      key={coreType.id}
                      onClick={() => handleCoreTypeChange(coreType.id)}
                      disabled={!isEnabled}
                      aria-pressed={isActive && isEnabled}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all border border-dashed ${
                        isActive && isEnabled
                          ? "bg-[var(--primary)] text-white border-solid border-[var(--primary)] shadow-md shadow-[var(--primary)]/20"
                          : isEnabled
                            ? "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-subtle)]"
                            : "border-[var(--border)]/50 text-[var(--text-tertiary)] cursor-not-allowed opacity-40"
                      }`}
                    >
                      {getCoreTypeLabel(coreType.id)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification Type Row (conditional) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-tertiary)]">
                    {t("verificationType")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.verificationTypes.map((verifyType) => {
                  const isActive = activeVerificationType === verifyType.id;
                  const isEnabled = activeCategory === "verification";
                  return (
                    <button
                      type="button"
                      key={verifyType.id}
                      onClick={() => handleVerificationTypeChange(verifyType.id)}
                      disabled={!isEnabled}
                      aria-pressed={isActive && isEnabled}
                      className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all border border-dashed ${
                        isActive && isEnabled
                          ? "bg-[var(--primary)] text-white border-solid border-[var(--primary)] shadow-md shadow-[var(--primary)]/20"
                          : isEnabled
                            ? "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-subtle)]"
                            : "border-[var(--border)]/50 text-[var(--text-tertiary)] cursor-not-allowed opacity-40"
                      }`}
                    >
                      {getVerificationTypeLabel(verifyType.id)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-tertiary)]">{t("filtersApplyInstantly")}</p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-[13px] font-medium hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] transition-all"
                >
                  {t("clearAll")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
