import type { ClassroomSeries } from "./classrooms";

export const projectGuides: ClassroomSeries = {
  id: "project-guides",
  trackId: "project-guides",
  projectId: "cva6",
  status: "in-production",
  visibility: "featured",
  title: { en: "Project Guides", zh: "项目导览" },
  subtitle: {
    en: "From a repository to an engineering starting point.",
    zh: "从项目仓库，找到工程学习的起点。",
  },
  description: {
    en: "Short introductions to project capabilities, configuration choices and source code.",
    zh: "用短课理解项目能力、配置选择与源码入口。",
  },
  audience: {
    en: "Students and engineers evaluating an OpenHW project.",
    zh: "面向学习或评估 OpenHW 项目的学生与工程师。",
  },
  level: { en: "Introduction", zh: "入门导览" },
  estimatedHours: 0.2,
  units: [
    {
      id: "project-intros",
      order: 1,
      title: { en: "Understand the project", zh: "理解项目" },
      goal: {
        en: "Identify the right configuration and next source.",
        zh: "找准配置和下一份阅读资料。",
      },
      skillIds: ["cva6-orientation"],
    },
  ],
  skills: [
    {
      id: "cva6-orientation",
      title: { en: "Read CVA6 in context", zh: "建立 CVA6 地图" },
      description: { en: "Separate core, configuration and system.", zh: "区分内核、配置和系统。" },
      lessonIds: ["cva6-introduction"],
    },
  ],
  lessons: [
    {
      id: "cva6-introduction",
      seriesId: "project-guides",
      projectId: "cva6",
      classroomIds: { en: "cva6-project-intro-en", zh: "cva6-project-intro-zh" },
      status: "demo",
      role: "catalog",
      order: 1,
      unitId: "project-intros",
      skillId: "cva6-orientation",
      language: "en",
      durationMinutes: 12,
      slideCount: 12,
      quizCount: 4,
      level: { en: "Introduction", zh: "入门导览" },
      title: { en: "CVA6: Capabilities, Systems and Evidence", zh: "CVA6：能力、系统与工程证据" },
      summary: {
        en: "Read real configurations, explain execution, and evaluate software, maturity and application evidence.",
        zh: "对照真实配置，理解执行过程，并判断软件支持、工程成熟度和应用案例的证据范围。",
      },
      outcome: {
        en: "Write a configuration-scoped evaluation with system requirements, evidence and remaining gaps.",
        zh: "写出包含具体配置、系统要求、证据和剩余缺口的评估记录。",
      },
      tags: ["CVA6", "configuration", "verification", "applications"],
      sourceRefs: ["CVA6 81245a47fad8", "CV32A60X v6.0.0", "ThreadX", "Basilisk", "Occamy"],
    },
  ],
};
