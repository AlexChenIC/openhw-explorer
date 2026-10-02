# CVA6 v2 claim ledger — 2026-10-02

Drafted before scene content. `81245a47fad8fe1a5d562d953ef2662e099def76` is the configuration/code snapshot (upstream HEAD at retrieval).

| Claim / teaching use | Primary evidence and locator | Boundary |
|---|---|---|
| Configurable 32/64-bit processor family | CVA6 user manual Introduction; pinned configuration packages | Features vary by selected package; core is part of a system |
| CV32A60X / CV32A65X / RV64 example | core/include/{cv32a60x,cv32a65x,cv64a6_imafdc_sv39}_config_pkg.sv at 81245a47 | XLEN 32/32/64; SuperscalarEn 0/1/0; raw NrCommitPorts 1/1/2; effective commit ports 1/2/2 after build_config override; PMP entries 0/8/8; MMU,S,U,A,F,D off/off/on |
| Issue width derives from SuperscalarEn | core/include/build_config_pkg.sv, NrIssuePorts | Width is 1/2/1; actual IPC depends on workload and stalls |
| Ordered issue; completion may differ | docs/03_cva6_design/issue_stage.md, Issue; commit_stage.rst | Teaching load/add example has no fixed latency or guaranteed scheduling |
| Separate software/platform work | CVA6 SDK README; Cheshire README | Matching memory map, interrupts, boot firmware, kernel and device tree matter |
| ThreadX RV32 CVA6 support | eclipse-threadx/threadx release v6.5.1.202602_rel, New RISC-V Hardware Platforms | Published 2026-06-08, despite tag naming; a port is not a CPU certificate |
| Verification environment uses configuration and tools | pinned verif/README.md: directories, verification plan, variables | riscv-dv/UVM, reference comparison and coverage have separate purposes; no claim all targets passed |
| TRL5 scoped release | cv32a60x-v6.0.0, 2025-04-23, b1f80bd7 | Only CV32A60X; OBI pipeline hierarchy, no caches/PMP entries; Zifencei disabled; no family-wide or safety certification claim |
| Architecture tests have limited scope | riscv/riscv-arch-test README, Test Coverage and Certification | Framework capability is not proof this CVA6 build passed or is fully verified |
| Bosch/TRISTAN | TRISTAN project public 2026 demo announcement | Radar/AI custom CVA6 + accelerators/custom ISA; industrial demonstration; future integration/certification exploration |
| ASTRAL | Thales RISC-V Europe 2025 presentation, slide 6 | Experimental space-oriented SoC, multiple CVA6 + OpenTitan + vector acceleration; no flight qualification claim |
| Basilisk | ETH project page, Overview and Measurements | Linux-capable CVA6/Cheshire system, IHP 130 nm open flow, silicon evidence; no transferred PPA or qualification |
| Occamy | pulp-platform/occamy README; reference manual system components | CVA6 Linux-capable manager; many-core accelerator uses Snitch clusters |
| Roadmap context | CVA6 Roadmap wiki, edited 2026-07-15 | CV64A60AX verification and DCLS integration are dated work items, not new achieved release status |

## Rejected expansions

Do not teach a universal fixed six-stage implementation; a universal Linux capability; double IPC from double issue width; family-wide TRL5; ISO 26262 certification from DCLS, ECC, RTOS support or a separate security framework; a flight-proven ASTRAL; a production Bosch automotive processor; or hundreds of CVA6 cores in Occamy. Do not treat planned CHERI/RVA23/ARA work as implemented functionality.
