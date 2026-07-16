# CORE-V FreeRTOS

> core-v-freertos 是 CORE-V MCU 的 FreeRTOS runtime、drivers、demos 和 tests 仓库，偏嵌入式软件支持。

数据核对日期: 2026-07-16

## Public summary

core-v-freertos is the software-support repository for running real-time applications on CORE-V MCU. It combines FreeRTOS, board and peripheral drivers, demonstrations, templates, tests, no-RTOS examples, and execution paths for RTL simulation or the GVSOC virtual platform. Embedded developers should start here when they need application-level examples and target integration; the separate core-v-freertos-kernel repository contains the lower-level kernel source and ports.

## 中文介绍

core-v-freertos 是在 CORE-V MCU 上运行实时应用的软件支持仓库。它整合 FreeRTOS、板级与外设驱动、示例、模板、测试、no-RTOS 程序，以及 RTL 仿真和 GVSOC 虚拟平台两条执行路径。嵌入式开发者需要应用级示例和目标平台集成时应从这里开始；更底层的内核源码与移植位于独立的 core-v-freertos-kernel 仓库。

## Key facts

- Purpose: FreeRTOS runtime, drivers, and examples for CORE-V MCU applications
- Execution paths: RTL simulation or the GVSOC virtual platform
- Contents: target code, drivers, demos, environment files, patched kernel code, no-RTOS examples, templates, and tests
- Toolchain: PULP RISC-V GCC for PULP extensions or an upstream RISC-V GCC toolchain
- Boundary: CORE-V MCU support package, not the upstream FreeRTOS project

## 中文核心事实

- 用途：面向 CORE-V MCU 应用的 FreeRTOS 运行环境、驱动与示例
- 执行路径：RTL 仿真或 GVSOC 虚拟平台
- 内容：目标代码、驱动、示例、环境文件、带补丁内核、no-RTOS 示例、模板和测试
- 工具链：支持面向 PULP 扩展的 PULP RISC-V GCC 或上游 RISC-V GCC
- 边界：属于 CORE-V MCU 支持包，不是 FreeRTOS 上游项目

## Further resources

- [FreeRTOS documentation](https://www.freertos.org/Documentation/RTOS_book.html) — upstream FreeRTOS reference linked by the repository
- [CORE-V MCU](https://github.com/openhwgroup/core-v-mcu) — target hardware platform
- [CORE-V FreeRTOS Kernel](https://github.com/openhwgroup/core-v-freertos-kernel) — kernel-source companion repository
- [CORE-V SDK](https://github.com/openhwgroup/core-v-sdk) — packaged development and debug environment

## 项目概述

README 标题为 CORE-V-MCU FREERTOS，并说明该项目 provides FreeRTOS and drivers for development of real-time applications on the core-v-mcu。目录包括 demos、env、kernel、nortos、template 与 tests。Getting Started 说明需要 RISC-V compiler，并可配合 CORE-V-MCU release 与环境配置使用。

## 事实核查要点

- 分类建议为 `tools` + `sdk`。
- 不应把它混同为 FreeRTOS 上游 kernel；本仓库面向 CORE-V MCU。
- 与 `core-v-freertos-kernel`、`core-v-mcu`、`core-v-sdk` 关联。

## 主要来源

- https://github.com/openhwgroup/core-v-freertos
- https://github.com/openhwgroup/core-v-mcu
- https://www.freertos.org/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
