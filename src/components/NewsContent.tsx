"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  type LucideIcon,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Layers3,
  ListFilter,
  Newspaper,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import newsDigest from "@/data/news-digest.json";

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

type TopicFilter = "all" | "openhw" | "ai" | "verification" | "eda" | "security" | "soc";

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
  {
    id: "openhw",
    labelKey: "audienceOpenhw",
    descriptionKey: "audienceOpenhwDesc",
    icon: Cpu,
    patterns: [/OpenHW|CORE-V|CVA6|CV32|CVW|CVFPU|RISC-V/i],
  },
  {
    id: "ai",
    labelKey: "audienceAi",
    descriptionKey: "audienceAiDesc",
    icon: BrainCircuit,
    patterns: [
      /AI\b|artificial intelligence|machine learning|\bML\b|deep learning|edge AI|LLM|large language|inference|transformer|vLLM|GPT|DeepSeek|MoE|MLPerf|accelerator|NPU|TPU|xPU|tensor|matrix|Tenstorrent|TT-Metal|TT-Metalium|TT-NN|OpenXLA|IREE|Apache TVM|\bTVM\b|MLIR|PULP|PULP-NN|Snitch|Ara|MemPool|Gemmini|Kenning|Open Compute|Open Rack|chiplet/i,
    ],
  },
  {
    id: "verification",
    labelKey: "audienceVerification",
    descriptionKey: "audienceVerificationDesc",
    icon: ShieldCheck,
    patterns: [
      /Verification|UVM|SystemVerilog|Architecture Tests|Certification|RISCV-DV|cocotb|formal/i,
    ],
  },
  {
    id: "eda",
    labelKey: "audienceEda",
    descriptionKey: "audienceEdaDesc",
    icon: Wrench,
    patterns: [/Yosys|Verilator|OpenROAD|OpenLane|EDA|Synthesis|Simulation|Physical Design|FPGA/i],
  },
  {
    id: "security",
    labelKey: "audienceSecurity",
    descriptionKey: "audienceSecurityDesc",
    icon: ShieldCheck,
    patterns: [/Caliptra|OpenTitan|Root of Trust|Security|Keystone|CHERI|Cryptography|enclave/i],
  },
  {
    id: "soc",
    labelKey: "audienceSoc",
    descriptionKey: "audienceSocDesc",
    icon: Layers3,
    patterns: [/SoC|IP|RTL|Topwrap|Guineveer|VeeR|Ibex|Chipyard|subsystem|Core/i],
  },
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

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
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
  }).format(date);
}

function getLocalizedTitle(item: Pick<NewsItem, "title" | "titleZh">, locale: string) {
  return locale.startsWith("zh") && item.titleZh ? item.titleZh : item.title;
}

function getLocalizedSummary(item: Pick<NewsItem, "summary" | "summaryZh">, locale: string) {
  return locale.startsWith("zh") && item.summaryZh ? item.summaryZh : item.summary;
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

function PageHeader() {
  const t = useTranslations("news");
  const locale = useLocale();

  return (
    <header className="mb-8 border-b border-[var(--border)] pb-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
          {t("badge")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
          <CalendarDays className="h-3.5 w-3.5" />
          {t("updatedAt", { date: formatFullDate(digest.generatedAt || digest.weekOf, locale) })}
        </span>
      </div>
      <h1 className="max-w-3xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
        {t("subtitle")}
      </p>
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

function HighlightPicks({ items }: { items: NewsItem[] }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const picks = items.slice(0, 4);
  const lead = picks[0];
  const secondary = picks.slice(1);

  if (!lead) return null;

  return (
    <section className="mb-9">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
            <Star className="h-3.5 w-3.5" />
            {t("picksEyebrow")}
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t("picksTitle")}</h2>
        </div>
        <p className="text-sm text-[var(--text-tertiary)]">{t("picksSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
        <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--primary)]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t("leadPick")}
            </span>
          </div>

          <MetaLine item={lead} />

          <h3 className="mt-3 text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl">
            <a
              href={lead.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)]"
            >
              {getLocalizedTitle(lead, locale)}
            </a>
          </h3>

          {getLocalizedSummary(lead, locale) && (
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {getLocalizedSummary(lead, locale)}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TagList tags={lead.tags} />
            {lead.url && (
              <a
                href={lead.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {t("openOriginal")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </article>

        <div className="grid grid-cols-1 gap-3">
          {secondary.map((item, index) => (
            <article
              key={`${item.url}-${index}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--text-tertiary)]"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
                  {t("secondaryPick", { index: index + 2 })}
                </span>
                {item.publishedAt && (
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    {formatDate(item.publishedAt, locale)}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)]"
                >
                  {getLocalizedTitle(item, locale)}
                </a>
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-tertiary)]">
                {getLocalizedSummary(item, locale)}
              </p>
            </article>
          ))}
        </div>
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
    <section className="mb-6">
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
        <span className="text-xs text-[var(--text-tertiary)]">{t("latestFirst")}</span>
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
  const filteredItems = useMemo(
    () => allItems.filter((item) => matchesTopic(item, activeTopic)),
    [activeTopic, allItems],
  );

  if (!digest.items.length) {
    return <EmptyState />;
  }

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <PageHeader />
        <HighlightPicks items={digest.items} />
        <TopicBrowser activeTopic={activeTopic} onChange={setActiveTopic} items={allItems} />
        <NewsTimeline items={filteredItems} activeTopic={activeTopic} />
        <NewsFooter />
      </div>
    </div>
  );
}
