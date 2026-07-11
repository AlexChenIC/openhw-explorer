"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Boxes,
  Building2,
  ChevronRight,
  CircuitBoard,
  Code2,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  LibraryBig,
  MapPin,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import {
  ecosystemCategories,
  ecosystemEntries,
  ecosystemVerifiedAt,
  type EcosystemCategoryId,
  type EcosystemEntry,
} from "@/data/ecosystem";
import {
  resourceDirectoryAttribution,
  resourceDirectoryCategories,
  resourceDirectoryLinks,
  type ResourceCategoryId,
  type ResourceKind,
} from "@/data/resources";
import { industryCompanies } from "@/data/industry-landscape";

const copy = {
  en: {
    eyebrow: "OpenHW Explorer · Resources",
    title: "Open Hardware Ecosystem & Resources",
    subtitle:
      "Find technical references, map open organizations and projects, or explore the companies productizing RISC-V.",
    statsEcosystem: "ecosystem entries",
    statsResources: "technical resources",
    statsIndustry: "industry companies",
    resourceViews: "Resource views",
    technicalMode: "Technical library",
    technicalModeDescription: "Standards, documentation, tools, and learning references",
    ecosystemMode: "Ecosystem directory",
    ecosystemModeDescription:
      "Foundations, open silicon, process design kits, research, and participation",
    industryMode: "Industry landscape",
    industryModeDescription: "Commercial processor IP, silicon, platforms, and design enablement",
    ecosystemLabel: "Ecosystem map",
    ecosystemTitle: "Explore the open hardware landscape",
    ecosystemSubtitle:
      "A source-checked set of foundations, open silicon projects, process design kits, research institutions, and practical ways to participate.",
    allOrganizations: "All",
    organizations: "entries",
    verified: `Source-checked ${ecosystemVerifiedAt}`,
    openWebsite: "Visit official site",
    libraryLabel: "Technical library",
    libraryTitle: "Browse resources by task",
    librarySubtitle:
      "Choose one area to see a focused set of authoritative documentation, tools, and references without scanning the entire directory.",
    showing: "Showing",
    linkCount: "links",
    openResource: "Open resource",
    attributionTitle: "Sources & attribution",
    attribution:
      "Technical links were seeded from RISC-V Ottawa and independently reorganized; ecosystem entries are checked against their official sites.",
    license:
      "External sites, names, and marks remain the property of their respective owners and follow their own terms.",
    sourceRepository: "Source repository",
  },
  zh: {
    eyebrow: "OpenHW Explorer · 资源导航",
    title: "开源硬件生态与资源导航",
    subtitle: "查找技术资料、浏览开源组织与项目，或探索推动 RISC-V 产品化的产业企业。",
    statsEcosystem: "个生态入口",
    statsResources: "个技术资源",
    statsIndustry: "家产业企业",
    resourceViews: "资源视图",
    technicalMode: "技术资料库",
    technicalModeDescription: "规范、工具、学习资料与实现参考",
    ecosystemMode: "生态导航",
    ecosystemModeDescription: "基金会、开源芯片、开放 PDK、科研机构与参与入口",
    industryMode: "产业版图",
    industryModeDescription: "商业处理器 IP、芯片、计算平台与设计支撑",
    ecosystemLabel: "生态地图",
    ecosystemTitle: "浏览开源硬件生态",
    ecosystemSubtitle: "经过官网核对的基金会、开源芯片项目、开放 PDK、科研机构与实践参与入口。",
    allOrganizations: "全部",
    organizations: "个入口",
    verified: `官网核对于 ${ecosystemVerifiedAt}`,
    openWebsite: "访问官方网站",
    libraryLabel: "技术资料库",
    libraryTitle: "按任务浏览技术资源",
    librarySubtitle: "选择一个方向，只查看相关的权威文档、工具与参考资料，不必滚动浏览完整目录。",
    showing: "当前显示",
    linkCount: "个链接",
    openResource: "打开资源",
    attributionTitle: "来源与归属",
    attribution: "技术链接以 RISC-V Ottawa 为初始参考并重新整理；生态入口均依据各自官方网站核对。",
    license: "外部网站、名称与标识归各自权利人所有，并遵循各自的使用条款。",
    sourceRepository: "来源仓库",
  },
} as const;

const categoryIcons: Record<ResourceCategoryId, typeof FileText> = {
  "standards-docs": FileText,
  learning: GraduationCap,
  hdls: Code2,
  toolchains: Wrench,
  simulation: CircuitBoard,
  "design-tools": Layers3,
  "verification-tools": ShieldCheck,
  commercial: Building2,
};

