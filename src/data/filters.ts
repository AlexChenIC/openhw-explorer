import { FilterConfig, ProjectCategory } from "@/types";

// Smart Navigator filter configuration: roles, categories, core types, and verification types

export const filterConfig: FilterConfig = {
  // User roles - "I am a..."
  roles: [
    {
      id: "browsing",
      label: "Just Browsing",
      icon: "Eye",
      description: "New to OpenHW, exploring what's available",
    },
    {
      id: "student",
      label: "Student",
      icon: "GraduationCap",
      description: "Learning RISC-V and processor design",
    },
    {
      id: "engineer",
      label: "Engineer",
      icon: "Briefcase",
      description: "Working on production projects",
    },
    {
      id: "researcher",
      label: "Researcher",
      icon: "FlaskConical",
      description: "Academic or industry research",
    },
    {
      id: "contributor",
      label: "Contributor",
      icon: "GitPullRequest",
      description: "Looking to contribute to OpenHW projects",
    },
  ],

  // Main categories - "Looking for..."
  categories: [
    { id: "core", label: "Processor Cores", icon: "Cpu" },
    { id: "verification", label: "Verification", icon: "ShieldCheck" },
    { id: "soc", label: "SoC & Subsystem", icon: "CircuitBoard" },
    { id: "ip", label: "IP Components", icon: "Puzzle" },
    { id: "tools", label: "Tools & SDKs", icon: "Wrench" },
    { id: "learning", label: "Learning", icon: "BookOpen" },
  ],

  // Core types - when "Processor Cores" is selected
  coreTypes: [
    { id: "embedded-mcu", label: "Embedded MCU" },
    { id: "linux-application", label: "Linux Application" },
    { id: "high-performance", label: "High Performance" },
    { id: "low-power", label: "Low Power" },
    { id: "safety-critical", label: "Safety Critical" },
  ],

  // Verification types - when "Verification" is selected
  verificationTypes: [
    { id: "uvm-testbench", label: "UVM Testbench" },
    { id: "formal-verification", label: "Formal Verification" },
    { id: "force-riscv", label: "FORCE-RISCV" },
    { id: "industrial-grade", label: "Industrial Grade" },
  ],
};

// Quick filter tags for the basic navigation
export const quickFilterTags = [
  { id: "all", label: "All Projects", icon: "LayoutGrid" },
  { id: "core", label: "Cores", icon: "Cpu" },
  { id: "verification", label: "Verification", icon: "ShieldCheck" },
  { id: "soc", label: "SoC", icon: "CircuitBoard" },
  { id: "ip", label: "IP", icon: "Puzzle" },
  { id: "tools", label: "Tools", icon: "Wrench" },
  { id: "learning", label: "Learning", icon: "BookOpen" },
] as const satisfies ReadonlyArray<{
  id: ProjectCategory | "all";
  label: string;
  icon: string;
}>;
