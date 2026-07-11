import { ProjectKnowledge } from "@/types";

// OpenHW project knowledge base: academic papers, industry adoption, education, talks, and ecosystem links
//
// New original human-authored or human-edited descriptions, annotations, and
// creative selection added after 2026-07-10 may be rights reserved where
// applicable. Historical Apache-2.0 grants, public facts, and referenced
// third-party works are not affected. See LICENSE-CONTENT.md.

export const knowledgeBase: Record<string, ProjectKnowledge> = {
  // CVA6 (Ariane) - Most cited OpenHW core
  cva6: {
    academicPapers: [
      {
        title:
          "The Cost of Application-Class Processing: Energy and Performance Analysis of a Linux-Ready 1.7-GHz 64-Bit RISC-V Core in 22-nm FDSOI Technology",
        authors: "Florian Zaruba, Luca Benini",
        venue: "IEEE Transactions on VLSI Systems",
        year: 2019,
        doi: "10.1109/TVLSI.2019.2926114",
      },
      {
        title:
          "OpenPiton+Ariane: The First Open-Source, SMP Linux-booting RISC-V System Scaling From One to Many Cores",
        authors: "Jonathan Balkind et al.",
        venue: "Computer Architecture Research with RISC-V Workshop (CARRV)",
        year: 2019,
        url: "https://parallel.princeton.edu/papers/balkind_carrv2019.pdf",
      },
      {
        title:
          "Culsans: An Efficient Snoop-based Coherency Unit for the CVA6 Open Source RISC-V application processor",
        authors: "Riccardo Tedeschi et al.",
        venue: "arXiv preprint",
        year: 2024,
        url: "https://arxiv.org/abs/2407.19895",
      },
      {
        title:
          "CVA6-VMRT: A Modular Approach Towards Time-Predictable Virtual Memory in a 64-bit Application Class RISC-V Processor",
        authors: "Christopher Reinwardt et al.",
        venue: "arXiv preprint",
        year: 2025,
        url: "https://arxiv.org/abs/2504.05718",
      },
      {
        title:
          "Occamy: A 432-Core 28.1 DP-GFLOP/s/W 83% FPU Utilization Dual-Chiplet, Dual-HBM2E RISC-V-Based Accelerator for Stencil and Sparse Linear Algebra Computations with 8-to-64-bit Floating-Point Support in 12nm FinFET",
        authors: "Gianna Paulin, Paul Scheffler, Thomas Benz, et al.",
        venue: "2024 IEEE Symposium on VLSI Technology and Circuits",
        year: 2024,
        doi: "10.1109/VLSITechnologyandCir46783.2024.10631529",
      },
    ],
  },

  // CV32E40P - Most widely adopted embedded core
  cv32e40p: {
    academicPapers: [
      {
        title: "Near-Threshold RISC-V Core With DSP Extensions for Scalable IoT Endpoint Devices",
        authors: "P. Schiavone, D. Rossi, A. Pullini et al.",
        venue: "IEEE Transactions on VLSI Systems",
        year: 2017,
        doi: "10.1109/TVLSI.2017.2654506",
      },
      {
        title:
          "Slow and steady wins the race? A comparison of ultra-low-power RISC-V cores for Internet-of-Things applications",
        authors: "P. D. Schiavone, G. Tagliavini, P. G. Paulin et al.",
        venue: "PATMOS",
        year: 2017,
        doi: "10.1109/PATMOS.2017.8106976",
      },
    ],
  },

  // CVW (Wally) - Education-focused
  cvw: {
    academicPapers: [
      {
        title: "RISC-V System-on-Chip Design",
        authors: "D. Harris, J. Stine, R. Thompson, S. Harris",
        venue: "Morgan Kaufmann (Textbook)",
        year: 2024,
      },
    ],
    educationalUse: [
      {
        university: "Harvey Mudd College",
        course:
          "Wally is the companion core for the RISC-V System-on-Chip Design textbook and its computer architecture coursework; the README documents classroom setup and regression flows for students.",
        url: "https://github.com/openhwgroup/cvw",
      },
    ],
  },

  // CORE-V Verification - Flagship verification
  "core-v-verif": {
    academicPapers: [
      {
        title: "OpenHW Group CORE-V Verification Strategy",
        authors: "OpenHW Group",
        venue: "OpenHW Documentation",
        year: 2024,
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
      },
    ],
  },

  // CVFPU - Widely used floating-point unit
  cvfpu: {
    academicPapers: [
      {
        title:
          "FPnew: An Open-Source Multiformat Floating-Point Unit Architecture for Energy-Proportional Transprecision Computing",
        authors: "Stefan Mach, Fabian Schuiki, Florian Zaruba, Luca Benini",
        venue: "IEEE Transactions on VLSI Systems",
        year: 2021,
        doi: "10.1109/TVLSI.2020.3044752",
      },
      {
        title:
          "FPnew: An Open-Source Multiformat Floating-Point Unit Architecture for Energy-Proportional Transprecision Computing",
        authors: "Stefan Mach, Fabian Schuiki, Florian Zaruba, Luca Benini",
        venue: "arXiv",
        year: 2020,
        url: "https://arxiv.org/abs/2007.01530",
      },
    ],
  },

  // CV-HPDCache - High-performance cache
  "cv-hpdcache": {
    academicPapers: [
      {
        title: "HPDcache: Open-Source High-Performance L1 Data Cache for RISC-V Cores",
        authors: "Cesar Fuguet",
        venue: "ACM Computing Frontiers",
        year: 2023,
        doi: "10.1145/3587135.3591413",
      },
      {
        title: "Breaking the Memory Wall with a Flexible Open-Source L1 Data-Cache",
        authors: "D. Million, N. Oliete-Escuin, C. Fuguet",
        venue: "DATE",
        year: 2024,
        doi: "10.23919/DATE58400.2024.10546547",
      },
    ],
    industryAdoption: [],
    educationalUse: [],
    presentations: [
      {
        title: "One Year of Improvements on OpenHW Group's HPDCache",
        event: "RISC-V Summit US 2023",
        date: "2023-11",
        speaker: "Christian Fabre, Cesar Fuguet",
        videoUrl: "https://www.youtube.com/watch?v=ODHA-wPOmW0",
      },
    ],
    articles: [
      {
        title: "CV-HPDCache Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv-hpdcache",
        language: "en",
      },
      {
        title: "CV-HPDCache Verification Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv-hpdcache-verif",
        language: "en",
      },
      {
        title: "HPDcache CF 2023 Publication",
        platform: "ACM Digital Library",
        url: "https://doi.org/10.1145/3587135.3591413",
        language: "en",
      },
      {
        title: "HPDcache DATE 2024 Publication",
        platform: "IEEE Xplore",
        url: "https://doi.org/10.23919/DATE58400.2024.10546547",
        language: "en",
      },
    ],
    ecosystem: [
      { project: "cva6", relationship: "used-in", description: "L1 data cache for CVA6" },
      {
        project: "cv-hpdcache-verif",
        relationship: "verified-by",
        description: "Dedicated verification environment",
      },
    ],
  },

  // CORE-V MCU - Complete SoC reference
  "core-v-mcu": {
    academicPapers: [
      {
        title: "Quentin: an Ultra-Low-Power PULPissimo SoC in 22nm FDX",
        authors: "P. D. Schiavone, A. Traber, F. Conti et al.",
        venue: "IEEE S3S",
        year: 2018,
        doi: "10.1109/S3S.2018.8640145",
      },
      {
        title: "Arnold: An eFPGA-Augmented RISC-V SoC for Flexible and Low-Power IoT End Nodes",
        authors: "P. D. Schiavone, A. Traber, F. Conti et al.",
        venue: "IEEE Transactions on VLSI Systems",
        year: 2021,
        doi: "10.1109/TVLSI.2021.3058162",
      },
    ],
    industryAdoption: [
      {
        entity: "QuickLogic Corporation",
        useCase: "First CORE-V silicon tapeout, manufactured and available as development kit",
        sourceUrl: "https://www.quicklogic.com/",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V MCU Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu",
        language: "en",
      },
      {
        title: "CORE-V MCU User Manual",
        platform: "Read the Docs",
        url: "https://core-v-mcu.readthedocs.io/en/latest/",
        language: "en",
      },
      {
        title: "CORE-V MCU Quick Start (Nexys A7)",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu/tree/master/emulation/quickstart/README.md",
        language: "en",
      },
      {
        title: "CORE-V MCU DevKit Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit",
        language: "en",
      },
    ],
    ecosystem: [
      { project: "cv32e40p", relationship: "uses", description: "Built around CV32E40P core" },
      {
        project: "core-v-mcu-devkit",
        relationship: "has-devkit",
        description: "Physical development board available",
      },
      {
        project: "core-v-sdk",
        relationship: "supported-by",
        description: "SDK support for development",
      },
      {
        project: "core-v-mcu-uvm",
        relationship: "verified-by",
        description: "System-level UVM testbench validates integration-level behavior.",
      },
      {
        project: "core-v-freertos",
        relationship: "runs",
        description: "RTOS demos and BSPs target CORE-V MCU platform configurations.",
      },
      {
        project: "core-v-freertos-kernel",
        relationship: "runs-kernel",
        description: "Adapted FreeRTOS kernel provides the scheduling/runtime foundation.",
      },
    ],
  },

  // FORCE-RISCV - Test generation tool
  "force-riscv": {
    industryAdoption: [
      {
        entity: "Futurewei Technologies",
        useCase:
          "Originally developed and contributed as an open instruction-sequence generator for constrained-random RISC-V verification workloads.",
        sourceUrl: "https://github.com/openhwgroup/force-riscv",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "FORCE-RISCV Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/force-riscv",
        language: "en",
      },
      {
        title: "FORCE-RISCV Quick Start and Smoke Test",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/force-riscv",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-verif",
        relationship: "complements",
        description: "Complements UVM-based verification with random instruction generation",
      },
      {
        project: "cv32e40p",
        relationship: "targets",
        description:
          "Repository guidance references CV32E40P-oriented target usage in verification flows.",
      },
      {
        project: "riscvOVPsim",
        relationship: "pairs-with",
        description: "README workflow references coverage reporting integration with riscvOVPsim.",
      },
    ],
  },

  // CV32E40X - Compute-oriented with extensions
  cv32e40x: {
    presentations: [],
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Primary contributor; developed CV32E40X as a compute-optimized CV32E40P variant with extension-friendly integration model.",
        sourceUrl: "https://github.com/openhwgroup/cv32e40x",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CV32E40X Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e40x",
        language: "en",
      },
      {
        title: "CV32E40X User Manual",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/",
        language: "en",
      },
      {
        title: "CORE-V XIF Documentation",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e40p",
        relationship: "derived-from",
        description: "Evolved from CV32E40P with added custom extensions",
      },
      {
        project: "core-v-xif",
        relationship: "implements",
        description: "Implements CV-X-IF for custom coprocessor attachment",
      },
      {
        project: "cv32e40s",
        relationship: "parallel-branch",
        description:
          "Shares CV32E40P baseline while targeting compute-oriented rather than security-oriented goals.",
      },
      { project: "core-v-verif", relationship: "verified-by", description: "UVM verification" },
    ],
  },

  // CV32E40S - Security-enhanced core
  cv32e40s: {
    presentations: [],
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Led security-focused development in OpenHW with emphasis on embedded protection mechanisms and hardened design behavior.",
        sourceUrl: "https://github.com/openhwgroup/cv32e40s",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CV32E40S Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e40s",
        language: "en",
      },
      {
        title: "CV32E40S User Manual",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/",
        language: "en",
      },
      {
        title: "CORE-V Verification Strategy",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e40p",
        relationship: "derived-from",
        description: "Security-enhanced variant of CV32E40P",
      },
      {
        project: "cv32e40s-dv",
        relationship: "verified-by",
        description: "Dedicated security DV environment",
      },
      {
        project: "cva6-safe",
        relationship: "security-lineage",
        description: "Represents broader OpenHW security-focused processor evolution path.",
      },
      { project: "core-v-verif", relationship: "verified-by", description: "UVM verification" },
    ],
  },

  // CV32E41P - Archived prototype
  cv32e41p: {
    industryAdoption: [],
    educationalUse: [],
    articles: [
      {
        title: "CV32E41P Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e41p",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e40p",
        relationship: "derived-from",
        description: "Prototype based on CV32E40P with Zfinx/Zce extensions",
      },
      {
        project: "cv32e40s",
        relationship: "succeeded-by",
        description: "Security features continued in CV32E40S",
      },
      {
        project: "core-v-verif",
        relationship: "methodology-reference",
        description:
          "Archived branch analysis can still reference family-level verification methodology for comparison.",
      },
    ],
    contributionNotes:
      "This project is archived. Security and extension work has been continued in CV32E40S and CV32E40X.",
  },

  // CVA5 - FPGA-optimized application core
  cva5: {
    academicPapers: [
      {
        title:
          "Designing an IEEE-Compliant FPU that Supports Configurable Precision for Soft Processors",
        authors: "Chris Keilbart et al.",
        venue: "ACM Transactions on Reconfigurable Technology and Systems",
        year: 2024,
        doi: "10.1145/3650036",
      },
      {
        title: "Rethinking Integer Divider Design for FPGA-Based Soft-Processors",
        authors: "Eric Matthews et al.",
        venue: "IEEE FCCM",
        year: 2019,
        doi: "10.1109/FCCM.2019.00046",
      },
    ],
    industryAdoption: [
      {
        entity: "Simon Fraser University (Taiga project)",
        useCase:
          "CVA5 inherits Taiga soft-processor design lineage and associated FPGA research practices.",
        sourceUrl: "https://gitlab.com/sfu-rcl/taiga-project",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CVA5 Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cva5",
        language: "en",
      },
      {
        title: "Taiga Project",
        platform: "GitLab",
        url: "https://gitlab.com/sfu-rcl/taiga-project",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cva6",
        relationship: "complements",
        description: "Alternative application-class core optimized for FPGA rather than ASIC",
      },
      {
        project: "Taiga Project",
        relationship: "derived-from",
        description: "Repository README states CVA5 lineage from the Taiga soft-processor project.",
      },
    ],
  },

  // CVE2 (CV32E20) - Minimal embedded core
  cve2: {
    industryAdoption: [
      {
        entity: "lowRISC / ETH Zurich",
        useCase:
          "Derived from Ibex (zero-riscy); inherits lowRISC's industrial verification methodology and ETH Zurich PULP heritage",
        sourceUrl: "https://github.com/lowRISC/ibex",
      },
    ],
    educationalUse: [
      {
        university: "ETH Zurich",
        course: "PULP Platform: zero-riscy heritage used in educational SoC projects",
        url: "https://pulp-platform.org/",
      },
    ],
    articles: [
      {
        title: "CVE2 Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cve2",
        language: "en",
      },
      {
        title: "Ibex Repository (Lineage Context)",
        platform: "lowRISC GitHub",
        url: "https://github.com/lowRISC/ibex",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e20-dv",
        relationship: "verified-by",
        description: "Dedicated design verification environment",
      },
      {
        project: "core-v-mcu",
        relationship: "candidate-for",
        description: "Candidate for ultra-low-power MCU designs",
      },
    ],
  },

  // CVA6-Safe - Safety-critical dual-core lockstep
  "cva6-safe": {
    industryAdoption: [],
    educationalUse: [],
    articles: [
      {
        title: "CVA6-SAFE Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cva6-safe",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cva6",
        relationship: "based-on",
        description: "Dual-core lockstep configuration of CVA6",
      },
      {
        project: "cv32e40s",
        relationship: "complements",
        description: "Complementary safety approach: lockstep vs. security extensions",
      },
    ],
  },

  // CORE-V MCU UVM - SoC-level verification
  "core-v-mcu-uvm": {
    industryAdoption: [
      {
        entity: "Datum Technology Corporation",
        useCase: "Contributed UVM agent architecture and SoC-level testbench methodology",
        sourceUrl: "https://github.com/openhwgroup/core-v-mcu-uvm",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CORE-V MCU UVM Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-uvm",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-mcu",
        relationship: "verifies",
        description: "System-level UVM verification for CORE-V MCU SoC",
      },
      {
        project: "core-v-verif",
        relationship: "extends",
        description: "Shares verification methodology with core-level verification",
      },
      {
        project: "Moore.io toolchain",
        relationship: "runs-on",
        description:
          "Regression and simulation flows are documented around mio-based execution tooling.",
      },
    ],
  },

  // CV-HPDCache Verification
  "cv-hpdcache-verif": {
    industryAdoption: [
      {
        entity: "CEA (Commissariat à l'énergie atomique)",
        useCase:
          "Primary developer of both HPDCache and its verification environment; part of European research infrastructure",
        sourceUrl: "https://github.com/openhwgroup/cv-hpdcache-verif",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CV-HPDCache Verification Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv-hpdcache-verif",
        language: "en",
      },
      {
        title: "CV-HPDCache Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv-hpdcache",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv-hpdcache",
        relationship: "verifies",
        description: "Verification environment for the HPDCache L1 data cache",
      },
      {
        project: "cva6",
        relationship: "supports",
        description: "Ensures cache correctness for CVA6 integration",
      },
      {
        project: "core-v-verif",
        relationship: "methodology-aligned",
        description: "Reuses family-level UVM verification patterns where applicable.",
      },
    ],
    contributionNotes:
      "Repository README indicates active evolution and potential stability churn; validate current regression recipe before depending on default configs.",
  },

  // CVW Architectural Verification
  "cvw-arch-verif": {
    industryAdoption: [],
    educationalUse: [],
    articles: [
      {
        title: "CVW-ARCH-VERIF Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvw-arch-verif",
        language: "en",
      },
      {
        title: "RISC-V Architectural Tests",
        platform: "riscv-non-isa GitHub",
        url: "https://github.com/riscv-non-isa/riscv-arch-test",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cvw",
        relationship: "verifies",
        description: "Tests ISA compliance and architectural correctness of Wally",
      },
      {
        project: "riscv-non-isa/riscv-arch-test",
        relationship: "migrated-to",
        description: "README states maintenance path moved to riscv-arch-test.",
      },
    ],
    contributionNotes:
      "Repository is kept mainly as historical reference; new verification contributions should follow the migration target documented in README.",
  },

  // CVFPU UVM Verification
  "cvfpu-uvm": {
    industryAdoption: [],
    educationalUse: [],
    articles: [
      {
        title: "CVFPU UVM Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvfpu-uvm",
        language: "en",
      },
      {
        title: "CVFPU Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvfpu",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cvfpu",
        relationship: "verifies",
        description: "UVM verification for IEEE 754 compliance across FP32/FP64/FP16",
      },
      {
        project: "cva6",
        relationship: "supports",
        description: "Ensures FPU correctness for CVA6 pipeline integration",
      },
      {
        project: "core-v-verif",
        relationship: "complements",
        description:
          "Acts as focused IP-level verification complement to broader family-level verification assets.",
      },
    ],
  },

  // CV32E20 DV - Small core verification
  "cv32e20-dv": {},

  // CV32E40S DV - Security core verification
  "cv32e40s-dv": {
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Primary contributor; security-specific test scenarios for PMP, anti-tampering, and Zc extensions",
        sourceUrl: "https://github.com/openhwgroup/cv32e40s-dv",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CV32E40S-DV Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e40s-dv",
        language: "en",
      },
      {
        title: "CV32E40S User Manual",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e40s",
        relationship: "verifies",
        description: "Security-focused DV environment for CV32E40S",
      },
      {
        project: "core-v-verif",
        relationship: "extends",
        description: "Shares UVM-based verification framework",
      },
    ],
  },

  // CV-X-IF - eXtension Interface
  "core-v-xif": {
    industryAdoption: [],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CV-X-IF Specification Document",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/",
        language: "en",
      },
      {
        title: "CORE-V-XIF Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-xif",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cv32e40x",
        relationship: "implemented-by",
        description: "CV32E40X implements X-IF for custom extension support",
      },
      {
        project: "cva6",
        relationship: "implemented-by",
        description: "CVA6 supports X-IF for coprocessor attachment",
      },
      {
        project: "core-v-verif",
        relationship: "interacts-with",
        description:
          "Extension-enabled cores still depend on family verification infrastructure for integration confidence.",
      },
    ],
  },

  // CV-MESH - Mesh interconnect NoC
  "cv-mesh": {
    academicPapers: [
      {
        title: "OpenPiton: An Open Source Manycore Research Framework",
        authors: "J. Balkind et al.",
        venue:
          "ASPLOS (ACM International Conference on Architectural Support for Programming Languages and Operating Systems)",
        year: 2016,
        url: "https://dl.acm.org/doi/10.1145/2954679.2872414",
      },
    ],
    industryAdoption: [
      {
        entity: "Princeton University",
        useCase:
          "CV-MESH has roots in the OpenPiton manycore platform developed at Princeton for scalable chip-level communication",
        sourceUrl: "https://parallel.princeton.edu/openpiton/",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CV-MESH Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv-mesh",
        language: "en",
      },
      {
        title: "OpenPiton Platform",
        platform: "Princeton Parallel Research Group",
        url: "https://parallel.princeton.edu/openpiton/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-polara-apu",
        relationship: "used-in",
        description: "Provides interconnect fabric for the Polara APU multi-core system",
      },
      {
        project: "cva6",
        relationship: "connects",
        description: "Connects multiple CVA6 cores in Polara configurations",
      },
    ],
  },

  // CORE-V MCU DevKit - Physical development board
  "core-v-mcu-devkit": {
    industryAdoption: [
      {
        entity: "QuickLogic Corporation",
        useCase:
          "Manufactured the CORE-V MCU ASIC on GlobalFoundries 22nm FDX; DevKit features QuickLogic Arnold chip",
        sourceUrl: "https://www.quicklogic.com/",
      },
      {
        entity: "GroupGets",
        useCase: "Distribution partner for CORE-V MCU DevKit; handled community orders",
        sourceUrl: "https://github.com/openhwgroup/core-v-mcu-devkit",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V MCU DevKit Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit",
        language: "en",
      },
      {
        title: "CORE-V MCU DevKit README",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit/blob/main/README.md",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-mcu",
        relationship: "instantiates",
        description: "Physical board instantiation of the CORE-V MCU SoC",
      },
      {
        project: "cv32e40p",
        relationship: "contains",
        description: "Contains CV32E40P core in silicon",
      },
      {
        project: "core-v-sdk",
        relationship: "supported-by",
        description: "SDK provides development environment for the DevKit",
      },
    ],
  },

  // CORE-V Polara APU - Multi-core research platform
  "core-v-polara-apu": {
    academicPapers: [
      {
        title:
          "Ara: A 1-GHz+ Scalable and Energy-Efficient RISC-V Vector Processor With Multiprecision Floating-Point Support in 22-nm FD-SOI",
        authors: "Matheus Cavalcante et al.",
        venue: "IEEE Transactions on VLSI Systems",
        year: 2019,
        url: "https://ieeexplore.ieee.org/document/8918510",
      },
      {
        title: "OpenPiton: An Open Source Manycore Research Framework",
        authors: "J. Balkind, M. McKeown, Y. Fu et al.",
        venue: "ASPLOS",
        year: 2016,
        url: "https://dl.acm.org/doi/10.1145/2954679.2872414",
      },
    ],
    industryAdoption: [],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V Polara APU Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-polara-apu",
        language: "en",
      },
      {
        title: "Ara Vector Processor Paper",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/document/8918510",
        language: "en",
      },
      {
        title: "OpenPiton Manycore Framework Paper",
        platform: "ACM Digital Library",
        url: "https://dl.acm.org/doi/10.1145/2954679.2872414",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cva6",
        relationship: "uses",
        description: "Uses CVA6 as core processor elements",
      },
      {
        project: "cv-mesh",
        relationship: "uses",
        description: "OpenPiton-derived mesh interconnect connects CVA6 cores",
      },
      {
        project: "cv-hpdcache",
        relationship: "integrates",
        description: "HPDCache serves as L1 data cache in each CVA6 tile",
      },
      {
        project: "Ara",
        relationship: "integrates",
        description:
          "Vector processor architecture is a central upstream component in Polara composition.",
      },
      {
        project: "OpenPiton",
        relationship: "integrates",
        description:
          "Manycore platform substrate provides system framework and integration mechanics.",
      },
    ],
  },

  // CORE-V GCC - GNU compiler toolchain
  "corev-gcc": {
    industryAdoption: [
      {
        entity: "Embecosm",
        useCase:
          "Lead development and maintenance; contracted by OpenHW to port PULP extensions and Zc* extensions to GCC",
        sourceUrl: "https://www.embecosm.com/",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V GCC Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/corev-gcc",
        language: "en",
      },
      {
        title: "CORE-V GCC Tool Chain (slides)",
        platform: "OSD Forum 2020",
        url: "https://www.osdforum.org/documents/2020/2020-1445-core-v-gcc-tools.pdf",
        language: "en",
      },
      {
        title: "GNU GCC Project",
        platform: "GCC Official",
        url: "https://gcc.gnu.org/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "corev-binutils-gdb",
        relationship: "depends-on",
        description: "Requires CORE-V binutils for assembling/linking",
      },
      {
        project: "core-v-sdk",
        relationship: "integrated-in",
        description: "Primary compiler in the CORE-V SDK",
      },
      {
        project: "cv32e40p",
        relationship: "targets",
        description: "Generates code for CV32E40P PULP extensions",
      },
    ],
  },

  // CORE-V Binutils & GDB
  "corev-binutils-gdb": {
    industryAdoption: [
      {
        entity: "Embecosm",
        useCase:
          "Lead developer for CORE-V binutils and GDB; assembler/disassembler/debugger support for PULP and Zc* extensions",
        sourceUrl: "https://www.embecosm.com/",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CORE-V Binutils & GDB Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/corev-binutils-gdb",
        language: "en",
      },
      {
        title: "GNU Binutils Project",
        platform: "sourceware.org",
        url: "https://sourceware.org/binutils/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "corev-gcc",
        relationship: "required-by",
        description: "GCC depends on binutils for assembly and linking",
      },
      {
        project: "core-v-sdk",
        relationship: "integrated-in",
        description: "Assembler, linker, and debugger included in SDK",
      },
      {
        project: "core-v-mcu-devkit",
        relationship: "debugger-for",
        description: "GDB used for on-chip debugging of CORE-V MCU DevKit",
      },
    ],
  },

  // CORE-V LLVM - Alternative compiler toolchain
  "corev-llvm": {
    industryAdoption: [
      {
        entity: "Embecosm",
        useCase:
          "Lead development of CORE-V LLVM; implementing PULP custom extension support in Clang/LLVM backend",
        sourceUrl: "https://www.embecosm.com/",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V LLVM Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/corev-llvm-project",
        language: "en",
      },
      {
        title: "LLVM Documentation",
        platform: "LLVM Official",
        url: "https://llvm.org/docs/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "corev-gcc",
        relationship: "alternative-to",
        description: "Alternative compilation path to GCC for CORE-V targets",
      },
      {
        project: "core-v-sdk",
        relationship: "integrated-in",
        description: "LLVM/Clang available as alternative compiler in SDK",
      },
    ],
  },

  // CORE-V SDK - Software development kit
  "core-v-sdk": {
    industryAdoption: [
      {
        entity: "Ashling Microsystems",
        useCase: "Contributed Eclipse-based IDE integration and debug probe support",
        sourceUrl: "https://www.ashling.com/",
      },
      {
        entity: "QuickLogic Corporation",
        useCase: "SDK used with CORE-V MCU DevKit for application development",
        sourceUrl: "https://www.quicklogic.com/",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V SDK Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-sdk",
        language: "en",
      },
      {
        title: "CORE-V MCU DevKit Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "corev-gcc",
        relationship: "bundles",
        description: "SDK bundles GCC as primary compiler",
      },
      {
        project: "corev-binutils-gdb",
        relationship: "bundles",
        description: "SDK includes binutils and GDB",
      },
      {
        project: "core-v-mcu-devkit",
        relationship: "targets",
        description: "Primary target platform for the SDK",
      },
      {
        project: "core-v-freertos",
        relationship: "integrates",
        description: "FreeRTOS demos and BSP included in SDK",
      },
    ],
  },

  // CORE-V FreeRTOS - RTOS port
  "core-v-freertos": {
    industryAdoption: [
      {
        entity: "Amazon Web Services (FreeRTOS)",
        useCase: "Upstream FreeRTOS kernel used as base; CORE-V port contributed back to ecosystem",
        sourceUrl: "https://www.freertos.org/",
      },
    ],
    educationalUse: [],
    presentations: [],
    articles: [
      {
        title: "CORE-V FreeRTOS Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-freertos",
        language: "en",
      },
      {
        title: "FreeRTOS Official Site",
        platform: "FreeRTOS",
        url: "https://www.freertos.org/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-freertos-kernel",
        relationship: "uses",
        description: "Uses the CORE-V adapted FreeRTOS kernel",
      },
      {
        project: "core-v-mcu",
        relationship: "targets",
        description: "BSP and demos target the CORE-V MCU SoC",
      },
      {
        project: "core-v-sdk",
        relationship: "included-in",
        description: "FreeRTOS demos are part of the CORE-V SDK",
      },
    ],
  },

  // CORE-V FreeRTOS Kernel
  "core-v-freertos-kernel": {
    industryAdoption: [
      {
        entity: "Amazon Web Services (FreeRTOS)",
        useCase:
          "Base kernel maintained by AWS; CORE-V adaptations add RISC-V CORE-V-specific port code",
        sourceUrl: "https://www.freertos.org/",
      },
    ],
    educationalUse: [],
    articles: [
      {
        title: "CORE-V FreeRTOS Kernel Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-freertos-kernel",
        language: "en",
      },
      {
        title: "FreeRTOS Official Site",
        platform: "FreeRTOS",
        url: "https://www.freertos.org/",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-freertos",
        relationship: "used-by",
        description: "Core scheduling kernel for CORE-V FreeRTOS distribution",
      },
      {
        project: "core-v-mcu",
        relationship: "runs-on",
        description: "Adapted for CORE-V MCU interrupt controller and memory map",
      },
      {
        project: "core-v-sdk",
        relationship: "consumed-by",
        description: "Kernel adaptation is consumed through SDK and port-level software stacks.",
      },
    ],
  },
};

