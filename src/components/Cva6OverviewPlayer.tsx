"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CourseUnderstandingQuiz } from "./CourseUnderstandingQuiz";
import { SceneNarration } from "./SceneNarration";
import { resolveReviewScene, type ReviewClassroom, type ReviewScene } from "@/lib/visual-course";
import styles from "./Cva6OverviewPlayer.module.css";

function PageImage({ scene, onZoom }: { scene: ReviewScene; onZoom?: () => void }) {
  const asset = scene.content.assets[0];
  if (!asset) return null;
  const clip = scene.content.content.bodyClip;
  return (
    <div
      className={clip ? styles.clip : styles.image}
      style={clip ? { aspectRatio: `${clip.width}/${clip.height}` } : undefined}
    >
      {/* Original PNGs are immutable; CSS only clips the obsolete s14 footer. */}
      <Image
        unoptimized
        src={asset.src}
        alt={asset.alt}
        width={1672}
        height={941}
        onClick={onZoom}
      />
    </div>
  );
}

export function Cva6OverviewPlayer({
  classroom,
  locale,
}: {
  classroom: ReviewClassroom;
  locale: "zh" | "en";
}) {
  const zh = locale === "zh";
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [continuous, setContinuous] = useState(false);
  const zoomRef = useRef<HTMLDialogElement>(null);
  const zoomButtonRef = useRef<HTMLButtonElement>(null);
  const key = `openhw-course-progress:${classroom.id}:${classroom.stage.releaseVersion}`;
  const scene = classroom.scenes[index];
  const quiz = classroom.scenes.find((s) => s.type === "quiz")!;
  const d = scene.content.content;
  const speech = scene.actions.find((a) => a.type === "speech");

  // Restore only the current page from a versioned local draft.
  useEffect(() => {
    const restore = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(key);
      } catch {
        /* Private browsing can deny storage. */
      }
      setIndex(
        resolveReviewScene(
          classroom.scenes.map((s) => s.id),
          window.location.hash,
          saved,
        ),
      );
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, [classroom.id, classroom.stage.releaseVersion, classroom.scenes, key, zh]);

  useEffect(() => {
    if (zoom) zoomRef.current?.showModal();
  }, [zoom]);

  function go(next: number) {
    if (next < 0 || next >= classroom.scenes.length) return;
    setIndex(next);
    const sid = classroom.scenes[next].id;
    history.replaceState(null, "", `#${sid}`);
    try {
      localStorage.setItem(key, sid);
    } catch {
      /* Page navigation still works. */
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function closeZoom() {
    setZoom(false);
    zoomButtonRef.current?.focus();
  }

  return (
    <div className={styles.root} lang={zh ? "zh-CN" : "en"}>
      <header className={styles.header}>
        <div>
          <p>OpenHW Explorer</p>
          <h1>{classroom.stage.name}</h1>
        </div>
        <div className={styles.languages}>
          <a
            aria-current={zh ? "page" : undefined}
            href={`/zh/classroom-player/cva6-project-intro-zh#${scene.id}`}
          >
            中文
          </a>
          <a
            aria-current={!zh ? "page" : undefined}
            href={`/en/classroom-player/cva6-project-intro-en#${scene.id}`}
          >
            English
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.status}>
          {zh
            ? "Alex Chen 编写的社区课程 · 依据公开技术资料"
            : "A community course by Alex Chen · Based on public technical sources"}
          {classroom.stage.durationSeconds
            ? ` · ${zh ? "旁白约" : "Narration: "}${Math.round(classroom.stage.durationSeconds / 60)}${zh ? "分钟，交互与答题另计" : " min; activities are additional"}`
            : ""}
        </p>
        <nav className={styles.navigation} aria-label={zh ? "课程导航" : "Course navigation"}>
          <button onClick={() => go(index - 1)} disabled={index === 0}>
            {zh ? "上一页" : "Previous"}
          </button>
          <label>
            <span>{zh ? "场景" : "Scene"}</span>
            <select value={index} onChange={(e) => go(Number(e.target.value))}>
              {classroom.scenes.map((s, i) => (
                <option key={s.id} value={i}>
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </option>
              ))}
            </select>
          </label>
          <span aria-live="polite">
            {index + 1} / {classroom.scenes.length}
          </span>
          <button onClick={() => go(index + 1)} disabled={index === classroom.scenes.length - 1}>
            {zh ? "下一页" : "Next"}
          </button>
        </nav>
        {speech?.audioUrl && (
          <SceneNarration
            key={`${classroom.id}:${scene.id}`}
            audioUrl={speech.audioUrl}
            captionUrl={speech.captionUrl}
            cues={speech.captionCues ?? []}
            zh={zh}
            continuous={continuous}
            onContinuous={setContinuous}
            pauseForActivity={scene.type !== "html-slide"}
            onEnded={() => {
              if (continuous && scene.type === "html-slide") go(index + 1);
            }}
          />
        )}
        <article className={styles.visual}>
          {scene.type !== "quiz" && <PageImage scene={scene} onZoom={() => setZoom(true)} />}
          {(scene.id === "s14" || scene.type === "quiz") && (
            <footer className={styles.footer}>
              <span>
                {zh ? "来源：" : "Sources: "}
                {scene.content.sourceAnchors.slice(0, 4).map((a, i) => (
                  <span key={a.id}>
                    {i > 0 ? " · " : ""}
                    <a href={a.url} target="_blank" rel="noreferrer">
                      {a.title}
                    </a>
                  </span>
                ))}
              </span>
              <span>Alex Chen . OpenHW Explorer 原创课程</span>
            </footer>
          )}
          {scene.type !== "quiz" && (
            <button ref={zoomButtonRef} className={styles.zoomButton} onClick={() => setZoom(true)}>
              {zh ? "放大图片查看" : "Zoom image"}
            </button>
          )}
        </article>
        {/* Keep the native quiz mounted across page navigation so a submitted review is not lost. */}
        <section
          className={styles.quiz}
          hidden={scene.type !== "quiz"}
          aria-label={zh ? "四道理解题" : "Four understanding questions"}
        >
          <h2>{quiz.content.content.title}</h2>
          <p>{quiz.content.content.qualifier}</p>
          <div className={styles.quizFrame}>
            <CourseUnderstandingQuiz questions={quiz.content.questions!} locale={locale} />
          </div>
        </section>
        {scene.content.widgetHtml && (
          <section className={styles.widget}>
            <h2>{zh ? "动手观察" : "Explore the example"}</h2>
            <iframe
              key={`${locale}:${scene.id}`}
              title={zh ? `${scene.title} · 交互` : `${scene.title} · Interactive`}
              srcDoc={scene.content.widgetHtml}
              sandbox="allow-scripts allow-popups"
              referrerPolicy="no-referrer"
            />
          </section>
        )}
        <div className={styles.readingGrid}>
          <section className={styles.card}>
            <h2>{zh ? "本页讲稿" : "Scene transcript"}</h2>
            <p className={styles.script}>{scene.actions.find((a) => a.type === "speech")?.text}</p>
          </section>
          <section className={styles.card}>
            <h2>{zh ? "本页要理解什么" : "What to understand"}</h2>
            <p className={styles.question}>{d.learnerQuestion}</p>
            {d.blocks.map((b) => (
              <div key={b.label}>
                <h3>{b.label}</h3>
                <p>{b.text}</p>
              </div>
            ))}
            <p className={styles.qualifier}>{d.qualifier}</p>
            {scene.type !== "quiz" && <p>{d.workedExample}</p>}
          </section>
        </div>
        {d.scopeNotes.length > 0 && (
          <details className={styles.card} open>
            <summary>
              {zh ? "阅读范围与图面补充" : "Reading scope and image clarifications"}
            </summary>
            <ul>
              {d.scopeNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </details>
        )}
        <details className={styles.card} open>
          <summary>{zh ? "技术来源与准确定位" : "Technical sources and locators"}</summary>
          <div className={styles.sources}>
            {scene.content.sourceAnchors.map((a) => (
              <section key={a.id}>
                <h3>
                  <a href={a.url} target="_blank" rel="noreferrer">
                    {a.title}
                  </a>
                </h3>
                <p>{a.locator}</p>
                <p>{a.claimSupported}</p>
              </section>
            ))}
          </div>
        </details>
        <nav className={styles.endNav} aria-label={zh ? "继续学习" : "Continue learning"}>
          <button onClick={() => go(index - 1)} disabled={index === 0}>
            {zh ? "上一页" : "Previous"}
          </button>
          <span>
            {index + 1} / {classroom.scenes.length}
          </span>
          <button onClick={() => go(index + 1)} disabled={index === classroom.scenes.length - 1}>
            {zh ? "下一页" : "Next"}
          </button>
        </nav>
        <p className={styles.community}>
          {zh
            ? "Alex Chen 编写的社区课程，依据官方资料进行教学解释。技术资料的版本与配置范围见每页来源。"
            : "A community course authored by Alex Chen, interpreting official materials. Each page preserves source versions and configuration scope."}
        </p>
      </main>
      {zoom && (
        <dialog
          ref={zoomRef}
          className={styles.dialog}
          onCancel={closeZoom}
          onClose={closeZoom}
          aria-label={zh ? "图片放大视图" : "Image zoom view"}
        >
          <button autoFocus className={styles.close} onClick={closeZoom}>
            {zh ? "关闭放大" : "Close zoom"}
          </button>
          <div className={styles.zoomCanvas}>
            <PageImage scene={scene} />
          </div>
        </dialog>
      )}
    </div>
  );
}
