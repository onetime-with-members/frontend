'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { BarBannerContext } from '@/contexts/bar-banner';
import { FooterContext } from '@/contexts/footer';
import useScroll from '@/hooks/useScroll';
import cn from '@/lib/cn';
import { MyScheduleTimeType } from '@/lib/types';
import { useRouter } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';

export default function ToolbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScrolling } = useScroll();

  return (
    <div
      className={cn(
        'fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150',
        {
          'shadow-lg': isScrolling,
        },
      )}
    >
      {children}
    </div>
  );
}

export function MyTimeBlockBoardContent({
  mySchedule,
}: {
  mySchedule: MyScheduleTimeType[];
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || []}
      className="pl-3 pr-6"
      topDateGroupClassName={cn(
        'sticky bg-gray-00 z-10 top-[64px] md:top-[136px]',
        {
          'top-[120px] md:top-[192px]': isBarBannerShown,
        },
      )}
    />
  );
}

export function BottomButtonForMobile() {
  const { isFooterShown } = useContext(FooterContext);

  const router = useRouter();
  const t = useTranslations('userDashboard');

  function handleFloatingBottomButtonClick() {
    router.push('/events/new');
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-10 w-full bg-gray-00 p-4 shadow-[0px_-4px_32px_0px_rgba(0,0,0,0.05)] transition-opacity duration-300 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <div className="mx-auto w-full max-w-screen-md">
        <Button
          variant="dark"
          onClick={handleFloatingBottomButtonClick}
          fullWidth
        >
          <span className="flex items-center justify-center gap-1">
            <span>{t('createEvent')}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}
