import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>OneTime</title>
      </Helmet>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
