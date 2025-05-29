'use client';

import useGrayBackground from '@/hooks/useGrayBackground';
import { breakpoint } from '@/lib/constants';

export default function GrayBackground() {
  useGrayBackground({
    breakpointCondition: () => window.innerWidth < breakpoint.md,
  });

  return null;
}
