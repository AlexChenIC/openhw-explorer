"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type LucideIcon,
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Cpu,
  ExternalLink,
  Eye,
  Layers3,
  ListFilter,
  Newspaper,
  Radio,
  SearchCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import newsDigest from "@/data/news-digest.json";
import newsSourceGroups from "@/data/news-source-groups.json";
import newsTopicRules from "@/data/news-topic-rules.json";

interface NewsItem {
  title: string;
  titleZh?: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
  summaryZh?: string;
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
  items: NewsItem[];
  sources: string[];
}

interface NewsSourceGroup {
  id: string;
  title?: {
    en?: string;
    zh?: string;
  };
  description?: {
    en?: string;
    zh?: string;
  };
  cadence?: {
    en?: string;
    zh?: string;
  };
  sources?: string[];
  tags?: string[];
}

type TopicFilter = "all" | "openhw" | "ai" | "verification" | "eda" | "security" | "soc";

const TOPIC_ICONS: Record<Exclude<TopicFilter, "all">, LucideIcon> = {
  openhw: Cpu,
  ai: BrainCircuit,
  verification: ShieldCheck,
  eda: Wrench,
  security: ShieldCheck,
  soc: Layers3,
};

const TOPIC_FILTERS: Array<{
  id: TopicFilter;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  patterns: RegExp[];
}> = [
  {
    id: "all",
    labelKey: "audienceAll",
    descriptionKey: "audienceAllDesc",
    icon: Newspaper,
    patterns: [],
  },
  ...newsTopicRules.map((rule) => ({
    id: rule.id as TopicFilter,
    labelKey: rule.labelKey,
    descriptionKey: rule.descriptionKey,
    icon: TOPIC_ICONS[rule.id as Exclude<TopicFilter, "all">],
    patterns: rule.patterns.map((pattern) => new RegExp(pattern, "i")),
  })),
];

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
    titleZh: asString(item.titleZh) || undefined,
    url: asString(item.url),
    source: asString(item.source),
    publishedAt: asString(item.publishedAt),
    summary: asString(item.summary),
    summaryZh: asString(item.summaryZh) || undefined,
    author: asString(item.author),
    relevanceScore: asNumber(item.relevanceScore),
    tags: asStringArray(item.tags),
    language: asString(item.language, "other"),
    sourceTier: asSourceTier(item.sourceTier),
    reviewStatus: asReviewStatus(item.reviewStatus),
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
  items: Array.isArray(newsDigest.items) ? newsDigest.items.map(normalizeNewsItem) : [],
  sources: asStringArray(newsDigest.sources),
};

const rawSourceGroups: unknown = newsSourceGroups.groups;
const sourceGroups: NewsSourceGroup[] = Array.isArray(rawSourceGroups)
  ? rawSourceGroups
      .filter(
        (group): group is Record<string, unknown> => Boolean(group) && typeof group === "object",
      )
      .map((group) => ({
        id: asString(group.id),
        title: group.title as NewsSourceGroup["title"],
        description: group.description as NewsSourceGroup["description"],
        cadence: group.cadence as NewsSourceGroup["cadence"],
        sources: asStringArray(group.sources),
        tags: asStringArray(group.tags),
      }))
  : [];

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatFullDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getLocalizedTitle(item: Pick<NewsItem, "title" | "titleZh">, locale: string) {
  return locale.startsWith("zh") && item.titleZh ? item.titleZh : item.title;
}

function getLocalizedSummary(item: Pick<NewsItem, "summary" | "summaryZh">, locale: string) {
  return locale.startsWith("zh") && item.summaryZh ? item.summaryZh : item.summary;
}

function getItemKey(item?: NewsItem) {
  if (!item) return "";
  return item.url || `${item.source}:${item.title}`;
}

function pickDistinctItem(
  candidates: Array<NewsItem | undefined>,
  selectedKeys: Set<string>,
): NewsItem | undefined {
  for (const item of candidates) {
    const key = getItemKey(item);
    if (item && key && !selectedKeys.has(key)) {
      selectedKeys.add(key);
      return item;
    }
  }

  return undefined;
}

