import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import profileMeta from "@/data/project-profile-meta.json";
import { projects, filterProjects, localizeProject } from "@/data/projects";
import { getProjectKnowledge } from "@/data/knowledge";

const getProject = (id: string) => projects.find((project) => project.id === id)!;

describe("September 2026 project fact-check regressions", () => {
  it("publishes all 40 bilingual source profiles without truncating evidence lists", () => {
    expect(projects).toHaveLength(40);
    for (const project of projects) {
      const profile = profileMeta.profiles[project.id as keyof typeof profileMeta.profiles];
      const source = readFileSync(`docs/repos/${project.id}/profile.md`, "utf8");
      expect(source, project.id).toContain(profile.summary);
      expect(source, project.id).toContain(profile.summaryZh);
      expect(profile.sourceCount, project.id).toBe(new Set(profile.sourceUrls).size);
      expect(profile.sourceUrls.length, project.id).toBe(profile.sourceCount);
      expect(project.descriptionSourceUrls, project.id).toEqual(profile.sourceUrls);
      expect(project.keyFacts?.length, project.id).toBe(project.keyFactsZh?.length);
      expect(profile.verifiedAt, project.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(localizeProject(project, "zh").description, project.id).toBe(profile.summaryZh);
    }
    expect(getProject("cva6").descriptionSourceUrls!.length).toBeGreaterThan(8);
  });

  it("distinguishes existing CVA6 configurations and their Linux capabilities", () => {
    const project = getProject("cva6");
    expect(project.description).toContain("dual-issue configurations, such as CV32A65X");
    expect(project.description).toContain("no MMU or S/U modes");
    expect(localizeProject(project, "zh").description).toContain("双发射配置");
    expect(project.tags).not.toContain("Assembly");
    expect(getProject("core-v-cores").keyFacts?.join(" ")).toContain("dual-issue CV32A65X");
  });

  it("does not advertise extensible FPU formats or partial verification as universal support", () => {
    expect(getProject("cvfpu").description).toContain("binary128 is not a built-in selectable format");
    expect(getProject("cvfpu").keyFacts?.join(" ")).toContain("FP16ALT");
    const limitations = getProject("cvfpu-uvm").keyFacts?.join(" ");
    expect(limitations).toContain("no vector FP testing");
    expect(limitations).toContain("RMM/ROD/DYN");
    expect(getProject("cv32e40p").keyFacts?.join(" ")).toContain("excluding F and XPULP");
  });

  it("routes CVA6 verification and the FreeRTOS kernel to the actual source trees", () => {
    expect(getProject("core-v-verif").furtherResources?.some((resource) =>
      resource.url === "https://github.com/openhwgroup/cva6/blob/master/verif/README.md",
    )).toBe(true);
    for (const id of ["core-v-freertos", "core-v-freertos-kernel"]) {
      expect(getProject(id).description).toContain("pulp-platform/pulp-freertos-kernel");
    }
    expect(getProject("cve2").description).not.toContain("optional multiplication/division and compressed");
    expect(getProject("core-v-xif").description).toContain("channels are optional");
  });

  it("keeps static maintenance assessments separate from live GitHub signals", () => {
    const dv = getProject("cv32e40s-dv");
    expect(dv.status).toBe("active");
    expect(dv.statusSource).toBe("editorial");
    expect(dv.statusSourceUrl).toContain("/commit/8b27b963");
    expect(dv.keyFacts?.join(" ")).toContain("July 27, 2026");
    expect(localizeProject(dv, "zh").description).not.toContain("非活跃");
    expect(getProject("cv32e40s").statusSource).toBe("openhw");
    expect(getProject("cv32e41p").statusSource).toBe("github");
  });

  it("uses the current artifact as the primary category without removing secondary discovery", () => {
    expect(getProject("core-et").category).toEqual(["ip", "soc"]);
    expect(getProject("uap").category).toEqual(["docs", "ip"]);
    expect(filterProjects({ category: "ip" }).map((project) => project.id)).toContain("uap");
    expect(filterProjects({ category: "soc" }).map((project) => project.id)).toContain("core-et");
  });

  it("uses publisher author order and counts neither manuals nor duplicate versions as papers", () => {
    const expectedAuthors = new Map([
      ["10.1109/TVLSI.2017.2654506", "Michael Gautschi, Pasquale Davide Schiavone, Andreas Traber, et al."],
      ["10.1109/PATMOS.2017.8106976", "Pasquale Davide Schiavone, Francesco Conti, Davide Rossi, et al."],
      ["10.1109/S3S.2018.8640145", "Pasquale Davide Schiavone, Davide Rossi, Antonio Pullini, et al."],
      ["10.1109/TVLSI.2021.3058162", "Pasquale Davide Schiavone, Davide Rossi, Alfio Di Mauro, et al."],
    ]);
    const papers = ["cv32e40p", "core-v-mcu"].flatMap((id) => getProjectKnowledge(id)?.academicPapers || []);
    for (const [doi, authors] of expectedAuthors) {
      expect(papers.find((paper) => paper.doi === doi)?.authors, doi).toBe(authors);
    }
    expect(getProjectKnowledge("cvw")?.academicPapers || []).toHaveLength(0);
    expect(getProjectKnowledge("core-v-verif")?.academicPapers || []).toHaveLength(0);
    expect(getProjectKnowledge("cvfpu")?.academicPapers).toHaveLength(1);
    expect(getProject("cvw").furtherResources?.some((resource) => resource.label.includes("2026"))).toBe(true);
  });

  it("does not reintroduce unsupported lineage or manufacturing claims in hidden data", () => {
    for (const id of ["cv32e41p", "cv32e40s", "cve2"]) {
      const relationships = getProjectKnowledge(id)?.ecosystem?.map((item) => item.relationship) || [];
      expect(relationships).not.toContain("succeeded-by");
      expect(relationships).not.toContain("security-lineage");
      expect(relationships).not.toContain("candidate-for");
    }
    const devkit = JSON.stringify(getProjectKnowledge("core-v-mcu-devkit"));
    expect(devkit).not.toContain("Manufactured");
    expect(devkit).not.toContain("Arnold chip");
  });
});
