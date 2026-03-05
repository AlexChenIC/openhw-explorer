import { SVGProps } from "react";
import { ProjectCategory } from "@/types";

type Silhouette =
  | "falcon"
  | "wolf"
  | "panther"
  | "viper"
  | "shield"
  | "radar"
  | "gearbot"
  | "chiplet"
  | "citadel"
  | "turtle"
  | "dolphin"
  | "beaver"
  | "fox"
  | "lantern"
  | "bookling";

type EyeStyle = "focused" | "wide" | "tech";

type Emblem =
  | "ring"
  | "check"
  | "grid"
  | "wave"
  | "wrench"
  | "book"
  | "scroll"
  | "spark"
  | "radar"
  | "shield"
  | "link"
  | "brace"
  | "route";

type Signature = "slash" | "dots" | "dual" | "none";

interface Palette {
  shell: string;
  accent: string;
  eye: string;
  chip: string;
}

interface CategoryProfile {
  family: string;
  label: string;
  silhouettePool: Silhouette[];
  eyePool: EyeStyle[];
  emblemPool: Emblem[];
  signaturePool: Signature[];
  palettes: Palette[];
}

interface MascotTraits {
  silhouette?: Silhouette;
  eyes?: EyeStyle;
  emblem?: Emblem;
  signature?: Signature;
  palette?: Palette;
  name?: string;
}

interface RepoSemanticRule extends MascotTraits {
  keywords: string[];
}

interface RepoMascotOverride extends MascotTraits {
  category?: ProjectCategory;
}

export interface RepoMascotConfig {
  id: string;
  name: string;
  family: string;
  category: ProjectCategory;
  silhouette: Silhouette;
  eyes: EyeStyle;
  emblem: Emblem;
  signature: Signature;
  palette: Palette;
}

const silhouetteLabel: Record<Silhouette, string> = {
  falcon: "Falcon",
  wolf: "Wolf",
  panther: "Panther",
  viper: "Viper",
  shield: "Shield",
  radar: "Radar",
  gearbot: "Gearbot",
  chiplet: "Chiplet",
  citadel: "Citadel",
  turtle: "Turtle",
  dolphin: "Dolphin",
  beaver: "Beaver",
  fox: "Fox",
  lantern: "Lantern",
  bookling: "Bookling",
};

