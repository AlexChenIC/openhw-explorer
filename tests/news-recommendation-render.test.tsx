import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { NewsContent } from "@/components/NewsContent";
import record from "@/data/news-editor-pick.json";
import en from "../messages/en.json";
import zh from "../messages/zh.json";

describe("safe static recommendation rendering", () => {
  for (const locale of ["en", "zh"] as const) {
    it(`${locale} retains latest news and the archive without baking a time-sensitive pin into static HTML`, () => {
      const messages = locale === "zh" ? zh : en;
      const html = renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Shanghai">
          <NewsContent />
        </NextIntlClientProvider>,
      );
      expect(html).toContain(messages.news.latestSignal);
      expect(html).toContain(record.pick.url);
      expect(html).not.toContain(messages.news.editorSignal);
      expect(html).not.toContain(record.pick.reason[locale]);
      const brief = html.split('<section class="mb-9">')[1].split("</section>")[0];
      expect(brief.match(/<article\b/g)).toHaveLength(3);
      expect(brief).not.toContain("<button");
      expect(brief).not.toContain("Full summary");
      expect(brief).not.toContain("完整摘要");
      expect(brief).toContain("line-clamp-2");
      expect(html).toContain(locale === "zh" ? "完整摘要" : "Full summary");
      expect(brief).toContain(messages.news.openhwSignal);
      expect(brief).toContain(messages.news.toolchainSignal);
      expect(brief).toContain("https://www.ee.cityu.edu.hk/news/2026/10-22-2026");
    });
  }
});
