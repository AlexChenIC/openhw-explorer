# CV-HPDCache

> CV-HPDCache 是 OpenHW 的 high-performance multi-requester out-of-order L1 data cache IP，并已集成到 CVA6 配置中。

数据核对日期: 2026-07-08

## Public summary

CV-HPDCache is an open-source high-performance, multi-requester, out-of-order L1 data cache for RISC-V cores and accelerators. Its README describes support for multiple outstanding memory requests, write-through/write-back policies, RISC-V CMOs, AMOs, standalone testbenches, and CVA6 integration.

## 项目概述

README 将 HPDcache 描述为 High-Performance, Multi-requester, Out-of-Order L1 Dcache for RISC-V cores and accelerators。功能包括 multiple outstanding reads/writes、1 to 64 bytes of a cacheline per cycle per requester、write-buffer、RISC-V CMOs 与 AMOs。文档还指出 HPDcache is integrated with the CVA6 core。

## 事实核查要点

- 分类建议为 `ip`。
- 与 `cva6`、`cv-hpdcache-verif` 强关联。
- 不应把它描述为 L2 或 NoC；它是 L1 Dcache controller/IP。

## 主要来源

- https://github.com/openhwgroup/cv-hpdcache
- https://openhw-group-cv-hpdcache.readthedocs-hosted.com/
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://doi.org/10.1145/3587135.3591413
- https://doi.org/10.23919/DATE58400.2024.10546547
