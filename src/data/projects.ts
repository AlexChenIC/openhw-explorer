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

/**
 * OpenHW Projects Database
 *
 * Data sourced from:
 * - OpenHW Group GitHub organization (github.com/openhwgroup)
 * - "OpenHW Group 主要开源仓库清单" (Dec 2025)
 * - GitHub API auto-fetch (see scripts/fetch-github-data.mjs)
 *
 * Last updated: 2026-02-08
 * Total projects: 30
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy the template below
 * 2. Fill in the required fields
 * 3. Add appropriate categories and tags
 *
 * TEMPLATE:
 * {
 *   id: "unique-id",
 *   name: "Project Name",
 *   description: "Brief description of the project",
 *   category: ["core"], // Options: core, verification, tools, docs, learning, sdk, soc, ip
 *   tags: ["RISC-V", "SystemVerilog"],
 *   status: "active", // Options: active, stable, experimental, archived
 *   github: "https://github.com/openhwgroup/...",
 *   stars: 0,
 *   forks: 0,
 *   language: "SystemVerilog",
 *   suitableFor: ["engineer", "student"],
 *   relatedProjects: ["related-project-id"],
 * }
 */

export const projects: Project[] = [
  // PROCESSOR CORES (8)
  {
    id: "cva6",
    name: "CVA6 (Ariane)",
    description:
      "CVA6 (formerly Ariane from ETH Zurich/PULP) is an application-class open-source RISC-V core in OpenHW: 6-stage, single-issue, in-order, with configurations for Linux-capable systems. The repository and user manual document RV32/RV64 configuration options, FPGA/ASIC-oriented flows, and integration references across the CORE-V ecosystem.",
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
      "CV32E40P is an embedded-class RV32 core in OpenHW, derived from RI5CY/PULP, with a 4-stage in-order pipeline. Its user manual, verification collateral in core-v-verif, and reuse in CORE-V MCU-related projects make it a common baseline for MCU and low-power edge designs.",
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
      "CVW (Wally) is a configurable RISC-V platform used for both teaching and engineering workflows, spanning RV32 profiles through Linux-capable RV64 configurations in one codebase. The project documents toolchain setup, regression, lock-step validation, and test planning for reproducible classroom and prototyping use.",
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
      "CV32E40X extends the CV32E40P lineage with compute-extension-oriented capabilities while keeping a 4-stage embedded baseline. It is positioned for custom instruction and coprocessor-style integration through CORE-V XIF without moving to an application-class core.",
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
      "CV32E40S extends CV32E40P with security-oriented capabilities while keeping a compact 4-stage embedded profile. It targets MCU-class systems that require protection-focused behavior, with aligned architecture documentation and dedicated verification flows.",
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
      "CVA5 is an FPGA-first application-class RISC-V core path in OpenHW, derived from the Taiga lineage and aimed at architecture experimentation under FPGA constraints. It emphasizes configurable execution behavior and soft-core flexibility for feature exploration.",
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
      "CVE2 (CV32E20) is a lightweight embedded RISC-V core path in OpenHW, emphasizing low area and implementation simplicity through a two-stage microarchitecture rooted in the zero-riscy/Ibex lineage. It targets power/footprint-sensitive designs and education scenarios that need a compact RTL core.",
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
      "CV32E41P is an archived exploration branch in the CV32E40P family that captured a transitional stage of security and extension experimentation (including Zfinx/Zce-oriented directions). Its current value is historical and architectural: it helps teams understand why capability lines later converged into maintained successors such as CV32E40S and CV32E40X.",
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
      "CORE-V Verification is the family-level verification framework for OpenHW cores, providing UVM methodology, reusable infrastructure, and cross-core regression flows instead of one-off per-core testbenches. It keeps CV32E40P/X/S and CVA6 verification practices aligned while allowing incremental quality updates outside each RTL repository.",
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
      "FORCE-RISCV is OpenHW's instruction sequence generation engine for constrained-random processor verification, combining a C++ generation core with Python template control for reproducible stress scenarios. Instead of fixed test vectors, it scales verification coverage by producing executable ELF/assembly workloads tailored to core features, privilege modes, and memory behaviors.",
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
      "CORE-V MCU UVM is a system-level verification platform for CORE-V MCU, using layered UVM environments, reusable VIP, and regression-oriented flows. It validates integration behavior across SoC subsystems beyond block-level checks.",
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
      "CV-HPDCache Verification is the dedicated UVM validation environment for HPDCache and related prefetch components, designed to keep high-performance cache behavior trustworthy as features evolve. It provides an independent regression path so cache RTL can iterate without weakening system integration confidence.",
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
      "CVW Architectural Verification is the historical architecture-validation track for CORE-V Wally, now explicitly deprecated with migration toward riscv-arch-test maintenance flows. Its current value is as a transition and reference artifact for understanding earlier coverage plans and migration decisions.",
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
      "CVFPU UVM Verification provides IP-level verification infrastructure for CVFPU floating-point behavior, enabling repeatable regression and corner-case validation before integration into larger cores. It is a key quality layer for IEEE-754-sensitive compute paths used by projects such as CVA6 and related OpenHW designs.",
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
      "CV32E20-DV is the dedicated verification track for CVE2, focused on keeping lightweight two-stage core behavior regression-safe as features and tool flows evolve. It provides an isolated quality gate for small-core correctness so implementation and verification can iterate at different speeds without losing confidence.",
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
      "CV32E40S-DV is the security-focused verification environment for CV32E40S, aimed at validating protection-centric behavior through targeted regression assets rather than generic core-only tests.",
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
      "CORE-V MCU is an embedded SoC platform in OpenHW, evolved from PULPissimo and focused on end-to-end bring-up rather than isolated RTL demos. It combines CV32E40P-based compute, peripheral subsystems, verification hooks, documentation, and FPGA-oriented workflows for software/hardware co-development.",
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
      "CORE-V MCU DevKit is the board-level realization of the CORE-V MCU platform, with schematics, hardware files, and interface documentation for reproducible bring-up workflows. It is used to validate full-stack embedded behavior on real hardware.",
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
      "CVA6-SAFE is a safety-oriented subsystem built on CVA6 that introduces dual-core lockstep capability with optional AMP-style operation for different deployment constraints. It is positioned as an integration path to evaluate fault-detection and safety-oriented architecture trade-offs on top of CVA6.",
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
      "CORE-V Polara APU is a system-level research platform that composes CVA6-centered processing with OpenPiton and Ara lineage, targeting vector and manycore experimentation rather than single-IP reuse. It is used to study full-stack integration behavior, complex simulation flows, and multi-core software workloads on open hardware infrastructure.",
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
      "CVFPU (FPnew lineage) is a reusable, parameterized floating-point IP in OpenHW for transprecision-oriented RISC-V systems, with configurable formats and operations. It is documented in peer-reviewed publications and appears in CORE-V integration and dedicated UVM verification flows.",
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
      "CV-HPDCache is a high-performance L1 data-cache controller IP in OpenHW for throughput-oriented RISC-V subsystems, designed for multi-requester and non-blocking memory behavior. The project includes research references, CVA6 integration paths, and a dedicated verification repository.",
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
      "CORE-V XIF is a contract-first extension interface specification that decouples core evolution from custom accelerator integration by standardizing offload and writeback interaction semantics. Instead of tying extensions to one microarchitecture, it gives CORE-V programs a reusable path for coprocessor experimentation and long-term interface governance.",
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
      "CV-MESH is a NoC-oriented interconnect path in OpenHW for multi-core system composition, focused on communication scalability rather than single-core compute features. It is used to study how mesh topology and interconnect behavior evolve as core count and subsystem complexity increase.",
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
      "CORE-V GCC is OpenHW's pre-upstream GCC engineering branch for validating compiler support for CORE-V architectural features before or during upstream convergence. It helps make hardware extensions usable in practical build pipelines.",
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
      "CORE-V Binutils & GDB is the low-level software toolchain foundation that makes CORE-V extensions buildable and debuggable in real workflows, from assembly and linking to on-target debugging. Without this layer, compiler and SDK capabilities cannot close the end-to-end developer loop.",
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
      "CORE-V LLVM is OpenHW's pre-upstream LLVM/Clang development route for enabling CORE-V architectural features in modern compiler flows while maintaining compatibility with ongoing upstream evolution. It complements CORE-V GCC by giving teams a second toolchain path for optimization, analysis, and software-hardware co-design validation.",
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
      "CORE-V SDK is the integration layer that turns scattered compiler, debugger, and platform assets into a coherent developer environment for CORE-V software bring-up. Its main value is operational consistency: one baseline for setup, build, debug, and demo execution across supported targets.",
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
      "CORE-V FreeRTOS provides an RTOS software stack path for CORE-V platforms, combining porting work, BSP integration, and runnable demos so hardware features are exercised in embedded workloads. It connects toolchain readiness with application-level real-time behavior.",
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
      "CORE-V FreeRTOS Kernel is the kernel adaptation layer that anchors task scheduling and interrupt-driven runtime behavior on CORE-V targets. It is the low-level prerequisite for higher-level FreeRTOS ports, demos, and application stacks in the ecosystem.",
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
