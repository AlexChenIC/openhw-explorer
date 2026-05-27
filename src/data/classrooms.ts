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
    lessonsReady: 23,
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
        skillIds: ["u01-s01-positioning", "u01-s02-source-literacy", "u01-s03-checkpoint"],
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
        skillIds: ["u02-s01-family", "u02-s02-configuration-reading", "u02-s03-checkpoint"],
      },
      {
        id: "u03-architecture",
        order: 3,
        title: {
          en: "Unit 03 · Architecture reading spine",
          zh: "Unit 03 · 架构阅读主线",
        },
        goal: {
          en: "Read the main CVA6 architecture path from PC generation to commit before drilling into detailed subsystems.",
          zh: "先从 PC generation 到 commit 建立 CVA6 架构阅读主线，再进入更细的子系统。",
        },
        skillIds: ["u03-s01-flow", "u03-s02-backend-spine", "u03-s03-checkpoint"],
      },
      {
        id: "u04-frontend",
        order: 4,
        title: {
          en: "Unit 04 · Frontend deep dive",
          zh: "Unit 04 · Frontend 与分支预测",
        },
        goal: {
          en: "Understand PC selection, replay, redirects, RAS, BHT, BTB caveats, and source-scoped frontend behavior.",
          zh: "深入理解 PC selection、replay、redirect、RAS、BHT、BTB caveat，以及基于资料边界的 frontend 行为。",
        },
        skillIds: ["u04-s01-pc-selection", "u04-s02-predictors", "u04-s03-checkpoint"],
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
        lessonIds: [
          "cva6-u01-l03-doc-roles",
          "cva6-u01-l04-scope-diagram",
          "cva6-u01-l05-architecture-map",
        ],
      },
      {
        id: "u01-s03-checkpoint",
        title: {
          en: "Skill 03 · Orientation checkpoint",
          zh: "Skill 03 · 入门检查点",
        },
        description: {
          en: "Confirm that learners can place positioning, boundaries, and source roles before deeper architecture lessons.",
          zh: "确认学习者能区分定位、边界和资料角色，再进入更深的架构课程。",
        },
        lessonIds: ["cva6-u01-l06-checkpoint-orientation"],
      },
      {
        id: "u02-s01-family",
        title: {
          en: "Skill 01 · Family and variants",
          zh: "Skill 01 · 家族与变体",
        },
        description: {
          en: "Read CVA6 as a configurable CORE-V family before making claims about a named product configuration.",
          zh: "在谈论具体产品配置前，先把 CVA6 作为可配置的 CORE-V 家族来阅读。",
        },
        lessonIds: ["cva6-u02-l01-cv32-cv64-family", "cva6-u02-l02-cv32a60x-profile"],
      },
      {
        id: "u02-s02-configuration-reading",
        title: {
          en: "Skill 02 · Parameter reading",
          zh: "Skill 02 · 参数阅读",
        },
        description: {
          en: "Use configuration parameters to decide which CVA6 technical conclusions are safe for a specific variant.",
          zh: "用配置参数判断哪些 CVA6 技术结论只适用于具体变体。",
        },
        lessonIds: [
          "cva6-u02-l03-parameter-map",
          "cva6-u02-l04-rtl-config-workflow",
          "cva6-u02-l05-variant-comparison",
        ],
      },
      {
        id: "u02-s03-checkpoint",
        title: {
          en: "Skill 03 · Configuration checkpoint",
          zh: "Skill 03 · 配置检查点",
        },
        description: {
          en: "Confirm that learners can keep family, variant, parameter evidence, and public claims aligned before architecture lessons.",
          zh: "确认学习者能在进入架构课程前，把家族、变体、参数证据和公开结论对齐。",
        },
        lessonIds: ["cva6-u02-l06-checkpoint-configurations"],
      },
      {
        id: "u03-s01-flow",
        title: {
          en: "Skill 01 · Architecture spine",
          zh: "Skill 01 · 架构主线",
        },
        description: {
          en: "Build the CVA6 six-stage reading path from PC generation through decode before entering backend details.",
          zh: "从 PC generation 到 decode 建立 CVA6 六级流水线阅读路径，再进入后端细节。",
        },
        lessonIds: [
          "cva6-u03-l01-six-stage-map",
          "cva6-u03-l02-pcgen-fetch",
          "cva6-u03-l03-decode",
        ],
      },
      {
        id: "u03-s02-backend-spine",
        title: {
          en: "Skill 02 · Backend spine",
          zh: "Skill 02 · 后端主线",
        },
        description: {
          en: "Separate issue, execute, result completion, and commit so the backend story remains precise.",
          zh: "区分 issue、execute、result completion 和 commit，让后端架构叙述保持精确。",
        },
        lessonIds: ["cva6-u03-l04-issue-execute", "cva6-u03-l05-commit"],
      },
      {
        id: "u03-s03-checkpoint",
        title: {
          en: "Skill 03 · Architecture checkpoint",
          zh: "Skill 03 · 架构检查点",
        },
        description: {
          en: "Confirm that learners can order the pipeline and place frontend, decode, issue, execute, and commit responsibilities.",
          zh: "确认学习者能排序流水线，并正确放置 frontend、decode、issue、execute 和 commit 的职责。",
        },
        lessonIds: ["cva6-u03-l06-checkpoint-pipeline"],
      },
      {
        id: "u04-s01-pc-selection",
        title: {
          en: "Skill 01 · PC selection and recovery paths",
          zh: "Skill 01 · PC 选择与恢复路径",
        },
        description: {
          en: "Read PC generation as a source-priority decision, including prediction, replay, exception, return, and commit-PC restart cases.",
          zh: "把 PC generation 读成 source-priority decision，并覆盖 prediction、replay、exception、return 和 commit-PC restart。",
        },
        lessonIds: [
          "cva6-u04-l01-pc-plus-four-is-not-enough",
          "cva6-u04-l02-replay-return-exception",
        ],
      },
      {
        id: "u04-s02-predictors",
        title: {
          en: "Skill 02 · RAS, BHT, and BTB boundaries",
          zh: "Skill 02 · RAS / BHT / BTB 组件边界",
        },
        description: {
          en: "Separate return-target prediction, conditional-branch direction prediction, and the CV32A60X no-BTB caveat.",
          zh: "区分 return-target prediction、conditional-branch direction prediction，以及 CV32A60X no-BTB caveat。",
        },
        lessonIds: ["cva6-u04-l03-ras", "cva6-u04-l04-bht-btb"],
      },
      {
        id: "u04-s03-checkpoint",
        title: {
          en: "Skill 03 · Frontend checkpoint",
          zh: "Skill 03 · Frontend checkpoint",
        },
        description: {
          en: "Confirm that learners can classify PC sources, replay, redirects, RAS, BHT, and BTB caveats without mixing roles.",
          zh: "确认学习者能区分 PC sources、replay、redirect、RAS、BHT 和 BTB caveat，而不是混成一团。",
        },
        lessonIds: ["cva6-u04-l05-checkpoint-frontend"],
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
        classroomId: "openhw-cva6-u01-l02-ip-not-soc-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 2,
        unitId: "u01-orientation",
        skillId: "u01-s01-positioning",
        language: "en",
        durationMinutes: 9,
        slideCount: 9,
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
        id: "cva6-u01-l03-doc-roles",
        classroomId: "openhw-cva6-u01-l03-doc-roles-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 3,
        unitId: "u01-orientation",
        skillId: "u01-s02-source-literacy",
        language: "en",
        durationMinutes: 9,
        slideCount: 9,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "README, User Manual, Design Docs: which source answers which question",
          zh: "README、User Manual、Design Doc 各管什么",
        },
        summary: {
          en: "Learn how to pick the right official CVA6 source before making architecture or implementation claims.",
          zh: "学习在做架构或实现判断前，如何选择正确的 CVA6 官方资料入口。",
        },
        outcome: {
          en: "Choose whether a question should be answered from README, User Manual, requirements, or configuration-specific design docs.",
          zh: "判断一个问题应该由 README、User Manual、requirements，还是具体配置 design doc 回答。",
        },
        tags: ["source literacy", "documentation", "CVA6"],
        sourceRefs: [
          "CVA6 README",
          "CVA6 User Manual",
          "CVA6 Requirements Specification",
          "CV32A60X Design",
        ],
      },
      {
        id: "cva6-u01-l04-scope-diagram",
        classroomId: "openhw-cva6-u01-l04-scope-diagram-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 4,
        unitId: "u01-orientation",
        skillId: "u01-s02-source-literacy",
        language: "en",
        durationMinutes: 8,
        slideCount: 9,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "Reading the scope diagram: what not to invent",
          zh: "Scope 图精读：哪些内容不要脑补",
        },
        summary: {
          en: "Read the official CVA6 scope diagram as a technical contract instead of a decorative overview.",
          zh: "把官方 CVA6 scope 图当成技术契约来读，而不是当成装饰性的 overview。",
        },
        outcome: {
          en: "Explain core, optional units, interfaces, and out-of-scope blocks from the diagram without over-claiming.",
          zh: "根据图说明 core、optional units、interfaces 和 out-of-scope blocks，避免过度推断。",
        },
        tags: ["diagram reading", "scope", "CVA6"],
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
        id: "cva6-u01-l06-checkpoint-orientation",
        classroomId: "openhw-cva6-u01-l06-checkpoint-orientation-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 6,
        unitId: "u01-orientation",
        skillId: "u01-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 7,
        quizCount: 6,
        level: {
          en: "Starter checkpoint",
          zh: "入门检查点",
        },
        title: {
          en: "Checkpoint 01: do you know where to start reading?",
          zh: "Checkpoint 01：你真的知道该从哪份资料开始吗",
        },
        summary: {
          en: "A choice-only review lesson for CVA6 positioning, boundaries, and source selection.",
          zh: "用选择题复盘 CVA6 定位、边界和资料选择。",
        },
        outcome: {
          en: "Confirm readiness to move from orientation into configuration and architecture lessons.",
          zh: "确认已经准备好从入门地图进入配置和架构课程。",
        },
        tags: ["checkpoint", "CVA6", "source literacy"],
        sourceRefs: ["CVA6 README", "CVA6 User Manual", "CV32A60X Design"],
      },
      {
        id: "cva6-u02-l01-cv32-cv64-family",
        classroomId: "openhw-cva6-u02-l01-cv32-cv64-family-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 7,
        unitId: "u02-configuration",
        skillId: "u02-s01-family",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "CV32A6, CV64A6, CV32A60X: names, family, and variants",
          zh: "CV32A6、CV64A6、CV32A60X：名字、家族与变体",
        },
        summary: {
          en: "Learn why CVA6 should be read as a configurable family before making product-specific claims.",
          zh: "学习为什么在做具体产品判断前，需要先把 CVA6 当成可配置家族来阅读。",
        },
        outcome: {
          en: "Tell the difference between CVA6 as a repository family and named CORE-V product configurations.",
          zh: "区分 CVA6 作为仓库家族与具名 CORE-V 产品配置之间的关系。",
        },
        tags: ["CVA6", "configuration", "CORE-V naming"],
        sourceRefs: ["CVA6 Documentation Overview", "CVA6 User Manual Configuration Table"],
      },
      {
        id: "cva6-u02-l02-cv32a60x-profile",
        classroomId: "openhw-cva6-u02-l02-cv32a60x-profile-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 8,
        unitId: "u02-configuration",
        skillId: "u02-s01-family",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "CV32A60X profile: fix one learning target",
          zh: "CV32A60X profile：先固定一个学习对象",
        },
        summary: {
          en: "Use CV32A60X as the first concrete configuration target for source-backed architecture lessons.",
          zh: "把 CV32A60X 作为第一条可溯源架构课程的具体配置目标。",
        },
        outcome: {
          en: "Explain why introductory CVA6 architecture lessons should name CV32A60X when they rely on CV32A60X-specific design evidence.",
          zh: "说明为什么依赖 CV32A60X 设计资料的入门架构课需要明确命名该配置。",
        },
        tags: ["CV32A60X", "configuration profile", "architecture baseline"],
        sourceRefs: ["CV32A60X Design", "CVA6 Requirements Initial Release"],
      },
      {
        id: "cva6-u02-l03-parameter-map",
        classroomId: "openhw-cva6-u02-l03-parameter-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 9,
        unitId: "u02-configuration",
        skillId: "u02-s02-configuration-reading",
        language: "en",
        durationMinutes: 9,
        slideCount: 9,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "Parameter map: which switches change your conclusion",
          zh: "参数地图：哪些开关会改变你的结论",
        },
        summary: {
          en: "Read CV32A60X parameters as evidence for width, optional units, interfaces, and microarchitecture claims.",
          zh: "把 CV32A60X 参数作为判断位宽、可选单元、接口和微架构结论的证据。",
        },
        outcome: {
          en: "Use a parameter map to decide which configuration switches can change a CVA6 technical conclusion.",
          zh: "使用参数地图判断哪些配置开关会改变 CVA6 技术结论。",
        },
        tags: ["parameters", "CV32A60X", "source-grounded claims"],
        sourceRefs: ["CV32A60X Parameter Configuration", "CVA6 Optional Feature Rule"],
      },
      {
        id: "cva6-u02-l04-rtl-config-workflow",
        classroomId: "openhw-cva6-u02-l04-rtl-config-workflow-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 10,
        unitId: "u02-configuration",
        skillId: "u02-s02-configuration-reading",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "RTL configuration workflow: from macros to maintainable variants",
          zh: "RTL 配置工作流：从宏开关到可维护变体",
        },
        summary: {
          en: "Turn TARGET_CFG, packages, typed parameters, and generate blocks into a traceable CVA6 configuration workflow.",
          zh: "把 TARGET_CFG、package、typed parameter 和 generate block 串成可追溯的 CVA6 配置工作流。",
        },
        outcome: {
          en: "Review whether a configuration change is traceable from target selection to RTL and verification evidence.",
          zh: "判断一个配置变更是否能从目标选择追溯到 RTL 和验证证据。",
        },
        tags: ["RTL configuration", "SystemVerilog", "TARGET_CFG"],
        sourceRefs: ["CVA6 SystemVerilog RTL Configuration Wiki", "CVA6 Parameters Catalog"],
      },
      {
        id: "cva6-u02-l05-variant-comparison",
        classroomId: "openhw-cva6-u02-l05-variant-comparison-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 11,
        unitId: "u02-configuration",
        skillId: "u02-s02-configuration-reading",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "CV32A60X vs CV32A60AX: same family, different conclusions",
          zh: "CV32A60X vs CV32A60AX：同一家族，不同结论",
        },
        summary: {
          en: "Compare variant rows before making privilege, MMU, cache, or application-profile claims.",
          zh: "在谈论 privilege、MMU、cache 或 application profile 前，先比较具体变体行。",
        },
        outcome: {
          en: "Explain which conclusions are safe to share across CV32A60X and CV32A60AX and which must be scoped.",
          zh: "说明哪些结论能在 CV32A60X 与 CV32A60AX 间共享，哪些必须限定到具体变体。",
        },
        tags: ["variant comparison", "CV32A60X", "CV32A60AX"],
        sourceRefs: ["CVA6 User Manual Configuration Table", "CVA6 Requirements Initial Release"],
      },
      {
        id: "cva6-u02-l06-checkpoint-configurations",
        classroomId: "openhw-cva6-u02-l06-checkpoint-configurations-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 12,
        unitId: "u02-configuration",
        skillId: "u02-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 6,
        quizCount: 6,
        level: {
          en: "Starter checkpoint",
          zh: "入门检查点",
        },
        title: {
          en: "Checkpoint 02: do not teach one variant as all CVA6",
          zh: "Checkpoint 02：不要把一个 variant 讲成全部 CVA6",
        },
        summary: {
          en: "A choice-only checkpoint for family, variant, parameter evidence, workflow, and scoped claims.",
          zh: "用选择题检查家族、变体、参数证据、配置工作流与结论范围。",
        },
        outcome: {
          en: "Confirm readiness to move from configuration literacy into source-grounded CVA6 architecture lessons.",
          zh: "确认已经准备好从配置意识进入可溯源的 CVA6 架构课程。",
        },
        tags: ["checkpoint", "configuration literacy", "CVA6"],
        sourceRefs: [
          "CVA6 User Manual Configuration Table",
          "CVA6 Parameters Catalog",
          "CV32A60X Parameter Configuration",
        ],
      },
      {
        id: "cva6-u03-l01-six-stage-map",
        classroomId: "openhw-cva6-u03-l01-six-stage-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 13,
        unitId: "u03-architecture",
        skillId: "u03-s01-flow",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "Six-stage map: draw the trunk before details",
          zh: "六级流水线：先画主干，再谈细节",
        },
        summary: {
          en: "Build the official CV32A60X six-stage architecture spine before reading individual RTL modules.",
          zh: "在阅读单个 RTL 模块前，先建立官方 CV32A60X 六级架构主线。",
        },
        outcome: {
          en: "Order PC Generation, Fetch, Decode, Issue, Execute, and Commit and explain why this map comes first.",
          zh: "能排序 PC Generation、Fetch、Decode、Issue、Execute、Commit，并解释为什么要先读这张地图。",
        },
        tags: ["pipeline", "architecture map", "CV32A60X"],
        sourceRefs: ["CV32A60X Pipeline Overview", "CV32A60X Architecture Modules"],
      },
      {
        id: "cva6-u03-l02-pcgen-fetch",
        classroomId: "openhw-cva6-u03-l02-pcgen-fetch-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 14,
        unitId: "u03-architecture",
        skillId: "u03-s01-flow",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "PC generation to fetch: where the next instruction comes from",
          zh: "PC generation 到 fetch：下一条指令从哪里来",
        },
        summary: {
          en: "Read FRONTEND as next-PC selection, prediction, redirects, fetch realignment, and instruction-queue handoff.",
          zh: "把 FRONTEND 读成 next-PC 选择、预测、重定向、fetch 对齐和 instruction queue 交接。",
        },
        outcome: {
          en: "Explain how PC generation and fetch cooperate before decode receives instruction work.",
          zh: "说明 PC generation 和 fetch 如何协作，并在 decode 前完成指令工作交接。",
        },
        tags: ["frontend", "PC generation", "fetch"],
        sourceRefs: ["CV32A60X FRONTEND Module", "CV32A60X PC Generation Stage"],
      },
      {
        id: "cva6-u03-l03-decode",
        classroomId: "openhw-cva6-u03-l03-decode-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 15,
        unitId: "u03-architecture",
        skillId: "u03-s01-flow",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Starter to intermediate",
          zh: "入门到进阶",
        },
        title: {
          en: "Decode: turn instruction bits into backend evidence",
          zh: "Decode：把指令位转换成后端证据",
        },
        summary: {
          en: "Separate compressed expansion, main decoding, scoreboard-entry creation, context, and exception evidence.",
          zh: "区分 compressed expansion、main decode、scoreboard entry、上下文和异常证据。",
        },
        outcome: {
          en: "Describe what ID_STAGE receives, transforms, and sends to ISSUE_STAGE.",
          zh: "描述 ID_STAGE 接收什么、转换什么，以及发送什么到 ISSUE_STAGE。",
        },
        tags: ["decode", "ID_STAGE", "scoreboard entry"],
        sourceRefs: ["CV32A60X ID_STAGE Module", "CV32A60X FRONTEND Module"],
      },
      {
        id: "cva6-u03-l04-issue-execute",
        classroomId: "openhw-cva6-u03-l04-issue-execute-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 16,
        unitId: "u03-architecture",
        skillId: "u03-s02-backend-spine",
        language: "en",
        durationMinutes: 10,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Intermediate starter",
          zh: "进阶入门",
        },
        title: {
          en: "Issue to execute: single issue does not mean no concurrency",
          zh: "Issue 到 execute：单发射不等于没有并发",
        },
        summary: {
          en: "Explain in-order issue, RAW/WAW/structural hazards, forwarding, scoreboard tracking, and variable execution timing.",
          zh: "解释 in-order issue、RAW/WAW/structural hazards、forwarding、scoreboard tracking 和不同执行时序。",
        },
        outcome: {
          en: "Use ordered admission, tracked hazards, and variable completion to describe the backend without handwaving.",
          zh: "用有序进入、hazard 跟踪和不同完成时序，清楚描述 CVA6 后端。",
        },
        tags: ["issue", "execute", "scoreboard", "hazards"],
        sourceRefs: ["CV32A60X ISSUE_STAGE and Scoreboard", "CV32A60X EX_STAGE Module"],
      },
      {
        id: "cva6-u03-l05-commit",
        classroomId: "openhw-cva6-u03-l05-commit-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 17,
        unitId: "u03-architecture",
        skillId: "u03-s02-backend-spine",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Intermediate starter",
          zh: "进阶入门",
        },
        title: {
          en: "Commit: why architectural state must land in order",
          zh: "Commit：为什么 architectural state 必须按顺序落地",
        },
        summary: {
          en: "Separate result completion from architectural retirement, CSR/register/store updates, precise exceptions, stalls, and flushes.",
          zh: "区分结果完成与架构退休，以及 CSR/register/store 更新、precise exception、stall 和 flush。",
        },
        outcome: {
          en: "Explain why commit is the boundary where backend results become precise architectural state.",
          zh: "解释为什么 commit 是后端结果变成精确架构状态的边界。",
        },
        tags: ["commit", "precise exceptions", "architectural state"],
        sourceRefs: ["CV32A60X COMMIT_STAGE Module", "CV32A60X Pipeline Overview"],
      },
      {
        id: "cva6-u03-l06-checkpoint-pipeline",
        classroomId: "openhw-cva6-u03-l06-checkpoint-pipeline-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 18,
        unitId: "u03-architecture",
        skillId: "u03-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 6,
        quizCount: 6,
        level: {
          en: "Starter checkpoint",
          zh: "入门检查点",
        },
        title: {
          en: "Checkpoint 03: order the pipeline spine",
          zh: "Checkpoint 03：排序流水线主线",
        },
        summary: {
          en: "A choice-only checkpoint for stage order, frontend/decode/backend responsibilities, hazards, and commit precision.",
          zh: "用选择题检查 stage order、frontend/decode/backend 职责、hazard 和 commit precision。",
        },
        outcome: {
          en: "Confirm readiness to move from the architecture spine into deeper frontend and backend units.",
          zh: "确认已经准备好从架构主线进入更深入的 frontend 与 backend 单元。",
        },
        tags: ["checkpoint", "pipeline", "architecture reading"],
        sourceRefs: [
          "CV32A60X Pipeline Overview",
          "CV32A60X FRONTEND Module",
          "CV32A60X ID_STAGE Module",
          "CV32A60X ISSUE_STAGE and Scoreboard",
          "CV32A60X COMMIT_STAGE Module",
        ],
      },
      {
        id: "cva6-u04-l01-pc-plus-four-is-not-enough",
        classroomId: "openhw-cva6-u04-l01-pc-plus-four-is-not-enough-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 19,
        unitId: "u04-frontend",
        skillId: "u04-s01-pc-selection",
        language: "en",
        durationMinutes: 10,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "PC selection: why the next PC is not always PC plus four",
          zh: "PC selection：为什么下一条 PC 不总是 PC+4",
        },
        summary: {
          en: "Read PC generation as a priority decision across reset, prediction, default fetch, mispredict correction, replay, exception, return, and commit-PC restart.",
          zh: "把 PC generation 读成跨 reset、prediction、default fetch、mispredict correction、replay、exception、return 和 commit-PC restart 的优先级决策。",
        },
        outcome: {
          en: "Name the winning next-PC source before explaining frontend fetch behavior.",
          zh: "在解释 frontend fetch 行为前，先说清楚 winning next-PC source。",
        },
        tags: ["frontend", "PC generation", "branch prediction"],
        sourceRefs: [
          "CV32A60X FRONTEND Module",
          "CV32A60X PC Generation Stage",
          "CV32A60X instr_scan",
        ],
      },
      {
        id: "cva6-u04-l02-replay-return-exception",
        classroomId: "openhw-cva6-u04-l02-replay-return-exception-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 20,
        unitId: "u04-frontend",
        skillId: "u04-s01-pc-selection",
        language: "en",
        durationMinutes: 10,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Replay, return, exception: the frontend recovery paths",
          zh: "Replay、return、exception：frontend recovery paths",
        },
        summary: {
          en: "Explain instruction-queue replay, exception entry, return-from-exception, commit-PC restart, and flush-sensitive frontend recovery.",
          zh: "解释 instruction-queue replay、exception entry、return-from-exception、commit-PC restart，以及 flush-sensitive frontend recovery。",
        },
        outcome: {
          en: "Classify frontend recovery paths without treating all of them as branch prediction.",
          zh: "能区分 frontend recovery paths，而不是把它们全部当成 branch prediction。",
        },
        tags: ["frontend", "replay", "exception", "redirect"],
        sourceRefs: [
          "CV32A60X PC Generation Stage",
          "CV32A60X instr_queue",
          "CV32A60X Controller Redirects",
          "CV32A60X CSR Redirects",
        ],
      },
      {
        id: "cva6-u04-l03-ras",
        classroomId: "openhw-cva6-u04-l03-ras-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 21,
        unitId: "u04-frontend",
        skillId: "u04-s02-predictors",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 3,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "RAS: why returns need a tiny stack",
          zh: "RAS：函数返回为什么需要小栈",
        },
        summary: {
          en: "Explain call push, return pop, the two-entry CV32A60X RAS depth, speculation limits, and mispredict recovery.",
          zh: "解释 call push、return pop、CV32A60X two-entry RAS、speculation limit 和 mispredict recovery。",
        },
        outcome: {
          en: "Describe RAS as return-target prediction, not BHT direction prediction or generic target buffering.",
          zh: "把 RAS 描述为 return-target prediction，而不是 BHT direction prediction 或 generic target buffering。",
        },
        tags: ["RAS", "return prediction", "frontend"],
        sourceRefs: ["CV32A60X RAS", "CV32A60X instr_scan"],
      },
      {
        id: "cva6-u04-l04-bht-btb",
        classroomId: "openhw-cva6-u04-l04-bht-btb-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 22,
        unitId: "u04-frontend",
        skillId: "u04-s02-predictors",
        language: "en",
        durationMinutes: 10,
        slideCount: 8,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "BHT and BTB: direction is not target",
          zh: "BHT 与 BTB：方向和目标别混在一起",
        },
        summary: {
          en: "Separate BHT direction prediction from BTB target prediction, and preserve the CV32A60X caveat that this configuration has no BTB.",
          zh: "区分 BHT direction prediction 和 BTB target prediction，并保留 CV32A60X no-BTB caveat。",
        },
        outcome: {
          en: "Make source-scoped branch-prediction claims without overclaiming BTB hardware for CV32A60X.",
          zh: "能做 source-scoped branch-prediction claims，不为 CV32A60X 过度声称 BTB hardware。",
        },
        tags: ["BHT", "BTB", "branch prediction", "CV32A60X"],
        sourceRefs: ["CV32A60X BHT", "CV32A60X BTB", "CV32A60X RAS"],
      },
      {
        id: "cva6-u04-l05-checkpoint-frontend",
        classroomId: "openhw-cva6-u04-l05-checkpoint-frontend-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 23,
        unitId: "u04-frontend",
        skillId: "u04-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 5,
        quizCount: 6,
        level: {
          en: "Intermediate checkpoint",
          zh: "进阶检查点",
        },
        title: {
          en: "Checkpoint 04: frontend decisions without guessing",
          zh: "Checkpoint 04：Frontend 判断题不要靠感觉",
        },
        summary: {
          en: "A choice-only checkpoint for PC sources, replay, redirects, RAS, BHT, BTB caveats, and source-scoped wording.",
          zh: "用选择题检查 PC sources、replay、redirect、RAS、BHT、BTB caveat 和 source-scoped wording。",
        },
        outcome: {
          en: "Confirm readiness to continue into deeper fetch, decode, or branch-resolution details.",
          zh: "确认可以继续进入更深入的 fetch、decode 或 branch-resolution 细节。",
        },
        tags: ["checkpoint", "frontend", "branch prediction"],
        sourceRefs: [
          "CV32A60X PC Generation Stage",
          "CV32A60X instr_queue",
          "CV32A60X RAS",
          "CV32A60X BHT",
          "CV32A60X BTB",
        ],
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
