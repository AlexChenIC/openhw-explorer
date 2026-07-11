// New original human-authored or human-edited course content added after
// 2026-07-10 may be rights reserved where applicable. Historical Apache-2.0
// grants, third-party material, and non-protectable material are not affected.
// See LICENSE-CONTENT.md at the repository root.

export type ClassroomLocale = "en" | "zh";

export type LocalizedText = Record<ClassroomLocale, string>;

export type ClassroomTrackStatus = "open" | "planned";
export type ClassroomSeriesStatus = "pilot" | "planned";
export type ClassroomLessonStatus = "featured" | "pilot" | "draft" | "planned";

export interface ClassroomTrack {
  id: string;
  status: ClassroomTrackStatus;
  title: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
  seriesIds: string[];
}

export interface ClassroomLesson {
  id: string;
  classroomId?: string;
  classroomIds?: Partial<Record<ClassroomLocale, string>>;
  projectId: string;
  seriesId: string;
  status: ClassroomLessonStatus;
  order: number;
  unitId: string;
  skillId: string;
  language: ClassroomLocale;
  durationMinutes: number;
  slideCount: number;
  quizCount: number;
  level: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  tags: string[];
  sourceRefs: string[];
}

export interface ClassroomSkill {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  lessonIds: string[];
}

export interface ClassroomUnit {
  id: string;
  order: number;
  title: LocalizedText;
  goal: LocalizedText;
  skillIds: string[];
}

export interface ClassroomSeries {
  id: string;
  trackId: string;
  projectId: string;
  status: ClassroomSeriesStatus;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
  level: LocalizedText;
  estimatedHours: number;
  lessonsPlanned: number;
  lessonsReady: number;
  featuredLessonId?: string;
  units: ClassroomUnit[];
  skills: ClassroomSkill[];
  lessons: ClassroomLesson[];
}

export const classroomTracks: ClassroomTrack[] = [
  {
    id: "openhw-foundations",
    status: "open",
    title: {
      en: "OpenHW Foundations",
      zh: "OpenHW 基础导读",
    },
    description: {
      en: "Understand OpenHW as an industrial open-source RISC-V IP ecosystem before entering individual core deep dives.",
      zh: "在进入具体处理器核心深度课前，先理解 OpenHW 作为工业级开源 RISC-V IP 生态的定位。",
    },
    audience: {
      en: "Learners, engineers, and partners who want the context behind OpenHW and CORE-V.",
      zh: "适合希望理解 OpenHW 与 CORE-V 背景的学习者、工程师和产业伙伴。",
    },
    seriesIds: ["openhw-foundations"],
  },
  {
    id: "processor-cores",
    status: "open",
    title: {
      en: "Processor Core Deep Dives",
      zh: "处理器核心深度课",
    },
    description: {
      en: "Human-reviewed courses that connect architecture explanations to official documentation and source code.",
      zh: "把架构讲解与官方文档、源码相连接，并经过人工核对的技术课程。",
    },
    audience: {
      en: "Students, RTL engineers, verification engineers, and researchers.",
      zh: "面向学生、RTL 工程师、验证工程师和研究人员。",
    },
    seriesIds: ["cva6-from-zero"],
  },
  {
    id: "verification",
    status: "planned",
    title: {
      en: "Verification Workshops",
      zh: "验证实践工作坊",
    },
    description: {
      en: "Practical verification courses built around real OpenHW environments and contribution workflows.",
      zh: "围绕真实 OpenHW 验证环境和贡献流程制作的实践课程。",
    },
    audience: {
      en: "Verification engineers and contributors preparing to work with CORE-V projects.",
      zh: "面向准备参与 CORE-V 项目的验证工程师和贡献者。",
    },
    seriesIds: [],
  },
  {
    id: "contribution",
    status: "planned",
    title: {
      en: "Contribution Onboarding",
      zh: "开源贡献入门",
    },
    description: {
      en: "Guided material for understanding project boundaries, evidence, and contribution practice.",
      zh: "帮助学习者理解项目边界、资料依据与实际贡献方法的引导课程。",
    },
    audience: {
      en: "New contributors looking for a practical route into OpenHW projects.",
      zh: "面向希望进入 OpenHW 项目的新贡献者。",
    },
    seriesIds: [],
  },
];

