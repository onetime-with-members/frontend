import { useEffect } from 'react';

import { breakpoint } from '@/constants';

interface UseGrayBackgroundProps {
  breakpointCondition?: () => boolean;
}

export default function useGrayBackground({
  breakpointCondition = () => window.innerWidth >= breakpoint.md,
}: UseGrayBackgroundProps = {}) {
  useEffect(() => {
    function updateBackgroundColor() {
      if (breakpointCondition()) {
        document.body.style.backgroundColor = '#F6F7F8';
      } else {
        document.body.style.backgroundColor = '';
      }
    }

    function initBackgroundColor() {
      document.body.style.backgroundColor = '';
    }

    updateBackgroundColor();

    window.addEventListener('resize', updateBackgroundColor);

    return () => {
      initBackgroundColor();

      window.removeEventListener('resize', updateBackgroundColor);
    };
  }, [breakpointCondition]);
}
