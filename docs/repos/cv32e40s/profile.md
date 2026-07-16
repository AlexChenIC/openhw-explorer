# CV32E40S

> CV32E40S 是基于 CV32E40P 演进的 4-stage security-focused embedded-class CORE-V 核心。

数据核对日期: 2026-07-16

## Public summary

CV32E40S is a small, efficient 32-bit, 4-stage in-order CORE-V RISC-V core based on CV32E40P and aimed at security-oriented embedded applications. Its README highlights Machine/User modes, enhanced PMP, and anti-tampering features.

## Key facts

- Architecture: small 32-bit, 4-stage, in-order embedded-class RISC-V core
- ISA options include RV32I or RV32E, M or Zmmul, compressed and bit-manipulation extensions, and Xsecure
- Security features named by the README include Machine and User modes, enhanced physical memory protection, and anti-tampering mechanisms
- Origin: derived from CV32E40P and the earlier PULP RI5CY line
- Verification: core-specific UVM and formal-verification work lives in cv32e40s-dv; the shared infrastructure is in core-v-verif

## Further resources

- [CV32E40S User Manual](https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/) — official architecture, security, and integration documentation
- [CV32E40S design-verification repository](https://github.com/openhwgroup/cv32e40s-dv) — core-specific UVM and formal-verification directories
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — shared functional-verification infrastructure
- [CORE-V family overview](https://github.com/openhwgroup/core-v-cores) — official family and maturity context

## 项目概述

CV32E40S README 将其描述为 32-bit、4-stage、in-order RISC-V core，支持 RV32[I|E]、M/Zmmul、Zc 与 bit-manipulation 相关扩展，并带有 Xsecure。该核心面向 security applications，提供 Machine mode、User mode、enhanced PMP 和 anti-tampering features。

## 事实核查要点

- 分类建议为 `core`，core type 使用 `embedded-mcu` + `safety-critical`，但站内中文应显示为“安全/功能安全”，避免暗示已经完成 ISO 26262 认证。
- 验证环境不在 RTL 仓库中，关联到 `core-v-verif` 与 `cv32e40s-dv`。
- 可描述为 security-focused，不应直接写成 certified safety core。

## 主要来源

- https://github.com/openhwgroup/cv32e40s
- https://docs.openhwgroup.org/projects/cv32e40s-user-manual/en/latest/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
