import { Helmet } from 'react-helmet-async';

import axios from '../api/axios';
import Landing from './Landing';
import UserDashboard from './user-dashboard/UserDashboard';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const isLoggedIn = !!localStorage.getItem('access-token');

  const { data: userData, isLoading: isUserLoading } = useQuery({
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

  const user = userData?.payload;

  let content = null;

  if (isUserLoading) {
    content = <></>;
  } else if (userData && isLoggedIn) {
    content = <UserDashboard user={user} />;
  } else {
    content = <Landing />;
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
