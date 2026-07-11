# CV-X-IF

> CV-X-IF 是 OpenHW 的 RISC-V extension interface specification，用于自定义协处理器/ISA 扩展接入。

数据核对日期: 2026-07-11

## Public summary

CV-X-IF, the CORE-V eXtension Interface, is a RISC-V eXtension interface specification that provides a generalized framework for implementing custom coprocessors and ISA extensions for existing RISC-V processors, featuring independent channels for accelerator-agnostic instruction offloading and result writeback. The repository contains the specification sources, versioned through git tags using semantic versioning.

## Key facts

- Artifact type: interface specification and framework, not a processor core or a concrete accelerator
- Purpose: connect custom coprocessors and ISA extensions to an existing RISC-V processor
- Protocol shape: independent channels for accelerator-agnostic instruction offload and result writeback
- Documentation: reStructuredText/Sphinx sources are published through OpenHW documentation hosting
- Versioning: semantic versions are derived from Git tags with setuptools_scm rather than hardcoded in the source

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
