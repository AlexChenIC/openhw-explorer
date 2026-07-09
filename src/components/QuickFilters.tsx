"use client";

import { useTranslations } from "next-intl";
import { ProjectCategory, CoreType, VerificationType, UserRole } from "@/types";
import { SearchBox } from "./filters/SearchBox";
import { QuickTags } from "./filters/QuickTags";
import { SmartNavigator } from "./filters/SmartNavigator";

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

// Orchestrates the three filter surfaces: search, category quick tags, and
// the Smart Navigator (role + category-specific refinements).
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
        <SearchBox searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </div>

      <QuickTags activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <SmartNavigator
        activeCategory={activeCategory}
        activeRole={activeRole}
        activeCoreType={activeCoreType}
        activeVerificationType={activeVerificationType}
        onCategoryChange={handleCategoryChange}
        onRoleChange={handleRoleChange}
        onCoreTypeChange={handleCoreTypeChange}
        onVerificationTypeChange={handleVerificationTypeChange}
        onClearAll={handleClearAll}
      />
    </section>
  );
}
