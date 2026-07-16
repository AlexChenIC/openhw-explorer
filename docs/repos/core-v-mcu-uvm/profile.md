# CORE-V MCU UVM

> core-v-mcu-uvm 是面向 CORE-V MCU 的 UVM 验证环境，目标是把 CORE-V MCU 项目推进到 TRL-5 及以上。

数据核对日期: 2026-07-16

## Public summary

core-v-mcu-uvm is the chip- and subsystem-level UVM environment built to raise the verification maturity of CORE-V MCU toward TRL-5 and beyond. It covers the MCU at chip level and includes reusable environments for blocks such as the APB timer, while consuming the RTL as a submodule. This repository is most relevant to experienced DV engineers because its flows depend on Moore.io packages, simulator-specific tooling, and in some cases licensed Datum verification IP; the stated TRL level is a goal, not an achieved certification.

## 中文介绍

core-v-mcu-uvm 是为提升 CORE-V MCU 验证成熟度而建设的芯片级与子系统级 UVM 环境，目标指向 TRL-5 及更高阶段。它覆盖完整 MCU，也包含 APB timer 等模块的可复用验证环境，并通过 submodule 引入被测 RTL。该仓库更适合有经验的 DV 工程师，因为流程依赖 Moore.io 软件包、特定仿真器，部分验证 IP 还需要授权的 Datum 组件；TRL-5 是项目目标，并不代表已经达成。

## Key facts

- Goal: advance CORE-V MCU verification toward TRL-5 and beyond; this is a target rather than a completed milestone
- Scope: chip-level CORE-V MCU environment and testbench plus APB timer subsystem environments
- RTL boundary: CORE-V MCU is consumed as a Git submodule and is not maintained here
- Tooling: Moore.io packages, Metrics DSim Cloud, Vivado, and simulator-specific flows
- Access requirements: some VIP libraries require a Moore.io account and licensed Datum packages

## 中文核心事实

- 目标：推动 CORE-V MCU 验证达到 TRL-5 及更高阶段，这是目标而非已完成里程碑
- 范围：芯片级 CORE-V MCU 环境与 testbench，以及 APB timer 子系统环境
- RTL 边界：CORE-V MCU 通过 Git submodule 引入，并不在本仓库维护
- 工具：涉及 Moore.io 软件包、Metrics DSim Cloud、Vivado 和特定仿真器流程
- 访问要求：部分 VIP 库需要 Moore.io 账户和授权的 Datum 软件包

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
