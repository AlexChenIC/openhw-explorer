# CVA6 DCLS

> cva6-dcls 是 CVA6 的 Dual-Core Lock-Step 平台仓库；README 目前只有 "Under construction..."，站内按早期实验项目处理。

数据核对日期: 2026-07-16

## Public summary

cva6-dcls is a dual-core lock-step (DCLS) platform for the CVA6 RISC-V processor core. Its README is currently a placeholder marked "Under construction...", so OpenHW Explorer treats it as an early-stage experimental project alongside the related CVA6-Safe lockstep subsystem.

## Key facts

- Confirmed scope: a dual-core lockstep module/platform for the CVA6 processor core
- Documentation state: the public README contains only the title and "Under construction..."
- Evidence limit: no detailed architecture, safety mechanism, configuration, or verification claim is shown here because the repository does not document it publicly
- Activity context: GitHub records pushes in 2026, but repository activity alone is not treated as evidence of technical maturity

## Further resources

- [CVA6 repository](https://github.com/openhwgroup/cva6) — processor core named by the project
- [CVA6-Safe](https://github.com/openhwgroup/cva6-safe) — related repository with publicly documented lockstep and split-mode behavior
- [CVA6 User Manual](https://docs.openhwgroup.org/projects/cva6-user-manual/) — official documentation for the underlying processor core

## 项目概述

仓库 GitHub 描述为 "Dual-Core-Lock-Step platform for the CVA6 RISC-V processor core"，README 正文仅有 "Dual-core Lock-step module for the CVA6 / Under construction..."。仓库 2026 年仍有提交（最后 push 2026-06），说明开发在进行，但公开文档极少。与 cva6-safe（DCLS 子系统，含 split/AMP 模式）属于同一安全方向的相关仓库。

## 事实核查要点

- 公开文档只有一句话，站内描述必须保持克制，不得推断具体架构细节。
- 状态标为 experimental：有活跃提交但文档未成形。

## 主要来源

- https://github.com/openhwgroup/cva6-dcls
- https://github.com/openhwgroup/cva6-safe
- https://github.com/openhwgroup/cva6
