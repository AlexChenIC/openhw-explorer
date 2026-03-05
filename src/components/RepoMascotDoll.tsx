import { SVGProps } from "react";
import { ProjectCategory } from "@/types";

type DollRole =
  | "captain"
  | "sprinter"
  | "guardian"
  | "mechanic"
  | "architect"
  | "mentor"
  | "analyst"
  | "connector";

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
  | "chip";

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
  roles: DollRole[];
  eyes: EyeStyle[];
  badges: Badge[];
  signatures: Signature[];
  palettes: Palette[];
}

interface RepoSemanticRule {
  name: string;
  semantic: string;
  category?: ProjectCategory;
  role?: DollRole;
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
  role: DollRole;
  eyes: EyeStyle;
  badge: Badge;
  signature: Signature;
  palette: Palette;
}

const categoryProfiles: Record<ProjectCategory, CategoryProfile> = {
  core: {
    family: "Velocity Dolls",
    label: "Core",
    roles: ["captain", "sprinter", "connector", "guardian"],
    eyes: ["focused", "tech", "focused", "wide"],
    badges: ["bolt", "spark", "link", "shield"],
    signatures: ["slash", "dual", "ring", "dots"],
    palettes: [
      { shell: "#3b7cff", accent: "#bdd9ff", eye: "#ffffff", chip: "#1b3d74" },
      { shell: "#2f6fe3", accent: "#accbff", eye: "#ffffff", chip: "#173669" },
      { shell: "#4a7fe6", accent: "#c5d8ff", eye: "#ffffff", chip: "#23438c" },
      { shell: "#3a87b8", accent: "#b7e4ff", eye: "#ffffff", chip: "#1a4c67" },
    ],
  },
  verification: {
    family: "Proof Dolls",
    label: "Verification",
    roles: ["guardian", "analyst", "mechanic", "connector"],
    eyes: ["tech", "wide", "tech", "focused"],
    badges: ["shield", "radar", "check", "chip"],
    signatures: ["dual", "dots", "slash", "ring"],
    palettes: [
      { shell: "#855cf3", accent: "#e0d3ff", eye: "#ffffff", chip: "#3a2287" },
      { shell: "#7a58db", accent: "#d9ceff", eye: "#ffffff", chip: "#331f72" },
      { shell: "#9450e6", accent: "#e6d1ff", eye: "#ffffff", chip: "#4a1f7f" },
      { shell: "#6a6ff0", accent: "#d1d5ff", eye: "#ffffff", chip: "#2b317c" },
    ],
  },
  soc: {
    family: "System Dolls",
    label: "SoC",
    roles: ["architect", "guardian", "connector", "mechanic"],
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
    family: "Module Dolls",
    label: "IP",
    roles: ["connector", "analyst", "captain", "sprinter"],
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
    family: "Workshop Dolls",
    label: "Tools",
    roles: ["mechanic", "connector", "analyst", "guardian"],
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
    family: "Workshop Dolls",
    label: "SDK",
    roles: ["connector", "mechanic", "analyst", "mentor"],
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
    family: "Guide Dolls",
    label: "Learning",
    roles: ["mentor", "captain", "analyst", "connector"],
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
    family: "Guide Dolls",
    label: "Docs",
    roles: ["mentor", "analyst", "guardian", "connector"],
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
    name: "Astra Blade",
    semantic: "Linux-class flagship core",
    role: "captain",
    eyes: "focused",
    badge: "spark",
    signature: "slash",
    palette: { shell: "#3a7cff", accent: "#bdd9ff", eye: "#ffffff", chip: "#1b3d74" },
  },
  cv32e40p: {
    name: "Pulse Ranger",
    semantic: "Embedded baseline core",
    role: "sprinter",
    eyes: "focused",
    badge: "bolt",
    signature: "dual",
  },
  cvw: {
    name: "Wally Mentor",
    semantic: "Education-oriented core",
    category: "learning",
    role: "mentor",
    eyes: "wide",
    badge: "book",
    signature: "dots",
  },
  cv32e40x: {
    name: "Vector Fang",
    semantic: "Compute extension core",
    role: "sprinter",
    eyes: "focused",
    badge: "link",
    signature: "slash",
  },
  cv32e40s: {
    name: "Secure Lock",
    semantic: "Security-hardened core",
    role: "guardian",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
  },
  cva5: {
    name: "Forge Lynx",
    semantic: "FPGA-oriented application core",
    role: "captain",
    eyes: "focused",
    badge: "ring",
    signature: "dual",
  },
  cve2: {
    name: "Nano Scout",
    semantic: "Compact low-area core",
    role: "connector",
    eyes: "tech",
    badge: "chip",
    signature: "dots",
  },
  cv32e41p: {
    name: "Archive Warden",
    semantic: "Archived prototype core",
    role: "guardian",
    eyes: "wide",
    badge: "shield",
    signature: "ring",
  },
  "core-v-verif": {
    name: "Proof Marshal",
    semantic: "Industrial verification hub",
    category: "verification",
    role: "guardian",
    eyes: "tech",
    badge: "shield",
    signature: "dual",
  },
  "force-riscv": {
    name: "Chaos Pilot",
    semantic: "Constrained-random test generator",
    category: "verification",
    role: "analyst",
    eyes: "tech",
    badge: "spark",
    signature: "slash",
  },
  "core-v-mcu-uvm": {
    name: "Bench Keeper",
    semantic: "MCU UVM verification bench",
    category: "verification",
    role: "mechanic",
    eyes: "tech",
    badge: "chip",
    signature: "dual",
  },
  "cv-hpdcache-verif": {
    name: "Cache Inspector",
    semantic: "HPDCache correctness verifier",
    category: "verification",
    role: "analyst",
    eyes: "tech",
    badge: "radar",
    signature: "dots",
  },
  "cvw-arch-verif": {
    name: "Spec Oracle",
    semantic: "Architectural compliance verifier",
    category: "verification",
    role: "analyst",
    eyes: "wide",
    badge: "radar",
    signature: "ring",
  },
  "cvfpu-uvm": {
    name: "Float Auditor",
    semantic: "FPU UVM validation",
    category: "verification",
    role: "mechanic",
    eyes: "tech",
    badge: "check",
    signature: "dual",
  },
  "cv32e20-dv": {
    name: "TwoStage Judge",
    semantic: "CVE2 DV scenario runner",
    category: "verification",
    role: "guardian",
    eyes: "wide",
    badge: "check",
    signature: "dots",
  },
  "cv32e40s-dv": {
    name: "Secure Judge",
    semantic: "Security DV suite",
    category: "verification",
    role: "guardian",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
  },
  "core-v-mcu": {
    name: "City Spark",
    semantic: "Reference MCU SoC",
    category: "soc",
    role: "architect",
    eyes: "tech",
    badge: "grid",
    signature: "dual",
  },
  "core-v-mcu-devkit": {
    name: "Board Guide",
    semantic: "Hardware enablement kit",
    category: "soc",
    role: "mechanic",
    eyes: "wide",
    badge: "link",
    signature: "dots",
  },
  "cva6-safe": {
    name: "Lockstep Guard",
    semantic: "Safety lockstep subsystem",
    category: "soc",
    role: "guardian",
    eyes: "tech",
    badge: "shield",
    signature: "ring",
  },
  "core-v-polara-apu": {
    name: "Polara Captain",
    semantic: "Multi-core APU platform",
    category: "soc",
    role: "architect",
    eyes: "focused",
    badge: "link",
    signature: "slash",
  },
  cvfpu: {
    name: "Wave Numerist",
    semantic: "Parametric floating-point IP",
    category: "ip",
    role: "connector",
    eyes: "focused",
    badge: "wave",
    signature: "dual",
  },
  "cv-hpdcache": {
    name: "Cache Runner",
    semantic: "High-performance cache IP",
    category: "ip",
    role: "sprinter",
    eyes: "tech",
    badge: "grid",
    signature: "slash",
  },
  "core-v-xif": {
    name: "XIF Broker",
    semantic: "Extension interface bridge",
    category: "ip",
    role: "connector",
    eyes: "focused",
    badge: "link",
    signature: "ring",
  },
  "cv-mesh": {
    name: "Mesh Router",
    semantic: "NoC interconnect fabric",
    category: "ip",
    role: "analyst",
    eyes: "tech",
    badge: "radar",
    signature: "dots",
  },
  "corev-gcc": {
    name: "Compiler Smith",
    semantic: "GCC toolchain maintainer",
    category: "tools",
    role: "mechanic",
    eyes: "tech",
    badge: "wrench",
    signature: "dual",
  },
  "corev-binutils-gdb": {
    name: "Link Debugger",
    semantic: "Assembler and debugger stack",
    category: "tools",
    role: "analyst",
    eyes: "tech",
    badge: "chip",
    signature: "slash",
  },
  "corev-llvm": {
    name: "Optimizer Sage",
    semantic: "LLVM optimization engine",
    category: "tools",
    role: "analyst",
    eyes: "focused",
    badge: "spark",
    signature: "ring",
  },
  "core-v-sdk": {
    name: "Toolkit Weaver",
    semantic: "Integrated developer SDK",
    category: "sdk",
    role: "connector",
    eyes: "tech",
    badge: "link",
    signature: "dual",
  },
  "core-v-freertos": {
    name: "Realtime Pilot",
    semantic: "RTOS platform integration",
    category: "tools",
    role: "captain",
    eyes: "wide",
    badge: "link",
    signature: "dots",
  },
  "core-v-freertos-kernel": {
    name: "Kernel Keeper",
    semantic: "Core scheduler layer",
    category: "tools",
    role: "guardian",
    eyes: "tech",
    badge: "chip",
    signature: "ring",
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

export function getRepoMascot(
  projectId: string,
  primaryCategory?: ProjectCategory,
): RepoMascotConfig | null {
  const rule = repoSemanticRules[projectId];
  const category = rule?.category || primaryCategory;

  if (!category) return null;

  const profile = categoryProfiles[category];
  if (!profile) return null;

  const role = rule?.role || pickVariant(profile.roles, projectId, "role");
  const eyes = rule?.eyes || pickVariant(profile.eyes, projectId, "eyes");
  const badge = rule?.badge || pickVariant(profile.badges, projectId, "badge");
  const signature = rule?.signature || pickVariant(profile.signatures, projectId, "signature");
  const palette = rule?.palette || pickVariant(profile.palettes, projectId, "palette");

  return {
    id: projectId,
    name: rule?.name || `${profile.label} Doll`,
    semantic: rule?.semantic || `${profile.label} workflow assistant`,
    family: profile.family,
    category,
    role,
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

function RoleAccessory({ config }: { config: RepoMascotConfig }) {
  const { accent, chip } = config.palette;

  if (config.role === "captain") {
    return (
      <>
        <path d="M24 6 L32 11 L40 6 L38 14 H26 Z" fill={accent} />
        <path
          d="M32 7.5 L33.8 11 L38 11.4 L34.8 13.8 L35.8 17.6 L32 15.6 L28.2 17.6 L29.2 13.8 L26 11.4 L30.2 11 Z"
          fill={chip}
          opacity="0.82"
        />
      </>
    );
  }

  if (config.role === "sprinter") {
    return (
      <>
        <path d="M14 18 L23 14 L23 22 Z" fill={accent} opacity="0.9" />
        <path d="M50 18 L41 14 L41 22 Z" fill={accent} opacity="0.9" />
      </>
    );
  }

  if (config.role === "guardian") {
    return (
      <>
        <rect x="23" y="7" width="18" height="6" rx="3" fill={accent} />
        <path
          d="M32 8.2 L35.6 10.2 V13.1 C35.6 14.7 34.4 16 32 16.7 C29.6 16 28.4 14.7 28.4 13.1 V10.2 Z"
          fill={chip}
          opacity="0.75"
        />
      </>
    );
  }

  if (config.role === "mechanic") {
    return (
      <>
        <rect x="22" y="6" width="20" height="7" rx="3.5" fill={accent} />
        <rect x="25" y="12" width="14" height="2.2" rx="1.1" fill={chip} opacity="0.55" />
      </>
    );
  }

  if (config.role === "architect") {
    return (
      <>
        <rect x="22" y="6" width="6" height="7" rx="1.6" fill={accent} />
        <rect x="29" y="4.5" width="6" height="8.5" rx="1.6" fill={accent} />
        <rect x="36" y="6" width="6" height="7" rx="1.6" fill={accent} />
      </>
    );
  }

  if (config.role === "mentor") {
    return (
      <>
        <path d="M21 10 C24 5, 40 5, 43 10 L41 14 H23 Z" fill={accent} />
        <path d="M25 14 H39" stroke={chip} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      </>
    );
  }

  if (config.role === "analyst") {
    return (
      <>
        <circle
          cx="32"
          cy="16"
          r="12"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          opacity="0.6"
        />
        <circle
          cx="32"
          cy="16"
          r="7"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          opacity="0.75"
        />
      </>
    );
  }

  return (
    <>
      <rect x="20" y="9" width="24" height="4" rx="2" fill={accent} opacity="0.92" />
      <path
        d="M22 13 C22 17, 42 17, 42 13"
        stroke={chip}
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />
    </>
  );
}

function BodyLayer({ config }: { config: RepoMascotConfig }) {
  const { shell, accent, chip } = config.palette;

  return (
    <>
      <circle cx="32" cy="17" r="10" fill={accent} />
      <circle cx="32" cy="17" r="10" fill="url(#headHighlight)" opacity="0.22" />

      <path d="M18 30 C18 25, 24 24, 27 27 L24.5 36 H18 Z" fill={shell} />
      <path d="M46 30 C46 25, 40 24, 37 27 L39.5 36 H46 Z" fill={shell} />

      <rect
        x="20"
        y="26"
        width="24"
        height="28"
        rx="8"
        fill={shell}
        stroke={chip}
        strokeOpacity="0.24"
        strokeWidth="1.2"
      />
      <rect x="24" y="31" width="16" height="12" rx="5" fill="rgba(255, 255, 255, 0.16)" />
      <rect x="24" y="54" width="7" height="5" rx="2" fill={chip} opacity="0.8" />
      <rect x="33" y="54" width="7" height="5" rx="2" fill={chip} opacity="0.8" />
    </>
  );
}

function EyeLayer({ config }: { config: RepoMascotConfig }) {
  const { eye, chip } = config.palette;

  if (config.eyes === "focused") {
    return (
      <>
        <path d="M24 17.5 L29 15.3 L29 18.7 L24 20.9 Z" fill={eye} />
        <path d="M40 17.5 L35 15.3 L35 18.7 L40 20.9 Z" fill={eye} />
      </>
    );
  }

  if (config.eyes === "tech") {
    return (
      <>
        <rect x="23" y="14" width="18" height="6" rx="3" fill={eye} />
        <rect x="31.5" y="14" width="1.6" height="6" rx="0.8" fill={chip} opacity="0.75" />
      </>
    );
  }

  return (
    <>
      <circle cx="26.5" cy="17" r="2.5" fill={eye} />
      <circle cx="37.5" cy="17" r="2.5" fill={eye} />
      <circle cx="27.3" cy="17" r="0.9" fill={chip} />
      <circle cx="38.3" cy="17" r="0.9" fill={chip} />
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

  if (config.badge === "shield") {
    return (
      <path
        d="M32 43 L36.6 45.5 V49 C36.6 51.3 34.9 53.2 32 54 C29.1 53.2 27.4 51.3 27.4 49 V45.5 Z"
        fill={accent}
      />
    );
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

  if (config.badge === "ring") {
    return (
      <>
        <circle cx="32" cy="48" r="4.3" fill={accent} />
        <circle cx="32" cy="48" r="1.9" fill={chip} />
      </>
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
      <circle cx="52" cy="12" r="8" fill="rgba(255, 255, 255, 0.24)" />

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

      <defs>
        <radialGradient id="headHighlight" cx="30%" cy="22%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <RoleAccessory config={config} />
      <BodyLayer config={config} />
      <EyeLayer config={config} />
      <SignatureLayer config={config} />
      <BadgeLayer config={config} />
      <CategoryPinLayer category={config.category} palette={config.palette} />
    </svg>
  );
}
