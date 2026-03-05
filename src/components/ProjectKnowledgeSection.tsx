"use client";

import { useId, useState } from "react";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Presentation,
  FileText,
  Network,
  Users,
  GitCommit,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project, ProjectKnowledge } from "@/types";
import type { GitHubRepoStats } from "@/data/projects";

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
      {stats && <ActivityCard stats={stats} t={t} />}

      {/* Knowledge Base */}
      {summary && summary.totalCount > 0 ? (
        <>
          {/* Summary Bar */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--primary)]" />
              {t("knowledge.title")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {summary.papersCount > 0 && (
                <StatBadge
                  icon={<FileText className="w-3 h-3" />}
                  label={t("knowledge.papersCount", {
                    count: summary.papersCount,
                  })}
                  color="var(--primary)"
                />
              )}
              {summary.industryCount > 0 && (
                <StatBadge
                  icon={<Building2 className="w-3 h-3" />}
                  label={t("knowledge.industryCount", {
                    count: summary.industryCount,
                  })}
                  color="var(--green)"
                />
              )}
              {summary.educationCount > 0 && (
                <StatBadge
                  icon={<GraduationCap className="w-3 h-3" />}
                  label={t("knowledge.educationCount", {
                    count: summary.educationCount,
                  })}
                  color="var(--orange)"
                />
              )}
              {summary.presentationsCount > 0 && (
                <StatBadge
                  icon={<Presentation className="w-3 h-3" />}
                  label={t("knowledge.presentationsCount", {
                    count: summary.presentationsCount,
                  })}
                  color="var(--purple)"
                />
              )}
              {summary.articlesCount > 0 && (
                <StatBadge
                  icon={<FileText className="w-3 h-3" />}
                  label={t("knowledge.articlesCount", {
                    count: summary.articlesCount,
                  })}
                  color="var(--cyan)"
                />
              )}
              {summary.ecosystemCount > 0 && (
                <StatBadge
                  icon={<Network className="w-3 h-3" />}
                  label={`${summary.ecosystemCount} ${t("knowledge.ecosystem")}`}
                  color="var(--text-secondary)"
                />
              )}
            </div>
          </div>

          {/* Knowledge Details */}
          {knowledge && (
            <div className="space-y-4">
              {/* Academic Papers */}
              {knowledge.academicPapers && knowledge.academicPapers.length > 0 && (
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

              {/* Industry Adoption */}
              {knowledge.industryAdoption && knowledge.industryAdoption.length > 0 && (
                <CollapsibleSection
                  title={t("knowledge.industry")}
                  icon={<Building2 className="w-4 h-4" />}
                  color="var(--green)"
                >
                  <div className="space-y-2">
                    {knowledge.industryAdoption.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[var(--bg-subtle)]">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {item.entity}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{item.useCase}</p>
                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-1"
                          >
                            {t("knowledge.source")}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* Educational Use */}
              {knowledge.educationalUse && knowledge.educationalUse.length > 0 && (
                <CollapsibleSection
                  title={t("knowledge.education")}
                  icon={<GraduationCap className="w-4 h-4" />}
                  color="var(--orange)"
                >
                  <div className="space-y-2">
                    {knowledge.educationalUse.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[var(--bg-subtle)]">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {item.university}
                        </p>
                        {item.course && (
                          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                            {item.course}
                            {item.professor && ` — ${item.professor}`}
                          </p>
                        )}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-1"
                          >
                            {t("knowledge.viewMore")}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* Presentations */}
              {knowledge.presentations && knowledge.presentations.length > 0 && (
                <CollapsibleSection
                  title={t("knowledge.presentations")}
                  icon={<Presentation className="w-4 h-4" />}
                  color="var(--purple)"
                >
                  <div className="space-y-2">
                    {knowledge.presentations.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[var(--bg-subtle)]">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          {item.event} · {item.date}
                          {item.speaker && ` · ${item.speaker}`}
                        </p>
                        {(item.url || item.videoUrl) && (
                          <a
                            href={item.videoUrl || item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline mt-1"
                          >
                            {t("knowledge.viewMore")}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {knowledge.articles && knowledge.articles.length > 0 && (
                <CollapsibleSection
                  title={t("knowledge.articles")}
                  icon={<BookOpen className="w-4 h-4" />}
                  color="var(--cyan)"
                >
                  <div className="space-y-2">
                    {knowledge.articles.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[var(--bg-subtle)]">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          {item.platform}
                          {item.author && ` · ${item.author}`}
                          {item.date && ` · ${item.date}`}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--bg-subtle-strong)] text-[var(--text-tertiary)] uppercase">
                            {item.language}
                          </span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
                          >
                            {t("knowledge.viewMore")}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* Ecosystem */}
              {knowledge.ecosystem && knowledge.ecosystem.length > 0 && (
                <CollapsibleSection
                  title={t("knowledge.ecosystem")}
                  icon={<Network className="w-4 h-4" />}
                  color="var(--cyan)"
                >
                  <div className="space-y-1.5">
                    {knowledge.ecosystem.map((link, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-subtle)]"
                      >
                        <span className="text-xs font-medium text-[var(--text-primary)]">
                          {link.project}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--bg-subtle-strong)] text-[var(--text-tertiary)]">
                          {link.relationship}
                        </span>
                        {link.description && (
                          <span className="text-xs text-[var(--text-tertiary)]">
                            — {link.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}
            </div>
          )}
        </>
      ) : (
        /* No knowledge data */
        !stats && (
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
            <BookOpen className="w-6 h-6 text-[var(--text-tertiary)] mx-auto mb-2" />
            <p className="text-sm text-[var(--text-tertiary)]">{t("knowledge.noData")}</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">{t("knowledge.noDataHint")}</p>
          </div>
        )
      )}
    </div>
  );
}

// ---- Sub-components ----

function ActivityCard({
  stats,
  t,
}: {
  stats: GitHubRepoStats;
  t: ReturnType<typeof useTranslations>;
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
          <GitCommit className="w-4 h-4 text-[var(--green)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {stats.goodFirstIssueCount}
          </p>
          <p className="text-[10px] text-[var(--text-tertiary)]">{t("activity.goodFirstIssues")}</p>
        </div>
      </div>
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
