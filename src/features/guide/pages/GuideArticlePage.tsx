import GuideArticleMain from '../components/article/GuideArticleMain';
import GuideMobileNav from '../components/article/GuideMobileNav';
import GuideNavList from '../components/article/GuideNavList';
import GuideSidebar from '../components/article/GuideSidebar';
import GuideToc from '../components/article/GuideToc';
import '../styles/guide-article.css';
import { getGuideArticleBody, getGuideArticleMeta } from '../utils/articles';
import { extractHeadings } from '../utils/toc';
import NavBar from '@/components/NavBar';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function GuideArticlePage({ slug }: { slug: string }) {
  const locale = await getLocale();

  const article = getGuideArticleMeta(slug);
  const body = getGuideArticleBody(slug);
  if (!article || !body) notFound();

  const headings = extractHeadings(body[locale]);

  return (
    <div className="flex flex-col">
      <NavBar shadow={false} />
      <GuideMobileNav article={article}>
        <GuideNavList activeSlug={slug} />
      </GuideMobileNav>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-8 md:flex-row md:gap-12 md:py-12">
        <GuideSidebar>
          <GuideNavList activeSlug={slug} />
        </GuideSidebar>
        <GuideArticleMain slug={slug} />
        <GuideToc headings={headings} />
      </div>
    </div>
  );
}
