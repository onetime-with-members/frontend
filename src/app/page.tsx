import LandingPage from './components/LandingPage/LandingPage';
import UserDashboardPage from './user-dashboard';
import { auth } from '@/lib/auth';

export default async function Home() {
  if (await auth()) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
