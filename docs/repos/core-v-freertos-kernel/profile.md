# CORE-V FreeRTOS Kernel

> core-v-freertos-kernel 是 FreeRTOS kernel source/header 和 ports 层，作为 CORE-V FreeRTOS 生态的内核基础。

数据核对日期: 2026-09-12

## Public summary

core-v-freertos-kernel is an OpenHW-hosted FreeRTOS kernel fork containing task, queue, and list management, optional co-routines, public headers, and target/compiler ports. It is useful for studying the kernel and portability layer, rather than application demonstrations. For CORE-V MCU drivers and examples, see core-v-freertos, but check its actual dependency before making kernel changes: the reviewed runtime selects pulp-platform/pulp-freertos-kernel as its submodule upstream, not this OpenHW fork.

## 中文介绍

core-v-freertos-kernel 是 OpenHW 托管的 FreeRTOS 内核分支，包含任务、队列和链表管理、可选 co-routine、公共头文件，以及面向目标与编译器的移植层，适合研究内核及其可移植性。CORE-V MCU 的驱动和应用示例可查看 core-v-freertos，但修改内核前必须检查实际依赖：核查版本的运行环境选择 pulp-platform/pulp-freertos-kernel 作为子模块上游，并非本 OpenHW 分支。

## Key facts

- Kernel core: list.c, queue.c, and tasks.c provide shared scheduler and synchronization behavior
- Optional feature: croutine.c implements co-routines for memory-constrained systems
- Portability layer: portable contains microcontroller- and compiler-specific files
- Headers: include contains the real-time kernel interfaces
- Scope boundary: kernel and ports only; application demos and quick-start flows live in core-v-freertos
- Integration boundary: being a related OpenHW fork does not make this the current kernel submodule of core-v-freertos

## 中文核心事实

- 内核核心：list.c、queue.c 和 tasks.c 提供共享调度与同步行为
- 可选功能：croutine.c 为内存受限系统实现 co-routine
- 移植层：portable 包含面向微控制器与编译器的专用文件
- 头文件：include 包含实时内核接口
- 范围边界：这里只维护内核与移植，应用示例和快速入门位于 core-v-freertos
- 集成边界：属于相关 OpenHW 分支，不代表它就是 core-v-freertos 当前使用的内核子模块

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

- https://github.com/openhwgroup/core-v-freertos/blob/4854f247/.gitmodules
- https://github.com/openhwgroup/core-v-freertos-kernel
- https://www.freertos.org/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
