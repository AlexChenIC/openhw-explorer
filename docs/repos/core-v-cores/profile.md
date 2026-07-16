# CORE-V Cores (Family Landing)

> core-v-cores 是 CORE-V 家族的总览/路线仓库：介绍各家族成员并链接到各自仓库，维护 CORE-V 命名规则、发布（RTL Freeze）规则与 mvendorid/marchid/mimpid 分配表。

数据核对日期: 2026-07-16

## Public summary

core-v-cores is the authoritative family map for OpenHW's CORE-V processors. Rather than containing processor RTL, it compares the CVA6, CVW, CVE4, CVE2, and CVA5 families, links to their implementation repositories, and records naming rules, release and RTL-freeze policy, TRL progress, and architectural identity values. Newcomers should use it to understand how the cores relate before choosing a repository; engineers should use its release table to distinguish a family roadmap from the exact maturity of a particular configuration.

## 中文介绍

core-v-cores 是 OpenHW CORE-V 处理器的权威家族总览。它本身不保存处理器 RTL，而是对 CVA6、CVW、CVE4、CVE2 和 CVA5 家族进行说明并链接到各实现仓库，同时记录命名规则、发布与 RTL Freeze 规则、TRL 进展和架构标识值。初学者可以先用它理解各核心之间的关系再选择仓库；工程师则应通过其中的发布表区分家族路线与某个具体配置的实际成熟度。

## Key facts

- Artifact type: CORE-V family roadmap and release documentation; each core's RTL lives elsewhere
- Families covered: CVA6, CVW/Wally, CVE4, CVE2, and CVA5
- Configuration distinction: CVA6 family material covers single- and dual-issue variants while the current baseline implementation is single-issue
- Release rule: reaching the target TRL creates a major release, also called an RTL Freeze
- Identification: OpenHW mvendorid 0x602 plus assigned marchid and mimpid values for released cores

## 中文核心事实

- 产物类型：CORE-V 家族路线与发布文档，各核心 RTL 位于独立仓库
- 覆盖家族：CVA6、CVW/Wally、CVE4、CVE2 和 CVA5
- 配置差异：CVA6 家族资料覆盖单发射与双发射变体，当前基线实现为单发射
- 发布规则：达到目标 TRL 会产生一个 major release，也称 RTL Freeze
- 标识：记录 OpenHW mvendorid 0x602，以及已发布核心的 marchid 和 mimpid

## Further resources

- [OpenHW project catalogue](https://github.com/openhwgroup/.github/blob/main/profile/README.md) — official project grouping and status table
- [OpenHW project dashboard](https://github.com/openhwgroup/programs/blob/master/dashboard/Dashboard_SpreadSheetFriendly.md) — project-level status and gate context
- [RTL Freeze rules](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/en/latest/core_versions.html) — release and core-version rules referenced by the repository
- [CVA6 User Manual](https://docs.openhwgroup.org/projects/cva6-user-manual/) — implementation documentation for one family member

## 项目概述

core-v-cores 仓库 README 是 CORE-V 家族的权威总览：CVA6（6-stage，single or dual-issue，含 CV32A60AX/CV32A60X/CV64A60AX 等配置）、CVW（5-stage 教学向）、CVE4 家族（CV32E40Pv1/v2、CV32E40S、CV32E40X、CV32E40PX 概念阶段、CV32E41P）、CVE2（2-stage，源自 Ibex）、CVA5（FPGA 向，源自 Taiga）。同时维护 TRL 目标/达成表：如 CV32A60X v5.3 已达 TRL-5，CV32E20 与 CVWally 目标 2026 Q2。OpenHW 的 mvendorid 为 0x602。

## 事实核查要点

- 这是文档/路线仓库，无 RTL，站内分类为 docs。
- 本仓库是"CVA6 家族 single or dual-issue"表述的官方出处，也是各核心 TRL 状态的权威来源。
- OpenHW Foundation 现为 Eclipse Foundation 的一部分（README 原文）。

## 主要来源

- https://github.com/openhwgroup/core-v-cores
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
