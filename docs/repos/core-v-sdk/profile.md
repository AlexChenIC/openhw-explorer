# CORE-V SDK

> CORE-V SDK 是面向 CORE-V 的 SDK/IDE 快速上手工具包，支持 Windows 与 x86 Linux，但仓库活动较少。

数据核对日期: 2026-07-16

## Public summary

CORE-V SDK is a packaged IDE and quick-start environment for importing, building, and debugging CORE-V sample applications. It brings together GDB/OpenOCD or QEMU launch configurations, register views, an integrated terminal, and FreeRTOS-aware task and queue inspection. The project is now inactive and its documented host matrix is limited to older x86 Windows and Linux versions with no Arm-host support, so it is best used to reproduce its original workflow rather than as the default SDK for a new project.

## 中文介绍

CORE-V SDK 是一套用于导入、构建和调试 CORE-V 示例应用的集成 IDE 与快速入门环境。它提供 GDB/OpenOCD 或 QEMU 启动配置、寄存器视图、集成终端，以及感知 FreeRTOS 任务和队列的调试能力。该项目目前已非活跃，公开支持矩阵只覆盖较旧的 x86 Windows/Linux 版本且不支持 Arm 主机，因此更适合复现原有工作流，而不应作为新项目的默认 SDK。

## Key facts

- Purpose: packaged SDK/IDE for CORE-V sample development and debugging
- Documented hosts: Windows 10/11 and x86 Linux on Red Hat 7.9/8.4 or Ubuntu 18.04/20.04
- Host limitation: Arm systems are not supported
- Workflow: sample import, build, GDB/OpenOCD or QEMU debug configurations, and integrated terminal
- Debug views: CSR and peripheral registers plus FreeRTOS task and queue awareness

## 中文核心事实

- 用途：用于 CORE-V 示例开发与调试的打包 SDK/IDE
- 已记录主机：Windows 10/11，以及 x86 Linux 上的 Red Hat 7.9/8.4 或 Ubuntu 18.04/20.04
- 主机限制：不支持 Arm 系统
- 工作流：导入示例、构建、GDB/OpenOCD 或 QEMU 调试配置及集成终端
- 调试视图：CSR、外设寄存器，以及 FreeRTOS 任务和队列感知

## Further resources

- [CORE-V SDK quick-start guide](https://github.com/openhwgroup/core-v-sdk#core-v-sdk-quick-start-guide) — supported hosts, installation, samples, and debugging
- [CORE-V MCU](https://github.com/openhwgroup/core-v-mcu) — hardware platform used by SDK examples and register descriptions
- [CORE-V GCC](https://github.com/openhwgroup/corev-gcc) — compiler-development repository in the toolchain family
- [CORE-V Binutils/GDB](https://github.com/openhwgroup/corev-binutils-gdb) — debugger and binary-tool development repository

## 项目概述

README 说明 CORE-V-SDK Quick Start Guide 的目标是让用户在支持的平台上快速运行。支持系统为 Windows 10/11 与 x86 Linux，包括 RH 7.9/8.4、Ubuntu 18.04/20.04。功能文档包括安装、导入 sample project、build、debug、CSR register view、peripheral register view 和 FreeRTOS task monitoring。

## 事实核查要点

- 分类建议为 `tools` + `sdk`。
- 不应夸大为所有平台通用 SDK；README 明确 Arm is not supported。
- GitHub pushedAt 较旧，适合作为 historical/tooling entry，而不是 active contributor flagship。

## 主要来源

- https://github.com/openhwgroup/core-v-sdk
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
