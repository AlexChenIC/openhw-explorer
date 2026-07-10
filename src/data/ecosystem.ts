export type LocalizedEcosystemText = {
  en: string;
  zh: string;
};

export type EcosystemCategoryId = "foundations" | "projects" | "regional" | "participate";

export interface EcosystemCategory {
  id: EcosystemCategoryId;
  title: LocalizedEcosystemText;
  shortTitle: LocalizedEcosystemText;
  description: LocalizedEcosystemText;
}

export interface EcosystemEntry {
  id: string;
  name: string;
  url: string;
  category: EcosystemCategoryId;
  summary: LocalizedEcosystemText;
  region: LocalizedEcosystemText;
  focus: string[];
  logo: string;
}

export const ecosystemVerifiedAt = "2026-07-10";

export const ecosystemCategories: EcosystemCategory[] = [
  {
    id: "foundations",
    title: { en: "Foundations & Alliances", zh: "基金会与产业联盟" },
    shortTitle: { en: "Foundations", zh: "基金会" },
    description: {
      en: "Standards bodies, neutral foundations, and alliances that coordinate open hardware communities.",
      zh: "协调开放标准、开源硬件项目和产业协作的基金会与中立联盟。",
    },
  },
  {
    id: "projects",
    title: { en: "Open Silicon & EDA", zh: "开源芯片与 EDA" },
    shortTitle: { en: "Silicon & EDA", zh: "芯片与 EDA" },
    description: {
      en: "Major open silicon programs, reusable IP, security projects, and design automation initiatives.",
      zh: "重要的开源芯片计划、可复用 IP、安全项目与设计自动化项目。",
    },
  },
  {
    id: "regional",
    title: { en: "Research & Regional Initiatives", zh: "科研与区域计划" },
    shortTitle: { en: "Research", zh: "科研计划" },
    description: {
      en: "Research platforms and regional programs connecting open silicon work across Europe, Asia, and beyond.",
      zh: "连接欧洲、亚洲及全球开源芯片研究与产业协作的平台和区域计划。",
    },
  },
  {
    id: "participate",
    title: { en: "Build & Participate", zh: "动手实践与参与" },
    shortTitle: { en: "Participate", zh: "参与实践" },
    description: {
      en: "Practical entry points for tape-out, certification, reusable designs, and community participation.",
      zh: "面向流片、认证、开放设计复用和社区参与的实践入口。",
    },
  },
];

