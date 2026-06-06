import GuideNavList from '../GuideNavList';
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
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-56 md:shrink-0">
      <nav className="flex flex-col gap-6">
        <ProgressLink href="/guide" className="text-md-300 text-gray-90">
          {title}
        </ProgressLink>
        <GuideNavList sections={sections} activeSlug={activeSlug} />
      </nav>
    </aside>
  );
}
