# CORE-V Cores (Family Landing)

> core-v-cores 是 CORE-V 家族的总览/路线仓库：介绍各家族成员并链接到各自仓库，维护 CORE-V 命名规则、发布（RTL Freeze）规则与 mvendorid/marchid/mimpid 分配表。

数据核对日期: 2026-07-08

## Public summary

core-v-cores is the landing repository for the CORE-V family of open-source RISC-V cores curated by the OpenHW Foundation. It describes each family member (CVA6, CVW/Wally, the CVE4 family, CVE2, and CVA5) with links to their dedicated repositories, and documents CORE-V device naming, release and RTL-freeze rules, and the assigned mvendorid/marchid/mimpid CSR values for released cores.

## 项目概述

core-v-cores 仓库 README 是 CORE-V 家族的权威总览：CVA6（6-stage，single or dual-issue，含 CV32A60AX/CV32A60X/CV64A60AX 等配置）、CVW（5-stage 教学向）、CVE4 家族（CV32E40Pv1/v2、CV32E40S、CV32E40X、CV32E40PX 概念阶段、CV32E41P）、CVE2（2-stage，源自 Ibex）、CVA5（FPGA 向，源自 Taiga）。同时维护 TRL 目标/达成表：如 CV32A60X v5.3 已达 TRL-5，CV32E20 与 CVWally 目标 2026 Q2。OpenHW 的 mvendorid 为 0x602。

## 事实核查要点

- 这是文档/路线仓库，无 RTL，站内分类为 docs。
- 本仓库是"CVA6 家族 single or dual-issue"表述的官方出处，也是各核心 TRL 状态的权威来源。
- OpenHW Foundation 现为 Eclipse Foundation 的一部分（README 原文）。

## 主要来源

- https://github.com/openhwgroup/core-v-cores
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
