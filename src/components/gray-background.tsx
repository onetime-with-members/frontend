'use client';

import useGrayBackground from '@/hooks/useGrayBackground';
import { breakpoint } from '@/lib/constants';

export default function GrayBackground({
  device,
  breakpoint: breakpointKey,
}: {
  device?: 'mobile' | 'desktop';
  breakpoint?: 'sm' | 'md';
}) {
  useGrayBackground({
    ...(device && breakpointKey
      ? {
          breakpointCondition: () => {
            if (device === 'mobile') {
              return window.innerWidth < breakpoint[breakpointKey];
            } else {
              return window.innerWidth >= breakpoint[breakpointKey];
            }
          },
        }
      : {}),
  });

  return null;
}
