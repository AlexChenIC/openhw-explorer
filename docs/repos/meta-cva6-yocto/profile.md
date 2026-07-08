# meta-cva6-yocto

> meta-cva6-yocto 是为 CVA6 构建嵌入式 Linux 镜像的 Yocto layer，提供 Genesys 2 与 Agilex 7 板卡上 32/64-bit CVA6 的 machine 定义。

数据核对日期: 2026-07-08

## Public summary

meta-cva6-yocto is a Yocto layer for building embedded Linux images for the CVA6 core. It depends on openembedded-core, BitBake, and the meta-riscv layer, and provides machine definitions for CVA6 targets on the Digilent Genesys 2 and Altera Agilex 7 FPGA boards in both 32-bit (cv32a6) and 64-bit (cv64a6) configurations.

## 项目概述

meta-cva6-yocto 仓库 README 说明该 layer 兼容 Yocto honister，依赖 openembedded-core、bitbake 与 riscv/meta-riscv。提供四个 machine：cv64a6-genesys2、cv32a6-genesys2、cv64a6-agilex7、cv32a6-agilex7，分别对应 cva6 corev-apu 的 cv64a6_imafdc_sv39 / cv32a6_ima_sv32_fpga bitstream 目标。工作流使用 repo 工具初始化 workspace 后 bitbake 构建 console 镜像。

## 事实核查要点

- 与 cva6-sdk（Buildroot 路线）是两条互补的 CVA6 Linux 构建路径，介绍时注意区分。
- machine 支持列表以 README 为准（Genesys 2 与 Agilex 7 两块板、32/64-bit 各两种）。

## 主要来源

- https://github.com/openhwgroup/meta-cva6-yocto
- https://github.com/openhwgroup/cva6
- https://github.com/riscv/meta-riscv
