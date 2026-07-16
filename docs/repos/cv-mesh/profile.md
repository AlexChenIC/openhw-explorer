# CV-MESH

> CV-MESH 是与 OpenPiton coherency framework 相关的早期 interconnect/NoC 资料仓库，公开顶层文档较少。

数据核对日期: 2026-07-16

## Public summary

CV-MESH is an early-stage OpenHW interconnect repository related to the CV-MESH coherency framework, which OpenHW's official project table describes as a coherency framework based on OpenPiton. The public repository has no top-level README and currently exposes RTL directories for bridges, an L1.5 cache, an L2 cache, and NoC components.

## Key facts

- Official positioning: OpenHW's project table describes CV-MESH as a coherency framework based on OpenPiton
- Public repository structure currently contains `bridges`, `include`, `l15`, `l2`, and `noc` directories
- Documentation limit: GitHub's repository README endpoint returns 404 because there is no top-level README
- Evidence limit: topology, protocol, supported scale, and maturity are intentionally not asserted by OpenHW Explorer
- Related platforms: CVA6 Platform and CORE-V Polara APU publicly describe OpenPiton/CV-MESH integration contexts

## Further resources

- [CV-MESH repository contents](https://github.com/openhwgroup/cv-mesh) — available RTL directory structure
- [OpenPiton](https://parallel.princeton.edu/openpiton/) — upstream coherency/manycore platform named by OpenHW
- [CVA6 Platform](https://github.com/openhwgroup/cva6-platform) — software-test platform described as multi-core CVA6 with CV-MESH
- [CORE-V Polara APU](https://github.com/openhwgroup/core-v-polara-apu) — related multicore OpenPiton integration

## 项目概述

OpenHW 官方项目表把 CV-MESH 描述为 "Coherency framework based on Open Piton"（且注明 repo TBD，尚未正式挂链）。当前 `cv-mesh` GitHub repo 的顶层目录为 `bridges`、`include`、`l15`、`l2`、`noc`——即 OpenPiton 风格的 L1.5/L2 缓存层次与 NoC 组件，仓库没有顶层 README（2026-07-08 实查 API 返回 404）。

## 事实核查要点

- 分类建议为 `ip`，状态建议为 `experimental`。
- 不应写成成熟 NoC product；公开文档不足，站内应明确“limited public top-level documentation”。
- 可与 `core-v-polara-apu`、OpenPiton 关联，但具体拓扑/规模需要额外来源支撑。

## 主要来源

- https://github.com/openhwgroup/cv-mesh
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://parallel.princeton.edu/openpiton/
