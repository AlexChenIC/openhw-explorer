Release context (2026-10-18): publication authorized by Alex. The following October-15 production record is retained as historical evidence; individual detailed/full-listening approvals were not separately attested. See ../publication-authorization.json.

# 概览架构 v2：来源与结论台账

核验日：2026-10-13，Asia/Shanghai。用于整课架构与第2步教学主稿；逐页内容待用户技术/编辑审阅，图形成品、字幕和许可仍需后续核验。所有“已核验”表示读取一手来源，不表示独立运行硬件/软件实验。

本轮通过GitHub API重新确认CVA6默认master为81245a47fad8fe1a5d562d953ef2662e099def76（提交2026-09-15）。它与旧课技术快照相同，不能据此跳过整课内容和视觉优化。另行确认具名TRL5发布与独立软件/系统项目版本。

## 来源目录

| ID | 来源与固定定位 | 可支持的范围 |
| --- | --- | --- |
| S01 | [CVA6 Introduction](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/01_cva6_user/Introduction.rst)，CVA6 Overview、Configurations、Scope of the IP；另读[发布文档页面](https://docs.openhwgroup.org/projects/cva6-user-manual/01_cva6_user/Introduction.html) | RV32/RV64共用源码，可选能力、ASIC/FPGA、Ariane来源与IP/外围边界；文档明确WIP，配置表部分内容与具名release分开 |
| S02 | [CVA6 README](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/README.md)，L3–5、L65–77、Directory Structure | 历史六级基线、教程与核心/APU目录边界。L3的64位单发射描述不能定义全部当前配置 |
| S03 | [OpenHW项目目录](https://openhwfoundation.org/projects/)的CVA6项；[OpenHW Charter v1.1](https://www.eclipse.org/collaborations/working-groups/openhw-foundation/charter/)，Vision and Scope、Governance and Precedence | 社区/组织定位、可配置应用与嵌入式IP方向；不继承目录宣传语作为所有配置的验证证明 |
| S04 | [CVA6 SDK](https://github.com/openhwfoundation/cva6-sdk/blob/267794dfa2e217461719511297f6a57a4e7eb939/README.md)，L6、L22–32、L56–58、Boot procedure；master提交2026-08-27 | Genesys2/Agilex7与列出的RV32/Sv32、RV64/Sv39目标，Linux工具链/固件/设备树/内核组成；不推广到任意板卡/配置 |
| S05 | [Cheshire README](https://github.com/pulp-platform/cheshire/blob/292d2c091ffed3e194b0f437b5b3460813905e26/README.md)，开头/Quick Start；main提交2026-10-02 | PULP维护的Linux-capable CVA6 host platform，可作为SoC和加速器主机集成入口；不是CVA6核本身 |
| S06 | [Occamy README](https://github.com/pulp-platform/occamy/blob/d5d0d8320bb633c36319e5477006d4c17cf0e448/README.md)，L6；main提交2024-09-02 | CVA6 Linux管理核与Snitch many-core加速器角色，不能把加速器核数当CVA6核数 |
| S07 | CVA6固定快照下[CV32A60X](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv32a60x_config_pkg.sv)、[CV32A65X](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv32a65x_config_pkg.sv)、[RV64/Sv39](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv64a6_imafdc_sv39_config_pkg.sv)及[build_config](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/build_config_pkg.sv#L48-L51) | 位宽、MMU/特权、A/F/D、PMP条目和派生发射/提交宽度；代码能力配置不等于全验证、性能或软件启动证明 |
| S08 | [cv32a60x-v6.0.0 release](https://github.com/openhwfoundation/cva6/releases/tag/cv32a60x-v6.0.0)，发布正文，2025-04-23T13:49:12Z，tag提交b1f80bd7cff3a94e5191aad96dc3a22f87d0a517 | 具名CV32A60X TRL5配置、OBI、无缓存/无PMP条目/关闭Zifencei等范围；发布方声明，不扩到全家族 |
| S09 | [Architecture and Modules](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/design/design-manual/source/architecture.adoc)，L19–33 | FRONTEND/DECODE/ISSUE/EXECUTE/COMMIT/CONTROLLER/CACHES/CSRFILE职责图；不要照搬模板变量或无配置的面积/频率数字 |
| S10 | [Issue stage](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/03_cva6_design/issue_stage.md)，L3–12、L18–21、L42–59、L82–91 | 发射、操作数/资源就绪、记分牌与load/add完成次序的概念例；早期基线文档，复杂配置条件需逐例核对 |
| S11 | [Commit stage](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/03_cva6_design/commit_stage.rst)，L4–19、L21–39 | 提交/退休与架构状态、异常的职责；不以该老文档推导所有配置的周期/宽度 |
| S12 | [RV32I v2.1，20260120 library](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html)，Integer Register-Register Instructions、Load and Store Instructions | load/store与寄存器运算的ISA语义；不是CVA6具体微架构或性能证明 |
| S13 | [RISC-V Machine-Level ISA v1.13](https://docs.riscv.org/reference/isa/v20260120/priv/machine.html#pmp)，Physical Memory Protection；[CVA6参数描述](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/01_cva6_user/user_cfg_doc.rst)，NrPMPEntries、MmuPresent、DCacheType等 | PMP物理地址范围权限控制；CVA6实际条目、缓存/MMU是否配置另看S07，不混用标准最大值和实例值 |
| S14 | [RISC-V Supervisor-Level ISA v1.13](https://docs.riscv.org/reference/isa/v20260120/priv/supervisor.html#satp)，satp、Sv32、Sv39 | 页式地址转换/权限的基础概念。第2步经Jina Reader解析v20260120固定URL并读取satp/Sv32/Sv39正文；仍需最终浏览器链接检查 |
| S15 | S01的Scope of IP + S02的Directory Structure + S04的Boot procedure | 核IP、APU/SoC集成、外围中断/调试与固件/OS分工。Core_Integration.rst仍为待编写，不能作为完整指南证据 |
| S16 | [CVA6 verif README](https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/verif/README.md)，L10–16、L20–32、L34–43 | BSP/仿真/测试/回归、verification plan与选定目标/仿真工具；配置/工具/计划范围明确，不承诺全覆盖 |
| S17 | [Basilisk官方项目页](https://iis-people.ee.ethz.ch/~phsauter/basilisk/)，Introduction、GDS Viewer、silicon measurements、Linux boot demo；读取2026-10-13 | CVA6/Cheshire的Linux-capable开放硅实现与项目测量报告；不转移性能/鉴定到别的实现 |
| S18 | 当前读取PR：[3178](https://github.com/openhwfoundation/cva6/pull/3178)、[3057](https://github.com/openhwfoundation/cva6/pull/3057)、[3188](https://github.com/openhwfoundation/cva6/pull/3188)、[3285](https://github.com/openhwfoundation/cva6/pull/3285)、[3373](https://github.com/openhwfoundation/cva6/pull/3373)，标题、正文、merge日期/目标/提交 | 这些已合入master的工作分别涉及Zicbom/HPDCache、大端、推测load、选定配置TierCI与结果处理；收益/支持范围必须逐实现限定 |
| S19 | [CVA6 Roadmap](https://github.com/openhwfoundation/cva6/wiki/CVA6-Roadmap)，wiki commit d14de53a48b60f568a1f932efe57ffb529074d07，2026-07-15；对应各标题 | 带日期的规划：软件profile、缓存/计算、可靠性/验证/平台；不能当成10月已交付状态或新deadline |
| S20 | S01 Contributing入口、S02 Tutorials、S04 Quickstart、S16验证入口及[S19](https://github.com/openhwfoundation/cva6/wiki/CVA6-Roadmap) | 架构/系统/验证的进一步阅读与公开贡献方向；本课不自动执行命令或联系社区 |

## 关键结论台账

| Claim | 本课拟使用的结论 | 来源 / 定位 | 状态 / 限定 |
| --- | --- | --- | --- |
| C01 | CVA6是可配置RISC-V核家族，RV32与RV64共用SystemVerilog源码 | S01 / Overview | verified-current；功能按配置 |
| C02 | CV64A6来源于Ariane，RV32为后续发展；当前OpenHW社区维护 | S01 / Overview，S03 / CVA6 | verified-current；只作简短来源背景 |
| C03 | ASIC/FPGA是可用集成方向，CVA6核与APU/SoC不是同一个对象 | S01 / Overview，S02 / Directory Structure | qualified；平台构建不代表所有目标验证完成 |
| C04 | 同一核家族可用于控制与应用类系统，Linux/加速管理有具体平台实例 | S01、S04、S05、S06 | qualified；任务/配置/平台匹配 |
| C05 | 位宽、MMU/PMP、FPU、缓存与CV-X-IF等属于可配置维度 | S01 / Overview，S07及S13参数说明 | qualified；不是任意组合保证可用 |
| C06 | 固定master快照有单/双发射例；端口数不等于实测IPC | S07 / SuperscalarEn，build_config L48–51 | qualified；源码端口派生和性能实验分开 |
| C07 | 六级流水可作为基线背景，总体图优先表达功能职责 | S02、S09、S07 | qualified；不把README老单发射段作为全部家族定义 |
| C08 | 前端、译码、发射、执行、提交、控制及CSR/缓存有不同职责 | S09 / L23–33 | qualified；画重绘职责图，不声称周期精确 |
| C09 | load读内存、ADD计算寄存器；数据依赖影响后续执行 | S12相应节；S10 / ready operands | verified-current ISA + qualified implementation example |
| C10 | 完成返回与更新架构状态是不同事件 | S10 L42–59/L89–91，S11 L4–19 | qualified；特定示例，不泛称乱序核心 |
| C11 | MMU地址转换、PMP物理权限、缓存组织承担不同职责 | S13、S14、S01、S07 | qualified；最终图的具体顺序/接口继续核验 |
| C12 | 能运行Linux需要硬件平台和匹配的软件/启动组成 | S04 L32/Compatibility/Boot procedure，S05 | qualified；不依位宽单独推导 |
| C13 | 公开SDK测试对象包含RV32/Sv32与RV64/Sv39具名配置 | S04 L56–58 | verified-current-at-pinned-commit；不排除RV32 Linux |
| C14 | 核外中断模块、调试模块和平台资产需在系统边界内考虑 | S01 / Scope，S02 / Directory Structure | qualified；选定系统边界 |
| C15 | 验证需要测试、仿真/参考、覆盖计划和目标/工具上下文 | S16各节 | qualified；没有本轮运行结果 |
| C16 | cv32a60x-v6.0.0明确限一个TRL5配置 | S08正文 | qualified publisher statement；不扩全家族/安全认证 |
| C17 | 该发布包含OBI、无cache/PMP entries和关闭Zifencei等边界 | S08 / Major changes | verified-historical-release；和master参数分开 |
| C18 | Basilisk提供CVA6/Cheshire Linux硅实现的项目证据 | S17 / overview/results/demo | qualified author report；未独立复现 |
| C19 | Occamy的CVA6为管理核，many-core加速使用Snitch | S06 L6 | qualified system role；不转载核数或性能数字 |
| C20 | 多类已合入工程工作体现系统集成/软件兼容/执行效率/回归需求 | S18 PR标题/merge元数据/正文 | verified-current metadata + qualified behavior；全文机制留专题 |
| C21 | Roadmap描述团队计划，当前查到的版本为2026-07-15 | S19 intro及git commit | verified-historical-plan；不是已发布功能清单 |
| C22 | 课程可提供架构、平台软件和验证的官方继续阅读路径 | S20 | verified-current links/context；逐页冻结前开链接复查 |

## 冲突与不采用的结论

- “所有CVA6均64位单发射”：与S01/S07不符，不采用。README旧基线保留其语境。
- “名字含64就能直接运行Linux”：S04明确测试配置/板卡与启动资产，不采用。
- “20个目标等于20个已完整验证配置”：没有对应统一验证证据，不采用此表达，不将计数作为课程重点。
- “TRL5证明全家族或新缓存变体已认证”：S08明确限配置，不采用。
- “发生在2026年的功能都已进入全部配置”：S18涉及具体flag/配置/平台，不采用。
- “路线图内容在当前检索日已经实现”：S19是带源版本日期的规划，不采用。
- “Core Integration文档代表完整可用教程”：该章是待编写骨架，不采用。

## 原件与素材边界

用户PPTX/PDF用于研究和视觉参考，原文件未修改；正文抽取与公共来源全文只放临时研究缓存。课程仓库仅提交派生架构、定位、来源元数据与哈希，不提交原始会议稿或公司资料。

原图、品牌标识、截图、视频/硅照片是否可再分发须逐资产确认。当前计划优先原创重绘技术示意，不把生成图当作实际硅片/测试证据。网页出图附件选择和传输确认留到正式请求阶段。

读取工具：agent-reach推荐的gh/Jina路线；本机Exa MCP未配置、Jina roadmap读取403，改用GitHub API、官方网页检索和只读wiki克隆。没有模拟获取成功。agent-reach版本检查为v1.5.0最新；没有升级环境。

## 第2步补充核验与定位

- 2026-10-13用户批准14页架构并授权第2步；逐页内容与测验审批仍待完成。
- 每场景scenes/s01–s14.json的source_anchors把具体教学表达绑定到来源、章节或字段；source-index.json给出可直接使用的URL，不能只保留仓库首页。
- 重新核对19份固定公共源码缓存的SHA256与RESEARCH-RECEIPT一致，三组配置探索数值逐项对照源码字段；不意味着重新运行RTL、Linux或性能实验。
- RISC-V v20260120的machine/supervisor页面已通过agent-reach的Jina路线读取，验证标题Version 1.13及#pmp、#satp、#sv32、#sv39定位。web工具直开这两页仍报错，不能把这一限制隐去；读者浏览器可用性留最终冻结检查。
- s06的12、3和15是课程原创假设与算术结果，不是硬件测量；概念事件参考文档中的单发射基线，没有固定周期或全配置保证。
- 标准用于解释ISA、地址转换和保护概念，不据较新标准版本宣称当前CVA6任意配置已经完整符合该标准。PMP条目数8是源码实例值，不是标准允许数量的通用教学结论。
