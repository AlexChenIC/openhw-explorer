# CV32E40X

> CV32E40X 是支持 CORE-V-XIF 的 4-stage embedded-class compute core；OpenHW 官方项目表将其列为 inactive project。

数据核对日期: 2026-07-11

## Public summary

CV32E40X is a 32-bit, 4-stage in-order CORE-V RISC-V core based on CV32E40P, aimed at compute-intensive embedded applications and custom instruction integration through CORE-V-XIF. The CORE-V family release table describes it as mature but not in active development toward its TRL goal.

## Key facts

- Architecture: small 32-bit, 4-stage, in-order embedded-class RISC-V core
- ISA options include RV32I or RV32E, M or Zmmul, compressed and bit-manipulation extensions, and optional atomic support
- Extension path: CORE-V-XIF allows custom instructions to be implemented outside the core
- Origin: started as a fork of CV32E40P, which in turn originated from the PULP RI5CY core
- Project status: the CORE-V family release table says CV32E40X is mature but not in active development toward its TRL goal and has not achieved TRL-5

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
