# CV32E40X Design Verification

> cv32e40x-dv 是 CV32E40X 的专用设计验证环境，目录结构同时包含 UVM 仿真环境与 `fv` 形式验证目录。

数据核对日期: 2026-07-16

## Public summary

cv32e40x-dv is the core-specific design-verification environment for CV32E40X. It separates software-test compilation, UVM infrastructure, simulation, top-level testbench code, test cases, and formal-verification runs, giving engineers a direct map from an RTL change to the relevant verification area. Use it together with the CV32E40X RTL repository and shared core-v-verif components when validating the core or its custom-extension interface.

## 中文介绍

cv32e40x-dv 是 CV32E40X 的专用设计验证环境。它将测试软件编译、UVM 基础设施、仿真、顶层 testbench、测试用例和形式验证分别组织，使工程师可以从一项 RTL 修改快速定位到相应验证区域。验证核心本体或自定义扩展接口时，应将它与 CV32E40X RTL 仓库和 core-v-verif 的共享组件配合使用。

## Key facts

- Target: design-verification environment for the CV32E40X core
- BSP: compiles, assembles, and links core test programs
- UVM structure: environment class and supporting infrastructure live under env
- Flow separation: simulation, top-level testbench code, test cases, and formal work have dedicated directories
- Integration context: shared verification components are supplied through the CORE-V verification ecosystem

## 中文核心事实

- 目标：CV32E40X 核心的设计验证环境
- BSP：负责编译、汇编和链接核心测试程序
- UVM 结构：environment class 及配套基础设施位于 env 目录
- 流程划分：仿真、顶层 testbench、测试用例和形式验证分别位于独立目录
- 集成关系：共享验证组件由 CORE-V 验证生态提供

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
