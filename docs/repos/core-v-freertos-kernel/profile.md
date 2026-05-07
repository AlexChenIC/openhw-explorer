# CORE-V FreeRTOS Kernel

> core-v-freertos-kernel 是 FreeRTOS kernel source/header 和 ports 层，作为 CORE-V FreeRTOS 生态的内核基础。

数据核对日期: 2026-05-07

## Public summary

core-v-freertos-kernel contains FreeRTOS kernel source and header files plus kernel ports. Its README follows the FreeRTOS Kernel structure, with common files such as list.c, queue.c, and tasks.c, and points users to the FreeRTOS Kernel Quick Start Guide for application development.

## 项目概述

README 说明该 repository contains FreeRTOS kernel source/header files and kernel ports only。根目录包含 every port 共享的 `list.c`、`queue.c`、`tasks.c`，以及 optional co-routine functionality。它指向 FreeRTOS Kernel Quick Start Guide、Developer Documentation 与 API Reference。

## 事实核查要点

- 分类建议为 `tools` + `sdk`。
- 不应把它写成完整应用 demo 仓库；demo 和 CORE-V MCU runtime 更应指向 `core-v-freertos`。
- 与 `core-v-freertos`、FreeRTOS upstream 文档关联。

## 主要来源

- https://github.com/openhwgroup/core-v-freertos-kernel
- https://www.freertos.org/FreeRTOS-quick-start-guide.html
- https://www.freertos.org/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
