export function normalizeCuratedDates(item) {
  for (const key of ["publishedAt", "addedAt", "eventAt", "updatedAt"]) {
    if (item[key] && !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(item[key])) {
      throw new Error(`Invalid ${key} for ${item.url}`);
    }
    if (item[key] && !Number.isFinite(Date.parse(item[key]))) {
      throw new Error(`Invalid ${key} for ${item.url}`);
    }
  }
  return {
    publishedAt: item.publishedAt || "",
    ...(item.addedAt && { addedAt: item.addedAt }),
    ...(item.eventAt && { eventAt: item.eventAt }),
    ...(item.updatedAt && { updatedAt: item.updatedAt }),
  };
}

// A repost remains in the editorial archive, but is not a second milestone.
export function mergeEventCoverage(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.eventId || item.url;
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }
  return [...groups.values()].map((group) => {
    const primary = group.find((item) => item.eventRole === "primary") || group[0];
    const relatedSources = [
      ...(primary.relatedSources || []),
      ...group.filter((item) => item !== primary).map((item) => ({
        title: item.title, url: item.url, source: item.source,
        publishedAt: item.publishedAt || "", addedAt: item.addedAt || "",
      })),
    ];
    return {
      ...primary,
      ...(relatedSources.length && { relatedSources }),
    };
  });
}
