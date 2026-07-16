# CORE-V Polara APU

> CORE-V Polara APU 是基于 Ara 与 OpenPiton 的多核 RISC-V vector research platform，公开资料偏研究原型。

数据核对日期: 2026-07-16

## Public summary

CORE-V Polara APU is a multicore vector-processing research platform that combines ideas and code from Ara with the OpenPiton manycore infrastructure. Its documented configuration connects four RISC-V vector cores and includes low-precision operations relevant to DNN inference. The repository is aimed at researchers evaluating vector and multicore systems; reproducing its flows requires a vector-capable RISC-V LLVM toolchain and supported commercial simulators.

## 中文介绍

CORE-V Polara APU 是一套多核向量处理研究平台，将 Ara 的向量处理工作与 OpenPiton 多核基础设施结合。公开配置连接四个 RISC-V 向量核心，并包含与 DNN 推理相关的低精度运算能力。该仓库主要面向研究向量与多核系统的用户；复现实验流程需要支持向量扩展的 RISC-V LLVM 工具链以及相应商业仿真器。

## Key facts

- Origin: combines the PULP Ara vector processor with Princeton OpenPiton infrastructure
- Topology: four RISC-V vector cores connected through OpenPiton
- Compute scope: includes low-precision operations for DNN inference
- Toolchain: requires a RISC-V LLVM compiler with vector-extension support
- Simulation: VCS and ModelSim/QuestaSim flows depend on external commercial tools

## 中文核心事实

- 来源：结合 PULP Ara 向量处理器与 Princeton OpenPiton 基础设施
- 拓扑：四个 RISC-V 向量核心通过 OpenPiton 连接
- 计算范围：包含面向 DNN 推理的低精度运算
- 工具链：需要支持向量扩展的 RISC-V LLVM 编译器
- 仿真：VCS 与 ModelSim/QuestaSim 流程依赖外部商业工具

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
