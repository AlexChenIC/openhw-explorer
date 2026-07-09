"use client";

import { useState } from "react";
import { Compass, ChevronDown, ChevronUp, Eye, Layers, ShieldCheck, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { filterConfig } from "@/data/filters";
import { ProjectCategory, CoreType, VerificationType, UserRole } from "@/types";
import { filterIconMap } from "./filter-icons";

interface SmartNavigatorProps {
  activeCategory: ProjectCategory | "all";
  activeRole: UserRole | null;
  activeCoreType: CoreType | null;
  activeVerificationType: VerificationType | null;
  onCategoryChange: (category: ProjectCategory | "all") => void;
  onRoleChange: (role: UserRole) => void;
  onCoreTypeChange: (coreType: CoreType) => void;
  onVerificationTypeChange: (verificationType: VerificationType) => void;
  onClearAll: () => void;
}

// Guided filtering: role, purpose (category), and category-specific refinement
// rows. Refinement rows only render when their parent category is active, so
// nothing here ever looks clickable-but-disabled.
export function SmartNavigator({
  activeCategory,
  activeRole,
  activeCoreType,
  activeVerificationType,
  onCategoryChange,
  onRoleChange,
  onCoreTypeChange,
  onVerificationTypeChange,
  onClearAll,
}: SmartNavigatorProps) {
  const t = useTranslations("projects");
  const tf = useTranslations("filters");
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = "smart-navigator-content";

  const optionButtonClass = (isActive: boolean) =>
    `px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all border ${
      isActive
        ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md shadow-[var(--primary)]/20"
        : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-subtle)]"
    }`;

  return (
    <div className="pt-5 border-t border-[var(--border)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Compass className="w-[18px] h-[18px] text-[var(--primary)]" />
          <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
            {t("smartNavigator")}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-label={isExpanded ? t("collapseNavigator") : t("expandNavigator")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/25 text-[var(--primary)] text-[13px] font-medium hover:bg-[var(--primary)]/20 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div id={contentId} className="space-y-4">
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
                const Icon = filterIconMap[role.icon];
                const isActive = activeRole === role.id;
                return (
                  <button
                    type="button"
                    key={role.id}
                    onClick={() => onRoleChange(role.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 ${optionButtonClass(isActive)}`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {tf(`roles.${role.id}`)}
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
              {filterConfig.categories.map((category) => {
                const Icon = filterIconMap[category.icon];
                const isActive = activeCategory === category.id;
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => onCategoryChange(isActive ? "all" : category.id)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1.5 ${optionButtonClass(isActive)}`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {tf(`categories.${category.id}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Type Row — only when the Cores category is active */}
          {activeCategory === "core" && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--text-primary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {t("coreType")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.coreTypes.map((coreType) => {
                  const isActive = activeCoreType === coreType.id;
                  return (
                    <button
                      type="button"
                      key={coreType.id}
                      onClick={() => onCoreTypeChange(coreType.id)}
                      aria-pressed={isActive}
                      className={optionButtonClass(isActive)}
                    >
                      {tf(`coreTypes.${coreType.id}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Verification Type Row — only when the Verification category is active */}
          {activeCategory === "verification" && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <div className="sm:w-[110px] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--text-primary)]" />
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {t("verificationType")}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {filterConfig.verificationTypes.map((verifyType) => {
                  const isActive = activeVerificationType === verifyType.id;
                  return (
                    <button
                      type="button"
                      key={verifyType.id}
                      onClick={() => onVerificationTypeChange(verifyType.id)}
                      aria-pressed={isActive}
                      className={optionButtonClass(isActive)}
                    >
                      {tf(`verificationTypes.${verifyType.id}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-tertiary)]">{t("filtersApplyInstantly")}</p>
            <button
              type="button"
              onClick={onClearAll}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-[13px] font-medium hover:bg-[var(--bg-dark)] hover:text-[var(--text-primary)] transition-all"
            >
              {t("clearAll")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