const categoryProfiles: Record<ProjectCategory, CategoryProfile> = {
  core: {
    family: "Predator Pulse",
    label: "Core",
    silhouettePool: ["falcon", "wolf", "panther", "viper"],
    eyePool: ["focused", "tech", "focused", "wide"],
    emblemPool: ["ring", "spark", "route", "shield"],
    signaturePool: ["slash", "dual", "dots", "none"],
    palettes: [
      { shell: "#3b7cff", accent: "#b8d7ff", eye: "#ffffff", chip: "#1d3f77" },
      { shell: "#306fe3", accent: "#a8c9ff", eye: "#ffffff", chip: "#17366b" },
      { shell: "#587eff", accent: "#c7d7ff", eye: "#ffffff", chip: "#2a3e90" },
      { shell: "#2f7aa6", accent: "#b1def8", eye: "#ffffff", chip: "#18425f" },
    ],
  },
  verification: {
    family: "Proof Forge",
    label: "Verification",
    silhouettePool: ["shield", "radar", "gearbot", "chiplet"],
    eyePool: ["tech", "wide", "tech", "focused"],
    emblemPool: ["check", "radar", "shield", "brace"],
    signaturePool: ["dual", "dots", "slash", "none"],
    palettes: [
      { shell: "#855cf3", accent: "#ddcfff", eye: "#ffffff", chip: "#3c258a" },
      { shell: "#7a58db", accent: "#d6ccff", eye: "#ffffff", chip: "#33226f" },
      { shell: "#9450e6", accent: "#e0cbff", eye: "#ffffff", chip: "#481e7e" },
      { shell: "#6a6ff0", accent: "#ced2ff", eye: "#ffffff", chip: "#2d3380" },
    ],
  },
  soc: {
    family: "System Atlas",
    label: "SoC",
    silhouettePool: ["citadel", "turtle", "chiplet", "shield"],
    eyePool: ["tech", "tech", "wide", "focused"],
    emblemPool: ["grid", "route", "ring", "shield"],
    signaturePool: ["dual", "none", "dots", "slash"],
    palettes: [
      { shell: "#f09735", accent: "#ffd7aa", eye: "#ffffff", chip: "#7b430d" },
      { shell: "#db8741", accent: "#ffd2ac", eye: "#ffffff", chip: "#6f3f10" },
      { shell: "#c9932e", accent: "#f6d79b", eye: "#ffffff", chip: "#624311" },
      { shell: "#f0a94f", accent: "#ffdfb9", eye: "#ffffff", chip: "#8c5515" },
    ],
  },
  ip: {
    family: "Module Current",
    label: "IP",
    silhouettePool: ["dolphin", "chiplet", "radar", "viper"],
    eyePool: ["focused", "tech", "wide", "focused"],
    emblemPool: ["wave", "link", "ring", "spark"],
    signaturePool: ["slash", "dots", "none", "dual"],
    palettes: [
      { shell: "#1ca9bc", accent: "#aaf4ff", eye: "#ffffff", chip: "#0e5a65" },
      { shell: "#2e95b8", accent: "#b7eefe", eye: "#ffffff", chip: "#164f63" },
      { shell: "#21a3a2", accent: "#b3f3e7", eye: "#ffffff", chip: "#0f5857" },
      { shell: "#2f8fb0", accent: "#bbdef5", eye: "#ffffff", chip: "#1a4d60" },
    ],
  },
  tools: {
    family: "Workshop Engine",
    label: "Tools",
    silhouettePool: ["beaver", "gearbot", "chiplet", "lantern"],
    eyePool: ["wide", "tech", "focused", "wide"],
    emblemPool: ["wrench", "brace", "grid", "check"],
    signaturePool: ["dual", "slash", "none", "dots"],
    palettes: [
      { shell: "#34b677", accent: "#bdf7d3", eye: "#ffffff", chip: "#1b613f" },
      { shell: "#2fa36b", accent: "#b5edca", eye: "#ffffff", chip: "#184f35" },
      { shell: "#47af8f", accent: "#c3f3e3", eye: "#ffffff", chip: "#1f5f52" },
      { shell: "#3aa28c", accent: "#b9eee2", eye: "#ffffff", chip: "#185247" },
    ],
  },
  sdk: {
    family: "Workshop Engine",
    label: "SDK",
    silhouettePool: ["gearbot", "chiplet", "beaver", "lantern"],
    eyePool: ["tech", "focused", "wide", "tech"],
    emblemPool: ["brace", "wrench", "link", "grid"],
    signaturePool: ["dual", "none", "slash", "dots"],
    palettes: [
      { shell: "#2aaea4", accent: "#abf3ec", eye: "#ffffff", chip: "#145a54" },
      { shell: "#259ca6", accent: "#a5e7f1", eye: "#ffffff", chip: "#124f57" },
      { shell: "#339f8f", accent: "#b5eede", eye: "#ffffff", chip: "#18554a" },
      { shell: "#2f8fad", accent: "#b6dff4", eye: "#ffffff", chip: "#174e62" },
    ],
  },
  learning: {
    family: "Guide Lights",
    label: "Learning",
    silhouettePool: ["fox", "bookling", "lantern", "dolphin"],
    eyePool: ["wide", "wide", "tech", "focused"],
    emblemPool: ["book", "spark", "ring", "wave"],
    signaturePool: ["dots", "dual", "none", "slash"],
    palettes: [
      { shell: "#f58f3a", accent: "#ffe2bc", eye: "#ffffff", chip: "#7a3d08" },
      { shell: "#e68939", accent: "#ffd8b1", eye: "#ffffff", chip: "#7a4310" },
      { shell: "#dd7f47", accent: "#ffd1b9", eye: "#ffffff", chip: "#6f3e17" },
      { shell: "#db9258", accent: "#ffdcbf", eye: "#ffffff", chip: "#754719" },
    ],
  },
  docs: {
    family: "Guide Lights",
    label: "Docs",
    silhouettePool: ["bookling", "lantern", "shield", "fox"],
    eyePool: ["tech", "wide", "tech", "wide"],
    emblemPool: ["scroll", "book", "check", "brace"],
    signaturePool: ["none", "dual", "dots", "slash"],
    palettes: [
      { shell: "#71829a", accent: "#d4dbea", eye: "#ffffff", chip: "#374257" },
      { shell: "#7c8498", accent: "#d7dced", eye: "#ffffff", chip: "#3f475a" },
      { shell: "#6f8a9c", accent: "#cfe4ed", eye: "#ffffff", chip: "#365063" },
      { shell: "#7f8292", accent: "#e0e2ec", eye: "#ffffff", chip: "#444959" },
    ],
  },
};

