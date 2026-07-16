# CV-HPDCache

> CV-HPDCache 是 OpenHW 的 high-performance multi-requester out-of-order L1 data cache IP，并已集成到 CVA6 配置中。

数据核对日期: 2026-07-16

## Public summary

CV-HPDCache is a configurable, high-performance L1 data-cache controller for RISC-V cores and accelerators. Its multi-requester, non-blocking architecture can keep multiple reads and writes in flight, execute non-overlapping accesses out of order, and support write-through or write-back policies together with RISC-V cache-management and atomic operations. It is aimed at SoC and microarchitecture engineers who need reusable cache IP; CVA6 provides a concrete integration path, while verification limitations should be reviewed in the separate cv-hpdcache-verif project.

## 中文介绍

CV-HPDCache 是一款面向 RISC-V 核心与加速器的可配置高性能 L1 数据缓存控制器。它采用多请求者、non-blocking 架构，可同时保持多笔读写请求，让互不重叠的访问乱序执行，并支持 write-through 或 write-back 策略以及 RISC-V 缓存管理和原子操作。该 IP 适合 SoC 与微架构工程师复用；CVA6 提供了具体集成路径，而验证环境的限制需要同时查看独立的 cv-hpdcache-verif 项目。

## Key facts

- Role: SystemVerilog L1 data-cache IP for RISC-V cores and accelerators
- Request model: multiple requesters and multiple outstanding read/write transactions
- Ordering: overlapping-address requests commit in consumption order; non-overlapping requests may execute out of order
- Policies and ISA support: non-allocate write-through, allocate write-back, RISC-V CMOs, AMOs, and RVWMO
- Integration: CVA6 can select HPDcache through its DCacheType configuration

## 中文核心事实

- 角色：面向 RISC-V 核心与加速器的 SystemVerilog L1 数据缓存 IP
- 请求模型：支持多个请求者以及多笔 outstanding 读写事务
- 顺序性：地址重叠请求按消费顺序提交，地址不重叠请求可乱序执行
- 策略与 ISA：支持 non-allocate write-through、allocate write-back、RISC-V CMO、AMO 和 RVWMO
- 集成：CVA6 可通过 DCacheType 配置选择 HPDcache

## Further resources

- [CV-HPDCache User Guide](https://openhw-group-cv-hpdcache.readthedocs-hosted.com/) — official architecture and integration documentation
- [CV-HPDCache verification](https://github.com/openhwgroup/cv-hpdcache-verif) — dedicated UVM subsystem environment
- [CVA6 integration example](https://github.com/openhwgroup/cva6/blob/master/core/cache_subsystem/cva6_hpdcache_subsystem.sv) — concrete integration referenced by the README
- [Original HPDcache publication](https://doi.org/10.1145/3587135.3591413) — publication listed by the project

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
