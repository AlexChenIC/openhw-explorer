# CVA6 Platform

> cva6-platform 是"多核 CVA6 + CV-MESH"的软件测试/回归平台，基于 OpenPiton 构建，提供 Genesys II 预编译 bitstream 与 Fedora 镜像快速上手。

数据核对日期: 2026-07-11

## Public summary

CVA6 Platform is a multi-core CVA6 system with CV-MESH intended for software testing and regression. Its README provides pre-built Genesys II bitstreams and a Fedora image for a quick start, plus OpenPiton-based build instructions covering bitstream compilation, OpenSBI firmware payload generation, and Linux image builds.

## Key facts

- Purpose: multi-core CVA6 plus CV-MESH platform intended for software testing and regression
- Quick start: pre-built Genesys 2 bitstream and Fedora image published by OpenHW
- Build foundation: the documented hardware flow uses Princeton OpenPiton and its CVA6/Ariane tile
- Boot stack: OpenSBI firmware payload, U-Boot, and a Linux kernel/image copied to the boot media
- Maintenance context: the repository's latest GitHub push is from November 2023, so the site treats it as inactive rather than a current flagship

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
