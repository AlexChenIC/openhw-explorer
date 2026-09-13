// Only technically and editorially reviewed course packages are registered
// here. See LICENSE-CONTENT.md for the applicable content terms.

import coreVNamesEn from "./published-classrooms/openhw-essentials-core-v-names-en.json";
import coreVNamesZh from "./published-classrooms/openhw-essentials-core-v-names-zh.json";
import openhwFoundationEn from "./published-classrooms/openhw-essentials-foundation-en.json";
import openhwFoundationZh from "./published-classrooms/openhw-essentials-foundation-zh.json";

export type PublishedClassroomAction = {
  id: string;
  type: string;
  text?: string;
  audioUrl?: string;
  captionUrl?: string;
};

export type PublishedClassroomAsset = {
  id: string;
  type?: string;
  src: string;
  alt?: string;
  caption?: string;
};

export type PublishedClassroomQuestion = {
  id: string;
  type: "single" | "multiple";
  question: string;
  options: Array<{ label: string; value: string }>;
  answer: string[];
  analysis?: string;
};

export type PublishedClassroomSourceAnchor = {
  id: string;
  title: string;
  url?: string;
  locator?: string;
  claimSupported?: string;
};

export type PublishedClassroomScene = {
  id: string;
  type: "html-slide" | "quiz" | string;
  title: string;
  order: number;
  content: {
    type: string;
    slot?: string;
    theme?: "dark" | "light";
    content?: Record<string, unknown>;
    assets?: PublishedClassroomAsset[];
    html?: string;
    locale?: string;
    sourceAnchors?: PublishedClassroomSourceAnchor[];
    questions?: PublishedClassroomQuestion[];
    speakerNotes?: string;
  };
  actions?: PublishedClassroomAction[];
  sourceAnchors?: string[];
};

export type PublishedClassroom = {
  id: string;
  stage: {
    id: string;
    name: string;
    description?: string;
    language?: string;
    courseTemplateName?: string;
  };
  scenes: PublishedClassroomScene[];
};

const publishedClassrooms = {
  [coreVNamesEn.id]: coreVNamesEn,
  [coreVNamesZh.id]: coreVNamesZh,
  [openhwFoundationEn.id]: openhwFoundationEn,
  [openhwFoundationZh.id]: openhwFoundationZh,
} as Record<string, PublishedClassroom>;

export function getPublishedClassroom(classroomId: string) {
  return publishedClassrooms[classroomId];
}

export function hasPublishedClassroom(classroomId?: string) {
  return Boolean(classroomId && publishedClassrooms[classroomId]);
}

export function getPublishedClassroomIds() {
  return Object.keys(publishedClassrooms);
}
