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
        <title>
          OneTime | 원타임으로 쉽고 빠르게 모두가 되는 시간을 찾으세요
        </title>
      </Helmet>
      {content}
    </>
  );
}
