export type PdkDetail = {
  checkedAt: string;
  contents: { en: string; zh: string };
  license: { en: string; zh: string };
  tools: { en: string; zh: string };
  manufacturing: { en: string; zh: string };
  sources: { title: string; url: string }[];
};

export const pdkDetails: Record<string, PdkDetail> = {
  "skywater-sky130": {
    checkedAt: "2026-09-13",
    contents: { en: "Process documentation, device models, standard-cell and I/O libraries.", zh: "工艺文档、器件模型、标准单元与 I/O 库。" },
    license: { en: "Apache-2.0; retain notices in the individual libraries.", zh: "Apache-2.0；须保留各子库的版权与许可声明。" },
    tools: { en: "Raw foundry files need tool-specific setup; open_pdks prepares installations for open-source flows.", zh: "原始工艺文件需要适配具体工具；open_pdks 提供开源流程所需的安装整理。" },
    manufacturing: { en: "Based on a manufactured process, but this public release is experimental, not production-qualified. Confirm current fabrication access with a shuttle or foundry.", zh: "来源工艺已有制造记录，但公开版本为实验性发布，并非生产认证。当前制造服务需向流片平台或晶圆厂确认。" },
    sources: [{ title: "SKY130 repository", url: "https://github.com/google/skywater-pdk" }, { title: "open_pdks", url: "https://github.com/RTimothyEdwards/open_pdks" }],
  },
  "globalfoundries-gf180mcu": {
    checkedAt: "2026-09-13",
    contents: { en: "180 nm MCU process documentation, device models and libraries supplied through submodules.", zh: "180 nm MCU 工艺文档、器件模型及通过子模块提供的单元库。" },
    license: { en: "Apache-2.0; check the notices in each downloaded submodule.", zh: "Apache-2.0；下载子模块后还应核对其中的声明。" },
    tools: { en: "Tool setup is separate from the raw PDK; open_pdks includes a GF180MCU installation target.", zh: "工具环境与原始 PDK 分开配置；open_pdks 提供 GF180MCU 安装目标。" },
    manufacturing: { en: "Foundry-derived experimental public release. Availability and acceptance of a design must be confirmed with a fabrication provider.", zh: "源自晶圆厂工艺的实验性公开版本。制造服务是否开放、是否接收具体设计，需向服务方确认。" },
    sources: [{ title: "GF180MCU repository", url: "https://github.com/google/gf180mcu-pdk" }, { title: "open_pdks", url: "https://github.com/RTimothyEdwards/open_pdks" }],
  },
  "ihp-sg13g2": {
    checkedAt: "2026-09-13",
    contents: { en: "BiCMOS device models, standard-cell, I/O and SRAM views, layout rules and tool data.", zh: "BiCMOS 器件模型、标准单元、I/O 与 SRAM 视图，以及版图规则和工具配置。" },
    license: { en: "Apache-2.0.", zh: "Apache-2.0。" },
    tools: { en: "Upstream lists KLayout, Magic, ngspice, Xyce, xschem and digital flows; tested versions are recorded in versions.txt.", zh: "上游列出 KLayout、Magic、ngspice、Xyce、xschem 及数字流程；已测试版本见 versions.txt。" },
    manufacturing: { en: "Targets IHP SG13G2. The public PDK is still labelled preview, not intended for production; confirm design acceptance and MPW access with IHP.", zh: "对应 IHP SG13G2 工艺。公开 PDK 仍标为预览版、不面向生产；设计接收标准与 MPW 服务需向 IHP 确认。" },
    sources: [{ title: "IHP PDK and tested tool versions", url: "https://github.com/IHP-GmbH/IHP-Open-PDK" }],
  },
  "icsprout55": {
    checkedAt: "2026-09-13",
    contents: { en: "Published IP/library and technology LEF files. RAM, DRC/LVS, SPICE and other deliverables remain on the README TODO list.", zh: "已公开 IP/单元库及技术 LEF 文件；RAM、DRC/LVS、SPICE 等资料仍列在 README 待办清单中。" },
    license: { en: "Apache-2.0.", zh: "Apache-2.0。" },
    tools: { en: "Release archives are fetched with make unzip. A complete, version-tested public sign-off flow is not established by the README.", zh: "通过 make unzip 获取发布压缩包；README 尚不足以证明已有完整、按版本验证的公开签核流程。" },
    manufacturing: { en: "The project identifies an ICsprout 55 nm process. Public files alone do not establish a currently bookable shuttle or production-ready kit.", zh: "项目对应 ICsprout 55 nm 工艺；仅凭公开文件不能确认已有可预订流片服务或生产就绪套件。" },
    sources: [{ title: "ICsprout55 scope and TODO", url: "https://github.com/openecos-projects/icsprout55-pdk" }],
  },
  "freepdk45": {
    checkedAt: "2026-09-13",
    contents: { en: "Predictive 45 nm devices, design rules and reference implementation material.", zh: "预测型 45 nm 器件、设计规则与参考实现资料。" },
    license: { en: "Use the distribution's licenses; the SVRF rule decks have a separate EULA.", zh: "按发行包各项许可使用；SVRF 规则文件另有 EULA。" },
    tools: { en: "Documented flows include commercial Cadence, Calibre and HSPICE tools; an open PDK does not make those tools free.", zh: "文档流程涉及 Cadence、Calibre、HSPICE 等商业工具；PDK 公开不意味着这些工具免费。" },
    manufacturing: { en: "Predictive academic kit, not a foundry manufacturing process.", zh: "面向教学研究的预测型套件，不对应可制造的晶圆厂工艺。" },
    sources: [{ title: "NC State FreePDK45 documentation and licenses", url: "https://eda.ncsu.edu/freepdk/freepdk45/" }],
  },
  "asap7": {
    checkedAt: "2026-09-13",
    contents: { en: "Predictive 7 nm FinFET PDK and standard-cell libraries.", zh: "预测型 7 nm FinFET PDK 与标准单元库。" },
    license: { en: "PDK and libraries: BSD-3-Clause. Calibre decks are distributed separately; review their download terms.", zh: "PDK 与单元库采用 BSD-3-Clause；Calibre 规则文件单独分发，需另核下载条款。" },
    tools: { en: "OpenROAD digital flows are available. Full custom/sign-off examples may require commercial tools and separately downloaded Calibre decks.", zh: "可用于 OpenROAD 数字流程；全定制或签核示例可能需要商业工具及单独下载的 Calibre 规则文件。" },
    manufacturing: { en: "Predictive research technology, not a tape-out service.", zh: "预测型研究工艺，并非流片服务。" },
    sources: [{ title: "ASAP7 distribution and exclusions", url: "https://github.com/The-OpenROAD-Project/asap7" }],
  },
  "pkp3": {
    checkedAt: "2026-09-13",
    contents: { en: "Predictive 3 nm GAA models, PCells, rule decks, standard cells and SRAM examples.", zh: "预测型 3 nm GAA 模型、参数化单元、规则文件、标准单元及 SRAM 示例。" },
    license: { en: "The project specifies academic/research use. Check the downloaded package's terms before redistribution or commercial use.", zh: "项目明确面向学术研究；再分发或商业使用前须核对下载包的具体条款。" },
    tools: { en: "Cadence Virtuoso technology files and Calibre decks; version 1.1 adds StarRC extraction assets. These are commercial tools.", zh: "提供 Cadence Virtuoso 技术文件及 Calibre 规则；1.1 版增加 StarRC 提取资料。这些工具本身为商业软件。" },
    manufacturing: { en: "The project explicitly states designs are not manufacturable at any foundry.", zh: "项目明确说明，基于该预测型 PDK 的设计不可在晶圆厂制造。" },
    sources: [{ title: "PKP3 scope, versions and restrictions", url: "https://pkp.pkueda.org.cn/" }],
  },
  "openrpdk28": {
    checkedAt: "2026-09-13",
    contents: { en: "Academic 28 nm process template and research material; the project is marked under construction.", zh: "学术型 28 nm 工艺模板及研究资料，项目仍标为建设中。" },
    license: { en: "Repository license: MIT. Third-party material keeps its own terms.", zh: "仓库许可为 MIT；第三方资料仍遵循其各自条款。" },
    tools: { en: "Contains research and OpenLane-related directories; this is not evidence of a complete qualified sign-off flow.", zh: "包含研究与 OpenLane 相关目录，但不等于具备完整且经认证的签核流程。" },
    manufacturing: { en: "No qualified manufacturing or bookable MPW service established by this repository.", zh: "该仓库未证明已有认证制造流程或可预订 MPW 服务。" },
    sources: [{ title: "OpenRPDK28 current repository", url: "https://github.com/RIOSLaboratory/OpenRPDK28" }],
  },
};
