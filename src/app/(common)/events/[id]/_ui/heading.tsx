import React, { useContext } from 'react';

import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';

export function HeadingForDesktop({
  children,
  icon,
  status,
}: {
  icon?: React.ReactNode;
  status?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <div
      className={cn(
        'sticky top-[123px] z-10 flex items-center gap-2 bg-gray-00 py-1 pt-2 text-gray-70 text-lg-300 md:top-[136px]',
        {
          'top-[179px] md:top-[192px]': isBarBannerShown,
        },
      )}
    >
      <div className="flex items-center">
        <span>{icon}</span>
        <h2>{children}</h2>
      </div>
      <span className="text-primary-50 text-md-300">{status}</span>
    </div>
  );
}