const semanticRules: Partial<Record<ProjectCategory, RepoSemanticRule[]>> = {
  core: [
    {
      keywords: ["cva6"],
      silhouette: "falcon",
      emblem: "spark",
      eyes: "focused",
      name: "Astra Falcon",
    },
    { keywords: ["cv32e40"], silhouette: "wolf", emblem: "route", eyes: "focused" },
    { keywords: ["cva5"], silhouette: "panther", emblem: "ring" },
    { keywords: ["cve2", "cv32e20"], silhouette: "viper", emblem: "shield", eyes: "tech" },
    { keywords: ["safe"], silhouette: "shield", emblem: "shield", eyes: "tech" },
  ],
  verification: [
    {
      keywords: ["force"],
      silhouette: "radar",
      emblem: "spark",
      eyes: "tech",
      name: "Comet Radar",
    },
    { keywords: ["uvm"], silhouette: "gearbot", emblem: "brace", eyes: "tech" },
    { keywords: ["verif", "dv"], silhouette: "shield", emblem: "check", eyes: "tech" },
    { keywords: ["arch"], silhouette: "radar", emblem: "radar", eyes: "wide" },
  ],
  soc: [
    {
      keywords: ["mcu"],
      silhouette: "citadel",
      emblem: "grid",
      eyes: "tech",
      name: "Pico Citadel",
    },
    { keywords: ["devkit"], silhouette: "turtle", emblem: "route", eyes: "wide" },
    { keywords: ["safe"], silhouette: "shield", emblem: "shield", eyes: "tech" },
    { keywords: ["polara", "apu"], silhouette: "citadel", emblem: "link", eyes: "focused" },
  ],
  ip: [
    {
      keywords: ["fpu"],
      silhouette: "dolphin",
      emblem: "wave",
      eyes: "focused",
      name: "Nimbus Wave",
    },
    { keywords: ["cache"], silhouette: "chiplet", emblem: "grid", eyes: "tech" },
    { keywords: ["mesh", "noc"], silhouette: "radar", emblem: "route", eyes: "tech" },
    { keywords: ["xif"], silhouette: "viper", emblem: "link", eyes: "focused" },
  ],
  tools: [
    {
      keywords: ["gcc", "llvm", "binutils", "gdb"],
      silhouette: "gearbot",
      emblem: "brace",
      eyes: "tech",
    },
    { keywords: ["freertos", "rtos"], silhouette: "beaver", emblem: "link", eyes: "wide" },
    { keywords: ["sdk"], silhouette: "chiplet", emblem: "wrench", eyes: "tech" },
  ],
  sdk: [
    { keywords: ["sdk"], silhouette: "chiplet", emblem: "wrench", eyes: "tech" },
    { keywords: ["freertos", "kernel"], silhouette: "beaver", emblem: "link", eyes: "wide" },
  ],
  learning: [
    {
      keywords: ["cvw", "wally"],
      silhouette: "bookling",
      emblem: "book",
      eyes: "wide",
      name: "Wally Bookling",
    },
  ],
  docs: [
    {
      keywords: ["doc", "manual", "guide"],
      silhouette: "bookling",
      emblem: "scroll",
      eyes: "tech",
    },
  ],
};

