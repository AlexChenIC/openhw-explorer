"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Github, Linkedin, Mail, MessageSquareText } from "lucide-react";
import { contactEmail, externalLinks } from "@/data/external-links";

const copy = {
  zh: {
    preview: "本地设计预览 · 内容不会发送",
    kicker: "一起完善学习园地",
    title: "你下一步想学什么？",
    intro:
      "用半分钟告诉 Alex 哪种课程最能帮助你。你的建议会帮助安排后续课程，选题仍会结合技术价值与制作时间。",
    depth: "你最希望哪种课程形式？",
    single: "选一项",
    formats: [
      {
        id: "foundations",
        title: "基础入门",
        body: "先理解术语、概念与工程背景",
        example: "例如：流水线、ISA 与处理器核",
      },
      {
        id: "repo-overview",
        title: "项目与仓库全景",
        body: "看懂一个项目做什么、从哪里开始",
        example: "例如：CVA6 目录、配置与工作流程",
      },
      {
        id: "deep-dive",
        title: "技术专题深入",
        body: "围绕一个问题，读架构、代码与证据",
        example: "例如：CVA6 的缓存与地址转换",
      },
      {
        id: "hands-on",
        title: "动手实践",
        body: "跟着步骤运行、验证与调试",
        example: "例如：运行一个 CORE-V-VERIF 测试",
      },
    ],
    topic: "你更关心哪些技术方向？",
    multiple: "可多选",
    topics: [
      { id: "processor", title: "处理器与 CVA6" },
      { id: "verification", title: "验证与 CORE-V-VERIF" },
      { id: "soc-fpga", title: "SoC 与 FPGA" },
      { id: "other", title: "其他方向" },
    ],
    problem: "你想解决哪个具体问题？",
    optional: "选填",
    placeholder: "例如：我能看懂 RTL，但不知道怎样搭建 CVA6 仿真并判断测试是否通过。",
    contact: "愿意收到 Alex 的回复？",
    contactNote: "可留下邮箱，仅用于这条建议的后续沟通。无需填写姓名，也不会自动订阅。",
    email: "联系邮箱",
    action: "预览提交效果",
    note: "本版本仅展示交互，不联网提交，也不保存填写内容。正式版计划无需注册即可提交。",
    error: "请至少选择一个技术方向。",
    confirmation: "提交确认界面预览",
    confirmationNote: "你的内容尚未发送。正式版会在后台实际保存成功后显示确认信息。",
    edit: "继续修改建议",
    author: "由 Alex Chen 维护",
    authorBody:
      "我会结合读者反馈与 OpenHW 工程经验，逐步制作中英文课程。也欢迎直接联系我，交流你的学习目标。",
    linkedin: "在 LinkedIn 与 Alex 交流",
    github: "公开提出课程建议",
    planning: "关于课程安排",
    planningBody:
      "这是一份学习需求反馈，不是课程上线承诺。如果你的问题涉及具体项目，写出仓库、工具或遇到的困难会更有帮助。",
  },
  en: {
    preview: "Local design preview · nothing is sent",
    kicker: "Help shape the Learning Hub",
    title: "What would you like to learn next?",
    intro:
      "Tell Alex what would help you most. It takes about 30 seconds. Your suggestions will inform future courses alongside technical value and available time.",
    depth: "Which course format would help you most?",
    single: "Choose one",
    formats: [
      {
        id: "foundations",
        title: "Foundations",
        body: "Understand the terms, concepts and engineering context",
        example: "For example: pipelines, ISAs and processor cores",
      },
      {
        id: "repo-overview",
        title: "Project & repository overview",
        body: "Understand what a project does and where to start",
        example: "For example: CVA6 directories, configurations and workflows",
      },
      {
        id: "deep-dive",
        title: "Technical deep dive",
        body: "Explore one question through architecture, code and evidence",
        example: "For example: caches and address translation in CVA6",
      },
      {
        id: "hands-on",
        title: "Hands-on practice",
        body: "Follow steps to run, verify and debug a design",
        example: "For example: running a CORE-V-VERIF test",
      },
    ],
    topic: "Which technical directions interest you?",
    multiple: "Choose any that apply",
    topics: [
      { id: "processor", title: "Processors & CVA6" },
      { id: "verification", title: "Verification & CORE-V-VERIF" },
      { id: "soc-fpga", title: "SoCs & FPGAs" },
      { id: "other", title: "Other directions" },
    ],
    problem: "What specific problem would you like to solve?",
    optional: "Optional",
    placeholder:
      "For example: I can read RTL, but I don't know how to set up a CVA6 simulation and check whether a test has passed.",
    contact: "Would you like a reply from Alex?",
    contactNote:
      "Leave an email for follow-up about this suggestion. No name is needed, and this does not subscribe you to updates.",
    email: "Contact email",
    action: "Preview submission",
    note: "This version demonstrates the interaction only. Nothing is sent or saved. The planned public form will not require registration.",
    error: "Please choose at least one technical direction.",
    confirmation: "Submission confirmation preview",
    confirmationNote:
      "Nothing has been sent. The public version will confirm only after your suggestion has been saved successfully.",
    edit: "Keep editing",
    author: "Maintained by Alex Chen",
    authorBody:
      "I develop bilingual courses informed by reader feedback and OpenHW engineering experience. You are also welcome to contact me about your learning goals.",
    linkedin: "Talk to Alex on LinkedIn",
    github: "Suggest a course publicly",
    planning: "About course planning",
    planningBody:
      "This is a request for learning feedback, not a promise to publish a course. For a project-specific question, naming the repository, tools or difficulty will help.",
  },
} as const;

