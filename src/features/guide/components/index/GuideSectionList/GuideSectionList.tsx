import GuideSectionListItem from './GuideSectionListItem';

export default function GuideSectionList({
  sections,
}: {
  sections: {
    id: string;
    title: string;
    articles: {
      slug: string;
      title: string;
      description: string;
    }[];
  }[];
}) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <h2 className="text-lg-300 text-gray-90">{section.title}</h2>
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
