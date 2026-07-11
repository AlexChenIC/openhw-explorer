# CORE-V GCC

> corev-gcc 是 OpenHW 的 CORE-V GCC 开发/集成 fork；它不是 GCC 上游主仓库。

数据核对日期: 2026-07-11

## Public summary

corev-gcc is OpenHW's GCC fork for CORE-V GNU toolchain development. The repository default branch is `development`, and OpenHW's project table groups it under CORE-V GNU Tools for embedded-class CORE-V cores; it should be presented as a staging/development fork rather than the upstream GCC project.

## Key facts

- Repository role: OpenHW fork used for CORE-V GNU toolchain development, not the upstream GCC repository
- Default branch: GitHub reports `development`
- Scope: the repository contains a full GCC source tree, so its top-level README is the generic GNU Compiler Collection README
- OpenHW context: the official project table groups CORE-V GNU Tools with software support for embedded-class CORE-V cores
- Companion repositories: corev-binutils-gdb supplies the matching Binutils/GDB development tree

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
