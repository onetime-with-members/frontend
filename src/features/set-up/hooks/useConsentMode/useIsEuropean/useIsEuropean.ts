import { useEffect, useState } from 'react';

import { IP_API_URL, europeanCountryCodes } from '@/features/set-up/constants';

export default function useIsEuropean() {
  const [isEuropean, setIsEuropean] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIsEuropean() {
      try {
        const res = await fetch(IP_API_URL);
        const { countryCode } = await res.json();
        setIsEuropean(europeanCountryCodes.includes(countryCode));
      } catch {
        setIsEuropean(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIsEuropean();
  }, []);

  return { isEuropean, isLoading };
}
