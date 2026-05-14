import { redirect } from "next/navigation";

type ContributePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContributePage({ params }: ContributePageProps) {
  const { locale } = await params;
  const resolvedLocale = locale === "zh" ? "zh" : "en";

  redirect(`/${resolvedLocale}/about#contribute`);
}
