import LandingPage from '../LandingPage/LandingPage';
import UserDashboardPage from '../UserDashboardPage/UserDashboardPage';

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem('access-token');

  if (isLoggedIn) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}
