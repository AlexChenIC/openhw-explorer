# CV32E40S

> CV32E40S 是基于 CV32E40P 演进的 4-stage security-focused embedded-class CORE-V 核心。

数据核对日期: 2026-07-16

## Public summary

CV32E40S is a compact four-stage, in-order 32-bit RISC-V core designed for security-oriented embedded systems. Building on the CV32E40P lineage, it adds Machine and User privilege modes, enhanced physical memory protection, anti-tampering mechanisms, and the Xsecure extension set. It is a relevant choice when evaluating protection-focused MCU designs; it should not be confused with the lockstep and fault-tolerance work in CVA6-Safe.

## 中文介绍

CV32E40S 是一款面向安全型嵌入式系统的紧凑四级顺序执行 32 位 RISC-V 核心。它沿用 CV32E40P 技术路线，并增加 Machine/User 特权模式、增强型物理内存保护、抗篡改机制和 Xsecure 扩展。该项目适合评估重视隔离与保护能力的 MCU 设计；它关注的是安全防护，并不是 CVA6-Safe 所代表的锁步与容错方案。

## Key facts

- Architecture: 32-bit, four-stage, in-order embedded-class RISC-V core
- ISA options: RV32I or RV32E, M or Zmmul, compressed and bit-manipulation extensions, and Xsecure
- Protection features: Machine and User modes, enhanced PMP, and anti-tampering mechanisms
- Origin: derived from CV32E40P and the earlier PULP RI5CY line
- Verification: core-specific UVM and formal work is maintained in cv32e40s-dv with shared infrastructure from core-v-verif

## 中文核心事实

- 架构：32 位、四级流水、顺序执行的嵌入式 RISC-V 核心
- 指令集选项：RV32I 或 RV32E、M 或 Zmmul、压缩与位操作扩展，以及 Xsecure
- 防护能力：Machine/User 模式、增强型 PMP 和抗篡改机制
- 来源：由 CV32E40P 及更早的 PULP RI5CY 技术路线演进而来
- 验证：专用 UVM 与形式验证位于 cv32e40s-dv，共享基础设施来自 core-v-verif

## Further resources

- [CV32E40S User Manual](https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/) — official architecture, security, and integration documentation
- [CV32E40S design-verification repository](https://github.com/openhwgroup/cv32e40s-dv) — core-specific UVM and formal-verification directories
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared functional-verification infrastructure
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official family and maturity context

## 项目概述

CV32E40S README 将其描述为 32-bit、4-stage、in-order RISC-V core，支持 RV32[I|E]、M/Zmmul、Zc 与 bit-manipulation 相关扩展，并带有 Xsecure。该核心面向 security applications，提供 Machine mode、User mode、enhanced PMP 和 anti-tampering features。

## 事实核查要点

- 分类建议为 `core`，architecture/focus 使用 `embedded-mcu` + `security-focused`。信息安全与功能安全是不同概念，不能用一个合并标签表达。
- 验证环境不在 RTL 仓库中，关联到 `core-v-verif` 与 `cv32e40s-dv`。
- 可描述为 security-focused，不应直接写成 certified safety core。

## 主要来源

- https://github.com/openhwgroup/cv32e40s
- https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
