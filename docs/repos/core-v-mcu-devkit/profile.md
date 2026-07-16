# CORE-V MCU DevKit

> CORE-V MCU DevKit 是 CORE-V MCU 的官方开发板/评估平台资料仓库，适合硬件 bring-up 与教学演示。

数据核对日期: 2026-07-16

## Public summary

CORE-V MCU DevKit contains the hardware-design artifacts for an evaluation board built around CORE-V MCU and the CV32E40P v1.0.0 core. The board combines a QuickLogic ArcticPro2 embedded FPGA, flash, on-board JTAG/debug, expansion and sensor interfaces, camera support, and AWS IoT ExpressLink connectivity; the repository provides KiCad sources and schematics rather than processor RTL. It is most useful to board designers and bring-up engineers who need a concrete hardware platform for the CORE-V MCU ecosystem.

## 中文介绍

CORE-V MCU DevKit 保存了一块以 CORE-V MCU 和 CV32E40P v1.0.0 为核心的评估板硬件设计资料。该板集成 QuickLogic ArcticPro2 嵌入式 FPGA、Flash、板载 JTAG/调试、扩展与传感接口、摄像头支持及 AWS IoT ExpressLink 连接；仓库提供的是 KiCad 工程与原理图，而不是处理器 RTL。它主要适合需要 CORE-V MCU 实体平台的板级设计和 bring-up 工程师。

## Key facts

- Purpose: evaluation platform for CV32E40P v1.0.0 within CORE-V MCU
- Design files: KiCad schematics and PCB data, project-specific parts, documentation images, and a PDF schematic
- On-board compute: CORE-V MCU plus a QuickLogic ArcticPro2 embedded FPGA
- Bring-up interfaces: on-board and external JTAG, test pins, mikroBUS, CSI camera, LEDs, button, and AWS IoT ExpressLink
- Electrical constraint: the MCU pad ring and direct JTAG header use 1.8 V logic

## 中文核心事实

- 用途：面向 CORE-V MCU 中 CV32E40P v1.0.0 的评估平台
- 设计文件：KiCad 原理图与 PCB 数据、项目器件库、文档图片和 PDF 原理图
- 板上计算：CORE-V MCU 与 QuickLogic ArcticPro2 嵌入式 FPGA
- Bring-up 接口：板载/外接 JTAG、测试引脚、mikroBUS、CSI 摄像头、LED、按键和 AWS IoT ExpressLink
- 电气约束：MCU pad ring 与直接 JTAG 接口使用 1.8 V 逻辑电平

## Further resources

- [DevKit schematic](https://github.com/openhwgroup/core-v-mcu-devkit/blob/main/docs/images/OpenHW%20DevKit.pdf) — board-level PDF schematic
- [CORE-V MCU repository](https://github.com/openhwgroup/core-v-mcu) — SoC/MCU RTL platform used by the board
- [CV32E40P repository](https://github.com/openhwgroup/cv32e40p) — processor core evaluated by the DevKit
- [CV32E40P User Manual](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/) — official core documentation

## 项目概述

README 列出 DevKit features，包括 CORE-V MCU with CV32E40P v1.0.0、QuickLogic ArcticPro2 Embedded FPGA、4MB Flash、Ashling Opella LD JTAG debugger、offboard JTAG、test pins、I2C temperature sensor、CSI camera、LED/button、mikroBUS 与 AWS IoT ExpressLink。

## 事实核查要点

- 分类建议为 `soc` + `tools`，比 `learning` 更准确；教学价值可以在课程页体现。
- 这是 board/devkit artifacts，不是 MCU RTL 本体。
- README 中有一个 `cv32e40p0` 链接疑似历史/拼写问题；站内来源应优先指向正确的 `cv32e40p` 仓库。

## 主要来源

- https://github.com/openhwgroup/core-v-mcu-devkit
- https://github.com/openhwgroup/core-v-mcu
- https://github.com/openhwgroup/cv32e40p
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
