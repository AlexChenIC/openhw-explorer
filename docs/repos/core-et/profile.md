# CORE-ET

> CORE-ET 现以 ETASP（Agentic Silicon Platform）形式推进：由 Ainekko 发起，用 agentic 工作流把原 CORE-ET many-core RTL 翻译为干净的 SystemVerilog IP 目录；原始 RTL 与文档保留在 erbium 分支。

数据核对日期: 2026-07-11

## Public summary

CORE-ET hosts the CORE-ET Agentic Silicon Platform (ETASP), an Ainekko project that collects hardware IP in a form that can be translated, verified, documented, and integrated by agentic hardware-development workflows. It is currently seeded by an active translation of the original CORE-ET modules into lowRISC-style SystemVerilog with per-IP documentation, technology primitives for FPGA and ASIC targets, and Verilator-based unit tests plus co-simulation against the original source tree; the original CORE-ET RTL and its microarchitecture documentation are preserved on the erbium branch.

## Key facts

- Current repository identity: CORE-ET Agentic Silicon Platform (ETASP), described by the README as an Ainekko project
- Current work translates original CORE-ET modules into documented, lowRISC-style SystemVerilog IP directories
- Verification uses Verilator unit tests and side-by-side RTL co-simulation against the original source tree
- Technology abstraction currently covers generic simulation plus iCE40, ECP5, and Xilinx FPGA implementations; ASIC support is described as future work
- Historical boundary: the original CORE-ET RTL and microarchitecture documentation remain on the `erbium` branch

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
