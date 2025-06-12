'use client';

import { useContext } from 'react';

import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';

export function HeadingForDesktop({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <h2
      className={cn(
        'sticky top-[123px] z-10 bg-gray-05 py-1 text-gray-90 text-lg-300 md:top-[136px]',
        {
          'top-[179px] md:top-[192px]': isBarBannerShown,
        },
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function ToolbarHeading({ children }: { children: React.ReactNode }) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <header
      className={cn('flex h-[59px] w-full justify-center md:h-[72px]', {
        'h-[115px] md:h-[128px]': isBarBannerShown,
      })}
    >
      {children}
    </header>
  );
}
