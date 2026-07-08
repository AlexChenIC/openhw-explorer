# CORE-V LLVM

> corev-llvm-project 是 CORE-V Clang/LLVM development fork，不是标准 LLVM Foundation distribution。

数据核对日期: 2026-07-08

## Public summary

corev-llvm-project is OpenHW's CORE-V Clang/LLVM development fork before upstream submission. Its README states that it is not the standard LLVM Foundation distribution and describes a `development` branch tracking upstream LLVM with CORE-V changes plus an optional tested `stable` branch.

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
