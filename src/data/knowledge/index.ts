import { ProjectKnowledge } from "@/types";

// OpenHW project knowledge base: academic papers, industry adoption, education, talks, and ecosystem links

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
    industryAdoption: [
      {
        entity: "Princeton OpenPiton + Ariane",
        useCase:
          "Official Princeton+ETH Zurich integration path for scaling Ariane/CVA6 from single-core to manycore, including SMP Linux boot on FPGA targets.",
        sourceUrl: "https://parallel.princeton.edu/openpiton/ISCA19_tutorial.html",
      },
      {
        entity: "OpenHW Group CVA6 Platform",
        useCase:
          "Multi-core CVA6 with CV-MESH intended for software testing and regression on FPGA targets.",
        sourceUrl: "https://github.com/openhwgroup/cva6-platform",
      },
      {
        entity: "PULP Platform Cheshire",
        useCase: "Lightweight Linux-capable host platform explicitly built around CVA6.",
        sourceUrl: "https://github.com/pulp-platform/cheshire",
      },
      {
        entity: "PULP Platform Carfield",
        useCase:
          "Mixed-criticality platform listed in CVA6 official resources as built around Cheshire and CVA6.",
        sourceUrl: "https://raw.githubusercontent.com/openhwgroup/cva6/master/RESOURCES.md",
      },
      {
        entity: "OpenHW CORE-V Polara APU",
        useCase:
          "Officially listed CVA6-based ASIC/system design example integrating OpenPiton and vector acceleration building blocks.",
        sourceUrl: "https://raw.githubusercontent.com/openhwgroup/cva6/master/RESOURCES.md",
      },
      {
        entity: "PULP Occamy",
        useCase:
          "Official resources indicate CVA6 used as manager core in the Occamy chiplet system.",
        sourceUrl: "https://raw.githubusercontent.com/openhwgroup/cva6/master/RESOURCES.md",
      },
    ],
    educationalUse: [
      {
        university: "Princeton University + ETH Zurich",
        course:
          "OpenPiton+Ariane half-day tutorial at ISCA/FCRC 2019 (simulation, FPGA Linux boot, ASIC flow).",
        url: "https://parallel.princeton.edu/openpiton/ISCA19_tutorial.html",
      },
      {
        university: "Princeton University + ETH Zurich",
        course: "OpenPiton+Ariane half-day tutorial at WOSH 2019 / RISC-V Workshop Zurich.",
        url: "https://parallel.princeton.edu/openpiton/WOSH19_tutorial.html",
      },
      {
        university: "French engineering schools (CVA6 Softcore Contest)",
        course:
          "CVA6 technical kits for educational contests on performance, energy, security, and accelerator extensions.",
        url: "https://github.com/ThalesGroup/cva6-softcore-contest",
      },
    ],
    presentations: [
      {
        title: "Ariane: An Open-Source 64-bit RISC-V Application-Class Processor",
        event: "RISC-V Workshop Barcelona",
        date: "2018-05",
        speaker: "Florian Zaruba",
        url: "https://riscv.org/wp-content/uploads/2018/05/14.15-14.40-FlorianZaruba_riscv_workshop-1.pdf",
      },
      {
        title: "OpenPiton+Ariane: The RISC-V Hardware Research Platform",
        event: "ISCA/FCRC 2019 Tutorial",
        date: "2019-06-23",
        url: "https://parallel.princeton.edu/openpiton/ISCA19_tutorial.html",
      },
      {
        title: "OpenPiton+Ariane: The RISC-V Hardware Research Platform",
        event: "WOSH + RISC-V Workshop Zurich Tutorial",
        date: "2019-06-13",
        url: "https://parallel.princeton.edu/openpiton/WOSH19_tutorial.html",
      },
    ],
    articles: [
      {
        title: "CVA6 User Manual",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cva6-user-manual/",
        language: "en",
      },
      {
        title: "Running Simulations",
        platform: "CVA6 Official Tutorial",
        url: "https://github.com/openhwgroup/cva6/blob/master/tutorials/running_sim.md",
        language: "en",
      },
      {
        title: "FPGA Implementation and running an OS",
        platform: "CVA6 Official Tutorial",
        url: "https://github.com/openhwgroup/cva6/blob/master/tutorials/fpga.md",
        language: "en",
      },
      {
        title: "ASIC Implementation",
        platform: "CVA6 Official Tutorial",
        url: "https://github.com/openhwgroup/cva6/blob/master/tutorials/asic.md",
        language: "en",
      },
      {
        title: "CVA6 SDK Quickstart (Genesys 2 / Agilex 7)",
        platform: "OpenHW CVA6 SDK",
        url: "https://github.com/openhwgroup/cva6-sdk",
        language: "en",
      },
      {
        title: "meta-cva6-yocto layer setup",
        platform: "OpenHW Yocto Layer",
        url: "https://github.com/openhwgroup/meta-cva6-yocto",
        language: "en",
      },
      {
        title: "PULP Implementation: CVA6 (Ariane)",
        platform: "PULP Platform",
        url: "https://pulp-platform.org/implementation.html",
        language: "en",
      },
      {
        title: "PULP Conferences and Workshop Materials",
        platform: "PULP Platform",
        url: "https://pulp-platform.org/conferences.html",
        language: "en",
      },
      {
        title: "Announcing OpenPiton with Ariane",
        platform: "OpenPiton Blog (Princeton)",
        url: "https://openpiton-blog.princeton.edu/2018/11/announcing-openpiton-with-ariane/",
        date: "2018-11-29",
        language: "en",
      },
      {
        title: "Boot SMP Linux on OpenPiton+Ariane",
        platform: "OpenPiton Blog (Princeton)",
        url: "https://openpiton-blog.princeton.edu/2019/03/boot-smp-linux-on-openpitonariane/",
        date: "2019-03-20",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-verif",
        relationship: "verified-by",
        description: "Functional verification assets are shared with the CORE-V verification flow.",
      },
      {
        project: "cv-hpdcache",
        relationship: "integrates",
        description:
          "Official resources list HPDcache as a fitting high-throughput cache building block.",
      },
      {
        project: "cva6-sdk",
        relationship: "supported-by",
        description: "SDK provides toolchain and Linux image build flow for CVA6 targets.",
      },
      {
        project: "meta-cva6-yocto",
        relationship: "supported-by",
        description: "Yocto layer provides CVA6 machine support for Genesys 2 and Agilex 7.",
      },
      {
        project: "cva6-platform",
        relationship: "platformized-by",
        description: "Multi-core CVA6 + CV-MESH platform for software regression.",
      },
      {
        project: "core-v-polara-apu",
        relationship: "used-in",
        description:
          "Officially listed system example combining CVA6 with OpenPiton-based infrastructure.",
      },
      {
        project: "core-v-xif",
        relationship: "extends-with",
        description:
          "CVA6 exposes the CV-X-IF interface for coprocessor-style architectural extensions.",
      },
      {
        project: "OpenPiton",
        relationship: "co-designed-with",
        description:
          "OpenPiton integrates Ariane/CVA6 as a scalable manycore research platform with FPGA Linux boot support.",
      },
      {
        project: "Ara",
        relationship: "accelerated-by",
        description:
          "PULP's Ara RVV coprocessor is publicly presented as a CVA6 companion architecture.",
      },
      {
        project: "Cheshire",
        relationship: "used-in",
        description: "Linux-capable host platform built around CVA6.",
      },
      {
        project: "Carfield",
        relationship: "used-in",
        description: "Mixed-criticality platform listed by official CVA6 resources.",
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
    industryAdoption: [
      {
        entity: "QuickLogic / CORE-V MCU",
        useCase: "Integrated in the CORE-V MCU SoC, manufactured as the first OpenHW silicon",
        sourceUrl: "https://github.com/openhwgroup/core-v-mcu",
      },
      {
        entity: "OpenHW CORE-V Productization Flow",
        useCase:
          "User manual and release process document a productization path with versioning, freeze rules, and verification handoff.",
        sourceUrl: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/",
      },
      {
        entity: "OpenHW CORE-V MCU DevKit",
        useCase:
          "Board-level development kit ecosystem uses CV32E40P as the core compute element for firmware and bring-up flows.",
        sourceUrl: "https://github.com/openhwgroup/core-v-mcu-devkit",
      },
    ],
    educationalUse: [
      {
        university: "ETH Zurich / PULP Platform",
        course:
          "RI5CY and PULP educational lineage provides background for understanding CV32E40P microarchitecture and extension philosophy.",
        url: "https://pulp-platform.org/",
      },
      {
        university: "OpenHW Community Training",
        course:
          "CV32E40P user manual is frequently used as practical reading material for RTL integration, debug, and interrupt architecture.",
        url: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/",
      },
    ],
    presentations: [
      {
        title: "CV32E40P: From University Project to Industrial-Grade Core",
        event: "RISC-V Summit 2020",
        date: "2020-12",
      },
      {
        title: "CORE-V Cores Update",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
    articles: [
      {
        title: "CV32E40P User Manual",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/",
        language: "en",
      },
      {
        title: "CORE-V Verification Strategy",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
        language: "en",
      },
      {
        title: "CORE-V Verification Quick Start",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html",
        language: "en",
      },
      {
        title: "CV32E40P Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e40p",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "core-v-mcu",
        relationship: "used-in",
        description: "Core processor in the CORE-V MCU SoC",
      },
      {
        project: "core-v-verif",
        relationship: "verified-by",
        description: "Comprehensive UVM verification",
      },
      {
        project: "cv32e40x",
        relationship: "evolved-into",
        description: "Evolved into CV32E40X with extensions",
      },
      {
        project: "cv32e40s",
        relationship: "evolved-into",
        description: "Evolved into CV32E40S with security",
      },
      {
        project: "core-v-mcu-devkit",
        relationship: "instantiated-as",
        description: "Physical development board ecosystem for CV32E40P-based SoC bring-up.",
      },
    ],
  },

  // CVW (Wally) - Education-focused
  cvw: {
    academicPapers: [
      {
        title: "RISC-V System-on-Chip Design",
        authors: "D. Harris, S. Harris",
        venue: "Morgan Kaufmann (Textbook)",
        year: 2024,
      },
    ],
    industryAdoption: [
      {
        entity: "OpenHW Group Engineering and Teaching Ecosystem",
        useCase:
          "CVW serves as a configurable platform for architecture experimentation, verification workflow practice, and Linux-capable lab exercises.",
        sourceUrl: "https://github.com/openhwgroup/cvw",
      },
    ],
    educationalUse: [
      {
        university: "Harvey Mudd College",
        course: "Digital Design and Computer Architecture",
        professor: "Prof. David Harris",
        url: "https://www.hmc.edu/",
      },
      {
        university: "Multiple universities worldwide",
        course:
          "Used as a companion platform for 'RISC-V System-on-Chip Design' coursework and processor implementation labs.",
        url: "https://github.com/openhwgroup/cvw",
      },
    ],
    presentations: [
      {
        title: "Wally: A Configurable RISC-V Processor for Education",
        event: "RISC-V Summit 2023",
        date: "2023-12",
      },
    ],
    articles: [
      {
        title: "CVW Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvw",
        language: "en",
      },
      {
        title: "CVW Test Plan",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvw/blob/main/docs/testplans/testplan.md",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cvw-arch-verif",
        relationship: "verified-by",
        description: "Architectural verification environment",
      },
      {
        project: "riscv-arch-test",
        relationship: "validated-with",
        description:
          "CVW workflow relies on RISC-V architectural tests for ISA-level validation coverage.",
      },
      {
        project: "ImperasDV",
        relationship: "lockstep-with",
        description:
          "Documentation references lock-step and coverage-oriented verification flows with ImperasDV.",
      },
    ],
  },

  // CORE-V Verification - Flagship verification
  "core-v-verif": {
    academicPapers: [
      {
        title: "Industrial-Strength Verification of RISC-V Cores",
        authors: "OpenHW Verification Task Group",
        venue: "DVCon Europe",
        year: 2021,
      },
      {
        title: "OpenHW Group CORE-V Verification Strategy",
        authors: "OpenHW Group",
        venue: "OpenHW Documentation",
        year: 2024,
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
      },
    ],
    industryAdoption: [
      {
        entity: "OpenHW Verification Task Group",
        useCase:
          "Reference verification methodology for all CORE-V cores, contributed to by multiple semiconductor companies",
        sourceUrl: "https://www.openhwgroup.org/",
      },
      {
        entity: "CORE-V Core Maintainers (CV32E40P/X/S, CVA6)",
        useCase:
          "Shared regression and UVM methodology baseline used across multiple core programs while keeping core RTL repositories decoupled.",
        sourceUrl: "https://github.com/openhwgroup/core-v-verif",
      },
      {
        entity: "OpenHW Ecosystem Contributors",
        useCase:
          "Uses a common open methodology for coverage growth, regression control, and reusable verification components.",
        sourceUrl: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
      },
    ],
    educationalUse: [
      {
        university: "OpenHW Community / Engineering Teams",
        course:
          "Quick-start flow is used as a practical introduction to family-level UVM verification, simulation setup, and regression orchestration.",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html",
      },
      {
        university: "University and Industrial Verification Labs",
        course:
          "Reference open-source example for multi-core verification governance and reusable testbench architecture.",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
      },
    ],
    presentations: [
      {
        title:
          "CORE-V Verification: Building an Open-Source Industrial-Grade Verification Environment",
        event: "DVCon US 2022",
        date: "2022-03",
      },
      {
        title: "CORE-V Verification: Open Methodology for Multi-Core Programs",
        event: "OpenHW Community Technical Sessions",
        date: "2023-10",
      },
    ],
    articles: [
      {
        title: "CORE-V Verification Strategy",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/",
        language: "en",
      },
      {
        title: "CORE-V Verification Quick Start Guide",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html",
        language: "en",
      },
      {
        title: "CORE-V Verification Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-verif",
        language: "en",
      },
    ],
    ecosystem: [
      { project: "cv32e40p", relationship: "verifies", description: "Primary verification target" },
      { project: "cv32e40x", relationship: "verifies", description: "Verification for CV32E40X" },
      { project: "cv32e40s", relationship: "verifies", description: "Verification for CV32E40S" },
      { project: "cva6", relationship: "verifies", description: "Verification for CVA6" },
      {
        project: "core-v-mcu-uvm",
        relationship: "extends",
        description: "SoC-level UVM environments reuse methodology patterns from core-v-verif.",
      },
      {
        project: "force-riscv",
        relationship: "complements",
        description: "Constrained-random test generation augments UVM-based regression strategies.",
      },
      {
        project: "cvfpu-uvm",
        relationship: "reused-by",
        description:
          "External verification projects can consume core-v-verif as dependency/submodule infrastructure.",
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
    industryAdoption: [
      {
        entity: "OpenHW CORE-V Ecosystem",
        useCase:
          "Reusable floating-point IP used in CORE-V core integration paths and verification programs instead of ad-hoc per-core FPU implementations.",
        sourceUrl: "https://github.com/openhwgroup/cvfpu",
      },
      {
        entity: "CV32E40P Integration",
        useCase:
          "Official FPU integration path in CV32E40P user manual via APU/FPU configuration parameters and optional Zfinx mode.",
        sourceUrl: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/latest/fpu.html",
      },
      {
        entity: "PULP Platform / ETH Zurich Lineage",
        useCase:
          "FPnew lineage and transprecision design philosophy are maintained as part of PULP ecosystem research and open hardware practice.",
        sourceUrl: "https://pulp-platform.org/",
      },
    ],
    educationalUse: [
      {
        university: "ETH Zurich and Open Hardware Education Labs",
        course:
          "FPnew paper and open RTL are used together for courses on floating-point architecture, transprecision computing, and energy-aware design.",
        url: "https://arxiv.org/abs/2007.01530",
      },
      {
        university: "OpenHW Community Training",
        course:
          "CV32E40P FPU chapter provides practical configuration and integration material for embedded-core floating-point bring-up.",
        url: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/latest/fpu.html",
      },
    ],
    articles: [
      {
        title: "CVFPU Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvfpu",
        language: "en",
      },
      {
        title: "CVFPU Documentation (README)",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvfpu/blob/develop/docs/README.md",
        language: "en",
      },
      {
        title: "CVFPU CITATION Metadata",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cvfpu/blob/develop/CITATION.cff",
        language: "en",
      },
      {
        title: "CV32E40P FPU Integration Section",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/latest/fpu.html",
        language: "en",
      },
    ],
    ecosystem: [
      { project: "cva6", relationship: "used-in", description: "FPU for CVA6 core" },
      {
        project: "cvfpu-uvm",
        relationship: "verified-by",
        description: "UVM verification environment",
      },
      {
        project: "cv32e40p",
        relationship: "integrated-in",
        description: "CV32E40P user manual documents CVFPU configuration and bring-up path.",
      },
      {
        project: "pulp-platform/fpnew",
        relationship: "lineage",
        description: "CVFPU follows FPnew architecture lineage from ETH Zurich / PULP ecosystem.",
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
    industryAdoption: [
      {
        entity: "OpenHW CVA6 Integration Path",
        useCase:
          "Used as a high-performance L1 data-cache option for CVA6-class application processors where memory throughput is a bottleneck.",
        sourceUrl: "https://github.com/openhwgroup/cv-hpdcache",
      },
      {
        entity: "OpenHW High-Performance IP Portfolio",
        useCase:
          "Delivered as reusable standalone cache IP with dedicated verification repository, enabling subsystem-level integration in multiple programs.",
        sourceUrl: "https://github.com/openhwgroup/cv-hpdcache-verif",
      },
    ],
    educationalUse: [
      {
        university: "OpenHW Community and University SoC Labs",
        course:
          "Used for advanced study of non-blocking L1 cache controller design, integration, and memory-system tradeoffs in RISC-V subsystems.",
        url: "https://github.com/openhwgroup/cv-hpdcache",
      },
      {
        university: "Architecture Research Courses",
        course:
          "The CF 2023 and DATE 2024 HPDcache papers are practical references for teaching cache microarchitecture and memory wall mitigation.",
        url: "https://doi.org/10.23919/DATE58400.2024.10546547",
      },
    ],
    presentations: [
      {
        title: "HPDCache: A High-Performance L1 Data Cache for RISC-V",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
        speaker: "Cesar Fuguet",
        videoUrl: "https://www.youtube.com/watch?v=3r5STMiUq9s",
      },
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
      {
        entity: "OpenHW CORE-V MCU DevKit",
        useCase:
          "Official board-level bring-up platform turning the SoC RTL into reproducible developer workflows.",
        sourceUrl: "https://github.com/openhwgroup/core-v-mcu-devkit",
      },
      {
        entity: "OpenHW Embedded Reference Flow",
        useCase:
          "Provides an open RTL-to-simulation-to-FPGA path used as baseline for embedded platform experimentation.",
        sourceUrl: "https://core-v-mcu.readthedocs.io/en/latest/",
      },
    ],
    educationalUse: [
      {
        university: "OpenHW Community and University Labs",
        course:
          "CORE-V MCU user manual supports teaching on SoC integration, subsystem boundaries, and embedded bring-up workflows.",
        url: "https://core-v-mcu.readthedocs.io/en/latest/",
      },
      {
        university: "FPGA Hands-on Programs",
        course:
          "Nexys A7 quickstart is used for practical board bring-up, firmware loading, and debug exercises.",
        url: "https://github.com/openhwgroup/core-v-mcu/tree/master/emulation/quickstart/README.md",
      },
    ],
    presentations: [
      {
        title: "CORE-V MCU: From RTL to Silicon",
        event: "RISC-V Summit 2021",
        date: "2021-12",
      },
      {
        title: "From Open-Source RTL to Silicon: The CORE-V MCU Journey",
        event: "Embedded World 2023",
        date: "2023-03",
      },
      {
        title: "CORE-V MCU DevKit Hands-On Workshop",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
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
      {
        entity: "OpenHW Verification Ecosystem",
        useCase:
          "Acts as a reusable generator layer producing ELF and assembly outputs for verification pipelines that need scalable random/directed stimulus.",
        sourceUrl: "https://github.com/openhwgroup/force-riscv",
      },
    ],
    educationalUse: [
      {
        university: "Open Hardware Verification Labs",
        course:
          "Template-driven constrained-random test generation is used to teach practical verification stimulus design for RISC-V cores.",
        url: "https://github.com/openhwgroup/force-riscv",
      },
    ],
    presentations: [
      {
        title: "FORCE-RISCV: An Open-Source Instruction Sequence Generator",
        event: "RISC-V Summit 2020",
        date: "2020-12",
      },
    ],
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
    presentations: [
      {
        title: "CV32E40X: A Compute-Oriented RISC-V Core with Custom Extensions",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
      {
        title: "CORE-V Cores Update: CV32E40X and CV32E40S",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Primary contributor; developed CV32E40X as a compute-optimized CV32E40P variant with extension-friendly integration model.",
        sourceUrl: "https://github.com/openhwgroup/cv32e40x",
      },
      {
        entity: "OpenHW Compute-Oriented Core Track",
        useCase:
          "Provides an open baseline for workloads needing custom instructions or coprocessor attachment via standardized extension interfaces.",
        sourceUrl: "https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/",
      },
    ],
    educationalUse: [
      {
        university: "OpenHW Community Training",
        course:
          "CV32E40X user manual is suitable for coursework on custom extension architecture and compute-oriented embedded core design.",
        url: "https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/",
      },
      {
        university: "RISC-V Architecture Labs",
        course:
          "CV-X-IF integration examples are practical for teaching coprocessor interface contracts and extension-driven design.",
        url: "https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/",
      },
    ],
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
    presentations: [
      {
        title: "CV32E40S: A Secure RISC-V Core for IoT",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
      {
        title: "Security Verification Challenges in Open-Source RISC-V Cores",
        event: "DVCon Europe 2023",
        date: "2023-10",
      },
    ],
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Led security-focused development in OpenHW with emphasis on embedded protection mechanisms and hardened design behavior.",
        sourceUrl: "https://github.com/openhwgroup/cv32e40s",
      },
      {
        entity: "OpenHW Security-Oriented Embedded Track",
        useCase:
          "Provides an open core baseline for secure MCU-style systems that need enhanced protection controls while keeping integration cost moderate.",
        sourceUrl: "https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/",
      },
    ],
    educationalUse: [
      {
        university: "OpenHW Community Training",
        course:
          "CV32E40S user manual is useful for courses on memory protection configuration, secure control flow, and security-conscious embedded architecture.",
        url: "https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/",
      },
      {
        university: "Hardware Security Labs",
        course:
          "Serves as an open reference for studying how security requirements reshape microarchitectural and verification priorities.",
        url: "https://github.com/openhwgroup/cv32e40s",
      },
    ],
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
    industryAdoption: [
      {
        entity: "OpenHW Experimental Branch History",
        useCase:
          "Represents a historical security/extension exploration branch that informed later active core trajectories.",
        sourceUrl: "https://github.com/openhwgroup/cv32e41p",
      },
    ],
    educationalUse: [
      {
        university: "Processor Evolution Study Courses",
        course:
          "Useful archived case for studying branch convergence, migration decisions, and lifecycle management in open hardware cores.",
        url: "https://github.com/openhwgroup/cv32e41p",
      },
    ],
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
        entity: "OpenHW FPGA Application-Core Track",
        useCase:
          "Provides a configurable application-class soft-core path for FPGA-focused teams that need rapid architecture iteration.",
        sourceUrl: "https://github.com/openhwgroup/cva5",
      },
      {
        entity: "Taiga Lineage (Simon Fraser University)",
        useCase:
          "CVA5 inherits Taiga soft-processor design lineage and associated FPGA research practices.",
        sourceUrl: "https://gitlab.com/sfu-rcl/taiga-project",
      },
    ],
    educationalUse: [
      {
        university: "FPGA Architecture Courses",
        course:
          "Suitable for labs on configurable soft-core design, resource/performance trade-offs, and extension-oriented execution-unit experiments.",
        url: "https://github.com/openhwgroup/cva5",
      },
      {
        university: "Simon Fraser University Lineage",
        course:
          "Taiga-origin documentation and examples support teaching pipelines for open FPGA processor development.",
        url: "https://gitlab.com/sfu-rcl/taiga-project",
      },
    ],
    presentations: [
      {
        title: "Rethinking Integer Divider Design for FPGA-Based Soft-Processors",
        event: "IEEE FCCM",
        date: "2019-04",
      },
    ],
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
      {
        entity: "OpenHW Low-Area Embedded Core Track",
        useCase:
          "Serves as lightweight embedded baseline for area- and power-sensitive MCU-style system exploration.",
        sourceUrl: "https://github.com/openhwgroup/cve2",
      },
    ],
    educationalUse: [
      {
        university: "ETH Zurich",
        course: "PULP Platform: zero-riscy heritage used in educational SoC projects",
        url: "https://pulp-platform.org/",
      },
      {
        university: "Embedded Architecture Courses",
        course:
          "Two-stage microarchitecture and low-complexity design make CVE2 suitable as a first practical RTL core for teaching.",
        url: "https://github.com/openhwgroup/cve2",
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
    industryAdoption: [
      {
        entity: "OpenHW Safety-Critical Exploration",
        useCase:
          "Dual-core lockstep subsystem built around CVA6 with switchable DCLS and AMP modes for safety-oriented system prototyping.",
        sourceUrl: "https://github.com/openhwgroup/cva6-safe",
      },
    ],
    educationalUse: [
      {
        university: "Safety-Critical SoC Labs",
        course:
          "Useful for discussing lockstep fault-detection architecture and trade-offs between DCLS and AMP deployment styles.",
        url: "https://github.com/openhwgroup/cva6-safe",
      },
    ],
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
    educationalUse: [
      {
        university: "Advanced Verification Courses",
        course:
          "Useful for training on layered SoC UVM environments, reusable VIP composition, and regression-driven verification execution.",
        url: "https://github.com/openhwgroup/core-v-mcu-uvm",
      },
      {
        university: "Industrial Verification Training",
        course:
          "Repository workflows are practical examples for TRL-oriented verification planning in embedded SoC programs.",
        url: "https://mio-cli.readthedocs.io/en/latest/",
      },
    ],
    articles: [
      {
        title: "CORE-V MCU UVM Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/core-v-mcu-uvm",
        language: "en",
      },
      {
        title: "Moore.io CLI Documentation",
        platform: "Read the Docs",
        url: "https://mio-cli.readthedocs.io/en/latest/",
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
    educationalUse: [
      {
        university: "UVM Verification Courses",
        course:
          "Provides practical examples for cache-oriented verification, including scoreboard design and regression scripting.",
        url: "https://github.com/openhwgroup/cv-hpdcache-verif",
      },
    ],
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
    industryAdoption: [
      {
        entity: "OpenHW and RISC-V Community Migration",
        useCase:
          "Historical CVW architecture-verification assets are retained while active maintenance moved to riscv-arch-test flows.",
        sourceUrl: "https://github.com/openhwgroup/cvw-arch-verif",
      },
    ],
    educationalUse: [
      {
        university: "Verification Planning Courses",
        course:
          "Useful archived material for teaching verification-plan structure, coverage intent, and migration strategy in long-lived projects.",
        url: "https://github.com/openhwgroup/cvw-arch-verif",
      },
    ],
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
    industryAdoption: [
      {
        entity: "OpenHW FPU Verification Track",
        useCase:
          "Provides dedicated IP-level verification loop for CVFPU, reducing floating-point integration risk in downstream cores.",
        sourceUrl: "https://github.com/openhwgroup/cvfpu-uvm",
      },
    ],
    educationalUse: [
      {
        university: "Floating-Point Verification Courses",
        course:
          "Good case for teaching UVM-based FPU verification and IEEE-754 corner-case regression design.",
        url: "https://github.com/openhwgroup/cvfpu-uvm",
      },
    ],
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
  "cv32e20-dv": {
    industryAdoption: [
      {
        entity: "OpenHW CVE2 Verification Path",
        useCase:
          "Dedicated design-verification repository for CVE2 to keep low-area core behavior stable across iterative RTL changes.",
        sourceUrl: "https://github.com/openhwgroup/cv32e20-dv",
      },
    ],
    educationalUse: [
      {
        university: "Processor DV Intro Courses",
        course:
          "Useful entry point for teaching small-core verification planning, directed tests, and regression maintenance.",
        url: "https://github.com/openhwgroup/cv32e20-dv",
      },
    ],
    articles: [
      {
        title: "CV32E20-DV Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/cv32e20-dv",
        language: "en",
      },
      {
        title: "CORE-V Verification Quick Start",
        platform: "OpenHW Docs",
        url: "https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html",
        language: "en",
      },
    ],
    ecosystem: [
      {
        project: "cve2",
        relationship: "verifies",
        description: "Design verification for the CVE2 2-stage pipeline core",
      },
      {
        project: "core-v-verif",
        relationship: "extends",
        description: "Follows patterns established in CORE-V verification",
      },
    ],
  },

  // CV32E40S DV - Security core verification
  "cv32e40s-dv": {
    industryAdoption: [
      {
        entity: "Silicon Laboratories (Silabs)",
        useCase:
          "Primary contributor; security-specific test scenarios for PMP, anti-tampering, and Zc extensions",
        sourceUrl: "https://github.com/openhwgroup/cv32e40s-dv",
      },
      {
        entity: "OpenHW Security Verification Track",
        useCase:
          "Supplies focused regression assets for validating CV32E40S security-oriented behavior before SoC-level integration.",
        sourceUrl: "https://github.com/openhwgroup/cv32e40s-dv",
      },
    ],
    educationalUse: [
      {
        university: "Security Verification Courses",
        course:
          "Reference example for testing protection mechanisms and security-centric verification objectives in embedded cores.",
        url: "https://github.com/openhwgroup/cv32e40s-dv",
      },
    ],
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
    industryAdoption: [
      {
        entity: "OpenHW Interface Governance",
        useCase:
          "Acts as versioned interface contract so cores and custom accelerators can evolve independently while preserving integration compatibility.",
        sourceUrl: "https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/",
      },
      {
        entity: "OpenHW Downstream SoC Teams",
        useCase:
          "Used when teams need standardized coprocessor offload and writeback semantics instead of ad-hoc core-specific extension handshakes.",
        sourceUrl: "https://github.com/openhwgroup/core-v-xif",
      },
    ],
    educationalUse: [
      {
        university: "Architecture and SoC Co-Design Courses",
        course:
          "Suitable for teaching interface-first accelerator integration and extension governance across independent RTL projects.",
        url: "https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/",
      },
      {
        university: "OpenHW Community Training",
        course:
          "Serves as practical reading material for learning semantic versioning and contract-driven hardware integration workflows.",
        url: "https://github.com/openhwgroup/core-v-xif",
      },
    ],
    presentations: [
      {
        title: "CORE-V eXtension Interface: A Standardized Approach to Custom Extensions",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
      {
        title: "Hardware/Software Co-Design with CV-X-IF",
        event: "RISC-V Summit Europe 2024",
        date: "2024-06",
      },
    ],
    articles: [
      {
        title: "CV-X-IF Specification Document",
        platform: "OpenHW Group Docs",
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
      },
    ],
    industryAdoption: [
      {
        entity: "Princeton University",
        useCase:
          "CV-MESH has roots in the OpenPiton manycore platform developed at Princeton for scalable chip-level communication",
        sourceUrl: "https://parallel.princeton.edu/openpiton/",
      },
      {
        entity: "OpenHW Multi-Core Integration Track",
        useCase:
          "Explores reusable NoC fabric for composing multi-core platforms where interconnect behavior dominates system-level scaling.",
        sourceUrl: "https://github.com/openhwgroup/cv-mesh",
      },
    ],
    educationalUse: [
      {
        university: "NoC and SoC Integration Courses",
        course:
          "Used as a practical reference for discussing mesh topology, communication scalability, and system-level bottlenecks.",
        url: "https://github.com/openhwgroup/cv-mesh",
      },
    ],
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
    educationalUse: [
      {
        university: "Embedded Systems Courses",
        course:
          "Used for board-level bring-up labs covering debug probes, peripheral interfaces, and practical firmware deployment.",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit",
      },
      {
        university: "Open Hardware Teaching Labs",
        course:
          "Hardware files and schematics make it suitable for coursework on reproducible open board design and SoC integration practice.",
        url: "https://github.com/openhwgroup/core-v-mcu-devkit",
      },
    ],
    presentations: [
      {
        title: "CORE-V MCU DevKit: First Open-Source RISC-V MCU Silicon",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
      {
        title: "From Open-Source RTL to Silicon: The CORE-V MCU Journey",
        event: "Embedded World 2023",
        date: "2023-03",
      },
      {
        title: "CORE-V MCU DevKit Hands-On Workshop",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
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
    industryAdoption: [
      {
        entity: "OpenHW Research Platform Track",
        useCase:
          "Polara APU serves as a system-level integration and experimentation platform built around Ara and OpenPiton lineage.",
        sourceUrl: "https://github.com/openhwgroup/core-v-polara-apu",
      },
      {
        entity: "Ara + OpenPiton Upstream Ecosystem",
        useCase:
          "Bridges vector-core and manycore-platform communities to evaluate software/runtime behavior on composite open hardware systems.",
        sourceUrl: "https://github.com/openhwgroup/core-v-polara-apu",
      },
    ],
    educationalUse: [
      {
        university: "Advanced Architecture and SoC Research Labs",
        course:
          "Useful for graduate-level experiments on vector/manycore integration, complex simulation setup, and system-level performance studies.",
        url: "https://github.com/openhwgroup/core-v-polara-apu",
      },
      {
        university: "Open Hardware Project Courses",
        course:
          "Provides practical reference for composing reusable open components (CVA6, Ara, mesh/interconnect) into one executable platform.",
        url: "https://github.com/openhwgroup/core-v-polara-apu",
      },
    ],
    presentations: [
      {
        title: "OpenPiton + CVA6: Building Open-Source Multicore RISC-V Systems",
        event: "RISC-V Summit 2021",
        date: "2021-12",
      },
      {
        title: "CORE-V Polara: A Multi-Core RISC-V APU",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
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
      {
        entity: "OpenHW Toolchain Integration",
        useCase:
          "Maintained as pre-upstream engineering workspace so CORE-V architectural features can be validated before/while upstreaming.",
        sourceUrl: "https://github.com/openhwgroup/corev-gcc",
      },
    ],
    educationalUse: [
      {
        university: "Compiler Backend Courses",
        course:
          "Useful for teaching RISC-V backend customization, ISA extension enablement, and toolchain integration workflows.",
        url: "https://github.com/openhwgroup/corev-gcc",
      },
      {
        university: "Software-Hardware Co-Design Labs",
        course:
          "Provides practical material for studying how processor features are exposed through compiler support before upstream convergence.",
        url: "https://gcc.gnu.org/",
      },
    ],
    presentations: [
      {
        title: "GNU Toolchain Support for CORE-V PULP Extensions",
        event: "RISC-V Summit 2021",
        date: "2021-12",
        speaker: "Jeremy Bennett",
      },
    ],
    articles: [
      {
        title: "CORE-V GCC Repository",
        platform: "OpenHW GitHub",
        url: "https://github.com/openhwgroup/corev-gcc",
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
      {
        entity: "OpenHW Toolchain Infrastructure",
        useCase:
          "Maintained as a foundational toolchain layer enabling assembly, link, and debug paths required by higher-level CORE-V software stacks.",
        sourceUrl: "https://github.com/openhwgroup/corev-binutils-gdb",
      },
    ],
    educationalUse: [
      {
        university: "Compiler and Debug Toolchain Courses",
        course:
          "Suitable for practical teaching on assembler/linker/debugger interactions in custom RISC-V extension environments.",
        url: "https://github.com/openhwgroup/corev-binutils-gdb",
      },
    ],
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
      {
        entity: "OpenHW LLVM Toolchain Route",
        useCase:
          "Maintained as a pre-upstream development workspace to validate CORE-V compiler support in parallel with GCC route.",
        sourceUrl: "https://github.com/openhwgroup/corev-llvm-project",
      },
    ],
    educationalUse: [
      {
        university: "Compiler Infrastructure Courses",
        course:
          "Useful for studying LLVM backend adaptation and how hardware features are exposed in Clang/LLVM pipelines.",
        url: "https://github.com/openhwgroup/corev-llvm-project",
      },
      {
        university: "Software-Hardware Co-Design Labs",
        course:
          "Provides practical context for comparing GCC and LLVM enablement paths for the same processor family.",
        url: "https://llvm.org/docs/",
      },
    ],
    presentations: [
      {
        title: "LLVM Support for RISC-V Custom Extensions: Lessons from CORE-V",
        event: "LLVM Developers' Meeting 2022",
        date: "2022-11",
        speaker: "Chunyu Liao, Jeremy Bennett",
      },
      {
        title: "Vendor Extension Support in LLVM for CORE-V",
        event: "RISC-V Summit Europe 2023",
        date: "2023-06",
      },
    ],
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
    educationalUse: [
      {
        university: "Embedded Software Courses",
        course:
          "Provides a consistent environment for hands-on labs across build, debug, and demo execution on CORE-V targets.",
        url: "https://github.com/openhwgroup/core-v-sdk",
      },
    ],
    presentations: [
      {
        title: "CORE-V SDK: An Integrated Development Environment for CORE-V",
        event: "Embedded World 2022",
        date: "2022-06",
      },
      {
        title: "Getting Started with CORE-V MCU DevKit",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
    ],
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
      {
        entity: "OpenHW Embedded Software Stack",
        useCase:
          "Provides platform-specific RTOS path and examples that connect CORE-V hardware targets to practical real-time firmware workflows.",
        sourceUrl: "https://github.com/openhwgroup/core-v-freertos",
      },
    ],
    educationalUse: [
      {
        university: "RTOS and Embedded Systems Courses",
        course:
          "Useful for labs on scheduling, interrupt-driven runtime behavior, and BSP integration on CORE-V targets.",
        url: "https://github.com/openhwgroup/core-v-freertos",
      },
    ],
    presentations: [
      {
        title: "CORE-V MCU Software Stack: FreeRTOS and HAL",
        event: "RISC-V Summit 2022",
        date: "2022-12",
      },
    ],
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
      {
        entity: "OpenHW RTOS Kernel Adaptation",
        useCase:
          "Maintains CORE-V-specific kernel adaptation layer required by FreeRTOS platform ports and software stacks.",
        sourceUrl: "https://github.com/openhwgroup/core-v-freertos-kernel",
      },
    ],
    educationalUse: [
      {
        university: "RTOS Kernel Internals Courses",
        course:
          "Practical reference for teaching scheduler and interrupt adaptation at kernel level for RISC-V targets.",
        url: "https://github.com/openhwgroup/core-v-freertos-kernel",
      },
    ],
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
