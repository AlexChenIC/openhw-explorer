// Core Types for OpenHW Explorer

// User roles for Smart Navigator
export type UserRole = "browsing" | "student" | "engineer" | "researcher" | "contributor";

// Main categories for Quick Filters
export type ProjectCategory =
  | "core"
  | "verification"
  | "tools"
  | "docs"
  | "learning"
  | "sdk"
  | "soc"
  | "ip";

// Core types for detailed filtering
export type CoreType =
  | "embedded-mcu"
  | "linux-application"
  | "high-performance"
  | "low-power"
  | "safety-critical";

// Verification types
export type VerificationType =
  | "uvm-testbench"
  | "formal-verification"
  | "force-riscv"
  | "industrial-grade";

// Project status
export type ProjectStatus = "active" | "stable" | "experimental" | "archived";

export type ReviewStatus = "reviewed" | "auto" | "needs-review";
export type SourceTier = "official" | "trusted" | "community";

// Project Data Structure
export interface Project {
  id: string;
  name: string;
  description: string;

  // Categorization
  category: ProjectCategory[];
  coreType?: CoreType[];
  verificationType?: VerificationType[];

  // Metadata
  tags: string[];
  status: ProjectStatus;
  featured?: boolean;

  // Links
  github?: string;
  docs?: string;
  website?: string;

  // Stats (can be auto-fetched from GitHub API later)
  stars?: number;
  forks?: number;
  language?: string;
  lastUpdated?: string;

  // For Smart Navigator filtering
  suitableFor?: UserRole[];

  // Related project IDs for cross-referencing
  relatedProjects?: string[];

  descriptionReviewStatus?: ReviewStatus;
  descriptionSourceTier?: SourceTier;
  descriptionVerifiedAt?: string;
  descriptionSourceUrls?: string[];
  descriptionSourceCount?: number;
  descriptionConfidence?: number;
  launchStage?: "curated" | "baseline";
  baselineSummary?: string;

  // Knowledge base data (populated from src/data/knowledge/)
  knowledge?: ProjectKnowledge;
}

// Knowledge Base Types

/** Academic paper citing or using this repo */
export interface AcademicPaper {
  title: string;
  authors: string;
  venue: string; // Conference or journal name
  year: number;
  url?: string;
  doi?: string;
}

/** Industry / commercial adoption of this repo's design */
export interface IndustryAdoption {
  entity: string; // Company or product name
  useCase: string; // How they use it
  sourceUrl?: string;
}

/** University or educational use of this repo */
export interface EducationalUse {
  university: string;
  course?: string;
  professor?: string;
  url?: string;
}

/** Conference presentation or talk related to this repo */
export interface Presentation {
  title: string;
  event: string; // e.g. "RISC-V Summit 2025"
  date: string; // YYYY-MM or YYYY-MM-DD
  speaker?: string;
  url?: string;
  videoUrl?: string;
}

/** Blog post or technical article about this repo */
export interface Article {
  title: string;
  author?: string;
  platform: string; // e.g. "Medium", "zhihu", "personal blog"
  url: string;
  date?: string;
  language: "en" | "zh" | "other";
}

/** Link to another project in the ecosystem */
export interface EcosystemLink {
  project: string; // Name or ID
  relationship: string; // e.g. "uses", "extends", "integrates with"
  description?: string;
}

/** Aggregated knowledge base for a single repo */
export interface ProjectKnowledge {
  academicPapers?: AcademicPaper[];
  industryAdoption?: IndustryAdoption[];
  educationalUse?: EducationalUse[];
  presentations?: Presentation[];
  articles?: Article[];
  ecosystem?: EcosystemLink[];
  contributionNotes?: string; // Extra notes about contributing to this repo
}

// Resource Data Structure
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "learning" | "docs" | "tools" | "community";
  url: string;
  icon?: string;
  featured?: boolean;
}

// Filter Configuration
export interface FilterConfig {
  roles: {
    id: UserRole;
    label: string;
    icon: string;
    description?: string;
  }[];

  categories: {
    id: ProjectCategory;
    label: string;
    icon: string;
  }[];

  coreTypes: {
    id: CoreType;
    label: string;
  }[];

  verificationTypes: {
    id: VerificationType;
    label: string;
  }[];
}
