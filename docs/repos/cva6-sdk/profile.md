# CVA6 SDK

> cva6-sdk 是为 CVA6 构建可启动 Linux 镜像的工具集合：RISC-V toolchain、OpenSBI、U-Boot、Linux kernel 与 Buildroot rootfs，输出可直接烧录的 SD 卡镜像。

数据核对日期: 2026-07-16

## Public summary

CVA6 SDK is the Buildroot-based path for producing a complete bootable Linux image for CVA6 FPGA systems. A single build coordinates the RISC-V toolchain, OpenSBI, U-Boot and device tree, Linux kernel, initramfs, and root filesystem, then packages them into a flashable SD-card image. It is the practical starting point for users bringing up 32-bit or 64-bit CVA6 on Genesys 2 or Agilex 7; teams committed to Yocto should compare it with meta-cva6-yocto.

## 中文介绍

CVA6 SDK 是为 CVA6 FPGA 系统生成完整可启动 Linux 镜像的 Buildroot 路线。一次构建会协调 RISC-V 工具链、OpenSBI、U-Boot 与设备树、Linux 内核、initramfs 和根文件系统，并打包成可写入 SD 卡的镜像。需要在 Genesys 2 或 Agilex 7 上启动 32 位/64 位 CVA6 的用户可以优先从这里开始；已经采用 Yocto 的团队则应同时比较 meta-cva6-yocto。

## Key facts

- Output: ready-to-flash sdcard.img containing CVA6 boot and Linux payloads
- Build stack: RISC-V toolchain, OpenSBI, U-Boot/device tree, Linux kernel, Buildroot, initramfs, and root filesystem
- Architecture selection: 64-bit by default, with 32-bit builds selected through XLEN
- Tested FPGA boards: Digilent Genesys 2 and Altera Agilex 7
- Tool boundary: OpenOCD is not included and must be obtained separately when needed

## 中文核心事实

- 输出：包含 CVA6 启动栈与 Linux 载荷的可写入 sdcard.img
- 构建栈：RISC-V 工具链、OpenSBI、U-Boot/设备树、Linux 内核、Buildroot、initramfs 与根文件系统
- 位宽选择：默认 64 位，可通过 XLEN 选择 32 位构建
- 已测试 FPGA 板：Digilent Genesys 2 与 Altera Agilex 7
- 工具边界：不包含 OpenOCD，需要时应单独获取

## Further resources

- [CVA6 SDK quick start](https://github.com/openhwgroup/cva6-sdk#quickstart) — image build, board selection, and flashing workflow
- [CVA6 repository](https://github.com/openhwgroup/cva6) — processor and FPGA targets used by the SDK
- [Buildroot manual](https://buildroot.org/downloads/manual/manual.html) — upstream build-system documentation
- [meta-cva6-yocto](https://github.com/openhwgroup/meta-cva6-yocto) — alternative Yocto-based Linux image path for the same boards

## 项目概述

cva6-sdk 仓库 README 描述了完整的 CVA6 Linux 镜像构建流程：`make` 一次性构建 RISC-V 工具链、OpenSBI、U-Boot（含设备树）、Linux 内核和 initramfs/rootfs，最终生成 `install<XLEN>_<BOARD>/sdcard.img`。默认 64-bit/Genesys 2，可用 `XLEN=32`、`BOARD=agilex7` 切换。README 特别注明仓库不包含 openOCD。已测试的 CVA6 配置为 cv32a6_ima_sv32_fpga（32-bit）与 cv64a6_imafdc_sv39（64-bit）。

## 事实核查要点

- README 明确说 "it does not contain openOCD"，介绍工具范围时不要包含 openOCD。
- 支持板卡目前只有 Digilent Genesys 2 和 Agilex 7，其他板卡 README 建议在 OpenHW 发起新项目。
- 与 meta-cva6-yocto（Yocto 路线）互补：cva6-sdk 走 Buildroot/initramfs 路线。

## 主要来源

- https://github.com/openhwgroup/cva6-sdk
- https://github.com/openhwgroup/cva6
