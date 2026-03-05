"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  ExternalLink,
  Newspaper,
  Rocket,
  Cpu,
  TrendingUp,
  CircuitBoard,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import newsDigest from "@/data/news-digest.json";

// ─── Types ───────────────────────────────────────────────────

interface HighlightItem {
  title: string;
  url: string;
  source: string;
  tags: string[];
  publishedAt: string;
}

interface HighlightCategory {
  id: string;
  name: { en: string; zh: string };
  icon: string;
  count: number;
  items: HighlightItem[];
}

interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  author: string;
  relevanceScore: number;
  tags: string[];
  language: string;
  sourceTier?: "official" | "trusted" | "community";
  reviewStatus?: "auto" | "reviewed" | "curated";
}

interface NewsDigest {
  weekOf: string;
  generatedAt: string;
  stats: {
    totalRelevant: number;
    totalSources: number;
    topTags: { tag: string; count: number }[];
  };
  highlights: HighlightCategory[];
  items: NewsItem[];
  sources: string[];
}

type RelevanceFilter = "all" | "high" | "medium" | "low";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asSourceTier(value: unknown): NewsItem["sourceTier"] {
  if (value === "official" || value === "trusted" || value === "community") return value;
  return undefined;
}

function asReviewStatus(value: unknown): NewsItem["reviewStatus"] {
  if (value === "auto" || value === "reviewed" || value === "curated") return value;
  return undefined;
}

function normalizeNewsItem(value: unknown): NewsItem {
  if (!value || typeof value !== "object") {
    return {
      title: "",
      url: "",
      source: "",
      publishedAt: "",
      summary: "",
      author: "",
      relevanceScore: 0,
      tags: [],
      language: "other",
    };
  }

  const item = value as Record<string, unknown>;
  return {
    title: asString(item.title),
    url: asString(item.url),
    source: asString(item.source),
    publishedAt: asString(item.publishedAt),
    summary: asString(item.summary),
    author: asString(item.author),
    relevanceScore: asNumber(item.relevanceScore),
    tags: asStringArray(item.tags),
    language: asString(item.language, "other"),
    sourceTier: asSourceTier(item.sourceTier),
    reviewStatus: asReviewStatus(item.reviewStatus),
  };
}

function normalizeHighlightItem(value: unknown): HighlightItem {
  if (!value || typeof value !== "object") {
    return { title: "", url: "", source: "", tags: [], publishedAt: "" };
  }

  const item = value as Record<string, unknown>;
  return {
    title: asString(item.title),
    url: asString(item.url),
    source: asString(item.source),
    tags: asStringArray(item.tags),
    publishedAt: asString(item.publishedAt),
  };
}

function normalizeHighlightCategory(value: unknown): HighlightCategory {
  if (!value || typeof value !== "object") {
    return {
      id: "",
      name: { en: "", zh: "" },
      icon: "",
      count: 0,
      items: [],
    };
  }

  const category = value as Record<string, unknown>;
  const name =
    category.name && typeof category.name === "object"
      ? (category.name as Record<string, unknown>)
      : {};

  return {
    id: asString(category.id),
    name: {
      en: asString(name.en),
      zh: asString(name.zh),
    },
    icon: asString(category.icon),
    count: asNumber(category.count),
    items: Array.isArray(category.items) ? category.items.map(normalizeHighlightItem) : [],
  };
}

const digest: NewsDigest = {
  weekOf: asString(newsDigest.weekOf),
  generatedAt: asString(newsDigest.generatedAt),
  stats: {
    totalRelevant: asNumber(newsDigest.stats?.totalRelevant),
    totalSources: asNumber(newsDigest.stats?.totalSources),
    topTags: Array.isArray(newsDigest.stats?.topTags)
      ? newsDigest.stats.topTags
          .filter((tag): tag is { tag: string; count: number } => {
            return (
              Boolean(tag) &&
              typeof tag === "object" &&
              typeof (tag as { tag?: unknown }).tag === "string" &&
              typeof (tag as { count?: unknown }).count === "number"
            );
          })
          .map((tag) => ({ tag: tag.tag, count: tag.count }))
      : [],
  },
  highlights: Array.isArray(newsDigest.highlights)
    ? newsDigest.highlights.map(normalizeHighlightCategory)
    : [],
  items: Array.isArray(newsDigest.items) ? newsDigest.items.map(normalizeNewsItem) : [],
  sources: asStringArray(newsDigest.sources),
};

