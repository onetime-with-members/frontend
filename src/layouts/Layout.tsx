import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { FooterContext } from '../contexts/FooterContext';

export default function Layout() {
  const footerContext = useContext(FooterContext);

  const { isFooterVisible } = footerContext!;

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
      {isFooterVisible && <Footer />}
    </>
  );
}
