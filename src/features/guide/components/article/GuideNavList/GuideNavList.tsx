import GuideNavListItem from './GuideNavListItem';
import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { getGuideSections } from '@/features/guide/utils/articles';
import { getTranslations } from 'next-intl/server';

export default async function GuideNavList({
  activeSlug,
}: {
  activeSlug?: string;
}) {
  const t = await getTranslations('guide');

  const sections = getGuideSections();

  return sections.map((section) => (
    <div key={section.id} className="flex flex-col gap-2">
      <p className="text-gray-90 text-md-300">
        {t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`)}
      </p>
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
