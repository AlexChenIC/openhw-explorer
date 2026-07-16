# OBI

> obi 是 OpenBus Interface (OBI) 规范的维护仓库；OBI 是 CORE-V 核心（如 CV32E40P/CVE2）指令与数据接口使用的总线协议。

数据核对日期: 2026-07-16

## Public summary

obi is the repository that maintains the OpenBus Interface (OBI) specification. OBI is the bus protocol used by CORE-V cores such as CV32E40P and CV32E20 for their instruction and data memory interfaces, and OBI agents appear throughout the CORE-V verification environments.

## Key facts

- Artifact type: specification repository; the root contains versioned OBI PDF documents rather than RTL
- Published files currently range from OBI v1.0 through OBI v1.6.0
- The repository README itself is intentionally minimal and only states that the repository maintains the OpenBus Interface specification
- CORE-V usage is documented outside this repository, including CV32E40P instruction/data interfaces and OBI verification agents

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
