"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers3,
  ListChecks,
  PlayCircle,
} from "lucide-react";
import type {
  PublishedClassroom,
  PublishedClassroomAsset,
  PublishedClassroomQuestion,
  PublishedClassroomScene,
} from "@/data/published-classrooms";

type PublishedClassroomPlayerProps = {
  classroom: PublishedClassroom;
  locale: string;
  standalone?: boolean;
};

type SlideContent = Record<string, unknown>;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function list(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function audioPath(classroomId: string, audioUrl?: string) {
  if (!audioUrl) return "";
  const file = audioUrl.split("/").pop();
  return file ? `/classroom-assets/${classroomId}/audio/${file}` : "";
}

function assetPath(asset?: PublishedClassroomAsset) {
  if (!asset?.src) return "";
  if (asset.src.startsWith("/openhw-assets/")) return `/classroom-assets${asset.src}`;
  return asset.src;
}

function getPrimaryAction(scene: PublishedClassroomScene) {
  return scene.actions?.find((action) => action.type === "speech") ?? scene.actions?.[0];
}

function CardGrid({ cards }: { cards: unknown[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card, index) => {
        const item = card as Record<string, unknown>;
        return (
          <article
            key={`${text(item.title)}-${index}`}
            className="min-h-[150px] rounded-xl border border-[var(--border)] bg-white/80 p-4 text-slate-900 shadow-sm"
          >
            {text(item.label) && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                {text(item.label)}
              </p>
            )}
            <h3 className="text-lg font-bold">{text(item.title)}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text(item.body)}</p>
          </article>
        );
      })}
    </div>
  );
}

