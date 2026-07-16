# OBI

> obi 是 OpenBus Interface (OBI) 规范的维护仓库；OBI 是 CORE-V 核心（如 CV32E40P/CVE2）指令与数据接口使用的总线协议。

数据核对日期: 2026-07-16

## Public summary

OBI is the specification repository for the OpenBus Interface, a lightweight on-chip protocol used by several CORE-V embedded processors for instruction and data-memory access. The repository publishes versioned specification documents rather than RTL, while processor manuals and verification projects provide concrete master, slave, and agent implementations. Use it when integrating a CORE-V memory interface or building compatible interconnect and verification components.

## 中文介绍

OBI 是 OpenBus Interface 的规范仓库，这是一种被多个 CORE-V 嵌入式处理器用于取指和数据访存的轻量级片上协议。仓库发布的是带版本的规范文档，而不是 RTL；具体 master、slave 和验证 agent 的实现分布在处理器手册及验证项目中。集成 CORE-V 存储接口，或开发兼容互连与验证组件时，应从这里确认协议定义。

## Key facts

- Artifact type: versioned protocol specification rather than RTL
- Published documents: OBI v1.0 through OBI v1.6.0 are present in the repository
- CORE-V usage: instruction and data-memory interfaces in processors including CV32E40P and CV32E20
- Implementation boundary: concrete protocol logic and verification agents live in consuming core and DV repositories

## 中文核心事实

- 产物类型：带版本的总线协议规范，不是 RTL
- 已发布文档：仓库包含 OBI v1.0 至 v1.6.0
- CORE-V 使用场景：CV32E40P、CV32E20 等核心的取指与数据存储接口
- 实现边界：具体协议逻辑和验证 agent 位于使用 OBI 的核心与 DV 仓库

## Further resources

- [OBI v1.6.0 specification](https://github.com/openhwgroup/obi/blob/main/OBI-v1.6.0.pdf) — latest versioned PDF currently present in the repository
- [CV32E40P User Manual](https://docs.openhwgroup.org/projects/cv32e40p-user-manual/) — core interfaces using OBI
- [CV32E20 design verification](https://github.com/openhwgroup/cv32e20-dv) — verification environment that consumes an OBI agent from core-v-verif
- [CORE-V verification environment](https://github.com/openhwgroup/core-v-verif) — source of shared bus-agent infrastructure

## 项目概述

obi 仓库 README 很简短："Repository that maintains the OpenBus Interface spec"。仓库内容为 OBI 协议规范文档。OBI 协议在 CORE-V 生态中广泛使用：CV32E40P 用户手册描述其 instruction fetch / load-store 接口为 OBI 协议，cv32e20-dv 等验证环境中也维护 OBI Agent。

## 事实核查要点

- 这是规范文档仓库，无 RTL；站内分类为 ip（接口规范），状态为 stable（规范已发布，仓库低频维护，最后 push 2023-04）。
- "CORE-V 核心使用 OBI" 的表述来自 CV32E40P 用户手册与 cv32e20-dv README，不是 obi 仓库本身。

## 主要来源

- https://github.com/openhwgroup/obi
- https://docs.openhwgroup.org/projects/cv32e40p-user-manual/
- https://github.com/openhwgroup/cv32e20-dv
