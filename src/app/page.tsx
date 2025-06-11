import LandingPage from './landing';
import UserDashboardPage from './user-dashboard';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  if (session) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
