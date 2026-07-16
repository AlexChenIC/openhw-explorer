# FORCE-RISCV

> FORCE-RISCV 是面向 RISC-V 处理器验证的 instruction sequence generator，不是 RTL 核心仓库。

数据核对日期: 2026-07-16

## Public summary

FORCE-RISCV is an instruction sequence generator for RISC-V processor design verification. Its README describes constrained-random and API-controlled test generation, Python test templates, ELF/S output, and integration with the Handcar simulator based on Spike.

## Key facts

- Purpose: instruction sequence generator for design verification of RISC-V processors
- Generation model: randomizes instructions, registers, addresses, and data while exposing APIs for user constraints and control
- Test authoring: templates are ordinary Python programs that call FORCE-RISCV APIs
- Outputs: executable ELF files and disassembled assembly (`.S`) files suitable for RTL simulation input and inspection
- Reference execution: integrates Handcar, which is based on the Spike RISC-V instruction simulator

## Further resources

- [FORCE-RISCV User Manual v0.8](https://github.com/openhwgroup/force-riscv/blob/master/doc/FORCE-RISCV_User_Manual-v0.8.pdf) — project-supplied user manual
- [FORCE-RISCV quick start](https://github.com/openhwgroup/force-riscv#force-riscv-quick-start-guide-for-risc-v) — build, smoke-test, and test-generation workflow
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — environment referenced for consuming generated tests

## 项目概述

FORCE-RISCV README 说明它可为 RISC-V processor verification 生成测试，使用 randomization 选择 instructions、registers、addresses 和 data，也提供 API 让用户控制 generation。它支持 RV64G、RV32G、Vector Extension 1.0、privilege mode switching、multiprocess/multithread generation，并输出 ELF 与 assembly。

## 事实核查要点

- 分类建议为 `verification` + `tools`，verification type 为 `test-generation`。
- 不应把它归为 UVM testbench；它是 ISG，可被 verification environment 使用。
- OpenHW 官方项目表将 FORCE RISC-V 描述为 advanced RISC-V instruction set generator。

## 主要来源

- https://github.com/openhwgroup/force-riscv
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
