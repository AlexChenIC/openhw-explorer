import type { MetadataRoute } from "next";
import { classroomSeries } from "@/data/classrooms";
import { projects } from "@/data/projects";
import { features } from "@/lib/features";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "zh"];

  // Static pages
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/${locale}/license`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/${locale}/classroom`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${locale}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${locale}/resources/industry`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...(features.newsEnabled
      ? [
          {
            url: `${SITE_URL}/${locale}/news`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
  ]);

  const classroomPages = classroomSeries.flatMap((series) =>
    locales.flatMap((locale) => [
      {
        url: `${SITE_URL}/${locale}/classroom/${series.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      ...series.lessons
        .filter((lesson) => lesson.classroomId)
        .map((lesson) => ({
          url: `${SITE_URL}/${locale}/classroom/${series.id}/${lesson.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        })),
    ]),
  );

  // Project detail pages
  const projectPages = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...staticPages, ...classroomPages, ...projectPages];
}
