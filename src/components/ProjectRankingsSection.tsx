"use client";

import { useMemo, useState } from "react";
import { Activity, Star, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { projects, getGitHubStats, getGitHubStatsMeta } from "@/data/projects";
import type { GitHubRepoStats } from "@/data/projects";

type RankingTab = "stars" | "activity" | "contributors";

interface RankedProject {
  id: string;
  name: string;
  stats: GitHubRepoStats;
}

function getRankedProjects(): RankedProject[] {
  const result: RankedProject[] = [];

  for (const project of projects) {
    const stats = getGitHubStats(project.id);
    if (!stats) continue;

    result.push({
      id: project.id,
      name: project.name,
      stats,
    });
  }

  return result;
}

export function ProjectRankingsSection() {
  const t = useTranslations("contributePage");
  const locale = useLocale();
  const [rankingTab, setRankingTab] = useState<RankingTab>("stars");
  const numberFormatter = new Intl.NumberFormat(locale);
  const statsMeta = getGitHubStatsMeta();
  const fetchedAt = typeof statsMeta.fetchedAt === "string" ? statsMeta.fetchedAt : null;
  const snapshotDate = fetchedAt
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(fetchedAt))
    : null;
  const formatNumber = (value: number) => numberFormatter.format(value);

  const top10 = useMemo(() => {
    const rankedProjects = getRankedProjects();
    const sorted = [...rankedProjects].sort((a, b) => {
      switch (rankingTab) {
        case "stars":
          return b.stats.stars - a.stats.stars;
        case "activity":
          return b.stats.recentCommits - a.stats.recentCommits;
        case "contributors":
          return b.stats.contributorsCount - a.stats.contributorsCount;
      }
    });

    return sorted.slice(0, 10);
  }, [rankingTab]);

  return (
    <section id="rankings" className="section-projects py-12 sm:py-16 scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-1">
            {t("rankings.title")}
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mb-4 leading-relaxed">
            {t("rankings.disclaimer")}
          </p>
          {snapshotDate && (
            <p className="-mt-2 mb-4 text-xs font-medium text-[var(--text-secondary)]">
              {t("rankings.updatedAt", { date: snapshotDate })}
            </p>
          )}

          <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-subtle-hover)] mb-4">
            {(["stars", "activity", "contributors"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRankingTab(tab)}
                aria-pressed={rankingTab === tab}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  rankingTab === tab
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab === "stars" && <Star className="w-3 h-3 inline mr-1" />}
                {tab === "activity" && <Activity className="w-3 h-3 inline mr-1" />}
                {tab === "contributors" && <Users className="w-3 h-3 inline mr-1" />}
                {t(
                  `rankings.by${tab.charAt(0).toUpperCase() + tab.slice(1)}` as
                    | "rankings.byStars"
                    | "rankings.byActivity"
                    | "rankings.byContributors",
                )}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {top10.map((project, index) => {
              const value =
                rankingTab === "stars"
                  ? project.stats.stars
                  : rankingTab === "activity"
                    ? project.stats.recentCommits
                    : project.stats.contributorsCount;
              const label = t(
                `rankings.${rankingTab === "stars" ? "stars" : rankingTab === "activity" ? "commits" : "contributors"}`,
              );

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-subtle-hover)] transition-all group"
                >
                  <span
                    className={`w-6 text-center text-xs font-bold ${
                      index < 3 ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate">
                    {project.name}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] tabular-nums">
                    {formatNumber(value)} {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
