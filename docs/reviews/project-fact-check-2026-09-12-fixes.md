# Project fact-check corrections - 2026-09-12

## Scope

This change implements the September 12 audit of the 40 project profiles. The
audited content baseline was `e251eb9`; the fixes start from `07e182b`, retaining
the newer news publication. Profile Markdown remains the authoring source;
`src/data/project-profile-meta.json` is regenerated, not edited independently.
English and Chinese summaries and key facts are updated together.

The review checks documentation and selected implementation/configuration
sources. It does not certify RTL correctness, complete test coverage, production
readiness, hardware availability, or legal compliance. Newer upstream commits
can require another review.

## Resolved findings

| Audit ID | Correction | Primary evidence |
| --- | --- | --- |
| F01 | Describe CVA6 as a configurable family. CV32A60X is single-issue and CV32A65X is already dual-issue; neither embedded configuration has MMU, S/U modes, or A enabled. Keep CV32A60X v5.3 TRL-5 separate from other configurations. Update the family-map profile too. | [CV32A60X](https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/cv32a60x_config_pkg.sv), [CV32A65X](https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/cv32a65x_config_pkg.sv), [derived issue width](https://github.com/openhwgroup/cva6/blob/49b5fa9e/core/include/build_config_pkg.sv) |
| F02 | List CVFPU's five built-in formats; distinguish adding a format from selecting an implemented and verified format. Remove unconditional binary128 support. | [format definitions](https://github.com/openhwgroup/cvfpu/blob/355c388e/src/fpnew_pkg.sv), [custom formats](https://github.com/openhwgroup/cvfpu/blob/355c388e/docs/README.md#adding-custom-formats) |
| F03 | List the actual E40P/X/S directories in core-v-verif; direct CVA6 users to cva6/verif. | [verification tree](https://github.com/openhwgroup/core-v-verif/tree/7238a436), [CVA6 verification](https://github.com/openhwgroup/cva6/blob/49b5fa9e/verif/README.md) |
| F04 | Describe CVE2 compressed instructions as supported, not an optional RV32C switch; multiplication/division remains configurable. | [integration parameters](https://github.com/openhwgroup/cve2/blob/d079e8c8/doc/02_user/integration.rst), [instruction fetch](https://github.com/openhwgroup/cve2/blob/d079e8c8/doc/03_reference/instruction_fetch.rst) |
| F05 | Distinguish basic CV-X-IF channels from optional memory channels and require version/implementation matching. | [protocol](https://github.com/openhwgroup/core-v-xif/blob/d26eeab3/docs/source/x_ext.rst), [scope](https://github.com/openhwgroup/core-v-xif/blob/d26eeab3/docs/source/intro.rst) |
| F06 | Replace the stale November 2024 maintenance claim with dated July 2026 commit evidence. Change the static DV status to maintained, explicitly attributed to editorial assessment rather than a live metric. | [July 27 merge](https://github.com/openhwgroup/cv32e40s-dv/commit/8b27b963ef08badfa350b4207a45e2c2cadb3001) |
| F07 | Correct the first three authors, in publisher order, for the two CV32E40P and two MCU references. | [Near-Threshold](https://doi.org/10.1109/TVLSI.2017.2654506), [Slow and steady](https://doi.org/10.1109/PATMOS.2017.8106976), [Quentin](https://doi.org/10.1109/S3S.2018.8640145), [Arnold](https://doi.org/10.1109/TVLSI.2021.3058162) |
| F08 | Keep the CVW textbook in Further resources, labeled first edition, 2026, ISBN 978-0-323-99498-9. Stop counting it as an academic paper. | [publisher](https://shop.elsevier.com/books/risc-v-system-on-chip-design/harris/978-0-323-99498-9), [inspection-copy metadata](https://www.inspectioncopy.elsevier.com/book/details/9780323994989) |
| F09 | Correct both FreeRTOS profiles: the reviewed runtime selects the PULP kernel submodule, not the related OpenHW fork. Correct hidden dependency relationships too. | [.gitmodules](https://github.com/openhwgroup/core-v-freertos/blob/4854f247/.gitmodules) |
| F10 | Add CVFPU-UVM coverage limits and the version-pinned limitations link, without implying full IEEE compliance or all-format coverage. | [Known Limitations](https://github.com/openhwgroup/cvfpu-uvm/blob/2f787402/README.md#42-known-limitations) |
| F11 | Remove the dynamically maintained verification manual from academic-paper counts and its unsupported publication year. Its documentation link remains in Further resources. | [verification documentation](https://docs.openhwgroup.org/projects/core-v-verif/en/latest/) |
| F12 | Remove the generator's eight-URL truncation. The full deduplicated source list and source count now agree; the expandable UI retains all evidence. | `scripts/build-project-profile-meta.mjs`; all-profile regression test |

## Classification and completeness

- C01: Static status assessments no longer masquerade as live GitHub signals.
  Archived status still uses GitHub metadata. Official classifications retain
  their source links; CV32E40S points to the organization catalogue and its key
  facts separately explain the TRL-work boundary. The existing four-week
  activity panel is not a maturity rating.
- C02/C03: CORE-ET leads with IP, retaining SoC as a secondary discovery route;
  UAP leads with documentation, retaining IP discovery. OBI and CV-X-IF remain
  discoverable as both specifications and IP-related resources.
- C04/C05: Preserve the valid application-class, security, functional-safety,
  and learning distinctions. Do not invent a completed CVA6-DCLS implementation
  or a tested modern SDK installation flow. The existing SDK legacy-host warning
  remains; FreeRTOS copy now calls out toolchain/platform version requirements.
- C06: Do not add the GitHub-dominant language automatically to capability tags.
  The detail-page language metric explicitly identifies it as a GitHub repository
  language, so Assembly does not purport to describe CVA6's RTL.
- Add CV32E40P v1's F/XPULP verification exclusions, the two documented CVA6 SDK
  configurations, HPDcache's separate SystemC/Verilator route, and the official
  DevKit hardware manual. Clarify board files versus stock availability.
- Scope Polara capabilities to its pinned dependencies, OBI to the implemented
  version, Yocto reproducibility to fixed revisions, and UAP access to each
  asset's terms. Mark MCU papers as predecessor research, not current-silicon
  measurements. Count the FPnew preprint and journal article as one work, keeping
  both access routes.

## Hidden-data safeguards

- H01: Remove unsupported E41P-to-E40S succession, E40S-to-CVA6-Safe security
  lineage, and CVE2-to-MCU candidate integration claims.
- H02: Replace QuickLogic-as-manufacturer/Arnold identity claims with the
  documented ArcticPro2 IP relationship. Move the MCU entry from product
  adoption to organizational involvement.
- H03: Remove unsubstantiated company-leadership and teaching-adoption entries;
  remove claims of inherited complete verification and an upstreamed FreeRTOS
  port. These removals reflect insufficient cited evidence, not a finding that
  the organizations made no contributions. No hidden sections are enabled.

## Deliberately deferred enhancements

These were proposals for additional evidence or taxonomy, not established
errors to replace with guesses:

- A separate artifact-type dimension (RTL, specification, board, software,
  catalogue), automated status review, and a revised learning-role taxonomy.
- Tested compiler/extension compatibility matrices, exact independent-DV versus
  shared-DV revision relationships, and fresh legacy SDK/FreeRTOS installation
  reproduction. Existing links are not promises that every modern host works.
- Detailed release-specific CVE2 XInterface coverage and CV-MESH integration
  matrices; no unverified compatibility statement is added.
- Ara bibliography normalization between online-first and journal-issue dates.
  The existing 2019 entry is not changed mechanically from a DOI year.
- Restore company contribution/adoption records only with project-specific
  primary sources. Hardware availability requires a current supplier check.

## Validation

- Node 22.22.2, matching the repository's `.node-version`; clean `npm ci`.
- Profile generation: 40 profiles, 40 reviewed, zero missing.
- Vitest: 52 tests passed, including eight new fact-check regression tests.
- ESLint, data-quality checks with news enabled, and `git diff --check`: passed.
- Next.js production build with news enabled: passed; 125 static pages generated.
- Playwright against the production build: 80 English/Chinese detail routes
  returned 200 and matched their source summaries and every key fact; both
  CVA6 source expanders contained all expected links. Ten mobile detail routes
  and both homepage documentation filters passed without horizontal overflow.
  No page-script errors were recorded. Desktop and mobile screenshots reviewed.
- Deployment is verified separately after pushing. No news, classroom,
  dependency-lockfile, or deployment-setting changes are part of this patch.

The machine's default Node 26.3.0 initially failed to install better-sqlite3.
Using the already installed Node 22.22.2 resolved this without changing global
Node settings or dependency versions.
