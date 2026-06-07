import GuideSectionListItem from './GuideSectionListItem';
import { getGuideSections } from '@/features/guide/utils/articles';
import { getLocale } from 'next-intl/server';

export default async function GuideSectionList() {
  const locale = await getLocale();

  const sections = getGuideSections();

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <h2 className="text-gray-90 text-lg-300">{section.title[locale]}</h2>
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
