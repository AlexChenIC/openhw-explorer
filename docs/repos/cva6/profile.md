# CVA6

> CVA6 是可配置的六级顺序执行 CORE-V 处理器家族；发射宽度、ISA、特权级与虚拟内存能力需要按具体配置确认。

数据核对日期: 2026-09-12

## Public summary

CVA6 is a configurable six-stage, in-order CORE-V processor family for 32-bit and 64-bit embedded and application-class systems. Its RTL includes both single-issue configurations, such as CV32A60X, and dual-issue configurations, such as CV32A65X. ISA extensions, privilege modes, and virtual memory depend on the selected configuration: application configurations can run Linux, while the embedded CV32A60X and CV32A65X configurations have no MMU or S/U modes. The repository brings together processor RTL, verification, FPGA integration, and documentation for engineers evaluating a core or exploring custom extensions through CV-X-IF.

## 中文介绍

CVA6 是可配置的六级顺序执行 CORE-V 处理器家族，覆盖 32 位与 64 位嵌入式及应用级系统。现有 RTL 已包含 CV32A60X 等单发射配置和 CV32A65X 等双发射配置。指令集扩展、特权级和虚拟内存能力取决于所选配置：应用级配置可运行 Linux，而嵌入式 CV32A60X、CV32A65X 配置不包含 MMU 或 S/U 模式。仓库汇集处理器 RTL、验证环境、FPGA 集成与文档，适合核心选型、微架构研究，以及通过 CV-X-IF 探索自定义扩展。

## Key facts

- Architecture: six-stage, in-order family; CV32A60X is single-issue and CV32A65X is dual-issue in the reviewed RTL
- Configuration boundary: ISA extensions, S/U privilege modes, MMU, TLBs, and page-table walking are configuration-dependent, not universal family features
- Embedded examples: CV32A60X and CV32A65X disable the MMU, S/U modes, and A extension; select an appropriate application configuration for Linux
- Readiness: CV32A60X v5.3 has achieved OpenHW TRL-5; readiness must be checked per configuration rather than assumed for the whole family
- Ecosystem: user manual, verification environment, FPGA APU, tutorials, CV-X-IF support, and a performance model for microarchitecture studies

## 中文核心事实

- 架构：六级顺序执行家族；本次核查的 RTL 中，CV32A60X 为单发射，CV32A65X 为双发射
- 配置边界：指令集扩展、S/U 特权级、MMU、TLB 和页表遍历能力均取决于配置，并非整个家族统一具备
- 嵌入式实例：CV32A60X、CV32A65X 均关闭 MMU、S/U 模式和 A 扩展；运行 Linux 需要选择相应的应用级配置
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

CVA6 源于 Ariane，现为 OpenHW 的可配置处理器家族。README 的单发射 64 位描述不能代替所有配置；参数文件中 CV32A60X 的 SuperscalarEn=0，CV32A65X 的 SuperscalarEn=1，派生参数 NrIssuePorts 分别为 1、2。两者均关闭 MMU、RVS、RVU 和 RVA，不应套用应用级配置的 Linux 能力。

## 事实核查要点

- 双发射已存在于配置源码，不应仅写为未来路线图；存在实现不等于达到与 CV32A60X v5.3 相同的 TRL。
- 不应简单写成“所有 CVA6 配置都可启动 Linux”：GitHub repo description 更谨慎地说 application-class configurations are capable of booting Linux。
- 站内分类保留为 `core`，architecture class 同时使用 `embedded-mcu` 与 `linux-application`，表达家族覆盖范围；不表示每种配置都支持 Linux，也不表示乱序执行。

## 主要来源

- https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/cv32a60x_config_pkg.sv
- https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/cv32a65x_config_pkg.sv
- https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/build_config_pkg.sv
- https://github.com/openhwgroup/cva6
- https://github.com/openhwgroup/core-v-cores
- https://docs.openhwgroup.org/projects/cva6-user-manual/
- https://openhwgroup.github.io/cva6/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
