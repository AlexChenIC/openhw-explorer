# CVFPU

> CVFPU/FPnew 是可参数化 floating-point unit；README 写的是 aims to be IEEE 754-2008 compliant，不能直接写成完全符合。

数据核对日期: 2026-09-12

## Public summary

CVFPU, also known as FPnew, is a parameterized SystemVerilog floating-point unit for processors and accelerators. Its built-in formats are FP32, FP64, FP16, FP8, and FP16ALT, with configurable operations, pipeline behavior, and optional packed SIMD. Other exponent and mantissa widths require extending the format definitions and checking the affected operations and verification coverage; binary128 is not a built-in selectable format. The design serves both conventional RISC-V floating point and transprecision research. It targets IEEE 754-2008 behavior, with documented rounding and inexact-flag limitations in the optional PULP DivSqrt implementation.

## 中文介绍

CVFPU（FPnew）是一款可参数化的 SystemVerilog 浮点单元，面向处理器与加速器。当前内置 FP32、FP64、FP16、FP8 和 FP16ALT 格式，可配置运算集合、流水线方式及 packed SIMD。其他指数和尾数位宽需要扩展格式定义，并检查受影响的运算与验证覆盖；binary128 不是现成可选的内置格式。它既适合常规 RISC-V 浮点计算，也适合混合精度研究。项目目标是实现 IEEE 754-2008 行为，但可选 PULP DivSqrt 实现在部分场景存在舍入和 inexact 标志限制。

## Key facts

- Design: parameterized SystemVerilog floating-point unit also known as FPnew
- Built-in formats: FP32, FP64, FP16, FP8, and FP16ALT; additional formats require changes to the package definitions and corresponding verification
- Operations: arithmetic, fused multiply-add, division, square root, comparisons, conversions, classification, and optional packed SIMD
- Standards posture: designed to target IEEE 754-2008 behavior, without an unconditional compliance claim
- Known limitation: the PULP DivSqrt option has rounding and inexact-flag issues in some cases

## 中文核心事实

- 设计：高度参数化的 SystemVerilog 浮点单元，也称 FPnew
- 内置格式：FP32、FP64、FP16、FP8 和 FP16ALT；其他格式需要修改 package 定义并补充相应验证
- 运算：算术、融合乘加、除法、平方根、比较、转换、分类和可选 packed SIMD
- 标准定位：目标是实现 IEEE 754-2008 行为，但没有无条件完全符合的声明
- 已知限制：PULP DivSqrt 选项在部分场景存在舍入和 inexact flag 问题

## Further resources

- [FPnew architecture documentation](https://github.com/openhwgroup/cvfpu/blob/develop/docs/README.md) — configuration, interfaces, and architecture
- [CVFPU UVM environment](https://github.com/openhwgroup/cvfpu-uvm) — dedicated UVM verification project
- [FPnew publication](https://doi.org/10.1109/TVLSI.2020.3044752) — publication recommended by the repository
- [FPnew preprint](https://arxiv.org/abs/2007.01530) — open-access version of the same FPnew work, not a separate paper
- [CVA6 repository](https://github.com/openhwgroup/cva6) — one OpenHW integration context for CVFPU

## 项目概述

CVFPU 支持标准 RISC-V 浮点运算及混合精度格式。核查版本的 fpnew_pkg.sv 定义 NUM_FP_FORMATS=5，包含 FP32、FP64、FP16、FP8、FP16ALT。文档中的任意 IEEE 风格格式是架构可扩展性，不代表已内置 binary128；新增格式需要修改枚举、编码及相关配置尺寸。

## 事实核查要点

- 站内描述应使用 “aims to be IEEE 754-2008 compliant”，不要写成绝对 compliant。
- README footnote 明确提到 PULP DivSqrt unit 有 known compliance issues，因此这是重要事实核查点。
- 分类建议为 `ip`，并与 `cva6`、`cvfpu-uvm` 关联。

## 主要来源

- https://github.com/openhwgroup/cvfpu/blob/355c388e/src/fpnew_pkg.sv
- https://github.com/openhwgroup/cvfpu/blob/355c388e/docs/README.md#adding-custom-formats
- https://github.com/openhwgroup/cvfpu
- https://github.com/openhwgroup/cvfpu/blob/develop/CITATION.cff
- https://doi.org/10.1109/TVLSI.2020.3044752
- https://arxiv.org/abs/2007.01530
