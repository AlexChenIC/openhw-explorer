import Fuse from "fuse.js";
import {
  CoreType,
  Project,
  ProjectCategory,
  ReviewStatus,
  SourceTier,
  UserRole,
  VerificationType,
} from "@/types";
import githubStatsData from "./github-stats.json";
import projectProfileMetaData from "./project-profile-meta.json";

// Type for GitHub stats data
export interface GitHubRepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  openPRsCount?: number;
  contributorsCount: number;
  goodFirstIssueCount: number;
  recentCommits: number;
  pushedAt: string;
  language: string | null;
  archived: boolean;
  topics: string[];
}

const rawData = githubStatsData as unknown as {
  _meta: Record<string, unknown>;
  repos: Record<string, GitHubRepoStats>;
};
const githubStats: Record<string, GitHubRepoStats> = rawData.repos || {};

interface ProjectProfileMeta {
  tagline: string;
  reviewStatus: ReviewStatus;
  sourceTier: SourceTier;
  verifiedAt: string | null;
  sourceUrls: string[];
  sourceCount: number;
  confidence: number;
}

const rawProfileMeta = projectProfileMetaData as unknown as {
  _meta: Record<string, unknown>;
  profiles: Record<string, ProjectProfileMeta>;
};
const projectProfileMeta: Record<string, ProjectProfileMeta> = rawProfileMeta.profiles || {};

export const launchCuratedProjectIds = [
  "cva6",
  "cv32e40p",
  "core-v-verif",
  "cvw",
  "cvfpu",
  "cv32e20-dv",
] as const;

const launchCuratedProjectIdSet = new Set<string>(launchCuratedProjectIds);

/** Get the repo name from a GitHub URL */
function repoNameFromUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/[^/]+\/([^/]+)/);
  return match ? match[1] : null;
}

interface VerifiedClassification {
  category: ProjectCategory[];
  coreType?: CoreType[];
  verificationType?: VerificationType[];
}

const verifiedClassification: Record<string, VerifiedClassification> = {
  cva6: { category: ["core"], coreType: ["linux-application", "high-performance"] },
  cv32e40p: { category: ["core"], coreType: ["embedded-mcu", "low-power"] },
  cvw: { category: ["core", "learning"], coreType: ["linux-application", "embedded-mcu"] },
  cv32e40x: { category: ["core"], coreType: ["embedded-mcu", "high-performance"] },
  cv32e40s: { category: ["core"], coreType: ["embedded-mcu", "safety-critical"] },
  cva5: { category: ["core"], coreType: ["high-performance"] },
  cve2: { category: ["core"], coreType: ["embedded-mcu", "low-power"] },
  cv32e41p: { category: ["core"], coreType: ["embedded-mcu", "safety-critical"] },

  "core-v-verif": {
    category: ["verification"],
    verificationType: ["uvm-testbench", "industrial-grade"],
  },
  "force-riscv": { category: ["verification", "tools"], verificationType: ["force-riscv"] },
  "core-v-mcu-uvm": { category: ["verification"], verificationType: ["uvm-testbench"] },
  "cv-hpdcache-verif": { category: ["verification"], verificationType: ["uvm-testbench"] },
  "cvw-arch-verif": { category: ["verification"], verificationType: ["formal-verification"] },
  "cvfpu-uvm": { category: ["verification"], verificationType: ["uvm-testbench"] },
  "cv32e20-dv": { category: ["verification"], verificationType: ["uvm-testbench"] },
  "cv32e40s-dv": { category: ["verification"], verificationType: ["uvm-testbench"] },

  "core-v-mcu": { category: ["soc", "learning"] },
  "core-v-mcu-devkit": { category: ["soc", "tools"] },
  "cva6-safe": { category: ["soc"] },
  "core-v-polara-apu": { category: ["soc"] },

  cvfpu: { category: ["ip"] },
  "cv-hpdcache": { category: ["ip"] },
  "core-v-xif": { category: ["ip"] },
  "cv-mesh": { category: ["ip"] },

  "corev-gcc": { category: ["tools"] },
  "corev-binutils-gdb": { category: ["tools"] },
  "corev-llvm": { category: ["tools"] },
  "core-v-sdk": { category: ["tools", "sdk"] },
  "core-v-freertos": { category: ["tools", "sdk"] },
  "core-v-freertos-kernel": { category: ["tools", "sdk"] },
};

