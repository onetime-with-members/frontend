import { Locale } from 'next-intl';

import GuideNavListItem from './GuideNavListItem';
import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { GuideLocale } from '@/features/guide/types';
import { getGuideSections } from '@/features/guide/utils/articles';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function GuideNavList({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  const locale = (await getLocale()) as Locale & GuideLocale;
  const t = await getTranslations('guide');

  const sections = getGuideSections().map((section) => ({
    id: section.id,
    title: t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`),
    articles: section.articles.map(({ slug, title }) => ({
      slug,
      title: title[locale],
    })),
  }));

  return (
    <>
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-2">
          <p className="text-gray-90 text-md-300">{section.title}</p>
          <ul className="flex flex-col gap-0.5">
            {section.articles.map((article) => (
              <GuideNavListItem
                key={article.slug}
                item={article}
                isActive={article.slug === activeSlug}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
