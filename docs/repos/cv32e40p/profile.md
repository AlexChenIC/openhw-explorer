# CV32E40P

> CV32E40P 是 OpenHW CORE-V 家族中成熟度最高、资料最完整的 32-bit embedded-class 核心之一；需要区分 completed CV32E40P 与仍在发展的 CV32E40PV2。

数据核对日期: 2026-07-16

## Public summary

CV32E40P is a compact four-stage, in-order 32-bit RISC-V core for embedded and MCU-class systems. It combines RV32IMC with optional floating-point support and PULP custom extensions aimed at code density, DSP-style performance, and energy efficiency. Its clear documentation, mature v1 release, and shared CORE-V verification flow make it useful both for learning a production-oriented embedded core and for integrating or extending a small CPU in an SoC.

## 中文介绍

CV32E40P 是一款紧凑的四级顺序执行 32 位 RISC-V 核心，面向嵌入式和 MCU 级系统。它以 RV32IMC 为基础，可选浮点能力，并加入用于提高代码密度、DSP 类运算性能和能效的 PULP 自定义扩展。该项目拥有较完整的文档、成熟的 v1 版本以及共享的 CORE-V 验证流程，既适合学习一款面向工程应用的嵌入式核心，也适合进行小型 SoC 集成与扩展研究。

## Key facts

- Architecture: 32-bit, four-stage, in-order embedded-class RISC-V core
- ISA: RV32IMC with optional F or Zfinx support and PULP custom extensions
- Origin: evolved from the RI5CY core developed by the PULP Platform team and moved to OpenHW in 2020
- Readiness: CV32E40Pv1 v1.0.0 achieved TRL-5; CV32E40Pv2 v1.8.3 has not yet reached its TRL-5 goal
- Verification boundary: production verification is maintained in core-v-verif; the simple RTL-repository testbench is for experimentation

## 中文核心事实

- 架构：32 位、四级流水、顺序执行的嵌入式 RISC-V 核心
- 指令集：RV32IMC，可选 F 或 Zfinx，并支持 PULP 自定义扩展
- 来源：由 PULP Platform 团队的 RI5CY 核心演进而来，2020 年进入 OpenHW
- 成熟度：CV32E40Pv1 v1.0.0 已达到 TRL-5；CV32E40Pv2 v1.8.3 尚未达到其 TRL-5 目标
- 验证边界：正式验证环境位于 core-v-verif；RTL 仓库中的简单 testbench 仅用于实验

## Further resources

- [CV32E40P User Manual](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/) — official architecture, interfaces, integration, and release documentation
- [CORE-V family and release table](https://github.com/openhwgroup/core-v-cores) — device variants, TRL status, and assigned architecture IDs
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared functional-verification infrastructure used by CV32E40P
- [RI5CY/CV32E40P founding paper](https://doi.org/10.1109/TVLSI.2017.2654506) — published description cited by the project

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
