import { SVGProps } from "react";
import { ProjectCategory } from "@/types";

type Animal =
  | "rabbit"
  | "fox"
  | "wolf"
  | "tiger"
  | "owl"
  | "sloth"
  | "raccoon"
  | "buffalo"
  | "beaver"
  | "otter";

type EyeStyle = "focused" | "wide" | "tech";

type Badge =
  | "bolt"
  | "check"
  | "shield"
  | "grid"
  | "ring"
  | "wave"
  | "wrench"
  | "book"
  | "scroll"
  | "radar"
  | "link"
  | "spark"
  | "chip"
  | "paw";

type Signature = "slash" | "dual" | "dots" | "ring";

interface Palette {
  shell: string;
  accent: string;
  eye: string;
  chip: string;
}

interface CategoryProfile {
  family: string;
  label: string;
  animals: Animal[];
  eyes: EyeStyle[];
  badges: Badge[];
  signatures: Signature[];
  palettes: Palette[];
}

interface RepoSemanticRule {
  name: string;
  semantic: string;
  category?: ProjectCategory;
  animal?: Animal;
  eyes?: EyeStyle;
  badge?: Badge;
  signature?: Signature;
  palette?: Palette;
}

export interface RepoMascotConfig {
  id: string;
  name: string;
  semantic: string;
  family: string;
  category: ProjectCategory;
  animal: Animal;
  eyes: EyeStyle;
  badge: Badge;
  signature: Signature;
  palette: Palette;
}

const categoryProfiles: Record<ProjectCategory, CategoryProfile> = {
  core: {
    family: "Metro Velocity Squad",
    label: "Core",
    animals: ["rabbit", "fox", "otter", "tiger"],
    eyes: ["focused", "tech", "focused", "wide"],
    badges: ["bolt", "spark", "link", "shield"],
    signatures: ["slash", "dual", "ring", "dots"],
    palettes: [
      { shell: "#34c1ff", accent: "#fff4a8", eye: "#ffffff", chip: "#1c7cb3" },
      { shell: "#41b5ff", accent: "#ffe39a", eye: "#ffffff", chip: "#1976ad" },
      { shell: "#31cfb5", accent: "#fff2a1", eye: "#ffffff", chip: "#157f74" },
      { shell: "#ff9761", accent: "#fff3b0", eye: "#ffffff", chip: "#b45d24" },
    ],
  },
  verification: {
    family: "Metro Proof Unit",
    label: "Verification",
    animals: ["owl", "sloth", "raccoon", "buffalo"],
    eyes: ["tech", "wide", "tech", "focused"],
    badges: ["check", "radar", "shield", "chip"],
    signatures: ["dual", "dots", "slash", "ring"],
    palettes: [
      { shell: "#855cf3", accent: "#e0d3ff", eye: "#ffffff", chip: "#3a2287" },
      { shell: "#7a58db", accent: "#d9ceff", eye: "#ffffff", chip: "#331f72" },
      { shell: "#9450e6", accent: "#e6d1ff", eye: "#ffffff", chip: "#4a1f7f" },
      { shell: "#6a6ff0", accent: "#d1d5ff", eye: "#ffffff", chip: "#2b317c" },
    ],
  },
  soc: {
    family: "Metro Infrastructure Crew",
    label: "SoC",
    animals: ["buffalo", "beaver", "otter", "raccoon"],
    eyes: ["tech", "tech", "wide", "focused"],
    badges: ["grid", "shield", "link", "chip"],
    signatures: ["dual", "ring", "dots", "slash"],
    palettes: [
      { shell: "#f09835", accent: "#ffdcba", eye: "#ffffff", chip: "#7a420d" },
      { shell: "#db8741", accent: "#ffd8bb", eye: "#ffffff", chip: "#703f10" },
      { shell: "#c9932e", accent: "#f5d8a4", eye: "#ffffff", chip: "#61400d" },
      { shell: "#e0a24b", accent: "#ffe3c1", eye: "#ffffff", chip: "#7c4f16" },
    ],
  },
  ip: {
    family: "Metro Module Squad",
    label: "IP",
    animals: ["otter", "fox", "raccoon", "wolf"],
    eyes: ["focused", "tech", "wide", "focused"],
    badges: ["wave", "link", "chip", "spark"],
    signatures: ["slash", "dots", "ring", "dual"],
    palettes: [
      { shell: "#1ca9bc", accent: "#aef5ff", eye: "#ffffff", chip: "#0e5a66" },
      { shell: "#2e95b8", accent: "#bcefff", eye: "#ffffff", chip: "#165062" },
      { shell: "#21a3a2", accent: "#b7f4ea", eye: "#ffffff", chip: "#0f5958" },
      { shell: "#2f8fb0", accent: "#c0e3f7", eye: "#ffffff", chip: "#194f62" },
    ],
  },
  tools: {
    family: "Metro Workshop Guild",
    label: "Tools",
    animals: ["beaver", "sloth", "raccoon", "otter"],
    eyes: ["wide", "tech", "focused", "wide"],
    badges: ["wrench", "chip", "link", "grid"],
    signatures: ["dual", "slash", "dots", "ring"],
    palettes: [
      { shell: "#34b677", accent: "#c4f8d9", eye: "#ffffff", chip: "#1b6140" },
      { shell: "#2fa36b", accent: "#baefcf", eye: "#ffffff", chip: "#184f35" },
      { shell: "#47af8f", accent: "#c7f4e4", eye: "#ffffff", chip: "#1f6151" },
      { shell: "#3aa28c", accent: "#beeee4", eye: "#ffffff", chip: "#185446" },
    ],
  },
  sdk: {
    family: "Metro Workshop Guild",
    label: "SDK",
    animals: ["otter", "beaver", "raccoon", "sloth"],
    eyes: ["tech", "focused", "wide", "tech"],
    badges: ["link", "wrench", "chip", "book"],
    signatures: ["dual", "ring", "dots", "slash"],
    palettes: [
      { shell: "#2aaea4", accent: "#b1f4ec", eye: "#ffffff", chip: "#145a54" },
      { shell: "#259ca6", accent: "#afe9f2", eye: "#ffffff", chip: "#125059" },
      { shell: "#339f8f", accent: "#bcefe2", eye: "#ffffff", chip: "#18564a" },
      { shell: "#2f8fad", accent: "#bde3f5", eye: "#ffffff", chip: "#165063" },
    ],
  },
  learning: {
    family: "Metro Guide League",
    label: "Learning",
    animals: ["rabbit", "otter", "fox", "owl"],
    eyes: ["wide", "wide", "tech", "focused"],
    badges: ["book", "spark", "ring", "wave"],
    signatures: ["dots", "dual", "ring", "slash"],
    palettes: [
      { shell: "#f58f3a", accent: "#ffe5c4", eye: "#ffffff", chip: "#7a3d08" },
      { shell: "#e68939", accent: "#ffddbe", eye: "#ffffff", chip: "#7a4310" },
      { shell: "#dd7f47", accent: "#ffd5c0", eye: "#ffffff", chip: "#6f3e17" },
      { shell: "#db9258", accent: "#ffe0c8", eye: "#ffffff", chip: "#754719" },
    ],
  },
  docs: {
    family: "Metro Guide League",
    label: "Docs",
    animals: ["owl", "sloth", "rabbit", "raccoon"],
    eyes: ["tech", "wide", "tech", "wide"],
    badges: ["scroll", "book", "shield", "chip"],
    signatures: ["ring", "dual", "dots", "slash"],
    palettes: [
      { shell: "#71829a", accent: "#dae0ec", eye: "#ffffff", chip: "#374257" },
      { shell: "#7c8498", accent: "#dde1ed", eye: "#ffffff", chip: "#40485b" },
      { shell: "#6f8a9c", accent: "#d5e6ee", eye: "#ffffff", chip: "#365164" },
      { shell: "#7f8292", accent: "#e2e4ec", eye: "#ffffff", chip: "#44495a" },
    ],
  },
};

