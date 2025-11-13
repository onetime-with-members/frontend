'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import {
  CONSENT_MODE_COOKIE_ACCEPTED_VALUE,
  CONSENT_MODE_COOKIE_DENIED_VALUE,
  CONSENT_MODE_COOKIE_KEY,
} from '@/features/set-up/constants';
import dayjs from '@/lib/dayjs';

export default function useConsentCookie() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasConsentCookie, setHasConsentCookie] = useState(false);
  const [consentCookieValue, setConsentCookieValue] = useState(false);

  function addConsentModeCookie(isAccepted: boolean) {
    setCookie(
      CONSENT_MODE_COOKIE_KEY,
      isAccepted
        ? CONSENT_MODE_COOKIE_ACCEPTED_VALUE
        : CONSENT_MODE_COOKIE_DENIED_VALUE,
      {
        expires: dayjs()
          .add(isAccepted ? 6 : 1, 'months')
          .toDate(),
      },
    );
  }

  useEffect(() => {
    async function fetchConsentModeCookie() {
      const consentMode = await getCookie(CONSENT_MODE_COOKIE_KEY);
      setHasConsentCookie(consentMode !== undefined);
      setConsentCookieValue(consentMode === CONSENT_MODE_COOKIE_ACCEPTED_VALUE);
      setIsLoading(false);
    }
    fetchConsentModeCookie();
  }, []);

  return {
    addConsentModeCookie,
    isLoading,
    hasConsentCookie,
    consentCookieValue,
  };
}