/** Get knowledge data for a project by ID */
function isValidHttpUrl(url?: string): boolean {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function hasValidDoi(doi?: string): boolean {
  if (!doi) return false;
  return /^10\.\d{4,9}\/.+/i.test(doi.trim());
}

function sanitizeKnowledge(knowledge: ProjectKnowledge): ProjectKnowledge {
  const academicPapers = knowledge.academicPapers
    ?.filter((paper) => Boolean(paper.title && paper.authors && paper.venue && paper.year))
    .map((paper) => ({
      ...paper,
      url: isValidHttpUrl(paper.url) ? paper.url : undefined,
      doi: hasValidDoi(paper.doi) ? paper.doi : undefined,
    }));

  const industryAdoption = knowledge.industryAdoption
    ?.filter((item) => Boolean(item.entity && item.useCase))
    .map((item) => ({
      ...item,
      sourceUrl: isValidHttpUrl(item.sourceUrl) ? item.sourceUrl : undefined,
    }));

  const educationalUse = knowledge.educationalUse
    ?.filter((item) => Boolean(item.university))
    .map((item) => ({
      ...item,
      url: isValidHttpUrl(item.url) ? item.url : undefined,
    }));

  const presentations = knowledge.presentations
    ?.filter((item) => Boolean(item.title && item.event && item.date))
    .map((item) => ({
      ...item,
      url: isValidHttpUrl(item.url) ? item.url : undefined,
      videoUrl: isValidHttpUrl(item.videoUrl) ? item.videoUrl : undefined,
    }));

  const articles = knowledge.articles?.filter(
    (item) => Boolean(item.title && item.platform) && isValidHttpUrl(item.url),
  );

  const ecosystem = knowledge.ecosystem?.filter((item) =>
    Boolean(item.project && item.relationship),
  );

  const sanitized: ProjectKnowledge = {
    academicPapers,
    industryAdoption,
    educationalUse,
    presentations,
    articles,
    ecosystem,
    contributionNotes: knowledge.contributionNotes,
  };

  return sanitized;
}

export function getProjectKnowledge(projectId: string): ProjectKnowledge | null {
  const knowledge = knowledgeBase[projectId];
  if (!knowledge) return null;

  const sanitized = sanitizeKnowledge(knowledge);
  const hasContent =
    (sanitized.academicPapers?.length || 0) > 0 ||
    (sanitized.industryAdoption?.length || 0) > 0 ||
    (sanitized.educationalUse?.length || 0) > 0 ||
    (sanitized.presentations?.length || 0) > 0 ||
    (sanitized.articles?.length || 0) > 0 ||
    (sanitized.ecosystem?.length || 0) > 0 ||
    Boolean(sanitized.contributionNotes);

  return hasContent ? sanitized : null;
}

/** Get a summary of knowledge base stats for a project */
export function getKnowledgeSummary(projectId: string) {
  const knowledge = getProjectKnowledge(projectId);
  if (!knowledge) return null;

  return {
    papersCount: knowledge.academicPapers?.length || 0,
    industryCount: knowledge.industryAdoption?.length || 0,
    educationCount: knowledge.educationalUse?.length || 0,
    presentationsCount: knowledge.presentations?.length || 0,
    articlesCount: knowledge.articles?.length || 0,
    ecosystemCount: knowledge.ecosystem?.length || 0,
    notesCount: knowledge.contributionNotes?.trim() ? 1 : 0,
    totalCount:
      (knowledge.academicPapers?.length || 0) +
      (knowledge.industryAdoption?.length || 0) +
      (knowledge.educationalUse?.length || 0) +
      (knowledge.presentations?.length || 0) +
      (knowledge.articles?.length || 0) +
      (knowledge.ecosystem?.length || 0) +
      (knowledge.contributionNotes?.trim() ? 1 : 0),
  };
}