const repoSemanticRules: Record<string, RepoSemanticRule> = {
  cva6: {
    name: "Astra Rabbit",
    semantic: "Linux-class flagship core",
    animal: "rabbit",
    eyes: "focused",
    badge: "spark",
    signature: "slash",
    palette: { shell: "#3dd1ff", accent: "#fff5ab", eye: "#ffffff", chip: "#1f7eb8" },
  },
  cv32e40p: {
    name: "Pulse Fox",
    semantic: "Embedded baseline core",
    animal: "fox",
    eyes: "focused",
    badge: "bolt",
    signature: "dual",
    palette: { shell: "#42beff", accent: "#ffe59d", eye: "#ffffff", chip: "#1b79ad" },
  },
  cvw: {
    name: "Campus Otter",
    semantic: "Education-friendly configurable core",
    category: "learning",
    animal: "otter",
    eyes: "wide",
    badge: "book",
    signature: "dots",
  },
  cv32e40x: {
    name: "Vector Otter",
    semantic: "Compute extension core",
    animal: "otter",
    eyes: "focused",
    badge: "link",
    signature: "slash",
    palette: { shell: "#2fd4c0", accent: "#fff2a0", eye: "#ffffff", chip: "#167f74" },
  },
  cv32e40s: {
    name: "Shield Tiger",
    semantic: "Security-hardened core",
    animal: "tiger",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
    palette: { shell: "#ff9d5f", accent: "#fff4b5", eye: "#ffffff", chip: "#b9622a" },
  },
  cva5: {
    name: "Forge Tiger",
    semantic: "FPGA-focused application core",
    animal: "tiger",
    eyes: "focused",
    badge: "ring",
    signature: "dual",
    palette: { shell: "#ff8a7b", accent: "#ffeaa3", eye: "#ffffff", chip: "#b4544b" },
  },
  cve2: {
    name: "Pocket Rabbit",
    semantic: "Compact low-area core",
    animal: "rabbit",
    eyes: "tech",
    badge: "chip",
    signature: "dots",
    palette: { shell: "#52c7ff", accent: "#fff3a8", eye: "#ffffff", chip: "#2384ba" },
  },
  cv32e41p: {
    name: "Archive Fox",
    semantic: "Archived prototype core",
    animal: "fox",
    eyes: "wide",
    badge: "ring",
    signature: "ring",
    palette: { shell: "#6cc7ff", accent: "#fff1be", eye: "#ffffff", chip: "#2f84ae" },
  },
  "core-v-verif": {
    name: "Inspector Owl",
    semantic: "Industrial verification hub",
    category: "verification",
    animal: "owl",
    eyes: "tech",
    badge: "check",
    signature: "dual",
  },
  "force-riscv": {
    name: "Chaos Fox",
    semantic: "Constrained-random test generator",
    category: "verification",
    animal: "fox",
    eyes: "focused",
    badge: "spark",
    signature: "slash",
  },
  "core-v-mcu-uvm": {
    name: "Bench Beaver",
    semantic: "MCU UVM verification bench",
    category: "verification",
    animal: "beaver",
    eyes: "tech",
    badge: "chip",
    signature: "dual",
  },
  "cv-hpdcache-verif": {
    name: "Cache Raccoon",
    semantic: "HPDCache correctness verifier",
    category: "verification",
    animal: "raccoon",
    eyes: "tech",
    badge: "radar",
    signature: "dots",
  },
  "cvw-arch-verif": {
    name: "Spec Owl",
    semantic: "Architectural compliance verifier",
    category: "verification",
    animal: "owl",
    eyes: "wide",
    badge: "radar",
    signature: "ring",
  },
  "cvfpu-uvm": {
    name: "Float Otter",
    semantic: "FPU UVM validation",
    category: "verification",
    animal: "otter",
    eyes: "tech",
    badge: "check",
    signature: "dual",
  },
  "cv32e20-dv": {
    name: "Mini Wolf",
    semantic: "CVE2 DV scenario runner",
    category: "verification",
    animal: "wolf",
    eyes: "wide",
    badge: "check",
    signature: "dots",
  },
  "cv32e40s-dv": {
    name: "Secure Buffalo",
    semantic: "Security DV suite",
    category: "verification",
    animal: "buffalo",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
  },
  "core-v-mcu": {
    name: "City Buffalo",
    semantic: "Reference MCU SoC",
    category: "soc",
    animal: "buffalo",
    eyes: "tech",
    badge: "grid",
    signature: "dual",
  },
  "core-v-mcu-devkit": {
    name: "Garage Beaver",
    semantic: "Hardware enablement kit",
    category: "soc",
    animal: "beaver",
    eyes: "wide",
    badge: "link",
    signature: "dots",
  },
  "cva6-safe": {
    name: "Guardian Buffalo",
    semantic: "Safety lockstep subsystem",
    category: "soc",
    animal: "buffalo",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
  },
  "core-v-polara-apu": {
    name: "Polara Tiger",
    semantic: "Multi-core APU platform",
    category: "soc",
    animal: "tiger",
    eyes: "focused",
    badge: "link",
    signature: "slash",
  },
  cvfpu: {
    name: "Wave Otter",
    semantic: "Parametric floating-point IP",
    category: "ip",
    animal: "otter",
    eyes: "focused",
    badge: "wave",
    signature: "dual",
  },
  "cv-hpdcache": {
    name: "Cache Raccoon",
    semantic: "High-performance cache IP",
    category: "ip",
    animal: "raccoon",
    eyes: "tech",
    badge: "grid",
    signature: "slash",
  },
  "core-v-xif": {
    name: "Bridge Fox",
    semantic: "Extension interface bridge",
    category: "ip",
    animal: "fox",
    eyes: "focused",
    badge: "link",
    signature: "ring",
  },
  "cv-mesh": {
    name: "Mesh Wolf",
    semantic: "NoC interconnect fabric",
    category: "ip",
    animal: "wolf",
    eyes: "tech",
    badge: "radar",
    signature: "dots",
  },
  "corev-gcc": {
    name: "Compiler Beaver",
    semantic: "GCC toolchain maintainer",
    category: "tools",
    animal: "beaver",
    eyes: "tech",
    badge: "wrench",
    signature: "dual",
  },
  "corev-binutils-gdb": {
    name: "Debug Raccoon",
    semantic: "Assembler and debugger stack",
    category: "tools",
    animal: "raccoon",
    eyes: "tech",
    badge: "chip",
    signature: "slash",
  },
  "corev-llvm": {
    name: "Optimizer Owl",
    semantic: "LLVM optimization engine",
    category: "tools",
    animal: "owl",
    eyes: "focused",
    badge: "spark",
    signature: "ring",
  },
  "core-v-sdk": {
    name: "Toolkit Otter",
    semantic: "Integrated developer SDK",
    category: "sdk",
    animal: "otter",
    eyes: "tech",
    badge: "link",
    signature: "dual",
  },
  "core-v-freertos": {
    name: "Realtime Fox",
    semantic: "RTOS platform integration",
    category: "tools",
    animal: "fox",
    eyes: "wide",
    badge: "link",
    signature: "dots",
  },
  "core-v-freertos-kernel": {
    name: "Kernel Sloth",
    semantic: "Core scheduler layer",
    category: "tools",
    animal: "sloth",
    eyes: "tech",
    badge: "chip",
    signature: "ring",
  },
};

