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
    id: "openhw-foundations",
    status: "open",
    title: {
      en: "OpenHW Foundations",
      zh: "OpenHW 基础与产业背景",
    },
    description: {
      en: "Understand OpenHW as an industrial open-source RISC-V IP ecosystem before entering individual core deep dives.",
      zh: "在进入具体处理器核心深度课前，先理解 OpenHW 作为工业级开源 RISC-V IP 生态的定位。",
    },
    audience: {
      en: "Learners, engineers, and partners who want the business, licensing, verification, and ecosystem context behind OpenHW.",
      zh: "适合希望理解 OpenHW 背后的商业采用、许可、验证和生态背景的学习者、工程师与合作伙伴。",
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
      en: "This first complete OpenHW Explorer course path starts with CVA6 orientation, IP boundaries, configuration literacy, and architecture reading habits, then moves through frontend, issue, execute, memory, interfaces, and source-reading handoff.",
      zh: "这条 OpenHW Explorer 的第一条完整课程路径从 CVA6 官方定位、IP 边界、配置意识和架构阅读方法开始，再逐步进入 frontend、issue、execute、memory、interfaces 和源码阅读交接。",
    },
    audience: {
      en: "Learners who know basic RISC-V concepts and want to read CVA6 like an engineer.",
      zh: "适合已经了解一点 RISC-V，希望用工程方式阅读 CVA6 的学习者。",
    },
    level: {
      en: "Starter to intermediate",
      zh: "入门到进阶",
    },
    estimatedHours: 13,
    lessonsPlanned: 50,
    lessonsReady: 50,
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
      {
        id: "u05-issue-scoreboard",
        order: 5,
        title: {
          en: "Unit 05 · Issue, Scoreboard, and Hazards",
          zh: "Unit 05 · Issue、Scoreboard 与 Hazard",
        },
        goal: {
          en: "Understand in-order issue, scoreboard FIFO tracking, RAW/WAW hazards, forwarding, and structural stalls.",
          zh: "理解 in-order issue、scoreboard FIFO、RAW/WAW hazard、forwarding 和 structural stalls。",
        },
        skillIds: ["u05-s01-issue-stage", "u05-s02-hazards", "u05-s03-checkpoint"],
      },
      {
        id: "u06-execute-commit",
        order: 6,
        title: {
          en: "Unit 06 · Execute, Commit, and Precise State",
          zh: "Unit 06 · Execute、Commit 与精确状态",
        },
        goal: {
          en: "Separate execute-stage work, branch resolution, side-effect buffering, commit authority, and precise exception handling.",
          zh: "区分 execute-stage work、branch resolution、side-effect buffering、commit authority 和 precise exception handling。",
        },
        skillIds: ["u06-s01-execute-units", "u06-s02-commit-state", "u06-s03-checkpoint"],
      },
      {
        id: "u07-memory-system",
        order: 7,
        title: {
          en: "Unit 07 · Memory and LSU",
          zh: "Unit 07 · Memory 与 LSU",
        },
        goal: {
          en: "Build a source-grounded memory path through LSU, store buffer, load alias checks, MMU/TLB/PTW translation, cache/interface boundaries, PMA, and fence ordering.",
          zh: "通过 LSU、store buffer、load alias check、MMU/TLB/PTW、cache/interface boundary、PMA 和 fence ordering 建立资料溯源的 memory path。",
        },
        skillIds: ["u07-s01-lsu", "u07-s02-translation-cache", "u07-s03-checkpoint"],
      },
      {
        id: "u08-interfaces-integration",
        order: 8,
        title: {
          en: "Unit 08 · Interfaces and Integration",
          zh: "Unit 08 · 接口与系统集成",
        },
        goal: {
          en: "Classify CVA6 system boundaries across AXI, interrupt/debug, CV-X-IF, PMA, TRI/P-Mesh, and integration documentation maturity.",
          zh: "围绕 AXI、interrupt/debug、CV-X-IF、PMA、TRI/P-Mesh 和集成资料成熟度，建立 CVA6 系统边界判断能力。",
        },
        skillIds: ["u08-s01-bus-and-soc", "u08-s02-extension-interfaces", "u08-s03-checkpoint"],
      },
      {
        id: "u09-source-reading-verification",
        order: 9,
        title: {
          en: "Unit 09 · Source Reading and Verification Handoff",
          zh: "Unit 09 · 源码阅读与验证交接",
        },
        goal: {
          en: "Turn CVA6 learning into source-routing, review checklists, source-to-slide production, verification questions, and a final publishable reading-note workflow.",
          zh: "把 CVA6 学习转化为 source-routing、review checklist、source-to-slide、verification questions 和最终可发布的阅读笔记流程。",
        },
        skillIds: ["u09-s01-source-route", "u09-s02-verification-handoff", "u09-s03-checkpoint"],
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
      {
        id: "u05-s01-issue-stage",
        title: {
          en: "Skill 01 · Issue stage discipline",
          zh: "Skill 01 · Issue stage discipline",
        },
        description: {
          en: "Read the issue stage as ordered admission, operand readiness, scoreboard ownership, and traceable instruction lifetime.",
          zh: "把 issue stage 读成有序准入、operand readiness、scoreboard ownership 和可追踪的指令生命周期。",
        },
        lessonIds: ["cva6-u05-l01-inorder-issue", "cva6-u05-l02-scoreboard-fifo"],
      },
      {
        id: "u05-s02-hazards",
        title: {
          en: "Skill 02 · Hazards and forwarding",
          zh: "Skill 02 · Hazard 与 forwarding",
        },
        description: {
          en: "Separate RAW, WAW, forwarding, and structural stalls so backend timing claims stay source-scoped.",
          zh: "区分 RAW、WAW、forwarding 和 structural stalls，让后端时序判断保持资料边界清晰。",
        },
        lessonIds: [
          "cva6-u05-l03-raw-waw",
          "cva6-u05-l04-forwarding",
          "cva6-u05-l05-structural-hazards",
        ],
      },
      {
        id: "u05-s03-checkpoint",
        title: {
          en: "Skill 03 · Issue checkpoint",
          zh: "Skill 03 · Issue checkpoint",
        },
        description: {
          en: "Classify issue ordering, scoreboard state, RAW/WAW hazards, forwarding, and structural pressure.",
          zh: "Classify issue ordering, scoreboard state, RAW/WAW hazards, forwarding, and structural pressure.",
        },
        lessonIds: ["cva6-u05-l06-checkpoint-scoreboard"],
      },
      {
        id: "u06-s01-execute-units",
        title: {
          en: "Skill 01 · Execute-stage contracts",
          zh: "Skill 01 · Execute-stage contracts",
        },
        description: {
          en: "Read EX_STAGE as a cluster of functional units, then separate branch resolution from frontend prediction.",
          zh: "把 EX_STAGE 读成多个 functional unit 的组合，并区分 branch resolution 与 frontend prediction。",
        },
        lessonIds: ["cva6-u06-l01-ex-stage-map", "cva6-u06-l02-branch-unit"],
      },
      {
        id: "u06-s02-commit-state",
        title: {
          en: "Skill 02 · Commit and precise state",
          zh: "Skill 02 · Commit 与精确状态",
        },
        description: {
          en: "Use commit discipline to explain architectural state updates, CSR/store side effects, and precise exceptions.",
          zh: "用 commit discipline 解释 architectural state update、CSR/store side effect 和 precise exception。",
        },
        lessonIds: ["cva6-u06-l03-commit-stage", "cva6-u06-l04-precise-exception"],
      },
      {
        id: "u06-s03-checkpoint",
        title: {
          en: "Skill 03 · Execute-to-commit checkpoint",
          zh: "Skill 03 · Execute-to-commit checkpoint",
        },
        description: {
          en: "Classify backend cases as compute, branch repair, buffered side effect, retirement, or trap handling.",
          zh: "把 backend case 分类为 compute、branch repair、buffered side effect、retirement 或 trap handling。",
        },
        lessonIds: ["cva6-u06-l05-checkpoint-commit"],
      },
      {
        id: "u07-s01-lsu",
        title: {
          en: "Skill 01 · LSU load/store path",
          zh: "Skill 01 · LSU load/store path",
        },
        description: {
          en: "Read the LSU as a memory protocol hub, then explain store buffering and load alias checks.",
          zh: "把 LSU 读成 memory protocol hub，并解释 store buffering 与 load alias check。",
        },
        lessonIds: ["cva6-u07-l01-lsu-map", "cva6-u07-l02-store-buffer-alias"],
      },
      {
        id: "u07-s02-translation-cache",
        title: {
          en: "Skill 02 · Translation, cache, and interface",
          zh: "Skill 02 · Translation、cache 与 interface",
        },
        description: {
          en: "Separate address translation, TLB/PTW behavior, cache-facing LSU contracts, PMA, and system-level memory boundaries.",
          zh: "区分 address translation、TLB/PTW、cache-facing LSU contract、PMA 和 system-level memory boundary。",
        },
        lessonIds: ["cva6-u07-l03-address-translation", "cva6-u07-l04-cache-interface-boundary"],
      },
      {
        id: "u07-s03-checkpoint",
        title: {
          en: "Skill 03 · Memory checkpoint",
          zh: "Skill 03 · Memory checkpoint",
        },
        description: {
          en: "Classify store commit, load freshness, translation freshness, PMA semantics, and fence-related source evidence.",
          zh: "分类 store commit、load freshness、translation freshness、PMA semantics 和 fence-related source evidence。",
        },
        lessonIds: ["cva6-u07-l05-ordering-fence-checkpoint"],
      },
      {
        id: "u08-s01-bus-and-soc",
        title: {
          en: "Skill 01 - Bus, interrupt, and debug boundaries",
          zh: "Skill 01 - Bus, interrupt, and debug boundaries",
        },
        description: {
          en: "Separate AXI memory-interface behavior, interrupt infrastructure, debug boundaries, and SoC wiring examples.",
          zh: "Separate AXI memory-interface behavior, interrupt infrastructure, debug boundaries, and SoC wiring examples.",
        },
        lessonIds: ["cva6-u08-l01-axi-boundary", "cva6-u08-l02-interrupt-debug-boundary"],
      },
      {
        id: "u08-s02-extension-interfaces",
        title: {
          en: "Skill 02 - Extension and multi-core interfaces",
          zh: "Skill 02 - Extension and multi-core interfaces",
        },
        description: {
          en: "Read CV-X-IF, TRI/P-Mesh, PMA, and core-integration notes as source-scoped system-boundary material.",
          zh: "Read CV-X-IF, TRI/P-Mesh, PMA, and core-integration notes as source-scoped system-boundary material.",
        },
        lessonIds: ["cva6-u08-l03-cvxif", "cva6-u08-l04-pmesh"],
      },
      {
        id: "u08-s03-checkpoint",
        title: {
          en: "Skill 03 - Interface checkpoint",
          zh: "Skill 03 - Interface checkpoint",
        },
        description: {
          en: "Classify interface issues as core, memory fabric, interrupt/debug, extension, or system-integration responsibilities.",
          zh: "Classify interface issues as core, memory fabric, interrupt/debug, extension, or system-integration responsibilities.",
        },
        lessonIds: ["cva6-u08-l05-checkpoint-interfaces"],
      },
      {
        id: "u09-s01-source-route",
        title: {
          en: "Skill 01 - Source route and review workflow",
          zh: "Skill 01 - Source route and review workflow",
        },
        description: {
          en: "Choose the right source directory, apply a review checklist, and convert evidence into classroom artifacts.",
          zh: "Choose the right source directory, apply a review checklist, and convert evidence into classroom artifacts.",
        },
        lessonIds: [
          "cva6-u09-l01-source-directory-map",
          "cva6-u09-l02-review-checklist",
          "cva6-u09-l03-source-to-slide-practice",
        ],
      },
      {
        id: "u09-s02-verification-handoff",
        title: {
          en: "Skill 02 - Verification handoff and capstone",
          zh: "Skill 02 - Verification handoff and capstone",
        },
        description: {
          en: "Turn architecture claims into verification questions and a final source-backed reading-note project.",
          zh: "Turn architecture claims into verification questions and a final source-backed reading-note project.",
        },
        lessonIds: ["cva6-u09-l04-verification-questions", "cva6-u09-l05-final-project-brief"],
      },
      {
        id: "u09-s03-checkpoint",
        title: {
          en: "Skill 03 - Final checkpoint",
          zh: "Skill 03 - Final checkpoint",
        },
        description: {
          en: "Check the complete CVA6 From Zero path across positioning, pipeline, memory, interfaces, source reading, and verification handoff.",
          zh: "Check the complete CVA6 From Zero path across positioning, pipeline, memory, interfaces, source reading, and verification handoff.",
        },
        lessonIds: ["cva6-u09-l06-final-checkpoint"],
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
        id: "cva6-u05-l01-inorder-issue",
        classroomId: "openhw-cva6-u05-l01-inorder-issue-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 24,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s01-issue-stage",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 3,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "In-order issue: why it still deserves a serious reading",
          zh: "In-order issue：为什么仍然值得认真读",
        },
        summary: {
          en: "Read ISSUE_STAGE as a disciplined admission point that checks ordering, operand readiness, and scoreboard allocation.",
          zh: "把 ISSUE_STAGE 读成检查顺序、operand readiness 和 scoreboard allocation 的严格准入点。",
        },
        outcome: {
          en: "Explain why in-order issue simplifies admission without making the backend trivial.",
          zh: "说明为什么 in-order issue 简化了准入顺序，但并不意味着后端很简单。",
        },
        tags: ["issue stage", "in-order issue", "scoreboard"],
        sourceRefs: ["CV32A60X ISSUE_STAGE", "CV32A60X Scoreboard"],
      },
      {
        id: "cva6-u05-l02-scoreboard-fifo",
        classroomId: "openhw-cva6-u05-l02-scoreboard-fifo-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 25,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s01-issue-stage",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 3,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Scoreboard FIFO: the instruction lifetime ledger",
          zh: "Scoreboard FIFO：指令生命周期账本",
        },
        summary: {
          en: "Use the official scoreboard diagram to track allocation, execution status, writeback evidence, exceptions, and commit order.",
          zh: "用官方 scoreboard 图跟踪 allocation、execution status、writeback evidence、exception 和 commit order。",
        },
        outcome: {
          en: "Describe what the scoreboard remembers and why FIFO order matters for precise retirement.",
          zh: "描述 scoreboard 记住什么，以及 FIFO order 为什么影响精确退休。",
        },
        tags: ["scoreboard", "FIFO", "commit order"],
        sourceRefs: ["CV32A60X Scoreboard", "CV32A60X COMMIT_STAGE"],
      },
      {
        id: "cva6-u05-l03-raw-waw",
        classroomId: "openhw-cva6-u05-l03-raw-waw-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 26,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s02-hazards",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 3,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "RAW and WAW hazards: when the next instruction must wait",
          zh: "RAW 与 WAW hazard：下一条指令什么时候必须等",
        },
        summary: {
          en: "Separate data-read hazards from same-destination write ordering so stalls can be explained precisely.",
          zh: "区分 data-read hazards 与 same-destination write ordering，从而准确解释 stall。",
        },
        outcome: {
          en: "Classify RAW and WAW hazards from source and destination register evidence.",
          zh: "根据 source 与 destination register 证据区分 RAW 和 WAW hazard。",
        },
        tags: ["RAW hazard", "WAW hazard", "data dependency"],
        sourceRefs: ["CV32A60X Data Hazards", "CV32A60X ISSUE_STAGE"],
      },
      {
        id: "cva6-u05-l04-forwarding",
        classroomId: "openhw-cva6-u05-l04-forwarding-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 27,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s02-hazards",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 3,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Forwarding: when waiting is unnecessary",
          zh: "Forwarding：什么时候不必等",
        },
        summary: {
          en: "Explain forwarding as controlled operand substitution from available results, not as a magic cure for every dependency.",
          zh: "把 forwarding 解释为来自可用结果的受控 operand substitution，而不是万能消除依赖的魔法。",
        },
        outcome: {
          en: "Decide when forwarding can satisfy an operand and when the issue stage still needs to stall.",
          zh: "判断什么时候 forwarding 能满足 operand，什么时候 issue stage 仍需要 stall。",
        },
        tags: ["forwarding", "operand readiness", "execute results"],
        sourceRefs: ["CV32A60X Forwarding", "CV32A60X Data Hazards"],
      },
      {
        id: "cva6-u05-l05-structural-hazards",
        classroomId: "openhw-cva6-u05-l05-structural-hazards-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 28,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s02-hazards",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Structural hazards: when the machine is busy",
          zh: "Structural hazard：机器忙不过来时发生什么",
        },
        summary: {
          en: "Read functional-unit availability, scoreboard capacity, unresolved transaction limits, and long-latency units as structural pressure.",
          zh: "把 functional-unit availability、scoreboard capacity、unresolved transaction limit 和 long-latency unit 读成结构资源压力。",
        },
        outcome: {
          en: "Distinguish a data dependency stall from a resource-availability stall.",
          zh: "区分 data dependency stall 和 resource-availability stall。",
        },
        tags: ["structural hazard", "functional units", "scoreboard capacity"],
        sourceRefs: ["CV32A60X Structural Hazards", "CV32A60X EX_STAGE"],
      },
      {
        id: "cva6-u05-l06-checkpoint-scoreboard",
        classroomId: "openhw-cva6-u05-l06-checkpoint-scoreboard-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 29,
        unitId: "u05-issue-scoreboard",
        skillId: "u05-s03-checkpoint",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 6,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Checkpoint 05: issue, scoreboard, and hazards",
          zh: "Checkpoint 05: issue, scoreboard, and hazards",
        },
        summary: {
          en: "A choice-only checkpoint for in-order issue, scoreboard rows, RAW/WAW hazards, forwarding, and structural stalls.",
          zh: "A choice-only checkpoint for in-order issue, scoreboard rows, RAW/WAW hazards, forwarding, and structural stalls.",
        },
        outcome: {
          en: "Classify backend issue-stage cases before moving from scoreboard behavior to execute, commit, and memory.",
          zh: "Classify backend issue-stage cases before moving from scoreboard behavior to execute, commit, and memory.",
        },
        tags: ["checkpoint", "issue", "scoreboard", "hazards"],
        sourceRefs: [
          "CV32A60X design: ISSUE_STAGE module",
          "CV32A60X design: Scoreboard submodule",
          "CV32A60X design: issue hazards and forwarding",
          "CV32A60X design: COMMIT_STAGE module",
        ],
      },
      {
        id: "cva6-u06-l01-ex-stage-map",
        classroomId: "openhw-cva6-u06-l01-ex-stage-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 30,
        unitId: "u06-execute-commit",
        skillId: "u06-s01-execute-units",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "EX_STAGE map: where backend work actually runs",
          zh: "EX_STAGE map：后端工作真正在哪里运行",
        },
        summary: {
          en: "Read EX_STAGE as a set of functional-unit contracts rather than one generic execute box.",
          zh: "把 EX_STAGE 读成一组 functional-unit contract，而不是一个笼统的 execute box。",
        },
        outcome: {
          en: "Classify ALU, Branch, CSR buffer, Mult, and LSU behavior by timing, result return, and side-effect discipline.",
          zh: "按 timing、result return 和 side-effect discipline 分类 ALU、Branch、CSR buffer、Mult 和 LSU。",
        },
        tags: ["EX_STAGE", "functional units", "backend"],
        sourceRefs: ["CV32A60X EX_STAGE", "CV32A60X ALU", "CV32A60X CSR buffer"],
      },
      {
        id: "cva6-u06-l02-branch-unit",
        classroomId: "openhw-cva6-u06-l02-branch-unit-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 31,
        unitId: "u06-execute-commit",
        skillId: "u06-s01-execute-units",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Branch Unit: prediction still needs a judge",
          zh: "Branch Unit：预测之后仍需要裁判",
        },
        summary: {
          en: "Separate frontend prediction from execute-stage branch resolution, target calculation, and corrective redirect.",
          zh: "区分 frontend prediction 与 execute-stage branch resolution、target calculation 和 corrective redirect。",
        },
        outcome: {
          en: "Explain why branch prediction is early but branch resolution is authoritative.",
          zh: "解释为什么 branch prediction 是早期猜测，而 branch resolution 才是权威判断。",
        },
        tags: ["branch unit", "redirect", "branch prediction"],
        sourceRefs: ["CV32A60X Branch Unit", "CV32A60X Controller"],
      },
      {
        id: "cva6-u06-l03-commit-stage",
        classroomId: "openhw-cva6-u06-l03-commit-stage-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 32,
        unitId: "u06-execute-commit",
        skillId: "u06-s02-commit-state",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "COMMIT_STAGE: where architectural state becomes real",
          zh: "COMMIT_STAGE：架构状态在哪里落地",
        },
        summary: {
          en: "Use commit as the architectural gate for GPR writeback, CSR writes, store commit, and flush control.",
          zh: "把 commit 作为 GPR writeback、CSR write、store commit 和 flush control 的架构状态关口。",
        },
        outcome: {
          en: "Distinguish completed execution from official architectural retirement.",
          zh: "区分 execution completed 和 official architectural retirement。",
        },
        tags: ["commit", "retirement", "architectural state"],
        sourceRefs: ["CV32A60X COMMIT_STAGE", "CVA6 Commit Stage"],
      },
      {
        id: "cva6-u06-l04-precise-exception",
        classroomId: "openhw-cva6-u06-l04-precise-exception-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 33,
        unitId: "u06-execute-commit",
        skillId: "u06-s02-commit-state",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Precise exceptions: why commit becomes the convergence point",
          zh: "Precise exception：为什么 commit 是收束点",
        },
        summary: {
          en: "Connect exceptions, interrupts, trap CSRs, commit ordering, and frontend restart into one precise-state model.",
          zh: "把 exception、interrupt、trap CSR、commit ordering 和 frontend restart 连成一个 precise-state model。",
        },
        outcome: {
          en: "Explain precise traps as ordered, attributable architectural control events.",
          zh: "把 precise trap 解释为 ordered、attributable 的架构控制事件。",
        },
        tags: ["precise exception", "interrupt", "trap CSR"],
        sourceRefs: ["CV32A60X COMMIT_STAGE", "CVA6 Traps Interrupts Exceptions"],
      },
      {
        id: "cva6-u06-l05-checkpoint-commit",
        classroomId: "openhw-cva6-u06-l05-checkpoint-commit-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 34,
        unitId: "u06-execute-commit",
        skillId: "u06-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 6,
        quizCount: 6,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Checkpoint 06: from execution result to architectural state",
          zh: "Checkpoint 06：从执行结果到架构状态",
        },
        summary: {
          en: "A choice-only checkpoint for classifying execute, branch, commit, CSR/store, and precise-trap cases.",
          zh: "用于分类 execute、branch、commit、CSR/store 和 precise-trap case 的纯选择题 checkpoint。",
        },
        outcome: {
          en: "Classify backend events before moving into LSU, cache, MMU, and memory-system lessons.",
          zh: "在进入 LSU、cache、MMU 和 memory-system 课程前，先能分类 backend event。",
        },
        tags: ["checkpoint", "execute", "commit"],
        sourceRefs: ["CV32A60X EX_STAGE", "CV32A60X COMMIT_STAGE"],
      },
      {
        id: "cva6-u07-l01-lsu-map",
        classroomId: "openhw-cva6-u07-l01-lsu-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 35,
        unitId: "u07-memory-system",
        skillId: "u07-s01-lsu",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "LSU map: where memory stops being a simple operand",
          zh: "LSU map：memory 不再只是普通 operand",
        },
        summary: {
          en: "Read the LSU as the backend hub for load/store results, D-cache interaction, exceptions, PMP, and commit coordination.",
          zh: "把 LSU 读成连接 load/store result、D-cache interaction、exception、PMP 和 commit coordination 的后端 hub。",
        },
        outcome: {
          en: "Explain why loads and stores are asymmetric and why memory operations require more than address calculation.",
          zh: "解释为什么 load 和 store 不对称，以及 memory operation 为什么不只是 address calculation。",
        },
        tags: ["LSU", "load/store", "memory path"],
        sourceRefs: ["CV32A65X LSU", "CVA6 LSU overview", "CV32A65X COMMIT_STAGE"],
      },
      {
        id: "cva6-u07-l02-store-buffer-alias",
        classroomId: "openhw-cva6-u07-l02-store-buffer-alias-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 36,
        unitId: "u07-memory-system",
        skillId: "u07-s01-lsu",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Store buffer and alias checks: why load after store is special",
          zh: "Store buffer 与 alias check：为什么 load after store 特别重要",
        },
        summary: {
          en: "Use the store buffer, LSU bypass, page-offset alias checks, and no-forwarding caveat to explain safe load/store ordering.",
          zh: "用 store buffer、LSU bypass、page-offset alias check 和 no-forwarding caveat 解释安全的 load/store ordering。",
        },
        outcome: {
          en: "Distinguish speculative store intent, committed store state, and conservative load stalls.",
          zh: "区分 speculative store intent、committed store state 和 conservative load stall。",
        },
        tags: ["store buffer", "alias check", "load/store ordering"],
        sourceRefs: ["CV32A65X store_unit", "CV32A65X load_unit", "CVA6 store buffer"],
      },
      {
        id: "cva6-u07-l03-address-translation",
        classroomId: "openhw-cva6-u07-l03-address-translation-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 37,
        unitId: "u07-memory-system",
        skillId: "u07-s02-translation-cache",
        language: "en",
        durationMinutes: 10,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Address translation: MMU, TLB, and PTW on the data path",
          zh: "Address translation：data path 上的 MMU、TLB 与 PTW",
        },
        summary: {
          en: "Connect MMUEn, Bare/Sv modes, TLB hits, PTW misses, page faults, satp, and SFENCE.VMA into one translation model.",
          zh: "把 MMUEn、Bare/Sv mode、TLB hit、PTW miss、page fault、satp 和 SFENCE.VMA 连接成一个 translation model。",
        },
        outcome: {
          en: "Explain how a virtual load/store address becomes a physical address or a precise exception.",
          zh: "解释 virtual load/store address 如何变成 physical address 或 precise exception。",
        },
        tags: ["MMU", "TLB", "PTW", "SFENCE.VMA"],
        sourceRefs: ["CVA6 Programmer View", "CVA6 MMU/PTW", "CV32A6 satp"],
      },
      {
        id: "cva6-u07-l04-cache-interface-boundary",
        classroomId: "openhw-cva6-u07-l04-cache-interface-boundary-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 38,
        unitId: "u07-memory-system",
        skillId: "u07-s02-translation-cache",
        language: "en",
        durationMinutes: 9,
        slideCount: 7,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Cache and interface boundary: what belongs to CVA6, cache, and SoC",
          zh: "Cache 与 interface boundary：哪些属于 CVA6、cache 和 SoC",
        },
        summary: {
          en: "Separate LSU-to-D-cache interaction, PMA region semantics, cacheability, coherence caveats, and system integration responsibilities.",
          zh: "区分 LSU-to-D-cache interaction、PMA region semantics、cacheability、coherence caveat 和 system integration responsibility。",
        },
        outcome: {
          en: "Keep memory-system claims scoped to core, cache/interface, PMA, and SoC boundaries.",
          zh: "把 memory-system claim 限定在 core、cache/interface、PMA 和 SoC boundary 中。",
        },
        tags: ["D-cache", "PMA", "cache boundary", "SoC integration"],
        sourceRefs: ["CV32A65X LSU", "CVA6 PMA", "CVA6 scope"],
      },
      {
        id: "cva6-u07-l05-ordering-fence-checkpoint",
        classroomId: "openhw-cva6-u07-l05-ordering-fence-checkpoint-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 39,
        unitId: "u07-memory-system",
        skillId: "u07-s03-checkpoint",
        language: "en",
        durationMinutes: 8,
        slideCount: 6,
        quizCount: 6,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Ordering and fences: memory-path checkpoint",
          zh: "Ordering 与 fences：memory path checkpoint",
        },
        summary: {
          en: "A choice-only checkpoint for classifying store commit, load freshness, translation freshness, PMA semantics, and fence-related source evidence.",
          zh: "用于分类 store commit、load freshness、translation freshness、PMA semantics 和 fence-related source evidence 的纯选择题 checkpoint。",
        },
        outcome: {
          en: "Classify memory-path issues before moving into interfaces, integration, interrupts, debug, and SoC-level behavior.",
          zh: "在进入 interface、integration、interrupt、debug 和 SoC-level behavior 前，先分类 memory-path issue。",
        },
        tags: ["checkpoint", "ordering", "fence", "PMA"],
        sourceRefs: ["CVA6 store buffer", "CV32A6 satp", "CVA6 PMA", "CV32A65X controller"],
      },
      {
        id: "cva6-u08-l01-axi-boundary",
        classroomId: "openhw-cva6-u08-l01-axi-boundary-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 40,
        unitId: "u08-interfaces-integration",
        skillId: "u08-s01-bus-and-soc",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "AXI boundary: where CVA6 becomes a system component",
          zh: "AXI boundary: where CVA6 becomes a system component",
        },
        summary: {
          en: "Read AXI as the memory-interface contract between CVA6 as manager and the surrounding memory system as subordinate.",
          zh: "Read AXI as the memory-interface contract between CVA6 as manager and the surrounding memory system as subordinate.",
        },
        outcome: {
          en: "Explain CVA6 AXI support without confusing core-internal LSU behavior with SoC memory-fabric behavior.",
          zh: "Explain CVA6 AXI support without confusing core-internal LSU behavior with SoC memory-fabric behavior.",
        },
        tags: ["AXI", "interface", "SoC boundary"],
        sourceRefs: [
          "CVA6 AXI interface",
          "CVA6 requirements: interface requirements",
          "CVA6 APU: testharness",
        ],
      },
      {
        id: "cva6-u08-l02-interrupt-debug-boundary",
        classroomId: "openhw-cva6-u08-l02-interrupt-debug-boundary-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 41,
        unitId: "u08-interfaces-integration",
        skillId: "u08-s01-bus-and-soc",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Interrupt and debug boundary: external events without hand-waving",
          zh: "Interrupt and debug boundary: external events without hand-waving",
        },
        summary: {
          en: "Separate interrupt inputs, CLINT/PLIC context, debug-module scope, trap CSRs, and precise pipeline redirection.",
          zh: "Separate interrupt inputs, CLINT/PLIC context, debug-module scope, trap CSRs, and precise pipeline redirection.",
        },
        outcome: {
          en: "Explain what belongs to CVA6, what belongs to external interrupt/debug infrastructure, and what must remain source-scoped.",
          zh: "Explain what belongs to CVA6, what belongs to external interrupt/debug infrastructure, and what must remain source-scoped.",
        },
        tags: ["interrupt", "debug", "trap boundary"],
        sourceRefs: [
          "CVA6 Interfaces",
          "CVA6 requirements: interface requirements",
          "CVA6 APU: testharness",
          "CVA6 Traps, Interrupts and Exceptions",
        ],
      },
      {
        id: "cva6-u08-l03-cvxif",
        classroomId: "openhw-cva6-u08-l03-cvxif-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 42,
        unitId: "u08-interfaces-integration",
        skillId: "u08-s02-extension-interfaces",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "CV-X-IF: custom extension without breaking the core story",
          zh: "CV-X-IF: custom extension without breaking the core story",
        },
        summary: {
          en: "Read CV-X-IF as an execute-stage coprocessor contract with issue, commit, and result interfaces.",
          zh: "Read CV-X-IF as an execute-stage coprocessor contract with issue, commit, and result interfaces.",
        },
        outcome: {
          en: "Explain CV-X-IF support, limitations, and scoreboard identity without implying unsupported memory or compressed interfaces.",
          zh: "Explain CV-X-IF support, limitations, and scoreboard identity without implying unsupported memory or compressed interfaces.",
        },
        tags: ["CV-X-IF", "coprocessor", "custom instructions"],
        sourceRefs: [
          "CVA6 CV-X-IF Interface and Coprocessor",
          "CVA6 requirements: interface requirements",
          "CV32A60X design: EX_STAGE module",
          "CV32A60X design: Scoreboard submodule",
        ],
      },
      {
        id: "cva6-u08-l04-pmesh",
        classroomId: "openhw-cva6-u08-l04-pmesh-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 43,
        unitId: "u08-interfaces-integration",
        skillId: "u08-s02-extension-interfaces",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "P-Mesh and integration boundaries: requirements, scope, and caveats",
          zh: "P-Mesh and integration boundaries: requirements, scope, and caveats",
        },
        summary: {
          en: "Use TRI/P-Mesh, PMA, cache scope, and core-integration notes to keep multi-core and coherence claims honest.",
          zh: "Use TRI/P-Mesh, PMA, cache scope, and core-integration notes to keep multi-core and coherence claims honest.",
        },
        outcome: {
          en: "Separate requirement intent, current interface applicability, PMA attributes, cache boundaries, and integration TODOs.",
          zh: "Separate requirement intent, current interface applicability, PMA attributes, cache boundaries, and integration TODOs.",
        },
        tags: ["P-Mesh", "TRI", "PMA", "integration"],
        sourceRefs: [
          "CVA6 requirements: interface requirements",
          "CVA6 Interfaces",
          "CVA6 PMA",
          "CVA6 Core Integration",
        ],
      },
      {
        id: "cva6-u08-l05-checkpoint-interfaces",
        classroomId: "openhw-cva6-u08-l05-checkpoint-interfaces-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 44,
        unitId: "u08-interfaces-integration",
        skillId: "u08-s03-checkpoint",
        language: "en",
        durationMinutes: 9,
        slideCount: 4,
        quizCount: 6,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Checkpoint 08: interfaces and integration",
          zh: "Checkpoint 08: interfaces and integration",
        },
        summary: {
          en: "A choice-only checkpoint for AXI, interrupt/debug boundaries, CV-X-IF, PMA, TRI/P-Mesh, and integration maturity.",
          zh: "A choice-only checkpoint for AXI, interrupt/debug boundaries, CV-X-IF, PMA, TRI/P-Mesh, and integration maturity.",
        },
        outcome: {
          en: "Classify interface issues as core, memory fabric, interrupt/debug, extension, or system-integration responsibilities.",
          zh: "Classify interface issues as core, memory fabric, interrupt/debug, extension, or system-integration responsibilities.",
        },
        tags: ["checkpoint", "interfaces", "integration"],
        sourceRefs: [
          "CVA6 AXI interface",
          "CVA6 Interfaces",
          "CVA6 CV-X-IF Interface and Coprocessor",
          "CVA6 PMA",
          "CVA6 APU: testharness",
        ],
      },
      {
        id: "cva6-u09-l01-source-directory-map",
        classroomId: "openhw-cva6-u09-l01-source-directory-map-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 45,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s01-source-route",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Source directory map: where to look first",
          zh: "Source directory map: where to look first",
        },
        summary: {
          en: "Turn the CVA6 repository and generated docs into a practical source-reading map for core, config, docs, APU, and verification.",
          zh: "Turn the CVA6 repository and generated docs into a practical source-reading map for core, config, docs, APU, and verification.",
        },
        outcome: {
          en: "Choose the right repo directory or official document before starting a CVA6 source-reading task.",
          zh: "Choose the right repo directory or official document before starting a CVA6 source-reading task.",
        },
        tags: ["source reading", "repository map", "docs"],
        sourceRefs: [
          "CVA6 public repository source tree",
          "CVA6 documentation overview",
          "CVA6 documentation README",
        ],
      },
      {
        id: "cva6-u09-l02-review-checklist",
        classroomId: "openhw-cva6-u09-l02-review-checklist-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 46,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s01-source-route",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Review checklist: how to read CVA6 like an engineer",
          zh: "Review checklist: how to read CVA6 like an engineer",
        },
        summary: {
          en: "A reusable checklist for reading CVA6 modules: scope, inputs, outputs, state, handshakes, exceptions, and verification hooks.",
          zh: "A reusable checklist for reading CVA6 modules: scope, inputs, outputs, state, handshakes, exceptions, and verification hooks.",
        },
        outcome: {
          en: "Apply a disciplined review checklist before making a public technical claim about a CVA6 block.",
          zh: "Apply a disciplined review checklist before making a public technical claim about a CVA6 block.",
        },
        tags: ["review checklist", "source reading", "engineering method"],
        sourceRefs: [
          "CVA6 public repository source tree",
          "CV32A60X design: ISSUE_STAGE module",
          "CV32A60X design: EX_STAGE module",
          "CV32A60X design: COMMIT_STAGE module",
        ],
      },
      {
        id: "cva6-u09-l03-source-to-slide-practice",
        classroomId: "openhw-cva6-u09-l03-source-to-slide-practice-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 47,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s01-source-route",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Source-to-slide practice: turn evidence into a lesson",
          zh: "Source-to-slide practice: turn evidence into a lesson",
        },
        summary: {
          en: "Practice converting one CVA6 source claim into a slide, narration, quiz question, and review note.",
          zh: "Practice converting one CVA6 source claim into a slide, narration, quiz question, and review note.",
        },
        outcome: {
          en: "Transform a source-backed technical claim into a maintainable OpenHW Explorer micro-lesson unit.",
          zh: "Transform a source-backed technical claim into a maintainable OpenHW Explorer micro-lesson unit.",
        },
        tags: ["course production", "source-to-slide", "lesson workflow"],
        sourceRefs: [
          "CVA6 documentation README",
          "CVA6 public repository source tree",
          "CVA6 requirements: scope and verification intent",
        ],
      },
      {
        id: "cva6-u09-l04-verification-questions",
        classroomId: "openhw-cva6-u09-l04-verification-questions-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 48,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s02-verification-handoff",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Verification questions: turn architecture into checks",
          zh: "Verification questions: turn architecture into checks",
        },
        summary: {
          en: "Convert CVA6 architecture understanding into verification questions about observation, stimulus, scoreboard state, traps, and interfaces.",
          zh: "Convert CVA6 architecture understanding into verification questions about observation, stimulus, scoreboard state, traps, and interfaces.",
        },
        outcome: {
          en: "Write better verification handoff questions after reading CVA6 source and documentation.",
          zh: "Write better verification handoff questions after reading CVA6 source and documentation.",
        },
        tags: ["verification", "questions", "handoff"],
        sourceRefs: [
          "CVA6 requirements: scope and verification intent",
          "CVA6 APU: testharness",
          "CV32A60X design: Scoreboard submodule",
          "CV32A60X design: COMMIT_STAGE module",
        ],
      },
      {
        id: "cva6-u09-l05-final-project-brief",
        classroomId: "openhw-cva6-u09-l05-final-project-brief-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 49,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s02-verification-handoff",
        language: "en",
        durationMinutes: 9,
        slideCount: 5,
        quizCount: 4,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Final project brief: produce a CVA6 reading note",
          zh: "Final project brief: produce a CVA6 reading note",
        },
        summary: {
          en: "A capstone project brief for producing a source-backed CVA6 reading note with slides, narration, quiz, and verification handoff.",
          zh: "A capstone project brief for producing a source-backed CVA6 reading note with slides, narration, quiz, and verification handoff.",
        },
        outcome: {
          en: "Prepare one publishable technical note from a CVA6 source slice using the OpenHW Explorer workflow.",
          zh: "Prepare one publishable technical note from a CVA6 source slice using the OpenHW Explorer workflow.",
        },
        tags: ["capstone", "project brief", "source note"],
        sourceRefs: [
          "CVA6 documentation overview",
          "CVA6 public repository source tree",
          "CVA6 requirements: scope and verification intent",
          "CVA6 Core Integration",
        ],
      },
      {
        id: "cva6-u09-l06-final-checkpoint",
        classroomId: "openhw-cva6-u09-l06-final-checkpoint-en",
        projectId: "cva6",
        seriesId: "cva6-from-zero",
        status: "pilot",
        order: 50,
        unitId: "u09-source-reading-verification",
        skillId: "u09-s03-checkpoint",
        language: "en",
        durationMinutes: 10,
        slideCount: 4,
        quizCount: 8,
        level: {
          en: "Intermediate",
          zh: "进阶",
        },
        title: {
          en: "Final checkpoint: CVA6 From Zero",
          zh: "Final checkpoint: CVA6 From Zero",
        },
        summary: {
          en: "The final choice-only checkpoint across CVA6 positioning, configuration, pipeline, frontend, issue, execute, memory, interfaces, and source workflow.",
          zh: "The final choice-only checkpoint across CVA6 positioning, configuration, pipeline, frontend, issue, execute, memory, interfaces, and source workflow.",
        },
        outcome: {
          en: "Demonstrate readiness to read CVA6 sources and produce scoped technical explanations.",
          zh: "Demonstrate readiness to read CVA6 sources and produce scoped technical explanations.",
        },
        tags: ["final checkpoint", "CVA6 From Zero", "assessment"],
        sourceRefs: [
          "CVA6 documentation overview",
          "CVA6 public repository source tree",
          "CV32A60X design: Scoreboard submodule",
          "CV32A60X design: COMMIT_STAGE module",
          "CVA6 AXI interface",
          "CVA6 CV-X-IF Interface and Coprocessor",
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
  {
    id: "openhw-foundations",
    trackId: "openhw-foundations",
    projectId: "openhw",
    status: "pilot",
    title: {
      en: "OpenHW Foundations",
      zh: "OpenHW Foundations",
    },
    subtitle: {
      en: "A practical introduction to OpenHW as an industrial open-source RISC-V IP ecosystem.",
      zh: "从产业采用角度理解 OpenHW 作为工业级开源 RISC-V IP 生态的入门课。",
    },
    description: {
      en: "This series explains why OpenHW matters, how it complements the RISC-V ISA, what CORE-V deliverables include, and why licensing, verification, tooling, roadmap, and ecosystem support are central to commercial open-source hardware adoption.",
      zh: "这个系列解释 OpenHW 为什么重要、它如何补足 RISC-V ISA、CORE-V deliverables 包含什么，以及为什么许可、验证、工具、路线图和生态支持是商业采用开源硬件的核心。",
    },
    audience: {
      en: "Engineers, students, researchers, and industry partners who want to understand OpenHW before choosing a specific core such as CVA6.",
      zh: "适合在选择 CVA6 等具体核心前，想先理解 OpenHW 背景的工程师、学生、研究者和产业伙伴。",
    },
    level: {
      en: "Starter",
      zh: "入门",
    },
    estimatedHours: 0.4,
    lessonsPlanned: 1,
    lessonsReady: 1,
    featuredLessonId: "openhw-u01-l01-industrial-adoption",
    units: [
      {
        id: "u01-openhw-industrial-context",
        order: 1,
        title: {
          en: "Unit 01 · OpenHW industrial context",
          zh: "Unit 01 · OpenHW 产业背景",
        },
        goal: {
          en: "Build the mental model for OpenHW, CORE-V deliverables, commercial adoption gates, and the learning path into CVA6.",
          zh: "建立 OpenHW、CORE-V deliverables、商业采用门槛，以及进入 CVA6 深度学习路径的整体认知。",
        },
        skillIds: ["u01-s01-openhw-adoption"],
      },
    ],
    skills: [
      {
        id: "u01-s01-openhw-adoption",
        title: {
          en: "Read OpenHW as an adoption ecosystem",
          zh: "从采用生态角度阅读 OpenHW",
        },
        description: {
          en: "Connect RISC-V, CORE-V, licensing, verification, tooling, roadmap, and ecosystem support into one practical OpenHW story.",
          zh: "把 RISC-V、CORE-V、许可、验证、工具、路线图和生态支持串成一个可实践的 OpenHW 故事。",
        },
        lessonIds: ["openhw-u01-l01-industrial-adoption"],
      },
    ],
    lessons: [
      {
        id: "openhw-u01-l01-industrial-adoption",
        classroomId: "openhw-overview-industrial-adoption-en",
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
        level: {
          en: "Starter",
          zh: "入门",
        },
        title: {
          en: "OpenHW foundations: industrial open-source RISC-V IP",
          zh: "OpenHW foundations: industrial open-source RISC-V IP",
        },
        summary: {
          en: "Use OpenHW Group public slide decks to understand OpenHW's role, CORE-V deliverables, permissive licensing, verification quality, ecosystem readiness, and digital sovereignty.",
          zh: "基于 OpenHW Group 公开演示材料，理解 OpenHW 的角色、CORE-V deliverables、宽松许可、验证质量、生态准备度和数字主权意义。",
        },
        outcome: {
          en: "Explain why OpenHW is more than a set of repositories, and identify the adoption gates that matter before entering CVA6 deep dives.",
          zh: "解释为什么 OpenHW 不只是仓库集合，并识别进入 CVA6 深度课前需要理解的采用门槛。",
        },
        tags: ["OpenHW", "CORE-V", "RISC-V", "commercial adoption", "open-source hardware"],
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

export function getReadyLessons(series: ClassroomSeries) {
  return series.lessons.filter(
    (lesson) => lesson.classroomId && (lesson.status === "featured" || lesson.status === "pilot"),
  );
}
