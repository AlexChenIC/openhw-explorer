# Source ledger

Checked 2026-09-13. Parameter examples are pinned to CVA6 commit `49b5fa9e2f5a803cd52f8430d8e8818089e68865`. System links are separate projects; their current instructions must be followed at use time.

## CVA6 repository

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/README.md
- Locator: Overview, folder structure, quick setup
- Supports: Processor RTL is distinct from the APU testbench, verification and software integration.

## CVA6 architecture and modules

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/docs/design/design-manual/source/architecture.adoc
- Locator: Architecture and Modules
- Supports: Frontend, decode, issue, execute and commit cooperate with caches, CSR state and control. The diagram is a functional map, not a cycle-accurate six-stage schedule.

## CV32A60X configuration

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/core/include/cv32a60x_config_pkg.sv
- Locator: CVA6ConfigXlen; cva6_cfg
- Supports: XLEN 32; SuperscalarEn 0; MmuPresent/RVS/RVU/RVA/RVF/RVD 0.

## CV32A65X configuration

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/core/include/cv32a65x_config_pkg.sv
- Locator: CVA6ConfigXlen; cva6_cfg
- Supports: XLEN 32; SuperscalarEn 1; MmuPresent/RVS/RVU/RVA/RVF/RVD 0.

## cv64a6_imafdc_sv39 configuration

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/core/include/cv64a6_imafdc_sv39_config_pkg.sv
- Locator: CVA6ConfigXlen; MMU/ISA constants; cva6_cfg
- Supports: XLEN 64; SuperscalarEn 0; MMU/S/U/A/F/D enabled in this concrete package; its filename is not an exhaustive extension list.

## Derived configuration

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/core/include/build_config_pkg.sv
- Locator: build_config: NrIssuePorts and NrCommitPorts
- Supports: SuperscalarEn derives one or two issue ports; issue and commit width are separate quantities.

## CVA6 issue-stage design

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/docs/03_cva6_design/issue_stage.md
- Locator: Issue, Read Operands, Scoreboard
- Supports: Instructions issue in program order, while independent functional units may return results in a different order. The scoreboard tracks outstanding instructions and data.

## CVA6 commit-stage design

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/docs/03_cva6_design/commit_stage.rst
- Locator: Commit Stage
- Supports: Commit retires instructions, updates architectural state and handles exceptions.

## CVA6 SDK

- Source: https://github.com/openhwgroup/cva6-sdk
- Locator: README: Overview; Requirements; Getting started
- Supports: A board-specific Linux software flow is a separate project from the CPU RTL.

## PULP Cheshire host platform

- Source: https://github.com/pulp-platform/cheshire
- Locator: README: purpose and Getting Started links
- Supports: A separately maintained Linux-capable host platform built around CVA6, developed in the PULP project.

## CV32A65X smoke regression

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/verif/regress/smoke-tests-cv32a65x.sh
- Locator: Configuration-specific regression script
- Supports: A concrete smoke-test entry point; a passing smoke run is not full coverage or sign-off. The obsolete generic smoke-tests.sh is not used.

## CVA6 verification environment

- Source: https://github.com/openhwgroup/cva6/blob/49b5fa9e2f5a803cd52f8430d8e8818089e68865/verif/README.md
- Locator: Directories; Environment variables
- Supports: The verification subtree separates BSP, regression scripts, simulation, testbench and tests; DV_TARGET/DV_SIMULATORS select configuration and simulation flow.

## CVA6 tier CI

- Source: https://openhwgroup.github.io/cva6/
- Locator: Dashboard run and configuration information
- Supports: An entry point to inspect CI evidence; results must be read in the context of commit, target, simulator and tests.
