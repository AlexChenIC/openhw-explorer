import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { ClassroomContent, CourseCard } from "@/components/ClassroomContent";
import en from "../messages/en.json";
import zh from "../messages/zh.json";

// Test card semantics without requiring a running Next router.
vi.mock("@/lib/routing", async () => {
  const { useLocale } = await import("next-intl");
  return {
    Link: function Link({ href, children, ...props }: ComponentProps<"a">) {
      const locale = useLocale();
      return (
        <a {...props} href={`/${locale}${href}`}>
          {children}
        </a>
      );
    },
  };
});

describe("Learning Hub course-card links", () => {
  for (const locale of ["en", "zh"] as const) {
    it(`${locale} exposes one full-card link per published course with no nested links`, () => {
      const html = renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} messages={locale === "zh" ? zh : en} timeZone="UTC">
          <ClassroomContent locale={locale} />
        </NextIntlClientProvider>,
      );
      const cards = html.match(/<a\b[^>]*aria-labelledby="course-[^"]+"[^>]*>[\s\S]*?<\/a>/g) ?? [];
      expect(cards).toHaveLength(3);
      for (const card of cards) {
        const titleId = card.match(/aria-labelledby="([^"]+)"/)![1];
        expect(card).toContain(`<h3 id="${titleId}"`);
        expect(card).toContain('href="/' + locale + "/classroom/");
        expect(card.match(/<a\b/g)).toHaveLength(1);
        expect(card).not.toContain("<button");
        expect(card).toContain("focus-visible:outline-2");
        if (locale === "zh") expect(card).toContain("开始学习");
        else expect(card).toMatch(/Start (lesson|learning)/);
      }
    });
  }

  it("does not make a planned card focusable or give it link hover effects", () => {
    const html = renderToStaticMarkup(
      <CourseCard titleId="planned">
        <h3 id="planned">Planned lesson</h3>
      </CourseCard>,
    );
    expect(html).toMatch(/^<article/);
    expect(html).not.toMatch(/<a\b|href=|tabindex=|hover:/);
  });
});
