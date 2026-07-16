# CV32E40X Design Verification

> cv32e40x-dv 是 CV32E40X 的专用设计验证环境，目录结构同时包含 UVM 仿真环境与 `fv` 形式验证目录。

数据核对日期: 2026-07-16

## Public summary

cv32e40x-dv is the design-verification environment for the CV32E40X CORE-V processor core. Its README lists a board support package (BSP) for compiling test programs, the UVM environment class and associated infrastructure, simulation and testbench directories, the test-case tree, and an `fv` directory where formal verification is run.

## Key facts

- Target: design-verification environment for the CV32E40X core
- The BSP supports compiling, assembling, and linking core test programs
- The `env` directory contains the UVM environment class and associated infrastructure
- The repository separates simulation, testbench, and test-case directories
- Formal verification is explicitly run from the `fv` directory

## Further resources

- [CV32E40X repository](https://github.com/openhwgroup/cv32e40x) — RTL under verification
- [CV32E40X User Manual](https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/) — official core documentation
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared verification infrastructure

## 项目概述

cv32e40x-dv 仓库 README 列出的目录结构：`bsp`（测试程序的 board support package）、`env`（UVM environment class 及基础设施）、`sim`（仿真运行目录）、`fv`（formal verification 运行目录）、`tb`（实例化 core 的 testbench module）、`tests`（全部 testcase），每个目录有独立 README。与 cv32e20-dv、cv32e40s-dv 属同一代专核 DV 仓库模式。

## 事实核查要点

- README 明确列有 `fv` formal verification 目录，站内验证类型标注 uvm-testbench + formal-verification 有依据。
- 仓库持续有提交（2026-06 仍有 push），比 cv32e40x 核心 RTL 仓库（inactive）更活跃。

## 主要来源

- https://github.com/openhwgroup/cv32e40x-dv
- https://github.com/openhwgroup/cv32e40x
- https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/