function clampChannel(value: number): number {
  if (value < 0) return 0;
  if (value > 255) return 255;
  return Math.round(value);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const rr = clampChannel(r).toString(16).padStart(2, "0");
  const gg = clampChannel(g).toString(16).padStart(2, "0");
  const bb = clampChannel(b).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;

  if (max === rn) {
    h = (gn - bn) / d + (gn < bn ? 6 : 0);
  } else if (max === gn) {
    h = (bn - rn) / d + 2;
  } else {
    h = (rn - gn) / d + 4;
  }

  h /= 6;

  return { h, s, l };
}

function hueToRgb(p: number, q: number, t: number): number {
  let tn = t;

  if (tn < 0) tn += 1;
  if (tn > 1) tn -= 1;
  if (tn < 1 / 6) return p + (q - p) * 6 * tn;
  if (tn < 1 / 2) return q;
  if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;

  return p;
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  if (s === 0) {
    const gray = clampChannel(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hueToRgb(p, q, h + 1 / 3);
  const g = hueToRgb(p, q, h);
  const b = hueToRgb(p, q, h - 1 / 3);

  return {
    r: clampChannel(r * 255),
    g: clampChannel(g * 255),
    b: clampChannel(b * 255),
  };
}

function vividColor(hex: string, satBoost: number, lightBoost: number): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const s = Math.min(1, hsl.s + satBoost);
  const l = Math.min(1, hsl.l + lightBoost);
  const boosted = hslToRgb(hsl.h, s, l);

  return rgbToHex(boosted.r, boosted.g, boosted.b);
}

function mixColor(from: string, to: string, ratio: number): string {
  const source = hexToRgb(from);
  const target = hexToRgb(to);

  const r = source.r + (target.r - source.r) * ratio;
  const g = source.g + (target.g - source.g) * ratio;
  const b = source.b + (target.b - source.b) * ratio;

  return rgbToHex(r, g, b);
}

function boostPalette(palette: Palette): Palette {
  const shell = vividColor(mixColor(palette.shell, "#ffffff", 0.18), 0.24, 0.07);
  const accent = vividColor(mixColor(palette.accent, "#ffffff", 0.22), 0.32, 0.1);
  const chip = vividColor(mixColor(palette.chip, shell, 0.42), 0.14, 0.08);

  return {
    shell,
    accent,
    eye: "#ffffff",
    chip,
  };
}

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

export function getRepoMascot(
  projectId: string,
  primaryCategory?: ProjectCategory,
): RepoMascotConfig | null {
  const rule = repoSemanticRules[projectId];
  const category = rule?.category || primaryCategory;

  if (!category) return null;

  const profile = categoryProfiles[category];
  if (!profile) return null;

  const animal = rule?.animal || pickVariant(profile.animals, projectId, "animal");
  const eyes = rule?.eyes || pickVariant(profile.eyes, projectId, "eyes");
  const badge = rule?.badge || pickVariant(profile.badges, projectId, "badge");
  const signature = rule?.signature || pickVariant(profile.signatures, projectId, "signature");
  const paletteSeed = rule?.palette || pickVariant(profile.palettes, projectId, "palette");
  const palette = boostPalette(paletteSeed);

  return {
    id: projectId,
    name: rule?.name || `${profile.label} Animal`,
    semantic: rule?.semantic || `${profile.label} workflow specialist`,
    family: profile.family,
    category,
    animal,
    eyes,
    badge,
    signature,
    palette,
  };
}

interface RepoMascotProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  projectId: string;
  primaryCategory?: ProjectCategory;
  size?: number;
}

