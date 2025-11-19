import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { useUserQuery } from '@/features/user/api/user.query';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import dayjs from '@/lib/dayjs';

export default function useUserSetUp() {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  const { data: user } = useUserQuery({ enabled: isLoggedIn });

  useEffect(() => {
    async function setUpLastLogin() {
      if (user && getCookie('last-login') !== user.social_platform) {
        await setCookie('last-login', user.social_platform, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }
    }

    setUpLastLogin();

    router.refresh();
  }, [user, isLoggedIn]);
}
