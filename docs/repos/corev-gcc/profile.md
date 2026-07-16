# CORE-V GCC

> corev-gcc 是 OpenHW 的 CORE-V GCC 开发/集成 fork；它不是 GCC 上游主仓库。

数据核对日期: 2026-07-16

## Public summary

corev-gcc is OpenHW's development fork of GCC for CORE-V-specific compiler work. It contains the complete GCC source tree and uses a development branch as the integration point for CORE-V changes, so it is relevant to toolchain maintainers investigating those patches rather than to application developers looking for a packaged compiler. The repository is inactive and is not the upstream GCC project; new standard RISC-V compiler work should normally begin with current upstream GCC.

## 中文介绍

corev-gcc 是 OpenHW 为 CORE-V 专用编译器开发维护的 GCC 分支。它包含完整 GCC 源码树，并以 development 分支作为 CORE-V 修改的集成位置，因此更适合需要研究这些补丁的工具链维护者，而不是只想安装编译器的应用开发者。该仓库目前处于非活跃状态，也不是 GCC 上游；新的标准 RISC-V 编译器工作通常应优先从当前上游 GCC 开始。

## Key facts

- Role: OpenHW development fork for CORE-V-specific GCC work, not the upstream GCC project
- Default branch: development
- Scope: full GCC source tree with CORE-V changes layered into the fork
- OpenHW context: part of the CORE-V GNU Tools effort for embedded-class cores
- Companion: corev-binutils-gdb supplies the matching assembler, linker, and debugger development tree

## 中文核心事实

- 角色：面向 CORE-V 专用 GCC 工作的 OpenHW 开发分支，不是 GCC 上游项目
- 默认分支：development
- 范围：完整 GCC 源码树，并叠加 CORE-V 修改
- OpenHW 背景：属于面向嵌入式 CORE-V 核心的 CORE-V GNU Tools 工作
- 配套仓库：corev-binutils-gdb 提供相应汇编器、链接器和调试器开发树

## Further resources

- [Upstream GCC documentation](https://gcc.gnu.org/onlinedocs/) — authoritative documentation for standard GCC behavior
- [CORE-V Binutils/GDB](https://github.com/openhwgroup/corev-binutils-gdb) — companion assembler, linker, and debugger fork
- [CORE-V LLVM](https://github.com/openhwgroup/corev-llvm-project) — alternative CORE-V compiler-development fork
- [OpenHW project catalogue](https://github.com/openhwgroup/.github/blob/main/profile/README.md) — official positioning under CORE-V GNU Tools

## 项目概述

该仓库本身以 GCC 源码树为主体，README 是 GNU Compiler Collection 的通用 README。OpenHW 官方 profile 将 CORE-V GNU Tools 列为 Software TG 项目，用于 embedded-class CORE-V cores。GitHub API 显示 `corev-gcc` 默认分支为 `development`，这支持“OpenHW fork/staging repo”的站内定位。

## 事实核查要点

- 分类建议为 `tools`。
- 不应写成 official upstream GCC；应写作 OpenHW/CORE-V GCC fork or staging repository。
- 站内最好关联 `corev-binutils-gdb`、`corev-llvm` 与 `core-v-sdk`。

## 主要来源

- https://github.com/openhwgroup/corev-gcc
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://gcc.gnu.org/