const repoOverrides: Record<string, RepoMascotOverride> = {
  "core-v-verif": {
    category: "verification",
    silhouette: "shield",
    emblem: "check",
    eyes: "tech",
    name: "Scout Shield",
  },
  "force-riscv": {
    category: "verification",
    silhouette: "radar",
    emblem: "spark",
    eyes: "tech",
    name: "Comet Radar",
  },
  cvfpu: {
    category: "ip",
    silhouette: "dolphin",
    emblem: "wave",
    eyes: "focused",
    name: "Nimbus Wave",
  },
  cvw: {
    category: "learning",
    silhouette: "bookling",
    emblem: "book",
    eyes: "wide",
    name: "Wally Bookling",
  },
  cva6: {
    silhouette: "falcon",
    emblem: "spark",
    eyes: "focused",
    name: "Astra Falcon",
    palette: {
      shell: "#3a7cff",
      accent: "#b9d8ff",
      eye: "#ffffff",
      chip: "#1b3c72",
    },
  },
};

function hashText(input: string): number {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function pickVariant<T>(pool: T[], projectId: string, salt: string): T {
  const index = hashText(`${projectId}:${salt}`) % pool.length;
  return pool[index];
}

function matchSemanticRule(category: ProjectCategory, projectId: string): RepoSemanticRule | null {
  const rules = semanticRules[category];
  if (!rules || rules.length === 0) return null;

  const normalized = projectId.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule;
    }
  }

  return null;
}

export function getRepoMascot(
  projectId: string,
  primaryCategory?: ProjectCategory,
): RepoMascotConfig | null {
  const override = repoOverrides[projectId];
  const category = override?.category || primaryCategory;

  if (!category) return null;

  const profile = categoryProfiles[category];
  if (!profile) return null;

  const semantic = matchSemanticRule(category, projectId);

  const silhouette =
    override?.silhouette ||
    semantic?.silhouette ||
    pickVariant(profile.silhouettePool, projectId, "shape");
  const eyes = override?.eyes || semantic?.eyes || pickVariant(profile.eyePool, projectId, "eyes");
  const emblem =
    override?.emblem || semantic?.emblem || pickVariant(profile.emblemPool, projectId, "emblem");
  const signature =
    override?.signature ||
    semantic?.signature ||
    pickVariant(profile.signaturePool, projectId, "signature");
  const palette =
    override?.palette || semantic?.palette || pickVariant(profile.palettes, projectId, "palette");

  return {
    id: projectId,
    name: override?.name || semantic?.name || `${profile.label} ${silhouetteLabel[silhouette]}`,
    family: profile.family,
    category,
    silhouette,
    eyes,
    emblem,
    signature,
    palette,
  };
}

interface RepoMascotProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  projectId: string;
  primaryCategory?: ProjectCategory;
  size?: number;
}

