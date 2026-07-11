import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  Cpu,
  FileCheck2,
  GraduationCap,
  Headphones,
  LibraryBig,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/lib/routing";

const copy = {
  en: {
    eyebrow: "OpenHW Classroom · In preparation",
    title: "A smaller, human-reviewed course collection is on the way",
    subtitle:
      "The classroom is being rebuilt around source-grounded technical depth, deliberate narration, and direct human review before publication.",
    status: "Current status",
    statusTitle: "No public courses are available right now",
    statusBody:
      "Earlier experimental lessons have been withdrawn. New courses will appear only after their technical claims, teaching structure, audio, and visual presentation have been reviewed.",
    exploreProjects: "Explore projects",
    browseResources: "Browse technical resources",
    standardsEyebrow: "Publication standard",
    standardsTitle: "What every future course must pass",
    standards: [
      {
        title: "Source-grounded",
        body: "Important claims must trace to official documentation, code, or another clearly identified primary source.",
      },
      {
        title: "Human-reviewed",
        body: "Alex will review the technical argument, lesson depth, examples, and learning outcome before publication.",
      },
      {
        title: "Comfortable to follow",
        body: "Narration pace, pauses, slide density, diagrams, and quizzes must work as a complete learning experience.",
      },
    ],
    focusEyebrow: "Planned direction",
    focusTitle: "The first collection will stay close to real engineering work",
    focusSubtitle:
      "The exact catalog will be published only when the lessons are ready. These are the current focus areas, not promises of course availability.",
    focus: [
      {
        title: "Processor architecture",
        body: "Project scope, configurations, architecture maps, and disciplined source-reading paths.",
      },
      {
        title: "Verification practice",
        body: "Concrete verification environments, observability, debugging, and reusable engineering habits.",
      },
      {
        title: "Open-source contribution",
        body: "Evidence-based onboarding from project discovery to a well-scoped first contribution.",
      },
    ],
  },
  zh: {
    eyebrow: "OpenHW 交互式课堂 · 筹备中",
    title: "一组更少、更深入、经过人工核对的课程正在重新制作",
    subtitle:
      "课堂将以可追溯的一手资料、足够的技术深度、舒适的讲解节奏和发布前人工检查为基础重新建设。",
    status: "当前状态",
    statusTitle: "目前没有公开课程",
    statusBody:
      "此前的实验性课程已经全部下架。新课程只会在技术判断、教学结构、语音和视觉呈现都经过检查后重新发布。",
    exploreProjects: "浏览项目",
    browseResources: "查看技术资料",
    standardsEyebrow: "发布标准",
    standardsTitle: "未来每门课程都必须通过的检查",
    standards: [
      {
        title: "依据可以追溯",
        body: "重要判断必须能够追溯到官方文档、代码或明确标出的其他一手来源。",
      },
      {
        title: "由人工完成审核",
        body: "Alex 会在发布前检查技术论证、课程深度、示例和实际学习目标。",
      },
      {
        title: "完整体验足够舒适",
        body: "讲解速度、停顿、每页信息密度、图表和测验必须共同构成可使用的学习体验。",
      },
    ],
    focusEyebrow: "规划方向",
    focusTitle: "第一批课程会紧贴真实工程工作",
    focusSubtitle: "课程真正完成后才会公布正式目录。以下是当前关注方向，并不代表相应课程已经上线。",
    focus: [
      {
        title: "处理器架构",
        body: "围绕项目边界、配置、架构地图和有依据的源码阅读路径展开。",
      },
      {
        title: "验证实践",
        body: "结合具体验证环境，讲解可观测性、调试方法和可复用的工程习惯。",
      },
      {
        title: "开源贡献",
        body: "从发现项目、核对资料，到准备一个边界清楚的首次贡献。",
      },
    ],
  },
} as const;

const standardIcons = [FileCheck2, BookOpenCheck, Headphones] as const;
const focusIcons = [Cpu, ShieldCheck, Compass] as const;

type ClassroomContentProps = {
  locale: string;
};

export function ClassroomContent({ locale }: ClassroomContentProps) {
  const resolvedLocale = locale === "zh" ? "zh" : "en";
  const text = copy[resolvedLocale];

  return (
    <div className="page-shell">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 py-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:py-10">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              <GraduationCap className="h-3.5 w-3.5" />
              {text.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              {text.subtitle}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#projects"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
              >
                {text.exploreProjects}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--primary)]/40 hover:bg-[var(--bg-card-hover)]"
              >
                <LibraryBig className="h-4 w-4" />
                {text.browseResources}
              </Link>
            </div>
          </div>

          <aside className="border-l-2 border-[var(--primary)] bg-[var(--bg-subtle)] px-6 py-7">
            <p className="text-xs font-semibold text-[var(--primary)]">{text.status}</p>
            <h2 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
              {text.statusTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{text.statusBody}</p>
          </aside>
        </section>

        <section className="border-y border-[var(--border)] py-9 sm:py-11">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-[var(--primary)]">{text.standardsEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {text.standardsTitle}
            </h2>
          </div>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {text.standards.map((item, index) => {
              const Icon = standardIcons[index] ?? CheckCircle2;
              return (
                <article key={item.title} className="border-t border-[var(--border)] pt-5">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                  <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-4 py-4 sm:py-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-[var(--primary)]">{text.focusEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {text.focusTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {text.focusSubtitle}
            </p>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {text.focus.map((item, index) => {
              const Icon = focusIcons[index] ?? Compass;
              return (
                <article
                  key={item.title}
                  className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-5"
                >
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                  <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
