# meta-cva6-yocto

> meta-cva6-yocto 是为 CVA6 构建嵌入式 Linux 镜像的 Yocto layer，提供 Genesys 2 与 Agilex 7 板卡上 32/64-bit CVA6 的 machine 定义。

数据核对日期: 2026-07-16

## Public summary

meta-cva6-yocto is an OpenEmbedded layer for building reproducible embedded-Linux images and extensible SDKs for CVA6. It defines 32-bit and 64-bit machines for Genesys 2 and Agilex 7 and composes openembedded-core, BitBake, and meta-riscv into a board-oriented image workflow. This is the appropriate route for engineers already using Yocto layer management; its declared compatibility is the older Honister release, so dependency versions should be reviewed before adopting it in a new build system.

## 中文介绍

meta-cva6-yocto 是一套用于为 CVA6 构建可复现嵌入式 Linux 镜像和 extensible SDK 的 OpenEmbedded layer。它为 Genesys 2 与 Agilex 7 定义 32 位和 64 位 machine，并将 openembedded-core、BitBake 与 meta-riscv 组合为面向板卡的镜像流程。对于已经采用 Yocto layer 管理的工程团队，这是一条合适路线；但项目声明兼容的是较旧的 Honister 版本，新构建系统采用前应先检查依赖版本。

## Key facts

- Artifact type: Yocto/OpenEmbedded layer for CVA6 embedded-Linux images and SDKs
- Declared compatibility: Yocto Honister
- Dependencies: openembedded-core, BitBake, and riscv/meta-riscv
- Machine definitions: 32-bit and 64-bit CVA6 targets for Genesys 2 and Agilex 7
- Tested image: core-image-minimal for both 32-bit and 64-bit configurations against a recorded CVA6 revision

## 中文核心事实

- 产物类型：面向 CVA6 嵌入式 Linux 镜像与 SDK 的 Yocto/OpenEmbedded layer
- 声明兼容版本：Yocto Honister
- 依赖：openembedded-core、BitBake 与 riscv/meta-riscv
- Machine 定义：Genesys 2 和 Agilex 7 的 32 位与 64 位 CVA6 目标
- 已测试镜像：针对记录的 CVA6 revision 测试 32 位和 64 位 core-image-minimal

## Further resources

- [Yocto 3.4 documentation](https://docs.yoctoproject.org/3.4/) — documentation corresponding to the Honister release named by the layer
- [meta-riscv](https://github.com/riscv/meta-riscv) — RISC-V Yocto layer dependency
- [CVA6 repository](https://github.com/openhwgroup/cva6) — processor and FPGA bitstream targets
- [CVA6 SDK](https://github.com/openhwgroup/cva6-sdk) — complementary Buildroot-based image workflow

## 项目概述

meta-cva6-yocto 仓库 README 说明该 layer 兼容 Yocto honister，依赖 openembedded-core、bitbake 与 riscv/meta-riscv。提供四个 machine：cv64a6-genesys2、cv32a6-genesys2、cv64a6-agilex7、cv32a6-agilex7，分别对应 cva6 corev-apu 的 cv64a6_imafdc_sv39 / cv32a6_ima_sv32_fpga bitstream 目标。工作流使用 repo 工具初始化 workspace 后 bitbake 构建 console 镜像。

## 事实核查要点

- 与 cva6-sdk（Buildroot 路线）是两条互补的 CVA6 Linux 构建路径，介绍时注意区分。
- machine 支持列表以 README 为准（Genesys 2 与 Agilex 7 两块板、32/64-bit 各两种）。

## 主要来源

- https://github.com/openhwgroup/meta-cva6-yocto
- https://github.com/openhwgroup/cva6
- https://github.com/riscv/meta-riscv
