"use client";

import { useState } from "react";
import { narrationCueAt, type NarrationCue } from "@/lib/visual-course";
import styles from "./SceneNarration.module.css";

export function SceneNarration({
  audioUrl,
  captionUrl,
  cues,
  zh,
  continuous,
  pauseForActivity,
  onEnded,
  onContinuous,
}: {
  audioUrl: string;
  captionUrl?: string;
  cues: NarrationCue[];
  zh: boolean;
  continuous: boolean;
  pauseForActivity: boolean;
  onEnded: () => void;
  onContinuous: (value: boolean) => void;
}) {
  const [seconds, setSeconds] = useState(0);
  const [captions, setCaptions] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const cue = narrationCueAt(cues, seconds);
  return (
    <section
      className={styles.root}
      aria-label={zh ? "本页旁白与字幕" : "Scene narration and captions"}
    >
      <div className={styles.heading}>
        <h2>{zh ? "听本页讲解" : "Listen to this scene"}</h2>
        <label>
          <input
            type="checkbox"
            checked={continuous}
            onChange={(e) => onContinuous(e.target.checked)}
          />
          {zh ? "播完自动下一页" : "Continue after narration"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={captions}
            onChange={(e) => setCaptions(e.target.checked)}
          />
          {zh ? "显示字幕" : "Show captions"}
        </label>
        {captionUrl && (
          <a href={captionUrl} download>
            {zh ? "下载字幕" : "Download captions"}
          </a>
        )}
      </div>
      <audio
        controls
        preload="metadata"
        autoPlay={continuous}
        aria-label={zh ? "本页旁白" : "Scene narration"}
        src={audioUrl}
        onTimeUpdate={(e) => setSeconds(e.currentTarget.currentTime)}
        onPlay={() => setEnded(false)}
        onEnded={() => {
          setEnded(true);
          onEnded();
        }}
        onError={() => setFailed(true)}
      />
      {failed && (
        <p role="alert">
          {zh
            ? "音频加载失败，请刷新页面或通过讲稿继续阅读。"
            : "Audio could not load. Refresh or continue with the transcript."}
        </p>
      )}
      {captions && (
        <div className={styles.caption} aria-live="off">
          {cue ||
            (ended
              ? zh
                ? "本页旁白已播完。"
                : "Scene narration finished."
              : zh
                ? "播放后在这里显示当前句字幕。"
                : "The current caption appears here during playback.")}
        </div>
      )}
      <p className={styles.note}>
        {pauseForActivity
          ? zh
            ? "本页有交互或测验，旁白结束后请完成活动，再手动继续。"
            : "This scene has an activity. Complete it, then continue manually."
          : zh
            ? "可暂停、拖动进度或调整播放速度。字幕按句显示。"
            : "Pause, seek or change playback speed. Captions are displayed in short phrases."}
      </p>
    </section>
  );
}
