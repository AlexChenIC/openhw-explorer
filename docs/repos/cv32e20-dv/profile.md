# CV32E20 Design Verification

> cv32e20-dv 是 CV32E20/CVE2 的专用设计验证环境，包含 CV32E20-specific SV、C 与 assembly tests。

数据核对日期: 2026-07-16

## Public summary

cv32e20-dv is the core-specific design-verification environment for CV32E20/CVE2. It adds the SystemVerilog environment, board-support package, testbench, and C or assembly test programs that are specific to this small two-stage core, while reusing common agents and infrastructure from core-v-verif. Engineers working on CVE2 should use this repository for target-specific tests and use the shared CORE-V-VERIF guide for initial tool and environment setup.

## 中文介绍

cv32e20-dv 是 CV32E20/CVE2 的专用设计验证环境。它包含针对这款两级流水小核心的 SystemVerilog environment、BSP、testbench，以及 C 或汇编测试程序，同时复用 core-v-verif 中的通用 agent 和基础设施。参与 CVE2 开发的工程师应在这里处理核心专用测试，并通过共享的 CORE-V-VERIF 指南完成工具与环境的初始配置。

## Key facts

- Target: core-specific design-verification environment for CV32E20/CVE2
- Sources: CV32E20-specific SystemVerilog plus C and assembly test programs
- Structure: BSP, UVM environment, simulation area, testbench, and test cases
- Shared components: agents such as the OBI agent are consumed from the vendored core-v-verif library
- Setup path: common tool and environment preparation follows the CORE-V-VERIF Quick Start Guide

## 中文核心事实

- 目标：CV32E20/CVE2 的核心专用设计验证环境
- 源码：CV32E20 专用 SystemVerilog，以及 C 和汇编测试程序
- 结构：BSP、UVM environment、仿真目录、testbench 和测试用例
- 共享组件：OBI agent 等来自 vendored core-v-verif 库
- 配置路径：通用工具与环境准备遵循 CORE-V-VERIF Quick Start Guide

## Further resources

- [CVE2 repository](https://github.com/openhwgroup/cve2) — CV32E20 RTL under verification
- [CVE2 User Manual](https://docs.openhwgroup.org/projects/cve2-user-manual/en/latest/) — official core documentation
- [CORE-V-VERIF Quick Start Guide](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html) — setup guidance referenced by the repository
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — source of shared verification components

## 项目概述

README 标题为 Verification Environment for the CV32E20 CORE-V processor core。目录说明包括 `bsp`、`env`、`mk`、`sim`、`tb`、`tests` 与 `vendor_lib`。Getting Started 指向 core-v-verif 的 Quick Start Guide。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 这是 CV32E20/CVE2 的 DV 环境，不应标为 general OpenHW verification platform。
- 可与 `cve2` 和 `core-v-verif` 建立强关联。

## 主要来源

- https://github.com/openhwgroup/cv32e20-dv
- https://github.com/openhwgroup/cve2
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html
