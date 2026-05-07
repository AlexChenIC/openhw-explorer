# CV-X-IF

> CV-X-IF 是 OpenHW 的 RISC-V extension interface specification，用于自定义协处理器/ISA 扩展接入。

数据核对日期: 2026-05-07

## Public summary

CV-X-IF, the CORE-V eXtension Interface, is a RISC-V extension interface specification for integrating custom coprocessors and ISA extensions with existing RISC-V processors. The repository contains the specification sources and SystemVerilog-oriented interface material.

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
