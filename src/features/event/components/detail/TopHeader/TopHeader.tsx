import { useContext } from 'react';

import TopToolbar from './TopToolbar';
import BarBanner from '@/features/banner/components/BarBanner';
import { BarBannerContext } from '@/features/banner/contexts/BarBannerContext';
import cn from '@/lib/cn';

export default function TopHeader() {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <header
      className={cn('flex h-[72px] w-full justify-center', {
        'h-[128px]': isBarBannerShown,
      })}
    >
      <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] rounded-t-3xl bg-gray-00 duration-150">
        <TopToolbar />
        <BarBanner
          className="h-[56px]"
          innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
        />
      </div>
    </header>
  );
}
