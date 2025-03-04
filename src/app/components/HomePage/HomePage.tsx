import LandingPage from '../LandingPage/LandingPage';
import UserDashboardPage from '../UserDashboardPage/UserDashboardPage';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const isLoggedIn = !!(await cookies()).get('access-token');

  if (isLoggedIn) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
