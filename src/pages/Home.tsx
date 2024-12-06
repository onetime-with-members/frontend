import { Helmet } from 'react-helmet-async';

import axios from '../api/axios';
import Landing from './Landing';
import UserDashboard from './UserDashboard';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const isLoggedIn = !!localStorage.getItem('access-token');

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      try {
        const res = await axios.get('/users/profile');
        return res.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
    enabled: isLoggedIn,
  });

  let renderedPage = null;

  if (isUserLoading) {
    renderedPage = <></>;
  } else if (user && isLoggedIn) {
    renderedPage = <UserDashboard />;
  } else {
    renderedPage = <Landing />;
  }

  return (
    <>
      <Helmet>
        <title>
          OneTime | 원타임으로 쉽고 빠르게 모두가 되는 시간을 찾으세요
        </title>
      </Helmet>
      {renderedPage}
    </>
  );
}