// These selected packages are public previews of the classroom format. They are
// not presented as completed, fully reviewed courses; the roadmap below shows
// the intended structure for future human-reviewed production.
export const classroomSeries: ClassroomSeries[] = [
  {
    id: "cva6-from-zero",
    trackId: "processor-cores",
    projectId: "cva6",
    status: "pilot",
    title: { en: "CVA6 From Zero", zh: "CVA6 从零开始" },
    subtitle: {
      en: "A structured path for understanding CVA6 before opening large RTL folders.",
      zh: "在打开大型 RTL 目录之前，先建立 CVA6 的资料、边界、配置和架构地图。",
    },
    description: {
      en: "This public blueprint shows the intended nine-unit learning path. One bilingual prototype lesson is available now to demonstrate the classroom format; the remaining units will be rebuilt with direct human review.",
      zh: "这里公开展示计划中的九个 Unit 课程框架。目前保留一节中英双语原型样课用于体验课堂形式，其余内容将由人工参与重新制作和核对。",
    },
    audience: {
      en: "Learners who know basic RISC-V concepts and want to read CVA6 like an engineer.",
      zh: "适合已经了解基础 RISC-V 概念、希望用工程方式阅读 CVA6 的学习者。",
    },
    level: { en: "Starter to intermediate", zh: "入门到进阶" },
    estimatedHours: 13,
    lessonsPlanned: 50,
    lessonsReady: 1,
    featuredLessonId: "cva6-u01-l01-what-is-cva6",
    units: [
      {
        id: "u01-orientation",
        order: 1,
        title: { en: "Build the CVA6 map", zh: "先建立 CVA6 地图" },
        goal: {
          en: "Know what CVA6 is, what it is not, and how official materials should be read.",
          zh: "知道 CVA6 是什么、不是什么，以及官方资料应该如何阅读。",
        },
        skillIds: ["u01-s01-positioning"],
      },
      {
        id: "u02-configuration",
        order: 2,
        title: { en: "Configuration literacy", zh: "建立配置意识" },
        goal: {
          en: "Understand why CVA6 variants and configuration points change technical conclusions.",
          zh: "理解为什么 CVA6 的变体和配置点会改变技术判断。",
        },
        skillIds: [],
      },
      {
        id: "u03-architecture",
        order: 3,
        title: { en: "Architecture reading spine", zh: "架构阅读主线" },
        goal: {
          en: "Read the main CVA6 architecture path from PC generation to commit before drilling into detailed subsystems.",
          zh: "先从 PC generation 到 commit 建立架构阅读主线，再进入更细的子系统。",
        },
        skillIds: [],
      },
      {
        id: "u04-frontend",
        order: 4,
        title: { en: "Frontend deep dive", zh: "Frontend 与分支预测" },
        goal: {
          en: "Understand PC selection, replay, redirects, RAS, BHT, BTB caveats, and source-scoped frontend behavior.",
          zh: "理解 PC selection、replay、redirect、RAS、BHT、BTB caveat 及 frontend 行为。",
        },
        skillIds: [],
      },
      {
        id: "u05-issue-scoreboard",
        order: 5,
        title: { en: "Issue, Scoreboard, and Hazards", zh: "Issue、Scoreboard 与 Hazard" },
        goal: {
          en: "Understand in-order issue, scoreboard tracking, RAW/WAW hazards, forwarding, and structural stalls.",
          zh: "理解 in-order issue、scoreboard、RAW/WAW hazard、forwarding 和 structural stall。",
        },
        skillIds: [],
      },
      {
        id: "u06-execute-commit",
        order: 6,
        title: { en: "Execute, Commit, and Precise State", zh: "Execute、Commit 与精确状态" },
        goal: {
          en: "Separate execution, branch resolution, side-effect buffering, commit authority, and precise exceptions.",
          zh: "区分执行、分支解析、副作用缓冲、commit 权限和精确异常处理。",
        },
        skillIds: [],
      },
      {
        id: "u07-memory-system",
        order: 7,
        title: { en: "Memory and LSU", zh: "Memory 与 LSU" },
        goal: {
          en: "Build a source-grounded path through the LSU, translation, cache boundaries, PMA, and ordering.",
          zh: "围绕 LSU、地址转换、cache 边界、PMA 和顺序约束建立资料可追溯的 memory path。",
        },
        skillIds: [],
      },
      {
        id: "u08-interfaces-integration",
        order: 8,
        title: { en: "Interfaces and Integration", zh: "接口与系统集成" },
        goal: {
          en: "Classify CVA6 system boundaries across bus, interrupt, debug, extension, and integration interfaces.",
          zh: "梳理总线、中断、调试、扩展与集成接口上的 CVA6 系统边界。",
        },
        skillIds: [],
      },
      {
        id: "u09-source-reading-verification",
        order: 9,
        title: { en: "Source Reading and Verification Handoff", zh: "源码阅读与验证交接" },
        goal: {
          en: "Turn architecture understanding into disciplined source reading and concrete verification questions.",
          zh: "把架构理解转化为有方法的源码阅读和具体的验证问题。",
        },
        skillIds: [],
      },
    ],
    skills: [
      {
        id: "u01-s01-positioning",
        title: { en: "Official positioning", zh: "官方定位" },
        description: {
          en: "Describe CVA6 as a configurable RISC-V application processor core and separate it from SoC-level concerns.",
          zh: "把 CVA6 描述为可配置的 RISC-V application processor core，并与 SoC 级对象区分开。",
        },
        lessonIds: ["cva6-u01-l01-what-is-cva6"],
      },
    ],
    lessons: [
      {
        id: "cva6-u01-l01-what-is-cva6",
        classroomIds: {
          en: "openhw-cva6-u01-l01-what-is-cva6-en",
          zh: "openhw-cva6-u01-l01-what-is-cva6-zh",
        },
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "featured",
        order: 1,
        unitId: "u01-orientation",
        skillId: "u01-s01-positioning",
        language: "en",
        durationMinutes: 8,
        slideCount: 7,
        quizCount: 3,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "What is CVA6: do not start with random RTL",
          zh: "CVA6 是什么：先别急着打开 RTL",
        },
        summary: {
          en: "Establish the official engineering positioning of CVA6 before reading modules and configuration code.",
          zh: "在阅读模块和配置代码前，先建立 CVA6 的官方工程定位。",
        },
        outcome: {
          en: "Describe CVA6 as a configurable RISC-V application processor core, not a full SoC.",
          zh: "用工程化语言描述 CVA6：它是可配置的 RISC-V application processor core，而不是完整 SoC。",
        },
        tags: ["CVA6", "RISC-V", "RTL reading"],
        sourceRefs: ["CVA6 README", "CVA6 User Manual"],
      },
    ],
  },
  {
    id: "openhw-foundations",
    trackId: "openhw-foundations",
    projectId: "openhw",
    status: "pilot",
    title: { en: "OpenHW Foundations", zh: "OpenHW 基础导读" },
    subtitle: {
      en: "A practical introduction to OpenHW as an industrial open-source RISC-V IP ecosystem.",
      zh: "从产业采用角度理解 OpenHW 作为开源 RISC-V IP 生态的入门样课。",
    },
    description: {
      en: "This preview introduces OpenHW, CORE-V deliverables, licensing, verification, tooling, roadmap, and ecosystem support. It remains a format prototype rather than a completed course series.",
      zh: "这节样课介绍 OpenHW、CORE-V deliverables、许可、验证、工具、路线图和生态支持。目前它仍是课程形式原型，而不是已经完成的正式系列。",
    },
    audience: {
      en: "Engineers, students, researchers, and partners who want context before choosing a specific CORE-V project.",
      zh: "适合在选择具体 CORE-V 项目前，想先理解 OpenHW 背景的工程师、学生、研究者和产业伙伴。",
    },
    level: { en: "Starter", zh: "入门" },
    estimatedHours: 0.4,
    lessonsPlanned: 1,
    lessonsReady: 1,
    featuredLessonId: "openhw-u01-l01-industrial-adoption",
    units: [
      {
        id: "u01-openhw-industrial-context",
        order: 1,
        title: { en: "OpenHW industrial context", zh: "OpenHW 产业背景" },
        goal: {
          en: "Build a mental model for OpenHW, CORE-V deliverables, adoption gates, and the path into project deep dives.",
          zh: "建立 OpenHW、CORE-V deliverables、产业采用门槛和进入项目深度学习路径的整体认知。",
        },
        skillIds: ["u01-s01-openhw-adoption"],
      },
    ],
    skills: [
      {
        id: "u01-s01-openhw-adoption",
        title: { en: "Read OpenHW as an adoption ecosystem", zh: "从采用生态角度理解 OpenHW" },
        description: {
          en: "Connect RISC-V, CORE-V, licensing, verification, tooling, roadmap, and ecosystem support.",
          zh: "把 RISC-V、CORE-V、许可、验证、工具、路线图和生态支持串联起来。",
        },
        lessonIds: ["openhw-u01-l01-industrial-adoption"],
      },
    ],
    lessons: [
      {
        id: "openhw-u01-l01-industrial-adoption",
        classroomIds: { en: "openhw-overview-industrial-adoption-en" },
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "featured",
        order: 1,
        unitId: "u01-openhw-industrial-context",
        skillId: "u01-s01-openhw-adoption",
        language: "en",
        durationMinutes: 22,
        slideCount: 14,
        quizCount: 0,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "OpenHW foundations: industrial open-source RISC-V IP",
          zh: "OpenHW 基础导读：面向产业的开源 RISC-V IP",
        },
        summary: {
          en: "Use OpenHW Group public slide decks to understand OpenHW's role, CORE-V deliverables, permissive licensing, verification quality, ecosystem readiness, and digital sovereignty.",
          zh: "基于 OpenHW Group 公开演示材料，理解 OpenHW 的角色、CORE-V deliverables、宽松许可、验证质量、生态准备度和数字主权意义。",
        },
        outcome: {
          en: "Explain why OpenHW is more than a set of repositories and identify key adoption gates before project deep dives.",
          zh: "解释为什么 OpenHW 不只是仓库集合，并识别进入具体项目深度学习前的重要采用门槛。",
        },
        tags: ["OpenHW", "CORE-V", "RISC-V", "open-source hardware"],
        sourceRefs: [
          "Lessons Learned: Open Source RISC-V Cores Commercial Adoption, Nov 2023",
          "HiPEAC 2024: RISC-V Cores in industrial quality and Open Source",
        ],
      },
    ],
  },
];

