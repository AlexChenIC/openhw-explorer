import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectById, getRelatedProjects, getGitHubStats } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProjectKnowledge, getKnowledgeSummary } from "@/data/knowledge";
import { serializeJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://openhw-explorer.vercel.app";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

// Generate static params for all projects × all locales
export async function generateStaticParams() {
  return projects.flatMap((project) =>
    ["en", "zh"].map((locale) => ({
      locale,
      id: project.id,
    })),
  );
}

// Dynamic metadata per project with Open Graph
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Not Found" };

  const title = `${project.name} - OpenHW Explorer`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/${locale}/projects/${id}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${id}`,
      languages: {
        en: `${SITE_URL}/en/projects/${id}`,
        zh: `${SITE_URL}/zh/projects/${id}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id, locale } = await params;

  const project = getProjectById(id);
  if (!project) notFound();

  const relatedProjects = getRelatedProjects(project);
  const knowledge = getProjectKnowledge(project.id);
  const knowledgeSummary = getKnowledgeSummary(project.id);
  const githubStats = getGitHubStats(project.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    codeRepository: project.github || undefined,
    programmingLanguage: project.language || undefined,
    url: `${SITE_URL}/${locale}/projects/${project.id}`,
    publisher: {
      "@type": "Organization",
      name: "OpenHW Explorer Community",
      url: SITE_URL,
    },
    author: {
      "@type": "Person",
      name: "Alex Chen",
      alternateName: "开源老陈",
      url: "https://github.com/AlexChenIC",
    },
    about: {
      "@type": "Organization",
      name: "OpenHW Group",
      url: "https://www.openhwgroup.org/",
    },
    isBasedOn: project.github || undefined,
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <main className="relative z-10 min-h-full">
        <Header />
        <ProjectDetail
          project={project}
          relatedProjects={relatedProjects}
          knowledge={knowledge}
          knowledgeSummary={knowledgeSummary}
          githubStats={githubStats}
        />
        <Footer />
      </main>
    </div>
  );
}
