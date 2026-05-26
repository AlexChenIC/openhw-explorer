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
    id: "processor-cores",
    status: "open",
    title: {
      en: "Processor Core Deep Dives",
      zh: "处理器核心深度课",
    },
    description: {
      en: "Learn OpenHW processor cores through source-grounded micro lessons, architecture maps, and implementation reading paths.",
      zh: "通过资料溯源的微课程、架构地图和源码阅读路径学习 OpenHW 处理器核心。",
    },
    audience: {
      en: "Students, RTL engineers, verification engineers, and researchers evaluating CORE-V processors.",
      zh: "适合学习 RISC-V 的学生、RTL 工程师、验证工程师，以及评估 CORE-V 处理器的研究者。",
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
      en: "Future lessons for UVM environments, FORCE-RISCV flows, compliance checks, and reusable verification habits.",
      zh: "未来用于组织 UVM 环境、FORCE-RISCV 流程、合规检查和可复用验证方法的课程线。",
    },
    audience: {
      en: "Verification engineers and contributors preparing to work with CORE-V verification repositories.",
      zh: "面向准备参与 CORE-V 验证仓库的验证工程师和社区贡献者。",
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
      en: "A guided path for ECA, contribution workflow, documentation reading, and first pull request preparation.",
      zh: "围绕 ECA、贡献流程、文档阅读和第一个 PR 准备的引导课程。",
    },
    audience: {
      en: "New contributors who want a practical route into OpenHW projects.",
      zh: "适合希望进入 OpenHW 项目的新贡献者。",
    },
    seriesIds: [],
  },
  {
    id: "source-library",
    status: "planned",
    title: {
      en: "Open Hardware Source Library",
      zh: "开放硬件资料库导读",
    },
    description: {
      en: "Curated readings, design notes, talks, and source bundles that support classroom production.",
      zh: "整理课程生产所需的公开资料、设计文档、演讲和源码资料包。",
    },
    audience: {
      en: "Learners who prefer reading maps and source collections before taking a full course.",
      zh: "适合希望先看资料地图和公开资料集合，再进入完整课程的学习者。",
    },
    seriesIds: [],
  },
];

