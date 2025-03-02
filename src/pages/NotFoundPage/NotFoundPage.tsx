import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import MainContent from './MainContent/MainContent';
import NavBar from '@/components/NavBar/NavBar';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('404.notFound')} | OneTime</title>
      </Helmet>
      <div className="flex flex-1 flex-col">
        <NavBar />
        <MainContent />
      </div>
    </>
  );
}
