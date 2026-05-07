# CVW Architectural Verification

> cvw-arch-verif 是 CVW/Wally 的架构测试与覆盖资料仓库，官方 README 已声明迁移到 riscv-arch-test，不应标为 formal verification。

数据核对日期: 2026-05-07

## Public summary

cvw-arch-verif is a deprecated architectural verification repository for CORE-V Wally. The README states that tests, coverage, and the updated framework have migrated to the RISC-V architecture test repository, so OpenHW Explorer classifies it as architecture tests rather than formal verification.

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
