# CORE-V Binutils & GDB

> corev-binutils-gdb 是 CORE-V Binutils/GDB 的 development fork；README 明确说它不是 official Binutils repository。

数据核对日期: 2026-07-16

## Public summary

corev-binutils-gdb is OpenHW's development fork of GNU Binutils and GDB for CORE-V-specific assembler, linker, binary-tool, and debugger changes. Its development branch tracks upstream Binutils while carrying CORE-V work intended for possible upstream submission. This inactive repository is useful when maintaining or auditing the historical CORE-V GNU toolchain, but it is not an official upstream distribution or a current end-user tool package.

## 中文介绍

corev-binutils-gdb 是 OpenHW 为 CORE-V 专用汇编器、链接器、二进制工具和调试器修改维护的 GNU Binutils/GDB 开发分支。development 分支跟踪上游 Binutils，同时承载计划向上游提交的 CORE-V 工作。该仓库目前处于非活跃状态，适合维护或审计历史 CORE-V GNU 工具链，但它不是官方上游发行版，也不是面向普通用户的当前工具包。

## Key facts

- Role: CORE-V Binutils/GDB development before proposed upstream inclusion
- Upstream boundary: development fork, not the official GNU Binutils repository
- Branch model: development is the designated active-development branch
- Synchronization: tracks upstream Binutils while adding CORE-V changes
- Quality posture: branch policy expects builds and tests to pass, but this is not an independent certification

## 中文核心事实

- 角色：用于 CORE-V Binutils/GDB 修改及潜在上游提交前的开发
- 上游边界：开发分支，并非 GNU Binutils 官方仓库
- 分支模型：development 是指定的活跃开发分支
- 同步方式：跟踪上游 Binutils，同时加入 CORE-V 修改
- 质量定位：分支策略要求编译和测试通过，但这不等同于独立认证

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