function SilhouetteLayer({ config }: { config: RepoMascotConfig }) {
  const { shell, accent, chip } = config.palette;

  if (config.silhouette === "falcon") {
    return (
      <>
        <path
          d="M9 29 L21 11 H43 L55 29 V44 C55 52 49 58 41 58 H23 C15 58 9 52 9 44 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M21 11 L15 21 L23 20 Z" fill={accent} />
        <path d="M43 11 L49 21 L41 20 Z" fill={accent} />
        <path d="M19 24 L8 30 L20 35 Z" fill={accent} opacity="0.9" />
        <path d="M45 24 L56 30 L44 35 Z" fill={accent} opacity="0.9" />
        <path d="M26 40 L32 46 L38 40 Z" fill={chip} opacity="0.9" />
      </>
    );
  }

  if (config.silhouette === "wolf") {
    return (
      <>
        <path
          d="M8 31 L16 15 L27 19 L32 11 L37 19 L48 15 L56 31 V45 C56 53 50 58 42 58 H22 C14 58 8 53 8 45 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M16 15 L20 8 L24 19 Z" fill={accent} />
        <path d="M48 15 L44 8 L40 19 Z" fill={accent} />
        <path d="M23 41 H41 L32 47 Z" fill={chip} opacity="0.9" />
      </>
    );
  }

  if (config.silhouette === "panther") {
    return (
      <>
        <path
          d="M9 35 C9 21 20 12 32 12 C44 12 55 21 55 35 V45 C55 53 49 58 41 58 H23 C15 58 9 53 9 45 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M17 22 C22 18 42 18 47 22" stroke={accent} strokeWidth="2.1" fill="none" />
        <path
          d="M21 43 C26 46 38 46 43 43"
          stroke={chip}
          strokeWidth="2"
          fill="none"
          opacity="0.75"
        />
      </>
    );
  }

  if (config.silhouette === "viper") {
    return (
      <>
        <path
          d="M8 36 C8 21 22 10 39 12 C52 14 58 22 56 34 C54 47 44 56 28 56 C16 56 8 48 8 36 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M24 16 L32 8 L30 18 Z" fill={accent} />
        <path d="M32 18 L40 8 L38 18 Z" fill={accent} />
      </>
    );
  }

  if (config.silhouette === "shield") {
    return (
      <>
        <path
          d="M32 8 L52 16 V32 C52 44 45 54 32 58 C19 54 12 44 12 32 V16 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M21 26 H43 M32 18 V40" stroke={accent} strokeWidth="2" opacity="0.55" />
      </>
    );
  }

  if (config.silhouette === "radar") {
    return (
      <>
        <circle
          cx="32"
          cy="34"
          r="22"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <circle
          cx="32"
          cy="34"
          r="15"
          stroke={accent}
          strokeWidth="1.4"
          fill="none"
          opacity="0.6"
        />
        <circle cx="32" cy="34" r="9" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.7" />
        <path d="M32 34 L49 24" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
      </>
    );
  }

  if (config.silhouette === "gearbot") {
    return (
      <>
        <rect x="29" y="8" width="6" height="6" rx="2" fill={accent} />
        <rect x="29" y="54" width="6" height="6" rx="2" fill={accent} />
        <rect x="8" y="31" width="6" height="6" rx="2" fill={accent} />
        <rect x="50" y="31" width="6" height="6" rx="2" fill={accent} />
        <circle
          cx="32"
          cy="34"
          r="20"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="34" r="9" fill={accent} opacity="0.35" />
      </>
    );
  }

  if (config.silhouette === "chiplet") {
    return (
      <>
        <rect
          x="14"
          y="16"
          width="36"
          height="36"
          rx="9"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <rect x="20" y="22" width="24" height="24" rx="6" fill={accent} opacity="0.28" />
        <path
          d="M14 24 H9 M14 32 H9 M14 40 H9 M50 24 H55 M50 32 H55 M50 40 H55 M24 16 V11 M32 16 V11 M40 16 V11 M24 52 V57 M32 52 V57 M40 52 V57"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    );
  }

  if (config.silhouette === "citadel") {
    return (
      <>
        <rect
          x="12"
          y="20"
          width="40"
          height="36"
          rx="8"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <rect x="15" y="14" width="9" height="10" rx="2" fill={accent} />
        <rect x="27.5" y="12" width="9" height="12" rx="2" fill={accent} />
        <rect x="40" y="14" width="9" height="10" rx="2" fill={accent} />
        <rect x="27" y="39" width="10" height="17" rx="3" fill={chip} opacity="0.65" />
      </>
    );
  }

  if (config.silhouette === "turtle") {
    return (
      <>
        <ellipse
          cx="32"
          cy="36"
          rx="22"
          ry="19"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <rect x="20" y="15" width="24" height="8" rx="4" fill={accent} />
        <circle cx="10.5" cy="36" r="4.5" fill={shell} />
        <circle cx="53.5" cy="36" r="4.5" fill={shell} />
        <circle cx="20" cy="52" r="4" fill={shell} />
        <circle cx="44" cy="52" r="4" fill={shell} />
        <path
          d="M24 24 H40 M24 32 H40 M24 40 H40 M28 20 V44 M36 20 V44"
          stroke={accent}
          strokeWidth="1.4"
          opacity="0.45"
        />
      </>
    );
  }

  if (config.silhouette === "dolphin") {
    return (
      <>
        <path
          d="M9 39 C10 24 23 13 40 14 C53 15 59 24 56 36 C53 47 43 55 28 55 C17 55 10 49 9 39 Z"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path d="M28 15 L38 8 L36 18 Z" fill={accent} />
        <path d="M50 35 L60 31 L54 42 Z" fill={accent} />
        <path
          d="M18 47 C25 51 38 51 46 45"
          stroke={accent}
          strokeWidth="2"
          fill="none"
          opacity="0.65"
        />
      </>
    );
  }

  if (config.silhouette === "beaver") {
    return (
      <>
        <rect
          x="10"
          y="14"
          width="44"
          height="44"
          rx="15"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <rect x="16" y="14" width="12" height="9" rx="4" fill={accent} />
        <rect x="36" y="14" width="12" height="9" rx="4" fill={accent} />
        <rect x="22" y="24" width="20" height="18" rx="8" fill="rgba(255, 255, 255, 0.15)" />
        <rect x="26" y="44" width="5" height="10" rx="1.6" fill={accent} />
        <rect x="33" y="44" width="5" height="10" rx="1.6" fill={accent} />
      </>
    );
  }

  if (config.silhouette === "lantern") {
    return (
      <>
        <rect
          x="17"
          y="16"
          width="30"
          height="40"
          rx="11"
          fill={shell}
          stroke={chip}
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path
          d="M24 16 C24 11, 28 8, 32 8 C36 8, 40 11, 40 16"
          stroke={accent}
          strokeWidth="2"
          fill="none"
        />
        <rect x="23" y="23" width="18" height="21" rx="5" fill={accent} opacity="0.32" />
        <rect x="28" y="56" width="8" height="4" rx="2" fill={accent} />
      </>
    );
  }

  return (
    <>
      <path
        d="M14 18 H31 V56 H14 Z"
        fill={shell}
        stroke={chip}
        strokeOpacity="0.24"
        strokeWidth="1.2"
      />
      <path
        d="M33 18 H50 V56 H33 Z"
        fill={shell}
        stroke={chip}
        strokeOpacity="0.24"
        strokeWidth="1.2"
      />
      <path d="M22 22 H29 V52 H22 Z" fill={accent} opacity="0.35" />
      <path d="M35 22 H42 V52 H35 Z" fill={accent} opacity="0.35" />
      <path d="M32 18 V56" stroke={accent} strokeWidth="1.2" opacity="0.6" />
    </>
  );
}

