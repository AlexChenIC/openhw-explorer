# CORE-V Verification

> core-v-verif 是 OpenHW CORE-V 家族共享的功能验证基础设施，是验证筛选维度的核心锚点。

数据核对日期: 2026-07-11

## Public summary

core-v-verif is the shared functional verification project for the CORE-V family of RISC-V cores. It provides common verification infrastructure, core-specific directories for CV32E40P/CV32E40X/CV32E40S/CVA6, documentation for verification strategy and DV plans, and Bender-based hardware dependency management.

## Key facts

- Scope: shared functional-verification project for the CORE-V family, not a single-core testbench
- Core-specific areas currently named by the README include CV32E40P, CV32E40X, CV32E40S, and CVA6
- Shared infrastructure includes simulation Makefiles, verification libraries, utilities, vendor components, DV plans, and coding guidelines
- Dependency management: the repository supports Bender and can be included as a dependency by projects such as cvfpu-uvm
- Starting point: the project README directs first-time users to the CORE-V-VERIF Quick Start Guide

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
