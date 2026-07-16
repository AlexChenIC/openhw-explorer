# CV-HPDCache Verification

> cv-hpdcache-verif 是 HPDcache subsystem 的验证环境，覆盖 HPDcache DUT 与 prefetcher DUT。

数据核对日期: 2026-07-11

## Public summary

cv-hpdcache-verif is the verification environment for OpenHW's CORE-V High Performance Data Cache controller. Its README currently warns that the testbench remains unstable after HPDcache changes: only CFG1 is working, the SystemVerilog PLRU model is commented out, and the optional AXI5 adapter has not been verified. The repository provides Python-driven compile, simulation, and regression scripts for the HPDcache and prefetcher DUTs.

## Key facts

- Verification target: an HPDcache subsystem containing the HPDcache and prefetcher DUTs
- The optional AXI5 adapter is explicitly marked as not yet verified in the README
- Workflow: Python scripts compile the RTL and UVM testbench, run individual tests, and launch parallel regressions
- Current caution: the README says the testbench remains unstable after HPDcache changes and documents known limitations
- Boundary: the cache RTL itself is maintained in the separate cv-hpdcache repository

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
