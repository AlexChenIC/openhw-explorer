# CVA6

> CVA6 是 OpenHW 的 6-stage 应用级/嵌入式 CORE-V RISC-V 核心家族；官方资料同时存在“当前基线 single-issue”和“家族 single or dual-issue”的表述，需要在站内明确区分。

数据核对日期: 2026-07-11

## Public summary

CVA6 is a configurable 6-stage CORE-V RISC-V core family for application-class and embedded-class use. The cva6 repository README describes the current baseline CPU as 6-stage, single-issue, and in-order, while the OpenHW CORE-V cores roadmap describes the broader CVA6 family as single- or dual-issue; application-class configurations are Linux-capable.

## Key facts

- ISA: 64-bit RISC-V with full I, M, A, and C extensions (User-Level ISA V 2.3), per the repository README
- Pipeline: 6-stage, single-issue, in-order baseline; the CORE-V family roadmap describes single- or dual-issue family configurations
- Privilege levels: M, S, and U — sufficient to run a Unix-like operating system
- Memory system: configurable size, separate TLBs, hardware page-table walker, and branch prediction (BTB, branch history table, and return-address stack)
- Family configurations include CV32A60AX, CV32A60X, and CV64A60AX; CV32A60X v5.3 has achieved TRL-5 per the official CORE-V table
- Origin: started as Ariane at ETH Zürich (PULP platform), contributed to OpenHW
- A performance model lives in the repository's perf-model/ folder for micro-architecture studies

## Further resources

- [CVA6 User Manual](https://docs.openhwgroup.org/projects/cva6-user-manual/) — official documentation on ReadTheDocs
- [CORE-V family roadmap & release table](https://github.com/openhwgroup/core-v-cores) — family configurations, TRL status, marchid assignments
- [CVA6 ecosystem resources (RESOURCES.md)](https://github.com/openhwgroup/cva6/blob/master/RESOURCES.md) — building blocks, designs, and partners gathered by the project
- [CVA6 Kanban board](https://github.com/orgs/openhwgroup/projects/3/views/7) — planned improvements tracked by the project
- [CVA6 SDK](https://github.com/openhwgroup/cva6-sdk) — build a bootable Linux image (toolchain, OpenSBI, U-Boot, kernel)
- [CVA6 dashboard (Thales CI)](https://riscv-ci.pages.thales-invia.fr/dashboard/dashboard_cva6.html) — continuous-integration status linked from the README badge
- [Founding publication (Zaruba & Benini, IEEE TVLSI 2019)](https://doi.org/10.1109/TVLSI.2019.2926114) — the citation recommended by the repository

## 项目概述

CVA6 原名 Ariane，现由 OpenHW Group 维护。`cva6` 仓库 README 把该核心描述为 6-stage、single-issue、in-order 的 64-bit RISC-V CPU，支持 I/M/A/C、M/S/U privilege levels、TLB、hardware page-table walker 和 branch prediction。OpenHW 的 `core-v-cores` 路线资料则把 CVA6 描述为 6-stage、single or dual-issue、in-order 的核心家族，覆盖 RV32 和 RV64 配置。

## 事实核查要点

- 不应简单写成“CVA6 永远是 single-issue”：官方 CORE-V cores roadmap 明确使用 single or dual-issue 描述家族。
- 不应简单写成“所有 CVA6 配置都可启动 Linux”：GitHub repo description 更谨慎地说 application-class configurations are capable of booting Linux。
- 站内分类保留为 `core`，core type 使用 `linux-application`（展示标签为 Application-class/应用级，2026-07-09 起不再使用已删除的 high-performance 维度），避免暗示乱序或超标量一定存在。

## 主要来源

- https://github.com/openhwgroup/cva6
- https://github.com/openhwgroup/core-v-cores
- https://docs.openhwgroup.org/projects/cva6-user-manual/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
