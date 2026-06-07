import { getGuideSectionTitle } from '@/features/guide/utils/sections';
import { GuideArticleMeta } from '@/features/guide/types';
import { getLocale } from 'next-intl/server';

export default async function GuideArticleHeader({
  article,
}: {
  article: GuideArticleMeta;
}) {
  const locale = await getLocale();

  return (
    <>
      <p className="text-primary-50 text-sm-300">
        {getGuideSectionTitle(article.section, locale)}
      </p>
      <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-gray-90">
        {article.title[locale]}
      </h1>
      <p className="mb-9 mt-3 text-[1.0625rem] leading-relaxed text-gray-50">
        {article.description[locale]}
      </p>
    </>
  );
}