const repoTagHints: Record<string, string[]> = {
  cva6: ["RV64", "Linux", "Application Core"],
  cv32e40p: ["RV32", "Embedded MCU", "PULP"],
  cvw: ["Education", "Textbook", "Configurable"],
  cv32e40x: ["Compute Extensions", "DSP", "SIMD"],
  cv32e40s: ["Security", "PMP", "IoT"],
  cva5: ["FPGA", "Application Core"],
  cve2: ["Ultra-Compact", "Low Power"],
  cv32e41p: ["Archived", "Prototype"],
  "core-v-verif": ["UVM", "Coverage", "Regression"],
  "force-riscv": ["Constrained Random", "Test Generation"],
  "core-v-mcu-uvm": ["SoC Verification", "UVM"],
  "cv-hpdcache-verif": ["Cache Verification", "UVM"],
  "cvw-arch-verif": ["ISA Compliance", "Architectural Verification"],
  "cvfpu-uvm": ["IEEE 754", "FPU Verification"],
  "cv32e20-dv": ["Directed Tests", "Core DV"],
  "cv32e40s-dv": ["Security DV", "Core DV"],
  "core-v-mcu": ["Reference SoC", "Peripheral Integration"],
  "core-v-mcu-devkit": ["DevKit", "Board Support"],
  "cva6-safe": ["Lockstep", "Safety"],
  "core-v-polara-apu": ["OpenPiton", "Multi-Core"],
  cvfpu: ["Floating Point", "Transprecision"],
  "cv-hpdcache": ["L1 D-Cache", "Non-Blocking"],
  "core-v-xif": ["Extension Interface", "Coprocessor"],
  "cv-mesh": ["NoC", "Interconnect"],
  "corev-gcc": ["Compiler", "Toolchain"],
  "corev-binutils-gdb": ["Debugger", "Assembler"],
  "corev-llvm": ["LLVM", "Clang"],
  "core-v-sdk": ["SDK", "Integrated Tooling"],
  "core-v-freertos": ["RTOS", "BSP"],
  "core-v-freertos-kernel": ["RTOS Kernel", "Scheduler"],
};

const categoryTagLabel: Record<ProjectCategory, string> = {
  core: "Core",
  verification: "Verification",
  tools: "Tools",
  docs: "Documentation",
  learning: "Learning",
  sdk: "SDK",
  soc: "SoC",
  ip: "IP",
};

const coreTypeTagLabel: Record<CoreType, string> = {
  "embedded-mcu": "Embedded MCU",
  "linux-application": "Linux Application",
  "high-performance": "High Performance",
  "low-power": "Low Power",
  "safety-critical": "Safety Critical",
};

const verificationTypeTagLabel: Record<VerificationType, string> = {
  "uvm-testbench": "UVM Testbench",
  "formal-verification": "Formal Verification",
  "force-riscv": "FORCE-RISCV",
  "industrial-grade": "Industrial Grade",
};

