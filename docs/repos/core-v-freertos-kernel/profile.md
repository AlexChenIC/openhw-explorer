# CORE-V FreeRTOS Kernel

> core-v-freertos-kernel 是 FreeRTOS kernel source/header 和 ports 层，作为 CORE-V FreeRTOS 生态的内核基础。

数据核对日期: 2026-07-16

## Public summary

core-v-freertos-kernel contains the FreeRTOS kernel source for CORE-V targets. Its README describes the standard FreeRTOS kernel layout: the core kernel contained in list.c, queue.c, and tasks.c, optional co-routine support in croutine.c, a Portable directory for microcontroller- and compiler-specific port files, and an include directory for the kernel headers.

## Key facts

- Kernel core: `list.c`, `queue.c`, and `tasks.c` are the files shared by every port and appear at this repository's root
- Optional feature: `croutine.c` implements co-routines, normally for very memory-constrained systems
- Portability layer: the repository's `portable` directory contains microcontroller- and compiler-specific port files
- Headers: the root-level `include` directory contains the real-time kernel headers
- Scope limit: the repository README does not provide a quick-start workflow or application demos

## Further resources

- [Portable layer](https://github.com/openhwgroup/core-v-freertos-kernel/tree/pulp-project-devel/portable) — target/compiler-specific ports
- [CORE-V FreeRTOS](https://github.com/openhwgroup/core-v-freertos) — drivers, demos, templates, and target execution flows
- [FreeRTOS documentation](https://www.freertos.org/Documentation/RTOS_book.html) — upstream kernel and API reference

## 项目概述

README（仅 16 行）说明每个 port 由三个共享核心文件组成：`list.c`、`queue.c`、`tasks.c`（kernel 本体），`croutine.c` 提供 optional co-routine functionality。当前仓库把这些文件以及 `portable`、`include` 目录直接放在根目录，而不是 README 沿用的上游 `FreeRTOS/Source` 路径层级。

## 事实核查要点

- 分类建议为 `tools` + `sdk`。
- 2026-07-08 核查更正：README 中**没有**指向 FreeRTOS Kernel Quick Start Guide 的链接（此前表述系虚构），已从站内摘要中删除。
- 不应把它写成完整应用 demo 仓库；demo 和 CORE-V MCU runtime 更应指向 `core-v-freertos`。
- 与 `core-v-freertos`、FreeRTOS upstream 文档关联。

## 主要来源

- https://github.com/openhwgroup/core-v-freertos-kernel
- https://www.freertos.org/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
