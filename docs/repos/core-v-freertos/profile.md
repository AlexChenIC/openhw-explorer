# CORE-V FreeRTOS

> core-v-freertos 是 CORE-V MCU 的 FreeRTOS runtime、drivers、demos 和 tests 仓库，偏嵌入式软件支持。

数据核对日期: 2026-07-11

## Public summary

core-v-freertos provides FreeRTOS and drivers for real-time application development on CORE-V MCU. Its README includes demos, environment files, kernel code with PULP-specific patches, no-RTOS examples, templates, tests, and flows for RTL simulation and virtual platform simulation.

## Key facts

- Purpose: FreeRTOS runtime and drivers for real-time applications on CORE-V MCU
- Execution paths: programs can run in RTL simulation or the GVSOC virtual platform
- Repository areas include target code, drivers, demos, environment files, a patched kernel, no-RTOS examples, templates, and tests
- Toolchain: supports either PULP RISC-V GCC for PULP extensions or an upstream RISC-V GCC toolchain
- Boundary: this is a CORE-V MCU software-support repository, not the upstream FreeRTOS kernel project

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
