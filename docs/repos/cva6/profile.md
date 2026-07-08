# CVA6

> CVA6 是 OpenHW 的 6-stage 应用级/嵌入式 CORE-V RISC-V 核心家族；官方资料同时存在“当前基线 single-issue”和“家族 single or dual-issue”的表述，需要在站内明确区分。

数据核对日期: 2026-07-08

## Public summary

CVA6 is a configurable 6-stage CORE-V RISC-V core family for application-class and embedded-class use. The cva6 repository README describes the current baseline CPU as 6-stage, single-issue, and in-order, while the OpenHW CORE-V cores roadmap describes the broader CVA6 family as single- or dual-issue; application-class configurations are Linux-capable.

## 项目概述

CVA6 原名 Ariane，现由 OpenHW Group 维护。`cva6` 仓库 README 把该核心描述为 6-stage、single-issue、in-order 的 64-bit RISC-V CPU，支持 I/M/A/C、M/S/U privilege levels、TLB、hardware page-table walker 和 branch prediction。OpenHW 的 `core-v-cores` 路线资料则把 CVA6 描述为 6-stage、single or dual-issue、in-order 的核心家族，覆盖 RV32 和 RV64 配置。

## 事实核查要点

- 不应简单写成“CVA6 永远是 single-issue”：官方 CORE-V cores roadmap 明确使用 single or dual-issue 描述家族。
- 不应简单写成“所有 CVA6 配置都可启动 Linux”：GitHub repo description 更谨慎地说 application-class configurations are capable of booting Linux。
- 站内分类建议保留为 `core`，core type 使用 `linux-application` 与 `high-performance`，但中文展示应偏向“应用级/性能”，避免暗示乱序或超标量一定存在。

## 主要来源

- https://github.com/openhwgroup/cva6
- https://github.com/openhwgroup/core-v-cores
- https://docs.openhwgroup.org/projects/cva6-user-manual/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
