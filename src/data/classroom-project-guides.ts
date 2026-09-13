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
  estimatedHours: 0.15,
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
      durationMinutes: 8,
      slideCount: 9,
      quizCount: 3,
      level: { en: "Introduction", zh: "入门导览" },
      title: { en: "CVA6: From Core to System", zh: "CVA6：从处理器内核到系统" },
      summary: {
        en: "Compare real configurations, follow the core data path, and locate the platform and verification code.",
        zh: "对照真实配置，理解内核数据通路，并找到平台集成和验证代码的入口。",
      },
      outcome: {
        en: "Distinguish core, configuration and system, and trace a capability to its source.",
        zh: "区分内核、配置与系统，并能沿源码核对一项能力。",
      },
      tags: ["CVA6", "configuration", "integration"],
      sourceRefs: ["CVA6 49b5fa9e2f5a", "CVA6 SDK", "PULP Cheshire"],
    },
  ],
};