function getTopicSearchText(item: NewsItem) {
  return `${item.title} ${item.titleZh || ""} ${item.summary} ${item.summaryZh || ""} ${item.source} ${item.tags.join(" ")}`;
}

function matchesTopic(item: NewsItem, topic: TopicFilter) {
  if (topic === "all") return true;
  const filter = TOPIC_FILTERS.find((candidate) => candidate.id === topic);
  if (!filter) return true;
  const text = getTopicSearchText(item);
  return filter.patterns.some((pattern) => pattern.test(text));
}

function sortByDateDesc(items: NewsItem[]) {
  return [...items].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

function getValidDate(dateStr: string) {
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getReferenceTimeMs() {
  return getValidDate(digest.generatedAt)?.getTime() ?? getValidDate(digest.weekOf)?.getTime() ?? 0;
}

function daysSince(dateStr: string) {
  const date = getValidDate(dateStr);
  if (!date) return null;
  const diff = getReferenceTimeMs() - date.getTime();
  return Math.max(0, Math.floor(diff / (24 * 60 * 60 * 1000)));
}

function getItemsWithinDays(items: NewsItem[], days: number) {
  const maxAge = days * 24 * 60 * 60 * 1000;
  const now = getReferenceTimeMs();
  return items.filter((item) => {
    const date = getValidDate(item.publishedAt);
    if (!date) return false;
    const age = now - date.getTime();
    return age >= 0 && age <= maxAge;
  });
}

function getTierBadgeMeta(tier: NewsItem["sourceTier"]) {
  if (tier === "official") {
    return {
      labelKey: "tierOfficial",
      className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    };
  }
  if (tier === "trusted") {
    return {
      labelKey: "tierTrusted",
      className: "border-blue-500/20 bg-blue-500/10 text-blue-300",
    };
  }
  return {
    labelKey: "tierCommunity",
    className: "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-tertiary)]",
  };
}

function EmptyState() {
  const t = useTranslations("news");

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <PageHeader />
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center sm:p-12">
          <Newspaper className="mx-auto mb-4 h-12 w-12 text-[var(--text-tertiary)]" />
          <h2 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">{t("noNews")}</h2>
          <p className="mx-auto max-w-md text-sm text-[var(--text-secondary)]">{t("noNewsHint")}</p>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ latestItem }: { latestItem?: NewsItem } = {}) {
  const t = useTranslations("news");
  const locale = useLocale();
  const latestDate = latestItem?.publishedAt || digest.generatedAt || digest.weekOf;

  return (
    <header className="mb-8 border-b border-[var(--border)] pb-7">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
          {t("badge")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
          <CalendarDays className="h-3.5 w-3.5" />
          {t("updatedAt", { date: formatFullDate(digest.generatedAt || digest.weekOf, locale) })}
        </span>
      </div>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
        {t("subtitle")}
      </p>
      {latestDate && (
        <p className="mt-4 text-sm text-[var(--text-tertiary)]">
          {t("latestPublicSignal", { date: formatFullDate(latestDate, locale) })}
        </p>
      )}
    </header>
  );
}

function MetaLine({ item }: { item: NewsItem }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const tierMeta = getTierBadgeMeta(item.sourceTier);

  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
      {item.publishedAt && <span>{formatDate(item.publishedAt, locale)}</span>}
      <span className="font-medium text-[var(--text-secondary)]">{item.source}</span>
      <span className={`rounded border px-1.5 py-0.5 ${tierMeta.className}`}>
        {t(tierMeta.labelKey)}
      </span>
    </div>
  );
}

function TagList({ tags, limit = 4 }: { tags: string[]; limit?: number }) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          className="rounded border border-[var(--primary)]/10 bg-[var(--primary)]/5 px-1.5 py-0.5 text-[10px] font-medium text-[var(--primary)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function StoryCard({
  item,
  label,
  prominent = false,
}: {
  item: NewsItem;
  label?: string;
  prominent?: boolean;
}) {
  const t = useTranslations("news");
  const locale = useLocale();

  return (
    <article
      className={`h-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--text-tertiary)] ${
        prominent ? "sm:p-5" : ""
      }`}
    >
      {label && (
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--primary)]">
          {label}
        </div>
      )}
      <MetaLine item={item} />
      <h3
        className={`mt-3 font-semibold leading-snug text-[var(--text-primary)] ${
          prominent ? "text-xl sm:text-2xl" : "text-base"
        }`}
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-1.5 hover:text-[var(--primary)]"
        >
          <span>{getLocalizedTitle(item, locale)}</span>
          <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-60" />
        </a>
      </h3>
      {getLocalizedSummary(item, locale) && (
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--text-secondary)]">
          {getLocalizedSummary(item, locale)}
        </p>
      )}
      <div className="mt-4">
        <TagList tags={item.tags} limit={prominent ? 5 : 4} />
      </div>
    </article>
  );
}

