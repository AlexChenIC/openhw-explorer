# CV32E41P

> CV32E41P 是基于 CV32E40P 的 Zfinx/Zce 原型核心，GitHub 仓库已归档，OpenHW 官方项目表列为 completed。

数据核对日期: 2026-07-16

## Public summary

CV32E41P is an archived four-stage, in-order 32-bit RISC-V prototype derived from CV32E40P. It was created to explore Zfinx and Zce extension work alongside Xpulp custom extensions, and OpenHW records it as a TRL-3 proof of concept rather than a production target. The repository remains valuable for historical implementation study, but new product work should begin with an actively maintained CORE-V core instead.

## 中文介绍

CV32E41P 是一款由 CV32E40P 派生的四级顺序执行 32 位 RISC-V 原型核心，目前仓库已经归档。它主要用于探索 Zfinx、Zce 与 Xpulp 自定义扩展的实现，OpenHW 将其记录为 TRL-3 概念验证，而不是面向量产的目标。该仓库仍适合研究相关扩展的历史实现，但新的产品设计应优先选择仍在维护的 CORE-V 核心。

## Key facts

- Architecture: 32-bit, four-stage, in-order RISC-V core
- ISA focus: RV32IM with optional F or Zfinx, compressed/Zce work, and Xpulp custom extensions
- Purpose: prototype implementation used to explore Zfinx and Zce
- Readiness: completed at TRL-3 as a proof of concept, not intended for a production device
- Repository status: archived on GitHub

## 中文核心事实

- 架构：32 位、四级流水、顺序执行的 RISC-V 核心
- 指令集重点：RV32IM，可选 F 或 Zfinx，并包含压缩/Zce 与 Xpulp 自定义扩展工作
- 目的：用于探索 Zfinx 和 Zce 的原型实现
- 成熟度：以 TRL-3 概念验证完成，不面向量产设备
- 仓库状态：GitHub 已归档

## Further resources

- [CV32E41P documentation sources](https://github.com/openhwgroup/cv32e41p/tree/master/docs) — Sphinx/user-manual sources preserved in the archived repository
- [CORE-V family and release table](https://github.com/openhwgroup/core-v-cores) — proof-of-concept and TRL context
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — verification repository referenced by the core README

## 项目概述

CV32E41P README 描述该核心支持 RV32IM[F,Zfinx]C[Zce] 与 Xpulp custom extensions，并说明它从 CV32E40P fork 出来，用于实现/评估 Zfinx 与 Zce ISA extensions。仓库当前在 GitHub 上为 archived。

## 事实核查要点

- 站内状态应由 GitHub archived 覆盖为 `archived`；概念状态可说明 OpenHW 表中为 completed。
- 分类建议为 `core`，但不应标为 active contribution target。
- 不应写成 CV32E40S/CV32E40X 的直接后续整合成果，除非补到更明确来源。

## 主要来源

- https://github.com/openhwgroup/cv32e41p
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://github.com/openhwgroup/core-v-cores
