# CV32E20 Design Verification

> cv32e20-dv 是 CV32E20/CVE2 的专用设计验证环境，包含 CV32E20-specific SV、C 与 assembly tests。

数据核对日期: 2026-07-08

## Public summary

cv32e20-dv hosts the CV32E20-specific design verification environment. Its README says it contains CV32E20-specific SystemVerilog sources plus C and assembly test-program sources, while non-core-specific verification components live under vendor libraries from core-v-verif.

## 项目概述

README 标题为 Verification Environment for the CV32E20 CORE-V processor core。目录说明包括 `bsp`、`env`、`mk`、`sim`、`tb`、`tests` 与 `vendor_lib`。Getting Started 指向 core-v-verif 的 Quick Start Guide。

## 事实核查要点

- 分类建议为 `verification`，verification type 为 `uvm-testbench`。
- 这是 CV32E20/CVE2 的 DV 环境，不应标为 general OpenHW verification platform。
- 可与 `cve2` 和 `core-v-verif` 建立强关联。

## 主要来源

- https://github.com/openhwgroup/cv32e20-dv
- https://github.com/openhwgroup/cve2
- https://docs.openhwgroup.org/projects/core-v-verif/en/latest/quick_start.html
