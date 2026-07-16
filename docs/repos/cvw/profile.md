# CVW

> CVW/Wally 是面向教学与工程实践的 5-stage configurable RISC-V processor，资料与课程属性强，是本站教学方向的重要入口。

数据核对日期: 2026-07-16

## Public summary

CVW, also known as CORE-V Wally, is a configurable five-stage SystemVerilog RISC-V processor that spans minimal RV32E designs through feature-rich RV64GC application processors. It combines a broad extension set with optional caches, branch prediction, virtual memory, and standard platform peripherals, and it can boot Linux on FPGA. Its close connection to the RISC-V System-on-Chip Design textbook, examples, and regression flows makes it especially approachable for students while retaining enough configurability for architecture and SoC research.

## 中文介绍

CVW（CORE-V Wally）是一款用 SystemVerilog 编写的可配置五级流水 RISC-V 处理器，配置范围从精简的 RV32E 核心一直延伸到功能完整的 RV64GC 应用处理器。它可选多种指令扩展、缓存、分支预测、虚拟内存和常见平台外设，并能够在 FPGA 上启动 Linux。项目与 RISC-V System-on-Chip Design 教材紧密配套，提供示例和回归流程，因此对学生较友好，同时也具备支持体系结构与 SoC 研究的配置深度。

## Key facts

- Architecture: five-stage SystemVerilog processor configurable for RV32 or RV64
- Configuration range: minimal RV32E through RV64GC with RVA22S64-profile features
- Optional system features: caches, branch prediction, virtual memory, PMP, CLINT, PLIC, UART, and GPIO
- Demonstrated capability: passes RISC-V architecture tests and boots Linux in simulation and on FPGA
- Readiness and learning context: currently identified as TRL-4 and developed alongside a textbook, setup scripts, examples, tests, and regression flows

## 中文核心事实

- 架构：五级流水 SystemVerilog 处理器，可配置为 RV32 或 RV64
- 配置范围：从精简 RV32E 到带 RVA22S64 profile 特性的 RV64GC
- 可选系统功能：缓存、分支预测、虚拟内存、PMP、CLINT、PLIC、UART 和 GPIO
- 已展示能力：通过 RISC-V 架构测试，并可在仿真和 FPGA 上启动 Linux
- 成熟度与学习资源：当前标注为 TRL-4，并配套教材、环境脚本、示例、测试与回归流程

## 主要来源

- https://github.com/openhwgroup/cvw
- https://github.com/openhwgroup/cvw/blob/main/docs/testplans/testplan.md
- https://shop.elsevier.com/books/risc-v-system-on-chip-design/harris/978-0-323-99498-9
- https://pages.hmc.edu/harris/ddca/rvsocd.html
- https://github.com/openhwgroup/cvw/blob/main/errata.md
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores

## Further resources

- [RISC-V System-on-Chip Design](https://shop.elsevier.com/books/risc-v-system-on-chip-design/harris/978-0-323-99498-9) — official publisher page for purchasing the textbook (ISBN 978-0-323-99498-9)
- [Textbook companion resources](https://pages.hmc.edu/harris/ddca/rvsocd.html) — author-maintained lecture slides, labs, sample chapters, exercises, and links to CORE-V Wally
- [Textbook errata](https://github.com/openhwgroup/cvw/blob/main/errata.md) — corrections maintained alongside the CVW repository
- [CVW test plan](https://github.com/openhwgroup/cvw/blob/main/docs/testplans/testplan.md) — verification scope and coverage planning
- [CVW Linux guide](https://github.com/openhwgroup/cvw/blob/main/linux/README.md) — Linux build and test-vector workflow maintained in the repository
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official family positioning for Wally

## 项目概述

CVW README 描述 Wally 为 5-stage pipelined processor，可配置支持 RV32/64、A/B/C/D/F/M/Q、Zk*、virtual memory、PMP、privileged modes、optional caches、branch prediction 以及 CLINT/PLIC/UART/GPIO 等外设。README 还说明它与教材 RISC-V System-on-Chip Design 相关，TRL 为 4。

## 事实核查要点

- 分类建议为 `core` + `learning`，这是少数可以比较自信标为 learning-friendly 的核心仓库。
- 可保留 `linux-application` 与 `embedded-mcu` 两类，因为 README 明确说配置范围从 minimal RV32E 到 RV64GC application processor，并可 boot Linux。
- 不应把 CVW 说成只适合初学者；它也覆盖工程级 SoC 配置、仿真和测试计划。
