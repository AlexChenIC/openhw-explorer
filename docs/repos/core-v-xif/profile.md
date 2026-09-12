# CV-X-IF

> CV-X-IF 是 OpenHW 的 RISC-V extension interface specification，用于自定义协处理器/ISA 扩展接入。

数据核对日期: 2026-09-12

## Public summary

CV-X-IF, the CORE-V eXtension Interface, specifies how custom coprocessors and instruction-set extensions connect to a RISC-V CPU. Its basic channels handle compressed instructions, instruction issue, register operands, commit control, and results, allowing accelerator logic to remain outside the host pipeline. Memory and memory-result channels are optional and depend on the specification version and processor implementation. Integrators should check both sides of the interface against the same supported protocol; this is an interface specification, not a ready-made accelerator or a general mechanism for arbitrary control-flow and privileged extensions.

## 中文介绍

CV-X-IF（CORE-V eXtension Interface）规定自定义协处理器及指令集扩展如何接入 RISC-V CPU。基本通道分别处理压缩指令、指令发射、寄存器操作数、提交控制与结果，使加速逻辑可以保留在主处理器流水线之外。访存与访存结果通道是可选能力，取决于规范版本和处理器实现。集成时应核对两端支持的协议，而不能假设所有 CV-X-IF 实现可直接互换；它是接口规范，不是现成加速器，也不是实现任意控制流或特权扩展的通用机制。

## Key facts

- Artifact type: versioned interface specification, not a processor core or concrete accelerator
- Purpose: connect custom coprocessors and ISA extensions to an existing RISC-V processor
- Protocol structure: compressed, issue, register, commit, and result channels; memory and memory-result channels are optional and implementation-dependent
- Documentation: reStructuredText/Sphinx sources published through OpenHW documentation hosting
- Versioning: semantic versions derived from Git tags through setuptools_scm

## 中文核心事实

- 产物类型：带版本管理的接口规范，不是处理器核心或具体加速器
- 用途：将自定义协处理器与 ISA 扩展连接到现有 RISC-V 处理器
- 协议结构：包含 compressed、issue、register、commit、result 通道；memory 与 memory-result 通道可选，需检查具体实现
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

- 主分类建议为 `ip`，不是 tools；同时加入 `docs` 次分类，因为仓库的主要公开产物是版本化规范与 Sphinx 文档。
- 强关联 `cv32e40x` 与 `cva6` 等支持扩展接口的核心。
- 不应把它写成某个具体 accelerator；它是 interface specification/framework。

## 主要来源

- https://github.com/openhwgroup/core-v-xif/blob/d26eeab3/docs/source/x_ext.rst
- https://github.com/openhwgroup/core-v-xif/blob/d26eeab3/docs/source/intro.rst
- https://github.com/openhwgroup/core-v-xif
- https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/
- https://github.com/openhwgroup/core-v-cores
