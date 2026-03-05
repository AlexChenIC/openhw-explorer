"use client";

import { Star, GitFork, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { Project } from "@/types";
import { getCategoryStyle, statusConfig } from "@/lib/category-styles";
import { RepoMascot, getRepoMascot } from "./RepoMascotMetroZoo";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const numberFormatter = new Intl.NumberFormat(locale);
  const formatNumber = (value: number) => numberFormatter.format(value);
  const queryString = searchParams.toString();
  const detailHref = queryString
    ? `/projects/${project.id}?${queryString}`
    : `/projects/${project.id}`;

  const primaryCategory = project.category[0];
  const { color, emoji } = getCategoryStyle(primaryCategory);
  const mascot = getRepoMascot(project.id, primaryCategory);
  const status = statusConfig[project.status];

  return (
    <Link
      href={detailHref}
      className="card-glow group flex flex-col gap-3.5 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-tertiary)] transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="relative flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 border"
          style={{
            backgroundColor: mascot ? `${mascot.palette.accent}63` : `${color}15`,
            borderColor: mascot ? `${mascot.palette.shell}aa` : `${color}40`,
          }}
        >
          {mascot ? (
            <RepoMascot
              projectId={project.id}
              primaryCategory={primaryCategory}
              size={34}
              className="drop-shadow-sm saturate-125 transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <span className="text-lg" style={{ color }}>
              {emoji}
            </span>
          )}

          {mascot && (
            <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-[var(--text-secondary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {mascot.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {/* Status indicator */}
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${status.color} ${status.bg}`}
          >
            {t(`projectDetail.status.${project.status}`)}
          </span>
          {project.launchStage === "baseline" && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-[10px] font-semibold">
              {t("projects.baseline")}
            </span>
          )}
          {project.featured && (
            <span className="px-2 py-0.5 rounded-md bg-[var(--green)]/15 text-[var(--green)] text-[10px] font-semibold">
              {t("projects.featured")}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-h-[60px]">
        <h3 className="text-[15px] font-semibold text-[var(--text-primary)] leading-tight group-hover:text-[var(--primary)] transition-colors">
          {project.name}
        </h3>
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {project.launchStage === "baseline" && (
          <p className="text-[11px] text-amber-300/90 leading-relaxed line-clamp-2">
            {t("projects.baselineCardHint")}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle-hover)] text-[var(--text-tertiary)] text-[11px] font-medium"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-[var(--text-tertiary)] text-[11px]">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      {/* Stats & Link */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
          {project.stars !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{formatNumber(project.stars)}</span>
            </div>
          )}
          {project.forks !== undefined && (
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{formatNumber(project.forks)}</span>
            </div>
          )}
          {project.language && (
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs">{project.language}</span>
            </div>
          )}
        </div>

        {project.github && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(project.github, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1 text-xs text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors"
          >
            {t("common.viewOnGitHub")}
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </Link>
  );
}
