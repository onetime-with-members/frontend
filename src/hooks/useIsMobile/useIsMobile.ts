import { useEffect, useState } from 'react';

import { breakpoint } from '@/constants';

export default function useIsMobile() {
  const [clientWidth, setClientWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(clientWidth < breakpoint.md);
  }, [clientWidth]);

  return isMobile;
}
