# CVA6

> CVA6 是 OpenHW 的 6-stage 应用级/嵌入式 CORE-V RISC-V 核心家族；官方资料同时存在“当前基线 single-issue”和“家族 single or dual-issue”的表述，需要在站内明确区分。

数据核对日期: 2026-07-16

## Public summary

CVA6 is a configurable six-stage, in-order CORE-V processor family spanning 32-bit and 64-bit embedded- and application-class configurations. The baseline implementation is single-issue and includes the privilege and virtual-memory features needed by Unix-like operating systems; the wider family roadmap also covers dual-issue configurations. This is the main OpenHW repository to study when evaluating Linux-capable RISC-V cores, custom extensions through CV-X-IF, FPGA prototypes, or application-class microarchitecture.

## 中文介绍

CVA6 是一套可配置的六级顺序执行 CORE-V 处理器家族，覆盖 32 位与 64 位、嵌入式与应用级配置。当前基线实现为单发射，并具备运行类 Unix 操作系统所需的特权级、地址转换与虚拟内存能力；更广泛的家族路线还包含双发射配置。若你正在评估可启动 Linux 的 RISC-V 核心、通过 CV-X-IF 集成自定义扩展、进行 FPGA 原型验证或研究应用级微架构，CVA6 是 OpenHW 中最值得优先深入的仓库之一。

## Key facts

- Baseline architecture: six-stage, single-issue, in-order RISC-V CPU with I, M, A, and C extensions
- System capability: M, S, and U privilege modes, separate TLBs, a hardware page-table walker, and branch prediction
- Family scope: CV32A60AX, CV32A60X, and CV64A60AX configurations; the family roadmap covers single- and dual-issue variants
- Readiness: CV32A60X v5.3 has achieved OpenHW TRL-5; readiness must be checked per configuration rather than assumed for the whole family
- Ecosystem: user manual, verification environment, FPGA APU, tutorials, CV-X-IF support, and a performance model for microarchitecture studies

## 中文核心事实

- 基线架构：六级、单发射、顺序执行，支持 RISC-V I、M、A、C 扩展
- 系统能力：支持 M/S/U 特权级、独立 TLB、硬件页表遍历和分支预测
- 家族范围：包含 CV32A60AX、CV32A60X、CV64A60AX 等配置，路线图覆盖单发射与双发射变体
- 成熟度：CV32A60X v5.3 已达到 OpenHW TRL-5，其他配置需要分别确认成熟度，不能以家族整体代替
- 配套资源：用户手册、验证环境、FPGA APU、教程、CV-X-IF 支持及微架构性能模型

## Further resources

- [CVA6 User Manual](https://docs.openhwgroup.org/projects/cva6-user-manual/) — official documentation on ReadTheDocs
- [CORE-V family roadmap & release table](https://github.com/openhwgroup/core-v-cores) — family configurations, TRL status, marchid assignments
- [CVA6 ecosystem resources (RESOURCES.md)](https://github.com/openhwgroup/cva6/blob/master/RESOURCES.md) — building blocks, designs, and partners gathered by the project
- [CVA6 Kanban board](https://github.com/orgs/openhwgroup/projects/3/views/7) — planned improvements tracked by the project
- [CVA6 SDK](https://github.com/openhwgroup/cva6-sdk) — build a bootable Linux image (toolchain, OpenSBI, U-Boot, kernel)
- [CVA6 dashboard (Thales CI)](https://riscv-ci.pages.thales-invia.fr/dashboard/dashboard_cva6.html) — continuous-integration status linked from the README badge
- [CVA6 Tier CI Dashboard](https://openhwgroup.github.io/cva6/) — latest status, coverage matrix, trends, and run history for the reference, Tier 1, and Tier 2 GitHub Actions workflows
- [Founding publication (Zaruba & Benini, IEEE TVLSI 2019)](https://doi.org/10.1109/TVLSI.2019.2926114) — the citation recommended by the repository

## 项目概述

CVA6 原名 Ariane，现由 OpenHW Group 维护。`cva6` 仓库 README 把该核心描述为 6-stage、single-issue、in-order 的 64-bit RISC-V CPU，支持 I/M/A/C、M/S/U privilege levels、TLB、hardware page-table walker 和 branch prediction。OpenHW 的 `core-v-cores` 路线资料则把 CVA6 描述为 6-stage、single or dual-issue、in-order 的核心家族，覆盖 RV32 和 RV64 配置。

## 事实核查要点

- 不应简单写成“CVA6 永远是 single-issue”：官方 CORE-V cores roadmap 明确使用 single or dual-issue 描述家族。
- 不应简单写成“所有 CVA6 配置都可启动 Linux”：GitHub repo description 更谨慎地说 application-class configurations are capable of booting Linux。
- 站内分类保留为 `core`，architecture class 同时使用 `embedded-mcu` 与 `linux-application`，对应官方 CORE-V family roadmap 的 embedded/application family configurations；这不表示每一种配置都支持 Linux，也不暗示乱序或超标量一定存在。

## 主要来源

- https://github.com/openhwgroup/cva6
- https://github.com/openhwgroup/core-v-cores
- https://docs.openhwgroup.org/projects/cva6-user-manual/
- https://openhwgroup.github.io/cva6/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