function normalizeTopic(topic: string): string {
  const normalized = topic.trim().toLowerCase();
  const alias: Record<string, string> = {
    "risc-v": "RISC-V",
    riscv: "RISC-V",
    riscv32imfc: "RV32IMFC",
    rv64gc: "RV64GC",
    systemverilog: "SystemVerilog",
    "systemverilog-hdl": "SystemVerilog",
    uvm: "UVM",
    cpu: "CPU",
    asic: "ASIC",
    fpga: "FPGA",
  };

  if (alias[normalized]) return alias[normalized];

  return normalized
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pushUnique(tags: string[], value: string) {
  const normalized = value.trim();
  if (!normalized) return;
  if (!tags.includes(normalized)) {
    tags.push(normalized);
  }
}

function buildVerifiedTags(project: Project, stats?: GitHubRepoStats): string[] {
  const tags: string[] = [];

  pushUnique(tags, "OpenHW");
  pushUnique(tags, "RISC-V");

  for (const category of project.category) {
    pushUnique(tags, categoryTagLabel[category]);
  }

  for (const coreType of project.coreType || []) {
    pushUnique(tags, coreTypeTagLabel[coreType]);
  }

  for (const verificationType of project.verificationType || []) {
    pushUnique(tags, verificationTypeTagLabel[verificationType]);
  }

  if (project.language) {
    pushUnique(tags, project.language);
  }

  for (const topic of stats?.topics || []) {
    pushUnique(tags, normalizeTopic(topic));
  }

  for (const hint of repoTagHints[project.id] || []) {
    pushUnique(tags, hint);
  }

  for (const existing of project.tags || []) {
    pushUnique(tags, existing);
  }

  return tags.slice(0, 10);
}

function buildBaselineSummary(project: Project): string {
  const categories = project.category.map((category) => categoryTagLabel[category]).join(", ");
  return `${project.name} is listed as an OpenHW repository in the ${categories} domain. This baseline profile keeps only high-level, source-linked facts while deeper technical details continue manual verification.`;
}

export const projects: Project[] = [
  // PROCESSOR CORES (8)
  {
    id: "cva6",
    name: "CVA6",
    description:
      "CVA6 is a 6-stage RISC-V processor core implementing I, M, A, and C extensions with support for machine, supervisor, and user privilege levels. It provides configurable TLBs, a hardware page table walker, and branch prediction (BTB and BHT), enabling full Unix-like OS support including Linux boot. The repository supports both RV32 and RV64 configurations and covers FPGA emulation, ASIC implementation, and simulation flows.",
    category: ["core"],
    coreType: ["linux-application", "high-performance"],
    tags: ["RISC-V", "SystemVerilog", "RV64", "Linux", "Application-Class"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/cva6",
    docs: "https://docs.openhwgroup.org/projects/cva6-user-manual/",
    stars: 2794,
    forks: 880,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: [
      "core-v-verif",
      "cvfpu",
      "cv-hpdcache",
      "core-v-xif",
      "cv-mesh",
      "cva6-safe",
      "core-v-polara-apu",
    ],
  },
  {
    id: "cv32e40p",
    name: "CV32E40P",
    description:
      "CV32E40P is a 32-bit, 4-stage in-order RISC-V core implementing RV32IM[F|Zfinx]C with PULP custom extensions for higher code density, performance, and energy efficiency. Originally derived from the RI5CY core in the PULP platform and contributed to OpenHW Group in 2020, it targets IoT and embedded MCU designs where power and area are constrained.",
    category: ["core"],
    coreType: ["embedded-mcu", "low-power"],
    tags: ["RISC-V", "SystemVerilog", "RV32IMFCXpulp", "Embedded", "PULP"],
    status: "stable",
    featured: true,
    github: "https://github.com/openhwgroup/cv32e40p",
    docs: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/",
    stars: 1180,
    forks: 496,
    language: "SystemVerilog",
    suitableFor: ["engineer", "student", "researcher"],
    relatedProjects: ["cv32e40x", "cv32e40s", "core-v-mcu", "core-v-verif"],
  },
  {
    id: "cvw",
    name: "CVW (Wally)",
    description:
      "CVW (Wally) is a 5-stage pipelined RISC-V processor configurable to support all standard RISC-V options — from a minimal RV32E core to a fully featured RV64GC application processor — including A, B, C, D, F, M, Q, and Zk* extensions, virtual memory, PMP, and privileged modes. Developed as the reference implementation for a computer architecture textbook at Harvey Mudd College, it passes RISC-V Arch Tests and boots Linux on FPGA.",
    category: ["core", "learning"],
    coreType: ["linux-application", "embedded-mcu"],
    tags: ["RISC-V", "SystemVerilog", "Education", "Textbook", "Configurable"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/cvw",
    stars: 483,
    forks: 387,
    language: "SystemVerilog",
    suitableFor: ["student", "researcher", "engineer"],
    relatedProjects: ["cvw-arch-verif", "cva6"],
  },
  {
    id: "cv32e40x",
    name: "CV32E40X",
    description:
      "CV32E40X is a 32-bit, 4-stage in-order RISC-V core forked from CV32E40P, designed for compute-intensive applications with support for the CORE-V eXtension Interface (XIF) for custom instruction and coprocessor integration. It implements RV32[I|E] with optional M/Zmmul, A, compressed, and bit manipulation extensions.",
    category: ["core"],
    coreType: ["embedded-mcu", "high-performance"],
    tags: ["RISC-V", "SystemVerilog", "Custom Extensions", "DSP", "SIMD"],
    status: "active",
    github: "https://github.com/openhwgroup/cv32e40x",
    stars: 258,
    forks: 55,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cv32e40p", "cv32e40s", "core-v-verif"],
  },
  {
    id: "cv32e40s",
    name: "CV32E40S",
    description:
      "CV32E40S is a 32-bit, 4-stage in-order RISC-V core forked from CV32E40P, focused on security-oriented embedded deployments with enhanced Physical Memory Protection (PMP), anti-tampering features, and compressed and bitwise extensions (Zca_Zcb_Zcmp_Zcmt, Zba_Zbb_Zbs). It supports machine and user privilege modes and targets MCU-class systems requiring protection-focused behavior.",
    category: ["core"],
    coreType: ["embedded-mcu", "safety-critical"],
    tags: ["RISC-V", "SystemVerilog", "Security", "IoT", "PMP"],
    status: "active",
    github: "https://github.com/openhwgroup/cv32e40s",
    stars: 154,
    forks: 29,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cv32e40p", "cv32e40x", "cva6-safe"],
  },
  {
    id: "cva5",
    name: "CVA5",
    description:
      "CVA5 is a 32-bit RISC-V processor (RV32IMAFD) designed specifically for FPGA deployment, featuring a pipeline built around parallel, variable-latency execution units and a highly configurable, extensible architecture. It can be packaged as an IP block and supports Vivado-based prototyping flows.",
    category: ["core"],
    coreType: ["high-performance"],
    tags: ["RISC-V", "SystemVerilog", "FPGA", "Application-Class", "Pipeline"],
    status: "active",
    github: "https://github.com/openhwgroup/cva5",
    stars: 127,
    forks: 29,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cva6", "cvw"],
  },
  {
    id: "cve2",
    name: "CVE2 (CV32E20)",
    description:
      "CV32E20 is a production-quality, heavily parametrizable 32-bit RISC-V core written in SystemVerilog, implementing a 2-stage in-order pipeline with integer (I/E), multiplication (M), and compressed (C) extension support. Originating from the Zero-riscy core (PULP platform, now maintained by lowRISC as Ibex), it targets embedded control applications requiring low area and energy consumption.",
    category: ["core"],
    coreType: ["embedded-mcu", "low-power"],
    tags: ["RISC-V", "SystemVerilog", "RV32", "Microcontroller", "Low-Area"],
    status: "stable",
    github: "https://github.com/openhwgroup/cve2",
    stars: 56,
    forks: 33,
    language: "SystemVerilog",
    suitableFor: ["engineer", "student"],
    relatedProjects: ["cv32e40p", "core-v-mcu"],
  },
  {
    id: "cv32e41p",
    name: "CV32E41P",
    description:
      "CV32E41P is an archived 32-bit, 4-stage in-order RISC-V core forked from CV32E40P to evaluate official RISC-V extension implementations including Zfinx, Zce, and Xpulp custom extensions for higher code density, performance, and energy efficiency. Its architectural directions were later consolidated into the maintained successors CV32E40S and CV32E40X.",
    category: ["core"],
    coreType: ["embedded-mcu", "safety-critical"],
    tags: ["RISC-V", "SystemVerilog", "Zfinx", "Zce", "Prototype"],
    status: "archived",
    github: "https://github.com/openhwgroup/cv32e41p",
    stars: 26,
    forks: 11,
    language: "SystemVerilog",
    suitableFor: ["researcher"],
    relatedProjects: ["cv32e40p", "cv32e40s"],
  },

  // VERIFICATION (8)
  {
    id: "core-v-verif",
    name: "CORE-V Verification",
    description:
      "CORE-V Verification is the shared functional verification project for the CORE-V family of RISC-V cores, providing a unified UVM-based environment covering CV32E40P, CV32E40X, CV32E40S, and CVA6. It provides reusable verification infrastructure, DV plans, coverage reports, and regression flows using Bender for hardware IP dependency management.",
    category: ["verification"],
    verificationType: ["uvm-testbench", "industrial-grade"],
    tags: ["UVM", "SystemVerilog", "Verification", "Testbench", "Coverage"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/core-v-verif",
    stars: 653,
    forks: 293,
    language: "Assembly",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cv32e40p", "cv32e40x", "cv32e40s", "cva6"],
  },
  {
    id: "force-riscv",
    name: "FORCE-RISCV",
    description:
      "FORCE-RISCV is an instruction sequence generator (ISG) for RISC-V processor design verification, supporting RV64G, RV32G, and Vector Extension 1.0 across U, S, and M privilege modes with comprehensive virtual memory coverage (Sv48/39/32). It generates constrained-random and directed test programs as ELF binaries via a C++ core with Python API control, with multiprocess/multithread capabilities and a built-in RISC-V instruction simulator (Handcar, based on Spike).",
    category: ["verification", "tools"],
    verificationType: ["force-riscv"],
    tags: ["RISC-V", "Python", "C++", "Test Generation", "Constrained Random"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/force-riscv",
    stars: 305,
    forks: 75,
    language: "C++",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["core-v-verif"],
  },
  {
    id: "core-v-mcu-uvm",
    name: "CORE-V MCU UVM",
    description:
      "CORE-V MCU UVM is an advanced UVM verification environment targeting Technology Readiness Level 5 (TRL-5) for the CORE-V MCU, providing hierarchical test environments at both chip and subsystem levels with automated regression suites. It supports Metrics DSim Cloud (v20230116.4.0) and Xilinx Vivado (v2022.2), built on Moore.io library infrastructure with contributions from Datum and Low Power Futures.",
    category: ["verification"],
    verificationType: ["uvm-testbench"],
    tags: ["UVM", "SystemVerilog", "SoC Verification", "MCU"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-mcu-uvm",
    stars: 26,
    forks: 8,
    language: "SystemVerilog",
    suitableFor: ["engineer"],
    relatedProjects: ["core-v-mcu", "core-v-verif"],
  },
  {
    id: "cv-hpdcache-verif",
    name: "CV-HPDCache Verification",
    description:
      "CV-HPDCache Verification is a UVM-based validation environment for the HPDCache high-performance data cache and its associated hardware prefetcher, covering four parameter configurations spanning HPC and embedded use cases (CONFIG1_HPC, CONFIG2_HPC, CONFIG3_EMBEDDED, CONFIG4_EMBEDDED). It uses pseudo-random sequence generation, directed testing, and memory shadow models for scoreboarding and LRU algorithm validation.",
    category: ["verification"],
    verificationType: ["uvm-testbench"],
    tags: ["Verification", "SystemVerilog", "Cache", "HPDCache"],
    status: "active",
    github: "https://github.com/openhwgroup/cv-hpdcache-verif",
    stars: 20,
    forks: 8,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cv-hpdcache", "cva6"],
  },
  {
    id: "cvw-arch-verif",
    name: "CVW Architectural Verification",
    description:
      "CVW Architectural Verification is a deprecated repository that provided CORE-V Wally architectural verification, covering unprivileged extensions (I, M, F, D, Zfh, Zba, Zbb, Zbs, Zca, Zcb, Zknd, Zkne, Zknh) and privileged features including SV32/39/48 memory models and exception/interrupt handling via RVVI functional coverage. Development has migrated to the RISC-V Architecture Test framework.",
    category: ["verification"],
    verificationType: ["formal-verification"],
    tags: ["Verification", "SystemVerilog", "ISA Compliance", "Wally"],
    status: "active",
    github: "https://github.com/openhwgroup/cvw-arch-verif",
    stars: 17,
    forks: 39,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cvw"],
  },
  {
    id: "cvfpu-uvm",
    name: "CVFPU UVM Verification",
    description:
      "CVFPU UVM Verification provides a UVM framework for verifying the CVFPU floating-point unit as integrated in CVA6, with a C++ reference model exposed via SystemVerilog DPI. It validates FP32 and FP64 formats, integer-to-float and float-to-integer conversions (INT32/INT64), and supports QuestaSim, Xcelium, and VCS simulators with Python-based compilation and regression infrastructure.",
    category: ["verification"],
    verificationType: ["uvm-testbench"],
    tags: ["UVM", "Verification", "FPU", "IEEE 754", "Floating Point"],
    status: "active",
    github: "https://github.com/openhwgroup/cvfpu-uvm",
    stars: 9,
    forks: 5,
    language: "Perl",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cvfpu", "cva6"],
  },
  {
    id: "cv32e20-dv",
    name: "CV32E20 Design Verification",
    description:
      "CV32E20-DV is the dedicated verification environment for the CV32E20 (CVE2) processor core, providing UVM-based testbenches, a board support package (BSP), OBI agent, and C and assembly test programs. Non-core-specific components such as the OBI Agent are maintained separately in vendor libraries, and the environment integrates with OpenHW Group's shared verification infrastructure.",
    category: ["verification"],
    verificationType: ["uvm-testbench"],
    tags: ["Verification", "Assembly", "CVE2", "DV"],
    status: "active",
    github: "https://github.com/openhwgroup/cv32e20-dv",
    stars: 3,
    forks: 11,
    language: "Assembly",
    suitableFor: ["engineer"],
    relatedProjects: ["cve2", "core-v-verif"],
  },
  {
    id: "cv32e40s-dv",
    name: "CV32E40S Design Verification",
    description:
      "CV32E40S-DV is the design verification environment for the CV32E40S security-oriented core, providing both simulation-based UVM testbenches and formal verification capabilities. It includes a board support package (BSP) for test program compilation and a modular architecture with UVM environment classes, testbench modules, and comprehensive per-component documentation.",
    category: ["verification"],
    verificationType: ["uvm-testbench"],
    tags: ["Verification", "Assembly", "Security", "DV"],
    status: "active",
    github: "https://github.com/openhwgroup/cv32e40s-dv",
    stars: 0,
    forks: 1,
    language: "Assembly",
    suitableFor: ["engineer"],
    relatedProjects: ["cv32e40s", "core-v-verif"],
  },

  // SoC & SUBSYSTEM (4)
  {
    id: "core-v-mcu",
    name: "CORE-V MCU",
    description:
      "CORE-V MCU is a standalone RISC-V SoC platform originated from PULPissimo, integrating a CV32E40P-based compute subsystem with an IEEE 1149.1 compliant JTAG interface and RISC-V Debug Transport Module (v0.13.2). It targets Digilent Nexys A7-100T and Genesys2 FPGA boards with a Make/fuseSoC build system and supports Modelsim/Questasim simulation and Verilator linting.",
    category: ["soc", "learning"],
    coreType: ["embedded-mcu"],
    tags: ["SoC", "FPGA", "Embedded", "CV32E40P", "Reference Design"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/core-v-mcu",
    stars: 196,
    forks: 68,
    language: "SystemVerilog",
    suitableFor: ["student", "engineer"],
    relatedProjects: ["cv32e40p", "core-v-mcu-devkit", "core-v-mcu-uvm"],
  },
  {
    id: "core-v-mcu-devkit",
    name: "CORE-V MCU DevKit",
    description:
      "The CORE-V MCU DevKit is an evaluation platform for the CV32E40P RISC-V core (v1.0.0), combining the processor with a Quicklogic ArcticPro2 Embedded FPGA, 4MB flash, and an onboard Ashling Opella LD JTAG debugger with serial console. It provides mikroBUS connectivity, AWS IoT ExpressLink for cloud integration, and level shifters for 3.3V I/O compatibility, supporting hardware bring-up and embedded software development.",
    category: ["soc", "learning"],
    tags: ["DevKit", "Hardware", "Board", "SDK", "Getting Started"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-mcu-devkit",
    stars: 18,
    forks: 8,
    language: "HTML",
    suitableFor: ["student", "engineer"],
    relatedProjects: ["core-v-mcu", "core-v-sdk"],
  },
  {
    id: "cva6-safe",
    name: "CVA6-Safe",
    description:
      "CVA6-Safe is a dual-core lockstep (DCLS) subsystem built on CVA6, providing fault-tolerant operation through synchronized dual-core execution for safety-critical deployments. It also supports an asymmetric multi-processing (AMP) mode when lockstep is not required, offering flexibility for configurations that trade fault detection for independent core operation.",
    category: ["soc"],
    coreType: ["safety-critical"],
    tags: ["Safety", "Lockstep", "DCLS", "CVA6", "ISO 26262", "Automotive"],
    status: "experimental",
    github: "https://github.com/openhwgroup/cva6-safe",
    stars: 0,
    forks: 1,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cva6", "cv32e40s"],
  },
  {
    id: "core-v-polara-apu",
    name: "CORE-V Polara APU",
    description:
      "CORE-V Polara APU is a manycore RISC-V research platform originating from the Ara vector processor and OpenPiton projects, integrating four RISC-V vector cores connected through an OpenPiton P-Mesh network with configurable vector length up to VLEN=4096. It supports full-precision and low-precision deep neural network inference workloads and is configurable in multi-tile arrangements (2×2, 4×4), requiring RISC-V LLVM with vector extension support.",
    category: ["soc"],
    coreType: ["high-performance"],
    tags: ["APU", "Multi-Core", "OpenPiton", "HPC", "Research"],
    status: "experimental",
    github: "https://github.com/openhwgroup/core-v-polara-apu",
    stars: 17,
    forks: 8,
    language: "Assembly",
    suitableFor: ["researcher"],
    relatedProjects: ["cva6", "cv-mesh"],
  },

  // IP COMPONENTS (4)
  {
    id: "cvfpu",
    name: "CVFPU",
    description:
      "CVFPU (FPnew) is a parametric floating-point unit written in SystemVerilog, supporting standard RISC-V formats and transprecision formats in compliance with IEEE 754-2008. It provides configurable exponent and mantissa bit widths, simultaneous support for multiple formats (half, single, double, and quad precision), fused multiply-add, division, and square root operations, with optional packed-SIMD variants for parallel processing.",
    category: ["ip"],
    tags: ["FPU", "Floating Point", "IEEE 754", "SystemVerilog", "Parametric"],
    status: "active",
    featured: true,
    github: "https://github.com/openhwgroup/cvfpu",
    stars: 568,
    forks: 148,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cva6", "cvfpu-uvm"],
  },
  {
    id: "cv-hpdcache",
    name: "CV-HPDCache",
    description:
      "CV-HPDCache is an open-source, high-performance L1 data cache designed for RISC-V processors and accelerators, providing a multi-requester, out-of-order architecture that supports multiple concurrent requests. The repository includes Yosys-based synthesis flows, linting, formal verification specifications, and dedicated testbenches, licensed under Solderpad Hardware License v2.1.",
    category: ["ip"],
    tags: ["Cache", "L1", "High Performance", "SystemVerilog", "Non-Blocking"],
    status: "active",
    github: "https://github.com/openhwgroup/cv-hpdcache",
    stars: 98,
    forks: 40,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cva6", "cv-hpdcache-verif"],
  },
  {
    id: "core-v-xif",
    name: "CV-X-IF (eXtension Interface)",
    description:
      "CV-X-IF (CORE-V eXtension Interface) is a RISC-V extension interface specification providing a generalized framework for implementing custom coprocessors and ISA extensions in existing RISC-V processors. It decouples instruction offloading from result writeback through independent communication channels, enabling processor-independent coprocessor integration without modifying the host core.",
    category: ["ip"],
    tags: ["Extension", "Coprocessor", "Interface", "SystemVerilog", "Accelerator"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-xif",
    stars: 80,
    forks: 30,
    language: "SystemVerilog",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["cv32e40x", "cva6"],
  },
  {
    id: "cv-mesh",
    name: "CV-MESH",
    description:
      "CV-MESH is an open-source Network-on-Chip (NoC) interconnect for multi-core RISC-V system composition in OpenHW, implemented in Verilog. It provides mesh topology routing infrastructure for connecting multiple processor cores, with components covering bridges, L1/L2 cache interfaces, and dynamic NoC nodes.",
    category: ["ip"],
    tags: ["NoC", "Mesh", "Interconnect", "Multi-Core", "Verilog"],
    status: "experimental",
    github: "https://github.com/openhwgroup/cv-mesh",
    stars: 4,
    forks: 0,
    language: "Verilog",
    suitableFor: ["researcher"],
    relatedProjects: ["core-v-polara-apu", "cva6"],
  },

  // SOFTWARE & TOOLS (6)
  {
    id: "corev-gcc",
    name: "CORE-V GCC",
    description:
      "CORE-V GCC is OpenHW Group's fork of the GNU Compiler Collection (GCC), maintained as a staging ground for CORE-V-specific compiler features and extensions before or during upstream contribution. It supports the full CORE-V toolchain development cycle and is tracked against upstream GCC with CORE-V modifications applied.",
    category: ["tools"],
    tags: ["GCC", "Compiler", "Toolchain", "CORE-V Extensions"],
    status: "active",
    github: "https://github.com/openhwgroup/corev-gcc",
    stars: 26,
    forks: 23,
    language: "C++",
    suitableFor: ["engineer"],
    relatedProjects: ["corev-binutils-gdb", "corev-llvm", "core-v-sdk"],
  },
  {
    id: "corev-binutils-gdb",
    name: "CORE-V Binutils & GDB",
    description:
      "CORE-V Binutils & GDB is OpenHW Group's staging fork of GNU Binutils and GDB for CORE-V-specific modifications, maintained with a single active development branch that tracks upstream Binutils while incorporating CORE-V changes. It is not the official Binutils repository but serves as the pre-upstream integration point for assembler, linker, and debugger support for CORE-V architectures.",
    category: ["tools"],
    tags: ["Binutils", "GDB", "Debugger", "Assembler", "Linker"],
    status: "active",
    github: "https://github.com/openhwgroup/corev-binutils-gdb",
    stars: 9,
    forks: 28,
    language: "C",
    suitableFor: ["engineer"],
    relatedProjects: ["corev-gcc", "core-v-sdk"],
  },
  {
    id: "corev-llvm",
    name: "CORE-V LLVM",
    description:
      "CORE-V LLVM is a specialized fork of the LLVM/Clang toolchain for CORE-V architecture development, serving as a staging ground for CORE-V-specific compiler enhancements before upstream contribution. It is not the standard LLVM Foundation distribution; it maintains a development branch tracking upstream LLVM with CORE-V modifications and an occasional stable branch representing thoroughly tested snapshots.",
    category: ["tools"],
    tags: ["LLVM", "Clang", "Compiler", "Toolchain"],
    status: "active",
    github: "https://github.com/openhwgroup/corev-llvm-project",
    stars: 18,
    forks: 17,
    language: "C++",
    suitableFor: ["engineer", "researcher"],
    relatedProjects: ["corev-gcc", "core-v-sdk"],
  },
  {
    id: "core-v-sdk",
    name: "CORE-V SDK",
    description:
      "CORE-V SDK is a development toolkit for getting started with CORE-V architecture projects, providing an integrated environment for compilation, debugging, and code analysis on Windows 10/11 and Linux (Red Hat 7.9/8.4, Ubuntu 18.04/20.04) for x86 systems. It includes CSR register inspection, peripheral register views, and FreeRTOS task monitoring capabilities.",
    category: ["tools", "sdk"],
    tags: ["SDK", "Toolchain", "IDE", "Software", "Development"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-sdk",
    stars: 14,
    forks: 10,
    language: "Java",
    suitableFor: ["engineer", "student"],
    relatedProjects: ["corev-gcc", "corev-binutils-gdb", "core-v-mcu-devkit"],
  },
  {
    id: "core-v-freertos",
    name: "CORE-V FreeRTOS",
    description:
      "CORE-V FreeRTOS provides the FreeRTOS runtime environment and associated drivers for real-time application development on the CORE-V MCU. It supports both RTL simulation for hardware-accurate testing and gvsoc, a software-based virtual platform, enabling development and validation before hardware availability.",
    category: ["tools", "sdk"],
    tags: ["FreeRTOS", "RTOS", "Embedded", "BSP", "Real-Time"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-freertos",
    stars: 4,
    forks: 3,
    language: "C",
    suitableFor: ["engineer", "student"],
    relatedProjects: ["core-v-freertos-kernel", "core-v-mcu", "core-v-sdk"],
  },
  {
    id: "core-v-freertos-kernel",
    name: "CORE-V FreeRTOS Kernel",
    description:
      "CORE-V FreeRTOS Kernel contains the FreeRTOS kernel source files and ports for CORE-V targets, with core functionality shared across all ports in list.c, queue.c, and tasks.c, and a portable directory for microcontroller and compiler-specific implementations. It serves as the foundational kernel layer for the CORE-V FreeRTOS ecosystem, following standard FreeRTOS kernel structure and conventions.",
    category: ["tools", "sdk"],
    tags: ["FreeRTOS", "Kernel", "RTOS", "Scheduler"],
    status: "active",
    github: "https://github.com/openhwgroup/core-v-freertos-kernel",
    stars: 1,
    forks: 0,
    language: "C",
    suitableFor: ["engineer"],
    relatedProjects: ["core-v-freertos", "core-v-mcu"],
  },
];

// Enrich projects with live GitHub stats (auto-fetched data takes priority over hardcoded)
for (const project of projects) {
  project.launchStage = launchCuratedProjectIdSet.has(project.id) ? "curated" : "baseline";

  const verified = verifiedClassification[project.id];

  if (verified) {
    project.category = [...verified.category];

    if (verified.coreType) {
      project.coreType = [...verified.coreType];
    } else {
      delete project.coreType;
    }

    if (verified.verificationType) {
      project.verificationType = [...verified.verificationType];
    } else {
      delete project.verificationType;
    }
  }

  const repoName = repoNameFromUrl(project.github);
  if (repoName && githubStats[repoName]) {
    const stats = githubStats[repoName];
    project.stars = stats.stars;
    project.forks = stats.forks;
    project.language = stats.language || project.language;

    if (stats.archived) {
      project.status = "archived";
    }

    // Auto-tag repos suitable for contributors:
    // active/stable status + has contributors + not archived
    if (
      !stats.archived &&
      (project.status === "active" || project.status === "stable") &&
      stats.contributorsCount >= 2
    ) {
      if (!project.suitableFor) project.suitableFor = [];
      if (!project.suitableFor.includes("contributor")) {
        project.suitableFor.push("contributor");
      }
    }

    project.tags = buildVerifiedTags(project, stats);
  } else {
    project.tags = buildVerifiedTags(project);
  }

  const profileMeta = projectProfileMeta[project.id];
  if (profileMeta) {
    project.descriptionReviewStatus = profileMeta.reviewStatus;
    project.descriptionSourceTier = profileMeta.sourceTier;
    project.descriptionVerifiedAt = profileMeta.verifiedAt || undefined;
    project.descriptionSourceUrls = profileMeta.sourceUrls;
    project.descriptionSourceCount = profileMeta.sourceCount;
    project.descriptionConfidence = profileMeta.confidence;
  }

  if (project.launchStage === "baseline") {
    project.baselineSummary = buildBaselineSummary(project);
    project.description = project.baselineSummary;
  }
}

/** Get GitHub stats for a repo by project ID */
export function getGitHubStats(projectId: string): GitHubRepoStats | null {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;
  const repoName = repoNameFromUrl(project.github);
  if (!repoName) return null;
  return githubStats[repoName] || null;
}

/** Get all GitHub stats metadata */
export function getGitHubStatsMeta() {
  return rawData._meta;
}

// Fuse.js instance for fuzzy search (lazy-initialized)
let fuseInstance: Fuse<Project> | null = null;

function getFuse(): Fuse<Project> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(projects, {
      keys: [
        { name: "name", weight: 2.0 },
        { name: "description", weight: 1.0 },
        { name: "tags", weight: 1.5 },
        { name: "language", weight: 0.5 },
        { name: "category", weight: 0.8 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }
  return fuseInstance;
}

// Helper function to filter projects
export function filterProjects(filters: {
  category?: ProjectCategory | "all";
  coreType?: CoreType;
  verificationType?: VerificationType;
  role?: UserRole;
  search?: string;
}): Project[] {
  // If search is provided, use Fuse.js for fuzzy matching first
  let baseProjects = projects;
  if (filters.search && filters.search.trim()) {
    const fuse = getFuse();
    baseProjects = fuse.search(filters.search.trim()).map((result) => result.item);
  }

  return baseProjects.filter((project) => {
    // Category filter
    if (
      filters.category &&
      filters.category !== "all" &&
      !project.category.includes(filters.category)
    ) {
      return false;
    }

    // Core type filter
    if (filters.coreType && (!project.coreType || !project.coreType.includes(filters.coreType))) {
      return false;
    }

    // Verification type filter
    if (
      filters.verificationType &&
      (!project.verificationType || !project.verificationType.includes(filters.verificationType))
    ) {
      return false;
    }

    // Role filter
    if (
      filters.role &&
      filters.role !== "browsing" &&
      (!project.suitableFor || !project.suitableFor.includes(filters.role))
    ) {
      return false;
    }

    return true;
  });
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

// Get related projects
export function getRelatedProjects(project: Project): Project[] {
  if (!project.relatedProjects) return [];
  return project.relatedProjects
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);
}
