# CV32E40P

> CV32E40P 是 OpenHW CORE-V 家族中成熟度最高、资料最完整的 32-bit embedded-class 核心之一；需要区分 completed CV32E40P 与仍在发展的 CV32E40PV2。

数据核对日期: 2026-05-07

## Public summary

CV32E40P is a small, efficient 32-bit, 4-stage in-order CORE-V RISC-V core implementing RV32IM[F|Zfinx]C with PULP custom extensions. It originated from the RI5CY/PULP line and was contributed to OpenHW in 2020; OpenHW lists CV32E40P as completed while CV32E40PV2 remains an active-development line.

## 项目概述

CV32E40P 面向 IoT 与嵌入式 MCU 场景。官方 README 描述其为 32-bit、4-stage、in-order RISC-V core，支持 RV32IM[F|Zfinx]C 与 PULP custom extensions，用于提升 code density、performance 与 energy efficiency。验证环境不在该 RTL 仓库中，而是在 `core-v-verif` 中维护。

## 事实核查要点

- 站内状态宜用 `stable`，因为官方表中 CV32E40P 本体为 completed，而同一仓库/路线中的 CV32E40PV2 又在 active development。
- 分类建议为 `core`，core type 为 `embedded-mcu` 与 `low-power`。
- 不应把该仓库描述为 verification repo；验证内容主要通过 `core-v-verif` 关联。

## 主要来源

- https://github.com/openhwgroup/cv32e40p
- https://docs.openhwgroup.org/projects/cv32e40p-user-manual/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
- https://doi.org/10.1109/TVLSI.2017.2654506
- https://doi.org/10.1109/PATMOS.2017.8106976
