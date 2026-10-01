import { features } from "@/lib/features";
import {
  classroomSeries,
  getClassroomIdForLocale,
  hasPublishedLesson,
  lessonUsesClassroomId,
  type ClassroomSeries,
} from "./classrooms";
import { hasPublishedClassroom } from "./published-classrooms";

// Display order and publication scope; never changes editorial approval status.
export const publicPreviewLessonIds: readonly string[] = [
  "openhw-u02-l01-foundation",
  "openhw-u01-l01-core-v-names",
  "cva6-introduction",
];

export function getPublicClassroomSeries(): ClassroomSeries[] {
  if (!features.classroomCoursesEnabled) return [];
  if (!features.publicPreviewEnabled) return classroomSeries;

  return classroomSeries.flatMap((series) => {
    const lessons = series.lessons
      .filter((lesson) => publicPreviewLessonIds.includes(lesson.id) && hasPublishedLesson(lesson))
      .sort((a, b) => publicPreviewLessonIds.indexOf(a.id) - publicPreviewLessonIds.indexOf(b.id))
      .map((lesson, index) => ({ ...lesson, order: index + 1 }));
    if (!lessons.length) return [];

    const units = series.units
      .filter((unit) => lessons.some((lesson) => lesson.unitId === unit.id))
      .sort(
        (a, b) =>
          lessons.findIndex((lesson) => lesson.unitId === a.id) -
          lessons.findIndex((lesson) => lesson.unitId === b.id),
      )
      .map((unit, index) => ({ ...unit, order: index + 1 }));

    return [
      {
        ...series,
        lessons,
        units,
        skills: series.skills
          .filter((skill) => lessons.some((lesson) => lesson.skillId === skill.id))
          .map((skill) => ({
            ...skill,
            lessonIds: skill.lessonIds.filter((id) => lessons.some((lesson) => lesson.id === id)),
          })),
        estimatedHours:
          lessons.reduce((minutes, lesson) => minutes + lesson.durationMinutes, 0) / 60,
        ...(series.id === "openhw-foundations"
          ? {
              subtitle: {
                en: "Understand the Foundation, then learn to read CORE-V core names.",
                zh: "先认识 Foundation，再读懂 CORE-V 内核命名。",
              },
              description: {
                en: "Two source-checked introductions to OpenHW governance and CORE-V naming.",
                zh: "两节来源可追溯的入门课，介绍 OpenHW 治理与 CORE-V 命名。",
              },
            }
          : {}),
      },
    ];
  });
}

export function getPublicSeriesById(seriesId: string) {
  return getPublicClassroomSeries().find((series) => series.id === seriesId);
}

export function getPublicLessonById(seriesId: string, lessonId: string) {
  return getPublicSeriesById(seriesId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getPublicLessonByClassroomId(classroomId: string) {
  for (const series of getPublicClassroomSeries()) {
    const lesson = series.lessons.find(
      (item) => hasPublishedLesson(item) && lessonUsesClassroomId(item, classroomId),
    );
    if (lesson && hasPublishedClassroom(classroomId)) return { lesson, series };
  }
  return undefined;
}

export function getPublicClassroomIds() {
  return [
    ...new Set(
      getPublicClassroomSeries().flatMap((series) =>
        series.lessons
          .filter(hasPublishedLesson)
          .flatMap((lesson) =>
            ["en", "zh"]
              .map((locale) => getClassroomIdForLocale(lesson, locale))
              .filter((id): id is string => Boolean(id && hasPublishedClassroom(id))),
          ),
      ),
    ),
  ];
}
