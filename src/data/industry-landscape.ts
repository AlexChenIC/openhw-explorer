export type LocalizedIndustryText = {
  en: string;
  zh: string;
};

export type IndustrySegmentId = "processor-ip" | "silicon-platforms" | "design-enablement";

export interface IndustrySegment {
  id: IndustrySegmentId;
  title: LocalizedIndustryText;
  shortTitle: LocalizedIndustryText;
  description: LocalizedIndustryText;
}

export interface IndustryCompany {
  id: string;
  name: string;
  mark: string;
  url: string;
  segment: IndustrySegmentId;
  entityType: LocalizedIndustryText;
  summary: LocalizedIndustryText;
  region: LocalizedIndustryText;
  focus: string[];
}

export const industryVerifiedAt = "2026-07-10";

export const industrySegments: IndustrySegment[] = [
  {
    id: "processor-ip",
    title: { en: "Processor IP", zh: "处理器 IP" },
    shortTitle: { en: "Processor IP", zh: "处理器 IP" },
    description: {
      en: "Commercial RISC-V CPU and processor-system IP spanning embedded, application, automotive, AI, and data-center designs.",
      zh: "覆盖嵌入式、应用处理器、汽车、AI 和数据中心设计的商业 RISC-V CPU 与处理器系统 IP。",
    },
  },
  {
    id: "silicon-platforms",
    title: { en: "Silicon & Compute Platforms", zh: "芯片与计算平台" },
    shortTitle: { en: "Silicon & Platforms", zh: "芯片与平台" },
    description: {
      en: "Companies productizing RISC-V through SoCs, chiplets, boards, and integrated hardware-software platforms.",
      zh: "通过 SoC、Chiplet、开发板和软硬件一体化平台推动 RISC-V 产品落地的企业。",
    },
  },
  {
    id: "design-enablement",
    title: { en: "Design & Verification Enablement", zh: "设计与验证支撑" },
    shortTitle: { en: "Design Enablement", zh: "设计支撑" },
    description: {
      en: "Commercial design, verification, emulation, debug, and processor-development offerings with explicit RISC-V support.",
      zh: "明确支持 RISC-V 的商业设计、验证、仿真、调试与处理器开发方案。",
    },
  },
];

