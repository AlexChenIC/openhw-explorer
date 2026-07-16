# CORE-V MCU UVM

> core-v-mcu-uvm 是面向 CORE-V MCU 的 UVM 验证环境，目标是把 CORE-V MCU 项目推进到 TRL-5 及以上。

数据核对日期: 2026-07-16

## Public summary

core-v-mcu-uvm is an advanced UVM verification environment for the CORE-V MCU project. Its README says the project aims to bring CORE-V MCU to TRL-5 and beyond, with chip-level and subsystem-level UVM environments and Moore.io/Datum-related infrastructure.

## Key facts

- Goal: the README says the project aims to bring CORE-V MCU to TRL-5 and beyond; it does not claim that this level has already been achieved
- Verification scope includes a chip-level CORE-V MCU environment and testbench plus APB timer subsystem environments
- The CORE-V MCU RTL is consumed as a Git submodule rather than maintained in this repository
- Tooling described by the README includes Moore.io packages, Metrics DSim Cloud, Vivado, and simulator-specific flows
- Some VIP libraries require a Moore.io account and licensed Datum packages

## Further resources

- [CORE-V MCU documentation](https://docs.openhwgroup.org/projects/core-v-mcu/index.html) — official documentation for the design under verification
- [CORE-V MCU repository](https://github.com/openhwgroup/core-v-mcu) — RTL platform consumed by this testbench
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared verification infrastructure across the ecosystem

## 项目概述

README 明确写到该项目 aims to bring OpenHW Group's CORE-V MCU Project to TRL-5 and beyond via Advanced UVM Verification。仓库结构包含 `uvme_cvmcu_chip`、`uvmt_cvmcu_chip`、APB timer subsystem environment/testbench 等，并依赖 Moore.io CLI、Metrics DSim Cloud、Vivado 等工具链。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 不应把它当作 CORE-V MCU RTL 或 DevKit 资料仓库；它是验证环境。
- 可在详情中关联 `core-v-mcu` 与 `core-v-verif`。

## 主要来源

- https://github.com/openhwgroup/core-v-mcu-uvm
- https://docs.openhwgroup.org/projects/core-v-mcu/index.html
