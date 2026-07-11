const envNewsEnabled = process.env.NEXT_PUBLIC_ENABLE_NEWS;
const envClassroomCoursesEnabled = process.env.NEXT_PUBLIC_ENABLE_CLASSROOM_COURSES;

export const features = {
  newsEnabled: envNewsEnabled !== "false",
  classroomCoursesEnabled: envClassroomCoursesEnabled !== "false",
} as const;