function AnimalHeadLayer({ config }: { config: RepoMascotConfig }) {
  const { accent, shell, chip } = config.palette;

  if (config.animal === "rabbit") {
    return (
      <>
        <ellipse cx="27" cy="10" rx="6" ry="12" fill={accent} />
        <ellipse cx="27" cy="10" rx="3.2" ry="8" fill={shell} opacity="0.3" />
        <ellipse cx="37" cy="10" rx="6" ry="12" fill={accent} />
        <ellipse cx="37" cy="10" rx="3.2" ry="8" fill={shell} opacity="0.3" />
        <circle cx="32" cy="34" r="17" fill={accent} />
      </>
    );
  }

  if (config.animal === "fox") {
    return (
      <>
        <path
          d="M16 33 C16 22, 24 17, 32 17 C40 17, 48 22, 48 33 C48 42, 41 50, 32 50 C23 50, 16 42, 16 33 Z"
          fill={accent}
        />
        <path d="M20 23 L26 12 L30 25 Z" fill={accent} />
        <path d="M44 23 L38 12 L34 25 Z" fill={accent} />
        <path
          d="M25 41 C27.5 45, 36.5 45, 39 41 C36 38, 28 38, 25 41 Z"
          fill={shell}
          opacity="0.42"
        />
      </>
    );
  }

  if (config.animal === "wolf") {
    return (
      <>
        <path
          d="M15 34 C15 22, 24 16, 32 16 C40 16, 49 22, 49 34 C49 43, 42 51, 32 51 C22 51, 15 43, 15 34 Z"
          fill={accent}
        />
        <path d="M20 23 L26 11 L30 24 Z" fill={accent} />
        <path d="M44 23 L38 11 L34 24 Z" fill={accent} />
        <path d="M24 40 H40 L32 46 Z" fill={chip} opacity="0.3" />
      </>
    );
  }

  if (config.animal === "tiger") {
    return (
      <>
        <circle cx="32" cy="34" r="17" fill={accent} />
        <circle cx="20.8" cy="23.4" r="4" fill={accent} />
        <circle cx="43.2" cy="23.4" r="4" fill={accent} />
        <path d="M24 23 L27 28" stroke={chip} strokeWidth="1.7" opacity="0.45" />
        <path d="M32 21.5 L32 28.5" stroke={chip} strokeWidth="1.7" opacity="0.45" />
        <path d="M40 23 L37 28" stroke={chip} strokeWidth="1.7" opacity="0.45" />
      </>
    );
  }

  if (config.animal === "owl") {
    return (
      <>
        <circle cx="32" cy="34" r="17" fill={accent} />
        <path d="M20 24 L24.5 16 L27 25 Z" fill={shell} opacity="0.7" />
        <path d="M44 24 L39.5 16 L37 25 Z" fill={shell} opacity="0.7" />
        <circle cx="26.4" cy="34" r="6.2" fill="rgba(255,255,255,0.16)" />
        <circle cx="37.6" cy="34" r="6.2" fill="rgba(255,255,255,0.16)" />
      </>
    );
  }

  if (config.animal === "sloth") {
    return (
      <>
        <circle cx="32" cy="34" r="17" fill={accent} />
        <ellipse cx="26" cy="33.5" rx="6.8" ry="4.5" fill={shell} opacity="0.36" />
        <ellipse cx="38" cy="33.5" rx="6.8" ry="4.5" fill={shell} opacity="0.36" />
        <path
          d="M22.5 31 C25.5 27.8, 29.5 27.8, 32.2 31"
          stroke={shell}
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.52"
        />
        <path
          d="M31.8 31 C34.5 27.8, 38.5 27.8, 41.5 31"
          stroke={shell}
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.52"
        />
      </>
    );
  }

  if (config.animal === "raccoon") {
    return (
      <>
        <circle cx="32" cy="34" r="17" fill={accent} />
        <rect x="20" y="29" width="24" height="8.5" rx="4.25" fill={chip} opacity="0.4" />
        <circle cx="21.5" cy="23.5" r="3.3" fill={accent} />
        <circle cx="42.5" cy="23.5" r="3.3" fill={accent} />
      </>
    );
  }

  if (config.animal === "buffalo") {
    return (
      <>
        <circle cx="32" cy="35" r="17" fill={accent} />
        <path
          d="M20.5 24 C14 21.6, 12.4 16.8, 15.7 13.6 C18.8 10.8, 23.6 13.1, 25.4 18.2"
          fill="none"
          stroke={shell}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M43.5 24 C50 21.6, 51.6 16.8, 48.3 13.6 C45.2 10.8, 40.4 13.1, 38.6 18.2"
          fill="none"
          stroke={shell}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </>
    );
  }

  if (config.animal === "beaver") {
    return (
      <>
        <rect x="15" y="18" width="34" height="33" rx="13" fill={accent} />
        <circle cx="22" cy="23" r="3.8" fill={accent} />
        <circle cx="42" cy="23" r="3.8" fill={accent} />
        <rect x="29.2" y="42" width="3.2" height="4.6" rx="1" fill={shell} opacity="0.8" />
        <rect x="32.6" y="42" width="3.2" height="4.6" rx="1" fill={shell} opacity="0.8" />
      </>
    );
  }

  return (
    <>
      <circle cx="32" cy="34" r="17" fill={accent} />
      <circle cx="22.5" cy="24" r="3.4" fill={accent} />
      <circle cx="41.5" cy="24" r="3.4" fill={accent} />
    </>
  );
}

