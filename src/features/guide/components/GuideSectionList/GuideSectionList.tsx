import { ProgressLink } from '@/navigation';

interface IndexArticle {
  slug: string;
  title: string;
  description: string;
}

interface IndexSection {
  id: string;
  title: string;
  articles: IndexArticle[];
}

export default function GuideSectionList({
  sections,
}: {
  sections: IndexSection[];
}) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <h2 className="text-lg-300 text-gray-90">{section.title}</h2>
          <ul className="flex flex-col gap-3">
            {section.articles.map((article) => (
              <li key={article.slug}>
                <ProgressLink
                  href={`/guide/${article.slug}`}
                  className="flex flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05"
                >
                  <span className="text-md-300 text-gray-90">
                    {article.title}
                  </span>
                  <span className="text-sm-100 text-gray-50">
                    {article.description}
                  </span>
                </ProgressLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
