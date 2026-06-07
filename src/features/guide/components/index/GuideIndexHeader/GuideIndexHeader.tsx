import { getTranslations } from 'next-intl/server';

export default async function GuideIndexHeader() {
  const t = await getTranslations('guide');

  return (
    <header className="mb-10 flex flex-col gap-3">
      <h1 className="title-sm-300 text-gray-90 md:title-lg-300">
        {t('index.title')}
      </h1>
      <p className="text-md-100 text-gray-50">{t('index.description')}</p>
    </header>
  );
}
