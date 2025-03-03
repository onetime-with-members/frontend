import { getQueryClient } from '../utils/get-query-client';
import LandingPage from './components/LandingPage/LandingPage';
// import UserDashboardPage from '@/pages/UserDashboardPage/UserDashboardPage';
import axios from '@/utils/axios';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  // if (typeof window !== 'undefined') {
  //   const isLoggedIn = !!localStorage.getItem('access-token');

  //   if (isLoggedIn) {
  //     return <UserDashboardPage />;
  //   }
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LandingPage />
    </HydrationBoundary>
  );
}
