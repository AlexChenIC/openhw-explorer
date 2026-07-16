# CORE-V MCU

> CORE-V MCU 是 OpenHW 的 CV32E40P MCU/SoC 平台项目，源自 PULPissimo，但现在是独立项目。

数据核对日期: 2026-07-16

## Public summary

CORE-V MCU is a standalone microcontroller-class SoC platform built around CV32E40P and derived from PULPissimo. The repository combines processor integration, memories, peripherals, FPGA targets, simulation flows, and JTAG debug into a complete system rather than providing another CPU core. It is a useful reference for engineers who want to see how a CORE-V core is assembled into an ASIC- or FPGA-oriented MCU, with Nexys A7 and Genesys 2 paths available for hands-on bring-up.

## 中文介绍

CORE-V MCU 是一套以 CV32E40P 为处理器核心、由 PULPissimo 演进而来的独立微控制器级 SoC 平台。该仓库把处理器集成、存储器、外设、FPGA 目标、仿真流程和 JTAG 调试组合成完整系统，而不是再提供一款 CPU 核心。对于希望理解 CORE-V 核心如何构成 ASIC 或 FPGA MCU 的工程师，它是有价值的参考，并提供 Nexys A7 与 Genesys 2 的实际上板路径。

## Key facts

- Origin: derived from PULPissimo and maintained as an independent OpenHW project
- Processor: ASIC- and FPGA-oriented MCU implementation built around CV32E40P
- FPGA flows: pre-built Nexys A7 quick start plus build targets for Nexys A7 and Genesys 2
- Tooling: Make, FuseSoC, Verilator, Vivado, and a Questa simulation target
- Debug: IEEE 1149.1 JTAG Test Access Port with a RISC-V Debug Transport Module

## 中文核心事实

- 来源：由 PULPissimo 演进，并作为独立 OpenHW 项目维护
- 处理器：以 CV32E40P 为核心，面向 ASIC 与 FPGA 的 MCU 实现
- FPGA 流程：提供预编译 Nexys A7 快速体验，以及 Nexys A7 和 Genesys 2 构建目标
- 工具：涉及 Make、FuseSoC、Verilator、Vivado 和 Questa 仿真目标
- 调试：IEEE 1149.1 JTAG Test Access Port 与 RISC-V Debug Transport Module

## Further resources

- [CORE-V MCU documentation](https://core-v-mcu.readthedocs.io/en/latest/) — project documentation and integration material
- [Nexys A7 quick start](https://github.com/openhwgroup/core-v-mcu/tree/master/emulation/quickstart) — pre-built FPGA getting-started path
- [CORE-V MCU DevKit](https://github.com/openhwgroup/core-v-mcu-devkit) — board-level evaluation platform
- [CORE-V MCU UVM](https://github.com/openhwgroup/core-v-mcu-uvm) — chip and subsystem verification environment

## 项目概述

README 说明 CORE-V MCU originated from PULPissimo and is now a stand-alone project within OpenHW Group。它提供 Nexys A7 quick start、Genesys2 FPGA board build target、Questa simulation target，以及 IEEE 1149.1 JTAG Test Access Port 和 RISC-V Debug Transport Module。

## 事实核查要点

- 分类建议为 `soc`，不宜直接标为 `learning`；学习可以通过 DevKit/课程内容承接。
- OpenHW 官方项目表描述为 ASIC and FPGA MCU implementation of CV32E40P。
- 与 `cv32e40p`、`core-v-mcu-devkit`、`core-v-mcu-uvm` 强相关。

## 主要来源

- https://github.com/openhwgroup/core-v-mcu
- https://core-v-mcu.readthedocs.io/en/latest/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://doi.org/10.1109/S3S.2018.8640145
- https://doi.org/10.1109/TVLSI.2021.3058162
