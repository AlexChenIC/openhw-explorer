# CVW

> CVW/Wally 是面向教学与工程实践的 5-stage configurable RISC-V processor，资料与课程属性强，是本站教学方向的重要入口。

数据核对日期: 2026-07-08

## Public summary

CVW, also known as CORE-V Wally, is a configurable 5-stage RISC-V processor associated with the RISC-V System-on-Chip Design textbook. It supports a broad range of RV32/RV64 configurations and optional extensions, passes RISC-V architecture tests, and boots Linux on FPGA according to its README.

## 项目概述

CVW README 描述 Wally 为 5-stage pipelined processor，可配置支持 RV32/64、A/B/C/D/F/M/Q、Zk*、virtual memory、PMP、privileged modes、optional caches、branch prediction 以及 CLINT/PLIC/UART/GPIO 等外设。README 还说明它与教材 RISC-V System-on-Chip Design 相关，TRL 为 4。

## 事实核查要点

- 分类建议为 `core` + `learning`，这是少数可以比较自信标为 learning-friendly 的核心仓库。
- 可保留 `linux-application` 与 `embedded-mcu` 两类，因为 README 明确说配置范围从 minimal RV32E 到 RV64GC application processor，并可 boot Linux。
- 不应把 CVW 说成只适合初学者；它也覆盖工程级 SoC 配置、仿真和测试计划。

## 主要来源

- https://github.com/openhwgroup/cvw
- https://github.com/openhwgroup/cvw/blob/main/docs/testplans/testplan.md
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
