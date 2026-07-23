"use client";

import { Star, GitFork, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { Project } from "@/types";
import { localizeProject } from "@/data/projects";
import { statusConfig } from "@/lib/category-styles";
import { ProjectGlyph } from "./ProjectGlyph";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const localizedProject = localizeProject(project, locale);
  const searchParams = useSearchParams();
  const numberFormatter = new Intl.NumberFormat(locale);
  const formatNumber = (value: number) => numberFormatter.format(value);
  const queryString = searchParams.toString();
  const detailHref = queryString
    ? `/projects/${localizedProject.id}?${queryString}`
    : `/projects/${localizedProject.id}`;

  const primaryCategory = localizedProject.category[0];
  const status = statusConfig[localizedProject.status];
  const statusSource = localizedProject.statusSource || "editorial";

  return (
    <article className="card-glow group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition-all hover:border-[var(--text-tertiary)]">
      <Link
        href={detailHref}
        className="flex flex-1 flex-col gap-3.5 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--primary)]"
      >
        <div className="flex items-start justify-between gap-2">
          <ProjectGlyph
            primaryCategory={primaryCategory}
            variant="card"
          />
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <span
              title={t(`projectDetail.statusSource.${statusSource}`)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${status.color} ${status.bg}`}
            >
              {t(`projectDetail.statusBadge`, {
                source: t(`projectDetail.statusSourceShort.${statusSource}`),
                status: t(`projectDetail.status.${localizedProject.status}`),
              })}
            </span>
            {localizedProject.launchStage === "baseline" && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-[10px] font-semibold">
                {t("projects.baseline")}
              </span>
            )}
            {localizedProject.featured && (
              <span className="px-2 py-0.5 rounded-md bg-[var(--green)]/15 text-[var(--green)] text-[10px] font-semibold">
                {t("projects.featured")}
              </span>
            )}
          </div>
        </div>

        <div className="flex min-h-[60px] flex-col gap-1.5">
          <h3 className="text-[15px] font-semibold text-[var(--text-primary)] leading-tight group-hover:text-[var(--primary)] transition-colors">
            {localizedProject.name}
          </h3>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {localizedProject.description}
          </p>
          {localizedProject.launchStage === "baseline" && (
            <p className="text-[11px] text-amber-300/90 leading-relaxed line-clamp-2">
              {t("projects.baselineCardHint")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {localizedProject.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle-hover)] text-[var(--text-tertiary)] text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
          {localizedProject.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[var(--text-tertiary)] text-[11px]">
              +{localizedProject.tags.length - 3}
            </span>
          )}
        </div>
      </Link>

      <div className="mx-5 flex min-h-12 items-center justify-between gap-3 border-t border-[var(--border)] py-3">
        <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
          {localizedProject.stars !== undefined && (
            <div
              className="flex items-center gap-1"
              aria-label={`${formatNumber(localizedProject.stars)} ${t("projectDetail.metrics.stars")}`}
            >
              <Star className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{formatNumber(localizedProject.stars)}</span>
            </div>
          )}
          {localizedProject.forks !== undefined && (
            <div
              className="flex items-center gap-1"
              aria-label={`${formatNumber(localizedProject.forks)} ${t("projectDetail.metrics.forks")}`}
            >
              <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{formatNumber(localizedProject.forks)}</span>
            </div>
          )}
        </div>

        {localizedProject.github && (
          <a
            href={localizedProject.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("common.viewOnGitHub")}: ${localizedProject.name}`}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--primary)]"
          >
            {t("header.github")}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