function EyeLayer({ config }: { config: RepoMascotConfig }) {
  const { eye, chip } = config.palette;

  if (config.eyes === "focused") {
    return (
      <>
        <path d="M20 31 L28 28 L28 32 L20 35 Z" fill={eye} />
        <path d="M44 31 L36 28 L36 32 L44 35 Z" fill={eye} />
      </>
    );
  }

  if (config.eyes === "tech") {
    return (
      <>
        <rect x="20" y="25" width="24" height="8" rx="4" fill={eye} />
        <rect x="31" y="25" width="2" height="8" rx="1" fill={chip} opacity="0.75" />
      </>
    );
  }

  return (
    <>
      <circle cx="24" cy="30" r="3.8" fill={eye} />
      <circle cx="40" cy="30" r="3.8" fill={eye} />
      <circle cx="25" cy="30" r="1.2" fill={chip} />
      <circle cx="41" cy="30" r="1.2" fill={chip} />
    </>
  );
}

function SignatureLayer({ config }: { config: RepoMascotConfig }) {
  const { accent } = config.palette;

  if (config.signature === "slash") {
    return (
      <path
        d="M22 40 L42 28"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
    );
  }

  if (config.signature === "dots") {
    return (
      <>
        <circle cx="24" cy="40" r="1.6" fill={accent} opacity="0.8" />
        <circle cx="32" cy="40" r="1.6" fill={accent} opacity="0.8" />
        <circle cx="40" cy="40" r="1.6" fill={accent} opacity="0.8" />
      </>
    );
  }

  if (config.signature === "dual") {
    return (
      <>
        <path
          d="M23 38 H41"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          d="M23 42 H41"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.72"
        />
      </>
    );
  }

  return null;
}

