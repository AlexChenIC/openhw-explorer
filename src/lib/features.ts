const envNewsEnabled = process.env.NEXT_PUBLIC_ENABLE_NEWS;
const envClassroomCoursesEnabled = process.env.NEXT_PUBLIC_ENABLE_CLASSROOM_COURSES;
const envPublicPreviewEnabled = process.env.NEXT_PUBLIC_ENABLE_PUBLIC_PREVIEW;
const envIndustryLandscapeEnabled = process.env.NEXT_PUBLIC_ENABLE_INDUSTRY_LANDSCAPE;

export const features = {
  newsEnabled: envNewsEnabled !== "false",
  classroomCoursesEnabled: envClassroomCoursesEnabled !== "false",
  publicPreviewEnabled: envPublicPreviewEnabled !== "false",
  industryLandscapeEnabled: envIndustryLandscapeEnabled === "true",
} as const;
