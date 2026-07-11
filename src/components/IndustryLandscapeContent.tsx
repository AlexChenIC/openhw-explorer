"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  Blocks,
  Building2,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  ExternalLink,
  Globe2,
  MapPin,
  Network,
  RotateCcw,
} from "lucide-react";
import {
  industryCompanies,
  industryRegions,
  industrySegments,
  industryVerifiedAt,
  type IndustryCompany,
  type IndustryRegionId,
  type IndustrySegmentId,
} from "@/data/industry-landscape";

const copy = {
  en: {
    back: "Back to resources",
    eyebrow: "RISC-V commercial ecosystem",
    title: "RISC-V Industry Landscape",
    subtitle:
      "A source-checked map of companies turning the RISC-V standard into processor IP, production silicon, compute platforms, and commercial design flows.",
    companies: "companies",
    segments: "industry segments",
    verified: `Source-checked ${industryVerifiedAt}`,
    mapLabel: "Industry map",
    mapTitle: "Browse by role in the value chain",
    mapSubtitle:
      "Use these segments to separate processor technology, product platforms, and the tools needed to design and verify them.",
    all: "All companies",
    valueChainFilter: "Value chain",
    regionFilter: "Region",
    allRegions: "All regions",
    showing: "Showing",
    entries: "entries",
    noResults: "No companies match this value-chain and region combination.",
    resetFilters: "Reset filters",
    visit: "Visit company site",
    signalsLabel: "What to watch",
    signalsTitle: "Three forces shaping commercial RISC-V",
    signalOneTitle: "Custom compute",
    signalOne:
      "Processor differentiation is moving beyond core selection toward custom instructions, subsystem IP, and hardware-software co-design.",
    signalTwoTitle: "AI and higher performance",
    signalTwo:
      "Commercial portfolios increasingly extend from embedded control into vector, tensor, client, server, and chiplet-based computing.",
    signalThreeTitle: "Verification and productization",
    signalThree:
      "Mature models, toolchains, formal verification, emulation, and software readiness are becoming as important as the CPU RTL itself.",
    note: "Coverage was cross-checked against the abridged RISC-V Market Report: Market Adoption Accelerates 2026 and then verified against current official company materials. Acquired businesses are shown with their current parent-company status. This is a curated supplier map, not a ranking.",
  },
  zh: {
    back: "返回资源导航",
    eyebrow: "RISC-V 商业生态",
    title: "RISC-V 产业版图",
    subtitle:
      "经过官网核对的企业地图，呈现如何将 RISC-V 标准转化为处理器 IP、量产芯片、计算平台与商业设计流程。",
    companies: "家企业",
    segments: "个产业环节",
    verified: `官网核对于 ${industryVerifiedAt}`,
    mapLabel: "产业地图",
    mapTitle: "按价值链角色浏览",
    mapSubtitle: "区分处理器技术、产品平台，以及支撑设计和验证的商业工具与服务。",
    all: "全部企业",
    valueChainFilter: "价值链",
    regionFilter: "区域",
    allRegions: "全部区域",
    showing: "当前显示",
    entries: "个入口",
    noResults: "当前价值链与区域组合下暂无企业。",
    resetFilters: "重置筛选",
    visit: "访问企业官网",
    signalsLabel: "趋势观察",
    signalsTitle: "推动 RISC-V 商业化的三个方向",
    signalOneTitle: "定制计算",
    signalOne: "处理器差异化正从内核选型扩展到自定义指令、子系统 IP 与软硬件协同设计。",
    signalTwoTitle: "AI 与更高性能",
    signalTwo: "商业产品正在从嵌入式控制延伸至向量、张量、客户端、服务器和 Chiplet 计算。",
    signalThreeTitle: "验证与产品化",
    signalThree:
      "成熟的模型、工具链、形式验证、硬件仿真与软件就绪度，正变得与 CPU RTL 本身同样重要。",
    note: "覆盖范围参考了《RISC-V Market Report: Market Adoption Accelerates 2026》简版报告，并进一步按照企业当前官网资料逐项核对。已被收购的业务按现有母公司关系标注。本页面是精选供应商地图，不构成排名。",
  },
} as const;

