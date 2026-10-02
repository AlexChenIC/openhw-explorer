# Source ledger

Checked 2026-10-02. Parameter examples are pinned to CVA6 commit `81245a47fad8fe1a5d562d953ef2662e099def76`. System links are separate projects; their current instructions must be followed at use time.

## CVA6 repository · pinned snapshot

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/README.md
- Locator: README; core/, corev_apu/, verif/
- Supports: Configurable processor RTL, APU integration and verification are distinct parts of the project.

## CVA6 user manual · Introduction

- Source: https://docs.openhwgroup.org/projects/cva6-user-manual/01_cva6_user/Introduction.html
- Locator: Introduction and core description; retrieved 2026-10-02; work-in-progress manual
- Supports: 32/64-bit family with configuration-dependent MMU, PMP, floating point and caches; FPGA/ASIC integration. Package examples below use pinned code, not the evolving manual table.

## CVA6 functional architecture

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/design/design-manual/source/architecture.adoc
- Locator: Architecture; Modules
- Supports: Frontend, decode, issue, execution and commit form a functional map. This is not a fixed cycle-accurate pipeline drawing.

## CV32A60X configuration

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv32a60x_config_pkg.sv
- Locator: CVA6ConfigXlen; cva6_cfg: SuperscalarEn, NrCommitPorts, MmuPresent, RVS, RVU, RVA, RVF, RVD, NrPMPEntries
- Supports: At this snapshot: XLEN 32; SuperscalarEn=0; commit ports=1; MMU/S/U/A/F/D=0; PMP entries=0. This snapshot is separate from the TRL5 release tag.

## CV32A65X configuration

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv32a65x_config_pkg.sv
- Locator: CVA6ConfigXlen; cva6_cfg; combine with build_config_pkg.sv
- Supports: XLEN 32; SuperscalarEn=1; raw NrCommitPorts=1 is overridden to 2 by build_config; MMU/S/U/A/F/D=0; PMP entries=8.

## RV64 / Sv39 example configuration

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/cv64a6_imafdc_sv39_config_pkg.sv
- Locator: CVA6ConfigXlen; ISA constants; cva6_cfg
- Supports: XLEN 64; SuperscalarEn=0; commit ports=2; MMU/S/U/A/F/D enabled; PMP entries=8. This is one package, not a universal RV64 specification.

## Derived issue and commit widths

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/core/include/build_config_pkg.sv
- Locator: build_config: cfg.NrCommitPorts and cfg.NrIssuePorts
- Supports: SuperscalarEn selects 1 or 2 issue ports and overrides commit ports to 2 when enabled. Effective issue/commit widths are 1/1, 2/2 and 1/2 in the three examples; these are not measured IPC.

## Issue and scoreboard

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/03_cva6_design/issue_stage.md
- Locator: Issue; Read Operands; Scoreboard
- Supports: Ordered issue with operand/resource checks; independent functional units can return results in a different order. The load/add illustration is conceptual, without cycle or performance claims.

## Commit stage

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/docs/03_cva6_design/commit_stage.rst
- Locator: Commit Stage
- Supports: Retirement controls architectural state updates and exception handling.

## CVA6 SDK

- Source: https://github.com/openhwfoundation/cva6-sdk
- Locator: README: Linux software flow and board targets; retrieved 2026-10-02
- Supports: A usable Linux system requires matching platform and boot/software integration beyond CPU configuration flags.

## Cheshire host platform

- Source: https://github.com/pulp-platform/cheshire
- Locator: README: Overview and Getting Started; retrieved 2026-10-02
- Supports: Linux-capable CVA6 host platform developed in PULP; separate integration project.

## ThreadX: RV32 CVA6 support

- Source: https://github.com/eclipse-threadx/threadx/releases/tag/v6.5.1.202602_rel
- Locator: New RISC-V Hardware Platforms; release published 2026-06-08
- Supports: Release lists OpenHW CVA6 RISC-V 32-bit support. The release tag includes 202602 but its publication date is June 8. Software port support does not establish CPU safety certification.

## CVA6 verification environment

- Source: https://github.com/openhwfoundation/cva6/blob/81245a47fad8fe1a5d562d953ef2662e099def76/verif/README.md
- Locator: Directories; Verification plan; Environment variables
- Supports: UVM testbench, riscv-dv simulation flow, BSP/tests/regressions, selectable target and simulator; coverage plan requires configuration and tool context.

## RISC-V Architectural Certification Tests

- Source: https://github.com/riscv/riscv-arch-test
- Locator: README opening paragraphs; ACT4 requirements; retrieved 2026-10-02
- Supports: ACT4 configures and generates architectural tests for a DUT. Upstream explicitly requires additional processor verification. This course makes no assertion that a CVA6 target has passed ACT4 certification.

## CV32A60X TRL5 release · 2025-04-23

- Source: https://github.com/openhwfoundation/cva6/releases/tag/cv32a60x-v6.0.0
- Locator: Release body; tag commit b1f80bd7cff3a94e5191aad96dc3a22f87d0a517
- Supports: Release explicitly contains only CV32A60X: pipeline hierarchy with OBI interface, no caches, no PMP entries, Zifencei disabled; improved coverage and lint. TRL5 scope is this release configuration.

## TRISTAN: Bosch CVA6 demonstration

- Source: https://www.linkedin.com/posts/tristan-kdt_riscv-riscv-openhardware-activity-7473283411911008256-R-BM
- Locator: Public project announcement: Bosch demo, dedicated accelerators/custom ISA, next steps; retrieved 2026-10-02
- Supports: Industrial radar/AI demonstration using customized CVA6 and acceleration; certification and future automotive integration are described as exploration, not achieved production qualification.

## Thales: experimental ASTRAL SoC · 2025

- Source: https://riscv-europe.org/summit/2025/media/proceedings/2025-05-14-RISC-V-Summit-Europe-09h00-QUENDT-slides.pdf
- Locator: Slide 6 / PDF page 6: Experimental SoC ASTRAL
- Supports: Space-oriented experimental SoC combining multiple CVA6 cores, OpenTitan and vector acceleration. Source does not establish flight qualification or in-orbit deployment.

## Basilisk project and silicon measurements

- Source: https://iis-people.ee.ethz.ch/~phsauter/basilisk/
- Locator: Overview; Measurements; Linux boot demonstration; retrieved 2026-10-02
- Supports: CVA6/Cheshire Linux-capable system implemented using IHP 130 nm and an open flow; project publishes silicon measurements. Evidence belongs to this implementation.

## Occamy: manager and accelerator

- Source: https://github.com/pulp-platform/occamy
- Locator: README opening description; retrieved 2026-10-02
- Supports: CVA6 is the Linux-capable manager; the many-core floating-point accelerator is based on Snitch clusters. Accelerator core counts must not be relabeled as CVA6 counts.

## CVA6 Roadmap · edited 2026-07-15

- Source: https://github.com/openhwfoundation/cva6/wiki/CVA6-Roadmap
- Locator: CV64A60AX verification; DCLS work; roadmap page version date
- Supports: A dated work plan includes CV64A60AX verification and dual-core lockstep integration work. Planned or ongoing work does not establish a completed release.
