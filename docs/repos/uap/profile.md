# UAP

> UAP 是 European Unified RISC-V IP Access Platform：把 TRISTAN、ISOLDE 等欧洲研究项目产出的 RISC-V IP 统一编目、文档化的静态入口平台，EPL-2.0 许可。

数据核对日期: 2026-07-16

## Public summary

UAP, the European Unified RISC-V IP Access Platform, is a catalogue for discovering hardware and software assets produced by European RISC-V research programs such as TRISTAN and ISOLDE. It presents maturity, usability, licensing, and integration context, then directs users to the underlying OpenHW GitHub repositories and applicable mirrors rather than hosting one monolithic IP block. The platform is already useful as a discovery layer, but several monitoring, interoperability, and governance features remain on a progressive roadmap.

## 中文介绍

UAP（European Unified RISC-V IP Access Platform）是一套用于发现欧洲 RISC-V 研究计划产出软硬件资产的目录平台，覆盖 TRISTAN、ISOLDE 等项目。它集中呈现成熟度、可用性、许可和集成背景，再把用户引导到 OpenHW GitHub 中的实际仓库及适用镜像，而不是托管一个单体 IP。当前平台已经可以作为资源发现入口，但监测、互操作和治理方面仍有部分功能处于渐进式路线图中。

## Key facts

- Artifact type: catalogue and documentation platform, not a single RTL implementation
- Scope: hardware and software RISC-V assets from European projects including TRISTAN and ISOLDE
- Information model: maturity, usability, licensing, and integration-workflow context
- Delivery: static access page linking to OpenHW GitHub repositories and applicable European GitLab mirrors
- Maturity: useful discovery layer today, with additional monitoring, interoperability, and governance features still planned

## 中文核心事实

- 产物类型：目录与文档平台，不是单一 RTL 实现
- 范围：TRISTAN、ISOLDE 等欧洲项目产生的 RISC-V 软硬件资产
- 信息模型：成熟度、可用性、许可和集成流程背景
- 交付方式：静态入口页面，链接到 OpenHW GitHub 仓库及适用的欧洲 GitLab 镜像
- 成熟度：当前已可用于资源发现，更多监测、互操作与治理功能仍在规划中

## Further resources

- [Unified Access Platform](https://openhwgroup.github.io/uap/unified-access.html) — published catalogue interface
- [OpenHW projects](https://openhwfoundation.org/our-work/projects/) — official project context
- [TRISTAN project](https://tristan-project.eu/) — one of the European source initiatives named by UAP
- [ISOLDE project](https://isolde-project.eu/) — another source initiative named by UAP

## 项目概述

UAP（Unified RISC-V Access Platform）是 OpenHW 官网 Projects 页列出的正式项目。README 将其定位为一个"static unified access page"：集中呈现欧洲研究项目（TRISTAN、ISOLDE、Rigoletto 等）产出的 RISC-V 硬件/软件 IP 的成熟度、可用性、许可与集成流程信息，目标是提升可见性、促进互操作与文档一致性。平台页面发布在 openhwgroup.github.io/uap。仓库版权归 Eclipse Foundation，采用 EPL-2.0。

## 事实核查要点

- UAP 本身不是 RTL 仓库，而是 IP 编目与文档平台。站内分类为 `ip` + `docs`（2026-07-09 调整）：按用户任务归类——用户在 "IP" 筛选下寻找 IP 资源时应能发现这个入口平台，同时保留 docs 属性。
- README 明确说明"not all elements are fully implemented yet"，功能仍在渐进式路线图中，描述时避免夸大完成度。
- 项目由 EU/Chips JU 资助，与 TRISTAN、ISOLDE 项目关联。

## 主要来源

- https://github.com/openhwgroup/uap
- https://openhwgroup.github.io/uap/unified-access.html
- https://openhwfoundation.org/our-work/projects/
- https://tristan-project.eu/