function DailyBrief({
  allItems,
  editorialItems,
}: {
  allItems: NewsItem[];
  editorialItems: NewsItem[];
}) {
  const t = useTranslations("news");
  const locale = useLocale();
  const latestItem = allItems[0];
  const recentItems = getItemsWithinDays(allItems, 7);
  const latestDays = daysSince(latestItem?.publishedAt || "");

  if (!latestItem) return null;

  const selectedKeys = new Set<string>();
  const latestSignal = pickDistinctItem([latestItem], selectedKeys) || latestItem;
  const editorPick = pickDistinctItem([...editorialItems, ...allItems], selectedKeys);
  const toolchainItem = pickDistinctItem(
    [
      ...allItems.filter((item) => matchesTopic(item, "eda") || matchesTopic(item, "verification")),
      ...allItems,
    ],
    selectedKeys,
  );

  return (
    <section className="mb-9">
      <div className="mb-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
            <Activity className="h-3.5 w-3.5" />
            {t("dailyBriefEyebrow")}
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t("dailyBriefTitle")}</h2>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("pulseReviewed")}
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">{allItems.length}</div>
          <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t("pulseReviewedHint")}</div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <SearchCheck className="h-3.5 w-3.5" />
            {t("pulseSources")}
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {digest.sources.length}
          </div>
          <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t("pulseSourcesHint")}</div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <Radio className="h-3.5 w-3.5" />
            {t("pulseRecent")}
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">{recentItems.length}</div>
          <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t("pulseRecentHint")}</div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <Clock3 className="h-3.5 w-3.5" />
            {t("pulseGap")}
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {latestDays == null ? "—" : latestDays}
          </div>
          <div className="mt-1 text-xs text-[var(--text-tertiary)]">{t("pulseGapHint")}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr_1fr]">
        <StoryCard item={latestSignal} label={t("latestSignal")} prominent />
        {editorPick && <StoryCard item={editorPick} label={t("editorSignal")} />}
        {toolchainItem && <StoryCard item={toolchainItem} label={t("toolchainSignal")} />}
      </div>
    </section>
  );
}

