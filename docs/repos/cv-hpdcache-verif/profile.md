# CV-HPDCache Verification

> cv-hpdcache-verif 是 HPDcache subsystem 的验证环境，覆盖 HPDcache DUT 与 prefetcher DUT。

数据核对日期: 2026-07-16

## Public summary

cv-hpdcache-verif is the dedicated verification environment for the CV-HPDCache subsystem, covering the cache controller and prefetcher through Python-driven compile, test, and regression flows. It is useful for engineers working on cache correctness and subsystem integration, but it is not currently a turnkey verification baseline: only CFG1 is documented as working, the SystemVerilog PLRU model is disabled, and the optional AXI5 adapter remains unverified. The cache RTL itself is maintained separately in cv-hpdcache.

## 中文介绍

cv-hpdcache-verif 是 CV-HPDCache 子系统的专用验证环境，覆盖缓存控制器与预取器，并提供由 Python 驱动的编译、单项测试和回归流程。它适合从事缓存正确性和子系统集成的工程师，但目前并不是开箱即用的稳定验证基线：公开资料只确认 CFG1 可工作，SystemVerilog PLRU 模型被停用，可选 AXI5 适配器也尚未完成验证。缓存 RTL 本身位于独立的 cv-hpdcache 仓库。

## Key facts

- Verification target: HPDcache subsystem containing cache-controller and prefetcher DUTs
- Workflow: Python scripts compile RTL and UVM code, run individual tests, and launch parallel regressions
- Current working configuration: CFG1 is the only configuration identified as working
- Known gaps: the SystemVerilog PLRU model is disabled and the optional AXI5 adapter is not verified
- RTL boundary: cache implementation is maintained in the separate cv-hpdcache repository

## 中文核心事实

- 验证对象：包含缓存控制器和预取器 DUT 的 HPDcache 子系统
- 流程：Python 脚本负责编译 RTL/UVM、运行单项测试并启动并行回归
- 当前可用配置：公开资料仅确认 CFG1 可以工作
- 已知缺口：SystemVerilog PLRU 模型被停用，可选 AXI5 适配器尚未验证
- RTL 边界：缓存实现维护在独立的 cv-hpdcache 仓库

## Further resources

- [CV-HPDCache User Guide](https://openhw-group-cv-hpdcache.readthedocs-hosted.com/) — architecture and integration documentation for the DUT
- [CV-HPDCache repository](https://github.com/openhwgroup/cv-hpdcache) — cache RTL and standalone validation material
- [Verification README](https://github.com/openhwgroup/cv-hpdcache-verif#hpdcache-subsystem-verification) — setup, simulation, regression, and known limitations

## 项目概述

README 将仓库目的描述为 outline the details of the verification environment of HPDcache Subsystem。环境包含 HPDcache 与 Prefetcher 两个 DUT，并提到可选 AXI5 adapter 尚未验证。运行方式包括 compile RTL/UVM testbench、run test、run regression 等流程。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 摘要应保持谨慎：README 也包含“for the moment”与部分功能未完全验证的说明。
- 强关联 `cv-hpdcache`，不应独立解释成 cache IP 本身。

## 主要来源

- https://github.com/openhwgroup/cv-hpdcache-verif
- https://github.com/openhwgroup/cv-hpdcache
