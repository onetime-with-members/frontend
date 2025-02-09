import { useEffect } from 'react';

import breakpoint from '@/utils/breakpoint';

export default function useGrayBackground() {
  useEffect(() => {
    function updateBackgroundColor() {
      if (window.innerWidth >= breakpoint.md) {
        document.body.style.backgroundColor = '#F9F9F9';
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
  }, []);
}
