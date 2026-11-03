import { describe, expect, it } from "vitest";
import { ecosystemCategories } from "@/data/ecosystem";
import { resourceDirectoryCategories } from "@/data/resources";
import { parseResourceNavigation, resourceNavigationHref } from "@/lib/resource-navigation";
import { localeHref } from "@/lib/locale-href";

describe("Resource directory URL state", () => {
  it("restores legacy anchors with explicit query modes taking precedence", () => {
    expect(parseResourceNavigation("").mode).toBe("technical");
    expect(parseResourceNavigation("", "#ecosystem").mode).toBe("ecosystem");
    expect(parseResourceNavigation("", "#technical-library").mode).toBe("technical");
    expect(parseResourceNavigation("?view=technical", "#ecosystem").mode).toBe("technical");
    expect(parseResourceNavigation("?view=ecosystem", "#technical-library").mode).toBe("ecosystem");
  });

  it("validates unknown query values without losing unrelated parameters", () => {
    const state = parseResourceNavigation(
      "?view=unknown&task=unknown&group=unknown&utm_source=talk",
    );
    expect(state).toEqual({ mode: "technical", task: "standards-docs", group: "all" });
    expect(resourceNavigationHref("/zh/resources", "?utm_source=talk", "", state)).toBe(
      "/zh/resources?utm_source=talk&view=technical",
    );
  });

  it("round-trips every declared category in both locales, including inactive tab state", () => {
    for (const locale of ["en", "zh"]) {
      for (const task of resourceDirectoryCategories) {
        for (const group of ecosystemCategories) {
          const state = { mode: "ecosystem" as const, task: task.id, group: group.id };
          const href = resourceNavigationHref(
            `/${locale}/resources`,
            "?utm_source=talk",
            "#ecosystem",
            state,
          );
          const url = new URL(href, "https://example.invalid");
          expect(url.pathname).toBe(`/${locale}/resources`);
          expect(url.searchParams.get("utm_source")).toBe("talk");
          expect(parseResourceNavigation(url.search, url.hash)).toEqual(state);
          expect(
            parseResourceNavigation(
              url.search.replace("view=ecosystem", "view=technical"),
              url.hash,
            ),
          ).toEqual({ ...state, mode: "technical" });
        }
      }
    }
  });

  it("does not leave a tab change pointing at the hidden panel", () => {
    const state = { mode: "technical" as const, task: "learning" as const, group: "pdk" as const };
    expect(resourceNavigationHref("/en/resources", "", "#ecosystem", state)).toBe(
      "/en/resources?view=technical&task=learning&group=pdk#resource-explorer",
    );
    expect(
      resourceNavigationHref("/en/resources", "", "#technical-library", {
        ...state,
        mode: "ecosystem",
      }),
    ).toContain("#resource-explorer");
  });

  it("retains directory selection when switching language", () => {
    const search = "?view=ecosystem&group=pdk&task=learning";
    expect(localeHref("/resources", search, "#ecosystem", "en")).toBe(
      `/resources${search}#ecosystem`,
    );
    expect(parseResourceNavigation(search, "#ecosystem")).toEqual({
      mode: "ecosystem",
      group: "pdk",
      task: "learning",
    });
  });
});
