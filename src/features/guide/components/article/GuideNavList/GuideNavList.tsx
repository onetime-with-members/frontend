import GuideNavListItem from './GuideNavListItem';
import { getGuideSections } from '@/features/guide/utils/articles';
import { getLocale } from 'next-intl/server';

export default async function GuideNavList({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  const locale = await getLocale();

  const sections = getGuideSections();

  return sections.map((section) => (
    <div key={section.id} className="flex flex-col gap-2">
      <p className="text-gray-90 text-md-300">{section.title[locale]}</p>
      <ul className="flex flex-col gap-0.5">
        {section.articles.map((article) => (
          <GuideNavListItem
            key={article.slug}
            article={article}
            isActive={article.slug === activeSlug}
          />
        ))}
      </ul>
    </div>
  ));
}
