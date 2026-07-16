# CORE-V SDK

> CORE-V SDK 是面向 CORE-V 的 SDK/IDE 快速上手工具包，支持 Windows 与 x86 Linux，但仓库活动较少。

数据核对日期: 2026-07-16

## Public summary

CORE-V SDK is a quick-start SDK and IDE package for CORE-V development. Its README supports Windows 10/11 and x86 Linux distributions such as Red Hat 7.9/8.4 and Ubuntu 18.04/20.04, and includes sample import, build, debug, CSR/register views, and FreeRTOS task-monitoring workflows.

## Key facts

- Purpose: packaged SDK/IDE intended to get CORE-V users running quickly
- Supported hosts named by the README: Windows 10/11 and x86 Linux on Red Hat 7.9/8.4 or Ubuntu 18.04/20.04
- Architecture limitation: Arm hosts are explicitly not supported
- Development workflow includes sample import, build, GDB/OpenOCD or QEMU debug configurations, and an integrated terminal
- Debug views include CSR registers, peripheral registers, and FreeRTOS task/queue awareness

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
