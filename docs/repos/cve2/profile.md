# CVE2

> CVE2/CV32E20 是低复杂度、低功耗的 2-stage embedded-class RISC-V core，源自 Ibex/Zero-riscy 路线。

数据核对日期: 2026-07-16

## Public summary

CVE2 is OpenHW's low-complexity embedded-core family, currently represented by the two-stage CV32E20 processor. The core is a heavily parameterized 32-bit, in-order design supporting RV32I or RV32E with optional multiplication/division and compressed instructions, making it suitable for control-oriented systems where area and energy matter more than peak performance. Students can use it to understand a small modern pipeline, while engineers should pair the RTL with cv32e20-dv and core-v-verif for serious verification work.

## 中文介绍

CVE2 是 OpenHW 的低复杂度嵌入式核心家族，目前主要由两级流水的 CV32E20 代表。该核心是一款高度参数化的 32 位顺序执行设计，支持 RV32I 或 RV32E，并可选乘除法与压缩指令，适合面积和能耗优先于峰值性能的控制型系统。学生可以借它理解精简的现代处理器流水线；工程使用则应结合 cv32e20-dv 与 core-v-verif 进行完整验证。

## Key facts

- Family scope: CVE2 currently contains the CV32E20 core
- Architecture: heavily parameterized 32-bit, two-stage, in-order processor for embedded control
- ISA: RV32I or RV32E with optional multiplication/division and compressed instructions
- Origin: forked from lowRISC Ibex and traceable to the PULP Zero-riscy core
- Verification boundary: the local simple testbench is experimental; project verification is maintained in cv32e20-dv and core-v-verif

## 中文核心事实

- 家族范围：CVE2 当前包含 CV32E20 核心
- 架构：高度参数化的 32 位、两级流水、顺序执行嵌入式处理器
- 指令集：RV32I 或 RV32E，可选乘除法与压缩指令
- 来源：由 lowRISC Ibex 分支演进，并可追溯到 PULP Zero-riscy 核心
- 验证边界：仓库内简单 testbench 仅供实验，项目验证主要位于 cv32e20-dv 与 core-v-verif

## Further resources

- [CVE2 User Manual](https://docs.openhwgroup.org/projects/cve2-user-manual/en/latest/) — official core documentation
- [CV32E20 design-verification repository](https://github.com/openhwgroup/cv32e20-dv) — core-specific verification environment
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — family positioning and TRL roadmap
- [Zero-riscy/PATMOS publication](https://doi.org/10.1109/PATMOS.2017.8106976) — origin paper cited by the repository

## 项目概述

CVE2 README 说明 CVE2 是一类 2-stage OpenHW cores，目前唯一核心是 CV32E20。CV32E20 是 Ibex fork，目标是低成本，并延续 Zero-riscy 的低面积/低功耗定位。README 还描述该核心为 production-quality open-source 32-bit RISC-V CPU core，适合 embedded control applications，并支持 I/E、M、C。

## 事实核查要点

- OpenHW 官方项目表将 CV32E20/CVE2 列为 active development。
- 分类建议为 `core`，core type 为 `embedded-mcu` + `low-power`。
- 验证环境主要关联 `cv32e20-dv` 与 OpenHW verification infrastructure，不应把 RTL 仓库本身写成完整 DV 仓库。

## 主要来源

- https://github.com/openhwgroup/cve2
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
- https://github.com/openhwgroup/cv32e20-dv