function EmblemLayer({ config }: { config: RepoMascotConfig }) {
  const { accent, chip } = config.palette;

  if (config.emblem === "ring") {
    return (
      <>
        <circle cx="32" cy="48" r="4.4" fill={accent} />
        <circle cx="32" cy="48" r="2" fill={chip} />
      </>
    );
  }

  if (config.emblem === "check") {
    return (
      <path
        d="M26.5 48 L31 52 L38.5 44"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  if (config.emblem === "grid") {
    return (
      <>
        <rect x="25" y="44" width="5" height="5" rx="1" fill={accent} />
        <rect x="34" y="44" width="5" height="5" rx="1" fill={accent} />
        <rect x="25" y="51" width="5" height="5" rx="1" fill={accent} />
        <rect x="34" y="51" width="5" height="5" rx="1" fill={accent} />
      </>
    );
  }

  if (config.emblem === "wave") {
    return (
      <>
        <path
          d="M23 46 C26 43, 30 43, 33 46"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31 50 C34 47, 38 47, 41 50"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }

  if (config.emblem === "wrench") {
    return (
      <>
        <circle cx="28" cy="47" r="2.2" fill={accent} />
        <rect x="30" y="46" width="8" height="2.4" rx="1.2" fill={accent} />
        <path
          d="M39 45 L41.5 47.2 L39 49.4"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }

  if (config.emblem === "book") {
    return (
      <>
        <path d="M23 44.5 H31 V53 H23 Z" fill={accent} />
        <path d="M33 44.5 H41 V53 H33 Z" fill={accent} />
        <path d="M32 44.5 V53" stroke={chip} strokeWidth="1.2" opacity="0.65" />
      </>
    );
  }

  if (config.emblem === "scroll") {
    return (
      <>
        <rect x="24" y="44" width="16" height="8" rx="3" fill={accent} />
        <circle cx="24" cy="48" r="1.5" fill={chip} opacity="0.55" />
        <circle cx="40" cy="48" r="1.5" fill={chip} opacity="0.55" />
      </>
    );
  }

  if (config.emblem === "spark") {
    return (
      <path
        d="M32 42 L34.4 46.8 L39.8 47.5 L35.8 51.1 L36.8 56.2 L32 53.7 L27.2 56.2 L28.2 51.1 L24.2 47.5 L29.6 46.8 Z"
        fill={accent}
      />
    );
  }

  if (config.emblem === "radar") {
    return (
      <>
        <circle cx="32" cy="48" r="5" fill="none" stroke={accent} strokeWidth="1.6" />
        <circle cx="32" cy="48" r="2.4" fill="none" stroke={accent} strokeWidth="1.6" />
        <path d="M32 48 L36 45" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      </>
    );
  }

  if (config.emblem === "shield") {
    return (
      <path
        d="M32 42 L37.5 45 V49.5 C37.5 52 35.6 54 32 55 C28.4 54 26.5 52 26.5 49.5 V45 Z"
        fill={accent}
      />
    );
  }

  if (config.emblem === "link") {
    return (
      <>
        <rect
          x="25"
          y="46"
          width="7"
          height="5"
          rx="2.5"
          fill="none"
          stroke={accent}
          strokeWidth="1.8"
        />
        <rect
          x="32"
          y="46"
          width="7"
          height="5"
          rx="2.5"
          fill="none"
          stroke={accent}
          strokeWidth="1.8"
        />
      </>
    );
  }

  if (config.emblem === "brace") {
    return (
      <>
        <path
          d="M27 44 C25.8 44.8 25.8 46.4 27 47.2 C25.8 48 25.8 49.6 27 50.4"
          stroke={accent}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M37 44 C38.2 44.8 38.2 46.4 37 47.2 C38.2 48 38.2 49.6 37 50.4"
          stroke={accent}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </>
    );
  }

  return (
    <>
      <circle cx="27" cy="48" r="2" fill={accent} />
      <circle cx="37" cy="48" r="2" fill={accent} />
      <path d="M29 48 H35" stroke={accent} strokeWidth="1.8" />
      <path d="M32 44 L32 52" stroke={accent} strokeWidth="1.8" />
    </>
  );
}

function CategoryMarkLayer({ category, palette }: { category: ProjectCategory; palette: Palette }) {
  const { accent, chip } = palette;
  const bg = "rgba(255, 255, 255, 0.22)";

  return (
    <g>
      <circle cx="52" cy="12" r="8" fill={bg} />

      {category === "core" && (
        <path d="M52 6 L49.5 12 H53 L51 18 L55 11.5 H51.5 Z" fill={chip} opacity="0.85" />
      )}

      {category === "verification" && (
        <path
          d="M48.5 12.5 L51.2 15.2 L55.5 9.8"
          stroke={chip}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {category === "soc" && (
        <>
          <rect x="49" y="9" width="2.5" height="2.5" rx="0.8" fill={chip} />
          <rect x="52.5" y="9" width="2.5" height="2.5" rx="0.8" fill={chip} />
          <rect x="49" y="12.5" width="2.5" height="2.5" rx="0.8" fill={chip} />
          <rect x="52.5" y="12.5" width="2.5" height="2.5" rx="0.8" fill={chip} />
        </>
      )}

      {category === "ip" && (
        <>
          <rect
            x="48.5"
            y="10.5"
            width="4"
            height="3"
            rx="1.5"
            fill="none"
            stroke={chip}
            strokeWidth="1.4"
          />
          <rect
            x="51.5"
            y="10.5"
            width="4"
            height="3"
            rx="1.5"
            fill="none"
            stroke={chip}
            strokeWidth="1.4"
          />
        </>
      )}

      {category === "tools" && (
        <>
          <circle cx="50.5" cy="13.2" r="1.2" fill={chip} />
          <path d="M51.6 12.8 H55" stroke={chip} strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M54.7 11.8 L56 13.1 L54.7 14.4"
            stroke={chip}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {category === "sdk" && (
        <>
          <path
            d="M50 10.5 C48.7 11.2 48.7 12.8 50 13.5 C48.7 14.2 48.7 15.8 50 16.5"
            stroke={chip}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M54 10.5 C55.3 11.2 55.3 12.8 54 13.5 C55.3 14.2 55.3 15.8 54 16.5"
            stroke={chip}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {category === "learning" && (
        <>
          <path d="M49.2 10.2 H52.4 V15.4 H49.2 Z" fill={chip} opacity="0.9" />
          <path d="M52.8 10.2 H56 V15.4 H52.8 Z" fill={chip} opacity="0.9" />
          <path d="M52.6 10.2 V15.4" stroke={accent} strokeWidth="0.8" />
        </>
      )}

      {category === "docs" && (
        <>
          <rect x="49" y="10" width="6" height="4.2" rx="1.4" fill={chip} opacity="0.88" />
          <circle cx="49" cy="12.1" r="0.9" fill={accent} opacity="0.8" />
          <circle cx="55" cy="12.1" r="0.9" fill={accent} opacity="0.8" />
        </>
      )}
    </g>
  );
}

export function RepoMascot({
  projectId,
  primaryCategory,
  size = 32,
  className,
  ...rest
}: RepoMascotProps) {
  const config = getRepoMascot(projectId, primaryCategory);
  if (!config) return null;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${config.name} mascot`}
      {...rest}
    >
      <title>{config.name}</title>
      <desc>{`${config.family} mascot for ${projectId}`}</desc>
      <SilhouetteLayer config={config} />
      <EyeLayer config={config} />
      <SignatureLayer config={config} />
      <EmblemLayer config={config} />
      <CategoryMarkLayer category={config.category} palette={config.palette} />
    </svg>
  );
}
