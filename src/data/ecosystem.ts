export type LocalizedEcosystemText = {
  en: string;
  zh: string;
};

export type EcosystemCategoryId = "foundations" | "projects" | "pdk" | "regional" | "participate";

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
  entityType: LocalizedEcosystemText;
  relationship?: LocalizedEcosystemText;
  summary: LocalizedEcosystemText;
  region: LocalizedEcosystemText;
  focus: string[];
  logo?: string;
  mark?: {
    label: string;
    node: string;
  };
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
    id: "pdk",
    title: { en: "Open Process Design Kits", zh: "开放工艺设计套件" },
    shortTitle: { en: "Open PDKs", zh: "开放 PDK" },
    description: {
      en: "Foundry-linked open process kits and predictive research PDKs, with their manufacturing status made explicit.",
      zh: "开放的晶圆厂关联工艺套件与预测型研究 PDK，并明确标注其可制造性与成熟度。",
    },
  },
  {
    id: "regional",
    title: { en: "Research Institutes & Public Initiatives", zh: "科研机构与公共计划" },
    shortTitle: { en: "Research", zh: "科研机构" },
    description: {
      en: "Non-profit research institutes, laboratories, and public initiatives that connect open silicon research with wider adoption.",
      zh: "连接开源芯片研究、公共协作与产业应用的非营利研究机构、实验室和公共计划。",
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
    entityType: { en: "Foundation initiative", zh: "基金会计划" },
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
    entityType: { en: "Standards organization", zh: "标准组织" },
    summary: {
      en: "Global standards organization stewarding the open RISC-V instruction set architecture and specifications.",
      zh: "负责维护开放 RISC-V 指令集架构及相关规范的全球标准组织。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["ISA", "Standards", "Ecosystem"],
    logo: "/ecosystem/riscv.png",
  },
  {
    id: "rise-project",
    name: "RISE Project",
    url: "https://riseproject.dev/",
    category: "foundations",
    entityType: { en: "Linux Foundation project", zh: "Linux 基金会项目" },
    summary: {
      en: "Industry-led Linux Foundation Europe project accelerating open-source software readiness for RISC-V platforms.",
      zh: "由产业成员推动的 Linux Foundation Europe 项目，致力于加速 RISC-V 平台的开源软件成熟度。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["RISC-V", "Open Source", "Software"],
    logo: "/ecosystem/rise.png",
  },
  {
    id: "chips-alliance",
    name: "CHIPS Alliance",
    url: "https://www.chipsalliance.org/",
    category: "foundations",
    entityType: { en: "Industry alliance", zh: "产业联盟" },
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
    entityType: { en: "Non-profit foundation", zh: "非营利基金会" },
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
    entityType: { en: "Non-profit association", zh: "非营利协会" },
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
    entityType: { en: "FPGA foundation", zh: "FPGA 基金会" },
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
    entityType: { en: "Engineering organization", zh: "工程组织" },
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
    entityType: { en: "Open silicon project", zh: "开源芯片项目" },
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
    entityType: { en: "Security project", zh: "安全项目" },
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
    entityType: { en: "Academic platform", zh: "学术平台" },
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
    entityType: { en: "EDA project", zh: "EDA 项目" },
    summary: {
      en: "Open-source semiconductor design automation project focused on lowering barriers to digital chip implementation.",
      zh: "致力于降低数字芯片实现门槛的开源半导体设计自动化项目。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["EDA", "RTL-to-GDS", "Physical Design"],
    logo: "/ecosystem/openroad.png",
  },
  {
    id: "xiangshan",
    name: "XiangShan",
    url: "https://docs.xiangshan.cc/zh-cn/latest/",
    category: "projects",
    entityType: { en: "Processor project", zh: "处理器项目" },
    relationship: {
      en: "Stewarded by BOSC",
      zh: "由北京开源芯片研究院持续维护",
    },
    summary: {
      en: "High-performance open-source RISC-V processor project initiated by ICT, CAS and now developed by the XiangShan team at BOSC.",
      zh: "由中科院计算所发起、现由北京开源芯片研究院香山团队持续研发的高性能开源 RISC-V 处理器项目。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "High Performance", "CPU"],
    logo: "/ecosystem/xiangshan.png",
  },
  {
    id: "openxuantie",
    name: "OpenXuantie",
    url: "https://github.com/XUANTIE-RV",
    category: "projects",
    entityType: { en: "Open processor ecosystem", zh: "开放处理器生态" },
    summary: {
      en: "Open RISC-V processor and software ecosystem from T-Head, including CPU cores, toolchains, operating-system support, and AI libraries.",
      zh: "平头哥玄铁开放的 RISC-V 处理器与软件生态，涵盖处理器核、工具链、操作系统支持和 AI 软件库。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "CPU", "Software"],
    logo: "/ecosystem/openxuantie.png",
  },
  {
    id: "shakti",
    name: "SHAKTI",
    url: "https://shakti.org.in/",
    category: "projects",
    entityType: { en: "Academic initiative", zh: "学术计划" },
    summary: {
      en: "IIT Madras RISE initiative building an open-source ecosystem of RISC-V processors, SoCs, peripheral IP, and software.",
      zh: "由 IIT Madras RISE 团队推动，建设开源 RISC-V 处理器、SoC、外设 IP 与软件生态。",
    },
    region: { en: "India", zh: "印度" },
    focus: ["RISC-V", "Processors", "SoC"],
    logo: "/ecosystem/shakti.png",
  },
  {
    id: "chipyard",
    name: "Chipyard",
    url: "https://chipyard.readthedocs.io/en/stable/",
    category: "projects",
    entityType: { en: "SoC framework", zh: "SoC 框架" },
    summary: {
      en: "Open-source Chisel-based framework integrating RISC-V cores, accelerators, memory systems, simulation, and implementation flows.",
      zh: "基于 Chisel 的开源 SoC 框架，集成 RISC-V 处理器核、加速器、存储系统、仿真与实现流程。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["RISC-V", "SoC", "Chisel"],
    logo: "/ecosystem/chipyard.png",
  },
  {
    id: "yosyshq",
    name: "YosysHQ",
    url: "https://github.com/YosysHQ",
    category: "projects",
    entityType: { en: "EDA organization", zh: "EDA 组织" },
    summary: {
      en: "Maintainer organization for Yosys and the OSS CAD Suite, anchoring a widely used open-source synthesis and FPGA tool ecosystem.",
      zh: "维护 Yosys 与 OSS CAD Suite，是开源逻辑综合和 FPGA 工具生态的重要组织。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["Yosys", "Synthesis", "FPGA"],
    logo: "/ecosystem/yosyshq.png",
  },
  {
    id: "ieda",
    name: "iEDA",
    url: "https://ieda.oscc.cc/",
    category: "projects",
    entityType: { en: "EDA project", zh: "EDA 项目" },
    summary: {
      en: "Open-source EDA platform covering digital physical implementation and analysis tools for chip design and research.",
      zh: "覆盖数字芯片物理实现与分析工具的开源 EDA 平台，面向芯片设计和科研使用。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["Open EDA", "Physical Design", "Research"],
    logo: "/ecosystem/ieda.png",
  },
  {
    id: "skywater-sky130",
    name: "SkyWater SKY130",
    url: "https://github.com/google/skywater-pdk",
    category: "pdk",
    entityType: { en: "Foundry-linked open PDK", zh: "晶圆厂关联开放 PDK" },
    relationship: {
      en: "Experimental open release",
      zh: "实验性开放版本",
    },
    summary: {
      en: "Open PDK for SkyWater's 130 nm CMOS process. It supports manufacturable designs, while the public release remains an experimental preview rather than a production-qualified kit.",
      zh: "面向 SkyWater 130 nm CMOS 工艺的开放 PDK，可用于可制造设计；其公开版本仍属于实验性预览，并非生产认证套件。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["130 nm", "Foundry-linked", "CMOS"],
    logo: "/ecosystem/pdk-sky130.png",
  },
  {
    id: "globalfoundries-gf180mcu",
    name: "GlobalFoundries GF180MCU",
    url: "https://github.com/google/gf180mcu-pdk",
    category: "pdk",
    entityType: { en: "Foundry-linked open PDK", zh: "晶圆厂关联开放 PDK" },
    relationship: {
      en: "Experimental open release",
      zh: "实验性开放版本",
    },
    summary: {
      en: "Open PDK for GlobalFoundries' 180 nm MCU process. It targets manufacturable designs at GF, but the public release remains an experimental preview not intended for production use.",
      zh: "面向 GlobalFoundries 180 nm MCU 工艺的开放 PDK，可用于面向 GF 的可制造设计；但其公开版本仍为实验性预览，不用于生产环境。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["180 nm", "Foundry-linked", "Mixed Signal"],
    logo: "/ecosystem/pdk-gf180mcu.png",
  },
  {
    id: "ihp-sg13g2",
    name: "IHP SG13G2",
    url: "https://github.com/IHP-GmbH/IHP-Open-PDK",
    category: "pdk",
    entityType: { en: "Foundry-linked open PDK", zh: "晶圆厂关联开放 PDK" },
    relationship: {
      en: "Preview release",
      zh: "预览版本",
    },
    summary: {
      en: "Open PDK for IHP's 130 nm SiGe BiCMOS process, aimed at analog, mixed-signal, and RF design. The public release is a preview rather than a production-qualified kit.",
      zh: "面向 IHP 130 nm SiGe BiCMOS 工艺的开放 PDK，适用于模拟、混合信号与射频设计；公开版本仍是预览版，并非生产认证套件。",
    },
    region: { en: "Germany", zh: "德国" },
    focus: ["130 nm", "SiGe BiCMOS", "RF"],
    logo: "/ecosystem/pdk-ihp.png",
  },
  {
    id: "icsprout55",
    name: "ICsprout55",
    url: "https://github.com/openecos-projects/icsprout55-pdk",
    category: "pdk",
    entityType: { en: "Foundry-linked preview PDK", zh: "晶圆厂关联预览 PDK" },
    relationship: {
      en: "Research and small-batch use",
      zh: "面向科研与小批量验证",
    },
    summary: {
      en: "Open 55 nm CMOS PDK from Zhejiang ICsprout. Its current preview targets research, education, and small-batch validation, and is not qualified for commercial mass production.",
      zh: "ICsprout（开芯院）开放的 55 nm CMOS PDK；当前预览版面向科研、教学与小批量验证，尚不适用于商业大规模量产。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["55 nm", "Preview", "CMOS"],
    logo: "/ecosystem/pdk-icsprout55.png",
  },
  {
    id: "freepdk45",
    name: "NCSU FreePDK45",
    url: "https://eda.ncsu.edu/freepdk/freepdk45/",
    category: "pdk",
    entityType: { en: "Predictive research PDK", zh: "预测型研究 PDK" },
    relationship: {
      en: "Not manufacturable",
      zh: "不可用于制造",
    },
    summary: {
      en: "Generic predictive 45 nm CMOS process kit from NC State for teaching and design research. It is not tied to a foundry process and cannot be used to fabricate chips.",
      zh: "由北卡罗来纳州立大学提供的通用预测型 45 nm CMOS 工艺套件，用于教学和设计研究；不对应具体晶圆厂，不能用于芯片制造。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["45 nm", "Predictive", "Education"],
    logo: "/ecosystem/pdk-freepdk45.png",
  },
  {
    id: "asap7",
    name: "ASAP7",
    url: "https://github.com/The-OpenROAD-Project/asap7",
    category: "pdk",
    entityType: { en: "Predictive research PDK", zh: "预测型研究 PDK" },
    relationship: {
      en: "Not manufacturable",
      zh: "不可用于制造",
    },
    summary: {
      en: "Predictive 7 nm FinFET PDK distributed for academic physical-design research and benchmarking. It models an advanced node but is not a foundry-qualified manufacturing kit.",
      zh: "面向学术物理设计研究与基准测试的预测型 7 nm FinFET PDK；它用于模拟先进节点，并非晶圆厂认证的制造套件。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["7 nm", "FinFET", "Predictive"],
    logo: "/ecosystem/pdk-asap7.png",
  },
  {
    id: "pkp3",
    name: "PKP3",
    url: "https://pkp.pkueda.org.cn/",
    category: "pdk",
    entityType: { en: "Predictive GAA research PDK", zh: "预测型 GAA 研究 PDK" },
    relationship: {
      en: "Not manufacturable",
      zh: "不可用于制造",
    },
    summary: {
      en: "Open predictive 3 nm gate-all-around PDK from Peking University for advanced-node EDA and circuit research. It is an academic model, not a manufacturable foundry kit.",
      zh: "北京大学面向先进节点 EDA 与电路研究开放的预测型 3 nm 环栅 PDK；属于学术模型，不能作为晶圆厂制造套件。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["3 nm", "GAA", "Predictive"],
    logo: "/ecosystem/pdk-pkp3.png",
  },
  {
    id: "openrpdk28",
    name: "OpenRPDK28",
    url: "https://github.com/RIOSMPW/OpenRPDK28",
    category: "pdk",
    entityType: { en: "Academic PDK template", zh: "学术 PDK 模板" },
    relationship: {
      en: "Under construction",
      zh: "仍在建设中",
    },
    summary: {
      en: "Early open 28 nm reference PDK project from RIOS Lab. The repository describes preliminary academic material rather than a complete, foundry-qualified production kit.",
      zh: "RIOS Lab 推动的早期开放 28 nm 参考 PDK 项目；仓库目前提供初步学术材料，并非完整、经晶圆厂认证的生产套件。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["28 nm", "Academic", "Preliminary"],
    logo: "/ecosystem/rios-lab.png",
  },
  {
    id: "ode4ec",
    name: "ODE4EC",
    url: "https://ode4ec.eu/",
    category: "regional",
    entityType: { en: "European initiative", zh: "欧洲公共计划" },
    summary: {
      en: "Pan-European initiative building an open design environment and a healthier open-source chip design ecosystem.",
      zh: "建设开放芯片设计环境、推动欧洲开源芯片设计生态发展的泛欧计划。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["Open EDA", "Talent", "Europe"],
    logo: "/ecosystem/ode4ec.png",
  },
  {
    id: "chips-it",
    name: "Fondazione Chips-IT",
    url: "https://www.chips.it/",
    category: "regional",
    entityType: { en: "National research foundation", zh: "国家级研究基金会" },
    summary: {
      en: "Italy's national research and technology foundation for integrated-circuit design, with dedicated work on digital design and open hardware.",
      zh: "意大利面向集成电路设计的国家级研发基金会，设有数字设计与开源硬件专项研究方向。",
    },
    region: { en: "Italy", zh: "意大利" },
    focus: ["Open Hardware", "IC Design", "RISC-V"],
    logo: "/ecosystem/chips-it.png",
  },
  {
    id: "bosc",
    name: "Beijing Institute of Open Source Chip",
    url: "https://www.bosc.ac.cn/",
    category: "regional",
    entityType: { en: "Non-profit research institute", zh: "非营利研究机构" },
    relationship: {
      en: "Steward of XiangShan",
      zh: "香山项目的维护机构",
    },
    summary: {
      en: "Non-profit research institute advancing open RISC-V technology, collaborative innovation, and industrial adoption in China.",
      zh: "推动中国开放 RISC-V 技术、协同创新与产业落地的非营利研究机构。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "Research", "Industry"],
    logo: "/ecosystem/bosc.png",
  },
  {
    id: "rios-lab",
    name: "RIOS Lab",
    url: "https://www.rioslab.org/",
    category: "regional",
    entityType: { en: "Research laboratory", zh: "研究实验室" },
    summary: {
      en: "Shenzhen-based open-source systems research lab working on RISC-V chips, OpenEDA, OpenPDK, and reusable hardware IP.",
      zh: "位于深圳的开源系统研究实验室，研究 RISC-V 芯片、OpenEDA、OpenPDK 与可复用硬件 IP。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["RISC-V", "Open EDA", "Research"],
    logo: "/ecosystem/rios-lab.png",
  },
  {
    id: "tiny-tapeout",
    name: "Tiny Tapeout",
    url: "https://tinytapeout.com/",
    category: "participate",
    entityType: { en: "Education & tapeout platform", zh: "教学与流片平台" },
    summary: {
      en: "Education-focused platform and shuttle program that makes designing and manufacturing a small chip approachable.",
      zh: "通过课程、模板和共享流片，让学习者更容易设计并制造小型芯片的平台。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Tapeout", "Education", "ASIC"],
    logo: "/ecosystem/tinytapeout.png",
  },
  {
    id: "ysyx",
    name: "One Student One Chip",
    url: "https://ysyx.oscc.cc/",
    category: "participate",
    entityType: { en: "Education & tapeout program", zh: "教学与流片计划" },
    summary: {
      en: "Open processor education program guiding learners through full-stack RISC-V system design toward their own taped-out chip.",
      zh: "引导学习者完成全栈 RISC-V 系统设计并走向自主流片的开放处理器人才培养计划。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["Education", "RISC-V", "Tapeout"],
    logo: "/ecosystem/ysyx.png",
  },
  {
    id: "chipfoundry",
    name: "ChipFoundry",
    url: "https://chipfoundry.io/",
    category: "participate",
    entityType: { en: "MPW platform", zh: "MPW 流片平台" },
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
    entityType: { en: "Open design repository", zh: "开放设计仓库" },
    summary: {
      en: "CERN-founded catalogue for discovering open hardware designs and the communities maintaining them.",
      zh: "由 CERN 发起、用于发现开放硬件设计及其维护社区的项目目录。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Designs", "CERN OHL", "Community"],
    logo: "/ecosystem/ohwr.png",
  },
];