function TwoColumn({ columns }: { columns: unknown[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {columns.map((column, index) => {
        const item = column as Record<string, unknown>;
        return (
          <article
            key={`${text(item.title)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white/85 p-5 text-slate-900"
          >
            {text(item.label) && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--orange)]">
                {text(item.label)}
              </p>
            )}
            <h3 className="text-lg font-bold">{text(item.title)}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {list(item.bullets).map((bullet, bulletIndex) => (
                <li key={`${text(bullet)}-${bulletIndex}`} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--primary)]" />
                  <span>{text(bullet)}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function Checklist({ items }: { items: unknown[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((entry, index) => {
        const item = entry as Record<string, unknown>;
        return (
          <article
            key={`${text(item.title)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white/85 p-4 text-slate-900"
          >
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--green)]" />
              <h3 className="font-bold">{text(item.title)}</h3>
            </div>
            <p className="text-sm leading-6 text-slate-600">{text(item.body)}</p>
          </article>
        );
      })}
    </div>
  );
}

function ProcessFlow({ steps }: { steps: unknown[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((entry, index) => {
        const item = entry as Record<string, unknown>;
        return (
          <article
            key={`${text(item.title)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white/85 p-4 text-slate-900"
          >
            <p className="mb-3 text-xs font-bold text-[var(--primary)]">
              {text(item.badge) || String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-bold">{text(item.title)}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text(item.body)}</p>
          </article>
        );
      })}
    </div>
  );
}

function DiagramFocus({
  body,
  assets,
  assetId,
  caption,
  callouts,
}: {
  body: string;
  assets: PublishedClassroomAsset[];
  assetId: string;
  caption: string;
  callouts: unknown[];
}) {
  const asset = assets.find((item) => item.id === assetId) ?? assets[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <figure className="rounded-xl border border-[var(--border)] bg-white p-4">
        {asset ? (
          <Image
            src={assetPath(asset)}
            alt={asset.alt || caption}
            width={900}
            height={560}
            sizes="(min-width: 1024px) 55vw, 90vw"
            className="mx-auto h-auto max-h-[340px] w-auto object-contain"
          />
        ) : (
          <div className="flex h-72 items-center justify-center text-sm text-slate-500">
            Diagram asset pending
          </div>
        )}
        <figcaption className="mt-3 text-xs leading-5 text-slate-500">
          {caption || asset?.caption}
        </figcaption>
      </figure>
      <div className="space-y-3">
        {body && (
          <p className="rounded-xl border border-[var(--border)] bg-white/85 p-4 text-sm leading-7 text-slate-700">
            {body}
          </p>
        )}
        {callouts.map((entry, index) => {
          const item = entry as Record<string, unknown>;
          return (
            <article
              key={`${text(item.title)}-${index}`}
              className="rounded-xl border border-[var(--border)] bg-white/85 p-4 text-slate-900"
            >
              <h3 className="text-sm font-bold">{text(item.title) || text(item.label)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text(item.body)}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Quiz({ questions }: { questions: PublishedClassroomQuestion[] }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const values = selected[question.id] ?? [];
        const isRevealed = Boolean(revealed[question.id]);
        return (
          <article
            key={question.id}
            className="rounded-xl border border-[var(--border)] bg-white/90 p-5 text-slate-900"
          >
            <p className="text-xs font-bold text-[var(--primary)]">Question {index + 1}</p>
            <h3 className="mt-2 text-lg font-bold">{question.question}</h3>
            <div className="mt-4 grid gap-2">
              {question.options.map((option) => {
                const checked = values.includes(option.value);
                const correct = question.answer.includes(option.value);
                const showCorrect = isRevealed && correct;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-6 transition-colors ${
                      showCorrect
                        ? "border-[var(--green)] bg-[var(--green)]/10"
                        : checked
                          ? "border-[var(--primary)] bg-[var(--primary)]/10"
                          : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input
                      type={question.type === "multiple" ? "checkbox" : "radio"}
                      name={question.id}
                      checked={checked}
                      onChange={() => {
                        setSelected((current) => {
                          const existing = current[question.id] ?? [];
                          const next =
                            question.type === "multiple"
                              ? existing.includes(option.value)
                                ? existing.filter((value) => value !== option.value)
                                : [...existing, option.value]
                              : [option.value];
                          return { ...current, [question.id]: next };
                        });
                      }}
                    />
                    <span>
                      <strong className="mr-2">{option.value}.</strong>
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setRevealed((current) => ({ ...current, [question.id]: true }))}
              className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Show answer
            </button>
            {isRevealed && (
              <p className="mt-3 rounded-lg border border-[var(--green)]/30 bg-[var(--green)]/10 p-3 text-sm leading-6 text-slate-700">
                <strong>Answer: {question.answer.join(", ")}</strong>
                {question.analysis ? ` · ${question.analysis}` : ""}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function SlideBody({ scene }: { scene: PublishedClassroomScene }) {
  if (scene.type === "quiz") {
    return <Quiz questions={scene.content.questions ?? []} />;
  }

  const body = (scene.content.content ?? {}) as SlideContent;
  const slot = scene.content.slot;
  const assets = scene.content.assets ?? [];

  return (
    <div className="space-y-5">
      {text(body.kicker) && (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
          {text(body.kicker)}
        </p>
      )}
      {text(body.title) && (
        <h2 className="max-w-4xl text-3xl font-bold text-slate-950">{text(body.title)}</h2>
      )}
      {text(body.subtitle) && (
        <p className="max-w-4xl text-base leading-7 text-slate-600">{text(body.subtitle)}</p>
      )}

      {slot === "titleHero" && (
        <>
          <div className="flex flex-wrap gap-2">
            {list(body.chips).map((chip, index) => (
              <span
                key={`${text(chip)}-${index}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {text(chip)}
              </span>
            ))}
          </div>
          {text(body.thesis) && (
            <p className="rounded-xl bg-slate-950 p-5 text-base font-semibold leading-8 text-white">
              {text(body.thesis)}
            </p>
          )}
        </>
      )}

      {slot === "sourceMap" && <CardGrid cards={list(body.cards)} />}
      {slot === "twoColumnExplain" && <TwoColumn columns={list(body.columns)} />}
      {slot === "checklist" && <Checklist items={list(body.items)} />}
      {slot === "processFlow" && <ProcessFlow steps={list(body.steps)} />}
      {slot === "diagramFocus" && (
        <DiagramFocus
          body={text(body.body)}
          assets={assets}
          assetId={text(body.assetId)}
          caption={text(body.caption)}
          callouts={list(body.callouts)}
        />
      )}
      {slot === "summaryNextStep" && (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-[var(--border)] bg-white/85 p-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
              Takeaways
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {list(body.takeaways).map((takeaway, index) => (
                <li key={`${text(takeaway)}-${index}`} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[var(--green)]" />
                  <span>{text(takeaway)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            {text(body.nextStep) && (
              <p className="rounded-xl border border-[var(--border)] bg-white/85 p-4 text-sm leading-7 text-slate-700">
                <strong>Next: </strong>
                {text(body.nextStep)}
              </p>
            )}
            {text(body.closing) && (
              <p className="rounded-xl bg-slate-950 p-4 text-sm font-semibold leading-7 text-white">
                {text(body.closing)}
              </p>
            )}
          </div>
        </div>
      )}

      {text(body.takeaway) && (
        <p className="rounded-xl bg-slate-950 p-4 text-sm font-semibold leading-7 text-white">
          {text(body.takeaway)}
        </p>
      )}
    </div>
  );
}

export function PublishedClassroomPlayer({
  classroom,
  locale,
  standalone = false,
}: PublishedClassroomPlayerProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scenes = useMemo(
    () => [...classroom.scenes].sort((a, b) => a.order - b.order),
    [classroom.scenes],
  );
  const scene = scenes[sceneIndex] ?? scenes[0];
  const action = scene ? getPrimaryAction(scene) : undefined;
  const audio = audioPath(classroom.id, action?.audioUrl);
  const zh = locale === "zh";

  if (!scene) return null;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--card-shadow)] ${
        standalone ? "min-h-[calc(100vh-12rem)]" : ""
      }`}
    >
      <div className="flex flex-col gap-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-primary)]">
            <Layers3 className="h-4 w-4 text-[var(--primary)]" />
            {sceneIndex + 1}/{scenes.length}
          </span>
          <span className="hidden h-4 w-px bg-[var(--border)] sm:block" />
          <span>{scene.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSceneIndex((value) => Math.max(0, value - 1))}
            disabled={sceneIndex === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            {zh ? "上一页" : "Prev"}
          </button>
          <button
            type="button"
            onClick={() => setSceneIndex((value) => Math.min(scenes.length - 1, value + 1))}
            disabled={sceneIndex === scenes.length - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {zh ? "下一页" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid bg-slate-100 lg:grid-cols-[1fr_360px]">
        <div className="min-h-[560px] bg-[linear-gradient(135deg,#fff7ed_0%,#f8fafc_48%,#ecfeff_100%)] p-5 sm:p-8">
          <div className="mx-auto flex min-h-[500px] max-w-5xl flex-col justify-center rounded-2xl border border-slate-200 bg-white/50 p-5 shadow-xl shadow-slate-200/60 sm:p-8">
            <SlideBody scene={scene} />
          </div>
        </div>

        <aside className="border-t border-[var(--border)] bg-white p-5 text-slate-900 lg:border-l lg:border-t-0">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
              <Image
                src="/classroom-assets/avatars/alexchen-teacher.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </div>
            <div>
              <p className="text-sm font-bold">AlexChen</p>
              <p className="text-xs text-slate-500">{zh ? "本页讲稿" : "Narration"}</p>
            </div>
          </div>

          {audio && (
            <audio key={audio} controls className="mb-4 w-full" preload="metadata" src={audio}>
              <track kind="captions" />
            </audio>
          )}

          <div className="max-h-[420px] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {action?.text || scene.content.speakerNotes || ""}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <BookOpen className="mb-2 h-4 w-4 text-[var(--primary)]" />
              {scene.sourceAnchors?.length ?? 0} {zh ? "个资料锚点" : "source anchors"}
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              {scene.type === "quiz" ? (
                <ListChecks className="mb-2 h-4 w-4 text-[var(--primary)]" />
              ) : (
                <FileText className="mb-2 h-4 w-4 text-[var(--primary)]" />
              )}
              {scene.type === "quiz" ? (zh ? "互动题" : "quiz") : scene.content.slot || "slide"}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-3 text-xs leading-5 text-slate-700">
            <PlayCircle className="h-4 w-4 flex-none text-[var(--primary)]" />
            {zh
              ? "这是 OpenHW Explorer 内置发布播放器，用于公开页面稳定播放。"
              : "This is the built-in OpenHW Explorer player for stable public playback."}
          </div>
        </aside>
      </div>
    </div>
  );
}
