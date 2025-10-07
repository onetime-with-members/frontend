import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  CONSENT_MODE_COOKIE_ACCEPTED_VALUE,
  CONSENT_MODE_COOKIE_DENIED_VALUE,
  CONSENT_MODE_COOKIE_KEY,
  DENIED,
  GRANT,
  GRANTED,
  REVOKE,
} from '../constants';

declare global {
  interface Window {
    gtag: unknown;
    clarity: unknown;
    fbq: unknown;
  }
}

export default function useConsentMode() {
  const [hasConsentMode, setHasConsentMode] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isCookieLoading, setIsCookieLoading] = useState(true);

  function acceptCookies() {
    updateConsentMode(true);
    setCookie(CONSENT_MODE_COOKIE_KEY, CONSENT_MODE_COOKIE_ACCEPTED_VALUE, {
      expires: dayjs().add(6, 'months').toDate(),
    });
  }

  function rejectCookies() {
    updateConsentMode(false);
    setCookie(CONSENT_MODE_COOKIE_KEY, CONSENT_MODE_COOKIE_DENIED_VALUE, {
      expires: dayjs().add(1, 'month').toDate(),
    });
  }

  function updateConsentMode(isAccepted: boolean) {
    updateGoogleConsent(isAccepted);
    updateMSClarityConsent(isAccepted);
    updateMetaPixelConsent(isAccepted);
  }

  function updateGoogleConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANTED : DENIED;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
  }

  function updateMSClarityConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANTED : DENIED;
    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        ad_Storage: value,
        analytics_Storage: value,
      });
    }
  }

  function updateMetaPixelConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANT : REVOKE;
    if (typeof window.fbq === 'function') {
      window.fbq('consent', value);
    }
  }

  useEffect(() => {
    async function fetchConsentModeCookie() {
      const consentMode = await getCookie(CONSENT_MODE_COOKIE_KEY);
      setHasConsentMode(consentMode !== undefined);
      setIsAccepted(consentMode === CONSENT_MODE_COOKIE_ACCEPTED_VALUE);
      setIsCookieLoading(false);
    }
    fetchConsentModeCookie();
  }, []);

  useEffect(() => {
    if (!isCookieLoading && hasConsentMode) {
      updateConsentMode(isAccepted);
    }
  }, [isAccepted, isCookieLoading]);

  return {
    acceptCookies,
    rejectCookies,
    hasConsentMode,
    isLoading: isCookieLoading,
    isAccepted,
  };
}