type Submission = { format: string; topics: string[]; problem: string; email: string };

export function LearningPreferencePreview({ locale }: { locale: "en" | "zh" }) {
  const text = copy[locale];
  const [error, setError] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const topics = data.getAll("topic").map(String);
    if (!topics.length) {
      setError(text.error);
      setSubmission(null);
      form.querySelector<HTMLInputElement>('input[name="topic"]')?.focus();
      return;
    }
    setError("");
    setSubmission({
      format: String(data.get("format") ?? ""),
      topics,
      problem: String(data.get("problem") ?? "").trim(),
      email: String(data.get("contact") ?? "").trim(),
    });
  }

  return (
    <section
      id="learning-feedback"
      aria-labelledby="learning-feedback-title"
      className="scroll-mt-24 border-t border-[var(--border)] py-12 lg:py-16"
    >
      <p className="mb-7 w-fit rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">
        {text.preview}
      </p>
      <p className="text-xs font-semibold text-[var(--primary)]">{text.kicker}</p>
      <h2
        id="learning-feedback-title"
        className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-4xl"
      >
        {text.title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
        {text.intro}
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <form
          onSubmit={handleSubmit}
          onChange={() => {
            setSubmission(null);
            setError("");
          }}
          className="min-w-0 space-y-8"
        >
          <fieldset>
            <legend className="mb-4 flex flex-wrap items-baseline gap-3 text-base font-semibold text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--primary)]">01</span>
              {text.depth}
              <span className="text-xs font-normal text-[var(--text-secondary)]">
                {text.single}
              </span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {text.formats.map((format) => (
                <label key={format.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={format.id}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex h-full min-h-36 flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-colors hover:border-[var(--primary)] peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)]/5 peer-checked:ring-1 peer-checked:ring-[var(--primary)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--primary)]">
                    <span className="pr-6 text-base font-semibold text-[var(--text-primary)]">
                      {format.title}
                    </span>
                    <span className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {format.body}
                    </span>
                    <span className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">
                      {format.example}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border)] text-transparent peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-white"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset aria-describedby={error ? "learning-feedback-error" : undefined}>
            <legend className="mb-4 flex flex-wrap items-baseline gap-3 text-base font-semibold text-[var(--text-primary)]">
              <span className="font-mono text-sm text-[var(--primary)]">02</span>
              {text.topic}
              <span className="text-xs font-normal text-[var(--text-secondary)]">
                {text.multiple}
              </span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {text.topics.map((topic) => (
                <label key={topic.id} className="relative cursor-pointer">
                  <input type="checkbox" name="topic" value={topic.id} className="peer sr-only" />
                  <span className="flex min-h-14 items-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] py-3 pl-4 pr-12 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--primary)] peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)]/5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--primary)]">
                    {topic.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded border border-[var(--border)] text-transparent peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-white"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p
                id="learning-feedback-error"
                role="alert"
                className="mt-3 text-sm text-[var(--text-primary)]"
              >
                {error}
              </p>
            )}
          </fieldset>

          <div>
            <label
              htmlFor="learning-feedback-problem"
              className="text-base font-semibold text-[var(--text-primary)]"
            >
              {text.problem}
              <span className="ml-3 text-xs font-normal text-[var(--text-secondary)]">
                {text.optional}
              </span>
            </label>
            <textarea
              id="learning-feedback-problem"
              name="problem"
              rows={3}
              maxLength={1000}
              placeholder={text.placeholder}
              className="mt-3 block w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-4 text-sm leading-6 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
            />
          </div>

          <details className="border-y border-[var(--border)] py-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-[var(--primary)]">
              {text.contact}
              <span className="ml-3 text-xs font-normal text-[var(--text-secondary)]">
                {text.optional}
              </span>
            </summary>
            <p className="mt-1 max-w-xl text-xs leading-6 text-[var(--text-secondary)]">
              {text.contactNote}
            </p>
            <label
              htmlFor="learning-feedback-contact"
              className="mt-4 block text-sm font-medium text-[var(--text-primary)]"
            >
              {text.email}
            </label>
            <input
              id="learning-feedback-contact"
              type="email"
              name="contact"
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
              className="mb-4 mt-2 min-h-11 w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 text-sm text-[var(--text-primary)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]"
            />
          </details>

          <div>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] sm:w-auto"
            >
              {text.action}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-3 max-w-xl text-xs leading-6 text-[var(--text-secondary)]">
              {text.note}
            </p>
          </div>

          {submission && (
            <div
              role="status"
              className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-5"
            >
              <p className="font-semibold text-[var(--text-primary)]">{text.confirmation}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {text.confirmationNote}
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-[var(--text-secondary)]">{text.depth}</dt>
                  <dd className="mt-1 font-medium text-[var(--text-primary)]">
                    {text.formats.find((format) => format.id === submission.format)?.title}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--text-secondary)]">{text.topic}</dt>
                  <dd className="mt-1 text-[var(--text-primary)]">
                    {text.topics
                      .filter((topic) => submission.topics.includes(topic.id))
                      .map((topic) => topic.title)
                      .join(" · ")}
                  </dd>
                </div>
                {submission.problem && (
                  <div>
                    <dt className="text-xs text-[var(--text-secondary)]">{text.problem}</dt>
                    <dd className="mt-1 whitespace-pre-wrap break-words text-[var(--text-primary)]">
                      {submission.problem}
                    </dd>
                  </div>
                )}
                {submission.email && (
                  <div>
                    <dt className="text-xs text-[var(--text-secondary)]">{text.email}</dt>
                    <dd className="mt-1 break-all text-[var(--text-primary)]">
                      {submission.email}
                    </dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                onClick={() => setSubmission(null)}
                className="mt-3 min-h-11 text-sm font-semibold text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                {text.edit}
              </button>
            </div>
          )}
        </form>

        <aside className="border-t border-[var(--border)] pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <MessageSquareText className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
          <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">{text.author}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{text.authorBody}</p>
          <div className="mt-5 space-y-2">
            <a
              href={externalLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--primary)]"
            >
              <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {text.linkedin}
            </a>
            <a
              href={externalLinks.email}
              className="flex min-h-11 items-center gap-2 text-sm text-[var(--text-secondary)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="break-all">{contactEmail}</span>
            </a>
            <a
              href={externalLinks.courseRequests}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 text-sm text-[var(--text-secondary)]"
            >
              <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
              {text.github}
            </a>
          </div>
          <div className="mt-7 border-t border-[var(--border)] pt-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">{text.planning}</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
              {text.planningBody}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
