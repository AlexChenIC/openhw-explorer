# CV32E40S Design Verification

> cv32e40s-dv 是 CV32E40S 的设计验证环境，包含 UVM testbench 目录和 formal verification 目录。

数据核对日期: 2026-09-12

## Public summary

cv32e40s-dv is the core-specific verification repository for the security-oriented CV32E40S processor. It organizes software test compilation, UVM infrastructure, simulation, top-level testbench code, test cases, and formal-verification work into separate areas. Engineers changing CV32E40S RTL can use it to locate the relevant dynamic or formal flow. The default branch received a Sail interrupt-generator and CLINT integration update in July 2026; this establishes recent maintenance, not complete verification coverage or a particular release maturity.

## 中文介绍

cv32e40s-dv 是安全型处理器 CV32E40S 的专用验证仓库。它将测试软件编译、UVM 基础设施、仿真、顶层 testbench、测试用例和形式验证分别组织在独立目录中，方便修改 RTL 的工程师找到对应流程。默认分支在 2026 年 7 月合入了 Sail 中断生成器与 CLINT 集成更新，说明存在近期维护，但不代表已完成所有验证或达到特定发布成熟度。

## Key facts

- Target: design-verification environment for the CV32E40S core
- BSP: compiles, assembles, and links test programs for the core and UVM environment
- UVM structure: environment class and supporting infrastructure live under env
- Flow separation: simulation, testbench, test cases, and formal work have dedicated directories
- Maintenance evidence: a July 27, 2026 default-branch merge integrates the Sail interrupt generator and CLINT mtime/mtimecmp support; activity does not establish verification completeness

## 中文核心事实

- 目标：CV32E40S 核心的设计验证环境
- BSP：负责为核心与 UVM 环境编译、汇编和链接测试程序
- UVM 结构：environment class 及配套基础设施位于 env 目录
- 流程划分：仿真、testbench、测试用例和形式验证分别位于独立目录
- 维护依据：2026 年 7 月 27 日默认分支合入 Sail 中断生成器及 CLINT mtime/mtimecmp 支持；维护活动不等于验证覆盖完整

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
- 移除基于 2024 年旧快照的 inactive 判断；DV 仓库近期维护、核心官方项目状态及发布成熟度应分别表达。

## 主要来源

- https://github.com/openhwgroup/cv32e40s-dv/commit/8b27b963ef08badfa350b4207a45e2c2cadb3001
- https://github.com/openhwgroup/cv32e40s-dv
- https://github.com/openhwgroup/cv32e40s
- https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/
