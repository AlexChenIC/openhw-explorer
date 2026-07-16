# CV32E40S Design Verification

> cv32e40s-dv 是 CV32E40S 的设计验证环境，包含 UVM testbench 目录和 formal verification 目录。

数据核对日期: 2026-07-16

## Public summary

cv32e40s-dv is the core-specific verification repository for the security-oriented CV32E40S processor. It organizes software test compilation, UVM infrastructure, simulation, top-level testbench code, test cases, and formal-verification work into separate areas. Engineers changing CV32E40S RTL can use it to locate the relevant dynamic or formal flow, while noting that the repository is currently treated as inactive rather than an actively evolving DV baseline.

## 中文介绍

cv32e40s-dv 是安全型处理器 CV32E40S 的专用验证仓库。它将测试软件编译、UVM 基础设施、仿真、顶层 testbench、测试用例和形式验证分别组织在独立目录中。修改 CV32E40S RTL 的工程师可以在这里找到对应的动态或形式验证流程，但该仓库当前应视为非活跃维护状态，而不是持续演进的 DV 基线。

## Key facts

- Target: design-verification environment for the CV32E40S core
- BSP: compiles, assembles, and links test programs for the core and UVM environment
- UVM structure: environment class and supporting infrastructure live under env
- Flow separation: simulation, testbench, test cases, and formal work have dedicated directories
- Maintenance context: the latest recorded push is from November 2024 and the site classifies the project as inactive

## 中文核心事实

- 目标：CV32E40S 核心的设计验证环境
- BSP：负责为核心与 UVM 环境编译、汇编和链接测试程序
- UVM 结构：environment class 及配套基础设施位于 env 目录
- 流程划分：仿真、testbench、测试用例和形式验证分别位于独立目录
- 维护状态：最近记录的推送时间为 2024 年 11 月，本站将其标为非活跃

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