function EyeLayer({ config }: { config: RepoMascotConfig }) {
  const { eye, chip } = config.palette;

  if (config.eyes === "focused") {
    return (
      <>
        <path d="M22.5 34.5 L28.6 31.8 L28.6 35.7 L22.5 38.4 Z" fill={eye} />
        <path d="M41.5 34.5 L35.4 31.8 L35.4 35.7 L41.5 38.4 Z" fill={eye} />
      </>
    );
  }

  if (config.eyes === "tech") {
    return (
      <>
        <rect x="21.4" y="30.2" width="21.2" height="7.2" rx="3.6" fill={eye} />
        <rect x="31.2" y="30.2" width="1.8" height="7.2" rx="0.9" fill={chip} opacity="0.75" />
      </>
    );
  }

  return (
    <>
      <circle cx="26.5" cy="34" r="2.9" fill={eye} />
      <circle cx="37.5" cy="34" r="2.9" fill={eye} />
      <circle cx="27.3" cy="34" r="1" fill={chip} />
      <circle cx="38.3" cy="34" r="1" fill={chip} />
    </>
  );
}

function SnoutLayer({ config }: { config: RepoMascotConfig }) {
  const { shell, chip } = config.palette;

  if (config.animal === "rabbit") {
    return (
      <>
        <ellipse cx="32" cy="41.8" rx="6.8" ry="4.8" fill={shell} opacity="0.45" />
        <path d="M30 40.5 H34 L32 42.8 Z" fill={chip} opacity="0.65" />
      </>
    );
  }

  if (config.animal === "fox" || config.animal === "wolf") {
    return (
      <>
        <path
          d="M25.2 41.5 C27.8 45, 36.2 45, 38.8 41.5 C35.5 38.7, 28.5 38.7, 25.2 41.5 Z"
          fill={shell}
          opacity="0.44"
        />
        <path d="M30.2 40.8 H33.8 L32 43 Z" fill={chip} opacity="0.62" />
      </>
    );
  }

  if (config.animal === "tiger") {
    return (
      <>
        <ellipse cx="32" cy="42" rx="7" ry="4.8" fill={shell} opacity="0.38" />
        <path
          d="M29.5 41.2 L32 43.4 L34.5 41.2"
          stroke={chip}
          strokeWidth="1.2"
          fill="none"
          opacity="0.55"
        />
      </>
    );
  }

  if (config.animal === "owl") {
    return <path d="M30 41.3 H34 L32 44.2 Z" fill={chip} opacity="0.66" />;
  }

  if (config.animal === "sloth") {
    return (
      <path
        d="M28 42 C29.6 43.6, 34.4 43.6, 36 42"
        stroke={chip}
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
    );
  }

  if (config.animal === "raccoon") {
    return (
      <>
        <ellipse cx="32" cy="42" rx="6.2" ry="4.4" fill={shell} opacity="0.4" />
        <path d="M30.4 40.8 H33.6 L32 42.8 Z" fill={chip} opacity="0.64" />
      </>
    );
  }

  if (config.animal === "buffalo") {
    return (
      <>
        <ellipse cx="32" cy="43" rx="8" ry="5.2" fill={shell} opacity="0.36" />
        <path d="M28.5 41.7 H35.5" stroke={chip} strokeWidth="1.2" opacity="0.56" />
      </>
    );
  }

  if (config.animal === "beaver") {
    return (
      <>
        <rect x="27.8" y="39.8" width="8.4" height="6.2" rx="2.5" fill={shell} opacity="0.4" />
        <rect x="29.6" y="44.1" width="2" height="2.6" rx="0.7" fill={chip} opacity="0.55" />
        <rect x="32.4" y="44.1" width="2" height="2.6" rx="0.7" fill={chip} opacity="0.55" />
      </>
    );
  }

  return (
    <>
      <ellipse cx="32" cy="41.8" rx="6.2" ry="4.4" fill={shell} opacity="0.38" />
      <path d="M30.4 40.8 H33.6 L32 42.8 Z" fill={chip} opacity="0.62" />
    </>
  );
}

