import {
  LayoutGrid,
  Cpu,
  Wrench,
  ShieldCheck,
  FileText,
  BookOpen,
  Eye,
  GraduationCap,
  Briefcase,
  FlaskConical,
  GitPullRequest,
  CircuitBoard,
  Puzzle,
  Package,
} from "lucide-react";

// Shared icon lookup for filter configs (filters.ts stores icon names as strings).
export const filterIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  Cpu,
  Wrench,
  ShieldCheck,
  FileText,
  BookOpen,
  Eye,
  GraduationCap,
  Briefcase,
  FlaskConical,
  GitPullRequest,
  CircuitBoard,
  Puzzle,
  Package,
};