export const classroomSeries: ClassroomSeries[] = [
  {
    id: "cva6-from-zero",
    trackId: "processor-cores",
    projectId: "cva6",
    status: "pilot",
    title: {
      en: "CVA6 From Zero",
      zh: "CVA6 从零开始",
    },
    subtitle: {
      en: "A structured learning path for understanding CVA6 before opening large RTL folders.",
      zh: "在打开大型 RTL 目录之前，先建立 CVA6 的资料、边界、配置和架构地图。",
    },
    description: {
      en: "This pilot series starts with CVA6 orientation, IP boundaries, configuration literacy, and architecture reading habits. The currently published lessons are temporary previews for validating the OpenHW Explorer publishing flow.",
      zh: "这条试发布课程线从 CVA6 官方定位、IP 边界、配置意识和架构阅读方法开始。当前发布的课程仍是临时样课，用于验证 OpenHW Explorer 的课程发布流程。",
    },
    audience: {
      en: "Learners who know basic RISC-V concepts and want to read CVA6 like an engineer.",
      zh: "适合已经了解一点 RISC-V，希望用工程方式阅读 CVA6 的学习者。",
    },
    level: {
      en: "Starter to intermediate",
      zh: "入门到进阶",
    },
    estimatedHours: 7,
    lessonsPlanned: 50,
    lessonsReady: 2,
    featuredLessonId: "cva6-u01-l01-what-is-cva6",
    units: [
      {
        id: "u01-orientation",
        order: 1,
        title: {
          en: "Unit 01 · Build the CVA6 map",
          zh: "Unit 01 · 先建立 CVA6 地图",
        },
        goal: {
          en: "Know what CVA6 is, what it is not, and how official materials should be read.",
          zh: "知道 CVA6 是什么、不是什么，以及官方资料应该如何阅读。",
        },
        skillIds: ["u01-s01-positioning", "u01-s02-source-literacy"],
      },
      {
        id: "u02-configuration",
        order: 2,
        title: {
          en: "Unit 02 · Configuration literacy",
          zh: "Unit 02 · 建立配置意识",
        },
        goal: {
          en: "Understand why CVA6 variants and configuration points change technical conclusions.",
          zh: "理解为什么 CVA6 的变体和配置点会改变技术判断。",
        },
        skillIds: [],
      },
      {
        id: "u03-architecture",
        order: 3,
        title: {
          en: "Unit 03 · Architecture reading spine",
          zh: "Unit 03 · 架构阅读主线",
        },
        goal: {
          en: "Read the main CVA6 architecture path from frontend to commit and memory.",
          zh: "从 frontend 到 commit 与 memory system，建立 CVA6 架构阅读主线。",
        },
        skillIds: [],
      },
    ],
    skills: [
      {
        id: "u01-s01-positioning",
        title: {
          en: "Skill 01 · Official positioning",
          zh: "Skill 01 · 官方定位",
        },
        description: {
          en: "Describe CVA6 as a configurable RISC-V application processor core and separate it from SoC-level concerns.",
          zh: "把 CVA6 描述为可配置的 RISC-V application processor core，并与 SoC 级对象区分开。",
        },
        lessonIds: ["cva6-u01-l01-what-is-cva6", "cva6-u01-l02-ip-not-soc"],
      },
      {
        id: "u01-s02-source-literacy",
        title: {
          en: "Skill 02 · Source literacy",
          zh: "Skill 02 · 资料地图",
        },
        description: {
          en: "Choose the right official source before drilling into CVA6 modules and architecture details.",
          zh: "在深入 CVA6 模块和架构细节前，先选择正确的官方资料入口。",
        },
        lessonIds: ["cva6-u01-l05-architecture-map"],
      },
    ],
    lessons: [
      {
        id: "cva6-u01-l01-what-is-cva6",
        classroomId: "openhw-cva6-u01-l01-what-is-cva6-en",
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
        level: {
          en: "Starter",
          zh: "入门",
        },
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
          zh: "用一句工程化语言描述 CVA6：它是可配置的 RISC-V application processor core，而不是完整 SoC。",
        },
        tags: ["CVA6", "RISC-V", "RTL reading"],
        sourceRefs: ["CVA6 README", "CVA6 User Manual"],
      },
      {
        id: "cva6-u01-l02-ip-not-soc",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "planned",
        order: 2,
        unitId: "u01-orientation",
        skillId: "u01-s01-positioning",
        language: "en",
        durationMinutes: 8,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "What CVA6 is not: IP, core, cache, and SoC boundaries",
          zh: "CVA6 不是什么：IP、core、cache、SoC 的边界",
        },
        summary: {
          en: "Use the official scope diagram to separate CVA6 IP responsibilities from surrounding SoC integration.",
          zh: "用官方 scope 图区分 CVA6 IP 自身职责和 SoC 集成边界。",
        },
        outcome: {
          en: "Tell whether a technical question belongs inside CVA6 IP or outside the core integration boundary.",
          zh: "判断一个技术问题到底属于 CVA6 IP 内部，还是属于外部 SoC 集成边界。",
        },
        tags: ["scope", "SoC boundary", "CVA6"],
        sourceRefs: ["CVA6 User Manual Scope"],
      },
      {
        id: "cva6-u01-l05-architecture-map",
        classroomId: "openhw-cva6-architecture-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 5,
        unitId: "u01-orientation",
        skillId: "u01-s02-source-literacy",
        language: "en",
        durationMinutes: 9,
        slideCount: 10,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "First architecture map: from boundary to pipeline",
          zh: "第一张架构地图：从边界到流水线主线",
        },
        summary: {
          en: "Connect the scope diagram, overview diagram, Issue/Scoreboard, and branch prediction into one reading route.",
          zh: "把 scope 图、overview 图、Issue/Scoreboard 与分支预测串成一条架构阅读路线。",
        },
        outcome: {
          en: "Know where to start when reading the CVA6 architecture documents.",
          zh: "知道阅读 CVA6 架构资料时应该从哪里开始、如何避免一上来迷路。",
        },
        tags: ["CVA6", "architecture", "pipeline"],
        sourceRefs: ["CVA6 User Manual", "CV32A60X Design"],
      },
      {
        id: "cva6-slidekit-a1",
        classroomId: "openhw-cva6-slidekit-a1-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "draft",
        order: 0,
        unitId: "u01-orientation",
        skillId: "u01-s02-source-literacy",
        language: "en",
        durationMinutes: 6,
        slideCount: 6,
        quizCount: 2,
        level: {
          en: "Prototype",
          zh: "原型",
        },
        title: {
          en: "SlideKit visual prototype",
          zh: "SlideKit 视觉原型课",
        },
        summary: {
          en: "A temporary design prototype used to evaluate the HTML slide style and classroom embedding quality.",
          zh: "用于评估 HTML slides 风格和课堂嵌入效果的临时设计原型课。",
        },
        outcome: {
          en: "Validate the visual direction before publishing production lessons.",
          zh: "在发布正式课程前验证视觉方向。",
        },
        tags: ["prototype", "SlideKit", "visual QA"],
        sourceRefs: ["OpenHW Classroom prototype"],
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

export function getReadyLessons(series: ClassroomSeries) {
  return series.lessons.filter(
    (lesson) => lesson.classroomId && (lesson.status === "featured" || lesson.status === "pilot"),
  );
}
