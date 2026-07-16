# CVA6-Safe

> CVA6-Safe 是基于 CVA6 的 dual-core lockstep 子系统，也支持 split/AMP 模式；公开文档仍有 TODO，站内应保持谨慎。

数据核对日期: 2026-07-16

## Public summary

CVA6-Safe is an experimental CVA6-based subsystem that can operate as a dual-core lockstep pair or as two independent cores. In lockstep mode it adds comparison-based fault detection and cache error detection/correction; split mode trades those protections for a regular dual-core asymmetric-multiprocessing setup. The project is relevant to engineers studying fault-tolerant RISC-V architectures, but the public design documentation is still incomplete and the repository does not claim an ISO 26262 certification.

## 中文介绍

CVA6-Safe 是一套实验性的 CVA6 子系统，可工作在双核锁步模式，也可将两个核心拆分为独立运行。锁步模式加入比较式故障检测和缓存错误检测/纠正；split 模式则关闭这些保护，以普通双核非对称多处理方式运行。该项目适合研究容错 RISC-V 架构的工程师，但公开设计文档仍不完整，仓库也没有声明获得 ISO 26262 认证。

## Key facts

- Architecture: dual-core lockstep subsystem built from CVA6 cores with cache error detection and correction
- Operating modes: lockstep or split/regular dual-core behavior selected at design time or power-on
- Protection boundary: cache EDAC is active in lockstep mode and disabled in split mode
- Demonstrated target: 32-bit CVA6 configuration with IMAC, Zicsr, and Sv32
- Maturity boundary: detailed public design documentation remains incomplete and no functional-safety certification is claimed

## 中文核心事实

- 架构：由 CVA6 核心构成的双核锁步子系统，带缓存错误检测与纠正
- 工作模式：可在设计时或上电时选择锁步或 split/普通双核运行
- 保护边界：缓存 EDAC 在锁步模式开启，在 split 模式关闭
- 已展示目标：支持 IMAC、Zicsr 与 Sv32 的 32 位 CVA6 配置
- 成熟度边界：详细公开设计文档尚未完成，也没有功能安全认证声明

## Further resources

- [CVA6 repository](https://github.com/openhwgroup/cva6) — processor core used by the subsystem
- [CVA6 User Manual](https://docs.openhwgroup.org/projects/cva6-user-manual/) — official CVA6 architecture documentation
- [CVA6 DCLS](https://github.com/openhwgroup/cva6-dcls) — related, separately maintained lockstep platform under construction

## 项目概述

README 描述 CVA6-Safe provides dual-core lockstep and caches error detection and correction。DCLS module 基于 CVA6 cores，可在 lockstep 模式提供 safety mechanism，也可在 split mode 作为普通 dual-core setup 用于不需要 lockstep 的高性能应用。目标示例配置为 CV32A6 with IMAC, Zicsr and sv32 support。

## 事实核查要点

- 分类建议为 `soc`，architecture/focus 使用 `fault-tolerant`，展示为“Fault-tolerant / lockstep（容错 / 锁步）”。公开 README 能证明 DCLS、split mode 与 cache EDAC，但没有公开的 ISO 26262 认证声明。
- 状态建议为 `experimental`，因为 README 明确留有 detailed description TODO。
- 不应把 DCLS 说成一定运行两个独立应用；lockstep 模式和 split/AMP 模式不同。

## 主要来源

- https://github.com/openhwgroup/cva6-safe
- https://github.com/openhwgroup/cva6
