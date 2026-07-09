import { Resource } from "@/types";

/**
 * Additional Resources
 *
 * Links to learning materials, documentation, tools, and community resources.
 */

export const resources: Resource[] = [
  // Learning Resources
  {
    id: "learning-riscv-basics",
    title: "Learning Resources",
    description: "Tutorials and guides for getting started with OpenHW and RISC-V development.",
    category: "learning",
    url: "https://docs.openhwgroup.org/",
    icon: "GraduationCap",
    featured: true,
  },

  // Documentation
  {
    id: "official-docs",
    title: "Official Documentation",
    description: "Technical specifications, architecture references, and project documentation.",
    category: "docs",
    url: "https://docs.openhwgroup.org/",
    icon: "Library",
    featured: true,
  },

  // Tools
  {
    id: "tools-sdks",
    title: "Tools & SDKs",
    description: "Development tools, software kits, and utilities for OpenHW projects.",
    category: "tools",
    url: "https://github.com/openhwgroup",
    icon: "Wrench",
    featured: true,
  },

  // Community
  {
    id: "community-links",
    title: "Community Links",
    description: "Forums, mailing lists, and community resources for OpenHW developers.",
    category: "community",
    url: "https://openhwfoundation.org/",
    icon: "Users",
    featured: true,
  },
];

// External links (moved to a lightweight module; re-exported for compatibility)
export { externalLinks } from "./external-links";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type ResourceCategoryId =
  | "specifications"
  | "official"
  | "openhw"
  | "learning"
  | "hdls"
  | "toolchains"
  | "simulation"
  | "design-tools"
  | "verification-tools"
  | "community"
  | "commercial";

export type ResourceKind =
  | "official"
  | "standard"
  | "learning"
  | "tool"
  | "project"
  | "community"
  | "commercial";

export interface ResourceDirectoryLink {
  id: string;
  title: string;
  url: string;
  category: ResourceCategoryId;
  kind: ResourceKind;
  summary: LocalizedText;
  tags: string[];
  featured?: boolean;
  upstreamSource?: "riscv-ottawa";
}

export interface ResourceDirectoryCategory {
  id: ResourceCategoryId;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
}

export const resourceDirectoryAttribution = {
  sourceName: "RISC-V Ottawa Resources",
  sourceUrl: "https://riscvottawa.ca/resources",
  repositoryUrl: "https://github.com/riscv-ottawa/riscvottawa",
  license: "MIT",
  note: "Initial category and link seed adapted from riscv-ottawa/riscvottawa content/resources under the MIT License; descriptions are rewritten and extended for OpenHW Explorer.",
} as const;