function AuraLayer({ config }: { config: RepoMascotConfig }) {
  const sun = mixColor(config.palette.accent, "#fff173", 0.46);
  const sky = mixColor(config.palette.shell, "#6fe8ff", 0.38);

  return (
    <>
      <ellipse cx="32" cy="36" rx="19" ry="16" fill={sun} opacity="0.24" />
      <ellipse cx="32" cy="34" rx="15" ry="12" fill={sky} opacity="0.18" />
    </>
  );
}

function CheerLayer({ config }: { config: RepoMascotConfig }) {
  const blush = mixColor(config.palette.accent, "#ff96c7", 0.36);
  const glow = mixColor(config.palette.accent, "#ffffff", 0.34);

  return (
    <>
      <ellipse cx="23.4" cy="39.4" rx="3.8" ry="2.4" fill={blush} opacity="0.44" />
      <ellipse cx="40.6" cy="39.4" rx="3.8" ry="2.4" fill={blush} opacity="0.44" />
      <ellipse cx="25.6" cy="26" rx="6.4" ry="2.9" fill={glow} opacity="0.28" />
      <ellipse cx="20.8" cy="29.6" rx="1.9" ry="1.2" fill="rgba(255, 255, 255, 0.32)" />
      <circle cx="18.2" cy="25.2" r="1.1" fill="rgba(255, 255, 255, 0.42)" />
      <circle cx="45.8" cy="25.6" r="1" fill="rgba(255, 255, 255, 0.38)" />
    </>
  );
}

