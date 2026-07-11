// New original human-authored or human-edited course content added after
// 2026-07-10 may be rights reserved where applicable. Historical Apache-2.0
// grants, third-party material, and non-protectable material are not affected.
// See LICENSE-CONTENT.md at the repository root.

export type ClassroomLocale = "en" | "zh";

export type LocalizedText = Record<ClassroomLocale, string>;

export type ClassroomTrackStatus = "open" | "planned";
export type ClassroomSeriesStatus = "pilot" | "planned";
export type ClassroomLessonStatus = "featured" | "pilot" | "draft" | "planned";

export interface ClassroomTrack {
  id: string;
  status: ClassroomTrackStatus;
  title: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
  seriesIds: string[];
}

export interface ClassroomLesson {
  id: string;
  classroomId?: string;
  projectId: string;
  seriesId: string;
  status: ClassroomLessonStatus;
  order: number;
  unitId: string;
  skillId: string;
  language: ClassroomLocale;
  durationMinutes: number;
  slideCount: number;
  quizCount: number;
  level: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  tags: string[];
  sourceRefs: string[];
}

export interface ClassroomSkill {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  lessonIds: string[];
}

export interface ClassroomUnit {
  id: string;
  order: number;
  title: LocalizedText;
  goal: LocalizedText;
  skillIds: string[];
}

export interface ClassroomSeries {
  id: string;
  trackId: string;
  projectId: string;
  status: ClassroomSeriesStatus;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  audience: LocalizedText;
  level: LocalizedText;
  estimatedHours: number;
  lessonsPlanned: number;
  lessonsReady: number;
  featuredLessonId?: string;
  units: ClassroomUnit[];
  skills: ClassroomSkill[];
  lessons: ClassroomLesson[];
}

export const classroomTracks: ClassroomTrack[] = [
  {
    id: "processor-cores",
    status: "planned",
    title: {
      en: "Processor Core Deep Dives",
      zh: "处理器核心深度课",
    },
    description: {
      en: "Human-reviewed courses that connect architecture explanations to official documentation and source code.",
      zh: "把架构讲解与官方文档、源码相连接，并经过人工核对的技术课程。",
    },
    audience: {
      en: "Students, RTL engineers, verification engineers, and researchers.",
      zh: "面向学生、RTL 工程师、验证工程师和研究人员。",
    },
    seriesIds: [],
  },
  {
    id: "verification",
    status: "planned",
    title: {
      en: "Verification Workshops",
      zh: "验证实践工作坊",
    },
    description: {
      en: "Practical verification courses built around real OpenHW environments and contribution workflows.",
      zh: "围绕真实 OpenHW 验证环境和贡献流程制作的实践课程。",
    },
    audience: {
      en: "Verification engineers and contributors preparing to work with CORE-V projects.",
      zh: "面向准备参与 CORE-V 项目的验证工程师和贡献者。",
    },
    seriesIds: [],
  },
  {
    id: "contribution",
    status: "planned",
    title: {
      en: "Contribution Onboarding",
      zh: "开源贡献入门",
    },
    description: {
      en: "Guided material for understanding project boundaries, evidence, and contribution practice.",
      zh: "帮助学习者理解项目边界、资料依据与实际贡献方法的引导课程。",
    },
    audience: {
      en: "New contributors looking for a practical route into OpenHW projects.",
      zh: "面向希望进入 OpenHW 项目的新贡献者。",
    },
    seriesIds: [],
  },
];

// Courses are added here only after technical, editorial, audio, and visual QA.
export const classroomSeries: ClassroomSeries[] = [];

export function getClassroomBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_OPENHW_CLASSROOM_BASE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:3002";
  }

  return "https://alexchen-openhw-classroom.vercel.app";
}

export function getClassroomUrl(classroomId: string, baseUrl = getClassroomBaseUrl()) {
  return `${baseUrl}/classroom/${classroomId}`;
}

export function getLocalizedText(text: LocalizedText, locale: string) {
  return text[locale === "zh" ? "zh" : "en"];
}

export function getSeriesById(seriesId: string) {
  return classroomSeries.find((series) => series.id === seriesId);
}

export function getTrackById(trackId: string) {
  return classroomTracks.find((track) => track.id === trackId);
}

export function getLessonById(seriesId: string, lessonId: string) {
  return getSeriesById(seriesId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getFeaturedLesson(series: ClassroomSeries) {
  return series.lessons.find((lesson) => lesson.id === series.featuredLessonId);
}

export function getReadyLessons(series: ClassroomSeries) {
  return series.lessons.filter(
    (lesson) => lesson.status === "featured" || lesson.status === "pilot",
  );
}