// ─── Icon mapper ─────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  rocket: <Rocket className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  trending: <TrendingUp className="w-4 h-4" />,
  circuit: <CircuitBoard className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  releases: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
  riscv: "from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400",
  industry: "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
  hardware: "from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400",
  community: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
};

const CATEGORY_ACCENTS: Record<string, string> = {
  releases: "text-emerald-400",
  riscv: "text-blue-400",
  industry: "text-amber-400",
  hardware: "text-purple-400",
  community: "text-cyan-400",
};

// ─── Helpers ─────────────────────────────────────────────────

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(d);
}

function formatWeekDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

function getRelevanceLevel(score: number): "high" | "medium" | "low" {
  if (score >= 3) return "high";
  if (score >= 2) return "medium";
  return "low";
}

function getTierBadgeMeta(tier: NewsItem["sourceTier"]) {
  if (tier === "official") {
    return {
      labelKey: "tierOfficial",
      className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };
  }
  if (tier === "trusted") {
    return {
      labelKey: "tierTrusted",
      className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    };
  }
  return {
    labelKey: "tierCommunity",
    className: "bg-[var(--bg-subtle)] text-[var(--text-tertiary)] border-[var(--border)]",
  };
}

// ─── Empty State ─────────────────────────────────────────────

function EmptyState() {
  const t = useTranslations("news");
  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader />
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 sm:p-12 text-center">
          <Newspaper className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{t("noNews")}</h2>
          <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto">{t("noNewsHint")}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page Header ─────────────────────────────────────────────

function PageHeader() {
  const t = useTranslations("news");
  return (
    <div className="page-hero mb-8 sm:mb-10">
      <div className="page-badge page-badge-primary">{t("badge")}</div>
      <h1 className="page-title">{t("title")}</h1>
      <p className="page-subtitle max-w-2xl mx-auto">{t("subtitle")}</p>
    </div>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────

function StatsBar() {
  const t = useTranslations("news");
  const locale = useLocale();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 text-sm text-[var(--text-tertiary)]">
      <span>{t("weekOf", { date: formatWeekDate(digest.weekOf, locale) })}</span>
      <span className="hidden sm:inline">·</span>
      <span className="font-medium text-[var(--text-secondary)]">
        {t("totalItems", { count: digest.stats.totalRelevant })}
      </span>
      <span className="hidden sm:inline">·</span>
      <span>{t("fromSources", { count: digest.stats.totalSources })}</span>
    </div>
  );
}

// ─── Trending Tags ───────────────────────────────────────────

function TrendingTags() {
  const t = useTranslations("news");
  if (!digest.stats.topTags.length) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      <span className="text-xs text-[var(--text-tertiary)] mr-1">{t("trendingTags")}:</span>
      {digest.stats.topTags.map(({ tag, count }) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--primary)]/8 text-[var(--primary)] text-xs font-medium border border-[var(--primary)]/15"
        >
          {tag}
          <span className="text-[10px] opacity-60">{count}</span>
        </span>
      ))}
    </div>
  );
}

// ─── Highlights Section ──────────────────────────────────────

