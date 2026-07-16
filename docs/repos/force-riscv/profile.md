# FORCE-RISCV

> FORCE-RISCV 是面向 RISC-V 处理器验证的 instruction sequence generator，不是 RTL 核心仓库。

数据核对日期: 2026-07-16

## Public summary

FORCE-RISCV is an instruction-sequence generator for stressing RISC-V processor implementations with large, controllable test programs. It randomizes instructions, registers, addresses, and data while allowing Python templates to constrain generation, control privilege transitions, and shape multi-process or multi-thread scenarios. The generated ELF and assembly outputs can feed RTL simulation, while Handcar provides a Spike-based reference path, making FORCE-RISCV useful to verification engineers who need broader stimulus than hand-written directed tests.

## 中文介绍

FORCE-RISCV 是一款用于生成 RISC-V 指令序列的验证工具，能够以大量、可控制的测试程序对处理器实现施加压力。它会随机选择指令、寄存器、地址与数据，同时允许用户通过 Python 模板约束生成过程、控制特权级切换，并构造多进程或多线程场景。生成的 ELF 与汇编文件可送入 RTL 仿真，Handcar 则提供基于 Spike 的参考执行路径，适合需要比手写定向测试更广覆盖面的验证工程师。

## Key facts

- Purpose: constrained-random instruction-sequence generation for RISC-V processor verification
- Generation model: randomizes instructions, registers, addresses, and data under user-supplied constraints
- Test authoring: Python templates call FORCE-RISCV APIs to shape scenarios and execution modes
- Outputs: executable ELF files and disassembled assembly files for RTL simulation and inspection
- Reference path: Handcar integration is based on the Spike RISC-V instruction simulator

## 中文核心事实

- 用途：为 RISC-V 处理器验证生成约束随机指令序列
- 生成模型：在用户约束下随机化指令、寄存器、地址和数据
- 测试编写：通过 Python 模板调用 FORCE-RISCV API 构造场景与执行模式
- 输出：可执行 ELF 和反汇编文件，可用于 RTL 仿真与人工检查
- 参考路径：集成基于 Spike RISC-V 指令集模拟器的 Handcar

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
