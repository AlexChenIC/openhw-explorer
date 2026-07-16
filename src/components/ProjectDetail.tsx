"use client";

import {
  ArrowLeft,
  Star,
  GitFork,
  ExternalLink,
  Github,
  BookOpen,
  ChevronRight,
  Home,
  Flag,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { Project, ProjectKnowledge } from "@/types";
import { getCategoryStyle, statusConfig } from "@/lib/category-styles";
import { ProjectKnowledgeSection } from "./ProjectKnowledgeSection";
import { ProjectGlyph } from "./ProjectGlyph";
import type { GitHubRepoStats } from "@/data/projects";
import { externalLinks } from "@/data/external-links";
import { trackEvent } from "@/lib/observability";

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

interface ProjectDetailProps {
  project: Project;
  relatedProjects: Project[];
  knowledge: ProjectKnowledge | null;
  knowledgeSummary: ProjectKnowledgeSummary | null;
  githubStats: GitHubRepoStats | null;
}

function getReviewMeta(status?: Project["descriptionReviewStatus"]) {
  if (status === "reviewed") {
    return {
      labelKey: "profile.reviewed",
      className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };
  }
  if (status === "needs-review") {
    return {
      labelKey: "profile.needsReview",
      className: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    };
  }
  return {
    labelKey: "profile.auto",
    className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  };
}

function getSourceTierMeta(tier?: Project["descriptionSourceTier"]) {
  if (tier === "official") {
    return {
      labelKey: "profile.tierOfficial",
      className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };
  }
  if (tier === "trusted") {
    return {
      labelKey: "profile.tierTrusted",
      className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    };
  }
  return {
    labelKey: "profile.tierCommunity",
    className: "bg-[var(--bg-subtle)] text-[var(--text-tertiary)] border-[var(--border)]",
  };
}

export function ProjectDetail({
  project,
  relatedProjects,
  knowledge,
  knowledgeSummary,
  githubStats,
}: ProjectDetailProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();
  const tf = useTranslations("filters");
  const searchParams = useSearchParams();
  const numberFormatter = new Intl.NumberFormat(locale);
  const formatNumber = (value: number) => numberFormatter.format(value);
  const returnQuery = searchParams.toString();
  const projectListHref = returnQuery ? `/?${returnQuery}#projects` : "/#projects";
  const getProjectDetailHref = (projectId: string) =>
    returnQuery ? `/projects/${projectId}?${returnQuery}` : `/projects/${projectId}`;
  const status = statusConfig[project.status];
  const statusSource = project.statusSource || "editorial";
  const primaryCategory = project.category[0];
  const { color } = getCategoryStyle(primaryCategory);
  const reviewMeta = getReviewMeta(project.descriptionReviewStatus);
  const sourceTierMeta = getSourceTierMeta(project.descriptionSourceTier);
  const sourceUrls = project.descriptionSourceUrls || [];
  const sourceCount = project.descriptionSourceCount ?? sourceUrls.length;
  const primarySourceUrl = sourceUrls[0];
  const additionalSourceUrls = sourceUrls.slice(1);
  const primaryRole = project.suitableFor?.[0] || null;
  const quickStartUrl = project.docs || project.github || project.website || null;
  const quickStartLabel = project.docs
    ? t("quickStart.startWithDocs")
    : project.github
      ? t("quickStart.startWithGithub")
      : project.website
        ? t("quickStart.startWithWebsite")
        : null;
  const isBaseline = project.launchStage === "baseline";

  const handleReportIssue = () => {
    const url =
      typeof window === "undefined"
        ? "unknown"
        : `${window.location.origin}${window.location.pathname}`;
    trackEvent("project_issue_report_opened", { projectId: project.id });
    const params = new URLSearchParams({
      title: t("reportIssueTitle", { project: project.name }),
      body: t("reportIssueBody", { project: project.name, url }),
      labels: "content",
    });
    window.open(`${externalLinks.feedbackIssues}?${params.toString()}`, "_blank", "noopener");
  };

  useEffect(() => {
    trackEvent("project_detail_view", {
      projectId: project.id,
      category: primaryCategory,
      status: project.status,
      locale,
    });
  }, [locale, primaryCategory, project.id, project.status]);

  return (
    <div className="section-projects py-8 sm:py-12">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t("home")}</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={projectListHref}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            {t("projects")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-secondary)]">{project.name}</span>
        </nav>

        {/* Back button */}
        <Link
          href={projectListHref}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToList")}
        </Link>

        {/* Project Header Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-6">
          {/* Top: Icon + Title + Status */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <ProjectGlyph
              projectId={project.id}
              primaryCategory={primaryCategory}
              variant="detail"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  {project.name}
                </h1>
                <span
                  title={t(`statusSource.${statusSource}`)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium ${status.color} ${status.bg}`}
                >
                  {t(`status.${project.status}`)}
                </span>
                {project.statusSourceUrl ? (
                  <a
                    href={project.statusSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 text-[10px] font-medium text-[var(--text-tertiary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                  >
                    {t(`statusSource.${statusSource}`)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="rounded-md border border-[var(--border)] px-2 py-1 text-[10px] font-medium text-[var(--text-tertiary)]">
                    {t(`statusSource.${statusSource}`)}
                  </span>
                )}
                {project.featured && (
                  <span className="px-2.5 py-1 rounded-md bg-[var(--green)]/15 text-[var(--green)] text-xs font-semibold">
                    {t("featured")}
                  </span>
                )}
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                {isBaseline ? (
                  <>
                    <span className="px-2 py-0.5 rounded border bg-amber-500/10 text-amber-300 border-amber-500/20">
                      {t("launchStage.baselineBadge")}
                    </span>
                    <span>{t("launchStage.baselineMeta")}</span>
                  </>
                ) : (
                  <>
                    <span className={`px-2 py-0.5 rounded border ${reviewMeta.className}`}>
                      {t(reviewMeta.labelKey)}
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${sourceTierMeta.className}`}>
                      {t(sourceTierMeta.labelKey)}
                    </span>
                    {project.descriptionVerifiedAt && (
                      <span>
                        {t("profile.verifiedAt", { date: project.descriptionVerifiedAt })}
                      </span>
                    )}
                    {sourceCount > 0 && <span>{t("profile.sources", { count: sourceCount })}</span>}
                    {primarySourceUrl && (
                      <a
                        href={primarySourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
                      >
                        {t("profile.primarySource")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {additionalSourceUrls.length > 0 && (
                      <details className="group">
                        <summary className="cursor-pointer text-[var(--primary)] hover:underline marker:text-[var(--text-tertiary)]">
                          {t("profile.moreSources", { count: additionalSourceUrls.length })}
                        </summary>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          {additionalSourceUrls.map((sourceUrl, index) => (
                            <a
                              key={sourceUrl}
                              href={sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
                            >
                              {t("profile.sourceItem", { index: index + 2 })}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </details>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-[var(--text-tertiary)] uppercase">
                  {isBaseline ? t("launchStage.scopeTitle") : t("quickStart.title")}
                </p>
                {isBaseline && (
                  <p className="text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed">
                    {t("launchStage.scopeDescription")}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle-strong)] text-[11px] text-[var(--text-secondary)]">
                    {t("quickStart.categoryChip", {
                      value: tf(`categories.${primaryCategory}`),
                    })}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle-strong)] text-[11px] text-[var(--text-secondary)]">
                    {t("quickStart.statusChip", {
                      value: t("statusBadge", {
                        source: t(`statusSourceShort.${statusSource}`),
                        status: t(`status.${project.status}`),
                      }),
                    })}
                  </span>
                  {primaryRole && (
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle-strong)] text-[11px] text-[var(--text-secondary)]">
                      {t("quickStart.roleChip", {
                        value: tf(`roles.${primaryRole}`),
                      })}
                    </span>
                  )}
                </div>
              </div>

              {quickStartUrl && quickStartLabel && (
                <a
                  href={quickStartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--text-tertiary)] hover:bg-[var(--bg-card-hover)]"
                >
                  {quickStartLabel}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* At a glance: verified key facts from the reviewed profile */}
          {project.keyFacts && project.keyFacts.length > 0 && (
            <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5">
              <p className="mb-3 text-xs font-semibold tracking-wide text-[var(--text-tertiary)] uppercase">
                {t("atAGlance.title")}
              </p>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {project.keyFacts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]/60" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Further resources: curated, verified external links */}
          {project.furtherResources && project.furtherResources.length > 0 && (
            <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5">
              <p className="mb-3 text-xs font-semibold tracking-wide text-[var(--text-tertiary)] uppercase">
                {t("furtherResources.title")}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {project.furtherResources.map((resource) => {
                  const localizedNote =
                    locale !== "zh"
                      ? resource.note
                      : resource.url.includes("shop.elsevier.com/books/")
                        ? t("furtherResources.sourceType.officialPurchase")
                        : resource.url.includes("pages.hmc.edu/harris/ddca/rvsocd")
                          ? t("furtherResources.sourceType.companionMaterials")
                          : resource.url === "https://openhwgroup.github.io/cva6/"
                            ? t("furtherResources.sourceType.ciDashboard")
                            : resource.url.includes("docs.openhwgroup.org")
                              ? t("furtherResources.sourceType.officialDocs")
                              : resource.url.includes("github.com")
                                ? t("furtherResources.sourceType.projectSource")
                                : resource.url.includes("doi.org") ||
                                    resource.url.includes("arxiv.org")
                                  ? t("furtherResources.sourceType.publication")
                                  : t("furtherResources.sourceType.relatedSource");

                  return (
                    <a
                      key={resource.url}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2.5 transition-all hover:border-[var(--primary)]/40"
                    >
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--primary)]" />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                          {resource.label}
                        </span>
                        {localizedNote && (
                          <span className="block text-[11px] leading-relaxed text-[var(--text-tertiary)]">
                            {localizedNote}
                          </span>
                        )}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-4 border-t border-[var(--border)]">
            {project.stars !== undefined && (
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">{formatNumber(project.stars)}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{t("metrics.stars")}</span>
              </div>
            )}
            {project.forks !== undefined && (
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <GitFork className="w-4 h-4" />
                <span className="text-sm font-medium">{formatNumber(project.forks)}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{t("metrics.forks")}</span>
              </div>
            )}
            {project.language && (
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm">{project.language}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-md shadow-[var(--primary)]/20"
              >
                <Github className="w-4 h-4" />
                {t("viewOnGitHub")}
              </a>
            )}
            {project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all"
              >
                <BookOpen className="w-4 h-4" />
                {t("documentation")}
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--bg-card-hover)] hover:border-[var(--text-tertiary)] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {t("website")}
              </a>
            )}
            <button
              type="button"
              onClick={handleReportIssue}
              className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              {t("reportIssue")}
            </button>
          </div>
        </div>

        {isBaseline && (
          <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-amber-300 mb-1.5">
              {t("launchStage.noticeTitle")}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t("launchStage.noticeBody")}
            </p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Categories */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              {t("categories")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.category.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium"
                >
                  {tf(`categories.${cat}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{t("tags")}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-subtle-hover)] text-[var(--text-secondary)] text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Suitable For */}
          {!isBaseline && project.suitableFor && project.suitableFor.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {t("suitableFor")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.suitableFor.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1.5 rounded-lg bg-[var(--green)]/10 text-[var(--green)] text-xs font-medium"
                  >
                    {tf(`roles.${role}`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Core Types */}
          {!isBaseline && project.coreType && project.coreType.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {t("coreType")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.coreType.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 rounded-lg bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-medium"
                  >
                    {tf(`coreTypes.${type}`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification Types */}
          {!isBaseline && project.verificationType && project.verificationType.length > 0 && (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                {t("verificationType")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.verificationType.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 rounded-lg bg-[var(--purple)]/10 text-[var(--purple)] text-xs font-medium"
                  >
                    {tf(`verificationTypes.${type}`)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Knowledge Base & Activity */}
        <ProjectKnowledgeSection
          knowledge={knowledge}
          summary={knowledgeSummary}
          stats={githubStats}
          launchStage={project.launchStage}
        />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              {t("relatedProjects")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedProjects.map((related) => {
                const relatedPrimaryCategory = related.category[0];
                return (
                  <Link
                    key={related.id}
                    href={getProjectDetailHref(related.id)}
                    className="card-glow flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-all group"
                  >
                    <ProjectGlyph
                      projectId={related.id}
                      primaryCategory={relatedPrimaryCategory}
                      variant="card"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {related.name}
                      </h4>
                      <p className="text-xs text-[var(--text-tertiary)] line-clamp-1">
                        {related.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0 group-hover:text-[var(--primary)] transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
