# CORE-V Verification

> core-v-verif 是 OpenHW CORE-V 家族共享的功能验证基础设施，是验证筛选维度的核心锚点。

数据核对日期: 2026-09-12

## Public summary

core-v-verif is shared functional-verification infrastructure for CORE-V processors. It combines reusable UVM components, simulation Makefiles, verification libraries, utilities, vendor dependencies, and DV plans, with dedicated directories for CV32E40P, CV32E40X, and CV32E40S. Verification engineers can start with the common methodology and then select a core-specific flow. For CVA6, use the verif directory in the CVA6 repository: the current core-v-verif tree does not contain a CVA6-specific directory, although CVA6-related environments can reuse its shared components.

## 中文介绍

core-v-verif 是 CORE-V 处理器共享的功能验证基础设施，汇集可复用 UVM 组件、仿真 Makefile、验证库、工具脚本、第三方依赖及 DV 计划，并设有 CV32E40P、CV32E40X、CV32E40S 的专用目录。验证工程师可以先了解共用方法，再选择对应核心的流程。验证 CVA6 应进入 CVA6 仓库自身的 verif 目录：当前 core-v-verif 源码树没有 CVA6 专用目录，但 CVA6 相关环境可以复用其中的共享组件。

## Key facts

- Scope: shared functional-verification project for the CORE-V family, not a single-core testbench
- Core environments: CV32E40P, CV32E40X, and CV32E40S directories; CVA6 verification lives in the CVA6 repository's verif directory
- Shared assets: simulation Makefiles, verification libraries, utilities, vendor components, DV plans, and coding guidelines
- Dependency management: supports Bender and can be consumed by projects such as cvfpu-uvm
- Entry path: the CORE-V-VERIF Quick Start Guide explains setup before users select a core-specific flow

## 中文核心事实

- 范围：CORE-V 家族共享的功能验证项目，并非单核心 testbench
- 核心环境：包含 CV32E40P、CV32E40X、CV32E40S 目录；CVA6 验证入口位于 CVA6 仓库的 verif 目录
- 共享资产：仿真 Makefile、验证库、工具、第三方组件、DV 计划和编码规范
- 依赖管理：支持 Bender，并可被 cvfpu-uvm 等项目作为依赖使用
- 入门路径：先完成 CORE-V-VERIF Quick Start Guide，再选择具体核心流程

## Further resources

- [CVA6 verification](https://github.com/openhwgroup/cva6/blob/master/verif/README.md) — CVA6-specific setup, tests, and simulation flows
- [CORE-V-VERIF documentation](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/) — verification strategy and project documentation
- [Quick Start Guide](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html) — official first-use workflow
- [SV/UVM coding guidelines](https://github.com/openhwgroup/core-v-verif/blob/master/docs/CodingStyleGuidelines.md) — repository contribution conventions
- [CORE-V core family](https://github.com/openhwgroup/core-v-cores) — cores served by the verification ecosystem

## 项目概述

core-v-verif 是 CORE-V 家族的共享功能验证项目。本次核查的完整文件树包含 `cv32e40p`、`cv32e40x`、`cv32e40s`，不包含 README 仍列出的 `cva6` 目录。CVA6 当前流程应查看自身仓库的 `verif/README.md`。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`；“industrial-grade”只作为项目目标/语境描述，不作为独立筛选类型。
- 这是多个 core README 指向的验证环境，尤其是 CV32E40P/CV32E40X/CV32E40S。
- 不应把它描述成只服务单个核心；它是 shared verification infrastructure。

## 主要来源

- https://github.com/openhwgroup/core-v-verif/tree/7238a436
- https://github.com/openhwgroup/cva6/blob/49b5fa9e/verif/README.md
- https://github.com/openhwgroup/core-v-verif
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