export const industryCompanies: IndustryCompany[] = [
  {
    id: "sifive",
    name: "SiFive",
    mark: "SF",
    url: "https://www.sifive.com/risc-v-core-ip",
    segment: "processor-ip",
    entityType: { en: "Processor IP company", zh: "处理器 IP 企业" },
    summary: {
      en: "Configurable RISC-V core IP spanning embedded, high-performance, vector, matrix, and automotive processor families.",
      zh: "提供覆盖嵌入式、高性能、向量、矩阵与汽车处理器系列的可配置 RISC-V 内核 IP。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["CPU IP", "AI", "Automotive"],
  },
  {
    id: "andes-technology",
    name: "Andes Technology",
    mark: "AT",
    url: "https://www.andestech.com/en/products-solutions/andescore-processors/",
    segment: "processor-ip",
    entityType: { en: "Processor IP company", zh: "处理器 IP 企业" },
    summary: {
      en: "Commercial 32-bit and 64-bit RISC-V processor families for compact embedded, real-time, Linux, DSP, and application workloads.",
      zh: "提供面向紧凑嵌入式、实时、Linux、DSP 与应用负载的 32 位和 64 位商业 RISC-V 处理器系列。",
    },
    region: { en: "Taiwan", zh: "中国台湾" },
    focus: ["Embedded", "DSP", "Automotive"],
  },
  {
    id: "codasip",
    name: "Codasip",
    mark: "CD",
    url: "https://codasip.com/products/codasip-risc-v-processors/",
    segment: "processor-ip",
    entityType: { en: "Custom compute company", zh: "定制计算企业" },
    summary: {
      en: "Customizable RISC-V processor IP paired with Codasip Studio for architecture exploration and synchronized RTL and SDK generation.",
      zh: "将可定制 RISC-V 处理器 IP 与 Codasip Studio 结合，用于架构探索以及 RTL 和 SDK 的同步生成。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["Custom Compute", "CodAL", "Security"],
  },
  {
    id: "mips",
    name: "MIPS",
    mark: "MI",
    url: "https://mips.com/products/hardware/",
    segment: "processor-ip",
    entityType: { en: "Processor IP company", zh: "处理器 IP 企业" },
    summary: {
      en: "RISC-V processor and subsystem IP emphasizing multithreading, scalable integration, functional safety, and physical AI workloads.",
      zh: "提供强调多线程、可扩展集成、功能安全与 Physical AI 负载的 RISC-V 处理器和子系统 IP。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["Multithreading", "Safety", "Edge AI"],
  },
  {
    id: "akeana",
    name: "Akeana",
    mark: "AK",
    url: "https://www.akeana.com/",
    segment: "processor-ip",
    entityType: { en: "Processor-system IP company", zh: "处理器系统 IP 企业" },
    summary: {
      en: "RISC-V processor, accelerator, interconnect, and system IP ranging from embedded cores to high-performance application and server designs.",
      zh: "提供从嵌入式内核到高性能应用与服务器设计的 RISC-V 处理器、加速器、互连和系统 IP。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["CPU IP", "Interconnect", "Server"],
  },
  {
    id: "semidynamics",
    name: "Semidynamics",
    mark: "SD",
    url: "https://semidynamics.com/ip-cores",
    segment: "processor-ip",
    entityType: { en: "AI processor IP company", zh: "AI 处理器 IP 企业" },
    summary: {
      en: "Customizable RISC-V CPU and AI engine IP focused on high-bandwidth data movement, vector and tensor compute, and Linux-capable systems.",
      zh: "面向高带宽数据移动、向量与张量计算及 Linux 系统，提供可定制 RISC-V CPU 和 AI 引擎 IP。",
    },
    region: { en: "Spain", zh: "西班牙" },
    focus: ["AI", "Vector", "Tensor"],
  },
  {
    id: "nuclei-system-technology",
    name: "Nuclei System Technology",
    mark: "NU",
    url: "https://www.nucleisys.com/",
    segment: "processor-ip",
    entityType: { en: "Processor IP company", zh: "处理器 IP 企业" },
    summary: {
      en: "Configurable RISC-V processor and subsystem IP covering low-power MCUs, real-time control, Linux-capable applications, and safety designs.",
      zh: "提供覆盖低功耗 MCU、实时控制、Linux 应用与安全设计的可配置 RISC-V 处理器和子系统 IP。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["Embedded", "Linux", "Safety"],
  },
  {
    id: "tenstorrent",
    name: "Tenstorrent",
    mark: "TT",
    url: "https://tenstorrent.com/ip",
    segment: "processor-ip",
    entityType: { en: "CPU & AI IP company", zh: "CPU 与 AI IP 企业" },
    summary: {
      en: "Licensable RISC-V CPU, AI accelerator, and chiplet IP, including the high-performance TT-Ascalon processor family.",
      zh: "提供可授权的 RISC-V CPU、AI 加速器和 Chiplet IP，包括高性能 TT-Ascalon 处理器系列。",
    },
    region: { en: "North America", zh: "北美" },
    focus: ["High Performance", "AI", "Chiplets"],
  },
  {
    id: "ventana-micro-systems",
    name: "Ventana Micro Systems",
    mark: "VM",
    url: "https://www.ventanamicro.com/",
    segment: "silicon-platforms",
    entityType: { en: "CPU IP & chiplet company", zh: "CPU IP 与 Chiplet 企业" },
    summary: {
      en: "High-performance RISC-V CPUs delivered as licensable IP, chiplets, and platforms for data center, edge, automotive, and client systems.",
      zh: "以可授权 IP、Chiplet 和平台形式提供高性能 RISC-V CPU，面向数据中心、边缘、汽车与客户端系统。",
    },
    region: { en: "United States", zh: "美国" },
    focus: ["Data Center", "Chiplets", "CPU IP"],
  },
  {
    id: "starfive",
    name: "StarFive",
    mark: "SV",
    url: "https://www.starfivetech.com/en/",
    segment: "silicon-platforms",
    entityType: { en: "RISC-V platform company", zh: "RISC-V 平台企业" },
    summary: {
      en: "Develops commercial RISC-V CPU IP, coherent subsystem IP, SoCs, and boards spanning embedded through higher-performance applications.",
      zh: "开发商业 RISC-V CPU IP、一致性子系统 IP、SoC 和开发板，覆盖嵌入式到更高性能应用。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["CPU IP", "SoC", "Boards"],
  },
  {
    id: "spacemit",
    name: "SpacemiT",
    mark: "SM",
    url: "https://www.spacemit.com/en/",
    segment: "silicon-platforms",
    entityType: { en: "RISC-V compute company", zh: "RISC-V 计算企业" },
    summary: {
      en: "Builds a RISC-V AI computing platform spanning processor cores, SoCs, software, development hardware, and end-product reference systems.",
      zh: "建设覆盖处理器核、SoC、软件、开发硬件与终端参考系统的 RISC-V AI 计算平台。",
    },
    region: { en: "China", zh: "中国" },
    focus: ["AI CPU", "SoC", "Software"],
  },
  {
    id: "openchip",
    name: "Openchip",
    mark: "OC",
    url: "https://openchip.com/",
    segment: "silicon-platforms",
    entityType: { en: "Semiconductor company", zh: "半导体企业" },
    summary: {
      en: "European company developing RISC-V-based SoCs, accelerators, and full-stack systems for AI and high-performance computing.",
      zh: "面向 AI 与高性能计算开发 RISC-V SoC、加速器及全栈系统的欧洲企业。",
    },
    region: { en: "Europe", zh: "欧洲" },
    focus: ["RISC-V", "AI", "HPC"],
  },
  {
    id: "synopsys",
    name: "Synopsys",
    mark: "SN",
    url: "https://www.synopsys.com/risc-v.html",
    segment: "design-enablement",
    entityType: { en: "EDA & IP company", zh: "EDA 与 IP 企业" },
    summary: {
      en: "Integrated RISC-V offering across processor IP, implementation, simulation, formal verification, virtual prototyping, and processor models.",
      zh: "提供覆盖处理器 IP、实现、仿真、形式验证、虚拟原型和处理器模型的 RISC-V 综合方案。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["EDA", "Verification", "Processor IP"],
  },
  {
    id: "cadence",
    name: "Cadence",
    mark: "CDN",
    url: "https://www.cadence.com/en_US/home/tools/silicon-solutions/compute-ip/tensilica-swerv-cpus.html",
    segment: "design-enablement",
    entityType: { en: "EDA & compute IP company", zh: "EDA 与计算 IP 企业" },
    summary: {
      en: "Commercial design and verification platform with Tensilica SweRV RISC-V CPU IP and processor-oriented simulation, emulation, and formal flows.",
      zh: "提供 Tensilica SweRV RISC-V CPU IP，以及面向处理器的仿真、硬件仿真和形式验证商业流程。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["EDA", "SweRV", "Formal"],
  },
  {
    id: "siemens-eda",
    name: "Siemens EDA",
    mark: "SE",
    url: "https://eda.sw.siemens.com/en-US/ic/questa/formal-verification/",
    segment: "design-enablement",
    entityType: { en: "EDA company", zh: "EDA 企业" },
    summary: {
      en: "Processor verification, simulation, emulation, formal analysis, and trace solutions including RISC-V-focused Questa and Tessent capabilities.",
      zh: "提供处理器验证、仿真、硬件仿真、形式分析与追踪方案，包括面向 RISC-V 的 Questa 和 Tessent 能力。",
    },
    region: { en: "Global", zh: "全球" },
    focus: ["Verification", "Formal", "Debug & Trace"],
  },
];
