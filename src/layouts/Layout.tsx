import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
