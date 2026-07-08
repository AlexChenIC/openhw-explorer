# CORE-V FreeRTOS Kernel

> core-v-freertos-kernel 是 FreeRTOS kernel source/header 和 ports 层，作为 CORE-V FreeRTOS 生态的内核基础。

数据核对日期: 2026-07-08

## Public summary

core-v-freertos-kernel contains the FreeRTOS kernel source for CORE-V targets. Its README describes the standard FreeRTOS kernel layout: the core kernel contained in list.c, queue.c, and tasks.c, optional co-routine support in croutine.c, a Portable directory for microcontroller- and compiler-specific port files, and an include directory for the kernel headers.

## 项目概述

README（仅 16 行）说明每个 port 由三个共享核心文件组成：`list.c`、`queue.c`、`tasks.c`（kernel 本体），`croutine.c` 提供 optional co-routine functionality；`Portable` 目录存放特定 MCU/编译器的 port 文件，`include` 目录存放 kernel 头文件。

## 事实核查要点

- 分类建议为 `tools` + `sdk`。
- 2026-07-08 核查更正：README 中**没有**指向 FreeRTOS Kernel Quick Start Guide 的链接（此前表述系虚构），已从站内摘要中删除。
- 不应把它写成完整应用 demo 仓库；demo 和 CORE-V MCU runtime 更应指向 `core-v-freertos`。
- 与 `core-v-freertos`、FreeRTOS upstream 文档关联。

## 主要来源

- https://github.com/openhwgroup/core-v-freertos-kernel
- https://www.freertos.org/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
