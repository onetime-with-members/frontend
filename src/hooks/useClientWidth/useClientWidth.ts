import { useEffect, useState } from 'react';

export default function useClientWidth() {
  const [clientWidth, setClientWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    function handleResize() {
      setClientWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return clientWidth;
}
