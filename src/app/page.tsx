import LandingPage from './components/LandingPage/LandingPage';
import UserDashboardPage from './components/UserDashboardPage/UserDashboardPage';
import { cookies } from 'next/headers';

export default async function Home() {
  const isLoggedIn = !!(await cookies()).get('access-token');

  if (isLoggedIn) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