function ExpressionLayer({ config }: { config: RepoMascotConfig }) {
  const { chip, accent } = config.palette;

  if (config.eyes === "focused") {
    return (
      <>
        <path
          d="M27 45 C29.4 47.5, 34.6 47.5, 37 45"
          stroke={chip}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.72"
        />
        <path
          d="M22.6 31.4 L24.8 30.6"
          stroke={accent}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
      </>
    );
  }

  if (config.eyes === "tech") {
    return (
      <>
        <path
          d="M26.5 45.6 H37.5"
          stroke={chip}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.66"
        />
        <path
          d="M28.6 47.2 C30.4 48.2, 33.6 48.2, 35.4 47.2"
          stroke={chip}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.56"
        />
      </>
    );
  }

  return (
    <>
      <path
        d="M26.4 45.1 C28.9 48, 35.1 48, 37.6 45.1"
        stroke={chip}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.68"
      />
      <circle cx="22.8" cy="32.6" r="0.9" fill={accent} opacity="0.85" />
      <circle cx="41.2" cy="32.6" r="0.9" fill={accent} opacity="0.85" />
    </>
  );
}

function PartyLayer({ config }: { config: RepoMascotConfig }) {
  const popWarm = mixColor(config.palette.accent, "#ff78b5", 0.44);
  const popCool = mixColor(config.palette.accent, "#76f2ff", 0.46);
  const popSun = mixColor(config.palette.shell, "#ffe36d", 0.48);

  return (
    <>
      <circle cx="12" cy="17" r="1.6" fill={popWarm} opacity="0.92" />
      <circle cx="50.5" cy="18" r="1.5" fill={popCool} opacity="0.92" />
      <circle cx="14.5" cy="11.5" r="1" fill={popSun} opacity="0.9" />
      <circle cx="48.5" cy="11" r="0.9" fill={popSun} opacity="0.9" />
      <path d="M10.5 22 L12 24.5 L14.5 23 L13 20.5 Z" fill={popCool} opacity="0.86" />
      <path d="M49 23 L50.6 25.6 L53.2 24 L51.6 21.4 Z" fill={popWarm} opacity="0.86" />
      <path
        d="M32 6.8 L33.1 9 L35.4 9.2 L33.6 10.8 L34.1 13 L32 11.9 L29.9 13 L30.4 10.8 L28.6 9.2 L30.9 9 Z"
        fill={popSun}
        opacity="0.82"
      />
    </>
  );
}

function SignatureLayer({ config }: { config: RepoMascotConfig }) {
  const { accent } = config.palette;

  if (config.signature === "slash") {
    return (
      <path
        d="M23 42 L41 34"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.68"
      />
    );
  }

  if (config.signature === "dual") {
    return (
      <>
        <path
          d="M24 38 H40"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.74"
        />
        <path
          d="M24 42 H40"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.74"
        />
      </>
    );
  }

  if (config.signature === "dots") {
    return (
      <>
        <circle cx="25" cy="40" r="1.6" fill={accent} opacity="0.84" />
        <circle cx="32" cy="40" r="1.6" fill={accent} opacity="0.84" />
        <circle cx="39" cy="40" r="1.6" fill={accent} opacity="0.84" />
      </>
    );
  }

  return (
    <circle cx="32" cy="40" r="5.2" fill="none" stroke={accent} strokeWidth="1.8" opacity="0.66" />
  );
}

