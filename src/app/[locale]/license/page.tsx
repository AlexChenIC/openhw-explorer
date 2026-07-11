import type { Metadata } from "next";
import { BookOpenCheck, Code2, ExternalLink, History, Scale } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { externalLinks } from "@/data/external-links";
import { SITE_URL } from "@/lib/site-url";

type LicensePageProps = {
  params: Promise<{ locale: string }>;
};

const copy = {
  en: {
    title: "Licensing and content rights",
    description:
      "How OpenHW Explorer separates Apache-2.0 software from original learning, editorial, brand, and third-party material.",
    badge: "Legal & attribution",
    intro:
      "OpenHW Explorer combines open-source software with separately licensed content. The summary below is provided for clarity; the repository files contain the complete terms.",
    codeTitle: "Software and navigator data",
    codeBody:
      "The website code, build tools, translations, project catalog, evidence profiles, and other identified navigator data are licensed under Apache-2.0.",
    contentTitle: "Original learning and editorial content",
    contentBody:
      "New human-authored or human-edited courses, original summaries, annotations, and brand artwork may be rights reserved where copyright or related rights subsist. Public facts, purely machine-generated material, and third-party works are not claimed as Alex Chen's exclusive property.",
    historyTitle: "Historical and third-party material",
    historyBody:
      "Earlier Apache-2.0 grants remain valid. Upstream logos, diagrams, papers, screenshots, and other third-party works remain governed by their respective owners and terms.",
    fullTerms: "Read the complete license scope",
    attributions: "Review third-party attributions",
  },
  zh: {
    title: "许可与内容权利",
    description:
      "说明 OpenHW Explorer 如何区分 Apache-2.0 软件、原创学习与编辑内容、品牌素材和第三方材料。",
    badge: "法律与来源说明",
    intro:
      "OpenHW Explorer 同时包含开源软件和适用不同条款的内容。以下为便于理解的摘要；完整条款以仓库中的许可文件为准。",
    codeTitle: "软件与导航数据",
    codeBody:
      "网站代码、构建工具、翻译、项目目录、证据档案和其他明确列出的导航数据采用 Apache-2.0 许可。",
    contentTitle: "原创学习与编辑内容",
    contentBody:
      "未来由人工创作或实质编辑的课程、原创摘要、注释和品牌图稿，在版权或相关权利成立的范围内保留权利。本站不把公开事实、无法获得版权保护的纯 AI 生成物或第三方作品主张为 Alex Chen 的独占财产。",
    historyTitle: "历史版本与第三方材料",
    historyBody:
      "过去已经授予的 Apache-2.0 许可继续有效。上游 logo、图表、论文、第三方网站截图及其他第三方作品继续适用各自权利人的条款。",
    fullTerms: "查看完整许可范围",
    attributions: "查看第三方来源说明",
  },
} as const;

export async function generateMetadata({ params }: LicensePageProps): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const text = copy[resolvedLocale];

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: `${SITE_URL}/${resolvedLocale}/license`,
      languages: {
        en: `${SITE_URL}/en/license`,
        zh: `${SITE_URL}/zh/license`,
      },
    },
  };
}

export default async function LicensePage({ params }: LicensePageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const text = copy[resolvedLocale];
  const licenseUrl = `${externalLinks.projectGithub}/blob/main/LICENSE-CONTENT.md`;
  const attributionUrl = `${externalLinks.projectGithub}/blob/main/docs/third-party-attributions.md`;

  setRequestLocale(resolvedLocale);

  const sections = [
    { title: text.codeTitle, body: text.codeBody, Icon: Code2 },
    { title: text.contentTitle, body: text.contentBody, Icon: BookOpenCheck },
    { title: text.historyTitle, body: text.historyBody, Icon: History },
  ];

  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-full">
        <Header />
        <div className="page-shell">
          <div className="page-container max-w-5xl">
            <div className="page-hero text-left">
              <div className="page-badge page-badge-primary">
                <Scale className="h-4 w-4" />
                {text.badge}
              </div>
              <h1 className="page-title max-w-3xl">{text.title}</h1>
              <p className="page-subtitle max-w-3xl">{text.intro}</p>
            </div>

            <div className="border-y border-[var(--border)]">
              {sections.map(({ title, body, Icon }) => (
                <section
                  key={title}
                  className="grid gap-5 border-b border-[var(--border)] py-8 last:border-b-0 sm:grid-cols-[44px_minmax(0,1fr)] sm:py-10"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                      {body}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            <div className="flex flex-col gap-3 py-9 sm:flex-row">
              <a
                href={licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)]"
              >
                {text.fullTerms}
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--primary)]/45 hover:text-[var(--primary)]"
              >
                {text.attributions}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
