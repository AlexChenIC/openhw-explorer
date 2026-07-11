# Industry Landscape Editorial Method

Last substantive review: 2026-07-11

## Scope

The Industry Landscape is a curated map of companies with a publicly documented role in commercial RISC-V productization. It covers:

- Licensable processor and processor-system IP.
- Commercial chips, chiplets, FPGAs, boards, and compute platforms.
- Design, verification, simulation, debug, and system-engineering offerings with explicit RISC-V support.

It is not a complete RISC-V International membership list, an investment map, or a ranking.

## Inclusion Test

An entry needs current first-party evidence for at least one of the following:

1. A named RISC-V processor IP family.
2. A named RISC-V chip, FPGA soft processor, board, or compute platform.
3. A commercial tool or engineering service with explicit RISC-V support.
4. A publicly announced RISC-V product program whose pre-production status is clearly labelled.

RISC-V International Premier or Strategic membership and OpenHW membership are useful discovery and commitment signals. They do not, by themselves, satisfy the inclusion test.

## Status Rules

- Shipping or production products are described in the present tense only when the official source supports that wording.
- Announced products are labelled as announced and are not presented as shipping.
- Acquired companies are shown with their current parent relationship.
- A company with several business lines is described only through its verified RISC-V-relevant offering.
- Generic semiconductor or EDA capability is insufficient without an explicit RISC-V connection.

## 2026-07-11 Review Decisions

The review retained the previously source-checked companies and added representative gaps in five areas:

- Automotive: Infineon's announced automotive RISC-V MCU program.
- Embedded and wireless silicon: Espressif, GigaDevice, and WCH.
- AI and data-center platforms: Rivos, SOPHGO, and Canaan/Kendryte.
- FPGA processors: AMD MicroBlaze V and Altera Nios V.
- Space and engineering enablement: Frontgrade Gaisler, Lauterbach, SEGGER, and Antmicro.

Silvaco was removed. Its general TCAD and EDA portfolio is relevant to semiconductor development, but the review did not find a sufficiently explicit current RISC-V offering to meet this directory's inclusion test.

Special status labels retained in the dataset include:

- MIPS as a GlobalFoundries company.
- Ventana Micro Systems as acquired by Qualcomm.
- Synopsys with the ARC Processor IP transfer to GlobalFoundries noted separately from its continuing RISC-V EDA and verification role.
- Ainekko as carrying forward technology associated with Esperanto and Veevx.
- Infineon as an announced automotive RISC-V program rather than a shipping MCU family.

## Membership Candidates Not Automatically Included

Large RISC-V International members such as Google, Microsoft, NVIDIA, Huawei, and Tencent are important to governance, standards, software, or internal adoption. They are not included solely on that basis because this page requires a public, externally adoptable offering within its supplier scope.

Phytium and Sanechips are also not included solely because of Premier membership; a suitable current first-party RISC-V product page was not established in this review.

Historically notable or emerging companies may remain outside the map when current operating status, product availability, or first-party evidence is unclear. They can be reconsidered when a stable official source becomes available.

## Maintenance Checklist

For each future edit:

1. Record an official product or company source in `docs/third-party-attributions.md`.
2. Use cautious wording for roadmaps, announcements, and pre-production products.
3. Update parent-company status after acquisitions or divestitures.
4. Cache an identification mark from an official or documented fallback source.
5. Run `npm test -- --run tests/industry-landscape.test.ts` and `npm run build`.
6. Verify the combined value-chain and region filters on desktop and mobile.