const kindLabels: Record<ResourceKind, { en: string; zh: string }> = {
  official: { en: "official", zh: "官方" },
  standard: { en: "standard", zh: "规范" },
  learning: { en: "learning", zh: "学习" },
  tool: { en: "tool", zh: "工具" },
  commercial: { en: "commercial", zh: "商业" },
};

type ResourceDirectoryContentProps = {
  locale: string;
};

function localized<T extends { en: string; zh: string }>(value: T, locale: "en" | "zh") {
  return locale === "zh" ? value.zh : value.en;
}

export function ResourceDirectoryContent({ locale }: ResourceDirectoryContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const [resourceMode, setResourceMode] = useState<"technical" | "ecosystem">("technical");
  const [ecosystemFilter, setEcosystemFilter] = useState<"all" | EcosystemCategoryId>("all");
  const [resourceCategory, setResourceCategory] = useState<ResourceCategoryId>("standards-docs");

  const visibleEcosystemEntries =
    ecosystemFilter === "all"
      ? ecosystemEntries
      : ecosystemEntries.filter((entry) => entry.category === ecosystemFilter);
  const activeResourceCategory =
    resourceDirectoryCategories.find((category) => category.id === resourceCategory) ??
    resourceDirectoryCategories[0];
  const activeResourceLinks = resourceDirectoryLinks.filter(
    (link) => link.category === activeResourceCategory.id,
  );
  const ActiveResourceIcon = categoryIcons[activeResourceCategory.id];

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end lg:py-8">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              <LibraryBig className="h-3.5 w-3.5" />
              {t.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <aside className="grid grid-cols-3 border-y border-[var(--border)] py-5 lg:border-y-0 lg:border-l lg:py-1 lg:pl-8">
            <Stat value={resourceDirectoryLinks.length} label={t.statsResources} />
            <Stat value={ecosystemEntries.length} label={t.statsEcosystem} bordered />
            <Stat value={industryCompanies.length} label={t.statsIndustry} bordered />
          </aside>
        </section>

        <section id="resource-explorer" aria-label={t.resourceViews} className="scroll-mt-28">
          <div className="grid w-full gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-1.5 sm:grid-cols-3">
            <div role="tablist" aria-label={t.resourceViews} className="contents">
              <ResourceModeButton
                id="technical-mode-tab"
                panelId="technical-library"
                icon={Boxes}
                label={t.technicalMode}
                description={t.technicalModeDescription}
                count={resourceDirectoryLinks.length}
                active={resourceMode === "technical"}
                onClick={() => setResourceMode("technical")}
              />
              <ResourceModeButton
                id="ecosystem-mode-tab"
                panelId="ecosystem"
                icon={Network}
                label={t.ecosystemMode}
                description={t.ecosystemModeDescription}
                count={ecosystemEntries.length}
                active={resourceMode === "ecosystem"}
                onClick={() => setResourceMode("ecosystem")}
              />
            </div>
            <ResourceModeLink
              href={`/${resolvedLocale}/resources/industry`}
              icon={Building2}
              label={t.industryMode}
              description={t.industryModeDescription}
              count={industryCompanies.length}
            />
          </div>

          <div
            id="ecosystem"
            role="tabpanel"
            aria-labelledby="ecosystem-mode-tab"
            hidden={resourceMode !== "ecosystem"}
            className="mt-9"
          >
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                  <Network className="h-4 w-4" />
                  {t.ecosystemLabel}
                </div>
                <h3
                  id="ecosystem-heading"
                  className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl"
                >
                  {t.ecosystemTitle}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {t.ecosystemSubtitle}
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[var(--text-tertiary)]">
                <ShieldCheck className="h-4 w-4 text-[var(--green)]" />
                {t.verified}
              </div>
            </div>

            <div
              role="group"
              aria-label={t.ecosystemLabel}
              className="mb-6 flex w-full flex-wrap gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-1 sm:w-fit"
            >
              <FilterButton
                active={ecosystemFilter === "all"}
                label={t.allOrganizations}
                count={ecosystemEntries.length}
                onClick={() => setEcosystemFilter("all")}
              />
              {ecosystemCategories.map((category) => {
                const count = ecosystemEntries.filter(
                  (entry) => entry.category === category.id,
                ).length;
                return (
                  <FilterButton
                    key={category.id}
                    active={ecosystemFilter === category.id}
                    label={localized(category.shortTitle, resolvedLocale)}
                    count={count}
                    onClick={() => setEcosystemFilter(category.id)}
                  />
                );
              })}
            </div>

            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm text-[var(--text-tertiary)]">
                {visibleEcosystemEntries.length} {t.organizations}
              </p>
              {ecosystemFilter !== "all" && (
                <p className="hidden max-w-2xl text-right text-sm text-[var(--text-tertiary)] md:block">
                  {localized(
                    ecosystemCategories.find((category) => category.id === ecosystemFilter)!
                      .description,
                    resolvedLocale,
                  )}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleEcosystemEntries.map((entry) => (
                <EcosystemCard
                  key={entry.id}
                  entry={entry}
                  locale={resolvedLocale}
                  cta={t.openWebsite}
                />
              ))}
            </div>
          </div>

          <div
            id="technical-library"
            role="tabpanel"
            aria-labelledby="technical-mode-tab"
            hidden={resourceMode !== "technical"}
            className="mt-9"
          >
            <div className="mb-6 max-w-3xl">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                <Boxes className="h-4 w-4" />
                {t.libraryLabel}
              </div>
              <h3
                id="technical-library-heading"
                className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl"
              >
                {t.libraryTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {t.librarySubtitle}
              </p>
            </div>

            <div
              role="group"
              aria-label={t.libraryTitle}
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {resourceDirectoryCategories.map((category) => {
                const Icon = categoryIcons[category.id];
                const count = resourceDirectoryLinks.filter(
                  (link) => link.category === category.id,
                ).length;
                const active = resourceCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setResourceCategory(category.id)}
                    className={`group flex min-h-16 items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                      active
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm"
                        : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--primary)]/45 hover:bg-[var(--bg-card-hover)]"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-[var(--primary)]/10 text-[var(--primary)]"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {localized(category.shortTitle, resolvedLocale)}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs ${
                          active ? "text-white/75" : "text-[var(--text-tertiary)]"
                        }`}
                      >
                        {count} {t.linkCount}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 ${
                        active ? "text-white/80" : "text-[var(--text-tertiary)]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <div className="mb-5 flex flex-col gap-3 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-tertiary)]">
                    <ActiveResourceIcon className="h-4 w-4 text-[var(--primary)]" />
                    {t.showing}
                  </div>
                  <h4 className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
                    {localized(activeResourceCategory.title, resolvedLocale)}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {localized(activeResourceCategory.description, resolvedLocale)}
                  </p>
                </div>
                <span className="w-fit text-sm font-semibold text-[var(--text-tertiary)]">
                  {activeResourceLinks.length} {t.linkCount}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {activeResourceLinks.map((link) => (
                  <ResourceCard
                    key={link.id}
                    link={link}
                    locale={resolvedLocale}
                    cta={t.openResource}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-2">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">{t.attributionTitle}</h2>
          <div className="mt-2 grid gap-1 text-xs leading-6 text-[var(--text-tertiary)] lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
            <div>
              <p>{t.attribution}</p>
              <p>{t.license}</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={resourceDirectoryAttribution.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)]"
              >
                {resourceDirectoryAttribution.sourceName}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={resourceDirectoryAttribution.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)]"
              >
                {t.sourceRepository}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type StatProps = {
  value: number;
  label: string;
  bordered?: boolean;
};

function Stat({ value, label, bordered = false }: StatProps) {
  return (
    <div className={bordered ? "border-l border-[var(--border)] pl-4 sm:pl-5" : "pr-4 sm:pr-5"}>
      <div className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">{label}</div>
    </div>
  );
}

type ResourceModeButtonProps = {
  id: string;
  panelId: string;
  icon: typeof Boxes;
  label: string;
  description: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

function ResourceModeButton({
  id,
  panelId,
  icon: Icon,
  label,
  description,
  count,
  active,
  onClick,
}: ResourceModeButtonProps) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={panelId}
      onClick={onClick}
      className={`flex min-h-24 items-center gap-4 rounded-md px-4 py-4 text-left transition ${
        active
          ? "bg-[var(--primary)] text-white shadow-sm"
          : "text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${
          active ? "bg-white/15 text-white" : "bg-[var(--primary)]/10 text-[var(--primary)]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3 text-base font-semibold">
          <span>{label}</span>
          <span className={active ? "text-white/75" : "text-[var(--text-tertiary)]"}>{count}</span>
        </span>
        <span
          className={`mt-1 block text-xs leading-5 ${
            active ? "text-white/75" : "text-[var(--text-tertiary)]"
          }`}
        >
          {description}
        </span>
      </span>
    </button>
  );
}

type ResourceModeLinkProps = {
  href: string;
  icon: typeof Boxes;
  label: string;
  description: string;
  count: number;
};

function ResourceModeLink({ href, icon: Icon, label, description, count }: ResourceModeLinkProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-24 items-center gap-4 rounded-md px-4 py-4 text-left text-[var(--text-primary)] transition hover:bg-[var(--bg-card-hover)]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3 text-base font-semibold">
          <span>{label}</span>
          <span className="text-[var(--text-tertiary)]">{count}</span>
        </span>
        <span className="mt-1 block text-xs leading-5 text-[var(--text-tertiary)]">
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
    </Link>
  );
}

type FilterButtonProps = {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
};

function FilterButton({ active, label, count, onClick }: FilterButtonProps) {
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

type EcosystemCardProps = {
  entry: EcosystemEntry;
  locale: "en" | "zh";
  cta: string;
};

function EcosystemCard({ entry, locale, cta }: EcosystemCardProps) {
  const category = ecosystemCategories.find((item) => item.id === entry.category)!;

  return (
    <article className="h-full">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full min-h-[330px] flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition hover:-translate-y-0.5 hover:border-[var(--primary)]/50 hover:shadow-[var(--card-shadow)]"
      >
        <div className="flex h-24 items-center justify-center border-b border-[var(--border)] bg-white px-5">
          {entry.logo ? (
            <div
              className={entry.category === "pdk" ? "h-16 w-[72%] max-w-[210px]" : "h-full w-full"}
            >
              <Image
                src={entry.logo}
                alt={`${entry.name} logo`}
                width={320}
                height={144}
                className="h-full w-full object-contain"
              />
            </div>
          ) : entry.mark ? (
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="text-xl font-bold text-slate-800">{entry.mark.label}</span>
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {entry.mark.node}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-[var(--text-tertiary)]">
            <span className="truncate text-[var(--primary)]">
              {localized(category.shortTitle, locale)}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1">
              <MapPin className="h-3 w-3" />
              {localized(entry.region, locale)}
            </span>
          </div>
          <h4 className="mt-3 text-base font-semibold leading-snug text-[var(--text-primary)]">
            {entry.name}
          </h4>
          <p className="mt-1 text-xs font-medium text-[var(--text-tertiary)]">
            {localized(entry.entityType, locale)}
          </p>
          {entry.relationship && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary)]">
              <Network className="h-3.5 w-3.5 shrink-0" />
              {localized(entry.relationship, locale)}
            </p>
          )}
          <p className="mt-2.5 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
            {localized(entry.summary, locale)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.focus.slice(0, 3).map((focus) => (
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

type ResourceCardProps = {
  link: (typeof resourceDirectoryLinks)[number];
  locale: "en" | "zh";
  cta: string;
};

function ResourceCard({ link, locale, cta }: ResourceCardProps) {
  const category = resourceDirectoryCategories.find((item) => item.id === link.category);
  const ResourceIcon = categoryIcons[link.category];
  const kindMatchesCategory = link.kind === link.category;
  const badgeWords = new Set(
    [link.kind, link.category, kindLabels[link.kind].en, category?.shortTitle.en ?? ""].map(
      (value) => value.toLowerCase(),
    ),
  );
  const visibleTags = link.tags.filter((tag) => !badgeWords.has(tag.toLowerCase())).slice(0, 3);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[215px] flex-col rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/50 hover:bg-[var(--bg-card-hover)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`grid shrink-0 place-items-center overflow-hidden rounded-md border ${
              link.logo
                ? "h-12 w-16 border-[var(--border)] bg-white"
                : "h-12 w-12 border-[var(--primary)]/15 bg-[var(--primary)]/10 text-[var(--primary)]"
            }`}
          >
            {link.logo ? (
              <Image
                src={link.logo}
                alt=""
                width={128}
                height={80}
                className="h-8 w-12 object-contain"
              />
            ) : (
              <ResourceIcon className="h-5 w-5" />
            )}
          </span>
          <div className="min-w-0 pt-0.5">
            {!kindMatchesCategory && (
              <span className="mb-1.5 inline-flex rounded-md bg-[var(--primary)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                {kindLabels[link.kind][locale]}
              </span>
            )}
            <h4 className="text-base font-semibold leading-snug text-[var(--text-primary)]">
              {link.title}
            </h4>
          </div>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition group-hover:text-[var(--primary)]" />
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
        {localized(link.summary, locale)}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[var(--bg-subtle)] px-2 py-1 text-[11px] font-medium text-[var(--text-tertiary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
        {cta}
        <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}
