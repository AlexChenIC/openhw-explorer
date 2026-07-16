# CORE-V LLVM

> corev-llvm-project 是 CORE-V Clang/LLVM development fork，不是标准 LLVM Foundation distribution。

数据核对日期: 2026-07-16

## Public summary

corev-llvm-project is OpenHW's development fork of LLVM and Clang for CORE-V-specific compiler changes. The development branch follows upstream LLVM while integrating CORE-V work, and selected tested snapshots may be placed on a stable branch. The repository matters to compiler engineers studying or maintaining those extensions, but it is inactive, is not the standard LLVM distribution, and should not be mistaken for a supported general-purpose toolchain release.

## 中文介绍

corev-llvm-project 是 OpenHW 为 CORE-V 专用编译器修改维护的 LLVM/Clang 开发分支。development 分支跟踪上游 LLVM 并集成 CORE-V 工作，经过充分测试的重要快照可能进入 stable 分支。它适合研究或维护这些扩展的编译器工程师，但仓库目前处于非活跃状态，也不是标准 LLVM 发行版或受支持的通用工具链版本。

## Key facts

- Role: CORE-V Clang/LLVM development before proposed upstream inclusion
- Upstream boundary: OpenHW fork, not the standard LLVM distribution
- Development branch: tracks upstream LLVM while incorporating CORE-V changes
- Stable branch: optional tested snapshots at significant feature points
- Scope: full LLVM project source tree with a CORE-V-specific development preface and branch model

## 中文核心事实

- 角色：用于 CORE-V Clang/LLVM 修改及潜在上游提交前的开发
- 上游边界：OpenHW 分支，不是标准 LLVM 发行版
- Development 分支：跟踪上游 LLVM，同时集成 CORE-V 修改
- Stable 分支：可用于保存重要功能节点的已测试快照
- 范围：完整 LLVM 项目源码树，并加入 CORE-V 专用开发说明与分支模型

## Further resources

- [Upstream LLVM documentation](https://llvm.org/docs/) — authoritative documentation for standard LLVM and Clang
- [Upstream LLVM repository](https://github.com/llvm/llvm-project) — standard distribution named by the CORE-V README
- [CORE-V GCC](https://github.com/openhwgroup/corev-gcc) — GNU compiler companion project
- [CORE-V Binutils/GDB](https://github.com/openhwgroup/corev-binutils-gdb) — assembler, linker, and debugger companion project

## 项目概述

README 标题为 CORE-V Clang/LLVM Development，并明确说明 This is not the standard LLVM Foundation distribution。该仓库用于 CORE-V Clang/LLVM development prior to submitting upstream，`development` 分支跟踪 upstream LLVM 并包含 CORE-V changes，`stable` 分支若存在则为经过测试的重要功能快照。

## 事实核查要点

- 分类建议为 `tools`。
- 不应写成 LLVM upstream；应写成 OpenHW staging/development fork。
- 与 `corev-gcc`、`corev-binutils-gdb`、`core-v-sdk` 关联。

## 主要来源

- https://github.com/openhwgroup/corev-llvm-project
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://llvm.org/docs/
