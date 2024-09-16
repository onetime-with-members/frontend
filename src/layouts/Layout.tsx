import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import ScrollToTop from '../components/scroll-to-top/ScrollToTop';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>OneTime</title>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Outlet />
      </div>
    </>
  );
}
