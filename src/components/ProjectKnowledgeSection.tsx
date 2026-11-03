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
  ArrowDown,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Project, ProjectKnowledge } from "@/types";
import type { GitHubRepoStats } from "@/data/projects";
import { getGitHubStatsMeta } from "@/data/projects";

interface ProjectKnowledgeSummary {
  papersCount: number;
  industryCount: number;
  involvementCount: number;
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
  stats,
  launchStage,
}: ProjectKnowledgeSectionProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();
  const [papersOpen, setPapersOpen] = useState(true);
  const papersCount = knowledge?.academicPapers?.length ?? 0;
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
          locale={locale}
          fetchedAt={String(getGitHubStatsMeta().fetchedAt ?? "")}
        />
      )}

      {papersCount > 0 && (
        <nav
          aria-label={t("knowledge.title")}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--border)] pb-3"
        >
          <span className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--primary)]" />
            {t("knowledge.title")}
          </span>
          <a
            href="#academic-papers"
            onClick={() => setPapersOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-[var(--primary)] hover:bg-[var(--bg-subtle)] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            {t("knowledge.papersCount", { count: papersCount })}
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </nav>
      )}

      <div className="space-y-4">
        {/* Academic Papers */}
        {knowledge && knowledge.academicPapers && knowledge.academicPapers.length > 0 && (
          <CollapsibleSection
            id="academic-papers"
            title={t("knowledge.papers")}
            icon={<FileText className="w-4 h-4" />}
            color="var(--primary)"
            isOpen={papersOpen}
            onToggle={() => setPapersOpen((open) => !open)}
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
  locale,
}: {
  stats: GitHubRepoStats;
  t: ReturnType<typeof useTranslations>;
  fetchedAt?: string;
  locale: string;
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
          <p className="text-lg font-bold text-[var(--text-primary)]">{stats.openPRsCount ?? 0}</p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.openPRs")}</p>
        </div>
      </div>
      {fetchedAt && (
        <p className="text-[10px] text-[var(--text-tertiary)] text-right mt-2">
          {t("activity.dataAsOf", {
            date: new Date(fetchedAt).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
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

function CollapsibleSection({
  id,
  title,
  icon,
  color,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const sectionId = useId();
  const buttonId = `${sectionId}-button`;
  const contentId = `${sectionId}-content`;

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={buttonId}
      className="scroll-mt-28 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
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
      <div id={contentId} hidden={!isOpen} className="px-5 pb-4">
        {children}
      </div>
    </section>
  );
}
