# CVFPU

> CVFPU/FPnew 是可参数化 floating-point unit；README 写的是 aims to be IEEE 754-2008 compliant，不能直接写成完全符合。

数据核对日期: 2026-07-16

## Public summary

CVFPU, also known as FPnew, is a highly parameterized SystemVerilog floating-point unit for processors and accelerators that need more flexibility than a fixed FP32 or FP64 datapath. Designers can select standard binary formats, custom exponent and mantissa widths, operations, pipeline behavior, and optional packed-SIMD support, making it useful for both conventional RISC-V floating point and transprecision research. The project aims at IEEE 754-2008 behavior, but adopters must account for documented compliance limitations in the optional PULP DivSqrt implementation.

## 中文介绍

CVFPU（FPnew）是一款高度参数化的 SystemVerilog 浮点单元，适合需要比固定 FP32 或 FP64 数据通路更灵活的处理器与加速器。设计者可以选择标准二进制格式、自定义指数和尾数位宽、运算集合、流水线方式以及可选 packed-SIMD，因此既能支持常规 RISC-V 浮点计算，也适合 transprecision 研究。项目目标是实现 IEEE 754-2008 行为，但采用可选 PULP DivSqrt 单元时必须考虑已经记录的兼容性限制。

## Key facts

- Design: parameterized SystemVerilog floating-point unit also known as FPnew
- Formats: binary16/32/64/128 plus custom exponent and mantissa widths
- Operations: arithmetic, fused multiply-add, division, square root, comparisons, conversions, classification, and optional packed SIMD
- Standards posture: designed to target IEEE 754-2008 behavior, without an unconditional compliance claim
- Known limitation: the PULP DivSqrt option has rounding and inexact-flag issues in some cases

## 中文核心事实

- 设计：高度参数化的 SystemVerilog 浮点单元，也称 FPnew
- 格式：支持 binary16/32/64/128，以及自定义指数和尾数位宽
- 运算：算术、融合乘加、除法、平方根、比较、转换、分类和可选 packed SIMD
- 标准定位：目标是实现 IEEE 754-2008 行为，但没有无条件完全符合的声明
- 已知限制：PULP DivSqrt 选项在部分场景存在舍入和 inexact flag 问题

## Further resources

- [FPnew architecture documentation](https://github.com/openhwgroup/cvfpu/blob/develop/docs/README.md) — configuration, interfaces, and architecture
- [CVFPU UVM environment](https://github.com/openhwgroup/cvfpu-uvm) — dedicated UVM verification project
- [FPnew publication](https://doi.org/10.1109/TVLSI.2020.3044752) — publication recommended by the repository
- [CVA6 repository](https://github.com/openhwgroup/cva6) — one OpenHW integration context for CVFPU

## 项目概述

CVFPU README 描述它支持 standard RISC-V formats and operations as well as transprecision formats。它可以配置 exponent/mantissa bit widths，支持 binary16/32/64/128 等 IEEE 754-style binary formats，支持多种 rounding modes 与 status flags，也支持 packed-SIMD variants。

## 事实核查要点

- 站内描述应使用 “aims to be IEEE 754-2008 compliant”，不要写成绝对 compliant。
- README footnote 明确提到 PULP DivSqrt unit 有 known compliance issues，因此这是重要事实核查点。
- 分类建议为 `ip`，并与 `cva6`、`cvfpu-uvm` 关联。

## 主要来源

- https://github.com/openhwgroup/cvfpu
- https://github.com/openhwgroup/cvfpu/blob/develop/CITATION.cff
- https://doi.org/10.1109/TVLSI.2020.3044752
- https://arxiv.org/abs/2007.01530
