# CVA6-Safe

> CVA6-Safe 是基于 CVA6 的 dual-core lockstep 子系统，也支持 split/AMP 模式；公开文档仍有 TODO，站内应保持谨慎。

数据核对日期: 2026-07-11

## Public summary

CVA6-Safe is a CVA6-based dual-core lockstep subsystem with cache error detection/correction and a split-mode capability for dual-core asymmetric multiprocessing. Its README notes that more detailed design documentation is still TODO, so OpenHW Explorer treats it as experimental.

## Key facts

- Architecture: dual-core lockstep module built from CVA6 cores with cache error detection and correction
- Modes: lockstep or split/regular dual-core operation can be selected at design time or power-on
- Cache protection: the README says cache EDAC is active in lockstep mode and deactivated in split mode
- Demonstrated target: a 32-bit CVA6 configuration with IMAC, Zicsr, and Sv32 support
- Documentation caution: the README still marks the detailed design description as TODO

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
