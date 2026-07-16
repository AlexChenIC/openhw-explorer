# CVA6 DCLS

> cva6-dcls 是 CVA6 的 Dual-Core Lock-Step 平台仓库；README 目前只有 "Under construction..."，站内按早期实验项目处理。

数据核对日期: 2026-07-16

## Public summary

cva6-dcls is an early-stage dual-core lockstep platform for CVA6. Its public repository confirms the DCLS scope and shows current development activity, but it does not yet publish enough architecture, configuration, safety-mechanism, or verification detail for an engineering evaluation. Readers can use it to follow emerging lockstep work; anyone selecting a design today should also examine CVA6-Safe, whose public subsystem behavior is documented in greater detail.

## 中文介绍

cva6-dcls 是一套处于早期阶段的 CVA6 双核锁步平台。公开仓库确认了 DCLS 方向，也显示项目仍有开发活动，但目前尚未提供足够的架构、配置、安全机制和验证资料，不能据此完成工程选型。读者可以用它跟踪新的锁步工作；如果当前就需要评估可用设计，还应同时查看公开行为说明更完整的 CVA6-Safe。

## Key facts

- Confirmed scope: dual-core lockstep module/platform for the CVA6 processor core
- Documentation state: public project documentation is still marked under construction
- Evidence limit: detailed architecture, safety mechanisms, configuration options, and verification results are not yet public
- Activity context: development continued in 2026, but activity alone does not establish technical maturity

## 中文核心事实

- 已确认范围：面向 CVA6 处理器核心的双核锁步模块/平台
- 文档状态：公开项目文档仍标为建设中
- 证据边界：详细架构、安全机制、配置选项和验证结果尚未公开
- 活跃度：2026 年仍有开发活动，但活跃本身不能证明技术成熟度

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
