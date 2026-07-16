# CORE-ET

> CORE-ET 现以 ETASP（Agentic Silicon Platform）形式推进：由 Ainekko 发起，用 agentic 工作流把原 CORE-ET many-core RTL 翻译为干净的 SystemVerilog IP 目录；原始 RTL 与文档保留在 erbium 分支。

数据核对日期: 2026-07-16

## Public summary

CORE-ET currently hosts the CORE-ET Agentic Silicon Platform (ETASP), which organizes reusable hardware IP for translation, verification, documentation, and integration by agent-assisted development workflows. The main branch is translating the original CORE-ET modules into documented lowRISC-style SystemVerilog with technology abstractions and Verilator-based testing, while the historical RTL and microarchitecture material remain on the erbium branch. Readers should choose the main branch to study the current IP-workflow experiment and the erbium branch when they need the original manycore/MRAM-era implementation.

## 中文介绍

CORE-ET 当前承载 CORE-ET Agentic Silicon Platform（ETASP），尝试把可复用硬件 IP 组织成便于智能代理辅助翻译、验证、文档化和集成的形式。主分支正在将原始 CORE-ET 模块转换为带独立文档、技术抽象层和 Verilator 测试的 lowRISC 风格 SystemVerilog；历史 RTL 与微架构资料则保留在 erbium 分支。想了解当前 IP 工作流实验的读者应查看主分支，需要原始 manycore/MRAM 时代实现的读者应转到 erbium 分支。

## Key facts

- Current identity: CORE-ET Agentic Silicon Platform (ETASP), an Ainekko project
- Main-branch work: documented, lowRISC-style SystemVerilog translations of original CORE-ET modules
- Verification: Verilator unit tests and side-by-side RTL co-simulation against the original source tree
- Technology abstraction: generic simulation plus iCE40 and Xilinx FPGA implementations; ASIC support remains future work
- Historical boundary: original CORE-ET RTL and microarchitecture documentation remain on the erbium branch

## 中文核心事实

- 当前定位：CORE-ET Agentic Silicon Platform（ETASP），属于 Ainekko 项目
- 主分支工作：把原始 CORE-ET 模块转换为带文档的 lowRISC 风格 SystemVerilog IP
- 验证：使用 Verilator 单元测试，并与原始源码树进行并行 RTL 协同仿真
- 技术抽象：已覆盖通用仿真、iCE40 和 Xilinx FPGA，ASIC 支持仍是后续工作
- 历史边界：原始 CORE-ET RTL 与微架构文档保留在 erbium 分支

## Further resources

- [Current translation status](https://github.com/openhwgroup/core-et/blob/main/STATUS.md) — module, unit-test, and co-simulation progress
- [ETASP onboarding guide](https://github.com/openhwgroup/core-et/blob/main/docs/onboarding.md) — repository navigation and workflow
- [Translation reference](https://github.com/openhwgroup/core-et/blob/main/docs/translation.md) — maintained rules for the CORE-ET-to-ETASP work
- [Original CORE-ET documentation](https://github.com/openhwgroup/core-et/tree/erbium/docs) — microarchitecture material preserved on the historical branch

## 项目概述

CORE-ET 是 OpenHW 官网 Projects 页列出的硅平台项目（many-core RISC-V RTL 与 MRAM 结合，作为 ET Silicon Platform 的基础）。仓库 README 现在的定位是 CORE-ET Agentic Silicon Platform（ETASP）：一个用 Translator/Integrator 两类 agentic 工作流构建可复用 IP 目录的项目，覆盖技术原语（generic/iCE40/Xilinx/ASIC seam）、验证（Verilator 单元测试 + RTL co-simulation）、FPGA 示例工程与覆盖率数据。原始 CORE-ET RTL 模块及完整微架构文档在 erbium 分支，另有 core-et-erbium 仓库承载相关内容。

## 事实核查要点

- 不应把 CORE-ET 简单描述为"一个 RISC-V core"：仓库当前主体是 ETASP IP 平台/目录，原始 many-core RTL 在 erbium 分支。
- Ainekko 项目属性来自仓库 README 原文（"an Ainekko project"）。
- 官网 openhwfoundation.org 对 CORE-ET 的描述是 "combines many-core RISC-V-based RTL with MRAM, creating a basis for the ET Silicon Platform"。
- 站内分类使用 soc + ip：既是硅平台（SoC 方向）也是 IP 目录。

## 主要来源

- https://github.com/openhwgroup/core-et
- https://github.com/openhwgroup/core-et/tree/erbium
- https://github.com/openhwgroup/core-et-erbium
- https://openhwfoundation.org/our-work/projects/
