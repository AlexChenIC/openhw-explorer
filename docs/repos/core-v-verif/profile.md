# CORE-V Verification

> core-v-verif 是 OpenHW CORE-V 家族共享的功能验证基础设施，是验证筛选维度的核心锚点。

数据核对日期: 2026-05-07

## Public summary

core-v-verif is the shared functional verification project for the CORE-V family of RISC-V cores. It provides common verification infrastructure, core-specific directories for CV32E40P/CV32E40X/CV32E40S/CVA6, documentation for verification strategy and DV plans, and Bender-based hardware dependency management.

## 项目概述

官方 README 将 core-v-verif 描述为 Functional verification project for the CORE-V family of RISC-V cores。仓库包含 `cv32e40p`、`cv32e40x`、`cv32e40s`、`cva6` 等 core-specific verification code，以及 docs、common Makefiles、libraries 和 utility scripts。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench` + `industrial-grade`。
- 这是多个 core README 指向的验证环境，尤其是 CV32E40P/CV32E40X/CV32E40S。
- 不应把它描述成只服务单个核心；它是 shared verification infrastructure。

## 主要来源

- https://github.com/openhwgroup/core-v-verif
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
