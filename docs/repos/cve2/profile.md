# CVE2

> CVE2/CV32E20 是低复杂度、低功耗的 2-stage embedded-class RISC-V core，源自 Ibex/Zero-riscy 路线。

数据核对日期: 2026-07-16

## Public summary

CVE2 currently centers on CV32E20, a production-quality open-source 32-bit RISC-V CPU core with a 2-stage pipeline for embedded control applications. It is based on Ibex/Zero-riscy work and supports RV32I or RV32E plus M and C extensions.

## Key facts

- Family scope: CVE2 currently contains one core, CV32E20
- Architecture: heavily parametrizable 32-bit, 2-stage, in-order core for embedded control applications
- ISA: RV32I or RV32E with multiplication/division and compressed-instruction support
- Origin: forked from lowRISC Ibex and traces back to the PULP Zero-riscy core
- Verification boundary: the RTL repository includes only an experimental simple testbench; project verification is maintained through cv32e20-dv and core-v-verif

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
