# CVFPU UVM Verification

> cvfpu-uvm 是 CVFPU 在 CVA6 wrapper 场景下的 UVM 验证环境，使用 C++ reference model 和 SystemVerilog DPI。

数据核对日期: 2026-07-16

## Public summary

cvfpu-uvm is the dedicated UVM environment for verifying CVFPU through the floating-point wrapper used by CVA6. It combines test plans, agents, scoreboards, regression lists, and a C++ reference model connected to SystemVerilog through DPI, with CVA6 and core-v-verif supplied as dependencies. This repository is the right entry point for engineers validating floating-point operations and wrapper integration, provided they have access to one of the documented commercial simulator flows.

## 中文介绍

cvfpu-uvm 是用于验证 CVFPU 的专用 UVM 环境，被测对象是 CVA6 使用的浮点单元 wrapper。它整合测试计划、agent、scoreboard、回归列表，以及通过 SystemVerilog DPI 接入的 C++ 参考模型，并依赖 CVA6 与 core-v-verif。若工程师需要验证浮点运算和 wrapper 集成，这里是合适的入口，但现有流程主要面向已列出的商业仿真器。

## Key facts

- DUT: CVA6 wrapper around the CVFPU floating-point unit
- Testbench: UVM environment, agent, scoreboard, tests, top-level testbench, and regression lists
- Reference model: C++ shared library connected to SystemVerilog through DPI
- Dependencies: CVA6 and core-v-verif are included as Git submodules
- Simulator support: documented flows for QuestaSim, Xcelium, and VCS

## 中文核心事实

- 被测对象：CVFPU 浮点单元的 CVA6 wrapper
- Testbench：包含 UVM environment、agent、scoreboard、测试、顶层 testbench 和回归列表
- 参考模型：编译为共享库并通过 DPI 连接 SystemVerilog 的 C++ 模型
- 依赖：以 Git submodule 方式引入 CVA6 与 core-v-verif
- 仿真器支持：提供 QuestaSim、Xcelium 和 VCS 流程

## Further resources

- [CVFPU RTL repository](https://github.com/openhwgroup/cvfpu) — floating-point unit being verified
- [CVFPU UVM test plan](https://github.com/openhwgroup/cvfpu-uvm/tree/main/docs/testplan) — verification planning material
- [CVA6 repository](https://github.com/openhwgroup/cva6) — source of the wrapper used as the DUT
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared dependency used by the testbench

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