export function getClassroomBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_OPENHW_CLASSROOM_BASE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:3002";
  }

  return "https://alexchen-openhw-classroom.vercel.app";
}

export function getClassroomUrl(classroomId: string, baseUrl = getClassroomBaseUrl()) {
  return `${baseUrl}/classroom/${classroomId}`;
}

export function getLocalizedText(text: LocalizedText, locale: string) {
  return text[locale === "zh" ? "zh" : "en"];
}

export function getSeriesById(seriesId: string) {
  return classroomSeries.find((series) => series.id === seriesId);
}

export function getTrackById(trackId: string) {
  return classroomTracks.find((track) => track.id === trackId);
}

export function getLessonById(seriesId: string, lessonId: string) {
  return getSeriesById(seriesId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getFeaturedLesson(series: ClassroomSeries) {
  return series.lessons.find((lesson) => lesson.id === series.featuredLessonId);
}

export function getClassroomIdForLocale(lesson: ClassroomLesson, locale: string) {
  const resolvedLocale: ClassroomLocale = locale === "zh" ? "zh" : "en";
  return (
    lesson.classroomIds?.[resolvedLocale] ??
    lesson.classroomId ??
    lesson.classroomIds?.en ??
    lesson.classroomIds?.zh
  );
}

export function hasPublishedLesson(lesson: ClassroomLesson) {
  return Boolean(lesson.classroomId || lesson.classroomIds?.en || lesson.classroomIds?.zh);
}

export function lessonUsesClassroomId(lesson: ClassroomLesson, classroomId: string) {
  return (
    lesson.classroomId === classroomId ||
    lesson.classroomIds?.en === classroomId ||
    lesson.classroomIds?.zh === classroomId
  );
}

export function getReadyLessons(series: ClassroomSeries) {
  return series.lessons.filter(
    (lesson) => lesson.status === "featured" || lesson.status === "pilot",
  );
}
