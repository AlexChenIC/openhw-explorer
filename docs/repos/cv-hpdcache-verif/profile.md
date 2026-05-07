# CV-HPDCache Verification

> cv-hpdcache-verif 是 HPDcache subsystem 的验证环境，覆盖 HPDcache DUT 与 prefetcher DUT。

数据核对日期: 2026-05-07

## Public summary

cv-hpdcache-verif is the verification environment for OpenHW's CORE-V High Performance Data Cache controller. Its README describes an HPDcache subsystem verification environment that targets the HPDcache DUT and prefetcher DUT, using Python-driven compile, simulation, and regression scripts.

## 项目概述

README 将仓库目的描述为 outline the details of the verification environment of HPDcache Subsystem。环境包含 HPDcache 与 Prefetcher 两个 DUT，并提到可选 AXI5 adapter 尚未验证。运行方式包括 compile RTL/UVM testbench、run test、run regression 等流程。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 摘要应保持谨慎：README 也包含“for the moment”与部分功能未完全验证的说明。
- 强关联 `cv-hpdcache`，不应独立解释成 cache IP 本身。

## 主要来源

- https://github.com/openhwgroup/cv-hpdcache-verif
- https://github.com/openhwgroup/cv-hpdcache