export const resourceDirectoryCategories: ResourceDirectoryCategory[] = [
  {
    id: "specifications",
    title: {
      en: "RISC-V Specifications",
      zh: "RISC-V 规范",
    },
    shortTitle: {
      en: "Specifications",
      zh: "规范",
    },
    description: {
      en: "Authoritative ISA, platform, ABI, and formal specification entry points.",
      zh: "ISA、平台、ABI 和形式化规范的权威入口。",
    },
  },
  {
    id: "official",
    title: {
      en: "Official Resources",
      zh: "官方资源",
    },
    shortTitle: {
      en: "Official",
      zh: "官方",
    },
    description: {
      en: "RISC-V International and ecosystem-maintained learning, events, and working-group resources.",
      zh: "RISC-V International 及生态维护的学习、会议和工作组资源。",
    },
  },
  {
    id: "openhw",
    title: {
      en: "OpenHW / CORE-V Projects",
      zh: "OpenHW / CORE-V 项目",
    },
    shortTitle: {
      en: "OpenHW",
      zh: "OpenHW",
    },
    description: {
      en: "Core OpenHW and adjacent open-silicon projects worth connecting to lessons and project pages.",
      zh: "适合与课程和项目页联动的 OpenHW 及相邻开源硅项目。",
    },
  },
  {
    id: "learning",
    title: {
      en: "Learning & Books",
      zh: "学习与书籍",
    },
    shortTitle: {
      en: "Learning",
      zh: "学习",
    },
    description: {
      en: "Books and structured learning material for computer architecture, RISC-V, and SoC design.",
      zh: "面向计算机体系结构、RISC-V 和 SoC 设计的书籍与系统学习材料。",
    },
  },
  {
    id: "hdls",
    title: {
      en: "Hardware Description Languages",
      zh: "硬件描述语言",
    },
    shortTitle: {
      en: "HDLs",
      zh: "HDL",
    },
    description: {
      en: "Languages used to design, generate, and verify digital hardware.",
      zh: "用于设计、生成和验证数字硬件的语言。",
    },
  },
  {
    id: "toolchains",
    title: {
      en: "Toolchains",
      zh: "软件工具链",
    },
    shortTitle: {
      en: "Toolchains",
      zh: "工具链",
    },
    description: {
      en: "Compilers, libraries, and software build paths for RISC-V targets.",
      zh: "面向 RISC-V 目标的编译器、库和软件构建路径。",
    },
  },
  {
    id: "simulation",
    title: {
      en: "Simulators & Emulators",
      zh: "模拟器与仿真器",
    },
    shortTitle: {
      en: "Simulation",
      zh: "仿真",
    },
    description: {
      en: "Tools for running ISA, full-system, and embedded SoC workloads before hardware exists.",
      zh: "在硬件存在之前运行 ISA、全系统和嵌入式 SoC 工作负载的工具。",
    },
  },
  {
    id: "design-tools",
    title: {
      en: "Open-source Design Tooling",
      zh: "开源设计工具",
    },
    shortTitle: {
      en: "Design tools",
      zh: "设计工具",
    },
    description: {
      en: "Open-source synthesis, place-and-route, layout, register, and hardware compiler tooling.",
      zh: "开源综合、布局布线、版图、寄存器和硬件编译工具。",
    },
  },
  {
    id: "verification-tools",
    title: {
      en: "Open-source Verification Tooling",
      zh: "开源验证工具",
    },
    shortTitle: {
      en: "Verification",
      zh: "验证工具",
    },
    description: {
      en: "Simulation, testbench, waveform, and debug tools for open hardware verification work.",
      zh: "面向开源硬件验证工作的仿真、测试平台、波形和调试工具。",
    },
  },
  {
    id: "community",
    title: {
      en: "Community",
      zh: "社区",
    },
    shortTitle: {
      en: "Community",
      zh: "社区",
    },
    description: {
      en: "Organizations, events, and community programs around RISC-V and open silicon.",
      zh: "围绕 RISC-V 和开源硅的组织、活动与社区项目。",
    },
  },
  {
    id: "commercial",
    title: {
      en: "Commercial EDA Reference",
      zh: "商业 EDA 参考",
    },
    shortTitle: {
      en: "Commercial EDA",
      zh: "商业 EDA",
    },
    description: {
      en: "Commercial tool vendors often encountered in production silicon design and verification flows.",
      zh: "生产级硅设计和验证流程中常见的商业工具供应商。",
    },
  },
];

