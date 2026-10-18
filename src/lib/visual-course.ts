import type {
  PublishedClassroomSourceAnchor as HtmlSlideSourceAnchor,
  PublishedClassroomQuestion as QuizQuestion,
} from "@/data/published-classrooms";

export interface ReviewScene {
  id: string;
  title: string;
  order: number;
  type: "html-slide" | "interactive" | "quiz";
  actions: {
    type: string;
    text: string;
    audioUrl?: string;
    captionUrl?: string;
    captionCues?: { start: number; end: number; text: string }[];
  }[];
  content: {
    content: {
      title: string;
      learnerQuestion: string;
      blocks: { label: string; text: string }[];
      qualifier: string;
      scopeNotes: string[];
      workedExample: string;
      bodyClip: { width: number; height: number } | null;
      credit: string;
    };
    assets: { id: string; src: string; alt: string }[];
    sourceAnchors: HtmlSlideSourceAnchor[];
    widgetHtml?: string;
    questions?: QuizQuestion[];
  };
}

export interface ReviewClassroom {
  id: string;
  stage: { name: string; description?: string; releaseVersion?: string; durationSeconds?: number };
  scenes: ReviewScene[];
}

export function resolveReviewScene(ids: string[], hash: string, saved?: string | null): number {
  const target = hash.replace(/^#/, "") || saved;
  return Math.max(0, target ? ids.indexOf(target) : 0);
}

export interface NarrationCue {
  start: number;
  end: number;
  text: string;
}

/** End is exclusive, so a sentence boundary shows the next sentence. */
export function narrationCueAt(cues: NarrationCue[], seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "";
  return cues.find((cue) => seconds >= cue.start && seconds < cue.end)?.text ?? "";
}

export function isVisualClassroom(
  classroom: import("@/data/published-classrooms").PublishedClassroom,
): classroom is import("@/data/published-classrooms").PublishedClassroom & ReviewClassroom {
  return (
    classroom.stage.courseTemplateId === "cva6-visual-overview" &&
    classroom.scenes.every((s) => {
      const d = s.content.content;
      return (
        d &&
        typeof d.title === "string" &&
        typeof d.learnerQuestion === "string" &&
        Array.isArray(d.blocks) &&
        Array.isArray(d.scopeNotes) &&
        Array.isArray(s.content.assets) &&
        Array.isArray(s.content.sourceAnchors) &&
        Boolean(s.actions?.some((a) => a.type === "speech" && a.text && a.audioUrl))
      );
    })
  );
}
