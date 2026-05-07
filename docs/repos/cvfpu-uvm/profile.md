# CVFPU UVM Verification

> cvfpu-uvm 是 CVFPU 在 CVA6 wrapper 场景下的 UVM 验证环境，使用 C++ reference model 和 SystemVerilog DPI。

数据核对日期: 2026-05-07

## Public summary

cvfpu-uvm provides a UVM verification environment for CVFPU, with the DUT described as the CVA6 wrapper of the floating-point unit. The repository includes test plans, UVM environment components, a C++ reference model exposed through SystemVerilog DPI, and simulator-specific regression flows.

## 项目概述

README 的 Project Overview 写明该仓库 contains a UVM Verification Environment for CVFPU，DUT is the CVA6 wrapper of the floating-point unit。目录包含 docs/testplan、env、fpu_agent、fpu_common、modules、ref_model_csim、simu、tests、top 与 scripts。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 不应把它写成 CVFPU RTL 仓库；CVFPU RTL 在 `cvfpu`。
- 可说明支持 QuestaSim、Xcelium、VCS 等仿真工具，但不要暗示这些工具都是开源。

## 主要来源

- https://github.com/openhwgroup/cvfpu-uvm
- https://github.com/openhwgroup/cvfpu
- https://github.com/openhwgroup/cva6
