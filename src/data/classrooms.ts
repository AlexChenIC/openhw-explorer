// New original human-authored or human-edited course content added after
// 2026-07-10 may be rights reserved where applicable. Historical Apache-2.0
// grants, third-party material, and non-protectable material are not affected.
// See LICENSE-CONTENT.md at the repository root.

export type ClassroomLocale = "en" | "zh";

export type LocalizedText = Record<ClassroomLocale, string>;

export type ClassroomTrackStatus = "open" | "planned";
export type ClassroomSeriesStatus = "in-production" | "development";
export type ClassroomSeriesVisibility = "featured" | "development";
export type ClassroomLessonStatus =
  | "published"
  | "editorial-review"
  | "in-production"
  | "planned"
  | "prototype";
export type ClassroomLessonRole = "catalog" | "prototype";

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
  role: ClassroomLessonRole;
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
  visibility: ClassroomSeriesVisibility;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
  level: LocalizedText;
  estimatedHours: number;
  targetDurationMinutes?: readonly [number, number];
  prototypeLessonId?: string;
  units: ClassroomUnit[];
  skills: ClassroomSkill[];
  lessons: ClassroomLesson[];
}

export const classroomTracks: ClassroomTrack[] = [
  {
    id: "openhw-foundations",
    status: "open",
    title: {
      en: "OpenHW Essentials",
      zh: "OpenHW 核心概念",
    },
    description: {
      en: "Short, source-checked lessons that make OpenHW names, organizations, and technical boundaries easier to read.",
      zh: "用短小且经过资料核对的课程，读懂 OpenHW 的命名、组织关系与技术边界。",
    },
    audience: {
      en: "Learners and engineers who want a reliable first map of OpenHW and CORE-V.",
      zh: "适合希望建立可靠 OpenHW 与 CORE-V 入门地图的学习者和工程师。",
    },
    seriesIds: ["openhw-foundations"],
  },
  {
    id: "processor-cores",
    status: "planned",
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

// Prototype packages remain available by direct link so the classroom player
// and older course work can still be evaluated. Only lessons with status
// "published" belong to the reviewed public catalog.
export const classroomSeries: ClassroomSeries[] = [
  {
    id: "cva6-from-zero",
    trackId: "processor-cores",
    projectId: "cva6",
    status: "development",
    visibility: "development",
    title: { en: "CVA6 From Zero", zh: "CVA6 从零开始" },
    subtitle: {
      en: "A structured path for understanding CVA6 before opening large RTL folders.",
      zh: "在打开大型 RTL 目录之前，先建立 CVA6 的资料、边界、配置和架构地图。",
    },
    description: {
      en: "A nine-unit deep-dive roadmap retained for future production. One bilingual format preview remains available, while the first public release focuses on shorter OpenHW Essentials lessons.",
      zh: "为后续制作保留的九单元深度课程路线。目前保留一节中英双语形式预览，首发阶段则优先完成更短的 OpenHW 核心概念课程。",
    },
    audience: {
      en: "Learners who know basic RISC-V concepts and want to read CVA6 like an engineer.",
      zh: "适合已经了解基础 RISC-V 概念、希望用工程方式阅读 CVA6 的学习者。",
    },
    level: { en: "Starter to intermediate", zh: "入门到进阶" },
    estimatedHours: 13,
    prototypeLessonId: "cva6-u01-l01-what-is-cva6",
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
        status: "prototype",
        role: "prototype",
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
    status: "in-production",
    visibility: "featured",
    title: { en: "OpenHW Essentials", zh: "OpenHW 核心概念" },
    subtitle: {
      en: "One question, one reliable map, and one short lesson at a time.",
      zh: "每节课解决一个具体问题，建立一张可靠的小地图。",
    },
    description: {
      en: "Five short lessons build a practical first map: CORE-V names, the OpenHW Foundation, technical boundaries, verification, and the work required to turn open RTL into usable processor IP.",
      zh: "五节短课建立一张实用的入门地图：CORE-V 命名、OpenHW Foundation、技术对象边界、验证，以及把开放 RTL 变成可用处理器 IP 所需的工作。",
    },
    audience: {
      en: "Engineers, students, researchers, and partners who want context before choosing a specific CORE-V project.",
      zh: "适合在选择具体 CORE-V 项目前，想先理解 OpenHW 背景的工程师、学生、研究者和产业伙伴。",
    },
    level: { en: "Starter", zh: "入门" },
    estimatedHours: 0.75,
    targetDurationMinutes: [6, 10],
    prototypeLessonId: "openhw-u01-l01-industrial-adoption",
    units: [
      {
        id: "u01-core-v-names",
        order: 1,
        title: { en: "Read a CORE-V core name", zh: "读懂 CORE-V 核心名称" },
        goal: {
          en: "Decode names such as CV32E40P and understand why CVA6 names a configurable project family rather than one frozen core.",
          zh: "拆解 CV32E40P 等名称，并理解为什么 CVA6 指向可配置的项目家族，而不是一个固定核心。",
        },
        skillIds: ["u01-s01-nomenclature"],
      },
      {
        id: "u02-openhw-foundation",
        order: 2,
        title: { en: "Understand the OpenHW Foundation", zh: "理解 OpenHW Foundation" },
        goal: {
          en: "Place OpenHW, Eclipse Foundation, RISC-V International, and CORE-V in one current organizational map.",
          zh: "把 OpenHW、Eclipse Foundation、RISC-V International 与 CORE-V 放进一张当前有效的组织关系图。",
        },
        skillIds: ["u02-s01-foundation-map"],
      },
      {
        id: "u03-technical-boundaries",
        order: 3,
        title: {
          en: "Separate ISA, IP, core, SoC, and repository",
          zh: "区分 ISA、IP、处理器核、SoC 与仓库",
        },
        goal: {
          en: "Use the right technical object when navigating OpenHW projects and documentation.",
          zh: "浏览 OpenHW 项目和文档时，能够判断自己面对的技术对象。",
        },
        skillIds: ["u03-s01-boundaries"],
      },
      {
        id: "u04-verification",
        order: 4,
        title: { en: "See why verification matters", zh: "理解验证为什么重要" },
        goal: {
          en: "Understand why a well-designed or silicon-proven core still needs structured verification evidence.",
          zh: "理解为什么设计良好、甚至已经流片的处理器核，仍然需要结构化的验证证据。",
        },
        skillIds: ["u04-s01-verification-evidence"],
      },
      {
        id: "u05-usable-ip",
        order: 5,
        title: { en: "Look beyond the RTL", zh: "把视线移到 RTL 之外" },
        goal: {
          en: "Recognize the documentation, verification, software, integration, and governance work behind usable open processor IP.",
          zh: "识别可用开源处理器 IP 背后的文档、验证、软件、集成与治理工作。",
        },
        skillIds: ["u05-s01-ip-readiness"],
      },
    ],
    skills: [
      {
        id: "u01-s01-nomenclature",
        title: { en: "Decode CORE-V nomenclature", zh: "拆解 CORE-V 命名" },
        description: {
          en: "Read family, width, class, pipeline, product, and modifier signals without treating every name as identical.",
          zh: "识别家族、位宽、类别、流水线、产品编号与修饰符，同时避免把所有项目名称套进同一公式。",
        },
        lessonIds: ["openhw-u01-l01-core-v-names"],
      },
      {
        id: "u02-s01-foundation-map",
        title: { en: "Map the organizations", zh: "建立组织关系图" },
        description: {
          en: "Explain the distinct roles of OpenHW Foundation, Eclipse Foundation, RISC-V International, and CORE-V projects.",
          zh: "解释 OpenHW Foundation、Eclipse Foundation、RISC-V International 与 CORE-V 项目的不同角色。",
        },
        lessonIds: ["openhw-u02-l01-foundation"],
      },
      {
        id: "u03-s01-boundaries",
        title: { en: "Name the technical object", zh: "说清技术对象" },
        description: {
          en: "Distinguish an instruction-set standard from an implementation, a processor core, a SoC, and a source repository.",
          zh: "区分指令集标准、实现、处理器核、SoC 与源代码仓库。",
        },
        lessonIds: ["openhw-u03-l01-riscv-corev-core-soc"],
      },
      {
        id: "u04-s01-verification-evidence",
        title: { en: "Read verification evidence", zh: "读懂验证证据" },
        description: {
          en: "Separate design reputation, architectural compliance, testbench capability, and published verification results.",
          zh: "区分设计声誉、架构兼容性、验证平台能力和公开验证结果。",
        },
        lessonIds: ["openhw-u04-l01-why-verification"],
      },
      {
        id: "u05-s01-ip-readiness",
        title: { en: "Assess IP readiness", zh: "判断 IP 是否可用" },
        description: {
          en: "Evaluate an open processor project through its RTL, verification, documentation, software, integration assets, and maintenance model.",
          zh: "从 RTL、验证、文档、软件、集成资产和维护方式评估开源处理器项目。",
        },
        lessonIds: ["openhw-u05-l01-beyond-rtl"],
      },
    ],
    lessons: [
      {
        id: "openhw-u01-l01-core-v-names",
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "editorial-review",
        role: "catalog",
        order: 1,
        unitId: "u01-core-v-names",
        skillId: "u01-s01-nomenclature",
        language: "en",
        durationMinutes: 8,
        slideCount: 8,
        quizCount: 1,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "Why is it called CVA6? Read a CORE-V core name",
          zh: "为什么叫 CVA6？读懂 CORE-V 核心名称",
        },
        summary: {
          en: "Decode the information carried by names such as CV32E40P, CVA6, CV32A60AX, and CV64A6 without confusing a repository family with a specific configuration.",
          zh: "拆解 CV32E40P、CVA6、CV32A60AX 与 CV64A6 等名称，并区分项目家族与具体配置。",
        },
        outcome: {
          en: "Explain the useful parts of CORE-V nomenclature and state where a name stops being a complete technical specification.",
          zh: "解释 CORE-V 命名中可读取的信息，并说明名称为什么不能替代完整技术规格。",
        },
        tags: ["OpenHW", "CORE-V", "CVA6", "nomenclature"],
        sourceRefs: [
          "CVA6 documentation: CORE-V Nomenclature",
          "CVA6 User Manual: verified configurations",
          "OpenHW Projects",
        ],
      },
      {
        id: "openhw-u02-l01-foundation",
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "in-production",
        role: "catalog",
        order: 2,
        unitId: "u02-openhw-foundation",
        skillId: "u02-s01-foundation-map",
        language: "en",
        durationMinutes: 8,
        slideCount: 7,
        quizCount: 1,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "What is the OpenHW Foundation?",
          zh: "OpenHW Foundation 是什么？",
        },
        summary: {
          en: "Build a current map of the foundation, its Eclipse governance context, its relationship to RISC-V International, and the CORE-V projects it supports.",
          zh: "建立当前组织关系图，理解 OpenHW Foundation 的 Eclipse 治理背景、与 RISC-V International 的关系及其支持的 CORE-V 项目。",
        },
        outcome: {
          en: "Describe OpenHW's role without confusing an ISA standards body, a foundation, and the projects it hosts.",
          zh: "准确描述 OpenHW 的角色，不混淆指令集标准组织、基金会与其承载的项目。",
        },
        tags: ["OpenHW Foundation", "Eclipse Foundation", "RISC-V", "CORE-V"],
        sourceRefs: [
          "OpenHW Foundation: About",
          "Eclipse OpenHW Foundation Working Group Charter",
          "RISC-V International: About",
        ],
      },
      {
        id: "openhw-u03-l01-riscv-corev-core-soc",
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "planned",
        role: "catalog",
        order: 3,
        unitId: "u03-technical-boundaries",
        skillId: "u03-s01-boundaries",
        language: "en",
        durationMinutes: 8,
        slideCount: 7,
        quizCount: 1,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "From the RISC-V ISA to a CORE-V core and SoC",
          zh: "从 RISC-V 指令集到 CORE-V 处理器核与 SoC",
        },
        summary: {
          en: "Follow one concrete stack from the software-visible RISC-V contract, through a CORE-V processor implementation, to a system that adds memory, interconnect, peripherals, and I/O.",
          zh: "沿一条具体技术链，理解软件可见的 RISC-V 约定、CORE-V 处理器实现，以及加入存储、互连、外设和 I/O 后形成的系统。",
        },
        outcome: {
          en: "Distinguish an ISA, processor core, and SoC, then recognize a repository as the engineering container for one or more related artifacts.",
          zh: "区分指令集、处理器核与 SoC，并理解仓库是承载一个或多个相关工程产物的协作容器。",
        },
        tags: ["RISC-V", "CORE-V", "processor core", "SoC", "repository"],
        sourceRefs: [
          "Open Source Processor IP for High-Volume Production SoCs (2019)",
          "VLSI SoC: Open Source Processor IP (2020)",
          "OpenHW Foundation RISC-V Cores (2025, CC BY 4.0)",
          "RISC-V International and current OpenHW project documentation",
        ],
      },
      {
        id: "openhw-u04-l01-why-verification",
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "planned",
        role: "catalog",
        order: 4,
        unitId: "u04-verification",
        skillId: "u04-s01-verification-evidence",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 1,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "Why does a proven core still need verification?",
          zh: "为什么成熟的处理器核仍然需要验证？",
        },
        summary: {
          en: "Use CORE-V-VERIF to see why prior silicon, a strong design lineage, and passing architecture tests do not replace a maintained verification environment and reviewable evidence.",
          zh: "以 CORE-V-VERIF 为例，理解既有流片、良好设计传承和架构测试为什么不能替代持续维护的验证环境与可复核证据。",
        },
        outcome: {
          en: "Explain the distinct roles of architecture tests, simulation, formal methods, coverage, and published verification results.",
          zh: "解释架构测试、仿真、形式验证、覆盖率和公开验证结果各自承担的角色。",
        },
        tags: ["OpenHW", "CORE-V-VERIF", "verification", "UVM"],
        sourceRefs: [
          "OpenHW Projects: CORE-V-Verif",
          "CORE-V-VERIF Verification Strategy",
          "CV32E40P Verification Strategy and Status",
        ],
      },
      {
        id: "openhw-u05-l01-beyond-rtl",
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "planned",
        role: "catalog",
        order: 5,
        unitId: "u05-usable-ip",
        skillId: "u05-s01-ip-readiness",
        language: "en",
        durationMinutes: 9,
        slideCount: 8,
        quizCount: 1,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "What turns open RTL into usable processor IP?",
          zh: "什么让开放 RTL 变成可用的处理器 IP？",
        },
        summary: {
          en: "Follow the layers around a core: specifications, verification, documentation, toolchains, software, integration platforms, licensing, and long-term maintenance.",
          zh: "沿着处理器核周围的各层展开：规格、验证、文档、工具链、软件、集成平台、许可和长期维护。",
        },
        outcome: {
          en: "Use a compact readiness checklist to decide whether an open processor project is worth deeper technical evaluation.",
          zh: "使用一份精简的成熟度检查表，判断一个开源处理器项目是否值得继续深入评估。",
        },
        tags: ["OpenHW", "processor IP", "open source", "adoption"],
        sourceRefs: [
          "OpenHW Foundation: Projects",
          "OpenHW Foundation: About",
          "Eclipse OpenHW Foundation Working Group Charter",
        ],
      },
      {
        id: "openhw-u01-l01-industrial-adoption",
        classroomIds: { en: "openhw-overview-industrial-adoption-en" },
        projectId: "openhw",
        seriesId: "openhw-foundations",
        status: "prototype",
        role: "prototype",
        order: 0,
        unitId: "prototype",
        skillId: "prototype",
        language: "en",
        durationMinutes: 22,
        slideCount: 14,
        quizCount: 0,
        level: { en: "Starter", zh: "入门" },
        title: {
          en: "Format preview: industrial open-source RISC-V IP",
          zh: "形式预览：面向产业的开源 RISC-V IP",
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

export function getFeaturedClassroomSeries() {
  return classroomSeries.filter((series) => series.visibility === "featured");
}

export function getDevelopmentClassroomSeries() {
  return classroomSeries.filter((series) => series.visibility === "development");
}

export function getCatalogLessons(series: ClassroomSeries) {
  return series.lessons.filter((lesson) => lesson.role === "catalog");
}

export function getPrototypeLessons(series: ClassroomSeries) {
  return series.lessons.filter(
    (lesson) => lesson.role === "prototype" && hasPublishedLesson(lesson),
  );
}

export function getPrototypeLesson(series: ClassroomSeries) {
  return series.lessons.find((lesson) => lesson.id === series.prototypeLessonId);
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
    (lesson) => lesson.status === "published" && hasPublishedLesson(lesson),
  );
}
