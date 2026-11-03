import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { ProjectKnowledgeSection } from "@/components/ProjectKnowledgeSection";
import { getProjectKnowledge, knowledgeBase } from "@/data/knowledge";
import en from "../messages/en.json";
import zh from "../messages/zh.json";

function renderKnowledge(id: string, locale: "en" | "zh", baseline = false) {
  return renderToStaticMarkup(
    <NextIntlClientProvider locale={locale} messages={locale === "zh" ? zh : en} timeZone="UTC">
      <ProjectKnowledgeSection
        knowledge={getProjectKnowledge(id)}
        summary={null}
        stats={null}
        launchStage={baseline ? "baseline" : undefined}
      />
    </NextIntlClientProvider>,
  );
}

describe("Project knowledge resource navigation", () => {
  for (const locale of ["en", "zh"] as const) {
    it(`${locale} links each paper count to one visible, focusable paper section`, () => {
      for (const id of Object.keys(knowledgeBase)) {
        const html = renderKnowledge(id, locale);
        const count = getProjectKnowledge(id)?.academicPapers?.length ?? 0;
        if (!count) {
          expect(html).not.toContain('href="#academic-papers"');
          expect(html).not.toContain('id="academic-papers"');
          continue;
        }
        expect(html.match(/href="#academic-papers"/g)).toHaveLength(1);
        expect(html.match(/id="academic-papers"/g)).toHaveLength(1);
        expect(html).toMatch(/<section id="academic-papers" tabindex="-1"/);
        expect(html).toContain("scroll-mt-28");
        expect(html).toContain('aria-expanded="true"');
        expect(html).toContain(locale === "zh" ? `${count} 篇论文` : `${count} paper(s)`);
        const controlledId = html.match(/aria-controls="([^"]+)"/)?.[1];
        expect(controlledId).toBeTruthy();
        expect(html).toContain(`<div id="${controlledId}"`);
        for (const paper of getProjectKnowledge(id)!.academicPapers!) {
          expect(html).toContain(`href="${paper.url || `https://doi.org/${paper.doi}`}"`);
        }
      }
    });

    it(`${locale} does not offer a dead jump link for missing or staged content`, () => {
      expect(renderKnowledge("missing-project", locale)).not.toContain("#academic-papers");
      expect(renderKnowledge("cva6", locale, true)).not.toContain("#academic-papers");
    });
  }
});
