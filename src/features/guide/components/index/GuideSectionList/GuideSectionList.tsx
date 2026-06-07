import GuideSectionListItem from './GuideSectionListItem';
import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { getGuideSections } from '@/features/guide/utils/articles';
import { getTranslations } from 'next-intl/server';

export default async function GuideSectionList() {
  const t = await getTranslations('guide');

  const sections = getGuideSections();

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <h2 className="text-gray-90 text-lg-300">
            {t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`)}
          </h2>
          <ul className="flex flex-col gap-3">
            {section.articles.map((article) => (
              <GuideSectionListItem key={article.slug} article={article} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
