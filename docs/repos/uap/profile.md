# UAP

> UAP 是 European Unified RISC-V IP Access Platform：把 TRISTAN、ISOLDE 等欧洲研究项目产出的 RISC-V IP 统一编目、文档化的静态入口平台，EPL-2.0 许可。

数据核对日期: 2026-07-11

## Public summary

UAP is the European Unified RISC-V IP Access Platform, a structured and expandable entry point that catalogues, documents, and promotes RISC-V IP assets initially developed in European research projects such as TRISTAN and ISOLDE. It acts as a static unified access page pointing to repositories hosted on the OpenHW Foundation GitHub, with automatic mirroring to a European-hosted GitLab instance, and is published under the Eclipse Public License 2.0.

## Key facts

- Artifact type: catalogue and documentation platform, not a single RTL implementation
- Scope: hardware and software RISC-V IP originating in European research projects including TRISTAN and ISOLDE
- Information model: maturity, usability, licensing, and integration-workflow context for listed assets
- Delivery: static unified access page pointing to OpenHW GitHub repositories with European GitLab mirroring where applicable
- Maturity caveat: the README explicitly says not all planned elements are implemented and describes a progressive roadmap

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
