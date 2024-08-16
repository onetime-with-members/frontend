import { Outlet } from 'react-router-dom';

import ScrollToTop from '../components/ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
