# CVW Architectural Verification

> cvw-arch-verif 是 CVW/Wally 的架构测试与覆盖资料仓库，官方 README 已声明迁移到 riscv-arch-test，不应标为 formal verification。

数据核对日期: 2026-07-16

## Public summary

cvw-arch-verif is the former architectural-verification workspace for CORE-V Wally, containing test plans, covergroups, and directed tests for RVA22S64 and related RV32 extensions. The repository is deprecated and its tests, coverage material, and maintained framework have moved to riscv-arch-test. Use this code only for historical context or migration work; current architecture-testing work should start in the upstream RISC-V repository.

## 中文介绍

cvw-arch-verif 是 CORE-V Wally 早期使用的架构验证工作区，包含面向 RVA22S64 及相关 RV32 扩展的测试计划、covergroup 和定向测试。该仓库已经弃用，测试、覆盖率资料和继续维护的框架均已迁移到 riscv-arch-test。它目前主要适合查阅历史实现或处理迁移问题；新的架构测试工作应直接从上游 RISC-V 仓库开始。

## Key facts

- Status: deprecated repository retained for historical reference
- Successor: tests, coverage, and the maintained framework moved to riscv-non-isa/riscv-arch-test
- Original scope: architecture functional verification for CORE-V Wally
- Contents: test plans, covergroups, and directed tests for RVA22S64 and corresponding RV32 extensions
- Method boundary: architecture tests and functional coverage, not a formal-verification framework

## 中文核心事实

- 状态：已弃用，仅保留作历史参考
- 后继项目：测试、覆盖率和持续维护的框架已迁移至 riscv-non-isa/riscv-arch-test
- 原始范围：CORE-V Wally 的架构功能验证
- 内容：RVA22S64 及相应 RV32 扩展的测试计划、covergroup 和定向测试
- 方法边界：属于架构测试与功能覆盖率，不是形式验证框架

## Further resources

- [RISC-V architecture tests](https://github.com/riscv-non-isa/riscv-arch-test) — current home for the migrated work
- [CORE-V Wally](https://github.com/openhwgroup/cvw) — processor repository targeted by the original verification project
- [CVW test plan](https://github.com/openhwgroup/cvw/blob/main/docs/testplans/testplan.md) — current core-level verification planning material

## 项目概述

README 开头明确写明该 repository has been deprecated，tests、coverage 与 updated framework 已迁移到 `riscv-non-isa/riscv-arch-test`。原始 README 描述其用于 CORE-V Wally architectural verification，包含 testplans、covergroups 和 directed tests for RVA22S64 profile and corresponding RV32 extensions。

## 事实核查要点

- 分类建议为 `verification`，verification type 应为 `arch-compliance` / Architecture Tests。
- 不应归为 `formal-verification`；文档中主要是 architecture functional verification、testplans、coverage、directed tests。
- 详情页应提示 deprecated/migrated，避免引导用户把它当作新开发入口。

## 主要来源

- https://github.com/openhwgroup/cvw-arch-verif
- https://github.com/riscv-non-isa/riscv-arch-test
- https://github.com/openhwgroup/cvw
