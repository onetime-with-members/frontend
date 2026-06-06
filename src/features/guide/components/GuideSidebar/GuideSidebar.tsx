import GuideNavList from '../GuideNavList';

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
  activeSlug,
}: {
  sections: SidebarSection[];
  activeSlug?: string;
}) {
  return (
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-56 md:shrink-0">
      <nav className="flex flex-col gap-6">
        <GuideNavList sections={sections} activeSlug={activeSlug} />
      </nav>
    </aside>
  );
}