function BadgeLayer({ config }: { config: RepoMascotConfig }) {
  const { accent, chip } = config.palette;

  if (config.badge === "bolt") {
    return <path d="M32 44 L29.5 49 H33 L30.5 54.5 L35.5 48.5 H32.8 L35 44 Z" fill={accent} />;
  }

  if (config.badge === "check") {
    return (
      <path
        d="M27.2 48.2 L30.8 51.6 L36.8 45.2"
        stroke={accent}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    );
  }

  if (config.badge === "shield") {
    return (
      <path
        d="M32 43 L36.6 45.5 V49 C36.6 51.3 34.9 53.2 32 54 C29.1 53.2 27.4 51.3 27.4 49 V45.5 Z"
        fill={accent}
      />
    );
  }

  if (config.badge === "grid") {
    return (
      <>
        <rect x="27.5" y="44.5" width="3.8" height="3.8" rx="0.8" fill={accent} />
        <rect x="32.7" y="44.5" width="3.8" height="3.8" rx="0.8" fill={accent} />
        <rect x="27.5" y="49.7" width="3.8" height="3.8" rx="0.8" fill={accent} />
        <rect x="32.7" y="49.7" width="3.8" height="3.8" rx="0.8" fill={accent} />
      </>
    );
  }

  if (config.badge === "ring") {
    return (
      <>
        <circle cx="32" cy="48" r="4.3" fill={accent} />
        <circle cx="32" cy="48" r="1.9" fill={chip} />
      </>
    );
  }

  if (config.badge === "wave") {
    return (
      <>
        <path
          d="M26 47 C28 45.2, 30.4 45.2, 32.4 47"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31.6 50 C33.6 48.2, 36 48.2, 38 50"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }

  if (config.badge === "wrench") {
    return (
      <>
        <circle cx="29" cy="48" r="1.8" fill={accent} />
        <rect x="30.6" y="47" width="6.8" height="2" rx="1" fill={accent} />
        <path
          d="M37 46.2 L38.3 47.6 L37 49"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }

  if (config.badge === "book") {
    return (
      <>
        <path d="M26.5 45 H31.5 V52.5 H26.5 Z" fill={accent} />
        <path d="M32.5 45 H37.5 V52.5 H32.5 Z" fill={accent} />
        <path d="M32 45 V52.5" stroke={chip} strokeWidth="1" opacity="0.65" />
      </>
    );
  }

  if (config.badge === "scroll") {
    return (
      <>
        <rect x="26.8" y="45.2" width="10.4" height="6.8" rx="2.4" fill={accent} />
        <circle cx="26.8" cy="48.6" r="1.2" fill={chip} opacity="0.55" />
        <circle cx="37.2" cy="48.6" r="1.2" fill={chip} opacity="0.55" />
      </>
    );
  }

  if (config.badge === "radar") {
    return (
      <>
        <circle cx="32" cy="48" r="4.2" fill="none" stroke={accent} strokeWidth="1.4" />
        <circle cx="32" cy="48" r="2" fill="none" stroke={accent} strokeWidth="1.4" />
        <path d="M32 48 L35.2 45.4" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
      </>
    );
  }

  if (config.badge === "link") {
    return (
      <>
        <rect
          x="27"
          y="46"
          width="4.8"
          height="3.5"
          rx="1.7"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
        />
        <rect
          x="32.2"
          y="46"
          width="4.8"
          height="3.5"
          rx="1.7"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
        />
      </>
    );
  }

  if (config.badge === "spark") {
    return (
      <path
        d="M32 43.3 L34 47.4 L38.5 48 L35.2 51 L36 55.1 L32 53 L28 55.1 L28.8 51 L25.5 48 L30 47.4 Z"
        fill={accent}
      />
    );
  }

  if (config.badge === "paw") {
    return (
      <>
        <circle cx="28.3" cy="46.5" r="1.2" fill={accent} />
        <circle cx="31.1" cy="45.4" r="1.2" fill={accent} />
        <circle cx="33.9" cy="45.4" r="1.2" fill={accent} />
        <circle cx="36.7" cy="46.5" r="1.2" fill={accent} />
        <ellipse cx="32.5" cy="49.6" rx="4.5" ry="2.5" fill={accent} />
      </>
    );
  }

  return (
    <>
      <rect x="27" y="45.5" width="10" height="6.5" rx="2.2" fill={accent} />
      <path d="M29.2 47 H34.8 M29.2 49.4 H34.8" stroke={chip} strokeWidth="0.9" opacity="0.68" />
    </>
  );
}

function CategoryPinLayer({ category, palette }: { category: ProjectCategory; palette: Palette }) {
  const { accent, chip } = palette;

  return (
    <g>
      <circle
        cx="52"
        cy="12"
        r="8"
        fill="rgba(255, 255, 255, 0.54)"
        stroke={accent}
        strokeOpacity="0.72"
        strokeWidth="1.1"
      />

      {category === "core" && (
        <path d="M52 6.5 L49.4 12 H52.8 L50.4 17.5 L54.7 11.3 H51.8 Z" fill={chip} opacity="0.9" />
      )}

      {category === "verification" && (
        <path
          d="M48.6 12.5 L51.2 15 L55.4 10"
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
            x="48.6"
            y="10.5"
            width="4"
            height="3"
            rx="1.5"
            fill="none"
            stroke={chip}
            strokeWidth="1.4"
          />
          <rect
            x="51.4"
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
          <circle cx="50.5" cy="13" r="1.1" fill={chip} />
          <path d="M51.6 12.6 H55" stroke={chip} strokeWidth="1.4" strokeLinecap="round" />
          <path
            d="M54.6 11.6 L55.9 12.9 L54.6 14.2"
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
            d="M49.8 10.5 C48.6 11.2 48.6 12.8 49.8 13.5 C48.6 14.2 48.6 15.8 49.8 16.5"
            stroke={chip}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M54.2 10.5 C55.4 11.2 55.4 12.8 54.2 13.5 C55.4 14.2 55.4 15.8 54.2 16.5"
            stroke={chip}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {category === "learning" && (
        <>
          <path d="M49.3 10.2 H52.3 V15.3 H49.3 Z" fill={chip} opacity="0.9" />
          <path d="M52.8 10.2 H55.8 V15.3 H52.8 Z" fill={chip} opacity="0.9" />
          <path d="M52.5 10.2 V15.3" stroke={accent} strokeWidth="0.8" />
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
      <desc>{`${config.family} mascot for ${projectId}: ${config.semantic}`}</desc>

      <AuraLayer config={config} />
      <AnimalHeadLayer config={config} />
      <PartyLayer config={config} />
      <CheerLayer config={config} />
      <EyeLayer config={config} />
      <SnoutLayer config={config} />
      <ExpressionLayer config={config} />
      <SignatureLayer config={config} />
      <BadgeLayer config={config} />
      <CategoryPinLayer category={config.category} palette={config.palette} />
    </svg>
  );
}
