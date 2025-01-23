import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';

export default function Layout() {
  const footerContext = useContext(FooterContext);

  const { isFooterVisible } = footerContext!;

  return (
    <>
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
