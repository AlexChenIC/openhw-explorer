# CORE-V Polara APU

> CORE-V Polara APU 是基于 Ara 与 OpenPiton 的多核 RISC-V vector research platform，公开资料偏研究原型。

数据核对日期: 2026-07-08

## Public summary

CORE-V Polara APU is a multicore RISC-V vector research platform originating from Ara and OpenPiton. Its README describes four RISC-V vector cores connected using the OpenPiton platform, with simulation flows that require a RISC-V LLVM compiler with vector extension support.

## 项目概述

README 写明 CORE-V Polara APU originated from Ara and OpenPiton projects，并有 4 RISC-V vector cores connected together using OpenPiton platform。环境设置要求 RISC-V LLVM compiler with vector extension support，并依赖 OpenPiton/PITON_ROOT 与 Synopsys VCS 等工具环境。

## 事实核查要点

- 分类建议为 `soc`，core type 为 `high-performance`，状态为 `experimental`。
- 不应过度描述为量产 APU 或成熟 SDK；更准确是 research platform / ASIC research context。
- 原有“2x2/4x4”等更具体扩展说法需要额外来源，不应放入站内摘要。

## 主要来源

- https://github.com/openhwgroup/core-v-polara-apu
- https://github.com/pulp-platform/ara
- https://github.com/PrincetonUniversity/openpiton
- https://ieeexplore.ieee.org/document/8918510
- https://dl.acm.org/doi/10.1145/2954679.2872414
