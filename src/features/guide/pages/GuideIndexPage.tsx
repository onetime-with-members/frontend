import { Locale } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

import GuideSectionList from '../components/index/GuideSectionList';
import { GUIDE_SECTION_MESSAGE_KEY } from '../constants';
import { getGuideSections } from '../utils/articles';
import { GuideLocale } from '../types';
import NavBar from '@/components/NavBar';

export default async function GuideIndexPage() {
  const locale = (await getLocale()) as Locale & GuideLocale;
  const t = await getTranslations('guide');

  const sections = getGuideSections().map((section) => ({
    id: section.id,
    title: t(`sections.${GUIDE_SECTION_MESSAGE_KEY[section.id]}`),
    articles: section.articles.map((article) => ({
      slug: article.slug,
      title: article.title[locale],
      description: article.description[locale],
    })),
  }));

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="mx-auto w-full max-w-screen-md px-4 py-10 md:py-14">
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="title-sm-300 text-gray-90 md:title-lg-300">
            {t('index.title')}
          </h1>
          <p className="text-md-100 text-gray-50">{t('index.description')}</p>
        </header>
        <GuideSectionList sections={sections} />
      </div>
    </div>
  );
}
