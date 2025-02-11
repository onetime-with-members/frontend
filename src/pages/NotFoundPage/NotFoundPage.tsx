import { Helmet } from 'react-helmet-async';

import MainContent from './MainContent/MainContent';
import NavBar from '@/components/NavBar/NavBar';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | OneTime</title>
      </Helmet>
      <div className="flex flex-1 flex-col">
        <NavBar />
        <MainContent />
      </div>
    </>
  );
}
