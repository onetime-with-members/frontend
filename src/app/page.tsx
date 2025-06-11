import LandingPage from './landing';
import UserDashboardPage from './user-dashboard';
import { auth } from '@/lib/auth';

export default async function Home() {
  if (await auth()) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
