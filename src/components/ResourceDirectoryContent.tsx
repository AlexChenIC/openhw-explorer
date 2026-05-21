import {
  BookOpen,
  Boxes,
  Building2,
  CircuitBoard,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  LibraryBig,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import {
  resourceDirectoryAttribution,
  resourceDirectoryCategories,
  resourceDirectoryLinks,
  type ResourceCategoryId,
  type ResourceKind,
} from "@/data/resources";

const copy = {
  en: {
    eyebrow: "OpenHW Explorer · Resources",
    title: "A curated map for RISC-V and open hardware learning",
    subtitle:
      "Use this page as a reliable starting point for specifications, official docs, open-source design tools, verification tools, simulators, communities, and selected commercial references.",
    statsResources: "resources",
    statsCategories: "categories",
    statsFeatured: "featured picks",
    browseTitle: "Browse by category",
    featuredTitle: "Featured starting points",
    featuredSubtitle:
      "These entries are the best first stops when you are learning RISC-V, OpenHW, or open-source hardware verification.",
    linkCount: "links",
    openResource: "Open resource",
    attributionTitle: "Source note",
    attribution:
      "This directory uses RISC-V Ottawa's open resources as an initial seed, then rewrites and extends the descriptions for OpenHW Explorer.",
    license:
      "RISC-V Ottawa's repository is MIT licensed. External resources keep their own licenses and terms.",
  },
  zh: {
    eyebrow: "OpenHW Explorer · 资源库",
    title: "面向 RISC-V 与开源硬件学习的精选资源地图",
    subtitle:
      "这里整理规范、官方资料、开源设计工具、验证工具、模拟器、社区和少量商业工具参考，作为学习 OpenHW 和 RISC-V 的可靠入口。",
    statsResources: "个资源",
    statsCategories: "个分类",
    statsFeatured: "个精选入口",
    browseTitle: "按分类浏览",
    featuredTitle: "推荐起点",
    featuredSubtitle: "如果你刚开始学习 RISC-V、OpenHW 或开源硬件验证，可以先从这些入口开始。",
    linkCount: "个链接",
    openResource: "打开资源",
    attributionTitle: "来源说明",
    attribution:
      "本资源库以 RISC-V Ottawa 的公开 resources 作为第一批 seed，并结合 OpenHW Explorer 的定位重新改写和扩展描述。",
    license: "RISC-V Ottawa 仓库采用 MIT 许可证。外部资源仍遵循各自的许可证和使用条款。",
  },
} as const;

const categoryIcons: Record<ResourceCategoryId, typeof FileText> = {
  specifications: FileText,
  official: Compass,
  openhw: Cpu,
  learning: GraduationCap,
  hdls: Code2,
  toolchains: Wrench,
  simulation: CircuitBoard,
  "design-tools": Layers3,
  "verification-tools": ShieldCheck,
  community: Network,
  commercial: Building2,
};

const kindLabels: Record<ResourceKind, { en: string; zh: string }> = {
  official: { en: "official", zh: "官方" },
  standard: { en: "standard", zh: "规范" },
  learning: { en: "learning", zh: "学习" },
  tool: { en: "tool", zh: "工具" },
  project: { en: "project", zh: "项目" },
  community: { en: "community", zh: "社区" },
  commercial: { en: "commercial", zh: "商业" },
};

type ResourceDirectoryContentProps = {
  locale: string;
};

function localized<T extends { en: string; zh: string }>(value: T, locale: string) {
  return locale === "zh" ? value.zh : value.en;
}

export function ResourceDirectoryContent({ locale }: ResourceDirectoryContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const t = copy[resolvedLocale];
  const featuredLinks = resourceDirectoryLinks.filter((link) => link.featured);

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-4 lg:grid-cols-[1fr_360px] lg:items-end lg:py-8">
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

          <aside className="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[var(--card-shadow)]">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {resourceDirectoryLinks.length}
              </div>
              <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                {t.statsResources}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {resourceDirectoryCategories.length}
              </div>
              <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                {t.statsCategories}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
              <div className="text-2xl font-bold text-[var(--text-primary)]">
                {featuredLinks.length}
              </div>
              <div className="mt-1 text-[11px] leading-4 text-[var(--text-tertiary)]">
                {t.statsFeatured}
              </div>
            </div>
          </aside>
        </section>

        <section aria-labelledby="resource-categories" className="scroll-mt-24">
          <div className="mb-4 flex items-center gap-2">
            <Boxes className="h-5 w-5 text-[var(--primary)]" />
            <h2
              id="resource-categories"
              className="text-xl font-semibold text-[var(--text-primary)]"
            >
              {t.browseTitle}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourceDirectoryCategories.map((category) => {
              const Icon = categoryIcons[category.id];
              const count = resourceDirectoryLinks.filter(
                (link) => link.category === category.id,
              ).length;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="group rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-[var(--bg-card-hover)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                          {localized(category.shortTitle, resolvedLocale)}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                          {count} {t.linkCount}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--text-tertiary)] transition group-hover:text-[var(--primary)]" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="featured-resources" className="scroll-mt-24">
          <div className="mb-5 flex flex-col gap-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/10 px-3 py-1 text-xs font-semibold text-[var(--green)]">
              <BookOpen className="h-3.5 w-3.5" />
              {t.featuredTitle}
            </div>
            <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
              {t.featuredSubtitle}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredLinks.map((link) => (
              <ResourceCard
                key={link.id}
                link={link}
                locale={resolvedLocale}
                cta={t.openResource}
                featured
              />
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-8">
          {resourceDirectoryCategories.map((category) => {
            const links = resourceDirectoryLinks.filter((link) => link.category === category.id);
            if (links.length === 0) return null;
            const Icon = categoryIcons[category.id];

            return (
              <section key={category.id} id={category.id} className="scroll-mt-28">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                      <Icon className="h-4 w-4 text-[var(--primary)]" />
                      {localized(category.shortTitle, resolvedLocale)}
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                      {localized(category.title, resolvedLocale)}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                      {localized(category.description, resolvedLocale)}
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs font-semibold text-[var(--text-tertiary)]">
                    {links.length} {t.linkCount}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {links.map((link) => (
                    <ResourceCard
                      key={link.id}
                      link={link}
                      locale={resolvedLocale}
                      cta={t.openResource}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--card-shadow)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {t.attributionTitle}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{t.attribution}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{t.license}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={resourceDirectoryAttribution.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
            >
              {resourceDirectoryAttribution.sourceName}
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={resourceDirectoryAttribution.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
            >
              riscv-ottawa/riscvottawa
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

type ResourceCardProps = {
  link: (typeof resourceDirectoryLinks)[number];
  locale: "en" | "zh";
  cta: string;
  featured?: boolean;
};

function ResourceCard({ link, locale, cta, featured = false }: ResourceCardProps) {
  const category = resourceDirectoryCategories.find((item) => item.id === link.category);
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex min-h-[190px] flex-col rounded-xl border p-4 transition hover:-translate-y-0.5 hover:border-[var(--primary)]/50 hover:bg-[var(--bg-card-hover)] ${
        featured
          ? "border-[var(--primary)]/25 bg-[var(--primary)]/8"
          : "border-[var(--border)] bg-[var(--bg-card)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
              {kindLabels[link.kind][locale]}
            </span>
            {category && (
              <span className="rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-tertiary)]">
                {localized(category.shortTitle, locale)}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold leading-snug text-[var(--text-primary)]">
            {link.title}
          </h3>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition group-hover:text-[var(--primary)]" />
      </div>

      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
        {localized(link.summary, locale)}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {link.tags.slice(0, 4).map((tag) => (
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
        <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </a>
  );
}
