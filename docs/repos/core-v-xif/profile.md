# CV-X-IF

> CV-X-IF 是 OpenHW 的 RISC-V extension interface specification，用于自定义协处理器/ISA 扩展接入。

数据核对日期: 2026-07-16

## Public summary

CV-X-IF, the CORE-V eXtension Interface, is a specification for connecting custom coprocessors and instruction-set extensions to an existing RISC-V CPU. Independent protocol channels separate instruction offload, operand transfer, commit control, memory interaction, and result writeback so accelerator logic can remain outside the host pipeline. Architects should use this repository to understand the interface contract and versioned protocol; it is a specification, not a ready-made accelerator or processor core.

## 中文介绍

CV-X-IF（CORE-V eXtension Interface）是一套用于把自定义协处理器和指令集扩展连接到现有 RISC-V CPU 的接口规范。协议通过独立通道划分指令卸载、操作数传输、提交控制、访存交互和结果回写，使加速逻辑可以保留在主处理器流水线之外。体系结构与集成工程师应在这里了解接口契约及版本变化；该仓库提供的是规范，并不是现成的加速器或处理器核心。

## Key facts

- Artifact type: versioned interface specification, not a processor core or concrete accelerator
- Purpose: connect custom coprocessors and ISA extensions to an existing RISC-V processor
- Protocol structure: independent channels for offload, operands, commit, memory, and result handling
- Documentation: reStructuredText/Sphinx sources published through OpenHW documentation hosting
- Versioning: semantic versions derived from Git tags through setuptools_scm

## 中文核心事实

- 产物类型：带版本管理的接口规范，不是处理器核心或具体加速器
- 用途：将自定义协处理器与 ISA 扩展连接到现有 RISC-V 处理器
- 协议结构：为卸载、操作数、提交、访存和结果处理设置独立通道
- 文档：使用 reStructuredText/Sphinx，并发布在 OpenHW 文档站点
- 版本管理：通过 Git tag 与 setuptools_scm 生成语义化版本

## Further resources

- [CV-X-IF specification](https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/) — rendered official specification
- [CV32E40X User Manual](https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/) — a core that exposes CORE-V-XIF
- [CVA6 repository](https://github.com/openhwgroup/cva6) — CORE-V family implementations and configurations using the interface
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official cross-core context

## 项目概述

README 将 CV-X-IF 描述为 RISC-V eXtension interface that provides a generalized framework suitable to implement custom coprocessors and ISA extensions for existing RISC-V processors。规范文档在 `docs` 中，以 reStructuredText/Sphinx 维护。

## 事实核查要点

- 分类建议为 `ip`，不是 tools。
- 强关联 `cv32e40x` 与 `cva6` 等支持扩展接口的核心。
- 不应把它写成某个具体 accelerator；它是 interface specification/framework。

## 主要来源

- https://github.com/openhwgroup/core-v-xif
- https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/
- https://github.com/openhwgroup/core-v-cores