function HighlightsSection() {
  const t = useTranslations("news");
  const locale = useLocale() as "en" | "zh";

  if (!digest.highlights.length) return null;

  return (
    <section className="mb-10">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("highlightsTitle")}</h2>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">{t("highlightsSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {digest.highlights.map((cat) => (
          <div
            key={cat.id}
            className={`bg-gradient-to-br ${CATEGORY_COLORS[cat.id] || "from-gray-500/20 to-gray-500/5 border-gray-500/20"} border rounded-xl p-5 transition-all hover:shadow-lg`}
          >
            {/* Category header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`${CATEGORY_ACCENTS[cat.id] || "text-[var(--text-secondary)]"}`}>
                  {CATEGORY_ICONS[cat.icon] || <Newspaper className="w-4 h-4" />}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                  {cat.name[locale]}
                </h3>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full">
                {t("itemsInCategory", { count: cat.count })}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2.5">
              {cat.items.map((item, idx) => (
                <div key={idx} className="group">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors leading-snug"
                  >
                    <span className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-current opacity-40" />
                    <span className="flex-1 line-clamp-2">{item.title}</span>
                    <ExternalLink className="shrink-0 w-3 h-3 mt-1 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                  <div className="flex items-center gap-2 ml-3.5 mt-1">
                    <span className="text-[10px] text-[var(--text-tertiary)]">{item.source}</span>
                    {item.publishedAt && (
                      <>
                        <span className="text-[10px] text-[var(--text-tertiary)]">·</span>
                        <span className="text-[10px] text-[var(--text-tertiary)]">
                          {formatDate(item.publishedAt, locale)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Full News Feed ──────────────────────────────────────────

function NewsFeed() {
  const t = useTranslations("news");
  const feedPanelId = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const filteredItems = useMemo(() => {
    return digest.items.filter((item) => {
      if (relevanceFilter !== "all") {
        const level = getRelevanceLevel(item.relevanceScore);
        if (level !== relevanceFilter) return false;
      }
      if (sourceFilter !== "all" && item.source !== sourceFilter) return false;
      return true;
    });
  }, [relevanceFilter, sourceFilter]);

  return (
    <section>
      {/* Toggle header */}
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={feedPanelId}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4 px-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--text-tertiary)] transition-all group"
      >
        <div className="text-left">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">{t("allNewsTitle")}</h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{t("allNewsSubtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-tertiary)] bg-[var(--bg-subtle)] px-3 py-1 rounded-full">
            {digest.items.length}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div id={feedPanelId} role="region" className="mt-3 space-y-3">
          {/* Compact filters */}
          <div className="flex flex-wrap items-center gap-3 px-1">
            {/* Relevance */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wide">
                {t("filterByRelevance")}
              </span>
              <div className="flex gap-1">
                {(["all", "high", "medium", "low"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setRelevanceFilter(level)}
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-md border transition-all ${
                      relevanceFilter === level
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-[var(--bg-subtle)] text-[var(--text-tertiary)] border-[var(--border)] hover:text-[var(--text-secondary)]"
                    }`}
                  >
                    {level === "all"
                      ? t("allFilter")
                      : level === "high"
                        ? t("highRelevance")
                        : level === "medium"
                          ? t("mediumRelevance")
                          : t("lowRelevance")}
                  </button>
                ))}
              </div>
            </div>

            {/* Source */}
            {digest.sources.length > 1 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wide">
                  {t("filterBySource")}
                </span>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-2.5 py-1 text-[10px] font-medium rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] cursor-pointer"
                >
                  <option value="all">{t("allFilter")}</option>
                  {digest.sources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <span className="text-[10px] text-[var(--text-tertiary)] ml-auto">
              {filteredItems.length} / {digest.items.length}
            </span>
          </div>

          {/* News items */}
          <div className="space-y-1.5">
            {filteredItems.map((item, index) => (
              <NewsRow key={`${item.url}-${index}`} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── News Row (compact) ──────────────────────────────────────

function NewsRow({ item }: { item: NewsItem }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const level = getRelevanceLevel(item.relevanceScore);
  const tierMeta = getTierBadgeMeta(item.sourceTier);
  const dotColor =
    level === "high"
      ? "bg-emerald-400"
      : level === "medium"
        ? "bg-blue-400"
        : "bg-[var(--text-tertiary)]";

  return (
    <article className="flex items-start gap-3 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg hover:border-[var(--text-tertiary)] transition-all group">
      <span className={`shrink-0 w-2 h-2 mt-1.5 rounded-full ${dotColor}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <h3 className="text-sm font-medium text-[var(--text-primary)] leading-snug flex-1 min-w-0">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--primary)] transition-colors"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        {item.summary && (
          <p className="text-xs text-[var(--text-tertiary)] leading-relaxed mt-1 line-clamp-1">
            {item.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-[10px] text-[var(--text-tertiary)]">
          <span className="font-medium text-[var(--text-secondary)]">{item.source}</span>
          <span className={`px-1.5 py-0.5 rounded border ${tierMeta.className}`}>
            {t(tierMeta.labelKey)}
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10"
            >
              {tag}
            </span>
          ))}
          {item.publishedAt && <span>{formatDate(item.publishedAt, locale)}</span>}
          {item.author && <span>{item.author}</span>}
        </div>
      </div>
    </article>
  );
}

// ─── Footer ──────────────────────────────────────────────────

function NewsFooter() {
  const t = useTranslations("news");
  return (
    <div className="mt-8 pt-6 border-t border-[var(--border)] text-center space-y-2">
      <p className="text-xs text-[var(--text-tertiary)]">
        {t("poweredBy", { count: digest.sources.length })}
      </p>
      <p className="text-[10px] text-[var(--text-tertiary)] opacity-60">
        {digest.sources.join(" · ")}
      </p>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────

export function NewsContent() {
  if (!digest.highlights.length && !digest.items.length) {
    return <EmptyState />;
  }

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader />
        <StatsBar />
        <TrendingTags />
        <HighlightsSection />
        <NewsFeed />
        <NewsFooter />
      </div>
    </div>
  );
}
