import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

interface SidebarArticle {
  slug: string;
  title: string;
}

interface SidebarSection {
  id: string;
  title: string;
  articles: SidebarArticle[];
}

export default function GuideSidebar({
  sections,
  title,
  activeSlug,
}: {
  sections: SidebarSection[];
  title: string;
  activeSlug?: string;
}) {
  return (
    <aside className="md:sticky md:top-20 md:h-fit md:w-56 md:shrink-0">
      <nav className="flex flex-col gap-6">
        <ProgressLink href="/guide" className="text-md-300 text-gray-90">
          {title}
        </ProgressLink>
        {sections.map((section) => (
          <div key={section.id} className="flex flex-col gap-2">
            <p className="text-sm-300 text-gray-40">{section.title}</p>
            <ul className="flex flex-col gap-0.5">
              {section.articles.map((article) => {
                const isActive = article.slug === activeSlug;
                return (
                  <li key={article.slug}>
                    <ProgressLink
                      href={`/guide/${article.slug}`}
                      className={cn(
                        'block rounded-md px-2 py-1.5 text-sm-100 text-gray-60 hover:bg-gray-05 hover:text-gray-90',
                        {
                          'bg-primary-00 text-primary-60': isActive,
                        },
                      )}
                    >
                      {article.title}
                    </ProgressLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
