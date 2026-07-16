# CV32E40X

> CV32E40X 是支持 CORE-V-XIF 的 4-stage embedded-class compute core；OpenHW 官方项目表将其列为 inactive project。

数据核对日期: 2026-07-16

## Public summary

CV32E40X is a compact four-stage, in-order 32-bit RISC-V core for compute-oriented embedded systems. Its defining feature is CORE-V-XIF, which lets designers implement custom instructions in an external coprocessor without embedding that logic directly in the CPU pipeline. It is most relevant to engineers and researchers exploring domain-specific acceleration, but adopters should note that the core is considered mature while not currently progressing toward its TRL-5 target.

## 中文介绍

CV32E40X 是一款面向计算型嵌入式系统的紧凑四级顺序执行 32 位 RISC-V 核心。它最突出的能力是 CORE-V-XIF：设计者可以把自定义指令放在外部协处理器中实现，而不必直接修改 CPU 流水线内部逻辑。该核心适合研究领域专用加速与指令扩展集成，但使用者也应了解，它目前被视为技术上较成熟，却没有继续朝 TRL-5 目标推进。

## Key facts

- Architecture: 32-bit, four-stage, in-order embedded-class RISC-V core
- ISA options: RV32I or RV32E, M or Zmmul, compressed and bit-manipulation extensions, plus optional atomic support
- Extension path: CORE-V-XIF offloads custom instructions to an external coprocessor
- Origin: derived from CV32E40P and the earlier PULP RI5CY line
- Readiness: mature implementation, but not in active development toward its TRL goal and not yet at TRL-5

## 中文核心事实

- 架构：32 位、四级流水、顺序执行的嵌入式 RISC-V 核心
- 指令集选项：RV32I 或 RV32E、M 或 Zmmul、压缩与位操作扩展，并可选原子指令支持
- 扩展方式：通过 CORE-V-XIF 将自定义指令卸载到外部协处理器
- 来源：由 CV32E40P 及更早的 PULP RI5CY 技术路线演进而来
- 成熟度：实现已较成熟，但当前未继续推进 TRL 目标，也尚未达到 TRL-5

## Further resources

- [CV32E40X User Manual](https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/) — official core architecture and interface documentation
- [CORE-V-XIF specification](https://docs.openhwgroup.org/projects/openhw-group-core-v-xif/) — extension-interface contract used by the core
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared verification infrastructure referenced by the RTL repository
- [CV32E40X design-verification repository](https://github.com/openhwgroup/cv32e40x-dv) — core-specific UVM and formal-verification material

## 项目概述

CV32E40X README 描述其为 small and efficient 32-bit in-order RISC-V core with a 4-stage pipeline，支持 RV32[I|E]、可选 A、M/Zmmul、compressed 与 bit-manipulation 相关扩展，并提供 general purpose extension interface 用于 external custom instructions。

## 事实核查要点

- `core-v-cores` 发布表脚注说明 CV32E40X 已成熟、当前没有朝 TRL 目标积极开发，且尚未达到 TRL-5；站内使用 `stable`，避免误写成持续活跃的代码开发。
- 分类建议为 `core`，core type 为 `embedded-mcu`；使用“计算扩展”标签描述 XIF 定位，避免暗示应用级 Linux 或未经来源支持的性能等级。
- 需要与 `core-v-xif` 建立强关联。

## 主要来源

- https://github.com/openhwgroup/cv32e40x
- https://docs.openhwgroup.org/projects/cv32e40x-user-manual/en/latest/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