export const ecosystemEntries: EcosystemEntry[] = [
  {
    id: "openhw-foundation",
    name: "OpenHW Foundation",
    url: "https://openhwfoundation.org/",
    category: "foundations",
    summary: {
      en: "Eclipse Foundation initiative developing and verifying industrial-grade open-source RISC-V cores and related IP.",
      zh: "Eclipse 基金会旗下计划，协作开发并验证面向产业应用的开源 RISC-V 处理器核与相关 IP。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["CORE-V", "RISC-V", "Open IP"],
    logo: "/ecosystem/openhw.png",
  },
  {
    id: "riscv-international",
    name: "RISC-V International",
    url: "https://riscv.org/",
    category: "foundations",
    summary: {
      en: "Global standards organization stewarding the open RISC-V instruction set architecture and specifications.",
      zh: "负责维护开放 RISC-V 指令集架构及相关规范的全球标准组织。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["ISA", "Standards", "Ecosystem"],
    logo: "/ecosystem/riscv.png",
  },
  {
    id: "chips-alliance",
    name: "CHIPS Alliance",
    url: "https://www.chipsalliance.org/",
    category: "foundations",
    summary: {
      en: "Linux Foundation alliance hosting open hardware designs, IP, and tools for silicon and FPGA development.",
      zh: "Linux 基金会旗下联盟，托管面向芯片与 FPGA 开发的开源硬件设计、IP 和工具。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Open IP", "FPGA", "Tools"],
    logo: "/ecosystem/chips.png",
  },
  {
    id: "fossi-foundation",
    name: "FOSSi Foundation",
    url: "https://fossi-foundation.org/",
    category: "foundations",
    summary: {
      en: "Independent non-profit promoting and protecting free and open-source silicon and its supporting ecosystem.",
      zh: "推动并守护自由开源芯片及其工具生态的独立非营利组织。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Open Silicon", "Community", "Education"],
    logo: "/ecosystem/fossi.png",
  },
  {
    id: "oshwa",
    name: "Open Source Hardware Association",
    url: "https://oshwa.org/",
    category: "foundations",
    summary: {
      en: "Non-profit supporting open hardware education, community events, and the Open Source Hardware certification program.",
      zh: "通过教育、社区活动与开放硬件认证计划推动开源硬件发展的非营利组织。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Certification", "Community", "Education"],
    logo: "/ecosystem/oshwa.png",
  },
  {
    id: "osfpga-foundation",
    name: "Open-Source FPGA Foundation",
    url: "https://github.com/os-fpga",
    category: "foundations",
    summary: {
      en: "Open FPGA organization maintaining design resources, educational material, a virtual lab, and open EDA projects.",
      zh: "维护开源 FPGA 设计资源、教学资料、虚拟实验室与开放 EDA 项目的组织。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["FPGA", "Open EDA", "Education"],
    logo: "/ecosystem/osfpga.png",
  },
  {
    id: "lowrisc",
    name: "lowRISC",
    url: "https://lowrisc.org/",
    category: "projects",
    summary: {
      en: "Open silicon organization and engineering team stewarding projects including OpenTitan and Ibex.",
      zh: "维护 OpenTitan、Ibex 等项目并提供开源芯片工程能力的非营利组织。",
    },
    region: { en: "United Kingdom", zh: "英国" },
    focus: ["OpenTitan", "Ibex", "Engineering"],
    logo: "/ecosystem/lowrisc.png",
  },
  {
    id: "opentitan",
    name: "OpenTitan",
    url: "https://opentitan.org/",
    category: "projects",
    summary: {
      en: "Open-source silicon root-of-trust project administered by lowRISC as a collaborative engineering program.",
      zh: "由 lowRISC 管理、以协作工程方式开发的开源硅信任根项目。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Root of Trust", "Security", "Ibex"],
    logo: "/ecosystem/opentitan.png",
  },
  {
    id: "caliptra",
    name: "Caliptra",
    url: "https://caliptra.io/",
    category: "projects",
    summary: {
      en: "CHIPS Alliance project providing reusable open-source Root of Trust hardware, firmware, and specifications for SoCs.",
      zh: "CHIPS Alliance 项目，为 SoC 提供可复用的开源信任根硬件、固件和规范。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Root of Trust", "Security", "SoC"],
    logo: "/ecosystem/caliptra.png",
  },
  {
    id: "pulp-platform",
    name: "PULP Platform",
    url: "https://pulp-platform.org/",
    category: "projects",
    summary: {
      en: "ETH Zurich and University of Bologna research platform for energy-efficient RISC-V cores, systems, and accelerators.",
      zh: "由苏黎世联邦理工学院与博洛尼亚大学推动的高能效 RISC-V 处理器、系统与加速器研究平台。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["RISC-V", "Accelerators", "Research"],
    logo: "/ecosystem/pulp.png",
  },
  {
    id: "openroad",
    name: "The OpenROAD Project",
    url: "https://theopenroadproject.org/",
    category: "projects",
    summary: {
      en: "Open-source semiconductor design automation project focused on lowering barriers to digital chip implementation.",
      zh: "致力于降低数字芯片实现门槛的开源半导体设计自动化项目。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["EDA", "RTL-to-GDS", "Physical Design"],
    logo: "/ecosystem/openroad.png",
  },
  {
    id: "ode4ec",
    name: "ODE4EC",
    url: "https://ode4ec.eu/",
    category: "regional",
    summary: {
      en: "Pan-European initiative building an open design environment and a healthier open-source chip design ecosystem.",
      zh: "建设开放芯片设计环境、推动欧洲开源芯片设计生态发展的泛欧计划。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["Open EDA", "Talent", "Europe"],
    logo: "/ecosystem/ode4ec.png",
  },
  {
    id: "bosc",
    name: "Beijing Institute of Open Source Chip",
    url: "https://www.bosc.ac.cn/",
    category: "regional",
    summary: {
      en: "Non-profit research institute advancing open RISC-V technology, collaborative innovation, and industrial adoption in China.",
      zh: "推动中国开放 RISC-V 技术、协同创新与产业落地的非营利研究机构。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "Research", "Industry"],
    logo: "/ecosystem/bosc.png",
  },
  {
    id: "xiangshan",
    name: "XiangShan",
    url: "https://docs.xiangshan.cc/zh-cn/latest/",
    category: "regional",
    summary: {
      en: "Open-source high-performance RISC-V processor project initiated by the Institute of Computing Technology, CAS.",
      zh: "由中国科学院计算技术研究所牵头发起的高性能开源 RISC-V 处理器项目。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "High Performance", "CPU"],
    logo: "/ecosystem/xiangshan.png",
  },
  {
    id: "shakti",
    name: "SHAKTI",
    url: "https://shakti.org.in/",
    category: "regional",
    summary: {
      en: "IIT Madras RISE initiative building an open-source ecosystem of RISC-V processors, SoCs, peripheral IP, and software.",
      zh: "由 IIT Madras RISE 团队推动，建设开源 RISC-V 处理器、SoC、外设 IP 与软件生态。",
    },
    region: { en: "India", zh: "印度" },
    focus: ["RISC-V", "Processors", "SoC"],
    logo: "/ecosystem/shakti.png",
  },
  {
    id: "rios-lab",
    name: "RIOS Lab",
    url: "https://www.rioslab.org/",
    category: "regional",
    summary: {
      en: "Shenzhen-based open-source systems research lab working on RISC-V chips, OpenEDA, OpenPDK, and reusable hardware IP.",
      zh: "位于深圳的开源系统研究实验室，研究 RISC-V 芯片、OpenEDA、OpenPDK 与可复用硬件 IP。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "Open EDA", "Research"],
    logo: "/ecosystem/rios.png",
  },
  {
    id: "openchip",
    name: "Openchip",
    url: "https://openchip.com/",
    category: "regional",
    summary: {
      en: "European company developing RISC-V-based SoCs, accelerators, and full-stack systems for AI and HPC.",
      zh: "面向 AI 与 HPC 开发 RISC-V SoC、加速器及全栈系统的欧洲企业。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["RISC-V", "AI", "HPC"],
    logo: "/ecosystem/openchip.png",
  },
  {
    id: "tiny-tapeout",
    name: "Tiny Tapeout",
    url: "https://tinytapeout.com/",
    category: "participate",
    summary: {
      en: "Education-focused platform and shuttle program that makes designing and manufacturing a small chip approachable.",
      zh: "通过课程、模板和共享流片，让学习者更容易设计并制造小型芯片的平台。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Tapeout", "Education", "ASIC"],
    logo: "/ecosystem/tinytapeout.png",
  },
  {
    id: "chipfoundry",
    name: "ChipFoundry",
    url: "https://chipfoundry.io/",
    category: "participate",
    summary: {
      en: "Accessible chip prototyping and MPW shuttle platform using open-source tools, reference designs, and open PDKs.",
      zh: "利用开源工具、参考设计与开放 PDK 提供芯片原型和 MPW 共享流片入口的平台。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Tapeout", "Open PDK", "Prototyping"],
    logo: "/ecosystem/chipfoundry.png",
  },
  {
    id: "open-hardware-repository",
    name: "Open Hardware Repository",
    url: "https://ohwr.org/",
    category: "participate",
    summary: {
      en: "CERN-founded catalogue for discovering open hardware designs and the communities maintaining them.",
      zh: "由 CERN 发起、用于发现开放硬件设计及其维护社区的项目目录。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Designs", "CERN OHL", "Community"],
    logo: "/ecosystem/ohwr.png",
  },
];
