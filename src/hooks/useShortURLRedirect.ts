'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

export default function useShortURLRedirect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (location.hostname === '1-ti.me') {
      const searchParamsStr = new URLSearchParams(searchParams).toString();
      location.href = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}${pathname}${searchParamsStr && `?${searchParamsStr}`}`;
    }
  }, [pathname, searchParams]);
}
