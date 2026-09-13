export type NewsDates = { publishedAt: string; addedAt?: string };

export function newsSortDate(item: NewsDates) {
  return item.publishedAt || item.addedAt || "";
}

export function newsDateLabel(item: NewsDates, locale: string) {
  const value = newsSortDate(item);
  if (!value || !Number.isFinite(Date.parse(value))) {
    return locale.startsWith("zh") ? "日期未确认" : "Date unconfirmed";
  }
  const date = new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(value));
  return item.publishedAt ? date : `${locale.startsWith("zh") ? "收录于" : "Added"} ${date}`;
}
