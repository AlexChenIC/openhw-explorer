# CORE-V Binutils & GDB

> corev-binutils-gdb 是 CORE-V Binutils/GDB 的 development fork；README 明确说它不是 official Binutils repository。

数据核对日期: 2026-07-16

## Public summary

corev-binutils-gdb is OpenHW's CORE-V Binutils/GDB development repository before upstream submission. Its README explicitly says it is not the official Binutils repository and that the `development` branch tracks upstream Binutils while incorporating CORE-V changes.

## Key facts

- Repository role: CORE-V Binutils/GDB development before proposed upstream inclusion
- Upstream boundary: the README explicitly states that this is not the official Binutils repository
- Branch model: `development` is the single active branch described by the README
- Synchronization: the development branch tracks upstream Binutils and adds CORE-V changes
- Quality expectation: the README says the development branch should compile and pass tests, but this is a project policy rather than an independent certification

## Further resources

- [CORE-V GNU tools reports](https://github.com/openhwgroup/core-v-sw/tree/master/projects/gnu-tools/2023) — project reports linked by the repository README
- [Upstream GNU Binutils](https://sourceware.org/binutils/) — official upstream project
- [CORE-V GCC](https://github.com/openhwgroup/corev-gcc) — companion compiler fork
- [CORE-V LLVM](https://github.com/openhwgroup/corev-llvm-project) — alternative CORE-V compiler-development fork

## 项目概述

README 标题为 CORE-V Binutils Development，并明确写到 NOTE: This is NOT the official Binutils repository。它说明该仓库用于 CORE-V Binutils development prior to submitting for inclusion upstream，并只有 `development` 分支用于 active development，跟踪 upstream Binutils 并加入 CORE-V changes。

## 事实核查要点

- 分类建议为 `tools`。
- 可描述为 assembler/linker/debugger/toolchain support，但不要误称为上游 GNU Binutils/GDB。
- 与 `corev-gcc`、`corev-llvm`、`core-v-sdk` 关联。

## 主要来源

- https://github.com/openhwgroup/corev-binutils-gdb
- https://github.com/openhwgroup/.github/blob/main/profile/README.md
- https://sourceware.org/binutils/
