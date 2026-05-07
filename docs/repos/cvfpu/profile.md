# CVFPU

> CVFPU/FPnew 是可参数化 floating-point unit；README 写的是 aims to be IEEE 754-2008 compliant，不能直接写成完全符合。

数据核对日期: 2026-05-07

## Public summary

CVFPU, also known as FPnew, is a parametric SystemVerilog floating-point unit supporting standard RISC-V formats and transprecision formats. Its README says the design aims to be IEEE 754-2008 compliant and explicitly notes known compliance caveats for the PULP DivSqrt unit.

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
