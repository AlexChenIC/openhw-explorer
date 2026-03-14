"use client";

import { useMemo, useState } from "react";
import { Activity, Star, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { projects, getGitHubStats } from "@/data/projects";
import { getCategoryStyle } from "@/lib/category-styles";
import type { GitHubRepoStats } from "@/data/projects";

type RankingTab = "stars" | "activity" | "contributors";

interface RankedProject {
  id: string;
  name: string;
  category: string;
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
      category: project.category[0],
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
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-1">
            {t("rankings.title")}
          </h2>
          <p className="text-xs text-[var(--text-tertiary)] mb-4 leading-relaxed">
            {t("rankings.disclaimer")}
          </p>

          <div className="flex gap-1 p-1 rounded-lg bg-[var(--bg-subtle-hover)] mb-4">
            {(["stars", "activity", "contributors"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRankingTab(tab)}
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
              const style = getCategoryStyle(project.category);
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
                  <span className="text-sm" style={{ color: style.color }}>
                    {style.emoji}
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
