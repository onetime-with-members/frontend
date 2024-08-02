import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
