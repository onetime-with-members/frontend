import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { FooterContext } from '@/contexts/FooterContext';
import usePolicy from '@/hooks/usePolicy';
import cn from '@/utils/cn';

export default function Layout() {
  const footerContext = useContext(FooterContext);

  const { isFooterVisible } = footerContext!;

  usePolicy();

  return (
    <>
      <Helmet>
        <title>약관 동의 | OneTime</title>
      </Helmet>
      <ScrollToTop />
      <div
        className={cn('flex h-full min-h-[100vh] flex-col', {
          'min-h-[110vh]': isFooterVisible,
        })}
      >
        <Outlet />
      </div>
      {isFooterVisible && <Footer />}
    </>
  );
}
