# CORE-V FreeRTOS Kernel

> core-v-freertos-kernel 是 FreeRTOS kernel source/header 和 ports 层，作为 CORE-V FreeRTOS 生态的内核基础。

数据核对日期: 2026-07-16

## Public summary

core-v-freertos-kernel contains the FreeRTOS kernel sources and target/compiler ports used by the CORE-V MCU software stack. The tree follows the familiar FreeRTOS organization around task, queue, and list management, optional co-routines, public headers, and a portability layer. This is a low-level dependency for engineers maintaining a CORE-V FreeRTOS port; developers looking for runnable demos, drivers, or setup instructions should use core-v-freertos instead.

## 中文介绍

core-v-freertos-kernel 保存 CORE-V MCU 软件栈使用的 FreeRTOS 内核源码以及面向目标与编译器的移植层。目录结构围绕任务、队列和链表管理、可选 co-routine、公共头文件和 portable 层展开，与常见 FreeRTOS 内核组织方式一致。它适合维护 CORE-V FreeRTOS 移植的底层工程师；需要可运行示例、驱动或环境配置的开发者应转到 core-v-freertos。

## Key facts

- Kernel core: list.c, queue.c, and tasks.c provide shared scheduler and synchronization behavior
- Optional feature: croutine.c implements co-routines for memory-constrained systems
- Portability layer: portable contains microcontroller- and compiler-specific files
- Headers: include contains the real-time kernel interfaces
- Scope boundary: kernel and ports only; application demos and quick-start flows live in core-v-freertos

## 中文核心事实

- 内核核心：list.c、queue.c 和 tasks.c 提供共享调度与同步行为
- 可选功能：croutine.c 为内存受限系统实现 co-routine
- 移植层：portable 包含面向微控制器与编译器的专用文件
- 头文件：include 包含实时内核接口
- 范围边界：这里只维护内核与移植，应用示例和快速入门位于 core-v-freertos

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
