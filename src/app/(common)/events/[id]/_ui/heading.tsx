import React, { useContext } from 'react';

import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';

export function EventSectionHeading({
  children,
  icon,
  status,
  className,
  sticky,
}: {
  icon?: React.ReactNode;
  status?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <div
      className={cn(
        'top-[136px] z-10 flex items-center gap-2 bg-gray-00 pb-1 pt-2 text-gray-70 text-lg-300',
        {
          'top-[192px]': isBarBannerShown,
          sticky: sticky,
        },
        className,
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
