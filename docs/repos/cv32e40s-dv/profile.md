# CV32E40S Design Verification

> cv32e40s-dv 是 CV32E40S 的设计验证环境，包含 UVM testbench 目录和 formal verification 目录。

数据核对日期: 2026-07-16

## Public summary

cv32e40s-dv is the design-verification environment for the CV32E40S core. Its README lists BSP, UVM environment, simulation, testbench, tests, and an `fv` directory for formal verification work.

## Key facts

- Target: design-verification environment for the CV32E40S core
- The BSP compiles, assembles, and links test programs for the core and UVM environment
- The `env` directory contains the UVM environment class and associated infrastructure
- The repository separates simulation, testbench, and test-case directories
- Formal verification is explicitly run from the `fv` directory
- Maintenance context: GitHub's latest push is from November 2024, so OpenHW Explorer marks this repository inactive rather than implying current development

## Further resources

- [CV32E40S repository](https://github.com/openhwgroup/cv32e40s) — RTL under verification
- [CV32E40S User Manual](https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/) — official core documentation
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared verification infrastructure

## 项目概述

README 简明说明该仓库是 CV32E40S Design-Verification environment。目录包括 `bsp`、`env`、`sim`、`fv`、`tb` 与 `tests`，其中 `bsp` 用于 test-program compilation/linking，`env` 是 UVM environment class and infrastructure。

## 事实核查要点

- 站内主分类建议为 `verification`，主 verification type 保留 `uvm-testbench`；可以在详情中说明存在 `fv` formal verification 目录。
- 关联核心为 `cv32e40s`。
- 不应把这个 repo 说成 CV32E40S RTL 本体。
- 站内状态使用 `inactive`；CV32E40S 核心本身仍按 OpenHW 官方项目表保留 active development，两者不混为一谈。

## 主要来源

- https://github.com/openhwgroup/cv32e40s-dv
- https://github.com/openhwgroup/cv32e40s
- https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/
