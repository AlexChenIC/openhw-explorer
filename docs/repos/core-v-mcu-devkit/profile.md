# CORE-V MCU DevKit

> CORE-V MCU DevKit 是 CORE-V MCU 的官方开发板/评估平台资料仓库，适合硬件 bring-up 与教学演示。

数据核对日期: 2026-07-11

## Public summary

CORE-V MCU DevKit hosts the open-source artifacts for the CORE-V MCU development kit. The README describes an evaluation platform for the OpenHW CV32E40P core with CORE-V MCU, QuickLogic ArcticPro2 embedded FPGA, 4 MB flash, onboard Ashling Opella LD JTAG/debugger, mikroBUS, camera, LEDs, and AWS IoT ExpressLink connectivity.

## Key facts

- Purpose: evaluation platform for the OpenHW CV32E40P v1.0.0 core within CORE-V MCU
- Repository contents: KiCad schematics and PCB files, project-specific parts, documentation images, and a PDF schematic
- On-board compute includes CORE-V MCU with CV32E40P and a QuickLogic ArcticPro2 embedded FPGA
- Connectivity and bring-up features include on-board/off-board JTAG, test pins, mikroBUS, CSI camera, LEDs, button, and AWS IoT ExpressLink
- Electrical caution: the MCU pad ring and direct JTAG header use 1.8 V logic, as documented by the README

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
