"use client";

import { useId, useState } from "react";
import {
  BookOpen,
  FileText,
  Users,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project, ProjectKnowledge } from "@/types";
import type { GitHubRepoStats } from "@/data/projects";
import { getGitHubStatsMeta } from "@/data/projects";

interface ProjectKnowledgeSummary {
  papersCount: number;
  industryCount: number;
  educationCount: number;
  presentationsCount: number;
  articlesCount: number;
  ecosystemCount: number;
  notesCount: number;
  totalCount: number;
}

interface ProjectKnowledgeSectionProps {
  knowledge: ProjectKnowledge | null;
  summary: ProjectKnowledgeSummary | null;
  stats: GitHubRepoStats | null;
  launchStage?: Project["launchStage"];
}

export function ProjectKnowledgeSection({
  knowledge,
  summary,
  stats,
  launchStage,
}: ProjectKnowledgeSectionProps) {
  const t = useTranslations("projectDetail");
  const isBaseline = launchStage === "baseline";

  if (isBaseline) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
        <BookOpen className="w-6 h-6 text-[var(--text-tertiary)] mx-auto mb-2" />
        <p className="text-sm text-[var(--text-secondary)]">
          {t("launchStage.knowledgeLimitedTitle")}
        </p>
        <p className="text-xs text-[var(--text-tertiary)] mt-1">
          {t("launchStage.knowledgeLimitedHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      {stats && (
        <ActivityCard
          stats={stats}
          t={t}
          fetchedAt={String(getGitHubStatsMeta().fetchedAt ?? "")}
        />
      )}

      {/* Knowledge Base — summary badge only shown when papers exist */}
      {summary && summary.papersCount > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--primary)]" />
            {t("knowledge.title")}
          </h3>
          <div className="flex flex-wrap gap-3">
            <StatBadge
              icon={<FileText className="w-3 h-3" />}
              label={t("knowledge.papersCount", { count: summary.papersCount })}
              color="var(--primary)"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Academic Papers */}
        {knowledge && knowledge.academicPapers && knowledge.academicPapers.length > 0 && (
          <CollapsibleSection
            title={t("knowledge.papers")}
            icon={<FileText className="w-4 h-4" />}
            color="var(--primary)"
            defaultOpen
          >
            <div className="space-y-2">
              {knowledge.academicPapers.map((paper, i) => (
                <div key={i} className="p-3 rounded-lg bg-[var(--bg-subtle)]">
                  <p className="text-sm font-medium text-[var(--text-primary)] leading-snug mb-1">
                    {paper.title}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">{paper.authors}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {paper.venue}, {paper.year}
                  </p>
                  {(paper.url || paper.doi) && (
                    <a
                      href={paper.url || `https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-1"
                    >
                      {t("knowledge.viewPaper")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Coming Soon: other knowledge sections */}
        <div className="bg-[var(--bg-card)] border border-dashed border-[var(--border)] rounded-xl p-5 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            {t("knowledge.otherSectionsComingSoon")}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components ----

function ActivityCard({
  stats,
  t,
  fetchedAt,
}: {
  stats: GitHubRepoStats;
  t: ReturnType<typeof useTranslations>;
  fetchedAt?: string;
}) {
  const activityLevel =
    stats.recentCommits >= 10 ? "high" : stats.recentCommits >= 3 ? "moderate" : "low";
  const activityColor =
    activityLevel === "high"
      ? "var(--green)"
      : activityLevel === "moderate"
        ? "var(--orange)"
        : "var(--text-tertiary)";

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" style={{ color: activityColor }} />
        {t("activity.title")}
        <span
          className="px-2 py-0.5 rounded-md text-xs font-medium"
          style={{
            backgroundColor: `${activityColor}15`,
            color: activityColor,
          }}
        >
          {t(`activity.${activityLevel === "high" ? "highActivity" : activityLevel}`)}
        </span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <Users className="w-4 h-4 text-[var(--text-tertiary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{stats.contributorsCount}</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.contributors")}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <AlertCircle className="w-4 h-4 text-[var(--text-tertiary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{stats.openIssues}</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.openIssues")}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <GitCommit className="w-4 h-4 text-[var(--text-tertiary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{stats.recentCommits}</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.recentCommits")}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-[var(--bg-subtle)]">
          <GitPullRequest className="w-4 h-4 text-[var(--primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {stats.openPRsCount ?? 0}
          </p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.openPRs")}</p>
        </div>
      </div>
      {fetchedAt && (
        <p className="text-[10px] text-[var(--text-tertiary)] text-right mt-2">
          {t("activity.dataAsOf", {
            date: new Date(fetchedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          })}
        </p>
      )}
    </div>
  );
}

function StatBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium"
      style={{ backgroundColor: `${color}10`, color }}
    >
      {icon}
      {label}
    </span>
  );
}

function CollapsibleSection({
  title,
  icon,
  color,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionId = useId();
  const buttonId = `${sectionId}-button`;
  const contentId = `${sectionId}-content`;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-5 py-3.5 text-left hover:bg-[var(--bg-subtle)] transition-colors"
      >
        <span style={{ color }}>{icon}</span>
        <span className="flex-1 text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        )}
      </button>
      {isOpen && (
        <div id={contentId} role="region" aria-labelledby={buttonId} className="px-5 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
