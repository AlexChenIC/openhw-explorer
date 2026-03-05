"use client";

import {
  Users,
  GitPullRequest,
  ExternalLink,
  FileText,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Presentation,
  Cpu,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { projects, getGitHubStats } from "@/data/projects";
import { getCategoryStyle } from "@/lib/category-styles";
import type { GitHubRepoStats } from "@/data/projects";

interface RankedProject {
  id: string;
  name: string;
  category: string;
  github: string;
  stats: GitHubRepoStats;
}

function repoNameFromGithubUrl(url: string): string | null {
  const match = url.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}

function getGoodFirstIssueSearchUrl(githubUrl: string): string {
  const repoName = repoNameFromGithubUrl(githubUrl);

  if (!repoName) {
    return `${githubUrl.replace(/\/$/, "")}/issues`;
  }

  const query = `repo:openhwgroup/${repoName} label:"good first issue" is:issue is:open`;
  return `https://github.com/issues?q=${encodeURIComponent(query)}`;
}

function getRankedProjects(): RankedProject[] {
  const result: RankedProject[] = [];
  for (const p of projects) {
    const stats = getGitHubStats(p.id);
    if (stats && p.github) {
      result.push({
        id: p.id,
        name: p.name,
        category: p.category[0],
        github: p.github,
        stats,
      });
    }
  }
  return result;
}

export function ContributeContent() {
  const t = useTranslations("contributePage");
  const locale = useLocale();
  const numberFormatter = new Intl.NumberFormat(locale);
  const formatNumber = (value: number) => numberFormatter.format(value);

  const rankedProjects = getRankedProjects();

  // Good first issues
  const goodFirstIssueRepos = rankedProjects
    .filter((p) => p.stats.goodFirstIssueCount > 0)
    .sort((a, b) => b.stats.goodFirstIssueCount - a.stats.goodFirstIssueCount);

  const getActivityLabel = (level: "high" | "moderate" | "low") => {
    switch (level) {
      case "high":
        return t("activityLevel.high");
      case "moderate":
        return t("activityLevel.moderate");
      case "low":
        return t("activityLevel.low");
    }
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        {/* Page Title */}
        <div className="page-hero">
          <div className="page-badge page-badge-green">
            <GitPullRequest className="w-3.5 h-3.5" />
            {t("badge")}
          </div>
          <h1 className="page-title">{t("title")}</h1>
          <p className="page-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#classroom"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              {t("heroCta.classroom")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contribute-center"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--text-tertiary)] transition-colors"
            >
              {t("heroCta.contribute")}
            </a>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3 sm:p-4">
          <span className="text-xs text-[var(--text-tertiary)] font-medium">
            {t("quickNav.label")}
          </span>
          <a
            href="#classroom"
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
          >
            {t("quickNav.classroom")}
          </a>
          <a
            href="#contribute-center"
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--green)]/10 text-[var(--green)] hover:bg-[var(--green)]/20 transition-colors"
          >
            {t("quickNav.contributeCenter")}
          </a>
          <a
            href="#community-insights"
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--orange)]/10 text-[var(--orange)] hover:bg-[var(--orange)]/20 transition-colors"
          >
            {t("quickNav.community")}
          </a>
        </div>

        <section
          id="classroom"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5 scroll-mt-24"
        >
          <div className="flex items-center gap-2 mb-1">
            <Presentation className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {t("classroom.title")}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">{t("classroom.subtitle")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <GitPullRequest className="w-4 h-4 text-[var(--green)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {t("classroom.tracks.contribution.title")}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mb-3">
                {t("classroom.tracks.contribution.desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.eclipse.org/legal/ECA.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  {t("classroom.links.eca")}
                </a>
                <a
                  href="https://docs.openhwgroup.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  {t("classroom.links.guidelines")}
                </a>
              </div>
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-[var(--orange)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {t("classroom.tracks.cores.title")}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mb-3">
                {t("classroom.tracks.cores.desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/projects/cva6"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  CVA6
                </Link>
                <Link
                  href="/projects/cv32e40p"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  CV32E40P
                </Link>
              </div>
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[var(--purple)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {t("classroom.tracks.verification.title")}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mb-3">
                {t("classroom.tracks.verification.desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/projects/core-v-verif"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  CORE-V VERIF
                </Link>
                <Link
                  href="/projects/force-riscv"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  FORCE-RISCV
                </Link>
              </div>
            </article>

            <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-[var(--cyan)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {t("classroom.tracks.software.title")}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mb-3">
                {t("classroom.tracks.software.desc")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/projects/core-v-sdk"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  CORE-V SDK
                </Link>
                <Link
                  href="/projects/core-v-freertos"
                  className="px-2.5 py-1.5 rounded-md text-xs bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-colors"
                >
                  FreeRTOS
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-xs text-[var(--text-tertiary)]">
            {t("classroom.futureNote")}
          </div>
        </section>

        <section
          id="contribute-center"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                {t("whyContribute.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(["reason1", "reason2", "reason3", "reason4"] as const).map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-subtle)]"
                  >
                    <CheckCircle className="w-4 h-4 text-[var(--green)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {t(`whyContribute.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                {t("howTo.title")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([1, 2, 3, 4] as const).map((step) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-subtle)]"
                  >
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-bold flex-shrink-0">
                      {step}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-0.5">
                        {t(`howTo.step${step}Title`)}
                      </h3>
                      <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                        {t(`howTo.step${step}Desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Good First Issues */}
        <section
          id="community-insights"
          className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5 scroll-mt-24"
        >
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {t("goodFirstIssues")}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">{t("goodFirstIssuesDesc")}</p>

          {goodFirstIssueRepos.length > 0 ? (
            <div className="space-y-2">
              {goodFirstIssueRepos.map((project) => {
                const style = getCategoryStyle(project.category);
                return (
                  <a
                    key={project.id}
                    href={getGoodFirstIssueSearchUrl(project.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border)] transition-all group"
                  >
                    <span className="text-sm" style={{ color: style.color }}>
                      {style.emoji}
                    </span>
                    <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">
                      {project.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--green)]/10 text-[var(--green)] text-xs font-medium">
                      {t("metrics.goodFirstIssues", {
                        count: formatNumber(project.stats.goodFirstIssueCount),
                      })}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-tertiary)] italic">{t("noGoodFirstIssues")}</p>
          )}
        </section>

        {/* Most Active Repos */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8 mb-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t("activeRepos")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...rankedProjects]
              .sort((a, b) => b.stats.recentCommits - a.stats.recentCommits)
              .slice(0, 6)
              .map((project) => {
                const style = getCategoryStyle(project.category);
                const activityLevel =
                  project.stats.recentCommits >= 10
                    ? "high"
                    : project.stats.recentCommits >= 3
                      ? "moderate"
                      : "low";
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border)] transition-all group"
                  >
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${style.color}15` }}
                    >
                      <span className="text-sm" style={{ color: style.color }}>
                        {style.emoji}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {t("metrics.commits4w", {
                            count: formatNumber(project.stats.recentCommits),
                          })}
                        </span>
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {t("metrics.openIssues", {
                            count: formatNumber(project.stats.openIssues),
                          })}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            activityLevel === "high"
                              ? "text-[var(--green)]"
                              : activityLevel === "moderate"
                                ? "text-[var(--orange)]"
                                : "text-[var(--text-tertiary)]"
                          }`}
                        >
                          {getActivityLabel(activityLevel)}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors flex-shrink-0" />
                  </Link>
                );
              })}
          </div>
        </section>

        {/* Contribution Resources */}
        <section className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            {t("resources.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://www.eclipse.org/legal/ECA.php"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border)] transition-all group"
            >
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                {t("resources.ecaTitle")}
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                {t("resources.ecaDesc")}
              </p>
            </a>
            <a
              href="https://docs.openhwgroup.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border)] transition-all group"
            >
              <BookOpen className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                {t("resources.guidelinesTitle")}
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                {t("resources.guidelinesDesc")}
              </p>
            </a>
            <a
              href="https://www.openhwgroup.org/working-groups/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] border border-transparent hover:border-[var(--border)] transition-all group"
            >
              <Users className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                {t("resources.workGroupsTitle")}
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                {t("resources.workGroupsDesc")}
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