function TopicBrowser({
  activeTopic,
  onChange,
  items,
}: {
  activeTopic: TopicFilter;
  onChange: (topic: TopicFilter) => void;
  items: NewsItem[];
}) {
  const t = useTranslations("news");
  const active = TOPIC_FILTERS.find((filter) => filter.id === activeTopic) || TOPIC_FILTERS[0];

  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <ListFilter className="h-3.5 w-3.5" />
            {t("topicEyebrow")}
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("topicTitle")}</h2>
        </div>
        <p className="max-w-xl text-sm text-[var(--text-tertiary)]">{t(active.descriptionKey)}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-7">
        {TOPIC_FILTERS.map((filter) => {
          const Icon = filter.icon;
          const selected = activeTopic === filter.id;
          const count = items.filter((item) => matchesTopic(item, filter.id)).length;

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(filter.id)}
              className={`min-h-20 rounded-lg border p-3 text-left transition-colors ${
                selected
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--text-tertiary)]"
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <Icon
                  className={`h-4 w-4 ${selected ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"}`}
                />
                <span className="rounded-full bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]">
                  {count}
                </span>
              </div>
              <span className="block text-sm font-semibold leading-snug text-[var(--text-primary)]">
                {t(filter.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function NewsTimeline({ items, activeTopic }: { items: NewsItem[]; activeTopic: TopicFilter }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const active = TOPIC_FILTERS.find((filter) => filter.id === activeTopic) || TOPIC_FILTERS[0];

  return (
    <section>
      <div className="mb-3 flex flex-col gap-1 border-b border-[var(--border)] pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {activeTopic === "all" ? t("timelineTitleAll") : t(active.labelKey)}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            {t("timelineSubtitle", { count: items.length })}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
          {t("latestFirst")}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {items.length ? (
        <div className="divide-y divide-[var(--border)]">
          {items.map((item, index) => (
            <article key={`${item.url}-${index}`} className="py-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[7rem_1fr]">
                <time
                  dateTime={item.publishedAt}
                  className="text-xs font-medium text-[var(--text-tertiary)]"
                >
                  {formatFullDate(item.publishedAt, locale)}
                </time>

                <div className="min-w-0">
                  <MetaLine item={item} />
                  <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--text-primary)]">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-1.5 hover:text-[var(--primary)]"
                    >
                      <span>{getLocalizedTitle(item, locale)}</span>
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-60" />
                    </a>
                  </h3>
                  {getLocalizedSummary(item, locale) && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {getLocalizedSummary(item, locale)}
                    </p>
                  )}
                  <div className="mt-3">
                    <TagList tags={item.tags} limit={5} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center text-sm text-[var(--text-tertiary)]">
          {t("noFilteredNews")}
        </div>
      )}
    </section>
  );
}

function SourceCoverage() {
  const t = useTranslations("news");
  const locale = useLocale();
  const localized = locale.startsWith("zh") ? "zh" : "en";

  if (!sourceGroups.length) return null;

  return (
    <section className="mt-10 border-t border-[var(--border)] pt-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            <Eye className="h-3.5 w-3.5" />
            {t("sourceCoverageTitle")}
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {t("sourceCoverageHeading")}
          </h2>
        </div>
        <p className="max-w-xl text-sm text-[var(--text-tertiary)]">
          {t("sourceCoverageSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sourceGroups.slice(0, 6).map((group) => (
          <div
            key={group.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {group.title?.[localized] || group.id}
              </h3>
              {group.cadence?.[localized] && (
                <span className="shrink-0 rounded border border-[var(--border)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]">
                  {group.cadence[localized]}
                </span>
              )}
            </div>
            {group.description?.[localized] && (
              <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-tertiary)]">
                {group.description[localized]}
              </p>
            )}
            <div className="mt-3">
              <TagList tags={group.tags || []} limit={4} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsFooter() {
  const t = useTranslations("news");

  if (!digest.sources.length) return null;

  return (
    <footer className="mt-10 border-t border-[var(--border)] pt-5">
      <p className="text-xs leading-relaxed text-[var(--text-tertiary)]">
        {t("sourcesLine", { sources: digest.sources.join(" · ") })}
      </p>
    </footer>
  );
}

export function NewsContent() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("all");

  const allItems = useMemo(() => sortByDateDesc(digest.items), []);
  const editorialItems = useMemo(() => digest.items, []);
  const filteredItems = useMemo(
    () => allItems.filter((item) => matchesTopic(item, activeTopic)),
    [activeTopic, allItems],
  );

  if (!digest.items.length) {
    return <EmptyState />;
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <PageHeader latestItem={allItems[0]} />
        <DailyBrief allItems={allItems} editorialItems={editorialItems} />
        <TopicBrowser activeTopic={activeTopic} onChange={setActiveTopic} items={allItems} />
        <NewsTimeline items={filteredItems} activeTopic={activeTopic} />
        <SourceCoverage />
        <NewsFooter />
      </div>
    </div>
  );
}
