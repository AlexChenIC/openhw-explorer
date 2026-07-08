# CVA5

> CVA5 是面向 FPGA 的 5-stage application-class RISC-V soft processor，官方项目表将其列为 completed。

数据核对日期: 2026-07-08

## Public summary

CVA5 is a 32-bit RISC-V processor designed for FPGAs, supporting the Multiply/Divide, Atomic, and Floating-Point extensions (RV32IMAFD) according to its README. It is derived from the Taiga project from Simon Fraser University, with a highly configurable pipeline built around parallel, variable-latency execution units; OpenHW's core family documentation classifies it as a 5-stage, FPGA-optimized application-class core, and the official project table lists CVA5 as completed.

## 项目概述

CVA5 README 描述该处理器为 designed for FPGAs，支持 Multiply/Divide、Atomic 与 Floating-Point extensions，即 RV32IMAFD。它源自 Simon Fraser University 的 Taiga Project，使用 SystemVerilog 编写，强调 extensible、configurable，以及支持 parallel variable-latency execution units。

## 事实核查要点

- 站内状态应为 `completed`，不是 active。
- 分类建议为 `core`；core type 可以归入 `high-performance`，但应说明是 FPGA-optimized application-class，而不是 Linux-first 的 CVA6 类定位。
- README 明确支持 RV32IMAFD，因此站内原有 RV32IMAFD 描述可保留。
- 注意：CVA5 自己的 README 没有出现 "5-stage" 字样；"5-stage" 的出处是官方项目表与 core-v-cores 家族文档，站内表述已按来源区分。

## 主要来源

- https://github.com/openhwgroup/cva5
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
- https://gitlab.com/sfu-rcl/taiga-project
- https://doi.org/10.1145/3650036
- https://doi.org/10.1109/FCCM.2019.00046
