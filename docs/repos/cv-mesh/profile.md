# CV-MESH

> CV-MESH 是与 OpenPiton coherency framework 相关的早期 interconnect/NoC 资料仓库，公开顶层文档较少。

数据核对日期: 2026-05-07

## Public summary

CV-MESH is an early-stage OpenHW interconnect repository associated with a CV-MESH coherency framework based on OpenPiton. The public repository currently exposes Verilog/RTL-oriented directories for bridges, L1/L2 cache interfaces, and NoC-related blocks, but it has limited top-level public documentation.

## 项目概述

OpenHW 官方项目表把 CV-MESH 描述为 coherency framework based on Open Piton。当前 `cv-mesh` GitHub repo 的顶层目录包括 `bridges`、`include`、`l15`、`l2` 与 `noc`，但没有与 CVA6/CVW 类似的 README 级说明。

## 事实核查要点

- 分类建议为 `ip`，状态建议为 `experimental`。
- 不应写成成熟 NoC product；公开文档不足，站内应明确“limited public top-level documentation”。
- 可与 `core-v-polara-apu`、OpenPiton 关联，但具体拓扑/规模需要额外来源支撑。

## 主要来源

- https://github.com/openhwgroup/cv-mesh
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://parallel.princeton.edu/openpiton/
