# CVA6 SDK

> cva6-sdk 是为 CVA6 构建可启动 Linux 镜像的工具集合：RISC-V toolchain、OpenSBI、U-Boot、Linux kernel 与 Buildroot rootfs，输出可直接烧录的 SD 卡镜像。

数据核对日期: 2026-07-08

## Public summary

CVA6 SDK houses the RISC-V tools used to build a bootable Linux image for the CVA6 core: a RISC-V toolchain, OpenSBI, U-Boot with a corresponding device tree, the Linux kernel, and an initramfs including the rootfs. It produces ready-to-flash SD card images, supports both 32-bit and 64-bit builds via an XLEN switch, and has been designed and tested for the Digilent Genesys 2 and Altera Agilex 7 FPGA boards.

## 项目概述

cva6-sdk 仓库 README 描述了完整的 CVA6 Linux 镜像构建流程：`make` 一次性构建 RISC-V 工具链、OpenSBI、U-Boot（含设备树）、Linux 内核和 initramfs/rootfs，最终生成 `install<XLEN>_<BOARD>/sdcard.img`。默认 64-bit/Genesys 2，可用 `XLEN=32`、`BOARD=agilex7` 切换。README 特别注明仓库不包含 openOCD。已测试的 CVA6 配置为 cv32a6_ima_sv32_fpga（32-bit）与 cv64a6_imafdc_sv39（64-bit）。

## 事实核查要点

- README 明确说 "it does not contain openOCD"，介绍工具范围时不要包含 openOCD。
- 支持板卡目前只有 Digilent Genesys 2 和 Agilex 7，其他板卡 README 建议在 OpenHW 发起新项目。
- 与 meta-cva6-yocto（Yocto 路线）互补：cva6-sdk 走 Buildroot/initramfs 路线。

## 主要来源

- https://github.com/openhwgroup/cva6-sdk
- https://github.com/openhwgroup/cva6
