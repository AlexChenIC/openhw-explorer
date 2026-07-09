import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type ContributePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContributePage({ params }: ContributePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolvedLocale = locale === "zh" ? "zh" : "en";

  redirect(`/${resolvedLocale}/about#contribute`);
}
