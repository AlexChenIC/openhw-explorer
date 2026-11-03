import { ecosystemCategories, type EcosystemCategoryId } from "@/data/ecosystem";
import { resourceDirectoryCategories, type ResourceCategoryId } from "@/data/resources";

export type ResourceMode = "technical" | "ecosystem";

export interface ResourceNavigation {
  mode: ResourceMode;
  task: ResourceCategoryId;
  group: EcosystemCategoryId | "all";
}

export function parseResourceNavigation(search: string, hash = ""): ResourceNavigation {
  const params = new URLSearchParams(search);
  const view = params.get("view");
  return {
    mode:
      view === "technical" || view === "ecosystem"
        ? view
        : hash === "#ecosystem"
          ? "ecosystem"
          : "technical",
    task:
      resourceDirectoryCategories.find((item) => item.id === params.get("task"))?.id ??
      "standards-docs",
    group: ecosystemCategories.find((item) => item.id === params.get("group"))?.id ?? "all",
  };
}

export function resourceNavigationHref(
  pathname: string,
  search: string,
  hash: string,
  navigation: ResourceNavigation,
): string {
  const params = new URLSearchParams(search);
  params.set("view", navigation.mode);
  if (navigation.task === "standards-docs") params.delete("task");
  else params.set("task", navigation.task);
  if (navigation.group === "all") params.delete("group");
  else params.set("group", navigation.group);

  // A tab change must not leave the URL pointing at its now-hidden panel.
  const hiddenPanel = navigation.mode === "technical" ? "#ecosystem" : "#technical-library";
  const target = hash === hiddenPanel ? "#resource-explorer" : hash;
  return `${pathname}?${params.toString()}${target}`;
}
