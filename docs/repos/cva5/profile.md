# CVA5

> CVA5 是面向 FPGA 的 5-stage application-class RISC-V soft processor，官方项目表将其列为 completed。

数据核对日期: 2026-07-16

## Public summary

CVA5 is a 32-bit RISC-V processor designed for FPGAs, supporting the Multiply/Divide, Atomic, and Floating-Point extensions (RV32IMAFD) according to its README. It is derived from the Taiga project from Simon Fraser University, with a highly configurable pipeline built around parallel, variable-latency execution units; OpenHW's core family documentation classifies it as a 5-stage, FPGA-optimized application-class core, and the official project table lists CVA5 as completed.

## Key facts

- Target: 32-bit RISC-V soft processor designed specifically for FPGA implementations
- ISA: the CVA5 README states RV32IMAFD support; the shorter CORE-V family overview currently lists RV32IMA
- Implementation: SystemVerilog design intended to be extensible and highly configurable
- Microarchitecture: the pipeline supports parallel, variable-latency execution units and adding new execution units
- Origin and status: derived from Simon Fraser University's Taiga project; OpenHW lists CVA5 as a completed, TRL-3 project

## Further resources

- [Taiga project](https://gitlab.com/sfu-rcl/taiga-project) — upstream project and current setup documentation referenced by CVA5
- [CVA5 architecture presentation](https://github.com/openhwgroup/cva5/tree/master/docs/FCCM_Presentation) — architecture material included in the repository
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official family positioning and maturity context
- [Soft-processor architecture publication (FCCM 2018)](https://doi.org/10.1109/FCCM.2018.00010) — the founding Taiga/CVA5 architecture paper listed in the repository's publications section
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
