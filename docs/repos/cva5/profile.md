# CVA5

> CVA5 是面向 FPGA 的 5-stage application-class RISC-V soft processor，官方项目表将其列为 completed。

数据核对日期: 2026-07-16

## Public summary

CVA5 is a configurable 32-bit RISC-V soft processor designed specifically for FPGA implementation. Derived from Simon Fraser University's Taiga project, it supports RV32IMAFD and uses parallel, variable-latency execution units so new functional units can be added without forcing every operation into one fixed latency. It is best suited to FPGA architecture research and custom processor prototyping; its completed TRL-3 status means it should be evaluated as a research-ready platform rather than a currently advancing production core.

## 中文介绍

CVA5 是一款专门面向 FPGA 实现的可配置 32 位 RISC-V 软核。它源自西蒙弗雷泽大学的 Taiga 项目，支持 RV32IMAFD，并采用并行、可变延迟执行单元，便于加入新的功能单元而不必让所有运算服从固定延迟。该项目更适合 FPGA 体系结构研究和定制处理器原型验证；其状态为已完成的 TRL-3 项目，因此应作为研究平台评估，而不是仍在持续迈向量产成熟度的核心。

## Key facts

- Target: 32-bit RISC-V soft processor optimized for FPGA implementations
- ISA: the core repository supports RV32IMAFD; a shorter family overview lists RV32IMA, so the core repository is the more detailed implementation reference
- Implementation: extensible and highly configurable SystemVerilog RTL
- Microarchitecture: parallel, variable-latency execution units with support for adding new units
- Origin and readiness: derived from the Taiga project and completed at OpenHW TRL-3

## 中文核心事实

- 目标：针对 FPGA 实现优化的 32 位 RISC-V 软处理器
- 指令集：核心仓库支持 RV32IMAFD；家族总览采用较简化的 RV32IMA 表述，具体实现以核心仓库为准
- 实现：强调可扩展性与高度可配置性的 SystemVerilog RTL
- 微架构：支持并行、可变延迟执行单元，并便于加入新的执行单元
- 来源与成熟度：源自 Taiga 项目，在 OpenHW 中以 TRL-3 完成

## Further resources

- [Taiga project](https://gitlab.com/sfu-rcl/taiga-project) — upstream project and current setup documentation referenced by CVA5
- [CVA5 architecture presentation](https://github.com/openhwgroup/cva5/tree/master/docs/FCCM_Presentation) — architecture material included in the repository
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official family positioning and maturity context
- [Configurable FPU publication](https://doi.org/10.1145/3650036) — CVA5 publication listed by the repository

## 项目概述

CVA5 README 描述该处理器为 designed for FPGAs，支持 Multiply/Divide、Atomic 与 Floating-Point extensions，即 RV32IMAFD。它源自 Simon Fraser University 的 Taiga Project，使用 SystemVerilog 编写，强调 extensible、configurable，以及支持 parallel variable-latency execution units。

## 事实核查要点

- 站内状态应为 `completed`，不是 active。
- 分类建议为 `core`；core type 使用站内展示名 `Application-class`，并明确它是 FPGA-optimized，而不是暗示具备 CVA6 式的 Linux/MMU 定位。
- README 明确支持 RV32IMAFD，因此站内原有 RV32IMAFD 描述可保留。
- 注意：CVA5 自己的 README 没有出现 "5-stage" 字样；"5-stage" 的出处是官方项目表与 core-v-cores 家族文档，站内表述已按来源区分。

## 主要来源

- https://github.com/openhwgroup/cva5
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
- https://gitlab.com/sfu-rcl/taiga-project
- https://doi.org/10.1145/3650036
- https://doi.org/10.1109/FCCM.2019.00046
