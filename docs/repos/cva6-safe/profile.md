# CVA6-Safe

> CVA6-Safe 是基于 CVA6 的 dual-core lockstep 子系统，也支持 split/AMP 模式；公开文档仍有 TODO，站内应保持谨慎。

数据核对日期: 2026-07-08

## Public summary

CVA6-Safe is a CVA6-based dual-core lockstep subsystem with cache error detection/correction and a split-mode capability for dual-core asymmetric multiprocessing. Its README notes that more detailed design documentation is still TODO, so OpenHW Explorer treats it as experimental.

## 项目概述

README 描述 CVA6-Safe provides dual-core lockstep and caches error detection and correction。DCLS module 基于 CVA6 cores，可在 lockstep 模式提供 safety mechanism，也可在 split mode 作为普通 dual-core setup 用于不需要 lockstep 的高性能应用。目标示例配置为 CV32A6 with IMAC, Zicsr and sv32 support。

## 事实核查要点

- 分类建议为 `soc`，core type 用 `safety-critical`，但中文展示应为“安全/功能安全”，避免暗示认证完成。
- 状态建议为 `experimental`，因为 README 明确留有 detailed description TODO。
- 不应把 DCLS 说成一定运行两个独立应用；lockstep 模式和 split/AMP 模式不同。

## 主要来源

- https://github.com/openhwgroup/cva6-safe
- https://github.com/openhwgroup/cva6
