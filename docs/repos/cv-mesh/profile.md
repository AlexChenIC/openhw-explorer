# CV-MESH

> CV-MESH 是与 OpenPiton coherency framework 相关的早期 interconnect/NoC 资料仓库，公开顶层文档较少。

数据核对日期: 2026-07-16

## Public summary

CV-MESH is an early-stage OpenHW repository for cache-coherence and interconnect components derived from the OpenPiton context. Its public tree contains bridges, L1.5 and L2 cache logic, and network-on-chip blocks, and related OpenHW platforms use CV-MESH in multicore integration work. Public top-level documentation is still missing, so the repository is suitable mainly for experienced engineers tracing existing RTL; topology, supported scale, protocol details, and maturity cannot yet be assessed from a stable public specification.

## 中文介绍

CV-MESH 是一个早期阶段的 OpenHW 缓存一致性与互连组件仓库，其技术背景与 OpenPiton 相关。公开源码树包含 bridge、L1.5/L2 缓存逻辑和片上网络模块，相关 OpenHW 平台也在多核集成中使用 CV-MESH。由于仓库仍缺少顶层文档，它目前更适合有经验的工程师沿现有 RTL 追踪实现；拓扑、支持规模、协议细节和成熟度尚不能依据稳定的公开规范进行判断。

## Key facts

- Positioning: cache-coherence framework associated with OpenPiton
- Public tree: bridges, include, l15, l2, and noc directories
- Documentation limit: no top-level project introduction or stable public specification
- Evidence limit: topology, protocol, supported scale, and maturity are not publicly established
- Related platforms: CVA6 Platform and CORE-V Polara APU provide OpenPiton/CV-MESH integration context

## 中文核心事实

- 定位：与 OpenPiton 相关的缓存一致性框架
- 公开源码树：bridges、include、l15、l2 和 noc 目录
- 文档限制：缺少顶层项目介绍与稳定公开规范
- 证据边界：拓扑、协议、支持规模和成熟度尚无充分公开依据
- 相关平台：CVA6 Platform 与 CORE-V Polara APU 提供 OpenPiton/CV-MESH 集成背景

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
