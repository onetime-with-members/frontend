import { getCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';

import useScroll from '@/hooks/useScroll';
import { Link } from '@/navigation';
import { UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function TopToolbarForDesktop() {
  const { isScrolling } = useScroll();

  const t = useTranslations('userDashboard');

  const isLoggedIn = !!getCookie('access-token');

  const { data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  return (
    <header className="hidden h-[72px] w-full justify-center md:flex">
      <div
        className={cn(
          'fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150',
          {
            'shadow-lg': isScrolling,
          },
        )}
      >
        <div className="flex h-[72px] items-center rounded-t-3xl bg-gray-80 px-6 text-gray-00">
          <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-2">
            <h1 className="flex-1 title-lg-300">
              {t('hello', { name: user?.nickname })}
            </h1>
            <Link
              href="/events/new"
              className="hidden rounded-xl bg-primary-50 px-4 py-2 text-gray-00 text-md-200 md:flex"
            >
              {t('createEvent')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
