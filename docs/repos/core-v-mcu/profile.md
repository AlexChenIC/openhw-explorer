# CORE-V MCU

> CORE-V MCU 是 OpenHW 的 CV32E40P MCU/SoC 平台项目，源自 PULPissimo，但现在是独立项目。

数据核对日期: 2026-07-08

## Public summary

CORE-V MCU is OpenHW's standalone MCU/SoC platform based around CORE-V embedded-class cores, originating from PULPissimo and targeting ASIC and FPGA implementations of CV32E40P. The README points to pre-built FPGA bitstreams, Nexys A7 and Genesys2 flows, and JTAG/debug infrastructure.

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
