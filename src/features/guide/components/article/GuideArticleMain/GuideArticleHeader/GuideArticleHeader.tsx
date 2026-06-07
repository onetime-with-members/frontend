import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { GuideArticleMeta } from '@/features/guide/types';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function GuideArticleHeader({
  article,
}: {
  article: GuideArticleMeta;
}) {
  const locale = await getLocale();
  const t = await getTranslations('guide');

  return (
    <>
      <p className="text-primary-50 text-sm-300">
        {t(`sections.${GUIDE_SECTION_MESSAGE_KEY[article.section]}`)}
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
