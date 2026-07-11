# CORE-V Polara APU

> CORE-V Polara APU 是基于 Ara 与 OpenPiton 的多核 RISC-V vector research platform，公开资料偏研究原型。

数据核对日期: 2026-07-11

## Public summary

CORE-V Polara APU is a multicore RISC-V vector research platform originating from Ara and OpenPiton. Its README describes four RISC-V vector cores connected using the OpenPiton platform, with simulation flows that require a RISC-V LLVM compiler with vector extension support.

## Key facts

- Origin: combines work from the PULP Ara vector processor and Princeton OpenPiton projects
- Topology described by the README: four RISC-V vector cores connected through the OpenPiton platform
- Compute scope includes low-precision operations for DNN inference
- Toolchain: requires a RISC-V LLVM compiler with vector-extension support
- Simulation flows are documented for VCS and ModelSim/QuestaSim and therefore depend on external commercial tools

## Further resources

- [Ara vector processor](https://github.com/pulp-platform/ara) — upstream vector-core project referenced by Polara
- [OpenPiton](https://github.com/PrincetonUniversity/openpiton) — upstream manycore platform used for integration
- [Ara publication](https://ieeexplore.ieee.org/document/8918510) — vector-processor publication cited by the repository
- [OpenPiton publication](https://dl.acm.org/doi/10.1145/2954679.2872414) — manycore platform publication cited by the repository

## 项目概述

README 写明 CORE-V Polara APU originated from Ara and OpenPiton projects，并有 4 RISC-V vector cores connected together using OpenPiton platform。环境设置要求 RISC-V LLVM compiler with vector extension support，并依赖 OpenPiton/PITON_ROOT 与 Synopsys VCS 等工具环境。

## 事实核查要点

- 分类建议为 `soc`，状态为 `experimental`；不再使用已经删除且容易误导的 `high-performance` 筛选维度。
- 不应过度描述为量产 APU 或成熟 SDK；更准确是 research platform / ASIC research context。
- 原有“2x2/4x4”等更具体扩展说法需要额外来源，不应放入站内摘要。

## 主要来源

- https://github.com/openhwgroup/core-v-polara-apu
- https://github.com/pulp-platform/ara
- https://github.com/PrincetonUniversity/openpiton
- https://ieeexplore.ieee.org/document/8918510
- https://dl.acm.org/doi/10.1145/2954679.2872414