export const resourceDirectoryLinks: ResourceDirectoryLink[] = [
  {
    id: "riscv-ratified-specifications",
    title: "RISC-V Ratified Specifications Library",
    url: "https://docs.riscv.org/reference/home/index.html",
    category: "specifications",
    kind: "standard",
    summary: {
      en: "Browsable index for ratified RISC-V ISA, platform, and ABI specifications.",
      zh: "可浏览的 RISC-V ISA、平台和 ABI 已批准规范索引。",
    },
    tags: ["RISC-V", "Specifications", "ISA", "ABI"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-spec-dashboard",
    title: "RISC-V Specification Development Dashboard",
    url: "https://riscv.github.io/adm-spec-dashboard",
    category: "specifications",
    kind: "standard",
    summary: {
      en: "Status tracker for in-progress RISC-V specifications and ratification stages.",
      zh: "跟踪 RISC-V 进行中规范及批准阶段的状态面板。",
    },
    tags: ["RISC-V", "Specifications", "Governance"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "sail-riscv",
    title: "Formal Specification of the RISC-V ISA (Sail)",
    url: "https://github.com/riscv/sail-riscv",
    category: "specifications",
    kind: "standard",
    summary: {
      en: "Executable ISA model used for conformance, testing, and formal reasoning.",
      zh: "用于一致性测试、参考执行和形式化推理的可执行 ISA 模型。",
    },
    tags: ["RISC-V", "Sail", "Formal", "Verification"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-isa-manual",
    title: "RISC-V ISA Manuals (GitHub)",
    url: "https://github.com/riscv/riscv-isa-manual",
    category: "specifications",
    kind: "standard",
    summary: {
      en: "Source repository for privileged and unprivileged ISA manuals, including drafts.",
      zh: "特权与非特权 ISA 手册的源码仓库，包含草案内容。",
    },
    tags: ["RISC-V", "ISA", "Manuals"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-green-card",
    title: "RISC-V Green Card",
    url: "https://web.archive.org/web/2024/http://riscvbook.com/greencard-20181213.pdf",
    category: "specifications",
    kind: "learning",
    summary: {
      en: "The RISC-V Reader site includes the compact Green Card reference sheet for registers, base instructions, and common extensions.",
      zh: "The RISC-V Reader 页面包含 Green Card 速查表，可快速查看寄存器、基础指令和常见扩展。",
    },
    tags: ["RISC-V", "Reference", "Learning"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-exchange",
    title: "RISC-V Exchange",
    url: "https://riscv.org/exchange/",
    category: "official",
    kind: "official",
    summary: {
      en: "RISC-V ecosystem directory for cores, SoCs, software, boards, and services.",
      zh: "RISC-V 生态中的核心、SoC、软件、开发板和服务目录。",
    },
    tags: ["RISC-V", "Directory", "Ecosystem"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-summit",
    title: "RISC-V Summit",
    url: "https://riscv.org/community/risc-v-summits/",
    category: "official",
    kind: "official",
    summary: {
      en: "Flagship RISC-V conference hub for ecosystem talks and announcements.",
      zh: "RISC-V 旗舰会议入口，汇集生态演讲和重要发布。",
    },
    tags: ["RISC-V", "Conference", "Community"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "learn-riscv",
    title: "Learn RISC-V",
    url: "https://github.com/riscv/learn",
    category: "official",
    kind: "learning",
    summary: {
      en: "Community-maintained collection of RISC-V tutorials, courses, and reading lists.",
      zh: "社区维护的 RISC-V 教程、课程和阅读清单集合。",
    },
    tags: ["RISC-V", "Learning", "Courses"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-technical-wiki",
    title: "RISC-V Technical Wiki",
    url: "https://riscv.atlassian.net/wiki/spaces/HOME/overview",
    category: "official",
    kind: "official",
    summary: {
      en: "Working documentation for technical groups, task groups, and specification process.",
      zh: "技术组、任务组和规范流程的工作文档入口。",
    },
    tags: ["RISC-V", "Technical Groups", "Specifications"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "openhw-docs",
    title: "OpenHW Documentation",
    url: "https://docs.openhwgroup.org/en/latest/index.html",
    category: "openhw",
    kind: "official",
    summary: {
      en: "Official documentation entry for OpenHW projects, including CORE-V cores and verification.",
      zh: "OpenHW 项目的官方文档入口，覆盖 CORE-V 核心和验证相关内容。",
    },
    tags: ["OpenHW", "CORE-V", "Docs", "CVA6"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "openhw-cva6",
    title: "CVA6",
    url: "https://github.com/openhwgroup/cva6",
    category: "openhw",
    kind: "project",
    summary: {
      en: "Configurable application-class CORE-V RISC-V processor and current pilot course subject.",
      zh: "可配置的应用级 CORE-V RISC-V 处理器，也是当前课程主线样板。",
    },
    tags: ["OpenHW", "CVA6", "CORE-V", "Processor"],
    featured: true,
  },
  {
    id: "opentitan",
    title: "OpenTitan",
    url: "https://opentitan.org/",
    category: "openhw",
    kind: "project",
    summary: {
      en: "Open-source silicon root of trust project built around the Ibex RISC-V core.",
      zh: "围绕 Ibex RISC-V 核心构建的开源 silicon root of trust 项目。",
    },
    tags: ["OpenTitan", "Security", "Ibex", "RoT"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "ibex-cpu",
    title: "Ibex CPU",
    url: "https://lowrisc.org/ibex/",
    category: "openhw",
    kind: "project",
    summary: {
      en: "Small open-source 32-bit RISC-V core used in research, education, and SoC projects.",
      zh: "广泛用于研究、教学和 SoC 项目的小型 32 位开源 RISC-V 核心。",
    },
    tags: ["Ibex", "lowRISC", "Processor"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "cheriot-ibex",
    title: "CHERIoT-Ibex",
    url: "https://github.com/microsoft/cheriot-ibex",
    category: "openhw",
    kind: "project",
    summary: {
      en: "CHERI-extended Ibex variant for capability-based memory safety research and systems.",
      zh: "加入 CHERI capability 的 Ibex 变体，用于内存安全研究和系统构建。",
    },
    tags: ["CHERI", "Ibex", "Security"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "hazard3",
    title: "Hazard3",
    url: "https://github.com/Wren6991/Hazard3",
    category: "openhw",
    kind: "project",
    summary: {
      en: "Compact RV32 core useful for studying small pipeline design and embedded integration.",
      zh: "紧凑 RV32 核心，适合理解小型流水线设计和嵌入式集成。",
    },
    tags: ["RISC-V", "Core", "Embedded"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-reader",
    title: "The RISC-V Reader",
    url: "https://www.amazon.com/RISC-V-Reader-Open-Architecture-Atlas/dp/0999249118",
    category: "learning",
    kind: "learning",
    summary: {
      en: "Compact architecture atlas by Patterson and Waterman for understanding RISC-V design choices.",
      zh: "Patterson 和 Waterman 撰写的紧凑架构读本，适合理解 RISC-V 设计取舍。",
    },
    tags: ["Book", "RISC-V", "Architecture"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "cod-riscv",
    title: "Computer Organization and Design: RISC-V Edition",
    url: "https://www.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6",
    category: "learning",
    kind: "learning",
    summary: {
      en: "Classic computer organization textbook rebuilt around the RISC-V ISA.",
      zh: "围绕 RISC-V ISA 重写的经典计算机组成教材。",
    },
    tags: ["Book", "Computer Architecture", "RISC-V"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "ddca-riscv",
    title: "Digital Design and Computer Architecture, RISC-V Edition",
    url: "https://www.elsevier.com/books/digital-design-and-computer-architecture-risc-v-edition/harris/978-0-12-820064-3",
    category: "learning",
    kind: "learning",
    summary: {
      en: "Bridge from digital logic to processor implementation using RISC-V examples.",
      zh: "以 RISC-V 为例，从数字逻辑过渡到处理器实现。",
    },
    tags: ["Book", "Digital Design", "RISC-V"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-soc-design",
    title: "RISC-V System-on-Chip Design",
    url: "https://pages.hmc.edu/harris/ddca/rvsocd.html",
    category: "learning",
    kind: "learning",
    summary: {
      en: "Hands-on text for designing, verifying, and integrating a RISC-V SoC.",
      zh: "面向 RISC-V SoC 设计、验证和集成的实践型教材。",
    },
    tags: ["Book", "SoC", "Verification"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "systemverilog",
    title: "SystemVerilog",
    url: "https://standards.ieee.org/ieee/1800/7743/",
    category: "hdls",
    kind: "standard",
    summary: {
      en: "IEEE 1800 language used for RTL design, assertions, and verification environments.",
      zh: "IEEE 1800 语言，用于 RTL 设计、断言和验证环境。",
    },
    tags: ["HDL", "RTL", "Verification"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "vhdl",
    title: "VHDL",
    url: "https://ieeexplore.ieee.org/document/8938196",
    category: "hdls",
    kind: "standard",
    summary: {
      en: "Strongly typed hardware description language used in many long-lived industrial flows.",
      zh: "强类型硬件描述语言，常见于长期维护的工业流程。",
    },
    tags: ["HDL", "FPGA", "ASIC"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "bluespec",
    title: "Bluespec SystemVerilog",
    url: "https://github.com/B-Lang-org/bsc",
    category: "hdls",
    kind: "tool",
    summary: {
      en: "Rule-based HDL and open-source compiler for high-level hardware construction.",
      zh: "基于规则的 HDL 及开源编译器，用于更高层次的硬件构建。",
    },
    tags: ["HDL", "Compiler", "Generator"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "spade",
    title: "Spade",
    url: "https://spade-lang.org/",
    category: "hdls",
    kind: "tool",
    summary: {
      en: "Modern HDL with strong typing, pattern matching, and pipeline-aware syntax.",
      zh: "现代 HDL，强调强类型、模式匹配和流水线感知语法。",
    },
    tags: ["HDL", "Modern HDL"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "chisel",
    title: "Chisel",
    url: "https://www.chisel-lang.org/",
    category: "hdls",
    kind: "tool",
    summary: {
      en: "Scala-embedded HDL used by Rocket Chip and many generator-based RISC-V projects.",
      zh: "嵌入 Scala 的 HDL，被 Rocket Chip 和许多生成器式 RISC-V 项目使用。",
    },
    tags: ["HDL", "Scala", "Generator", "RISC-V"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "spinalhdl",
    title: "SpinalHDL",
    url: "https://spinalhdl.github.io/SpinalDoc-RTD/",
    category: "hdls",
    kind: "tool",
    summary: {
      en: "Scala-based hardware construction language for productive RTL and SoC generation.",
      zh: "基于 Scala 的硬件构建语言，面向高效 RTL 和 SoC 生成。",
    },
    tags: ["HDL", "Scala", "Generator"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "amaranth",
    title: "Amaranth",
    url: "https://amaranth-lang.org/docs/amaranth/latest/",
    category: "hdls",
    kind: "tool",
    summary: {
      en: "Python-based HDL aimed at FPGA and open-toolchain design flows.",
      zh: "基于 Python 的 HDL，面向 FPGA 和开源工具链设计流程。",
    },
    tags: ["HDL", "Python", "FPGA"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-gnu-toolchain",
    title: "riscv-gnu-toolchain",
    url: "https://github.com/riscv-collab/riscv-gnu-toolchain",
    category: "toolchains",
    kind: "tool",
    summary: {
      en: "Meta-repository for building GCC, Binutils, glibc, and newlib for RISC-V.",
      zh: "用于构建 RISC-V GCC、Binutils、glibc 和 newlib 的元仓库。",
    },
    tags: ["RISC-V", "GCC", "Toolchain"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "llvm-riscv",
    title: "LLVM RISC-V Backend",
    url: "https://llvm.org/docs/RISCVUsage.html",
    category: "toolchains",
    kind: "tool",
    summary: {
      en: "LLVM documentation for RISC-V code generation and supported ISA extensions.",
      zh: "LLVM 关于 RISC-V 代码生成和支持扩展的官方文档。",
    },
    tags: ["LLVM", "Clang", "RISC-V"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "rust-riscv",
    title: "Rust RISC-V Targets",
    url: "https://doc.rust-lang.org/rustc/platform-support.html",
    category: "toolchains",
    kind: "tool",
    summary: {
      en: "Rust platform-support matrix for bare-metal and Linux RISC-V targets.",
      zh: "Rust 对裸机和 Linux RISC-V 目标的平台支持矩阵。",
    },
    tags: ["Rust", "RISC-V", "Toolchain"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "picolibc",
    title: "picolibc",
    url: "https://github.com/picolibc/picolibc",
    category: "toolchains",
    kind: "tool",
    summary: {
      en: "Small C library tuned for embedded and deeply constrained targets.",
      zh: "面向嵌入式和资源受限目标优化的小型 C 库。",
    },
    tags: ["C Library", "Embedded", "RISC-V"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "spike",
    title: "Spike (riscv-isa-sim)",
    url: "https://github.com/riscv-software-src/riscv-isa-sim",
    category: "simulation",
    kind: "tool",
    summary: {
      en: "Reference RISC-V ISA simulator maintained near the official specification ecosystem.",
      zh: "RISC-V ISA 参考模拟器，靠近官方规范生态维护。",
    },
    tags: ["Simulator", "RISC-V", "ISA"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "sail-riscv-simulator",
    title: "Sail RISC-V Model",
    url: "https://github.com/riscv/sail-riscv",
    category: "simulation",
    kind: "tool",
    summary: {
      en: "Executable formal ISA model that can build sail_riscv_sim for ELF execution, testing, and reference-model workflows.",
      zh: "可执行的形式化 ISA 模型，可构建 sail_riscv_sim，用于 ELF 执行、测试和参考模型流程。",
    },
    tags: ["Sail", "Reference Model", "Executable Spec"],
    featured: true,
  },
  {
    id: "qemu-riscv",
    title: "QEMU RISC-V",
    url: "https://www.qemu.org/docs/master/system/target-riscv.html",
    category: "simulation",
    kind: "tool",
    summary: {
      en: "Full-system emulator for RV32/RV64 systems, virtio devices, and Linux boot flows.",
      zh: "支持 RV32/RV64、virtio 设备和 Linux 启动流程的全系统仿真器。",
    },
    tags: ["QEMU", "RISC-V", "Linux"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "renode",
    title: "Renode",
    url: "https://renode.io/",
    category: "simulation",
    kind: "tool",
    summary: {
      en: "Multi-node embedded simulation framework for SoCs, peripherals, and networked systems.",
      zh: "面向 SoC、外设和网络化系统的多节点嵌入式仿真框架。",
    },
    tags: ["Simulation", "Embedded", "SoC"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "whisper",
    title: "Whisper",
    url: "https://github.com/chipsalliance/SweRV-ISS",
    category: "simulation",
    kind: "tool",
    summary: {
      en: "RISC-V instruction-set simulator originally built around Western Digital SweRV cores.",
      zh: "最初围绕 Western Digital SweRV 核心构建的 RISC-V 指令集模拟器。",
    },
    tags: ["Simulator", "SweRV", "CHIPS Alliance"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "yosys",
    title: "Yosys",
    url: "https://yosyshq.net/yosys/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Open synthesis suite for Verilog and multiple FPGA-oriented backends.",
      zh: "面向 Verilog 和多种 FPGA 后端的开源综合工具。",
    },
    tags: ["Synthesis", "Verilog", "FPGA"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "nextpnr",
    title: "nextpnr",
    url: "https://github.com/YosysHQ/nextpnr",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Vendor-neutral FPGA place-and-route for iCE40, ECP5, Nexus, and Gowin devices.",
      zh: "支持 iCE40、ECP5、Nexus 和 Gowin 等器件的中立 FPGA 布局布线工具。",
    },
    tags: ["FPGA", "Place and Route"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "fusesoc",
    title: "FuseSoC",
    url: "https://fusesoc.readthedocs.io/en/stable/user/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Package manager and build orchestrator for reusable HDL IP cores.",
      zh: "面向可复用 HDL IP 的包管理和构建编排工具。",
    },
    tags: ["IP", "Build", "RTL"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "librelane",
    title: "LibreLane",
    url: "https://fossi-foundation.org/librelane/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Open-source RTL-to-GDSII digital ASIC flow continuing the OpenLane lineage.",
      zh: "延续 OpenLane 路线的开源 RTL-to-GDSII 数字 ASIC 流程。",
    },
    tags: ["ASIC", "RTL-to-GDS", "OpenLane"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "openroad",
    title: "OpenROAD",
    url: "https://openroad.readthedocs.io/en/latest/index.html",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Automated physical design flow for floorplanning, placement, clocking, and routing.",
      zh: "覆盖 floorplan、placement、clock tree 和 routing 的自动化物理设计流程。",
    },
    tags: ["Physical Design", "ASIC", "EDA"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "gdsfactory",
    title: "GDSFactory",
    url: "https://gdsfactory.github.io/gdsfactory/index.html",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Python framework for programmatic GDS layout generation and PDK-aware design.",
      zh: "用于程序化 GDS 版图生成和 PDK 感知设计的 Python 框架。",
    },
    tags: ["Layout", "GDS", "Python"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "siliconcompiler",
    title: "SiliconCompiler",
    url: "https://www.siliconcompiler.com/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "Modular build system that can drive open and commercial silicon design flows.",
      zh: "可驱动开源与商业硅设计流程的模块化构建系统。",
    },
    tags: ["Build", "EDA", "ASIC"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "circt",
    title: "Circuit IR Compilers and Tools (CIRCT)",
    url: "https://circt.llvm.org/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "LLVM-style compiler infrastructure for hardware IRs and hardware languages.",
      zh: "面向硬件 IR 和硬件语言的 LLVM 风格编译基础设施。",
    },
    tags: ["Compiler", "MLIR", "Hardware IR"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "peakrdl",
    title: "PeakRDL",
    url: "https://peakrdl.readthedocs.io/en/latest/",
    category: "design-tools",
    kind: "tool",
    summary: {
      en: "SystemRDL toolkit for generating RTL, headers, documentation, and register artifacts.",
      zh: "SystemRDL 工具集，可生成 RTL、头文件、文档和寄存器相关产物。",
    },
    tags: ["SystemRDL", "Registers", "Docs"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "verilator",
    title: "Verilator",
    url: "https://www.veripool.org/verilator/",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Fast Verilog/SystemVerilog simulator that compiles designs into C++ or SystemC.",
      zh: "高性能 Verilog/SystemVerilog 仿真器，可将设计编译成 C++ 或 SystemC。",
    },
    tags: ["Simulation", "SystemVerilog", "Verification"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "icarus-verilog",
    title: "Icarus Verilog",
    url: "https://steveicarus.github.io/iverilog/",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Lightweight event-driven Verilog simulator useful for small tests and education.",
      zh: "轻量级事件驱动 Verilog 仿真器，适合小型测试和教学。",
    },
    tags: ["Simulation", "Verilog"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "cocotb",
    title: "cocotb",
    url: "https://www.cocotb.org/",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Python coroutine testbench framework that connects to many HDL simulators.",
      zh: "基于 Python 协程的测试平台框架，可连接多种 HDL 仿真器。",
    },
    tags: ["Python", "Testbench", "Verification"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "microcotb",
    title: "microcotb",
    url: "https://github.com/psychogenic/microcotb",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Minimal cocotb-style runner for constrained Python and MicroPython contexts.",
      zh: "面向受限 Python 和 MicroPython 环境的极简 cocotb 风格 runner。",
    },
    tags: ["Python", "MicroPython", "Testbench"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "gtkwave",
    title: "GTKWave",
    url: "https://gtkwave.github.io/gtkwave/",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Long-running waveform viewer for VCD, FST, LXT, and related trace formats.",
      zh: "长期使用的波形查看器，支持 VCD、FST、LXT 等 trace 格式。",
    },
    tags: ["Waveform", "Debug", "Verification"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "surfer",
    title: "Surfer",
    url: "https://surfer-project.org/",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Modern waveform viewer focused on responsiveness and daily debugging ergonomics.",
      zh: "现代波形查看器，强调响应速度和日常调试体验。",
    },
    tags: ["Waveform", "Rust", "Debug"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "vaporview",
    title: "Vaporview",
    url: "https://github.com/Lramseyer/vaporview",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "VS Code waveform viewer extension for keeping debug context inside the editor.",
      zh: "VS Code 波形查看扩展，适合把调试上下文留在编辑器内。",
    },
    tags: ["Waveform", "VS Code", "Debug"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "jpdb",
    title: "JPDB: GDB for waveforms",
    url: "https://github.com/1024bees/dang",
    category: "verification-tools",
    kind: "tool",
    summary: {
      en: "Debugger-style interface for stepping through waveform state like a software trace.",
      zh: "像调软件 trace 一样逐步查看波形状态的调试器式界面。",
    },
    tags: ["Waveform", "Debug"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "riscv-international",
    title: "RISC-V International",
    url: "https://riscv.org",
    category: "community",
    kind: "community",
    summary: {
      en: "Non-profit steward of the RISC-V ISA and coordinator of technical groups.",
      zh: "RISC-V ISA 的非营利管理组织，也是技术组协作入口。",
    },
    tags: ["RISC-V", "Community", "Standards"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "openhw-foundation",
    title: "OpenHW Foundation",
    url: "https://openhwfoundation.org",
    category: "community",
    kind: "community",
    summary: {
      en: "Industry consortium developing verified open-source RISC-V cores and CORE-V IP.",
      zh: "开发经过验证的开源 RISC-V 核心和 CORE-V IP 的产业联盟。",
    },
    tags: ["OpenHW", "CORE-V", "Community"],
    featured: true,
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "chips-alliance",
    title: "CHIPS Alliance",
    url: "https://chipsalliance.org/",
    category: "community",
    kind: "community",
    summary: {
      en: "Linux Foundation project for open hardware IP, EDA tooling, and collaboration.",
      zh: "Linux Foundation 下的开放硬件 IP、EDA 工具和协作项目。",
    },
    tags: ["CHIPS Alliance", "Open Hardware", "EDA"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "fossi-foundation",
    title: "The FOSSi Foundation",
    url: "https://fossi-foundation.org",
    category: "community",
    kind: "community",
    summary: {
      en: "Free and open-source silicon advocacy group behind LibreCores, Latch-Up, and ORConf.",
      zh: "推动自由与开源硅生态的组织，关联 LibreCores、Latch-Up 和 ORConf。",
    },
    tags: ["FOSSi", "Open Silicon", "Community"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "tiny-tapeout",
    title: "Tiny Tapeout",
    url: "https://tinytapeout.com",
    category: "community",
    kind: "community",
    summary: {
      en: "Educational shuttle program that helps learners submit small open silicon designs.",
      zh: "帮助学习者提交小型开源芯片设计的教学型 shuttle 项目。",
    },
    tags: ["Education", "Tapeout", "Open Silicon"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "chipfoundry",
    title: "ChipFoundry",
    url: "https://chipfoundry.io/",
    category: "community",
    kind: "community",
    summary: {
      en: "Open-silicon shuttle service for shared tape-outs on production PDKs.",
      zh: "面向生产 PDK 的共享 tape-out 开源硅 shuttle 服务。",
    },
    tags: ["Tapeout", "PDK", "Open Silicon"],
    upstreamSource: "riscv-ottawa",
  },
  {
    id: "amd-xilinx",
    title: "AMD / Xilinx",
    url: "https://www.amd.com/en/products/software/adaptive-socs-and-fpgas.html",
    category: "commercial",
    kind: "commercial",
    summary: {
      en: "FPGA and adaptive SoC tooling ecosystem including Vivado and Vitis.",
      zh: "包含 Vivado、Vitis 等工具的 FPGA 和 adaptive SoC 工具生态。",
    },
    tags: ["FPGA", "Commercial EDA"],
  },
  {
    id: "cadence",
    title: "Cadence",
    url: "https://www.cadence.com/",
    category: "commercial",
    kind: "commercial",
    summary: {
      en: "Commercial EDA portfolio for simulation, synthesis, implementation, and emulation.",
      zh: "覆盖仿真、综合、实现和硬件仿真的商业 EDA 工具组合。",
    },
    tags: ["EDA", "Simulation", "Implementation"],
  },
  {
    id: "siemens-eda",
    title: "Siemens EDA",
    url: "https://eda.sw.siemens.com/",
    category: "commercial",
    kind: "commercial",
    summary: {
      en: "Commercial verification, signoff, DFT, and physical verification tooling.",
      zh: "商业验证、signoff、DFT 和物理验证工具体系。",
    },
    tags: ["EDA", "Verification", "DFT"],
  },
  {
    id: "synopsys",
    title: "Synopsys",
    url: "https://www.synopsys.com/",
    category: "commercial",
    kind: "commercial",
    summary: {
      en: "Commercial design, verification, IP, and signoff ecosystem for production chips.",
      zh: "面向量产芯片的商业设计、验证、IP 和 signoff 生态。",
    },
    tags: ["EDA", "IP", "Signoff"],
  },
];

export function getResourceCategoryById(id: ResourceCategoryId) {
  return resourceDirectoryCategories.find((category) => category.id === id);
}
