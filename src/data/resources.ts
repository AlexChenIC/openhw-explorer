import { Resource } from "@/types";

/**
 * Additional Resources
 *
 * Links to learning materials, documentation, tools, and community resources.
 */

export const resources: Resource[] = [
  // Learning Resources
  {
    id: "learning-riscv-basics",
    title: "Learning Resources",
    description: "Tutorials and guides for getting started with OpenHW and RISC-V development.",
    category: "learning",
    url: "https://docs.openhwgroup.org/",
    icon: "GraduationCap",
    featured: true,
  },

  // Documentation
  {
    id: "official-docs",
    title: "Official Documentation",
    description: "Technical specifications, architecture references, and project documentation.",
    category: "docs",
    url: "https://docs.openhwgroup.org/",
    icon: "Library",
    featured: true,
  },

  // Tools
  {
    id: "tools-sdks",
    title: "Tools & SDKs",
    description: "Development tools, software kits, and utilities for OpenHW projects.",
    category: "tools",
    url: "https://github.com/openhwgroup",
    icon: "Wrench",
    featured: true,
  },

  // Community
  {
    id: "community-links",
    title: "Community Links",
    description: "Forums, mailing lists, and community resources for OpenHW developers.",
    category: "community",
    url: "https://www.openhwgroup.org/",
    icon: "Users",
    featured: true,
  },
];

// External links
export const externalLinks = {
  github: "https://github.com/openhwgroup",
  website: "https://www.openhwgroup.org/",
  docs: "https://docs.openhwgroup.org/",
  linkedin: "https://www.linkedin.com/in/junchaocheneu/",
  riscv: "https://riscv.org/",
};
