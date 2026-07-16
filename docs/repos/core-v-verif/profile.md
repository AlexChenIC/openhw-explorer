# CORE-V Verification

> core-v-verif 是 OpenHW CORE-V 家族共享的功能验证基础设施，是验证筛选维度的核心锚点。

数据核对日期: 2026-07-16

## Public summary

core-v-verif is the shared functional-verification framework used across several CORE-V processors rather than a testbench for only one core. It combines reusable UVM infrastructure, simulation Makefiles, verification libraries, utilities, vendor dependencies, DV plans, and core-specific environments for processors including CV32E40P, CV32E40X, CV32E40S, and CVA6. Verification engineers should start here to understand common CORE-V methodology, then move into the target core's directory or dedicated DV repository for configuration-specific tests and coverage.

## 中文介绍

core-v-verif 是多个 CORE-V 处理器共享的功能验证框架，而不是只服务某一个核心的 testbench。它汇集可复用的 UVM 基础设施、仿真 Makefile、验证库、工具脚本、第三方依赖、DV 计划，以及 CV32E40P、CV32E40X、CV32E40S、CVA6 等核心的专用环境。验证工程师可以先从这里理解 CORE-V 的共用方法，再进入目标核心目录或独立 DV 仓库查看具体配置、测试和覆盖率。

## Key facts

- Scope: shared functional-verification project for the CORE-V family, not a single-core testbench
- Core environments: CV32E40P, CV32E40X, CV32E40S, and CVA6 areas are maintained in the repository
- Shared assets: simulation Makefiles, verification libraries, utilities, vendor components, DV plans, and coding guidelines
- Dependency management: supports Bender and can be consumed by projects such as cvfpu-uvm
- Entry path: the CORE-V-VERIF Quick Start Guide explains setup before users select a core-specific flow

## 中文核心事实

- 范围：CORE-V 家族共享的功能验证项目，并非单核心 testbench
- 核心环境：仓库维护 CV32E40P、CV32E40X、CV32E40S 和 CVA6 等专用区域
- 共享资产：仿真 Makefile、验证库、工具、第三方组件、DV 计划和编码规范
- 依赖管理：支持 Bender，并可被 cvfpu-uvm 等项目作为依赖使用
- 入门路径：先完成 CORE-V-VERIF Quick Start Guide，再选择具体核心流程

## Further resources

- [CORE-V-VERIF documentation](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/) — verification strategy and project documentation
- [Quick Start Guide](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html) — official first-use workflow
- [SV/UVM coding guidelines](https://github.com/openhwgroup/core-v-verif/blob/master/docs/CodingStyleGuidelines.md) — repository contribution conventions
- [CORE-V core family](https://github.com/openhwgroup/core-v-cores) — cores served by the verification ecosystem

## 项目概述

官方 README 将 core-v-verif 描述为 Functional verification project for the CORE-V family of RISC-V cores。仓库包含 `cv32e40p`、`cv32e40x`、`cv32e40s`、`cva6` 等 core-specific verification code，以及 docs、common Makefiles、libraries 和 utility scripts。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`；“industrial-grade”只作为项目目标/语境描述，不作为独立筛选类型。
- 这是多个 core README 指向的验证环境，尤其是 CV32E40P/CV32E40X/CV32E40S。
- 不应把它描述成只服务单个核心；它是 shared verification infrastructure。

## 主要来源

- https://github.com/openhwgroup/core-v-verif
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
