import { Helmet } from 'react-helmet-async';

import LandingPage from '../LandingPage/LandingPage';
import UserDashboardPage from '../UserDashboardPage/UserDashboardPage';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>OneTime</title>
      </Helmet>
      {!!localStorage.getItem('access-token') ? (
        <UserDashboardPage />
      ) : (
        <LandingPage />
      )}
    </>
  );
}
