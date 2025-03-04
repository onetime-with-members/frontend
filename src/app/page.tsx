import LandingPage from './components/LandingPage/LandingPage';

// import UserDashboardPage from '@/pages/UserDashboardPage/UserDashboardPage';

export default async function Home() {
  // if (typeof window !== 'undefined') {
  //   const isLoggedIn = !!localStorage.getItem('access-token');

  //   if (isLoggedIn) {
  //     return <UserDashboardPage />;
  //   }
  // }

  return <LandingPage />;
}