const segmentIcons: Record<IndustrySegmentId, typeof Cpu> = {
  "processor-ip": Cpu,
  "silicon-platforms": CircuitBoard,
  "design-enablement": Blocks,
};

function localized<T extends { en: string; zh: string }>(value: T, locale: "en" | "zh") {
  return locale === "zh" ? value.zh : value.en;
}

type IndustryLandscapeContentProps = {
  locale: string;
};

export function IndustryLandscapeContent({ locale }: IndustryLandscapeContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const [segmentFilter, setSegmentFilter] = useState<"all" | IndustrySegmentId>("all");
  const [regionFilter, setRegionFilter] = useState<"all" | IndustryRegionId>("all");
  const companiesInSelectedRegion = industryCompanies.filter(
    (company) => regionFilter === "all" || company.regionGroup === regionFilter,
  );
  const companiesInSelectedSegment = industryCompanies.filter(
    (company) => segmentFilter === "all" || company.segment === segmentFilter,
  );
  const visibleCompanies = industryCompanies.filter(
    (company) =>
      (segmentFilter === "all" || company.segment === segmentFilter) &&
      (regionFilter === "all" || company.regionGroup === regionFilter),
  );

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end lg:py-8">
          <div className="max-w-4xl">
            <Link
              href={`/${resolvedLocale}/resources`}
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
              <Building2 className="h-4 w-4" />
              {t.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <aside className="grid grid-cols-2 border-y border-[var(--border)] py-5 lg:border-y-0 lg:border-l lg:py-1 lg:pl-8">
            <Stat value={industryCompanies.length} label={t.companies} />
            <Stat value={industrySegments.length} label={t.segments} bordered />
          </aside>
        </section>

        <section aria-labelledby="industry-map-heading">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                <Network className="h-4 w-4" />
                {t.mapLabel}
              </div>
              <h2
                id="industry-map-heading"
                className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl"
              >
                {t.mapTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {t.mapSubtitle}
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[var(--text-tertiary)]">
              <CheckCircle2 className="h-4 w-4 text-[var(--green)]" />
              {t.verified}
            </div>
          </div>

          <div className="grid border-y border-[var(--border)] sm:grid-cols-3">
            {industrySegments.map((segment, index) => {
              const Icon = segmentIcons[segment.id];
              const count = industryCompanies.filter(
                (company) => company.segment === segment.id,
              ).length;

              return (
                <div
                  key={segment.id}
                  className={`py-5 sm:px-5 ${
                    index > 0 ? "border-t border-[var(--border)] sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-tertiary)]">
                      {count}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                    {localized(segment.title, resolvedLocale)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {localized(segment.description, resolvedLocale)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 grid gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="inline-flex w-28 shrink-0 items-center gap-2 text-xs font-semibold text-[var(--text-tertiary)]">
                <Network className="h-4 w-4 text-[var(--primary)]" />
                {t.valueChainFilter}
              </div>
              <div
                role="group"
                aria-label={t.valueChainFilter}
                className="flex w-full flex-wrap gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-1 sm:w-fit"
              >
                <FilterButton
                  active={segmentFilter === "all"}
                  label={t.all}
                  count={companiesInSelectedRegion.length}
                  onClick={() => setSegmentFilter("all")}
                />
                {industrySegments.map((segment) => (
                  <FilterButton
                    key={segment.id}
                    active={segmentFilter === segment.id}
                    label={localized(segment.shortTitle, resolvedLocale)}
                    count={
                      companiesInSelectedRegion.filter((company) => company.segment === segment.id)
                        .length
                    }
                    onClick={() => setSegmentFilter(segment.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="inline-flex w-28 shrink-0 items-center gap-2 text-xs font-semibold text-[var(--text-tertiary)]">
                <Globe2 className="h-4 w-4 text-[var(--primary)]" />
                {t.regionFilter}
              </div>
              <div
                role="group"
                aria-label={t.regionFilter}
                className="flex w-full flex-wrap gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-1 sm:w-fit"
              >
                <FilterButton
                  active={regionFilter === "all"}
                  label={t.allRegions}
                  count={companiesInSelectedSegment.length}
                  onClick={() => setRegionFilter("all")}
                />
                {industryRegions.map((region) => (
                  <FilterButton
                    key={region.id}
                    active={regionFilter === region.id}
                    label={localized(region.title, resolvedLocale)}
                    count={
                      companiesInSelectedSegment.filter(
                        (company) => company.regionGroup === region.id,
                      ).length
                    }
                    onClick={() => setRegionFilter(region.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-tertiary)]">
              {t.showing} {visibleCompanies.length} {t.entries}
            </p>
            {(segmentFilter !== "all" || regionFilter !== "all") && (
              <p className="hidden max-w-2xl text-right text-sm text-[var(--text-tertiary)] md:block">
                {segmentFilter === "all"
                  ? t.all
                  : localized(
                      industrySegments.find((segment) => segment.id === segmentFilter)!.shortTitle,
                      resolvedLocale,
                    )}
                {" · "}
                {regionFilter === "all"
                  ? t.allRegions
                  : localized(
                      industryRegions.find((region) => region.id === regionFilter)!.title,
                      resolvedLocale,
                    )}
              </p>
            )}
          </div>

          {visibleCompanies.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  locale={resolvedLocale}
                  cta={t.visit}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-y border-[var(--border)] py-12 text-center">
              <p className="text-sm text-[var(--text-secondary)]">{t.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setSegmentFilter("all");
                  setRegionFilter("all");
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                <RotateCcw className="h-4 w-4" />
                {t.resetFilters}
              </button>
            </div>
          )}
        </section>

        <section className="border-y border-[var(--border)] py-8" aria-labelledby="signals-heading">
          <div className="mb-6 max-w-3xl">
            <div className="mb-2 text-xs font-semibold text-[var(--primary)]">{t.signalsLabel}</div>
            <h2
              id="signals-heading"
              className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl"
            >
              {t.signalsTitle}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-0">
            <Signal index="01" title={t.signalOneTitle} text={t.signalOne} />
            <Signal index="02" title={t.signalTwoTitle} text={t.signalTwo} bordered />
            <Signal index="03" title={t.signalThreeTitle} text={t.signalThree} bordered />
          </div>
        </section>

        <p className="pb-2 text-xs leading-6 text-[var(--text-tertiary)]">{t.note}</p>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  bordered = false,
}: {
  value: number;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "border-l border-[var(--border)] pl-5" : "pr-5"}>
      <div className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">{label}</div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[var(--primary)] text-white shadow-sm"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
      }`}
    >
      {label}
      <span className={active ? "text-white/70" : "text-[var(--text-tertiary)]"}>{count}</span>
    </button>
  );
}

function CompanyCard({
  company,
  locale,
  cta,
}: {
  company: IndustryCompany;
  locale: "en" | "zh";
  cta: string;
}) {
  const segment = industrySegments.find((item) => item.id === company.segment)!;

  return (
    <article className="h-full">
      <a
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full min-h-[350px] flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition hover:-translate-y-0.5 hover:border-[var(--primary)]/50 hover:shadow-[var(--card-shadow)]"
      >
        <div className="flex h-24 items-center justify-center border-b border-[var(--border)] bg-white px-5">
          <span
            className={`flex h-16 w-full max-w-[240px] items-center justify-center px-3 ${
              company.logoSurface === "dark" ? "rounded-md bg-[#101820]" : ""
            }`}
          >
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={320}
              height={144}
              unoptimized
              className="h-full w-full object-contain"
            />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-[var(--text-tertiary)]">
            <span className="truncate text-[var(--primary)]">
              {localized(segment.shortTitle, locale)}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1">
              <MapPin className="h-3 w-3" />
              {localized(company.region, locale)}
            </span>
          </div>
          <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--text-primary)]">
            {company.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-[var(--text-tertiary)]">
            {localized(company.entityType, locale)}
          </p>
          <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
            {localized(company.summary, locale)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {company.focus.slice(0, 3).map((focus) => (
              <span
                key={focus}
                className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-[11px] font-medium text-[var(--text-tertiary)]"
              >
                {focus}
              </span>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
            {cta}
            <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </a>
    </article>
  );
}

function Signal({
  index,
  title,
  text,
  bordered = false,
}: {
  index: string;
  title: string;
  text: string;
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "md:border-l md:border-[var(--border)] md:px-6" : "md:pr-6"}>
      <span className="font-mono text-xs font-semibold text-[var(--primary)]">{index}</span>
      <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
    </div>
  );
}
