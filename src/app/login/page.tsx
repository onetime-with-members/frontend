import { Suspense } from 'react';

import { getQueryClient } from '../../utils/get-query-client';
import LoginPage from './components/LoginPage';
import axios from '@/utils/axios';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('login');

  return {
    title: `${t('login')} | OneTime`,
  };
}

export default async function Login() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <LoginPage />
      </Suspense>
    </HydrationBoundary>
  );
}
