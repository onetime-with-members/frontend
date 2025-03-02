import { Helmet } from 'react-helmet-async';

import LandingPage from '../LandingPage';
import UserDashboardPage from '../UserDashboardPage';

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem('access-token');

  let content = null;

  if (isLoggedIn) {
    content = <UserDashboardPage />;
  } else {
    content = <LandingPage />;
  }

  return (
    <>
      <Helmet>
        <title>OneTime</title>
      </Helmet>
      {content}
    </>
  );
}
