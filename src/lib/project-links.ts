import type { ProjectCategory } from "@/types";

export function projectCategoryHref(category: ProjectCategory, search = ""): string {
  const params = new URLSearchParams(search);
  params.set("cat", category);
  if (category !== "core" && category !== "soc") params.delete("core");
  if (category !== "verification") params.delete("verify");
  return `/?${params.toString()}#projects`;
}
