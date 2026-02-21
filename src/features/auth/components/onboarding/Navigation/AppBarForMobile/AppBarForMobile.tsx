import { getCookie } from 'cookies-next';
import { useContext } from 'react';

import { REDIRECT_URL } from '@/features/auth/constants';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function AppBarForMobile() {
  const { pageIndex, moveToPrevPage } = useContext(OnboardingContext);

  const progressRouter = useProgressRouter();

  const redirectUrl = getCookie(REDIRECT_URL);

  return (
    <nav
      className={cn('block h-[4rem] md:hidden', {
        hidden: pageIndex === 3,
      })}
    >
      <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
        <button
          className="w-6"
          onClick={() => {
            if (pageIndex === 0) {
              progressRouter.push(`/login?redirect_url=${redirectUrl}`);
            } else {
              moveToPrevPage();
            }
          }}
        >
          <IconChevronLeft />
        </button>
        <div className="flex flex-1 items-center justify-center">
          <span className="text-gray-90 text-md-300"></span>
        </div>
        <div className="w-6" />
      </div>
    </nav>
  );
}
