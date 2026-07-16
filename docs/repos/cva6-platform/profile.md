# CVA6 Platform

> cva6-platform 是"多核 CVA6 + CV-MESH"的软件测试/回归平台，基于 OpenPiton 构建，提供 Genesys II 预编译 bitstream 与 Fedora 镜像快速上手。

数据核对日期: 2026-07-16

## Public summary

CVA6 Platform is an older multicore CVA6 and CV-MESH system assembled on top of OpenPiton for software testing and regression. It provides a pre-built Genesys 2 bitstream and Fedora image as well as a full path for rebuilding FPGA hardware, OpenSBI firmware, U-Boot, and Linux. The repository is useful when reproducing this specific OpenPiton-based platform, but its inactive maintenance state makes the current CVA6 repository and SDKs better starting points for new single-core or actively supported work.

## 中文介绍

CVA6 Platform 是一套较早期的多核 CVA6 与 CV-MESH 系统，建立在 OpenPiton 之上，用于软件测试和回归。项目提供预编译的 Genesys 2 bitstream 与 Fedora 镜像，也记录了从 FPGA 硬件到 OpenSBI、U-Boot 和 Linux 的完整重建路径。若需要复现这套特定的 OpenPiton 平台，该仓库仍有价值；对于新的单核或持续维护项目，当前 CVA6 仓库与 SDK 通常是更合适的起点。

## Key facts

- Purpose: multicore CVA6 plus CV-MESH platform for software testing and regression
- Quick start: pre-built Genesys 2 bitstream and Fedora image
- Hardware foundation: Princeton OpenPiton with its CVA6/Ariane tile
- Boot stack: OpenSBI firmware payload, U-Boot, and Linux kernel/image
- Maintenance context: latest recorded push is from November 2023 and the project is classified as inactive

## 中文核心事实

- 用途：面向软件测试与回归的多核 CVA6 + CV-MESH 平台
- 快速体验：提供预编译 Genesys 2 bitstream 和 Fedora 镜像
- 硬件基础：Princeton OpenPiton 及其中的 CVA6/Ariane tile
- 启动栈：OpenSBI firmware payload、U-Boot 与 Linux 内核/镜像
- 维护状态：最近记录的推送时间为 2023 年 11 月，项目标为非活跃

## Further resources

- [Genesys 2 quick start](https://github.com/openhwgroup/cva6-platform#genesys-ii-getting-started) — board setup and links to the pre-built bitstream and Fedora image
- [OpenPiton](https://parallel.princeton.edu/openpiton/) — platform used by the documented build flow
- [CV-MESH repository](https://github.com/openhwgroup/cv-mesh) — related cache-coherence/interconnect components
- [CVA6 repository](https://github.com/openhwgroup/cva6) — processor core used by the platform

## 项目概述

cva6-platform 仓库 README 描述了两条使用路径：一是下载 downloads.openhwgroup.org 上的预编译 bitstream 和 Fedora 镜像，在 Digilent Genesys II 上直接启动；二是完整构建流程——克隆 PrincetonUniversity/openpiton（openpiton-dev 分支，其 ariane tile 即 CVA6），用 Vivado 编译 bitstream，再生成 OpenSBI fw_payload.bin 并构建 Linux。仓库最后更新于 2023 年，站内状态标为 inactive。

## 事实核查要点

- 平台构建实际依赖 Princeton OpenPiton 仓库，本仓库主要是说明与素材。
- 预编译资源日期为 2023-11，仓库最后 push 2023-11，不应描述为活跃项目。
- 与 core-v-polara-apu（同样基于 OpenPiton）和 cv-mesh 相关联。

## 主要来源

- https://github.com/openhwgroup/cva6-platform
- https://github.com/openhwgroup/cva6
- https://github.com/openhwgroup/cv-mesh
- https://parallel.princeton.edu/openpiton/
