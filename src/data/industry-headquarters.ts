import type { IndustryRegionId, LocalizedIndustryText } from "./industry-landscape";

type Headquarters = { country: string; label: LocalizedIndustryText; group: IndustryRegionId; source: string };
const country = {
  US: { label: { en: "United States", zh: "美国" }, group: "north-america" },
  DE: { label: { en: "Germany", zh: "德国" }, group: "europe" },
  ES: { label: { en: "Spain", zh: "西班牙" }, group: "europe" },
  NL: { label: { en: "Netherlands", zh: "荷兰" }, group: "europe" },
  FR: { label: { en: "France", zh: "法国" }, group: "europe" },
  GB: { label: { en: "United Kingdom", zh: "英国" }, group: "europe" },
  JP: { label: { en: "Japan", zh: "日本" }, group: "asia-pacific" },
  TW: { label: { en: "Taiwan", zh: "中国台湾" }, group: "asia-pacific" },
  CN: { label: { en: "China", zh: "中国" }, group: "asia-pacific" },
} as const;

function hq(code: keyof typeof country, source: string): Headquarters {
  return { country: code, ...country[code], source };
}

// Only explicit company headquarters statements are promoted into this index.
// Product brands and subsidiaries are not assigned the parent's location by inference.
export const reviewedHeadquarters: Record<string, Headquarters> = {
  sifive: hq("US", "https://www.sifive.com/locations"),
  bluespec: hq("US", "https://bluespec.com/contact/"),
  cortus: hq("FR", "https://cortus.com/about-cortus/"),
  quintauris: hq("DE", "https://www.quintauris.com/contact/"),
  "imagination-technologies": hq("GB", "https://www.imaginationtech.com/contact-us/"),
  "andes-technology": hq("TW", "https://www.andestech.com/en/global_offices/"),
  codasip: hq("DE", "https://www.linkedin.com/company/codasip"),
  semidynamics: hq("ES", "https://semidynamics.com/newsroom/press-releases"),
  openchip: hq("ES", "https://openchip.com/about-us/"),
  infineon: hq("DE", "https://www.infineon.com/legal/imprint"),
  nxp: hq("NL", "https://www.nxp.com/company/about-nxp/investor-relations/investor-faqs:INVESTORS-FAQS"),
  renesas: hq("JP", "https://www.renesas.com/en/about/profile"),
  microchip: hq("US", "https://www.microchip.com/en-us/about/corporate-overview"),
  amd: hq("US", "https://www.amd.com/en/legal/privacy.html"),
  synopsys: hq("US", "https://www.synopsys.com/company/contact-synopsys/office-locations.html"),
  cadence: hq("US", "https://www.cadence.com/en_US/home/company/contact-us.html"),
  arteris: hq("US", "https://www.arteris.com/about-arteris/"),
  lauterbach: hq("DE", "https://www.lauterbach.com/company/about"),
  segger: hq("DE", "https://www.segger.com/footer/about-us/"),
  starfive: hq("CN", "https://www.starfivetech.com/en/index.php?c=category&id=4"),
  espressif: hq("CN", "https://www.espressif.com/en/news/Espressif_Bosch_Collaboration"),
};

export function headquartersFor(id: string) {
  const entry = reviewedHeadquarters[id];
  return {
    headquartersCountry: entry?.country || null,
    headquartersSource: entry?.source || null,
    region: entry?.label || { en: "HQ unconfirmed", zh: "总部待核实" },
    regionGroup: entry?.group || "unknown" as IndustryRegionId,
  };
}
