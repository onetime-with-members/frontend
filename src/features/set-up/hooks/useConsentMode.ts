import { useEffect, useState } from 'react';

import useConsentCookie from './useConsentCookie';
import useIsEuropean from './useIsEuropean';
import useUpdateConsent from './useUpdateConsent';

declare global {
  interface Window {
    gtag: unknown;
    clarity: unknown;
    fbq: unknown;
  }
}

export default function useConsentMode() {
  const [isAccepted, setIsAccepted] = useState(false);

  const { isEuropean: isConsentRequired, isLoading: isEuropeanLoading } =
    useIsEuropean();
  const {
    addConsentModeCookie,
    isLoading: isCookieLoading,
    hasConsentCookie,
    consentCookieValue,
  } = useConsentCookie();
  const { updateConsentMode } = useUpdateConsent();

  const isLoading = isCookieLoading || isEuropeanLoading;

  function acceptCookies() {
    updateConsentMode(true);
    addConsentModeCookie(true);
  }

  function rejectCookies() {
    updateConsentMode(false);
    addConsentModeCookie(false);
  }

  useEffect(() => {
    if (isLoading) return;
    const isAcceptedValue = isConsentRequired
      ? hasConsentCookie
        ? consentCookieValue
        : false
      : true;
    setIsAccepted(isAcceptedValue);
    updateConsentMode(isAcceptedValue);
  }, [isLoading, isConsentRequired, consentCookieValue, hasConsentCookie]);

  return {
    acceptCookies,
    rejectCookies,
    hasConsentCookie,
    isLoading,
    isAccepted,
    isConsentRequired,
  };
}
