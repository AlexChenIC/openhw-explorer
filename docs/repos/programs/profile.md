# Programs

> programs 是 OpenHW 全部项目的项目级/治理文档仓库：TWG 与各 Task Group 会议纪要、每个项目的 gate 材料、项目 dashboard 与流程模板。

数据核对日期: 2026-07-11

## Public summary

programs hosts program- and project-level documentation for all OpenHW projects, including the CORE-V RISC-V cores. It contains Technical Working Group and Task Group meeting minutes and reports, per-project gate materials (Project Concept, Project Launch, Plan Approve, and Project Freeze), the OpenHW project dashboard linked from the OpenHW website, and process and template documents such as gate and RTL Freeze templates.

## Key facts

- Scope: program- and project-level documentation for OpenHW projects, including CORE-V cores
- Governance records: Technical Working Group and cores, hardware, and verification Task Group minutes, reports, and presentations
- Project gates: per-project folders can contain Project Concept, Project Launch, Plan Approve, and Project Freeze material
- Dashboard: the repository hosts the Markdown project dashboard linked from the OpenHW website
- Boundary: software Task Group material is tracked separately in the core-v-sw repository

## Further resources

- [Project descriptions and plans](https://github.com/openhwgroup/programs/tree/master/Project-Descriptions-and-Plans) — per-project gate material
- [OpenHW project dashboard](https://github.com/openhwgroup/programs/blob/master/dashboard/Dashboard_SpreadSheetFriendly.md) — consolidated status view
- [Project process and templates](https://github.com/openhwgroup/programs/tree/master/process) — gate and RTL Freeze templates
- [CORE-V software working area](https://github.com/openhwgroup/core-v-sw) — software Task Group material referenced by the README

## 项目概述

programs 仓库 README 列出的目录：TWG（Technical Working Group 纪要与演示材料）、TG（cores/hw/verification 三个 Task Group 的月报与纪要，sw task group 在 core-v-sw 仓库跟踪）、OpenHW-Project-Descriptions-and-Plans（每个 OpenHW 项目一个目录，存放四个 gate 的材料，可一览所有项目）、OpenHW-dashboard（官网链接的项目仪表盘 markdown）、process（流程与模板文档）、Attendance-tracking（会议出席记录）。

## 事实核查要点

- 纯文档/治理仓库，站内分类为 docs。
- 想了解某个 OpenHW 项目的立项/冻结状态，这里的 gate 材料是第一手来源。
- software task group 的内容不在本仓库，而在 core-v-sw。

## 主要来源

- https://github.com/openhwgroup/programs
- https://github.com/openhwgroup/core-v-sw
