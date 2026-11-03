import { describe, expect, it } from "vitest";
import { projectCategoryHref } from "@/lib/project-links";
import { filterConfig } from "@/data/filters";
import { filterProjects } from "@/data/projects";

describe("Project category links", () => {
  it("links every category to a supported non-empty directory filter", () => {
    for (const { id } of filterConfig.categories) {
      const url = new URL(projectCategoryHref(id), "https://example.invalid");
      expect(url.hash).toBe("#projects");
      expect(url.searchParams.get("cat")).toBe(id);
      expect(filterProjects({ category: id }).length).toBeGreaterThan(0);
    }
  });

  it("preserves search and audience while clearing incompatible refinements", () => {
    const url = new URL(
      projectCategoryHref(
        "ip",
        "?cat=core&core=low-power&verify=uvm-testbench&role=engineer&q=cache",
      ),
      "https://example.invalid",
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({
      cat: "ip",
      role: "engineer",
      q: "cache",
    });
    expect(projectCategoryHref("soc", "?core=fault-tolerant&verify=uvm-testbench")).toBe(
      "/?core=fault-tolerant&cat=soc#projects",
    );
    expect(projectCategoryHref("verification", "?core=low-power&verify=uvm-testbench")).toBe(
      "/?verify=uvm-testbench&cat=verification#projects",
    );
  });
});
